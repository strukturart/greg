'use strict';

import { bottom_bar } from './helper.js';
import { settings } from '../../app.js';

export let load_ads = function () {
  var js = document.createElement('script');
  js.type = 'text/javascript';
  js.src = 'assets/js/kaiads.v5.min.js';

  js.onload = function () {
    getKaiAd({
      publisher: '4408b6fa-4e1d-438f-af4d-f3be2fa97208',
      app: 'greg',
      slot: 'greg',
      test: 0,
      timeout: 10000,
      h: 100,
      w: 240,
      container: document.getElementById('KaiOsAds-Wrapper'),
      onerror: (err) => console.error('Error:', err),
      onready: (ad) => {
        // user clicked the ad
        ad.on('click', () => console.log('click event'));

        // user closed the ad (currently only with fullscreen)
        ad.on('close', () => console.log('close event'));

        // the ad succesfully displayed
        ad.on('display', () => {
          try {
            const childElements = document.querySelectorAll(
              '#KaiOsAds-Wrapper > *'
            );

            document.querySelector('#KaiOsAds-Wrapper').style.margin =
              '0px 0px 30px 0';

            childElements.forEach((element) => {
              element.addEventListener('focus', (event) => {
                bottom_bar('', 'open ads', '');
              });
            });
          } catch (e) {
            console.log(e);
          }
        });

        // Ad is ready to be displayed
        // calling 'display' will display the ad
        ad.call('display', {
          navClass: 'item',
          display: 'block',
        });
      },
    });
  };
  document.head.appendChild(js);
};

// Get a reference to the element you want to add the focus event listener to

//KaiOS ads

export let getManifest = function (callback) {
  if (navigator.mozApps) {
    let self = navigator.mozApps.getSelf();
    self.onsuccess = function () {
      callback(self.result);
    };
    self.onerror = function () {};
  }

  if ('b2g' in navigator) {
    fetch('/manifest.webmanifest')
      .then((r) => r.json())
      .then((r) => callback(r.b2g_features));
  }
};

//KaiOs store true||false
export function manifest(a) {
  if (navigator.mozApps) {
    self = a.origin;
    document.querySelector('#version kbd').innerText = a.manifest.version;
    if (a.installOrigin == 'app://kaios-plus.kaiostech.com') {
      settings.ads = true;
    } else {
      settings.ads = true;
    }
  }
  if ('b2g' in navigator) {
    document.querySelector('#version kbd').innerText = a.version;
    settings.ads = true;
  }
}
