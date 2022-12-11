"use strict";

import localforage from "localforage";
import { side_toaster, sort_array } from "./assets/js/helper.js";
import { toaster } from "./assets/js/helper.js";
import { validate } from "./assets/js/helper.js";
import { pick_image } from "./assets/js/helper.js";
import { get_file } from "./assets/js/helper.js";
import { bottom_bar } from "./assets/js/helper.js";
import { popup } from "./assets/js/helper.js";
import { getMoonPhase } from "./assets/js/getMoonPhase.js";
import { fetch_ics } from "./assets/js/eximport.js";
import { export_ical } from "./assets/js/eximport.js";
import { parse_ics } from "./assets/js/eximport.js";
import { start_scan } from "./assets/js/scan.js";
import { stop_scan } from "./assets/js/scan.js";
import m from "mithril";
import { DAVClient } from "./assets/js/tsdav.js";
import "url-search-params-polyfill";
import { list_files } from "./assets/js/helper.js";
import { DAVNamespaceShort } from "./assets/js/tsdav.js";
import { get_time } from "./assets/js/helper.js";
import { uid } from "uid";
import { google_cred } from "./assets/js/google_cred.js";
import dayjsPluginUTC from "dayjs-plugin-utc";

const dayjs = require("dayjs");
const moment = require("moment-timezone");
dayjs.extend(dayjsPluginUTC);

const google_oauth_url =
  "https://accounts.google.com/o/oauth2/v2/auth?client_id=762086220505-f0kij4nt279nqn21ukokm06j0jge2ngl.apps.googleusercontent.com&response_type=code&state=state_parameter_passthrough_value&scope=https://www.googleapis.com/auth/calendar&redirect_uri=https://greg.strukturart.com/redirect.html&access_type=offline&prompt=consent";

export let events = [];
export let accounts = [];
export let event_templates = [];

let oauth_callback = "";

localforage.setDriver(localforage.INDEXEDDB);

let calendar_names = [
  {
    name: "local",
    id: "local-id",
    data: "",
    type: "local",
  },
];

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

let load_caldav = function () {
  accounts.forEach(function (item) {
    let client = "";
    if (item.type == "oauth") {
      client = new DAVClient({
        serverUrl: item.server_url,
        credentials: {
          tokenUrl: "https://oauth2.googleapis.com/token",
          refreshToken: item.tokens.refresh_token,
          clientId: google_cred.clientId,
          clientSecret: google_cred.clientSecret,
          authorizationCode: item.authorizationCode,
          redirectUrl: "https://greg.strukturart.com/redirect.html",
        },
        authMethod: "Oauth",
        defaultAccountType: "caldav",
      });
    } else {
      client = new DAVClient({
        serverUrl: item.server_url,
        credentials: {
          username: item.user,
          password: item.password,
        },
        authMethod: "Basic",
        defaultAccountType: "caldav",
      });
    }

    (async () => {
      try {
        await client.login();
      } catch (e) {
        if (e.message == "Network request failed") {
          toaster(
            "the data of the accounts" + item.name + " could not be loaded",
            5000
          );
        }

        if (e.message == "Invalid credentials")
          toaster(
            "there was a problem logging into your account " +
              item.name +
              " please check your account details",
            5000
          );
      }

      try {
        document.getElementById("icon-loading").style.visibility = "visible";

        const calendars = await client.fetchCalendars();
        let k = [];

        for (let i = 0; i < calendars.length; i++) {
          const objects = await client.fetchCalendarObjects({
            calendar: calendars[i],
          });
          //cache data
          let data_to_store = {
            displayName: calendars[i].displayName,
            syncToken: calendars[i].syncToken,
            ctag: calendars[i].ctag,
            url: calendars[i].url,
            objects: objects,
          };

          k.push(data_to_store);

          localforage
            .setItem(item.id, k)
            .then(function () {
              console.log("data cached");
            })
            .catch(function (err) {
              console.log(err);
            });
          //parse data
          objects.forEach(function (i) {
            parse_ics(i.data, "", false, i.etag, i.url, item.id, true);
          });
          document.getElementById("icon-loading").style.visibility = "hidden";
          style_calendar_cell();
          side_toaster("Data loaded", 3000);
        }
      } catch (e) {
        document.getElementById("icon-loading").style.visibility = "hidden";

        console.log(e);
      }
    })();
  });
};

