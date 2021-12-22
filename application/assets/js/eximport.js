const eximport = (() => {
  let export_ical = function (filename, event_data) {
    if (!navigator.getDeviceStorage) return false;
    var sdcard = navigator.getDeviceStorage("sdcard");

    var request_del = sdcard.delete(filename);
    request_del.onsuccess = function () {};
    setTimeout(function () {
      //convert
      let data = event_data;

      let ll = {
        BEGIN: "VCALENDAR",
        VERSION: "2.0",
        PRODID: "Greg",
        METHOD: "PUBLISH",
      };

      data.unshift(ll);

      let result = "";

      data.forEach((e) => {
        for (let key in e) {
          if (
            key != "date" &&
            key != "time_start" &&
            key != "time_end" &&
            key != "notification" &&
            key != "alarm" &&
            key != "isSubscription" &&
            key != "multidayevent"
          ) {
            result += `${key}:${e[key]}` + "\r\n";
          }
        }
      });
      result += "END:VCALENDAR" + "\r\n";

      var file = new Blob([result], {
        type: "text/calendar",
      });

      var request = sdcard.addNamed(file, filename);

      request.onsuccess = function () {
        //var name = this.result;
        helper.side_toaster("<img src='assets/image/E25C.svg'>", 2500);
      };

      request.onerror = function () {
        helper.toaster("Unable to write the file", 2000);
      };
    }, 2000);
  };
  ////////////
  ///LIST ICS
  //////////////

  let list_ics = function () {
    //search .ics files
    let finder = new Applait.Finder({
      type: "sdcard",
      debugMode: false,
    });

    finder.search(".ics");
    finder.on("searchComplete", function (needle, filematchcount) {
      if (filematchcount == 0) {
        //helper.toaster("xxx", 2000);
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
        i.setAttribute("tabindex", p);
      });
    });
  };

  ///////////////
  ///PARSE ICS
  ///////////////

  let parse_ics = function (data, callback, saveOnDevice, subscription) {
    var data = data.split(/\r\n|\n/);
    data = data.join("\r\n");
    //parse iCal data
    var jcalData = ICAL.parse(data);
    var vcalendar = new ICAL.Component(jcalData);
    let last_uid = "";
    let last_date = "";

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

      //check multi day events
      multidayevent = false;
      if (new Date(dateEnd).getTime() > new Date(dateStart).getTime()) {
        multidayevent = true;
      }

      //last modified
      let g = new Date(index.getFirstPropertyValue("last-modified")).getTime();

      //custom convert
      //todo
      /*
      let t = new Date(index.getFirstPropertyValue("dtstart"));
      let f = new Date(index.getFirstPropertyValue("dtend"));

      let s_month = `0${t.getMonth() + 1}`.slice(-2);
      let s_day = `0${t.getDate()}`.slice(-2);
      let s_year = t.getFullYear();

      let s_hour = t.getHours() ? t.getHours() : "00";
      let s_minutes = t.getMinutes() ? t.getMinutes() : "00";
      let s_seconds = t.getSeconds() ? t.getSeconds() : "00";

      let e_month = `0${f.getMonth() + 1}`.slice(-2);
      let e_day = `0${f.getDate()}`.slice(-2);
      let e_year = f.getFullYear();

      let e_hour = f.getHours() ? f.getHours() : "00";
      let e_minutes = f.getMinutes() ? f.getMinutes() : "00";
      let e_seconds = f.getSeconds() ? f.getSeconds() : "00";

      let start_date =
        s_year +
        s_month +
        s_day +
        "T" +
        s_hour +
        s_minutes +
        s_minutes +
        s_seconds;

      let end_date =
        e_year +
        e_month +
        e_day +
        "T" +
        e_hour +
        e_minutes +
        e_minutes +
        e_seconds;

        

      let start_time = s_hour + ":" + s_minutes + ":" + s_seconds;
      let end_time = e_hour + ":" + e_minutes + ":" + e_seconds;

      */
      if (timeStart == timeEnd) {
        timeStart = "";
        timeEnd = "";
      }

      last_uid = "";
      last_date = "";

      let imp = {
        BEGIN: "VEVENT",
        UID: index.getFirstPropertyValue("uid"),
        SUMMARY: index.getFirstPropertyValue("summary"),
        LOCATION: index.getFirstPropertyValue("location"),
        DESCRIPTION: index.getFirstPropertyValue("description"),
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

      localStorage.setItem("events", JSON.stringify(without_subscription));
    }
  };

  /////////////
  ///FETCH ICS
  ///////////

  let fetch_ics = function (url, cb) {
    let xhttp = new XMLHttpRequest({
      mozSystem: true,
    });

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

    activity.onerror = function () {
      console.log("The activity encounter en error: " + this.error);
    };
  }

  /////////////////////////
  /////Load ICS///////////
  ///////////////////////

  function loadICS(filename, callback) {
    let finder = new Applait.Finder({
      type: "sdcard",
      debugMode: false,
    });
    finder.search(filename);

    finder.on("searchComplete", function (needle, filematchcount) {
      if (filematchcount == 0) {
        helper.toaster("xxx", 2000);
      }
    });

    finder.on("fileFound", function (file, fileinfo, storageName) {
      //file reader

      let reader = new FileReader();

      reader.onerror = function (event) {
        helper.toaster("can't read file", 3000);
        reader.abort();
      };

      reader.onloadend = function (event) {
        //text to array

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
