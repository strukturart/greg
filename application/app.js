"use strict";

import localforage from "localforage";
import Mustache from "mustache";
import { sort_array } from "/assets/js/helper.js";
import { toaster } from "/assets/js/helper.js";
import { validate } from "/assets/js/helper.js";
import { uid } from "/assets/js/helper.js";
import { pick_image } from "/assets/js/helper.js";
import { bottom_bar } from "/assets/js/helper.js";
import { getMoonPhase } from "/assets/js/getMoonPhase.js";
import { list_ics } from "/assets/js/eximport.js";
import { fetch_ics } from "/assets/js/eximport.js";
import { export_ical } from "/assets/js/eximport.js";
import { loadICS } from "/assets/js/eximport.js";
import { start_scan } from "/assets/js/scan.js";
import { stop_scan } from "/assets/js/scan.js";

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

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();
let monthAndYear = document.getElementById("monthAndYear");

let once = false;

export let status = {
  view: "month",
  selected_day: "",
  visible: false,
  update_event_id: "",
};

let settings = {};

let blob = "";
export let events = [];

//ads || ads free

//KaioOs ads
let getManifest = function (callback) {
  if (!navigator.mozApps) {
    return false;
  }
  let self = navigator.mozApps.getSelf();
  self.onsuccess = function () {
    callback(self.result);
  };
  self.onerror = function () {};
};

let self;
//KaiOs store true||false
function manifest(a) {
  self = a.origin;
  let t = document.getElementById("KaiOsAds-Wrapper");
  if (a.installOrigin == "app://kaios-plus.kaiostech.com") {
    document.querySelector("#KaiOsAds-Wrapper iframe").src = "ads.html";
  } else {
    console.log("Ads free");
    t.style.display = "none";
  }
}

getManifest(manifest);

// ////////
// finde closest event to selected date in list view
// ////////

let find_closest_date = function (search_term) {
  let t = 0;
  let search = new Date(search_term).getTime();

  for (let i = 0; i < events.length; i++) {
    let item = new Date(events[i].dateStart).getTime();

    if (search < item) {
      t = events[i - 1].dateStart;
      i = events.length;
    }
    //after last event
    //focus last event
    if (search > new Date(events[events.length - 1].dateStart).getTime()) {
      t = events[events.length - 1].dateStart;
      i = events.length;
    }
  }
  document
    .querySelectorAll("div#list-view article[data-date='" + t + "']")[0]
    .focus();
  return t;
};

// check if has event
let event_check = function (date) {
  let feedback = {
    date: "",
    event: false,
    subscription: false,
    multidayevent: false,
    rrule: "none",
  };

  for (let t = 0; t < events.length; t++) {
    if (typeof events[t] === "object") {
      feedback.event = false;
      feedback.subscription = false;
      feedback.multidayevent = false;
      feedback.rrule = false;
      feedback.date = date;

      let a = new Date(events[t].dateStart).getTime();
      let b = new Date(events[t].dateEnd).getTime();
      let c = new Date(date).getTime();

      // multi day event
      if (events[t]["rrule_"] == "none") {
        if (a === c || b === c || (a < c && b > c)) {
          feedback.event = true;
          if (events[t].isSubscription === true) {
            feedback.subscription = true;
          }

          if (events[t].multidayevent === true) {
            feedback.multidayevent = true;
          }
          t = events.length;
        }
      }
    }
  }
  return feedback;
};

// check if has event
let rrule_check = function (date) {
  let feedback = {
    date: "",
    event: false,
    subscription: false,
    multidayevent: false,
    rrule: "none",
  };

  for (let t = 0; t < events.length; t++) {
    if (typeof events[t] === "object") {
      feedback.event = false;
      feedback.subscription = false;
      feedback.multidayevent = false;
      feedback.rrule = false;
      feedback.date = date;

      let a = new Date(events[t].dateStart).getTime();
      let b = new Date(events[t].dateEnd).getTime();
      let c = new Date(date).getTime();

      //recurrences

      if (
        typeof events[t]["rrule_"] !== "undefined" &&
        events[t]["rrule_"] !== undefined
      ) {
        if (
          new Date(events[t].dateStart).getTime() <= new Date(date).getTime() &&
          new Date(date).getTime() <= new Date(events[t].dateEnd).getTime()
        ) {
          if (events[t].rrule_ == "MONTHLY") {
            if (
              new Date(events[t].dateStart).getDate() ===
              new Date(date).getDate()
            ) {
              feedback.rrule = true;
              t = events.length;
              return feedback;
            }
          }

          if (events[t]["rrule_"] == "DAILY") {
            feedback.rrule = true;
            t = events.length;
            return feedback;
          }

          if (events[t].rrule_ == "WEEKLY") {
            if (
              new Date(events[t].dateStart).getDay() === new Date(date).getDay()
            ) {
              feedback.rrule = true;
              t = events.length;
              return feedback;
            }
          }

          if (events[t].rrule_ == "YEARLY") {
            let tt = new Date(events[t].dateStart);
            let pp = new Date(date);

            if (
              tt.getDate() + "-" + tt.getMonth() ===
              pp.getDate() + "-" + pp.getMonth()
            ) {
              feedback.rrule = true;
              t = events.length;
              return feedback;
            }
          }
        }
      }
    }
  }
  return feedback;
};

