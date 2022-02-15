// @format
const test = require("ava");
const createWorker = require("expressively-mocked-fetch");
const add = require("date-fns/add");
const sub = require("date-fns/sub");
const moment = require("moment");
const { Time, Duration } = require("ical.js");

const {
  SimpleCalDAV,
  errors: { ParserError, ServerError, InputError }
} = require("../src/index.js");

test("if parameters are correctly stored", t => {
  const URI = "https://example.com";
  const dav = new SimpleCalDAV(URI);

  t.assert(dav.uri === URI);
});

test("if objects are correctly exported", t => {
  const libObj = require("../src/index.js");

  t.assert("errors" in libObj);
  t.assert("SimpleCalDAV" in libObj);
  t.assert("ParserError" in libObj.errors);
  t.assert("ServerError" in libObj.errors);
  t.assert("InputError" in libObj.errors);
});

test("test fetching empty calendar", async t => {
  const worker = await createWorker(`
    app.report('/', function (req, res) {
      res.send(\`
<?xml version="1.0" encoding="UTF-8"?>
<multistatus xmlns="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
   <response>
      <href>/radicale/example%40gmail.com/8409b6d2-8dcc-997b-45d6-517801237d38/50113370-f61f-4444-9e94-e3ba1d2467b8.ics</href>
      <propstat>
         <prop>
            <getetag>"aa98130e9fac911f70a73dac8b57e58a482b04ec4b8a5417dfedf8f42069c6d0"</getetag>
            <C:calendar-data>
              BEGIN:VCALENDAR
              VERSION:2.0
              PRODID: blaaa
              END:VCALENDAR
						</C:calendar-data>
         </prop>
         <status>HTTP/1.1 200 OK</status>
      </propstat>
   </response>
</multistatus>
      \`);
    });
  `);

  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  await t.throwsAsync(
    async () => {
      await dav.listEvents();
    },
    { instanceOf: ParserError }
  );
});

test("fetching ics-incompatible response", async t => {
  const worker = await createWorker(`
    app.report('/', function (req, res) {
      res.send(\`
        <xml>
          hello world
        </xml>
      \`);
    });
  `);

  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const events = await dav.listEvents();
  t.assert(events.length === 0);
});

test("fetching calendar single event without an alarm", async t => {
  const summary = "Work on this lib";
  const description = "description";
  const time = "20200729T130856Z";
  const subject = "bla";
  const _location = "Friedrichstrasse 3, 46145 Oberhausen Stadtmitte";
  const href =
    "/radicale/example%40gmail.com/8409b6d2-8dcc-997b-45d6-517801237d38/50113370-f61f-4444-9e94-e3ba1d2467b8.ics";
  const organizer = {
    commonName: "John Smith",
    email: "john@smith.de"
  };
  const worker = await createWorker(`
    app.report('/', function (req, res) {
      res.send(\`
<?xml version="1.0" encoding="UTF-8"?>
<multistatus xmlns="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
   <response>
      <href>${href}</href>
      <propstat>
         <prop>
            <getetag>"aa98130e9fac911f70a73dac8b57e58a482b04ec4b8a5417dfedf8f42069c6d0"</getetag>
            <C:calendar-data>BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mozilla.org/NONSGML Mozilla Calendar V1.1//EN
BEGIN:VTIMEZONE
TZID:Europe/Berlin
BEGIN:STANDARD
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10
TZNAME:CET
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3
TZNAME:CEST
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:50113370-f61f-4444-9e94-e3ba1d2467b8
DTSTART;TZID=Europe/Berlin:20200717T100000
DTEND;TZID=Europe/Berlin:20200717T133000
CREATED:20200717T143449Z
DTSTAMP:20200717T143454Z
LAST-MODIFIED:20200717T143454Z
STATUS:TENTATIVE
ORGANIZER;CN=${organizer.commonName}:mailto:${organizer.email}
SUMMARY:${summary}
LOCATION:${_location}
TRANSP:OPAQUE
X-MOZ-GENERATION:1
END:VEVENT
END:VCALENDAR</C:calendar-data>
         </prop>
         <status>HTTP/1.1 200 OK</status>
      </propstat>
   </response>
</multistatus>
      \`); 
    });
  `);

  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const events = await dav.listEvents();
  t.assert(events.length === 1);
  t.assert(events[0].summary === summary);
  t.assert(events[0].start instanceof Date);
  t.assert(events[0].end instanceof Date);
  t.assert(events[0].alarms.length === 0);
  t.assert(events[0]._status === "TENTATIVE");
  t.assert(events[0].location === _location);
  t.assert(events[0].href === URI + href);
  t.deepEqual(events[0].organizer, organizer);
});

