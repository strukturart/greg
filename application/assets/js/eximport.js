const eximport = (() => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  let export_json = function () {
    var sdcard = navigator.getDeviceStorage("sdcard");

    var request_del = sdcard.delete("greg_events.json");
    request_del.onsuccess = function () {};
    setTimeout(function () {
      let data = localStorage.getItem("events");
      var file = new Blob([data], {
        type: "application/json",
      });

      var request = sdcard.addNamed(file, "greg.json");

      request.onsuccess = function () {
        var name = this.result;
        helper.toaster("events exported, greg.json", 5000);
      };

      request.onerror = function () {
        helper.toaster("Unable to write the file", 2000);
      };
    }, 2000);
  };

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
            key != "alarm"
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

  let list_ics = function () {
    //search .ics files
    let finder = new Applait.Finder({
      type: "sdcard",
      debugMode: false,
    });

    finder.search(".ics");
    finder.on("searchComplete", function (needle, filematchcount) {
      if (filematchcount == 0) {
        helper.toaster("xxx", 2000);
      }
    });

    finder.on("fileFound", function (file, fileinfo, storageName) {
      if (fileinfo.name != "greg.ics") {
        document
          .querySelector("div#options")
          .insertAdjacentHTML(
            "beforeend",
            '<button class="item" data-function="import" data-filename="' +
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
        var data = event.target.result.split(/\r\n|\n/);
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

          let t = new Date(index.getFirstPropertyValue("dtstart"));
          let f = new Date(index.getFirstPropertyValue("dtend"));

          //last modified
          let g = new Date(
            index.getFirstPropertyValue("last-modified")
          ).getTime();

          let k =
            t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();

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
          if (start_time == end_time) {
            start_time = "";
            end_time = "";
          }

          let date = s_year + "-" + s_month + "-" + s_day;
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
            DTSTAMP: start_date,
            DTSTART: start_date,
            DTEND: end_date,
            date: date,
            time_start: start_time,
            time_end: end_time,
            notification: " ",
            alarm: "none",
            END: "VEVENT",
          };
          last_uid = imp.UID;
          last_date = imp.date;
          events.push(imp);
        });

        callback(last_uid, last_date);
        localStorage.setItem("events", JSON.stringify(events));
      };

      reader.readAsText(file);
    });
  }

  return {
    export_ical,
    export_json,
    list_ics,
    loadICS,
    share,
  };
})();