let cache_caldav = function () {
  accounts.forEach(function (item) {
    const client = "";
    if (item.type == "oauth") {
      console.log("oauth");
      client = new DAVClient({
        serverUrl: item.server_url,
        credentials: {
          tokenUrl: "https://oauth2.googleapis.com/token",
          refreshToken: item.tokens.refresh_token,
          clientId: google_cred.clientId,
          clientSecret: google_cred.clientSecret,
          authorizationCode: item.authorizationCode,
          redirectUrl: "https://greg.strukturart.com/redirect.html",
        },
        authMethod: "Oauth",
        defaultAccountType: "caldav",
      });
    } else {
      client = new DAVClient({
        serverUrl: item.server_url,
        credentials: {
          username: item.user,
          password: item.password,
        },
        authMethod: "Basic",
        defaultAccountType: "caldav",
      });
    }

    (async () => {
      try {
        await client.login();
      } catch (e) {
        if (e.message == "Network request failed") {
          toaster(
            "the data of the accounts" + item.name + " could not be loaded",
            5000
          );
        }

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
        let k = [];

        for (let i = 0; i < calendars.length; i++) {
          const objects = await client.fetchCalendarObjects({
            calendar: calendars[i],
          });
          //cache data
          let data_to_store = {
            displayName: calendars[i].displayName,
            syncToken: calendars[i].syncToken,
            ctag: calendars[i].ctag,
            url: calendars[i].url,
            objects: objects,
          };

          k.push(data_to_store);

          localforage
            .setItem(item.id, k)
            .then(function () {
              console.log("data cached");
            })
            .catch(function (err) {
              console.log(err);
            });

          side_toaster("Data synchronized", 3000);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  });
};

export let sync_caldav = function (callback) {
  accounts.forEach(function (item) {
    const client = "";
    if (item.type == "oauth") {
      client = new DAVClient({
        serverUrl: item.server_url,
        credentials: {
          tokenUrl: "https://oauth2.googleapis.com/token",
          refreshToken: item.tokens.refresh_token,
          clientId: google_cred.clientId,
          clientSecret: google_cred.clientSecret,
          authorizationCode: item.authorizationCode,
          redirectUrl: "https://greg.strukturart.com/redirect.html",
        },
        authMethod: "Oauth",
        defaultAccountType: "caldav",
      });
    } else {
      client = new DAVClient({
        serverUrl: item.server_url,
        credentials: {
          username: item.user,
          password: item.password,
        },
        authMethod: "Basic",
        defaultAccountType: "caldav",
      });
    }

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
        //set calendars names
        const calendars = await client.fetchCalendars();
        for (let i = 0; i < calendars.length; i++) {
          const objects = await client.fetchCalendarObjects({
            calendar: calendars[i],
          });
          calendar_names.push({
            name: calendars[i].displayName,
            url: calendars[i].url,
            id: item.id,
          });
        }

        const value = await localforage.getItem(item.id);
        if (value == null) return false;

        for (let i = 0; i < value.length; i++) {
          let s = {
            oldCalendars: [
              {
                url: value[i].url,
                ctag: value[i].ctag,
                syncToken: value[i].syncToken,
                displayName: value[i].displayName,
                objects: value[i].objects,
              },
            ],
            detailedResult: true,
            headers: client.authHeaders,
          };
          try {
            const ma = await client.syncCalendars(s);
            callback(ma);
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

let create_caldav = function (
  event_data,
  calendar_id,
  calendar_name,
  event,
  event_id
) {
  popup("Please wait...", "show");

  accounts.forEach(function (p) {
    if (p.id == calendar_id) {
      const client = "";
      if (p.type == "oauth") {
        client = new DAVClient({
          serverUrl: p.server_url,
          credentials: {
            tokenUrl: "https://oauth2.googleapis.com/token",
            refreshToken: p.tokens.refresh_token,
            clientId: google_cred.clientId,
            clientSecret: google_cred.clientSecret,
            authorizationCode: p.authorizationCode,
            redirectUrl: "https://greg.strukturart.com/redirect.html",
          },
          authMethod: "Oauth",
          defaultAccountType: "caldav",
        });
      } else {
        client = new DAVClient({
          serverUrl: p.server_url,
          credentials: {
            username: p.user,
            password: p.password,
          },
          authMethod: "Basic",
          defaultAccountType: "caldav",
        });
      }
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
            console.log(calendars[i].displayName, calendars[i].url);
            if (calendars[i].displayName == calendar_name) {
              const result = await client.createCalendarObject({
                calendar: calendars[i],
                filename: event_id + ".ics",
                iCalString: event_data,
                headers: {
                  "content-type": "text/calendar; charset=utf-8",
                  authorization: client.authHeaders.authorization,
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
                  event.url = result.url;
                  event.isCaldav = true;
                  event.id = calendar_id;
                } catch (e) {
                  console.log(e);
                }

                parse_ics(
                  event_data,
                  "",
                  false,
                  event.etag,
                  event.url,
                  event.id,
                  true
                );

                popup("", "close");
                cache_caldav();

                m.route.set("/page_calendar");
              } else {
                popup(
                  "There was a problem saving, please try again later.",
                  "show"
                );
                setTimeout(function () {
                  popup("", "close");
                  sort_array(events, "dateStartUnix", "date");
                }, 5000);
              }
            }
          }
        } catch (e) {}
      })();
    }
  });
};

let delete_caldav = function (etag, url, account_id, uid) {
  popup("Please wait...", "show");

  accounts.forEach(function (p) {
    if (p.id == account_id) {
      const client = "";
      if (p.type == "oauth") {
        client = new DAVClient({
          serverUrl: p.server_url,
          credentials: {
            tokenUrl: "https://oauth2.googleapis.com/token",
            refreshToken: p.tokens.refresh_token,
            clientId: google_cred.clientId,
            clientSecret: google_cred.clientSecret,
            authorizationCode: p.authorizationCode,
            redirectUrl: "https://greg.strukturart.com/redirect.html",
          },
          authMethod: "Oauth",
          defaultAccountType: "caldav",
        });
      } else {
        client = new DAVClient({
          serverUrl: item.server_url,
          credentials: {
            username: item.user,
            password: item.password,
          },
          authMethod: "Basic",
          defaultAccountType: "caldav",
        });
      }
      (async () => {
        try {
          await client.login();
        } catch (e) {
          console.log(e);
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
            popup("", "close");
            let temp = events;
            events = "";

            events = temp.filter((person) => person.UID != uid);
            remove_alarm(uid);
            cache_caldav();

            clear_form();

            m.route.set("/page_calendar");
          } else {
            popup(
              "There was a problem deleting, please try again later.",
              "show"
            );
            setTimeout(function () {
              popup("", "close");
            }, 5000);
          }
        } catch (e) {
          console.log(e);

          popup(
            "There was a problem deleting, please try again later.",
            "show"
          );
          setTimeout(function () {
            popup("", "close");
            sort_array(events, "dateStartUnix", "date");
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
      const client = "";
      if (p.type == "oauth") {
        client = new DAVClient({
          serverUrl: p.server_url,
          credentials: {
            tokenUrl: "https://oauth2.googleapis.com/token",
            refreshToken: p.tokens.refresh_token,
            clientId: google_cred.clientId,
            clientSecret: google_cred.clientSecret,
            authorizationCode: p.authorizationCode,
            redirectUrl: "https://greg.strukturart.com/redirect.html",
          },
          authMethod: "Oauth",
          defaultAccountType: "caldav",
        });
      } else {
        client = new DAVClient({
          serverUrl: p.server_url,
          credentials: {
            username: p.user,
            password: p.password,
          },
          authMethod: "Basic",
          defaultAccountType: "caldav",
        });
      }
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
            popup("", "close");
            m.route.set("/page_calendar");
            cache_caldav();
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

let load_cached_caldav = function () {
  accounts.forEach(function (item) {
    try {
      localforage
        .getItem(item.id)
        .then(function (w) {
          //when never cached
          //load content
          if (w == null) {
            load_caldav();
            return false;
          }
          w.forEach((b) => {
            b.objects.forEach((m) => {
              parse_ics(m.data, "", false, m.etag, m.url, item.id, true);
            });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    } catch (e) {}
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
};

setTimeout(() => {
  event_slider(document.activeElement.getAttribute("data-date"));

  document.activeElement.hasAttribute("data-date")
    ? (status.selected_day = document.activeElement.getAttribute("data-date"))
    : "";
  jump_to_today();
  sort_array(events, "dateStart", "date");
}, 1000);

export let sync_caldav_callback = function (o) {
  if (o.updated.length > 0) {
    let without_cached = events.filter((events) => events.isCaldav == false);
    events = without_cached;
    load_caldav();
  }
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
    load_cached_caldav();
    sync_caldav(sync_caldav_callback);
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

//load event templates
localforage
  .getItem("event_templates")
  .then(function (value) {
    if (value == null) {
      event_templates = [];
      return false;
    }
    event_templates = value;
  })
  .catch(function (err) {
    console.log(err);
  });

let store_event_as_template = function (title, description, location) {
  let m = {
    id: uid(32),
    title: title,
    description: description,
    location: location,
  };
  event_templates.push(m);

  localforage
    .setItem("event_templates", event_templates)
    .then(function (value) {
      side_toaster("template saved", 2000);
      m.route.set("/page_calendar");
    })
    .catch(function (err) {
      console.log(err);
    });
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

export let settings = {
  default_notification: "none",
  ads: "",
  timezone: moment.tz.guess(),
  dateformat: "YYYY-MM-DD",
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

let load_ads = function () {
  var js = document.createElement("script");
  js.type = "text/javascript";
  js.src = "assets/js/kaiads.v5.min.js";

  js.onload = function () {
    getKaiAd({
      publisher: "4408b6fa-4e1d-438f-af4d-f3be2fa97208",
      app: "greg",
      slot: "greg",
      test: 0,
      timeout: 10000,
      h: 100,
      w: 240,
      container: document.getElementById("KaiOsAds-Wrapper"),
      onerror: (err) => console.error("Error:", err),
      onready: (ad) => {
        // user clicked the ad
        ad.on("click", () => console.log("click event"));

        // user closed the ad (currently only with fullscreen)
        ad.on("close", () => console.log("close event"));

        // the ad succesfully displayed
        ad.on("display", () => console.log("display event"));

        // Ad is ready to be displayed
        // calling 'display' will display the ad
        ad.call("display", {
          navClass: "item",
          //tabIndex: 0,
          //display: "block",
        });
      },
    });
  };
  document.head.appendChild(js);
};

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

let find_closest_date = function () {
  let search = dayjs(status.selected_day).unix();

  if (events.length == 0) {
    document.getElementById("events-wrapper").innerHTML =
      "you haven't made any calendar entries yet";
    return false;
  }
  let t = 0;

  let f = function () {
    document
      .querySelectorAll('div#events-wrapper article[data-id="' + t + '"]')[0]
      .focus();
    const rect = document.activeElement.getBoundingClientRect();
    const elY =
      rect.top - document.body.getBoundingClientRect().top + rect.height / 2;

    document.activeElement.parentNode.scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: "smooth",
    });
  };
  //smaller or first
  let gg = function () {
    try {
      let m = events.findIndex((event) => dayjs(event.DTSTAMP).unix() < search);
      t = events[m].UID;
      console.log(m);

      f();
    } catch (e) {
      t = events[0].UID;
      f();
    }
  };

  //equal
  try {
    let m = events.findIndex(
      (event) => dayjs(event.dateStart).unix() === search
    );
    t = events[m].UID;
    console.log(m);
    f();
  } catch (e) {
    gg();
  }
};

// check if has event
let event_check = function (date) {
  let feedback = {
    event: false,
    count: 0,
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
        let m = events.filter(
          (event) => new Date(event.dateStart).getTime() == c
        );
        feedback.count = m.length;
        return feedback;
      }

      if (d === "none" || d === "" || d === undefined || d === "DAILY") {
        if (a === c || (a <= c && b >= c)) {
          feedback.event = true;

          if (events[t].allDay && events[t].dateEnd == date) {
            feedback.event = false;
          }

          if (events[t].time_end == "00:00:00" && events[t].allDay) {
            feedback.event = false;
          }

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

      if (typeof e !== "undefined" && e !== undefined && e != null) {
        //recurrences

        if (events[t].rrule_json != null) {
          if (events[t].rrule_json.until == null) {
            b = new Date("3000-01-01").getTime();
          }
        }

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

          if (d == "BIWEEKLY") {
            if (Math.floor((c - a) / (24 * 60 * 60 * 1000)) % 14 == 0) {
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

    if (d === "none" || d === "" || d === undefined || d === null) {
      if (a === c || (a <= c && b >= c)) {
        slider.push(events[i]);
        k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
      }
    } else {
      //workaround if enddate is not set
      //AKA infinity

      if (events[i].rrule_json != null) {
        if (events[i].rrule_json.until == null) {
          b = new Date("3000-01-01").getTime();
        }
      }

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

        //BIWEEK
        if (d == "BIWEEKLY") {
          if (Math.floor((c - a) / (24 * 60 * 60 * 1000)) % 14 == 0) {
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

  if (slider.length != "") {
    slider.forEach(function (item) {
      let l = "";
      if (!item.allDay) {
        l = moment.unix(item.dateStartUnix).format("HH:mm");
      }

      document
        .querySelector("div#event-slider")
        .insertAdjacentHTML(
          "beforeend",
          "<article><div class='width-100'>" +
            item.SUMMARY +
            "</div><div class='width-100'>" +
            l +
            "</div></article>"
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

  if (
    document.querySelectorAll("div.indicator").length <= 1 ||
    document.querySelectorAll("div.indicator").length == undefined
  ) {
    document.getElementById("event-slider-indicator").style.opacity = 0;
  } else {
    document.getElementById("event-slider-indicator").style.opacity = 1;
  }
};

////
// JUMP TO TODAY
////

let jump_to_today = function () {
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  showCalendar(currentMonth, currentYear);
  setTimeout(() => {
    status.selected_day = document.activeElement.getAttribute("data-date");
    event_slider(status.selected_day);
    console.log(status.selected_day);
  }, 1000);
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

let highlight_current_day = function () {
  setTimeout(function () {
    document
      .querySelectorAll("div#calendar div.calendar-head div")
      .forEach(function (e) {
        e.classList.remove("active");
      });

    let s = document.activeElement.getAttribute("data-day");

    document
      .querySelectorAll("div#calendar div.calendar-head div")
      [s].classList.add("active");
  }, 500);
};

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

        const d = new Date(p);
        cell.setAttribute("data-day", d.getDay());

        moon.classList.add("moon-phase-" + getMoonPhase(year, month, date));
        cell.appendChild(moon);

        cell.setAttribute("data-date", p);

        cell.setAttribute("data-index", new Date(p).toISOString());

        // check if has event
        if (events.length > 0) {
          if (event_check(p).event == true) {
            cell.classList.add("event");
            if (event_check(p).count > 1) cell.classList.add("multievent");
          }

          if (rrule_check(p).rrule == true) {
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
    highlight_current_day();
  }

  document.querySelectorAll(".item")[0].focus();
  status.selected_day = document.activeElement.getAttribute("data-date");

  // highlight current day
  if (today.getMonth() == month && today.getFullYear() == year) {
    highlight_current_day();
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

let focus_after_selection = function () {
  if (document.querySelectorAll(".select-box") == null) return false;
  document.querySelectorAll(".select-box").forEach(function (e) {
    e.addEventListener("blur", function (k) {
      setTimeout(function () {
        e.parentElement.focus();
      }, 200);
    });
  });
};

/*--------------*/
//autocomplete locations
/*--------------*/

let search = function (e) {
  if (e == "close") {
    document.querySelectorAll(".search-item").forEach(function (e) {
      e.remove();
    });
    document.querySelectorAll(".item").forEach(function (e, index) {
      e.tabIndex = index;
    });
    return false;
  }

  if (e == "click") {
    document.getElementById("event-location").value =
      document.activeElement.innerText;

    document.getElementById("event-location").focus();
    document.querySelectorAll(".search-item").forEach(function (e) {
      e.remove();
    });

    document.querySelectorAll(".item").forEach(function (e, index) {
      e.tabIndex = index;
    });
  }
  let myList = document.getElementById("search-result");
  document.querySelectorAll(".search-item").forEach(function (e) {
    e.remove();
  });

  const matches = events.filter(
    (val) => val.LOCATION.toLowerCase().indexOf(e.target.value) > -1
  );

  if (matches.length === 0 || e.target.value == "") {
    document.querySelectorAll(".search-item").forEach(function (e) {
      e.remove();
    });
    return;
  }
  matches.forEach((val, i) => {
    if (i > 2) return;

    myList.insertAdjacentHTML(
      "afterend",
      "<div class='item search-item'>" + val.LOCATION + "</div>"
    );

    document.querySelectorAll(".item").forEach(function (e, index) {
      e.tabIndex = index;
    });
  });
};
/*
///////////////////
//VIEWS
/////////////////
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

        m("img", {
          id: "icon-loading",
          src: "./assets/image/E252.svg",
          alt: "loading",
        }),
        m(
          "div",
          {
            id: "time",
            oncreate: function (e) {
              document.getElementById("time").innerText = get_time();
            },
          },
          "time is relative"
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
          id: "event-slider-indicator",
          class: "flex width-100 justify-content-spacearound",
        },
        [m("div", { class: "flex justify-content-spacearound" })]
      ),
      m(
        "div",
        {
          id: "event-slider",
          class: "flex",
        },
        [m("div", { id: "slider-inner", class: "flex" })]
      ),
    ]);
  },
  onbeforeremove: () => {
    status.selected_day = document.activeElement.getAttribute("data-date");
  },
  oncreate: ({ dom }) =>
    setTimeout(function () {
      dom.focus();
      if (document.activeElement.hasAttribute("data-date"))
        status.selected_day = document.activeElement.getAttribute("data-date");

      bottom_bar(
        "<img src='assets/image/add.svg'>",
        "<img src='assets/image/list.svg'>",
        "<img src='assets/image/option.svg'>"
      );
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
  view: function () {
    return m(
      "div",
      {
        id: "events-wrapper",
        oninit: function () {},

        oncreate: function () {
          find_closest_date();

          bottom_bar(
            "<img src='assets/image/pencil.svg'>",
            "<img src='assets/image/calendar.svg'>",
            ""
          );
        },
      },
      [
        events.map(function (item, index) {
          let de = "";
          if (item.dateStart != item.dateEnd && !item.allDay) {
            de =
              dayjs(item.dateStart).format(settings.dateformat) +
              " - " +
              dayjs(item.dateEnd).format(settings.dateformat);
          } else {
            de = dayjs(item.dateStart).format(settings.dateformat);
          }
          u = item.isSubscription ? "subscription" : "";
          return m(
            "article",
            {
              class: "item events " + u,
              tabindex: index,
              "data-id": item.UID,
            },
            [
              m("div", { class: "icons-bar" }, [
                m("div", { class: "date" }, de),
                m(
                  "div",
                  { class: "time" },
                  dayjs.unix(item.dateStartUnix).format("HH:mm")
                ),
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

export let page_options = {
  view: function () {
    return m("div", { id: "options" }, [
      m("h2", { class: "item", tabIndex: 0 }, "Key assignment"),

      m(
        "ul",
        {
          id: "keys",
          class: "item",
          tabindex: "1",
          oncreate: function ({ dom }) {
            bottom_bar("", "", "");

            document.querySelectorAll(".select-box").forEach(function (e) {
              e.addEventListener("keypress", function () {
                setTimeout(function () {
                  e.parentElement.focus();
                }, 200);
              });
            });

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
            [m("span", "SoftLeft longpress")],
            "create event from template"
          ),
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
      m("h2", { class: "item", tabindex: "2" }, "settings"),
      m("div", { class: "text-center" }, "Timezone: " + settings.timezone),

      m(
        "div",
        {
          class: "item input-parent",
          id: "event-date-format-box",
          tabindex: "3",
        },
        [
          m("label", { for: "event-date-format" }, "dateformat"),
          m(
            "select",
            {
              id: "event-date-format",
              class: "select-box",
              onchange: function () {
                store_settings();
              },
              oncreate: function () {
                load_settings();
                setTimeout(function () {
                  focus_after_selection();
                  if (settings.dateformat == "") {
                    document.querySelector("#event-date-format").value =
                      "YY-mm-dd";
                  } else {
                    document.querySelector("#event-date-format").value =
                      settings.dateformat;
                  }
                }, 1000);
              },
            },
            [
              m("option", { value: "YY-MM-DD" }, "YYYY-MM-DD"),
              m("option", { value: "DD.MM.YYYY" }, "DD.MM.YYYY"),
            ]
          ),
        ]
      ),

      m(
        "div",
        {
          class: "item input-parent",
          id: "event-notification-time-wrapper",
          tabindex: "4",
        },
        [
          m("label", { for: "default-notification" }, "default Notification"),
          m(
            "select",
            {
              id: "default-notification-time",
              class: "select-box",
              onchange: function () {
                store_settings();
              },
              oncreate: function () {
                load_settings();
                setTimeout(function () {
                  focus_after_selection();
                  if (settings.default_notification == "") {
                    document.querySelector("#default-notification-time").value =
                      "none";
                  } else {
                    document.querySelector("#default-notification-time").value =
                      settings.default_notification;
                  }
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
          tabindex: "5",
          oncreate: function () {
            file_list = [];
            list_files("ics", cb);
          },
          onclick: function () {
            m.route.set("/page_list_files");
          },
        },
        "Import events"
      ),
      m("h2", "Subscriptions"),

      m(
        "button",
        {
          class: "item",
          tabindex: "6",
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

            tabindex: index + 6,
            onblur: function () {
              bottom_bar("", "", "");
            },
            onfocus: function () {},
          },
          item.name
        );
      }),

      m("h2", "Accounts"),

      m(
        "button",
        {
          class: "item  google-button caldav-button",
          tabindex: subscriptions.length + 7,
          onclick: function () {
            m.route.set("/page_accounts");
          },
        },

        [
          m(
            "div",
            {
              class: "flex  align-item-center justify-content-spacebetween ",
            },
            [
              m("img", {
                src: "assets/image/caldav.png",
              }),
              m("span", "CalDAV Account"),
            ]
          ),
        ]
      ),

      m(
        "button",
        {
          class: "item google-button",
          tabindex: subscriptions.length + 8,
          onclick: function () {
            oauth_callback = setInterval(function () {
              if (localStorage.getItem("oauth_callback") == "true") {
                m.route.set("/page_calendar");
                //stop interval
                clearInterval(oauth_callback);
                //load accounts
                setTimeout(function () {
                  accounts = [];
                  localforage
                    .getItem("accounts")
                    .then(function (value) {
                      if (value == null) {
                        accounts = [];
                        return false;
                      }
                      accounts = value;
                      side_toaster(
                        "the calendar events will be loaded the next time the app is restarted",
                        30000
                      );
                    })
                    .catch(function (err) {
                      console.log(err);
                    });
                }, 5000);
              }
            }, 1000);
            window.open(google_oauth_url);
          },
        },
        [
          m(
            "div",
            {
              class: "flex justify-content-spacebetween align-item-center ",
            },
            [
              m("img", {
                src: "assets/image/google_button.png",
              }),
              m("span", "Sign in with Google"),
            ]
          ),
        ]
      ),
      m("div", { id: "subscription-text" }, "Your accounts"),

      accounts.map(function (item, index) {
        return m(
          "button",
          {
            class: "item subscriptions-item",
            "data-id": item.id,
            "data-account-type": item.type,
            "data-action": "edit-delete-account",

            tabindex: index + subscriptions.length + 8,
            onblur: function () {
              bottom_bar("", "", "");
            },
            onfocus: function () {
              if (item.type == "oauth") {
                bottom_bar("<img src='assets/image/delete.svg'>", "", "");
              } else {
                bottom_bar(
                  "<img src='assets/image/delete.svg'>",
                  "",
                  "<img src='assets/image/pencil.svg'>"
                );
              }
            },
          },
          item.name
        );
      }),
      m("h2", { class: "ads-title" }, "Ads"),

      m("div", {
        id: "KaiOsAds-Wrapper",
        tabindex: subscriptions.length + accounts.length + 8,
        class: "flex justify-content-spacearound",
        oninit: function () {
          if (settings.ads) {
            load_ads();
          } else {
            document.querySelector("h2.ads-title").remove();
          }
        },
        oncreate: function () {},
        onfocus: function () {
          bottom_bar("", "<img src='assets/image/eye.svg'>", "");
        },
        onblur: function () {},
        onkeypress: function (event) {
          bottom_bar("", "", "");
          if (event.keyCode == 13) {
          }
        },
      }),
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
              bottom_bar("<img src='assets/image/E1D8.svg'>", "", "");
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
          class: "item save-button",
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

let update_account;
var page_edit_account = {
  view: function () {
    return m("div", { id: "account-form" }, [
      m(
        "div",
        {
          class: "item input-parent",
          tabindex: "0",

          oninit: function () {},

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
            value: update_account.name,
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
            value: update_account.server_url,

            onfocus: function () {
              bottom_bar("<img src='assets/image/E1D8.svg'>", "", "");
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
            value: update_account.user,

            "data-scan-action": "true",
            onfocus: function () {
              bottom_bar("<img src='assets/image/E1D8.svg'>", "", "");
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
            value: update_account.password,

            onfocus: function () {
              bottom_bar("<img src='assets/image/E1D8.svg'>", "", "");
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
          class: "item save-button",
          tabindex: "4",
          onclick: function () {
            store_account(true, status.edit_account_id);
          },
        },
        "update"
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
              bottom_bar("<img src='assets/image/E1D8.svg'>", "", "");
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
              bottom_bar("<img src='assets/image/E1D8.svg'>", "", "");
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
              bottom_bar("<img src='assets/image/E1D8.svg'>", "", "");
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
          class: "item save-button",
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

            onfocus: function () {},

            oncreate: function ({ dom }) {
              setTimeout(function () {
                dom.focus();
                bottom_bar("", "", "");
                settings.timezone = moment.tz.guess();
              }, 500);
            },
          },
          [
            m("label", { for: "event-title" }, "title"),
            m("input", {
              placeholder: "",
              type: "text",
              id: "event-title",
              oncreate: function () {
                load_settings();
                load_template_data();
              },
            }),
          ]
        ),

        m("div", { class: "item input-parent", tabindex: "1" }, [
          m("label", { for: "event-location" }, "Location"),
          m("input", {
            placeholder: "",
            type: "text",
            id: "event-location",
            oninput: function (m) {
              search(m);
            },
          }),
        ]),
        m("div", { id: "search-result" }),

        m(
          "div",
          {
            class: "item input-parent",
            tabindex: "2",
            onfocus: function () {
              search("close");
            },
          },
          [
            m("label", { for: "event-date" }, "Start Date"),
            m("input", {
              placeholder: settings.dateformat,
              type: "date",
              id: "event-date",
              class: "select-box",

              oncreate: function ({ dom }) {
                dom.value = status.selected_day;
              },
            }),
          ]
        ),

        m("div", { class: "item input-parent", tabindex: "3" }, [
          m("label", { for: "event-date-end" }, "End Date"),
          m("input", {
            placeholder: settings.dateformat,
            type: "date",
            id: "event-date-end",
            class: "select-box",
          }),
        ]),
        m("div", { class: "item input-parent", tabindex: "4" }, [
          m("label", { for: "event-time-start" }, "Start Time"),
          m("input", {
            placeholder: "hh:mm",
            type: "time",
            id: "event-time-start",
            class: "select-box",

            oncreate: function ({ dom }) {
              dom.value = dayjs().format("HH:mm");
            },
          }),
        ]),
        m("div", { class: "item input-parent", tabindex: "5" }, [
          m("label", { for: "event-time-end" }, "End Time"),
          m("input", {
            placeholder: "hh:mm",
            type: "time",
            id: "event-time-end",
            class: "select-box",

            oncreate: function ({ dom }) {
              dom.value = dayjs().add(1, "hour").format("HH:mm");
            },
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
                class: "select-box",
                oncreate: function () {
                  setTimeout(function () {
                    console.log(settings.default_notification);
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
                m("option", { value: "60" }, "60 minutes"),
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
            m("label", { for: "event-recur" }, "Recur"),
            m("select", { id: "event-recur", class: "select-box" }, [
              m("option", { value: "none" }, "none"),
              m("option", { value: "DAILY" }, "Daily"),
              m("option", { value: "WEEKLY" }, "Weekly"),
              m("option", { value: "BIWEEKLY" }, "Biweekly"),
              m("option", { value: "MONTHLY" }, "Monthly"),
              m("option", { value: "YEARLY" }, "Yearly"),
            ]),
          ]
        ),

        m(
          "div",
          {
            class: "item input-parent",
            id: "event-calendar-wrapper",
            tabindex: "9",
          },
          [
            m("label", { for: "notification" }, "Calendars"),
            m("select", { id: "event-calendar", class: "select-box" }, [
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
            class: "item save-button",
            oncreate: function () {
              focus_after_selection();
            },
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
            oncreate: function ({ dom }) {
              setTimeout(function () {
                dom.focus();
                bottom_bar("", "", "");
              }, 500);
            },
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
        m("div", { id: "search-result" }),

        m("div", { class: "item input-parent", tabindex: "2" }, [
          m("label", { for: "event-date" }, "Start Date"),
          m("input", {
            placeholder: settings.dateformat,
            type: "date",
            id: "event-date",
            class: "select-box",

            oncreate: function ({ dom }) {
              dom.value = update_event_date.dateStart;
            },
          }),
        ]),

        m("div", { class: "item input-parent", tabindex: "3" }, [
          m("label", { for: "event-date-end" }, "End Date"),
          m("input", {
            placeholder: settings.dateformat,
            type: "date",
            id: "event-date-end",
            class: "select-box",

            oncreate: function ({ dom }) {
              dom.value = update_event_date.dateEnd;
            },
          }),
        ]),
        m("div", { class: "item input-parent", tabindex: "4" }, [
          m("label", { for: "event-time-start" }, "Start Time"),
          m("input", {
            placeholder: "HH:mm",
            type: "time",
            id: "event-time-start",
            class: "select-box",
            value:
              update_event_date.time_start.length == 8
                ? update_event_date.time_start.slice(0, -3)
                : update_event_date.time_start,
          }),
        ]),
        m("div", { class: "item input-parent", tabindex: "5" }, [
          m("label", { for: "event-time-end" }, "End Time"),
          m("input", {
            placeholder: "hh:mm",
            type: "time",
            id: "event-time-end",
            class: "select-box",
            value:
              update_event_date.time_end.length == 8
                ? update_event_date.time_end.slice(0, -3)
                : update_event_date.time_end,
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
                class: "select-box",
              },
              [
                m("option", { value: "none" }, "none"),
                m("option", { value: "5" }, "5 minutes"),
                m("option", { value: "10" }, "10 minutes"),
                m("option", { value: "30" }, "30 minutes"),
                m("option", { value: "60" }, "60 minutes"),
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
            m("label", { for: "event-recur" }, "Recur"),

            m(
              "select",
              {
                id: "event-recur",
                value: update_event_date.rrule_,
                class: "select-box",
                oncreate: function () {
                  console.log("rrule ui get" + update_event_date);
                },
              },
              [
                m("option", { value: "none" }, "none"),
                m("option", { value: "DAILY" }, "Daily"),
                m("option", { value: "WEEKLY" }, "Weekly"),
                m("option", { value: "BIWEEKLY" }, "Biweekly"),
                m("option", { value: "MONTHLY" }, "Monthly"),
                m("option", { value: "YEARLY" }, "Yearly"),
              ]
            ),
          ]
        ),

        m(
          "button",
          {
            tabindex: "9",
            id: "delete-event",
            class: "item",
            onclick: function () {
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
            class: "item save-button",
            oncreate: () => {
              focus_after_selection();
            },
            onclick: function () {
              update_event(
                update_event_date.etag,
                update_event_date.url,
                update_event_date.id,
                update_event_date.id,
                update_event_date.UID
              );
            },
          },
          "update"
        ),

        m(
          "button",
          {
            tabindex: "11",
            id: "save-event-as-template",
            class: "item save-template-button",
            oncreate: () => {
              focus_after_selection();
            },
            onclick: function () {
              store_event_as_template(
                document.getElementById("event-title").value,
                document.getElementById("event-description").value,
                document.getElementById("event-location").value
              );
            },
          },
          "save as template"
        ),
      ]
    );
  },
};
let file_list = [];

let cb = function (result) {
  file_list.push(result);
};

let callback_getfile = function (result) {
  try {
    parse_ics(result, "", false, "", "", "local-id", false);

    let only_local_events = events.filter((events) => events.id == "local-id");

    localforage
      .setItem("events", only_local_events)
      .then(function () {
        export_ical("greg.ics", only_local_events);
        side_toaster("<img src='assets/image/E25C.svg'", 2000);
        setTimeout(function () {
          m.route.set("/page_calendar");
        }, 200);
      })
      .catch(function (err) {});
  } catch (e) {
    alert(
      "event could not be imported because the file content is invalid" + e
    );
  }
};

var page_list_files = {
  view: function () {
    return m(
      "div",
      {
        id: "options",
        oninit: function () {
          setTimeout(function () {
            if (!document.body.classList.contains("item")) {
            }
          }, 1000);
        },
      },
      [
        file_list.map(function (e, index) {
          let fn = e.split("/");
          fn = fn[fn.length - 1];

          // if (fn == "greg.ics") return false;
          return m(
            "button",
            {
              class: "item",
              oncreate: function ({ dom }) {
                if (index == 0) {
                  dom.focus();
                }
              },
              tabIndex: index,
              onclick: function () {
                get_file(e, callback_getfile);
              },
            },
            fn
          );
        }),
      ]
    );
  },
};

let selected_template;
var page_event_templates = {
  view: function () {
    return m(
      "div",
      {
        id: "options",
        oncreate: function () {
          bottom_bar(
            "<img src='assets/image/delete.svg'>",
            "<img src='assets/image/add.svg'>",
            ""
          );
        },
      },
      [
        m("h2", { class: "text-center" }, "Templates"),
        event_templates.map(function (item, index) {
          return m(
            "button",
            {
              class: "item",
              onclick: function () {
                selected_template = item.id;
                m.route.set("/page_add_event");
              },
              onfocus: function () {},
              oncreate: function ({ dom }) {
                if (index == 0) {
                  dom.focus();
                }
              },
              tabIndex: index,
              "data-id": item.id,
            },
            item.title
          );
        }),
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
  "/page_edit_account": page_edit_account,
  "/page_event_templates": page_event_templates,
  "/page_list_files": page_list_files,
});
m.route.prefix = "#";

let store_settings = function () {
  settings.default_notification = document.getElementById(
    "default-notification-time"
  ).value;

  settings.dateformat = document.getElementById("event-date-format").value;

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

let store_account = function (edit, id) {
  if (
    validate(document.getElementById("account-url").value) &&
    document.getElementById("account-name").value != "" &&
    document.getElementById("account-username").value != "" &&
    document.getElementById("account-password").value != ""
  ) {
    if (edit) {
      const newArr = accounts.filter((object) => {
        return object.id !== id;
      });

      accounts = newArr;

      accounts.push({
        server_url: document.getElementById("account-url").value,
        user: document.getElementById("account-username").value,
        password: document.getElementById("account-password").value,
        name: document.getElementById("account-name").value,
        id: id,
      });
    } else {
      accounts.push({
        server_url: document.getElementById("account-url").value,
        user: document.getElementById("account-username").value,
        password: document.getElementById("account-password").value,
        name: document.getElementById("account-name").value,
        id: uid(32),
      });
    }

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
      side_toaster("account deleted", 2000);
      document.activeElement.remove();
      bottom_bar("", "", "");
    })
    .catch(function (err) {
      // This code runs if there were any errors
      toaster(err, 2000);
    });

  localforage
    .removeItem(document.activeElement.getAttribute("data-id"))
    .then(function () {})
    .catch(function (err) {
      console.log(err);
    });
};

//load indexedDB

localforage
  .getItem("events")
  .then(function (value) {
    if (value != null) {
      events = value;
      sort_array(events, "dateStartUnix", "date");
    }
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
//delete template data
////////////////
let delete_template = function (id) {
  event_templates = event_templates.filter((d) => d.id != id);

  localforage
    .setItem("event_templates", event_templates)
    .then(function (value) {
      side_toaster("template deleted", 2000);
      m.route.set("/page_calendar");
    })
    .catch(function (err) {
      console.log(err);
    });
};

/////////////////
//load template data
////////////////
let load_template_data = function () {
  event_templates.forEach(function (e) {
    if (e.id == selected_template) {
      document.getElementById("event-title").value = e.title;
      document.getElementById("event-description").value = e.description;
      document.getElementById("event-location").value = e.location;
      selected_template = "";
    }
  });
};
/////////////////
///NAVIGATION
/////////////////
let mmm = document.querySelectorAll("div#calendar div.calendar-head div");

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

  if (m.route.get() == "/page_calendar") {
    highlight_current_day();
  }

  if (
    m.route.get() == "/page_calendar" ||
    m.route.get() == "/page_options" ||
    m.route.get() == "/page_events" ||
    m.route.get() == "/page_event_templates" ||
    m.route.get() == "/page_list_files"
  ) {
    let b = document.activeElement.parentNode.parentNode;
    items = b.querySelectorAll(".item");
  }

  if (
    m.route.get() == "/page_subscriptions" ||
    m.route.get() == "/page_accounts" ||
    m.route.get() == "/page_edit_account"
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

const bc = new BroadcastChannel("channel");

bc.onmessage = (event) => {
  console.log("hello: " + event.data);
  if (event.data == "notification") {
    new Notification("Vibration Sample", {
      body: "Buzz! Buzz!",
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag: "vibration-sample",
    });
  }
};

//
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(new URL("sw.js", import.meta.url), { type: "module" })
    .then((registration) => {
      if ("b2g.alarmManager" in navigator) {
        registration.systemMessageManager.subscribe("alarm").then(
          (rv) => {
            alert('Successfully subscribe system messages of name "alarm".');
          },
          (error) => {
            alert("Fail to subscribe system message, error: " + error);
          }
        );
      }
    });
}

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

    request.onsuccess = function () {};

    request.onerror = function () {
      console.log("An error occurred: " + this.error.name);
    };
  }

  // KaiOs  3.xx

  if ("b2g.alarmManager" in navigator) {
    options = {
      "date": data,
      "data": { "note": message_text },
      "ignoreTimezone": true,
    };

    navigator.b2g.alarmManager.add(options).then(
      (id) => alert("add id: " + id),
      (err) => alert("add err: " + err)
    );
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
  // KaiOs  3.xx

  if ("b2g.alarmManager" in navigator) {
    let request = navigator.b2g.alarmManager.getAll();

    request.onsuccess = function () {
      this.result.forEach(function (alarm) {
        console.log(JSON.stringify(alarm));

        if (alarm.data.event_id == id) {
          let req = navigator.b2g.alarmManager.remove(alarm.id);

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
    start_time = document.getElementById("event-time-start").value + ":00";
  }

  let end_time = "00:00:00";
  if (document.getElementById("event-time-end").value != "") {
    end_time = document.getElementById("event-time-end").value + ":00";
  }

  var time1Date = new Date("01/01/2000 " + start_time);
  var time2Date = new Date("01/01/2000 " + end_time);
  console.log(time2Date + ",," + time1Date);

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

  let bn = notification_time;

  let calc_notification;
  if (notification_time != "none") {
    calc_notification = new Date(convert_dt_start);
    calc_notification.setMinutes(
      calc_notification.getMinutes() - notification_time
    );

    notification_time = convert_ics_date(calc_notification.toISOString());
  }

  let allday = false;

  let a = new Date(document.getElementById("event-date").value).getTime();
  let b = new Date(document.getElementById("event-date-end").value).getTime();

  if (a != b) {
    allDay = true;
  }

  if (start_time != "" && end_time != "") {
    var time1Date = new Date(
      document.getElementById("event-date").value + " " + start_time
    );
    var time2Date = new Date(
      document.getElementById("event-date-end").value + " " + end_time
    );
    console.log(time2Date + ",," + time1Date);
    if (time2Date < time1Date) {
      toaster("The time is not correct.", 2000);
      validation = false;
    }
  }

  let rrule_convert = function (val) {
    let p = val;
    let r = "";

    if (p == "none") {
      return r;
    }
    if (p != "none") {
      r = "FREQ=" + val + ";UNTIL=" + convert_ics_date(convert_dt_end);
      return r;
    }
  };

  if (validation == false) return false;
  let event = {
    UID: uid(32),
    SUMMARY: document.getElementById("event-title").value,
    LOCATION: document.getElementById("event-location").value,
    DESCRIPTION: document.getElementById("event-description").value,
    "LAST-MODIFIED":
      ";TZID=" + settings.timezone + ":" + convert_ics_date(convert_dt_start),
    CLASS: "PRIVATE",
    DTSTAMP:
      ";TZID=" + settings.timezone + ":" + convert_ics_date(convert_dt_start),
    DTSTART:
      ";TZID=" + settings.timezone + ":" + convert_ics_date(convert_dt_start),
    DTEND:
      ";TZID=" + settings.timezone + ":" + convert_ics_date(convert_dt_end),
    RRULE:
      document.getElementById("event-recur").value == "none"
        ? ""
        : rrule_convert(document.getElementById("event-recur").value),
    rrule_:
      document.getElementById("event-recur").value == ""
        ? "none"
        : document.getElementById("event-recur").value,
    dateStart: document.getElementById("event-date").value,
    dateEnd: document.getElementById("event-date-end").value,
    time_start: document.getElementById("event-time-start").value,
    time_end: document.getElementById("event-time-end").value,
    alarm: document.getElementById("event-notification-time").value,
    alarmTrigger: notification_time,
    isSubscription: false,
    isCaldav: db_id == "local-id" ? false : true,
    ATTACH: blob,
    id: db_id,
    allDay: allday,
  };

  if (event.alarm != "none") {
    event.BEGIN = "VALARM";
    event["TRIGGER;VALUE=DATE-TIME"] = notification_time;
    event.ACTION = "AUDIO";
    event.END = "VALARM";
    add_alarm(calc_notification, event.SUMMARY, event.UID);
  }
  let dd =
    "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ZContent.net//Greg Calendar 1.0//EN\nCALSCALE:GREGORIAN\nBEGIN:VEVENT\nSUMMARY:" +
    event.SUMMARY +
    "\nUID:" +
    event.UID +
    "\nRRULE:" +
    event.RRULE +
    "\nLAST-MODIFIED" +
    event["LAST-MODIFIED"] +
    "\nDTSTART" +
    event.DTSTART +
    "\nDTEND" +
    event.DTEND +
    "\nDTSTAMP" +
    event.DTSTAMP +
    "\nLOCATION:" +
    event.LOCATION +
    "\nDESCRIPTION:" +
    event.DESCRIPTION +
    "\nEND:VEVENT\nEND:VCALENDAR";

  if (db_id == "local-id") {
    try {
      parse_ics(dd, "", false, "", "", "local-id", false, bn);
    } catch (e) {
      console.log(e);
    }

    let without_subscription = events.filter(
      (events) => events.id == "local-id"
    );

    localforage
      .setItem("events", without_subscription)
      .then(function () {
        clear_form();
        export_ical("greg.ics", without_subscription);
        side_toaster("<img src='assets/image/E25C.svg'", 2000);
        setTimeout(function () {
          m.route.set("/page_calendar");
        }, 200);
      })
      .catch(function (err) {
        console.log(err);
        side_toaster("no data to export", 2000);
      });
  } else {
    let event_data =
      "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ZContent.net//Greg Calendar 1.0//EN\nCALSCALE:GREGORIAN\nBEGIN:VEVENT\nSUMMARY:" +
      event.SUMMARY +
      "\nUID:" +
      event.UID +
      "\nSEQUENCE:0" +
      "\nRRULE: " +
      event.RRULE +
      "\nDTSTART" +
      event.DTSTART +
      "\nDTEND" +
      event.DTEND +
      "\nDTSTAMP" +
      event.DTSTAMP +
      "\nLOCATION:" +
      event.LOCATION +
      "\nDESCRIPTION:" +
      event.DESCRIPTION +
      "\nEND:VEVENT\nEND:VCALENDAR";

    if (event.RRULE == null || event.RRULE == "") {
      event_data = event_data.replace("SEQUENCE:0", "");
      event_data = event_data.replace("RRULE:null", "");
      event_data = event_data.replace("RRULE:", "");
    }
    event_data = event_data.trim();

    create_caldav(event_data, event.id, cal_name, event, event.UID);
  }
  style_calendar_cell();
};

// ////////////
// UPDATE EVENT
// /////////
let update_event = function (etag, url, id, db_id, uid) {
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
    start_time = document.getElementById("event-time-start").value + ":00";
  }

  let end_time = "00:00:00";
  if (document.getElementById("event-time-end").value != "") {
    end_time = document.getElementById("event-time-end").value + ":00";
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

    console.log("nf time" + notification_time);
  }

  let allday = false;

  let a = new Date(document.getElementById("event-date").value).getTime();
  let b = new Date(document.getElementById("event-date-end").value).getTime();

  if (a != b) {
    allDay = true;
  }

  let rrule_convert = function (val) {
    let p = val;
    let r = "";

    if (p == "none") {
      return r;
    }
    if (p != "none") {
      r = "FREQ=" + val + ";UNTIL=" + convert_ics_date(convert_dt_end);
      return r;
    }
  };

  if (validation == false) return false;
  let event = {
    UID: uid,
    SUMMARY: document.getElementById("event-title").value,
    LOCATION: document.getElementById("event-location").value,
    DESCRIPTION: document.getElementById("event-description").value,
    "LAST-MODIFIED":
      ";TZID=" + settings.timezone + ":" + convert_ics_date(convert_dt_start),
    CLASS: "PRIVATE",
    DTSTAMP:
      ";TZID=" + settings.timezone + ":" + convert_ics_date(convert_dt_start),
    DTSTART:
      ";TZID=" + settings.timezone + ":" + convert_ics_date(convert_dt_start),
    DTEND:
      ";TZID=" + settings.timezone + ":" + convert_ics_date(convert_dt_end),
    RRULE:
      document.getElementById("event-recur").value == "none"
        ? ""
        : rrule_convert(document.getElementById("event-recur").value),
    rrule_:
      document.getElementById("event-recur").value == ""
        ? "none"
        : document.getElementById("event-recur").value,
    dateStart: document.getElementById("event-date").value,
    dateEnd: document.getElementById("event-date-end").value,
    time_start: document.getElementById("event-time-start").value,
    time_end: document.getElementById("event-time-end").value,
    alarm: document.getElementById("event-notification-time").value,
    alarmTrigger: notification_time,
    isSubscription: false,
    isCaldav: db_id == "local-id" ? false : true,
    ATTACH: blob,
    id: db_id,
    allDay: allday,
  };

  if (event.alarm != "none") {
    event.BEGIN = "VALARM";
    event["TRIGGER;VALUE=DATE-TIME"] = notification_time;
    event.ACTION = "AUDIO";
    event.END = "VALARM";
    remove_alarm(event.uid);
    add_alarm(calc_notification, event.SUMMARY, event.UID);
  }
  let dd =
    "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ZContent.net//Greg Calendar 1.0//EN\nCALSCALE:GREGORIAN\nBEGIN:VEVENT\nSUMMARY:" +
    event.SUMMARY +
    "\nUID:" +
    event.UID +
    "\nRRULE:" +
    event.RRULE +
    "\nLAST-MODIFIED" +
    event["LAST-MODIFIED"] +
    "\nDTSTART" +
    event.DTSTART +
    "\nDTEND" +
    event.DTEND +
    "\nDTSTAMP" +
    event.DTSTAMP +
    "\nLOCATION:" +
    event.LOCATION +
    "\nDESCRIPTION:" +
    event.DESCRIPTION +
    "\nEND:VEVENT\nEND:VCALENDAR";

  events = events.filter((person) => person.UID != uid);
  //remove orginal event
  //to replace with new content
  try {
    parse_ics(dd, "", false, "", "", "local-id", false, event.alarm);
  } catch (e) {
    console.log(e);
  }

  if (db_id == "local-id") {
    let without_subscription = events.filter(
      (events) => events.id == "local-id"
    );

    localforage
      .setItem("events", without_subscription)
      .then(function () {
        clear_form();
        export_ical("greg.ics", without_subscription);
        side_toaster("<img src='assets/image/E25C.svg'", 2000);
        setTimeout(function () {
          m.route.set("/page_calendar");
        }, 200);
      })
      .catch(function (err) {
        console.log(err);
        side_toaster("no data to export", 2000);
      });
  } else {
    let event_data =
      "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ZContent.net//Greg Calendar 1.0//EN\nCALSCALE:GREGORIAN\nBEGIN:VEVENT\nSUMMARY:" +
      event.SUMMARY +
      "\nUID:" +
      event.UID +
      "\nSEQUENCE:0\nRRULE:" +
      event.RRULE +
      "\nDTSTART" +
      event.DTSTART +
      "\nDTEND" +
      event.DTEND +
      "\nDTSTAMP" +
      event.DTSTAMP +
      "\nLOCATION:" +
      event.LOCATION +
      "\nDESCRIPTION:" +
      event.DESCRIPTION +
      "\nEND:VEVENT\nEND:VCALENDAR";
    if (event.RRULE == null || event.RRULE == "") {
      event_data = event_data.replace("SEQUENCE:0", "");
      event_data = event_data.replace("RRULE:null", "");
      event_data = event_data.replace("RRULE:", "");
    }
    event_data = event_data.trim();
    update_caldav(etag, url, event_data, id);
  }
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
        side_toaster("no data to export", 2000);
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
  let without_subscription = events.filter(
    (events) => events.isSubscription === false
  );

  localforage
    .setItem("events", without_subscription)
    .then(function (value) {
      export_ical("greg.ics", without_subscription);
    })
    .catch(function (err) {
      side_toaster("no data to export", 2000);
    });
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

    case "SoftLeft":
    case "m":
      if (event_templates.length == 0) {
        side_toaster("no templates found", 3000);
        return false;
      } else {
        m.route.set("/page_event_templates");
      }

      break;
  }
}

let backup_events = function () {
  let only_local_events = events.filter((events) => events.id == "local-id");

  localforage
    .getItem("events")
    .then(function (value) {
      export_ical("greg.ics", only_local_events);
    })
    .catch(function (err) {
      console.log(err);
      side_toaster("no data to export", 2000);
    });
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
        m.route.get() == "/page_edit_account" ||
        m.route.get() == "/page_add_event" ||
        m.route.get() == "/page_edit_event" ||
        m.route.get() == "/page_event_templates" ||
        m.route.get() == "/page_list_files"
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
        m.route.get() == "/page_edit_account" ||
        m.route.get() == "/page_add_event" ||
        m.route.get() == "/page_edit_event" ||
        m.route.get() == "/page_event_templates" ||
        m.route.get() == "/page_list_files"
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
    case "5":
      if (m.route.get() == "/page_calendar") {
        m.route.set("/page_options");
        return true;
      }

      if (
        document.activeElement.getAttribute("data-action") ==
          "edit-delete-account" &&
        document.activeElement.getAttribute("data-account-type") != "oauth"
      ) {
        status.edit_account_id = document.activeElement.getAttribute("data-id");
        update_account = accounts.filter(function (arr) {
          return arr.id == status.edit_account_id;
        })[0];

        m.route.set("/page_edit_account");
      }

      break;

    case "SoftLeft":
    case "Control":
    case "6":
      if (m.route.get() == "/page_event_templates") {
        delete_template(document.activeElement.getAttribute("data-id"));
      }
      if (m.route.get() == "/page_events") {
        if (document.activeElement.classList.contains("subscription")) {
          toaster("a subscription cannot be edited", 2000);
          return false;
        }

        get_event_date();

        if (document.activeElement.classList.contains("events"))
          m.route.set("/page_edit_event");

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
          document.activeElement.getAttribute("data-action") ==
          "edit-delete-account"
        ) {
          delete_account();
        }
      }

      if (m.route.get() == "/page_calendar") {
        m.route.set("/page_add_event");

        return true;
      }
      break;

    case "Enter":
      if (!status.visible) return false;

      if (document.activeElement.classList.contains("input-parent")) {
        document.activeElement.children[1].focus();
        return true;
      }

      if (document.activeElement.classList.contains("search-item")) {
        search("click");
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
      if (m.route.get() == "/page_edit_event") return false;
      if (events == "") {
        side_toaster("There are no calendar entries to display", 3000);
      }

      if (events != "") {
        if (
          m.route.get() == "/page_calendar" ||
          m.route.get() == "/page_events"
        ) {
          m.route.get() == "/page_calendar"
            ? m.route.set("/page_events")
            : m.route.set("/page_calendar");
        }
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

      if (m.route.get() == "/page_event_templates") {
        m.route.set("/page_calendar");
      }

      if (
        m.route.get() == "/page_subscriptions" ||
        m.route.get() == "/page_accounts" ||
        m.route.get() == "/page_edit_account" ||
        m.route.get() == "/page_list_files"
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
  if (evt.key === "Backspace" && m.route.get() != "/page_calendar") {
    evt.preventDefault();
  }

  if (evt.key === "Backspace" && m.route.get() == "/page_calendar") {
    window.close();
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