test("fetching calendar single event without an alarm and without a status and a location", async t => {
  const summary = "Work on this lib";
  const description = "description";
  const time = "20200729T130856Z";
  const subject = "bla";
  const worker = await createWorker(`
    app.report('/', function (req, res) {
      res.send(\`
<?xml version="1.0" encoding="UTF-8"?>
<multistatus xmlns="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
   <response>
      <href>/radicale/example%40gmail.com/8409b6d2-8dcc-997b-45d6-517801237d38/50113370-f61f-4444-9e94-e3ba1d2467b8.ics</href>
      <propstat>
         <prop>
            <getetag>"aa98130e9fac911f70a73dac8b57e58a482b04ec4b8a5417dfedf8f42069c6d0"</getetag>
            <C:calendar-data>BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mozilla.org/NONSGML Mozilla Calendar V1.1//EN
BEGIN:VTIMEZONE
TZID:Europe/Berlin
BEGIN:STANDARD
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10
TZNAME:CET
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3
TZNAME:CEST
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:50113370-f61f-4444-9e94-e3ba1d2467b8
DTSTART;TZID=Europe/Berlin:20200717T100000
DTEND;TZID=Europe/Berlin:20200717T133000
CREATED:20200717T143449Z
DTSTAMP:20200717T143454Z
LAST-MODIFIED:20200717T143454Z
SUMMARY:${summary}
TRANSP:OPAQUE
X-MOZ-GENERATION:1
END:VEVENT
END:VCALENDAR</C:calendar-data>
         </prop>
         <status>HTTP/1.1 200 OK</status>
      </propstat>
   </response>
</multistatus>
      \`); 
    });
  `);

  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const events = await dav.listEvents();
  t.assert(events.length === 1);
  t.assert(events[0].summary === summary);
  t.assert(events[0].start instanceof Date);
  t.assert(events[0].end instanceof Date);
  t.assert(events[0].alarms.length === 0);
  t.assert("_status" in events[0]);
  t.assert(events[0]._status === null);
});

test("fetching calendar single event with a relative alarm trigger", async t => {
  const summary = "Work on this lib";
  const action = "EMAIL";
  const attendee = "attendee@mail.org";
  const description = "description";
  const time = "20200729T130856Z";
  const subject = "bla";
  const worker = await createWorker(`
    app.report('/', function (req, res) {
      res.send(\`
<?xml version="1.0" encoding="UTF-8"?>
<multistatus xmlns="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
   <response>
      <href>/radicale/example%40gmail.com/8409b6d2-8dcc-997b-45d6-517801237d38/50113370-f61f-4444-9e94-e3ba1d2467b8.ics</href>
      <propstat>
         <prop>
            <getetag>"aa98130e9fac911f70a73dac8b57e58a482b04ec4b8a5417dfedf8f42069c6d0"</getetag>
            <C:calendar-data>BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mozilla.org/NONSGML Mozilla Calendar V1.1//EN
BEGIN:VTIMEZONE
TZID:Europe/Berlin
BEGIN:STANDARD
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10
TZNAME:CET
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3
TZNAME:CEST
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:50113370-f61f-4444-9e94-e3ba1d2467b8
DTSTART;TZID=Europe/Berlin:20200717T100000
DTEND;TZID=Europe/Berlin:20200717T133000
CREATED:20200717T143449Z
DTSTAMP:20200717T143454Z
LAST-MODIFIED:20200717T143454Z
SUMMARY:${summary}
STATUS:CONFIRMED
TRANSP:OPAQUE
X-MOZ-GENERATION:1
BEGIN:VALARM
ACTION:EMAIL
DESCRIPTION:Email reminder with relative trigger
ATTENDEE:mailto:${attendee}
TRIGGER:-PT15M
END:VALARM
END:VEVENT
END:VCALENDAR</C:calendar-data>
         </prop>
         <status>HTTP/1.1 200 OK</status>
      </propstat>
   </response>
</multistatus>
      \`); 
    });
  `);
  //TRIGGER;VALUE=DATE-TIME:20200729T140856Z
  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const events = await dav.listEvents();
  t.assert(events.length === 1);
  t.assert(events[0].summary === summary);
  t.assert(events[0].start instanceof Date);
  t.assert(events[0].end instanceof Date);
  t.assert(events[0].alarms.length === 1);
  t.assert(events[0]._status === "CONFIRMED");
});

test("fetching calendar single event", async t => {
  const summary = "Work on this lib";
  const action = "EMAIL";
  const attendee = "attendee@mail.org";
  const description = "description";
  const time = "20200729T130856Z";
  const subject = "bla";
  const _location = "Friedrichstrasse 3, 46145 Oberhausen Stadtmitte";
  const organizer = {
    commonName: "John Smith",
    email: "john@smith.com"
  };
  const worker = await createWorker(`
    app.report('/', function (req, res) {
      res.send(\`
<?xml version="1.0" encoding="UTF-8"?>
<multistatus xmlns="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
   <response>
      <href>/radicale/example%40gmail.com/8409b6d2-8dcc-997b-45d6-517801237d38/50113370-f61f-4444-9e94-e3ba1d2467b8.ics</href>
      <propstat>
         <prop>
            <getetag>"aa98130e9fac911f70a73dac8b57e58a482b04ec4b8a5417dfedf8f42069c6d0"</getetag>
            <C:calendar-data>BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mozilla.org/NONSGML Mozilla Calendar V1.1//EN
BEGIN:VTIMEZONE
TZID:Europe/Berlin
BEGIN:STANDARD
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10
TZNAME:CET
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3
TZNAME:CEST
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:50113370-f61f-4444-9e94-e3ba1d2467b8
DTSTART;TZID=Europe/Berlin:20200717T100000
DTEND;TZID=Europe/Berlin:20200717T133000
CREATED:20200717T143449Z
DTSTAMP:20200717T143454Z
LAST-MODIFIED:20200717T143454Z
SUMMARY:${summary}
TRANSP:OPAQUE
X-MOZ-GENERATION:1
STATUS:CONFIRMED
LOCATION:${_location}
ORGANIZER;CN=${organizer.commonName}:mailto:${organizer.email}
BEGIN:VALARM
ACTION:${action}
ATTENDEE:mailto:${attendee}
DESCRIPTION:${description}
TRIGGER;VALUE=DATE-TIME:${time}
END:VALARM
BEGIN:VALARM
ACTION:EMAIL
ATTENDEE:mailto:me@example.com
SUBJECT:${subject}
DESCRIPTION:A email body
TRIGGER;VALUE=DATE-TIME:20200729T140856Z
END:VALARM
END:VEVENT
END:VCALENDAR</C:calendar-data>
         </prop>
         <status>HTTP/1.1 200 OK</status>
      </propstat>
   </response>
</multistatus>
      \`); 
    });
  `);

  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const events = await dav.listEvents();
  t.assert(events.length === 1);
  t.assert(events[0].summary === summary);
  t.assert(events[0].start instanceof Date);
  t.assert(events[0].end instanceof Date);
  t.assert(events[0]._status === "CONFIRMED");
  t.deepEqual(events[0].organizer, organizer);
  t.assert((events[0].location = _location));
  t.assert(events[0].alarms.length === 2);
  t.assert(events[0].alarms[0].action === action);
  t.assert(events[0].alarms[0].attendee === attendee);
  t.assert(events[0].alarms[0].trigger instanceof Date);

  t.assert(events[0].alarms[1].subject === subject);
});