//////////////////
//event slider
///////////

let slider = [];
let slider_index = 0;

let event_check_day = function (date) {
  slider = [];
  let k = document.querySelector("div#event-slider-indicator div");
  k.innerHTML = "";
  //hide all
  let item = document.querySelectorAll("div#event-slider article");

  for (let i = 0; i < item.length; i++) {
    item[i].style.display = "none";

    let a = new Date(item[i].getAttribute("data-date")).getTime();
    let b = new Date(item[i].getAttribute("data-date-end")).getTime();
    let c = new Date(date).getTime();

    //hide/show alarm icon
    if (item[i].getAttribute("data-alarm")) {
      if (item[i].getAttribute("data-alarm") == "none")
        item[i].querySelector("div.icons-bar img.bell").style.display = "none";
    }
    //all day event
    if (
      item[i].getAttribute("data-time-start") == "00:00:00" &&
      item[i].getAttribute("data-time-end") == "00:00:00"
    ) {
      item[i].querySelector("div.time").innerHTML = "All day";
    }

    let d = item[i].getAttribute("data-rrule");

    if (d === "none" || d === "") {
      if (a === c || b === c || (a < c && b > c)) {
        slider.push(item[i]);
        slider[0].style.display = "block";

        k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
      }
    } else {
      if (a === c || b === c || (a < c && b > c && d)) {
        //recurrences
        //YEAR
        if (d == "YEARLY") {
          let tt = new Date(item[i].getAttribute("data-date"));
          let pp = new Date(date);

          if (
            tt.getDate() + "-" + tt.getMonth() ===
            pp.getDate() + "-" + pp.getMonth()
          ) {
            slider.push(item[i]);
            slider[0].style.display = "block";

            k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
          }
        }

        //WEEK
        if (d == "WEEKLY") {
          if (
            new Date(item[i].getAttribute("data-date")).getDay() ==
            new Date(date).getDay()
          ) {
            slider.push(item[i]);
            slider[0].style.display = "block";

            k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
          }
        }

        //MONTH

        if (d == "MONTHLY") {
          if (
            new Date(item[i].getAttribute("data-date")).getDate() ==
            new Date(date).getDate()
          ) {
            slider.push(item[i]);
            slider[0].style.display = "block";

            k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
          }
        }

        if (d == "DAILY") {
          if (a === c || b === c || (a < c && b > c)) {
            slider.push(item[i]);
            slider[0].style.display = "block";

            k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
          }
        }
      }
    }
  }
  if (slider != "" && slider.length > 0) {
    k.style.opacity = 100;
  } else {
    k.style.opacity = 0;
  }
};

let slider_navigation = function () {
  let p = document.querySelectorAll("div#event-slider-indicator div div");
  if (slider_index == slider.length - 1) {
    slider_index = -1;
  }
  slider_index++;
  slider.forEach(function (item) {
    item.style.display = "none";
  });
  slider[slider_index].style.display = "block";
  p.forEach(function (item) {
    item.classList.remove("active");
  });
  p[slider_index].classList.add("active");
};

////
// JUMP TO TODAY
////

let jump_to_today = function () {
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  showCalendar(currentMonth, currentYear);

  event_check_day(status.selected_day);
  status.selected_day = document.activeElement.getAttribute("data-date");
};

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
  event_check_day(status.selected_day);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
  event_check_day(status.selected_day);
}

//////////////
//BUILD CALENDAR
//////////////

// get weeknumber
Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);

  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));

  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);

  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

