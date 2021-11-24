"use strict";

let status = {
  view: "month",
  selected_day: "",
  visible: "",
  update_event_id: "",
};

let events;

if (localStorage.getItem("events") != null) {
  events = JSON.parse(localStorage.getItem("events"));
} else {
  events = [];
}

document.addEventListener("DOMContentLoaded", function () {
  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let currentDay = today.getDate();
  //let selectYear = document.getElementById("year");
  //let selectMonth = document.getElementById("month");
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
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
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
    //currentYear = parseInt(selectYear.value);
    //currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
  }

  let event_check = function (date) {
    let f;

    for (let t = 0; t < events.length; t++) {
      f = false;

      if (date === events[t].date) {
        f = true;
        t = 1000;
      }
    }
    return f;
  };

  let monthAndYear = document.getElementById("monthAndYear");
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
          let cellText = document.createTextNode(date);
          // color today's date
          cell.appendChild(cellText);
          cell.setAttribute("tabindex", date - 1);
          let p = year + "-" + (month + 1) + "-" + date;
          cell.setAttribute("data-date", p);
          if (event_check(p)) {
            cell.classList.add("event");
          }

          cell.classList.add("item");
          row.appendChild(cell);
          date++;
        }
      }

      tbl.appendChild(row);
    }

    document.querySelectorAll(".item")[0].focus();
    status.seleted_day = document.activeElement.getAttribute("data-date");
    //highlight current day
    if (today.getMonth() == month && today.getFullYear() == year) {
      document.querySelectorAll(".item")[currentDay - 1].focus();
      document.querySelectorAll(".item")[currentDay - 1].classList.add("today");
    }
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

    if (status.view == "month") {
      status.selected_day = targetElement.getAttribute("data-date");
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

  let store_event = function () {
    let event = {
      id: today.getTime() / 1000,
      title: document.getElementById("event-title").value,
      date: document.getElementById("event-date").value,
      time: document.getElementById("event-time").value,
      description: document.getElementById("event-description").value,
    };

    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
    //clean form
    document.getElementById("event-title").value = "";
    document.getElementById("event-date").value = "";

    status.view = "month";
    router();
  };

  let update_event = function () {
    events.forEach(function (index, key, value) {
      console.log(index.id);

      if (index.id == status.update_event_id) {
        index.title = document.getElementById("event-title").value;
        index.date = document.getElementById("event-date").value;
        index.time = document.getElementById("event-time").value;
        index.description = document.getElementById("event-description").value;
        index.location = document.getElementById("event-location").value;
      }
    });

    localStorage.setItem("events", JSON.stringify(events));
    //clean form
    clear_form();

    status.update_event_id = "";
    status.view = "month";
    router();
  };

  let delete_event = function () {
    events.forEach(function (index, key, value) {
      console.log(index.id);

      if (index.id == status.update_event_id) {
      }
    });
    clear_form();
  };

  let edit_event = function () {
    status.update_event_id = document.activeElement.getAttribute("data-id");
    events.forEach(function (index, key, value) {
      if (index.id == status.update_event_id) {
        document.getElementById("event-title").value = index.title;
        document.getElementById("event-date").value = index.date;
        document.getElementById("event-time").value = index.time;
        document.getElementById("event-description").value = index.description;
      }
    });
  };

  let set_tabindex = function () {
    document.querySelectorAll("article").forEach(function (i, p) {
      i.setAttribute("tabindex", p);
    });
  };

  ////////////////////
  ////BUILD EVENT-LIST
  ///////////////////

  function renderHello(arr) {
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
      document.getElementById("event-date").value = status.selected_day;
      add_edit_event.style.display = "block";
      add_edit_event.querySelectorAll(".item")[0].focus();
      helper.bottom_bar("", "edit", "");

      if (status.update_event_id != "") {
        document.getElementById("save-event").innerText = "update";
      }
      if (status.update_event_id == "") {
        document.getElementById("save-event").innerText = "save";
      }
      return true;
    }
    //month view
    if (status.view == "month") {
      options.style.display = "none";
      month.style.display = "block";
      helper.bottom_bar("events", "add", "options");
      status.update_event_id == "";
      clear_form();
    }
    //list view
    if (status.view == "list-view") {
      helper.bottom_bar("month", "edit", "options");

      list_view.style.display = "block";
      renderHello(events);

      console.log(status);

      document.querySelectorAll("article").forEach(function (e) {
        if (e.getAttribute("data-fdate") == status.selected_day) {
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
        nav(1);
        break;
      case "ArrowLeft":
        nav(-1);
        break;

      case "1":
        previous();
        break;
      case "3":
        next();
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
        if (status.view == "options") {
          if (
            document.activeElement.getAttribute("data-function") == "export"
          ) {
            eximport.export_json();
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
        if (status.view == "add-edit-event") {
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

    if (evt.key == "Backspace") evt.preventDefault(); // Disable close app by holding backspace

    if (evt.key == "Backspace" && document.activeElement.tagName == "INPUT") {
      evt.preventDefault();
    }

    clearTimeout(timeout);
    if (!longpress) {
      shortpress_action(evt);
    }
  }

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  document.addEventListener("visibilitychange", function () {
    setTimeout(function () {
      status.visible = document.visibilityState;
    }, 1000);
  });
});
