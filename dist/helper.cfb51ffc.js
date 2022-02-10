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
})({"assets/js/helper.js":[function(require,module,exports) {
"use strict";

var helper = function () {
  var sort_array = function sort_array(arr, item_key, type) {
    if (type == "date") {
      arr.sort(function (a, b) {
        var da = new Date(a[item_key]),
            db = new Date(b[item_key]);
        return da - db;
      });
    } //sort by number


    if (type == "number") {
      arr.sort(function (a, b) {
        return b[item_key] - a[item_key];
      });
    } //sort by string


    if (type == "string") {
      arr.sort(function (a, b) {
        var fa = a[item_key].toLowerCase(),
            fb = b[item_key].toLowerCase();

        if (fa < fb) {
          return -1;
        }

        if (fa > fb) {
          return 1;
        }

        return 0;
      });
    }
  };

  var uid = function uid() {
    function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }

    return "greg@" + _p8() + _p8(true) + _p8(true) + _p8();
  };

  var notification = "";

  var notify = function notify(param_title, param_text, param_silent) {
    var options = {
      body: param_text,
      silent: param_silent,
      requireInteraction: false //actions: [{ action: "test", title: "test" }],

    }; // Let's check whether notification permissions have already been granted

    if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      notification = new Notification(param_title, options);
    } // Otherwise, we need to ask the user for permission


    if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          notification = new Notification(param_title, options);
        }
      });
    }
  }; //https://notifications.spec.whatwg.org/#dictdef-notificationaction


  var pushLocalNotification = function pushLocalNotification(title, body) {
    window.Notification.requestPermission().then(function (result) {
      var notification = new window.Notification(title, {
        body: body //requireInteraction: true,

      });

      notification.onerror = function (err) {
        console.log(err);
      };

      notification.onclick = function (event) {
        if (window.navigator.mozApps) {
          var request = window.navigator.mozApps.getSelf();

          request.onsuccess = function () {
            if (request.result) {
              notification.close();
              request.result.launch();
            }
          };
        } else {
          window.open(document.location.origin, "_blank");
        }
      };

      notification.onshow = function () {// notification.close();
      };
    });
  };

  navigator.mozSetMessageHandler("alarm", function (message) {
    console.log(JSON.stringify(message));
    pushLocalNotification("Greg", message.data.foo);
  });

  function validate(url) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (pattern.test(url)) {
      return true;
    }

    return false;
  }

  var getManifest = function getManifest(callback) {
    if (!navigator.mozApps) {
      //let t = document.getElementById("kaisos-ads");
      //t.remove();
      return false;
    }

    var self = navigator.mozApps.getSelf();

    self.onsuccess = function () {
      callback(self.result);
    };

    self.onerror = function () {};
  }; //top toaster


  var queue = [];
  var timeout;

  var toaster = function toaster(text, time) {
    queue.push({
      text: text,
      time: time
    });

    if (queue.length === 1) {
      toast_q(text, time);
    }
  };

  var toast_q = function toast_q(text, time) {
    var x = document.querySelector("div#toast");
    x.innerHTML = queue[0].text;
    x.style.transform = "translate(0px, 0px)";
    timeout = setTimeout(function () {
      timeout = null;
      x.style.transform = "translate(0px, -100px)";
      queue = queue.slice(1);

      if (queue.length > 0) {
        setTimeout(function () {
          toast_q(text, time);
        }, 1000);
      }
    }, time);
  }; //side toaster


  var queue_st = [];
  var ttimeout;

  var side_toaster = function side_toaster(text, time) {
    queue_st.push({
      text: text,
      time: time
    });

    if (queue_st.length === 1) {
      toast_qq(text, time);
    }
  };

  var toast_qq = function toast_qq(text, time) {
    var x = document.querySelector("div#side-toast");
    x.innerHTML = queue_st[0].text;
    x.style.transform = "translate(0vh, 0px)";
    timeout = setTimeout(function () {
      ttimeout = null;
      x.style.transform = "translate(-100vh,0px)";
      queue_st = queue.slice(1);

      if (queue_st.length > 0) {
        setTimeout(function () {
          toast_qq(text, time);
        }, 1000);
      }
    }, time);
  }; //bottom bar


  var bottom_bar = function bottom_bar(left, center, right) {
    document.querySelector("div#bottom-bar div#button-left").textContent = left;
    document.querySelector("div#bottom-bar div#button-center").textContent = center;
    document.querySelector("div#bottom-bar div#button-right").textContent = right;

    if (left == "" && center == "" && right == "") {
      document.querySelector("div#bottom-bar").style.display = "none";
    } else {
      document.querySelector("div#bottom-bar").style.display = "block";
    }
  }; //top bar


  var top_bar = function top_bar(left, center, right) {
    document.querySelector("div#top-bar div.button-left").innerHTML = left;
    document.querySelector("div#top-bar div.button-center").textContent = center;
    document.querySelector("div#top-bar div.button-right").textContent = right;

    if (left == "" && center == "" && right == "") {
      document.querySelector("div#top-bar").style.display = "none";
    } else {
      document.querySelector("div#top-bar").style.display = "block";
    }
  };

  var add_script = function add_script(script) {
    document.body.appendChild(document.createElement("script")).src = script;
  };

  var lock;

  var screenlock = function screenlock(stat) {
    if (typeof window.navigator.requestWakeLock === "undefined") {
      return false;
    }

    if (stat == "lock") {
      lock = window.navigator.requestWakeLock("screen");

      lock.onsuccess = function () {};

      lock.onerror = function () {
        alert("An error occurred: " + this.error.name);
      };
    }

    if (stat == "unlock") {
      if (lock.topic == "screen") {
        lock.unlock();
      }
    }
  }; //filesize


  function formatFileSize(bytes, decimalPoint) {
    if (bytes || bytes > 0 || bytes != undefined || bytes != NaN) {
      var k = 1000,
          dm = decimalPoint || 2,
          sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
          i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }
  } //goodbye


  var goodbye = function goodbye() {
    document.getElementById("goodbye").style.display = "block";
    bottom_bar("", "", "");

    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
      localStorage.clickcount = 1;
    }

    if (localStorage.clickcount == 300000) {
      message();
    } else {
      document.getElementById("ciao").style.display = "block";
      setTimeout(function () {
        window.close();
      }, 2000);
    }

    function message() {
      document.getElementById("donation").style.display = "block";
      setTimeout(function () {
        localStorage.clickcount = 1;
        window.close();
      }, 3000);
    }
  }; //pick image


  var pick_image = function pick_image(cb) {
    var activity = new MozActivity({
      name: "pick",
      data: {
        type: ["image/png", "image/jpg", "image/jpeg"]
      }
    });

    activity.onsuccess = function () {
      console.log("Activity successfuly handled");
      var p = this.result.blob;
      cb(p);
    };

    activity.onerror = function () {
      console.log("The activity encouter en error: " + this.error);
    };
  }; //delete file


  function deleteFile(storage, path, notification) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var requestDel = sdcard[storage].delete(path);

    requestDel.onsuccess = function () {
      if (notification == "notification") {
        helper.toaster('File "' + name + '" successfully deleted frome the sdcard storage area');
      }
    };

    requestDel.onerror = function () {
      helper.toaster("Unable to delete the file: " + this.error);
    };
  }

  return {
    getManifest: getManifest,
    toaster: toaster,
    side_toaster: side_toaster,
    add_script: add_script,
    deleteFile: deleteFile,
    goodbye: goodbye,
    screenlock: screenlock,
    validate: validate,
    formatFileSize: formatFileSize,
    top_bar: top_bar,
    bottom_bar: bottom_bar,
    notify: notify,
    uid: uid,
    sort_array: sort_array,
    pick_image: pick_image
  };
}();