let showCalendar = function (month, year) {
  bottom_bar("add", "events", "options");

  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById("calendar-body");

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + " " + year;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement("div");
    row.classList.add("flex");
    row.classList.add("row");
    row.classList.add("width-100");

    // creating individual cells, filing them up with data.
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
        let moon = document.createElement("div");

        let cellText = document.createTextNode(date);
        cell.appendChild(cellText);
        cell.appendChild(span);

        // set tabindex
        cell.setAttribute("tabindex", date - 1);

        // store date with leading 0
        // because input type date
        // accept only day month with leading zero
        let mmonth = `0${month + 1}`.slice(-2);
        let day = `0${date}`.slice(-2);

        let p = year + "-" + mmonth + "-" + day;

        moon.classList.add("moon-phase-" + getMoonPhase(year, month, date));
        cell.appendChild(moon);

        cell.setAttribute("data-date", p);

        cell.setAttribute("data-index", new Date(p).toISOString());

        // check if has event
        if (events.length > 0) {
          if (event_check(p).event) {
            cell.classList.add("event");
          }

          if (rrule_check(p).rrule) {
            cell.classList.add("event");
          }

          // check if has event + subscription
          if (event_check(p).subscription == true) {
            cell.classList.add("subscription");
          }
        }

        cell.classList.add("item");
        row.appendChild(cell);

        date++;
      }
    }

    // add weeknumbers
    let week = document.createElement("span");
    week.classList.add("weeknumber");

    let weekText = document.createTextNode(
      new Date(year, month, date).getWeek()
    );

    week.appendChild(weekText);
    row.appendChild(week);

    //add row
    tbl.appendChild(row);
  }

  document.querySelectorAll(".item")[0].focus();
  status.selected_day = document.activeElement.getAttribute("data-date");

  // highlight current day
  if (today.getMonth() == month && today.getFullYear() == year) {
    document.querySelectorAll(".item")[currentDay - 1].focus();
    document.querySelectorAll(".item")[currentDay - 1].classList.add("today");
  }
};

let set_tabindex = function () {
  document.querySelectorAll("div#list-view article").forEach(function (i, p) {
    i.setAttribute("tabindex", p);
  });
};

//RENDER

function renderHello(arr) {
  document.getElementById("event-slider").style.opacity = 0;
  sort_array(arr, "dateStart", "date");

  var template = document.getElementById("template").innerHTML;
  var rendered = Mustache.render(template, { data: arr });
  document.getElementById("list-view").innerHTML = rendered;
  document.getElementById("event-slider").innerHTML = rendered;
  document.getElementById("event-slider").style.opacity = 100;

  set_tabindex();
  //event_check_day(document.activeElement.getAttribute("data-date"));

  //format date
  document.querySelectorAll("article").forEach(function (index) {
    let w = index.getAttribute("data-time-start");
    let s = index.getAttribute("data-time-end");

    if (w == "00:00:00" && s == "00:00:00") {
      index.querySelector("div.time").innerHTML = "All day";
    }

    let t = new Date(index.getAttribute("data-date"));
    let n = new Date(index.getAttribute("data-date-end"));

    let d =
      weekday[t.getDay()] +
      ", " +
      t.getFullYear() +
      " " +
      months[t.getMonth()] +
      " " +
      t.getDate();

    let m =
      weekday[n.getDay()] +
      ", " +
      n.getFullYear() +
      " " +
      months[n.getMonth()] +
      " " +
      n.getDate();

    // to do singel day event or not
    if (index.classList.contains("multidayevent")) {
      index.querySelector("div.date").innerText = d + " - " + m;
    } else {
      index.querySelector("div.date").innerText = d;
    }
  });
}

let clear_form = function () {
  document.querySelectorAll("div#add-edit-event input").forEach(function (e) {
    e.value = "";
    document.getElementById("form-image").src = "";
    blob = "";
  });
};

/*
 ///////////////
// ///////////////
// /////////////////
// /ROUTER
// ///////////////
// ///////////////
// //////////////
*/

const month = document.getElementById("calendar");
const add_edit_event = document.getElementById("add-edit-event");
const list_view = document.getElementById("list-view");
const options = document.getElementById("options");

