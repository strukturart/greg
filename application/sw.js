import './assets/js/shim-xhr-to-fetch.js';
import ICAL from 'ical.js';
import dayjs from 'dayjs';
import localforage from 'localforage';
import { DAVClient } from './assets/js/tsdav.js';

const channel = new BroadcastChannel('sw-messages');

let accounts;
async function loadAccounts() {
  try {
    accounts = (await localforage.getItem('accounts')) || [];
    return true;
  } catch (error) {
    console.error('Error loading accounts:', error);
    channel.postMessage({ action: 'error', content: 'error' });

    return false;
  }
}
loadAccounts();

let calendar_names;
async function getCalendarNames() {
  try {
    calendar_names = await localforage.getItem('calendarNames');
    // Do additional processing if needed
  } catch (error) {
    channel.postMessage({ action: 'error', content: 'error' });

    console.error('Error retrieving calendar names:', error);
  }
}
getCalendarNames();

let settings;
let load_settings = function () {
  localforage
    .getItem('settings')
    .then(function (value) {
      settings = value;
    })
    .catch(function (err) {
      console.log(err);
      channel.postMessage({ action: 'error', content: 'error' });
    });
};

load_settings();

//parse calendar events and send back to mainscript
let return_array = [];

function parse_ics(
  data,
  isSubscription,
  etag,
  url,
  account_id,
  isCaldav,
  alarm,
  callback,
  store,
  doNotCache = false
) {
  let comp = new ICAL.Component(ICAL.parse(data), { parseEvent: true });

  const vevent = comp.getAllSubcomponents('vevent');

  vevent.forEach((ite) => {
    let allday = false;
    let isBiweekly = false;
    let rrule_dates = [];
    let rr_until = null;

    // Cache all props (viel schneller als mehrfaches getFirstPropertyValue)
    const uid = ite.getFirstPropertyValue('uid') || '';
    const summary = ite.getFirstPropertyValue('summary') || '';
    const location = ite.getFirstPropertyValue('location') || '';
    const description = ite.getFirstPropertyValue('description') || '';
    const categories = ite.getFirstPropertyValue('categories') || '';
    const rrule = ite.getFirstPropertyValue('rrule') || '';
    const clazz = ite.getFirstPropertyValue('class') || '';
    const lastModified = ite.getFirstPropertyValue('last-modified');

    let date_start = ite.getFirstPropertyValue('dtstart');
    let date_end =
      ite.getFirstPropertyValue('dtend') ||
      ite.getFirstPropertyValue('dtstart');

    if (date_start && date_start.isDate && date_end && date_end.isDate) {
      allday = true;
    }

    // === RRULE ===
    if (rrule && typeof rrule === 'object' && rrule.freq) {
      try {
        const interval = rrule.interval || 1;
        const dtstart = ite.getFirstPropertyValue('dtstart');

        // Nutze direkt ICAL.Time (nicht erst via JSDate)
        const iter = rrule.iterator(dtstart);

        const now = new Date();

        const maxIterations = 500;
        const maxDate = new Date();

        maxDate.setFullYear(now.getFullYear() + 5);

        let count = 0;
        let next;

        while ((next = iter.next()) && count < maxIterations) {
          const jsDate = next.toJSDate();

          const year = next.year;
          const month = ('0' + next.month).slice(-2);
          const day = ('0' + next.day).slice(-2);

          const formatted = `${year}-${month}-${day}`;
          rrule_dates.push(formatted);
          count++;

          if (jsDate > maxDate) break;

          if (
            rrule.until &&
            jsDate.getTime() > new Date(rrule.until).getTime()
          ) {
            break; // früh abbrechen
          }
        }

        // UNTIL bestimmen
        if (rrule.until) {
          if (typeof rrule.until.toJSDate === 'function') {
            rr_until = rrule.until.toJSDate().getTime();
          } else if (
            typeof rrule.until === 'string' &&
            /^\d{8}$/.test(rrule.until)
          ) {
            const y = parseInt(rrule.until.slice(0, 4), 10);
            const m = parseInt(rrule.until.slice(4, 6), 10) - 1;
            const d = parseInt(rrule.until.slice(6, 8), 10);
            rr_until = new Date(y, m, d, 23, 59, 59).getTime();
          } else if (typeof rrule.until === 'string') {
            rr_until = new Date(rrule.until).getTime();
          } else {
            rr_until = new Date('3000-01-01').getTime();
          }
        } else if (rrule.count) {
          // Fallback auf count * interval
          const unitMap = {
            DAILY: 'day',
            WEEKLY: 'week',
            MONTHLY: 'month',
            YEARLY: 'year',
          };
          const unit = unitMap[rrule.freq] || 'day';
          // Approximation mit JS Date (reicht für UNTIL)
          const js = date_start.toJSDate();
          switch (unit) {
            case 'day':
              js.setDate(js.getDate() + rrule.count * interval);
              break;
            case 'week':
              js.setDate(js.getDate() + rrule.count * interval * 7);
              break;
            case 'month':
              js.setMonth(js.getMonth() + rrule.count * interval);
              break;
            case 'year':
              js.setFullYear(js.getFullYear() + rrule.count * interval);
              break;
          }
          rr_until = js.getTime();
        } else {
          rr_until = new Date('3000-01-01').getTime();
        }

        if (rrule.freq === 'WEEKLY' && interval === 2) {
          isBiweekly = true;
        }

        // Enddatum auf UNTIL setzen
        date_end = new ICAL.Time.fromJSDate(new Date(rr_until), false);
      } catch (e) {
        console.warn('RRULE parse error:', e);
      }
    }

    // === START / END berechnen ===
    let dateStart, timeStart, dateStartUnix;
    if (date_start) {
      const js = date_start.toJSDate();
      dateStartUnix = js.getTime();
      dateStart = `${js.getFullYear()}-${('0' + (js.getMonth() + 1)).slice(
        -2
      )}-${('0' + js.getDate()).slice(-2)}`;
      timeStart = `${('0' + js.getHours()).slice(-2)}:${(
        '0' + js.getMinutes()
      ).slice(-2)}:${('0' + js.getSeconds()).slice(-2)}`;
    }

    let dateEnd, timeEnd, dateEndUnix;
    if (date_end) {
      let js = date_end.toJSDate();

      if (rr_until) {
        js = new Date(rr_until);
      }

      if (allday) {
        js.setDate(js.getDate() - 1); // Ganztägige Events: Enddatum anpassen
      }

      dateEndUnix = js.getTime();
      dateEnd = `${js.getFullYear()}-${('0' + (js.getMonth() + 1)).slice(
        -2
      )}-${('0' + js.getDate()).slice(-2)}`;
      timeEnd = `${('0' + js.getHours()).slice(-2)}:${(
        '0' + js.getMinutes()
      ).slice(-2)}:${('0' + js.getSeconds()).slice(-2)}`;
    }

    // === Ergebnisobjekt ===
    const imp = {
      UID: uid,
      SUMMARY: summary,
      LOCATION: location,
      DESCRIPTION: description,
      CATEGORIES: categories,
      RRULE: rrule,
      CLASS: clazz,
      isSubscription,
      isBiweekly,
      isCaldav,
      allDay: allday,
      rrule_dates,
      dateStart,
      dateStartUnix,
      dateEnd,
      dateEndUnix,
      time_start: timeStart,
      time_end: timeEnd,
      alarm: alarm || 'none',
      etag: etag || '',
      url: url || '',
      calendar_name: comp.getFirstPropertyValue('x-wr-calname') || '',
      doNotCache,
      id: account_id,
      modified: lastModified ? lastModified.toString() : '',
    };

    const a = { parsed_data: imp };
    if (store) {
      a.raw_data = data;
      a.uid = imp.UID;
    }
    if (callback) {
      a.callback = true;
    }
    return_array.push(a);

    if (return_array.length > 200) {
      channel.postMessage({ action: 'parse', content: return_array });
      return_array = [];
    }
  });

  if (return_array.length > 0) {
    channel.postMessage({ action: 'parse', content: return_array });
    return_array = [];
  }

  return;
}

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
            tokenUrl: process.env.token_url,
            refreshToken: item.tokens.refresh_token,
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret,
            authorizationCode: item.authorizationCode,
            redirectUrl: process.env.redirect_url,
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

    channel.postMessage({
      action: 'test',
      content: e,
    });
  }
}

