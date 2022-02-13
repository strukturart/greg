# simple-caldav

[![npm version](https://badge.fury.io/js/simple-caldav.svg)](https://badge.fury.io/js/simple-caldav)

> caldav in JavaScript; made easy.

## Note on Completeness

The caldav and ICS specifications are large. Additionally, I'm not sure I ever
want to implement them completely. But I saw the need to a simple module that
works with e.g. [radicale](https://radicale.org/3.0.html) and provides decent
developer experience. simple-caldav is that attempt.

## Installation

```bash
$ npm i --save simple-caldav
```

## Usage

```js
const SimpleCalDAV = require("simple-caldav");
const URI = "https://example.com/cal/";

const dav = new SimpleCalDAV(URI, { credentials: "include", mode: "cors"});
const evt = dav.getEvent("abc")
  .then(console.log)
  .catch(console.log);
```

For now, see [tests](./test/index.test.js).

### Notes

- We translate a VEVENT's `STATUS` in the whole library to the name
  `_status` to make sure we're not violating any [reserved words rules of
  JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords).
- When initializing `new SimpleCalDAV` [`fetch` request
  options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
  can be supplied on the second parameter (type object).

### Usage and CORS

When using `simple-caldav` in combination with a remote server and CORS starts
to become an issue, make sure you allow the following CORS properties:

- methods that need to be allowed: `GET, POST, PUT, DELETE, REPORT, PROPFIND, OPTIONS`
- headers that need to be allowed: `Content-Type`, `If-None-Match`, `Depth`

## Contributing

```bash
$ git clone git@github.com:TimDaub/simple-caldav.git
$ cd simple-caldav && npm i
$ npm run test
```

## Changelog

### 0.7.1

- Bump a few dependencies' versions to fix vulnerabilities

### 0.7.0

- Instead of passing `fetch`'s `credentials` option as `"include"` by
  default, it's now possible to add `fetch` request options when
  initializing the `SimpleCalDAV` class.
- `credentials: "include"` aren't passed as default anymore.

### 0.6.0

- For all `fetch` requests, allow passing credentials by using `credentials:
  true`
- Add note on CORS

### 0.5.0

- Remove `xpath` and `xmldom` dependencies for smaller builds.
- Remove `getETags` method.

### 0.4.6

- Add `static applyDuration(date, duration)` that allows applying an
  [specifically-shaped](https://github.com/TimDaub/simple-caldav/blob/0a924c33a5f4392dc1331f151e589a024b4580c2/src/index.js#L331)
  [duration](https://www.kanzaki.com/docs/ical/duration.html) to a JavaScript
  `Date`.

### 0.4.5

- Add VALUE=DATE-TIME to absolute-time trigger in VALARM.
- Add support for [relative
  triggers](https://www.kanzaki.com/docs/ical/trigger.html). `RELATED=` syntax
  not yet supported.

### 0.4.4

- When updating an event, alarm's attendee would wrongly collect action
  prefixes like `mailto:` or `sms:`, e.g.
  `mailto:mailto:mailto:email@examlple.com`.

### 0.4.3

- Include `href` to event when calling `getEvent` or `listEvents`.

### 0.4.2

- Add `LOCATION` property to VEVENT.
- Add `ORGANIZER;CN=:mailto` property to VEVENT.

### 0.4.1

- Fix UTC time zone shift calculation in `formatDateTime`.

### 0.4.0

- Switched out moment.js with `date-fns`. Breaking change is that
  `formatDateTime` now only accepts `Date` objects, or throws otherwise.

### 0.3.5

- Bug fix: When adding multiple alarms, `,BEGIN:VALARM` would show up in VEVENT
text.

### 0.3.4

- Bug fix: When adding a status to an event, in its ical representation status
statement didn't add new `\n` new line instruction.

### 0.3.3

- Add static `SimpleCalDAV.extractUid(href)` method.

### 0.3.2

- Add `_status` property to event.

### 0.3.1

- Bug fix: `syncCollection` wasn't able to detect a single VEVENT deletion event
and simply returned an empty array. 

### 0.3.0

- Bug fix: Stop attempting to parse relative-time VALARMS, as [ical.js isn't
  capable of doing that
  either](https://github.com/mozilla-comm/ical.js/issues/451). Relative-time
  VALARMS are now ignored instead. Previously they threw.

### 0.2.2

- Bug fix: Ensure correct order of `etag` and `href` properties returned from
  `syncCollection`.

### 0.2.1

- Introduce new method for retrieving single events with `uid`:
  `getEvent(uid)`.
- Parse and include `VALARM`s in `getEvent` and `listEvents`.

### 0.2.0

- Removed `TraversalError` from code base entirely.
- `listEvents` now returns an empty array when no events are found or an
  invalid xml gets passed.
- Instead of throwing `TraversalError`, `SimpleCalDAV.traverseXML` now returns
  an empty array when path couldn't be found.
- Added `getSyncToken` method to retrieve a sync token from a server.
- Added `syncCollection` to receive a diff of an entire collection with a sync
  token.
- Added `ServerError` that is thrown when there are problems with the server.

### 0.1.3

- Fix bug in VALARM construction.

### 0.1.2

- Fix bug in VEVENT construction.

### 0.1.1

- Allow adding VALARMS to VEVENTS.

### 0.1.0

- Transform ical.js events to simple JSON objects and all customizable
  transformation parameter on `listEvents` method.

### 0.0.1

- Initial release.

## License

[WIP]

## References

- 1: [Building a CalDAV Client](https://sabre.io/dav/building-a-caldav-client/)
- 2: [Radicale 3.0 Documentation: Command line client](https://radicale.org/3.0.html#documentation/supported-clients/command-line)
- 3: [iCalendar Validator](https://icalendar.org/validator.html)
- 4: [iCal specification](https://tools.ietf.org/html/rfc5545)