let option_button_bar = function () {
  setTimeout(function () {
    if (status.view == "options") {
      if (
        document.activeElement.getAttribute("data-function") == "subscription"
      ) {
        bottom_bar("delete", "select", "");
        return true;
      } else {
        bottom_bar("", "select", "");
        return true;
      }
    }
  }, 500);
};

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

  // add event view
  if (status.view == "add-edit-event") {
    if (document.activeElement.hasAttribute("data-date"))
      status.selected_day = document.activeElement.getAttribute("data-date");

    document.getElementById("event-date").value = status.selected_day;

    add_edit_event.style.display = "block";
    document
      .querySelectorAll("div#add-edit-event .item")
      .forEach(function (i, p) {
        i.setAttribute("tabindex", p);
      });
    add_edit_event.querySelectorAll(".item")[0].focus();
    bottom_bar("", "edit", "");

    if (document.getElementById("event-date-end").value == "") {
      document.getElementById("event-date-end").value =
        document.getElementById("event-date").value;
    }

    if (status.edit_event) {
      document.getElementById("save-event").innerText = "update";
    }
    console.log(status.edit_event);

    if (!status.edit_event) {
      document.getElementById("save-event").innerText = "save";

      document.getElementById("event-notification-time").value =
        settings.default_notification;
    }
    return true;
  }

  // month view
  if (status.view == "month") {
    if (document.activeElement.hasAttribute("data-date"))
      status.selected_day = document.activeElement.getAttribute("data-date");

    options.style.display = "none";
    month.style.display = "block";
    bottom_bar("add", "events", "options");
    status.edit_event = false;

    let t = new Date(status.selected_day);
    currentMonth = t.getMonth();
    currentYear = t.getFullYear();

    let k = status.selected_day;
    showCalendar(currentMonth, currentYear);

    document
      .querySelectorAll("div#calendar-body div.item")
      .forEach(function (item) {
        if (item.getAttribute("data-date") == k) {
          item.focus();
          event_check_day(k);
        }
      });

    clear_form();
  }

  // list view
  if (status.view == "list-view") {
    if (document.activeElement.hasAttribute("data-date"))
      status.selected_day = document.activeElement.getAttribute("data-date");

    options.style.display = "none";
    status.edit_event = false;
    clear_form();

    bottom_bar("edit", "month", "options");

    list_view.style.display = "block";
    setTimeout(function () {
      let articles = document.querySelectorAll("div#list-view article");

      let success = false;
      for (var k = 0; k < articles.length; k++) {
        if (articles[k].getAttribute("data-date") == status.selected_day) {
          articles[k].focus();
          k = articles.length;
          success = true;
        }
      }

      for (var k = 0; k < articles.length; k++) {
        console.log(articles[k].getAttribute("data-alarm"));
        if (articles[k].getAttribute("data-alarm") == "none") {
          articles[k].querySelector("img.bell").style.display = "none";
        }
      }
      if (!success) {
        document.querySelectorAll("div#list-view article")[0].focus();
        find_closest_date(status.selected_day);
      }
      const rect = document.activeElement.getBoundingClientRect();
      const elY =
        rect.top - document.body.getBoundingClientRect().top + rect.height / 2;

      document.activeElement.parentNode.scrollBy({
        left: 0,
        top: elY - window.innerHeight / 2,
        behavior: "smooth",
      });
    }, 1000);
  }
  if (status.view == "options") {
    if (document.activeElement.hasAttribute("data-date"))
      status.selected_day = document.activeElement.getAttribute("data-date");

    if (!once) {
      list_ics();
      list_subscriptions();
      once = true;
    }

    document.getElementById("options").style.display = "block";
    document.querySelectorAll("div#options .item")[0].focus();
    document.getElementById("options").style.opacity = "1";
    document.getElementById("subscription-form").style.display = "none";
    setTimeout(function () {
      Array.from(document.querySelectorAll("div#options .item")).forEach(
        function (i, p) {
          i.setAttribute("tabindex", p);
        }
      );
    }, 2000);

    option_button_bar();
  }

  if (status.view == "subscription") {
    document.getElementById("options").style.opacity = "0.3";
    document.getElementById("subscription-form").style.display = "block";

    document
      .querySelectorAll("div#subscription-form div.item input")[0]
      .focus();

    bottom_bar("QR", "", "save");
  }
};

let list_subscriptions = function () {
  if (subscriptions == null) return false;

  subscriptions.forEach(function (item) {
    document
      .querySelector("div#options div#subscription-text")
      .insertAdjacentHTML(
        "afterend",
        '<button class="item dynamic" data-function="subscription">' +
          item.name +
          "</button>"
      );

    document.querySelectorAll("div#options button").forEach(function (i, p) {
      i.setAttribute("tabindex", p);
    });
  });
};

let lp = 0;
let load_subscriptions = function () {
  if (
    subscriptions == null ||
    subscriptions.lenght == -1 ||
    subscriptions.lenght == "undefined"
  )
    return false;

  if (lp < subscriptions.length) {
    fetch_ics(subscriptions[lp].url, load_subscriptions);
    lp++;
  } else {
  }
  jump_to_today();

  renderHello(events);

  event_check_day(document.activeElement.getAttribute("data-date"));
  if (document.activeElement.hasAttribute("data-date"))
    status.selected_day = document.activeElement.getAttribute("data-date");
};

