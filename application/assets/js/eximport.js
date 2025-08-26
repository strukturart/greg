export let export_ical = function (filename, data, callback) {
  let file = new Blob([data.trim()], { type: 'text/calendar' });

  function writeFile(sdcard) {
    let del = sdcard.delete(filename);
    del.onsuccess = function () {
      let add = sdcard.addNamed(file, filename);
      add.onsuccess = () => callback('backup written');
      add.onerror = () => callback('Unable to write the file');
    };
    del.onerror = function () {
      // Falls Datei nicht existiert → trotzdem schreiben
      let add = sdcard.addNamed(file, filename);
      add.onsuccess = () => callback('backup written');
      add.onerror = () => callback('Unable to write the file');
    };
  }

  try {
    if ('b2g' in navigator) {
      // KaiOS 3.x
      let sdcard = navigator.b2g.getDeviceStorage('sdcard');
      writeFile(sdcard);
    } else {
      // KaiOS 2.x
      let sdcard = navigator.getDeviceStorage('sdcard');
      writeFile(sdcard);
    }
  } catch (e) {
    console.log('DeviceStorage error:', e);
    callback('Storage access failed');
  }
};
