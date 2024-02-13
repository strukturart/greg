import { side_toaster } from './helper.js';
import localforage from 'localforage';

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
    let result = data;

    //remove empty lines
    let regex = /^\s*$(?:\r\n?|\n)/gm;
    result = result.replace(regex, '');

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