test("fetching calendar with multiple events", async t => {
  const summary = "Work on this lib";

  const worker = await createWorker(`
    app.report('/', function (req, res) {
      res.send(\`
<?xml version="1.0" encoding="UTF-8"?>
<multistatus xmlns="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
   <response>
      <href>/radicale/example%40gmail.com/8409b6d2-8dcc-997b-45d6-517801237d38/50113370-f61f-4444-9e94-e3ba1d2467b8.ics</href>
      <propstat>
         <prop>
            <getetag>"aa98130e9fac911f70a73dac8b57e58a482b04ec4b8a5417dfedf8f42069c6d0"</getetag>
            <C:calendar-data>BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mozilla.org/NONSGML Mozilla Calendar V1.1//EN
BEGIN:VTIMEZONE
TZID:Europe/Berlin
BEGIN:STANDARD
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10
TZNAME:CET
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3
TZNAME:CEST
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
STATUS:TENTATIVE
UID:50113370-f61f-4444-9e94-e3ba1d2467b8
DTSTART;TZID=Europe/Berlin:20200717T100000
DTEND;TZID=Europe/Berlin:20200717T133000
CREATED:20200717T143449Z
DTSTAMP:20200717T143454Z
LAST-MODIFIED:20200717T143454Z
SUMMARY:${summary}
TRANSP:OPAQUE
X-MOZ-GENERATION:1
END:VEVENT
END:VCALENDAR</C:calendar-data>
         </prop>
         <status>HTTP/1.1 200 OK</status>
      </propstat>
   </response>
   <response>
      <href>/radicale/example%40gmail.com/8409b6d2-8dcc-997b-45d6-517801237d38/105b112e-7d65-3147-a182-deaf17d08a12.ics</href>
      <propstat>
         <prop>
            <getetag>"86b95c0081a021570746219276242ba6fb5b59632260d3ef1740d37c2ce806f2"</getetag>
            <C:calendar-data>BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mozilla.org/NONSGML Mozilla Calendar V1.1//EN
BEGIN:VTIMEZONE
TZID:Europe/Berlin
BEGIN:STANDARD
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10
TZNAME:CET
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3
TZNAME:CEST
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
STATUS:CONFIRMED
UID:105b112e-7d65-3147-a182-deaf17d08a12
DTSTART;TZID=Europe/Berlin:20200718T094500
DTEND;TZID=Europe/Berlin:20200718T131500
CREATED:20200717T143444Z
DTSTAMP:20200717T143446Z
LAST-MODIFIED:20200717T143446Z
SUMMARY:Biketour
TRANSP:OPAQUE
X-MOZ-GENERATION:1
END:VEVENT
END:VCALENDAR</C:calendar-data>
         </prop>
         <status>HTTP/1.1 200 OK</status>
      </propstat>
   </response>
</multistatus>
      \`); 
    });
  `);

  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const events = await dav.listEvents();
  t.assert(events.length === 2);
  t.assert(events[0].summary === summary);
  t.assert(events[0].start instanceof Date);
  t.assert(events[0].end instanceof Date);
  t.assert(events[0]._status === "TENTATIVE");
  t.assert(events[1]._status === "CONFIRMED");
});

test("formatting a date to iCal compliant date time", t => {
  // NOTE: For reference, see https://tools.ietf.org/html/rfc5545 under:
  // "FORM #2: DATE WITH UTC TIME"
  const expected = new Date();
  const formatted = SimpleCalDAV.formatDateTime(expected);
  const format = new RegExp(
    "[0-9]{4}[0-1][0-9][0-3][0-9]T[0-2][0-9][0-6][0-9]\\d{2}Z"
  );
  t.assert(format.test(formatted));
  // NOTE: We import moment here as a dev dependency as it was originally used
  // by simple-caldav to create the iCAL UTC time stamp
  const converted = moment(expected)
    .utc()
    .format("YMMDDTHHmmss[Z]");
  t.assert(converted === formatted);
});

test("creating an event", async t => {
  const worker = await createWorker(`
    app.put('/:resource', function (req, res) {
      res.status(201).send();
    });
  `);
  const URI = `http://localhost:${worker.port}`;

  const dav = new SimpleCalDAV(URI);
  const start = new Date();
  const end = add(new Date(), { hours: 1 });
  const res = await dav.createEvent(start, end, "test summary");
  t.assert(res.status === 201);
});

