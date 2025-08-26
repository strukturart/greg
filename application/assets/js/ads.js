'use strict';

export let load_ads = function () {
  getKaiAd({
    publisher: '4408b6fa-4e1d-438f-af4d-f3be2fa97208',
    app: 'greg',
    slot: 'greg',
    test: 0,
    timeout: 10000,
    h: 120,
    w: 240,
    container: document.getElementById('KaiOSAds-Wrapper'),
    onerror: (err) => console.error('Error:', err),
    onready: (ad) => {
      // user clicked the ad
      ad.on('click', () => console.log('click event'));

      // user closed the ad (currently only with fullscreen)
      ad.on('close', () => console.log('close event'));

      // the ad succesfully displayed
      ad.on('display', () => {
        console.log('yeah');
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