let callback_scan = function (url) {
  bottom_bar("QR", "", "save");
  status.view = "subscription";
  document.querySelector("div#subscription-form input#cal-subs-url").value =
    url;
};
let subscriptions = new Array();
let store_subscription = function () {
  if (
    validate(document.getElementById("cal-subs-url").value) &&
    document.getElementById("cal-subs-name").value != ""
  ) {
    subscriptions = [];
    subscriptions.push({
      url: document.getElementById("cal-subs-url").value,
      name: document.getElementById("cal-subs-name").value,
    });

    document.querySelector("input#cal-subs-name").val = "";
    document.querySelector("input#cal-subs-url").val = "";

    localforage
      .setItem("subscriptions", subscriptions)
      .then(function (value) {
        document.getElementById("subscription-form").style.display = "none";
        toaster("subscription stored", 2000);
        status.view = "options";
        router();
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
    load_subscriptions();
    list_subscriptions();
  } else {
    toaster("Please enter a name and a valid url", 2000);
  }
};

let delete_subscription = function () {
  let updated_subscriptions = subscriptions.filter(
    (e) => e.name != document.activeElement.innerText
  );

  localforage
    .setItem("subscriptions", updated_subscriptions)
    .then(function (value) {
      //Do other things once the value has been saved.
      console.log("saved: " + value);
      toaster("subscription deleted", 2000);
      status.view = "month";
      router();
    })
    .catch(function (err) {
      // This code runs if there were any errors
      toaster(err, 2000);
    });

  document.activeElement.remove();
};

localforage
  .getItem("events")
  .then(function (value) {
    if (value != null) events = value;

    renderHello(events);
    jump_to_today();
  })
  .catch(function (err) {
    jump_to_today();
  });

localforage
  .getItem("subscriptions")
  .then(function (value) {
    subscriptions = value;

    setTimeout(function () {
      if (subscriptions == null) return false;
      load_subscriptions();
      console.log(subscriptions);
    }, 2000);
  })
  .catch(function (err) {
    // This code runs if there were any errors
    console.log(err);
  });

localforage
  .getItem("settings")
  .then(function (value) {
    if (value == null) return false;
    settings = value;
    document.getElementById("default-notification-time").value =
      settings.default_notification;
  })
  .catch(function (err) {
    // This code runs if there were any errors
    console.log(err);
  });

function handleVisibilityChange() {
  if (document.visibilityState === "hidden") {
    status.visible = false;
  } else {
    setTimeout(function () {
      status.visible = true;
    }, 1000);
  }
}

handleVisibilityChange();

/////////////////
///NAVIGATION
/////////////////

let nav = function (move) {
  if (
    document.activeElement.nodeName == "SELECT" ||
    document.activeElement.type == "date" ||
    document.activeElement.type == "time"
  )
    return false;
  const currentIndex = document.activeElement.tabIndex;
  let next = currentIndex + move;
  let items = 0;

  if (status.view == "month") {
    let b = document.activeElement.parentNode.parentNode;
    items = b.querySelectorAll(".item");
  }

  if (status.view == "list-view") {
    let b = document.activeElement.parentNode;
    items = b.querySelectorAll("div#list-view article");
  }

  if (status.view == "subscription") {
    items = document.querySelectorAll("div#subscription-form > div.item");
  }

  if (status.view == "add-edit-event" || status.view == "options") {
    let b = document.activeElement.parentNode;
    items = b.querySelectorAll(".item");

    if (document.activeElement.parentNode.classList.contains("input-parent")) {
      document.activeElement.parentNode.focus();
      return true;
    } else {
      document.getElementById("add-edit-event").firstElementChild.focus();
    }
  }
  let targetElement = 0;

  if (next <= items.length) {
    targetElement = items[next];
    targetElement.focus();
  }

  if (next == items.length) {
    targetElement = items[0];
    targetElement.focus();
  }

  const rect = document.activeElement.getBoundingClientRect();
  const elY =
    rect.top - document.body.getBoundingClientRect().top + rect.height / 2;

  document.activeElement.parentNode.scrollBy({
    left: 0,
    top: elY - window.innerHeight / 2,
    behavior: "smooth",
  });

  if (status.view == "month" || status.view == "list-view") {
    if (targetElement.hasAttribute("data-date")) {
      status.selected_day = targetElement.getAttribute("data-date");
      status.selected_day_id = targetElement.getAttribute("data-id");
      event_check_day(status.selected_day);
    }
    return true;
  }

  if (
    document.activeElement.id == "form-image-wrapper" &&
    status.view == "add-edit-event"
  ) {
    bottom_bar("", "remove image", "");
    return true;
  }

  if (
    document.activeElement.id != "form-image-wrapper" &&
    status.view == "add-edit-event"
  ) {
    bottom_bar("", "edit", "");
    return true;
  }
};

// foram actions
// after selection

document
  .getElementById("event-notification-time")
  .addEventListener("change", (event) => {
    setTimeout(function () {
      document.getElementById("event-notification-time").parentElement.focus();
    }, 500);
  });

//default when is not set
settings.default_notification = "none";

document
  .getElementById("default-notification-time")
  .addEventListener("change", (event) => {
    let l = document.getElementById("default-notification-time").value;
    settings.default_notification = l;

    localforage
      .setItem("settings", settings)
      .then(function (value) {})
      .catch(function (err) {
        console.log(err);
      });

    setTimeout(function () {
      document
        .getElementById("default-notification-time")
        .parentElement.focus();
    }, 500);
  });

document.querySelectorAll('input[type="time"]').forEach(function (item) {
  item.addEventListener("change", (event) => {
    setTimeout(function () {
      item.parentElement.focus();
    }, 500);
  });
});

document.querySelectorAll('input[type="date"]').forEach(function (item) {
  item.addEventListener("change", (event) => {
    setTimeout(function () {
      item.parentElement.focus();
    }, 500);
  });
});

let add_alarm = function (date, message_text, id) {
  // KaiOs  2.xx
  if (navigator.mozAlarms) {
    // This is arbitrary data pass to the alarm
    var data = {
      foo: message_text,
      event_id: id,
    };

    // The "honorTimezone" string is what make the alarm honoring it

    var request = navigator.mozAlarms.add(date, "honorTimezone", data);

    request.onsuccess = function () {
      // console.log(this.result);
    };

    request.onerror = function () {
      console.log("An error occurred: " + this.error.name);
    };
  }
};

// may better to compare all alarms
// with all events
// to clean
let remove_alarm = function (id) {
  // KaiOs  2.xx

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
        } else {
          console.log("no alarm founded");
        }
      });
    };

    request.onerror = function () {
      console.log("An error occurred:", this.error.name);
    };
  }
};