test("creating an event with alarm", async t => {
  const worker = await createWorker(`
    app.put('/:resource', function (req, res) {
      if (req.body.includes(":mailto:mailto:")) {
        return res.status(500).send();
      }
      res.status(201).send();
    });
  `);
  const URI = `http://localhost:${worker.port}`;

  const dav = new SimpleCalDAV(URI);
  const start = new Date();
  const end = add(new Date(), { hours: 1 });
  const alarms = [
    {
      action: "email",
      summary: "Email's subject",
      description: "email's description",
      trigger: new Date(),
      attendee: "email@example.com"
    },
    {
      action: "email",
      summary: "Email's subject",
      description: "email's description",
      trigger: add(new Date(), { hours: 1 }),
      attendee: "email@example.com"
    }
  ];
  const res = await dav.createEvent(start, end, "test summary", alarms);
  t.assert(res.status === 201);
});

test("updating an event completely", async t => {
  const uid = "6720d455-76aa-4740-8766-c064df95bb3b";
  const worker = await createWorker(`
    app.put('/${uid}.ics', function (req, res) {
      res.status(201).send();
    });
  `);
  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const start = new Date();
  const end = add(new Date(), { hours: 1 });
  const res = await dav.updateEvent(uid, start, end, "updated summary");
  t.assert(res.status === 201);
});

test("transforming an event without alarms to a VEVENT", t => {
  const evt = {
    start: new Date(),
    end: new Date(),
    summary: "abc",
    uid: "uid",
    _status: "CONFIRMED",
    _location: "Friedrichstrasse 3, 46145 Oberhausen Stadtmitte",
    organizer: {
      commonName: "John Smith",
      email: "john@smith.com"
    }
  };
  const vevent = SimpleCalDAV.toVEVENT(evt);
  t.assert(new RegExp("UID:uid\\n").test(vevent));
  t.assert(new RegExp("SUMMARY:abc\\n").test(vevent));
  t.assert(new RegExp("DTSTART:\\d{8}T\\d{6}Z\\n").test(vevent));
  t.assert(new RegExp("DTEND:\\d{8}T\\d{6}Z\\n").test(vevent));
  t.assert(new RegExp("DTSTAMP:\\d{8}T\\d{6}Z\\n").test(vevent));
  t.assert(new RegExp("STATUS:CONFIRMED\\n").test(vevent));
  t.assert(new RegExp(`LOCATION:${evt._location}\\n`).test(vevent));
  t.assert(
    new RegExp(
      `ORGANIZER;CN=${evt.organizer.commonName}:mailto:${
        evt.organizer.email
      }\\n`
    ).test(vevent)
  );
});

test("transforming an event with an organizer and no common name", t => {
  const evt = {
    start: new Date(),
    end: new Date(),
    summary: "abc",
    uid: "uid",
    _status: "CONFIRMED",
    organizer: {
      email: "john@smith.com"
    }
  };
  const vevent = SimpleCalDAV.toVEVENT(evt);
  t.assert(
    new RegExp(`ORGANIZER:mailto:${evt.organizer.email}\\n`).test(vevent)
  );
});

test("transforming an email alarm into a VALARM", t => {
  const alarm = {
    action: "email",
    summary: "Email's subject",
    description: "email's description",
    trigger: new Date(),
    attendee: "email@example.com"
  };

  const valarm = SimpleCalDAV.toVALARM(alarm);
  t.assert(new RegExp("ACTION:EMAIL").test(valarm));
  t.assert(new RegExp(`SUMMARY:${alarm.summary}`).test(valarm));
  t.assert(new RegExp(`DESCRIPTION:${alarm.description}`).test(valarm));
  t.assert(new RegExp("TRIGGER;VALUE=DATE-TIME:\\d{8}T\\d{6}Z").test(valarm));
  t.assert(new RegExp(`ATTENDEE:mailto:${alarm.attendee}`).test(valarm));
});

test("transforming an email alarm with a relative trigger into a VALARM", t => {
  const alarm = {
    action: "email",
    summary: "Email's subject",
    description: "email's description",
    trigger: {
      minutes: 15,
      isNegative: true
    },
    attendee: "email@example.com"
  };

  const valarm = SimpleCalDAV.toVALARM(alarm);
  t.assert(new RegExp("ACTION:EMAIL").test(valarm));
  t.assert(new RegExp(`SUMMARY:${alarm.summary}`).test(valarm));
  t.assert(new RegExp(`DESCRIPTION:${alarm.description}`).test(valarm));
  t.assert(new RegExp(`TRIGGER:-PT${alarm.trigger.minutes}M`).test(valarm));
  t.assert(new RegExp(`ATTENDEE:mailto:${alarm.attendee}`).test(valarm));
});

test("transforming an object to a negative relative trigger", t => {
  const trigger = {
    minutes: 15,
    isNegative: true
  };

  const actual = SimpleCalDAV.toTrigger(trigger);
  t.assert(new RegExp(`TRIGGER:-PT${trigger.minutes}M`).test(actual));
});

test("transforming an object to a positive relative trigger", t => {
  const trigger = {
    minutes: 15,
    isNegative: false
  };

  const actual = SimpleCalDAV.toTrigger(trigger);
  t.assert(new RegExp(`TRIGGER:PT${trigger.minutes}M`).test(actual));
});

test("if transforming into a trigger fails if input is incorrect", t => {
  const wrong = {
    hello: "world"
  };

  t.throws(() => SimpleCalDAV.toTrigger(wrong), { instanceOf: InputError });
});

