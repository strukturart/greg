'use strict';

import { bottom_bar } from './helper.js';

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
