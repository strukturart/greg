import { list_files } from "./helper.js";
import { toaster } from "./helper.js";
import { side_toaster } from "./helper.js";
import localforage from "localforage";
import { events } from "../../app.js";

import ICAL from "ical.js";

export let export_ical = function (filename, event_data) {
  if (!navigator.getDeviceStorage) return false;

  var sdcard = navigator.getDeviceStorage("sdcard");

  var request_del = sdcard.delete(filename);
  request_del.onsuccess = function () {};
  setTimeout(function () {
    // convert
    let data = event_data;
    let result = "";

    result += "BEGIN:VCALENDAR" + "\r\n";
    result += "VERSION:2.0" + "\r\n";
    result += "PRODID:GREG" + "\r\n";
    result += "METHOD:PUBLISHED" + "\r\n";

    data.forEach((e) => {
      let index = -1;
      for (let key in e) {
        index++;
        if (index == 0) result += "BEGIN:VEVENT" + "\r\n";

        if (
          key != "BEGIN" &&
          key != "END" &&
          key != "date" &&
          key != "time_start" &&
          key != "time_end" &&
          key != "dateStart" &&
          key != "dateEnd" &&
          key != "notification" &&
          key != "alarm" &&
          key != "isSubscription" &&
          key != "multidayevent" &&
          key != "alarmTrigger" &&
          key != "rrule_"
        ) {
          result += `${key}:${e[key]}` + "\r\n";
        }
        if (index == Object.keys(e).length - 1) result += "END:VEVENT" + "\r\n";
      }
    });

    result += "END:VCALENDAR" + "\r\n";
    var file = new Blob([result], { type: "text/calendar" });
    var request = sdcard.addNamed(file, filename);
    request.onsuccess = function () {
      side_toaster("<img src='assets/image/E25C.svg'>", 2500);
    };

    request.onerror = function () {
      toaster("Unable to write the file", 2000);
    };
  }, 2000);
};

// //////////
// /LIST ICS
// ////////////

export let list_ics = function () {
  let file_list = [];
  let cb = function (result) {
    file_list.push(result);

    let fn = result.split("/");
    fn = fn[fn.length - 1];
    if (fn == "greg.ics") return false;

    document.querySelector("div#options div#import-text").style.display =
      "block";

    document
      .querySelector("div#options div#import-text")
      .insertAdjacentHTML(
        "afterend",
        '<button class="item dynamic" data-function="import" data-filename="' +
          result +
          '">' +
          fn +
          "</button>"
      );
  };

  list_files("ics", cb);
};

// /////////////
// /PARSE ICS
// /////////////