test("transforming date to absolute trigger", t => {
  const actual = SimpleCalDAV.toTrigger(new Date());
  t.assert(new RegExp("TRIGGER;VALUE=DATE-TIME:\\d{8}T\\d{6}Z").test(actual));
});

test("transforming an sms alarm into a VALARM", t => {
  const alarm = {
    action: "sms",
    description: "sms's description",
    trigger: new Date(),
    attendee: "0123456789"
  };

  const valarm = SimpleCalDAV.toVALARM(alarm);
  t.assert(new RegExp("ACTION:SMS\\n").test(valarm));
  t.assert(new RegExp(`DESCRIPTION:${alarm.description}\\n`).test(valarm));
  t.assert(
    new RegExp("TRIGGER;VALUE=DATE-TIME:\\d{8}T\\d{6}Z\\n").test(valarm)
  );
  t.assert(new RegExp(`ATTENDEE:sms:${alarm.attendee}\\n`).test(valarm));
});

test("getting sync token", async t => {
  const syncToken = "abc";
  const displayName = "displayname";
  const worker = await createWorker(`
    app.propfind('/', function (req, res) {
      res.status(201).send(\`<?xml version='1.0' encoding='utf-8'?>
<multistatus xmlns="DAV:" xmlns:CS="http://calendarserver.org/ns/">
  <response>
    <href>/radicale/example%40gmail.com/8409b6d2-8dcc-997b-45d6-517801237d38/</href>
    <propstat>
      <prop>
        <displayname>${displayName}</displayname>
        <CS:getctag>"09aad437ed2e4b4cd8d700ad410385d9b13e9fd964862d7f2987e4c844237465"</CS:getctag>
        <sync-token>${syncToken}</sync-token>
      </prop>
      <status>HTTP/1.1 200 OK</status>
    </propstat>
  </response>
</multistatus>
      \`);
    });
  `);
  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const token = await dav.getSyncToken();
  t.assert(token.syncToken === syncToken);
  t.assert(token.displayName === displayName);
});

test("getting collection with a sync token", async t => {
  const href = "https://example.com";
  const etag = "etag";
  const status = "HTTP/1.1 200";
  const syncToken1 = "1";
  const syncToken2 = "2";

  // TODO: Also implement test for 404 asset
  const worker = await createWorker(
    `
    let counter = 0;
    app.report('/', function (req, res) {
      if (counter === 0) {
        res.status(201).send(\`<?xml version='1.0' encoding='utf-8'?>
<multistatus xmlns="DAV:">
  <sync-token>${syncToken1}</sync-token>
  <response>
    <href>${href}</href>
    <propstat>
      <prop>
        <getetag>${etag}</getetag>
      </prop>
      <status>${status}</status>
    </propstat>
  </response>
</multistatus>
        \`);
      } else if (counter === 1) {
        res.status(201).send(\`<?xml version='1.0' encoding='utf-8'?>
<multistatus xmlns="DAV:">
  <sync-token>${syncToken2}</sync-token>
</multistatus>
        \`);
      }
      counter++;
    });
  `,
    2
  );
  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const col = await dav.syncCollection();
  t.assert(col.syncToken === syncToken1);
  t.assert(col.collection.length === 1);
  t.assert(col.collection[0].href === href);
  t.assert(col.collection[0].etag === etag);
  t.assert(col.collection[0].statusCode === 200);
  const emptyCol = await dav.syncCollection(col.syncToken);
  t.assert(emptyCol.syncToken === syncToken2);
  t.assert(emptyCol.collection.length === 0);
});

test("getting a single event", async t => {
  const action = "EMAIL";
  const attendee = "attendee@mail.org";
  const description = "description";
  const time = "20200729T130856Z";
  const subject = "bla";
  const _location = "Friedrichstrasse 3, 46145 Oberhausen Stadtmitte";
  const uid = "abc";
  const organizer = {
    email: "john@smith.com",
    commonName: "John Smith"
  };
  const worker = await createWorker(`
    app.get('/:uid', function (req, res) {
      res.status(201).send(\`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TimDaub//simple-caldav//EN
BEGIN:VEVENT
STATUS:CONFIRMED
UID:${uid}
DTSTART:20200729T180000Z
DTEND:20200729T183000Z
DTSTAMP:20200729T130856Z
SUMMARY:new one
LOCATION:${_location}
ORGANIZER;CN=${organizer.commonName}:mailto:${organizer.email}
BEGIN:VALARM
ACTION:${action}
ATTENDEE:mailto:${attendee}
DESCRIPTION:${description}
TRIGGER;VALUE=DATE-TIME:${time}
END:VALARM
BEGIN:VALARM
ACTION:EMAIL
ATTENDEE:mailto:me@example.com
SUBJECT:${subject}
DESCRIPTION:A email body
TRIGGER;VALUE=DATE-TIME:20200729T140856Z
END:VALARM
END:VEVENT
END:VCALENDAR\`);
    });
  `);
  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const evt = await dav.getEvent(uid);
  t.assert("summary" in evt);
  t.assert("start" in evt);
  t.assert("end" in evt);
  t.assert("alarms" in evt);
  t.assert("_status" in evt);
  t.assert("organizer" in evt);
  t.assert("location" in evt);
  t.assert(evt.location === _location);
  t.deepEqual(evt.organizer, organizer);
  t.assert(evt.href === `${URI}/${uid}.ics`);
  t.assert(evt.alarms.length === 2);
  t.assert(evt.alarms[0].action === action);
  t.assert(evt.alarms[0].attendee === attendee);
  t.assert(evt.alarms[0].trigger instanceof Date);

  t.assert(evt.alarms[1].subject === subject);
});

