import { side_toaster } from './helper.js';
import localforage from 'localforage';
import { events } from '../../app.js';
import ICAL from 'ical.js';

const dayjs = require('dayjs');

export let export_ical = function (filename, event_data) {
  try {
    var sdcard = navigator.getDeviceStorage('sdcard');

    var request_del = sdcard.delete(filename);
    request_del.onsuccess = function () {};
  } catch (e) {
    // alert(e);
  }
  if ('b2g' in Navigator) {
    try {
      var sdcard = navigator.b2g.getDeviceStorage('sdcard');
      var request_del = sdcard.delete(filename);
    } catch (e) {}
  }

  setTimeout(function () {
    let result = '';

    result += 'BEGIN:VCALENDAR' + '\r\n';
    result += 'VERSION:2.0' + '\r\n';
    result += 'PRODID:GREG' + '\r\n';
    result += 'METHOD:PUBLISHED' + '\r\n';
    event_data.forEach((e, i) => {
      let index = -1;
      for (let key in e) {
        index++;

        //clean data
        if (e[key] == null || typeof e[key] == 'object') {
          console.log(e.RRULE);

          e.RRULE = '';
        }

        if (index == 0) result += 'BEGIN:VEVENT' + '\r\n';

        if (
          key != 'BEGIN' &&
          key != 'END' &&
          key != 'date' &&
          key != 'time_start' &&
          key != 'time_end' &&
          key != 'dateStart' &&
          key != 'dateEnd' &&
          key != 'alarm' &&
          key != 'isSubscription' &&
          key != 'multidayevent' &&
          key != 'alarmTrigger' &&
          key != 'isCalDav' &&
          key != 'id' &&
          key != 'allDay' &&
          key != 'isCaldav' &&
          key != 'tzid' &&
          key != 'rrule_json' &&
          key != 'etag' &&
          key != 'url' &&
          key != 'id' &&
          key != 'dateStartUnix' &&
          key != 'dateEndUnix'
        ) {
          result += `${key}:${e[key]}` + '\r\n';
        }
        if (index == Object.keys(e).length - 1) result += 'END:VEVENT' + '\r\n';
      }
    });

    result += 'END:VCALENDAR' + '\r\n';

    result = result.replace(/:;TZID/g, ';TZID');
    result = result.replace(/RRULE:FREQ=null/g, 'RRULE:');
    result = result.replace(/: undefined/g, 'RRULE:');

    //remove empty lines
    let regex = /^\s*$(?:\r\n?|\n)/gm;
    result = result.replace(regex, '');

    var file = new Blob([result], { type: 'text/calendar' });
    try {
      var sdcard = navigator.getDeviceStorage('sdcard');

      var request = sdcard.addNamed(file, filename);
      request.onsuccess = function () {
        console.log('backup written');
      };

      request.onerror = function () {
        side_toaster('Unable to write the file', 2000);
      };
    } catch (e) {
      console.log(e);
    }

    //KaiOS 3.x
    if ('b2g' in Navigator) {
      try {
        var sdcard = navigator.b2g.getDeviceStorage('sdcard');
        var request = sdcard.addNamed(file, filename);

        request.onsuccess = function () {
          console.log('backup written');
        };

        request.onerror = function () {
          side_toaster('Unable to write the file', 2000);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, 2000);
};

// /////////////
// /PARSE ICS
// /////////////

export function formatTimeWithTimeZone(time) {
  if (!time) return '';
  return `;TZID=${time.timezone}:${time.toICALString()}`;
}

export const parse_ics = async function (
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
  let imp;
  vevent.forEach(function (ite) {
    let n = '';
    let rr_until = '';
    let allday = false;
    let date_start = ite.getFirstPropertyValue('dtstart');
    let date_end = ite.getFirstPropertyValue('dtend');
    const rrule = ite.getFirstPropertyValue('rrule');

    if (date_start.isDate && date_end.isDate) allday = true;

    if (rrule && typeof rrule === 'object' && rrule.freq) {
      n = rrule;
      rr_until = n.until || '';
    }
    //date start
    let dateStart, timeStart, dateStartUnix;
    if (date_start) {
      let a = dayjs(date_start);
      dateStart = a.format('YYYY-MM-DD');
      timeStart = a.format('HH:mm:ss');
      dateStartUnix = a.unix();
    }

    //date end
    let dateEnd, timeEnd, dateEndUnix;
    if (date_end) {
      let a = dayjs(date_end);
      dateEnd = a.format('YYYY-MM-DD');
      timeEnd = a.format('HH:mm:ss');
      dateEndUnix = a.unix();

      if (rr_until != '') {
        dateEnd = dayjs(n.until).format('YYYY-MM-DD');
        timeEnd = dayjs(n.until).format('HH:mm:ss');
        dateEndUnix = new Date(n.until).getTime() / 1000;
      }
      //allDay
      if (allday) {
        let f = ite.getFirstPropertyValue('dtend').toJSDate();
        f = new Date(dayjs(f).subtract(1, 'day'));
        dateEnd = dayjs(f).format('YYYY-MM-DD');
        timeEnd = dayjs(f).format('HH:mm:ss');
        dateEndUnix = f.getTime() / 1000;
      }
    }

    //todo remove more key:values
    imp = {
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

    events.push(imp);
  });
};

/////////////
///FETCH ICS
///////////

export let fetch_ics = function (url, db_name) {
  let xhttp = new XMLHttpRequest({ mozSystem: true });

  xhttp.open('GET', url + '?time=' + new Date().getTime(), true);
  xhttp.timeout = 2000;

  xhttp.onload = function () {
    let data = xhttp.response;

    parse_ics(data, true, '', '', db_name, false, 'none');

    localforage
      .setItem(db_name, data)
      .then(function () {})
      .catch(function (err) {
        console.log(err);
      });
  };

  xhttp.onerror = function () {
    side_toaster('subscription could not be loaded', 4000);
  };

  xhttp.send(null);
};

function share(url, name) {
  var activity = new MozActivity({
    name: 'share',
    data: {
      type: 'text/calendar',
      number: 1,
      blobs: [url],
      filenames: [name],
    },
  });

  activity.onsuccess = function () {};
  activity.onerror = function () {};
}

// ///////////////////////
// ///Load ICS///////////
// /////////////////////

export function loadICS(filename, callback) {
  var sdcard = navigator.getDeviceStorage('sdcard');

  if ('b2g' in Navigator) {
    sdcard = navigator.b2g.getDeviceStorage('sdcard');
  }

  var request = sdcard.get(filename);

  request.onsuccess = function () {
    var file = this.result;

    let reader = new FileReader();

    reader.onerror = function (event) {
      side_toaster("can't read file", 3000);
      reader.abort();
    };

    reader.onloadend = function (event) {
      parse_ics(event.target.result, callback, true, false);
      document.getElementById('import-text').style.display = 'block';
    };

    reader.readAsText(file);
  };

  request.onerror = function () {
    console.warn('Unable to get the file: ' + this.error);
  };
}
