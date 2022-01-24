//polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}



const eximport = (() => {
  let export_ical = function (filename, event_data) {
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
      result += "PROID:GREG" + "\r\n";
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
          if (index == Object.keys(e).length - 1)
            result += "END:VEVENT" + "\r\n";
        }
      });

      result += "END:VCALENDAR" + "\r\n";
      var file = new Blob([result], { type: "text/calendar" });
      var request = sdcard.addNamed(file, filename);
      request.onsuccess = function () {
        helper.side_toaster("<img src='assets/image/E25C.svg'>", 2500);
      };

      request.onerror = function () {
        helper.toaster("Unable to write the file", 2000);
      };
    }, 2000);
  };

  // //////////

  // /LIST ICS

  // ////////////

  let list_ics = function () {
    // search .ics files
    let finder = new Applait.Finder({ type: "sdcard", debugMode: false });

    finder.search(".ics");
    finder.on("searchComplete", function (needle, filematchcount) {
      if (filematchcount == 0) {
      }
    });

    finder.on("fileFound", function (file, fileinfo, storageName) {
      document.querySelector("div#import-text").style.display = "block";
      if (fileinfo.name != "greg.ics") {
        document
          .querySelector("div#options div#import-text")
          .insertAdjacentHTML(
            "afterend",
            '<button class="item dynamic" data-function="import" data-filename="' +
              fileinfo.name +
              '">' +
              fileinfo.name +
              "</button>"
          );
      }

      document.querySelectorAll("div#options button").forEach(function (i, p) {
        // i.setAttribute("tabindex", p)
      });
    });
  };

  // /////////////

  // /PARSE ICS

  // /////////////

  let parse_ics = function (data, callback, saveOnDevice, subscription) {
    var data = data.split(/\r\n|\n/);
    data = data.join("\r\n");

    // parse iCal data
    var jcalData = ICAL.parse(data);
    var vcalendar = new ICAL.Component(jcalData);
    let last_uid = "";
    let last_date = "";
    let isoDateTimeEnd = "";

    vcalendar.getAllSubcomponents("vevent").forEach(function (index) {
      if (
        index.getFirstPropertyValue("dtstart") == "" &&
        index.getFirstPropertyValue("summary") == ""
      )
        return false;

      let DTend = null;
      let dateEnd = null;
      let timeEnd = null;
      if (index.getFirstPropertyValue("dtend") != null) {
        DTend = ICAL.design.icalendar.value["date-time"].toICAL(
          index.getFirstPropertyValue("dtend")
        );

        DTend = new Date(index.getFirstPropertyValue("dtend"));

        dateEnd =
          DTend.getFullYear() +
          "-" +
          `0${DTend.getMonth() + 1}`.slice(-2) +
          "-" +
          `0${DTend.getDate()}`.slice(-2);

        timeEnd =
          `0${DTend.getHours()}`.slice(-2) +
          ":" +
          `0${DTend.getMinutes()}`.slice(-2) +
          ":" +
          `0${DTend.getSeconds()}`.slice(-2);

        isoDateTimeEnd = dateEnd + "T" + timeEnd;
        isoDateTimeEnd = isoDateTimeEnd.replace(/-/g, "");
        isoDateTimeEnd = isoDateTimeEnd.replace(/:/g, "");
      }

      let DTstart = null;
      let dateStart = null;
      let timeStart = null;
      let isoDateTimeStart = null;
      if (index.getFirstPropertyValue("dtstart") != null) {
        DTstart = ICAL.design.icalendar.value["date-time"].toICAL(
          index.getFirstPropertyValue("dtstart")
        );

        DTstart = new Date(index.getFirstPropertyValue("dtstart"));

        dateStart =
          DTstart.getFullYear() +
          "-" +
          `0${DTstart.getMonth() + 1}`.slice(-2) +
          "-" +
          `0${DTstart.getDate()}`.slice(-2);

        timeStart =
          `0${DTstart.getHours()}`.slice(-2) +
          ":" +
          `0${DTstart.getMinutes()}`.slice(-2) +
          ":" +
          `0${DTstart.getSeconds()}`.slice(-2);

        isoDateTimeStart = dateStart + "T" + timeStart;
        isoDateTimeStart = isoDateTimeStart.replace(/-/g, "");
        isoDateTimeStart = isoDateTimeStart.replace(/:/g, "");
      }

      // check multi day events
      multidayevent = false;
      if (new Date(dateEnd).getTime() > new Date(dateStart).getTime()) {
        multidayevent = true;
      }

      // last modified
      let g = new Date(index.getFirstPropertyValue("last-modified")).getTime();

      if (timeStart == timeEnd) {
        timeStart = "";
        timeEnd = "";
      }

      last_uid = "";
      last_date = "";
      let parse_rrule = function () {
        let feedback = "";
        if (index.getFirstPropertyValue("rrule") != null) {
          let a = index.getFirstPropertyValue("rrule");
          feedback = a.toString();
        }

        return feedback;
      };

      let parse_rrule2 = function () {
        let feedback = "none";
        if (index.getFirstPropertyValue("rrule") != null) {
          let a = index.getFirstPropertyValue("rrule");
          feedback = a.freq;
        }

        return feedback;
      };

      let imp = {
        BEGIN: "VEVENT",
        UID: index.getFirstPropertyValue("uid"),
        SUMMARY: index.getFirstPropertyValue("summary"),
        LOCATION: index.getFirstPropertyValue("location"),
        DESCRIPTION: index.getFirstPropertyValue("description"),
        ATTACH: index.getFirstPropertyValue("attache"),
        RRULE: parse_rrule(),
        "LAST-MODIFIED": g,
        CLASS: "PRIVATE",
        DTSTAMP: isoDateTimeStart,
        DTSTART: isoDateTimeStart,
        DTEND: isoDateTimeEnd,
        END: "VEVENT",
        dateStart: dateStart,
        dateEnd: dateEnd,
        time_start: timeStart,
        time_end: timeEnd,
        notification: " ",
        alarm: "none",
        isSubscription: subscription,
        multidayevent: multidayevent,
        rrule_: parse_rrule2(),
      };

      last_uid = imp.UID;
      last_date = imp.date;
      events.push(imp);
    });

    callback(last_uid, last_date);

    if (saveOnDevice) {
      let without_subscription = events.filter(
        (events) => events.isSubscription === false
      );

      localforage
        .setItem("events", without_subscription)
        .then(function (value) {
          // events = value;
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  // ///////////

  // /FETCH ICS

  // /////////

  let fetch_ics = function (url, cb) {
    let xhttp = new XMLHttpRequest({ mozSystem: true });

    xhttp.open("GET", url + "?time=" + new Date().getTime(), true);
    xhttp.timeout = 25000;
    xhttp.onload = function () {
      if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
        let data = xhttp.response;
        parse_ics(data, cb, false, true);
      }
    };

    xhttp.onerror = function () {
      helper.toaster("subscription could not be loaded", 2000);
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

    activity.onsuccess = function () {
      alert("done");
    };

    activity.onerror = function () {};
  }

  // ///////////////////////
  // ///Load ICS///////////
  // /////////////////////

  function loadICS(filename, callback) {
    let finder = new Applait.Finder({ type: "sdcard", debugMode: false });
    finder.search(filename);

    finder.on("searchComplete", function (needle, filematchcount) {
      if (filematchcount == 0) {
        helper.toaster("xxx", 2000);
      }
    });

    finder.on("fileFound", function (file, fileinfo, storageName) {
      // file reader
      let reader = new FileReader();

      reader.onerror = function (event) {
        helper.toaster("can't read file", 3000);
        reader.abort();
      };

      reader.onloadend = function (event) {
        let data = event.target.result;
        parse_ics(data, callback, true);
      };

      reader.readAsText(file);
    });
  }

  return {
    export_ical,
    list_ics,
    loadICS,
    share,
    fetch_ics,
  };
})();
