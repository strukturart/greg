import localforage from "localforage";
import ICAL from "ical.js";
import { formatTimeWithTimeZone } from "./assets/js/eximport.js";
import { events } from "./app.js";
localforage.setDriver(localforage.INDEXEDDB);

const channel = new BroadcastChannel("sw-messages");

const parse_ics = async function (
  data,
  isSubscription,
  etag,
  url,
  account_id,
  isCaldav,
  alarm
) {
  let jcalData;
  try {
    jcalData = ICAL.parse(data);
  } catch (e) {
    console.log("parser error" + e);
  }

  var comp = new ICAL.Component(jcalData);
  var valarm = comp.getAllSubcomponents("VALARM");
  valarm.forEach(function (ite) {});

  var vevent = comp.getAllSubcomponents("vevent");
  let calendar_name = comp.getFirstPropertyValue("x-wr-calname") || "";

  vevent.forEach(function (ite) {
    let n = "";
    let rr_until = "";

    let f = ite.getFirstPropertyValue("dtstart");

    if (
      typeof ite.getFirstPropertyValue("rrule") == "object" &&
      ite.getFirstPropertyValue("rrule") != null &&
      ite.getFirstPropertyValue("rrule").freq != null
    ) {
      n = ite.getFirstPropertyValue("rrule");
      if (n.until != null) {
        rr_until = n.until;
      }
    }

    let dateStart, timeStart, dateStartUnix;

    if (ite.getFirstPropertyValue("dtstart")) {
      dateStart = dayjs(ite.getFirstPropertyValue("dtstart")).format(
        "YYYY-MM-DD"
      );
      timeStart = dayjs(ite.getFirstPropertyValue("dtstart")).format(
        "HH:mm:ss"
      );
      dateStartUnix =
        new Date(ite.getFirstPropertyValue("dtstart")).getTime() / 1000;
    }

    //date end
    let dateEnd, timeEnd, dateEndUnix;
    if (ite.getFirstPropertyValue("dtend")) {
      dateEnd = dayjs(ite.getFirstPropertyValue("dtend")).format("YYYY-MM-DD");
      timeEnd = dayjs(ite.getFirstPropertyValue("dtend")).format("HH:mm:ss");
      dateEndUnix =
        new Date(ite.getFirstPropertyValue("dtend")).getTime() / 1000;

      if (rr_until != "") {
        dateEnd = dayjs(n.until).format("YYYY-MM-DD");
        timeEnd = dayjs(n.until).format("HH:mm:ss");
        dateEndUnix = new Date(n.until).getTime() / 1000;
      }
    }

    //allDay event
    let allday = false;

    if (
      ite.getFirstPropertyValue("dtstart").isDate &&
      ite.getFirstPropertyValue("dtend").isDate
    ) {
      allday = true;

      //allDay hack
      //the end date of an allday event is moved to the next day, i don't know why. hence this ugly correction
      //start
      let k = ite.getFirstPropertyValue("dtstart").toJSDate();
      dateStart = dayjs(k).format("YYYY-MM-DD");
      timeStart = dayjs(k).format("HH:mm:ss");
      dateStartUnix = k.getTime() / 1000;

      //end
      let f = ite.getFirstPropertyValue("dtend").toJSDate();
      f = new Date(dayjs(f).subtract(1, "day"));
      dateEnd = dayjs(f).format("YYYY-MM-DD");
      timeEnd = dayjs(f).format("HH:mm:ss");
      dateEndUnix = f.getTime() / 1000;
    }

    let lastmod = ite.getFirstPropertyValue("last-modified");
    let dtstart = ite.getFirstPropertyValue("dtstart");
    let dtend = ite.getFirstPropertyValue("dtend");

    if (account_id === "local-id") {
      dtstart = formatTimeWithTimeZone(ite.getFirstPropertyValue("dtstart"));
      dtend = formatTimeWithTimeZone(ite.getFirstPropertyValue("dtend"));
      lastmod = formatTimeWithTimeZone(
        ite.getFirstPropertyValue("last-modified")
      );
    }
    //todo remove more key:values
    let imp = {
      BEGIN: "VEVENT",
      UID: ite.getFirstPropertyValue("uid"),
      SUMMARY: ite.getFirstPropertyValue("summary"),
      LOCATION: ite.getFirstPropertyValue("location"),
      DESCRIPTION: ite.getFirstPropertyValue("description"),
      CATEGORIES: ite.getFirstPropertyValue("categories") ?? "",
      ATTACH: ite.getFirstPropertyValue("attach"),
      RRULE: ite.getFirstPropertyValue("rrule") ?? "",
      "LAST-MODIFIED": lastmod,
      CLASS: ite.getFirstPropertyValue("class") ?? "",
      DTSTAMP: dtstart,
      DTSTART: dtstart,
      DTEND: dtend,
      END: "VEVENT",
      isSubscription: isSubscription,
      lastmod: lastmod,
      isCaldav: isCaldav,
      allDay: allday,
      dateStart: dateStart,
      dateStartUnix: dateStartUnix,
      dateEnd: dateEnd,
      time_start: timeStart,
      time_end: timeEnd,
      alarm: alarm || "none",
      rrule_json: n,
      etag: etag,
      url: url,
      calendar_name: calendar_name,
      id: account_id,
    };
    events.push(imp);
  });
};
/*
localforage.getItem("accounts").then(async (a) => {
  for (const item of a) {
    try {
      const w = await localforage.getItem(item.id);

      for (const b of w) {
        for (const m of b.objects) {
          await parse_ics(m.data, false, m.etag, m.url, item.id, true, "");
        }
      }
    } catch (e) {
      channel.postMessage({
        error: e,
      });
    }
  }

  channel.postMessage({
    success: "done",
  });
});
*/

self.onsystemmessage = (evt) => {
  try {
    let m = evt.data.json();
    self.registration.showNotification("Greg", {
      body: m.data.note,
    });
  } catch (e) {}

  try {
    const serviceHandler = () => {
      if (evt.name === "activity") {
        handler = evt.data.webActivityRequestHandler();
        const { name: activityName, data: activityData } = handler.source;
        if (activityName == "greg-oauth") {
          let code = activityData.code;

          const url = "/oauth.html?code=" + code;
          channel.postMessage({
            oauth_success: url,
          });
        }
      }
    };
    evt.waitUntil(serviceHandler());
  } catch (e) {}
};
