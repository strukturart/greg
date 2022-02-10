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
})({"assets/js/applait.finder.min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*!
 * EventEmitter v4.2.9 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */
(function () {
  "use strict";

  function EventEmitter() {}

  function indexOfListener(listeners, listener) {
    for (var i = listeners.length; i--;) {
      if (listeners[i].listener === listener) return i;
    }

    return -1;
  }

  function alias(name) {
    return function () {
      return this[name].apply(this, arguments);
    };
  }

  var proto = EventEmitter.prototype,
      exports = this,
      originalGlobalValue = exports.EventEmitter;
  proto.getListeners = function (evt) {
    var response,
        key,
        events = this._getEvents();

    if (evt instanceof RegExp) {
      response = {};

      for (key in events) {
        events.hasOwnProperty(key) && evt.test(key) && (response[key] = events[key]);
      }
    } else response = events[evt] || (events[evt] = []);

    return response;
  }, proto.flattenListeners = function (listeners) {
    var i,
        flatListeners = [];

    for (i = 0; i < listeners.length; i += 1) {
      flatListeners.push(listeners[i].listener);
    }

    return flatListeners;
  }, proto.getListenersAsObject = function (evt) {
    var response,
        listeners = this.getListeners(evt);
    return listeners instanceof Array && (response = {}, response[evt] = listeners), response || listeners;
  }, proto.addListener = function (evt, listener) {
    var key,
        listeners = this.getListenersAsObject(evt),
        listenerIsWrapped = "object" == _typeof(listener);

    for (key in listeners) {
      listeners.hasOwnProperty(key) && -1 === indexOfListener(listeners[key], listener) && listeners[key].push(listenerIsWrapped ? listener : {
        listener: listener,
        once: !1
      });
    }

    return this;
  }, proto.on = alias("addListener"), proto.addOnceListener = function (evt, listener) {
    return this.addListener(evt, {
      listener: listener,
      once: !0
    });
  }, proto.once = alias("addOnceListener"), proto.defineEvent = function (evt) {
    return this.getListeners(evt), this;
  }, proto.defineEvents = function (evts) {
    for (var i = 0; i < evts.length; i += 1) {
      this.defineEvent(evts[i]);
    }

    return this;
  }, proto.removeListener = function (evt, listener) {
    var index,
        key,
        listeners = this.getListenersAsObject(evt);

    for (key in listeners) {
      listeners.hasOwnProperty(key) && (index = indexOfListener(listeners[key], listener), -1 !== index && listeners[key].splice(index, 1));
    }

    return this;
  }, proto.off = alias("removeListener"), proto.addListeners = function (evt, listeners) {
    return this.manipulateListeners(!1, evt, listeners);
  }, proto.removeListeners = function (evt, listeners) {
    return this.manipulateListeners(!0, evt, listeners);
  }, proto.manipulateListeners = function (remove, evt, listeners) {
    var i,
        value,
        single = remove ? this.removeListener : this.addListener,
        multiple = remove ? this.removeListeners : this.addListeners;
    if ("object" != _typeof(evt) || evt instanceof RegExp) for (i = listeners.length; i--;) {
      single.call(this, evt, listeners[i]);
    } else for (i in evt) {
      evt.hasOwnProperty(i) && (value = evt[i]) && ("function" == typeof value ? single.call(this, i, value) : multiple.call(this, i, value));
    }
    return this;
  }, proto.removeEvent = function (evt) {
    var key,
        type = _typeof(evt),
        events = this._getEvents();

    if ("string" === type) delete events[evt];else if (evt instanceof RegExp) for (key in events) {
      events.hasOwnProperty(key) && evt.test(key) && delete events[key];
    } else delete this._events;
    return this;
  }, proto.removeAllListeners = alias("removeEvent"), proto.emitEvent = function (evt, args) {
    var listener,
        i,
        key,
        response,
        listeners = this.getListenersAsObject(evt);

    for (key in listeners) {
      if (listeners.hasOwnProperty(key)) for (i = listeners[key].length; i--;) {
        listener = listeners[key][i], listener.once === !0 && this.removeListener(evt, listener.listener), response = listener.listener.apply(this, args || []), response === this._getOnceReturnValue() && this.removeListener(evt, listener.listener);
      }
    }

    return this;
  }, proto.trigger = alias("emitEvent"), proto.emit = function (evt) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(evt, args);
  }, proto.setOnceReturnValue = function (value) {
    return this._onceReturnValue = value, this;
  }, proto._getOnceReturnValue = function () {
    return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
  }, proto._getEvents = function () {
    return this._events || (this._events = {});
  }, EventEmitter.noConflict = function () {
    return exports.EventEmitter = originalGlobalValue, EventEmitter;
  }, "function" == typeof define && define.amd ? define(function () {
    return EventEmitter;
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = EventEmitter : exports.EventEmitter = EventEmitter;
}).call(this);
/**
 * @file
 * File picker and finder for device storages on Firefox OS devices
 *
 * This library provides an easy-to-use asynchronous interface for other Firefox OS apps to search for files
 * on Firefox OS devices. The library is based on an event-based architecture, letting developers build
 * beautiful asynchronous API for their apps.
 *
 * The `Finder` library is best used by developers looking to pick a file from the `sdcard` for their apps.
 *
 * This library depends on [EventEmitter](https://github.com/Wolfy87/EventEmitter) by Wolfy87, included with the
 * package.
 *
 * @version 1.1.3
 * @license The MIT License (MIT)
 * @author Applait Technologies LLP
 * @copyright Copyright (c) 2014 Applait Technologies LLP
 */

var Applait = Applait || {};
Applait.Finder = function (options) {
  this.options = options || {}, this.type = this.options.type || "sdcard", this.hidden = this.options.hidden || !1, this.casesensitive = this.options.caseSensitive || !1, this.minsearchlength = this.options.minSearchLength && "number" == typeof this.options.minSearchLength ? options.minSearchLength : 3, this.debugmode = this.options.debugMode ? !0 : !1, this.storages = navigator.getDeviceStorages && navigator.getDeviceStorages(this.type), this.searchcompletecount = 0, this.filematchcount = 0, this.searchkey = "";
}, Applait.Finder.prototype = new EventEmitter(), Applait.Finder.prototype.checkhidden = function (fullpath) {
  return "/" === fullpath[fullpath.indexOf(".") - 1] && this.hidden !== !0 ? !1 : !0;
}, Applait.Finder.prototype.search = function (needle) {
  var self = this;
  return self.reset(), self.searchkey = self.casesensitive ? needle.trim() : needle.trim().toLowerCase(), self.searchkey.length < self.minsearchlength ? (self.log("searchCancelled", ["Search string should be at least " + self.minsearchlength + " characters"]), self.emitEvent("searchCancelled", ["Search string should be at least " + self.minsearchlength + " characters"]), null) : self.storagecount() < 1 ? (self.log("empty", [self.searchkey]), self.emitEvent("empty", [self.searchkey]), null) : (self.log("searchBegin", [self.searchkey]), self.emitEvent("searchBegin", [self.searchkey]), void self.storages.forEach(function (storage) {
    var cursor = storage.enumerate();
    self.log("storageSearchBegin", [storage.storageName, self.searchkey]), self.emitEvent("storageSearchBegin", [storage.storageName, self.searchkey]), cursor.onsuccess = function () {
      if (this.result) {
        var file = this.result,
            fileinfo = self.splitname(file.name);
        self.matchname(fileinfo.name, file.name) && (self.filematchcount++, self.log("fileFound", [file, fileinfo, storage.storageName]), self.emitEvent("fileFound", [file, fileinfo, storage.storageName])), this.done ? (self.searchcompletecount++, self.log("storageSearchComplete", [storage.storageName, self.searchkey]), self.emitEvent("storageSearchComplete", [storage.storageName, self.searchkey])) : this.continue();
      } else self.searchcompletecount++, self.log("storageSearchComplete", [storage.storageName, self.searchkey]), self.emitEvent("storageSearchComplete", [storage.storageName, self.searchkey]);

      self.searchcompletecount === self.storagecount() && (self.log("searchComplete", [self.searchkey, self.filematchcount]), self.emitEvent("searchComplete", [self.searchkey, self.filematchcount]));
    }, cursor.onerror = function () {
      self.log("error", ["Error accessing device storage '" + storage.storageName + "'", this.error]), self.emitEvent("error", ["Error accessing device storage '" + storage.storageName + "'", this.error]);
    };
  }));
}, Applait.Finder.prototype.splitname = function (filename) {
  return filename = filename.split(/[\\/]/), {
    name: filename.pop(),
    path: filename.join("/")
  };
}, Applait.Finder.prototype.storagecount = function () {
  return this.storages && this.storages.length ? this.storages.length : 0;
}, Applait.Finder.prototype.reset = function () {
  this.filematchcount = 0, this.searchcompletecount = 0, this.searchkey = "";
}, Applait.Finder.prototype.log = function (message, args) {
  this.debugmode && console.log(message, args);
}, Applait.Finder.prototype.matchname = function (name, fullpath) {
  return name = this.casesensitive ? name.trim() : name.trim().toLowerCase(), name.indexOf(this.searchkey) > -1 && this.checkhidden(fullpath);
};
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
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/applait.finder.min.js"], null)
//# sourceMappingURL=/applait.finder.min.a9ac16b3.js.map