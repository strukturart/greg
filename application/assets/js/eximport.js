import dayjs from 'dayjs';

export let export_ical = function (filename, data, callback) {
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
    let result = data.trim();

    var file = new Blob([result], { type: 'text/calendar' });
    try {
      var sdcard = navigator.getDeviceStorage('sdcard');

      var request = sdcard.addNamed(file, filename);
      request.onsuccess = function () {
        callback('backup written');
      };

      request.onerror = function () {
        callback('Unable to write the file');
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
          callback('backup written');
        };

        request.onerror = function () {
          callback('Unable to write the file');
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, 2000);
};

//export events

export let export_ical_versionChangment = function (filename, event_data) {
  let store_file = (result) => {
    var a = new Blob([result], { type: 'text/calendar; charset=utf-8' });
    try {
      var sdcard = navigator.getDeviceStorage('sdcard');

      var request = sdcard.addNamed(a, filename);
      request.onsuccess = function () {
        localStorage.setItem('export_versionChangment', '1');
      };

      request.onerror = function () {
        toaster('Unable to write the file', 2000);
      };
    } catch (e) {
      console.log(e);
    }

    //KaiOS 3.x
    if ('b2g' in Navigator) {
      try {
        var sdcard = navigator.b2g.getDeviceStorage('sdcard');
        var request = sdcard.addNamed(a, filename);

        request.onsuccess = function () {
          console.log(filename + 'success');
          localStorage.setItem('export_versionChangment', '1');
        };

        request.onerror = function () {
          toaster('Unable to write the file', 2000);
        };
      } catch (e) {
        console.log(e);
      }
    }
  };

  let export_data = function () {
    let result = '';

    result += 'BEGIN:VCALENDAR' + '\n';
    result += 'VERSION:2.0' + '\n';
    result += 'PRODID:GREG' + '\n';
    result += 'X-WR-CALNAME:local' + '\n';
    result += 'CALSCALE:GREGORIAN' + '\n';
    result += 'METHOD:PUBLISHED' + '\n';
    event_data.forEach((e, i) => {
      let index = -1;
      for (let key in e) {
        index++;

        if (index == 0) result += 'BEGIN:VEVENT' + '\n';

        if (key == 'DTSTART')
          e[key] = dayjs(e.dateStartUnix * 1000).format('YYYYMMDDTHHmmss');
        if (key == 'DTEND')
          e[key] = dayjs(e.dateEndUnix * 1000).format('YYYYMMDDTHHmmss');
        if (key == 'DTSTAMP')
          e[key] = dayjs(e.dateStartUnix * 1000).format('YYYYMMDDTHHmmss');
        if (key == 'LAST-MODIFIED')
          e[key] = dayjs(e.dateStartUnix * 1000).format('YYYYMMDDTHHmmss');

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
          key != 'dateEndUnix' &&
          key != 'calendar_name' &&
          key != 'RRULE' &&
          key != 'CLASS'
        ) {
          result += `${key}:${e[key]}` + '\n';
        }
        if (index == Object.keys(e).length - 1) result += 'END:VEVENT' + '\n';
      }
    });

    result += 'END:VCALENDAR' + '\n';

    result = result.replace(/:;TZID/g, ';TZID');
    result = result.replace(/RRULE:FREQ=null/g, 'RRULE:');
    result = result.replace(/: undefined/g, 'RRULE:');

    //remove empty lines
    let regex = /^\s*$(?:\n\n?|\n)/gm;
    result = result.replace(regex, '');

    setTimeout(() => {
      store_file(result);
    }, 10000);
  };

  try {
    var sdcard = navigator.getDeviceStorage('sdcard');

    var request_del = sdcard.delete(filename);
    request_del.onsuccess = function () {
      console.log('file deleted');
      try {
        export_data();
      } catch (e) {
        console.log(e);
      }
    };
  } catch (e) {
    // alert(e);
  }
  if ('b2g' in Navigator) {
    try {
      var sdcard = navigator.b2g.getDeviceStorage('sdcard');
      var request_del = sdcard.delete(filename);
      export_data();
    } catch (e) {}
  }
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
