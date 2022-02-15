// @format
const { Component, Event, Duration, Time, parse } = require("ical.js");
const fetch = require("cross-fetch");
const { v4: uuidv4 } = require("uuid");
const { format, utcToZonedTime } = require("date-fns-tz");
const add = require("date-fns/add");
// NOTE: We decided on using sha1 for generating etags, as there's no mutual
// crypto API for simple-caldav's targets, which are nodejs and browser
// environments.
const sha1 = require("sha1");
const xmldoc = require("xmldoc");

const prodid = "-//TimDaub//simple-caldav//EN";
// NOTE: https://tools.ietf.org/html/rfc5545#section-3.8.1.11
const allowedVEVENTStatus = ["TENTATIVE", "CONFIRMED", "CANCELED"];

class ServerError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }

    this.name = "ServerError";
  }
}

class ParserError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ParserError);
    }

    this.name = "ParserError";
  }
}

class InputError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InputError);
    }

    this.name = "InputError";
  }
}

class SimpleCalDAV {
  constructor(uri, options) {
    this.uri = uri;
    this.options = options;
  }

  async createEvent(
    start,
    end,
    summary,
    alarms,
    _status,
    organizer,
    _location
  ) {
    return this.handleEvent(
      start,
      end,
      summary,
      alarms,
      _status,
      organizer,
      _location,
      "create"
    );
  }

  // TODO: Do we want to make this method more convenient by allowing partial
  // updates?
  async updateEvent(
    uid,
    start,
    end,
    summary,
    alarms,
    _status,
    organizer,
    _location
  ) {
    return this.handleEvent(
      start,
      end,
      summary,
      alarms,
      _status,
      organizer,
      _location,
      "update",
      uid
    );
  }

  static extractUid(href) {
    const [_, uid] = href.match(new RegExp("([^\\/]+)\\.ics"));
    return uid;
  }

  static applyDuration(date, duration) {
    if (
      date instanceof Date &&
      duration &&
      typeof duration === "object" &&
      "isNegative" in duration &&
      (duration.weeks ||
        duration.days ||
        duration.hours ||
        duration.minutes ||
        duration.seconds)
    ) {
      const durObj = new Duration(duration);
      return add(date, { seconds: durObj.toSeconds() });
    } else {
      throw new InputError(
        "Incorrect parameters submitted to applyDuration (date or duration), check implementation for more details."
      );
    }
  }

  static toTrigger(val) {
    let trigger;
    if (val instanceof Date) {
      return `TRIGGER;VALUE=DATE-TIME:${SimpleCalDAV.formatDateTime(val)}\n`;
    } else if (
      (typeof val === "object" && "weeks" in val) ||
      "days" in val ||
      "hours" in val ||
      "minutes" in val ||
      "seconds" in val
    ) {
      const dur = new Duration(val);
      return `TRIGGER:${dur.toString()}\n`;
    } else {
      throw new InputError(
        "Input needs to be of type Date or a object with a specific shape (check implementation)"
      );
    }
  }

  static toVALARM(alarm) {
    let attendee;
    if (alarm && alarm.attendee && alarm.action.toUpperCase() === "EMAIL") {
      attendee = `mailto:${alarm.attendee}`;
    } else if (
      alarm &&
      alarm.attendee &&
      alarm.action.toUpperCase() === "SMS"
    ) {
      attendee = `sms:${alarm.attendee}`;
    } else {
      throw new Error(
        `Action can only be of type EMAIL or SMS: ${alarm.action}`
      );
    }

    let valarm = "BEGIN:VALARM\n";
    valarm += `ACTION:${alarm.action.toUpperCase()}\n`;
    if (alarm && alarm.summary) {
      valarm += `SUMMARY:${alarm.summary}\n`;
    }
    valarm += `ATTENDEE:${attendee}\n`;
    valarm += `DESCRIPTION:${alarm.description}\n`;
    valarm += SimpleCalDAV.toTrigger(alarm.trigger);
    valarm += `END:VALARM\n`;

    return valarm;
  }