test("getting a single event but without any organizer present", async t => {
  const action = "EMAIL";
  const attendee = "attendee@mail.org";
  const description = "description";
  const time = "20200729T130856Z";
  const subject = "bla";
  const uid = "6720d455-76aa-4740-8766-c064df95bb3b";
  const worker = await createWorker(`
    app.get('/:uid', function (req, res) {
      res.status(201).send(\`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TimDaub//simple-caldav//EN
BEGIN:VEVENT
STATUS:CONFIRMED
UID:${uid}
DTSTART:20200729T180000Z
DTEND:20200729T183000Z
DTSTAMP:20200729T130856Z
SUMMARY:new one
BEGIN:VALARM
ACTION:${action}
ATTENDEE:mailto:${attendee}
DESCRIPTION:${description}
TRIGGER;VALUE=DATE-TIME:${time}
END:VALARM
BEGIN:VALARM
ACTION:EMAIL
ATTENDEE:mailto:me@example.com
SUBJECT:${subject}
DESCRIPTION:A email body
TRIGGER;VALUE=DATE-TIME:20200729T140856Z
END:VALARM
END:VEVENT
END:VCALENDAR\`);
    });
  `);
  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const evt = await dav.getEvent(uid);
  t.assert("summary" in evt);
  t.assert("start" in evt);
  t.assert("end" in evt);
  t.assert("alarms" in evt);
  t.assert("_status" in evt);
  t.assert(!("organizer" in evt));
  t.assert(evt.href === `${URI}/${uid}.ics`);
  t.assert(evt.alarms.length === 2);
  t.assert(evt.alarms[0].action === action);
  t.assert(evt.alarms[0].attendee === attendee);
  t.assert(evt.alarms[0].trigger instanceof Date);

  t.assert(evt.alarms[1].subject === subject);
});

test("getting a single event but only with organizer email present", async t => {
  const action = "EMAIL";
  const attendee = "attendee@mail.org";
  const description = "description";
  const time = "20200729T130856Z";
  const subject = "bla";
  const organizer = { email: "john@smith.com" };
  const uid = "6720d455-76aa-4740-8766-c064df95bb3b";
  const worker = await createWorker(`
    app.get('/:uid', function (req, res) {
      res.status(201).send(\`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TimDaub//simple-caldav//EN
BEGIN:VEVENT
STATUS:CONFIRMED
UID:${uid}
DTSTART:20200729T180000Z
DTEND:20200729T183000Z
DTSTAMP:20200729T130856Z
SUMMARY:new one
ORGANIZER:mailto:${organizer.email}
BEGIN:VALARM
ACTION:${action}
ATTENDEE:mailto:${attendee}
DESCRIPTION:${description}
TRIGGER;VALUE=DATE-TIME:${time}
END:VALARM
BEGIN:VALARM
ACTION:EMAIL
ATTENDEE:mailto:me@example.com
SUBJECT:${subject}
DESCRIPTION:A email body
TRIGGER;VALUE=DATE-TIME:20200729T140856Z
END:VALARM
END:VEVENT
END:VCALENDAR\`);
    });
  `);
  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const evt = await dav.getEvent(uid);
  t.assert("summary" in evt);
  t.assert("start" in evt);
  t.assert("end" in evt);
  t.assert("alarms" in evt);
  t.assert("_status" in evt);
  t.assert("organizer" in evt);
  t.assert(evt.href === `${URI}/${uid}.ics`);
  t.deepEqual(evt.organizer, organizer);
  t.assert(evt.alarms.length === 2);
  t.assert(evt.alarms[0].action === action);
  t.assert(evt.alarms[0].attendee === attendee);
  t.assert(evt.alarms[0].trigger instanceof Date);

  t.assert(evt.alarms[1].subject === subject);
});

test("getting a single event, but server returns html which is valid xml but not valid response", async t => {
  const worker = await createWorker(`
    app.get('/:uid', function (req, res) {
      res.status(200).send("<!doctype html><html></html>");
    });
  `);
  //const URI = `http://example.com/event.ics`;
  const URI =
    "https://cloud1.daubenschuetz.de /radicale/example%40gmail.com/8409b6d2-8dcc-997b-45d6-517801237d38/";
  const dav = new SimpleCalDAV(URI);
  await t.throwsAsync(
    async () => {
      await dav.getEvent("event");
    },
    { instanceOf: ParserError }
  );
});

test("if syncCollection returns collection with correctly ordered properties", async t => {
  const href = "1";
  const href2 = "2";
  const etag = "etag";
  const worker = await createWorker(
    `
    app.report('/', function (req, res) {
      res.status(201).send(\`<?xml version='1.0' encoding='utf-8'?>
<multistatus xmlns="DAV:">
  <sync-token>1</sync-token>
  <response>
    <href>${href}</href>
    <propstat>
      <status>HTTP/1.1 404 Not Found</status>
    </propstat>
  </response>
  <response>
    <href>${href2}</href>
    <propstat>
      <prop>
        <getetag>${etag}</getetag>
      </prop>
      <status>HTTP/1.1 200 OK</status>
    </propstat>
  </response>
</multistatus>\`);
    });
  `
  );
  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const col = await dav.syncCollection();
  t.assert(col.collection[0].statusCode === 404);
  t.assert(col.collection[0].href === href);
  t.assert(!col.collection[0].etag);
  t.assert(col.collection[1].statusCode === 200);
  t.assert(col.collection[1].href === href2);
  t.assert(col.collection[1].etag === etag);
});

