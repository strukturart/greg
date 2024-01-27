'use strict';

import localforage from 'localforage';
import {
  restart_background_sync,
  side_toaster,
  sort_array,
  wakeLookCPU,
  bottom_bar,
  test_is_background_sync,
  remove_sync_alarm,
  toaster,
  pushLocalNotification,
  get_contact,
  validate,
  get_file,
  list_files,
  formatDT,
  autocomplete,
} from './assets/js/helper.js';

import { getMoonPhase } from './assets/js/getMoonPhase.js';
import { fetch_ics } from './assets/js/eximport.js';
import { export_ical } from './assets/js/eximport.js';
import { parse_ics } from './assets/js/eximport.js';
import { start_scan } from './assets/js/scan.js';
import { stop_scan } from './assets/js/scan.js';
import m from 'mithril';
import { DAVClient, DAVNamespaceShort } from './assets/js/tsdav.js';
import 'url-search-params-polyfill';
import { getManifest, load_ads, manifest } from './assets/js/ads.js';
import { uid } from 'uid';
import { google_cred } from './assets/js/google_cred.js';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';

//const dayjs = require('dayjs');
dayjs.extend(dayjsPluginUTC);
const moment = require('moment-timezone');

let channel = new BroadcastChannel('sw-messages');
localforage.setDriver(localforage.INDEXEDDB);

const debug = false;
const google_oauth_url =
  'https://accounts.google.com/o/oauth2/v2/auth?client_id=762086220505-f0kij4nt279nqn21ukokm06j0jge2ngl.apps.googleusercontent.com&response_type=code&state=state_parameter_passthrough_value&scope=https://www.googleapis.com/auth/calendar&redirect_uri=https://greg.strukturart.com/redirect.html&access_type=offline&prompt=consent';

export let events = [];
export let accounts = [];
export let event_templates = [];
export let closing_prohibited = false;
export let search_history = [];
export let calendar_names;

export let background_sync_interval = 60;
let last_sync = localStorage.getItem('last_sync') || '';

let subscriptions = [];
localforage.getItem('subscriptions').then((e) => {
  if (e == null) {
  } else {
    subscriptions = e;
  }
});

//back to last view
let view_history = [];
let view_history_update = () => {
  view_history.push(m.route.get());
};
const get_last_view = () => {
  setTimeout(() => {
    m.route.set(view_history[view_history.length - 2]);
  }, 1000);
};
wakeLookCPU();

//google oAuth
const google_acc = {
  token_url: 'https://oauth2.googleapis.com/token',
  redirect_url: 'https://greg.strukturart.com/redirect.html',
};

let oauth_callback = '';

export let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export let status = {
  selected_day: dayjs().format('YYYY-MM-DD'),
  selected_day_id: '',
  visible: false,
  update_event_id: '',
  event_calendar_changed: false,
  startup: false,
  sortEvents: 'startDate',
  shortCut: false,
};

export let settings = {
  default_notification: 'none',
  ads: true,
  timezone: moment.tz.guess(),
  dateformat: 'YYYY-MM-DD',
  firstday: 'sunday',
  background_sync: 'No',
};

test_is_background_sync();

if ('b2g' in navigator) {
  try {
    navigator.serviceWorker
      .register(new URL('sw.js', import.meta.url), {
        type: 'module',
      })
      .then((registration) => {
        if (registration.waiting) {
          // There's a new service worker waiting to activate
          // You can prompt the user to reload the page to apply the update
          // For example: show a message to the user

          // Add a delay before reloading to allow the user to finish their interaction
          setTimeout(() => {
            window.location.reload(true); // Force reload from the server, skipping the cache
          }, 1000); // Adjust the delay time as needed
        } else {
          // No waiting service worker, registration was successful
        }
        registration.systemMessageManager.subscribe('alarm').then(
          (rv) => {
            console.log(
              'Successfully subscribe system messages of name "alarm".'
            );
          },
          (error) => {
            console.log('Fail to subscribe system message, error: ' + error);
          }
        );
        registration.systemMessageManager.subscribe('activity').then(
          (rv) => {},
          (error) => {}
        );
      });
  } catch (e) {
    console.log(e);
  }
} else {
  try {
    navigator.serviceWorker
      .register(new URL('sw.js', import.meta.url), {
        type: 'module',
      })
      .then((registration) => {
        if (registration.waiting) {
          setTimeout(() => {
            window.location.reload(true);
          }, 1000);
        } else {
        }
      });
  } catch (e) {
    console.error('Error during service worker registration:', e);
  }
}

//load calendar names
let calendar_not_visible = [];
async function loadCalendarNames() {
  try {
    const keys = await localforage.keys();
    //set local calendar as default
    if (keys.indexOf('calendarNames') == -1) {
      calendar_names = [
        {
          name: 'local',
          id: 'local-id',
          data: '',
          type: 'local',
          view: true,
        },
      ];
      console.log('default calendars loaded');
    } else {
      localforage.getItem('calendarNames').then((a) => {
        calendar_names = a;
        //visible or not visible
        calendar_names.forEach((e) => {
          if (e.view == false) calendar_not_visible.push(e.name);
        });
      });

      if (calendar_not_visible.includes('local')) {
      }
    }
  } catch (err) {
    alert(err);
  }
}

//load accounts data
let loadAccounts = () => {
  localforage
    .getItem('accounts')
    .then((value) => {
      accounts = value;
      loadCalendarNames();

      if (accounts != null) {
        load_cached_caldav().then(() => {
          sync_caldav(sync_caldav_callback);
        });
      }
    })
    .catch(() => {});
};

loadAccounts();

export let load_settings = function () {
  localforage
    .getItem('settings')
    .then(function (value) {
      if (value == null) return false;
      settings = value;
      localStorage.setItem('background_sync', settings.background_sync);

      if (settings.default_duration === undefined) {
        settings.default_duration = 30;
      }

      if (settings.firstday == 'sunday' || settings.firstday === undefined) {
        weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      } else {
        weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      }
      document.querySelectorAll('.calendar-head div').forEach(function (e, i) {
        e.innerText = weekday[i];
      });
    })
    .catch(function (err) {
      console.log(err);
    });
  //console.log(settings);
};

load_settings();

//style calendar cells

let style_calendar_cell = function () {
  if (events.length > 0) {
    try {
      document.querySelectorAll('div.calendar-cell').forEach(function (e) {
        let p = e.getAttribute('data-date');
        if (event_check(p).event == true) {
          e.classList.add('event');
          if (event_check(p).multidayevent == true)
            e.classList.add('multievent');
        } else {
          if (e.classList.contains('event')) e.classList.remove('event');
        }

        if (rrule_check(p).rrule == true) {
          e.classList.add('rrule');

          if (rrule_check(p).count > 1) e.classList.add('multievent');
        }
      });
    } catch (e) {}
  }
};

//login handler
const clientInstances = {};
const isLoggedInMap = {};

async function getClientInstance(item) {
  try {
    if (!clientInstances[item.id]) {
      if (item.type === 'oauth') {
        clientInstances[item.id] = new DAVClient({
          serverUrl: item.server_url,
          credentials: {
            tokenUrl: google_acc.token_url,
            refreshToken: item.tokens.refresh_token,
            clientId: google_cred.clientId,
            clientSecret: google_cred.clientSecret,
            authorizationCode: item.authorizationCode,
            redirectUrl: google_acc.redirect_url,
          },
          authMethod: 'Oauth',
          defaultAccountType: 'caldav',
        });
      } else {
        clientInstances[item.id] = new DAVClient({
          serverUrl: item.server_url,
          credentials: {
            username: item.user,
            password: item.password,
          },
          authMethod: 'Basic',
          defaultAccountType: 'caldav',
        });
      }
    }
    return clientInstances[item.id];
  } catch (e) {
    console.log(e);
  }
}

///load events

async function load_caldav(callback = false) {
  closing_prohibited = true;
  // Clear events
  events = events.filter((e) => !e.isCaldav);

  // Load data from every account
  for (const item of accounts) {
    const client = await getClientInstance(item);

    try {
      if (!isLoggedInMap[item.id]) {
        try {
          await client.login();
          isLoggedInMap[item.id] = true;
        } catch (loginError) {
          alert(loginError);
          isLoggedInMap[item.id] = false; // Set flag to indicate login failure
          continue; // Skip to the next account in case of login failure
        }
      } else {
        console.log('login in');
      }

      if (m.route.get() === '/page_calendar') {
        document.getElementById('icon-loading').style.visibility = 'visible';
      }
      let calendars;
      try {
        calendars = await client.fetchCalendars();
      } catch (fetchCalendarsError) {
        // Handle the error (e.g., show a user-friendly message)
        continue; // Skip to the next account in case of fetch failure
      }

      const dataToCache = [];

      for (const calendar of calendars) {
        const objects = await client.fetchCalendarObjects({ calendar });
        const dataToStore = {
          displayName: calendar.displayName,
          syncToken: calendar.syncToken,
          ctag: calendar.ctag,
          url: calendar.url,
          objects: objects,
        };

        dataToCache.push(dataToStore);

        try {
          await localforage.setItem(item.id, dataToCache);
          console.log('Data cached');
        } catch (err) {
          console.log(err);
          closing_prohibited = false;
        }

        // Parse data

        for (const obj of objects) {
          if (
            'serviceWorker' in navigator &&
            navigator.serviceWorker.controller
          ) {
            navigator.serviceWorker.controller.postMessage({
              type: 'parse',
              t: obj,
              e: item.id,
            });
          }
        }
      }

      if (m.route.get() === '/page_calendar') {
        document.getElementById('icon-loading').style.visibility = 'hidden';
        if (callback) side_toaster('all events reloaded', 2000);
      }
      closing_prohibited = false;
      side_toaster('Data loaded', 3000);
      //background sync close app
      if (!status.visible && settings.background_sync == 'Yes') {
        window.close();
        return;
      }
    } catch (e) {
      if (m.route.get() === '/page_calendar') {
        closing_prohibited = false;
        document.getElementById('icon-loading').style.visibility = 'hidden';
      }
    }
  }
}

let cache_caldav = async function () {
  closing_prohibited = true;

  // Load data from every account
  for (const item of accounts) {
    const client = await getClientInstance(item);
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
      }

      localforage
        .setItem(item.id, k)
        .then(function () {
          console.log('data cached');
          closing_prohibited = false;
        })
        .catch(function (err) {
          console.log(err);
          closing_prohibited = false;
        });
      closing_prohibited = false;

      side_toaster('Data synchronized', 3000);
    } catch (e) {
      console.log(e);
      closing_prohibited = false;
    }
  }
};

//default calendar
let cn = [
  {
    name: 'local',
    id: 'local-id',
    data: '',
    type: 'local',
    view: true,
  },
];

//check if has new content
//update calendar names

export let sync_caldav = async function (callback) {
  localStorage.setItem(
    'last_sync',
    dayjs().format(settings.dateformat + ' hh:mm')
  );

  for (const item of accounts) {
    const client = await getClientInstance(item);

    try {
      if (!isLoggedInMap[item.id]) {
        await client.login();
        isLoggedInMap[item.id] = true;
      }

      const calendars = await client.fetchCalendars();

      for (let i = 0; i < calendars.length; i++) {
        const objects = await client.fetchCalendarObjects({
          calendar: calendars[i],
        });
        cn.push({
          name: calendars[i].displayName,
          url: calendars[i].url,
          id: item.id,
          view: true,
        });
      }

      const value = await localforage.getItem(item.id);
      if (value == null) continue;

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
          if (ma.updated.length && ma.updated.length > 0) {
            callback();
            break;
          } else {
            if (!status.visible) window.close();
          }
        } catch (e) {
          if (!navigator.onLine)
            pushLocalNotification('greg', 'device offline');
        }
      }
    } catch (err) {
      if (!navigator.onLine) pushLocalNotification('greg', 'device offline');
    }
  }

  if (JSON.stringify(cn) != JSON.stringify(calendar_names)) {
    //update new calendars with old calendar view attribut
    try {
      cn.forEach((e) => {
        let matchingCalendar;
        if (Array.isArray(calendar_names)) {
          matchingCalendar = calendar_names.find((a) => a.name === e.name);

          // Rest of your code using matchingCalendar
        } else {
          console.error('calendar_names is not an array or is undefined');
          // Handle the case where calendar_names is not an array or is undefined
        }

        if (matchingCalendar) {
          e.view = matchingCalendar.view;
        }
      });
    } catch (e) {
      console.log(e);
    }

    localforage.setItem('calendarNames', cn).then(() => {
      loadCalendarNames();
    });
  }
};

//load cached