  static toVEVENT(evt, alarms) {
    if ("uid" in evt && "start" in evt && "end" in evt && "summary" in evt) {
      let vevent = "BEGIN:VCALENDAR\n";
      vevent += `VERSION:2.0\n`;
      vevent += `PRODID:${prodid}\n`;
      vevent += "BEGIN:VEVENT\n";
      vevent += `UID:${evt.uid}\n`;
      vevent += `DTSTAMP:${SimpleCalDAV.formatDateTime(new Date())}\n`;
      vevent += `DTSTART:${SimpleCalDAV.formatDateTime(evt.start)}\n`;
      vevent += `DTEND:${SimpleCalDAV.formatDateTime(evt.end)}\n`;
      vevent += `SUMMARY:${evt.summary}\n`;
      if (alarms) {
        vevent += alarms;
      }
      if (evt._status) {
        if (allowedVEVENTStatus.includes(evt._status)) {
          vevent += `STATUS:${evt._status}\n`;
        } else {
          throw new ParserError(
            `Your status "${evt._status}" is not an allowed status for a VEVENT`
          );
        }
      }
      if (evt.organizer && evt.organizer.email) {
        if (evt.organizer.commonName) {
          vevent += `ORGANIZER;CN=${evt.organizer.commonName}:mailto:${
            evt.organizer.email
          }\n`;
        } else {
          vevent += `ORGANIZER:mailto:${evt.organizer.email}\n`;
        }
      }
      if (evt._location) {
        vevent += `LOCATION:${evt._location}\n`;
      }
      vevent += "END:VEVENT\n";
      vevent += "END:VCALENDAR";
      return vevent;
    } else {
      throw new ParserError("Mandatory keys in event missing");
    }
  }

  async handleEvent(
    start,
    end,
    summary,
    alarms,
    _status,
    organizer,
    _location,
    method,
    uid = ""
  ) {
    if (!uid) {
      // NOTE: It's recommended to add a `@host.com` postfix to the uid. Since,
      // however, this lib will be used by a multitude of clients and since other
      // implementations neither add a postfix (e.g. Thunderbird's caldav plugin),
      // we've taken the freedom to leave it out too.
      uid = uuidv4();
    }
    if (alarms) {
      alarms = alarms.map(SimpleCalDAV.toVALARM).join("");
    }

    const body = SimpleCalDAV.toVEVENT(
      { start, end, summary, uid, _status, organizer, _location },
      alarms
    );

    let headers = {
      "Content-Type": "text/calendar; charset=utf-8"
    };

    if (method === "create") {
      headers = { ...headers, ...{ "If-None-Match": "*" } };
    } else if (method === "update") {
      // TODO: Does it make sense to use Etags here?
      // noop
    } else {
      throw new InternalError(`method "${method}" not implemented`);
    }

    return await fetch(`${this.uri}/${uid}.ics`, {
      method: "PUT",
      headers,
      ...this.options,
      body
    });
  }

