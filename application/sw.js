import ICAL from 'ical.js';
import dayjs from 'dayjs';

const parse_ics = function (
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
    console.log('parser error' + e);
  }

  var comp = new ICAL.Component(jcalData);

  var vevent = comp.getAllSubcomponents('vevent');
  let calendar_name = comp.getFirstPropertyValue('x-wr-calname') || '';

  vevent.forEach(function (ite) {
    let n = '';
    let rr_until = '';

    const rrule = ite.getFirstPropertyValue('rrule');

    if (rrule && typeof rrule === 'object' && rrule.freq) {
      n = rrule;
      rr_until = n.until || '';
    }
    //date start
    let dateStart, timeStart, dateStartUnix;
    if (ite.getFirstPropertyValue('dtstart')) {
      let a = dayjs(ite.getFirstPropertyValue('dtstart'));
      dateStart = a.format('YYYY-MM-DD');
      timeStart = a.format('HH:mm:ss');
      dateStartUnix = a.unix();
    }

    //date end
    let dateEnd, timeEnd, dateEndUnix;
    if (ite.getFirstPropertyValue('dtend')) {
      let a = dayjs(ite.getFirstPropertyValue('dtend'));
      dateEnd = a.format('YYYY-MM-DD');
      timeEnd = a.format('HH:mm:ss');
      dateEndUnix = a.unix();

      if (rr_until != '') {
        dateEnd = dayjs(n.until).format('YYYY-MM-DD');
        timeEnd = dayjs(n.until).format('HH:mm:ss');
        dateEndUnix = new Date(n.until).getTime() / 1000;
      }
    }

    //allDay event
    let allday = false;

    if (
      ite.getFirstPropertyValue('dtstart').isDate &&
      ite.getFirstPropertyValue('dtend').isDate
    ) {
      allday = true;

      //allDay hack
      //the end date of an allday event is moved to the next day, i don't know why. hence this ugly correction
      //start

      //end
      let f = ite.getFirstPropertyValue('dtend').toJSDate();
      f = new Date(dayjs(f).subtract(1, 'day'));
      dateEnd = dayjs(f).format('YYYY-MM-DD');
      timeEnd = dayjs(f).format('HH:mm:ss');
      dateEndUnix = f.getTime() / 1000;
    }

    //todo remove more key:values
    let imp = {
      BEGIN: 'VEVENT',
      UID: ite.getFirstPropertyValue('uid'),
      SUMMARY: ite.getFirstPropertyValue('summary'),
      LOCATION: ite.getFirstPropertyValue('location'),
      DESCRIPTION: ite.getFirstPropertyValue('description'),
      CATEGORIES: ite.getFirstPropertyValue('categories') || '',
      RRULE: ite.getFirstPropertyValue('rrule') || '',
      'LAST-MODIFIED': ite.getFirstPropertyValue('last-modified'),
      CLASS: ite.getFirstPropertyValue('class') || '',
      DTSTAMP: ite.getFirstPropertyValue('dtstart'),
      DTSTART: ite.getFirstPropertyValue('dtstart'),
      DTEND: ite.getFirstPropertyValue('dtend'),
      END: 'VEVENT',
      isSubscription: isSubscription,
      isCaldav: isCaldav,
      allDay: allday,
      dateStart: dateStart,
      dateStartUnix: dateStartUnix,
      dateEndUnix: dateEndUnix,
      dateEnd: dateEnd,
      time_start: timeStart,
      time_end: timeEnd,
      alarm: alarm || 'none',
      etag: etag,
      url: url,
      calendar_name: calendar_name,
      id: account_id,
    };
    return imp;
  });
};

const channel = new BroadcastChannel('sw-messages');

self.addEventListener('message', (event) => {
  // Receive a message from the main thread
  //const data = event.data.t;

  // Perform calculations (simplified example)

  let ff = parse_ics(
    event.data.t.data,
    '',
    false,
    event.data.t.etag,
    event.data.t.url,
    event.data.e,
    true
  );

  // Post the result back to the main thread
  channel.postMessage(ff);
});

self.onsystemmessage = (evt) => {
  try {
    let m = evt.data.json();
    self.registration.showNotification('Greg', {
      body: m.data.note,
    });
  } catch (e) {}

  try {
    const serviceHandler = () => {
      if (evt.name === 'activity') {
        handler = evt.data.webActivityRequestHandler();
        const { name: activityName, data: activityData } = handler.source;
        if (activityName == 'greg-oauth') {
          let code = activityData.code;

          const url = '/oauth.html?code=' + code;
          channel.postMessage({
            oauth_success: url,
          });
        }
      }
    };
    evt.waitUntil(serviceHandler());
  } catch (e) {}
};