const load_cached_caldav = async () => {
  let should_be_loaded = false;
  events = events.filter((e) => !e.isCaldav);

  if (!accounts) {
    console.log('no accounts');
    return false;
  }

  for (const item of accounts) {
    try {
      const w = await localforage.getItem(item.id);

      // Load content if never cached
      if (w === null) {
        should_be_loaded = true;
      }

      for (const b of w) {
        for (const m of b.objects) {
          if (
            'serviceWorker' in navigator &&
            navigator.serviceWorker.controller
          ) {
            try {
              navigator.serviceWorker.controller.postMessage({
                type: 'parse',
                t: m,
                e: item.id,
              });
            } catch (e) {
              console.log('send to sw');
            }
          } else {
            console.log('no sw');
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (should_be_loaded) {
    load_caldav();
    events = events.filter((e) => !e.isCaldav);
    console.log('load content');
  }
};

//create event
export let create_caldav = async function (
  event_data,
  calendar_id,
  calendar_name,
  event,
  event_id
) {
  document.querySelector('.loading-spinner').style.display = 'block';

  const matchingAccount = accounts.find((p) => p.id === calendar_id);

  if (matchingAccount) {
    const client = await getClientInstance(matchingAccount);

    try {
      if (!isLoggedInMap[matchingAccount.id]) {
        await client.login();
        isLoggedInMap[matchingAccount.id] = true;
      }

      const calendars = await client.fetchCalendars();
      const matchingCalendar = calendars.find(
        (calendar) => calendar.displayName === calendar_name
      );

      if (matchingCalendar) {
        const result = await client.createCalendarObject({
          calendar: matchingCalendar,
          filename: event_id + '.ics',
          iCalString: event_data,
          headers: client.authHeaders,
        });

        if (result.ok) {
          try {
            const [res] = await client.propfind({
              url: result.url,
              props: {
                [`${DAVNamespaceShort.DAV}:getetag`]: {},
              },
              depth: '0',
              headers: client.authHeaders,
            });

            event.etag = res.props.getetag;
            event.url = result.url;
            event.isCaldav = true;
            event.id = calendar_id;
          } catch (e) {
            console.log(e);
          }

          parse_ics(event_data, false, event.etag, event.url, event.id, true);
          document.querySelector('.loading-spinner').style.display = 'none';

          cache_caldav().then(() => {});
        } else {
          side_toaster(
            'There was a problem saving, please try again later.',
            5000
          );
          setTimeout(function () {
            try {
              sort_array(events, 'dateStartUnix', 'number');
            } catch (e) {
              console.log(e);
            }
          }, 5000);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
};

//delete event
export let delete_caldav = async function (etag, url, account_id, uid) {
  document.querySelector('.loading-spinner').style.display = 'block';

  const matchingAccount = accounts.find((p) => p.id === account_id);

  if (matchingAccount) {
    const client = await getClientInstance(matchingAccount);

    try {
      if (!isLoggedInMap[matchingAccount.id]) {
        await client.login();
        isLoggedInMap[matchingAccount.id] = true;
      }

      const result = await client.deleteCalendarObject({
        calendarObject: {
          url: url,
          etag: etag,
        },
        headers: client.authHeaders,
      });

      if (result.ok) {
        const index = events.findIndex((event) => event.UID === uid);
        if (index !== -1) {
          events.splice(index, 1);
          cache_caldav();

          remove_alarm(uid);
          clear_form();
          style_calendar_cell(currentYear, currentMonth);
          document.querySelector('.loading-spinner').style.display = 'none';

          if (status.shortCut == false) {
            get_last_view();
          }
        }
      } else {
        side_toaster(
          'There was a problem deleting, please try again later.',
          5000
        );
        setTimeout(function () {}, 5000);
      }
    } catch (e) {
      console.log(e);

      side_toaster(
        'There was a problem deleting, please try again later.',
        5000
      );
      setTimeout(function () {
        try {
          sort_array(events, 'dateStartUnix', 'number');
        } catch (e) {
          console.log(e);
        }
      }, 5000);
    }
  }
};

//update event

export let update_caldav = async function (etag, url, data, account_id) {
  document.querySelector('.loading-spinner').style.display = 'block';

  const matchingAccount = accounts.find((p) => p.id === account_id);

  if (matchingAccount) {
    const client = await getClientInstance(matchingAccount);

    try {
      if (!isLoggedInMap[matchingAccount.id]) {
        await client.login();
        isLoggedInMap[matchingAccount.id] = true;
      }

      const result = await client.updateCalendarObject({
        calendarObject: {
          url: url,
          data: data,
          etag: etag,
        },
        headers: client.authHeaders,
      });

      if (result.ok) {
        document.querySelector('.loading-spinner').style.display = 'none';

        try {
          const [res] = await client.propfind({
            url: result.url,
            props: {
              [`${DAVNamespaceShort.DAV}:getetag`]: {},
            },
            depth: '0',
            headers: client.authHeaders,
          });

          events.forEach((item) => {
            if (item.etag === etag) {
              item.etag = res.props.getetag;
            }
          });

          get_last_view();

          cache_caldav();
        } catch (e) {
          console.log(e);
        }
      } else {
        side_toaster(
          'There was a problem saving, please try again later.',
          5000
        );
      }
    } catch (e) {
      side_toaster('There was a problem saving, please try again later.', 5000);
    }
  }
};

//load subscriptions

const load_subscriptions = () => {
  subscriptions.forEach((e) => {
    fetch_ics(e.url, e.id);
  });
};

export let sync_caldav_callback = function () {
  load_caldav().then(() => {
    //close app because is background sync
    if (!status.visible) {
      window.close();
      return;
    }
  });
};

//get event data
let get_event_date = function () {
  status.selected_day_id = document.activeElement.getAttribute('data-id');
  update_event_date = events.filter(function (arr) {
    return arr.UID == status.selected_day_id;
  })[0];
};

//load event templates
localforage
  .getItem('event_templates')
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

//store templates
let store_event_as_template = function (
  title,
  description,
  location,
  category
) {
  let m = {
    id: uid(32),
    title: title,
    description: description,
    location: location,
    category: category,
  };
  event_templates.push(m);

  localforage
    .setItem('event_templates', event_templates)
    .then(function (value) {
      side_toaster('template saved', 2000);
      get_last_view();
    })
    .catch(function (err) {
      console.log(err);
    });
};

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();

let update_event_date;

//ads || ads free

try {
  getManifest(manifest);
} catch (e) {}

// ////////
// finde closest event to selected date in list view
// ////////
const find_closest_date = function (date) {
  let search = date ? dayjs().unix() : dayjs(status.selected_day).unix();

  if (events.length === 0) {
    document.getElementById('events-wrapper').innerHTML =
      "You haven't made any calendar entries yet.";
    return false;
  }

  let t = 0;

  let focusAndScroll = function () {
    document
      .querySelectorAll('div#events-wrapper article[data-id="' + t + '"]')[0]
      .focus();
    const rect = document.activeElement.getBoundingClientRect();
    const elY =
      rect.top - document.body.getBoundingClientRect().top + rect.height / 2;

    document.activeElement.parentNode.scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: 'smooth',
    });
  };

  let smallerOrFirst = function () {
    try {
      let m = events.findIndex((event) => dayjs(event.DTSTAMP).unix() < search);
      t = events[m].UID;

      focusAndScroll();
    } catch (e) {
      t = events[0].UID;
      focusAndScroll();
    }
  };

  try {
    let m = events.findIndex(
      (event) => dayjs(event.dateStart).unix() === search
    );
    t = events[m].UID;

    focusAndScroll();
  } catch (e) {
    smallerOrFirst();
  }
};

const event_check = function (date) {
  let feedback = {
    event: false,
    multidayevent: false,
  };

  let eventsOnTargetDate = events.filter((event) => {
    const eventStartTime = new Date(event.dateStart).getTime();
    const eventEndTime = new Date(event.dateEnd).getTime();
    const targetTime = new Date(date).getTime();

    return (
      eventStartTime <= targetTime &&
      eventEndTime >= targetTime &&
      !event.RRULE.freq
    );
  });

  feedback.event = eventsOnTargetDate.length > 0;

  // Check for multiday events
  if (eventsOnTargetDate.length > 1) {
    const sortedEvents = eventsOnTargetDate.sort(
      (a, b) =>
        new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
    );

    for (let i = 1; i < sortedEvents.length; i++) {
      const prevEventEndTime = new Date(sortedEvents[i - 1].dateEnd).getTime();
      const currentEventStartTime = new Date(
        sortedEvents[i].dateStart
      ).getTime();

      if (prevEventEndTime >= currentEventStartTime) {
        feedback.multidayevent = true;
        break;
      }
    }
  }

  return feedback;
};

// check if has recur event
let rrule_check = function (date) {
  let feedback = {
    date: '',
    event: false,
    subscription: false,
    multidayevent: false,
    rrule: 'none',
  };

  for (let t = 0; t < events.length; t++) {
    if (typeof events[t] === 'object') {
      feedback.event = false;
      feedback.multidayevent = false;
      feedback.rrule = false;
      feedback.date = date;

      let a = new Date(events[t].dateStart).getTime();
      let b = new Date(events[t].dateEnd).getTime();
      let c = new Date(date).getTime();
      let d = events[t].RRULE.freq;
      let e = events[t].RRULE;

      if (typeof e !== 'undefined' && e !== undefined && e != null) {
        //recurrences

        if (events[t].RRULE != null) {
          //endless || with end
          if (events[t].RRULE.until == null) {
            b = new Date('3000-01-01').getTime();
          } else {
            b = new Date(events[t].RRULE.until).getTime();
          }
        }

        if (a === c || b === c || (a < c && b > c)) {
          if (d == 'MONTHLY') {
            if (
              new Date(events[t].dateStart).getDate() ===
              new Date(date).getDate()
            ) {
              feedback.event = true;
              feedback.rrule = true;
              t = events.length;
              return feedback;
            }
          }

          if (d == 'DAILY') {
          }

          if (d == 'WEEKLY') {
            if (
              new Date(events[t].dateStart).getDay() === new Date(date).getDay()
            ) {
              feedback.rrule = true;
              feedback.event = true;
              t = events.length;

              return feedback;
            }
          }

          if (d == 'BIWEEKLY') {
            if (Math.floor((c - a) / (24 * 60 * 60 * 1000)) % 14 == 0) {
              feedback.rrule = true;
              feedback.event = true;
              t = events.length;

              return feedback;
            }
          }

          if (d == 'YEARLY') {
            let tt = new Date(events[t].dateStart);
            let pp = new Date(date);
            if (
              tt.getDate() + '-' + tt.getMonth() ===
              pp.getDate() + '-' + pp.getMonth()
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
    document.querySelectorAll('div#event-slider article').length - 1
  ) {
    slider_index = 0;
  }

  let p = document.querySelectorAll('div#event-slider-indicator div div');

  document
    .querySelectorAll('div#event-slider article')
    .forEach(function (item) {
      item.style.display = 'none';
    });
  document.querySelectorAll('div#event-slider article')[
    slider_index
  ].style.display = 'block';

  p.forEach(function (item) {
    item.classList.remove('active');
  });
  p[slider_index].classList.add('active');
};

let event_slider = function (date) {
  slider = [];
  let k = document.querySelector('div#event-slider-indicator div');
  k.innerHTML = '';

  document.querySelector('div#event-slider').innerHTML = '';
  for (let i = 0; i < events.length; i++) {
    let a = new Date(events[i].dateStart).getTime();
    let b = new Date(events[i].dateEnd).getTime();
    let c = new Date(date).getTime();
    let d = events[i].RRULE.freq;

    if (d === 'none' || d === '' || d === undefined || d === null) {
      if (a === c || (a <= c && b >= c)) {
        slider.push(events[i]);
        k.insertAdjacentHTML('beforeend', "<div class='indicator'></div>");
      }
    } else {
      //workaround if enddate is not set
      //AKA infinity

      if (events[i].RRULE != null) {
        if (events[i].RRULE.until == null) {
          b = new Date('3000-01-01').getTime();
        }
      }

      if (a === c || b === c || (a < c && b > c)) {
        //recurrences

        //YEAR
        if (d == 'YEARLY') {
          let tt = new Date(events[i].dateStart);
          let pp = new Date(date);

          if (
            tt.getDate() + '-' + tt.getMonth() ===
            pp.getDate() + '-' + pp.getMonth()
          ) {
            slider.push(events[i]);
            k.insertAdjacentHTML('beforeend', "<div class='indicator'></div>");
          }
        }

        //WEEK
        if (d == 'WEEKLY') {
          if (
            new Date(events[i].dateStart).getDay() == new Date(date).getDay()
          ) {
            slider.push(events[i]);
            k.insertAdjacentHTML('beforeend', "<div class='indicator'></div>");
          }
        }

        //BIWEEK
        if (d == 'BIWEEKLY') {
          if (Math.floor((c - a) / (24 * 60 * 60 * 1000)) % 14 == 0) {
            slider.push(events[i]);
            k.insertAdjacentHTML('beforeend', "<div class='indicator'></div>");
          }
        }

        //MONTH

        if (d == 'MONTHLY') {
          if (
            new Date(events[i].dateStart).getDate() == new Date(date).getDate()
          ) {
            slider.push(events[i]);
            k.insertAdjacentHTML('beforeend', "<div class='indicator'></div>");
          }
        }

        if (d == 'DAILY') {
          if (a === c || b === c || (a < c && b > c)) {
            slider.push(events[i]);
            k.insertAdjacentHTML('beforeend', "<div class='indicator'></div>");
          }
        }
      }
    }
  }

  if (slider.length >= 0) {
    slider.forEach(function (item, i) {
      let l = '';
      if (!item.allDay) {
        l = dayjs.unix(item.dateStartUnix).format('HH:mm');
      }

      document
        .querySelector('div#event-slider')
        .insertAdjacentHTML(
          'beforeend',
          "<article data-uid='" +
            item.UID +
            "'><div class='width-100'>" +
            item.SUMMARY +
            "</div><div class='width-100'>" +
            l +
            '</div></article>'
        );
    });

    if (slider.length > 0) {
      try {
        document.querySelectorAll('div#event-slider article')[0].style.display =
          'block';
      } catch (e) {
        console.log(e);
      }
    }
  }

  if (
    document.querySelectorAll('div.indicator').length <= 1 ||
    document.querySelectorAll('div.indicator').length == undefined
  ) {
    document.getElementById('event-slider-indicator').style.opacity = 0;
  } else {
    document.getElementById('event-slider-indicator').style.opacity = 1;
    document.querySelector('div#event-slider article').style.display = 'block';
    document
      .querySelectorAll('div#event-slider .indicator')[0]
      .style.classList.add('active');
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
    status.selected_day = dayjs().format('YYYY-MM-DD');
    event_slider(status.selected_day);
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
  if (m.route.get() != '/page_calendar') return false;
  setTimeout(function () {
    //reset weekday
    document
      .querySelectorAll('div#calendar div.calendar-head div')
      .forEach(function (e) {
        e.classList.remove('active');
      });
    //reset weeknumber
    document.querySelectorAll('span.weeknumber').forEach((e) => {
      e.classList.remove('active');
    });

    let p = document.activeElement.getAttribute('data-date');

    const d = new Date(p);
    let s = d.getDay();
    let k = document.activeElement.closest('div.row');
    k.querySelector('span.weeknumber').classList.add('active');

    if (settings.firstday == 'monday') {
      s = s - 1;

      if (s == -1) s = 6;
      document
        .querySelectorAll('div#calendar div.calendar-head div')
        [s].classList.add('active');
    } else {
      document
        .querySelectorAll('div#calendar div.calendar-head div')
        [s].classList.add('active');
    }
  }, 200);
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
//https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d
let showCalendar = function (month, year) {
  // filing data about month and in the page via DOM.

  document.getElementById('monthAndYear').textContent =
    months[month] + ' ' + year;

  let firstDay = new Date(year, month).getDay();
  if (settings.firstday == 'monday') {
    if (firstDay == 0) {
      firstDay = 6;
    } else {
      firstDay = firstDay - 1;
    }
  }

  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById('calendar-body');

  // clearing all previous cells
  tbl.innerHTML = '';

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement('div');
    row.classList.add('flex');
    row.classList.add('row');
    row.setAttribute('data-weeknumber', i);
    row.classList.add('width-100');

    // creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement('div');
        let cellText = document.createTextNode('');
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement('div');
        let span = document.createElement('span');
        let moon = document.createElement('div');

        let cellText = document.createTextNode(date);
        cell.appendChild(cellText);
        cell.appendChild(span);

        // set tabindex
        cell.setAttribute('tabindex', date - 1);
        cell.classList.add('calendar-cell');
        // store date with leading 0
        // because input type date
        // accept only day month with leading zero
        let mmonth = `0${month + 1}`.slice(-2);
        let day = `0${date}`.slice(-2);

        let p = year + '-' + mmonth + '-' + day;

        moon.classList.add('moon-phase-' + getMoonPhase(year, month, date));
        cell.appendChild(moon);

        cell.setAttribute('data-date', p);

        cell.classList.add('item');
        row.appendChild(cell);

        date++;
      }
    }

    // add weeknumbers
    let week = document.createElement('span');
    week.classList.add('weeknumber');
    let f = () => {
      let k = '';
      if (settings.firstday == 'monday') {
        k = new Date(year, month, date - 1).getWeek();
      } else {
        k = new Date(year, month, date).getWeek();
      }
      return k;
    };

    let weekText = document.createTextNode(f());

    week.appendChild(weekText);
    row.appendChild(week);

    //add row
    tbl.appendChild(row);
  }

  document.querySelectorAll('.item')[0].focus();
  status.selected_day = document.activeElement.getAttribute('data-date');

  // highlight current day
  if (today.getMonth() == month && today.getFullYear() == year) {
    document.querySelectorAll('.item')[currentDay - 1].focus();
    document.querySelectorAll('.item')[currentDay - 1].classList.add('today');
  }

  highlight_current_day();
  style_calendar_cell(currentYear, currentMonth);
};

let clear_form = function () {
  document.querySelectorAll('div#add-edit-event input').forEach(function (e) {
    e.value = '';
  });
};

let search_events = (term) => {
  let k = term.toUpperCase();
  document.querySelectorAll('#events-wrapper article').forEach((v) => {
    if (
      v.getAttribute('data-summary').indexOf(k) >= 0 ||
      v.getAttribute('data-category').indexOf(k) >= 0
    ) {
      v.style.display = 'block';
    } else {
      v.style.display = 'none';
    }
  });
  set_tabindex();
};

/*--------------*/
//after select element KaiOS specific
/*--------------*/

let focus_after_selection = function () {
  if (document.querySelectorAll('.select-box') == null) return false;
  document.querySelectorAll('.select-box').forEach(function (e) {
    e.addEventListener('blur', function (k) {
      setTimeout(function () {
        e.parentElement.focus();
      }, 200);
    });
  });
};

/*
///////////////////
//VIEWS
/////////////////
*/

var root = document.getElementById('app');

var page_calendar = {
  view: function () {
    return m(
      'div',
      {
        class: 'width-100 height-100',
        id: 'calendar',
        oninit: function () {
          view_history_update();
          load_settings();
          clear_form();
        },
      },
      [
        m('div', { class: 'flex justify-content-spacebetween', id: '' }, [
          m(
            'h3',
            {
              class: 'card-header',
              id: 'monthAndYear',
            },
            ''
          ),

          m('img', {
            id: 'icon-loading',
            src: './assets/image/E252.svg',
            alt: 'loading',
          }),

          m('img', {
            id: 'icon-waiting',
            src: './assets/image/waiting.png',
            alt: 'loading',
          }),
          m(
            'div',
            {
              id: 'time',
              oncreate: function () {
                document.getElementById('time').innerText =
                  dayjs().format('HH:mm');
              },
            },
            'time is relative'
          ),
        ]),

        m(
          'div',
          {
            class: 'calendar-head flex width-100',
          },

          [
            m('div', weekday[0]),
            m('div', weekday[1]),
            m('div', weekday[2]),
            m('div', weekday[3]),
            m('div', weekday[4]),
            m('div', weekday[5]),
            m('div', weekday[6]),
          ]
        ),
        m('div', { id: 'calendar-body' }),
        m(
          'div',
          {
            id: 'event-slider-indicator',
            class: 'flex width-100 justify-content-spacearound',
          },
          [m('div', { class: 'flex justify-content-spacearound' })]
        ),
        m(
          'div',
          {
            id: 'event-slider',
            class: 'flex',
          },
          [m('div', { id: 'slider-inner', class: 'flex' })]
        ),
      ]
    );
  },
  onbeforeremove: () => {
    status.selected_day = document.activeElement.getAttribute('data-date');
  },

  oncreate: () => {
    setTimeout(function () {
      if (document.activeElement.hasAttribute('data-date'))
        status.selected_day = document.activeElement.getAttribute('data-date');
      bottom_bar(
        "<img src='assets/image/add.svg'>",
        "<img src='assets/image/list.svg'>",
        "<img src='assets/image/option.svg'>"
      );

      let t = new Date(status.selected_day);
      currentMonth = t.getMonth();
      currentYear = t.getFullYear();
      showCalendar(currentMonth, currentYear);

      document
        .querySelectorAll('div#calendar-body div.item')
        .forEach(function (item) {
          if (item.getAttribute('data-date') == status.selected_day) {
            item.focus();
            event_slider(status.selected_day);
            return;
          }
        });
      //run only once
      if (status.startup == false) {
        event_slider(status.selected_day);
        jump_to_today();

        status.startup = true;
      }
    }, 200);
  },
};

var page_events = {
  view: function () {
    let query = m.route.param('query');

    return m(
      'div',
      {
        class: 'flex',
        id: 'events-wrapper',
        oninit: () => {
          view_history_update();
          status.shortCut = false;
          if (query == '' || query == undefined) {
            sort_array(events, 'dateStartUnix', 'number').then(() => {});
          } else {
            console.log(query);
          }
        },
        onremove: () => {
          status.selected_day =
            document.activeElement.getAttribute('data-date');

          status.selected_day_id =
            document.activeElement.getAttribute('data-id');
        },
        oncreate: function () {
          document.querySelector('.loading-spinner').style.display = 'none';

          if (query == '' || query == undefined) {
            find_closest_date();
          } else {
            console.log(query);
          }

          bottom_bar(
            "<img src='assets/image/pencil.svg'>",
            "<img src='assets/image/calendar.svg'>",
            "<img src='assets/image/E257.svg'>"
          );
        },
      },
      m('input', {
        type: 'search',
        class: 'width-90 item',
        id: 'search',
        tabIndex: 0,
        onfocus: () => {
          window.scroll({
            top: 20,
            left: 0,
            behavior: 'smooth',
          });
        },
        oninput: () => {
          search_events(document.activeElement.value);
        },
      }),
      [
        events.map(function (item, index) {
          let de,
            se = '';

          //all day
          if (item.allDay) {
            se = 'all day';
          } else {
            se = formatDT(item.DTSTART._time).format('HH:mm');
          }

          let weekDay =
            settings.firstday == 'sunday'
              ? weekday[dayjs(formatDT(item.DTSTART._time)).day()]
              : weekday[dayjs(formatDT(item.DTSTART._time)).day() - 1];

          //date
          if (
            item.DTSTART != null &&
            item.DTEND != null &&
            formatDT(item.DTSTART._time).format(settings.dateformat) !=
              formatDT(item.DTEND._time).format(settings.dateformat) &&
            !item.allDay
          ) {
            de =
              formatDT(item.DTSTART._time).format(settings.dateformat) +
              ' - ' +
              formatDT(item.DTEND._time).format(settings.dateformat);
          } else {
            de =
              formatDT(item.DTSTART._time).format(settings.dateformat) +
              ' | ' +
              weekDay;
          }

          let u = item.isSubscription ? 'subscription' : '';
          let a = item.allDay ? 'allDay' : '';
          return m(
            'article',
            {
              class: 'item events ' + u + ' ' + a,
              tabindex: index + 1,
              'data-id': item.UID,
              'data-date': formatDT(item.DTSTART._time).format('YYYY-MM-DD'),

              'data-category': (item.CATEGORIES || '').toUpperCase(),
              'data-summary': (item.SUMMARY || '').toUpperCase(),
              'data-calendar-name': item.calendar_name || '',
            },
            [
              m('div', { class: 'icons-bar' }, [
                m('div', { class: 'date' }, de),
                m('div', { class: 'time' }, se),
                m('h2', { class: 'summary' }, item.SUMMARY),
                m('div', { class: 'location' }, item.LOCATION),
                m('div', { class: 'description' }, item.DESCRIPTION),
              ]),
            ]
          );
        }),
      ]
    );
  },
};

var page_events_filtered = {
  view: function () {
    let query = m.route.param('query');
    let tindex = 0;

    return m(
      'div',
      {
        class: 'flex',
        id: 'events-wrapper',
        onremove: () => {
          status.selected_day =
            document.activeElement.getAttribute('data-date');

          status.selected_day_id =
            document.activeElement.getAttribute('data-id');
        },
        oninit: () => {
          view_history_update();
          status.shortCut = false;
          side_toaster('Category: ' + query, 8000);
        },
        oncreate: function () {
          document.querySelectorAll('.item')[0].focus();
          bottom_bar(
            "<img src='assets/image/pencil.svg'>",
            "<img src='assets/image/calendar.svg'>",
            "<img src='assets/image/E257.svg'>"
          );
        },
      },

      [
        events.map(function (item) {
          if (
            item.CATEGORIES &&
            item.CATEGORIES.toLowerCase() === query.toLowerCase()
          ) {
            tindex++;
            let de,
              se = '';

            //all day
            if (item.allDay) {
              se = 'all day';
            } else {
              se = dayjs.unix(item.dateStartUnix).format('HH:mm');
            }

            //date
            //date
            if (
              item.DTSTART != null &&
              item.DTEND != null &&
              formatDT(item.DTSTART._time).format(settings.dateformat) !=
                formatDT(item.DTEND._time).format(settings.dateformat) &&
              !item.allDay
            ) {
              de =
                formatDT(item.DTSTART._time).format(settings.dateformat) +
                ' - ' +
                formatDT(item.DTEND._time).format(settings.dateformat);
            } else {
              de = formatDT(item.DTSTART._time).format(settings.dateformat);
            }

            let u = item.isSubscription ? 'subscription' : '';
            let a = item.allDay ? 'allDay' : '';
            return m(
              'article',
              {
                class: 'item events ' + u + ' ' + a,
                tabindex: tindex,
                'data-id': item.UID,
                'data-date': formatDT(item.DTSTART._time).format('YYYY-MM-DD'),
                'data-category': (item.CATEGORIES || '').toUpperCase(),
                'data-summary': (item.SUMMARY || '').toUpperCase(),
              },
              [
                m('div', { class: 'icons-bar' }, [
                  m('div', { class: 'date' }, de),
                  m('div', { class: 'time' }, se),
                  m('h2', { class: 'summary' }, item.SUMMARY),
                  m('div', { class: 'location' }, item.LOCATION),
                  m('div', { class: 'description' }, item.DESCRIPTION),
                ]),
              ]
            );
          }
        }),
      ]
    );
  },
};

export let page_options = {
  view: function () {
    return m(
      'div',
      {
        id: 'options',
        oninit: () => {
          view_history_update();
          status.shortCut = false;
        },
        oncreate: () => {
          if (settings.ads) {
            load_ads();
          }

          bottom_bar('', '', '');
        },
      },
      [
        m('h2', { class: 'item', tabIndex: 0 }, 'Key assignment'),

        m(
          'ul',
          {
            id: 'keys',
            class: 'item width-100',
            tabindex: '1',
            oncreate: function ({ dom }) {
              bottom_bar('', '', '');

              document.querySelectorAll('.select-box').forEach(function (e) {
                e.addEventListener('keypress', function () {
                  setTimeout(function () {
                    e.parentElement.focus();
                  }, 200);
                });
              });

              dom.focus();
            },
          },
          [
            m('li', { class: 'flex justify-content-spacebetween' }, [
              m('kbd', '1 & 3'),
              m('div', 'Month'),
            ]),
            m('li', { class: 'flex justify-content-spacebetween' }, [
              m('kbd', '2'),
              m('div', 'Event slider'),
            ]),

            m('li', { class: 'width-100  flex justify-content-spacebetween' }, [
              m('kbd', '5'),
              m('div', 'Edit event'),
            ]),

            m('li', { class: 'width-100  flex justify-content-spacebetween' }, [
              m('kbd', 'Enter'),
              m('div', 'Events/Month'),
            ]),

            m('li', { class: 'width-100  flex justify-content-spacebetween' }, [
              m('kbd', '0'),
              m('div', 'Events filterdy by category'),
            ]),

            m('li', { class: 'width-100  flex justify-content-spacebetween' }, [
              m('kbd', '#'),
              m('div', 'Moon'),
            ]),
            m('li', { class: 'width-100  flex justify-content-spacebetween' }, [
              m('kbd', '*'),
              m('div', 'Today'),
            ]),

            m('li', { class: 'width-100  flex justify-content-spacebetween' }, [
              m('kbd', 'SoftLeft longpress'),
              m('div', {}, 'create event from template'),
            ]),

            m('li', { class: 'width-100  flex justify-content-spacebetween' }, [
              m('span', { class: 'keys-day-event' }),
              m('span', 'day with event'),
            ]),

            m('li', { class: 'width-100  flex justify-content-spacebetween' }, [
              m('span', { class: 'keys-day-multi-event' }),
              m('span', 'day with several events'),
            ]),

            m('li', { class: 'width-100  flex justify-content-spacebetween' }, [
              m('span', { class: 'keys-day-rrule-event' }),
              m('span', 'day with reccurence'),
            ]),
          ]
        ),
        m('h2', { class: 'item', tabindex: '2' }, 'Settings'),
        m('div', { class: 'text-center' }, 'Timezone: ' + settings.timezone),

        m(
          'div',
          {
            class: 'item input-parent',
            id: 'event-date-format-box',
            tabindex: '3',
          },
          [
            m('label', { for: 'event-date-format' }, 'dateformat'),
            m(
              'select',
              {
                id: 'event-date-format',
                class: 'select-box',
                onchange: function () {
                  store_settings();
                },
                oncreate: function () {
                  load_settings();
                  setTimeout(function () {
                    focus_after_selection();
                    if (settings.dateformat == '') {
                      document.querySelector('#event-date-format').value =
                        'YYYY-mm-dd';
                    } else {
                      document.querySelector('#event-date-format').value =
                        settings.dateformat;
                    }
                  }, 1000);
                },
              },
              [
                m('option', { value: 'YYYY-MM-DD' }, 'YYYY-MM-DD'),
                m('option', { value: 'DD.MM.YYYY' }, 'DD.MM.YYYY'),
              ]
            ),
          ]
        ),

        m(
          'div',
          {
            class: 'item input-parent',
            id: 'background-sync-box',
            tabindex: '3',
          },
          [
            m('label', { for: 'background-syn-box' }, 'Background sync ?'),

            m(
              'select',
              {
                id: 'background-sync',
                class: 'select-box',
                onchange: function () {
                  store_settings();
                },

                oncreate: function () {
                  if ('b2g' in navigator) {
                    document.getElementById(
                      'background-sync-box'
                    ).style.display = 'none';
                  }

                  load_settings();
                  setTimeout(function () {
                    focus_after_selection();
                    if (settings.background_sync == 'No') {
                      document.querySelector('#background-sync').value = 'No';
                    } else {
                      document.querySelector('#background-sync').value = 'Yes';
                    }
                  }, 1000);
                },
              },
              [
                m('option', { value: 'Yes' }, 'Yes'),
                m('option', { value: 'No' }, 'No'),
              ]
            ),
            m('div', { class: 'last-sync-info' }, 'last sync: ' + last_sync),
          ]
        ),

        m(
          'div',
          {
            class: 'item input-parent',
            id: 'firs-day-of-the-week-box',
            tabindex: '4',
          },
          [
            m(
              'label',
              { for: 'first-day-of-the-week' },
              'first day of the week'
            ),
            m(
              'select',
              {
                id: 'first-day-of-the-week',
                class: 'select-box',
                onchange: function () {
                  store_settings();
                },
                oncreate: function () {
                  setTimeout(function () {
                    focus_after_selection();
                    if (
                      settings.firstday == '' ||
                      settings.firstday == undefined
                    ) {
                      document.querySelector('#first-day-of-the-week').value =
                        'sunday';
                    } else {
                      document.querySelector('#first-day-of-the-week').value =
                        settings.firstday;
                    }
                  }, 1000);
                },
              },
              [
                m('option', { value: 'sunday' }, 'Sunday'),
                m('option', { value: 'monday' }, 'Monday'),
              ]
            ),
          ]
        ),
        m(
          'div',
          {
            class: 'item input-parent',
            id: 'event-duration-wrapper',
            tabindex: '5',
          },
          [
            m('label', { for: 'default-duration-time' }, 'default Duration'),
            m(
              'select',
              {
                id: 'default-duration-time',
                class: 'select-box',
                onchange: function () {
                  store_settings();
                },
                oncreate: function () {
                  load_settings();
                  setTimeout(function () {
                    focus_after_selection();
                    if (!settings.default_duration) {
                      document.querySelector(
                        '#default-duration-time'
                      ).value = 30;
                    } else {
                      document.querySelector(
                        '#default-notification-time'
                      ).value = settings.default_duration;
                    }
                  }, 1000);
                },
              },
              [
                m('option', { value: '30' }, '30 minutes'),
                m('option', { value: '60' }, '60 minutes'),
                m('option', { value: '120' }, '120 minutes'),
                m('option', { value: '240' }, '240 minutes'),
              ]
            ),
          ]
        ),

        m(
          'div',
          {
            class: 'item input-parent',
            id: 'event-notification-time-wrapper',
            tabindex: '5',
          },
          [
            m('label', { for: 'default-notification' }, 'default Notification'),
            m(
              'select',
              {
                id: 'default-notification-time',
                class: 'select-box',
                onchange: function () {
                  store_settings();
                },
                oncreate: function () {
                  load_settings();
                  setTimeout(function () {
                    focus_after_selection();
                    if (settings.default_notification == '') {
                      document.querySelector(
                        '#default-notification-time'
                      ).value = 'none';
                    } else {
                      document.querySelector(
                        '#default-notification-time'
                      ).value = settings.default_notification;
                    }
                  }, 1000);
                },
              },
              [
                m('option', { value: 'none' }, 'none'),
                m('option', { value: '5' }, '5 minutes'),
                m('option', { value: '10' }, '10 minutes'),
                m('option', { value: '30' }, '30 minutes'),
                m('option', { value: '1440' }, '1 Day'),
              ]
            ),
          ]
        ),

        m(
          'button',
          {
            class: 'item',
            tabindex: '6',
            oncreate: function () {
              file_list = [];
              list_files('ics', cb);
            },
            onclick: function () {
              m.route.set('/page_list_files');
            },
          },
          'Import events'
        ),

        m(
          'button',
          {
            class: 'item',
            tabindex: '7',
            onclick: function () {
              setTimeout(() => {
                load_caldav(true);
              }, 1000);
              side_toaster('the big loading has begun', 2000);
            },
          },
          'Reload all events'
        ),
        m('h2', 'Subscriptions'),

        m(
          'button',
          {
            class: 'item',
            tabindex: '8',
            onclick: function () {
              m.route.set('/page_subscriptions');
            },
          },
          'add subscription'
        ),
        m('div', { id: 'subscription-text' }, 'Your subscriptions'),
        subscriptions != null
          ? subscriptions.map(function (item, index) {
              return m(
                'button',
                {
                  class: 'item subscriptions-item',
                  'data-id': item.id,
                  'data-action': 'delete-subscription',
                  tabindex: index + 8,
                  onfocus: function () {
                    bottom_bar("<img src='assets/image/delete.svg'>", '', '');
                  },
                  onblur: function () {
                    bottom_bar('', '', '');
                  },
                },
                item.name
              );
            })
          : m('div', { class: 'text-center' }, 'No subscriptions available'),

        m('h2', 'Category view'),

        m(
          'div',
          {
            class: 'item input-parent',
            id: 'events-category-filter-wrapper',
            tabindex: '',
          },
          [
            m(
              'label',
              { for: 'events-category-filter' },
              'Select the category'
            ),
            m(
              'select',
              {
                id: 'events-category-filter',
                class: 'select-box',
                onchange: function () {
                  store_settings();
                },
                oncreate: function () {
                  setTimeout(function () {
                    focus_after_selection();
                    document.querySelector('#events-category-filter').value =
                      settings.eventsfilter;
                  }, 1000);
                },
              },
              events.length > 0
                ? [
                    m('option', { value: '-' }, '-'),
                    ...events
                      .map((e) => e.CATEGORIES)
                      .filter(
                        (category, index, array) =>
                          category !== '' && array.indexOf(category) === index
                      )
                      .map((category) =>
                        m('option', { value: category }, category)
                      ),
                  ]
                : [m('option', { value: '-' }, 'No categories available')]
            ),
          ]
        ),

        m('h2', 'Calendars'),

        calendar_names != null
          ? calendar_names.map((e) => {
              return m(
                'button',
                {
                  class: 'item',
                  'data-calendar-name': e.name,
                  oncreate: ({ dom }) => {
                    if (e.view == false) dom.classList.add('active');
                    if (e.name == 'local') dom.style.display = 'none';
                  },
                  onclick: () => {
                    calendar_names.forEach((i) => {
                      if (
                        i.name ==
                        document.activeElement.getAttribute(
                          'data-calendar-name'
                        )
                      ) {
                        i.view = !i.view;
                      }
                    });

                    document.activeElement.classList.toggle('active');

                    localforage
                      .setItem('calendarNames', calendar_names)
                      .then(() => {
                        loadCalendarNames();
                        side_toaster(
                          'will be applied the next time the app is started',
                          2000
                        );
                      });
                  },
                },
                e.name
              );
            })
          : '',
        ,
        m('h2', 'Accounts'),

        m(
          'button',
          {
            class: 'item  google-button caldav-button',
            onclick: function () {
              m.route.set('/page_accounts');
            },
          },

          [
            m(
              'div',
              {
                class: 'flex  align-item-center justify-content-spacebetween ',
              },
              [
                m('img', {
                  src: 'assets/image/caldav.png',
                }),
                m('span', 'CalDAV Account'),
              ]
            ),
          ]
        ),

        m(
          'button',
          {
            class: 'item google-button',
            onclick: function () {
              oauth_callback = setInterval(function () {
                if (localStorage.getItem('oauth_callback') == 'true') {
                  m.route.set('/page_calendar');
                  //stop interval
                  clearInterval(oauth_callback);
                  //load accounts
                  setTimeout(function () {
                    accounts = [];
                    localforage
                      .getItem('accounts')
                      .then(function (value) {
                        if (value == null) {
                          accounts = [];
                          return false;
                        }
                        accounts = value;
                        side_toaster(
                          'the calendar events will be loaded the next time the app is restarted',
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
              'div',
              {
                class: 'flex justify-content-spacebetween align-item-center ',
              },
              [
                m('img', {
                  src: 'assets/image/google_button.png',
                }),
                m('span', 'Sign in with Google'),
              ]
            ),
          ]
        ),

        m('div', { id: 'subscription-text' }, 'Your accounts'),

        accounts != null
          ? accounts.map(function (item) {
              return m(
                'button',
                {
                  class: 'item subscriptions-item',
                  'data-id': item.id,
                  'data-account-type': item.type,
                  'data-action': 'edit-delete-account',

                  onblur: function () {
                    bottom_bar('', '', '');
                  },
                  onfocus: function () {
                    if (item.type == 'oauth') {
                      bottom_bar("<img src='assets/image/delete.svg'>", '', '');
                    } else {
                      bottom_bar(
                        "<img src='assets/image/delete.svg'>",
                        '',
                        "<img src='assets/image/pencil.svg'>"
                      );
                    }
                  },
                },
                item.name
              );
            })
          : '',
        m('h2', { class: 'ads-title' }, 'Ads'),

        m('div', {
          id: 'KaiOsAds-Wrapper',
          //  tabindex: subscriptions.length + accounts.length + 11,
          class: 'flex justify-content-spacearound',
          oninit: function () {
            if (settings.ads) {
            } else {
              document.querySelector('h2.ads-title').remove();
            }
          },
          oncreate: () => {},

          onfocus: function () {
            bottom_bar('', 'open ads', '');
          },
          onblur: function () {
            bottom_bar('', 'open ads', '');
          },
        }),
      ]
    );
  },
};
let p = '';
var page_subscriptions = {
  view: function () {
    return m('div', { id: 'subscription-form' }, [
      m(
        'div',
        {
          class: 'item input-parent',
          tabindex: '0',
          oninit: () => {
            bottom_bar('', '', '');

            view_history_update();
            status.shortCut = false;
          },

          oncreate: function ({ dom }) {
            dom.focus();
          },
        },
        [
          m('label', { for: 'description' }, 'subscription name'),
          m('input', {
            placeholder: 'Name',
            type: 'text',
            id: 'cal-subs-name',
          }),
        ]
      ),
      m(
        'div',
        {
          class: 'item input-parent',
          tabindex: '1',

          onblur: function () {
            bottom_bar('', '', '');
          },
        },
        [
          m('label', { for: 'description' }, 'subscription url'),
          m('input', {
            placeholder: 'URL',
            type: 'text',
            id: 'cal-subs-url',
            'data-scan-action': 'true',
            onfocus: function () {
              bottom_bar("<img src='assets/image/E1D8.svg'>", '', '');
            },
            oncreate: () => {
              setTimeout(() => {
                document.getElementById('cal-subs-url').value = p;
              }, 1000);
            },
            onblur: function () {
              bottom_bar('', '', '');
            },
          }),
        ]
      ),
      m(
        'button',
        {
          class: 'item save-button',
          tabindex: '2',
          onclick: function () {
            store_subscription();
          },
        },
        'save'
      ),
    ]);
  },
};

let update_account;
var page_edit_account = {
  view: function () {
    return m('div', { id: 'account-form' }, [
      m(
        'div',
        {
          class: 'item input-parent',
          tabindex: '0',

          oninit: () => {},

          oncreate: function ({ dom }) {
            dom.focus();
            view_history_update();
            status.shortCut = false;
          },
        },
        [
          m('label', { for: 'description' }, 'account name'),
          m('input', {
            placeholder: 'Name',
            type: 'text',
            id: 'account-name',
            value: update_account.name,
          }),
        ]
      ),
      m(
        'div',
        {
          class: 'item input-parent',
          tabindex: '1',

          onblur: function () {
            bottom_bar('', '', '');
          },
        },
        [
          m('label', { for: 'description' }, 'server'),
          m('input', {
            placeholder: 'URL',
            type: 'text',
            id: 'account-url',
            'data-scan-action': 'true',
            value: update_account.server_url,

            onfocus: function () {
              bottom_bar("<img src='assets/image/E1D8.svg'>", '', '');
            },
            onblur: function () {
              bottom_bar('', '', '');
            },
          }),
        ]
      ),
      m(
        'div',
        {
          class: 'item input-parent',
          tabindex: '2',

          onblur: function () {
            bottom_bar('', '', '');
          },
        },
        [
          m('label', { for: 'description' }, 'username'),
          m('input', {
            placeholder: 'username',
            type: 'url',
            id: 'account-username',
            value: update_account.user,

            'data-scan-action': 'true',
            onfocus: function () {
              bottom_bar("<img src='assets/image/E1D8.svg'>", '', '');
            },
            onblur: function () {
              bottom_bar('', '', '');
            },
          }),
        ]
      ),
      m(
        'div',
        {
          class: 'item input-parent',
          tabindex: '3',

          onblur: function () {
            bottom_bar('', '', '');
          },
        },
        [
          m('label', { for: 'description' }, 'password'),
          m('input', {
            placeholder: 'password',
            type: 'password',
            id: 'account-password',
            'data-scan-action': 'true',
            value: update_account.password,

            onfocus: function () {
              bottom_bar("<img src='assets/image/E1D8.svg'>", '', '');
            },
            onblur: function () {
              bottom_bar('', '', '');
            },
          }),
        ]
      ),
      m(
        'button',
        {
          class: 'item save-button',
          tabindex: '4',
          onclick: function () {
            store_account(true, status.edit_account_id);
          },
        },
        'update'
      ),
    ]);
  },
};

var page_accounts = {
  view: function () {
    return m('div', { id: 'account-form' }, [
      m(
        'div',
        {
          class: 'item input-parent',
          tabindex: '0',
          oninit: () => {
            view_history_update();
          },
          oncreate: function ({ dom }) {
            dom.focus();
          },
        },
        [
          m('label', { for: 'description' }, 'account name'),
          m('input', {
            placeholder: 'Name',
            type: 'text',
            id: 'account-name',
          }),
        ]
      ),
      m(
        'div',
        {
          class: 'item input-parent',
          tabindex: '1',

          onblur: function () {
            bottom_bar('', '', '');
          },
        },
        [
          m('label', { for: 'description' }, 'server'),
          m('input', {
            placeholder: 'URL',
            type: 'text',
            id: 'account-url',
            'data-scan-action': 'true',
            onfocus: function () {
              bottom_bar("<img src='assets/image/E1D8.svg'>", '', '');
            },
            onblur: function () {
              bottom_bar('', '', '');
            },
          }),
        ]
      ),
      m(
        'div',
        {
          class: 'item input-parent',
          tabindex: '2',

          onblur: function () {
            bottom_bar('', '', '');
          },
        },
        [
          m('label', { for: 'description' }, 'username'),
          m('input', {
            placeholder: 'username',
            type: 'url',
            id: 'account-username',
            'data-scan-action': 'true',
            onfocus: function () {
              bottom_bar("<img src='assets/image/E1D8.svg'>", '', '');
            },
            onblur: function () {
              bottom_bar('', '', '');
            },
          }),
        ]
      ),

      m(
        'div',
        {
          class: 'item input-parent',
          tabindex: '3',

          onblur: function () {
            bottom_bar('', '', '');
          },
        },
        [
          m('label', { for: 'description' }, 'password'),
          m('input', {
            placeholder: 'password',
            type: 'password',
            id: 'account-password',
            'data-scan-action': 'true',
            onfocus: function () {
              bottom_bar("<img src='assets/image/E1D8.svg'>", '', '');
            },
            onblur: function () {
              bottom_bar('', '', '');
            },
          }),
        ]
      ),
      m(
        'button',
        {
          class: 'item save-button',
          tabindex: '4',
          onclick: function () {
            store_account();
          },
        },
        'save'
      ),
    ]);
  },
};
let focused_element = null;

let callback_get_contact = (e) => {
  document.getElementById(focused_element).value = e;
};
var page_add_event = {
  view: function () {
    return m(
      'div',
      {
        id: 'add-edit-event',
        tabindex: '0',
        oninit: () => {
          view_history_update();
          status.shortCut = false;
        },
      },
      [
        m(
          'div',
          {
            class: 'item input-parent',
            tabindex: 0,

            oncreate: function ({ dom }) {
              setTimeout(function () {
                dom.focus();
                bottom_bar('', '', '');
              }, 500);
            },
          },
          [
            m('label', { for: 'event-title' }, 'Title'),
            m('input', {
              placeholder: '',
              type: 'text',
              id: 'event-title',
              oncreate: function () {
                load_settings();
                load_template_data();
              },

              onfocus: () => {
                focused_element = 'event-title';
                bottom_bar('', '', "<img src='assets/image/person.svg'>");
              },

              onblur: () => {
                focused_element = 'event-title';
                bottom_bar('', '', '');
              },
            }),
          ]
        ),

        m('div', { class: 'item input-parent', tabindex: '1' }, [
          m('label', { for: 'event-location' }, 'Location'),
          m('input', {
            placeholder: '',
            type: 'text',
            id: 'event-location',
            oninput: function (m) {
              autocomplete(m.target.value, 'LOCATION');
            },
          }),
        ]),
        m('div', { id: 'search-result' }),

        m(
          'div',
          {
            class: 'item input-parent',
            tabindex: '2',
            onfocus: function () {
              autocomplete('close');
            },
          },
          [
            m('label', { for: 'event-date' }, 'Start Date'),
            m('input', {
              placeholder: settings.dateformat,
              type: 'date',
              id: 'event-date',
              class: 'select-box',

              oncreate: function ({ dom }) {
                dom.value = status.selected_day;
              },
            }),
          ]
        ),

        m('div', { class: 'item input-parent', tabindex: '3' }, [
          m('label', { for: 'event-date-end' }, 'End Date'),
          m('input', {
            placeholder: settings.dateformat,
            type: 'date',
            id: 'event-date-end',
            class: 'select-box',

            oncreate: function ({ dom }) {
              dom.min = status.selected_day;
            },
          }),
        ]),

        m(
          'div',
          {
            class: 'item input-parent flex  justify-content-center',
            tabindex: '4',
          },
          [
            m('label', { for: 'event-all-day' }, 'All Day'),
            m('input', {
              type: 'checkbox',
              id: 'event-all-day',
              class: 'check-box',
              onfocus: function (e) {
                if (e.target.checked == false) {
                  setTimeout(function () {
                    document.querySelector('.check-box').parentElement.focus();
                  }, 300);

                  document.querySelectorAll('.time').forEach((n) => {
                    document.querySelector('#event-time-start').value = '01:00';
                    document.querySelector('#event-time-end').value = '01:00';
                    n.style.display = 'none';
                    n.classList.remove('item');

                    set_tabindex();
                  });
                } else {
                  setTimeout(function () {
                    document.querySelector('.check-box').parentElement.focus();
                  }, 300);

                  document.querySelectorAll('.time').forEach((n) => {
                    n.style.display = 'block';
                    n.classList.add('item');

                    set_tabindex();
                  });
                }
              },
            }),
            m('div', { class: 'ckb-wrapper' }, [
              m('div', { class: 'ckb-icon' }),
              m('div', { class: 'toogle-button' }),
            ]),
          ]
        ),

        m('div', { class: 'item input-parent time', tabindex: '4' }, [
          m('label', { for: 'event-time-start' }, 'Start Time'),
          m('input', {
            placeholder: 'hh:mm',
            type: 'time',
            id: 'event-time-start',
            class: 'select-box',

            oncreate: function ({ dom }) {
              dom.value = dayjs().format('HH:mm');
            },
          }),
        ]),
        m('div', { class: 'item input-parent time', tabindex: '5' }, [
          m('label', { for: 'event-time-end' }, 'End Time'),
          m('input', {
            placeholder: 'hh:mm',
            type: 'time',
            id: 'event-time-end',
            class: 'select-box',
            onblur: function (e) {
              //compare times
              let m = document.querySelector('#event-date').value;
              let mm =
                document.querySelector('#event-date-end').value != ''
                  ? document.querySelector('#event-date-end').value
                  : document.querySelector('#event-date').value;

              let l = dayjs(
                m + ' ' + document.querySelector('#event-time-start').value
              );
              let ll = dayjs(mm + ' ' + e.target.value);
              if (ll.isAfter(l) == false)
                side_toaster('something is wrong with the time', 2000);
            },

            oncreate: function ({ dom }) {
              console.log('h' + settings.default_duration);
              if (settings.default_duration) {
                dom.value = dayjs()
                  .add(settings.default_duration, 'minutes')
                  .format('HH:mm');
              } else {
                dom.value = dayjs().add(1, 'hour').format('HH:mm');
              }
            },
          }),
        ]),

        m('div', { class: 'item input-parent', tabindex: '6' }, [
          m('label', { for: 'event-description' }, 'Description'),
          m('input', {
            placeholder: '',
            type: 'text',
            id: 'event-description',
          }),
        ]),

        m('div', { class: 'item input-parent', tabindex: '6' }, [
          m('label', { for: 'event-category' }, 'Category'),
          m('input', {
            placeholder: '',
            type: 'text',
            id: 'event-category',
          }),
        ]),

        m(
          'div',
          {
            class: 'item input-parent',
            id: 'event-notification-time-wrapper',
            tabindex: '7',
          },
          [
            m('label', { for: 'notification' }, 'Notification'),
            m(
              'select',
              {
                id: 'event-notification-time',
                class: 'select-box',
                oncreate: function () {
                  setTimeout(function () {
                    document.querySelector('#event-notification-time').value =
                      settings.default_notification;
                  }, 2000);
                },
              },
              [
                m('option', { value: 'none' }, 'none'),
                m('option', { value: '5' }, '5 minutes'),
                m('option', { value: '10' }, '10 minutes'),
                m('option', { value: '30' }, '30 minutes'),
                m('option', { value: '60' }, '60 minutes'),
                m('option', { value: '1440' }, '1 Day'),
              ]
            ),
          ]
        ),

        m(
          'div',
          {
            class: 'item input-parent',
            id: 'event-recur-wrapper',
            tabindex: '8',
            oncreate: function () {
              setTimeout(function () {
                document.querySelector('#event-recur').value = 'none';
              }, 1000);
            },
          },
          [
            m('label', { for: 'event-recur' }, 'Recur'),
            m('select', { id: 'event-recur', class: 'select-box' }, [
              m('option', { value: 'none' }, 'none'),
              m('option', { value: 'DAILY' }, 'Daily'),
              m('option', { value: 'WEEKLY' }, 'Weekly'),
              m('option', { value: 'BIWEEKLY' }, 'Biweekly'),
              m('option', { value: 'MONTHLY' }, 'Monthly'),
              m('option', { value: 'YEARLY' }, 'Yearly'),
            ]),
          ]
        ),

        m(
          'div',
          {
            class: 'item input-parent',
            id: 'event-calendar-wrapper',
            tabindex: '9',
          },
          [
            m('label', { for: 'event-calendar' }, 'Calendars'),
            m('select', { id: 'event-calendar', class: 'select-box' }, [
              calendar_names.map(function (item) {
                return m(
                  'option',
                  {
                    value: item.id,
                    'data-calendar-data': item.data,
                  },
                  item.name
                );
              }),
            ]),
          ]
        ),

        m(
          'button',
          {
            tabindex: '10',
            id: 'save-event',
            class: 'item save-button',
            oncreate: function () {
              focus_after_selection();
              set_tabindex();
            },
            onclick: function () {
              let n = document.getElementById('event-calendar');
              store_event(
                n.options[n.selectedIndex].value,
                n.options[n.selectedIndex].text
              );
            },
          },
          'save'
        ),
      ]
    );
  },
  oncreate: function () {
    bottom_bar('', '', '');
  },
};
var page_edit_event = {
  view: function () {
    return m(
      'div',
      {
        id: 'add-edit-event',
        oninit: () => {},
        omcreate: () => {
          view_history_update();
          status.shortCut = false;
        },
      },
      [
        m(
          'div',
          {
            class: 'item input-parent',
            tabindex: 0,
            oncreate: function ({ dom }) {
              setTimeout(function () {
                dom.focus();
                bottom_bar('', '', '');
              }, 500);
            },
          },
          [
            m('label', { for: 'event-title' }, 'Title'),
            m('input', {
              placeholder: '',
              type: 'text',
              id: 'event-title',
              value: update_event_date.SUMMARY,
            }),
          ]
        ),

        m('div', { class: 'item input-parent', tabindex: '1' }, [
          m('label', { for: 'event-location' }, 'Location'),
          m('input', {
            placeholder: '',
            type: 'text',
            id: 'event-location',
            value: update_event_date.LOCATION,
          }),
        ]),

        m('div', { class: 'item input-parent', tabindex: '2' }, [
          m('label', { for: 'event-date' }, 'Start Date'),
          m('input', {
            placeholder: settings.dateformat,
            type: 'date',
            id: 'event-date',
            class: 'select-box',

            oncreate: function ({ dom }) {
              dom.value = update_event_date.dateStart;
            },
          }),
        ]),

        m('div', { class: 'item input-parent', tabindex: '3' }, [
          m('label', { for: 'event-date-end' }, 'End Date'),
          m('input', {
            placeholder: settings.dateformat,
            type: 'date',
            id: 'event-date-end',
            class: 'select-box',

            oncreate: function ({ dom }) {
              dom.value = update_event_date.dateEnd;
            },
          }),
        ]),

        m('div', { class: 'item input-parent', tabindex: '4' }, [
          m('label', { for: 'event-all-day' }, 'All Day'),
          m('input', {
            type: 'checkbox',
            id: 'event-all-day',
            class: 'check-box',
            oncreate: function () {
              if (update_event_date.allDay == true) {
                document.querySelector('#event-all-day').checked = true;

                document.querySelectorAll('.time').forEach((e) => {
                  e.style.display = 'none';
                  e.classList.remove('item');

                  set_tabindex();
                });
              }
            },
            onfocus: function (e) {
              if (e.target.checked == false) {
                setTimeout(function () {
                  e.focus();
                }, 300);

                document.querySelectorAll('.time').forEach((e) => {
                  e.style.display = 'none';
                  e.classList.remove('item');
                  document.querySelector('#event-time-start').value = '01:00';
                  document.querySelector('#event-time-end').value = '01:00';

                  set_tabindex();
                });
              } else {
                setTimeout(function () {
                  e.focus();
                }, 300);

                document.querySelectorAll('.time').forEach((e) => {
                  e.style.display = 'block';
                  e.classList.add('item');

                  set_tabindex();
                });
              }
            },
          }),
          m('div', { class: 'ckb-wrapper' }, [
            m('div', { class: 'ckb-icon' }),
            m('div', { class: 'toogle-button' }),
          ]),
        ]),

        m('div', { class: 'item input-parent time', tabindex: '4' }, [
          m('label', { for: 'event-time-start' }, 'Start Time'),
          m('input', {
            placeholder: 'HH:mm',
            type: 'time',
            id: 'event-time-start',
            class: 'select-box',
            value:
              update_event_date.time_start.length == 8
                ? update_event_date.time_start.slice(0, -3)
                : update_event_date.time_start,
          }),
        ]),
        m('div', { class: 'item input-parent time', tabindex: '5' }, [
          m('label', { for: 'event-time-end' }, 'End Time'),
          m('input', {
            placeholder: 'hh:mm',
            type: 'time',
            id: 'event-time-end',
            class: 'select-box',
            value:
              update_event_date.time_end.length == 8
                ? update_event_date.time_end.slice(0, -3)
                : update_event_date.time_end,
          }),
        ]),
        m('div', { class: 'item input-parent', tabindex: '6' }, [
          m('label', { for: 'event-description' }, 'Description'),
          m('input', {
            placeholder: '',
            type: 'text',
            id: 'event-description',
            value: update_event_date.DESCRIPTION,
          }),
        ]),

        m('div', { class: 'item input-parent', tabindex: '6' }, [
          m('label', { for: 'event-category' }, 'Category'),
          m('input', {
            placeholder: '',
            type: 'text',
            id: 'event-category',
            value: update_event_date.CATEGORIES,
          }),
        ]),

        m(
          'div',
          {
            class: 'item input-parent',
            id: 'event-notification-time-wrapper',
            tabindex: '7',
          },
          [
            m('label', { for: 'notification' }, 'Notification'),
            m(
              'select',
              {
                id: 'event-notification-time',
                class: 'select-box',
              },
              [
                m('option', { value: 'none' }, 'none'),
                m('option', { value: '5' }, '5 minutes'),
                m('option', { value: '10' }, '10 minutes'),
                m('option', { value: '30' }, '30 minutes'),
                m('option', { value: '60' }, '60 minutes'),
                m('option', { value: '1440' }, '1 Day'),
              ]
            ),
          ]
        ),

        m(
          'div',
          {
            class: 'item input-parent',
            id: 'event-calendar-wrapper',
            tabindex: '9',
          },
          [
            m('label', { for: 'event-calendar' }, 'Calendars'),
            m(
              'select',
              {
                id: 'event-calendar',
                class: 'select-box',
                onchange: () => {
                  status.event_calendar_changed = true;
                },
              },
              [
                calendar_names.map(function (item, index) {
                  let t = '';
                  if (update_event_date.calendar_name == item.name) {
                    t = 'selected';
                  }

                  return m(
                    'option',
                    {
                      value: item.id,
                      selected: t,
                      'data-calendar-data': item.data,
                    },
                    item.name
                  );
                }),
              ]
            ),
          ]
        ),

        m(
          'div',
          {
            class: 'item input-parent',
            id: 'event-recur-wrapper',
            tabindex: '8',
            oncreate: function () {
              document.querySelector('#event-notification-time').value =
                update_event_date.alarm;
            },
          },
          [
            m('label', { for: 'event-recur' }, 'Recur'),

            m(
              'select',
              {
                id: 'event-recur',
                value: update_event_date.RRULE.freq ?? 'none',
                class: 'select-box',
              },
              [
                m('option', { value: 'none' }, 'none'),
                m('option', { value: 'DAILY' }, 'Daily'),
                m('option', { value: 'WEEKLY' }, 'Weekly'),
                m('option', { value: 'BIWEEKLY' }, 'Biweekly'),
                m('option', { value: 'MONTHLY' }, 'Monthly'),
                m('option', { value: 'YEARLY' }, 'Yearly'),
              ]
            ),
          ]
        ),

        m(
          'button',
          {
            tabindex: '9',
            id: 'delete-event',
            class: 'item',
            onclick: function () {
              delete_event(
                update_event_date.etag,
                update_event_date.url,
                update_event_date.id,
                update_event_date.UID
              );
            },
          },
          'delete'
        ),

        m(
          'button',
          {
            tabindex: '10',
            id: 'save-event',
            class: 'item save-button',
            oncreate: () => {
              focus_after_selection();
            },
            onclick: function () {
              if (!status.event_calendar_changed) {
                update_event(
                  update_event_date.etag,
                  update_event_date.url,
                  update_event_date.id,
                  update_event_date.id,
                  update_event_date.UID,
                  update_event_date.calendar_name
                );
              }
              if (status.event_calendar_changed) {
                //you can cut bread nice and fine with a knife, or just tear it into pieces.
                let n = document.getElementById('event-calendar');
                store_event(
                  n.options[n.selectedIndex].value,
                  n.options[n.selectedIndex].text
                );
                setTimeout(() => {
                  delete_event(
                    update_event_date.etag,
                    update_event_date.url,
                    update_event_date.id,
                    update_event_date.UID
                  );
                }, 1000);
              }
            },
          },
          'update'
        ),

        m(
          'button',
          {
            tabindex: '11',
            id: 'save-event-as-template',
            class: 'item save-template-button',
            oncreate: () => {
              focus_after_selection();
            },
            onclick: function () {
              store_event_as_template(
                document.getElementById('event-title').value,
                document.getElementById('event-description').value,
                document.getElementById('event-location').value,
                document.getElementById('event-category').value
              );
            },
          },
          'save as template'
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
    parse_ics(result, false, '', '', 'local-id', false);

    let only_local_events = events.filter((events) => events.id == 'local-id');

    localforage
      .setItem('events', only_local_events)
      .then(function () {
        backup_events();
      })
      .catch(function (err) {
        console.log(err);
      });
  } catch (e) {
    alert(
      'event could not be imported because the file content is invalid' + e
    );
  }
};

var page_list_files = {
  view: function () {
    return m(
      'div',
      {
        id: 'options',
        oninit: () => {
          view_history_update();
        },
      },
      [
        m('h2', { class: 'text-center', id: 'file-head' }, 'files'),
        file_list.map(function (e, index) {
          let fn = e.split('/');
          fn = fn[fn.length - 1];

          // if (fn == "greg.ics") return false;
          return m(
            'button',
            {
              class: 'item',
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
      'div',
      {
        id: 'options',
        oninit: () => {
          view_history_update();
        },
        oncreate: function () {
          bottom_bar(
            "<img src='assets/image/delete.svg'>",
            "<img src='assets/image/add.svg'>",
            ''
          );
        },
      },
      [
        m('h2', { class: 'text-center' }, 'Templates'),
        event_templates.map(function (item, index) {
          return m(
            'button',
            {
              class: 'item',
              onclick: function () {
                selected_template = item.id;
                m.route.set('/page_add_event');
              },
              oncreate: function ({ dom }) {},
              tabIndex: index,
              'data-id': item.id,
            },
            item.title
          );
        }),
      ]
    );
  },
};
let kk = '/page_calendar';

m.route(root, kk, {
  '/page_calendar': page_calendar,
  '/page_events': page_events,
  '/page_options': page_options,
  '/page_add_event': page_add_event,
  '/page_edit_event': page_edit_event,
  '/page_subscriptions': page_subscriptions,
  '/page_accounts': page_accounts,
  '/page_edit_account': page_edit_account,
  '/page_event_templates': page_event_templates,
  '/page_list_files': page_list_files,
  '/page_events_filtered': page_events_filtered,
});
m.route.prefix = '#';

let store_settings = function () {
  settings.default_notification = document.getElementById(
    'default-notification-time'
  ).value;

  settings.default_duration = document.getElementById(
    'default-duration-time'
  ).value;

  settings.dateformat = document.getElementById('event-date-format').value;
  settings.firstday = document.getElementById('first-day-of-the-week').value;
  settings.eventsfilter = document.getElementById(
    'events-category-filter'
  ).value;

  settings.background_sync = document.getElementById('background-sync').value;

  if (settings.background_sync == 'Yes') {
    restart_background_sync();
  } else {
    remove_sync_alarm();
  }

  localforage
    .setItem('settings', settings)
    .then(function () {})
    .catch(function (err) {
      console.log(err);
    });
};

let callback_scan = function (url) {
  document.activeElement.value = url;
};

let store_subscription = function () {
  if (
    validate(document.getElementById('cal-subs-url').value) &&
    document.getElementById('cal-subs-name').value != ''
  ) {
    let id = uid(32);
    subscriptions.push({
      url: document.getElementById('cal-subs-url').value,
      name: document.getElementById('cal-subs-name').value,
      id: id,
    });

    document.querySelector('input#cal-subs-name').val = '';
    document.querySelector('input#cal-subs-url').val = '';

    localforage.setItem('subscriptions', subscriptions).then(function (value) {
      m.route.set('/page_options');
    });
    //create db to store data
    localforage
      .setItem(id, '')
      .then(function (value) {
        side_toaster('subscription added', 4000);
        load_subscriptions();
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  } else {
    side_toaster('Please enter a name and a valid url', 2000);
  }
};

let store_account = function (edit, id) {
  if (
    validate(document.getElementById('account-url').value) &&
    document.getElementById('account-name').value != '' &&
    document.getElementById('account-username').value != '' &&
    document.getElementById('account-password').value != ''
  ) {
    if (edit) {
      const newArr = accounts.filter((object) => {
        return object.id !== id;
      });

      accounts = newArr;

      accounts.push({
        server_url: document.getElementById('account-url').value,
        user: document.getElementById('account-username').value,
        password: document.getElementById('account-password').value,
        name: document.getElementById('account-name').value,
        id: id,
        type: 'basic',
      });
    } else {
      accounts.push({
        server_url: document.getElementById('account-url').value,
        user: document.getElementById('account-username').value,
        password: document.getElementById('account-password').value,
        name: document.getElementById('account-name').value,
        id: uid(32),
        type: 'basic',
      });
    }

    localforage
      .setItem('accounts', accounts)
      .then(function (value) {
        side_toaster(
          'the calendar events will be loaded the next time the app is restarted',
          30000
        );
        m.route.set('/page_options');
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  } else {
    toaster('Please enter a name and a valid url', 2000);
  }
};

let delete_subscription = function () {
  let updated_subscriptions = subscriptions.filter(
    (e) => e.id != document.activeElement.getAttribute('data-id')
  );

  localforage
    .removeItem(document.activeElement.getAttribute('data-id'))
    .then(function () {
      toaster('subscription removed', 4000);
    })
    .catch(function (err) {
      console.log(err);
    });

  localforage
    .setItem('subscriptions', updated_subscriptions)
    .then(function (value) {
      //Do other things once the value has been saved.
      side_toaster('subscription deleted', 2000);
    })
    .catch(function (err) {
      // This code runs if there were any errors
      toaster(err, 2000);
    });

  document.activeElement.remove();
};

let delete_account = function () {
  let updated_subscriptions = accounts.filter(
    (e) => e.id != document.activeElement.getAttribute('data-id')
  );

  localforage
    .setItem('accounts', updated_subscriptions)
    .then(function (value) {
      //Do other things once the value has been saved.
      side_toaster('account deleted', 2000);
      document.activeElement.remove();
      bottom_bar('', '', '');
    })
    .catch(function (err) {
      // This code runs if there were any errors
      toaster(err, 2000);
    });

  localforage
    .removeItem(document.activeElement.getAttribute('data-id'))
    .then(function () {})
    .catch(function (err) {
      console.log(err);
    });
};

//load indexedDB

localforage
  .getItem('events')
  .then(function (value) {
    if (value != null) {
      events = value;
      try {
        style_calendar_cell(currentYear, currentMonth);
      } catch (e) {
        console.log(e);
      }
    } else {
    }
  })
  .catch(function (err) {});

localforage
  .getItem('subscriptions')
  .then(function (s) {
    subscriptions = s;

    load_subscriptions();
  })
  .catch(function (err) {});

function handleVisibilityChange() {
  if (document.visibilityState === 'hidden') {
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
    .setItem('event_templates', event_templates)
    .then(function (value) {
      side_toaster('template deleted', 2000);
      m.route.set('/page_calendar');
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
      document.getElementById('event-title').value = e.title;
      document.getElementById('event-description').value = e.description;
      document.getElementById('event-location').value = e.location;
      document.getElementById('event-category').value = e.category;

      selected_template = '';
    }
  });
};
/////////////////
///NAVIGATION
/////////////////

let nav = function (move) {
  set_tabindex();
  if (
    document.activeElement.nodeName == 'SELECT' ||
    document.activeElement.type == 'date' ||
    document.activeElement.type == 'time'
  ) {
    return false;
  }

  const currentIndex = document.activeElement.tabIndex;
  let next = currentIndex + move;
  let items = 0;

  if (
    m.route.get() == '/page_calendar' ||
    m.route.get() == '/page_options' ||
    m.route.get() == '/page_events' ||
    m.route.get() == '/page_event_templates' ||
    m.route.get() == '/page_list_files' ||
    m.route.get().startsWith('/page_events')
  ) {
    let b = document.activeElement.parentNode.parentNode;
    items = b.querySelectorAll('.item:not([style*="display: none"]');
    status.shortCut = false;
  }

  if (m.route.get() == '/page_calendar') {
    status.shortCut = false;
    bottom_bar(
      "<img src='assets/image/add.svg'>",
      "<img src='assets/image/list.svg'>",
      "<img src='assets/image/option.svg'>"
    );
  }

  if (
    m.route.get() == '/page_subscriptions' ||
    m.route.get() == '/page_accounts' ||
    m.route.get() == '/page_edit_account'
  ) {
    let b = document.activeElement.parentNode.parentNode;
    items = b.querySelectorAll('.item');
  }

  if (
    m.route.get() == '/page_add_event' ||
    m.route.get() == '/page_edit_event'
  ) {
    items = document.querySelectorAll('.item');

    if (document.activeElement.parentNode.classList.contains('input-parent')) {
      document.activeElement.parentNode.focus();
      return true;
    } else {
      document.getElementById('add-edit-event').firstElementChild.focus();
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

  let scrollContainer = document.activeElement.parentNode;

  // Find the first scrollable parent
  while (scrollContainer) {
    if (
      scrollContainer.scrollHeight > scrollContainer.clientHeight ||
      scrollContainer.scrollWidth > scrollContainer.clientWidth
    ) {
      break;
    }
    scrollContainer = scrollContainer.parentNode;
  }

  if (scrollContainer) {
    scrollContainer.scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: 'smooth',
    });
  } else {
    // If no scrollable parent is found, scroll the document body
    document.body.scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: 'smooth',
    });
  }

  if (
    m.route.get() == '/page_calendar' ||
    m.route.get() == '/page_events' ||
    m.route.get().startsWith('/page_events')
  ) {
    try {
      status.selected_day = targetElement.getAttribute('data-date');
      status.selected_day_id = targetElement.getAttribute('data-id');
      event_slider(status.selected_day);
    } catch (e) {}
  }
};

let add_alarm = function (date, message_text, id, type) {
  // KaiOs  2.xx
  if ('mozAlarms' in navigator) {
    // This is arbitrary data pass to the alarm
    var data = {
      note: message_text,
      event_id: id,
      type: type,
    };

    var request = navigator.mozAlarms.add(date, 'honorTimezone', data);

    request.onsuccess = function () {
      console.log('alarm set');
    };

    request.onerror = function () {
      console.log('An error occurred: ' + this.error.name);
    };
  }

  // KaiOs  3.xx
  if ('b2g' in navigator) {
    try {
      let options = {
        date: date,
        data: { note: message_text, type: type },
        ignoreTimezone: false,
      };

      navigator.b2g.alarmManager.add(options).then(
        (id) => console.log('add id: ' + id),
        (err) => console.log('add err: ' + err)
      );
    } catch (e) {
      console.log(e);
    }
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
            console.log('removed');
          };

          req.onerror = function () {
            console.log('An error occurred: ' + this.error.name);
          };
        } else {
          console.log('no alarm founded');
        }
      });
    };

    request.onerror = function () {
      console.log('An error occurred:', this.error.name);
    };
  }
  // KaiOs  3.xx
  if ('b2g' in navigator) {
    try {
      let request = navigator.b2g.alarmManager.getAll();

      request.onsuccess = function () {
        this.result.forEach(function (alarm) {
          if (alarm.data.event_id == id) {
            let req = navigator.b2g.alarmManager.remove(alarm.id);

            req.onsuccess = function () {
              console.log('removed');
            };

            req.onerror = function () {
              console.log('An error occurred: ' + this.error.name);
            };
          } else {
            console.log('no alarm founded');
          }
        });
      };
    } catch (e) {
      console.log(e);
    }
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

const convert_ics_date = function (t, ful, k) {
  let nn = dayjs(t).format('YYYYMMDDTHHmmss');

  if (ful) {
    nn = ';VALUE=DATE:' + dayjs(t).format('YYYYMMDD');
  } else {
    nn = ':' + nn;
  }
  if (k) nn = dayjs(t).format('YYYYMMDDTHHmmss');

  return nn;
};

const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

const rrule_convert = function (val, date_end, date_start) {
  if (val === 'none') {
    return '';
  }

  const f = days[new Date(date_start).getDay()];

  if (val === 'WEEKLY') {
    return `FREQ=${val};INTERVAL=1;BYDAY=${f};UNTIL=${convert_ics_date(
      date_end,
      false,
      true
    )}`;
  }

  return `FREQ=${val};UNTIL=${convert_ics_date(date_end, false, true)}`;
};

//local calendar are stored in events var -> localForage
//caldav calendars are stored in object -> localforage

let export_data = [];

let store_event = function (db_id, cal_name) {
  let validation = true;

  let allDay = false;

  if (document.getElementById('event-all-day').checked === true) {
    allDay = true;
  }

  if (document.getElementById('event-title').value === '') {
    toaster("Title can't be empty", 2000);
    validation = false;
  }

  if (document.getElementById('event-recur').value != 'none') {
    if (document.getElementById('event-date-end').value == '') {
      toaster('An end date is required for a recurrence', 2000);
      validation = false;
    }
  }

  const startTimeInput = document.getElementById('event-time-start');
  const start_time = startTimeInput.value
    ? `${startTimeInput.value}:00`
    : '00:00:00';

  const endTimeInput = document.getElementById('event-time-end');
  const end_time = endTimeInput.value ? `${endTimeInput.value}:00` : '00:00:00';

  var time1Date = new Date('01/01/2000 ' + start_time);
  var time2Date = new Date('01/01/2000 ' + end_time);

  let convert_dt_start =
    document.getElementById('event-date').value + ' ' + start_time;

  if (document.getElementById('event-date-end').value == '')
    document.getElementById('event-date-end').value =
      document.getElementById('event-date').value;

  let convert_dt_end =
    document.getElementById('event-date-end').value + ' ' + end_time;
  //allDay set end day
  if (allDay) {
    let h = dayjs(
      document.getElementById('event-date-end').value + ' ' + end_time
    )
      .add(1, 'day')
      .format('YYYY-MM-DD hh:mm:ss');

    convert_dt_end = h;
  }

  let rrule_dt_end =
    document.getElementById('event-date').value + ' ' + end_time;

  // notification before event
  let notification_time = document.getElementById(
    'event-notification-time'
  ).value;

  let bn = notification_time;

  let calc_notification;
  if (notification_time !== 'none') {
    calc_notification = new Date(convert_dt_start);
    calc_notification.setMinutes(
      calc_notification.getMinutes() - notification_time
    );

    notification_time = convert_ics_date(calc_notification.toISOString());
  }

  if (start_time != '' && end_time != '') {
    var time1Date = new Date(
      document.getElementById('event-date').value + ' ' + start_time
    );
    var time2Date = new Date(
      document.getElementById('event-date-end').value + ' ' + end_time
    );
    if (time2Date < time1Date) {
      toaster(
        'The time is not correct. Do you want to set the time to the next day? please change the date',
        3000
      );
      validation = false;
    }
  }

  if (validation === false) return false;
  let event = {
    UID: uid(32),
    SUMMARY: document.getElementById('event-title').value,
    LOCATION: document.getElementById('event-location').value,
    DESCRIPTION: document.getElementById('event-description').value,
    CATEGORIES: document.getElementById('event-category').value,
    'LAST-MODIFIED':
      ';TZID=' + settings.timezone + convert_ics_date(convert_dt_start),
    CLASS: 'PRIVATE',
    DTSTAMP: ';TZID=' + settings.timezone + convert_ics_date(convert_dt_start),
    DTSTART:
      ';TZID=' + settings.timezone + convert_ics_date(convert_dt_start, allDay),
    DTEND:
      ';TZID=' + settings.timezone + convert_ics_date(convert_dt_end, allDay),
    RRULE:
      document.getElementById('event-recur').value == 'none'
        ? ''
        : rrule_convert(
            document.getElementById('event-recur').value,
            convert_dt_end,
            document.getElementById('event-date').value
          ),

    dateStart: document.getElementById('event-date').value,
    dateEnd: document.getElementById('event-date-end').value,
    time_start: document.getElementById('event-time-start').value,
    time_end: document.getElementById('event-time-end').value,
    alarm: document.getElementById('event-notification-time').value,
    alarmTrigger: notification_time,
    isSubscription: false,
    isCaldav: db_id == 'local-id' ? false : true,
    id: db_id,
    allDay: allDay,
  };

  if (event.alarm !== 'none') {
    event.BEGIN = 'VALARM';
    event['TRIGGER;VALUE=DATE-TIME'] = notification_time;
    event.ACTION = 'AUDIO';
    event.END = 'VALARM';
    try {
      add_alarm(
        calc_notification,
        event.SUMMARY + ' ' + event.time_start ?? '',
        event.UID,
        'alarm'
      );
    } catch (e) {
      console.log(e);
    }
  }

  let dd =
    'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ZContent.net//Greg Calendar 1.0//EN\nCALSCALE:GREGORIAN\nX-WR-CALNAME:local\nBEGIN:VEVENT\nSUMMARY:' +
    event.SUMMARY +
    '\nUID:' +
    event.UID +
    '\nRRULE:' +
    event.RRULE +
    '\nLAST-MODIFIED' +
    event['LAST-MODIFIED'] +
    '\nDTSTART' +
    event.DTSTART +
    '\nDTEND' +
    event.DTEND +
    '\nDTSTAMP' +
    event.DTSTAMP +
    '\nLOCATION:' +
    event.LOCATION +
    '\nDESCRIPTION:' +
    event.DESCRIPTION +
    '\nCATEGORIES:' +
    event.CATEGORIES +
    '\nEND:VEVENT\nEND:VCALENDAR';

  if (event.id == 'local-id') {
    if (!event.RRULE) {
      delete event.RRULE;
    }

    try {
      dd = dd.trim();
      parse_ics(dd, false, '', '', 'local-id', false, bn);
      sort_array(events, 'dateStartUnix', 'number');
    } catch (e) {
      console.log(e);
    }

    let without_subscription = events.filter(
      (events) => events.id == 'local-id'
    );

    localforage
      .setItem('events', without_subscription)
      .then(function () {
        get_last_view();
        backup_events();
      })
      .catch(function (err) {
        side_toaster('no data to export', 2000);
      });
  } else {
    //caldav
    //rrule event should end on the same day, but rrule.until should set the end date

    if (event.RRULE != '') {
      event.DTEND =
        ';TZID=' + settings.timezone + convert_ics_date(rrule_dt_end, allDay);
    }

    if (event.alarm !== 'none') {
      event.BEGIN = 'VALARM';
      event['TRIGGER;VALUE=DATE-TIME'] = notification_time;
      event.ACTION = 'AUDIO';
      event.END = 'VALARM';
    }

    let alarm = ''; // Initialize alarm as an empty string

    if (notification_time !== null && notification_time !== 'none') {
      alarm = `\nBEGIN:VALARM\nTRIGGER;VALUE=DATE-TIME:${notification_time}\nACTION:AUDIO\nEND:VALARM`;
    }

    let event_data =
      'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ZContent.net//Greg Calendar 1.0//EN\nCALSCALE:GREGORIAN\nBEGIN:VEVENT\nSUMMARY:' +
      event.SUMMARY +
      '\nUID:' +
      event.UID +
      '\nRRULE:' +
      event.RRULE +
      '\nDTSTART' +
      event.DTSTART +
      '\nDTEND' +
      event.DTEND +
      '\nDTSTAMP' +
      event.DTSTAMP +
      '\nLOCATION:' +
      event.LOCATION +
      '\nDESCRIPTION:' +
      event.DESCRIPTION +
      '\nCATEGORIES:' +
      event.CATEGORIES +
      '\nEND:VEVENT' +
      alarm + // Include the alarm section if it's not null or 'none'
      '\nEND:VCALENDAR';

    if (!event.RRULE) {
      event_data = event_data.replace('SEQUENCE:0', '');
      event_data = event_data.replace('RRULE:null', '');
      event_data = event_data.replace('RRULE:', '');
    }

    event_data = event_data.trim();

    create_caldav(event_data, event.id, cal_name, event, event.UID).then(() => {
      get_last_view();
    });
  }
};

// ////////////
// UPDATE EVENT
// /////////
let update_event = function (etag, url, id, db_id, uid) {
  let validation = true;
  if (document.getElementById('event-title').value == '') {
    toaster("Title can't be empty", 2000);
    validation = false;
  }

  if (document.getElementById('event-recur').value != 'none') {
    if (document.getElementById('event-date-end').value == '') {
      toaster('An end date is required for a recurrence', 2000);
      validation = false;
    }
  }

  let start_time = '00:00:00';
  if (document.getElementById('event-time-start').value != '') {
    start_time = document.getElementById('event-time-start').value + ':00';
  }

  let end_time = '00:00:00';
  if (document.getElementById('event-time-end').value != '') {
    end_time = document.getElementById('event-time-end').value + ':00';
  }

  let convert_dt_start =
    document.getElementById('event-date').value + ' ' + start_time;

  if (document.getElementById('event-date-end').value == '')
    document.getElementById('event-date-end').value =
      document.getElementById('event-date').value;

  let convert_dt_end =
    document.getElementById('event-date-end').value + ' ' + end_time;

  let rrule_dt_end =
    document.getElementById('event-date').value + ' ' + end_time;

  //notification before event
  let notification_time = document.getElementById(
    'event-notification-time'
  ).value;

  let calc_notification;
  if (notification_time != 'none') {
    calc_notification = new Date(convert_dt_start);
    calc_notification.setMinutes(
      calc_notification.getMinutes() - notification_time
    );

    notification_time = convert_ics_date(calc_notification.toISOString());
  }

  let allDay = false;

  if (document.getElementById('event-all-day').checked == true) {
    allDay = true;
  }

  //allDay set end day
  if (allDay) {
    let h = dayjs(
      document.getElementById('event-date-end').value + ' ' + end_time
    )
      .add(1, 'day')
      .format('YYYY-MM-DD hh:mm:ss');

    convert_dt_end = h;
  }

  let lastmod =
    ';TZID=' + settings.timezone + convert_ics_date(convert_dt_start);
  let dtstamp =
    ';TZID=' + settings.timezone + convert_ics_date(convert_dt_start);

  let dtstart =
    ';TZID=' + settings.timezone + convert_ics_date(convert_dt_start, allDay);

  let dtend =
    ';TZID=' + settings.timezone + convert_ics_date(convert_dt_end, allDay);

  if (validation == false) return false;
  let event = {
    UID: uid,
    SUMMARY: document.getElementById('event-title').value,
    LOCATION: document.getElementById('event-location').value,
    DESCRIPTION: document.getElementById('event-description').value,
    CATEGORIES: document.getElementById('event-category').value,
    CLASS: 'PRIVATE',
    'LAST-MODIFIED': lastmod,
    DTSTAMP: dtstamp,
    DTSTART: dtstart,
    DTEND: dtend,
    RRULE:
      document.getElementById('event-recur').value == 'none'
        ? ''
        : rrule_convert(
            document.getElementById('event-recur').value,
            convert_dt_end,
            document.getElementById('event-date').value
          ),

    dateStart: document.getElementById('event-date').value,
    dateEnd: document.getElementById('event-date-end').value,
    time_start:
      allDay == false ? document.getElementById('event-time-start').value : '',
    time_end:
      allDay == false ? document.getElementById('event-time-end').value : '',
    alarm: document.getElementById('event-notification-time').value,
    alarmTrigger: notification_time,
    isSubscription: false,
    isCaldav: db_id == 'local-id' ? false : true,
    id: db_id,
    calendar_name: document.getElementById('event-calendar').value,
    allDay: allDay,
  };

  if (event.alarm !== 'none') {
    event.BEGIN = 'VALARM';
    event['TRIGGER;VALUE=DATE-TIME'] = notification_time;
    event.ACTION = 'AUDIO';
    event.END = 'VALARM';

    remove_alarm(event.UID);
    add_alarm(
      calc_notification,
      event.SUMMARY + ' ' + event.time_start ?? '',
      event.UID,
      'alarm'
    );
  }

  let dd =
    'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ZContent.net//Greg Calendar 1.0//EN\nCALSCALE:GREGORIAN\nX-WR-CALNAME:local\nBEGIN:VEVENT\nSUMMARY:' +
    event.SUMMARY +
    '\nUID:' +
    event.UID +
    '\nRRULE:' +
    event.RRULE +
    '\nLAST-MODIFIED' +
    event['LAST-MODIFIED'] +
    '\nDTSTART' +
    event.DTSTART +
    '\nDTEND' +
    event.DTEND +
    '\nDTSTAMP' +
    event.DTSTAMP +
    '\nLOCATION:' +
    event.LOCATION +
    '\nDESCRIPTION:' +
    event.DESCRIPTION +
    '\nCATEGORIES:' +
    event.CATEGORIES +
    '\nEND:VEVENT\nEND:VCALENDAR';

  events = events.filter((person) => person.UID != uid);
  //remove orginal event
  //to replace with new content

  if (db_id == 'local-id') {
    try {
      parse_ics(dd, false, '', '', 'local-id', false, event.alarm);
    } catch (e) {
      console.log(e);
    }

    let without_subscription = events.filter(
      (events) => events.id == 'local-id'
    );

    localforage
      .setItem('events', without_subscription)
      .then(function () {
        clear_form();
        backup_events();
        setTimeout(function () {
          get_last_view();
        }, 200);
      })
      .catch(function (err) {
        console.log(err);
        side_toaster('no data to export', 2000);
      });
  } else {
    try {
      parse_ics(dd, false, '', '', db_id, false, event.alarm);
      style_calendar_cell(currentYear, currentMonth);
    } catch (e) {
      console.log('error parsing' + e);
    }
    //caldav
    //rrule event should end on the same day, but rrule.until should set the end date
    // Check if notification_time is not null or "none" before adding the alarm
    const isNotificationTimeValid =
      notification_time !== null && notification_time.toLowerCase() !== 'none';
    const alarm = isNotificationTimeValid
      ? `\nBEGIN:VALARM\nTRIGGER;VALUE=DATE-TIME:${notification_time}\nACTION:AUDIO\nEND:VALARM`
      : '';

    if (event.RRULE !== '') {
      event.DTEND =
        ';TZID=' + settings.timezone + convert_ics_date(rrule_dt_end, allDay);
    }
    let event_data =
      'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ZContent.net//Greg Calendar 1.0//EN\nCALSCALE:GREGORIAN\nBEGIN:VEVENT\nSUMMARY:' +
      event.SUMMARY +
      '\nUID:' +
      event.UID +
      '\nRRULE:' +
      event.RRULE +
      '\nDTSTART' +
      event.DTSTART +
      '\nDTEND' +
      event.DTEND +
      '\nDTSTAMP' +
      event.DTSTAMP +
      '\nLOCATION:' +
      event.LOCATION +
      '\nDESCRIPTION:' +
      event.DESCRIPTION +
      '\nCATEGORIES:' +
      event.CATEGORIES +
      '\nEND:VEVENT' +
      alarm +
      '\nEND:VCALENDAR';
    if (event.RRULE == null || event.RRULE == '') {
      event_data = event_data.replace('SEQUENCE:0', '');
      event_data = event_data.replace('RRULE:null', '');
      event_data = event_data.replace('\nRRULE:', '');
    }
    event_data = event_data.replace('\n\n', '\n');
    event_data = event_data.trim();

    update_caldav(etag, url, event_data, id);
  }
};

//////////////
//DELETE EVENT
///////////

let delete_event = function (etag, url, account_id, uid) {
  if (etag) {
    delete_caldav(etag, url, account_id, uid).then((e) => {});
  } else {
    //remove event

    events = events.filter((person) => person.UID != uid);
    remove_alarm(uid);
    //store only local events
    let without_subscription = events.filter(
      (event) => event.id === 'local-id'
    );

    localforage
      .setItem('events', without_subscription)
      .then(function (value) {
        backup_events();
        setTimeout(() => {
          style_calendar_cell(currentYear, currentMonth);
          get_last_view();
        }, 1000);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
};

export let set_tabindex = () => {
  document
    .querySelectorAll('.item:not([style*="display: none"]')
    .forEach((e, i) => {
      if (e.style.display != 'none') {
        e.setAttribute('tabindex', i);
      } else {
        e.setAttribute('tabindex', -1);
      }
    });
};
let h = 0;

const sort_events = () => {
  let sort_mode = settings.eventsfilter
    ? ['dateEndUnix', 'lastmod', settings.eventsfilter]
    : ['dateEndUnix', 'lastmod'];

  h++;
  if (h === sort_mode.length) h = 0;

  document.getElementById('search').value = '';

  if (h == 2) {
    m.route.set('/page_events_filtered', { query: settings.eventsfilter });
  } else {
    sort_array(events, sort_mode[h], 'date').then(() => {
      m.redraw();
      if (h == 0) side_toaster('latest', 4000);
      document.getElementById('search').focus();

      if (h == 1) side_toaster('last modified', 4000);
      document.getElementById('search').focus();
    });
  }
};

let backup_events = function () {
  localforage
    .getItem('events')
    .then(function (value) {
      // Make sure value is not null or undefined
      if (value) {
        let only_local_events = value.filter((event) => event.id == 'local-id');

        try {
          export_ical('others/greg.ics', only_local_events);
        } catch (e) {
          console.log(e);
        }
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};

let stop_scan_callback = function () {
  document.getElementById('qr-screen').style.display = 'none';
};

// ////////////////////////////
// //KEYPAD HANDLER////////////
// ////////////////////////////

let longpress = false;
const longpress_timespan = 1000;
let timeout;

function repeat_action(param) {
  switch (param.key) {
    case '0':
      break;
  }
}

// ////////////
// //LONGPRESS
// ///////////

function longpress_action(param) {
  switch (param.key) {
    case 'Backspace':
      window.close();
      break;

    case 'SoftLeft':
    case 'm':
      if (event_templates.length == 0) {
        side_toaster('no templates found', 3000);
        return false;
      } else {
        m.route.set('/page_event_templates');
      }

      break;
  }
}

// /////////////
// //SHORTPRESS
// ////////////
function shortpress_action(param) {
  switch (param.key) {
    case '*':
      if (m.route.get() == '/page_calendar') {
        jump_to_today();
      }
      if (m.route.get() == '/page_events') {
        find_closest_date(true);
      }

      break;

    case 'ArrowUp':
      if (m.route.get() == '/page_calendar') {
        nav(-7);
      }
      if (
        m.route.get() == '/page_events' ||
        m.route.get() == '/page_options' ||
        m.route.get() == '/page_subscriptions' ||
        m.route.get() == '/page_accounts' ||
        m.route.get() == '/page_edit_account' ||
        m.route.get() == '/page_add_event' ||
        m.route.get() == '/page_edit_event' ||
        m.route.get() == '/page_event_templates' ||
        m.route.get() == '/page_list_files' ||
        m.route.get().startsWith('/page_events')
      ) {
        nav(-1);
      }
      break;
    case 'ArrowDown':
      if (m.route.get() == '/page_calendar') {
        nav(+7);
      }
      if (
        m.route.get() == '/page_events' ||
        m.route.get() == '/page_options' ||
        m.route.get() == '/page_subscriptions' ||
        m.route.get() == '/page_accounts' ||
        m.route.get() == '/page_edit_account' ||
        m.route.get() == '/page_add_event' ||
        m.route.get() == '/page_edit_event' ||
        m.route.get() == '/page_event_templates' ||
        m.route.get() == '/page_list_files' ||
        m.route.get().startsWith('/page_events')
      ) {
        nav(+1);
      }

      if (document.activeElement.tagName == 'INPUT') {
        nav(+1);
      }

      break;
    case 'ArrowRight':
      if (m.route.get() != '/page_calendar') return true;

      nav(1);
      break;
    case 'ArrowLeft':
      if (m.route.get() != '/page_calendar') return true;

      nav(-1);

      break;

    case '1':
      if (m.route.get() == '/page_calendar') previous();

      break;
    case '3':
      if (m.route.get() == '/page_calendar') next();
      break;

    case '2':
      if (m.route.get() == '/page_calendar') slider_navigation();
      break;

    case '5':
      if (m.route.get() == '/page_calendar') {
        if (document.activeElement.classList.contains('event')) {
          status.shortCut = true;
          bottom_bar(
            "<img src='assets/image/pencil.svg'>",
            '',
            "<img src='assets/image/delete-red.svg'>"
          );
        }
      }
      break;

    case '#':
      document
        .querySelectorAll(
          "div#calendar div#calendar-body div div [class^='moon-phase-']"
        )
        .forEach(function (e) {
          e.classList.toggle('active');
        });
      break;

    case 'SoftRight':
    case 'Alt':
      if (m.route.get().startsWith('/page_events_filtered')) {
        m.route.set('/page_events?query=hey');
        return true;
      }

      if (m.route.get() == '/page_calendar' && status.shortCut) {
        let n = '';
        let f = document.querySelectorAll('#event-slider article');
        f.forEach((e, i) => {
          if (e.style.display == 'block') n = e;

          if (f.length - 1 == i) {
            update_event_date = events.filter(function (arr) {
              if (arr.isSubscription == true) return false;
              return arr.UID == n.getAttribute('data-uid');
            })[0];

            if (update_event_date == undefined) {
              side_toaster('subscriptions events cannot be edited', 4000);
            } else {
              delete_event(
                update_event_date.etag,
                update_event_date.url,
                update_event_date.id,
                update_event_date.UID
              );
            }
          }
        });
        return true;
      }

      if (m.route.get() == '/page_calendar' && !status.shortCut) {
        m.route.set('/page_options');
        return true;
      }

      if (m.route.get().startsWith('/page_events')) {
        sort_events();
        return true;
      }

      if (m.route.get().startsWith('/page_add_event')) {
        get_contact(callback_get_contact);
      }

      if (
        document.activeElement.getAttribute('data-action') ==
          'edit-delete-account' &&
        document.activeElement.getAttribute('data-account-type') != 'oauth'
      ) {
        status.edit_account_id = document.activeElement.getAttribute('data-id');
        update_account = accounts.filter(function (arr) {
          return arr.id == status.edit_account_id;
        })[0];

        m.route.set('/page_edit_account');
      }

      break;

    case 'SoftLeft':
    case 'Control':
      if (m.route.get() == '/page_event_templates') {
        delete_template(document.activeElement.getAttribute('data-id'));
      }
      if (m.route.get().startsWith('/page_events')) {
        if (document.activeElement.classList.contains('subscription')) {
          toaster('a subscription cannot be edited', 2000);
          return false;
        }

        get_event_date();

        if (document.activeElement.classList.contains('events'))
          m.route.set('/page_edit_event');

        return true;
      }
      if (
        m.route.get() == '/page_subscriptions' ||
        m.route.get() == '/page_accounts'
      ) {
        if (document.activeElement.getAttribute('data-scan-action') == 'true') {
          start_scan(callback_scan);
        }

        return true;
      }

      if (m.route.get() == '/page_options') {
        if (
          document.activeElement.getAttribute('data-action') ==
          'delete-subscription'
        ) {
          delete_subscription();
        }

        if (
          document.activeElement.getAttribute('data-action') ==
          'edit-delete-account'
        ) {
          delete_account();
        }
      }

      if (m.route.get() == '/page_calendar' && status.shortCut) {
        let n = '';
        let f = document.querySelectorAll('#event-slider article');
        f.forEach((e, i) => {
          if (e.style.display == 'block') n = e;

          if (f.length - 1 == i) {
            update_event_date = events.filter(function (arr) {
              if (arr.isSubscription == true) return false;
              return arr.UID == n.getAttribute('data-uid');
            })[0];

            if (update_event_date == undefined) {
              side_toaster('subscriptions events cannot be edited', 4000);
            } else {
              m.route.set('/page_edit_event');
            }
          }
        });
        return true;
      }

      if (m.route.get() == '/page_calendar') {
        m.route.set('/page_add_event');

        return true;
      }
      break;

    case 'Enter':
      if (!status.visible) return false;

      if (document.activeElement.classList.contains('input-parent')) {
        document.activeElement.children[1].focus();

        if (document.activeElement.classList.contains('check-box')) {
          document.activeElement.checked == true
            ? (document.activeElement.checked = false)
            : (document.activeElement.checked = true);
        }

        return true;
      }

      if (document.activeElement.classList.contains('search-item')) {
        autocomplete('click');
        return true;
      }

      if (document.activeElement.id == 'export-event') {
        events.forEach(function (index) {
          if (index.UID == status.selected_day_id) {
            export_data.push(index);
          }
        });

        export_ical(export_data[0].UID + '.ics', export_data);
        side_toaster('event exported', 2000);

        return true;
      }

      //toggle month/events

      const currentRoute = m.route.get();

      if (events.length > 0) {
        if (currentRoute.startsWith('/page_calendar')) {
          document.querySelector('.loading-spinner').style.display = 'block';
        }

        if (currentRoute.startsWith('/page_events')) {
          // Redirect to '/page_calendar' when on '/page_events'
          m.route.set('/page_calendar');

          // Delayed jump to today if focused on an input element
          if (document.activeElement.tagName === 'INPUT') {
            setTimeout(jump_to_today, 1000);
          }
        } else if (
          currentRoute === '/page_calendar' ||
          currentRoute === '/page_events'
        ) {
          // Toggle between '/page_calendar' and '/page_events'
          m.route.set(
            currentRoute === '/page_calendar'
              ? '/page_events'
              : '/page_calendar'
          );
        }
      } else {
        // Display a message when there are no calendar entries
        if (currentRoute === '/page_calendar') {
          side_toaster('There are no calendar entries to display', 3000);
        }
      }

      break;

    case 'Backspace':
      if (
        m.route.get() == '/page_add_event' &&
        document.activeElement.tagName != 'INPUT'
      ) {
        m.route.set('/page_calendar');
      }

      if (m.route.get() == '/page_events_filtered') {
        m.route.set('/page_calendar');
      }

      if (
        m.route.get() == '/page_edit_event' &&
        document.activeElement.tagName != 'INPUT'
      ) {
        m.route.set('/page_calendar');
      }

      if (m.route.get() == '/page_options') {
        m.route.set('/page_calendar');
      }

      if (m.route.get() == '/page_event_templates') {
        m.route.set('/page_calendar');
      }

      if (
        m.route.get() == '/page_subscriptions' ||
        m.route.get() == '/page_accounts' ||
        m.route.get() == '/page_edit_account' ||
        m.route.get() == '/page_list_files'
      ) {
        m.route.set('/page_options');
        if (document.getElementById('qr-screen').style == 'block')
          document.getElementById('qr-screen').style = 'none';
        stop_scan(stop_scan_callback);
      }

      break;

    case '9':
      /*
      // Example of sending a message to a service worker from a web page
      navigator.serviceWorker.controller.postMessage({
        type: 'test',
        message: 'Hello from the web page!',
      });
      
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (let registration of registrations) {
            registration.unregister();
          }
        });
      }
      */

      break;

    case '0':
      if (!settings.eventsfilter) {
        side_toaster(
          'no category selected, you can do that in the settings',
          4000
        );
      }
      if (document.activeElement.tagName == 'INPUT') return false;
      m.route.set('/page_events_filtered', { query: settings.eventsfilter });
      break;
  }
}

// ///////////////////////////////
// //shortpress / longpress logic
// //////////////////////////////

function handleKeyDown(evt) {
  if (evt.key === 'Backspace' && m.route.get() != '/page_calendar') {
    evt.preventDefault();
  }

  if (evt.key === 'Backspace' && m.route.get() == '/page_calendar') {
    if (closing_prohibited == false) window.close();
  }

  if (evt.key === 'EndCall') {
    evt.preventDefault();
    if (closing_prohibited == false) window.close();
  }
  if (!evt.repeat) {
    longpress = false;
    timeout = setTimeout(() => {
      longpress = true;
      longpress_action(evt);
    }, longpress_timespan);
  }

  if (evt.repeat) {
    if (evt.key == 'Backspace') longpress = false;

    repeat_action(evt);
  }
}

function handleKeyUp(evt) {
  if (status.visible === false) return false;

  clearTimeout(timeout);
  if (!longpress) {
    shortpress_action(evt);
  }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('visibilitychange', handleVisibilityChange, false);
if (debug) {
  window.onerror = function (msg, url, linenumber) {
    alert(
      'Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber
    );
    return true;
  };
}

// Set up a timer to check if no messages have arrived for a certain period
const waitTimeout = 400; // Time in milliseconds
const checkMessagesInterval = 100; // Interval to check for new messages
let waitForNoMessages;
let interval_is_running = false;

let lastMessageTime; // Store the timestamp of the last received message
let running = false;
channel.addEventListener('message', (event) => {
  if (event.data.action == 'test') {
  }

  //callback from Google OAuth
  //ugly method to open a new window, because a window from sw clients.open can no longer be closed

  if (event.data.oauth_success) {
    const l = event.data.oauth_success;
    setTimeout(() => {
      window.open(l);
    }, 5000);
  }
  if (event.data.action == 'parse') {
    lastMessageTime = Date.now(); // Update the timestamp for the last received message
    running = true;
    document.getElementById('icon-waiting').style.visibility = 'visible';

    if (
      event.data.content != false &&
      calendar_not_visible.indexOf(event.data.content.calendar_name) == -1
    ) {
      events.push(event.data.content);
    }

    if (interval_is_running == false) {
      interval();
    }
  }
  if (event.data.action == 'error') {
    document.getElementById('icon-waiting').style.visibility = 'hidden';
  }
});

let interval = () => {
  waitForNoMessages = setInterval(() => {
    interval_is_running = true;
    if (!running) return false;
    const currentTime = Date.now();
    if (currentTime - lastMessageTime >= waitTimeout) {
      style_calendar_cell(currentYear, currentMonth);

      document.getElementById('icon-waiting').style.visibility = 'hidden';
      running = false;
      sort_array(events, 'dateStartUnix', 'number');
      interval_is_running = false;
      //close app because is background sync

      clearInterval(waitForNoMessages);
    }
  }, checkMessagesInterval);
};

//MozAcitivty deepLink handler
try {
  navigator.mozSetMessageHandler('activity', function (activityRequest) {
    var option = activityRequest.source;

    //link
    if (option.name == 'view') {
      p = option.data.url;
      side_toaster(
        'please open the subscriptions page and store the values',
        15000
      );
      wakeLookCPU();
    }
  });
} catch (e) {}