export let parse_ics = function (
  data,
  callback,
  saveOnDevice,
  subscription,
  db_name
) {
  let temp = [];
  if (subscription) subscription = "subscription";

  var jcalData = ICAL.parse(data);

  var comp = new ICAL.Component(jcalData);
  var vevent = comp.getAllSubcomponents("vevent");
  vevent.forEach(function (ite) {
    //if (ite.getFirstPropertyValue("rrule"))
    // console.log(ite.getFirstPropertyValue("rrule").freq);
    let n = ite.getFirstPropertyValue("rrule");

    let dateStart, timeStart;
    if (ite.getFirstPropertyValue("dtstart")) {
      let ds = new Date(ite.getFirstPropertyValue("dtstart"));

      dateStart =
        ds.getFullYear() +
        "-" +
        `0${ds.getMonth() + 1}`.slice(-2) +
        "-" +
        `0${ds.getDate()}`.slice(-2);

      timeStart =
        `0${ds.getHours()}`.slice(-2) +
        ":" +
        `0${ds.getMinutes()}`.slice(-2) +
        ":" +
        `0${ds.getSeconds()}`.slice(-2);
    }

    //date end
    let dateEnd, timeEnd;
    if (ite.getFirstPropertyValue("dtend")) {
      let DTstart = new Date(ite.getFirstPropertyValue("dtend"));

      dateEnd =
        DTstart.getFullYear() +
        "-" +
        `0${DTstart.getMonth() + 1}`.slice(-2) +
        "-" +
        `0${DTstart.getDate()}`.slice(-2);

      timeEnd =
        `0${DTstart.getHours()}`.slice(-2) +
        ":" +
        `0${DTstart.getMinutes()}`.slice(-2) +
        ":" +
        `0${DTstart.getSeconds()}`.slice(-2);
    }

    //multiday event
    let allDay = false;

    if (
      ite.getFirstPropertyValue("dtend") &&
      ite.getFirstPropertyValue("dtstart")
    ) {
      if (
        new Date(ite.getFirstPropertyValue("dtend")) >
        new Date(ite.getFirstPropertyValue("dtstart"))
      ) {
        allDay = true;
      }
      //all day events have the time 00:00:00 but the start end date consecutive
      if (
        new Date(ite.getFirstPropertyValue("dtend")) >
          new Date(ite.getFirstPropertyValue("dtstart")) &&
        timeStart == "00:00:00" &&
        timeEnd == "00:00:00"
      ) {
        allDay = false;
      }
    }

    let imp = {
      BEGIN: "VEVENT",
      UID: ite.getFirstPropertyValue("uid"),
      SUMMARY: ite.getFirstPropertyValue("summary"),
      LOCATION: ite.getFirstPropertyValue("location"),
      DESCRIPTION: ite.getFirstPropertyValue("description"),
      ATTACH: ite.getFirstPropertyValue("attach"),
      RRULE: ite.getFirstPropertyValue("rrule"),
      "LAST-MODIFIED": ite.getFirstPropertyValue("last-modified"),
      CLASS: ite.getFirstPropertyValue("class"),
      DTSTAMP: ite.getFirstPropertyValue("dtstamp"),
      DTSTART: ite.getFirstPropertyValue("dtstart"),
      DTEND: ite.getFirstPropertyValue("dtend"),
      END: "VEVENT",

      isSubscription: subscription,
      allDay: ite.getFirstPropertyValue("dtstart").isDate,
      dateStart: dateStart,
      time_start: timeStart,
      dateEnd: dateEnd,
      time_end: timeEnd,
      notification: " ",
      alarm: "none",
      rrule_: n ? n.freq : "",
    };

    events.push(imp);
  });

  if (saveOnDevice) {
    let without_subscription = events.filter(
      (events) => events.isSubscription === false
    );

    localforage
      .setItem("events", without_subscription)
      .then(function (value) {
        // events = value;
        side_toaster("<img src='assets/image/E25C.svg'>", 2500);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
};

/////////////
///FETCH ICS
///////////

export let fetch_ics = function (url, cb, db_name) {
  let xhttp = new XMLHttpRequest({ mozSystem: true });

  xhttp.open("GET", url + "?time=" + new Date().getTime(), true);
  xhttp.timeout = 2000;

  xhttp.onprogress = function () {
    // toaster("loading subscriptions", 2000);
  };

  xhttp.onload = function () {
    if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
      let data = xhttp.response;

      parse_ics(data, cb, false, true);

      localforage
        .setItem(db_name, data)
        .then(function () {})
        .catch(function (err) {
          console.log(err);
        });
      side_toaster("subscriptions loaded", 2000);
    }
  };

  xhttp.onerror = function () {
    side_toaster("subscription could not be loaded", 2000);

    localforage
      .getItem(db_name)
      .then(function (value) {
        toaster("load cached data", 2000);
        parse_ics(value, cb);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  xhttp.send(null);
};

function share(url, name) {
  var activity = new MozActivity({
    name: "share",
    data: {
      type: "text/calendar",
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
  var sdcard = navigator.getDeviceStorage("sdcard");

  var request = sdcard.get(filename);

  request.onsuccess = function () {
    var file = this.result;

    let reader = new FileReader();

    reader.onerror = function (event) {
      toaster("can't read file", 3000);
      reader.abort();
    };

    reader.onloadend = function (event) {
      parse_ics(event.target.result, callback, true, false);
      document.getElementById("import-text").style.display = "block";
    };

    reader.readAsText(file);
  };

  request.onerror = function () {
    console.warn("Unable to get the file: " + this.error);
  };
}
