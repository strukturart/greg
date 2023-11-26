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
  } catch (err) {
    console.error(err);
    return false;
  }
}
loadAccounts();

let settings;
localforage
  .getItem('settings')
  .then(function (e) {
    settings = e;
    console.log(e);
  })
  .catch(function (err) {
    console.log(err);
  });

//parse calendar events and send back to mainscript
const parse_ics = function (
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
  } catch (e) {}

  var comp = new ICAL.Component(jcalData);

  var vevent = comp.getAllSubcomponents('vevent');
  let calendar_name = comp.getFirstPropertyValue('x-wr-calname') || '';
  let imp;
  vevent.forEach(function (ite) {
    let n = '';
    let rr_until = '';
    let allday = false;
    let date_start = ite.getFirstPropertyValue('dtstart');
    let date_end = ite.getFirstPropertyValue('dtend');
    const rrule = ite.getFirstPropertyValue('rrule');

    if (date_start.isDate && date_end.isDate) allday = true;

    if (rrule && typeof rrule === 'object' && rrule.freq) {
      n = rrule;
      rr_until = n.until || '';
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
        dateEnd = dayjs(n.until).format('YYYY-MM-DD');
        timeEnd = dayjs(n.until).format('HH:mm:ss');
        dateEndUnix = new Date(n.until).getTime() / 1000;
      }
      //allDay
      if (allday) {
        let f = ite.getFirstPropertyValue('dtend').toJSDate();
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
      DTSTAMP: ite.getFirstPropertyValue('dtstart'),
      DTSTART: ite.getFirstPropertyValue('dtstart'),
      DTEND: ite.getFirstPropertyValue('dtend'),
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
};

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
          id: item.id,
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
            content: 'error 2',
          });
        }
      }
    } catch (err) {
      console.log(err);

      channel.postMessage({
        action: 'test',
        content: 'error 1',
      });
    }
  }
};

self.addEventListener('message', (event) => {
  // Receive a message from the main thread
  if (!event.data) {
    channel.postMessage({ action: 'error', content: 'error' });
    return false;
  }
  if (event.data.type == 'parse') {
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
  }

  if (event.data.type == 'test') {
    sync_caldav();
  }
});

//System messages

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
