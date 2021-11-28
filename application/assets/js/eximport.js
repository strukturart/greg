const eximport = (() => {
  let export_json = function () {
    var sdcard = navigator.getDeviceStorage("sdcard");

    var request_del = sdcard.delete("greg_events.json");
    request_del.onsuccess = function () {};
    setTimeout(function () {
      let data = localStorage.getItem("events");
      var file = new Blob([data], {
        type: "application/json",
      });

      var request = sdcard.addNamed(file, "greg_events.json");

      request.onsuccess = function () {
        var name = this.result;
        helper.toaster("events exported, greg_events.json", 5000);
      };

      request.onerror = function () {
        helper.toaster("Unable to write the file", 2000);
      };
    }, 2000);
  };

  let export_ical = function () {
    if (!navigator.getDeviceStorage) return false;
    var sdcard = navigator.getDeviceStorage("sdcard");

    var request_del = sdcard.delete("greg_events.ics");
    request_del.onsuccess = function () {};
    setTimeout(function () {
      //convert
      let data = JSON.parse(localStorage.getItem("events"));

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

      var request = sdcard.addNamed(file, "greg_events.ics");

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
    //search gpx
    let finder_gpx = new Applait.Finder({
      type: "sdcard",
      debugMode: false,
    });

    finder_gpx.search(".ics");
    finder_gpx.on("searchComplete", function (needle, filematchcount) {
      if (filematchcount == 0) {
        helper.toaster("xxx", 2000);
      }
    });

    finder_gpx.on("fileFound", function (file, fileinfo, storageName) {
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
    });
  };

  /////////////////////////
  /////Load GPX///////////
  ///////////////////////
/*
  var iCalendarData = [
    "BEGIN:VCALENDAR",
    "CALSCALE:GREGORIAN",
    "PRODID:-//Example Inc.//Example Calendar//EN",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "DTSTAMP:20080205T191224Z",
    "DTSTART:20081006",
    "SUMMARY:Planning meeting",
    "UID:4088E990AD89CB3DBB484909",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

*/





  function loadICS(filename) {
    let finder = new Applait.Finder({
      type: "sdcard",
      debugMode: false,
    });
    finder.search(filename);

    finder.on("searchComplete", function (needle, filematchcount) {
      console.log(filematchcount);
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
        var data = event.target.result.split(/\r\n|\n/);
        data = data.join("\r\n")
        
          var jcalData = ICAL.parse(data);
          var vcalendar = new ICAL.Component(jcalData);
          var vevent = vcalendar.getFirstSubcomponent("vevent");
         var summary = vevent.getFirstPropertyValue("summary");
        console.log(summary);
        

        let imp = {
          BEGIN: "VEVENT",
          UID: helper.uid(),
          SUMMARY: vevent.getFirstPropertyValue("summary"),
          LOCATION: vevent.getFirstPropertyValue("location"),
          DESCRIPTION: vevent.getFirstPropertyValue("description"),
          CLASS: "PRIVATE",
          DTSTAMP: vevent.getFirstPropertyValue("dtstamp"),
          DTSTART: vevent.getFirstPropertyValue("dtstart"),
          DTEND: vevent.getFirstPropertyValue("dtend"),
          date: vevent.getFirstPropertyValue("dtstamp"),
          weekday: weekday[0],
          time_start: "",
          time_end: "",
          notification: "",
          alarm: "",
          END: "VEVENT",
        };

           events.push(imp);

        console.log(imp);

         
      };

      reader.readAsText(file);
    });
  }

  return {
    export_ical,
    export_json,
    list_ics,
    loadICS,
  };
})();