let sync_caldav = async function () {
  for (const item of accounts) {
    let client = await getClientInstance(item);

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
          id: item.id + '-' + i,
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
          console.log('try to sync');

          if (ma.updated.length && ma.updated.length > 0) {
            channel.postMessage({
              action: 'test',
              content: 'update needed',
            });
            break;
          } else {
          }
        } catch (e) {
          console.log(e);

          channel.postMessage({
            action: 'test',
            content: e.toString(),
          });
        }
      }
    } catch (err) {
      console.log(err);

      channel.postMessage({
        action: 'test',
        content: err.toString(),
      });
    }
  }
};

self.addEventListener('message', async (event) => {
  // Receive a message from the main thread
  if (!event.data) {
    channel.postMessage({ action: 'error', content: 'error' });
  }

  if (event.data.type == 'parse') {
    try {
      let is_caldav = () => {
        if (event.data.e == 'subscription' || event.data.e == 'local-id') {
          return false;
        } else {
          return true;
        }
      };

      let is_subscription = () => {
        if (event.data.e == 'subscription') {
          return true;
        } else {
          return false;
        }
      };

      parse_ics(
        event.data.t.data,
        is_subscription(),
        event.data.t.etag,
        event.data.t.url,
        event.data.e,
        is_caldav(),
        false,
        event.data.callback || false,
        event.data.store || false,
        event.data.doNotCache || false
      );
    } catch (error) {
      channel.postMessage({
        action: 'error',
        content: 'error parsing ' + error,
      });
    }
  }
});

self.onsystemmessage = (evt) => {
  try {
    const serviceHandler = async () => {
      if (evt.name === 'activity') {
        handler = evt.data.webActivityRequestHandler();
        const { name: activityName, data: activityData } = handler.source;
        if (activityName == 'greg-oauth') {
          channel.postMessage({
            oauth_success: activityData,
          });
        }
      }

      if (evt.name === 'alarm') {
        let m = evt.data.json();

        if (m.data.note == 'keep alive') {
          sync_caldav();

          self.registration.showNotification('Test', {
            body: m.data.note,
          });

          localforage
            .getItem('settings')
            .then(function (e) {
              if (e.background_sync == 'Yes') {
                var d = new Date();
                d.setMinutes(d.getMinutes() + 2);

                let options = {
                  date: d,
                  data: { note: 'keep alive', type: 'background_sync' },
                  ignoreTimezone: false,
                };

                navigator.b2g.alarmManager.add(options).then(
                  channel.postMessage({
                    action: 'background_sync',
                    content: '',
                  })
                );
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          self.registration.showNotification('Greg', {
            body: m.data.note,
          });
        }
      }
    };

    evt.waitUntil(serviceHandler());
  } catch (e) {
    channel.postMessage({ action: 'error', content: e });
  }
};
