'use strict';

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
        ad.on('display', () => console.log('display event'));

        // Ad is ready to be displayed
        // calling 'display' will display the ad
        ad.call('display', {
          navClass: 'item',
          tabIndex: 9,
          //display: "block",
        });
      },
    });
  };
  document.head.appendChild(js);
};

//KaiOS ads
export let getManifest = function (callback) {
  if (!navigator.mozApps) {
    return false;
  }
  let self = navigator.mozApps.getSelf();
  self.onsuccess = function () {
    callback(self.result);
  };
  self.onerror = function () {};
};

//KaiOs store true||false
export function manifest(a) {
  self = a.origin;
  document.getElementById('version').innerText =
    'Version: ' + a.manifest.version;
  if (a.installOrigin == 'app://kaios-plus.kaiostech.com') {
    settings.ads = true;
  } else {
    settings.ads = true;
  }
}