test("if single deletion response is detected by parser", async t => {
  const worker = await createWorker(
    `
    app.report('/', function (req, res) {
      res.status(201).send(\`<?xml version='1.0' encoding='utf-8'?>
<multistatus xmlns="DAV:">
  <sync-token>1</sync-token>
  <response>
    <href>a</href>
    <propstat>
      <status>HTTP/1.1 404 Not Found</status>
    </propstat>
  </response>
</multistatus>\`);
    });
  `
  );
  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const { collection } = await dav.syncCollection();
  t.assert(collection.length == 1);
  t.assert(collection[0].href === "a");
  t.assert(collection[0].statusCode === 404);
});

test("submitting incorrect status when transforming to VEVENT", t => {
  const evt = {
    start: new Date(),
    end: new Date(),
    summary: "abc",
    uid: "uid",
    _status: "LOLNOTALLOWED"
  };
  t.throws(() => SimpleCalDAV.toVEVENT(evt), { instanceOf: ParserError });
});

test("extracting uid from href", t => {
  const expected = "6720d455-76aa-4740-8766-c064df95bb3b";
  const href = `/radicale/example%40gmail.com/8409b6d2-8dcc-997b-45d6-517801237d38/${expected}.ics`;
  const uid = SimpleCalDAV.extractUid(href);
  t.assert(uid === expected);
});

test("if two alarms cause a bug where a comma shows up in iCAL result", async t => {
  const worker = await createWorker(`
    app.put('/:resource', function (req, res) {
      if (req.body.includes(",BEGIN:VALARM")) {
        res.status(500).send();
      } else {
        res.status(201).send();
      }
    });
  `);
  const URI = `http://localhost:${worker.port}`;

  const start = new Date();
  const end = add(new Date(), { hours: 1 });
  const alarms = [
    {
      action: "email",
      summary: "Email's subject",
      description: "email's description",
      trigger: new Date(),
      attendee: "email@example.com"
    },
    {
      action: "email",
      summary: "Email's subject",
      description: "email's description",
      trigger: add(new Date(), { hours: 1 }),
      attendee: "email@example.com"
    }
  ];

  const dav = new SimpleCalDAV(URI);
  const res = await dav.createEvent(
    start,
    end,
    "test summary",
    alarms,
    "CONFIRMED"
  );
  t.assert(res.status === 201);
});

test("updating an event to check whether mailto: and sms: multiply", async t => {
  const action = "EMAIL";
  const attendee = "attendee@mail.org";
  const description = "description";
  const time = "20200729T130856Z";
  const subject = "bla";
  const _location = "Friedrichstrasse 3, 46145 Oberhausen Stadtmitte";
  const uid = "abc";
  const phone = "+491795345170";
  const organizer = {
    email: "john@smith.com",
    commonName: "John Smith"
  };
  // NOTE:
  const worker = await createWorker(
    `
    app.get('/:uid', function (req, res) {
      res.status(201).send(\`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TimDaub//simple-caldav//EN
BEGIN:VEVENT
STATUS:CONFIRMED
UID:${uid}
DTSTART:20200729T180000Z
DTEND:20200729T183000Z
DTSTAMP:20200729T130856Z
SUMMARY:new one
LOCATION:${_location}
ORGANIZER;CN=${organizer.commonName}:mailto:${organizer.email}
BEGIN:VALARM
ACTION:${action}
ATTENDEE:mailto:${attendee}
DESCRIPTION:${description}
TRIGGER;VALUE=DATE-TIME:${time}
END:VALARM
BEGIN:VALARM
ACTION:${action}
ATTENDEE:mailto:mailto:${attendee}
DESCRIPTION:${description}
TRIGGER;VALUE=DATE-TIME:${time}
END:VALARM
BEGIN:VALARM
ACTION:SMS
ATTENDEE:sms:sms:${phone}
DESCRIPTION:Irgendein alarm
SUBJECT:${subject}
TRIGGER;VALUE=DATE-TIME:20201003T123000Z
END:VALARM
BEGIN:VALARM
ACTION:SMS
ATTENDEE:sms:${phone}
DESCRIPTION:Irgendein alarm
SUBJECT:${subject}
TRIGGER;VALUE=DATE-TIME:20201003T123000Z
END:VALARM
END:VEVENT
END:VCALENDAR\`);
    });

    app.put('/${uid}.ics', function (req, res) {
      if (req.body.includes(":mailto:mailto:") || req.body.includes(":sms:sms:")) {
        return res.status(500).send();
      }

      res.status(201).send();
    });
  `,
    2
  );
  const URI = `http://localhost:${worker.port}`;
  const dav = new SimpleCalDAV(URI);
  const evt = await dav.getEvent(uid);
  t.assert("summary" in evt);
  t.assert("start" in evt);
  t.assert("end" in evt);
  t.assert("alarms" in evt);
  t.assert("_status" in evt);
  t.assert("organizer" in evt);
  t.assert("location" in evt);
  t.assert(evt.location === _location);
  t.deepEqual(evt.organizer, organizer);
  t.assert(evt.href === `${URI}/${uid}.ics`);
  t.assert(evt.alarms.length === 4);
  t.assert(evt.alarms[0].action === action);
  t.assert(evt.alarms[0].attendee === attendee);
  t.assert(evt.alarms[0].trigger instanceof Date);
  t.assert(evt.alarms[1].attendee === attendee);
  t.assert(evt.alarms[2].subject === subject);
  t.assert(evt.alarms[3].attendee === phone);

  const res = await dav.updateEvent(
    uid,
    evt.start,
    evt.end,
    "updated summary",
    evt.alarms,
    "CONFIRMED"
  );
  t.assert(res.status === 201);
});

