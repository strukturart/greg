"use strict";

import localforage from "localforage";
import { side_toaster, sort_array } from "./assets/js/helper.js";
import { toaster } from "./assets/js/helper.js";
import { validate } from "./assets/js/helper.js";
import { pick_image } from "./assets/js/helper.js";
import { bottom_bar } from "./assets/js/helper.js";
import { popup } from "./assets/js/helper.js";

import { getMoonPhase } from "./assets/js/getMoonPhase.js";
import { fetch_ics } from "./assets/js/eximport.js";
import { export_ical } from "./assets/js/eximport.js";
import { parse_ics } from "./assets/js/eximport.js";

import { loadICS } from "./assets/js/eximport.js";
import { start_scan } from "./assets/js/scan.js";
import { stop_scan } from "./assets/js/scan.js";
import m from "mithril";
import { DAVClient } from "./assets/js/tsdav.js";
import { createCalendarObject } from "./assets/js/tsdav.js";
import { propfind } from "./assets/js/tsdav.js";
import { DAVNamespaceShort } from "./assets/js/tsdav.js";
import { get_time } from "./assets/js/helper.js";
import { uid } from "uid";

var moment = require("moment-timezone");

export let events = [];
export let accounts = [];

localforage.setDriver(localforage.LOCALSTORAGE);

let callback_caldata_loaded = function () {};

let calendar_names = [
  {
    name: "local",
    id: "local-id",
    data: "",
  },
];
/*
let empty = [];
localforage
  .setItem("events", empty)
  .then(function (value) {})
  .catch(function (err) {
    console.log(err);
  });
*/

let style_calendar_cell = function () {
  document.querySelectorAll("div.calendar-cell").forEach(function (e) {
    let p = e.getAttribute("data-date");

    if (event_check(p).event == true) {
      e.classList.add("event");
    }

    if (rrule_check(p).rrule) {
      e.classList.add("event");
    }
  });
};

let load_caldav = function (action) {
  accounts.forEach(function (item) {
    const client = new DAVClient({
      serverUrl: item.server_url,
      credentials: {
        username: item.user,
        password: item.password,
      },
      authMethod: "Basic",
      defaultAccountType: "caldav",
    });

    (async () => {
      try {
        await client.login();
      } catch (e) {
        //load cached data
        toaster("load cached data", 5000);
        localforage
          .getItem(item.id)
          .then(function (w) {
            w.forEach((b) => {
              b.objects.forEach((m) => {
                parse_ics(
                  m.data,
                  callback_caldata_loaded,
                  false,
                  false,
                  b.etag,
                  b.url,
                  item.id
                );
              });
            });
            toaster("load cached data", 5000);
          })
          .catch(function (err) {
            console.log(err);
          });

        if (e.message == "Invalid credentials")
          toaster(
            "there was a problem logging into your account " +
              item.name +
              " please check your account details",
            5000
          );
      }

      try {
        document.getElementById("icon-loading").style.opacity = 100;
        const calendars = await client.fetchCalendars();
        let k = [];

        for (let i = 0; i < calendars.length; i++) {
          const objects = await client.fetchCalendarObjects({
            calendar: calendars[i],
          });

          let data_to_store = {
            "displayName": calendars[i].displayName,
            "syncToken": calendars[i].syncToken,
            "ctag": calendars[i].ctag,
            "url": calendars[i].url,
            "objects": objects,
          };

          k.push(data_to_store);
          //add cal name to list
          calendar_names.push({
            name: calendars[i].displayName,
            id: item.id,
          });

          //cache caldata
          localforage
            .setItem(item.id, k)
            .then(function () {})
            .catch(function (err) {
              console.log(err);
            });
          //parse data
          objects.forEach(function (i) {
            parse_ics(
              i.data,
              callback_caldata_loaded,
              false,
              false,
              i.etag,
              i.url,
              item.id
            );
          });
          document.getElementById("icon-loading").style.opacity = 0;
          style_calendar_cell();
        }
      } catch (e) {
        console.log(e);
      }
    })();
  });
};