let test_alarm = function () {
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

// //////////////////
// //BUILD EVENT-LIST
// /////////////////
// /////////////
// /////////////
// STORE EVENTS//
// /////////////
// /////////////

let convert_ics_date = function (t) {
  let nn = t.replace(/-/g, "");
  nn = nn.replace(/:/g, "");
  nn = nn.replace(" ", "T");
  nn = nn + "00";
  return nn;
};

let export_data = [];

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

  if (document.getElementById("event-date-end").value == "")
    document.getElementById("event-date-end").value =
      document.getElementById("event-date").value;

  let convert_dt_end =
    document.getElementById("event-date-end").value + " " + end_time;

  // notification before event
  let notification_time = document.getElementById(
    "event-notification-time"
  ).value;

  let calc_notification;
  if (notification_time != "none") {
    calc_notification = new Date(convert_dt_start);
    calc_notification.setMinutes(
      calc_notification.getMinutes() - notification_time
    );

    notification_time = convert_ics_date(calc_notification.toISOString());
  }

  let multidayevent = false;

  let a = new Date(document.getElementById("event-date").value).getTime();
  let b = new Date(document.getElementById("event-date-end").value).getTime();

  if (a != b) {
    multidayevent = true;
  }

  let rrule_convert = function () {
    let p = document.getElementById("event-recur").value;
    let r;
    if (p != "" || p != "none") {
      r =
        "FREQ=" +
        document.getElementById("event-recur").value +
        ";UNTIL=" +
        convert_ics_date(convert_dt_end);
    }
    return r;
  };

  let event = {
    UID: uid(),
    SUMMARY: document.getElementById("event-title").value,
    LOCATION: document.getElementById("event-location").value,
    DESCRIPTION: document.getElementById("event-description").value,
    CLASS: "PRIVATE",
    DTSTAMP: convert_ics_date(convert_dt_start),
    DTSTART: convert_ics_date(convert_dt_start),
    DTEND: convert_ics_date(convert_dt_end),
    RRULE: rrule_convert(),
    rrule_: document.getElementById("event-recur").value,
    dateStart: document.getElementById("event-date").value,
    dateEnd: document.getElementById("event-date-end").value,
    time_start: document.getElementById("event-time-start").value,
    time_end: document.getElementById("event-time-end").value,
    alarm: document.getElementById("event-notification-time").value,
    alarmTrigger: notification_time,
    isSubscription: false,
    multidayevent: multidayevent,
    ATTACH: blob,
  };

  if (event.alarm != "none") {
    event.BEGIN = "VALARM";
    event["TRIGGER;VALUE=DATE-TIME"] = notification_time;
    event.ACTION = "AUDIO";
    event.END = "VALARM";
    add_alarm(calc_notification, event.SUMMARY, event.UID);
  }

  events.push(event);

  let without_subscription = events.filter(
    (events) => events.isSubscription === false
  );

  localforage
    .setItem("events", without_subscription)
    .then(function (value) {
      // clean form
      clear_form();
      renderHello(events);

      export_ical("greg.ics", without_subscription);
    })
    .catch(function (err) {
      console.log(err);
    });

  status.view = "month";
  router();
};

// ////////////
// UPDATE EVENT
// /////////

