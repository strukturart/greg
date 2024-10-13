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
function parse_ics(
  data,
  isSubscription,
  etag,
  url,
  account_id,
  isCaldav,
  alarm,
  callback,
  store
) {
  let comp = new ICAL.Component(ICAL.parse(data), {
    parseEvent: true,
  });

  comp.onerror = function (error) {
    console.log('Error occurred:', error);
  };

  comp.oncomplete = function () {
    console.log('succesfull parsed');
  };

  var vevent = comp.getAllSubcomponents('vevent');

  let imp = null;
  let return_array = [];
  vevent.forEach(function (ite) {
    let rr_until = '';
    let allday = false;
    let date_start = ite.getFirstPropertyValue('dtstart');
    let date_end =
      ite.getFirstPropertyValue('dtend') ||
      ite.getFirstPropertyValue('dtstart');

    if (date_start.isDate && date_end.isDate) allday = true;

    if (ite.getFirstPropertyValue('rrule') != undefined) {
      try {
        let rrule = ite.getFirstPropertyValue('rrule');

        if (rrule && typeof rrule === 'object' && rrule.freq) {
          rr_freq = rrule.freq;
          if (ite.getFirstPropertyValue('rrule').isFinite() === false) {
            if (rrule.until !== null) {
              rr_until = rrule.until;
            } else {
              rr_until = new Date('3000-01-01').getTime();
            }
          } else {
            if (ite.getFirstPropertyValue('rrule').isByCount()) {
              let dt = dayjs(date_start);

              switch (rrule.freq) {
                case 'DAILY':
                  rr_until = dt.add(rrule.count, 'days').valueOf();
                  date_end = dt.add(rrule.count, 'days').format('YYYY-MM-DD');
                  break;
                case 'MONTHLY':
                  rr_until = dt.add(rrule.count, 'months').valueOf();
                  date_end = dt.add(rrule.count, 'months').format('YYYY-MM-DD');
                  break;

                case 'BIWEEKLY':
                  rr_until = dt.add(rrule.count * 2, 'weeks').valueOf();
                  date_end = dt
                    .add(rrule.count * 2, 'weeks')
                    .format('YYYY-MM-DD');
                  break;

                case 'WEEKLY':
                  rr_until = dt.add(rrule.count, 'weeks').valueOf();
                  date_end = dt.add(rrule.count, 'weeks').format('YYYY-MM-DD');
                  break;

                case 'YEARLY':
                  rr_until = dt.add(rrule.count, 'years').valueOf();
                  date_end = dt.add(rrule.count, 'years').format('YYYY-MM-DD');
                  break;

                default:
                  rr_until = new Date('3000-01-01').getTime();
                  break;
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
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

      if (rr_until != '') {
        a = dayjs(rr_until);
      }

      if (allday) {
        a = a.subtract(1, 'day');
      }

      dateEnd = a.format('YYYY-MM-DD');
      timeEnd = a.format('HH:mm:ss');
      dateEndUnix = a.unix();
    }

    imp = {
      UID: ite.getFirstPropertyValue('uid') || '',
      SUMMARY: ite.getFirstPropertyValue('summary') || '',
      LOCATION: ite.getFirstPropertyValue('location') || '',
      DESCRIPTION: ite.getFirstPropertyValue('description') || '',
      CATEGORIES: ite.getFirstPropertyValue('categories') || '',
      RRULE: ite.getFirstPropertyValue('rrule') || '',
      CLASS: ite.getFirstPropertyValue('class') || '',
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
      etag: etag || '',
      url: url || '',
      calendar_name: comp.getFirstPropertyValue('x-wr-calname') || '',
      id: account_id,
      modified: ite.getFirstPropertyValue('last-modified').toString(),
    };

    //when importing data callback to store
    let a = { parsed_data: imp };
    if (store) {
      a.raw_data = data;
      a.uid = imp.UID;
    }

    //callback or not
    if (callback) {
      a.calback = true;
    }
    return_array.push(a);
  });
  return return_array;
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

      let ff = parse_ics(
        event.data.t.data,
        is_subscription(),
        event.data.t.etag,
        event.data.t.url,
        event.data.e,
        is_caldav(),
        false,
        event.data.callback || false,
        event.data.store || false
      );

      // Post the result back to the main thread

      ff.forEach((e) => {
        channel.postMessage({ action: 'parse', content: e });
      });
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
