import './assets/js/shim-xhr-to-fetch.js';
import ICAL from 'ical.js';
import dayjs from 'dayjs';
import localforage from 'localforage';
import { DAVClient } from './assets/js/tsdav-2.0.5.js';
import { google_cred } from './assets/js/google_cred.js';

const google_acc = {
  token_url: 'https://oauth2.googleapis.com/token',
  redirect_url: 'https://greg.strukturart.com/redirect.html',
};
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
function parse_ics(
  data,
  isSubscription,
  etag,
  url,
  account_id,
  isCaldav,
  alarm
) {
  let jcalData;
  try {
    jcalData = ICAL.parse(data);
  } catch (e) {
    channel.postMessage({ action: 'error', content: 'error' });
  }

  var comp = new ICAL.Component(jcalData);

  var vevent = comp.getAllSubcomponents('vevent');
  let calendar_name = comp.getFirstPropertyValue('x-wr-calname') || '';

  let imp = null;

  vevent.forEach(function (ite) {
    let rr_until = '';
    let allday = false;
    let date_start = ite.getFirstPropertyValue('dtstart');
    let date_end = ite.getFirstPropertyValue('dtend');
    if (date_end == null) date_end = date_start;
    let rrule = ite.getFirstPropertyValue('rrule');

    if (date_start.isDate && date_end.isDate) allday = true;
    //RRULE

    if (rrule && typeof rrule === 'object' && rrule.freq) {
      //console.log(rrule);
      rr_until = new Date('3000-01-01').getTime();

      if (rrule && typeof rrule === 'object' && rrule.freq) {
        n = rrule;
        rr_until = n.until || '';
      }

      if (ite.getFirstPropertyValue('rrule').isFinite() === false)
        rr_until = new Date('3000-01-01').getTime();

      if (rrule.until !== null) {
        rr_until = rrule.until;
      }

      if (ite.getFirstPropertyValue('rrule').isByCount()) {
        let dt = dayjs(date_start);

        switch (rrule.freq) {
          case 'DAILY':
            rr_until = dt.add(rrule.count, 'days').valueOf();
          case 'MONTHLY':
            rr_until = dt.add(rrule.count, 'months').valueOf();
          case 'BIWEEKLY':
            rr_until = dt.add(rrule.count * 2, 'weeks').valueOf();
          case 'WEEKLY':
            rr_until = dt.add(rrule.count, 'weeks').valueOf();
          case 'YEARLY':
            rr_until = dt.add(rrule.count, 'years').valueOf();
          default:
            rr_until = new Date('3000-01-01').getTime();
        }
      }
    }

    //date start
    let dateStart, timeStart, dateStartUnix;
    if (date_start) {
      let a = dayjs(date_start);
      dateStart = a.format('YYYY-MM-DD');
      timeStart = a.format('HH:mm:ss');
      dateStartUnix = a.unix();
    }

    //date end
    let dateEnd, timeEnd, dateEndUnix;
    if (date_end) {
      let a = dayjs(date_end);
      dateEnd = a.format('YYYY-MM-DD');
      timeEnd = a.format('HH:mm:ss');
      dateEndUnix = a.unix();

      if (rr_until != '') {
        dateEnd = dayjs(rr_until).format('YYYY-MM-DD');
        timeEnd = dayjs(rr_until).format('HH:mm:ss');
        dateEndUnix = new Date(rr_until).getTime() / 1000;
      }
      //allDay
      if (allday) {
        let f = date_end.toJSDate();
        f = new Date(dayjs(f).subtract(1, 'day'));
        dateEnd = dayjs(f).format('YYYY-MM-DD');
        timeEnd = dayjs(f).format('HH:mm:ss');
        dateEndUnix = f.getTime() / 1000;
      }
    }

    imp = {
      BEGIN: 'VEVENT',
      UID: ite.getFirstPropertyValue('uid'),
      SUMMARY: ite.getFirstPropertyValue('summary'),
      LOCATION: ite.getFirstPropertyValue('location'),
      DESCRIPTION: ite.getFirstPropertyValue('description'),
      CATEGORIES: ite.getFirstPropertyValue('categories') || '',
      RRULE: ite.getFirstPropertyValue('rrule') || '',
      'LAST-MODIFIED': ite.getFirstPropertyValue('last-modified'),
      CLASS: ite.getFirstPropertyValue('class') || '',
      DTSTAMP: date_start,
      DTSTART: date_start,
      DTEND: date_end,
      END: 'VEVENT',
      isSubscription: isSubscription,
      isCaldav: isCaldav,
      allDay: allday,
      dateStart: dateStart,
      dateStartUnix: dateStartUnix,
      dateEndUnix: dateEndUnix,
      dateEnd: dateEnd,
      time_start: timeStart,
      time_end: timeEnd,
      alarm: alarm || 'none',
      etag: etag,
      url: url,
      calendar_name: calendar_name,
      id: account_id,
    };
  });
  return imp;
}

//loggin
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
      // Call the parse_ics function asynchronously
      let ff = parse_ics(
        event.data.t.data,
        false,
        event.data.t.etag,
        event.data.t.url,
        event.data.e,
        true,
        false
      );

      // Post the result back to the main thread
      channel.postMessage({ action: 'parse', content: ff });
    } catch (error) {
      console.error('Error parsing:', error);
      channel.postMessage({ action: 'error', content: 'error parsing' });
    }
  }

  if (event.data.type == 'test') {
    sync_caldav();
  }
});

/*
//System messages
self.addEventListener('error', (event) => {
  const errorMessage = {
    type: 'error',
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  };

  // Send the error message to all clients (pages) controlled by the service worker
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        action: 'test',
        content: JSON.stringify(errorMessage),
      });
    });
  });
});

self.addEventListener('unhandledrejection', (event) => {
  channel.postMessage({ action: 'test', content: event.reason });
});
*/

self.onsystemmessage = (evt) => {
  try {
    const serviceHandler = async () => {
      if (evt.name === 'activity') {
        handler = evt.data.webActivityRequestHandler();
        const { name: activityName, data: activityData } = handler.source;
        if (activityName == 'greg-oauth') {
          let code = activityData.code;

          const url = '/oauth.html?code=' + code;
          channel.postMessage({
            oauth_success: url,
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