let update_event = function () {
  events.forEach(function (index) {
    let a = new Date(document.getElementById("event-date").value).getTime();
    let b = new Date(document.getElementById("event-date-end").value).getTime();

    let multidayevent = false;

    if (a != b) {
      multidayevent = true;
    }

    if (index.UID == status.selected_day_id) {
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

      // notification before event
      let notification_time = document.getElementById(
        "event-notification-time"
      ).value;

      let calc_notification = "";
      if (notification_time != "none") {
        calc_notification = new Date(convert_dt_start);
        calc_notification.setMinutes(
          calc_notification.getMinutes() - notification_time
        );

        notification_time = convert_ics_date(calc_notification.toISOString());
      }

      let rrule_convert = function () {
        let p = document.getElementById("event-recur").value;
        let r;
        if (p != "" || p != "none") {
          r =
            "FREQ=" +
            document.getElementById("event-recur").value +
            ";UNTIL=" +
            convert_ics_date(convert_dt_end);
        }
        return r;
      };

      index.SUMMARY = document.getElementById("event-title").value;
      index.DESCRIPTION = document.getElementById("event-description").value;
      index.LOCATION = document.getElementById("event-location").value;
      index.DTSTART = convert_ics_date(convert_dt_start);
      index.DTEND = convert_ics_date(convert_dt_end);
      index.dateEnd = document.getElementById("event-date-end").value;
      index.dateStart = document.getElementById("event-date").value;
      index.time_start = document.getElementById("event-time-start").value;
      index.time_end = document.getElementById("event-time-end").value;
      index.RRULE = rrule_convert();
      index.rrule_ = document.getElementById("event-recur").value;
      index.isSubscription = false;
      index.multidayevent = multidayevent;
      index.alarm = document.getElementById("event-notification-time").value;
      index.alarmTrigger = notification_time;
      if (blob != "") index.ATTACH = blob;

      if (index.alarm != "none") {
        remove_alarm(index.UID);
        index.BEGIN = "VALARM";
        index["TRIGGER;VALUE=DATE-TIME:"] = notification_time;
        index.ACTION = "AUDIO";
        index.END = "VALARM";
        add_alarm(calc_notification, index.SUMMARY, index.UID);
      }
    }
  });

  let without_subscription = events.filter(
    (events) => events.isSubscription === false
  );

  localforage
    .setItem("events", without_subscription)
    .then(function (value) {
      // clean form
      renderHello(events);

      export_ical("greg.ics", value);
      status.view = "month";
      router();
      clear_form();
    })
    .catch(function (err) {});
};

// ////////////

// EDIT EVENT

// /////////

let edit_event = function () {
  document.getElementById("delete-event").style.display = "block";
  document.getElementById("export-event").style.display = "block";

  events.forEach(function (index) {
    if (index.UID == status.selected_day_id) {
      document.getElementById("event-title").value = index.SUMMARY;
      document.getElementById("event-date").value = index.dateStart;
      document.getElementById("event-date-end").value = index.dateEnd;
      document.getElementById("event-time-start").value = index.time_start;
      document.getElementById("event-time-end").value = index.time_end;
      document.getElementById("event-description").value = index.DESCRIPTION;
      document.getElementById("event-location").value = index.LOCATION;
      document.querySelector("#event-notification-time").value = index.alarm;
      document.getElementById("form-image").src = index.ATTACH;
      document.getElementById("event-recur").value = index.rrule_;
    }
  });
};

//////////////
//DELETE EVENT
///////////

let delete_event = function () {
  let f = false;

  events = events.filter((person) => person.UID != status.selected_day_id);
  remove_alarm(status.selected_day_id);
  f = true;

  status.edit_event = false;
  let without_subscription = events.filter(
    (events) => events.isSubscription === false
  );

  clear_form();

  localforage
    .setItem("events", without_subscription)
    .then(function (value) {
      renderHello(events);

      export_ical("greg.ics", value);
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });

  return f;
};

// event slider
let t = new Date();
let m = `0${t.getMonth() + 1}`.slice(-2);
let d = `0${t.getDate()}`.slice(-2);
let y = t.getFullYear();
event_check_day(y + "-" + m + "-" + d);

// callback import event
let import_event = function (id, date) {
  toaster("done", 2000);
  bottom_bar("edit", "", "");

  //renderHello(events);
  let without_subscription = events.filter(
    (events) => events.isSubscription === false
  );

  localforage
    .setItem("events", without_subscription)
    .then(function (value) {
      renderHello(events);

      export_ical("greg.ics", without_subscription);
    })
    .catch(function (err) {});
};

let set_datetime_form = function () {
  let d = new Date();
  let d_h = `0${d.getHours()}`.slice(-2);
  let d_m = `0${d.getMinutes()}`.slice(-2);
  let p = d_h + ":" + d_m;

  let d_h_ = `0${d.getHours() + 1}`.slice(-2);
  let d_m_ = `0${d.getMinutes()}`.slice(-2);
  if (d_h_ > 23) d_h_ = "23";

  let pp = d_h_ + ":" + d_m_;

  document.getElementById("event-time-start").value = p;
  document.getElementById("event-time-end").value = pp;
};

let pick_image_callback = function (resultBlob) {
  let t = document.getElementById("form-image");

  t.src = URL.createObjectURL(resultBlob);
  document.getElementById("form-image-wrapper").classList.add("item");

  document
    .querySelectorAll("div#add-edit-event .item")
    .forEach(function (i, p) {
      i.setAttribute("tabindex", p);
    });

  let fr = new FileReader();
  fr.onload = function () {
    blob = fr.result;
  };
  fr.readAsDataURL(resultBlob);
};

