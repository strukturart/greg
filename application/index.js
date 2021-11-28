"use strict";

//alarm notification
if (navigator.mozSetMessageHandler) {
  navigator.mozSetMessageHandler("alarm", function (message) {
    console.log("Alarm fired: " + JSON.stringify(message));
    helper.notify("Greg", message.data.foo, false);
  });
}

let status = {
  view: "month",
  selected_day: "",
  visible: false,
  update_event_id: "",
};

function handleVisibilityChange() {
  if (document.visibilityState === "hidden") {
    status.visible = false;
  } else {
    setTimeout(function () {
      status.visible = true;
    }, 5000);
  }
}

let events;

if (localStorage.getItem("events") != null) {
  events = JSON.parse(localStorage.getItem("events"));
} else {
  events = [];
}

document.addEventListener("DOMContentLoaded", function () {
  handleVisibilityChange();

  //current day
  //with leading 0
  let today = new Date();
  let currentMonth = today.getMonth() + 1;
  let currentYear = today.getFullYear();
  let currentDay = today.getDate();

  let monthAndYear = document.getElementById("monthAndYear");

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

  let jump_to_today = function () {
    showCalendar(currentMonth, currentYear);

    status.selected_day = document.activeElement.getAttribute("data-date");
  };

  function next() {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
  }

  function previous() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
  }

  function jump() {
    showCalendar(currentMonth, currentYear);
  }

  //check if has event
  let event_check = function (date) {
    let f;

    for (let t = 0; t < events.length; t++) {
      f = false;

      console.log(date + "," + events[t].date);

      if (date === events[t].date) {
        console.log("match");
        f = true;
        t = events.length + 1;
      }
    }
    return f;
  };

  jump_to_today();

  //////////////
  //BUILD CALENDAR
  //////////////

  function showCalendar(month, year) {
    helper.bottom_bar("events", "add", "options");

    let firstDay = new Date(year, month).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    //selectYear.value = year;
    //selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
      // creates a table row
      let row = document.createElement("div");
      row.classList.add("flex");
      row.classList.add("width-100");

      //creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          let cell = document.createElement("div");
          let cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > daysInMonth) {
          break;
        } else {
          let cell = document.createElement("div");
          let span = document.createElement("span");
          let cellText = document.createTextNode(date);
          cell.appendChild(cellText);
          cell.appendChild(span);

          let p = year + "-" + month + "-" + date;
          console.log("tt" + p);
          //check if has event
          if (event_check(p)) {
            cell.classList.add("event");
          }

          //set tabindex
          cell.setAttribute("tabindex", date - 1);

          month = `0${month + 1}`.slice(-2);
          let day = `0${date}`.slice(-2);

          p = year + "-" + month + "-" + day;

          console.log(status);
          cell.setAttribute("data-date", p);

          cell.classList.add("item");
          row.appendChild(cell);
          date++;
        }
      }

      tbl.appendChild(row);
    }

    document.querySelectorAll(".item")[0].focus();
    //highlight current day

    if (currentMonth == month && currentYear == year) {
      document.querySelectorAll(".item")[currentDay - 1].focus();
      document.querySelectorAll(".item")[currentDay - 1].classList.add("today");
    }
    status.selected_day = document.activeElement.getAttribute("data-date");
  }

  /////////////////
  ///NAVIGATION
  /////////////////

  let nav = function (move) {
    const currentIndex = document.activeElement.tabIndex;
    const next = currentIndex + move;
    let items;

    if (status.view == "month") {
      items = document.querySelectorAll(".item");
    }
    if (
      status.view == "add-edit-event" ||
      status.view == "list-view" ||
      status.view == "options"
    ) {
      document.getElementById("add-edit-event").firstElementChild.focus();

      if (
        document.activeElement.parentNode.classList.contains("input-parent")
      ) {
        document.activeElement.parentNode.focus();
      }

      let b = document.activeElement.parentNode;
      items = b.querySelectorAll(".item");
    }

    const targetElement = items[next];
    targetElement.focus();

    const rect = document.activeElement.getBoundingClientRect();
    const elY =
      rect.top - document.body.getBoundingClientRect().top + rect.height / 2;

    document.activeElement.parentNode.scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: "smooth",
    });

    if (status.view == "month") {
      status.selected_day = targetElement.getAttribute("data-date");

      console.log(status);
    }

    if (status.view == "list-view") {
      status.selected_day = targetElement.getAttribute("data-date");

      console.log(status);
    }
  };

  ///////////////
  //STORE EVENTS//
  ///////////////

  let clear_form = function () {
    document.querySelectorAll("div#add-edit-event input").forEach(function (e) {
      e.value = "";
    });
  };

  function uid() {
    function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return "greg@" + _p8() + _p8(true) + _p8(true) + _p8();
  }

  let add_alarm = function (date, message_text, id) {
    if (navigator.mozAlarms) {
      let t = false;
      // This is arbitrary data pass to the alarm
      var data = {
        foo: message_text,
        event_id: id,
      };

      // The "honorTimezone" string is what make the alarm honoring it
      var request = navigator.mozAlarms.add(date, "honorTimezone", data);

      request.onsuccess = function () {
        //console.log(this.result);
      };

      request.onerror = function () {
        console.log("An error occurred: " + this.error.name);
      };
    }
  };

  //may better to compare all alarms
  //with all events
  //to clean
  let remove_alarm = function (id) {
    if (navigator.mozAlarms) {
      let request = navigator.mozAlarms.getAll();

      request.onsuccess = function () {
        this.result.forEach(function (alarm) {
          if (alarm.data.event_id == id) {
            let req = navigator.mozAlarms.remove(alarm.id);

            req.onsuccess = function () {
              console.log("removed");
            };

            req.onerror = function () {
              console.log("An error occurred: " + this.error.name);
            };
          }
        });
      };

      request.onerror = function () {
        console.log("An error occurred:", this.error.name);
      };
    }
  };

  let test_alarm = function (id) {
    if (navigator.mozAlarms) {
      var request = navigator.mozAlarms.getAll();

      request.onsuccess = function () {
        this.result.forEach(function (alarm) {
          console.log("Id:", alarm.id);
          console.log("date:", alarm.date);
          console.log("respectTimezone:", alarm.respectTimezone);
          console.log("data:", JSON.stringify(alarm.data));
        });
      };

      request.onerror = function () {
        console.log("An error occurred:", this.error.name);
      };
    }
  };

  //STORE EVENT

  let store_event = function () {
    let start_time = "00:00:00";
    if (document.getElementById("event-time-start").value != "") {
      start_time = document.getElementById("event-time-start").value;
    }

    let end_time = "00:00:00";
    if (document.getElementById("event-time-end").value != "") {
      end_time = document.getElementById("event-time-end").value;
    }

    let convert_dt_start =
      document.getElementById("event-date").value + " " + start_time;

    let convert_dt_end =
      document.getElementById("event-date").value + " " + end_time;

    //notification before event
    let notification_time = document.getElementById("event-notification-time")
      .value;

    var calc_notification = new Date(convert_dt_start);
    calc_notification.setMinutes(
      calc_notification.getMinutes() - notification_time
    );

    let event = {
      BEGIN: "VEVENT",
      UID: uid(),
      SUMMARY: document.getElementById("event-title").value,
      LOCATION: document.getElementById("event-location").value,
      DESCRIPTION: document.getElementById("event-description").value,
      CLASS: "PRIVATE",
      DTSTAMP: new Date().toISOString(),
      DTSTART: new Date(convert_dt_start).toISOString(),
      DTEND: new Date(convert_dt_end).toISOString(),
      date: document.getElementById("event-date").value,
      time_start: document.getElementById("event-time-start").value,
      time_end: document.getElementById("event-time-end").value,
      notification: notification_time,
      alarm: "",
      END: "VEVENT",
    };

    add_alarm(calc_notification, event.SUMMARY, event.UID);
    events.push(event);

    localStorage.setItem("events", JSON.stringify(events));

    eximport.export_ical();

    //clean form
    clear_form();

    status.view = "month";
    router();
  };

  let update_event = function () {
    events.forEach(function (index) {
      if (index.UID == status.update_event_id) {
        index.SUMMARY = document.getElementById("event-title").value;
        index.DESCRIPTION = document.getElementById("event-description").value;
        index.LOCATION = document.getElementById("event-location").value;
        index.date = document.getElementById("event-date").value;
        index.time_start = document.getElementById("event-time-start").value;
        index.time_end = document.getElementById("event-time-end").value;
      }
    });

    localStorage.setItem("events", JSON.stringify(events));
    //clean form
    clear_form();

    status.update_event_id = "";
    status.view = "month";
    router();
    eximport.export_ical();
  };

  let delete_event = function () {
    let f = false;
    events.forEach(function (index) {
      if (index.UID == status.update_event_id) {
        remove_alarm(status.update_event_id);
        events.splice(index, 1);
        f = true;
      }
    });
    clear_form();
    status.update_event_id = "";
    localStorage.setItem("events", JSON.stringify(events));
    eximport.export_ical();
    return f;
  };

  let edit_event = function () {
    status.update_event_id = document.activeElement.getAttribute("data-id");
    events.forEach(function (index) {
      if (index.UID == status.update_event_id) {
        console.log(index.date);
        document.getElementById("event-title").value = index.SUMMARY;
        document.getElementById("event-date").value = index.date;
        document.getElementById("event-time-start").value = index.time_start;
        document.getElementById("event-time-end").value = index.time_end;
        document.getElementById("event-description").value = index.DESCRIPTION;
        document.getElementById("event-location").value = index.LOCATION;
        document.querySelector("#event-notification-time").value =
          index.notification;
      }
    });
  };

  let set_tabindex = function () {
    document.querySelectorAll("article").forEach(function (i, p) {
      i.setAttribute("tabindex", p);
    });
  };

  document.querySelectorAll("INPUT").forEach(function (ob) {
    ob.addEventListener("input", function () {
      console.log("ready");
    });
  });

  ////////////////////
  ////BUILD EVENT-LIST
  ///////////////////

  let sort_array = function (arr, item_key, type) {
    if (type == "date") {
      arr.sort((a, b) => {
        let da = new Date(a[item_key]),
          db = new Date(b[item_key]);
        return da - db;
      });
    }

    //sort by number
    if (type == "number") {
      arr.sort((a, b) => {
        return b[item_key] - a[item_key];
      });
    }
    //sort by string
    if (type == "string") {
      arr.sort((a, b) => {
        let fa = a[item_key].toLowerCase(),
          fb = b[item_key].toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    }
  };

  function renderHello(arr) {
    sort_array(arr, "date", "date");

    var template = document.getElementById("template").innerHTML;
    var rendered = Mustache.render(template, {
      data: arr,
    });
    document.getElementById("list-view").innerHTML = rendered;
    set_tabindex();
  }

  renderHello(events);

  ///////////////////
  ///ROUTER
  /////////////////

  const month = document.getElementById("calendar");
  const add_edit_event = document.getElementById("add-edit-event");
  const list_view = document.getElementById("list-view");
  const options = document.getElementById("options");

  const pages = document.querySelectorAll(".page");

  let router = function (view) {
    pages.forEach(function (index) {
      index.style.display = "none";
    });

    if (view == "view") {
      if (status.view == "month") {
        status.view = "list-view";
      } else {
        status.view = "month";
      }
    }
    //add event view
    if (status.view == "add-edit-event") {
      //set date with leading 0
      var date = new Date(document.activeElement.getAttribute("data-date"));
      var result = date.toISOString().split("T")[0];
      status.selected_day = result;
      console.log(status);

      document.getElementById("event-date").value = status.selected_day;
      add_edit_event.style.display = "block";
      add_edit_event.querySelectorAll(".item")[0].focus();
      helper.bottom_bar("", "edit", "");

      if (status.update_event_id != "") {
        document.getElementById("save-event").innerText = "update";
      }
      if (status.update_event_id == "") {
        document.getElementById("save-event").innerText = "save";
        document.getElementById("event-time-start").value =
          new Date().getHours() + ":" + new Date().getMinutes();

        document.getElementById("event-time-end").value =
          new Date().getHours() + 1 + ":" + new Date().getMinutes();
      }
      return true;
    }
    //month view
    if (status.view == "month") {
      options.style.display = "none";
      month.style.display = "block";
      helper.bottom_bar("events", "add", "options");
      status.update_event_id == "";
      showCalendar(currentMonth, currentYear);

      clear_form();
    }
    //list view
    if (status.view == "list-view") {
      console.log(status.selected_day);
      helper.bottom_bar("month", "edit", "options");

      list_view.style.display = "block";
      renderHello(events);

      document.querySelectorAll("article").forEach(function (e) {
        if (e.getAttribute("data-date") == status.selected_day) {
          status.selected_day = document.activeElement.getAttribute(
            "data-date"
          );
          e.focus();
        } else {
          document.querySelectorAll("div#list-view article")[0].focus();
        }
      });
    }

    if (status.view == "options") {
      document.getElementById("options").style.display = "block";
      document.querySelectorAll("div#options button")[0].focus();
    }
  };

  //////////////////////////////
  ////KEYPAD HANDLER////////////
  //////////////////////////////

  let longpress = false;
  const longpress_timespan = 1000;
  let timeout;

  function repeat_action(param) {
    switch (param.key) {
      case "0":
        break;
    }
  }

  //////////////
  ////LONGPRESS
  /////////////

  function longpress_action(param) {
    switch (param.key) {
      case "0":
        break;

      case "ArrowLeft":
        if (status.view == "list-view") {
          delete_event();
        }

        break;
    }
  }

  ///////////////
  ////SHORTPRESS
  //////////////

  function shortpress_action(param) {
    switch (param.key) {
      case "*":
        jump_to_today();

        break;

      case "ArrowUp":
        if (status.view == "month") {
          nav(-7);
        }
        if (
          status.view == "add-edit-event" ||
          status.view == "list-view" ||
          status.view == "options"
        ) {
          nav(-1);
        }
        break;
      case "ArrowDown":
        if (status.view == "month") {
          nav(+7);
        }
        if (
          status.view == "add-edit-event" ||
          status.view == "list-view" ||
          status.view == "options"
        ) {
          nav(+1);
        }

        break;
      case "ArrowRight":
        if (status.view != "month") return true;
        nav(1);
        break;
      case "ArrowLeft":
        if (status.view != "month") return true;
        nav(-1);
        break;

      case "1":
        previous();
        break;
      case "3":
        next();
        break;

      case "9":
        test_alarm();
        break;

      case "7":
        break;

      case "SoftRight":
      case "Alt":
        status.view = "options";
        router();
        break;

      case "SoftLeft":
      case "Control":
        router("view");
        break;

      case "Enter":
        if (!status.visible) return false;
        if (document.activeElement.classList.contains("input-parent")) {
          document.activeElement.children[1].focus();
          return true;
        }
        if (status.view == "month") {
          status.view = "add-edit-event";
          router();
        }

        if (document.activeElement.id == "save-event") {
          if (status.update_event_id != "") {
            update_event();
          } else {
            store_event();
          }
        }

        if (document.activeElement.id == "delete-event") {
          if (delete_event()) {
            status.view = "month";
            router();
          }
        }

        if (status.view == "options") {
          if (
            document.activeElement.getAttribute("data-function") == "export"
          ) {
            eximport.export_ical();
          }
          if (
            document.activeElement.getAttribute("data-function") == "import"
          ) {
          }
        }
        if (status.view == "list-view") {
          edit_event();

          status.view = "add-edit-event";
          router();
        }
        break;

      case "Backspace":
        if (
          status.view == "add-edit-event" &&
          document.activeElement.tagName != "INPUT"
        ) {
          status.view = "month";
          router();
        }

        if (status.view == "options") {
          status.view = "month";
          router();
        }

        break;
    }
  }

  /////////////////////////////////
  ////shortpress / longpress logic
  ////////////////////////////////

  function handleKeyDown(evt) {
    if (evt.key === "Backspace") {
      evt.preventDefault();
    }

    if (evt.key === "EndCall") {
      evt.preventDefault();
      helper.goodbye();
    }
    if (!evt.repeat) {
      longpress = false;
      timeout = setTimeout(() => {
        longpress = true;
        longpress_action(evt);
      }, longpress_timespan);
    }

    if (evt.repeat) {
      if (evt.key == "Backspace") evt.preventDefault(); // Disable close app by holding backspace

      longpress = false;
      repeat_action(evt);
    }
  }

  function handleKeyUp(evt) {
    evt.preventDefault();

    if (evt.key == "Backspace" && document.activeElement.tagName == "INPUT") {
    }

    clearTimeout(timeout);
    if (!longpress) {
      shortpress_action(evt);
    }
  }

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
});

document.addEventListener("visibilitychange", handleVisibilityChange, false);
