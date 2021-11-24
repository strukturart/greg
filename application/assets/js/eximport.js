const eximport = (() => {
  //where the magic happens
  let export_ical = function () {
    //name of event in iCal
    this.eventName = "My Cool Event";

    //name of file to download as
    this.fileName = "my-event.ics";

    //start time of event in iCal
    this.dateStart = "2016-04-01";

    //end time of event in iCal
    this.dateEnd = "2016-04-02";

    //helper functions

    //iso date for ical formats
    this._isofix = function (d) {
      var offset = ("0" + new Date().getTimezoneOffset() / 60).slice(-2);

      if (typeof d == "string") {
        return d.replace(/\-/g, "") + "T" + offset + "0000Z";
      } else {
        return (
          d.getFullYear() +
          this._zp(d.getMonth() + 1) +
          this._zp(d.getDate()) +
          "T" +
          this._zp(d.getHours()) +
          "0000Z"
        );
      }
    };

    //zero padding for data fixes
    this._zp = function (s) {
      return ("0" + s).slice(-2);
    };
    this._save = function (fileURL) {
      if (!window.ActiveXObject) {
        var save = document.createElement("a");
        save.href = fileURL;
        save.target = "_blank";
        save.download = this.fileName || "unknown";

        var evt = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: false,
        });
        save.dispatchEvent(evt);

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      }

      // for IE < 11
      else if (!!window.ActiveXObject && document.execCommand) {
        var _window = window.open(fileURL, "_blank");
        _window.document.close();
        _window.document.execCommand("SaveAs", true, this.fileName || fileURL);
        _window.close();
      }
    };

    var now = new Date();
    var ics_lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Addroid Inc.//iCalAdUnit//EN",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      "UID:event-" + now.getTime() + "@addroid.com",
      "DTSTAMP:" + this._isofix(now),
      "DTSTART:" + this._isofix(this.dateStart),
      "DTEND:" + this._isofix(this.dateEnd),
      "DESCRIPTION:" + this.eventName,
      "SUMMARY:" + this.eventName,
      "LAST-MODIFIED:" + this._isofix(now),
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR",
    ];

    var dlurl = "data:text/calendar;base64," + btoa(ics_lines.join("\r\n"));

    try {
      this._save(dlurl);
    } catch (e) {
      console.log(e);
    }
  };

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

  return {
    export_ical,
    export_json,
  };
})();