let sync_caldav = function () {
  accounts.forEach(function (item) {
    const client = new DAVClient({
      serverUrl: item.server_url,
      credentials: {
        username: item.user,
        password: item.password,
      },
      authMethod: "Basic",
      defaultAccountType: "caldav",
    });
    (async () => {
      try {
        await client.login();
      } catch (e) {
        if (e.message == "Invalid credentials")
          toaster(
            "there was a problem logging into your account " +
              item.name +
              " please check your account details",
            5000
          );
      }

      try {
        const value = await localforage.getItem(item.id);

        for (let i = 0; i < value.length; i++) {
          let s = {
            oldCalendars: [value[i].objects],
            detailedResult: true,
            headers: client.authHeaders,
          };
          try {
            const ma = await client.syncCalendars(s);
          } catch (e) {
            console.log(e);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  });
};

let create_caldav = function (event_data, calendar_id, calendar_name, event) {
  popup("Please wait...", "show");

  accounts.forEach(function (p) {
    if (p.id == calendar_id) {
      const client = new DAVClient({
        serverUrl: p.server_url,
        credentials: {
          username: p.user,
          password: p.password,
        },
        authMethod: "Basic",
        defaultAccountType: "caldav",
      });
      (async () => {
        try {
          let n = await client.login();
        } catch (e) {
          if (e.message == "Invalid credentials")
            toaster(
              "there was a problem logging into your account " +
                item.name +
                " please check your account details",
              5000
            );
        }
        try {
          const calendars = await client.fetchCalendars();
          for (let i = 0; i < calendars.length; i++) {
            if (calendars[i].displayName == calendar_name) {
              i = calendars.length;
              const result = await client.createCalendarObject({
                //headers: client.authHeaders,
                calendar: calendars[0],
                filename: uid(16) + ".ics",
                iCalString: event_data,
                headers: {
                  "content-type": "text/calendar; charset=utf-8",
                  "authorization": client.authHeaders.authorization,
                },
              });

              if (result.ok) {
                try {
                  const [res] = await client.propfind({
                    url: result.url,
                    props: {
                      [`${DAVNamespaceShort.DAV}:getetag`]: {},
                    },
                    depth: "0",
                    headers: client.authHeaders,
                  });

                  event.etag = res.props.getetag;
                } catch (e) {
                  console.log(e);
                }

                events.push(event);
                setTimeout(function () {
                  popup("", "close");
                  m.route.set("/page_calendar");
                }, 5000);
              } else {
                popup(
                  "There was a problem saving, please try again later.",
                  "show"
                );
                setTimeout(function () {
                  popup("", "close");
                }, 5000);
              }
            }
          }
        } catch (e) {
          /*
          popup("There was a problem saving, please try again later.", "show");
          setTimeout(function () {
            popup("", "close");
          }, 5000);
          */
        }
      })();
    }
  });
};

let delete_caldav = function (etag, url, account_id, uid) {
  popup("Please wait...", "show");

  accounts.forEach(function (p) {
    if (p.id == account_id) {
      const client = new DAVClient({
        serverUrl: p.server_url,
        credentials: {
          username: p.user,
          password: p.password,
        },
        authMethod: "Basic",
        defaultAccountType: "caldav",
      });
      (async () => {
        try {
          await client.login();
        } catch (e) {
          if (e.message == "Invalid credentials")
            toaster(
              "there was a problem logging into your account " +
                item.name +
                " please check your account details",
              5000
            );
        }
        try {
          const result = await client.deleteCalendarObject({
            calendarObject: {
              url: url,
              etag: etag,
            },
            headers: client.authHeaders,
          });

          if (result.ok) {
            setTimeout(function () {
              popup("", "close");
              let temp = events;
              events = "";

              events = temp.filter((person) => person.UID != uid);
              remove_alarm(uid);

              clear_form();

              m.route.set("/page_calendar");
            }, 5000);
          } else {
            popup(
              "There was a problem saving, please try again later.",
              "show"
            );
            setTimeout(function () {
              popup("", "close");
            }, 5000);
          }
        } catch (e) {
          popup(
            "There was a problem deleting, please try again later.",
            "show"
          );
          setTimeout(function () {
            popup("", "close");
          }, 5000);
        }
      })();
    }
  });
};

let update_caldav = function (etag, url, data, account_id) {
  popup("Please wait...", "show");

  accounts.forEach(function (p) {
    if (p.id == account_id) {
      const client = new DAVClient({
        serverUrl: p.server_url,
        credentials: {
          username: p.user,
          password: p.password,
        },
        authMethod: "Basic",
        defaultAccountType: "caldav",
      });
      (async () => {
        try {
          await client.login();
        } catch (e) {
          if (e.message == "Invalid credentials")
            toaster(
              "there was a problem logging into your account " +
                item.name +
                " please check your account details",
              5000
            );
        }
        try {
          const result = await client.updateCalendarObject({
            calendarObject: {
              url: url,
              data: data,
              etag: etag,
            },
            headers: client.authHeaders,
          });
          if (result.ok) {
            //get new ETAG
            try {
              const [res] = await client.propfind({
                url: result.url,
                props: {
                  [`${DAVNamespaceShort.DAV}:getetag`]: {},
                },
                depth: "0",
                headers: client.authHeaders,
              });

              events.map((item) => {
                if (item.etag === etag) {
                  item.etag = res.props.getetag;
                  return item.etag;
                } else {
                  return item;
                }
              });
            } catch (e) {
              console.log(e);
            }
            setTimeout(function () {
              popup("", "close");
              m.route.set("/page_calendar");
            }, 5000);
          } else {
            popup(
              "There was a problem saving, please try again later.",
              "show"
            );
            setTimeout(function () {
              popup("", "close");
            }, 5000);
          }
        } catch (e) {
          popup("There was a problem saving, please try again later.", "show");
          setTimeout(function () {
            popup("", "close");
          }, 5000);
        }
      })();
    }
  });
};

let load_subscriptions = function () {
  if (
    subscriptions == null ||
    subscriptions.lenght == -1 ||
    subscriptions == "undefined"
  )
    return false;

  for (let i = 0; i < subscriptions.length; i++) {
    fetch_ics(subscriptions[i].url, "", subscriptions[i].id);
  }
  setTimeout(() => {
    jump_to_today();
    sort_array(events, "dateStart", "date");
  }, 1000);

  event_slider(document.activeElement.getAttribute("data-date"));
  if (document.activeElement.hasAttribute("data-date"))
    status.selected_day = document.activeElement.getAttribute("data-date");
};

//load accounts data
localforage
  .getItem("accounts")
  .then(function (value) {
    if (value == null) {
      accounts = [];
      return false;
    }
    accounts = value;
    load_caldav();
    //sync_caldav();
  })
  .catch(function (err) {
    console.log(err);
  });

//get event data
let get_event_date = function () {
  status.selected_day_id = document.activeElement.getAttribute("data-id");
  update_event_date = events.filter(function (arr) {
    return arr.UID == status.selected_day_id;
  })[0];
};

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
let subscriptions = [];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();

let update_event_date;

export let status = {
  selected_day: "",
  visible: false,
  update_event_id: "",
};

let settings = {
  default_notification: "",
  ads: "",
  timezone: moment.tz.guess(),
};
let blob = "";

let load_settings = function () {
  localforage
    .getItem("settings")
    .then(function (value) {
      if (value == null) return false;
      settings = value;
    })
    .catch(function (err) {
      console.log(err);
    });
};
load_settings();

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
  document.getElementById("version").innerText =
    "Version: " + a.manifest.version;
  if (a.installOrigin == "app://kaios-plus.kaiostech.com") {
    settings.ads = true;
  } else {
    settings.ads = false;
  }
}

getManifest(manifest);

// ////////
// finde closest event to selected date in list view
// ////////

let find_closest_date = function (search_term) {
  let search = new Date(status.selected_day).getTime();
  //equal
  for (let i = 0; i < events.length; i++) {
    let item = new Date(events[i].dateStart).getTime();

    if (search == item) {
      t = events[i].dateStart;
      i = events.length;
    }
  }
  //between
  if (t == 0) {
    for (let i = 0; i < events.length - 1; i++) {
      if (search > new Date(events[i].dateStart).getTime()) {
        t = events[i].dateStart;
        i = events.length;
      }
    }
  }
  //default
  if (t == 0) {
    console.log("no match");
    t = events[0].dateStart;
  }
  document.querySelectorAll("article[data-date='" + t + "']")[0].focus();
  return t;
};

// check if has event
let event_check = function (date) {
  let feedback = {
    event: false,
  };

  for (let t = 0; t < events.length; t++) {
    if (typeof events[t] === "object") {
      feedback.event = false;
      feedback.subscription = false;
      feedback.multidayevent = false;
      feedback.rrule = false;

      let a = new Date(events[t].dateStart).getTime();
      let b = new Date(events[t].dateEnd).getTime();
      let c = new Date(date).getTime();
      let d = events[t].rrule_;

      if (a === c) {
        feedback.event = true;
        t = events.length;
        return feedback;
      }

      if (d === "none" || d === "" || d === undefined || d === "DAILY") {
        if (a === c || (a < c && b > c)) {
          feedback.event = true;

          if (events[t].allDay && events[t].dateEnd == date) {
            feedback.event = false;
          }

          if (events[t].time_end == "00:00:00" && events[t].allDay) {
            feedback.event = false;
          }

          // t = events.length;
          return feedback;
        }
      }
    }
  }
  return feedback;
};

// check if has recur event
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
      let d = events[t].rrule_;
      let e = events[t].RRULE;

      //recurrences

      if (typeof e !== "undefined" && e !== undefined && e != null) {
        if (a === c || b === c || (a < c && b > c)) {
          if (d == "MONTHLY") {
            if (
              new Date(events[t].dateStart).getDate() ===
              new Date(date).getDate()
            ) {
              feedback.event = true;
              feedback.rrule = true;
              t = events.length;
              return false;
            }
          }

          if (d == "DAILY") {
            feedback.rrule = true;
            feedback.event = true;
            t = events.length;
            return feedback;
          }

          if (d == "WEEKLY") {
            if (
              new Date(events[t].dateStart).getDay() === new Date(date).getDay()
            ) {
              feedback.rrule = true;
              feedback.event = true;
              t = events.length;

              return feedback;
            }
          }

          if (d == "YEARLY") {
            let tt = new Date(events[t].dateStart);
            let pp = new Date(date);
            if (
              tt.getDate() + "-" + tt.getMonth() ===
              pp.getDate() + "-" + pp.getMonth()
            ) {
              feedback.rrule = true;
              feedback.event = true;
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

let slider_navigation = function () {
  slider_index++;

  if (
    slider_index >
    document.querySelectorAll("div#event-slider article").length - 1
  ) {
    slider_index = 0;
  }

  let p = document.querySelectorAll("div#event-slider-indicator div div");
  console.log(
    document.querySelectorAll("div#event-slider article").length -
      1 +
      "/" +
      slider_index
  );

  document
    .querySelectorAll("div#event-slider article")
    .forEach(function (item) {
      item.style.display = "none";
    });
  document.querySelectorAll("div#event-slider article")[
    slider_index
  ].style.display = "block";

  p.forEach(function (item) {
    item.classList.remove("active");
  });
  p[slider_index].classList.add("active");
};

////

let event_slider = function (date) {
  slider = [];
  let k = document.querySelector("div#event-slider-indicator div");
  k.innerHTML = "";

  document.querySelector("div#event-slider").innerHTML = "";

  for (let i = 0; i < events.length; i++) {
    let a = new Date(events[i].dateStart).getTime();
    let b = new Date(events[i].dateEnd).getTime();
    let c = new Date(date).getTime();
    let d = events[i].rrule_;

    if (d === "none" || d === "" || d === undefined) {
      if (a === c || (a < c && b > c)) {
        //if multiday event
        //the end date is next day
        //time is 00:00:00
        if (events[i].time_end == "00:00:00" && events[i].dateEnd == date) {
          //return false;
        }
        slider.push(events[i]);
        k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
      }
    } else {
      if (a === c || b === c || (a < c && b > c)) {
        //recurrences
        //YEAR
        if (d == "YEARLY") {
          let tt = new Date(events[i].dateStart);
          let pp = new Date(date);

          if (
            tt.getDate() + "-" + tt.getMonth() ===
            pp.getDate() + "-" + pp.getMonth()
          ) {
            slider.push(events[i]);
            k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
          }
        }

        //WEEK
        if (d == "WEEKLY") {
          if (
            new Date(events[i].dateStart).getDay() == new Date(date).getDay()
          ) {
            slider.push(events[i]);
            k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
          }
        }

        //MONTH

        if (d == "MONTHLY") {
          if (
            new Date(item[i].item.dateStart).getDate() ==
            new Date(date).getDate()
          ) {
            slider.push(events[i]);
            k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
          }
        }

        if (d == "DAILY") {
          if (a === c || b === c || (a < c && b > c)) {
            slider.push(events[i]);
            k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
          }
        }
      }
    }
  }

  if (slider != "") {
    slider.forEach(function (item) {
      document
        .querySelector("div#event-slider")
        .insertAdjacentHTML(
          "beforeend",
          "<article>" + item.SUMMARY + "</article>"
        );
    });
    if (slider >= 0) {
      document.querySelector("div#event-slider article")[0].style.display =
        "block";
    }

    if (slider >= 0) {
      document.querySelectorAll(
        "div#event-slider .indicator"
      )[0].style.classList.add = "active";
    }
  }
};

////
// JUMP TO TODAY
////

let jump_to_today = function () {
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  showCalendar(currentMonth, currentYear);

  event_slider(status.selected_day);

  status.selected_day = document.activeElement.getAttribute("data-date");
};

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
  event_slider(status.selected_day);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
  event_slider(status.selected_day);
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
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById("calendar-body");

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  document.getElementById("monthAndYear").innerHTML =
    months[month] + " " + year;

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
        cell.classList.add("calendar-cell");
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
          if (event_check(p).event == true) {
            cell.classList.add("event");
          }

          if (rrule_check(p).rrule) {
            cell.classList.add("event");
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

let clear_form = function () {
  document.querySelectorAll("div#add-edit-event input").forEach(function (e) {
    e.value = "";
    // document.getElementById("form-image").src = "";
    blob = "";
  });
};

/*
// /////////////////
// /VIEWS
// ///////////////
*/

var root = document.getElementById("app");

var page_calendar = {
  view: function () {
    return m("div", { class: "width-100 height-100", id: "calendar" }, [
      m("div", { class: "flex justify-content-spacebetween", id: "" }, [
        m("h3", {
          class: "card-header",
          id: "monthAndYear",
        }),

        m(
          "div",
          {
            id: "icon-loading",
          },
          "loading"
        ),
        m(
          "div",
          {
            id: "time",
            oncreate: function (e) {
              setInterval(function () {
                document.getElementById("time").innerText = get_time();
              }, 3600);
            },
          },
          ""
        ),
      ]),

      m(
        "div",
        {
          class: "calendar-head flex width-100",
        },
        [
          m("div", "Sun"),
          m("div", "Mon"),
          m("div", "Tue"),
          m("div", "Wed"),
          m("div", "Thu"),
          m("div", "Fri"),
          m("div", "Sat"),
        ]
      ),
      m("div", { id: "calendar-body" }),
      m(
        "div",
        {
          id: "event-slider",
          class: "flex",
        },
        [m("div", { id: "slider-inner", class: "flex" })]
      ),

      m(
        "div",
        {
          id: "event-slider-indicator",
          class: "flex width-100 justify-content-spacearound",
        },
        [m("div", { class: "flex justify-content-spacearound" })]
      ),
    ]);
  },
  oncreate: ({ dom }) =>
    setTimeout(function () {
      dom.focus();
      if (document.activeElement.hasAttribute("data-date"))
        status.selected_day = document.activeElement.getAttribute("data-date");

      bottom_bar("add", "events", "options");
      if (status.selected_day != "") {
        let t = new Date(status.selected_day);
        currentMonth = t.getMonth();
        currentYear = t.getFullYear();
      }

      let k = status.selected_day;

      document
        .querySelectorAll("div#calendar-body div.item")
        .forEach(function (item) {
          if (item.getAttribute("data-date") == k) {
            item.focus();
            event_slider(k);
          }
        });

      showCalendar(currentMonth, currentYear);

      if (document.activeElement.hasAttribute("data-date"))
        status.selected_day = document.activeElement.getAttribute("data-date");

      bottom_bar("add", "events", "options");

      let t = new Date(status.selected_day);
      currentMonth = t.getMonth();
      currentYear = t.getFullYear();

      showCalendar(currentMonth, currentYear);

      document
        .querySelectorAll("div#calendar-body div.item")
        .forEach(function (item) {
          if (item.getAttribute("data-date") == k) {
            item.focus();
            event_slider(k);
          }
        });

      clear_form();
    }, 500),
};

var page_events = {
  view: function (vnode) {
    return m(
      "div",
      {
        id: "events-wrapper",
        oncreate: () =>
          setTimeout(function () {
            find_closest_date();
            bottom_bar("edit", "calendar", "");
          }, 1500),
      },
      [
        events.map(function (item, index) {
          bottom_bar("edit", "calendar", "");

          return m(
            "article",
            {
              class: "item events " + item.isSubscription,
              tabindex: index,
              "data-id": item.UID,
              "data-date": item.dateStart,
              "data-time-start": item.time_start,
              "data-time-end": item.time_end,
              "data-date-end": item.dateEnd,
              "data-rrule": item.rrule_,
              "data-multidayevent": item.multidayevent,
              "data-alarm": item.alarm,
            },
            [
              m("div", { class: "icons-bar" }, [
                m("img", { class: "bell", src: "assets/image/bell.svg" }),
                m("div", { class: "date" }, item.dateStart),
                m("div", { class: "time" }, item.time_start),
                m("h2", { class: "time" }, item.SUMMARY),
                m("div", item.LOCATION),
                m("div", { class: "description" }, item.DESCRIPTION),
              ]),
            ]
          );
        }),
      ]
    );
  },
};

var page_options = {
  view: function () {
    return m("div", { id: "options" }, [
      m("h2", "Key assignment"),

      m(
        "ul",
        {
          id: "keys",
          class: "item",
          tabindex: "0",
          oncreate: function ({ dom }) {
            dom.focus();
          },
        },
        [
          m("li", [m("span", "1 & 3")], "Months"),
          m("li", [m("span", "2")], "Event slider"),
          m("li", [m("span", "Enter")], "Events/Month"),
          m("li", [m("span", "#")], "Moon"),
          m("li", [m("span", "*")], "Jump to today"),
          m(
            "li",
            [m("span", { class: "keys-current-day" }, "")],
            "current day"
          ),
          m(
            "li",
            [m("span", { class: "keys-day-event" }, "")],
            "day with event"
          ),
        ]
      ),
      m("h2", "settings"),

      m(
        "div",
        {
          class: "item input-parent",
          id: "event-notification-time-wrapper",
          tabindex: "1",
        },
        [
          m("label", { for: "default-notification" }, "default Notification"),
          m(
            "select",
            {
              id: "default-notification-time",
              onchange: function () {
                store_settings();
              },
              oncreate: function () {
                load_settings();
                setTimeout(function () {
                  document.querySelector("#default-notification-time").value =
                    settings.default_notification;
                }, 1000);
              },
            },
            [
              m("option", { value: "none" }, "none"),
              m("option", { value: "5" }, "5 minutes"),
              m("option", { value: "10" }, "10 minutes"),
              m("option", { value: "30" }, "30 minutes"),
              m("option", { value: "1440" }, "1 Day"),
            ]
          ),
        ]
      ),
      m(
        "button",
        {
          class: "item",
          tabindex: "2",
          onclick: function () {
            backup_events();
          },
        },
        "Backup events"
      ),
      m("h2", "Subscriptions"),

      m(
        "button",
        {
          class: "item",
          tabindex: "3",
          onclick: function () {
            m.route.set("/page_subscriptions");
          },
        },
        "add subscription"
      ),
      m("div", { id: "subscription-text" }, "Your subscriptions"),

      subscriptions.map(function (item, index) {
        return m(
          "button",
          {
            class: "item subscriptions-item",
            "data-id": item.id,
            "data-action": "delete-subscription",

            tabindex: index + 4,
            onblur: function () {
              bottom_bar("", "", "");
            },
            onfocus: function () {
              bottom_bar("delete", "", "");
            },
          },
          item.name
        );
      }),

      m("h2", "Accounts"),

      m(
        "button",
        {
          class: "item",
          tabindex: subscriptions.length + 4,
          onclick: function () {
            m.route.set("/page_accounts");
          },
        },
        "add account"
      ),
      m("div", { id: "subscription-text" }, "Your accounts"),

      accounts.map(function (item, index) {
        return m(
          "button",
          {
            class: "item subscriptions-item",
            "data-id": item.id,
            "data-action": "delete-account",

            tabindex: index + subscriptions.length + 5,
            onblur: function () {
              bottom_bar("", "", "");
            },
            onfocus: function () {
              bottom_bar("delete", "", "");
            },
          },
          item.name
        );
      }),

      m(
        "div",
        {
          id: "KaiOsAds-Wrapper",
          tabindex: subscriptions.length + accounts.length + 4,
          class: "item",
          onfocus: function () {
            bottom_bar("", "open", "");
            document.getElementById("KaiOsAd").style.border = "2px solid red";
          },
          onblur: function () {
            bottom_bar("delete", "", "");
          },
          onclick: function () {
            bottom_bar("", "open", "");
          },
        },
        [
          m("iframe", {
            oncreate: function () {
              if (settings.ads == true) {
                document.querySelector("#KaiOsAds-Wrapper iframe").src =
                  "./ads.html";
              } else {
                document.querySelector("#KaiOsAds-Wrapper").remove();
              }
            },
          }),
        ]
      ),
    ]);
  },
  oncreate: function () {
    bottom_bar("", "", "");
  },
};

var page_subscriptions = {
  view: function () {
    return m("div", { id: "subscription-form" }, [
      m(
        "div",
        {
          class: "item input-parent",
          tabindex: "0",
          oncreate: function ({ dom }) {
            dom.focus();
          },
        },
        [
          m("label", { for: "description" }, "subscription name"),
          m("input", {
            placeholder: "Name",
            type: "text",
            id: "cal-subs-name",
          }),
        ]
      ),
      m(
        "div",
        {
          class: "item input-parent",
          tabindex: "1",

          onblur: function () {
            bottom_bar("", "", "");
          },
        },
        [
          m("label", { for: "description" }, "subscription url"),
          m("input", {
            placeholder: "URL",
            type: "text",
            id: "cal-subs-url",
            "data-scan-action": "true",
            onfocus: function () {
              bottom_bar("qr-scan", "", "");
            },
            onblur: function () {
              bottom_bar("", "", "");
            },
          }),
        ]
      ),
      m(
        "button",
        {
          class: "item",
          tabindex: "2",
          onclick: function () {
            store_subscription();
          },
        },
        "save"
      ),
    ]);
  },
};

var page_accounts = {
  view: function () {
    return m("div", { id: "account-form" }, [
      m(
        "div",
        {
          class: "item input-parent",
          tabindex: "0",
          oncreate: function ({ dom }) {
            dom.focus();
          },
        },
        [
          m("label", { for: "description" }, "account name"),
          m("input", {
            placeholder: "Name",
            type: "text",
            id: "account-name",
          }),
        ]
      ),
      m(
        "div",
        {
          class: "item input-parent",
          tabindex: "1",

          onblur: function () {
            bottom_bar("", "", "");
          },
        },
        [
          m("label", { for: "description" }, "server"),
          m("input", {
            placeholder: "URL",
            type: "text",
            id: "account-url",
            "data-scan-action": "true",
            onfocus: function () {
              bottom_bar("qr-scan", "", "");
            },
            onblur: function () {
              bottom_bar("", "", "");
            },
          }),
        ]
      ),
      m(
        "div",
        {
          class: "item input-parent",
          tabindex: "2",

          onblur: function () {
            bottom_bar("", "", "");
          },
        },
        [
          m("label", { for: "description" }, "username"),
          m("input", {
            placeholder: "username",
            type: "url",
            id: "account-username",
            "data-scan-action": "true",
            onfocus: function () {
              bottom_bar("qr-scan", "", "");
            },
            onblur: function () {
              bottom_bar("", "", "");
            },
          }),
        ]
      ),
      m(
        "div",
        {
          class: "item input-parent",
          tabindex: "3",

          onblur: function () {
            bottom_bar("", "", "");
          },
        },
        [
          m("label", { for: "description" }, "password"),
          m("input", {
            placeholder: "password",
            type: "password",
            id: "account-password",
            "data-scan-action": "true",
            onfocus: function () {
              bottom_bar("qr-scan", "", "");
            },
            onblur: function () {
              bottom_bar("", "", "");
            },
          }),
        ]
      ),
      m(
        "button",
        {
          class: "item",
          tabindex: "4",
          onclick: function () {
            store_account();
          },
        },
        "save"
      ),
    ]);
  },
};

var page_add_event = {
  view: function () {
    return m(
      "div",
      {
        id: "add-edit-event",
        tabindex: "0",
      },
      [
        m(
          "div",
          {
            class: "item input-parent",
            tabindex: 0,
            oncreate: ({ dom }) =>
              setTimeout(function () {
                dom.focus();
                console.log("tz" + moment.tz.guess());
                settings.timezone = moment.tz.guess();
              }, 500),
          },
          [
            m("label", { for: "event-title" }, "title"),
            m("input", {
              placeholder: "",
              type: "text",
              id: "event-title",
              oncreate: function () {
                load_settings();
              },
            }),
          ]
        ),

        m("div", { class: "item input-parent", tabindex: "1" }, [
          m("label", { for: "event-location" }, "Location"),
          m("input", { placeholder: "", type: "text", id: "event-location" }),
        ]),
        m("div", { class: "item input-parent", tabindex: "2" }, [
          m("label", { for: "event-date" }, "Start Date"),
          m("input", {
            placeholder: "YYYY-MM-DD",
            type: "date",
            id: "event-date",
            value: status.selected_day,
          }),
        ]),

        m("div", { class: "item input-parent", tabindex: "3" }, [
          m("label", { for: "event-date-end" }, "End Date"),
          m("input", {
            placeholder: "YYYY-MM-DD",
            type: "date",
            id: "event-date-end",
          }),
        ]),
        m("div", { class: "item input-parent", tabindex: "4" }, [
          m("label", { for: "event-time-start" }, "Start Time"),
          m("input", {
            placeholder: "hh:mm:ss",
            type: "time",
            id: "event-time-start",
            value:
              new Date().getHours() +
              ":" +
              new Date().getMinutes() +
              ":" +
              new Date().getSeconds(),
          }),
        ]),
        m("div", { class: "item input-parent", tabindex: "5" }, [
          m("label", { for: "event-time-end" }, "End Time"),
          m("input", {
            placeholder: "hh:mm:ss",
            type: "time",
            id: "event-time-end",
          }),
        ]),
        m("div", { class: "item input-parent", tabindex: "6" }, [
          m("label", { for: "event-description" }, "Description"),
          m("input", {
            placeholder: "",
            type: "text",
            id: "event-description",
          }),
        ]),

        m(
          "div",
          {
            class: "item input-parent",
            id: "event-notification-time-wrapper",
            tabindex: "7",
          },
          [
            m("label", { for: "notification" }, "Notification"),
            m(
              "select",
              {
                id: "event-notification-time",
                oncreate: function () {
                  setTimeout(function () {
                    document.querySelector("#event-notification-time").value =
                      settings.default_notification;
                  }, 2000);
                },
              },
              [
                m("option", { value: "none" }, "none"),
                m("option", { value: "5" }, "5 minutes"),
                m("option", { value: "10" }, "10 minutes"),
                m("option", { value: "30" }, "30 minutes"),
                m("option", { value: "1440" }, "1 Day"),
              ]
            ),
          ]
        ),

        m(
          "div",
          {
            class: "item input-parent",
            id: "event-recur-wrapper",
            tabindex: "8",
          },
          [
            m("label", { for: "notification" }, "Recur"),
            m("select", { id: "event-recur" }, [
              m("option", { value: "none" }, "none"),
              m("option", { value: "DAILY" }, "Daily"),
              m("option", { value: "WEEKLY" }, "Weekly"),
              m("option", { value: "MONTHLY" }, "Monthly"),
              m("option", { value: "YEARLY" }, "Yearly"),
            ]),
          ]
        ),
        /*
        m(
          "button",
          { class: "item", tabindex: "", id: "select-image", tabindex: "9" },
          "add image"
        ),
        m("div", { id: "form-image-wrapper" }, [
          m("img", { id: "form-image", "data-blob": "" }),
        ]),
        */

        m(
          "div",
          {
            class: "item input-parent",
            id: "event-calendar-wrapper",
            tabindex: "9",
          },
          [
            m("label", { for: "notification" }, "Calendars"),
            m("select", { id: "event-calendar" }, [
              calendar_names.map(function (item, index) {
                return m(
                  "option",
                  {
                    value: item.id,
                    "data-calendar-data": item.data,
                  },
                  item.name
                );
              }),
            ]),
          ]
        ),

        m(
          "button",
          {
            tabindex: "10",
            id: "save-event",
            class: "item",
            onclick: function () {
              let n = document.getElementById("event-calendar");
              store_event(
                n.options[n.selectedIndex].value,
                n.options[n.selectedIndex].text
              );
            },
          },
          "save"
        ),
      ]
    );
  },
  oncreate: function () {
    bottom_bar("", "", "");
  },
};

var page_edit_event = {
  view: function () {
    return m(
      "div",
      {
        id: "add-edit-event",
      },
      [
        m(
          "div",
          {
            class: "item input-parent",
            tabindex: 0,
            oncreate: ({ dom }) =>
              setTimeout(function () {
                dom.focus();
              }, 500),
          },
          [
            m("label", { for: "event-title" }, "title"),
            m("input", {
              placeholder: "",
              type: "text",
              id: "event-title",
              value: update_event_date.SUMMARY,
            }),
          ]
        ),

        m("div", { class: "item input-parent", tabindex: "1" }, [
          m("label", { for: "event-location" }, "Location"),
          m("input", {
            placeholder: "",
            type: "text",
            id: "event-location",
            value: update_event_date.LOCATION,
          }),
        ]),
        m("div", { class: "item input-parent", tabindex: "2" }, [
          m("label", { for: "event-date" }, "Start Date"),
          m("input", {
            placeholder: "YYYY-MM-DD",
            type: "date",
            id: "event-date",
            value: update_event_date.dateStart,
          }),
        ]),

        m("div", { class: "item input-parent", tabindex: "3" }, [
          m("label", { for: "event-date-end" }, "End Date"),
          m("input", {
            placeholder: "YYYY-MM-DD",
            type: "date",
            id: "event-date-end",
            value: update_event_date.dateEnd,
          }),
        ]),
        m("div", { class: "item input-parent", tabindex: "4" }, [
          m("label", { for: "event-time-start" }, "Start Time"),
          m("input", {
            placeholder: "hh:mm:ss",
            type: "time",
            id: "event-time-start",
            value: update_event_date.time_start,
          }),
        ]),
        m("div", { class: "item input-parent", tabindex: "5" }, [
          m("label", { for: "event-time-end" }, "End Time"),
          m("input", {
            placeholder: "hh:mm:ss",
            type: "time",
            id: "event-time-end",
            value: update_event_date.time_end,
          }),
        ]),
        m("div", { class: "item input-parent", tabindex: "6" }, [
          m("label", { for: "event-description" }, "Description"),
          m("input", {
            placeholder: "",
            type: "text",
            id: "event-description",
            value: update_event_date.DESCRIPTION,
          }),
        ]),

        m(
          "div",
          {
            class: "item input-parent",
            id: "event-notification-time-wrapper",
            tabindex: "7",
          },
          [
            m("label", { for: "notification" }, "Notification"),
            m(
              "select",
              {
                id: "event-notification-time",
              },
              [
                m("option", { value: "none" }, "none"),
                m("option", { value: "5" }, "5 minutes"),
                m("option", { value: "10" }, "10 minutes"),
                m("option", { value: "30" }, "30 minutes"),
                m("option", { value: "1440" }, "1 Day"),
              ]
            ),
          ]
        ),

        m(
          "div",
          {
            class: "item input-parent",
            id: "event-recur-wrapper",
            tabindex: "8",
            oncreate: function () {
              document.querySelector("#event-notification-time").value =
                update_event_date.alarm;
            },
          },
          [
            m("label", { for: "notification" }, "Recur"),
            m(
              "select",
              { id: "event-recur", value: update_event_date.rrule_ },
              [
                m("option", { value: "none" }, "none"),
                m("option", { value: "DAILY" }, "Daily"),
                m("option", { value: "WEEKLY" }, "Weekly"),
                m("option", { value: "MONTHLY" }, "Monthly"),
                m("option", { value: "YEARLY" }, "Yearly"),
              ]
            ),
          ]
        ),
        /*
        m(
          "button",
          { class: "item", tabindex: "", id: "select-image", tabindex: "9" },
          "add image"
        ),
        m("div", { id: "form-image-wrapper" }, [
          m("img", {
            id: "form-image",
            "src": update_event_date.ATTACH,
          }),
        ]),*/
        m(
          "button",
          {
            tabindex: "9",
            id: "delete-event",
            class: "item",
            onclick: function () {
              console.log(update_event_date);
              delete_event(
                update_event_date.etag,
                update_event_date.url,
                update_event_date.id,
                update_event_date.UID
              );
            },
          },
          "delete"
        ),

        m(
          "button",
          {
            tabindex: "10",
            id: "save-event",
            class: "item",
            onclick: function () {
              update_event(update_event_date.id);
            },
          },
          "update"
        ),
      ]
    );
  },
};

m.route(root, "/page_calendar", {
  "/page_calendar": page_calendar,
  "/page_events": page_events,
  "/page_options": page_options,
  "/page_add_event": page_add_event,
  "/page_edit_event": page_edit_event,
  "/page_subscriptions": page_subscriptions,
  "/page_accounts": page_accounts,
});
m.route.prefix = "#";

let store_settings = function () {
  settings.default_notification = document.getElementById(
    "default-notification-time"
  ).value;

  localforage
    .setItem("settings", settings)
    .then(function (value) {
      side_toaster("settings saved", 2000);
    })
    .catch(function (err) {
      console.log(err);
    });
};

let callback_scan = function (url) {
  document.activeElement.value = url;
};

let store_subscription = function () {
  if (
    validate(document.getElementById("cal-subs-url").value) &&
    document.getElementById("cal-subs-name").value != ""
  ) {
    let id = uid(32);
    subscriptions.push({
      url: document.getElementById("cal-subs-url").value,
      name: document.getElementById("cal-subs-name").value,
      id: id,
    });

    document.querySelector("input#cal-subs-name").val = "";
    document.querySelector("input#cal-subs-url").val = "";

    localforage.setItem("subscriptions", subscriptions).then(function (value) {
      side_toaster("<img src='assets/image/E25C.svg'", 2000);
      m.route.set("/page_options");
    });
    //creat db to store data
    localforage
      .setItem(id, "")
      .then(function (value) {
        toaster("done", 2000);
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

let store_account = function () {
  if (
    validate(document.getElementById("account-url").value) &&
    document.getElementById("account-name").value != "" &&
    document.getElementById("account-username").value != "" &&
    document.getElementById("account-password").value != ""
  ) {
    accounts.push({
      server_url: document.getElementById("account-url").value,
      user: document.getElementById("account-username").value,
      password: document.getElementById("account-password").value,
      name: document.getElementById("account-name").value,
      id: uid(32),
    });

    localforage
      .setItem("accounts", accounts)
      .then(function (value) {
        side_toaster("<img src='assets/image/E25C.svg'", 2000);
        m.route.set("/page_options");
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  } else {
    toaster("Please enter a name and a valid url", 2000);
  }
};

let delete_subscription = function () {
  let updated_subscriptions = subscriptions.filter(
    (e) => e.id != document.activeElement.getAttribute("data-id")
  );

  localforage
    .removeItem(document.activeElement.getAttribute("data-id"))
    .then(function () {
      toaster("subscription removed", 4000);
    })
    .catch(function (err) {
      console.log(err);
    });

  localforage
    .setItem("subscriptions", updated_subscriptions)
    .then(function (value) {
      //Do other things once the value has been saved.
      side_toaster("subscription deleted", 2000);
    })
    .catch(function (err) {
      // This code runs if there were any errors
      toaster(err, 2000);
    });

  document.activeElement.remove();
};

let delete_account = function () {
  let updated_subscriptions = accounts.filter(
    (e) => e.id != document.activeElement.getAttribute("data-id")
  );

  localforage
    .setItem("accounts", updated_subscriptions)
    .then(function (value) {
      //Do other things once the value has been saved.
      side_toaster("subscription deleted", 2000);
      document.activeElement.remove();
    })
    .catch(function (err) {
      // This code runs if there were any errors
      toaster(err, 2000);
    });

  localforage
    .removeItem(document.activeElement.getAttribute("data-id"))
    .then(function () {
      toaster("subscription removed", 4000);
    })
    .catch(function (err) {
      console.log(err);
    });

  document.activeElement.remove();
};

//load indexedDB

localforage
  .getItem("events")
  .then(function (value) {
    if (value != null) events = value;
    sort_array(events, "dateStart", "date");
  })
  .catch(function (err) {});

localforage
  .getItem("subscriptions")
  .then(function (value) {
    subscriptions = value;

    if (subscriptions == null) {
      subscriptions = [];
      return false;
    }
    load_subscriptions();
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
  ) {
    return false;
  }

  const currentIndex = document.activeElement.tabIndex;
  let next = currentIndex + move;
  let items = 0;

  if (
    m.route.get() == "/page_calendar" ||
    m.route.get() == "/page_options" ||
    m.route.get() == "/page_events"
  ) {
    let b = document.activeElement.parentNode.parentNode;
    items = b.querySelectorAll(".item");
  }

  if (
    m.route.get() == "/page_subscriptions" ||
    m.route.get() == "/page_accounts"
  ) {
    let b = document.activeElement.parentNode.parentNode;
    items = b.querySelectorAll(".item");
  }

  if (
    m.route.get() == "/page_add_event" ||
    m.route.get() == "/page_edit_event"
  ) {
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

  if (m.route.get() == "/page_calendar" || m.route.get() == "/page_events") {
    if (targetElement.hasAttribute("data-date")) {
      status.selected_day = targetElement.getAttribute("data-date");
      status.selected_day_id = targetElement.getAttribute("data-id");
      event_slider(status.selected_day);
    }
  }
};

// may better to compare all alarms
// with all events
// to clean

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
  nn = nn;
  return nn;
};

let export_data = [];

let store_event = function (db_id, cal_name) {
  let validation = true;
  if (document.getElementById("event-title").value == "") {
    toaster("Title can't be empty", 2000);
    validation = false;
  }

  if (document.getElementById("event-recur").value != "none") {
    if (document.getElementById("event-date-end").value == "") {
      toaster("An end date is required for a recurrence", 2000);
      validation = false;
    }
  }
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
    if (p == "none") {
      return "";
    }
    if (p != "none") {
      r =
        "FREQ=" +
        document.getElementById("event-recur").value +
        ";UNTIL=" +
        convert_ics_date(convert_dt_end);
    }
    return r;
  };

  if (validation == false) return false;

  let event = {
    UID: uid(32),
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
    id: db_id,
  };

  if (event.alarm != "none") {
    event.BEGIN = "VALARM";
    event["TRIGGER;VALUE=DATE-TIME"] = notification_time;
    event.ACTION = "AUDIO";
    event.END = "VALARM";
    add_alarm(calc_notification, event.SUMMARY, event.UID);
  }

  if (db_id == "local-id") {
    console.log("local");
    events.push(event);
    console.log(JSON.stringify(events));

    let without_subscription = events.filter(
      (events) => events.id == "local-id"
    );

    console.log(JSON.stringify(without_subscription));

    localforage
      .setItem("events", without_subscription)
      .then(function (value) {
        clear_form();
        export_ical("greg.ics", without_subscription);
        side_toaster("<img src='assets/image/E25C.svg'", 2000);
        setTimeout(function () {
          m.route.set("/page_calendar");
          sort_array(events, "dateStart", "date");
        }, 200);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    console.log("online");
    create_caldav(
      "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ZContent.net//Greg Calendar 1.0//EN\nCALSCALE:GREGORIAN\nBEGIN:VEVENT\nSUMMARY:" +
        event.SUMMARY +
        "\nUID:" +
        event.UID +
        "\nSEQUENCE:0\nRRULE:" +
        event.RRULE +
        "\nDTSTART;TZID=" +
        settings.timezone +
        ":" +
        event.DTSTART +
        "\nDTEND;TZID=" +
        settings.timezone +
        ":" +
        event.DTEND +
        "\nDTSTAMP;TZID=" +
        settings.timezone +
        ":" +
        event.DTSTAMP +
        "\nLOCATION:" +
        event.LOCATION +
        "\nDESCRIPTION:" +
        event.DESCRIPTION +
        "\nEND:VEVENT\nEND:VCALENDAR",
      db_id,
      cal_name,
      event
    );
  }
  style_calendar_cell();
};

// ////////////
// UPDATE EVENT
// /////////

let update_event = function (account_id) {
  let validation = true;
  if (document.getElementById("event-title").value == "") {
    toaster("Title can't be empty", 2000);
    validation = false;
  }

  if (document.getElementById("event-recur").value != "none") {
    if (document.getElementById("event-date-end").value == "") {
      toaster("An end date is required for a recurrence", 2000);
      validation = false;
    }
  }
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

      if (validation == false) return false;

      index.SUMMARY = document.getElementById("event-title").value;
      index.LOCATION = document.getElementById("event-location").value;
      index.DESCRIPTION = document.getElementById("event-description").value;
      index.CLASS = "PRIVATE";
      index.DTSTAMP = convert_ics_date(convert_dt_start);
      index.DTSTART = convert_ics_date(convert_dt_start);
      index.DTEND = convert_ics_date(convert_dt_end);
      index.RRULE = rrule_convert();
      index.dateEnd = document.getElementById("event-date-end").value;
      index.dateStart = document.getElementById("event-date").value;
      index.time_start = document.getElementById("event-time-start").value;
      index.time_end = document.getElementById("event-time-end").value;
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

      if (account_id == "local-id") {
        let without_subscription = events.filter(
          (events) => events.isSubscription === false
        );

        localforage
          .setItem("events", without_subscription)
          .then(function (value) {
            // clean form
            side_toaster("<img src='assets/image/E25C.svg'", 2000);
            m.route.set("/page_calendar");
            export_ical("greg.ics", value);

            clear_form();
          })
          .catch(function (err) {});
      } else {
        update_caldav(
          index.etag,
          index.url,
          "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ZContent.net//Greg Calendar 1.0//EN\nCALSCALE:GREGORIAN\nBEGIN:VEVENT\nSUMMARY:" +
            index.SUMMARY +
            "\nUID:" +
            index.UID +
            "\nSEQUENCE:0\nRRULE:" +
            index.RRULE +
            "\nDTSTART;TZID=" +
            settings.timezone +
            ":" +
            index.DTSTART +
            "\nDTEND;TZID=" +
            settings.timezone +
            ":" +
            index.DTEND +
            "\nDTSTAMP;TZID=" +
            settings.timezone +
            ":" +
            index.DTSTAMP +
            "\nLOCATION:" +
            index.LOCATION +
            "\nDESCRIPTION:" +
            index.DESCRIPTION +
            "\nEND:VEVENT\nEND:VCALENDAR",
          index.id
        );
      }
    }
  });
};

//////////////
//DELETE EVENT
///////////

let delete_event = function (etag, url, account_id, uid) {
  if (etag) {
    delete_caldav(etag, url, account_id, status.selected_day_id);
  } else {
    console.log("local");
    //remove event
    events = events.filter((person) => person.UID != uid);
    remove_alarm(uid);
    //store only local events
    let without_subscription = events.filter(
      (event) => event.id === "local-id"
    );

    clear_form();

    localforage
      .setItem("events", without_subscription)
      .then(function (value) {
        export_ical("greg.ics", value);
        side_toaster("event deleted", 2000);
        m.route.set("/page_calendar");
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  }
};

// event slider
let t = new Date();
let mm = `0${t.getMonth() + 1}`.slice(-2);
let d = `0${t.getDate()}`.slice(-2);
let y = t.getFullYear();

// callback import event
let import_event_callback = function (id, date) {
  toaster("done", 2000);
  bottom_bar("edit", "", "");

  let without_subscription = events.filter(
    (events) => events.isSubscription === false
  );

  localforage
    .setItem("events", without_subscription)
    .then(function (value) {
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
      break;
  }
}

let backup_events = function () {
  localforage
    .getItem("events")
    .then(function (value) {
      export_ical("greg.ics", value);
    })
    .catch(function (err) {
      console.log(err);
    });
};

let import_event = function () {
  loadICS(
    document.activeElement.getAttribute("data-filename"),
    import_event_callback
  );
};

let stop_scan_callback = function () {
  // m.route.set("/page_subscriptions");
  document.getElementById("qr-screen").style.display = "none";
};

// /////////////
// //SHORTPRESS
// ////////////

function shortpress_action(param) {
  switch (param.key) {
    case "*":
      jump_to_today();

      break;

    case "ArrowUp":
      if (m.route.get() == "/page_calendar") {
        nav(-7);
      }
      if (
        m.route.get() == "/page_events" ||
        m.route.get() == "/page_options" ||
        m.route.get() == "/page_subscriptions" ||
        m.route.get() == "/page_accounts" ||
        m.route.get() == "/page_add_event" ||
        m.route.get() == "/page_edit_event"
      ) {
        nav(-1);
      }
      break;
    case "ArrowDown":
      if (m.route.get() == "/page_calendar") {
        nav(+7);
      }
      if (
        m.route.get() == "/page_events" ||
        m.route.get() == "/page_options" ||
        m.route.get() == "/page_subscriptions" ||
        m.route.get() == "/page_accounts" ||
        m.route.get() == "/page_add_event" ||
        m.route.get() == "/page_edit_event"
      ) {
        nav(+1);
      }

      break;
    case "ArrowRight":
      if (m.route.get() != "/page_calendar") return true;

      nav(1);
      break;
    case "ArrowLeft":
      if (m.route.get() != "/page_calendar") return true;

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

    case "SoftRight":
    case "Alt":
      if (m.route.get() == "/page_calendar") {
        m.route.set("/page_options");
        return true;
      }

      break;

    case "SoftLeft":
    case "Control":
      if (m.route.get() == "/page_events") {
        if (document.activeElement.classList.contains("subscription")) {
          toaster("a subscription cannot be edited", 2000);
          return false;
        }

        get_event_date();

        setTimeout(function () {
          m.route.set("/page_edit_event");
        }, 1000);

        return true;
      }
      if (
        m.route.get() == "/page_subscriptions" ||
        m.route.get() == "/page_accounts"
      ) {
        if (document.activeElement.getAttribute("data-scan-action") == "true") {
          start_scan(callback_scan);
        }

        return true;
      }

      if (m.route.get() == "/page_options") {
        if (
          document.activeElement.getAttribute("data-action") ==
          "delete-subscription"
        ) {
          delete_subscription();
        }

        if (
          document.activeElement.getAttribute("data-action") == "delete-account"
        ) {
          delete_account();
        }
      }

      if (m.route.get() == "/page_calendar") {
        m.route.set("/page_add_event");

        // when new event
        // set time
        // set_datetime_form();

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

      //toggle month/events
      if (
        m.route.get() == "/page_calendar" ||
        m.route.get() == "/page_events"
      ) {
        m.route.get() == "/page_calendar"
          ? m.route.set("/page_events")
          : m.route.set("/page_calendar");
      }
      break;

    case "Backspace":
      if (
        m.route.get() == "/page_add_event" &&
        document.activeElement.tagName != "INPUT"
      ) {
        m.route.set("/page_calendar");
      }

      if (
        m.route.get() == "/page_edit_event" &&
        document.activeElement.tagName != "INPUT"
      ) {
        m.route.set("/page_calendar");
      }

      if (m.route.get() == "/page_options") {
        m.route.set("/page_calendar");
      }

      if (
        m.route.get() == "/page_subscriptions" ||
        m.route.get() == "/page_accounts"
      ) {
        m.route.set("/page_options");
        if (document.getElementById("qr-screen").style == "block")
          document.getElementById("qr-screen").style = "none";
        stop_scan(stop_scan_callback);
      }

      break;
  }
}

// ///////////////////////////////
// //shortpress / longpress logic
// //////////////////////////////

function handleKeyDown(evt) {
  //option_button_bar();
  if (evt.key === "Backspace") {
    evt.preventDefault();
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