  async getEvent(uid, transform = SimpleCalDAV.simplifyEvent) {
    const href = `${this.uri}/${uid}.ics`;
    const res = await fetch(href, {
      method: "GET",
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      },
      ...this.options
    });
    let evt = await res.text();
    evt = SimpleCalDAV.parseICS(evt);
    return transform(evt, href);
  }

  async listEvents(transform = SimpleCalDAV.simplifyEvent) {
    const res = await fetch(this.uri, {
      method: "REPORT",
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      },
      ...this.options,
      body: `
        <c:calendar-query xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
           <d:prop>
            <d:getetag />
            <c:calendar-data />
          </d:prop>
          <c:filter>
            <c:comp-filter name="VCALENDAR" />
          </c:filter>
        </c:calendar-query>`
    });

    const text = await res.text();
    const doc = new xmldoc.XmlDocument(text);

    const responses = doc.childrenNamed("response");
    let events = responses.map(node => {
      const href = this.uri + node.valueWithPath("href");
      let evt = node.valueWithPath("propstat.prop.C:calendar-data");
      evt = SimpleCalDAV.parseICS(evt);
      return transform(evt, href);
    });

    return events;
  }

  static parseICS(evt) {
    let parsedCal;
    try {
      parsedCal = parse(evt);
    } catch (err) {
      if (err && err.name === "ParserError") {
        throw new ParserError(err.message);
        return;
      } else {
        console.warn(err);
        throw err;
      }
    }

    const comp = new Component(parsedCal);
    const vevent = comp.getFirstSubcomponent("vevent");
    return vevent;
  }

  static genETag(s) {
    return sha1(s);
  }

  static parseTrigger(trigger) {
    if (trigger instanceof Time) {
      return trigger.toJSDate();
    } else if (trigger instanceof Duration) {
      return {
        weeks: trigger.weeks,
        days: trigger.days,
        hours: trigger.hours,
        minutes: trigger.minutes,
        seconds: trigger.seconds,
        isNegative: trigger.isNegative
      };
    } else {
      throw new InputError(
        "`trigger` argument wasn't of instance Duration or Time"
      );
    }
  }

  static simplifyEvent(evt, href) {
    let palarms = [];
    let finalEvent = { href };

    let valarms = evt.getAllSubcomponents("valarm");
    valarms = valarms
      .map(alarm => {
        const trigger = SimpleCalDAV.parseTrigger(
          alarm.getFirstPropertyValue("trigger")
        );

        const action = alarm.getFirstPropertyValue("action");
        const attendee = alarm.getFirstPropertyValue("attendee");
        let res = {
          action,
          trigger,
          description: alarm.getFirstPropertyValue("description"),
          subject: alarm.getFirstPropertyValue("subject")
        };

        const mailtoExpr = new RegExp(".*mailto:(.+)$", "i");
        const smsExpr = new RegExp(".*sms:(.+)$", "i");
        if (action === "EMAIL" && mailtoExpr.test(attendee)) {
          const [_, email] = attendee.match(mailtoExpr);
          res.attendee = email;
        } else if (action === "SMS" && smsExpr.test(attendee)) {
          const [_, phone] = attendee.match(smsExpr);
          res.attendee = phone;
        }

        return res;
      })
      .filter(alarm => !!alarm);
    finalEvent.alarms = valarms;

    const pevent = new Event(evt);
    finalEvent.summary = pevent.summary;
    finalEvent.location = pevent._firstProp("location");
    finalEvent.start = pevent.startDate.toJSDate();
    finalEvent.end = pevent.endDate.toJSDate();

    const orgProp = evt.getFirstProperty("organizer");
    let email, commonName;
    if (orgProp) {
      const orgMail = orgProp.getFirstValue("organizer");
      email = orgMail.match(new RegExp("mailto:(.*)", "i"))[1];
      commonName = orgProp.getParameter("cn");
    }

    if (email) {
      finalEvent.organizer = { email };
    }
    if (email && commonName) {
      finalEvent.organizer = { email, commonName };
    }
    // NOTE: https://github.com/mozilla-comm/ical.js/issues/452
    finalEvent._status = pevent._firstProp("status");
    return finalEvent;
  }

  // NOTE: Formatting to ical's special datetime means losing milli-second
  // precision!
  static formatDateTime(dateTime) {
    // NOTE: See https://tools.ietf.org/html/rfc5545 under:
    // "FORM #2: DATE WITH UTC TIME"
    // For explaination of the time zone shift below, visit:
    // https://stackoverflow.com/a/63227335/1263876
    const timeZone = "UTC";
    return format(utcToZonedTime(dateTime, timeZone), "yyyyMMdd'T'HHmmss'Z'", {
      timeZone
    });
  }

  async getSyncToken() {
    const res = await fetch(this.uri, {
      method: "PROPFIND",
      headers: {
        Depth: 0,
        "Content-Type": "application/xml; charset=utf-8"
      },
      ...this.options,
      body: `
        <d:propfind xmlns:d="DAV:" xmlns:cs="http://calendarserver.org/ns/">
          <d:prop>
            <d:displayname />
            <cs:getctag />
            <d:sync-token />
          </d:prop>
        </d:propfind>
      `
    });
    const text = await res.text();
    const doc = new xmldoc.XmlDocument(text);
    const syncToken = doc.valueWithPath("response.propstat.prop.sync-token");
    const displayName = doc.valueWithPath("response.propstat.prop.displayname");
    // NOTE: For radicale, each calendar has its own resource URI. This means
    // requesting the sync token will never yield more than one display name or
    // syncToken.
    return {
      syncToken,
      displayName
    };
  }

  async syncCollection(syncToken) {
    let body;
    if (syncToken) {
      body = `<?xml version="1.0" encoding="utf-8" ?>
<d:sync-collection xmlns:d="DAV:">
  <d:sync-token>${syncToken}</d:sync-token>
  <d:sync-level>1</d:sync-level>
  <d:prop>
    <d:getetag/>
  </d:prop>
</d:sync-collection>`;
    } else {
      body = `<?xml version="1.0" encoding="utf-8" ?>
<d:sync-collection xmlns:d="DAV:">
  <d:sync-token/>
  <d:sync-level>1</d:sync-level>
  <d:prop>
    <d:getetag/>
  </d:prop>
</d:sync-collection>
      `;
    }
    const res = await fetch(this.uri, {
      method: "REPORT",
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      },
      ...this.options,
      body
    });

    const text = await res.text();
    const doc = new xmldoc.XmlDocument(text);
    const docSyncToken = doc.valueWithPath("sync-token");
    const responses = doc.childrenNamed("response");

    const values = {
      href: [],
      etag: [],
      status: []
    };
    const collection = responses.map(node => {
      const status = node.valueWithPath("propstat.status");
      let [_, statusCode] = status.match(new RegExp("HTTP\\/1\\.1 (\\d{3})"));
      statusCode = parseInt(statusCode);

      return {
        href: node.valueWithPath("href"),
        etag: node.valueWithPath("propstat.prop.getetag"),
        statusCode
      };
    });

    return {
      syncToken: docSyncToken,
      collection
    };
  }
}

module.exports = {
  SimpleCalDAV,
  errors: {
    ParserError,
    ServerError,
    InputError
  }
};