console.log(helper); //polyfill

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

function hashCode(str) {
  var hash = 0;

  for (var i = 0; i < str.length; i++) {
    hash = ~~((hash << 5) - hash + str.charCodeAt(i));
  }

  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
}

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function share(url) {
  var activity = new MozActivity({
    name: "share",
    data: {
      type: "url",
      url: url
    }
  });

  activity.onsuccess = function () {};

  activity.onerror = function () {
    console.log("The activity encounter en error: " + this.error);
  };
} //check if internet connection


function check_iconnection() {
  function updateOfflineStatus() {
    toaster("Your Browser is offline", 15000);
    return false;
  }

  window.addEventListener("offline", updateOfflineStatus);
}

function delete_file(filename) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var request = sdcard[1].delete(filename);

  request.onsuccess = function () {//toaster("File deleted", 2000);
  };

  request.onerror = function () {//toaster("Unable to delete the file: " + this.error, 2000);
  };
}

function get_file(filename) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var request = sdcard[1].get(filename);

  request.onsuccess = function () {
    var file = this.result; //alert("Get the file: " + file.name);
  };

  request.onerror = function () {//alert("Unable to get the file: " + this.error);
  };
}

function write_file(data, filename) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var file = new Blob([data], {
    type: "text/plain"
  });
  var request = sdcard[1].addNamed(file, filename);

  request.onsuccess = function () {
    var name = this.result; //toaster('File "' + name + '" successfully wrote on the sdcard storage area', 2000);
  }; // An error typically occur if a file with the same name already exist


  request.onerror = function () {
    toaster("Unable to write the file: " + this.error, 2000);
  };
}
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40361" + '/');

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
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/helper.js"], null)
//# sourceMappingURL=/helper.cfb51ffc.js.map