test("if absolute trigger is parsed correctly", t => {
  const dateObj = {
    year: 2012,
    month: 10,
    day: 11,
    hour: 15,
    minute: 0,
    second: 0,
    isDate: false
  };
  const time = new Time(dateObj);
  const actual = SimpleCalDAV.parseTrigger(time);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const actualLocalized = actual.toLocaleString("en-US", {
    timeZone,
    hour12: false
  });
  const expected = `${dateObj.month}/${dateObj.day}/${dateObj.year} ${
    dateObj.hour
  }:${dateObj.minute}:${dateObj.second}`;
  t.assert(expected, actualLocalized);
});

test("if positive relative trigger (duration) is parsed correctly", t => {
  const durObj = {
    minutes: 123,
    isNegative: false
  };
  const dur = new Duration(durObj);
  const actual = SimpleCalDAV.parseTrigger(dur);
  t.deepEqual({ ...durObj, weeks: 0, days: 0, hours: 0, seconds: 0 }, actual);
});

test("if negative relative trigger (duration) is parsed correctly", t => {
  const durObj = {
    minutes: 123,
    isNegative: true
  };
  const dur = new Duration(durObj);
  const actual = SimpleCalDAV.parseTrigger(dur);
  t.deepEqual({ ...durObj, weeks: 0, days: 0, hours: 0, seconds: 0 }, actual);
});

test("if error is thrown when incorrect object is attempted to be parsed", t => {
  class Wrong {
    constructor() {}
  }
  t.throws(
    () => {
      SimpleCalDAV.parseTrigger(new Wrong());
    },
    { instanceOf: InputError }
  );
});

test("if negative duration yields negative seconds value", t => {
  const durObj = {
    minutes: 1,
    isNegative: true
  };
  const dur = new Duration(durObj);
  t.assert(dur.toSeconds() === -60);
});

test("if date-fns add can handle negative values", t => {
  const now = new Date();
  t.assert(
    add(now, { seconds: -1 }).toISOString() ===
      sub(now, { seconds: 1 }).toISOString()
  );
});

test("if adding a negative duration is same as subtracting a positive duration", t => {
  const now = new Date();
  const durObj = {
    minutes: 1,
    isNegative: true
  };
  const dur = new Duration(durObj);
  const durObjPos = {
    minutes: 1,
    isNegative: false
  };
  const durPos = new Duration(durObjPos);
  t.assert(
    add(now, { seconds: dur.toSeconds() }).toISOString() ===
      sub(now, { seconds: durPos.toSeconds() }).toISOString()
  );
});

test("if durations are applied to a date correctly", t => {
  const now = new Date();
  const durObj = {
    minutes: 1,
    isNegative: true
  };
  const dur = new Duration(durObj);
  t.assert(
    add(now, { seconds: dur.toSeconds() }).toISOString() ===
      SimpleCalDAV.applyDuration(now, durObj).toISOString()
  );
});

test("if error is thrown when wrong parameters are submitted when applying duration", t => {
  t.throws(() => SimpleCalDAV.applyDuration("this is wrong"), {
    instanceOf: InputError
  });
  t.throws(() => SimpleCalDAV.applyDuration(new Date(), null), {
    instanceOf: InputError
  });
  t.throws(() => SimpleCalDAV.applyDuration(new Date(), { minutes: 1 }), {
    instanceOf: InputError
  });
  t.throws(
    () => SimpleCalDAV.applyDuration(new Date(), { isNegative: false }),
    {
      instanceOf: InputError
    }
  );
  t.throws(
    () =>
      SimpleCalDAV.applyDuration(new Date(), {
        otherthings: "abc",
        isNegative: true
      }),
    {
      instanceOf: InputError
    }
  );
});

test("if xmldoc can serve simple-caldav's use cases", t => {
  const xmldoc = require("xmldoc");
  const href1 = "href1";
  const href2 = "href2";
  const content1 = "content1";
  const content2 = "content2";
  const s = `<?xml version="1.0" encoding="UTF-8"?>
  <multistatus xmlns="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
     <response>
        <href>${href1}</href>
        <propstat>
           <prop>
							<abc>${content1}</abc>
           </prop>
           <status>HTTP/1.1 200 OK</status>
        </propstat>
     </response>
     <response>
        <href>${href2}</href>
        <propstat>
           <prop>
							<abc>${content2}</abc>
           </prop>
           <status>HTTP/1.1 200 OK</status>
        </propstat>
     </response>
  </multistatus>
  `;
  const doc = new xmldoc.XmlDocument(s);
  t.assert(
    doc.childrenNamed("response")[1].descendantWithPath("href").val === href2
  );
  t.assert(doc.descendantWithPath("response.href").val === href1);
});

test("if options are included in fetch requests", async t => {
  const worker = await createWorker(
    `
    const fn = function (req, res) {
      if (req.get("X-TEST") === "test") {
        res.status(200).send();
      } else {
        res.status(500).send();
      }
    };

    app.put("/:uid", fn);
  `,
    2
  );
  const URI = `http://localhost:${worker.port}`;

  const dav = new SimpleCalDAV(URI, { headers: { "X-TEST": "test" } });
  const start = new Date();
  const end = add(new Date(), { hours: 1 });
  const res = await dav.createEvent(start, end);
  t.assert(res.status === 200);
});
