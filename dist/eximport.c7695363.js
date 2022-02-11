// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/js/eximport.js":[function(require,module,exports) {
var eximport = function () {
  var export_ical = function export_ical(filename, event_data) {
    if (!navigator.getDeviceStorage) return false;
    var sdcard = navigator.getDeviceStorage("sdcard");
    var request_del = sdcard.delete(filename);

    request_del.onsuccess = function () {};

    setTimeout(function () {
      // convert
      var data = event_data;
      var result = "";
      result += "BEGIN:VCALENDAR" + "\r\n";
      result += "VERSION:2.0" + "\r\n";
      result += "PRODID:GREG" + "\r\n";
      result += "METHOD:PUBLISHED" + "\r\n";
      data.forEach(function (e) {
        var index = -1;

        for (var key in e) {
          index++;
          if (index == 0) result += "BEGIN:VEVENT" + "\r\n";

          if (key != "BEGIN" && key != "END" && key != "date" && key != "time_start" && key != "time_end" && key != "dateStart" && key != "dateEnd" && key != "notification" && key != "alarm" && key != "isSubscription" && key != "multidayevent" && key != "alarmTrigger" && key != "rrule_") {
            result += "".concat(key, ":").concat(e[key]) + "\r\n";
          }

          if (index == Object.keys(e).length - 1) result += "END:VEVENT" + "\r\n";
        }
      });
      result += "END:VCALENDAR" + "\r\n";
      var file = new Blob([result], {
        type: "text/calendar"
      });
      var request = sdcard.addNamed(file, filename);

      request.onsuccess = function () {
        helper.side_toaster("<img src='assets/image/E25C.svg'>", 2500);
      };

      request.onerror = function () {
        helper.toaster("Unable to write the file", 2000);
      };
    }, 2000);
  }; // //////////
  // /LIST ICS
  // ////////////


  var list_ics = function list_ics() {
    var file_list = [];

    var cb = function cb(result) {
      file_list.push(result);
      var fn = result.split("/");
      fn = fn[fn.length - 1];
      if (fn == "greg.ics") return false;
      document.querySelector("div#options div#import-text").insertAdjacentHTML("afterend", '<button class="item dynamic" data-function="import" data-filename="' + result + '">' + fn + "</button>");
    };

    helper.list_files("ics", cb);
  }; // /////////////
  // /PARSE ICS
  // /////////////


  var parse_ics = function parse_ics(data, callback, saveOnDevice, subscription) {
    var data = data.split(/\r\n|\n/);
    data = data.join("\r\n"); // parse iCal data

    var jcalData = ICAL.parse(data);
    var vcalendar = new ICAL.Component(jcalData);
    var last_uid = "";
    var last_date = "";
    var isoDateTimeEnd = "";
    vcalendar.getAllSubcomponents("vevent").forEach(function (index) {
      if (index.getFirstPropertyValue("dtstart") == "" && index.getFirstPropertyValue("summary") == "") return false;
      var DTend = null;
      var dateEnd = null;
      var timeEnd = null;

      if (index.getFirstPropertyValue("dtend") != null) {
        DTend = ICAL.design.icalendar.value["date-time"].toICAL(index.getFirstPropertyValue("dtend"));
        DTend = new Date(index.getFirstPropertyValue("dtend"));
        dateEnd = DTend.getFullYear() + "-" + "0".concat(DTend.getMonth() + 1).slice(-2) + "-" + "0".concat(DTend.getDate()).slice(-2);
        timeEnd = "0".concat(DTend.getHours()).slice(-2) + ":" + "0".concat(DTend.getMinutes()).slice(-2) + ":" + "0".concat(DTend.getSeconds()).slice(-2);
        isoDateTimeEnd = dateEnd + "T" + timeEnd;
        isoDateTimeEnd = isoDateTimeEnd.replace(/-/g, "");
        isoDateTimeEnd = isoDateTimeEnd.replace(/:/g, "");
      }

      var DTstart = null;
      var dateStart = null;
      var timeStart = null;
      var isoDateTimeStart = null;

      if (index.getFirstPropertyValue("dtstart") != null) {
        DTstart = ICAL.design.icalendar.value["date-time"].toICAL(index.getFirstPropertyValue("dtstart"));
        DTstart = new Date(index.getFirstPropertyValue("dtstart"));
        dateStart = DTstart.getFullYear() + "-" + "0".concat(DTstart.getMonth() + 1).slice(-2) + "-" + "0".concat(DTstart.getDate()).slice(-2);
        timeStart = "0".concat(DTstart.getHours()).slice(-2) + ":" + "0".concat(DTstart.getMinutes()).slice(-2) + ":" + "0".concat(DTstart.getSeconds()).slice(-2);
        isoDateTimeStart = dateStart + "T" + timeStart;
        isoDateTimeStart = isoDateTimeStart.replace(/-/g, "");
        isoDateTimeStart = isoDateTimeStart.replace(/:/g, "");
      } // check multi day events


      multidayevent = false;

      if (new Date(dateEnd).getTime() > new Date(dateStart).getTime()) {
        multidayevent = true;
      } // last modified


      var g = new Date(index.getFirstPropertyValue("last-modified")).getTime();

      if (timeStart == timeEnd) {
        timeStart = "";
        timeEnd = "";
      }

      last_uid = "";
      last_date = "";

      var parse_rrule = function parse_rrule() {
        var feedback = "";

        if (index.getFirstPropertyValue("rrule") != null) {
          var a = index.getFirstPropertyValue("rrule");
          feedback = a.toString();
        }

        return feedback;
      };

      var parse_rrule2 = function parse_rrule2() {
        var feedback = "none";

        if (index.getFirstPropertyValue("rrule") != null) {
          var a = index.getFirstPropertyValue("rrule");
          feedback = a.freq;
        }

        return feedback;
      };

      var imp = {
        BEGIN: "VEVENT",
        UID: index.getFirstPropertyValue("uid"),
        SUMMARY: index.getFirstPropertyValue("summary"),
        LOCATION: index.getFirstPropertyValue("location"),
        DESCRIPTION: index.getFirstPropertyValue("description"),
        ATTACH: index.getFirstPropertyValue("attach"),
        RRULE: parse_rrule(),
        "LAST-MODIFIED": g,
        CLASS: "PRIVATE",
        DTSTAMP: isoDateTimeStart,
        DTSTART: isoDateTimeStart,
        DTEND: isoDateTimeEnd,
        END: "VEVENT",
        dateStart: dateStart,
        dateEnd: dateEnd,
        time_start: timeStart,
        time_end: timeEnd,
        notification: " ",
        alarm: "none",
        isSubscription: subscription,
        multidayevent: multidayevent,
        rrule_: parse_rrule2()
      };
      last_uid = imp.UID;
      last_date = imp.date;
      events.push(imp);
    });

    if (saveOnDevice) {
      var without_subscription = events.filter(function (events) {
        return events.isSubscription === false;
      });
      localforage.setItem("events", without_subscription).then(function (value) {
        // events = value;
        helper.side_toaster("<img src='assets/image/E25C.svg'>", 2500);
      }).catch(function (err) {
        console.log(err);
      });
    }

    callback(last_uid, last_date);
    console.log("done");
  }; // ///////////
  // /FETCH ICS
  // /////////


  var fetch_ics = function fetch_ics(url, cb) {
    var xhttp = new XMLHttpRequest({
      mozSystem: true
    });
    xhttp.open("GET", url + "?time=" + new Date().getTime(), true);
    xhttp.timeout = 25000;

    xhttp.onload = function () {
      if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
        var data = xhttp.response;
        parse_ics(data, cb, false, true);
      }
    };

    xhttp.onerror = function () {
      helper.toaster("subscription could not be loaded", 2000);
    };

    xhttp.send(null);
  };

  function share(url, name) {
    var activity = new MozActivity({
      name: "share",
      data: {
        type: "text/calendar",
        number: 1,
        blobs: [url],
        filenames: [name]
      }
    });

    activity.onsuccess = function () {};

    activity.onerror = function () {};
  } // ///////////////////////
  // ///Load ICS///////////
  // /////////////////////


  function loadICS(filename, callback) {
    var sdcard = navigator.getDeviceStorage("sdcard");
    var request = sdcard.get(filename);

    request.onsuccess = function () {
      var file = this.result;
      var reader = new FileReader();

      reader.onerror = function (event) {
        helper.toaster("can't read file", 3000);
        reader.abort();
      };

      reader.onloadend = function (event) {
        parse_ics(event.target.result, callback, true, false);
      };

      reader.readAsText(file);
    };

    request.onerror = function () {
      console.warn("Unable to get the file: " + this.error);
    };
  }

  return {
    export_ical: export_ical,
    list_ics: list_ics,
    loadICS: loadICS,
    share: share,
    fetch_ics: fetch_ics
  };
}();
},{}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40769" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/eximport.js"], null)
//# sourceMappingURL=/eximport.c7695363.js.map