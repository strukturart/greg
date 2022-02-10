// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

document.addEventListener("DOMContentLoaded", function () {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var today = new Date();
  var currentMonth = today.getMonth();
  var currentYear = today.getFullYear();
  var currentDay = today.getDate();
  var monthAndYear = document.getElementById("monthAndYear");
  var once = false;
  var status = {
    view: "month",
    selected_day: "",
    visible: false,
    update_event_id: ""
  };
  var settings = {};
  var blob = "";
  var events = []; //ads || ads free

  navigator.serviceWorker.register("/service-worker.js").then(function (reg) {
    // registration worked
    console.log("Registration succeeded. Scope is " + reg.scope);
  }).catch(function (error) {
    // registration failed
    console.log("Registration failed with " + error);
  }); //KaioOs ads

  var getManifest = function getManifest(callback) {
    if (!navigator.mozApps) {
      return false;
    }

    var self = navigator.mozApps.getSelf();

    self.onsuccess = function () {
      callback(self.result);
    };

    self.onerror = function () {};
  };

  var self; //KaiOs store true||false

  function manifest(a) {
    self = a.origin;
    var t = document.getElementById("KaiOsAds-Wrapper");

    if (a.installOrigin == "app://kaios-plus.kaiostech.com") {
      document.querySelector("#KaiOsAds-Wrapper iframe").src = "ads.html";
    } else {
      console.log("Ads free");
      t.style.display = "none";
    }
  }

  getManifest(manifest); // ////////
  // finde closest event to selected date in list view
  // ////////

  var find_closest_date = function find_closest_date(search_term) {
    var t = 0;
    var search = new Date(search_term).getTime();

    for (var i = 0; i < events.length; i++) {
      var item = new Date(events[i].dateStart).getTime();

      if (search < item) {
        t = events[i - 1].dateStart;
        i = events.length;
      } //after last event
      //focus last event


      if (search > new Date(events[events.length - 1].dateStart).getTime()) {
        t = events[events.length - 1].dateStart;
        i = events.length;
      }
    }

    document.querySelectorAll("div#list-view article[data-date='" + t + "']")[0].focus();
    return t;
  }; // check if has event


  var event_check = function event_check(date) {
    var feedback = {
      date: "",
      event: false,
      subscription: false,
      multidayevent: false,
      rrule: "none"
    };

    for (var _t = 0; _t < events.length; _t++) {
      if (_typeof(events[_t]) === "object") {
        feedback.event = false;
        feedback.subscription = false;
        feedback.multidayevent = false;
        feedback.rrule = false;
        feedback.date = date;
        var a = new Date(events[_t].dateStart).getTime();
        var b = new Date(events[_t].dateEnd).getTime();
        var c = new Date(date).getTime(); // multi day event

        if (events[_t]["rrule_"] == "none") {
          if (a === c || b === c || a < c && b > c) {
            feedback.event = true;

            if (events[_t].isSubscription === true) {
              feedback.subscription = true;
            }

            if (events[_t].multidayevent === true) {
              feedback.multidayevent = true;
            }

            _t = events.length;
          }
        }
      }
    }

    return feedback;
  }; // check if has event


  var rrule_check = function rrule_check(date) {
    var feedback = {
      date: "",
      event: false,
      subscription: false,
      multidayevent: false,
      rrule: "none"
    };

    for (var _t2 = 0; _t2 < events.length; _t2++) {
      if (_typeof(events[_t2]) === "object") {
        feedback.event = false;
        feedback.subscription = false;
        feedback.multidayevent = false;
        feedback.rrule = false;
        feedback.date = date;
        var a = new Date(events[_t2].dateStart).getTime();
        var b = new Date(events[_t2].dateEnd).getTime();
        var c = new Date(date).getTime(); //recurrences

        if (typeof events[_t2]["rrule_"] !== "undefined" && events[_t2]["rrule_"] !== undefined) {
          if (new Date(events[_t2].dateStart).getTime() <= new Date(date).getTime() && new Date(date).getTime() <= new Date(events[_t2].dateEnd).getTime()) {
            if (events[_t2].rrule_ == "MONTHLY") {
              if (new Date(events[_t2].dateStart).getDate() === new Date(date).getDate()) {
                feedback.rrule = true;
                _t2 = events.length;
                return feedback;
              }
            }

            if (events[_t2]["rrule_"] == "DAILY") {
              feedback.rrule = true;
              _t2 = events.length;
              return feedback;
            }

            if (events[_t2].rrule_ == "WEEKLY") {
              if (new Date(events[_t2].dateStart).getDay() === new Date(date).getDay()) {
                feedback.rrule = true;
                _t2 = events.length;
                return feedback;
              }
            }

            if (events[_t2].rrule_ == "YEARLY") {
              var tt = new Date(events[_t2].dateStart);
              var pp = new Date(date);

              if (tt.getDate() + "-" + tt.getMonth() === pp.getDate() + "-" + pp.getMonth()) {
                feedback.rrule = true;
                _t2 = events.length;
                return feedback;
              }
            }
          }
        }
      }
    }

    return feedback;
  }; //////////////////
  //event slider
  ///////////


  var slider = [];
  var slider_index = 0;

  var event_check_day = function event_check_day(date) {
    slider = [];
    var k = document.querySelector("div#event-slider-indicator div");
    k.innerHTML = "";
    var elements = document.querySelectorAll("div#event-slider article");

    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }

    var item = document.querySelectorAll("div#event-slider article");

    for (var _i = 0; _i < item.length; _i++) {
      var a = new Date(item[_i].getAttribute("data-date")).getTime();
      var b = new Date(item[_i].getAttribute("data-date-end")).getTime();
      var c = new Date(date).getTime();

      var _d = item[_i].getAttribute("data-rrule");

      if (_d === "none" || _d === "") {
        if (a === c || b === c || a < c && b > c) {
          slider.push(item[_i]);
          slider[0].style.display = "block";
          k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
        }
      } else {
        if (a === c || b === c || a < c && b > c && _d) {
          //recurrences
          //YEAR
          if (_d == "YEARLY") {
            var tt = new Date(item[_i].getAttribute("data-date"));
            var pp = new Date(date);

            if (tt.getDate() + "-" + tt.getMonth() === pp.getDate() + "-" + pp.getMonth()) {
              slider.push(item[_i]);
              slider[0].style.display = "block";
              k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
            }
          } //WEEK


          if (_d == "WEEKLY") {
            if (new Date(item[_i].getAttribute("data-date")).getDay() == new Date(date).getDay()) {
              slider.push(item[_i]);
              slider[0].style.display = "block";
              k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
            }
          } //MONTH


          if (_d == "MONTHLY") {
            if (new Date(item[_i].getAttribute("data-date")).getDate() == new Date(date).getDate()) {
              slider.push(item[_i]);
              slider[0].style.display = "block";
              k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
            }
          }

          if (_d == "DAILY") {
            if (a === c || b === c || a < c && b > c) {
              slider.push(item[_i]);
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

  var slider_navigation = function slider_navigation() {
    var p = document.querySelectorAll("div#event-slider-indicator div div");

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
  }; ////
  // JUMP TO TODAY
  ////


  var jump_to_today = function jump_to_today() {
    var currentMonth = today.getMonth();
    var currentYear = today.getFullYear();
    showCalendar(currentMonth, currentYear);
    console.log(currentMonth);
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
  } //////////////
  //BUILD CALENDAR
  //////////////
  // get weeknumber


  Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0); // Thursday in current week decides the year.

    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7); // January 4 is always in week 1.

    var week1 = new Date(date.getFullYear(), 0, 4); // Adjust to Thursday in week 1 and count number of weeks from date to week1.

    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  var showCalendar = function showCalendar(month, year) {
    helper.bottom_bar("add", "events", "options");
    var firstDay = new Date(year, month).getDay();
    var daysInMonth = 32 - new Date(year, month, 32).getDate();
    var tbl = document.getElementById("calendar-body"); // clearing all previous cells

    tbl.innerHTML = ""; // filing data about month and in the page via DOM.

    monthAndYear.innerHTML = months[month] + " " + year; // creating all cells

    var date = 1;

    for (var i = 0; i < 6; i++) {
      // creates a table row
      var row = document.createElement("div");
      row.classList.add("flex");
      row.classList.add("row");
      row.classList.add("width-100"); // creating individual cells, filing them up with data.

      for (var j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          var cell = document.createElement("div");
          var cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > daysInMonth) {
          break;
        } else {
          var _cell = document.createElement("div");

          var span = document.createElement("span");
          var moon = document.createElement("div");

          var _cellText = document.createTextNode(date);

          _cell.appendChild(_cellText);

          _cell.appendChild(span); // set tabindex


          _cell.setAttribute("tabindex", date - 1); // store date with leading 0
          // because input type date
          // accept only day month with leading zero


          var mmonth = "0".concat(month + 1).slice(-2);
          var day = "0".concat(date).slice(-2);
          var p = year + "-" + mmonth + "-" + day;
          moon.classList.add("moon-phase-" + getMoonPhase(year, month, date));

          _cell.appendChild(moon);

          _cell.setAttribute("data-date", p);

          _cell.setAttribute("data-index", new Date(p).toISOString()); // check if has event


          if (events.length > 0) {
            if (event_check(p).event) {
              _cell.classList.add("event");
            }

            if (rrule_check(p).rrule) {
              _cell.classList.add("event");
            } // check if has event + subscription


            if (event_check(p).subscription == true) {
              _cell.classList.add("subscription");
            }
          }

          _cell.classList.add("item");

          row.appendChild(_cell);
          date++;
        }
      } // add weeknumbers


      var week = document.createElement("span");
      week.classList.add("weeknumber");
      var weekText = document.createTextNode(new Date(year, month, date).getWeek());
      week.appendChild(weekText);
      row.appendChild(week); //add row

      tbl.appendChild(row);
    }

    document.querySelectorAll(".item")[0].focus();
    status.selected_day = document.activeElement.getAttribute("data-date"); // highlight current day

    if (today.getMonth() == month && today.getFullYear() == year) {
      document.querySelectorAll(".item")[currentDay - 1].focus();
      document.querySelectorAll(".item")[currentDay - 1].classList.add("today");
    }
  };

  var set_tabindex = function set_tabindex() {
    document.querySelectorAll("div#list-view article").forEach(function (i, p) {
      i.setAttribute("tabindex", p);
    });
  }; //RENDER


  function renderHello(arr) {
    document.getElementById("event-slider").style.opacity = 0;
    helper.sort_array(arr, "dateStart", "date");
    var template = document.getElementById("template").innerHTML;
    var rendered = Mustache.render(template, {
      data: arr
    });
    document.getElementById("list-view").innerHTML = rendered;
    document.getElementById("event-slider").innerHTML = rendered;
    document.getElementById("event-slider").style.opacity = 100;
    set_tabindex(); //event_check_day(document.activeElement.getAttribute("data-date"));
    //format date

    document.querySelectorAll("article").forEach(function (index) {
      var t = new Date(index.getAttribute("data-date"));
      var n = new Date(index.getAttribute("data-date-end"));
      var d = weekday[t.getDay()] + ", " + t.getFullYear() + " " + months[t.getMonth()] + " " + t.getDate();
      var m = weekday[n.getDay()] + ", " + n.getFullYear() + " " + months[n.getMonth()] + " " + n.getDate(); // to do singel day event or not

      if (index.classList.contains("multidayevent")) {
        index.querySelector("div.date").innerText = d + " - " + m;
      } else {
        index.querySelector("div.date").innerText = d;
      }
    });
  }

  if ("b2g.alarmManager" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then(function (registration) {
      registration.systemMessageManager.subscribe("alarm").then(function (rv) {
        console.log('Successfully subscribe system messages of name "alarm".');
      }, function (error) {
        console.log("Fail to subscribe system message, error: " + error);
      });
    });
  }

  var clear_form = function clear_form() {
    Array.from(document.querySelectorAll("div#add-edit-event input")).forEach(function (e) {
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


  var month = document.getElementById("calendar");
  var add_edit_event = document.getElementById("add-edit-event");
  var list_view = document.getElementById("list-view");
  var options = document.getElementById("options");

  var option_button_bar = function option_button_bar() {
    setTimeout(function () {
      if (status.view == "options") {
        if (document.activeElement.getAttribute("data-function") == "subscription") {
          helper.bottom_bar("delete", "select", "");
          return true;
        } else {
          helper.bottom_bar("", "select", "");
          return true;
        }
      }
    }, 500);
  };

  var pages = document.querySelectorAll(".page");

  var router = function router(view) {
    Array.from(pages).forEach(function (index) {
      index.style.display = "none";
    });

    if (view == "view") {
      if (status.view == "month") {
        status.view = "list-view";
      } else {
        status.view = "month";
      }
    } // add event view


    if (status.view == "add-edit-event") {
      if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
      document.getElementById("event-date").value = status.selected_day;
      add_edit_event.style.display = "block";
      Array.from(document.querySelectorAll("div#add-edit-event .item")).forEach(function (i, p) {
        i.setAttribute("tabindex", p);
      });
      add_edit_event.querySelectorAll(".item")[0].focus();
      helper.bottom_bar("", "edit", "");

      if (document.getElementById("event-date-end").value == "") {
        document.getElementById("event-date-end").value = document.getElementById("event-date").value;
      }

      if (status.edit_event) {
        document.getElementById("save-event").innerText = "update";
      }

      console.log(status.edit_event);

      if (!status.edit_event) {
        document.getElementById("save-event").innerText = "save";
        document.getElementById("event-notification-time").value = settings.default_notification;
      }

      return true;
    } // month view


    if (status.view == "month") {
      if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
      options.style.display = "none";
      month.style.display = "block";
      helper.bottom_bar("add", "events", "options");
      status.edit_event = false;

      var _t3 = new Date(status.selected_day);

      currentMonth = _t3.getMonth();
      currentYear = _t3.getFullYear();
      var k = status.selected_day;
      showCalendar(currentMonth, currentYear);
      Array.from(document.querySelectorAll("div#calendar-body div.item")).forEach(function (item) {
        if (item.getAttribute("data-date") == k) {
          item.focus();
          event_check_day(k);
        }
      });
      clear_form();
    } // list view


    if (status.view == "list-view") {
      if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
      options.style.display = "none";
      status.edit_event = false;
      clear_form();
      helper.bottom_bar("edit", "month", "options");
      list_view.style.display = "block";
      setTimeout(function () {
        var articles = document.querySelectorAll("div#list-view article");
        var success = false;

        for (var k = 0; k < articles.length; k++) {
          if (articles[k].getAttribute("data-date") == status.selected_day) {
            articles[k].focus();
            k = articles.length;
            success = true;
          }
        } //


        for (var k = 0; k < articles.length; k++) {
          console.log(articles[k].getAttribute("data-alarm"));
          if (articles[k].getAttribute("data-alarm") == "none") articles[k].querySelector("img.bell").style.display = "none";
        }

        if (!success) {
          document.querySelectorAll("div#list-view article")[0].focus();
          find_closest_date(status.selected_day);
        }

        var rect = document.activeElement.getBoundingClientRect();
        var elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
        document.activeElement.parentNode.scrollBy({
          left: 0,
          top: elY - window.innerHeight / 2,
          behavior: "smooth"
        });
      }, 1000);
    }

    if (status.view == "options") {
      if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");

      if (!once) {
        eximport.list_ics();
        list_subscriptions();
        once = true;
      }

      document.getElementById("options").style.display = "block";
      document.querySelectorAll("div#options .item")[0].focus();
      document.getElementById("options").style.opacity = "1";
      document.getElementById("subscription-form").style.display = "none";
      setTimeout(function () {
        Array.from(document.querySelectorAll("div#options .item")).forEach(function (i, p) {
          i.setAttribute("tabindex", p);
        });
      }, 2000);
      option_button_bar();
    }

    if (status.view == "subscription") {
      document.getElementById("options").style.opacity = "0.3";
      document.getElementById("subscription-form").style.display = "block";
      document.querySelectorAll("div#subscription-form div.item input")[0].focus();
      helper.bottom_bar("QR", "", "save");
    }
  };

  var list_subscriptions = function list_subscriptions() {
    if (subscriptions == null) return false;
    subscriptions.forEach(function (item) {
      document.querySelector("div#options div#subscription-text").insertAdjacentHTML("afterend", '<button class="item dynamic" data-function="subscription">' + item.name + "</button>");
      Array.from(document.querySelectorAll("div#options button")).forEach(function (i, p) {
        i.setAttribute("tabindex", p);
      });
    });
  };

  var lp = 0;

  var load_subscriptions = function load_subscriptions() {
    console.log(subscriptions);
    if (subscriptions == null || subscriptions.lenght == -1 || subscriptions.lenght == "undefined") return false;

    if (lp < subscriptions.length) {
      eximport.fetch_ics(subscriptions[lp].url, load_subscriptions);
      lp++;
      helper.toaster("subscriptions loaded", 2000);
    } else {}

    jump_to_today();
    renderHello(events);
    event_check_day(document.activeElement.getAttribute("data-date"));
    if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
  };

  var callback_scan = function callback_scan(url) {
    helper.bottom_bar("QR", "save", "cancel");
    document.querySelector("div#subscription-form input#cal-subs-url").value = url;
  };

  var subscriptions = new Array();

  var store_subscription = function store_subscription() {
    console.log(subscriptions);

    if (helper.validate(document.getElementById("cal-subs-url").value) && document.getElementById("cal-subs-name").value != "") {
      subscriptions = [];
      subscriptions.push({
        url: document.getElementById("cal-subs-url").value,
        name: document.getElementById("cal-subs-name").value
      });
      document.querySelector("input#cal-subs-name").val = "";
      document.querySelector("input#cal-subs-url").val = "";
      localforage.setItem("subscriptions", subscriptions).then(function (value) {
        document.getElementById("subscription-form").style.display = "none";
        helper.toaster("subscription stored", 2000);
        status.view = "options";
        router();
      }).catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
      load_subscriptions();
      list_subscriptions();
    } else {
      helper.toaster("Please enter a name and a valid url", 2000);
    }
  };

  var delete_subscription = function delete_subscription() {
    var updated_subscriptions = subscriptions.filter(function (e) {
      return e.name != document.activeElement.innerText;
    });
    localforage.setItem("subscriptions", updated_subscriptions).then(function (value) {
      //Do other things once the value has been saved.
      console.log("saved: " + value);
      helper.toaster("subscription deleted", 2000);
      status.view = "month";
      router();
    }).catch(function (err) {
      // This code runs if there were any errors
      helper.toaster(err, 2000);
    });
    document.activeElement.remove();
  };

  localforage.getItem("events").then(function (value) {
    if (value != null) events = value;
    renderHello(events);
    jump_to_today();
  }).catch(function (err) {
    jump_to_today();
  });
  localforage.getItem("subscriptions").then(function (value) {
    subscriptions = value;
    setTimeout(function () {
      if (subscriptions == null) return false;
      load_subscriptions();
      console.log(subscriptions);
    }, 2000);
  }).catch(function (err) {
    // This code runs if there were any errors
    console.log(err);
  });
  localforage.getItem("settings").then(function (value) {
    if (value == null) return false;
    settings = value;
    document.getElementById("default-notification-time").value = settings.default_notification;
  }).catch(function (err) {
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

  handleVisibilityChange(); /////////////////
  ///NAVIGATION
  /////////////////

  var nav = function nav(move) {
    if (document.activeElement.nodeName == "SELECT" || document.activeElement.type == "date" || document.activeElement.type == "time") return false;
    var currentIndex = document.activeElement.tabIndex;
    var next = currentIndex + move;
    var items = 0;

    if (status.view == "month") {
      var b = document.activeElement.parentNode.parentNode;
      items = b.querySelectorAll(".item");
    }

    if (status.view == "list-view") {
      var _b = document.activeElement.parentNode;
      items = _b.querySelectorAll("div#list-view article");
    }

    if (status.view == "subscription") {
      items = document.querySelectorAll("div#subscription-form > div.item");
    }

    if (status.view == "add-edit-event" || status.view == "options") {
      var _b2 = document.activeElement.parentNode;
      items = _b2.querySelectorAll(".item");

      if (document.activeElement.parentNode.classList.contains("input-parent")) {
        document.activeElement.parentNode.focus();
        return true;
      } else {
        document.getElementById("add-edit-event").firstElementChild.focus();
      }
    }

    var targetElement = 0;

    if (next <= items.length) {
      targetElement = items[next];
      targetElement.focus();
    }

    if (next == items.length) {
      targetElement = items[0];
      targetElement.focus();
    }

    var rect = document.activeElement.getBoundingClientRect();
    var elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
    document.activeElement.parentNode.scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: "smooth"
    });

    if (status.view == "month" || status.view == "list-view") {
      if (targetElement.hasAttribute("data-date")) {
        status.selected_day = targetElement.getAttribute("data-date");
        status.selected_day_id = targetElement.getAttribute("data-id");
        event_check_day(status.selected_day);
      }

      return true;
    }

    if (document.activeElement.id == "form-image-wrapper" && status.view == "add-edit-event") {
      helper.bottom_bar("", "remove image", "");
      return true;
    }

    if (document.activeElement.id != "form-image-wrapper" && status.view == "add-edit-event") {
      helper.bottom_bar("", "edit", "");
      return true;
    }
  }; // foram actions
  // after selection


  document.getElementById("event-notification-time").addEventListener("change", function (event) {
    setTimeout(function () {
      document.getElementById("event-notification-time").parentElement.focus();
    }, 500);
  }); //default when is not set

  settings.default_notification = "none";
  document.getElementById("default-notification-time").addEventListener("change", function (event) {
    var l = document.getElementById("default-notification-time").value;
    settings.default_notification = l;
    localforage.setItem("settings", settings).then(function (value) {}).catch(function (err) {
      console.log(err);
    });
    setTimeout(function () {
      document.getElementById("default-notification-time").parentElement.focus();
    }, 500);
  });
  document.querySelectorAll('input[type="time"]').forEach(function (item) {
    item.addEventListener("change", function (event) {
      setTimeout(function () {
        item.parentElement.focus();
      }, 500);
    });
  });
  document.querySelectorAll('input[type="date"]').forEach(function (item) {
    item.addEventListener("change", function (event) {
      setTimeout(function () {
        item.parentElement.focus();
      }, 500);
    });
  });

  var add_alarm = function add_alarm(date, message_text, id) {
    // KaiOs 3.0
    navigator.serviceWorker.ready.then(function (registration) {
      console.log(registration);
    });

    if ("b2g.alarmManager" in navigator) {
      // This is arbitrary data pass to the alarm
      var data = {
        foo: message_text,
        event_id: id
      };
      var request = navigator.b2g.alarmManager.add(date, "honorTimezone", data);

      request.onsuccess = function () {};

      request.onerror = function () {
        console.log("An error occurred: " + this.error.name);
      };
    } else {
      console.log("API not aviable");
    } // KaiOs  2.xx


    if (navigator.mozAlarms) {
      // This is arbitrary data pass to the alarm
      var data = {
        foo: message_text,
        event_id: id
      }; // The "honorTimezone" string is what make the alarm honoring it

      var request = navigator.mozAlarms.add(date, "honorTimezone", data);

      request.onsuccess = function () {// console.log(this.result);
      };

      request.onerror = function () {
        console.log("An error occurred: " + this.error.name);
      };
    }
  }; // may better to compare all alarms
  // with all events
  // to clean


  var remove_alarm = function remove_alarm(id) {
    // KaiOs  3.00
    if ("b2g.alarmManager" in navigator) {
      var request = navigator.b2g.alarmManager.getAll();

      request.onsuccess = function () {
        this.result.forEach(function (alarm) {
          if (alarm.data.event_id == id) {
            var req = navigator.b2g.alarmManager.remove(alarm.id);

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
    } // KaiOs  2.xx


    if (navigator.mozAlarms) {
      var _request = navigator.mozAlarms.getAll();

      _request.onsuccess = function () {
        this.result.forEach(function (alarm) {
          if (alarm.data.event_id == id) {
            var req = navigator.mozAlarms.remove(alarm.id);

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

      _request.onerror = function () {
        console.log("An error occurred:", this.error.name);
      };
    }
  };

  var test_alarm = function test_alarm() {
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
  }; // //////////////////
  // //BUILD EVENT-LIST
  // /////////////////
  // /////////////
  // /////////////
  // STORE EVENTS//
  // /////////////
  // /////////////


  var convert_ics_date = function convert_ics_date(t) {
    var nn = t.replace(/-/g, "");
    nn = nn.replace(/:/g, "");
    nn = nn.replace(" ", "T");
    nn = nn + "00";
    return nn;
  };

  var export_data = [];

  var store_event = function store_event() {
    var start_time = "00:00:00";

    if (document.getElementById("event-time-start").value != "") {
      start_time = document.getElementById("event-time-start").value;
    }

    var end_time = "00:00:00";

    if (document.getElementById("event-time-end").value != "") {
      end_time = document.getElementById("event-time-end").value;
    }

    var convert_dt_start = document.getElementById("event-date").value + " " + start_time;
    if (document.getElementById("event-date-end").value == "") document.getElementById("event-date-end").value = document.getElementById("event-date").value;
    var convert_dt_end = document.getElementById("event-date-end").value + " " + end_time; // notification before event

    var notification_time = document.getElementById("event-notification-time").value;
    var calc_notification;

    if (notification_time != "none") {
      calc_notification = new Date(convert_dt_start);
      calc_notification.setMinutes(calc_notification.getMinutes() - notification_time);
      notification_time = convert_ics_date(calc_notification.toISOString());
    }

    var multidayevent = false;
    var a = new Date(document.getElementById("event-date").value).getTime();
    var b = new Date(document.getElementById("event-date-end").value).getTime();

    if (a != b) {
      multidayevent = true;
    }

    var rrule_convert = function rrule_convert() {
      var p = document.getElementById("event-recur").value;
      var r;

      if (p != "" || p != "none") {
        r = "FREQ=" + document.getElementById("event-recur").value + ";UNTIL=" + convert_ics_date(convert_dt_end);
      }

      return r;
    };

    var event = {
      UID: helper.uid(),
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
      ATTACH: blob
    };

    if (event.alarm != "none") {
      event.BEGIN = "VALARM";
      event["TRIGGER;VALUE=DATE-TIME"] = notification_time;
      event.ACTION = "AUDIO";
      event.END = "VALARM";
      add_alarm(calc_notification, event.SUMMARY, event.UID);
    }

    events.push(event);
    var without_subscription = events.filter(function (events) {
      return events.isSubscription === false;
    });
    localforage.setItem("events", without_subscription).then(function (value) {
      helper.toaster("saved", 2000); // clean form

      clear_form();
      renderHello(events);
      eximport.export_ical("greg.ics", without_subscription);
    }).catch(function (err) {});
    status.view = "month";
    router();
  }; // ////////////
  // UPDATE EVENT
  // /////////


  var update_event = function update_event() {
    events.forEach(function (index) {
      var a = new Date(document.getElementById("event-date").value).getTime();
      var b = new Date(document.getElementById("event-date-end").value).getTime();
      var multidayevent = false;

      if (a != b) {
        multidayevent = true;
      }

      if (index.UID == status.selected_day_id) {
        var start_time = "00:00:00";

        if (document.getElementById("event-time-start").value != "") {
          start_time = document.getElementById("event-time-start").value;
        }

        var end_time = "00:00:00";

        if (document.getElementById("event-time-end").value != "") {
          end_time = document.getElementById("event-time-end").value;
        }

        var convert_dt_start = document.getElementById("event-date").value + " " + start_time;
        var convert_dt_end = document.getElementById("event-date").value + " " + end_time; // notification before event

        var notification_time = document.getElementById("event-notification-time").value;
        var calc_notification = "";

        if (notification_time != "none") {
          calc_notification = new Date(convert_dt_start);
          calc_notification.setMinutes(calc_notification.getMinutes() - notification_time);
          notification_time = convert_ics_date(calc_notification.toISOString());
        }

        var rrule_convert = function rrule_convert() {
          var p = document.getElementById("event-recur").value;
          var r;

          if (p != "" || p != "none") {
            r = "FREQ=" + document.getElementById("event-recur").value + ";UNTIL=" + convert_ics_date(convert_dt_end);
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
    var without_subscription = events.filter(function (events) {
      return events.isSubscription === false;
    });
    localforage.setItem("events", without_subscription).then(function (value) {
      // clean form
      renderHello(events);
      eximport.export_ical("greg.ics", value);
      status.view = "month";
      router();
      clear_form();
    }).catch(function (err) {});
  }; // ////////////
  // EDIT EVENT
  // /////////


  var edit_event = function edit_event() {
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
  }; //////////////
  //DELETE EVENT
  ///////////


  var delete_event = function delete_event() {
    var f = false;
    events = events.filter(function (person) {
      return person.UID != status.selected_day_id;
    });
    remove_alarm(status.selected_day_id);
    f = true;
    status.edit_event = false;
    var without_subscription = events.filter(function (events) {
      return events.isSubscription === false;
    });
    clear_form();
    localforage.setItem("events", without_subscription).then(function (value) {
      renderHello(events);
      eximport.export_ical("greg.ics", value);
    }).catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });
    return f;
  }; // event slider


  var t = new Date();
  var m = "0".concat(t.getMonth() + 1).slice(-2);
  var d = "0".concat(t.getDate()).slice(-2);
  var y = t.getFullYear();
  event_check_day(y + "-" + m + "-" + d); // callback import event

  var import_event = function import_event(id, date) {
    //status.selected_day = date;
    //status.selected_day_id = id;
    helper.bottom_bar("edit", "", ""); //renderHello(events);

    var without_subscription = events.filter(function (events) {
      return events.isSubscription === false;
    });
    localforage.setItem("events", without_subscription).then(function (value) {
      renderHello(events);
      eximport.export_ical("greg.ics", without_subscription);
    }).catch(function (err) {});
  };

  var set_datetime_form = function set_datetime_form() {
    var d = new Date();
    var d_h = "0".concat(d.getHours()).slice(-2);
    var d_m = "0".concat(d.getMinutes()).slice(-2);
    var p = d_h + ":" + d_m;
    var d_h_ = "0".concat(d.getHours() + 1).slice(-2);
    var d_m_ = "0".concat(d.getMinutes()).slice(-2);
    if (d_h_ > 23) d_h_ = "23";
    var pp = d_h_ + ":" + d_m_;
    document.getElementById("event-time-start").value = p;
    document.getElementById("event-time-end").value = pp;
  };

  var pick_image_callback = function pick_image_callback(resultBlob) {
    var t = document.getElementById("form-image");
    t.src = URL.createObjectURL(resultBlob);
    document.getElementById("form-image-wrapper").classList.add("item");
    document.querySelectorAll("div#add-edit-event .item").forEach(function (i, p) {
      i.setAttribute("tabindex", p);
    });
    var fr = new FileReader();

    fr.onload = function () {
      blob = fr.result;
    };

    fr.readAsDataURL(resultBlob);
  }; // ////////////////////////////
  // //KEYPAD HANDLER////////////
  // ////////////////////////////


  var longpress = false;
  var longpress_timespan = 1000;
  var timeout;

  function repeat_action(param) {
    switch (param.key) {
      case "0":
        break;
    }
  } // ////////////
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
        if (status.view == "list-view") {}

        break;
    }
  } // /////////////
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

        if (status.view == "add-edit-event" || status.view == "list-view" || status.view == "options" || status.view == "subscription") {
          nav(-1);
        }

        break;

      case "ArrowDown":
        if (status.view == "month") {
          nav(+7);
        }

        if (status.view == "add-edit-event" || status.view == "list-view" || status.view == "options" || status.view == "subscription") {
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
        document.querySelectorAll("div#calendar div#calendar-body div div [class^='moon-phase-']").forEach(function (e) {
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
            helper.toaster("a subscription cannot be edited", 2000);
            return false;
          }

          status.selected_day_id = document.activeElement.getAttribute("data-id");
          status.edit_event = true;
          edit_event();
          status.view = "add-edit-event";
          router();
        }

        if (status.view == "subscription") {
          qr.start_scan(callback_scan);
          return true;
        }

        if (status.view == "options") {
          delete_subscription();
          return true;
        }

        if (status.view == "month") {
          status.view = "add-edit-event";
          router(); // when new event
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
          eximport.export_ical(export_data[0].UID + ".ics", export_data);
          helper.toaster("event exported", 2000);
          return true;
        }

        if (document.activeElement.id == "select-image") {
          helper.pick_image(pick_image_callback);
          return true;
        }

        if (document.activeElement.id == "form-image-wrapper") {
          document.getElementById("form-image").src = "";
          blob = "";
          return true;
        }

        if (document.activeElement.getAttribute("data-function") == "add-subscription") {
          status.view = "subscription";
          router();
          return true;
        } // same button with different text and action


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
            localforage.getItem("events").then(function (value) {
              eximport.export_ical("greg.ics", value);
            }).catch(function (err) {
              console.log(err);
            });
          }

          if (document.activeElement.getAttribute("data-function") == "import") {
            eximport.loadICS(document.activeElement.getAttribute("data-filename"), import_event);
          }

          return true;
        }

        if (status.view == "month" || status.view == "list-view") router("view");
        break;

      case "Backspace":
        if (status.view == "add-edit-event" && document.activeElement.tagName != "INPUT") {
          status.view = "month";
          router();
        }

        if (status.view == "options") {
          status.view = "month";
          router();
        }

        if (status.view == "scan") {
          status.views = "subscription";
          router();
        }

        break;
    }
  } // ///////////////////////////////
  // //shortpress / longpress logic
  // //////////////////////////////


  function handleKeyDown(evt) {
    option_button_bar();

    if (evt.key === "Backspace") {
      if (status.view == "options" || status.view == "add-edit-event" || status.view == "scan") {
        evt.preventDefault();
      }
    }

    if (evt.key === "EndCall") {
      evt.preventDefault();
      window.close();
    }

    if (!evt.repeat) {
      longpress = false;
      timeout = setTimeout(function () {
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

    if (evt.key == "Backspace" && document.activeElement.tagName == "INPUT") {}

    clearTimeout(timeout);

    if (!longpress) {
      shortpress_action(evt);
    }
  }

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
  console.log("DOM is loaded");
});
},{"./service-worker.js":[["service-worker.js","service-worker.js"],"service-worker.js.map","service-worker.js"]}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40361" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/application.e31bb0bc.js.map