// ////////////////////////////
// //KEYPAD HANDLER////////////
// ////////////////////////////

let longpress = false;
const longpress_timespan = 1000;
let timeout;

function repeat_action(param) {
  switch (param.key) {
    case "0":
      break;
  }
}

// ////////////

// //LONGPRESS

// ///////////

function longpress_action(param) {
  switch (param.key) {
    case "0":
      break;

    case "Backspace":
      window.close();
      break;

    case "ArrowLeft":
      if (status.view == "list-view") {
      }

      break;
  }
}

// /////////////
// //SHORTPRESS
// ////////////

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
        status.view == "options" ||
        status.view == "subscription"
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
        status.view == "options" ||
        status.view == "subscription"
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

    case "2":
      slider_navigation();
      break;

    case "#":
      document
        .querySelectorAll(
          "div#calendar div#calendar-body div div [class^='moon-phase-']"
        )
        .forEach(function (e) {
          e.classList.toggle("active");
        });
      break;

    case "7":
      break;

    case "SoftRight":
    case "Alt":
      console.log(status.view);
      if (status.view == "month") {
        status.view = "options";
        router();

        return true;
      }

      if (status.view == "subscription") {
        // store subscription
        store_subscription();
        return true;
      }
      break;

    case "SoftLeft":
    case "Control":
      if (status.view == "list-view") {
        if (document.activeElement.classList.contains("subscription")) {
          toaster("a subscription cannot be edited", 2000);
          return false;
        }

        status.selected_day_id = document.activeElement.getAttribute("data-id");

        status.edit_event = true;

        edit_event();
        status.view = "add-edit-event";
        router();
      }
      if (status.view == "subscription") {
        start_scan(callback_scan);
        status.view = "scan";

        return true;
      }

      if (status.view == "options") {
        delete_subscription();
        return true;
      }

      if (status.view == "month") {
        status.view = "add-edit-event";
        router();

        // when new event

        // set time
        set_datetime_form();

        return true;
      }
      break;

    case "Enter":
      if (!status.visible) return false;

      if (document.activeElement.classList.contains("input-parent")) {
        document.activeElement.children[1].focus();
        return true;
      }

      if (document.activeElement.id == "export-event") {
        events.forEach(function (index) {
          if (index.UID == status.selected_day_id) {
            export_data.push(index);
          }
        });

        export_ical(export_data[0].UID + ".ics", export_data);
        toaster("event exported", 2000);

        return true;
      }

      if (document.activeElement.id == "select-image") {
        pick_image(pick_image_callback);
        return true;
      }

      if (document.activeElement.id == "form-image-wrapper") {
        document.getElementById("form-image").src = "";
        blob = "";
        return true;
      }

      if (
        document.activeElement.getAttribute("data-function") ==
        "add-subscription"
      ) {
        status.view = "subscription";
        router();
        return true;
      }

      // same button with different text and action
      if (document.activeElement.id == "save-event") {
        if (status.edit_event) {
          update_event();
        } else {
          store_event();
        }

        return true;
      }

      if (document.activeElement.id == "delete-event") {
        if (delete_event()) {
          status.view = "month";
          router();
        }
        return true;
      }

      if (status.view == "options") {
        if (document.activeElement.getAttribute("data-function") == "export") {
          localforage
            .getItem("events")
            .then(function (value) {
              export_ical("greg.ics", value);
            })
            .catch(function (err) {
              console.log(err);
            });
        }

        if (document.activeElement.getAttribute("data-function") == "import") {
          loadICS(
            document.activeElement.getAttribute("data-filename"),
            import_event
          );
        }
        return true;
      }
      if (status.view == "month" || status.view == "list-view") router("view");

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

      if (status.view == "scan") {
        status.views = "subscription";
        stop_scan();
        router();
      }

      break;
  }
}

// ///////////////////////////////
// //shortpress / longpress logic
// //////////////////////////////

function handleKeyDown(evt) {
  option_button_bar();
  if (evt.key === "Backspace") {
    if (
      status.view == "options" ||
      status.view == "add-edit-event" ||
      status.view == "scan"
    ) {
      evt.preventDefault();
    }
  }

  if (evt.key === "EndCall") {
    evt.preventDefault();
    window.close();
  }
  if (!evt.repeat) {
    longpress = false;
    timeout = setTimeout(() => {
      longpress = true;
      longpress_action(evt);
    }, longpress_timespan);
  }

  if (evt.repeat) {
    if (evt.key == "Backspace") longpress = false;

    repeat_action(evt);
  }
}

function handleKeyUp(evt) {
  if (status.visible === false) return false;

  if (evt.key == "Backspace" && document.activeElement.tagName == "INPUT") {
  }

  clearTimeout(timeout);
  if (!longpress) {
    shortpress_action(evt);
  }
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

document.addEventListener("visibilitychange", handleVisibilityChange, false);
