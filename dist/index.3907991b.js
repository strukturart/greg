// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"5r4QG":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "42036d7a98ade5a7";
module.bundle.HMR_BUNDLE_ID = "5d57051a3907991b";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"20BJq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "status", ()=>status
);
parcelHelpers.export(exports, "events", ()=>events
);
var _localforage = require("localforage");
var _localforageDefault = parcelHelpers.interopDefault(_localforage);
var _mustache = require("mustache");
var _mustacheDefault = parcelHelpers.interopDefault(_mustache);
var _helperJs = require("./assets/js/helper.js");
var _getMoonPhaseJs = require("./assets/js/getMoonPhase.js");
var _eximportJs = require("./assets/js/eximport.js");
var _scanJs = require("./assets/js/scan.js");
"use strict";
let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec", 
];
let weekday = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();
let monthAndYear = document.getElementById("monthAndYear");
let once = false;
let status = {
    view: "month",
    selected_day: "",
    visible: false,
    update_event_id: ""
};
let settings = {
};
let blob = "";
let events = [];
//ads || ads free
//KaioOs ads
let getManifest = function(callback) {
    if (!navigator.mozApps) return false;
    let self1 = navigator.mozApps.getSelf();
    self1.onsuccess = function() {
        callback(self1.result);
    };
    self1.onerror = function() {
    };
};
let self;
//KaiOs store true||false
function manifest(a) {
    self = a.origin;
    let t1 = document.getElementById("KaiOsAds-Wrapper");
    if (a.installOrigin == "app://kaios-plus.kaiostech.com") document.querySelector("#KaiOsAds-Wrapper iframe").src = "ads.html";
    else {
        console.log("Ads free");
        t1.style.display = "none";
    }
}
getManifest(manifest);
// ////////
// finde closest event to selected date in list view
// ////////
let find_closest_date = function(search_term) {
    let t2 = 0;
    let search = new Date(search_term).getTime();
    for(let i = 0; i < events.length; i++){
        let item = new Date(events[i].dateStart).getTime();
        if (search < item) {
            t2 = events[i - 1].dateStart;
            i = events.length;
        }
        //after last event
        //focus last event
        if (search > new Date(events[events.length - 1].dateStart).getTime()) {
            t2 = events[events.length - 1].dateStart;
            i = events.length;
        }
    }
    document.querySelectorAll("div#list-view article[data-date='" + t2 + "']")[0].focus();
    return t2;
};
// check if has event
let event_check = function(date) {
    let feedback = {
        date: "",
        event: false,
        subscription: false,
        multidayevent: false,
        rrule: "none"
    };
    for(let t3 = 0; t3 < events.length; t3++)if (typeof events[t3] === "object") {
        feedback.event = false;
        feedback.subscription = false;
        feedback.multidayevent = false;
        feedback.rrule = false;
        //feedback.date = date;
        let a = new Date(events[t3].dateStart).getTime();
        let b = new Date(events[t3].dateEnd).getTime();
        let c = new Date(date).getTime();
        // multi day event
        if (events[t3]["rrule_"] == "none") {
            if (a === c || b === c || a < c && b > c) {
                feedback.event = true;
                if (events[t3].isSubscription === true) feedback.subscription = true;
                if (events[t3].multidayevent === true) feedback.multidayevent = true;
                if (events[t3].time_end == "00:00:00" && events[t3].dateEnd == date) {
                    feedback.subscription = false;
                    feedback.event = false;
                }
                t3 = events.length;
            }
        }
    }
    return feedback;
};
// check if has event
let rrule_check = function(date) {
    let feedback = {
        date: "",
        event: false,
        subscription: false,
        multidayevent: false,
        rrule: "none"
    };
    for(let t4 = 0; t4 < events.length; t4++)if (typeof events[t4] === "object") {
        feedback.event = false;
        feedback.subscription = false;
        feedback.multidayevent = false;
        feedback.rrule = false;
        feedback.date = date;
        let a = new Date(events[t4].dateStart).getTime();
        let b = new Date(events[t4].dateEnd).getTime();
        let c = new Date(date).getTime();
        //recurrences
        if (typeof events[t4]["rrule_"] !== "undefined" && events[t4]["rrule_"] !== undefined) {
            if (new Date(events[t4].dateStart).getTime() <= new Date(date).getTime() && new Date(date).getTime() <= new Date(events[t4].dateEnd).getTime()) {
                if (events[t4].rrule_ == "MONTHLY") {
                    if (new Date(events[t4].dateStart).getDate() === new Date(date).getDate()) {
                        feedback.rrule = true;
                        t4 = events.length;
                        return feedback;
                    }
                }
                if (events[t4]["rrule_"] == "DAILY") {
                    feedback.rrule = true;
                    t4 = events.length;
                    return feedback;
                }
                if (events[t4].rrule_ == "WEEKLY") {
                    if (new Date(events[t4].dateStart).getDay() === new Date(date).getDay()) {
                        feedback.rrule = true;
                        t4 = events.length;
                        return feedback;
                    }
                }
                if (events[t4].rrule_ == "YEARLY") {
                    let tt = new Date(events[t4].dateStart);
                    let pp = new Date(date);
                    if (tt.getDate() + "-" + tt.getMonth() === pp.getDate() + "-" + pp.getMonth()) {
                        feedback.rrule = true;
                        t4 = events.length;
                        return feedback;
                    }
                }
            }
        }
    }
    return feedback;
};
//////////////////
//event slider
///////////
let slider = [];
let slider_index = 0;
let event_check_day = function(date) {
    slider = [];
    let k = document.querySelector("div#event-slider-indicator div");
    k.innerHTML = "";
    //hide all
    let item = document.querySelectorAll("div#event-slider article");
    for(let i = 0; i < item.length; i++){
        item[i].style.display = "none";
        let a = new Date(item[i].getAttribute("data-date")).getTime();
        let b = new Date(item[i].getAttribute("data-date-end")).getTime();
        let c = new Date(date).getTime();
        //hide/show alarm icon
        if (item[i].getAttribute("data-alarm")) {
            if (item[i].getAttribute("data-alarm") == "none") item[i].querySelector("div.icons-bar img.bell").style.display = "none";
        }
        //all day event
        if (item[i].getAttribute("data-time-start") == "00:00:00" && item[i].getAttribute("data-time-end") == "00:00:00") item[i].querySelector("div.time").innerHTML = "All day";
        let d1 = item[i].getAttribute("data-rrule");
        if (d1 === "none" || d1 === "") {
            if (a === c || b === c || a < c && b > c) {
                //if multiday event
                //the end date is next day
                //time is 00:00:00
                if (item[i].getAttribute("data-time-end") == "00:00:00" && item[i].getAttribute("data-date-end") == date) return false;
                slider.push(item[i]);
                slider[0].style.display = "block";
                k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
            }
        } else if (a === c || b === c || a < c && b > c && d1) {
            //recurrences
            //YEAR
            if (d1 == "YEARLY") {
                let tt = new Date(item[i].getAttribute("data-date"));
                let pp = new Date(date);
                if (tt.getDate() + "-" + tt.getMonth() === pp.getDate() + "-" + pp.getMonth()) {
                    slider.push(item[i]);
                    slider[0].style.display = "block";
                    k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
                }
            }
            //WEEK
            if (d1 == "WEEKLY") {
                if (new Date(item[i].getAttribute("data-date")).getDay() == new Date(date).getDay()) {
                    slider.push(item[i]);
                    slider[0].style.display = "block";
                    k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
                }
            }
            //MONTH
            if (d1 == "MONTHLY") {
                if (new Date(item[i].getAttribute("data-date")).getDate() == new Date(date).getDate()) {
                    slider.push(item[i]);
                    slider[0].style.display = "block";
                    k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
                }
            }
            if (d1 == "DAILY") {
                if (a === c || b === c || a < c && b > c) {
                    slider.push(item[i]);
                    slider[0].style.display = "block";
                    k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
                }
            }
        }
    }
    if (slider != "" && slider.length > 0) k.style.opacity = 100;
    else k.style.opacity = 0;
};
let slider_navigation = function() {
    let p = document.querySelectorAll("div#event-slider-indicator div div");
    if (slider_index == slider.length - 1) slider_index = -1;
    slider_index++;
    slider.forEach(function(item) {
        item.style.display = "none";
    });
    slider[slider_index].style.display = "block";
    p.forEach(function(item) {
        item.classList.remove("active");
    });
    p[slider_index].classList.add("active");
};
////
// JUMP TO TODAY
////
let jump_to_today = function() {
    let currentMonth1 = today.getMonth();
    let currentYear1 = today.getFullYear();
    showCalendar(currentMonth1, currentYear1);
    event_check_day(status.selected_day);
    status.selected_day = document.activeElement.getAttribute("data-date");
};
function next() {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
    event_check_day(status.selected_day);
}
function previous() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
    event_check_day(status.selected_day);
}
//////////////
//BUILD CALENDAR
//////////////
// get weeknumber
Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};
let showCalendar = function(month1, year) {
    _helperJs.bottom_bar("add", "events", "options");
    let firstDay = new Date(year, month1).getDay();
    let daysInMonth = 32 - new Date(year, month1, 32).getDate();
    let tbl = document.getElementById("calendar-body");
    // clearing all previous cells
    tbl.innerHTML = "";
    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month1] + " " + year;
    // creating all cells
    let date = 1;
    for(let i = 0; i < 6; i++){
        // creates a table row
        let row = document.createElement("div");
        row.classList.add("flex");
        row.classList.add("row");
        row.classList.add("width-100");
        // creating individual cells, filing them up with data.
        for(let j = 0; j < 7; j++){
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("div");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) break;
            else {
                let cell = document.createElement("div");
                let span = document.createElement("span");
                let moon = document.createElement("div");
                let cellText = document.createTextNode(date);
                cell.appendChild(cellText);
                cell.appendChild(span);
                // set tabindex
                cell.setAttribute("tabindex", date - 1);
                // store date with leading 0
                // because input type date
                // accept only day month with leading zero
                let mmonth = `0${month1 + 1}`.slice(-2);
                let day = `0${date}`.slice(-2);
                let p = year + "-" + mmonth + "-" + day;
                moon.classList.add("moon-phase-" + _getMoonPhaseJs.getMoonPhase(year, month1, date));
                cell.appendChild(moon);
                cell.setAttribute("data-date", p);
                cell.setAttribute("data-index", new Date(p).toISOString());
                // check if has event
                if (events.length > 0) {
                    if (event_check(p).event == true) cell.classList.add("event");
                    if (rrule_check(p).rrule) cell.classList.add("event");
                    // check if has event + subscription
                    if (event_check(p).subscription == true) cell.classList.add("subscription");
                }
                cell.classList.add("item");
                row.appendChild(cell);
                date++;
            }
        }
        // add weeknumbers
        let week = document.createElement("span");
        week.classList.add("weeknumber");
        let weekText = document.createTextNode(new Date(year, month1, date).getWeek());
        week.appendChild(weekText);
        row.appendChild(week);
        //add row
        tbl.appendChild(row);
    }
    document.querySelectorAll(".item")[0].focus();
    status.selected_day = document.activeElement.getAttribute("data-date");
    // highlight current day
    if (today.getMonth() == month1 && today.getFullYear() == year) {
        document.querySelectorAll(".item")[currentDay - 1].focus();
        document.querySelectorAll(".item")[currentDay - 1].classList.add("today");
    }
};
let set_tabindex = function() {
    document.querySelectorAll("div#list-view article").forEach(function(i, p) {
        i.setAttribute("tabindex", p);
    });
};
//RENDER
function renderHello(arr) {
    document.getElementById("event-slider").style.opacity = 0;
    _helperJs.sort_array(arr, "dateStart", "date");
    var template = document.getElementById("template").innerHTML;
    var rendered = _mustacheDefault.default.render(template, {
        data: arr
    });
    document.getElementById("list-view").innerHTML = rendered;
    document.getElementById("event-slider").innerHTML = rendered;
    document.getElementById("event-slider").style.opacity = 100;
    set_tabindex();
    //event_check_day(document.activeElement.getAttribute("data-date"));
    //format date
    document.querySelectorAll("article").forEach(function(index) {
        let w = index.getAttribute("data-time-start");
        let s = index.getAttribute("data-time-end");
        if (w == "00:00:00" && s == "00:00:00") index.querySelector("div.time").innerHTML = "All day";
        let t5 = new Date(index.getAttribute("data-date"));
        let n = new Date(index.getAttribute("data-date-end"));
        let d2 = weekday[t5.getDay()] + ", " + t5.getFullYear() + " " + months[t5.getMonth()] + " " + t5.getDate();
        let m1 = weekday[n.getDay()] + ", " + n.getFullYear() + " " + months[n.getMonth()] + " " + n.getDate();
        // to do singel day event or not
        if (index.classList.contains("multidayevent")) index.querySelector("div.date").innerText = d2 + " - " + m1;
        else index.querySelector("div.date").innerText = d2;
    });
}
let clear_form = function() {
    document.querySelectorAll("div#add-edit-event input").forEach(function(e) {
        e.value = "";
        document.getElementById("form-image").src = "";
        blob = "";
    });
};
/*
 ///////////////
// ///////////////
// /////////////////
// /ROUTER
// ///////////////
// ///////////////
// //////////////
*/ const month = document.getElementById("calendar");
const add_edit_event = document.getElementById("add-edit-event");
const list_view = document.getElementById("list-view");
const options = document.getElementById("options");
let option_button_bar = function() {
    setTimeout(function() {
        if (status.view == "options") {
            if (document.activeElement.getAttribute("data-function") == "subscription") {
                _helperJs.bottom_bar("delete", "select", "");
                return true;
            } else {
                _helperJs.bottom_bar("", "select", "");
                return true;
            }
        }
    }, 500);
};
const pages = document.querySelectorAll(".page");
let router = function(view) {
    pages.forEach(function(index) {
        index.style.display = "none";
    });
    if (view == "view") {
        if (status.view == "month") status.view = "list-view";
        else status.view = "month";
    }
    // add event view
    if (status.view == "add-edit-event") {
        if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
        document.getElementById("event-date").value = status.selected_day;
        add_edit_event.style.display = "block";
        document.querySelectorAll("div#add-edit-event .item").forEach(function(i, p) {
            i.setAttribute("tabindex", p);
        });
        add_edit_event.querySelectorAll(".item")[0].focus();
        _helperJs.bottom_bar("", "edit", "");
        if (document.getElementById("event-date-end").value == "") document.getElementById("event-date-end").value = document.getElementById("event-date").value;
        if (status.edit_event) document.getElementById("save-event").innerText = "update";
        console.log(status.edit_event);
        if (!status.edit_event) {
            document.getElementById("save-event").innerText = "save";
            document.getElementById("event-notification-time").value = settings.default_notification;
        }
        return true;
    }
    // month view
    if (status.view == "month") {
        if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
        options.style.display = "none";
        month.style.display = "block";
        _helperJs.bottom_bar("add", "events", "options");
        status.edit_event = false;
        let t6 = new Date(status.selected_day);
        currentMonth = t6.getMonth();
        currentYear = t6.getFullYear();
        let k = status.selected_day;
        showCalendar(currentMonth, currentYear);
        document.querySelectorAll("div#calendar-body div.item").forEach(function(item) {
            if (item.getAttribute("data-date") == k) {
                item.focus();
                event_check_day(k);
            }
        });
        clear_form();
    }
    // list view
    if (status.view == "list-view") {
        if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
        options.style.display = "none";
        status.edit_event = false;
        clear_form();
        _helperJs.bottom_bar("edit", "month", "options");
        list_view.style.display = "block";
        setTimeout(function() {
            let articles = document.querySelectorAll("div#list-view article");
            let success = false;
            for(var k = 0; k < articles.length; k++)if (articles[k].getAttribute("data-date") == status.selected_day) {
                articles[k].focus();
                k = articles.length;
                success = true;
            }
            for(var k = 0; k < articles.length; k++){
                console.log(articles[k].getAttribute("data-alarm"));
                if (articles[k].getAttribute("data-alarm") == "none") articles[k].querySelector("img.bell").style.display = "none";
            }
            if (!success) {
                document.querySelectorAll("div#list-view article")[0].focus();
                find_closest_date(status.selected_day);
            }
            const rect = document.activeElement.getBoundingClientRect();
            const elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
            document.activeElement.parentNode.scrollBy({
                left: 0,
                top: elY - window.innerHeight / 2,
                behavior: "smooth"
            });
        }, 1000);
    }
    if (status.view == "options") {
        if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
        if (!once) {
            _eximportJs.list_ics();
            list_subscriptions();
            once = true;
        }
        document.getElementById("options").style.display = "block";
        document.querySelectorAll("div#options .item")[0].focus();
        document.getElementById("options").style.opacity = "1";
        document.getElementById("subscription-form").style.display = "none";
        setTimeout(function() {
            Array.from(document.querySelectorAll("div#options .item")).forEach(function(i, p) {
                i.setAttribute("tabindex", p);
            });
        }, 2000);
        option_button_bar();
    }
    if (status.view == "subscription") {
        document.getElementById("options").style.opacity = "0.3";
        document.getElementById("subscription-form").style.display = "block";
        document.querySelectorAll("div#subscription-form div.item input")[0].focus();
        _helperJs.bottom_bar("QR", "", "save");
    }
};
let list_subscriptions = function() {
    if (subscriptions == null) return false;
    subscriptions.forEach(function(item) {
        document.querySelector("div#options div#subscription-text").insertAdjacentHTML("afterend", '<button class="item dynamic" data-function="subscription">' + item.name + "</button>");
        document.querySelectorAll("div#options button").forEach(function(i, p) {
            i.setAttribute("tabindex", p);
        });
    });
};
let lp = 0;
let load_subscriptions = function() {
    if (subscriptions == null || subscriptions.lenght == -1 || subscriptions.lenght == "undefined") return false;
    if (lp < subscriptions.length) {
        _eximportJs.fetch_ics(subscriptions[lp].url, load_subscriptions);
        lp++;
    }
    jump_to_today();
    renderHello(events);
    event_check_day(document.activeElement.getAttribute("data-date"));
    if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
};
let callback_scan = function(url) {
    _helperJs.bottom_bar("QR", "", "save");
    status.view = "subscription";
    document.querySelector("div#subscription-form input#cal-subs-url").value = url;
};
let subscriptions = new Array();
let store_subscription = function() {
    if (_helperJs.validate(document.getElementById("cal-subs-url").value) && document.getElementById("cal-subs-name").value != "") {
        subscriptions = [];
        subscriptions.push({
            url: document.getElementById("cal-subs-url").value,
            name: document.getElementById("cal-subs-name").value
        });
        document.querySelector("input#cal-subs-name").val = "";
        document.querySelector("input#cal-subs-url").val = "";
        _localforageDefault.default.setItem("subscriptions", subscriptions).then(function(value) {
            document.getElementById("subscription-form").style.display = "none";
            _helperJs.toaster("subscription stored", 2000);
            status.view = "options";
            router();
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
        load_subscriptions();
        list_subscriptions();
    } else _helperJs.toaster("Please enter a name and a valid url", 2000);
};
let delete_subscription = function() {
    let updated_subscriptions = subscriptions.filter((e)=>e.name != document.activeElement.innerText
    );
    _localforageDefault.default.setItem("subscriptions", updated_subscriptions).then(function(value) {
        //Do other things once the value has been saved.
        console.log("saved: " + value);
        _helperJs.toaster("subscription deleted", 2000);
        status.view = "month";
        router();
    }).catch(function(err) {
        // This code runs if there were any errors
        _helperJs.toaster(err, 2000);
    });
    document.activeElement.remove();
};
_localforageDefault.default.getItem("events").then(function(value) {
    if (value != null) events = value;
    renderHello(events);
    jump_to_today();
}).catch(function(err) {
    jump_to_today();
});
_localforageDefault.default.getItem("subscriptions").then(function(value) {
    subscriptions = value;
    setTimeout(function() {
        if (subscriptions == null) return false;
        load_subscriptions();
        console.log(subscriptions);
    }, 2000);
}).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
});
_localforageDefault.default.getItem("settings").then(function(value) {
    if (value == null) return false;
    settings = value;
    document.getElementById("default-notification-time").value = settings.default_notification;
}).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
});
function handleVisibilityChange() {
    if (document.visibilityState === "hidden") status.visible = false;
    else setTimeout(function() {
        status.visible = true;
    }, 1000);
}
handleVisibilityChange();
/////////////////
///NAVIGATION
/////////////////
let nav = function(move) {
    if (document.activeElement.nodeName == "SELECT" || document.activeElement.type == "date" || document.activeElement.type == "time") return false;
    const currentIndex = document.activeElement.tabIndex;
    let next1 = currentIndex + move;
    let items = 0;
    if (status.view == "month") {
        let b = document.activeElement.parentNode.parentNode;
        items = b.querySelectorAll(".item");
    }
    if (status.view == "list-view") {
        let b = document.activeElement.parentNode;
        items = b.querySelectorAll("div#list-view article");
    }
    if (status.view == "subscription") items = document.querySelectorAll("div#subscription-form > div.item");
    if (status.view == "add-edit-event" || status.view == "options") {
        let b = document.activeElement.parentNode;
        items = b.querySelectorAll(".item");
        if (document.activeElement.parentNode.classList.contains("input-parent")) {
            document.activeElement.parentNode.focus();
            return true;
        } else document.getElementById("add-edit-event").firstElementChild.focus();
    }
    let targetElement = 0;
    if (next1 <= items.length) {
        targetElement = items[next1];
        targetElement.focus();
    }
    if (next1 == items.length) {
        targetElement = items[0];
        targetElement.focus();
    }
    const rect = document.activeElement.getBoundingClientRect();
    const elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
    document.activeElement.parentNode.scrollBy({
        left: 0,
        top: elY - window.innerHeight / 2,
        behavior: "smooth"
    });
    if (status.view == "month" || status.view == "list-view") {
        if (targetElement.hasAttribute("data-date")) {
            status.selected_day = targetElement.getAttribute("data-date");
            status.selected_day_id = targetElement.getAttribute("data-id");
            event_check_day(status.selected_day);
        }
        return true;
    }
    if (document.activeElement.id == "form-image-wrapper" && status.view == "add-edit-event") {
        _helperJs.bottom_bar("", "remove image", "");
        return true;
    }
    if (document.activeElement.id != "form-image-wrapper" && status.view == "add-edit-event") {
        _helperJs.bottom_bar("", "edit", "");
        return true;
    }
};
// foram actions
// after selection
document.getElementById("event-notification-time").addEventListener("change", (event)=>{
    setTimeout(function() {
        document.getElementById("event-notification-time").parentElement.focus();
    }, 500);
});
//default when is not set
settings.default_notification = "none";
document.getElementById("default-notification-time").addEventListener("change", (event)=>{
    let l = document.getElementById("default-notification-time").value;
    settings.default_notification = l;
    _localforageDefault.default.setItem("settings", settings).then(function(value) {
    }).catch(function(err) {
        console.log(err);
    });
    setTimeout(function() {
        document.getElementById("default-notification-time").parentElement.focus();
    }, 500);
});
document.querySelectorAll('input[type="time"]').forEach(function(item) {
    item.addEventListener("change", (event)=>{
        setTimeout(function() {
            item.parentElement.focus();
        }, 500);
    });
});
document.querySelectorAll('input[type="date"]').forEach(function(item) {
    item.addEventListener("change", (event)=>{
        setTimeout(function() {
            item.parentElement.focus();
        }, 500);
    });
});
let add_alarm = function(date, message_text, id) {
    // KaiOs  2.xx
    if (navigator.mozAlarms) {
        // This is arbitrary data pass to the alarm
        var data = {
            foo: message_text,
            event_id: id
        };
        // The "honorTimezone" string is what make the alarm honoring it
        var request = navigator.mozAlarms.add(date, "honorTimezone", data);
        request.onsuccess = function() {
        // console.log(this.result);
        };
        request.onerror = function() {
            console.log("An error occurred: " + this.error.name);
        };
    }
};
// may better to compare all alarms
// with all events
// to clean
let remove_alarm = function(id) {
    // KaiOs  2.xx
    if (navigator.mozAlarms) {
        let request = navigator.mozAlarms.getAll();
        request.onsuccess = function() {
            this.result.forEach(function(alarm) {
                if (alarm.data.event_id == id) {
                    let req = navigator.mozAlarms.remove(alarm.id);
                    req.onsuccess = function() {
                        console.log("removed");
                    };
                    req.onerror = function() {
                        console.log("An error occurred: " + this.error.name);
                    };
                } else console.log("no alarm founded");
            });
        };
        request.onerror = function() {
            console.log("An error occurred:", this.error.name);
        };
    }
};
let test_alarm = function() {
    if (navigator.mozAlarms) {
        var request = navigator.mozAlarms.getAll();
        request.onsuccess = function() {
            this.result.forEach(function(alarm) {
                console.log("Id:", alarm.id);
                console.log("date:", alarm.date);
                console.log("respectTimezone:", alarm.respectTimezone);
                console.log("data:", JSON.stringify(alarm.data));
            });
        };
        request.onerror = function() {
            console.log("An error occurred:", this.error.name);
        };
    }
};
// //////////////////
// //BUILD EVENT-LIST
// /////////////////
// /////////////
// /////////////
// STORE EVENTS//
// /////////////
// /////////////
let convert_ics_date = function(t7) {
    let nn = t7.replace(/-/g, "");
    nn = nn.replace(/:/g, "");
    nn = nn.replace(" ", "T");
    nn = nn + "00";
    return nn;
};
let export_data = [];
let store_event = function() {
    let start_time = "00:00:00";
    if (document.getElementById("event-time-start").value != "") start_time = document.getElementById("event-time-start").value;
    let end_time = "00:00:00";
    if (document.getElementById("event-time-end").value != "") end_time = document.getElementById("event-time-end").value;
    let convert_dt_start = document.getElementById("event-date").value + " " + start_time;
    if (document.getElementById("event-date-end").value == "") document.getElementById("event-date-end").value = document.getElementById("event-date").value;
    let convert_dt_end = document.getElementById("event-date-end").value + " " + end_time;
    // notification before event
    let notification_time = document.getElementById("event-notification-time").value;
    let calc_notification;
    if (notification_time != "none") {
        calc_notification = new Date(convert_dt_start);
        calc_notification.setMinutes(calc_notification.getMinutes() - notification_time);
        notification_time = convert_ics_date(calc_notification.toISOString());
    }
    let multidayevent = false;
    let a = new Date(document.getElementById("event-date").value).getTime();
    let b = new Date(document.getElementById("event-date-end").value).getTime();
    if (a != b) multidayevent = true;
    let rrule_convert = function() {
        let p = document.getElementById("event-recur").value;
        let r;
        if (p != "" || p != "none") r = "FREQ=" + document.getElementById("event-recur").value + ";UNTIL=" + convert_ics_date(convert_dt_end);
        return r;
    };
    let event = {
        UID: _helperJs.uid(),
        SUMMARY: document.getElementById("event-title").value,
        LOCATION: document.getElementById("event-location").value,
        DESCRIPTION: document.getElementById("event-description").value,
        CLASS: "PRIVATE",
        DTSTAMP: convert_ics_date(convert_dt_start),
        DTSTART: convert_ics_date(convert_dt_start),
        DTEND: convert_ics_date(convert_dt_end),
        RRULE: rrule_convert(),
        rrule_: document.getElementById("event-recur").value,
        dateStart: document.getElementById("event-date").value,
        dateEnd: document.getElementById("event-date-end").value,
        time_start: document.getElementById("event-time-start").value,
        time_end: document.getElementById("event-time-end").value,
        alarm: document.getElementById("event-notification-time").value,
        alarmTrigger: notification_time,
        isSubscription: false,
        multidayevent: multidayevent,
        ATTACH: blob
    };
    if (event.alarm != "none") {
        event.BEGIN = "VALARM";
        event["TRIGGER;VALUE=DATE-TIME"] = notification_time;
        event.ACTION = "AUDIO";
        event.END = "VALARM";
        add_alarm(calc_notification, event.SUMMARY, event.UID);
    }
    events.push(event);
    let without_subscription = events.filter((events1)=>events1.isSubscription === false
    );
    _localforageDefault.default.setItem("events", without_subscription).then(function(value) {
        // clean form
        clear_form();
        renderHello(events);
        _eximportJs.export_ical("greg.ics", without_subscription);
    }).catch(function(err) {
        console.log(err);
    });
    status.view = "month";
    router();
};
// ////////////
// UPDATE EVENT
// /////////
let update_event = function() {
    events.forEach(function(index) {
        let a = new Date(document.getElementById("event-date").value).getTime();
        let b = new Date(document.getElementById("event-date-end").value).getTime();
        let multidayevent = false;
        if (a != b) multidayevent = true;
        if (index.UID == status.selected_day_id) {
            let start_time = "00:00:00";
            if (document.getElementById("event-time-start").value != "") start_time = document.getElementById("event-time-start").value;
            let end_time = "00:00:00";
            if (document.getElementById("event-time-end").value != "") end_time = document.getElementById("event-time-end").value;
            let convert_dt_start = document.getElementById("event-date").value + " " + start_time;
            let convert_dt_end = document.getElementById("event-date").value + " " + end_time;
            // notification before event
            let notification_time = document.getElementById("event-notification-time").value;
            let calc_notification = "";
            if (notification_time != "none") {
                calc_notification = new Date(convert_dt_start);
                calc_notification.setMinutes(calc_notification.getMinutes() - notification_time);
                notification_time = convert_ics_date(calc_notification.toISOString());
            }
            let rrule_convert = function() {
                let p = document.getElementById("event-recur").value;
                let r;
                if (p != "" || p != "none") r = "FREQ=" + document.getElementById("event-recur").value + ";UNTIL=" + convert_ics_date(convert_dt_end);
                return r;
            };
            index.SUMMARY = document.getElementById("event-title").value;
            index.DESCRIPTION = document.getElementById("event-description").value;
            index.LOCATION = document.getElementById("event-location").value;
            index.DTSTART = convert_ics_date(convert_dt_start);
            index.DTEND = convert_ics_date(convert_dt_end);
            index.dateEnd = document.getElementById("event-date-end").value;
            index.dateStart = document.getElementById("event-date").value;
            index.time_start = document.getElementById("event-time-start").value;
            index.time_end = document.getElementById("event-time-end").value;
            index.RRULE = rrule_convert();
            index.rrule_ = document.getElementById("event-recur").value;
            index.isSubscription = false;
            index.multidayevent = multidayevent;
            index.alarm = document.getElementById("event-notification-time").value;
            index.alarmTrigger = notification_time;
            if (blob != "") index.ATTACH = blob;
            if (index.alarm != "none") {
                remove_alarm(index.UID);
                index.BEGIN = "VALARM";
                index["TRIGGER;VALUE=DATE-TIME:"] = notification_time;
                index.ACTION = "AUDIO";
                index.END = "VALARM";
                add_alarm(calc_notification, index.SUMMARY, index.UID);
            }
        }
    });
    let without_subscription = events.filter((events2)=>events2.isSubscription === false
    );
    _localforageDefault.default.setItem("events", without_subscription).then(function(value) {
        // clean form
        renderHello(events);
        _eximportJs.export_ical("greg.ics", value);
        status.view = "month";
        router();
        clear_form();
    }).catch(function(err) {
    });
};
// ////////////
// EDIT EVENT
// /////////
let edit_event = function() {
    document.getElementById("delete-event").style.display = "block";
    document.getElementById("export-event").style.display = "block";
    events.forEach(function(index) {
        if (index.UID == status.selected_day_id) {
            document.getElementById("event-title").value = index.SUMMARY;
            document.getElementById("event-date").value = index.dateStart;
            document.getElementById("event-date-end").value = index.dateEnd;
            document.getElementById("event-time-start").value = index.time_start;
            document.getElementById("event-time-end").value = index.time_end;
            document.getElementById("event-description").value = index.DESCRIPTION;
            document.getElementById("event-location").value = index.LOCATION;
            document.querySelector("#event-notification-time").value = index.alarm;
            document.getElementById("form-image").src = index.ATTACH;
            document.getElementById("event-recur").value = index.rrule_;
        }
    });
};
//////////////
//DELETE EVENT
///////////
let delete_event = function() {
    let f = false;
    events = events.filter((person)=>person.UID != status.selected_day_id
    );
    remove_alarm(status.selected_day_id);
    f = true;
    status.edit_event = false;
    let without_subscription = events.filter((events3)=>events3.isSubscription === false
    );
    clear_form();
    _localforageDefault.default.setItem("events", without_subscription).then(function(value) {
        renderHello(events);
        _eximportJs.export_ical("greg.ics", value);
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
    return f;
};
// event slider
let t = new Date();
let m = `0${t.getMonth() + 1}`.slice(-2);
let d = `0${t.getDate()}`.slice(-2);
let y = t.getFullYear();
event_check_day(y + "-" + m + "-" + d);
// callback import event
let import_event = function(id, date) {
    _helperJs.toaster("done", 2000);
    _helperJs.bottom_bar("edit", "", "");
    //renderHello(events);
    let without_subscription = events.filter((events4)=>events4.isSubscription === false
    );
    _localforageDefault.default.setItem("events", without_subscription).then(function(value) {
        renderHello(events);
        _eximportJs.export_ical("greg.ics", without_subscription);
    }).catch(function(err) {
    });
};
let set_datetime_form = function() {
    let d3 = new Date();
    let d_h = `0${d3.getHours()}`.slice(-2);
    let d_m = `0${d3.getMinutes()}`.slice(-2);
    let p = d_h + ":" + d_m;
    let d_h_ = `0${d3.getHours() + 1}`.slice(-2);
    let d_m_ = `0${d3.getMinutes()}`.slice(-2);
    if (d_h_ > 23) d_h_ = "23";
    let pp = d_h_ + ":" + d_m_;
    document.getElementById("event-time-start").value = p;
    document.getElementById("event-time-end").value = pp;
};
let pick_image_callback = function(resultBlob) {
    let t8 = document.getElementById("form-image");
    t8.src = URL.createObjectURL(resultBlob);
    document.getElementById("form-image-wrapper").classList.add("item");
    document.querySelectorAll("div#add-edit-event .item").forEach(function(i, p) {
        i.setAttribute("tabindex", p);
    });
    let fr = new FileReader();
    fr.onload = function() {
        blob = fr.result;
    };
    fr.readAsDataURL(resultBlob);
};
// ////////////////////////////
// //KEYPAD HANDLER////////////
// ////////////////////////////
let longpress = false;
const longpress_timespan = 1000;
let timeout;
function repeat_action(param) {
    param.key;
}
// ////////////
// //LONGPRESS
// ///////////
function longpress_action(param) {
    switch(param.key){
        case "0":
            break;
        case "Backspace":
            window.close();
            break;
        case "ArrowLeft":
            status.view;
            break;
    }
}
// /////////////
// //SHORTPRESS
// ////////////
function shortpress_action(param) {
    switch(param.key){
        case "*":
            jump_to_today();
            break;
        case "ArrowUp":
            if (status.view == "month") nav(-7);
            if (status.view == "add-edit-event" || status.view == "list-view" || status.view == "options" || status.view == "subscription") nav(-1);
            break;
        case "ArrowDown":
            if (status.view == "month") nav(7);
            if (status.view == "add-edit-event" || status.view == "list-view" || status.view == "options" || status.view == "subscription") nav(1);
            break;
        case "ArrowRight":
            if (status.view != "month") return true;
            nav(1);
            break;
        case "ArrowLeft":
            if (status.view != "month") return true;
            nav(-1);
            break;
        case "1":
            previous();
            break;
        case "3":
            next();
            break;
        case "2":
            slider_navigation();
            break;
        case "#":
            document.querySelectorAll("div#calendar div#calendar-body div div [class^='moon-phase-']").forEach(function(e) {
                e.classList.toggle("active");
            });
            break;
        case "7":
            break;
        case "SoftRight":
        case "Alt":
            console.log(status.view);
            if (status.view == "month") {
                status.view = "options";
                router();
                return true;
            }
            if (status.view == "subscription") {
                // store subscription
                store_subscription();
                return true;
            }
            break;
        case "SoftLeft":
        case "Control":
            if (status.view == "list-view") {
                if (document.activeElement.classList.contains("subscription")) {
                    _helperJs.toaster("a subscription cannot be edited", 2000);
                    return false;
                }
                status.selected_day_id = document.activeElement.getAttribute("data-id");
                status.edit_event = true;
                edit_event();
                status.view = "add-edit-event";
                router();
            }
            if (status.view == "subscription") {
                _scanJs.start_scan(callback_scan);
                status.view = "scan";
                return true;
            }
            if (status.view == "options") {
                delete_subscription();
                return true;
            }
            if (status.view == "month") {
                status.view = "add-edit-event";
                router();
                // when new event
                // set time
                set_datetime_form();
                return true;
            }
            break;
        case "Enter":
            if (!status.visible) return false;
            if (document.activeElement.classList.contains("input-parent")) {
                document.activeElement.children[1].focus();
                return true;
            }
            if (document.activeElement.id == "export-event") {
                events.forEach(function(index) {
                    if (index.UID == status.selected_day_id) export_data.push(index);
                });
                _eximportJs.export_ical(export_data[0].UID + ".ics", export_data);
                _helperJs.toaster("event exported", 2000);
                return true;
            }
            if (document.activeElement.id == "select-image") {
                _helperJs.pick_image(pick_image_callback);
                return true;
            }
            if (document.activeElement.id == "form-image-wrapper") {
                document.getElementById("form-image").src = "";
                blob = "";
                return true;
            }
            if (document.activeElement.getAttribute("data-function") == "add-subscription") {
                status.view = "subscription";
                router();
                return true;
            }
            // same button with different text and action
            if (document.activeElement.id == "save-event") {
                if (status.edit_event) update_event();
                else store_event();
                return true;
            }
            if (document.activeElement.id == "delete-event") {
                if (delete_event()) {
                    status.view = "month";
                    router();
                }
                return true;
            }
            if (status.view == "options") {
                if (document.activeElement.getAttribute("data-function") == "export") _localforageDefault.default.getItem("events").then(function(value) {
                    _eximportJs.export_ical("greg.ics", value);
                }).catch(function(err) {
                    console.log(err);
                });
                if (document.activeElement.getAttribute("data-function") == "import") _eximportJs.loadICS(document.activeElement.getAttribute("data-filename"), import_event);
                return true;
            }
            if (status.view == "month" || status.view == "list-view") router("view");
            break;
        case "Backspace":
            if (status.view == "add-edit-event" && document.activeElement.tagName != "INPUT") {
                param.preventDefault;
                status.view = "month";
                router();
            }
            if (status.view == "options") {
                status.view = "month";
                router();
            }
            if (status.view == "scan") {
                param.preventDefault;
                status.view = "subscription";
                _scanJs.stop_scan();
                router();
            }
            if (status.view == "subscription") {
                param.preventDefault;
                status.view = "options";
                router();
            }
            break;
    }
}
// ///////////////////////////////
// //shortpress / longpress logic
// //////////////////////////////
function handleKeyDown(evt) {
    option_button_bar();
    if (evt.key === "Backspace") {
        if (status.view == "options" || status.view == "add-edit-event" || status.view == "scan") evt.preventDefault();
    }
    if (evt.key === "EndCall") {
        evt.preventDefault();
        window.close();
    }
    if (!evt.repeat) {
        longpress = false;
        timeout = setTimeout(()=>{
            longpress = true;
            longpress_action(evt);
        }, longpress_timespan);
    }
    if (evt.repeat) {
        if (evt.key == "Backspace") longpress = false;
        repeat_action(evt);
    }
}
function handleKeyUp(evt) {
    if (status.visible === false) return false;
    evt.key == "Backspace" && document.activeElement.tagName;
    clearTimeout(timeout);
    if (!longpress) shortpress_action(evt);
}
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
document.addEventListener("visibilitychange", handleVisibilityChange, false);

},{"localforage":"8ZRFG","mustache":"f4a22","./assets/js/helper.js":"db1Xp","./assets/js/getMoonPhase.js":"kaybj","./assets/js/eximport.js":"4kH1V","./assets/js/scan.js":"6auJa","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"8ZRFG":[function(require,module,exports) {
var global = arguments[3];
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/ (function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") module.exports = f();
    else if (typeof define === "function" && define.amd) define([], f);
    else {
        var g;
        if (typeof window !== "undefined") g = window;
        else if (typeof global !== "undefined") g = global;
        else if (typeof self !== "undefined") g = self;
        else g = this;
        g.localforage = f();
    }
})(function() {
    var define, module1, exports;
    return (function e1(t, n1, r) {
        function s(o, u) {
            if (!n1[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && undefined;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f;
                }
                var l = n1[o] = {
                    exports: {
                    }
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e);
                }, l, l.exports, e1, t, n1, r);
            }
            return n1[o].exports;
        }
        var i = typeof require == "function" && undefined;
        for(var o1 = 0; o1 < r.length; o1++)s(r[o1]);
        return s;
    })({
        1: [
            function(_dereq_, module, exports) {
                (function(global1) {
                    var Mutation = global1.MutationObserver || global1.WebKitMutationObserver;
                    var scheduleDrain;
                    if (Mutation) {
                        var called = 0;
                        var observer = new Mutation(nextTick);
                        var element = global1.document.createTextNode('');
                        observer.observe(element, {
                            characterData: true
                        });
                        scheduleDrain = function() {
                            element.data = called = ++called % 2;
                        };
                    } else if (!global1.setImmediate && typeof global1.MessageChannel !== 'undefined') {
                        var channel = new global1.MessageChannel();
                        channel.port1.onmessage = nextTick;
                        scheduleDrain = function() {
                            channel.port2.postMessage(0);
                        };
                    } else if ('document' in global1 && 'onreadystatechange' in global1.document.createElement('script')) scheduleDrain = function() {
                        // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                        // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                        var scriptEl = global1.document.createElement('script');
                        scriptEl.onreadystatechange = function() {
                            nextTick();
                            scriptEl.onreadystatechange = null;
                            scriptEl.parentNode.removeChild(scriptEl);
                            scriptEl = null;
                        };
                        global1.document.documentElement.appendChild(scriptEl);
                    };
                    else scheduleDrain = function() {
                        setTimeout(nextTick, 0);
                    };
                    var draining;
                    var queue = [];
                    //named nextTick for less confusing stack traces
                    function nextTick() {
                        draining = true;
                        var i, oldQueue;
                        var len = queue.length;
                        while(len){
                            oldQueue = queue;
                            queue = [];
                            i = -1;
                            while(++i < len)oldQueue[i]();
                            len = queue.length;
                        }
                        draining = false;
                    }
                    module.exports = immediate;
                    function immediate(task) {
                        if (queue.push(task) === 1 && !draining) scheduleDrain();
                    }
                }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
                });
            },
            {
            }
        ],
        2: [
            function(_dereq_, module, exports) {
                'use strict';
                var immediate = _dereq_(1);
                /* istanbul ignore next */ function INTERNAL() {
                }
                var handlers = {
                };
                var REJECTED = [
                    'REJECTED'
                ];
                var FULFILLED = [
                    'FULFILLED'
                ];
                var PENDING = [
                    'PENDING'
                ];
                module.exports = Promise;
                function Promise(resolver) {
                    if (typeof resolver !== 'function') throw new TypeError('resolver must be a function');
                    this.state = PENDING;
                    this.queue = [];
                    this.outcome = void 0;
                    if (resolver !== INTERNAL) safelyResolveThenable(this, resolver);
                }
                Promise.prototype["catch"] = function(onRejected) {
                    return this.then(null, onRejected);
                };
                Promise.prototype.then = function(onFulfilled, onRejected) {
                    if (typeof onFulfilled !== 'function' && this.state === FULFILLED || typeof onRejected !== 'function' && this.state === REJECTED) return this;
                    var promise = new this.constructor(INTERNAL);
                    if (this.state !== PENDING) {
                        var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
                        unwrap(promise, resolver, this.outcome);
                    } else this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
                    return promise;
                };
                function QueueItem(promise, onFulfilled, onRejected) {
                    this.promise = promise;
                    if (typeof onFulfilled === 'function') {
                        this.onFulfilled = onFulfilled;
                        this.callFulfilled = this.otherCallFulfilled;
                    }
                    if (typeof onRejected === 'function') {
                        this.onRejected = onRejected;
                        this.callRejected = this.otherCallRejected;
                    }
                }
                QueueItem.prototype.callFulfilled = function(value) {
                    handlers.resolve(this.promise, value);
                };
                QueueItem.prototype.otherCallFulfilled = function(value) {
                    unwrap(this.promise, this.onFulfilled, value);
                };
                QueueItem.prototype.callRejected = function(value) {
                    handlers.reject(this.promise, value);
                };
                QueueItem.prototype.otherCallRejected = function(value) {
                    unwrap(this.promise, this.onRejected, value);
                };
                function unwrap(promise, func, value) {
                    immediate(function() {
                        var returnValue;
                        try {
                            returnValue = func(value);
                        } catch (e) {
                            return handlers.reject(promise, e);
                        }
                        if (returnValue === promise) handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
                        else handlers.resolve(promise, returnValue);
                    });
                }
                handlers.resolve = function(self, value) {
                    var result = tryCatch(getThen, value);
                    if (result.status === 'error') return handlers.reject(self, result.value);
                    var thenable = result.value;
                    if (thenable) safelyResolveThenable(self, thenable);
                    else {
                        self.state = FULFILLED;
                        self.outcome = value;
                        var i = -1;
                        var len = self.queue.length;
                        while(++i < len)self.queue[i].callFulfilled(value);
                    }
                    return self;
                };
                handlers.reject = function(self, error) {
                    self.state = REJECTED;
                    self.outcome = error;
                    var i = -1;
                    var len = self.queue.length;
                    while(++i < len)self.queue[i].callRejected(error);
                    return self;
                };
                function getThen(obj) {
                    // Make sure we only access the accessor once as required by the spec
                    var then = obj && obj.then;
                    if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') return function appyThen() {
                        then.apply(obj, arguments);
                    };
                }
                function safelyResolveThenable(self, thenable) {
                    // Either fulfill, reject or reject with error
                    var called = false;
                    function onError(value) {
                        if (called) return;
                        called = true;
                        handlers.reject(self, value);
                    }
                    function onSuccess(value) {
                        if (called) return;
                        called = true;
                        handlers.resolve(self, value);
                    }
                    function tryToUnwrap() {
                        thenable(onSuccess, onError);
                    }
                    var result = tryCatch(tryToUnwrap);
                    if (result.status === 'error') onError(result.value);
                }
                function tryCatch(func, value) {
                    var out = {
                    };
                    try {
                        out.value = func(value);
                        out.status = 'success';
                    } catch (e) {
                        out.status = 'error';
                        out.value = e;
                    }
                    return out;
                }
                Promise.resolve = resolve;
                function resolve(value) {
                    if (value instanceof this) return value;
                    return handlers.resolve(new this(INTERNAL), value);
                }
                Promise.reject = reject;
                function reject(reason) {
                    var promise = new this(INTERNAL);
                    return handlers.reject(promise, reason);
                }
                Promise.all = all;
                function all(iterable) {
                    var self = this;
                    if (Object.prototype.toString.call(iterable) !== '[object Array]') return this.reject(new TypeError('must be an array'));
                    var len = iterable.length;
                    var called = false;
                    if (!len) return this.resolve([]);
                    var values = new Array(len);
                    var resolved = 0;
                    var i = -1;
                    var promise = new this(INTERNAL);
                    while(++i < len)allResolver(iterable[i], i);
                    function allResolver(value, i) {
                        self.resolve(value).then(resolveFromAll, function(error) {
                            if (!called) {
                                called = true;
                                handlers.reject(promise, error);
                            }
                        });
                        function resolveFromAll(outValue) {
                            values[i] = outValue;
                            if (++resolved === len && !called) {
                                called = true;
                                handlers.resolve(promise, values);
                            }
                        }
                    }
                    return promise;
                }
                Promise.race = race;
                function race(iterable) {
                    var self = this;
                    if (Object.prototype.toString.call(iterable) !== '[object Array]') return this.reject(new TypeError('must be an array'));
                    var len = iterable.length;
                    var called = false;
                    if (!len) return this.resolve([]);
                    var i = -1;
                    var promise = new this(INTERNAL);
                    while(++i < len)resolver(iterable[i]);
                    function resolver(value) {
                        self.resolve(value).then(function(response) {
                            if (!called) {
                                called = true;
                                handlers.resolve(promise, response);
                            }
                        }, function(error) {
                            if (!called) {
                                called = true;
                                handlers.reject(promise, error);
                            }
                        });
                    }
                    return promise;
                }
            },
            {
                "1": 1
            }
        ],
        3: [
            function(_dereq_, module, exports) {
                (function(global2) {
                    if (typeof global2.Promise !== 'function') global2.Promise = _dereq_(2);
                }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {
                });
            },
            {
                "2": 2
            }
        ],
        4: [
            function(_dereq_, module, exports) {
                'use strict';
                var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                function getIDB() {
                    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */ try {
                        if (typeof indexedDB !== 'undefined') return indexedDB;
                        if (typeof webkitIndexedDB !== 'undefined') return webkitIndexedDB;
                        if (typeof mozIndexedDB !== 'undefined') return mozIndexedDB;
                        if (typeof OIndexedDB !== 'undefined') return OIndexedDB;
                        if (typeof msIndexedDB !== 'undefined') return msIndexedDB;
                    } catch (e) {
                        return;
                    }
                }
                var idb1 = getIDB();
                function isIndexedDBValid() {
                    try {
                        // Initialize IndexedDB; fall back to vendor-prefixed versions
                        // if needed.
                        if (!idb1 || !idb1.open) return false;
                        // We mimic PouchDB here;
                        //
                        // We test for openDatabase because IE Mobile identifies itself
                        // as Safari. Oh the lulz...
                        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
                        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;
                        // Safari <10.1 does not meet our requirements for IDB support
                        // (see: https://github.com/pouchdb/pouchdb/issues/5572).
                        // Safari 10.1 shipped with fetch, we can use that to detect it.
                        // Note: this creates issues with `window.fetch` polyfills and
                        // overrides; see:
                        // https://github.com/localForage/localForage/issues/856
                        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' && // some outdated implementations of IDB that appear on Samsung
                        // and HTC Android devices <4.4 are missing IDBKeyRange
                        // See: https://github.com/mozilla/localForage/issues/128
                        // See: https://github.com/mozilla/localForage/issues/272
                        typeof IDBKeyRange !== 'undefined';
                    } catch (e) {
                        return false;
                    }
                }
                // Abstracts constructing a Blob object, so it also works in older
                // browsers that don't support the native Blob constructor. (i.e.
                // old QtWebKit versions, at least).
                // Abstracts constructing a Blob object, so it also works in older
                // browsers that don't support the native Blob constructor. (i.e.
                // old QtWebKit versions, at least).
                function createBlob(parts, properties) {
                    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */ parts = parts || [];
                    properties = properties || {
                    };
                    try {
                        return new Blob(parts, properties);
                    } catch (e) {
                        if (e.name !== 'TypeError') throw e;
                        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
                        var builder = new Builder();
                        for(var i = 0; i < parts.length; i += 1)builder.append(parts[i]);
                        return builder.getBlob(properties.type);
                    }
                }
                // This is CommonJS because lie is an external dependency, so Rollup
                // can just ignore it.
                if (typeof Promise === 'undefined') // In the "nopromises" build this will just throw if you don't have
                // a global promise object, but it would throw anyway later.
                _dereq_(3);
                var Promise$1 = Promise;
                function executeCallback(promise, callback) {
                    if (callback) promise.then(function(result) {
                        callback(null, result);
                    }, function(error) {
                        callback(error);
                    });
                }
                function executeTwoCallbacks(promise, callback, errorCallback) {
                    if (typeof callback === 'function') promise.then(callback);
                    if (typeof errorCallback === 'function') promise["catch"](errorCallback);
                }
                function normalizeKey(key) {
                    // Cast the key to a string, as that's all we can set as a key.
                    if (typeof key !== 'string') {
                        console.warn(key + ' used as a key, but it is not a string.');
                        key = String(key);
                    }
                    return key;
                }
                function getCallback() {
                    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') return arguments[arguments.length - 1];
                }
                // Some code originally from async_storage.js in
                // [Gaia](https://github.com/mozilla-b2g/gaia).
                var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
                var supportsBlobs = void 0;
                var dbContexts = {
                };
                var toString = Object.prototype.toString;
                // Transaction Modes
                var READ_ONLY = 'readonly';
                var READ_WRITE = 'readwrite';
                // Transform a binary string to an array buffer, because otherwise
                // weird stuff happens when you try to work with the binary string directly.
                // It is known.
                // From http://stackoverflow.com/questions/14967647/ (continues on next line)
                // encode-decode-image-with-base64-breaks-image (2013-04-21)
                function _binStringToArrayBuffer(bin) {
                    var length = bin.length;
                    var buf = new ArrayBuffer(length);
                    var arr = new Uint8Array(buf);
                    for(var i = 0; i < length; i++)arr[i] = bin.charCodeAt(i);
                    return buf;
                }
                //
                // Blobs are not supported in all versions of IndexedDB, notably
                // Chrome <37 and Android <5. In those versions, storing a blob will throw.
                //
                // Various other blob bugs exist in Chrome v37-42 (inclusive).
                // Detecting them is expensive and confusing to users, and Chrome 37-42
                // is at very low usage worldwide, so we do a hacky userAgent check instead.
                //
                // content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
                // 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
                // FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
                //
                // Code borrowed from PouchDB. See:
                // https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
                //
                function _checkBlobSupportWithoutCaching(idb) {
                    return new Promise$1(function(resolve) {
                        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
                        var blob = createBlob([
                            ''
                        ]);
                        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');
                        txn.onabort = function(e) {
                            // If the transaction aborts now its due to not being able to
                            // write to the database, likely due to the disk being full
                            e.preventDefault();
                            e.stopPropagation();
                            resolve(false);
                        };
                        txn.oncomplete = function() {
                            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
                            var matchedEdge = navigator.userAgent.match(/Edge\//);
                            // MS Edge pretends to be Chrome 42:
                            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
                            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
                        };
                    })["catch"](function() {
                        return false; // error, so assume unsupported
                    });
                }
                function _checkBlobSupport(idb) {
                    if (typeof supportsBlobs === 'boolean') return Promise$1.resolve(supportsBlobs);
                    return _checkBlobSupportWithoutCaching(idb).then(function(value) {
                        supportsBlobs = value;
                        return supportsBlobs;
                    });
                }
                function _deferReadiness(dbInfo) {
                    var dbContext = dbContexts[dbInfo.name];
                    // Create a deferred object representing the current database operation.
                    var deferredOperation = {
                    };
                    deferredOperation.promise = new Promise$1(function(resolve, reject) {
                        deferredOperation.resolve = resolve;
                        deferredOperation.reject = reject;
                    });
                    // Enqueue the deferred operation.
                    dbContext.deferredOperations.push(deferredOperation);
                    // Chain its promise to the database readiness.
                    if (!dbContext.dbReady) dbContext.dbReady = deferredOperation.promise;
                    else dbContext.dbReady = dbContext.dbReady.then(function() {
                        return deferredOperation.promise;
                    });
                }
                function _advanceReadiness(dbInfo) {
                    var dbContext = dbContexts[dbInfo.name];
                    // Dequeue a deferred operation.
                    var deferredOperation = dbContext.deferredOperations.pop();
                    // Resolve its promise (which is part of the database readiness
                    // chain of promises).
                    if (deferredOperation) {
                        deferredOperation.resolve();
                        return deferredOperation.promise;
                    }
                }
                function _rejectReadiness(dbInfo, err) {
                    var dbContext = dbContexts[dbInfo.name];
                    // Dequeue a deferred operation.
                    var deferredOperation = dbContext.deferredOperations.pop();
                    // Reject its promise (which is part of the database readiness
                    // chain of promises).
                    if (deferredOperation) {
                        deferredOperation.reject(err);
                        return deferredOperation.promise;
                    }
                }
                function _getConnection(dbInfo, upgradeNeeded) {
                    return new Promise$1(function(resolve, reject) {
                        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
                        if (dbInfo.db) {
                            if (upgradeNeeded) {
                                _deferReadiness(dbInfo);
                                dbInfo.db.close();
                            } else return resolve(dbInfo.db);
                        }
                        var dbArgs = [
                            dbInfo.name
                        ];
                        if (upgradeNeeded) dbArgs.push(dbInfo.version);
                        var openreq = idb1.open.apply(idb1, dbArgs);
                        if (upgradeNeeded) openreq.onupgradeneeded = function(e) {
                            var db = openreq.result;
                            try {
                                db.createObjectStore(dbInfo.storeName);
                                if (e.oldVersion <= 1) // Added when support for blob shims was added
                                db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                            } catch (ex) {
                                if (ex.name === 'ConstraintError') console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                                else throw ex;
                            }
                        };
                        openreq.onerror = function(e) {
                            e.preventDefault();
                            reject(openreq.error);
                        };
                        openreq.onsuccess = function() {
                            var db = openreq.result;
                            db.onversionchange = function(e) {
                                // Triggered when the database is modified (e.g. adding an objectStore) or
                                // deleted (even when initiated by other sessions in different tabs).
                                // Closing the connection here prevents those operations from being blocked.
                                // If the database is accessed again later by this instance, the connection
                                // will be reopened or the database recreated as needed.
                                e.target.close();
                            };
                            resolve(db);
                            _advanceReadiness(dbInfo);
                        };
                    });
                }
                function _getOriginalConnection(dbInfo) {
                    return _getConnection(dbInfo, false);
                }
                function _getUpgradedConnection(dbInfo) {
                    return _getConnection(dbInfo, true);
                }
                function _isUpgradeNeeded(dbInfo, defaultVersion) {
                    if (!dbInfo.db) return true;
                    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
                    var isDowngrade = dbInfo.version < dbInfo.db.version;
                    var isUpgrade = dbInfo.version > dbInfo.db.version;
                    if (isDowngrade) {
                        // If the version is not the default one
                        // then warn for impossible downgrade.
                        if (dbInfo.version !== defaultVersion) console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
                        // Align the versions to prevent errors.
                        dbInfo.version = dbInfo.db.version;
                    }
                    if (isUpgrade || isNewStore) {
                        // If the store is new then increment the version (if needed).
                        // This will trigger an "upgradeneeded" event which is required
                        // for creating a store.
                        if (isNewStore) {
                            var incVersion = dbInfo.db.version + 1;
                            if (incVersion > dbInfo.version) dbInfo.version = incVersion;
                        }
                        return true;
                    }
                    return false;
                }
                // encode a blob for indexeddb engines that don't support blobs
                function _encodeBlob(blob) {
                    return new Promise$1(function(resolve, reject) {
                        var reader = new FileReader();
                        reader.onerror = reject;
                        reader.onloadend = function(e) {
                            var base64 = btoa(e.target.result || '');
                            resolve({
                                __local_forage_encoded_blob: true,
                                data: base64,
                                type: blob.type
                            });
                        };
                        reader.readAsBinaryString(blob);
                    });
                }
                // decode an encoded blob
                function _decodeBlob(encodedBlob) {
                    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
                    return createBlob([
                        arrayBuff
                    ], {
                        type: encodedBlob.type
                    });
                }
                // is this one of our fancy encoded blobs?
                function _isEncodedBlob(value) {
                    return value && value.__local_forage_encoded_blob;
                }
                // Specialize the default `ready()` function by making it dependent
                // on the current database operations. Thus, the driver will be actually
                // ready when it's been initialized (default) *and* there are no pending
                // operations on the database (initiated by some other instances).
                function _fullyReady(callback) {
                    var self = this;
                    var promise = self._initReady().then(function() {
                        var dbContext = dbContexts[self._dbInfo.name];
                        if (dbContext && dbContext.dbReady) return dbContext.dbReady;
                    });
                    executeTwoCallbacks(promise, callback, callback);
                    return promise;
                }
                // Try to establish a new db connection to replace the
                // current one which is broken (i.e. experiencing
                // InvalidStateError while creating a transaction).
                function _tryReconnect(dbInfo) {
                    _deferReadiness(dbInfo);
                    var dbContext = dbContexts[dbInfo.name];
                    var forages = dbContext.forages;
                    for(var i1 = 0; i1 < forages.length; i1++){
                        var forage = forages[i1];
                        if (forage._dbInfo.db) {
                            forage._dbInfo.db.close();
                            forage._dbInfo.db = null;
                        }
                    }
                    dbInfo.db = null;
                    return _getOriginalConnection(dbInfo).then(function(db) {
                        dbInfo.db = db;
                        if (_isUpgradeNeeded(dbInfo)) // Reopen the database for upgrading.
                        return _getUpgradedConnection(dbInfo);
                        return db;
                    }).then(function(db) {
                        // store the latest db reference
                        // in case the db was upgraded
                        dbInfo.db = dbContext.db = db;
                        for(var i = 0; i < forages.length; i++)forages[i]._dbInfo.db = db;
                    })["catch"](function(err) {
                        _rejectReadiness(dbInfo, err);
                        throw err;
                    });
                }
                // FF doesn't like Promises (micro-tasks) and IDDB store operations,
                // so we have to do it with callbacks
                function createTransaction(dbInfo, mode, callback, retries) {
                    if (retries === undefined) retries = 1;
                    try {
                        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
                        callback(null, tx);
                    } catch (err) {
                        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) return Promise$1.resolve().then(function() {
                            if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                                // increase the db version, to create the new ObjectStore
                                if (dbInfo.db) dbInfo.version = dbInfo.db.version + 1;
                                // Reopen the database for upgrading.
                                return _getUpgradedConnection(dbInfo);
                            }
                        }).then(function() {
                            return _tryReconnect(dbInfo).then(function() {
                                createTransaction(dbInfo, mode, callback, retries - 1);
                            });
                        })["catch"](callback);
                        callback(err);
                    }
                }
                function createDbContext() {
                    return {
                        // Running localForages sharing a database.
                        forages: [],
                        // Shared database.
                        db: null,
                        // Database readiness (promise).
                        dbReady: null,
                        // Deferred operations on the database.
                        deferredOperations: []
                    };
                }
                // Open the IndexedDB database (automatically creates one if one didn't
                // previously exist), using any options set in the config.
                function _initStorage(options) {
                    var self = this;
                    var dbInfo = {
                        db: null
                    };
                    if (options) for(var i in options)dbInfo[i] = options[i];
                    // Get the current context of the database;
                    var dbContext = dbContexts[dbInfo.name];
                    // ...or create a new context.
                    if (!dbContext) {
                        dbContext = createDbContext();
                        // Register the new context in the global container.
                        dbContexts[dbInfo.name] = dbContext;
                    }
                    // Register itself as a running localForage in the current context.
                    dbContext.forages.push(self);
                    // Replace the default `ready()` function with the specialized one.
                    if (!self._initReady) {
                        self._initReady = self.ready;
                        self.ready = _fullyReady;
                    }
                    // Create an array of initialization states of the related localForages.
                    var initPromises = [];
                    function ignoreErrors() {
                        // Don't handle errors here,
                        // just makes sure related localForages aren't pending.
                        return Promise$1.resolve();
                    }
                    for(var j = 0; j < dbContext.forages.length; j++){
                        var forage = dbContext.forages[j];
                        if (forage !== self) // Don't wait for itself...
                        initPromises.push(forage._initReady()["catch"](ignoreErrors));
                    }
                    // Take a snapshot of the related localForages.
                    var forages = dbContext.forages.slice(0);
                    // Initialize the connection process only when
                    // all the related localForages aren't pending.
                    return Promise$1.all(initPromises).then(function() {
                        dbInfo.db = dbContext.db;
                        // Get the connection or open a new one without upgrade.
                        return _getOriginalConnection(dbInfo);
                    }).then(function(db) {
                        dbInfo.db = db;
                        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) // Reopen the database for upgrading.
                        return _getUpgradedConnection(dbInfo);
                        return db;
                    }).then(function(db) {
                        dbInfo.db = dbContext.db = db;
                        self._dbInfo = dbInfo;
                        // Share the final connection amongst related localForages.
                        for(var k = 0; k < forages.length; k++){
                            var forage = forages[k];
                            if (forage !== self) {
                                // Self is already up-to-date.
                                forage._dbInfo.db = dbInfo.db;
                                forage._dbInfo.version = dbInfo.version;
                            }
                        }
                    });
                }
                function getItem(key, callback) {
                    var self = this;
                    key = normalizeKey(key);
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self._dbInfo.storeName);
                                    var req = store.get(key);
                                    req.onsuccess = function() {
                                        var value = req.result;
                                        if (value === undefined) value = null;
                                        if (_isEncodedBlob(value)) value = _decodeBlob(value);
                                        resolve(value);
                                    };
                                    req.onerror = function() {
                                        reject(req.error);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Iterate over all items stored in database.
                function iterate(iterator, callback) {
                    var self = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self._dbInfo.storeName);
                                    var req = store.openCursor();
                                    var iterationNumber = 1;
                                    req.onsuccess = function() {
                                        var cursor = req.result;
                                        if (cursor) {
                                            var value = cursor.value;
                                            if (_isEncodedBlob(value)) value = _decodeBlob(value);
                                            var result = iterator(value, cursor.key, iterationNumber++);
                                            // when the iterator callback returns any
                                            // (non-`undefined`) value, then we stop
                                            // the iteration immediately
                                            if (result !== void 0) resolve(result);
                                            else cursor["continue"]();
                                        } else resolve();
                                    };
                                    req.onerror = function() {
                                        reject(req.error);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function setItem(key, value1, callback) {
                    var self = this;
                    key = normalizeKey(key);
                    var promise = new Promise$1(function(resolve, reject) {
                        var dbInfo;
                        self.ready().then(function() {
                            dbInfo = self._dbInfo;
                            if (toString.call(value1) === '[object Blob]') return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
                                if (blobSupport) return value1;
                                return _encodeBlob(value1);
                            });
                            return value1;
                        }).then(function(value) {
                            createTransaction(self._dbInfo, READ_WRITE, function(err1, transaction) {
                                if (err1) return reject(err1);
                                try {
                                    var store = transaction.objectStore(self._dbInfo.storeName);
                                    // The reason we don't _save_ null is because IE 10 does
                                    // not support saving the `null` type in IndexedDB. How
                                    // ironic, given the bug below!
                                    // See: https://github.com/mozilla/localForage/issues/161
                                    if (value === null) value = undefined;
                                    var req = store.put(value, key);
                                    transaction.oncomplete = function() {
                                        // Cast to undefined so the value passed to
                                        // callback/promise is the same as what one would get out
                                        // of `getItem()` later. This leads to some weirdness
                                        // (setItem('foo', undefined) will return `null`), but
                                        // it's not my fault localStorage is our baseline and that
                                        // it's weird.
                                        if (value === undefined) value = null;
                                        resolve(value);
                                    };
                                    transaction.onabort = transaction.onerror = function() {
                                        var err = req.error ? req.error : req.transaction.error;
                                        reject(err);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function removeItem(key, callback) {
                    var self = this;
                    key = normalizeKey(key);
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            createTransaction(self._dbInfo, READ_WRITE, function(err2, transaction) {
                                if (err2) return reject(err2);
                                try {
                                    var store = transaction.objectStore(self._dbInfo.storeName);
                                    // We use a Grunt task to make this safe for IE and some
                                    // versions of Android (including those used by Cordova).
                                    // Normally IE won't like `.delete()` and will insist on
                                    // using `['delete']()`, but we have a build step that
                                    // fixes this for us now.
                                    var req = store["delete"](key);
                                    transaction.oncomplete = function() {
                                        resolve();
                                    };
                                    transaction.onerror = function() {
                                        reject(req.error);
                                    };
                                    // The request will be also be aborted if we've exceeded our storage
                                    // space.
                                    transaction.onabort = function() {
                                        var err = req.error ? req.error : req.transaction.error;
                                        reject(err);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function clear(callback) {
                    var self = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            createTransaction(self._dbInfo, READ_WRITE, function(err3, transaction) {
                                if (err3) return reject(err3);
                                try {
                                    var store = transaction.objectStore(self._dbInfo.storeName);
                                    var req = store.clear();
                                    transaction.oncomplete = function() {
                                        resolve();
                                    };
                                    transaction.onabort = transaction.onerror = function() {
                                        var err = req.error ? req.error : req.transaction.error;
                                        reject(err);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function length1(callback) {
                    var self = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self._dbInfo.storeName);
                                    var req = store.count();
                                    req.onsuccess = function() {
                                        resolve(req.result);
                                    };
                                    req.onerror = function() {
                                        reject(req.error);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function key1(n, callback) {
                    var self = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        if (n < 0) {
                            resolve(null);
                            return;
                        }
                        self.ready().then(function() {
                            createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self._dbInfo.storeName);
                                    var advanced = false;
                                    var req = store.openKeyCursor();
                                    req.onsuccess = function() {
                                        var cursor = req.result;
                                        if (!cursor) {
                                            // this means there weren't enough keys
                                            resolve(null);
                                            return;
                                        }
                                        if (n === 0) // We have the first key, return it if that's what they
                                        // wanted.
                                        resolve(cursor.key);
                                        else if (!advanced) {
                                            // Otherwise, ask the cursor to skip ahead n
                                            // records.
                                            advanced = true;
                                            cursor.advance(n);
                                        } else // When we get here, we've got the nth key.
                                        resolve(cursor.key);
                                    };
                                    req.onerror = function() {
                                        reject(req.error);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function keys1(callback) {
                    var self = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self._dbInfo.storeName);
                                    var req = store.openKeyCursor();
                                    var keys = [];
                                    req.onsuccess = function() {
                                        var cursor = req.result;
                                        if (!cursor) {
                                            resolve(keys);
                                            return;
                                        }
                                        keys.push(cursor.key);
                                        cursor["continue"]();
                                    };
                                    req.onerror = function() {
                                        reject(req.error);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function dropInstance(options, callback) {
                    callback = getCallback.apply(this, arguments);
                    var currentConfig = this.config();
                    options = typeof options !== 'function' && options || {
                    };
                    if (!options.name) {
                        options.name = options.name || currentConfig.name;
                        options.storeName = options.storeName || currentConfig.storeName;
                    }
                    var self = this;
                    var promise;
                    if (!options.name) promise = Promise$1.reject('Invalid arguments');
                    else {
                        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;
                        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function(db) {
                            var dbContext = dbContexts[options.name];
                            var forages = dbContext.forages;
                            dbContext.db = db;
                            for(var i = 0; i < forages.length; i++)forages[i]._dbInfo.db = db;
                            return db;
                        });
                        if (!options.storeName) promise = dbPromise.then(function(db1) {
                            _deferReadiness(options);
                            var dbContext = dbContexts[options.name];
                            var forages = dbContext.forages;
                            db1.close();
                            for(var i2 = 0; i2 < forages.length; i2++){
                                var forage = forages[i2];
                                forage._dbInfo.db = null;
                            }
                            var dropDBPromise = new Promise$1(function(resolve, reject) {
                                var req = idb1.deleteDatabase(options.name);
                                req.onerror = function() {
                                    var db = req.result;
                                    if (db) db.close();
                                    reject(req.error);
                                };
                                req.onblocked = function() {
                                    // Closing all open connections in onversionchange handler should prevent this situation, but if
                                    // we do get here, it just means the request remains pending - eventually it will succeed or error
                                    console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                                };
                                req.onsuccess = function() {
                                    var db = req.result;
                                    if (db) db.close();
                                    resolve(db);
                                };
                            });
                            return dropDBPromise.then(function(db) {
                                dbContext.db = db;
                                for(var i = 0; i < forages.length; i++){
                                    var _forage = forages[i];
                                    _advanceReadiness(_forage._dbInfo);
                                }
                            })["catch"](function(err) {
                                (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                                });
                                throw err;
                            });
                        });
                        else promise = dbPromise.then(function(db2) {
                            if (!db2.objectStoreNames.contains(options.storeName)) return;
                            var newVersion = db2.version + 1;
                            _deferReadiness(options);
                            var dbContext = dbContexts[options.name];
                            var forages = dbContext.forages;
                            db2.close();
                            for(var i = 0; i < forages.length; i++){
                                var forage = forages[i];
                                forage._dbInfo.db = null;
                                forage._dbInfo.version = newVersion;
                            }
                            var dropObjectPromise = new Promise$1(function(resolve, reject) {
                                var req = idb1.open(options.name, newVersion);
                                req.onerror = function(err) {
                                    var db = req.result;
                                    db.close();
                                    reject(err);
                                };
                                req.onupgradeneeded = function() {
                                    var db = req.result;
                                    db.deleteObjectStore(options.storeName);
                                };
                                req.onsuccess = function() {
                                    var db = req.result;
                                    db.close();
                                    resolve(db);
                                };
                            });
                            return dropObjectPromise.then(function(db) {
                                dbContext.db = db;
                                for(var j = 0; j < forages.length; j++){
                                    var _forage2 = forages[j];
                                    _forage2._dbInfo.db = db;
                                    _advanceReadiness(_forage2._dbInfo);
                                }
                            })["catch"](function(err) {
                                (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                                });
                                throw err;
                            });
                        });
                    }
                    executeCallback(promise, callback);
                    return promise;
                }
                var asyncStorage = {
                    _driver: 'asyncStorage',
                    _initStorage: _initStorage,
                    _support: isIndexedDBValid(),
                    iterate: iterate,
                    getItem: getItem,
                    setItem: setItem,
                    removeItem: removeItem,
                    clear: clear,
                    length: length1,
                    key: key1,
                    keys: keys1,
                    dropInstance: dropInstance
                };
                function isWebSQLValid() {
                    return typeof openDatabase === 'function';
                }
                // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
                // it to Base64, so this is how we store it to prevent very strange errors with less
                // verbose ways of binary <-> string data storage.
                var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var BLOB_TYPE_PREFIX = '~~local_forage_type~';
                var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
                var SERIALIZED_MARKER = '__lfsc__:';
                var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
                // OMG the serializations!
                var TYPE_ARRAYBUFFER = 'arbf';
                var TYPE_BLOB = 'blob';
                var TYPE_INT8ARRAY = 'si08';
                var TYPE_UINT8ARRAY = 'ui08';
                var TYPE_UINT8CLAMPEDARRAY = 'uic8';
                var TYPE_INT16ARRAY = 'si16';
                var TYPE_INT32ARRAY = 'si32';
                var TYPE_UINT16ARRAY = 'ur16';
                var TYPE_UINT32ARRAY = 'ui32';
                var TYPE_FLOAT32ARRAY = 'fl32';
                var TYPE_FLOAT64ARRAY = 'fl64';
                var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
                var toString$1 = Object.prototype.toString;
                function stringToBuffer(serializedString) {
                    // Fill the string into a ArrayBuffer.
                    var bufferLength = serializedString.length * 0.75;
                    var len = serializedString.length;
                    var i;
                    var p = 0;
                    var encoded1, encoded2, encoded3, encoded4;
                    if (serializedString[serializedString.length - 1] === '=') {
                        bufferLength--;
                        if (serializedString[serializedString.length - 2] === '=') bufferLength--;
                    }
                    var buffer = new ArrayBuffer(bufferLength);
                    var bytes = new Uint8Array(buffer);
                    for(i = 0; i < len; i += 4){
                        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
                        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
                        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
                        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
                        /*jslint bitwise: true */ bytes[p++] = encoded1 << 2 | encoded2 >> 4;
                        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
                        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
                    }
                    return buffer;
                }
                // Converts a buffer to a string to store, serialized, in the backend
                // storage library.
                function bufferToString(buffer) {
                    // base64-arraybuffer
                    var bytes = new Uint8Array(buffer);
                    var base64String = '';
                    var i;
                    for(i = 0; i < bytes.length; i += 3){
                        /*jslint bitwise: true */ base64String += BASE_CHARS[bytes[i] >> 2];
                        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
                        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
                        base64String += BASE_CHARS[bytes[i + 2] & 63];
                    }
                    if (bytes.length % 3 === 2) base64String = base64String.substring(0, base64String.length - 1) + '=';
                    else if (bytes.length % 3 === 1) base64String = base64String.substring(0, base64String.length - 2) + '==';
                    return base64String;
                }
                // Serialize a value, afterwards executing a callback (which usually
                // instructs the `setItem()` callback/promise to be executed). This is how
                // we store binary data with localStorage.
                function serialize(value, callback) {
                    var valueType = '';
                    if (value) valueType = toString$1.call(value);
                    // Cannot use `value instanceof ArrayBuffer` or such here, as these
                    // checks fail when running the tests using casper.js...
                    //
                    // TODO: See why those tests fail and use a better solution.
                    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
                        // Convert binary arrays to a string and prefix the string with
                        // a special marker.
                        var buffer;
                        var marker = SERIALIZED_MARKER;
                        if (value instanceof ArrayBuffer) {
                            buffer = value;
                            marker += TYPE_ARRAYBUFFER;
                        } else {
                            buffer = value.buffer;
                            if (valueType === '[object Int8Array]') marker += TYPE_INT8ARRAY;
                            else if (valueType === '[object Uint8Array]') marker += TYPE_UINT8ARRAY;
                            else if (valueType === '[object Uint8ClampedArray]') marker += TYPE_UINT8CLAMPEDARRAY;
                            else if (valueType === '[object Int16Array]') marker += TYPE_INT16ARRAY;
                            else if (valueType === '[object Uint16Array]') marker += TYPE_UINT16ARRAY;
                            else if (valueType === '[object Int32Array]') marker += TYPE_INT32ARRAY;
                            else if (valueType === '[object Uint32Array]') marker += TYPE_UINT32ARRAY;
                            else if (valueType === '[object Float32Array]') marker += TYPE_FLOAT32ARRAY;
                            else if (valueType === '[object Float64Array]') marker += TYPE_FLOAT64ARRAY;
                            else callback(new Error('Failed to get type for BinaryArray'));
                        }
                        callback(marker + bufferToString(buffer));
                    } else if (valueType === '[object Blob]') {
                        // Conver the blob to a binaryArray and then to a string.
                        var fileReader = new FileReader();
                        fileReader.onload = function() {
                            // Backwards-compatible prefix for the blob type.
                            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
                            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
                        };
                        fileReader.readAsArrayBuffer(value);
                    } else try {
                        callback(JSON.stringify(value));
                    } catch (e) {
                        console.error("Couldn't convert value into a JSON string: ", value);
                        callback(null, e);
                    }
                }
                // Deserialize data we've inserted into a value column/field. We place
                // special markers into our strings to mark them as encoded; this isn't
                // as nice as a meta field, but it's the only sane thing we can do whilst
                // keeping localStorage support intact.
                //
                // Oftentimes this will just deserialize JSON content, but if we have a
                // special marker (SERIALIZED_MARKER, defined above), we will extract
                // some kind of arraybuffer/binary data/typed array out of the string.
                function deserialize(value) {
                    // If we haven't marked this string as being specially serialized (i.e.
                    // something other than serialized JSON), we can just return it and be
                    // done with it.
                    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) return JSON.parse(value);
                    // The following code deals with deserializing some kind of Blob or
                    // TypedArray. First we separate out the type of data we're dealing
                    // with from the data itself.
                    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
                    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
                    var blobType;
                    // Backwards-compatible blob type serialization strategy.
                    // DBs created with older versions of localForage will simply not have the blob type.
                    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
                        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
                        blobType = matcher[1];
                        serializedString = serializedString.substring(matcher[0].length);
                    }
                    var buffer = stringToBuffer(serializedString);
                    // Return the right type based on the code/type set during
                    // serialization.
                    switch(type){
                        case TYPE_ARRAYBUFFER:
                            return buffer;
                        case TYPE_BLOB:
                            return createBlob([
                                buffer
                            ], {
                                type: blobType
                            });
                        case TYPE_INT8ARRAY:
                            return new Int8Array(buffer);
                        case TYPE_UINT8ARRAY:
                            return new Uint8Array(buffer);
                        case TYPE_UINT8CLAMPEDARRAY:
                            return new Uint8ClampedArray(buffer);
                        case TYPE_INT16ARRAY:
                            return new Int16Array(buffer);
                        case TYPE_UINT16ARRAY:
                            return new Uint16Array(buffer);
                        case TYPE_INT32ARRAY:
                            return new Int32Array(buffer);
                        case TYPE_UINT32ARRAY:
                            return new Uint32Array(buffer);
                        case TYPE_FLOAT32ARRAY:
                            return new Float32Array(buffer);
                        case TYPE_FLOAT64ARRAY:
                            return new Float64Array(buffer);
                        default:
                            throw new Error('Unkown type: ' + type);
                    }
                }
                var localforageSerializer = {
                    serialize: serialize,
                    deserialize: deserialize,
                    stringToBuffer: stringToBuffer,
                    bufferToString: bufferToString
                };
                /*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */ function createDbTable(t, dbInfo, callback, errorCallback) {
                    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
                }
                // Open the WebSQL database (automatically creates one if one didn't
                // previously exist), using any options set in the config.
                function _initStorage$1(options) {
                    var self = this;
                    var dbInfo = {
                        db: null
                    };
                    if (options) for(var i in options)dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
                    var dbInfoPromise = new Promise$1(function(resolve, reject) {
                        // Open the database; the openDatabase API will automatically
                        // create it for us if it doesn't exist.
                        try {
                            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
                        } catch (e) {
                            return reject(e);
                        }
                        // Create our key/value table if it doesn't exist.
                        dbInfo.db.transaction(function(t) {
                            createDbTable(t, dbInfo, function() {
                                self._dbInfo = dbInfo;
                                resolve();
                            }, function(t, error) {
                                reject(error);
                            });
                        }, reject);
                    });
                    dbInfo.serializer = localforageSerializer;
                    return dbInfoPromise;
                }
                function tryExecuteSql(t1, dbInfo, sqlStatement, args, callback, errorCallback) {
                    t1.executeSql(sqlStatement, args, callback, function(t2, error) {
                        if (error.code === error.SYNTAX_ERR) t2.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [
                            dbInfo.storeName
                        ], function(t, results) {
                            if (!results.rows.length) // if the table is missing (was deleted)
                            // re-create it table and retry
                            createDbTable(t, dbInfo, function() {
                                t.executeSql(sqlStatement, args, callback, errorCallback);
                            }, errorCallback);
                            else errorCallback(t, error);
                        }, errorCallback);
                        else errorCallback(t2, error);
                    }, errorCallback);
                }
                function getItem$1(key, callback) {
                    var self = this;
                    key = normalizeKey(key);
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            var dbInfo = self._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [
                                    key
                                ], function(t, results) {
                                    var result = results.rows.length ? results.rows.item(0).value : null;
                                    // Check to see if this is serialized content we need to
                                    // unpack.
                                    if (result) result = dbInfo.serializer.deserialize(result);
                                    resolve(result);
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function iterate$1(iterator, callback) {
                    var self = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            var dbInfo = self._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function(t, results) {
                                    var rows = results.rows;
                                    var length = rows.length;
                                    for(var i = 0; i < length; i++){
                                        var item = rows.item(i);
                                        var result = item.value;
                                        // Check to see if this is serialized content
                                        // we need to unpack.
                                        if (result) result = dbInfo.serializer.deserialize(result);
                                        result = iterator(result, item.key, i + 1);
                                        // void(0) prevents problems with redefinition
                                        // of `undefined`.
                                        if (result !== void 0) {
                                            resolve(result);
                                            return;
                                        }
                                    }
                                    resolve();
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function _setItem(key, value2, callback, retriesLeft) {
                    var self = this;
                    key = normalizeKey(key);
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            // The localStorage API doesn't return undefined values in an
                            // "expected" way, so undefined is always cast to null in all
                            // drivers. See: https://github.com/mozilla/localForage/pull/42
                            if (value2 === undefined) value2 = null;
                            // Save the original value to pass to the callback.
                            var originalValue = value2;
                            var dbInfo = self._dbInfo;
                            dbInfo.serializer.serialize(value2, function(value, error1) {
                                if (error1) reject(error1);
                                else dbInfo.db.transaction(function(t) {
                                    tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [
                                        key,
                                        value
                                    ], function() {
                                        resolve(originalValue);
                                    }, function(t, error) {
                                        reject(error);
                                    });
                                }, function(sqlError) {
                                    // The transaction failed; check
                                    // to see if it's a quota error.
                                    if (sqlError.code === sqlError.QUOTA_ERR) {
                                        // We reject the callback outright for now, but
                                        // it's worth trying to re-run the transaction.
                                        // Even if the user accepts the prompt to use
                                        // more storage on Safari, this error will
                                        // be called.
                                        //
                                        // Try to re-run the transaction.
                                        if (retriesLeft > 0) {
                                            resolve(_setItem.apply(self, [
                                                key,
                                                originalValue,
                                                callback,
                                                retriesLeft - 1
                                            ]));
                                            return;
                                        }
                                        reject(sqlError);
                                    }
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function setItem$1(key, value, callback) {
                    return _setItem.apply(this, [
                        key,
                        value,
                        callback,
                        1
                    ]);
                }
                function removeItem$1(key, callback) {
                    var self = this;
                    key = normalizeKey(key);
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            var dbInfo = self._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [
                                    key
                                ], function() {
                                    resolve();
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Deletes every item in the table.
                // TODO: Find out if this resets the AUTO_INCREMENT number.
                function clear$1(callback) {
                    var self = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            var dbInfo = self._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function() {
                                    resolve();
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Does a simple `COUNT(key)` to get the number of items stored in
                // localForage.
                function length$1(callback) {
                    var self = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            var dbInfo = self._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                // Ahhh, SQL makes this one soooooo easy.
                                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function(t, results) {
                                    var result = results.rows.item(0).c;
                                    resolve(result);
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Return the key located at key index X; essentially gets the key from a
                // `WHERE id = ?`. This is the most efficient way I can think to implement
                // this rarely-used (in my experience) part of the API, but it can seem
                // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
                // the ID of each key will change every time it's updated. Perhaps a stored
                // procedure for the `setItem()` SQL would solve this problem?
                // TODO: Don't change ID on `setItem()`.
                function key$1(n, callback) {
                    var self = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            var dbInfo = self._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [
                                    n + 1
                                ], function(t, results) {
                                    var result = results.rows.length ? results.rows.item(0).key : null;
                                    resolve(result);
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function keys$1(callback) {
                    var self = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self.ready().then(function() {
                            var dbInfo = self._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function(t, results) {
                                    var keys = [];
                                    for(var i = 0; i < results.rows.length; i++)keys.push(results.rows.item(i).key);
                                    resolve(keys);
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // https://www.w3.org/TR/webdatabase/#databases
                // > There is no way to enumerate or delete the databases available for an origin from this API.
                function getAllStoreNames(db) {
                    return new Promise$1(function(resolve, reject) {
                        db.transaction(function(t) {
                            t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t, results) {
                                var storeNames = [];
                                for(var i = 0; i < results.rows.length; i++)storeNames.push(results.rows.item(i).name);
                                resolve({
                                    db: db,
                                    storeNames: storeNames
                                });
                            }, function(t, error) {
                                reject(error);
                            });
                        }, function(sqlError) {
                            reject(sqlError);
                        });
                    });
                }
                function dropInstance$1(options, callback) {
                    callback = getCallback.apply(this, arguments);
                    var currentConfig = this.config();
                    options = typeof options !== 'function' && options || {
                    };
                    if (!options.name) {
                        options.name = options.name || currentConfig.name;
                        options.storeName = options.storeName || currentConfig.storeName;
                    }
                    var self = this;
                    var promise;
                    if (!options.name) promise = Promise$1.reject('Invalid arguments');
                    else promise = new Promise$1(function(resolve) {
                        var db;
                        if (options.name === currentConfig.name) // use the db reference of the current instance
                        db = self._dbInfo.db;
                        else db = openDatabase(options.name, '', '', 0);
                        if (!options.storeName) // drop all database tables
                        resolve(getAllStoreNames(db));
                        else resolve({
                            db: db,
                            storeNames: [
                                options.storeName
                            ]
                        });
                    }).then(function(operationInfo) {
                        return new Promise$1(function(resolve1, reject1) {
                            operationInfo.db.transaction(function(t) {
                                function dropTable(storeName) {
                                    return new Promise$1(function(resolve, reject) {
                                        t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function() {
                                            resolve();
                                        }, function(t, error) {
                                            reject(error);
                                        });
                                    });
                                }
                                var operations = [];
                                for(var i = 0, len = operationInfo.storeNames.length; i < len; i++)operations.push(dropTable(operationInfo.storeNames[i]));
                                Promise$1.all(operations).then(function() {
                                    resolve1();
                                })["catch"](function(e) {
                                    reject1(e);
                                });
                            }, function(sqlError) {
                                reject1(sqlError);
                            });
                        });
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                var webSQLStorage = {
                    _driver: 'webSQLStorage',
                    _initStorage: _initStorage$1,
                    _support: isWebSQLValid(),
                    iterate: iterate$1,
                    getItem: getItem$1,
                    setItem: setItem$1,
                    removeItem: removeItem$1,
                    clear: clear$1,
                    length: length$1,
                    key: key$1,
                    keys: keys$1,
                    dropInstance: dropInstance$1
                };
                function isLocalStorageValid() {
                    try {
                        return typeof localStorage !== 'undefined' && 'setItem' in localStorage && // in IE8 typeof localStorage.setItem === 'object'
                        !!localStorage.setItem;
                    } catch (e) {
                        return false;
                    }
                }
                function _getKeyPrefix(options, defaultConfig) {
                    var keyPrefix = options.name + '/';
                    if (options.storeName !== defaultConfig.storeName) keyPrefix += options.storeName + '/';
                    return keyPrefix;
                }
                // Check if localStorage throws when saving an item
                function checkIfLocalStorageThrows() {
                    var localStorageTestKey = '_localforage_support_test';
                    try {
                        localStorage.setItem(localStorageTestKey, true);
                        localStorage.removeItem(localStorageTestKey);
                        return false;
                    } catch (e) {
                        return true;
                    }
                }
                // Check if localStorage is usable and allows to save an item
                // This method checks if localStorage is usable in Safari Private Browsing
                // mode, or in any other case where the available quota for localStorage
                // is 0 and there wasn't any saved items yet.
                function _isLocalStorageUsable() {
                    return !checkIfLocalStorageThrows() || localStorage.length > 0;
                }
                // Config the localStorage backend, using options set in the config.
                function _initStorage$2(options) {
                    var self = this;
                    var dbInfo = {
                    };
                    if (options) for(var i in options)dbInfo[i] = options[i];
                    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);
                    if (!_isLocalStorageUsable()) return Promise$1.reject();
                    self._dbInfo = dbInfo;
                    dbInfo.serializer = localforageSerializer;
                    return Promise$1.resolve();
                }
                // Remove all keys from the datastore, effectively destroying all data in
                // the app's key/value store!
                function clear$2(callback) {
                    var self = this;
                    var promise = self.ready().then(function() {
                        var keyPrefix = self._dbInfo.keyPrefix;
                        for(var i = localStorage.length - 1; i >= 0; i--){
                            var key = localStorage.key(i);
                            if (key.indexOf(keyPrefix) === 0) localStorage.removeItem(key);
                        }
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Retrieve an item from the store. Unlike the original async_storage
                // library in Gaia, we don't modify return values at all. If a key's value
                // is `undefined`, we pass that value to the callback function.
                function getItem$2(key, callback) {
                    var self = this;
                    key = normalizeKey(key);
                    var promise = self.ready().then(function() {
                        var dbInfo = self._dbInfo;
                        var result = localStorage.getItem(dbInfo.keyPrefix + key);
                        // If a result was found, parse it from the serialized
                        // string into a JS object. If result isn't truthy, the key
                        // is likely undefined and we'll pass it straight to the
                        // callback.
                        if (result) result = dbInfo.serializer.deserialize(result);
                        return result;
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Iterate over all items in the store.
                function iterate$2(iterator, callback) {
                    var self = this;
                    var promise = self.ready().then(function() {
                        var dbInfo = self._dbInfo;
                        var keyPrefix = dbInfo.keyPrefix;
                        var keyPrefixLength = keyPrefix.length;
                        var length = localStorage.length;
                        // We use a dedicated iterator instead of the `i` variable below
                        // so other keys we fetch in localStorage aren't counted in
                        // the `iterationNumber` argument passed to the `iterate()`
                        // callback.
                        //
                        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
                        var iterationNumber = 1;
                        for(var i = 0; i < length; i++){
                            var key = localStorage.key(i);
                            if (key.indexOf(keyPrefix) !== 0) continue;
                            var value = localStorage.getItem(key);
                            // If a result was found, parse it from the serialized
                            // string into a JS object. If result isn't truthy, the
                            // key is likely undefined and we'll pass it straight
                            // to the iterator.
                            if (value) value = dbInfo.serializer.deserialize(value);
                            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);
                            if (value !== void 0) return value;
                        }
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Same as localStorage's key() method, except takes a callback.
                function key$2(n, callback) {
                    var self = this;
                    var promise = self.ready().then(function() {
                        var dbInfo = self._dbInfo;
                        var result;
                        try {
                            result = localStorage.key(n);
                        } catch (error) {
                            result = null;
                        }
                        // Remove the prefix from the key, if a key is found.
                        if (result) result = result.substring(dbInfo.keyPrefix.length);
                        return result;
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function keys$2(callback) {
                    var self = this;
                    var promise = self.ready().then(function() {
                        var dbInfo = self._dbInfo;
                        var length = localStorage.length;
                        var keys = [];
                        for(var i = 0; i < length; i++){
                            var itemKey = localStorage.key(i);
                            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) keys.push(itemKey.substring(dbInfo.keyPrefix.length));
                        }
                        return keys;
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Supply the number of keys in the datastore to the callback function.
                function length$2(callback) {
                    var self = this;
                    var promise = self.keys().then(function(keys) {
                        return keys.length;
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Remove an item from the store, nice and simple.
                function removeItem$2(key, callback) {
                    var self = this;
                    key = normalizeKey(key);
                    var promise = self.ready().then(function() {
                        var dbInfo = self._dbInfo;
                        localStorage.removeItem(dbInfo.keyPrefix + key);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Set a key's value and run an optional callback once the value is set.
                // Unlike Gaia's implementation, the callback function is passed the value,
                // in case you want to operate on that value only after you're sure it
                // saved, or something like that.
                function setItem$2(key, value3, callback) {
                    var self = this;
                    key = normalizeKey(key);
                    var promise = self.ready().then(function() {
                        // Convert undefined values to null.
                        // https://github.com/mozilla/localForage/pull/42
                        if (value3 === undefined) value3 = null;
                        // Save the original value to pass to the callback.
                        var originalValue = value3;
                        return new Promise$1(function(resolve, reject) {
                            var dbInfo = self._dbInfo;
                            dbInfo.serializer.serialize(value3, function(value, error) {
                                if (error) reject(error);
                                else try {
                                    localStorage.setItem(dbInfo.keyPrefix + key, value);
                                    resolve(originalValue);
                                } catch (e) {
                                    // localStorage capacity exceeded.
                                    // TODO: Make this a specific error/event.
                                    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') reject(e);
                                    reject(e);
                                }
                            });
                        });
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function dropInstance$2(options, callback) {
                    callback = getCallback.apply(this, arguments);
                    options = typeof options !== 'function' && options || {
                    };
                    if (!options.name) {
                        var currentConfig = this.config();
                        options.name = options.name || currentConfig.name;
                        options.storeName = options.storeName || currentConfig.storeName;
                    }
                    var self = this;
                    var promise;
                    if (!options.name) promise = Promise$1.reject('Invalid arguments');
                    else promise = new Promise$1(function(resolve) {
                        if (!options.storeName) resolve(options.name + '/');
                        else resolve(_getKeyPrefix(options, self._defaultConfig));
                    }).then(function(keyPrefix) {
                        for(var i = localStorage.length - 1; i >= 0; i--){
                            var key = localStorage.key(i);
                            if (key.indexOf(keyPrefix) === 0) localStorage.removeItem(key);
                        }
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                var localStorageWrapper = {
                    _driver: 'localStorageWrapper',
                    _initStorage: _initStorage$2,
                    _support: isLocalStorageValid(),
                    iterate: iterate$2,
                    getItem: getItem$2,
                    setItem: setItem$2,
                    removeItem: removeItem$2,
                    clear: clear$2,
                    length: length$2,
                    key: key$2,
                    keys: keys$2,
                    dropInstance: dropInstance$2
                };
                var sameValue = function sameValue(x, y) {
                    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
                };
                var includes = function includes(array, searchElement) {
                    var len = array.length;
                    var i = 0;
                    while(i < len){
                        if (sameValue(array[i], searchElement)) return true;
                        i++;
                    }
                    return false;
                };
                var isArray = Array.isArray || function(arg) {
                    return Object.prototype.toString.call(arg) === '[object Array]';
                };
                // Drivers are stored here when `defineDriver()` is called.
                // They are shared across all instances of localForage.
                var DefinedDrivers = {
                };
                var DriverSupport = {
                };
                var DefaultDrivers = {
                    INDEXEDDB: asyncStorage,
                    WEBSQL: webSQLStorage,
                    LOCALSTORAGE: localStorageWrapper
                };
                var DefaultDriverOrder = [
                    DefaultDrivers.INDEXEDDB._driver,
                    DefaultDrivers.WEBSQL._driver,
                    DefaultDrivers.LOCALSTORAGE._driver
                ];
                var OptionalDriverMethods = [
                    'dropInstance'
                ];
                var LibraryMethods = [
                    'clear',
                    'getItem',
                    'iterate',
                    'key',
                    'keys',
                    'length',
                    'removeItem',
                    'setItem'
                ].concat(OptionalDriverMethods);
                var DefaultConfig = {
                    description: '',
                    driver: DefaultDriverOrder.slice(),
                    name: 'localforage',
                    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
                    // we can use without a prompt.
                    size: 4980736,
                    storeName: 'keyvaluepairs',
                    version: 1
                };
                function callWhenReady(localForageInstance, libraryMethod) {
                    localForageInstance[libraryMethod] = function() {
                        var _args = arguments;
                        return localForageInstance.ready().then(function() {
                            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
                        });
                    };
                }
                function extend() {
                    for(var i = 1; i < arguments.length; i++){
                        var arg = arguments[i];
                        if (arg) {
                            for(var _key in arg)if (arg.hasOwnProperty(_key)) {
                                if (isArray(arg[_key])) arguments[0][_key] = arg[_key].slice();
                                else arguments[0][_key] = arg[_key];
                            }
                        }
                    }
                    return arguments[0];
                }
                var LocalForage1 = function() {
                    function LocalForage(options) {
                        _classCallCheck(this, LocalForage);
                        for(var driverTypeKey in DefaultDrivers)if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                            var driver = DefaultDrivers[driverTypeKey];
                            var driverName = driver._driver;
                            this[driverTypeKey] = driverName;
                            if (!DefinedDrivers[driverName]) // we don't need to wait for the promise,
                            // since the default drivers can be defined
                            // in a blocking manner
                            this.defineDriver(driver);
                        }
                        this._defaultConfig = extend({
                        }, DefaultConfig);
                        this._config = extend({
                        }, this._defaultConfig, options);
                        this._driverSet = null;
                        this._initDriver = null;
                        this._ready = false;
                        this._dbInfo = null;
                        this._wrapLibraryMethodsWithReady();
                        this.setDriver(this._config.driver)["catch"](function() {
                        });
                    }
                    // Set any config values for localForage; can be called anytime before
                    // the first API call (e.g. `getItem`, `setItem`).
                    // We loop through options so we don't overwrite existing config
                    // values.
                    LocalForage.prototype.config = function config(options) {
                        // If the options argument is an object, we use it to set values.
                        // Otherwise, we return either a specified config value or all
                        // config values.
                        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
                            // If localforage is ready and fully initialized, we can't set
                            // any new configuration values. Instead, we return an error.
                            if (this._ready) return new Error("Can't call config() after localforage has been used.");
                            for(var i in options){
                                if (i === 'storeName') options[i] = options[i].replace(/\W/g, '_');
                                if (i === 'version' && typeof options[i] !== 'number') return new Error('Database version must be a number.');
                                this._config[i] = options[i];
                            }
                            // after all config options are set and
                            // the driver option is used, try setting it
                            if ('driver' in options && options.driver) return this.setDriver(this._config.driver);
                            return true;
                        } else if (typeof options === 'string') return this._config[options];
                        else return this._config;
                    };
                    // Used to define a custom driver, shared across all instances of
                    // localForage.
                    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
                        var promise1 = new Promise$1(function(resolve, reject) {
                            try {
                                var driverName = driverObject._driver;
                                var complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                                // A driver name should be defined and not overlap with the
                                // library-defined, default drivers.
                                if (!driverObject._driver) {
                                    reject(complianceError);
                                    return;
                                }
                                var driverMethods = LibraryMethods.concat('_initStorage');
                                for(var i = 0, len = driverMethods.length; i < len; i++){
                                    var driverMethodName = driverMethods[i];
                                    // when the property is there,
                                    // it should be a method even when optional
                                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                                        reject(complianceError);
                                        return;
                                    }
                                }
                                var configureMissingMethods = function configureMissingMethods() {
                                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                                        return function() {
                                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                                            var promise = Promise$1.reject(error);
                                            executeCallback(promise, arguments[arguments.length - 1]);
                                            return promise;
                                        };
                                    };
                                    for(var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++){
                                        var optionalDriverMethod = OptionalDriverMethods[_i];
                                        if (!driverObject[optionalDriverMethod]) driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                                    }
                                };
                                configureMissingMethods();
                                var setDriverSupport = function setDriverSupport(support) {
                                    if (DefinedDrivers[driverName]) console.info('Redefining LocalForage driver: ' + driverName);
                                    DefinedDrivers[driverName] = driverObject;
                                    DriverSupport[driverName] = support;
                                    // don't use a then, so that we can define
                                    // drivers that have simple _support methods
                                    // in a blocking manner
                                    resolve();
                                };
                                if ('_support' in driverObject) {
                                    if (driverObject._support && typeof driverObject._support === 'function') driverObject._support().then(setDriverSupport, reject);
                                    else setDriverSupport(!!driverObject._support);
                                } else setDriverSupport(true);
                            } catch (e) {
                                reject(e);
                            }
                        });
                        executeTwoCallbacks(promise1, callback, errorCallback);
                        return promise1;
                    };
                    LocalForage.prototype.driver = function driver() {
                        return this._driver || null;
                    };
                    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
                        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));
                        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
                        return getDriverPromise;
                    };
                    LocalForage.prototype.getSerializer = function getSerializer(callback) {
                        var serializerPromise = Promise$1.resolve(localforageSerializer);
                        executeTwoCallbacks(serializerPromise, callback);
                        return serializerPromise;
                    };
                    LocalForage.prototype.ready = function ready(callback) {
                        var self = this;
                        var promise = self._driverSet.then(function() {
                            if (self._ready === null) self._ready = self._initDriver();
                            return self._ready;
                        });
                        executeTwoCallbacks(promise, callback, callback);
                        return promise;
                    };
                    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
                        var self = this;
                        if (!isArray(drivers)) drivers = [
                            drivers
                        ];
                        var supportedDrivers1 = this._getSupportedDrivers(drivers);
                        function setDriverToConfig() {
                            self._config.driver = self.driver();
                        }
                        function extendSelfWithDriver(driver) {
                            self._extend(driver);
                            setDriverToConfig();
                            self._ready = self._initStorage(self._config);
                            return self._ready;
                        }
                        function initDriver(supportedDrivers) {
                            return function() {
                                var currentDriverIndex = 0;
                                function driverPromiseLoop() {
                                    while(currentDriverIndex < supportedDrivers.length){
                                        var driverName = supportedDrivers[currentDriverIndex];
                                        currentDriverIndex++;
                                        self._dbInfo = null;
                                        self._ready = null;
                                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                                    }
                                    setDriverToConfig();
                                    var error = new Error('No available storage method found.');
                                    self._driverSet = Promise$1.reject(error);
                                    return self._driverSet;
                                }
                                return driverPromiseLoop();
                            };
                        }
                        // There might be a driver initialization in progress
                        // so wait for it to finish in order to avoid a possible
                        // race condition to set _dbInfo
                        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
                            return Promise$1.resolve();
                        }) : Promise$1.resolve();
                        this._driverSet = oldDriverSetDone.then(function() {
                            var driverName = supportedDrivers1[0];
                            self._dbInfo = null;
                            self._ready = null;
                            return self.getDriver(driverName).then(function(driver) {
                                self._driver = driver._driver;
                                setDriverToConfig();
                                self._wrapLibraryMethodsWithReady();
                                self._initDriver = initDriver(supportedDrivers1);
                            });
                        })["catch"](function() {
                            setDriverToConfig();
                            var error = new Error('No available storage method found.');
                            self._driverSet = Promise$1.reject(error);
                            return self._driverSet;
                        });
                        executeTwoCallbacks(this._driverSet, callback, errorCallback);
                        return this._driverSet;
                    };
                    LocalForage.prototype.supports = function supports(driverName) {
                        return !!DriverSupport[driverName];
                    };
                    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
                        extend(this, libraryMethodsAndProperties);
                    };
                    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
                        var supportedDrivers = [];
                        for(var i = 0, len = drivers.length; i < len; i++){
                            var driverName = drivers[i];
                            if (this.supports(driverName)) supportedDrivers.push(driverName);
                        }
                        return supportedDrivers;
                    };
                    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
                        // Add a stub for each driver API method that delays the call to the
                        // corresponding driver method until localForage is ready. These stubs
                        // will be replaced by the driver methods as soon as the driver is
                        // loaded, so there is no performance impact.
                        for(var i = 0, len = LibraryMethods.length; i < len; i++)callWhenReady(this, LibraryMethods[i]);
                    };
                    LocalForage.prototype.createInstance = function createInstance(options) {
                        return new LocalForage(options);
                    };
                    return LocalForage;
                }();
                // The actual localForage object that we expose as a module or via a
                // global. It's extended by pulling in one of our other libraries.
                var localforage_js = new LocalForage1();
                module.exports = localforage_js;
            },
            {
                "3": 3
            }
        ]
    }, {
    }, [
        4
    ])(4);
});

},{}],"f4a22":[function(require,module,exports) {
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.Mustache = factory());
})(this, function() {
    'use strict';
    /*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   */ var objectToString = Object.prototype.toString;
    var isArray = Array.isArray || function isArrayPolyfill(object) {
        return objectToString.call(object) === '[object Array]';
    };
    function isFunction(object) {
        return typeof object === 'function';
    }
    /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */ function typeStr(obj) {
        return isArray(obj) ? 'array' : typeof obj;
    }
    function escapeRegExp(string) {
        return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    }
    /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */ function hasProperty(obj, propName) {
        return obj != null && typeof obj === 'object' && propName in obj;
    }
    /**
   * Safe way of detecting whether or not the given thing is a primitive and
   * whether it has the given property
   */ function primitiveHasOwnProperty(primitive, propName) {
        return primitive != null && typeof primitive !== 'object' && primitive.hasOwnProperty && primitive.hasOwnProperty(propName);
    }
    // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
    // See https://github.com/janl/mustache.js/issues/189
    var regExpTest = RegExp.prototype.test;
    function testRegExp(re, string) {
        return regExpTest.call(re, string);
    }
    var nonSpaceRe = /\S/;
    function isWhitespace(string) {
        return !testRegExp(nonSpaceRe, string);
    }
    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
            return entityMap[s];
        });
    }
    var whiteRe = /\s*/;
    var spaceRe = /\s+/;
    var equalsRe = /\s*=/;
    var curlyRe = /\s*\}/;
    var tagRe = /#|\^|\/|>|\{|&|=|!/;
    /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   *
   * Tokens for partials also contain two more elements: 1) a string value of
   * indendation prior to that tag and 2) the index of that tag on that line -
   * eg a value of 2 indicates the partial is the third tag on this line.
   */ function parseTemplate(template, tags) {
        if (!template) return [];
        var lineHasNonSpace = false;
        var sections = []; // Stack to hold section tokens
        var tokens = []; // Buffer to hold the tokens
        var spaces = []; // Indices of whitespace tokens on the current line
        var hasTag = false; // Is there a {{tag}} on the current line?
        var nonSpace = false; // Is there a non-space char on the current line?
        var indentation = ''; // Tracks indentation for tags that use it
        var tagIndex = 0; // Stores a count of number of tags encountered on a line
        // Strips all whitespace tokens array for the current line
        // if there was a {{#tag}} on it and otherwise only space.
        function stripSpace() {
            if (hasTag && !nonSpace) while(spaces.length)delete tokens[spaces.pop()];
            else spaces = [];
            hasTag = false;
            nonSpace = false;
        }
        var openingTagRe, closingTagRe, closingCurlyRe;
        function compileTags(tagsToCompile) {
            if (typeof tagsToCompile === 'string') tagsToCompile = tagsToCompile.split(spaceRe, 2);
            if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error('Invalid tags: ' + tagsToCompile);
            openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
            closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
            closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
        }
        compileTags(tags || mustache.tags);
        var scanner = new Scanner(template);
        var start, type, value, chr, token, openSection;
        while(!scanner.eos()){
            start = scanner.pos;
            // Match any text between tags.
            value = scanner.scanUntil(openingTagRe);
            if (value) for(var i = 0, valueLength = value.length; i < valueLength; ++i){
                chr = value.charAt(i);
                if (isWhitespace(chr)) {
                    spaces.push(tokens.length);
                    indentation += chr;
                } else {
                    nonSpace = true;
                    lineHasNonSpace = true;
                    indentation += ' ';
                }
                tokens.push([
                    'text',
                    chr,
                    start,
                    start + 1
                ]);
                start += 1;
                // Check for whitespace on the current line.
                if (chr === '\n') {
                    stripSpace();
                    indentation = '';
                    tagIndex = 0;
                    lineHasNonSpace = false;
                }
            }
            // Match the opening tag.
            if (!scanner.scan(openingTagRe)) break;
            hasTag = true;
            // Get the tag type.
            type = scanner.scan(tagRe) || 'name';
            scanner.scan(whiteRe);
            // Get the tag value.
            if (type === '=') {
                value = scanner.scanUntil(equalsRe);
                scanner.scan(equalsRe);
                scanner.scanUntil(closingTagRe);
            } else if (type === '{') {
                value = scanner.scanUntil(closingCurlyRe);
                scanner.scan(curlyRe);
                scanner.scanUntil(closingTagRe);
                type = '&';
            } else value = scanner.scanUntil(closingTagRe);
            // Match the closing tag.
            if (!scanner.scan(closingTagRe)) throw new Error('Unclosed tag at ' + scanner.pos);
            if (type == '>') token = [
                type,
                value,
                start,
                scanner.pos,
                indentation,
                tagIndex,
                lineHasNonSpace
            ];
            else token = [
                type,
                value,
                start,
                scanner.pos
            ];
            tagIndex++;
            tokens.push(token);
            if (type === '#' || type === '^') sections.push(token);
            else if (type === '/') {
                // Check section nesting.
                openSection = sections.pop();
                if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start);
                if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
            } else if (type === 'name' || type === '{' || type === '&') nonSpace = true;
            else if (type === '=') // Set the tags for the next time around.
            compileTags(value);
        }
        stripSpace();
        // Make sure there are no open sections when we're done.
        openSection = sections.pop();
        if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
        return nestTokens(squashTokens(tokens));
    }
    /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */ function squashTokens(tokens) {
        var squashedTokens = [];
        var token, lastToken;
        for(var i = 0, numTokens = tokens.length; i < numTokens; ++i){
            token = tokens[i];
            if (token) {
                if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
                    lastToken[1] += token[1];
                    lastToken[3] = token[3];
                } else {
                    squashedTokens.push(token);
                    lastToken = token;
                }
            }
        }
        return squashedTokens;
    }
    /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */ function nestTokens(tokens) {
        var nestedTokens = [];
        var collector = nestedTokens;
        var sections = [];
        var token, section;
        for(var i = 0, numTokens = tokens.length; i < numTokens; ++i){
            token = tokens[i];
            switch(token[0]){
                case '#':
                case '^':
                    collector.push(token);
                    sections.push(token);
                    collector = token[4] = [];
                    break;
                case '/':
                    section = sections.pop();
                    section[5] = token[2];
                    collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
                    break;
                default:
                    collector.push(token);
            }
        }
        return nestedTokens;
    }
    /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */ function Scanner(string) {
        this.string = string;
        this.tail = string;
        this.pos = 0;
    }
    /**
   * Returns `true` if the tail is empty (end of string).
   */ Scanner.prototype.eos = function eos() {
        return this.tail === '';
    };
    /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */ Scanner.prototype.scan = function scan(re) {
        var match = this.tail.match(re);
        if (!match || match.index !== 0) return '';
        var string = match[0];
        this.tail = this.tail.substring(string.length);
        this.pos += string.length;
        return string;
    };
    /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */ Scanner.prototype.scanUntil = function scanUntil(re) {
        var index = this.tail.search(re), match;
        switch(index){
            case -1:
                match = this.tail;
                this.tail = '';
                break;
            case 0:
                match = '';
                break;
            default:
                match = this.tail.substring(0, index);
                this.tail = this.tail.substring(index);
        }
        this.pos += match.length;
        return match;
    };
    /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */ function Context(view, parentContext) {
        this.view = view;
        this.cache = {
            '.': this.view
        };
        this.parent = parentContext;
    }
    /**
   * Creates a new context using the given view with this context
   * as the parent.
   */ Context.prototype.push = function push(view) {
        return new Context(view, this);
    };
    /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */ Context.prototype.lookup = function lookup(name) {
        var cache = this.cache;
        var value;
        if (cache.hasOwnProperty(name)) value = cache[name];
        else {
            var context = this, intermediateValue, names, index, lookupHit = false;
            while(context){
                if (name.indexOf('.') > 0) {
                    intermediateValue = context.view;
                    names = name.split('.');
                    index = 0;
                    /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           *
           * In the case where dot notation is used, we consider the lookup
           * to be successful even if the last "object" in the path is
           * not actually an object but a primitive (e.g., a string, or an
           * integer), because it is sometimes useful to access a property
           * of an autoboxed primitive, such as the length of a string.
           **/ while(intermediateValue != null && index < names.length){
                        if (index === names.length - 1) lookupHit = hasProperty(intermediateValue, names[index]) || primitiveHasOwnProperty(intermediateValue, names[index]);
                        intermediateValue = intermediateValue[names[index++]];
                    }
                } else {
                    intermediateValue = context.view[name];
                    /**
           * Only checking against `hasProperty`, which always returns `false` if
           * `context.view` is not an object. Deliberately omitting the check
           * against `primitiveHasOwnProperty` if dot notation is not used.
           *
           * Consider this example:
           * ```
           * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
           * ```
           *
           * If we were to check also against `primitiveHasOwnProperty`, as we do
           * in the dot notation case, then render call would return:
           *
           * "The length of a football field is 9."
           *
           * rather than the expected:
           *
           * "The length of a football field is 100 yards."
           **/ lookupHit = hasProperty(context.view, name);
                }
                if (lookupHit) {
                    value = intermediateValue;
                    break;
                }
                context = context.parent;
            }
            cache[name] = value;
        }
        if (isFunction(value)) value = value.call(this.view);
        return value;
    };
    /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */ function Writer() {
        this.templateCache = {
            _cache: {
            },
            set: function set(key, value) {
                this._cache[key] = value;
            },
            get: function get(key) {
                return this._cache[key];
            },
            clear: function clear() {
                this._cache = {
                };
            }
        };
    }
    /**
   * Clears all cached templates in this writer.
   */ Writer.prototype.clearCache = function clearCache() {
        if (typeof this.templateCache !== 'undefined') this.templateCache.clear();
    };
    /**
   * Parses and caches the given `template` according to the given `tags` or
   * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
   * that is generated from the parse.
   */ Writer.prototype.parse = function parse(template, tags) {
        var cache = this.templateCache;
        var cacheKey = template + ':' + (tags || mustache.tags).join(':');
        var isCacheEnabled = typeof cache !== 'undefined';
        var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;
        if (tokens == undefined) {
            tokens = parseTemplate(template, tags);
            isCacheEnabled && cache.set(cacheKey, tokens);
        }
        return tokens;
    };
    /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   *
   * If the optional `config` argument is given here, then it should be an
   * object with a `tags` attribute or an `escape` attribute or both.
   * If an array is passed, then it will be interpreted the same way as
   * a `tags` attribute on a `config` object.
   *
   * The `tags` attribute of a `config` object must be an array with two
   * string values: the opening and closing tags used in the template (e.g.
   * [ "<%", "%>" ]). The default is to mustache.tags.
   *
   * The `escape` attribute of a `config` object must be a function which
   * accepts a string as input and outputs a safely escaped string.
   * If an `escape` function is not provided, then an HTML-safe string
   * escaping function is used as the default.
   */ Writer.prototype.render = function render(template, view, partials, config) {
        var tags = this.getConfigTags(config);
        var tokens = this.parse(template, tags);
        var context = view instanceof Context ? view : new Context(view, undefined);
        return this.renderTokens(tokens, context, partials, template, config);
    };
    /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */ Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, config) {
        var buffer = '';
        var token, symbol, value;
        for(var i = 0, numTokens = tokens.length; i < numTokens; ++i){
            value = undefined;
            token = tokens[i];
            symbol = token[0];
            if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
            else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
            else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
            else if (symbol === '&') value = this.unescapedValue(token, context);
            else if (symbol === 'name') value = this.escapedValue(token, context, config);
            else if (symbol === 'text') value = this.rawValue(token);
            if (value !== undefined) buffer += value;
        }
        return buffer;
    };
    Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate, config) {
        var self = this;
        var buffer = '';
        var value = context.lookup(token[1]);
        // This function is used to render an arbitrary template
        // in the current context by higher-order sections.
        function subRender(template) {
            return self.render(template, context, partials, config);
        }
        if (!value) return;
        if (isArray(value)) for(var j = 0, valueLength = value.length; j < valueLength; ++j)buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
        else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
        else if (isFunction(value)) {
            if (typeof originalTemplate !== 'string') throw new Error('Cannot use higher-order sections without the original template');
            // Extract the portion of the original template that the section contains.
            value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
            if (value != null) buffer += value;
        } else buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
        return buffer;
    };
    Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate, config) {
        var value = context.lookup(token[1]);
        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate, config);
    };
    Writer.prototype.indentPartial = function indentPartial(partial, indentation, lineHasNonSpace) {
        var filteredIndentation = indentation.replace(/[^ \t]/g, '');
        var partialByNl = partial.split('\n');
        for(var i = 0; i < partialByNl.length; i++)if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) partialByNl[i] = filteredIndentation + partialByNl[i];
        return partialByNl.join('\n');
    };
    Writer.prototype.renderPartial = function renderPartial(token, context, partials, config) {
        if (!partials) return;
        var tags = this.getConfigTags(config);
        var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null) {
            var lineHasNonSpace = token[6];
            var tagIndex = token[5];
            var indentation = token[4];
            var indentedValue = value;
            if (tagIndex == 0 && indentation) indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
            var tokens = this.parse(indentedValue, tags);
            return this.renderTokens(tokens, context, partials, indentedValue, config);
        }
    };
    Writer.prototype.unescapedValue = function unescapedValue(token, context) {
        var value = context.lookup(token[1]);
        if (value != null) return value;
    };
    Writer.prototype.escapedValue = function escapedValue(token, context, config) {
        var escape = this.getConfigEscape(config) || mustache.escape;
        var value = context.lookup(token[1]);
        if (value != null) return typeof value === 'number' && escape === mustache.escape ? String(value) : escape(value);
    };
    Writer.prototype.rawValue = function rawValue(token) {
        return token[1];
    };
    Writer.prototype.getConfigTags = function getConfigTags(config) {
        if (isArray(config)) return config;
        else if (config && typeof config === 'object') return config.tags;
        else return undefined;
    };
    Writer.prototype.getConfigEscape = function getConfigEscape(config) {
        if (config && typeof config === 'object' && !isArray(config)) return config.escape;
        else return undefined;
    };
    var mustache = {
        name: 'mustache.js',
        version: '4.2.0',
        tags: [
            '{{',
            '}}'
        ],
        clearCache: undefined,
        escape: undefined,
        parse: undefined,
        render: undefined,
        Scanner: undefined,
        Context: undefined,
        Writer: undefined,
        /**
     * Allows a user to override the default caching strategy, by providing an
     * object with set, get and clear methods. This can also be used to disable
     * the cache by setting it to the literal `undefined`.
     */ set templateCache (cache){
            defaultWriter.templateCache = cache;
        },
        /**
     * Gets the default or overridden caching object from the default writer.
     */ get templateCache () {
            return defaultWriter.templateCache;
        }
    };
    // All high-level mustache.* functions use this writer.
    var defaultWriter = new Writer();
    /**
   * Clears all cached templates in the default writer.
   */ mustache.clearCache = function clearCache() {
        return defaultWriter.clearCache();
    };
    /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */ mustache.parse = function parse(template, tags) {
        return defaultWriter.parse(template, tags);
    };
    /**
   * Renders the `template` with the given `view`, `partials`, and `config`
   * using the default writer.
   */ mustache.render = function render(template, view, partials, config) {
        if (typeof template !== 'string') throw new TypeError("Invalid template! Template should be a \"string\" but \"" + typeStr(template) + '" was given as the first ' + 'argument for mustache#render(template, view, partials)');
        return defaultWriter.render(template, view, partials, config);
    };
    // Export the escaping function so that the user may override it.
    // See https://github.com/janl/mustache.js/issues/244
    mustache.escape = escapeHtml;
    // Export these mainly for testing, but also for advanced usage.
    mustache.Scanner = Scanner;
    mustache.Context = Context;
    mustache.Writer = Writer;
    return mustache;
});

},{}],"db1Xp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "sort_array", ()=>sort_array
);
parcelHelpers.export(exports, "uid", ()=>uid
);
parcelHelpers.export(exports, "notification", ()=>notification
);
parcelHelpers.export(exports, "pushLocalNotification", ()=>pushLocalNotification
);
parcelHelpers.export(exports, "validate", ()=>validate
);
parcelHelpers.export(exports, "getManifest", ()=>getManifest
);
parcelHelpers.export(exports, "toaster", ()=>toaster
);
parcelHelpers.export(exports, "side_toaster", ()=>side_toaster
);
parcelHelpers.export(exports, "bottom_bar", ()=>bottom_bar
);
parcelHelpers.export(exports, "top_bar", ()=>top_bar
);
parcelHelpers.export(exports, "screenlock", ()=>screenlock
);
parcelHelpers.export(exports, "goodbye", ()=>goodbye
);
parcelHelpers.export(exports, "pick_image", ()=>pick_image
);
parcelHelpers.export(exports, "deleteFile", ()=>deleteFile
);
parcelHelpers.export(exports, "list_files", ()=>list_files
);
"use strict";
let sort_array = function(arr, item_key, type) {
    if (type == "date") arr.sort((a, b)=>{
        let da = new Date(a[item_key]), db = new Date(b[item_key]);
        return da - db;
    });
    //sort by number
    if (type == "number") arr.sort((a, b)=>{
        return b[item_key] - a[item_key];
    });
    //sort by string
    if (type == "string") arr.sort((a, b)=>{
        let fa = a[item_key].toLowerCase(), fb = b[item_key].toLowerCase();
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
    });
};
let uid = function() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return "greg@" + _p8() + _p8(true) + _p8(true) + _p8();
};
let notification = "";
let notify = function(param_title, param_text, param_silent) {
    var options = {
        body: param_text,
        silent: param_silent,
        requireInteraction: false
    };
    // Let's check whether notification permissions have already been granted
    if (Notification.permission === "granted") // If it's okay let's create a notification
    notification = new Notification(param_title, options);
    // Otherwise, we need to ask the user for permission
    if (Notification.permission !== "denied") Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") notification = new Notification(param_title, options);
    });
};
let pushLocalNotification = function(title, body) {
    window.Notification.requestPermission().then((result)=>{
        var notification1 = new window.Notification(title, {
            body: body
        });
        notification1.onerror = function(err) {
            console.log(err);
        };
        notification1.onclick = function(event) {
            if (window.navigator.mozApps) {
                var request = window.navigator.mozApps.getSelf();
                request.onsuccess = function() {
                    if (request.result) {
                        notification1.close();
                        request.result.launch();
                    }
                };
            } else window.open(document.location.origin, "_blank");
        };
        notification1.onshow = function() {
        // notification.close();
        };
    });
};
if (navigator.mozSetMessageHandler) navigator.mozSetMessageHandler("alarm", function(message) {
    console.log(JSON.stringify(message));
    pushLocalNotification("Greg", message.data.foo);
});
let validate = function(url) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(url)) return true;
    return false;
};
let getManifest = function(callback) {
    if (!navigator.mozApps) //let t = document.getElementById("kaisos-ads");
    //t.remove();
    return false;
    let self = navigator.mozApps.getSelf();
    self.onsuccess = function() {
        callback(self.result);
    };
    self.onerror = function() {
    };
};
//top toaster
let queue = [];
let timeout;
let toaster = function(text, time) {
    queue.push({
        text: text,
        time: time
    });
    if (queue.length === 1) toast_q(text, time);
};
let toast_q = function(text, time) {
    var x = document.querySelector("div#toast");
    x.innerHTML = queue[0].text;
    x.style.transform = "translate(0px, 0px)";
    timeout = setTimeout(function() {
        timeout = null;
        x.style.transform = "translate(0px, -100px)";
        queue = queue.slice(1);
        if (queue.length > 0) setTimeout(()=>{
            toast_q(text, time);
        }, 1000);
    }, time);
};
//side toaster
let queue_st = [];
let ttimeout;
let side_toaster = function(text, time) {
    queue_st.push({
        text: text,
        time: time
    });
    if (queue_st.length === 1) toast_qq(text, time);
};
let toast_qq = function(text, time) {
    var x = document.querySelector("div#side-toast");
    x.innerHTML = queue_st[0].text;
    x.style.transform = "translate(0vh, 0px)";
    timeout = setTimeout(function() {
        ttimeout = null;
        x.style.transform = "translate(-100vh,0px)";
        queue_st = queue.slice(1);
        if (queue_st.length > 0) setTimeout(()=>{
            toast_qq(text, time);
        }, 1000);
    }, time);
};
let bottom_bar = function(left, center, right) {
    document.querySelector("div#bottom-bar div#button-left").textContent = left;
    document.querySelector("div#bottom-bar div#button-center").textContent = center;
    document.querySelector("div#bottom-bar div#button-right").textContent = right;
    if (left == "" && center == "" && right == "") document.querySelector("div#bottom-bar").style.display = "none";
    else document.querySelector("div#bottom-bar").style.display = "block";
};
let top_bar = function(left, center, right) {
    document.querySelector("div#top-bar div.button-left").innerHTML = left;
    document.querySelector("div#top-bar div.button-center").textContent = center;
    document.querySelector("div#top-bar div.button-right").textContent = right;
    if (left == "" && center == "" && right == "") document.querySelector("div#top-bar").style.display = "none";
    else document.querySelector("div#top-bar").style.display = "block";
};
let add_script = function(script) {
    document.body.appendChild(document.createElement("script")).src = script;
};
let lock;
let screenlock = function(stat) {
    if (typeof window.navigator.requestWakeLock === "undefined") return false;
    if (stat == "lock") {
        lock = window.navigator.requestWakeLock("screen");
        lock.onsuccess = function() {
        };
        lock.onerror = function() {
            alert("An error occurred: " + this.error.name);
        };
    }
    if (stat == "unlock") {
        if (lock.topic == "screen") lock.unlock();
    }
};
let goodbye = function() {
    document.getElementById("goodbye").style.display = "block";
    bottom_bar("", "", "");
    if (localStorage.clickcount) localStorage.clickcount = Number(localStorage.clickcount) + 1;
    else localStorage.clickcount = 1;
    if (localStorage.clickcount == 300000) message();
    else {
        document.getElementById("ciao").style.display = "block";
        setTimeout(function() {
            window.close();
        }, 2000);
    }
    function message() {
        document.getElementById("donation").style.display = "block";
        setTimeout(function() {
            localStorage.clickcount = 1;
            window.close();
        }, 3000);
    }
};
let pick_image = function(cb) {
    var activity = new MozActivity({
        name: "pick",
        data: {
            type: [
                "image/png",
                "image/jpg",
                "image/jpeg"
            ]
        }
    });
    activity.onsuccess = function() {
        console.log("Activity successfuly handled");
        let p = this.result.blob;
        cb(p);
    };
    activity.onerror = function() {
        console.log("The activity encouter en error: " + this.error);
    };
};
let deleteFile = function(storage, path, notification2) {
    let sdcard = navigator.getDeviceStorages("sdcard");
    let requestDel = sdcard[storage].delete(path);
    requestDel.onsuccess = function() {
        if (notification2 == "notification") toaster('File "' + name + '" successfully deleted frome the sdcard storage area');
    };
    requestDel.onerror = function() {
        toaster("Unable to delete the file: " + this.error);
    };
};
let list_files = function(filetype, callback) {
    if (!navigator.getDeviceStorage) return false;
    var d = navigator.getDeviceStorage("sdcard");
    var cursor = d.enumerate();
    cursor.onsuccess = function() {
        if (!this.result) console.log("finished");
        if (cursor.result.name !== null) {
            var file = cursor.result;
            let n = file.name.split(".");
            let file_type = n[n.length - 1];
            if (file_type == filetype) callback(file.name);
            this.continue();
        }
    };
    cursor.onerror = function() {
        console.warn("No file found: " + this.error);
    };
};
//polyfill
if (window.NodeList && !NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach;
function hashCode(str) {
    var hash = 0;
    for(var i = 0; i < str.length; i++)hash = ~~((hash << 5) - hash + str.charCodeAt(i));
    return hash;
}
function intToRGB(i) {
    var c = (i & 16777215).toString(16).toUpperCase();
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
    activity.onsuccess = function() {
    };
    activity.onerror = function() {
        console.log("The activity encounter en error: " + this.error);
    };
}
//check if internet connection
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
    request.onsuccess = function() {
    //toaster("File deleted", 2000);
    };
    request.onerror = function() {
    //toaster("Unable to delete the file: " + this.error, 2000);
    };
}
function get_file(filename) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var request = sdcard[1].get(filename);
    request.onsuccess = function() {
        var file = this.result;
    //alert("Get the file: " + file.name);
    };
    request.onerror = function() {
    //alert("Unable to get the file: " + this.error);
    };
}
function write_file(data, filename) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var file = new Blob([
        data
    ], {
        type: "text/plain"
    });
    var request = sdcard[1].addNamed(file, filename);
    request.onsuccess = function() {
        var name = this.result;
    //toaster('File "' + name + '" successfully wrote on the sdcard storage area', 2000);
    };
    // An error typically occur if a file with the same name already exist
    request.onerror = function() {
        toaster("Unable to write the file: " + this.error, 2000);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"cj2YQ":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"kaybj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/*
 * modified from http://www.voidware.com/moon_phase.htm
 */ parcelHelpers.export(exports, "getMoonPhase", ()=>getMoonPhase
);
function getMoonPhase(year, month, day) {
    let b;
    let jd;
    let e;
    let c = e = jd = b = 0;
    if (month < 3) {
        year--;
        month += 12;
    }
    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; //jd is total days elapsed
    jd /= 29.5305882; //divide by the moon cycle
    b = parseInt(jd); //int(jd) -> b, take integer part of jd
    jd -= b; //subtract integer part to leave fractional part of original jd
    b = Math.round(jd * 8); //scale fraction from 0-8 and round
    if (b >= 8) b = 0; //0 and 8 are the same so turn 8 into 0
    // 0 => New Moon
    // 1 => Waxing Crescent Moon
    // 2 => First Quarter Moon
    // 3 => Waxing Gibbous Moon
    // 4 => Full Moon
    // 5 => Waning Gibbous Moon
    // 6 => Last Quarter Moon
    // 7 => Waning Crescent Moon
    return b;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"4kH1V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "export_ical", ()=>export_ical
);
parcelHelpers.export(exports, "list_ics", ()=>list_ics
);
parcelHelpers.export(exports, "parse_ics", ()=>parse_ics
);
parcelHelpers.export(exports, "fetch_ics", ()=>fetch_ics
);
// ///////////////////////
// ///Load ICS///////////
// /////////////////////
parcelHelpers.export(exports, "loadICS", ()=>loadICS
);
var _helperJs = require("./helper.js");
var _appJs = require("../../app.js");
let export_ical = function(filename, event_data) {
    if (!navigator.getDeviceStorage) return false;
    var sdcard = navigator.getDeviceStorage("sdcard");
    var request_del = sdcard.delete(filename);
    request_del.onsuccess = function() {
    };
    setTimeout(function() {
        // convert
        let data = event_data;
        let result = "";
        result += "BEGIN:VCALENDAR\r\n";
        result += "VERSION:2.0\r\n";
        result += "PRODID:GREG\r\n";
        result += "METHOD:PUBLISHED\r\n";
        data.forEach((e)=>{
            let index = -1;
            for(let key in e){
                index++;
                if (index == 0) result += "BEGIN:VEVENT\r\n";
                if (key != "BEGIN" && key != "END" && key != "date" && key != "time_start" && key != "time_end" && key != "dateStart" && key != "dateEnd" && key != "notification" && key != "alarm" && key != "isSubscription" && key != "multidayevent" && key != "alarmTrigger" && key != "rrule_") result += `${key}:${e[key]}` + "\r\n";
                if (index == Object.keys(e).length - 1) result += "END:VEVENT\r\n";
            }
        });
        result += "END:VCALENDAR\r\n";
        var file = new Blob([
            result
        ], {
            type: "text/calendar"
        });
        var request = sdcard.addNamed(file, filename);
        request.onsuccess = function() {
            _helperJs.side_toaster("<img src='assets/image/E25C.svg'>", 2500);
        };
        request.onerror = function() {
            _helperJs.toaster("Unable to write the file", 2000);
        };
    }, 2000);
};
let list_ics = function() {
    let file_list = [];
    let cb = function(result) {
        file_list.push(result);
        let fn = result.split("/");
        fn = fn[fn.length - 1];
        if (fn == "greg.ics") return false;
        document.querySelector("div#options div#import-text").style.display = "block";
        document.querySelector("div#options div#import-text").insertAdjacentHTML("afterend", '<button class="item dynamic" data-function="import" data-filename="' + result + '">' + fn + "</button>");
    };
    _helperJs.list_files("ics", cb);
};
let parse_ics = function(data, callback, saveOnDevice, subscription) {
    const ical = require("ical");
    const datas = ical.parseICS(data);
    let last_uid;
    let last_date;
    for(let k in datas)if (datas.hasOwnProperty(k)) {
        var ev = datas[k];
        if (datas[k].type == "VEVENT") {
            //date start
            let dateStart, timeStart;
            if (ev.start) {
                let DTstart = new Date(ev.start);
                dateStart = DTstart.getFullYear() + "-" + `0${DTstart.getMonth() + 1}`.slice(-2) + "-" + `0${DTstart.getDate()}`.slice(-2);
                timeStart = `0${DTstart.getHours()}`.slice(-2) + ":" + `0${DTstart.getMinutes()}`.slice(-2) + ":" + `0${DTstart.getSeconds()}`.slice(-2);
            }
            //date end
            let dateEnd, timeEnd;
            if (ev.end) {
                let DTstart = new Date(ev.end);
                dateEnd = DTstart.getFullYear() + "-" + `0${DTstart.getMonth() + 1}`.slice(-2) + "-" + `0${DTstart.getDate()}`.slice(-2);
                timeEnd = `0${DTstart.getHours()}`.slice(-2) + ":" + `0${DTstart.getMinutes()}`.slice(-2) + ":" + `0${DTstart.getSeconds()}`.slice(-2);
            }
            //multiday event
            let multidayevent = false;
            if (ev.end && ev.start) {
                if (new Date(ev.end) > new Date(ev.start)) multidayevent = true;
                //all day events have the time 00:00:00 but the start end date consecutive
                if (new Date(ev.end) > new Date(ev.start) && timeStart == "00:00:00" && timeEnd == "00:00:00") multidayevent = false;
            }
            let parse_rrule = function() {
                let feedback = "none";
                if (ev.rrule != null || ev.rrule != undefined) {
                    let a = ev.rrule;
                    feedback = a.freq;
                //console.log(ev.rrule);
                }
                return feedback;
            };
            let imp = {
                BEGIN: "VEVENT",
                UID: ev.uid,
                SUMMARY: ev.summary,
                LOCATION: ev.location,
                DESCRIPTION: ev.description,
                ATTACH: ev.attach,
                RRULE: ev.rrule,
                "LAST-MODIFIED": ev.lastmodified,
                CLASS: ev.class,
                DTSTAMP: ev.dtstamp,
                DTSTART: ev.start,
                DTEND: ev.end,
                END: "VEVENT",
                isSubscription: subscription,
                multidayevent: multidayevent,
                dateStart: dateStart,
                time_start: timeStart,
                dateEnd: dateEnd,
                time_end: timeEnd,
                notification: " ",
                alarm: "none",
                rrule_: parse_rrule()
            };
            _appJs.events.push(imp);
            last_uid = imp.UID;
            last_date = imp.DTSTART;
        }
    }
    callback(last_uid, last_date);
    if (saveOnDevice) {
        let without_subscription = _appJs.events.filter((events)=>events.isSubscription === false
        );
        localforage.setItem("events", without_subscription).then(function(value) {
            // events = value;
            _helperJs.side_toaster("<img src='assets/image/E25C.svg'>", 2500);
        }).catch(function(err) {
            console.log(err);
        });
    }
};
let fetch_ics = function(url, cb) {
    let xhttp = new XMLHttpRequest({
        mozSystem: true
    });
    xhttp.open("GET", url + "?time=" + new Date().getTime(), true);
    xhttp.timeout = 2000;
    xhttp.onprogress = function() {
        _helperJs.side_toaster("loading subscriptions", 2000);
    };
    xhttp.onload = function() {
        if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
            let data = xhttp.response;
            parse_ics(data, cb, false, true);
            _helperJs.side_toaster("subscriptions loaded", 2000);
        }
    };
    xhttp.onerror = function() {
        _helperJs.side_toaster("subscription could not be loaded", 2000);
    };
    xhttp.send(null);
};
function share(url, name) {
    var activity = new MozActivity({
        name: "share",
        data: {
            type: "text/calendar",
            number: 1,
            blobs: [
                url
            ],
            filenames: [
                name
            ]
        }
    });
    activity.onsuccess = function() {
    };
    activity.onerror = function() {
    };
}
function loadICS(filename, callback) {
    var sdcard = navigator.getDeviceStorage("sdcard");
    var request = sdcard.get(filename);
    request.onsuccess = function() {
        var file = this.result;
        let reader = new FileReader();
        reader.onerror = function(event) {
            _helperJs.toaster("can't read file", 3000);
            reader.abort();
        };
        reader.onloadend = function(event) {
            parse_ics(event.target.result, callback, true, false);
            document.getElementById("import-text").style.display = "block";
        };
        reader.readAsText(file);
    };
    request.onerror = function() {
        console.warn("Unable to get the file: " + this.error);
    };
}

},{"./helper.js":"db1Xp","../../app.js":"20BJq","ical":"3FyRN","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"3FyRN":[function(require,module,exports) {
module.exports = require('./ical');
var node = require('./node-ical');
// Copy node functions across to exports
for(var i in node)module.exports[i] = node[i];

},{"./ical":"he2bB","./node-ical":"4PtqG"}],"he2bB":[function(require,module,exports) {
(function(name, definition) {
    /****************
 *  A tolerant, minimal icalendar parser
 *  (http://tools.ietf.org/html/rfc5545)
 *
 *  <peterbraden@peterbraden.co.uk>
 * **************/ if (typeof module !== 'undefined') module.exports = definition();
    else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
    else this[name] = definition();
})('ical', function() {
    // Unescape Text re RFC 4.3.11
    var text = function(t) {
        t = t || "";
        return t.replace(/\\\,/g, ',').replace(/\\\;/g, ';').replace(/\\[nN]/g, '\n').replace(/\\\\/g, '\\');
    };
    var parseParams = function(p) {
        var out = {
        };
        for(var i = 0; i < p.length; i++)if (p[i].indexOf('=') > -1) {
            var segs = p[i].split('=');
            out[segs[0]] = parseValue(segs.slice(1).join('='));
        }
        return out || sp;
    };
    var parseValue = function(val) {
        if ('TRUE' === val) return true;
        if ('FALSE' === val) return false;
        var number = Number(val);
        if (!isNaN(number)) return number;
        return val;
    };
    var storeValParam = function(name) {
        return function(val, curr) {
            var current = curr[name];
            if (Array.isArray(current)) {
                current.push(val);
                return curr;
            }
            if (current != null) {
                curr[name] = [
                    current,
                    val
                ];
                return curr;
            }
            curr[name] = val;
            return curr;
        };
    };
    var storeParam = function(name) {
        return function(val, params, curr) {
            var data;
            if (params && params.length && !(params.length == 1 && params[0] === 'CHARSET=utf-8')) data = {
                params: parseParams(params),
                val: text(val)
            };
            else data = text(val);
            return storeValParam(name)(data, curr);
        };
    };
    var addTZ = function(dt, params) {
        var p = parseParams(params);
        if (params && p) {
            dt.tz = p.TZID;
            if (dt.tz !== undefined) // Remove surrouding quotes if found at the begining and at the end of the string
            // (Occurs when parsing Microsoft Exchange events containing TZID with Windows standard format instead IANA)
            dt.tz = dt.tz.replace(/^"(.*)"$/, "$1");
        }
        return dt;
    };
    var dateParam = function(name) {
        return function(val, params, curr) {
            var newDate = text(val);
            if (params && params[0] === "VALUE=DATE") {
                // Just Date
                var comps = /^(\d{4})(\d{2})(\d{2})$/.exec(val);
                if (comps !== null) {
                    // No TZ info - assume same timezone as this computer
                    newDate = new Date(comps[1], parseInt(comps[2], 10) - 1, comps[3]);
                    newDate = addTZ(newDate, params);
                    newDate.dateOnly = true;
                    // Store as string - worst case scenario
                    return storeValParam(name)(newDate, curr);
                }
            }
            //typical RFC date-time format
            var comps = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/.exec(val);
            if (comps !== null) {
                if (comps[7] == 'Z') newDate = new Date(Date.UTC(parseInt(comps[1], 10), parseInt(comps[2], 10) - 1, parseInt(comps[3], 10), parseInt(comps[4], 10), parseInt(comps[5], 10), parseInt(comps[6], 10)));
                else newDate = new Date(parseInt(comps[1], 10), parseInt(comps[2], 10) - 1, parseInt(comps[3], 10), parseInt(comps[4], 10), parseInt(comps[5], 10), parseInt(comps[6], 10));
                newDate = addTZ(newDate, params);
            }
            // Store as string - worst case scenario
            return storeValParam(name)(newDate, curr);
        };
    };
    var geoParam = function(name) {
        return function(val, params, curr) {
            storeParam(val, params, curr);
            var parts = val.split(';');
            curr[name] = {
                lat: Number(parts[0]),
                lon: Number(parts[1])
            };
            return curr;
        };
    };
    var categoriesParam = function(name) {
        var separatorPattern = /\s*,\s*/g;
        return function(val, params, curr) {
            storeParam(val, params, curr);
            if (curr[name] === undefined) curr[name] = val ? val.split(separatorPattern) : [];
            else if (val) curr[name] = curr[name].concat(val.split(separatorPattern));
            return curr;
        };
    };
    // EXDATE is an entry that represents exceptions to a recurrence rule (ex: "repeat every day except on 7/4").
    // The EXDATE entry itself can also contain a comma-separated list, so we make sure to parse each date out separately.
    // There can also be more than one EXDATE entries in a calendar record.
    // Since there can be multiple dates, we create an array of them.  The index into the array is the ISO string of the date itself, for ease of use.
    // i.e. You can check if ((curr.exdate != undefined) && (curr.exdate[date iso string] != undefined)) to see if a date is an exception.
    // NOTE: This specifically uses date only, and not time.  This is to avoid a few problems:
    //    1. The ISO string with time wouldn't work for "floating dates" (dates without timezones).
    //       ex: "20171225T060000" - this is supposed to mean 6 AM in whatever timezone you're currently in
    //    2. Daylight savings time potentially affects the time you would need to look up
    //    3. Some EXDATE entries in the wild seem to have times different from the recurrence rule, but are still excluded by calendar programs.  Not sure how or why.
    //       These would fail any sort of sane time lookup, because the time literally doesn't match the event.  So we'll ignore time and just use date.
    //       ex: DTSTART:20170814T140000Z
    //             RRULE:FREQ=WEEKLY;WKST=SU;INTERVAL=2;BYDAY=MO,TU
    //             EXDATE:20171219T060000
    //       Even though "T060000" doesn't match or overlap "T1400000Z", it's still supposed to be excluded?  Odd. :(
    // TODO: See if this causes any problems with events that recur multiple times a day.
    var exdateParam = function(name) {
        return function(val, params, curr) {
            var separatorPattern = /\s*,\s*/g;
            curr[name] = curr[name] || [];
            var dates = val ? val.split(separatorPattern) : [];
            dates.forEach(function(entry) {
                var exdate = new Array();
                dateParam(name)(entry, params, exdate);
                if (exdate[name]) {
                    if (typeof exdate[name].toISOString === 'function') curr[name][exdate[name].toISOString().substring(0, 10)] = exdate[name];
                    else console.error("No toISOString function in exdate[name]", exdate[name]);
                }
            });
            return curr;
        };
    };
    // RECURRENCE-ID is the ID of a specific recurrence within a recurrence rule.
    // TODO:  It's also possible for it to have a range, like "THISANDPRIOR", "THISANDFUTURE".  This isn't currently handled.
    var recurrenceParam = function(name) {
        return dateParam(name);
    };
    var addFBType = function(fb, params) {
        var p = parseParams(params);
        if (params && p) fb.type = p.FBTYPE || "BUSY";
        return fb;
    };
    var freebusyParam = function(name1) {
        return function(val, params, curr) {
            var fb = addFBType({
            }, params);
            curr[name1] = curr[name1] || [];
            curr[name1].push(fb);
            storeParam(val, params, fb);
            var parts = val.split('/');
            [
                'start',
                'end'
            ].forEach(function(name, index) {
                dateParam(name)(parts[index], params, fb);
            });
            return curr;
        };
    };
    return {
        objectHandlers: {
            'BEGIN': function(component, params, curr, stack) {
                stack.push(curr);
                return {
                    type: component,
                    params: params
                };
            },
            'END': function(component, params, curr, stack) {
                // prevents the need to search the root of the tree for the VCALENDAR object
                if (component === "VCALENDAR") {
                    //scan all high level object in curr and drop all strings
                    var key, obj;
                    for(key in curr)if (curr.hasOwnProperty(key)) {
                        obj = curr[key];
                        if (typeof obj === 'string') delete curr[key];
                    }
                    return curr;
                }
                var par = stack.pop();
                if (curr.uid) {
                    // If this is the first time we run into this UID, just save it.
                    if (par[curr.uid] === undefined) par[curr.uid] = curr;
                    else // If we have multiple ical entries with the same UID, it's either going to be a
                    // modification to a recurrence (RECURRENCE-ID), and/or a significant modification
                    // to the entry (SEQUENCE).
                    // TODO: Look into proper sequence logic.
                    if (curr.recurrenceid === undefined) {
                        // If we have the same UID as an existing record, and it *isn't* a specific recurrence ID,
                        // not quite sure what the correct behaviour should be.  For now, just take the new information
                        // and merge it with the old record by overwriting only the fields that appear in the new record.
                        var key;
                        for(key in curr)par[curr.uid][key] = curr[key];
                    }
                    // If we have recurrence-id entries, list them as an array of recurrences keyed off of recurrence-id.
                    // To use - as you're running through the dates of an rrule, you can try looking it up in the recurrences
                    // array.  If it exists, then use the data from the calendar object in the recurrence instead of the parent
                    // for that day.
                    // NOTE:  Sometimes the RECURRENCE-ID record will show up *before* the record with the RRULE entry.  In that
                    // case, what happens is that the RECURRENCE-ID record ends up becoming both the parent record and an entry
                    // in the recurrences array, and then when we process the RRULE entry later it overwrites the appropriate
                    // fields in the parent record.
                    if (curr.recurrenceid != null) {
                        // TODO:  Is there ever a case where we have to worry about overwriting an existing entry here?
                        // Create a copy of the current object to save in our recurrences array.  (We *could* just do par = curr,
                        // except for the case that we get the RECURRENCE-ID record before the RRULE record.  In that case, we
                        // would end up with a shared reference that would cause us to overwrite *both* records at the point
                        // that we try and fix up the parent record.)
                        var recurrenceObj = new Object();
                        var key;
                        for(key in curr)recurrenceObj[key] = curr[key];
                        if (recurrenceObj.recurrences != undefined) delete recurrenceObj.recurrences;
                        // If we don't have an array to store recurrences in yet, create it.
                        if (par[curr.uid].recurrences === undefined) par[curr.uid].recurrences = new Array();
                        // Save off our cloned recurrence object into the array, keyed by date but not time.
                        // We key by date only to avoid timezone and "floating time" problems (where the time isn't associated with a timezone).
                        // TODO: See if this causes a problem with events that have multiple recurrences per day.
                        if (typeof curr.recurrenceid.toISOString === 'function') par[curr.uid].recurrences[curr.recurrenceid.toISOString().substring(0, 10)] = recurrenceObj;
                        else console.error("No toISOString function in curr.recurrenceid", curr.recurrenceid);
                    }
                    // One more specific fix - in the case that an RRULE entry shows up after a RECURRENCE-ID entry,
                    // let's make sure to clear the recurrenceid off the parent field.
                    if (par[curr.uid].rrule != undefined && par[curr.uid].recurrenceid != undefined) delete par[curr.uid].recurrenceid;
                } else par[Math.random() * 100000] = curr // Randomly assign ID : TODO - use true GUID
                ;
                return par;
            },
            'SUMMARY': storeParam('summary'),
            'DESCRIPTION': storeParam('description'),
            'URL': storeParam('url'),
            'UID': storeParam('uid'),
            'LOCATION': storeParam('location'),
            'DTSTART': dateParam('start'),
            'DTEND': dateParam('end'),
            'EXDATE': exdateParam('exdate'),
            ' CLASS': storeParam('class'),
            'TRANSP': storeParam('transparency'),
            'GEO': geoParam('geo'),
            'PERCENT-COMPLETE': storeParam('completion'),
            'COMPLETED': dateParam('completed'),
            'CATEGORIES': categoriesParam('categories'),
            'FREEBUSY': freebusyParam('freebusy'),
            'DTSTAMP': dateParam('dtstamp'),
            'CREATED': dateParam('created'),
            'LAST-MODIFIED': dateParam('lastmodified'),
            'RECURRENCE-ID': recurrenceParam('recurrenceid')
        },
        handleObject: function(name, val, params, ctx, stack, line) {
            var self = this;
            if (self.objectHandlers[name]) return self.objectHandlers[name](val, params, ctx, stack, line);
            //handling custom properties
            if (name.match(/X\-[\w\-]+/) && stack.length > 0) {
                //trimming the leading and perform storeParam
                name = name.substring(2);
                return storeParam(name)(val, params, ctx, stack, line);
            }
            return storeParam(name.toLowerCase())(val, params, ctx);
        },
        getLineBreakChar: function(string) {
            const indexOfLF = string.indexOf('\n', 1); // No need to check first-character
            if (indexOfLF === -1) {
                if (string.indexOf('\r') !== -1) return '\r';
                return '\n';
            }
            if (string[indexOfLF - 1] === '\r') return '\r?\n';
            return '\n';
        },
        parseICS: function(str) {
            var self = this;
            var line_end_type = self.getLineBreakChar(str);
            var lines = str.split(line_end_type == '\n' ? /\n/ : /\r?\n/);
            var ctx = {
            };
            var stack = [];
            for(var i = 0, ii = lines.length, l = lines[0]; i < ii; i++, l = lines[i]){
                //Unfold : RFC#3.1
                while(lines[i + 1] && /[ \t]/.test(lines[i + 1][0])){
                    l += lines[i + 1].slice(1);
                    i += 1;
                }
                // Split on semicolons except if the semicolon is surrounded by quotes
                var kv = l.split(/:(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/g);
                if (kv.length < 2) continue;
                // Although the spec says that vals with colons should be quote wrapped
                // in practise nobody does, so we assume further colons are part of the
                // val
                var value = kv.slice(1).join(":"), kp = kv[0].split(";"), name = kp[0], params = kp.slice(1);
                ctx = self.handleObject(name, value, params, ctx, stack, l) || {
                };
            }
            // type and params are added to the list of items, get rid of them.
            delete ctx.type;
            delete ctx.params;
            return ctx;
        }
    };
});

},{}],"4PtqG":[function(require,module,exports) {
var ical = require('./ical'), fs = require('fs');
exports.parseFile = function(filename) {
    return ical.parseICS(fs.readFileSync(filename, 'utf8'));
};
var rrule = require('rrule').RRule;
ical.objectHandlers['RRULE'] = function(val, params, curr, stack, line) {
    curr.rrule = line;
    return curr;
};
var originalEnd = ical.objectHandlers['END'];
ical.objectHandlers['END'] = function(val, params, curr, stack) {
    // Recurrence rules are only valid for VEVENT, VTODO, and VJOURNAL.
    // More specifically, we need to filter the VCALENDAR type because we might end up with a defined rrule
    // due to the subtypes.
    if (val === "VEVENT" || val === "VTODO" || val === "VJOURNAL") {
        if (curr.rrule) {
            var rule = curr.rrule.replace('RRULE:', '');
            if (rule.indexOf('DTSTART') === -1) {
                if (curr.start.length === 8) {
                    var comps = /^(\d{4})(\d{2})(\d{2})$/.exec(curr.start);
                    if (comps) curr.start = new Date(comps[1], comps[2] - 1, comps[3]);
                }
                if (typeof curr.start.toISOString === 'function') try {
                    rule += ';DTSTART=' + curr.start.toISOString().replace(/[-:]/g, '');
                    rule = rule.replace(/\.[0-9]{3}/, '');
                } catch (error) {
                    console.error("ERROR when trying to convert to ISOString", error);
                }
                else console.error("No toISOString function in curr.start", curr.start);
            }
            curr.rrule = rrule.fromString(rule);
        }
    }
    return originalEnd.call(this, val, params, curr, stack);
};

},{"./ical":"he2bB","fs":"jgbrw","rrule":"idCmx"}],"jgbrw":[function(require,module,exports) {
"use strict";

},{}],"idCmx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Frequency", ()=>_types.Frequency
);
parcelHelpers.export(exports, "Weekday", ()=>_weekday.Weekday
);
parcelHelpers.export(exports, "RRule", ()=>_rruleDefault.default
);
parcelHelpers.export(exports, "RRuleSet", ()=>_rrulesetDefault.default
);
parcelHelpers.export(exports, "rrulestr", ()=>rrulestr
);
/*!
 * rrule.js - Library for working with recurrence rules for calendar dates.
 * https://github.com/jakubroztocil/rrule
 *
 * Copyright 2010, Jakub Roztocil and Lars Schoning
 * Licenced under the BSD licence.
 * https://github.com/jakubroztocil/rrule/blob/master/LICENCE
 *
 * Based on:
 * python-dateutil - Extensions to the standard Python datetime module.
 * Copyright (c) 2003-2011 - Gustavo Niemeyer <gustavo@niemeyer.net>
 * Copyright (c) 2012 - Tomi Pieviläinen <tomi.pievilainen@iki.fi>
 * https://github.com/jakubroztocil/rrule/blob/master/LICENCE
 *
 */ var _rrule = require("./rrule");
var _rruleDefault = parcelHelpers.interopDefault(_rrule);
var _rruleset = require("./rruleset");
var _rrulesetDefault = parcelHelpers.interopDefault(_rruleset);
var _rrulestr = require("./rrulestr");
var _rrulestrDefault = parcelHelpers.interopDefault(_rrulestr);
var _types = require("./types");
var _weekday = require("./weekday");
// =============================================================================
// Export
// =============================================================================
// Only one RRuleStr instance for all rrule string parsing work.
var rruleStr = new _rrulestrDefault.default();
var rrulestr = function() {
    return rruleStr.parse.apply(rruleStr, arguments);
};
exports.default = _rruleDefault.default;

},{"./rrule":"fQtN4","./rruleset":"1v7S8","./rrulestr":"ai34i","./types":"9biul","./weekday":"2Q77D","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"fQtN4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Days", ()=>Days
);
parcelHelpers.export(exports, "DEFAULT_OPTIONS", ()=>DEFAULT_OPTIONS
);
parcelHelpers.export(exports, "defaultKeys", ()=>defaultKeys
);
var _dateutil = require("./dateutil");
var _dateutilDefault = parcelHelpers.interopDefault(_dateutil);
var _iterinfo = require("./iterinfo");
var _iterinfoDefault = parcelHelpers.interopDefault(_iterinfo);
var _helpers = require("./helpers");
var _iterresult = require("./iterresult");
var _iterresultDefault = parcelHelpers.interopDefault(_iterresult);
var _callbackiterresult = require("./callbackiterresult");
var _callbackiterresultDefault = parcelHelpers.interopDefault(_callbackiterresult);
var _types = require("./types");
var _parseoptions = require("./parseoptions");
var _parsestring = require("./parsestring");
var _optionstostring = require("./optionstostring");
var _cache = require("./cache");
var _weekday = require("./weekday");
var _luxon = require("luxon");
var getnlp = function() {
    // Lazy, runtime import to avoid circular refs.
    if (!getnlp._nlp) getnlp._nlp = require('./nlp');
    return getnlp._nlp;
};
var Days = {
    MO: new _weekday.Weekday(0),
    TU: new _weekday.Weekday(1),
    WE: new _weekday.Weekday(2),
    TH: new _weekday.Weekday(3),
    FR: new _weekday.Weekday(4),
    SA: new _weekday.Weekday(5),
    SU: new _weekday.Weekday(6)
};
var DEFAULT_OPTIONS = {
    freq: _types.Frequency.YEARLY,
    dtstart: null,
    interval: 1,
    wkst: Days.MO,
    count: null,
    until: null,
    tzid: null,
    bysetpos: null,
    bymonth: null,
    bymonthday: null,
    bynmonthday: null,
    byyearday: null,
    byweekno: null,
    byweekday: null,
    bynweekday: null,
    byhour: null,
    byminute: null,
    bysecond: null,
    byeaster: null
};
var defaultKeys = Object.keys(DEFAULT_OPTIONS);
/**
 *
 * @param {Options?} options - see <http://labix.org/python-dateutil/#head-cf004ee9a75592797e076752b2a889c10f445418>
 *        The only required option is `freq`, one of RRule.YEARLY, RRule.MONTHLY, ...
 * @constructor
 */ var RRule = function() {
    function RRule1(options, noCache) {
        if (options === void 0) options = {
        };
        if (noCache === void 0) noCache = false;
        // RFC string
        this._string = null;
        this._cache = noCache ? null : new _cache.Cache();
        // used by toString()
        this.origOptions = _parseoptions.initializeOptions(options);
        var _a = _parseoptions.parseOptions(options), parsedOptions = _a.parsedOptions, timeset = _a.timeset;
        this.options = parsedOptions;
        this.timeset = timeset;
    }
    RRule1.parseText = function(text, language) {
        return getnlp().parseText(text, language);
    };
    RRule1.fromText = function(text, language) {
        return getnlp().fromText(text, language);
    };
    RRule1.fromString = function(str) {
        return new RRule1(RRule1.parseString(str) || undefined);
    };
    RRule1.prototype._cacheGet = function(what, args) {
        if (!this._cache) return false;
        return this._cache._cacheGet(what, args);
    };
    RRule1.prototype._cacheAdd = function(what, value, args) {
        if (!this._cache) return;
        return this._cache._cacheAdd(what, value, args);
    };
    /**
     * @param {Function} iterator - optional function that will be called
     *                   on each date that is added. It can return false
     *                   to stop the iteration.
     * @return Array containing all recurrences.
     */ RRule1.prototype.all = function(iterator) {
        if (iterator) return this._iter(new _callbackiterresultDefault.default('all', {
        }, iterator));
        else {
            var result = this._cacheGet('all');
            if (result === false) {
                result = this._iter(new _iterresultDefault.default('all', {
                }));
                this._cacheAdd('all', result);
            }
            return result;
        }
    };
    /**
     * Returns all the occurrences of the rrule between after and before.
     * The inc keyword defines what happens if after and/or before are
     * themselves occurrences. With inc == True, they will be included in the
     * list, if they are found in the recurrence set.
     * @return Array
     */ RRule1.prototype.between = function(after, before, inc, iterator) {
        if (inc === void 0) inc = false;
        var args = {
            before: before,
            after: after,
            inc: inc
        };
        if (iterator) return this._iter(new _callbackiterresultDefault.default('between', args, iterator));
        var result = this._cacheGet('between', args);
        if (result === false) {
            result = this._iter(new _iterresultDefault.default('between', args));
            this._cacheAdd('between', result, args);
        }
        return result;
    };
    /**
     * Returns the last recurrence before the given datetime instance.
     * The inc keyword defines what happens if dt is an occurrence.
     * With inc == True, if dt itself is an occurrence, it will be returned.
     * @return Date or null
     */ RRule1.prototype.before = function(dt, inc) {
        if (inc === void 0) inc = false;
        var args = {
            dt: dt,
            inc: inc
        };
        var result = this._cacheGet('before', args);
        if (result === false) {
            result = this._iter(new _iterresultDefault.default('before', args));
            this._cacheAdd('before', result, args);
        }
        return result;
    };
    /**
     * Returns the first recurrence after the given datetime instance.
     * The inc keyword defines what happens if dt is an occurrence.
     * With inc == True, if dt itself is an occurrence, it will be returned.
     * @return Date or null
     */ RRule1.prototype.after = function(dt, inc) {
        if (inc === void 0) inc = false;
        var args = {
            dt: dt,
            inc: inc
        };
        var result = this._cacheGet('after', args);
        if (result === false) {
            result = this._iter(new _iterresultDefault.default('after', args));
            this._cacheAdd('after', result, args);
        }
        return result;
    };
    /**
     * Returns the number of recurrences in this set. It will have go trough
     * the whole recurrence, if this hasn't been done before.
     */ RRule1.prototype.count = function() {
        return this.all().length;
    };
    /**
     * Converts the rrule into its string representation
     * @see <http://www.ietf.org/rfc/rfc2445.txt>
     * @return String
     */ RRule1.prototype.toString = function() {
        return _optionstostring.optionsToString(this.origOptions);
    };
    /**
     * Will convert all rules described in nlp:ToText
     * to text.
     */ RRule1.prototype.toText = function(gettext, language) {
        return getnlp().toText(this, gettext, language);
    };
    RRule1.prototype.isFullyConvertibleToText = function() {
        return getnlp().isFullyConvertible(this);
    };
    /**
     * @return a RRule instance with the same freq and options
     *          as this one (cache is not cloned)
     */ RRule1.prototype.clone = function() {
        return new RRule1(this.origOptions);
    };
    RRule1.prototype._iter = function(iterResult) {
        /* Since JavaScript doesn't have the python's yield operator (<1.7),
            we use the IterResult object that tells us when to stop iterating.
    
        */ var _a, _b;
        var dtstart = this.options.dtstart;
        var date = new _dateutilDefault.default.DateTime(dtstart.getUTCFullYear(), dtstart.getUTCMonth() + 1, dtstart.getUTCDate(), dtstart.getUTCHours(), dtstart.getUTCMinutes(), dtstart.getUTCSeconds(), dtstart.valueOf() % 1000);
        // Some local variables to speed things up a bit
        var _c = this.options, freq = _c.freq, interval = _c.interval, wkst = _c.wkst, until = _c.until, bymonth = _c.bymonth, byweekno = _c.byweekno, byyearday = _c.byyearday, byweekday = _c.byweekday, byeaster = _c.byeaster, bymonthday = _c.bymonthday, bynmonthday = _c.bynmonthday, bysetpos = _c.bysetpos, byhour = _c.byhour, byminute = _c.byminute, bysecond = _c.bysecond;
        var ii = new _iterinfoDefault.default(this);
        ii.rebuild(date.year, date.month);
        var getdayset = (_a = {
        }, _a[RRule1.YEARLY] = ii.ydayset, _a[RRule1.MONTHLY] = ii.mdayset, _a[RRule1.WEEKLY] = ii.wdayset, _a[RRule1.DAILY] = ii.ddayset, _a[RRule1.HOURLY] = ii.ddayset, _a[RRule1.MINUTELY] = ii.ddayset, _a[RRule1.SECONDLY] = ii.ddayset, _a)[freq];
        var timeset;
        var gettimeset;
        if (freq < RRule1.HOURLY) timeset = this.timeset;
        else {
            gettimeset = (_b = {
            }, _b[RRule1.HOURLY] = ii.htimeset, _b[RRule1.MINUTELY] = ii.mtimeset, _b[RRule1.SECONDLY] = ii.stimeset, _b)[freq];
            if (freq >= RRule1.HOURLY && _helpers.notEmpty(byhour) && !_helpers.includes(byhour, date.hour) || freq >= RRule1.MINUTELY && _helpers.notEmpty(byminute) && !_helpers.includes(byminute, date.minute) || freq >= RRule1.SECONDLY && _helpers.notEmpty(bysecond) && !_helpers.includes(bysecond, date.second)) timeset = [];
            else timeset = gettimeset.call(ii, date.hour, date.minute, date.second, date.millisecond);
        }
        var currentDay;
        var count = this.options.count;
        var pos;
        while(true){
            // Get dayset with the right frequency
            var _d = getdayset.call(ii, date.year, date.month, date.day), dayset = _d[0], start = _d[1], end = _d[2];
            // Do the "hard" work ;-)
            var filtered = false;
            for(var dayCounter = start; dayCounter < end; dayCounter++){
                currentDay = dayset[dayCounter];
                filtered = isFiltered(bymonth, ii, currentDay, byweekno, byweekday, byeaster, bymonthday, bynmonthday, byyearday);
                if (filtered) dayset[currentDay] = null;
            }
            // Output results
            if (_helpers.notEmpty(bysetpos) && _helpers.notEmpty(timeset)) {
                var daypos = void 0;
                var timepos = void 0;
                var poslist = [];
                for(var j = 0; j < bysetpos.length; j++){
                    pos = bysetpos[j];
                    if (pos < 0) {
                        daypos = Math.floor(pos / timeset.length);
                        timepos = _helpers.pymod(pos, timeset.length);
                    } else {
                        daypos = Math.floor((pos - 1) / timeset.length);
                        timepos = _helpers.pymod(pos - 1, timeset.length);
                    }
                    var tmp = [];
                    for(var k = start; k < end; k++){
                        var val = dayset[k];
                        if (!_helpers.isPresent(val)) continue;
                        tmp.push(val);
                    }
                    var i = void 0;
                    if (daypos < 0) // we're trying to emulate python's aList[-n]
                    i = tmp.slice(daypos)[0];
                    else i = tmp[daypos];
                    var time = timeset[timepos];
                    var date_1 = _dateutilDefault.default.fromOrdinal(ii.yearordinal + i);
                    var res = _dateutilDefault.default.combine(date_1, time);
                    // XXX: can this ever be in the array?
                    // - compare the actual date instead?
                    if (!_helpers.includes(poslist, res)) poslist.push(res);
                }
                _dateutilDefault.default.sort(poslist);
                for(var j = 0; j < poslist.length; j++){
                    var res = poslist[j];
                    if (until && res > until) return this.emitResult(iterResult);
                    if (res >= dtstart) {
                        var rezonedDate = this.rezoneIfNeeded(res);
                        if (!iterResult.accept(rezonedDate)) return this.emitResult(iterResult);
                        if (count) {
                            --count;
                            if (!count) return this.emitResult(iterResult);
                        }
                    }
                }
            } else for(var j = start; j < end; j++){
                currentDay = dayset[j];
                if (!_helpers.isPresent(currentDay)) continue;
                var date_2 = _dateutilDefault.default.fromOrdinal(ii.yearordinal + currentDay);
                for(var k = 0; k < timeset.length; k++){
                    var time = timeset[k];
                    var res = _dateutilDefault.default.combine(date_2, time);
                    if (until && res > until) return this.emitResult(iterResult);
                    if (res >= dtstart) {
                        var rezonedDate = this.rezoneIfNeeded(res);
                        if (!iterResult.accept(rezonedDate)) return this.emitResult(iterResult);
                        if (count) {
                            --count;
                            if (!count) return this.emitResult(iterResult);
                        }
                    }
                }
            }
            // Handle frequency and interval
            if (freq === RRule1.YEARLY) date.addYears(interval);
            else if (freq === RRule1.MONTHLY) date.addMonths(interval);
            else if (freq === RRule1.WEEKLY) date.addWeekly(interval, wkst);
            else if (freq === RRule1.DAILY) date.addDaily(interval);
            else if (freq === RRule1.HOURLY) {
                date.addHours(interval, filtered, byhour);
                // @ts-ignore
                timeset = gettimeset.call(ii, date.hour, date.minute, date.second);
            } else if (freq === RRule1.MINUTELY) {
                if (date.addMinutes(interval, filtered, byhour, byminute)) filtered = false;
                // @ts-ignore
                timeset = gettimeset.call(ii, date.hour, date.minute, date.second);
            } else if (freq === RRule1.SECONDLY) {
                if (date.addSeconds(interval, filtered, byhour, byminute, bysecond)) filtered = false;
                // @ts-ignore
                timeset = gettimeset.call(ii, date.hour, date.minute, date.second);
            }
            if (date.year > _dateutilDefault.default.MAXYEAR) return this.emitResult(iterResult);
            ii.rebuild(date.year, date.month);
        }
    };
    RRule1.prototype.emitResult = function(iterResult) {
        this._len = iterResult.total;
        return iterResult.getValue();
    };
    RRule1.prototype.rezoneIfNeeded = function(date) {
        var tzid = this.options.tzid;
        if (!tzid) return date;
        try {
            var datetime = _luxon.DateTime.fromJSDate(date);
            var rezoned = datetime.setZone(tzid, {
                keepLocalTime: true
            });
            return rezoned.toJSDate();
        } catch (e) {
            if (e instanceof TypeError) console.error('Using TZID without Luxon available is unsupported. Returned times are in UTC, not the requested time zone');
            return date;
        }
    };
    // RRule class 'constants'
    RRule1.FREQUENCIES = [
        'YEARLY',
        'MONTHLY',
        'WEEKLY',
        'DAILY',
        'HOURLY',
        'MINUTELY',
        'SECONDLY'
    ];
    RRule1.YEARLY = _types.Frequency.YEARLY;
    RRule1.MONTHLY = _types.Frequency.MONTHLY;
    RRule1.WEEKLY = _types.Frequency.WEEKLY;
    RRule1.DAILY = _types.Frequency.DAILY;
    RRule1.HOURLY = _types.Frequency.HOURLY;
    RRule1.MINUTELY = _types.Frequency.MINUTELY;
    RRule1.SECONDLY = _types.Frequency.SECONDLY;
    RRule1.MO = Days.MO;
    RRule1.TU = Days.TU;
    RRule1.WE = Days.WE;
    RRule1.TH = Days.TH;
    RRule1.FR = Days.FR;
    RRule1.SA = Days.SA;
    RRule1.SU = Days.SU;
    RRule1.parseString = _parsestring.parseString;
    RRule1.optionsToString = _optionstostring.optionsToString;
    return RRule1;
}();
exports.default = RRule;
function isFiltered(bymonth, ii, currentDay, byweekno, byweekday, byeaster, bymonthday, bynmonthday, byyearday) {
    return _helpers.notEmpty(bymonth) && !_helpers.includes(bymonth, ii.mmask[currentDay]) || _helpers.notEmpty(byweekno) && !ii.wnomask[currentDay] || _helpers.notEmpty(byweekday) && !_helpers.includes(byweekday, ii.wdaymask[currentDay]) || _helpers.notEmpty(ii.nwdaymask) && !ii.nwdaymask[currentDay] || byeaster !== null && !_helpers.includes(ii.eastermask, currentDay) || (_helpers.notEmpty(bymonthday) || _helpers.notEmpty(bynmonthday)) && !_helpers.includes(bymonthday, ii.mdaymask[currentDay]) && !_helpers.includes(bynmonthday, ii.nmdaymask[currentDay]) || _helpers.notEmpty(byyearday) && (currentDay < ii.yearlen && !_helpers.includes(byyearday, currentDay + 1) && !_helpers.includes(byyearday, -ii.yearlen + currentDay) || currentDay >= ii.yearlen && !_helpers.includes(byyearday, currentDay + 1 - ii.yearlen) && !_helpers.includes(byyearday, -ii.nextyearlen + currentDay - ii.yearlen));
}

},{"./dateutil":"gS1CZ","./iterinfo":"bSntn","./helpers":"9UCZ2","./iterresult":"iQsEc","./callbackiterresult":"llph6","./types":"9biul","./parseoptions":"hWO1x","./parsestring":"l6q9L","./optionstostring":"3Gs9h","./cache":"9fAk1","./weekday":"2Q77D","luxon":"kmRFS","./nlp":"jkQ8q","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"gS1CZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "dateutil", ()=>dateutil
);
var _helpers = require("./helpers");
var __extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var dateutil;
(function(dateutil1) {
    dateutil1.MONTH_DAYS = [
        31,
        28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ];
    /**
     * Number of milliseconds of one day
     */ dateutil1.ONE_DAY = 86400000;
    /**
     * @see: <http://docs.python.org/library/datetime.html#datetime.MAXYEAR>
     */ dateutil1.MAXYEAR = 9999;
    /**
     * Python uses 1-Jan-1 as the base for calculating ordinals but we don't
     * want to confuse the JS engine with milliseconds > Number.MAX_NUMBER,
     * therefore we use 1-Jan-1970 instead
     */ dateutil1.ORDINAL_BASE = new Date(Date.UTC(1970, 0, 1));
    /**
     * Python: MO-SU: 0 - 6
     * JS: SU-SAT 0 - 6
     */ dateutil1.PY_WEEKDAYS = [
        6,
        0,
        1,
        2,
        3,
        4,
        5
    ];
    /**
     * py_date.timetuple()[7]
     */ dateutil1.getYearDay = function(date) {
        var dateNoTime = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        return Math.ceil((dateNoTime.valueOf() - new Date(date.getUTCFullYear(), 0, 1).valueOf()) / dateutil1.ONE_DAY) + 1;
    };
    dateutil1.isLeapYear = function(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    };
    /**
     * @return {Number} the date's timezone offset in ms
     */ dateutil1.tzOffset = function(date) {
        return date.getTimezoneOffset() * 60000;
    };
    /**
     * @see: <http://www.mcfedries.com/JavaScript/DaysBetween.asp>
     */ dateutil1.daysBetween = function(date1, date2) {
        // The number of milliseconds in one day
        // Convert both dates to milliseconds
        var date1ms = date1.getTime() - dateutil1.tzOffset(date1);
        var date2ms = date2.getTime() - dateutil1.tzOffset(date2);
        // Calculate the difference in milliseconds
        var differencems = date1ms - date2ms;
        // Convert back to days and return
        return Math.round(differencems / dateutil1.ONE_DAY);
    };
    /**
     * @see: <http://docs.python.org/library/datetime.html#datetime.date.toordinal>
     */ dateutil1.toOrdinal = function(date) {
        return dateutil1.daysBetween(date, dateutil1.ORDINAL_BASE);
    };
    /**
     * @see - <http://docs.python.org/library/datetime.html#datetime.date.fromordinal>
     */ dateutil1.fromOrdinal = function(ordinal) {
        return new Date(dateutil1.ORDINAL_BASE.getTime() + ordinal * dateutil1.ONE_DAY);
    };
    dateutil1.getMonthDays = function(date) {
        var month = date.getUTCMonth();
        return month === 1 && dateutil1.isLeapYear(date.getUTCFullYear()) ? 29 : dateutil1.MONTH_DAYS[month];
    };
    /**
     * @return {Number} python-like weekday
     */ dateutil1.getWeekday = function(date) {
        return dateutil1.PY_WEEKDAYS[date.getUTCDay()];
    };
    /**
     * @see: <http://docs.python.org/library/calendar.html#calendar.monthrange>
     */ dateutil1.monthRange = function(year, month) {
        var date = new Date(Date.UTC(year, month, 1));
        return [
            dateutil1.getWeekday(date),
            dateutil1.getMonthDays(date)
        ];
    };
    /**
     * @see: <http://docs.python.org/library/datetime.html#datetime.datetime.combine>
     */ dateutil1.combine = function(date, time) {
        time = time || date;
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()));
    };
    dateutil1.clone = function(date) {
        var dolly = new Date(date.getTime());
        return dolly;
    };
    dateutil1.cloneDates = function(dates) {
        var clones = [];
        for(var i = 0; i < dates.length; i++)clones.push(dateutil1.clone(dates[i]));
        return clones;
    };
    /**
     * Sorts an array of Date or dateutil.Time objects
     */ dateutil1.sort = function(dates) {
        dates.sort(function(a, b) {
            return a.getTime() - b.getTime();
        });
    };
    dateutil1.timeToUntilString = function(time, utc) {
        if (utc === void 0) utc = true;
        var date = new Date(time);
        return [
            _helpers.padStart(date.getUTCFullYear().toString(), 4, '0'),
            _helpers.padStart(date.getUTCMonth() + 1, 2, '0'),
            _helpers.padStart(date.getUTCDate(), 2, '0'),
            'T',
            _helpers.padStart(date.getUTCHours(), 2, '0'),
            _helpers.padStart(date.getUTCMinutes(), 2, '0'),
            _helpers.padStart(date.getUTCSeconds(), 2, '0'),
            utc ? 'Z' : ''
        ].join('');
    };
    dateutil1.untilStringToDate = function(until) {
        var re = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/;
        var bits = re.exec(until);
        if (!bits) throw new Error("Invalid UNTIL value: " + until);
        return new Date(Date.UTC(parseInt(bits[1], 10), parseInt(bits[2], 10) - 1, parseInt(bits[3], 10), parseInt(bits[5], 10) || 0, parseInt(bits[6], 10) || 0, parseInt(bits[7], 10) || 0));
    };
    var Time1 = function() {
        function Time(hour, minute, second, millisecond) {
            this.hour = hour;
            this.minute = minute;
            this.second = second;
            this.millisecond = millisecond || 0;
        }
        Time.prototype.getHours = function() {
            return this.hour;
        };
        Time.prototype.getMinutes = function() {
            return this.minute;
        };
        Time.prototype.getSeconds = function() {
            return this.second;
        };
        Time.prototype.getMilliseconds = function() {
            return this.millisecond;
        };
        Time.prototype.getTime = function() {
            return (this.hour * 3600 + this.minute * 60 + this.second) * 1000 + this.millisecond;
        };
        return Time;
    }();
    dateutil1.Time = Time1;
    var DateTime1 = function(_super) {
        __extends(DateTime, _super);
        function DateTime(year, month, day, hour, minute, second, millisecond) {
            var _this = _super.call(this, hour, minute, second, millisecond) || this;
            _this.year = year;
            _this.month = month;
            _this.day = day;
            return _this;
        }
        DateTime.prototype.getWeekday = function() {
            return dateutil1.getWeekday(new Date(this.getTime()));
        };
        DateTime.prototype.getTime = function() {
            return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)).getTime();
        };
        DateTime.prototype.getDay = function() {
            return this.day;
        };
        DateTime.prototype.getMonth = function() {
            return this.month;
        };
        DateTime.prototype.getYear = function() {
            return this.year;
        };
        DateTime.prototype.addYears = function(years) {
            this.year += years;
        };
        DateTime.prototype.addMonths = function(months) {
            this.month += months;
            if (this.month > 12) {
                var yearDiv = Math.floor(this.month / 12);
                var monthMod = _helpers.pymod(this.month, 12);
                this.month = monthMod;
                this.year += yearDiv;
                if (this.month === 0) {
                    this.month = 12;
                    --this.year;
                }
            }
        };
        DateTime.prototype.addWeekly = function(days, wkst) {
            if (wkst > this.getWeekday()) this.day += -(this.getWeekday() + 1 + (6 - wkst)) + days * 7;
            else this.day += -(this.getWeekday() - wkst) + days * 7;
            this.fixDay();
        };
        DateTime.prototype.addDaily = function(days) {
            this.day += days;
            this.fixDay();
        };
        DateTime.prototype.addHours = function(hours, filtered, byhour) {
            var fixday = false;
            if (filtered) // Jump to one iteration before next day
            this.hour += Math.floor((23 - this.hour) / hours) * hours;
            while(true){
                this.hour += hours;
                var _a = _helpers.divmod(this.hour, 24), dayDiv = _a.div, hourMod = _a.mod;
                if (dayDiv) {
                    this.hour = hourMod;
                    this.addDaily(dayDiv);
                    fixday = true;
                }
                if (_helpers.empty(byhour) || _helpers.includes(byhour, this.hour)) break;
            }
            return fixday;
        };
        DateTime.prototype.addMinutes = function(minutes, filtered, byhour, byminute) {
            var fixday = false;
            if (filtered) // Jump to one iteration before next day
            this.minute += Math.floor((1439 - (this.hour * 60 + this.minute)) / minutes) * minutes;
            while(true){
                this.minute += minutes;
                var _a = _helpers.divmod(this.minute, 60), hourDiv = _a.div, minuteMod = _a.mod;
                if (hourDiv) {
                    this.minute = minuteMod;
                    fixday = this.addHours(hourDiv, false, byhour);
                }
                if ((_helpers.empty(byhour) || _helpers.includes(byhour, this.hour)) && (_helpers.empty(byminute) || _helpers.includes(byminute, this.minute))) break;
            }
            return fixday;
        };
        DateTime.prototype.addSeconds = function(seconds, filtered, byhour, byminute, bysecond) {
            var fixday = false;
            if (filtered) // Jump to one iteration before next day
            this.second += Math.floor((86399 - (this.hour * 3600 + this.minute * 60 + this.second)) / seconds) * seconds;
            while(true){
                this.second += seconds;
                var _a = _helpers.divmod(this.second, 60), minuteDiv = _a.div, secondMod = _a.mod;
                if (minuteDiv) {
                    this.second = secondMod;
                    fixday = this.addMinutes(minuteDiv, false, byhour, byminute);
                }
                if ((_helpers.empty(byhour) || _helpers.includes(byhour, this.hour)) && (_helpers.empty(byminute) || _helpers.includes(byminute, this.minute)) && (_helpers.empty(bysecond) || _helpers.includes(bysecond, this.second))) break;
            }
            return fixday;
        };
        DateTime.prototype.fixDay = function() {
            if (this.day <= 28) return;
            var daysinmonth = dateutil1.monthRange(this.year, this.month - 1)[1];
            if (this.day <= daysinmonth) return;
            while(this.day > daysinmonth){
                this.day -= daysinmonth;
                ++this.month;
                if (this.month === 13) {
                    this.month = 1;
                    ++this.year;
                    if (this.year > dateutil1.MAXYEAR) return;
                }
                daysinmonth = dateutil1.monthRange(this.year, this.month - 1)[1];
            }
        };
        return DateTime;
    }(Time1);
    dateutil1.DateTime = DateTime1;
})(dateutil || (dateutil = {
}));
exports.default = dateutil;

},{"./helpers":"9UCZ2","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"9UCZ2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isPresent", ()=>isPresent
);
parcelHelpers.export(exports, "isNumber", ()=>isNumber
);
parcelHelpers.export(exports, "isArray", ()=>isArray
);
parcelHelpers.export(exports, "range", ()=>range
);
parcelHelpers.export(exports, "clone", ()=>clone
);
parcelHelpers.export(exports, "repeat", ()=>repeat
);
parcelHelpers.export(exports, "toArray", ()=>toArray
);
parcelHelpers.export(exports, "padStart", ()=>padStart
);
parcelHelpers.export(exports, "split", ()=>split
);
parcelHelpers.export(exports, "pymod", ()=>pymod
);
parcelHelpers.export(exports, "divmod", ()=>divmod
);
parcelHelpers.export(exports, "empty", ()=>empty
);
parcelHelpers.export(exports, "notEmpty", ()=>notEmpty
);
parcelHelpers.export(exports, "includes", ()=>includes
);
var isPresent = function(value) {
    return value !== null && value !== undefined;
};
var isNumber = function(value) {
    return typeof value === 'number';
};
var isArray = Array.isArray;
var range = function(start, end) {
    if (end === void 0) end = start;
    if (arguments.length === 1) {
        end = start;
        start = 0;
    }
    var rang = [];
    for(var i = start; i < end; i++)rang.push(i);
    return rang;
};
var clone = function(array) {
    return [].concat(array);
};
var repeat = function(value, times) {
    var i = 0;
    var array = [];
    if (isArray(value)) for(; i < times; i++)array[i] = [].concat(value);
    else for(; i < times; i++)array[i] = value;
    return array;
};
var toArray = function(item) {
    if (isArray(item)) return item;
    return [
        item
    ];
};
function padStart(item, targetLength, padString) {
    if (padString === void 0) padString = ' ';
    var str = String(item);
    targetLength = targetLength >> 0;
    if (str.length > targetLength) return String(str);
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) padString += repeat(padString, targetLength / padString.length);
    return padString.slice(0, targetLength) + String(str);
}
var split = function(str, sep, num) {
    var splits = str.split(sep);
    return num ? splits.slice(0, num).concat([
        splits.slice(num).join(sep)
    ]) : splits;
};
var pymod = function(a, b) {
    var r = a % b;
    // If r and b differ in sign, add b to wrap the result to the correct sign.
    return r * b < 0 ? r + b : r;
};
var divmod = function(a, b) {
    return {
        div: Math.floor(a / b),
        mod: pymod(a, b)
    };
};
var empty = function(obj) {
    return !isPresent(obj) || obj.length === 0;
};
var notEmpty = function(obj) {
    return !empty(obj);
};
var includes = function(arr, val) {
    return notEmpty(arr) && arr.indexOf(val) !== -1;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"bSntn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _masks = require("./masks");
var _rrule = require("./rrule");
var _rruleDefault = parcelHelpers.interopDefault(_rrule);
var _dateutil = require("./dateutil");
var _dateutilDefault = parcelHelpers.interopDefault(_dateutil);
var _helpers = require("./helpers");
// =============================================================================
// Iterinfo
// =============================================================================
var Iterinfo = function() {
    function Iterinfo1(rrule) {
        this.yearlen = 365;
        this.nextyearlen = 365;
        this.rrule = rrule;
        this.mmask = null;
        this.mrange = null;
        this.mdaymask = null;
        this.nmdaymask = null;
        this.wdaymask = null;
        this.wnomask = null;
        this.nwdaymask = null;
        this.eastermask = null;
    }
    Iterinfo1.prototype.easter = function(y, offset) {
        if (offset === void 0) offset = 0;
        var a = y % 19;
        var b = Math.floor(y / 100);
        var c = y % 100;
        var d = Math.floor(b / 4);
        var e = b % 4;
        var f = Math.floor((b + 8) / 25);
        var g = Math.floor((b - f + 1) / 3);
        var h = Math.floor(19 * a + b - d - g + 15) % 30;
        var i = Math.floor(c / 4);
        var k = c % 4;
        var l = Math.floor(32 + 2 * e + 2 * i - h - k) % 7;
        var m = Math.floor((a + 11 * h + 22 * l) / 451);
        var month = Math.floor((h + l - 7 * m + 114) / 31);
        var day = (h + l - 7 * m + 114) % 31 + 1;
        var date = Date.UTC(y, month - 1, day + offset);
        var yearStart = Date.UTC(y, 0, 1);
        return [
            Math.ceil((date - yearStart) / 86400000)
        ];
    };
    Iterinfo1.prototype.rebuild = function(year, month) {
        var rr = this.rrule;
        if (year !== this.lastyear) this.rebuildYear(year);
        if (_helpers.notEmpty(rr.options.bynweekday) && (month !== this.lastmonth || year !== this.lastyear)) this.rebuildMonth(year, month);
        if (_helpers.isPresent(rr.options.byeaster)) this.eastermask = this.easter(year, rr.options.byeaster);
    };
    Iterinfo1.prototype.rebuildYear = function(year) {
        var rr = this.rrule;
        this.yearlen = _dateutilDefault.default.isLeapYear(year) ? 366 : 365;
        this.nextyearlen = _dateutilDefault.default.isLeapYear(year + 1) ? 366 : 365;
        var firstyday = new Date(Date.UTC(year, 0, 1));
        this.yearordinal = _dateutilDefault.default.toOrdinal(firstyday);
        this.yearweekday = _dateutilDefault.default.getWeekday(firstyday);
        var wday = _dateutilDefault.default.getWeekday(firstyday);
        if (this.yearlen === 365) {
            this.mmask = _masks.M365MASK;
            this.mdaymask = _masks.MDAY365MASK;
            this.nmdaymask = _masks.NMDAY365MASK;
            this.wdaymask = _masks.WDAYMASK.slice(wday);
            this.mrange = _masks.M365RANGE;
        } else {
            this.mmask = _masks.M366MASK;
            this.mdaymask = _masks.MDAY366MASK;
            this.nmdaymask = _masks.NMDAY366MASK;
            this.wdaymask = _masks.WDAYMASK.slice(wday);
            this.mrange = _masks.M366RANGE;
        }
        if (_helpers.empty(rr.options.byweekno)) this.wnomask = null;
        else {
            this.wnomask = _helpers.repeat(0, this.yearlen + 7);
            var no1wkst = void 0;
            var firstwkst = void 0;
            var wyearlen = void 0;
            no1wkst = firstwkst = _helpers.pymod(7 - this.yearweekday + rr.options.wkst, 7);
            if (no1wkst >= 4) {
                no1wkst = 0;
                // Number of days in the year, plus the days we got
                // from last year.
                wyearlen = this.yearlen + _helpers.pymod(this.yearweekday - rr.options.wkst, 7);
            } else // Number of days in the year, minus the days we
            // left in last year.
            wyearlen = this.yearlen - no1wkst;
            var div = Math.floor(wyearlen / 7);
            var mod = _helpers.pymod(wyearlen, 7);
            var numweeks = Math.floor(div + mod / 4);
            for(var j = 0; j < rr.options.byweekno.length; j++){
                var i = void 0;
                var n = rr.options.byweekno[j];
                if (n < 0) n += numweeks + 1;
                if (!(n > 0 && n <= numweeks)) continue;
                if (n > 1) {
                    i = no1wkst + (n - 1) * 7;
                    if (no1wkst !== firstwkst) i -= 7 - firstwkst;
                } else i = no1wkst;
                for(var k = 0; k < 7; k++){
                    this.wnomask[i] = 1;
                    i++;
                    if (this.wdaymask[i] === rr.options.wkst) break;
                }
            }
            if (_helpers.includes(rr.options.byweekno, 1)) {
                // Check week number 1 of next year as well
                // orig-TODO : Check -numweeks for next year.
                var i = no1wkst + numweeks * 7;
                if (no1wkst !== firstwkst) i -= 7 - firstwkst;
                if (i < this.yearlen) // If week starts in next year, we
                // don't care about it.
                for(var j = 0; j < 7; j++){
                    this.wnomask[i] = 1;
                    i += 1;
                    if (this.wdaymask[i] === rr.options.wkst) break;
                }
            }
            if (no1wkst) {
                // Check last week number of last year as
                // well. If no1wkst is 0, either the year
                // started on week start, or week number 1
                // got days from last year, so there are no
                // days from last year's last week number in
                // this year.
                var lnumweeks = void 0;
                if (!_helpers.includes(rr.options.byweekno, -1)) {
                    var lyearweekday = _dateutilDefault.default.getWeekday(new Date(Date.UTC(year - 1, 0, 1)));
                    var lno1wkst = _helpers.pymod(7 - lyearweekday.valueOf() + rr.options.wkst, 7);
                    var lyearlen = _dateutilDefault.default.isLeapYear(year - 1) ? 366 : 365;
                    if (lno1wkst >= 4) {
                        lno1wkst = 0;
                        lnumweeks = Math.floor(52 + _helpers.pymod(lyearlen + _helpers.pymod(lyearweekday - rr.options.wkst, 7), 7) / 4);
                    } else lnumweeks = Math.floor(52 + _helpers.pymod(this.yearlen - no1wkst, 7) / 4);
                } else lnumweeks = -1;
                if (_helpers.includes(rr.options.byweekno, lnumweeks)) for(var i = 0; i < no1wkst; i++)this.wnomask[i] = 1;
            }
        }
    };
    Iterinfo1.prototype.rebuildMonth = function(year, month) {
        var rr = this.rrule;
        var ranges = [];
        if (rr.options.freq === _rruleDefault.default.YEARLY) {
            if (_helpers.notEmpty(rr.options.bymonth)) for(var j = 0; j < rr.options.bymonth.length; j++){
                month = rr.options.bymonth[j];
                ranges.push(this.mrange.slice(month - 1, month + 1));
            }
            else ranges = [
                [
                    0,
                    this.yearlen
                ]
            ];
        } else if (rr.options.freq === _rruleDefault.default.MONTHLY) ranges = [
            this.mrange.slice(month - 1, month + 1)
        ];
        if (_helpers.notEmpty(ranges)) {
            // Weekly frequency won't get here, so we may not
            // care about cross-year weekly periods.
            this.nwdaymask = _helpers.repeat(0, this.yearlen);
            for(var j = 0; j < ranges.length; j++){
                var rang = ranges[j];
                var first = rang[0];
                var last = rang[1];
                last -= 1;
                for(var k = 0; k < rr.options.bynweekday.length; k++){
                    var i = void 0;
                    var wday = rr.options.bynweekday[k][0];
                    var n = rr.options.bynweekday[k][1];
                    if (n < 0) {
                        i = last + (n + 1) * 7;
                        i -= _helpers.pymod(this.wdaymask[i] - wday, 7);
                    } else {
                        i = first + (n - 1) * 7;
                        i += _helpers.pymod(7 - this.wdaymask[i] + wday, 7);
                    }
                    if (first <= i && i <= last) this.nwdaymask[i] = 1;
                }
            }
        }
        this.lastyear = year;
        this.lastmonth = month;
    };
    Iterinfo1.prototype.ydayset = function() {
        return [
            _helpers.range(this.yearlen),
            0,
            this.yearlen
        ];
    };
    Iterinfo1.prototype.mdayset = function(_, month, __) {
        var start = this.mrange[month - 1];
        var end = this.mrange[month];
        var set = _helpers.repeat(null, this.yearlen);
        for(var i = start; i < end; i++)set[i] = i;
        return [
            set,
            start,
            end
        ];
    };
    Iterinfo1.prototype.wdayset = function(year, month, day) {
        // We need to handle cross-year weeks here.
        var set = _helpers.repeat(null, this.yearlen + 7);
        var i = _dateutilDefault.default.toOrdinal(new Date(Date.UTC(year, month - 1, day))) - this.yearordinal;
        var start = i;
        for(var j = 0; j < 7; j++){
            set[i] = i;
            ++i;
            if (this.wdaymask[i] === this.rrule.options.wkst) break;
        }
        return [
            set,
            start,
            i
        ];
    };
    Iterinfo1.prototype.ddayset = function(year, month, day) {
        var set = _helpers.repeat(null, this.yearlen);
        var i = _dateutilDefault.default.toOrdinal(new Date(Date.UTC(year, month - 1, day))) - this.yearordinal;
        set[i] = i;
        return [
            set,
            i,
            i + 1
        ];
    };
    Iterinfo1.prototype.htimeset = function(hour, minute, second, millisecond) {
        var set = [];
        var rr = this.rrule;
        for(var i = 0; i < rr.options.byminute.length; i++){
            minute = rr.options.byminute[i];
            for(var j = 0; j < rr.options.bysecond.length; j++){
                second = rr.options.bysecond[j];
                set.push(new _dateutilDefault.default.Time(hour, minute, second, millisecond));
            }
        }
        _dateutilDefault.default.sort(set);
        return set;
    };
    Iterinfo1.prototype.mtimeset = function(hour, minute, second, millisecond) {
        var set = [];
        var rr = this.rrule;
        for(var j = 0; j < rr.options.bysecond.length; j++){
            second = rr.options.bysecond[j];
            set.push(new _dateutilDefault.default.Time(hour, minute, second, millisecond));
        }
        _dateutilDefault.default.sort(set);
        return set;
    };
    Iterinfo1.prototype.stimeset = function(hour, minute, second, millisecond) {
        return [
            new _dateutilDefault.default.Time(hour, minute, second, millisecond)
        ];
    };
    return Iterinfo1;
}();
exports.default = Iterinfo;

},{"./masks":"2cuda","./rrule":"fQtN4","./dateutil":"gS1CZ","./helpers":"9UCZ2","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"2cuda":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WDAYMASK", ()=>WDAYMASK
);
parcelHelpers.export(exports, "M365MASK", ()=>M365MASK
);
parcelHelpers.export(exports, "M365RANGE", ()=>M365RANGE
);
parcelHelpers.export(exports, "M366MASK", ()=>M366MASK
);
parcelHelpers.export(exports, "M366RANGE", ()=>M366RANGE
);
parcelHelpers.export(exports, "MDAY365MASK", ()=>MDAY365MASK
);
parcelHelpers.export(exports, "MDAY366MASK", ()=>MDAY366MASK
);
parcelHelpers.export(exports, "NMDAY365MASK", ()=>NMDAY365MASK
);
parcelHelpers.export(exports, "NMDAY366MASK", ()=>NMDAY366MASK
);
var _helpers = require("./helpers");
// =============================================================================
// Date masks
// =============================================================================
// Every mask is 7 days longer to handle cross-year weekly periods.
var M365MASK = _helpers.repeat(1, 31).concat(_helpers.repeat(2, 28), _helpers.repeat(3, 31), _helpers.repeat(4, 30), _helpers.repeat(5, 31), _helpers.repeat(6, 30), _helpers.repeat(7, 31), _helpers.repeat(8, 31), _helpers.repeat(9, 30), _helpers.repeat(10, 31), _helpers.repeat(11, 30), _helpers.repeat(12, 31), _helpers.repeat(1, 7));
var M366MASK = _helpers.repeat(1, 31).concat(_helpers.repeat(2, 29), _helpers.repeat(3, 31), _helpers.repeat(4, 30), _helpers.repeat(5, 31), _helpers.repeat(6, 30), _helpers.repeat(7, 31), _helpers.repeat(8, 31), _helpers.repeat(9, 30), _helpers.repeat(10, 31), _helpers.repeat(11, 30), _helpers.repeat(12, 31), _helpers.repeat(1, 7));
var M28 = _helpers.range(1, 29);
var M29 = _helpers.range(1, 30);
var M30 = _helpers.range(1, 31);
var M31 = _helpers.range(1, 32);
var MDAY366MASK = M31.concat(M29, M31, M30, M31, M30, M31, M31, M30, M31, M30, M31, M31.slice(0, 7));
var MDAY365MASK = M31.concat(M28, M31, M30, M31, M30, M31, M31, M30, M31, M30, M31, M31.slice(0, 7));
var NM28 = _helpers.range(-28, 0);
var NM29 = _helpers.range(-29, 0);
var NM30 = _helpers.range(-30, 0);
var NM31 = _helpers.range(-31, 0);
var NMDAY366MASK = NM31.concat(NM29, NM31, NM30, NM31, NM30, NM31, NM31, NM30, NM31, NM30, NM31, NM31.slice(0, 7));
var NMDAY365MASK = NM31.concat(NM28, NM31, NM30, NM31, NM30, NM31, NM31, NM30, NM31, NM30, NM31, NM31.slice(0, 7));
var M366RANGE = [
    0,
    31,
    60,
    91,
    121,
    152,
    182,
    213,
    244,
    274,
    305,
    335,
    366
];
var M365RANGE = [
    0,
    31,
    59,
    90,
    120,
    151,
    181,
    212,
    243,
    273,
    304,
    334,
    365
];
var WDAYMASK = function() {
    var wdaymask = [];
    for(var i = 0; i < 55; i++)wdaymask = wdaymask.concat(_helpers.range(7));
    return wdaymask;
}();

},{"./helpers":"9UCZ2","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"iQsEc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * This class helps us to emulate python's generators, sorta.
 */ var IterResult = function() {
    function IterResult1(method, args) {
        this.minDate = null;
        this.maxDate = null;
        this._result = [];
        this.total = 0;
        this.method = method;
        this.args = args;
        if (method === 'between') {
            this.maxDate = args.inc ? args.before : new Date(args.before.getTime() - 1);
            this.minDate = args.inc ? args.after : new Date(args.after.getTime() + 1);
        } else if (method === 'before') this.maxDate = args.inc ? args.dt : new Date(args.dt.getTime() - 1);
        else if (method === 'after') this.minDate = args.inc ? args.dt : new Date(args.dt.getTime() + 1);
    }
    /**
     * Possibly adds a date into the result.
     *
     * @param {Date} date - the date isn't necessarly added to the result
     *                      list (if it is too late/too early)
     * @return {Boolean} true if it makes sense to continue the iteration
     *                   false if we're done.
     */ IterResult1.prototype.accept = function(date) {
        ++this.total;
        var tooEarly = this.minDate && date < this.minDate;
        var tooLate = this.maxDate && date > this.maxDate;
        if (this.method === 'between') {
            if (tooEarly) return true;
            if (tooLate) return false;
        } else if (this.method === 'before') {
            if (tooLate) return false;
        } else if (this.method === 'after') {
            if (tooEarly) return true;
            this.add(date);
            return false;
        }
        return this.add(date);
    };
    /**
     *
     * @param {Date} date that is part of the result.
     * @return {Boolean} whether we are interested in more values.
     */ IterResult1.prototype.add = function(date) {
        this._result.push(date);
        return true;
    };
    /**
     * 'before' and 'after' return only one date, whereas 'all'
     * and 'between' an array.
     * @return {Date,Array?}
     */ IterResult1.prototype.getValue = function() {
        var res = this._result;
        switch(this.method){
            case 'all':
            case 'between':
                return res;
            case 'before':
            case 'after':
                return res.length ? res[res.length - 1] : null;
        }
    };
    IterResult1.prototype.clone = function() {
        return new IterResult1(this.method, this.args);
    };
    return IterResult1;
}();
exports.default = IterResult;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"llph6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _iterresult = require("./iterresult");
var _iterresultDefault = parcelHelpers.interopDefault(_iterresult);
var __extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * IterResult subclass that calls a callback function on each add,
 * and stops iterating when the callback returns false.
 */ var CallbackIterResult = function(_super) {
    __extends(CallbackIterResult1, _super);
    function CallbackIterResult1(method, args, iterator) {
        var _this = _super.call(this, method, args) || this;
        _this.iterator = iterator;
        return _this;
    }
    CallbackIterResult1.prototype.add = function(date) {
        if (this.iterator(date, this._result.length)) {
            this._result.push(date);
            return true;
        }
        return false;
    };
    return CallbackIterResult1;
}(_iterresultDefault.default);
exports.default = CallbackIterResult;

},{"./iterresult":"iQsEc","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"9biul":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Frequency", ()=>Frequency
);
var Frequency;
(function(Frequency1) {
    Frequency1[Frequency1["YEARLY"] = 0] = "YEARLY";
    Frequency1[Frequency1["MONTHLY"] = 1] = "MONTHLY";
    Frequency1[Frequency1["WEEKLY"] = 2] = "WEEKLY";
    Frequency1[Frequency1["DAILY"] = 3] = "DAILY";
    Frequency1[Frequency1["HOURLY"] = 4] = "HOURLY";
    Frequency1[Frequency1["MINUTELY"] = 5] = "MINUTELY";
    Frequency1[Frequency1["SECONDLY"] = 6] = "SECONDLY";
})(Frequency || (Frequency = {
}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"hWO1x":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initializeOptions", ()=>initializeOptions
);
parcelHelpers.export(exports, "parseOptions", ()=>parseOptions
);
var _helpers = require("./helpers");
var _rrule = require("./rrule");
var _rruleDefault = parcelHelpers.interopDefault(_rrule);
var _dateutil = require("./dateutil");
var _dateutilDefault = parcelHelpers.interopDefault(_dateutil);
var _weekday = require("./weekday");
function initializeOptions(options) {
    var invalid = [];
    var keys = Object.keys(options);
    var initializedOptions = {
    };
    // Shallow copy for options and origOptions and check for invalid
    keys.forEach(function(key) {
        initializedOptions[key] = options[key];
        if (!_helpers.includes(_rrule.defaultKeys, key)) invalid.push(key);
    });
    if (invalid.length) throw new Error('Invalid options: ' + invalid.join(', '));
    return initializedOptions;
}
function parseOptions(options) {
    var opts = initializeOptions(options);
    var keys = Object.keys(options);
    // Merge in default options
    _rrule.defaultKeys.forEach(function(key) {
        if (!_helpers.includes(keys, key)) opts[key] = _rrule.DEFAULT_OPTIONS[key];
    });
    if (_helpers.isPresent(opts.byeaster)) opts.freq = _rruleDefault.default.YEARLY;
    if (!(_helpers.isPresent(opts.freq) && _rruleDefault.default.FREQUENCIES[opts.freq])) throw new Error("Invalid frequency: " + opts.freq);
    if (!opts.dtstart) opts.dtstart = new Date(new Date().setMilliseconds(0));
    var millisecondModulo = opts.dtstart.getTime() % 1000;
    if (!_helpers.isPresent(opts.wkst)) opts.wkst = _rruleDefault.default.MO.weekday;
    else if (_helpers.isNumber(opts.wkst)) ;
    else opts.wkst = opts.wkst.weekday;
    if (_helpers.isPresent(opts.bysetpos)) {
        if (_helpers.isNumber(opts.bysetpos)) opts.bysetpos = [
            opts.bysetpos
        ];
        for(var i = 0; i < opts.bysetpos.length; i++){
            var v = opts.bysetpos[i];
            if (v === 0 || !(v >= -366 && v <= 366)) throw new Error("bysetpos must be between 1 and 366, or between -366 and -1");
        }
    }
    if (!(Boolean(opts.byweekno) || _helpers.notEmpty(opts.byweekno) || _helpers.notEmpty(opts.byyearday) || Boolean(opts.bymonthday) || _helpers.notEmpty(opts.bymonthday) || _helpers.isPresent(opts.byweekday) || _helpers.isPresent(opts.byeaster))) switch(opts.freq){
        case _rruleDefault.default.YEARLY:
            if (!opts.bymonth) opts.bymonth = opts.dtstart.getUTCMonth() + 1;
            opts.bymonthday = opts.dtstart.getUTCDate();
            break;
        case _rruleDefault.default.MONTHLY:
            opts.bymonthday = opts.dtstart.getUTCDate();
            break;
        case _rruleDefault.default.WEEKLY:
            opts.byweekday = [
                _dateutilDefault.default.getWeekday(opts.dtstart)
            ];
            break;
    }
    // bymonth
    if (_helpers.isPresent(opts.bymonth) && !_helpers.isArray(opts.bymonth)) opts.bymonth = [
        opts.bymonth
    ];
    // byyearday
    if (_helpers.isPresent(opts.byyearday) && !_helpers.isArray(opts.byyearday) && _helpers.isNumber(opts.byyearday)) opts.byyearday = [
        opts.byyearday
    ];
    // bymonthday
    if (!_helpers.isPresent(opts.bymonthday)) {
        opts.bymonthday = [];
        opts.bynmonthday = [];
    } else if (_helpers.isArray(opts.bymonthday)) {
        var bymonthday = [];
        var bynmonthday = [];
        for(var i = 0; i < opts.bymonthday.length; i++){
            var v = opts.bymonthday[i];
            if (v > 0) bymonthday.push(v);
            else if (v < 0) bynmonthday.push(v);
        }
        opts.bymonthday = bymonthday;
        opts.bynmonthday = bynmonthday;
    } else if (opts.bymonthday < 0) {
        opts.bynmonthday = [
            opts.bymonthday
        ];
        opts.bymonthday = [];
    } else {
        opts.bynmonthday = [];
        opts.bymonthday = [
            opts.bymonthday
        ];
    }
    // byweekno
    if (_helpers.isPresent(opts.byweekno) && !_helpers.isArray(opts.byweekno)) opts.byweekno = [
        opts.byweekno
    ];
    // byweekday / bynweekday
    if (!_helpers.isPresent(opts.byweekday)) opts.bynweekday = null;
    else if (_helpers.isNumber(opts.byweekday)) {
        opts.byweekday = [
            opts.byweekday
        ];
        opts.bynweekday = null;
    } else if (opts.byweekday instanceof _weekday.Weekday) {
        if (!opts.byweekday.n || opts.freq > _rruleDefault.default.MONTHLY) {
            opts.byweekday = [
                opts.byweekday.weekday
            ];
            opts.bynweekday = null;
        } else {
            opts.bynweekday = [
                [
                    opts.byweekday.weekday,
                    opts.byweekday.n
                ]
            ];
            opts.byweekday = null;
        }
    } else {
        var byweekday = [];
        var bynweekday = [];
        for(var i = 0; i < opts.byweekday.length; i++){
            var wday = opts.byweekday[i];
            if (_helpers.isNumber(wday)) {
                byweekday.push(wday);
                continue;
            }
            var wd = wday;
            if (!wd.n || opts.freq > _rruleDefault.default.MONTHLY) byweekday.push(wd.weekday);
            else bynweekday.push([
                wd.weekday,
                wd.n
            ]);
        }
        opts.byweekday = _helpers.notEmpty(byweekday) ? byweekday : null;
        opts.bynweekday = _helpers.notEmpty(bynweekday) ? bynweekday : null;
    }
    // byhour
    if (!_helpers.isPresent(opts.byhour)) opts.byhour = opts.freq < _rruleDefault.default.HOURLY ? [
        opts.dtstart.getUTCHours()
    ] : null;
    else if (_helpers.isNumber(opts.byhour)) opts.byhour = [
        opts.byhour
    ];
    // byminute
    if (!_helpers.isPresent(opts.byminute)) opts.byminute = opts.freq < _rruleDefault.default.MINUTELY ? [
        opts.dtstart.getUTCMinutes()
    ] : null;
    else if (_helpers.isNumber(opts.byminute)) opts.byminute = [
        opts.byminute
    ];
    // bysecond
    if (!_helpers.isPresent(opts.bysecond)) opts.bysecond = opts.freq < _rruleDefault.default.SECONDLY ? [
        opts.dtstart.getUTCSeconds()
    ] : null;
    else if (_helpers.isNumber(opts.bysecond)) opts.bysecond = [
        opts.bysecond
    ];
    var timeset;
    if (opts.freq >= _rruleDefault.default.HOURLY) timeset = null;
    else {
        timeset = [];
        for(var i = 0; i < opts.byhour.length; i++){
            var hour = opts.byhour[i];
            for(var j = 0; j < opts.byminute.length; j++){
                var minute = opts.byminute[j];
                for(var k = 0; k < opts.bysecond.length; k++){
                    var second = opts.bysecond[k];
                    // python:
                    // datetime.time(hour, minute, second,
                    // tzinfo=self._tzinfo))
                    timeset.push(new _dateutilDefault.default.Time(hour, minute, second, millisecondModulo));
                }
            }
        }
        _dateutilDefault.default.sort(timeset);
    }
    return {
        parsedOptions: opts,
        timeset: timeset
    };
}

},{"./helpers":"9UCZ2","./rrule":"fQtN4","./dateutil":"gS1CZ","./weekday":"2Q77D","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"2Q77D":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Weekday", ()=>Weekday
);
// =============================================================================
// Weekday
// =============================================================================
var WDAYS = [
    'MO',
    'TU',
    'WE',
    'TH',
    'FR',
    'SA',
    'SU'
];
var Weekday = function() {
    function Weekday1(weekday, n) {
        if (n === 0) throw new Error("Can't create weekday with n == 0");
        this.weekday = weekday;
        this.n = n;
    }
    // __call__ - Cannot call the object directly, do it through
    // e.g. RRule.TH.nth(-1) instead,
    Weekday1.prototype.nth = function(n) {
        return this.n === n ? this : new Weekday1(this.weekday, n);
    };
    // __eq__
    Weekday1.prototype.equals = function(other) {
        return this.weekday === other.weekday && this.n === other.n;
    };
    // __repr__
    Weekday1.prototype.toString = function() {
        var s = WDAYS[this.weekday];
        if (this.n) s = (this.n > 0 ? '+' : '') + String(this.n) + s;
        return s;
    };
    Weekday1.prototype.getJsWeekday = function() {
        return this.weekday === 6 ? 0 : this.weekday + 1;
    };
    return Weekday1;
}();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"l6q9L":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parseString", ()=>parseString
);
var _types = require("./types");
var _weekday = require("./weekday");
var _dateutil = require("./dateutil");
var _dateutilDefault = parcelHelpers.interopDefault(_dateutil);
var _rrule = require("./rrule");
function parseString(rfcString) {
    rfcString = rfcString.replace(/^\s+|\s+$/, '');
    if (!rfcString.length) return null;
    var options = {
    };
    var dtstartWithZone = /^DTSTART;TZID=(.+?):([^;]+)$/.exec(rfcString);
    if (dtstartWithZone) {
        var _ = dtstartWithZone[0], tzid = dtstartWithZone[1], dtstart = dtstartWithZone[2];
        options.tzid = tzid;
        options.dtstart = _dateutilDefault.default.untilStringToDate(dtstart);
        return options;
    }
    var attrs = rfcString.split(';');
    for(var i = 0; i < attrs.length; i++){
        var attr = attrs[i].split('=');
        var key = attr[0];
        var value = attr[1];
        switch(key){
            case 'FREQ':
                options.freq = _types.Frequency[value];
                break;
            case 'WKST':
                options.wkst = _rrule.Days[value];
                break;
            case 'COUNT':
            case 'INTERVAL':
            case 'BYSETPOS':
            case 'BYMONTH':
            case 'BYMONTHDAY':
            case 'BYYEARDAY':
            case 'BYWEEKNO':
            case 'BYHOUR':
            case 'BYMINUTE':
            case 'BYSECOND':
                var num = void 0;
                if (value.indexOf(',') !== -1) {
                    var values = value.split(',');
                    num = values.map(function(val) {
                        if (/^[+-]?\d+$/.test(val.toString())) return Number(val);
                        else return val;
                    });
                } else if (/^[+-]?\d+$/.test(value)) num = Number(value);
                else num = value;
                var optionKey = key.toLowerCase();
                // @ts-ignore
                options[optionKey] = num;
                break;
            case 'BYDAY':
                var n = void 0;
                var wday = void 0;
                var day = void 0;
                var days = value.split(',');
                options.byweekday = [];
                for(var j = 0; j < days.length; j++){
                    day = days[j];
                    if (day.length === 2) {
                        // MO, TU, ...
                        wday = _rrule.Days[day]; // wday instanceof Weekday
                        options.byweekday.push(wday);
                    } else {
                        // -1MO, +3FR, 1SO, ...
                        var parts = day.match(/^([+-]?\d)([A-Z]{2})$/);
                        n = Number(parts[1]);
                        var wdaypart = parts[2];
                        wday = _rrule.Days[wdaypart].weekday;
                        options.byweekday.push(new _weekday.Weekday(wday, n));
                    }
                }
                break;
            case 'DTSTART':
                options.dtstart = _dateutilDefault.default.untilStringToDate(value);
                break;
            case 'UNTIL':
                options.until = _dateutilDefault.default.untilStringToDate(value);
                break;
            case 'BYEASTER':
                options.byeaster = Number(value);
                break;
            default:
                throw new Error("Unknown RRULE property '" + key + "'");
        }
    }
    return options;
}

},{"./types":"9biul","./weekday":"2Q77D","./dateutil":"gS1CZ","./rrule":"fQtN4","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"3Gs9h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "optionsToString", ()=>optionsToString
);
var _rrule = require("./rrule");
var _rruleDefault = parcelHelpers.interopDefault(_rrule);
var _helpers = require("./helpers");
var _weekday = require("./weekday");
var _dateutil = require("./dateutil");
var _dateutilDefault = parcelHelpers.interopDefault(_dateutil);
function optionsToString(options) {
    var pairs = [];
    var keys = Object.keys(options);
    var defaultKeys = Object.keys(_rrule.DEFAULT_OPTIONS);
    for(var i = 0; i < keys.length; i++){
        if (keys[i] === 'tzid') continue;
        if (!_helpers.includes(defaultKeys, keys[i])) continue;
        var key = keys[i].toUpperCase();
        var value = options[keys[i]];
        var outValue = '';
        if (!_helpers.isPresent(value) || _helpers.isArray(value) && !value.length) continue;
        switch(key){
            case 'FREQ':
                outValue = _rruleDefault.default.FREQUENCIES[options.freq];
                break;
            case 'WKST':
                if (_helpers.isNumber(value)) outValue = new _weekday.Weekday(value).toString();
                else outValue = value.toString();
                break;
            case 'BYWEEKDAY':
                /*
                NOTE: BYWEEKDAY is a special case.
                RRule() deconstructs the rule.options.byweekday array
                into an array of Weekday arguments.
                On the other hand, rule.origOptions is an array of Weekdays.
                We need to handle both cases here.
                It might be worth change RRule to keep the Weekdays.
      
                Also, BYWEEKDAY (used by RRule) vs. BYDAY (RFC)
      
                */ key = 'BYDAY';
                var arrayValue = _helpers.toArray(value);
                outValue = _helpers.toArray(value).map(function(wday) {
                    if (wday instanceof _weekday.Weekday) return wday;
                    else if (_helpers.isArray(wday)) return new _weekday.Weekday(wday[0], wday[1]);
                    else return new _weekday.Weekday(wday);
                }).toString();
                break;
            case 'DTSTART':
            case 'UNTIL':
                outValue = _dateutilDefault.default.timeToUntilString(value, !options.tzid);
                if (options.tzid) outValue = ";TZID=" + options.tzid + ":" + outValue;
                break;
            default:
                if (_helpers.isArray(value)) {
                    var strValues = [];
                    for(var j = 0; j < value.length; j++)strValues[j] = String(value[j]);
                    outValue = strValues.toString();
                } else outValue = String(value);
        }
        pairs.push([
            key,
            outValue
        ]);
    }
    var strings = [];
    for(var i = 0; i < pairs.length; i++){
        var _a = pairs[i], key = _a[0], value = _a[1];
        if (value.indexOf(';') === 0) strings.push("" + key + value);
        else strings.push(key + "=" + value.toString());
    }
    return strings.join(';');
}

},{"./rrule":"fQtN4","./helpers":"9UCZ2","./weekday":"2Q77D","./dateutil":"gS1CZ","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"9fAk1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Cache", ()=>Cache
);
var _iterresult = require("./iterresult");
var _iterresultDefault = parcelHelpers.interopDefault(_iterresult);
var _dateutil = require("./dateutil");
var _dateutilDefault = parcelHelpers.interopDefault(_dateutil);
var _helpers = require("./helpers");
var Cache = function() {
    function Cache1() {
        this.all = false;
        this.before = [];
        this.after = [];
        this.between = [];
    }
    /**
     * @param {String} what - all/before/after/between
     * @param {Array,Date} value - an array of dates, one date, or null
     * @param {Object?} args - _iter arguments
     */ Cache1.prototype._cacheAdd = function(what, value, args) {
        if (value) value = value instanceof Date ? _dateutilDefault.default.clone(value) : _dateutilDefault.default.cloneDates(value);
        if (what === 'all') this.all = value;
        else {
            args._value = value;
            this[what].push(args);
        }
    };
    /**
     * @return false - not in the cache
     *         null  - cached, but zero occurrences (before/after)
     *         Date  - cached (before/after)
     *         []    - cached, but zero occurrences (all/between)
     *         [Date1, DateN] - cached (all/between)
     */ Cache1.prototype._cacheGet = function(what, args) {
        var cached = false;
        var argsKeys = args ? Object.keys(args) : [];
        var findCacheDiff = function(item) {
            for(var i = 0; i < argsKeys.length; i++){
                var key = argsKeys[i];
                if (String(args[key]) !== String(item[key])) return true;
            }
            return false;
        };
        var cachedObject = this[what];
        if (what === 'all') cached = this.all;
        else if (_helpers.isArray(cachedObject)) // Let's see whether we've already called the
        // 'what' method with the same 'args'
        for(var i1 = 0; i1 < cachedObject.length; i1++){
            var item1 = cachedObject[i1];
            if (argsKeys.length && findCacheDiff(item1)) continue;
            cached = item1._value;
            break;
        }
        if (!cached && this.all) {
            // Not in the cache, but we already know all the occurrences,
            // so we can find the correct dates from the cached ones.
            var iterResult = new _iterresultDefault.default(what, args);
            for(var i1 = 0; i1 < this.all.length; i1++){
                if (!iterResult.accept(this.all[i1])) break;
            }
            cached = iterResult.getValue();
            this._cacheAdd(what, cached, args);
        }
        return _helpers.isArray(cached) ? _dateutilDefault.default.cloneDates(cached) : cached instanceof Date ? _dateutilDefault.default.clone(cached) : cached;
    };
    return Cache1;
}();

},{"./iterresult":"iQsEc","./dateutil":"gS1CZ","./helpers":"9UCZ2","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"kmRFS":[function(require,module,exports) {
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}
function _getPrototypeOf(o1) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o1);
}
function _setPrototypeOf(o2, p1) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o2, p1);
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
function _construct(Parent1, args1, Class1) {
    if (_isNativeReflectConstruct()) _construct = Reflect.construct;
    else _construct = function _construct(Parent, args, Class) {
        var a = [
            null
        ];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
    };
    return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class2) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class2);
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {
    };
    var target = {
    };
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n1 = Object.prototype.toString.call(o).slice(8, -1);
    if (n1 === "Object" && o.constructor) n1 = o.constructor.name;
    if (n1 === "Map" || n1 === "Set") return Array.from(n1);
    if (n1 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n1)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _createForOfIteratorHelperLoose(o) {
    var i = 0;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) return function() {
            if (i >= o.length) return {
                done: true
            };
            return {
                done: false,
                value: o[i++]
            };
        };
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    i = o[Symbol.iterator]();
    return i.next.bind(i);
}
// these aren't really private, but nor are they really useful to document
/**
 * @private
 */ var LuxonError = /*#__PURE__*/ function(_Error) {
    _inheritsLoose(LuxonError1, _Error);
    function LuxonError1() {
        return _Error.apply(this, arguments) || this;
    }
    return LuxonError1;
}(/*#__PURE__*/ _wrapNativeSuper(Error));
/**
 * @private
 */ var InvalidDateTimeError = /*#__PURE__*/ function(_LuxonError) {
    _inheritsLoose(InvalidDateTimeError1, _LuxonError);
    function InvalidDateTimeError1(reason) {
        return _LuxonError.call(this, "Invalid DateTime: " + reason.toMessage()) || this;
    }
    return InvalidDateTimeError1;
}(LuxonError);
/**
 * @private
 */ var InvalidIntervalError = /*#__PURE__*/ function(_LuxonError2) {
    _inheritsLoose(InvalidIntervalError1, _LuxonError2);
    function InvalidIntervalError1(reason) {
        return _LuxonError2.call(this, "Invalid Interval: " + reason.toMessage()) || this;
    }
    return InvalidIntervalError1;
}(LuxonError);
/**
 * @private
 */ var InvalidDurationError = /*#__PURE__*/ function(_LuxonError3) {
    _inheritsLoose(InvalidDurationError1, _LuxonError3);
    function InvalidDurationError1(reason) {
        return _LuxonError3.call(this, "Invalid Duration: " + reason.toMessage()) || this;
    }
    return InvalidDurationError1;
}(LuxonError);
/**
 * @private
 */ var ConflictingSpecificationError = /*#__PURE__*/ function(_LuxonError4) {
    _inheritsLoose(ConflictingSpecificationError1, _LuxonError4);
    function ConflictingSpecificationError1() {
        return _LuxonError4.apply(this, arguments) || this;
    }
    return ConflictingSpecificationError1;
}(LuxonError);
/**
 * @private
 */ var InvalidUnitError = /*#__PURE__*/ function(_LuxonError5) {
    _inheritsLoose(InvalidUnitError1, _LuxonError5);
    function InvalidUnitError1(unit) {
        return _LuxonError5.call(this, "Invalid unit " + unit) || this;
    }
    return InvalidUnitError1;
}(LuxonError);
/**
 * @private
 */ var InvalidArgumentError = /*#__PURE__*/ function(_LuxonError6) {
    _inheritsLoose(InvalidArgumentError1, _LuxonError6);
    function InvalidArgumentError1() {
        return _LuxonError6.apply(this, arguments) || this;
    }
    return InvalidArgumentError1;
}(LuxonError);
/**
 * @private
 */ var ZoneIsAbstractError = /*#__PURE__*/ function(_LuxonError7) {
    _inheritsLoose(ZoneIsAbstractError1, _LuxonError7);
    function ZoneIsAbstractError1() {
        return _LuxonError7.call(this, "Zone is an abstract class") || this;
    }
    return ZoneIsAbstractError1;
}(LuxonError);
/**
 * @private
 */ var n = "numeric", s = "short", l = "long";
var DATE_SHORT = {
    year: n,
    month: n,
    day: n
};
var DATE_MED = {
    year: n,
    month: s,
    day: n
};
var DATE_MED_WITH_WEEKDAY = {
    year: n,
    month: s,
    day: n,
    weekday: s
};
var DATE_FULL = {
    year: n,
    month: l,
    day: n
};
var DATE_HUGE = {
    year: n,
    month: l,
    day: n,
    weekday: l
};
var TIME_SIMPLE = {
    hour: n,
    minute: n
};
var TIME_WITH_SECONDS = {
    hour: n,
    minute: n,
    second: n
};
var TIME_WITH_SHORT_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    timeZoneName: s
};
var TIME_WITH_LONG_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    timeZoneName: l
};
var TIME_24_SIMPLE = {
    hour: n,
    minute: n,
    hour12: false
};
/**
 * {@link toLocaleString}; format like '09:30:23', always 24-hour.
 */ var TIME_24_WITH_SECONDS = {
    hour: n,
    minute: n,
    second: n,
    hour12: false
};
/**
 * {@link toLocaleString}; format like '09:30:23 EDT', always 24-hour.
 */ var TIME_24_WITH_SHORT_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    hour12: false,
    timeZoneName: s
};
/**
 * {@link toLocaleString}; format like '09:30:23 Eastern Daylight Time', always 24-hour.
 */ var TIME_24_WITH_LONG_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    hour12: false,
    timeZoneName: l
};
/**
 * {@link toLocaleString}; format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
 */ var DATETIME_SHORT = {
    year: n,
    month: n,
    day: n,
    hour: n,
    minute: n
};
/**
 * {@link toLocaleString}; format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
 */ var DATETIME_SHORT_WITH_SECONDS = {
    year: n,
    month: n,
    day: n,
    hour: n,
    minute: n,
    second: n
};
var DATETIME_MED = {
    year: n,
    month: s,
    day: n,
    hour: n,
    minute: n
};
var DATETIME_MED_WITH_SECONDS = {
    year: n,
    month: s,
    day: n,
    hour: n,
    minute: n,
    second: n
};
var DATETIME_MED_WITH_WEEKDAY = {
    year: n,
    month: s,
    day: n,
    weekday: s,
    hour: n,
    minute: n
};
var DATETIME_FULL = {
    year: n,
    month: l,
    day: n,
    hour: n,
    minute: n,
    timeZoneName: s
};
var DATETIME_FULL_WITH_SECONDS = {
    year: n,
    month: l,
    day: n,
    hour: n,
    minute: n,
    second: n,
    timeZoneName: s
};
var DATETIME_HUGE = {
    year: n,
    month: l,
    day: n,
    weekday: l,
    hour: n,
    minute: n,
    timeZoneName: l
};
var DATETIME_HUGE_WITH_SECONDS = {
    year: n,
    month: l,
    day: n,
    weekday: l,
    hour: n,
    minute: n,
    second: n,
    timeZoneName: l
};
/*
  This is just a junk drawer, containing anything used across multiple classes.
  Because Luxon is small(ish), this should stay small and we won't worry about splitting
  it up into, say, parsingUtil.js and basicUtil.js and so on. But they are divided up by feature area.
*/ /**
 * @private
 */ // TYPES
function isUndefined(o) {
    return typeof o === "undefined";
}
function isNumber(o) {
    return typeof o === "number";
}
function isInteger(o) {
    return typeof o === "number" && o % 1 === 0;
}
function isString(o) {
    return typeof o === "string";
}
function isDate(o) {
    return Object.prototype.toString.call(o) === "[object Date]";
} // CAPABILITIES
function hasIntl() {
    try {
        return typeof Intl !== "undefined" && Intl.DateTimeFormat;
    } catch (e) {
        return false;
    }
}
function hasFormatToParts() {
    return !isUndefined(Intl.DateTimeFormat.prototype.formatToParts);
}
function hasRelative() {
    try {
        return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
    } catch (e) {
        return false;
    }
} // OBJECTS AND ARRAYS
function maybeArray(thing) {
    return Array.isArray(thing) ? thing : [
        thing
    ];
}
function bestBy(arr, by, compare) {
    if (arr.length === 0) return undefined;
    return arr.reduce(function(best, next) {
        var pair = [
            by(next),
            next
        ];
        if (!best) return pair;
        else if (compare(best[0], pair[0]) === best[0]) return best;
        else return pair;
    }, null)[1];
}
function pick(obj, keys) {
    return keys.reduce(function(a, k) {
        a[k] = obj[k];
        return a;
    }, {
    });
}
function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
} // NUMBERS AND STRINGS
function integerBetween(thing, bottom, top) {
    return isInteger(thing) && thing >= bottom && thing <= top;
} // x % n but takes the sign of n instead of x
function floorMod(x, n2) {
    return x - n2 * Math.floor(x / n2);
}
function padStart(input, n3) {
    if (n3 === void 0) n3 = 2;
    var minus = input < 0 ? "-" : "";
    var target = minus ? input * -1 : input;
    var result;
    if (target.toString().length < n3) result = ("0".repeat(n3) + target).slice(-n3);
    else result = target.toString();
    return "" + minus + result;
}
function parseInteger(string) {
    if (isUndefined(string) || string === null || string === "") return undefined;
    else return parseInt(string, 10);
}
function parseMillis(fraction) {
    // Return undefined (instead of 0) in these cases, where fraction is not set
    if (isUndefined(fraction) || fraction === null || fraction === "") return undefined;
    else {
        var f = parseFloat("0." + fraction) * 1000;
        return Math.floor(f);
    }
}
function roundTo(number, digits, towardZero) {
    if (towardZero === void 0) towardZero = false;
    var factor = Math.pow(10, digits), rounder = towardZero ? Math.trunc : Math.round;
    return rounder(number * factor) / factor;
} // DATE BASICS
function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
    var modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
    if (modMonth === 2) return isLeapYear(modYear) ? 29 : 28;
    else return [
        31,
        null,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ][modMonth - 1];
} // covert a calendar object to a local timestamp (epoch, but with the offset baked in)
function objToLocalTS(obj) {
    var d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond); // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that
    if (obj.year < 100 && obj.year >= 0) {
        d = new Date(d);
        d.setUTCFullYear(d.getUTCFullYear() - 1900);
    }
    return +d;
}
function weeksInWeekYear(weekYear) {
    var p1 = (weekYear + Math.floor(weekYear / 4) - Math.floor(weekYear / 100) + Math.floor(weekYear / 400)) % 7, last = weekYear - 1, p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
    return p1 === 4 || p2 === 3 ? 53 : 52;
}
function untruncateYear(year) {
    if (year > 99) return year;
    else return year > 60 ? 1900 + year : 2000 + year;
} // PARSING
function parseZoneInfo(ts, offsetFormat, locale, timeZone) {
    if (timeZone === void 0) timeZone = null;
    var date = new Date(ts), intlOpts = {
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };
    if (timeZone) intlOpts.timeZone = timeZone;
    var modified = Object.assign({
        timeZoneName: offsetFormat
    }, intlOpts), intl = hasIntl();
    if (intl && hasFormatToParts()) {
        var parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find(function(m) {
            return m.type.toLowerCase() === "timezonename";
        });
        return parsed ? parsed.value : null;
    } else if (intl) {
        // this probably doesn't work for all locales
        var without = new Intl.DateTimeFormat(locale, intlOpts).format(date), included = new Intl.DateTimeFormat(locale, modified).format(date), diffed = included.substring(without.length), trimmed = diffed.replace(/^[, \u200e]+/, "");
        return trimmed;
    } else return null;
} // signedOffset('-5', '30') -> -330
function signedOffset(offHourStr, offMinuteStr) {
    var offHour = parseInt(offHourStr, 10); // don't || this because we want to preserve -0
    if (Number.isNaN(offHour)) offHour = 0;
    var offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
    return offHour * 60 + offMinSigned;
} // COERCION
function asNumber(value) {
    var numericValue = Number(value);
    if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue)) throw new InvalidArgumentError("Invalid unit value " + value);
    return numericValue;
}
function normalizeObject(obj, normalizer, nonUnitKeys) {
    var normalized = {
    };
    for(var u in obj)if (hasOwnProperty(obj, u)) {
        if (nonUnitKeys.indexOf(u) >= 0) continue;
        var v = obj[u];
        if (v === undefined || v === null) continue;
        normalized[normalizer(u)] = asNumber(v);
    }
    return normalized;
}
function formatOffset(offset1, format) {
    var hours = Math.trunc(Math.abs(offset1 / 60)), minutes = Math.trunc(Math.abs(offset1 % 60)), sign = offset1 >= 0 ? "+" : "-";
    switch(format){
        case "short":
            return "" + sign + padStart(hours, 2) + ":" + padStart(minutes, 2);
        case "narrow":
            return "" + sign + hours + (minutes > 0 ? ":" + minutes : "");
        case "techie":
            return "" + sign + padStart(hours, 2) + padStart(minutes, 2);
        default:
            throw new RangeError("Value format " + format + " is out of range for property format");
    }
}
function timeObject(obj) {
    return pick(obj, [
        "hour",
        "minute",
        "second",
        "millisecond"
    ]);
}
var ianaRegex = /[A-Za-z_+-]{1,256}(:?\/[A-Za-z_+-]{1,256}(\/[A-Za-z_+-]{1,256})?)?/;
function stringify(obj) {
    return JSON.stringify(obj, Object.keys(obj).sort());
}
/**
 * @private
 */ var monthsLong = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
var monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];
var monthsNarrow = [
    "J",
    "F",
    "M",
    "A",
    "M",
    "J",
    "J",
    "A",
    "S",
    "O",
    "N",
    "D"
];
function months(length) {
    switch(length){
        case "narrow":
            return [].concat(monthsNarrow);
        case "short":
            return [].concat(monthsShort);
        case "long":
            return [].concat(monthsLong);
        case "numeric":
            return [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12"
            ];
        case "2-digit":
            return [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12"
            ];
        default:
            return null;
    }
}
var weekdaysLong = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];
var weekdaysShort = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
];
var weekdaysNarrow = [
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S"
];
function weekdays(length) {
    switch(length){
        case "narrow":
            return [].concat(weekdaysNarrow);
        case "short":
            return [].concat(weekdaysShort);
        case "long":
            return [].concat(weekdaysLong);
        case "numeric":
            return [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7"
            ];
        default:
            return null;
    }
}
var meridiems = [
    "AM",
    "PM"
];
var erasLong = [
    "Before Christ",
    "Anno Domini"
];
var erasShort = [
    "BC",
    "AD"
];
var erasNarrow = [
    "B",
    "A"
];
function eras(length) {
    switch(length){
        case "narrow":
            return [].concat(erasNarrow);
        case "short":
            return [].concat(erasShort);
        case "long":
            return [].concat(erasLong);
        default:
            return null;
    }
}
function meridiemForDateTime(dt) {
    return meridiems[dt.hour < 12 ? 0 : 1];
}
function weekdayForDateTime(dt, length) {
    return weekdays(length)[dt.weekday - 1];
}
function monthForDateTime(dt, length) {
    return months(length)[dt.month - 1];
}
function eraForDateTime(dt, length) {
    return eras(length)[dt.year < 0 ? 0 : 1];
}
function formatRelativeTime(unit, count, numeric, narrow) {
    if (numeric === void 0) numeric = "always";
    if (narrow === void 0) narrow = false;
    var units = {
        years: [
            "year",
            "yr."
        ],
        quarters: [
            "quarter",
            "qtr."
        ],
        months: [
            "month",
            "mo."
        ],
        weeks: [
            "week",
            "wk."
        ],
        days: [
            "day",
            "day",
            "days"
        ],
        hours: [
            "hour",
            "hr."
        ],
        minutes: [
            "minute",
            "min."
        ],
        seconds: [
            "second",
            "sec."
        ]
    };
    var lastable = [
        "hours",
        "minutes",
        "seconds"
    ].indexOf(unit) === -1;
    if (numeric === "auto" && lastable) {
        var isDay = unit === "days";
        switch(count){
            case 1:
                return isDay ? "tomorrow" : "next " + units[unit][0];
            case -1:
                return isDay ? "yesterday" : "last " + units[unit][0];
            case 0:
                return isDay ? "today" : "this " + units[unit][0];
        }
    }
    var isInPast = Object.is(count, -0) || count < 0, fmtValue = Math.abs(count), singular = fmtValue === 1, lilUnits = units[unit], fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
    return isInPast ? fmtValue + " " + fmtUnit + " ago" : "in " + fmtValue + " " + fmtUnit;
}
function formatString(knownFormat) {
    // these all have the offsets removed because we don't have access to them
    // without all the intl stuff this is backfilling
    var filtered = pick(knownFormat, [
        "weekday",
        "era",
        "year",
        "month",
        "day",
        "hour",
        "minute",
        "second",
        "timeZoneName",
        "hour12"
    ]), key = stringify(filtered), dateTimeHuge = "EEEE, LLLL d, yyyy, h:mm a";
    switch(key){
        case stringify(DATE_SHORT):
            return "M/d/yyyy";
        case stringify(DATE_MED):
            return "LLL d, yyyy";
        case stringify(DATE_MED_WITH_WEEKDAY):
            return "EEE, LLL d, yyyy";
        case stringify(DATE_FULL):
            return "LLLL d, yyyy";
        case stringify(DATE_HUGE):
            return "EEEE, LLLL d, yyyy";
        case stringify(TIME_SIMPLE):
            return "h:mm a";
        case stringify(TIME_WITH_SECONDS):
            return "h:mm:ss a";
        case stringify(TIME_WITH_SHORT_OFFSET):
            return "h:mm a";
        case stringify(TIME_WITH_LONG_OFFSET):
            return "h:mm a";
        case stringify(TIME_24_SIMPLE):
            return "HH:mm";
        case stringify(TIME_24_WITH_SECONDS):
            return "HH:mm:ss";
        case stringify(TIME_24_WITH_SHORT_OFFSET):
            return "HH:mm";
        case stringify(TIME_24_WITH_LONG_OFFSET):
            return "HH:mm";
        case stringify(DATETIME_SHORT):
            return "M/d/yyyy, h:mm a";
        case stringify(DATETIME_MED):
            return "LLL d, yyyy, h:mm a";
        case stringify(DATETIME_FULL):
            return "LLLL d, yyyy, h:mm a";
        case stringify(DATETIME_HUGE):
            return dateTimeHuge;
        case stringify(DATETIME_SHORT_WITH_SECONDS):
            return "M/d/yyyy, h:mm:ss a";
        case stringify(DATETIME_MED_WITH_SECONDS):
            return "LLL d, yyyy, h:mm:ss a";
        case stringify(DATETIME_MED_WITH_WEEKDAY):
            return "EEE, d LLL yyyy, h:mm a";
        case stringify(DATETIME_FULL_WITH_SECONDS):
            return "LLLL d, yyyy, h:mm:ss a";
        case stringify(DATETIME_HUGE_WITH_SECONDS):
            return "EEEE, LLLL d, yyyy, h:mm:ss a";
        default:
            return dateTimeHuge;
    }
}
function stringifyTokens(splits, tokenToString) {
    var s1 = "";
    for(var _iterator = _createForOfIteratorHelperLoose(splits), _step; !(_step = _iterator()).done;){
        var token = _step.value;
        if (token.literal) s1 += token.val;
        else s1 += tokenToString(token.val);
    }
    return s1;
}
var _macroTokenToFormatOpts = {
    D: DATE_SHORT,
    DD: DATE_MED,
    DDD: DATE_FULL,
    DDDD: DATE_HUGE,
    t: TIME_SIMPLE,
    tt: TIME_WITH_SECONDS,
    ttt: TIME_WITH_SHORT_OFFSET,
    tttt: TIME_WITH_LONG_OFFSET,
    T: TIME_24_SIMPLE,
    TT: TIME_24_WITH_SECONDS,
    TTT: TIME_24_WITH_SHORT_OFFSET,
    TTTT: TIME_24_WITH_LONG_OFFSET,
    f: DATETIME_SHORT,
    ff: DATETIME_MED,
    fff: DATETIME_FULL,
    ffff: DATETIME_HUGE,
    F: DATETIME_SHORT_WITH_SECONDS,
    FF: DATETIME_MED_WITH_SECONDS,
    FFF: DATETIME_FULL_WITH_SECONDS,
    FFFF: DATETIME_HUGE_WITH_SECONDS
};
/**
 * @private
 */ var Formatter = /*#__PURE__*/ function() {
    Formatter1.create = function create(locale, opts) {
        if (opts === void 0) opts = {
        };
        return new Formatter1(locale, opts);
    };
    Formatter1.parseFormat = function parseFormat(fmt) {
        var current = null, currentFull = "", bracketed = false;
        var splits = [];
        for(var i = 0; i < fmt.length; i++){
            var c = fmt.charAt(i);
            if (c === "'") {
                if (currentFull.length > 0) splits.push({
                    literal: bracketed,
                    val: currentFull
                });
                current = null;
                currentFull = "";
                bracketed = !bracketed;
            } else if (bracketed) currentFull += c;
            else if (c === current) currentFull += c;
            else {
                if (currentFull.length > 0) splits.push({
                    literal: false,
                    val: currentFull
                });
                currentFull = c;
                current = c;
            }
        }
        if (currentFull.length > 0) splits.push({
            literal: bracketed,
            val: currentFull
        });
        return splits;
    };
    Formatter1.macroTokenToFormatOpts = function macroTokenToFormatOpts(token) {
        return _macroTokenToFormatOpts[token];
    };
    function Formatter1(locale, formatOpts) {
        this.opts = formatOpts;
        this.loc = locale;
        this.systemLoc = null;
    }
    var _proto = Formatter1.prototype;
    _proto.formatWithSystemDefault = function formatWithSystemDefault(dt, opts) {
        if (this.systemLoc === null) this.systemLoc = this.loc.redefaultToSystem();
        var df = this.systemLoc.dtFormatter(dt, Object.assign({
        }, this.opts, opts));
        return df.format();
    };
    _proto.formatDateTime = function formatDateTime(dt, opts) {
        if (opts === void 0) opts = {
        };
        var df = this.loc.dtFormatter(dt, Object.assign({
        }, this.opts, opts));
        return df.format();
    };
    _proto.formatDateTimeParts = function formatDateTimeParts(dt, opts) {
        if (opts === void 0) opts = {
        };
        var df = this.loc.dtFormatter(dt, Object.assign({
        }, this.opts, opts));
        return df.formatToParts();
    };
    _proto.resolvedOptions = function resolvedOptions(dt, opts) {
        if (opts === void 0) opts = {
        };
        var df = this.loc.dtFormatter(dt, Object.assign({
        }, this.opts, opts));
        return df.resolvedOptions();
    };
    _proto.num = function num(n4, p) {
        if (p === void 0) p = 0;
        // we get some perf out of doing this here, annoyingly
        if (this.opts.forceSimple) return padStart(n4, p);
        var opts = Object.assign({
        }, this.opts);
        if (p > 0) opts.padTo = p;
        return this.loc.numberFormatter(opts).format(n4);
    };
    _proto.formatDateTimeFromString = function formatDateTimeFromString(dt, fmt) {
        var _this = this;
        var knownEnglish = this.loc.listingMode() === "en", useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory" && hasFormatToParts(), string = function string(opts, extract) {
            return _this.loc.extract(dt, opts, extract);
        }, formatOffset1 = function formatOffset(opts) {
            if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) return "Z";
            return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
        }, meridiem = function meridiem() {
            return knownEnglish ? meridiemForDateTime(dt) : string({
                hour: "numeric",
                hour12: true
            }, "dayperiod");
        }, month = function month(length, standalone) {
            return knownEnglish ? monthForDateTime(dt, length) : string(standalone ? {
                month: length
            } : {
                month: length,
                day: "numeric"
            }, "month");
        }, weekday = function weekday(length, standalone) {
            return knownEnglish ? weekdayForDateTime(dt, length) : string(standalone ? {
                weekday: length
            } : {
                weekday: length,
                month: "long",
                day: "numeric"
            }, "weekday");
        }, maybeMacro = function maybeMacro(token) {
            var formatOpts = Formatter1.macroTokenToFormatOpts(token);
            if (formatOpts) return _this.formatWithSystemDefault(dt, formatOpts);
            else return token;
        }, era = function era(length) {
            return knownEnglish ? eraForDateTime(dt, length) : string({
                era: length
            }, "era");
        }, tokenToString = function tokenToString(token) {
            // Where possible: http://cldr.unicode.org/translation/date-time-1/date-time#TOC-Standalone-vs.-Format-Styles
            switch(token){
                // ms
                case "S":
                    return _this.num(dt.millisecond);
                case "u":
                case "SSS":
                    return _this.num(dt.millisecond, 3);
                // seconds
                case "s":
                    return _this.num(dt.second);
                case "ss":
                    return _this.num(dt.second, 2);
                // minutes
                case "m":
                    return _this.num(dt.minute);
                case "mm":
                    return _this.num(dt.minute, 2);
                // hours
                case "h":
                    return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
                case "hh":
                    return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
                case "H":
                    return _this.num(dt.hour);
                case "HH":
                    return _this.num(dt.hour, 2);
                // offset
                case "Z":
                    // like +6
                    return formatOffset1({
                        format: "narrow",
                        allowZ: _this.opts.allowZ
                    });
                case "ZZ":
                    // like +06:00
                    return formatOffset1({
                        format: "short",
                        allowZ: _this.opts.allowZ
                    });
                case "ZZZ":
                    // like +0600
                    return formatOffset1({
                        format: "techie",
                        allowZ: _this.opts.allowZ
                    });
                case "ZZZZ":
                    // like EST
                    return dt.zone.offsetName(dt.ts, {
                        format: "short",
                        locale: _this.loc.locale
                    });
                case "ZZZZZ":
                    // like Eastern Standard Time
                    return dt.zone.offsetName(dt.ts, {
                        format: "long",
                        locale: _this.loc.locale
                    });
                // zone
                case "z":
                    // like America/New_York
                    return dt.zoneName;
                // meridiems
                case "a":
                    return meridiem();
                // dates
                case "d":
                    return useDateTimeFormatter ? string({
                        day: "numeric"
                    }, "day") : _this.num(dt.day);
                case "dd":
                    return useDateTimeFormatter ? string({
                        day: "2-digit"
                    }, "day") : _this.num(dt.day, 2);
                // weekdays - standalone
                case "c":
                    // like 1
                    return _this.num(dt.weekday);
                case "ccc":
                    // like 'Tues'
                    return weekday("short", true);
                case "cccc":
                    // like 'Tuesday'
                    return weekday("long", true);
                case "ccccc":
                    // like 'T'
                    return weekday("narrow", true);
                // weekdays - format
                case "E":
                    // like 1
                    return _this.num(dt.weekday);
                case "EEE":
                    // like 'Tues'
                    return weekday("short", false);
                case "EEEE":
                    // like 'Tuesday'
                    return weekday("long", false);
                case "EEEEE":
                    // like 'T'
                    return weekday("narrow", false);
                // months - standalone
                case "L":
                    // like 1
                    return useDateTimeFormatter ? string({
                        month: "numeric",
                        day: "numeric"
                    }, "month") : _this.num(dt.month);
                case "LL":
                    // like 01, doesn't seem to work
                    return useDateTimeFormatter ? string({
                        month: "2-digit",
                        day: "numeric"
                    }, "month") : _this.num(dt.month, 2);
                case "LLL":
                    // like Jan
                    return month("short", true);
                case "LLLL":
                    // like January
                    return month("long", true);
                case "LLLLL":
                    // like J
                    return month("narrow", true);
                // months - format
                case "M":
                    // like 1
                    return useDateTimeFormatter ? string({
                        month: "numeric"
                    }, "month") : _this.num(dt.month);
                case "MM":
                    // like 01
                    return useDateTimeFormatter ? string({
                        month: "2-digit"
                    }, "month") : _this.num(dt.month, 2);
                case "MMM":
                    // like Jan
                    return month("short", false);
                case "MMMM":
                    // like January
                    return month("long", false);
                case "MMMMM":
                    // like J
                    return month("narrow", false);
                // years
                case "y":
                    // like 2014
                    return useDateTimeFormatter ? string({
                        year: "numeric"
                    }, "year") : _this.num(dt.year);
                case "yy":
                    // like 14
                    return useDateTimeFormatter ? string({
                        year: "2-digit"
                    }, "year") : _this.num(dt.year.toString().slice(-2), 2);
                case "yyyy":
                    // like 0012
                    return useDateTimeFormatter ? string({
                        year: "numeric"
                    }, "year") : _this.num(dt.year, 4);
                case "yyyyyy":
                    // like 000012
                    return useDateTimeFormatter ? string({
                        year: "numeric"
                    }, "year") : _this.num(dt.year, 6);
                // eras
                case "G":
                    // like AD
                    return era("short");
                case "GG":
                    // like Anno Domini
                    return era("long");
                case "GGGGG":
                    return era("narrow");
                case "kk":
                    return _this.num(dt.weekYear.toString().slice(-2), 2);
                case "kkkk":
                    return _this.num(dt.weekYear, 4);
                case "W":
                    return _this.num(dt.weekNumber);
                case "WW":
                    return _this.num(dt.weekNumber, 2);
                case "o":
                    return _this.num(dt.ordinal);
                case "ooo":
                    return _this.num(dt.ordinal, 3);
                case "q":
                    // like 1
                    return _this.num(dt.quarter);
                case "qq":
                    // like 01
                    return _this.num(dt.quarter, 2);
                case "X":
                    return _this.num(Math.floor(dt.ts / 1000));
                case "x":
                    return _this.num(dt.ts);
                default:
                    return maybeMacro(token);
            }
        };
        return stringifyTokens(Formatter1.parseFormat(fmt), tokenToString);
    };
    _proto.formatDurationFromString = function formatDurationFromString(dur, fmt) {
        var _this2 = this;
        var tokenToField = function tokenToField(token) {
            switch(token[0]){
                case "S":
                    return "millisecond";
                case "s":
                    return "second";
                case "m":
                    return "minute";
                case "h":
                    return "hour";
                case "d":
                    return "day";
                case "M":
                    return "month";
                case "y":
                    return "year";
                default:
                    return null;
            }
        }, tokenToString = function tokenToString(lildur) {
            return function(token) {
                var mapped = tokenToField(token);
                if (mapped) return _this2.num(lildur.get(mapped), token.length);
                else return token;
            };
        }, tokens = Formatter1.parseFormat(fmt), realTokens = tokens.reduce(function(found, _ref) {
            var literal = _ref.literal, val = _ref.val;
            return literal ? found : found.concat(val);
        }, []), collapsed = dur.shiftTo.apply(dur, realTokens.map(tokenToField).filter(function(t) {
            return t;
        }));
        return stringifyTokens(tokens, tokenToString(collapsed));
    };
    return Formatter1;
}();
var Invalid = /*#__PURE__*/ function() {
    function Invalid1(reason, explanation) {
        this.reason = reason;
        this.explanation = explanation;
    }
    var _proto = Invalid1.prototype;
    _proto.toMessage = function toMessage() {
        if (this.explanation) return this.reason + ": " + this.explanation;
        else return this.reason;
    };
    return Invalid1;
}();
/**
 * @interface
 */ var Zone = /*#__PURE__*/ function() {
    function Zone1() {
    }
    var _proto = Zone1.prototype;
    /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */ _proto.offsetName = function offsetName(ts, opts) {
        throw new ZoneIsAbstractError();
    };
    _proto.formatOffset = function formatOffset(ts, format) {
        throw new ZoneIsAbstractError();
    };
    _proto.offset = function offset(ts) {
        throw new ZoneIsAbstractError();
    };
    _proto.equals = function equals(otherZone) {
        throw new ZoneIsAbstractError();
    };
    _createClass(Zone1, [
        {
            key: "type",
            /**
     * The type of zone
     * @abstract
     * @type {string}
     */ get: function get() {
                throw new ZoneIsAbstractError();
            }
        },
        {
            key: "name",
            get: function get() {
                throw new ZoneIsAbstractError();
            }
        },
        {
            key: "universal",
            get: function get() {
                throw new ZoneIsAbstractError();
            }
        },
        {
            key: "isValid",
            get: function get() {
                throw new ZoneIsAbstractError();
            }
        }
    ]);
    return Zone1;
}();
var singleton = null;
/**
 * Represents the local zone for this JavaScript environment.
 * @implements {Zone}
 */ var LocalZone = /*#__PURE__*/ function(_Zone) {
    _inheritsLoose(LocalZone1, _Zone);
    function LocalZone1() {
        return _Zone.apply(this, arguments) || this;
    }
    var _proto = LocalZone1.prototype;
    /** @override **/ _proto.offsetName = function offsetName(ts, _ref) {
        var format = _ref.format, locale = _ref.locale;
        return parseZoneInfo(ts, format, locale);
    };
    _proto.formatOffset = function formatOffset$1(ts, format) {
        return formatOffset(this.offset(ts), format);
    };
    _proto.offset = function offset(ts) {
        return -new Date(ts).getTimezoneOffset();
    };
    _proto.equals = function equals(otherZone) {
        return otherZone.type === "local";
    };
    _createClass(LocalZone1, [
        {
            key: "type",
            /** @override **/ get: function get() {
                return "local";
            }
        },
        {
            key: "name",
            get: function get() {
                if (hasIntl()) return new Intl.DateTimeFormat().resolvedOptions().timeZone;
                else return "local";
            }
        },
        {
            key: "universal",
            get: function get() {
                return false;
            }
        },
        {
            key: "isValid",
            get: function get() {
                return true;
            }
        }
    ], [
        {
            key: "instance",
            /**
     * Get a singleton instance of the local zone
     * @return {LocalZone}
     */ get: function get() {
                if (singleton === null) singleton = new LocalZone1();
                return singleton;
            }
        }
    ]);
    return LocalZone1;
}(Zone);
var matchingRegex = RegExp("^" + ianaRegex.source + "$");
var dtfCache = {
};
function makeDTF(zone) {
    if (!dtfCache[zone]) dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
        hour12: false,
        timeZone: zone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
    return dtfCache[zone];
}
var typeToPos = {
    year: 0,
    month: 1,
    day: 2,
    hour: 3,
    minute: 4,
    second: 5
};
function hackyOffset(dtf, date) {
    var formatted = dtf.format(date).replace(/\u200E/g, ""), parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted), fMonth = parsed[1], fDay = parsed[2], fYear = parsed[3], fHour = parsed[4], fMinute = parsed[5], fSecond = parsed[6];
    return [
        fYear,
        fMonth,
        fDay,
        fHour,
        fMinute,
        fSecond
    ];
}
function partsOffset(dtf, date) {
    var formatted = dtf.formatToParts(date), filled = [];
    for(var i = 0; i < formatted.length; i++){
        var _formatted$i = formatted[i], type = _formatted$i.type, value = _formatted$i.value, pos = typeToPos[type];
        if (!isUndefined(pos)) filled[pos] = parseInt(value, 10);
    }
    return filled;
}
var ianaZoneCache = {
};
/**
 * A zone identified by an IANA identifier, like America/New_York
 * @implements {Zone}
 */ var IANAZone = /*#__PURE__*/ function(_Zone) {
    _inheritsLoose(IANAZone1, _Zone);
    /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */ IANAZone1.create = function create(name) {
        if (!ianaZoneCache[name]) ianaZoneCache[name] = new IANAZone1(name);
        return ianaZoneCache[name];
    };
    IANAZone1.resetCache = function resetCache() {
        ianaZoneCache = {
        };
        dtfCache = {
        };
    };
    IANAZone1.isValidSpecifier = function isValidSpecifier(s2) {
        return !!(s2 && s2.match(matchingRegex));
    };
    IANAZone1.isValidZone = function isValidZone(zone) {
        try {
            new Intl.DateTimeFormat("en-US", {
                timeZone: zone
            }).format();
            return true;
        } catch (e) {
            return false;
        }
    } // Etc/GMT+8 -> -480
    ;
    IANAZone1.parseGMTOffset = function parseGMTOffset(specifier) {
        if (specifier) {
            var match1 = specifier.match(/^Etc\/GMT(0|[+-]\d{1,2})$/i);
            if (match1) return -60 * parseInt(match1[1]);
        }
        return null;
    };
    function IANAZone1(name) {
        var _this;
        _this = _Zone.call(this) || this;
        /** @private **/ _this.zoneName = name;
        /** @private **/ _this.valid = IANAZone1.isValidZone(name);
        return _this;
    }
    /** @override **/ var _proto = IANAZone1.prototype;
    /** @override **/ _proto.offsetName = function offsetName(ts, _ref) {
        var format = _ref.format, locale = _ref.locale;
        return parseZoneInfo(ts, format, locale, this.name);
    };
    _proto.formatOffset = function formatOffset$1(ts, format) {
        return formatOffset(this.offset(ts), format);
    };
    _proto.offset = function offset(ts) {
        var date = new Date(ts);
        if (isNaN(date)) return NaN;
        var dtf = makeDTF(this.name), _ref2 = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date), year = _ref2[0], month = _ref2[1], day = _ref2[2], hour = _ref2[3], minute = _ref2[4], second = _ref2[5], adjustedHour = hour === 24 ? 0 : hour;
        var asUTC = objToLocalTS({
            year: year,
            month: month,
            day: day,
            hour: adjustedHour,
            minute: minute,
            second: second,
            millisecond: 0
        });
        var asTS = +date;
        var over = asTS % 1000;
        asTS -= over >= 0 ? over : 1000 + over;
        return (asUTC - asTS) / 60000;
    };
    _proto.equals = function equals(otherZone) {
        return otherZone.type === "iana" && otherZone.name === this.name;
    };
    _createClass(IANAZone1, [
        {
            key: "type",
            get: function get() {
                return "iana";
            }
        },
        {
            key: "name",
            get: function get() {
                return this.zoneName;
            }
        },
        {
            key: "universal",
            get: function get() {
                return false;
            }
        },
        {
            key: "isValid",
            get: function get() {
                return this.valid;
            }
        }
    ]);
    return IANAZone1;
}(Zone);
var singleton$1 = null;
/**
 * A zone with a fixed offset (meaning no DST)
 * @implements {Zone}
 */ var FixedOffsetZone = /*#__PURE__*/ function(_Zone) {
    _inheritsLoose(FixedOffsetZone1, _Zone);
    /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */ FixedOffsetZone1.instance = function instance(offset2) {
        return offset2 === 0 ? FixedOffsetZone1.utcInstance : new FixedOffsetZone1(offset2);
    };
    FixedOffsetZone1.parseSpecifier = function parseSpecifier(s3) {
        if (s3) {
            var r = s3.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
            if (r) return new FixedOffsetZone1(signedOffset(r[1], r[2]));
        }
        return null;
    };
    _createClass(FixedOffsetZone1, null, [
        {
            key: "utcInstance",
            /**
     * Get a singleton instance of UTC
     * @return {FixedOffsetZone}
     */ get: function get() {
                if (singleton$1 === null) singleton$1 = new FixedOffsetZone1(0);
                return singleton$1;
            }
        }
    ]);
    function FixedOffsetZone1(offset3) {
        var _this;
        _this = _Zone.call(this) || this;
        /** @private **/ _this.fixed = offset3;
        return _this;
    }
    /** @override **/ var _proto = FixedOffsetZone1.prototype;
    /** @override **/ _proto.offsetName = function offsetName() {
        return this.name;
    };
    _proto.formatOffset = function formatOffset$1(ts, format) {
        return formatOffset(this.fixed, format);
    };
    /** @override **/ _proto.offset = function offset() {
        return this.fixed;
    };
    _proto.equals = function equals(otherZone) {
        return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
    };
    _createClass(FixedOffsetZone1, [
        {
            key: "type",
            get: function get() {
                return "fixed";
            }
        },
        {
            key: "name",
            get: function get() {
                return this.fixed === 0 ? "UTC" : "UTC" + formatOffset(this.fixed, "narrow");
            }
        },
        {
            key: "universal",
            get: function get() {
                return true;
            }
        },
        {
            key: "isValid",
            get: function get() {
                return true;
            }
        }
    ]);
    return FixedOffsetZone1;
}(Zone);
/**
 * A zone that failed to parse. You should never need to instantiate this.
 * @implements {Zone}
 */ var InvalidZone = /*#__PURE__*/ function(_Zone) {
    _inheritsLoose(InvalidZone1, _Zone);
    function InvalidZone1(zoneName) {
        var _this;
        _this = _Zone.call(this) || this;
        /**  @private */ _this.zoneName = zoneName;
        return _this;
    }
    /** @override **/ var _proto = InvalidZone1.prototype;
    /** @override **/ _proto.offsetName = function offsetName() {
        return null;
    };
    _proto.formatOffset = function formatOffset() {
        return "";
    };
    _proto.offset = function offset() {
        return NaN;
    };
    _proto.equals = function equals() {
        return false;
    };
    _createClass(InvalidZone1, [
        {
            key: "type",
            get: function get() {
                return "invalid";
            }
        },
        {
            key: "name",
            get: function get() {
                return this.zoneName;
            }
        },
        {
            key: "universal",
            get: function get() {
                return false;
            }
        },
        {
            key: "isValid",
            get: function get() {
                return false;
            }
        }
    ]);
    return InvalidZone1;
}(Zone);
/**
 * @private
 */ function normalizeZone(input, defaultZone1) {
    var offset4;
    if (isUndefined(input) || input === null) return defaultZone1;
    else if (input instanceof Zone) return input;
    else if (isString(input)) {
        var lowered = input.toLowerCase();
        if (lowered === "local") return defaultZone1;
        else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;
        else if ((offset4 = IANAZone.parseGMTOffset(input)) != null) // handle Etc/GMT-4, which V8 chokes on
        return FixedOffsetZone.instance(offset4);
        else if (IANAZone.isValidSpecifier(lowered)) return IANAZone.create(input);
        else return FixedOffsetZone.parseSpecifier(lowered) || new InvalidZone(input);
    } else if (isNumber(input)) return FixedOffsetZone.instance(input);
    else if (typeof input === "object" && input.offset && typeof input.offset === "number") // This is dumb, but the instanceof check above doesn't seem to really work
    // so we're duck checking it
    return input;
    else return new InvalidZone(input);
}
var now = function now() {
    return Date.now();
}, defaultZone = null, // not setting this directly to LocalZone.instance bc loading order issues
defaultLocale = null, defaultNumberingSystem = null, defaultOutputCalendar = null, throwOnInvalid = false;
/**
 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
 */ var Settings = /*#__PURE__*/ function() {
    function Settings1() {
    }
    /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */ Settings1.resetCaches = function resetCaches() {
        Locale.resetCache();
        IANAZone.resetCache();
    };
    _createClass(Settings1, null, [
        {
            key: "now",
            /**
     * Get the callback for returning the current timestamp.
     * @type {function}
     */ get: function get() {
                return now;
            },
            set: function set(n5) {
                now = n5;
            }
        },
        {
            key: "defaultZoneName",
            get: function get() {
                return Settings1.defaultZone.name;
            },
            set: function set(z) {
                if (!z) defaultZone = null;
                else defaultZone = normalizeZone(z);
            }
        },
        {
            key: "defaultZone",
            get: function get() {
                return defaultZone || LocalZone.instance;
            }
        },
        {
            key: "defaultLocale",
            get: function get() {
                return defaultLocale;
            },
            set: function set(locale) {
                defaultLocale = locale;
            }
        },
        {
            key: "defaultNumberingSystem",
            get: function get() {
                return defaultNumberingSystem;
            },
            set: function set(numberingSystem) {
                defaultNumberingSystem = numberingSystem;
            }
        },
        {
            key: "defaultOutputCalendar",
            get: function get() {
                return defaultOutputCalendar;
            },
            set: function set(outputCalendar) {
                defaultOutputCalendar = outputCalendar;
            }
        },
        {
            key: "throwOnInvalid",
            get: function get() {
                return throwOnInvalid;
            },
            set: function set(t) {
                throwOnInvalid = t;
            }
        }
    ]);
    return Settings1;
}();
var intlDTCache = {
};
function getCachedDTF(locString, opts) {
    if (opts === void 0) opts = {
    };
    var key = JSON.stringify([
        locString,
        opts
    ]);
    var dtf = intlDTCache[key];
    if (!dtf) {
        dtf = new Intl.DateTimeFormat(locString, opts);
        intlDTCache[key] = dtf;
    }
    return dtf;
}
var intlNumCache = {
};
function getCachedINF(locString, opts) {
    if (opts === void 0) opts = {
    };
    var key = JSON.stringify([
        locString,
        opts
    ]);
    var inf = intlNumCache[key];
    if (!inf) {
        inf = new Intl.NumberFormat(locString, opts);
        intlNumCache[key] = inf;
    }
    return inf;
}
var intlRelCache = {
};
function getCachedRTF(locString, opts) {
    if (opts === void 0) opts = {
    };
    var _opts = opts, base = _opts.base, cacheKeyOpts = _objectWithoutPropertiesLoose(_opts, [
        "base"
    ]); // exclude `base` from the options
    var key = JSON.stringify([
        locString,
        cacheKeyOpts
    ]);
    var inf = intlRelCache[key];
    if (!inf) {
        inf = new Intl.RelativeTimeFormat(locString, opts);
        intlRelCache[key] = inf;
    }
    return inf;
}
var sysLocaleCache = null;
function systemLocale() {
    if (sysLocaleCache) return sysLocaleCache;
    else if (hasIntl()) {
        var computedSys = new Intl.DateTimeFormat().resolvedOptions().locale; // node sometimes defaults to "und". Override that because that is dumb
        sysLocaleCache = !computedSys || computedSys === "und" ? "en-US" : computedSys;
        return sysLocaleCache;
    } else {
        sysLocaleCache = "en-US";
        return sysLocaleCache;
    }
}
function parseLocaleString(localeStr) {
    // I really want to avoid writing a BCP 47 parser
    // see, e.g. https://github.com/wooorm/bcp-47
    // Instead, we'll do this:
    // a) if the string has no -u extensions, just leave it alone
    // b) if it does, use Intl to resolve everything
    // c) if Intl fails, try again without the -u
    var uIndex = localeStr.indexOf("-u-");
    if (uIndex === -1) return [
        localeStr
    ];
    else {
        var options;
        var smaller = localeStr.substring(0, uIndex);
        try {
            options = getCachedDTF(localeStr).resolvedOptions();
        } catch (e) {
            options = getCachedDTF(smaller).resolvedOptions();
        }
        var _options = options, numberingSystem = _options.numberingSystem, calendar = _options.calendar; // return the smaller one so that we can append the calendar and numbering overrides to it
        return [
            smaller,
            numberingSystem,
            calendar
        ];
    }
}
function intlConfigString(localeStr, numberingSystem, outputCalendar) {
    if (hasIntl()) {
        if (outputCalendar || numberingSystem) {
            localeStr += "-u";
            if (outputCalendar) localeStr += "-ca-" + outputCalendar;
            if (numberingSystem) localeStr += "-nu-" + numberingSystem;
            return localeStr;
        } else return localeStr;
    } else return [];
}
function mapMonths(f) {
    var ms = [];
    for(var i = 1; i <= 12; i++){
        var dt = DateTime.utc(2016, i, 1);
        ms.push(f(dt));
    }
    return ms;
}
function mapWeekdays(f) {
    var ms = [];
    for(var i = 1; i <= 7; i++){
        var dt = DateTime.utc(2016, 11, 13 + i);
        ms.push(f(dt));
    }
    return ms;
}
function listStuff(loc, length, defaultOK, englishFn, intlFn) {
    var mode = loc.listingMode(defaultOK);
    if (mode === "error") return null;
    else if (mode === "en") return englishFn(length);
    else return intlFn(length);
}
function supportsFastNumbers(loc) {
    if (loc.numberingSystem && loc.numberingSystem !== "latn") return false;
    else return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || hasIntl() && new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn";
}
/**
 * @private
 */ var PolyNumberFormatter = /*#__PURE__*/ function() {
    function PolyNumberFormatter1(intl, forceSimple, opts) {
        this.padTo = opts.padTo || 0;
        this.floor = opts.floor || false;
        if (!forceSimple && hasIntl()) {
            var intlOpts = {
                useGrouping: false
            };
            if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
            this.inf = getCachedINF(intl, intlOpts);
        }
    }
    var _proto = PolyNumberFormatter1.prototype;
    _proto.format = function format(i) {
        if (this.inf) {
            var fixed = this.floor ? Math.floor(i) : i;
            return this.inf.format(fixed);
        } else {
            // to match the browser's numberformatter defaults
            var _fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
            return padStart(_fixed, this.padTo);
        }
    };
    return PolyNumberFormatter1;
}();
/**
 * @private
 */ var PolyDateFormatter = /*#__PURE__*/ function() {
    function PolyDateFormatter1(dt, intl, opts) {
        this.opts = opts;
        this.hasIntl = hasIntl();
        var z;
        if (dt.zone.universal && this.hasIntl) {
            // UTC-8 or Etc/UTC-8 are not part of tzdata, only Etc/GMT+8 and the like.
            // That is why fixed-offset TZ is set to that unless it is:
            // 1. Representing offset 0 when UTC is used to maintain previous behavior and does not become GMT.
            // 2. Unsupported by the browser:
            //    - some do not support Etc/
            //    - < Etc/GMT-14, > Etc/GMT+12, and 30-minute or 45-minute offsets are not part of tzdata
            var gmtOffset = -1 * (dt.offset / 60);
            var offsetZ = gmtOffset >= 0 ? "Etc/GMT+" + gmtOffset : "Etc/GMT" + gmtOffset;
            var isOffsetZoneSupported = IANAZone.isValidZone(offsetZ);
            if (dt.offset !== 0 && isOffsetZoneSupported) {
                z = offsetZ;
                this.dt = dt;
            } else {
                // Not all fixed-offset zones like Etc/+4:30 are present in tzdata.
                // So we have to make do. Two cases:
                // 1. The format options tell us to show the zone. We can't do that, so the best
                // we can do is format the date in UTC.
                // 2. The format options don't tell us to show the zone. Then we can adjust them
                // the time and tell the formatter to show it to us in UTC, so that the time is right
                // and the bad zone doesn't show up.
                z = "UTC";
                if (opts.timeZoneName) this.dt = dt;
                else this.dt = dt.offset === 0 ? dt : DateTime.fromMillis(dt.ts + dt.offset * 60000);
            }
        } else if (dt.zone.type === "local") this.dt = dt;
        else {
            this.dt = dt;
            z = dt.zone.name;
        }
        if (this.hasIntl) {
            var intlOpts = Object.assign({
            }, this.opts);
            if (z) intlOpts.timeZone = z;
            this.dtf = getCachedDTF(intl, intlOpts);
        }
    }
    var _proto2 = PolyDateFormatter1.prototype;
    _proto2.format = function format() {
        if (this.hasIntl) return this.dtf.format(this.dt.toJSDate());
        else {
            var tokenFormat = formatString(this.opts), loc = Locale.create("en-US");
            return Formatter.create(loc).formatDateTimeFromString(this.dt, tokenFormat);
        }
    };
    _proto2.formatToParts = function formatToParts() {
        if (this.hasIntl && hasFormatToParts()) return this.dtf.formatToParts(this.dt.toJSDate());
        else // This is kind of a cop out. We actually could do this for English. However, we couldn't do it for intl strings
        // and IMO it's too weird to have an uncanny valley like that
        return [];
    };
    _proto2.resolvedOptions = function resolvedOptions() {
        if (this.hasIntl) return this.dtf.resolvedOptions();
        else return {
            locale: "en-US",
            numberingSystem: "latn",
            outputCalendar: "gregory"
        };
    };
    return PolyDateFormatter1;
}();
/**
 * @private
 */ var PolyRelFormatter = /*#__PURE__*/ function() {
    function PolyRelFormatter1(intl, isEnglish, opts) {
        this.opts = Object.assign({
            style: "long"
        }, opts);
        if (!isEnglish && hasRelative()) this.rtf = getCachedRTF(intl, opts);
    }
    var _proto3 = PolyRelFormatter1.prototype;
    _proto3.format = function format(count, unit) {
        if (this.rtf) return this.rtf.format(count, unit);
        else return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
    };
    _proto3.formatToParts = function formatToParts(count, unit) {
        if (this.rtf) return this.rtf.formatToParts(count, unit);
        else return [];
    };
    return PolyRelFormatter1;
}();
/**
 * @private
 */ var Locale = /*#__PURE__*/ function() {
    Locale1.fromOpts = function fromOpts(opts) {
        return Locale1.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
    };
    Locale1.create = function create(locale, numberingSystem, outputCalendar, defaultToEN) {
        if (defaultToEN === void 0) defaultToEN = false;
        var specifiedLocale = locale || Settings.defaultLocale, // the system locale is useful for human readable strings but annoying for parsing/formatting known formats
        localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale()), numberingSystemR = numberingSystem || Settings.defaultNumberingSystem, outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
        return new Locale1(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
    };
    Locale1.resetCache = function resetCache() {
        sysLocaleCache = null;
        intlDTCache = {
        };
        intlNumCache = {
        };
        intlRelCache = {
        };
    };
    Locale1.fromObject = function fromObject(_temp) {
        var _ref = _temp === void 0 ? {
        } : _temp, locale = _ref.locale, numberingSystem = _ref.numberingSystem, outputCalendar = _ref.outputCalendar;
        return Locale1.create(locale, numberingSystem, outputCalendar);
    };
    function Locale1(locale, numbering, outputCalendar, specifiedLocale) {
        var _parseLocaleString = parseLocaleString(locale), parsedLocale = _parseLocaleString[0], parsedNumberingSystem = _parseLocaleString[1], parsedOutputCalendar = _parseLocaleString[2];
        this.locale = parsedLocale;
        this.numberingSystem = numbering || parsedNumberingSystem || null;
        this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
        this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
        this.weekdaysCache = {
            format: {
            },
            standalone: {
            }
        };
        this.monthsCache = {
            format: {
            },
            standalone: {
            }
        };
        this.meridiemCache = null;
        this.eraCache = {
        };
        this.specifiedLocale = specifiedLocale;
        this.fastNumbersCached = null;
    }
    var _proto4 = Locale1.prototype;
    _proto4.listingMode = function listingMode(defaultOK) {
        if (defaultOK === void 0) defaultOK = true;
        var intl = hasIntl(), hasFTP = intl && hasFormatToParts(), isActuallyEn = this.isEnglish(), hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
        if (!hasFTP && !(isActuallyEn && hasNoWeirdness) && !defaultOK) return "error";
        else if (!hasFTP || isActuallyEn && hasNoWeirdness) return "en";
        else return "intl";
    };
    _proto4.clone = function clone(alts) {
        if (!alts || Object.getOwnPropertyNames(alts).length === 0) return this;
        else return Locale1.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, alts.defaultToEN || false);
    };
    _proto4.redefaultToEN = function redefaultToEN(alts) {
        if (alts === void 0) alts = {
        };
        return this.clone(Object.assign({
        }, alts, {
            defaultToEN: true
        }));
    };
    _proto4.redefaultToSystem = function redefaultToSystem(alts) {
        if (alts === void 0) alts = {
        };
        return this.clone(Object.assign({
        }, alts, {
            defaultToEN: false
        }));
    };
    _proto4.months = function months$1(length, format, defaultOK) {
        var _this = this;
        if (format === void 0) format = false;
        if (defaultOK === void 0) defaultOK = true;
        return listStuff(this, length, defaultOK, months, function() {
            var intl = format ? {
                month: length,
                day: "numeric"
            } : {
                month: length
            }, formatStr = format ? "format" : "standalone";
            if (!_this.monthsCache[formatStr][length]) _this.monthsCache[formatStr][length] = mapMonths(function(dt) {
                return _this.extract(dt, intl, "month");
            });
            return _this.monthsCache[formatStr][length];
        });
    };
    _proto4.weekdays = function weekdays$1(length, format, defaultOK) {
        var _this2 = this;
        if (format === void 0) format = false;
        if (defaultOK === void 0) defaultOK = true;
        return listStuff(this, length, defaultOK, weekdays, function() {
            var intl = format ? {
                weekday: length,
                year: "numeric",
                month: "long",
                day: "numeric"
            } : {
                weekday: length
            }, formatStr = format ? "format" : "standalone";
            if (!_this2.weekdaysCache[formatStr][length]) _this2.weekdaysCache[formatStr][length] = mapWeekdays(function(dt) {
                return _this2.extract(dt, intl, "weekday");
            });
            return _this2.weekdaysCache[formatStr][length];
        });
    };
    _proto4.meridiems = function meridiems$1(defaultOK) {
        var _this3 = this;
        if (defaultOK === void 0) defaultOK = true;
        return listStuff(this, undefined, defaultOK, function() {
            return meridiems;
        }, function() {
            // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
            // for AM and PM. This is probably wrong, but it's makes parsing way easier.
            if (!_this3.meridiemCache) {
                var intl = {
                    hour: "numeric",
                    hour12: true
                };
                _this3.meridiemCache = [
                    DateTime.utc(2016, 11, 13, 9),
                    DateTime.utc(2016, 11, 13, 19)
                ].map(function(dt) {
                    return _this3.extract(dt, intl, "dayperiod");
                });
            }
            return _this3.meridiemCache;
        });
    };
    _proto4.eras = function eras$1(length, defaultOK) {
        var _this4 = this;
        if (defaultOK === void 0) defaultOK = true;
        return listStuff(this, length, defaultOK, eras, function() {
            var intl = {
                era: length
            }; // This is problematic. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
            // to definitely enumerate them.
            if (!_this4.eraCache[length]) _this4.eraCache[length] = [
                DateTime.utc(-40, 1, 1),
                DateTime.utc(2017, 1, 1)
            ].map(function(dt) {
                return _this4.extract(dt, intl, "era");
            });
            return _this4.eraCache[length];
        });
    };
    _proto4.extract = function extract(dt, intlOpts, field) {
        var df = this.dtFormatter(dt, intlOpts), results = df.formatToParts(), matching = results.find(function(m) {
            return m.type.toLowerCase() === field;
        });
        return matching ? matching.value : null;
    };
    _proto4.numberFormatter = function numberFormatter(opts) {
        if (opts === void 0) opts = {
        };
        // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
        // (in contrast, the rest of the condition is used heavily)
        return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
    };
    _proto4.dtFormatter = function dtFormatter(dt, intlOpts) {
        if (intlOpts === void 0) intlOpts = {
        };
        return new PolyDateFormatter(dt, this.intl, intlOpts);
    };
    _proto4.relFormatter = function relFormatter(opts) {
        if (opts === void 0) opts = {
        };
        return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
    };
    _proto4.isEnglish = function isEnglish() {
        return this.locale === "en" || this.locale.toLowerCase() === "en-us" || hasIntl() && new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
    };
    _proto4.equals = function equals(other) {
        return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
    };
    _createClass(Locale1, [
        {
            key: "fastNumbers",
            get: function get() {
                if (this.fastNumbersCached == null) this.fastNumbersCached = supportsFastNumbers(this);
                return this.fastNumbersCached;
            }
        }
    ]);
    return Locale1;
}();
/*
 * This file handles parsing for well-specified formats. Here's how it works:
 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
 */ function combineRegexes() {
    for(var _len = arguments.length, regexes = new Array(_len), _key = 0; _key < _len; _key++)regexes[_key] = arguments[_key];
    var full = regexes.reduce(function(f, r) {
        return f + r.source;
    }, "");
    return RegExp("^" + full + "$");
}
function combineExtractors() {
    for(var _len2 = arguments.length, extractors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)extractors[_key2] = arguments[_key2];
    return function(m) {
        return extractors.reduce(function(_ref, ex) {
            var mergedVals = _ref[0], mergedZone = _ref[1], cursor = _ref[2];
            var _ex = ex(m, cursor), val = _ex[0], zone = _ex[1], next = _ex[2];
            return [
                Object.assign(mergedVals, val),
                mergedZone || zone,
                next
            ];
        }, [
            {
            },
            null,
            1
        ]).slice(0, 2);
    };
}
function parse(s4) {
    if (s4 == null) return [
        null,
        null
    ];
    for(var _len3 = arguments.length, patterns = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++)patterns[_key3 - 1] = arguments[_key3];
    for(var _i = 0, _patterns = patterns; _i < _patterns.length; _i++){
        var _patterns$_i = _patterns[_i], regex = _patterns$_i[0], extractor = _patterns$_i[1];
        var m = regex.exec(s4);
        if (m) return extractor(m);
    }
    return [
        null,
        null
    ];
}
function simpleParse() {
    for(var _len4 = arguments.length, keys = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++)keys[_key4] = arguments[_key4];
    return function(match2, cursor) {
        var ret = {
        };
        var i;
        for(i = 0; i < keys.length; i++)ret[keys[i]] = parseInteger(match2[cursor + i]);
        return [
            ret,
            null,
            cursor + i
        ];
    };
} // ISO and SQL parsing
var offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, isoTimeRegex = RegExp("" + isoTimeBaseRegex.source + offsetRegex.source + "?"), isoTimeExtensionRegex = RegExp("(?:T" + isoTimeRegex.source + ")?"), isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/, isoOrdinalRegex = /(\d{4})-?(\d{3})/, extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay"), extractISOOrdinalData = simpleParse("year", "ordinal"), sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/, // dumbed-down version of the ISO one
sqlTimeRegex = RegExp(isoTimeBaseRegex.source + " ?(?:" + offsetRegex.source + "|(" + ianaRegex.source + "))?"), sqlTimeExtensionRegex = RegExp("(?: " + sqlTimeRegex.source + ")?");
function int(match3, pos, fallback) {
    var m = match3[pos];
    return isUndefined(m) ? fallback : parseInteger(m);
}
function extractISOYmd(match4, cursor) {
    var item = {
        year: int(match4, cursor),
        month: int(match4, cursor + 1, 1),
        day: int(match4, cursor + 2, 1)
    };
    return [
        item,
        null,
        cursor + 3
    ];
}
function extractISOTime(match5, cursor) {
    var item = {
        hours: int(match5, cursor, 0),
        minutes: int(match5, cursor + 1, 0),
        seconds: int(match5, cursor + 2, 0),
        milliseconds: parseMillis(match5[cursor + 3])
    };
    return [
        item,
        null,
        cursor + 4
    ];
}
function extractISOOffset(match6, cursor) {
    var local = !match6[cursor] && !match6[cursor + 1], fullOffset = signedOffset(match6[cursor + 1], match6[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
    return [
        {
        },
        zone,
        cursor + 3
    ];
}
function extractIANAZone(match7, cursor) {
    var zone = match7[cursor] ? IANAZone.create(match7[cursor]) : null;
    return [
        {
        },
        zone,
        cursor + 1
    ];
} // ISO time parsing
var isoTimeOnly = RegExp("^T?" + isoTimeBaseRegex.source + "$"); // ISO duration parsing
var isoDuration = /^-?P(?:(?:(-?\d{1,9})Y)?(?:(-?\d{1,9})M)?(?:(-?\d{1,9})W)?(?:(-?\d{1,9})D)?(?:T(?:(-?\d{1,9})H)?(?:(-?\d{1,9})M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;
function extractISODuration(match8) {
    var s5 = match8[0], yearStr = match8[1], monthStr = match8[2], weekStr = match8[3], dayStr = match8[4], hourStr = match8[5], minuteStr = match8[6], secondStr = match8[7], millisecondsStr = match8[8];
    var hasNegativePrefix = s5[0] === "-";
    var negativeSeconds = secondStr && secondStr[0] === "-";
    var maybeNegate = function maybeNegate(num, force) {
        if (force === void 0) force = false;
        return num !== undefined && (force || num && hasNegativePrefix) ? -num : num;
    };
    return [
        {
            years: maybeNegate(parseInteger(yearStr)),
            months: maybeNegate(parseInteger(monthStr)),
            weeks: maybeNegate(parseInteger(weekStr)),
            days: maybeNegate(parseInteger(dayStr)),
            hours: maybeNegate(parseInteger(hourStr)),
            minutes: maybeNegate(parseInteger(minuteStr)),
            seconds: maybeNegate(parseInteger(secondStr), secondStr === "-0"),
            milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
        }
    ];
} // These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
// and not just that we're in -240 *right now*. But since I don't think these are used that often
// I'm just going to ignore that
var obsOffsets = {
    GMT: 0,
    EDT: -240,
    EST: -300,
    CDT: -300,
    CST: -360,
    MDT: -360,
    MST: -420,
    PDT: -420,
    PST: -480
};
function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = {
        year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
        month: monthsShort.indexOf(monthStr) + 1,
        day: parseInteger(dayStr),
        hour: parseInteger(hourStr),
        minute: parseInteger(minuteStr)
    };
    if (secondStr) result.second = parseInteger(secondStr);
    if (weekdayStr) result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
    return result;
} // RFC 2822/5322
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function extractRFC2822(match9) {
    var weekdayStr = match9[1], dayStr = match9[2], monthStr = match9[3], yearStr = match9[4], hourStr = match9[5], minuteStr = match9[6], secondStr = match9[7], obsOffset = match9[8], milOffset = match9[9], offHourStr = match9[10], offMinuteStr = match9[11], result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    var offset5;
    if (obsOffset) offset5 = obsOffsets[obsOffset];
    else if (milOffset) offset5 = 0;
    else offset5 = signedOffset(offHourStr, offMinuteStr);
    return [
        result,
        new FixedOffsetZone(offset5)
    ];
}
function preprocessRFC2822(s6) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s6.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
} // http date
var rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function extractRFC1123Or850(match10) {
    var weekdayStr = match10[1], dayStr = match10[2], monthStr = match10[3], yearStr = match10[4], hourStr = match10[5], minuteStr = match10[6], secondStr = match10[7], result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    return [
        result,
        FixedOffsetZone.utcInstance
    ];
}
function extractASCII(match11) {
    var weekdayStr = match11[1], monthStr = match11[2], dayStr = match11[3], hourStr = match11[4], minuteStr = match11[5], secondStr = match11[6], yearStr = match11[7], result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    return [
        result,
        FixedOffsetZone.utcInstance
    ];
}
var isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
var isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
var isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
var isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
var extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset);
var extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset);
var extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset);
var extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset);
/**
 * @private
 */ function parseISODate(s7) {
    return parse(s7, [
        isoYmdWithTimeExtensionRegex,
        extractISOYmdTimeAndOffset
    ], [
        isoWeekWithTimeExtensionRegex,
        extractISOWeekTimeAndOffset
    ], [
        isoOrdinalWithTimeExtensionRegex,
        extractISOOrdinalDateAndTime
    ], [
        isoTimeCombinedRegex,
        extractISOTimeAndOffset
    ]);
}
function parseRFC2822Date(s8) {
    return parse(preprocessRFC2822(s8), [
        rfc2822,
        extractRFC2822
    ]);
}
function parseHTTPDate(s9) {
    return parse(s9, [
        rfc1123,
        extractRFC1123Or850
    ], [
        rfc850,
        extractRFC1123Or850
    ], [
        ascii,
        extractASCII
    ]);
}
function parseISODuration(s10) {
    return parse(s10, [
        isoDuration,
        extractISODuration
    ]);
}
var extractISOTimeOnly = combineExtractors(extractISOTime);
function parseISOTimeOnly(s11) {
    return parse(s11, [
        isoTimeOnly,
        extractISOTimeOnly
    ]);
}
var sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
var sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
var extractISOYmdTimeOffsetAndIANAZone = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
var extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
function parseSQL(s12) {
    return parse(s12, [
        sqlYmdWithTimeExtensionRegex,
        extractISOYmdTimeOffsetAndIANAZone
    ], [
        sqlTimeCombinedRegex,
        extractISOTimeOffsetAndIANAZone
    ]);
}
var INVALID = "Invalid Duration"; // unit conversion constants
var lowOrderMatrix = {
    weeks: {
        days: 7,
        hours: 168,
        minutes: 10080,
        seconds: 604800,
        milliseconds: 604800000
    },
    days: {
        hours: 24,
        minutes: 1440,
        seconds: 86400,
        milliseconds: 86400000
    },
    hours: {
        minutes: 60,
        seconds: 3600,
        milliseconds: 3600000
    },
    minutes: {
        seconds: 60,
        milliseconds: 60000
    },
    seconds: {
        milliseconds: 1000
    }
}, casualMatrix = Object.assign({
    years: {
        quarters: 4,
        months: 12,
        weeks: 52,
        days: 365,
        hours: 8760,
        minutes: 525600,
        seconds: 31536000,
        milliseconds: 31536000000
    },
    quarters: {
        months: 3,
        weeks: 13,
        days: 91,
        hours: 2184,
        minutes: 131040,
        seconds: 7862400,
        milliseconds: 7862400000
    },
    months: {
        weeks: 4,
        days: 30,
        hours: 720,
        minutes: 43200,
        seconds: 2592000,
        milliseconds: 2592000000
    }
}, lowOrderMatrix), daysInYearAccurate = 365.2425, daysInMonthAccurate = 30.436875, accurateMatrix = Object.assign({
    years: {
        quarters: 4,
        months: 12,
        weeks: daysInYearAccurate / 7,
        days: daysInYearAccurate,
        hours: daysInYearAccurate * 24,
        minutes: daysInYearAccurate * 1440,
        seconds: daysInYearAccurate * 86400,
        milliseconds: daysInYearAccurate * 86400000
    },
    quarters: {
        months: 3,
        weeks: daysInYearAccurate / 28,
        days: daysInYearAccurate / 4,
        hours: daysInYearAccurate * 24 / 4,
        minutes: daysInYearAccurate * 1440 / 4,
        seconds: daysInYearAccurate * 86400 / 4,
        milliseconds: daysInYearAccurate * 86400000 / 4
    },
    months: {
        weeks: daysInMonthAccurate / 7,
        days: daysInMonthAccurate,
        hours: daysInMonthAccurate * 24,
        minutes: daysInMonthAccurate * 1440,
        seconds: daysInMonthAccurate * 86400,
        milliseconds: daysInMonthAccurate * 86400000
    }
}, lowOrderMatrix); // units ordered by size
var orderedUnits = [
    "years",
    "quarters",
    "months",
    "weeks",
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds"
];
var reverseUnits = orderedUnits.slice(0).reverse(); // clone really means "create another instance just like this one, but with these changes"
function clone(dur, alts, clear) {
    if (clear === void 0) clear = false;
    // deep merge for vals
    var conf = {
        values: clear ? alts.values : Object.assign({
        }, dur.values, alts.values || {
        }),
        loc: dur.loc.clone(alts.loc),
        conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy
    };
    return new Duration(conf);
}
function antiTrunc(n6) {
    return n6 < 0 ? Math.floor(n6) : Math.ceil(n6);
} // NB: mutates parameters
function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
    var conv = matrix[toUnit][fromUnit], raw = fromMap[fromUnit] / conv, sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]), // ok, so this is wild, but see the matrix in the tests
    added = !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
    toMap[toUnit] += added;
    fromMap[fromUnit] -= added * conv;
} // NB: mutates parameters
function normalizeValues(matrix, vals) {
    reverseUnits.reduce(function(previous, current) {
        if (!isUndefined(vals[current])) {
            if (previous) convert(matrix, vals, previous, vals, current);
            return current;
        } else return previous;
    }, null);
}
/**
 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime.plus} to add a Duration object to a DateTime, producing another DateTime.
 *
 * Here is a brief overview of commonly used methods and getters in Duration:
 *
 * * **Creation** To create a Duration, use {@link Duration.fromMillis}, {@link Duration.fromObject}, or {@link Duration.fromISO}.
 * * **Unit values** See the {@link Duration.years}, {@link Duration.months}, {@link Duration.weeks}, {@link Duration.days}, {@link Duration.hours}, {@link Duration.minutes}, {@link Duration.seconds}, {@link Duration.milliseconds} accessors.
 * * **Configuration** See  {@link Duration.locale} and {@link Duration.numberingSystem} accessors.
 * * **Transformation** To create new Durations out of old ones use {@link Duration.plus}, {@link Duration.minus}, {@link Duration.normalize}, {@link Duration.set}, {@link Duration.reconfigure}, {@link Duration.shiftTo}, and {@link Duration.negate}.
 * * **Output** To convert the Duration into other representations, see {@link Duration.as}, {@link Duration.toISO}, {@link Duration.toFormat}, and {@link Duration.toJSON}
 *
 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
 */ var Duration = /*#__PURE__*/ function() {
    /**
   * @private
   */ function Duration1(config) {
        var accurate = config.conversionAccuracy === "longterm" || false;
        /**
     * @access private
     */ this.values = config.values;
        /**
     * @access private
     */ this.loc = config.loc || Locale.create();
        /**
     * @access private
     */ this.conversionAccuracy = accurate ? "longterm" : "casual";
        /**
     * @access private
     */ this.invalid = config.invalid || null;
        /**
     * @access private
     */ this.matrix = accurate ? accurateMatrix : casualMatrix;
        /**
     * @access private
     */ this.isLuxonDuration = true;
    }
    /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */ Duration1.fromMillis = function fromMillis(count, opts) {
        return Duration1.fromObject(Object.assign({
            milliseconds: count
        }, opts));
    };
    Duration1.fromObject = function fromObject(obj) {
        if (obj == null || typeof obj !== "object") throw new InvalidArgumentError("Duration.fromObject: argument expected to be an object, got " + (obj === null ? "null" : typeof obj));
        return new Duration1({
            values: normalizeObject(obj, Duration1.normalizeUnit, [
                "locale",
                "numberingSystem",
                "conversionAccuracy",
                "zone" // a bit of debt; it's super inconvenient internally not to be able to blindly pass this
            ]),
            loc: Locale.fromObject(obj),
            conversionAccuracy: obj.conversionAccuracy
        });
    };
    Duration1.fromISO = function fromISO(text, opts) {
        var _parseISODuration = parseISODuration(text), parsed = _parseISODuration[0];
        if (parsed) {
            var obj = Object.assign(parsed, opts);
            return Duration1.fromObject(obj);
        } else return Duration1.invalid("unparsable", "the input \"" + text + "\" can't be parsed as ISO 8601");
    };
    Duration1.fromISOTime = function fromISOTime(text, opts) {
        var _parseISOTimeOnly = parseISOTimeOnly(text), parsed = _parseISOTimeOnly[0];
        if (parsed) {
            var obj = Object.assign(parsed, opts);
            return Duration1.fromObject(obj);
        } else return Duration1.invalid("unparsable", "the input \"" + text + "\" can't be parsed as ISO 8601");
    };
    Duration1.invalid = function invalid(reason, explanation) {
        if (explanation === void 0) explanation = null;
        if (!reason) throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
        var invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) throw new InvalidDurationError(invalid);
        else return new Duration1({
            invalid: invalid
        });
    };
    Duration1.normalizeUnit = function normalizeUnit(unit) {
        var normalized = {
            year: "years",
            years: "years",
            quarter: "quarters",
            quarters: "quarters",
            month: "months",
            months: "months",
            week: "weeks",
            weeks: "weeks",
            day: "days",
            days: "days",
            hour: "hours",
            hours: "hours",
            minute: "minutes",
            minutes: "minutes",
            second: "seconds",
            seconds: "seconds",
            millisecond: "milliseconds",
            milliseconds: "milliseconds"
        }[unit ? unit.toLowerCase() : unit];
        if (!normalized) throw new InvalidUnitError(unit);
        return normalized;
    };
    Duration1.isDuration = function isDuration(o) {
        return o && o.isLuxonDuration || false;
    };
    var _proto = Duration1.prototype;
    /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * The duration will be converted to the set of units in the format string using {@link Duration.shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */ _proto.toFormat = function toFormat(fmt, opts) {
        if (opts === void 0) opts = {
        };
        // reverse-compat since 1.2; we always round down now, never up, and we do it by default
        var fmtOpts = Object.assign({
        }, opts, {
            floor: opts.round !== false && opts.floor !== false
        });
        return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID;
    };
    _proto.toObject = function toObject(opts) {
        if (opts === void 0) opts = {
        };
        if (!this.isValid) return {
        };
        var base = Object.assign({
        }, this.values);
        if (opts.includeConfig) {
            base.conversionAccuracy = this.conversionAccuracy;
            base.numberingSystem = this.loc.numberingSystem;
            base.locale = this.loc.locale;
        }
        return base;
    };
    _proto.toISO = function toISO() {
        // we could use the formatter, but this is an easier way to get the minimum string
        if (!this.isValid) return null;
        var s13 = "P";
        if (this.years !== 0) s13 += this.years + "Y";
        if (this.months !== 0 || this.quarters !== 0) s13 += this.months + this.quarters * 3 + "M";
        if (this.weeks !== 0) s13 += this.weeks + "W";
        if (this.days !== 0) s13 += this.days + "D";
        if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) s13 += "T";
        if (this.hours !== 0) s13 += this.hours + "H";
        if (this.minutes !== 0) s13 += this.minutes + "M";
        if (this.seconds !== 0 || this.milliseconds !== 0) // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
        s13 += roundTo(this.seconds + this.milliseconds / 1000, 3) + "S";
        if (s13 === "P") s13 += "T0S";
        return s13;
    };
    _proto.toISOTime = function toISOTime(opts) {
        if (opts === void 0) opts = {
        };
        if (!this.isValid) return null;
        var millis = this.toMillis();
        if (millis < 0 || millis >= 86400000) return null;
        opts = Object.assign({
            suppressMilliseconds: false,
            suppressSeconds: false,
            includePrefix: false,
            format: "extended"
        }, opts);
        var value = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
        var fmt = opts.format === "basic" ? "hhmm" : "hh:mm";
        if (!opts.suppressSeconds || value.seconds !== 0 || value.milliseconds !== 0) {
            fmt += opts.format === "basic" ? "ss" : ":ss";
            if (!opts.suppressMilliseconds || value.milliseconds !== 0) fmt += ".SSS";
        }
        var str = value.toFormat(fmt);
        if (opts.includePrefix) str = "T" + str;
        return str;
    };
    _proto.toJSON = function toJSON() {
        return this.toISO();
    };
    _proto.toString = function toString() {
        return this.toISO();
    };
    _proto.toMillis = function toMillis() {
        return this.as("milliseconds");
    };
    _proto.valueOf = function valueOf() {
        return this.toMillis();
    };
    _proto.plus = function plus(duration) {
        if (!this.isValid) return this;
        var dur = friendlyDuration(duration), result = {
        };
        for(var _iterator = _createForOfIteratorHelperLoose(orderedUnits), _step; !(_step = _iterator()).done;){
            var k = _step.value;
            if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) result[k] = dur.get(k) + this.get(k);
        }
        return clone(this, {
            values: result
        }, true);
    };
    _proto.minus = function minus(duration) {
        if (!this.isValid) return this;
        var dur = friendlyDuration(duration);
        return this.plus(dur.negate());
    };
    _proto.mapUnits = function mapUnits(fn) {
        if (!this.isValid) return this;
        var result = {
        };
        for(var _i = 0, _Object$keys = Object.keys(this.values); _i < _Object$keys.length; _i++){
            var k = _Object$keys[_i];
            result[k] = asNumber(fn(this.values[k], k));
        }
        return clone(this, {
            values: result
        }, true);
    };
    _proto.get = function get(unit) {
        return this[Duration1.normalizeUnit(unit)];
    };
    _proto.set = function set(values) {
        if (!this.isValid) return this;
        var mixed = Object.assign(this.values, normalizeObject(values, Duration1.normalizeUnit, []));
        return clone(this, {
            values: mixed
        });
    };
    _proto.reconfigure = function reconfigure(_temp) {
        var _ref = _temp === void 0 ? {
        } : _temp, locale = _ref.locale, numberingSystem = _ref.numberingSystem, conversionAccuracy = _ref.conversionAccuracy;
        var loc = this.loc.clone({
            locale: locale,
            numberingSystem: numberingSystem
        }), opts = {
            loc: loc
        };
        if (conversionAccuracy) opts.conversionAccuracy = conversionAccuracy;
        return clone(this, opts);
    };
    _proto.as = function as(unit) {
        return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
    };
    _proto.normalize = function normalize() {
        if (!this.isValid) return this;
        var vals = this.toObject();
        normalizeValues(this.matrix, vals);
        return clone(this, {
            values: vals
        }, true);
    };
    _proto.shiftTo = function shiftTo() {
        for(var _len = arguments.length, units = new Array(_len), _key = 0; _key < _len; _key++)units[_key] = arguments[_key];
        if (!this.isValid) return this;
        if (units.length === 0) return this;
        units = units.map(function(u) {
            return Duration1.normalizeUnit(u);
        });
        var built = {
        }, accumulated = {
        }, vals = this.toObject();
        var lastUnit;
        for(var _iterator2 = _createForOfIteratorHelperLoose(orderedUnits), _step2; !(_step2 = _iterator2()).done;){
            var k = _step2.value;
            if (units.indexOf(k) >= 0) {
                lastUnit = k;
                var own = 0; // anything we haven't boiled down yet should get boiled to this unit
                for(var ak in accumulated){
                    own += this.matrix[ak][k] * accumulated[ak];
                    accumulated[ak] = 0;
                } // plus anything that's already in this unit
                if (isNumber(vals[k])) own += vals[k];
                var i = Math.trunc(own);
                built[k] = i;
                accumulated[k] = own - i; // we'd like to absorb these fractions in another unit
                // plus anything further down the chain that should be rolled up in to this
                for(var down in vals)if (orderedUnits.indexOf(down) > orderedUnits.indexOf(k)) convert(this.matrix, vals, down, built, k);
                 // otherwise, keep it in the wings to boil it later
            } else if (isNumber(vals[k])) accumulated[k] = vals[k];
        } // anything leftover becomes the decimal for the last unit
        // lastUnit must be defined since units is not empty
        for(var key in accumulated)if (accumulated[key] !== 0) built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
        return clone(this, {
            values: built
        }, true).normalize();
    };
    _proto.negate = function negate() {
        if (!this.isValid) return this;
        var negated = {
        };
        for(var _i2 = 0, _Object$keys2 = Object.keys(this.values); _i2 < _Object$keys2.length; _i2++){
            var k = _Object$keys2[_i2];
            negated[k] = -this.values[k];
        }
        return clone(this, {
            values: negated
        }, true);
    };
    /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */ _proto.equals = function equals(other) {
        if (!this.isValid || !other.isValid) return false;
        if (!this.loc.equals(other.loc)) return false;
        function eq(v1, v2) {
            // Consider 0 and undefined as equal
            if (v1 === undefined || v1 === 0) return v2 === undefined || v2 === 0;
            return v1 === v2;
        }
        for(var _iterator3 = _createForOfIteratorHelperLoose(orderedUnits), _step3; !(_step3 = _iterator3()).done;){
            var u = _step3.value;
            if (!eq(this.values[u], other.values[u])) return false;
        }
        return true;
    };
    _createClass(Duration1, [
        {
            key: "locale",
            get: function get() {
                return this.isValid ? this.loc.locale : null;
            }
        },
        {
            key: "numberingSystem",
            get: function get() {
                return this.isValid ? this.loc.numberingSystem : null;
            }
        },
        {
            key: "years",
            get: function get() {
                return this.isValid ? this.values.years || 0 : NaN;
            }
        },
        {
            key: "quarters",
            get: function get() {
                return this.isValid ? this.values.quarters || 0 : NaN;
            }
        },
        {
            key: "months",
            get: function get() {
                return this.isValid ? this.values.months || 0 : NaN;
            }
        },
        {
            key: "weeks",
            get: function get() {
                return this.isValid ? this.values.weeks || 0 : NaN;
            }
        },
        {
            key: "days",
            get: function get() {
                return this.isValid ? this.values.days || 0 : NaN;
            }
        },
        {
            key: "hours",
            get: function get() {
                return this.isValid ? this.values.hours || 0 : NaN;
            }
        },
        {
            key: "minutes",
            get: function get() {
                return this.isValid ? this.values.minutes || 0 : NaN;
            }
        },
        {
            key: "seconds",
            get: function get() {
                return this.isValid ? this.values.seconds || 0 : NaN;
            }
        },
        {
            key: "milliseconds",
            get: function get() {
                return this.isValid ? this.values.milliseconds || 0 : NaN;
            }
        },
        {
            key: "isValid",
            get: function get() {
                return this.invalid === null;
            }
        },
        {
            key: "invalidReason",
            get: function get() {
                return this.invalid ? this.invalid.reason : null;
            }
        },
        {
            key: "invalidExplanation",
            get: function get() {
                return this.invalid ? this.invalid.explanation : null;
            }
        }
    ]);
    return Duration1;
}();
function friendlyDuration(durationish) {
    if (isNumber(durationish)) return Duration.fromMillis(durationish);
    else if (Duration.isDuration(durationish)) return durationish;
    else if (typeof durationish === "object") return Duration.fromObject(durationish);
    else throw new InvalidArgumentError("Unknown duration argument " + durationish + " of type " + typeof durationish);
}
var INVALID$1 = "Invalid Interval"; // checks if the start is equal to or before the end
function validateStartEnd(start, end) {
    if (!start || !start.isValid) return Interval.invalid("missing or invalid start");
    else if (!end || !end.isValid) return Interval.invalid("missing or invalid end");
    else if (end < start) return Interval.invalid("end before start", "The end of an interval must be after its start, but you had start=" + start.toISO() + " and end=" + end.toISO());
    else return null;
}
/**
 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
 *
 * Here is a brief overview of the most commonly used methods and getters in Interval:
 *
 * * **Creation** To create an Interval, use {@link fromDateTimes}, {@link after}, {@link before}, or {@link fromISO}.
 * * **Accessors** Use {@link start} and {@link end} to get the start and end.
 * * **Interrogation** To analyze the Interval, use {@link count}, {@link length}, {@link hasSame}, {@link contains}, {@link isAfter}, or {@link isBefore}.
 * * **Transformation** To create other Intervals out of this one, use {@link set}, {@link splitAt}, {@link splitBy}, {@link divideEqually}, {@link merge}, {@link xor}, {@link union}, {@link intersection}, or {@link difference}.
 * * **Comparison** To compare this Interval to another one, use {@link equals}, {@link overlaps}, {@link abutsStart}, {@link abutsEnd}, {@link engulfs}.
 * * **Output** To convert the Interval into other representations, see {@link toString}, {@link toISO}, {@link toISODate}, {@link toISOTime}, {@link toFormat}, and {@link toDuration}.
 */ var Interval = /*#__PURE__*/ function() {
    /**
   * @private
   */ function Interval1(config) {
        /**
     * @access private
     */ this.s = config.start;
        /**
     * @access private
     */ this.e = config.end;
        /**
     * @access private
     */ this.invalid = config.invalid || null;
        /**
     * @access private
     */ this.isLuxonInterval = true;
    }
    /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */ Interval1.invalid = function invalid(reason, explanation) {
        if (explanation === void 0) explanation = null;
        if (!reason) throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
        var invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) throw new InvalidIntervalError(invalid);
        else return new Interval1({
            invalid: invalid
        });
    };
    Interval1.fromDateTimes = function fromDateTimes(start, end) {
        var builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
        var validateError = validateStartEnd(builtStart, builtEnd);
        if (validateError == null) return new Interval1({
            start: builtStart,
            end: builtEnd
        });
        else return validateError;
    };
    Interval1.after = function after(start, duration) {
        var dur = friendlyDuration(duration), dt = friendlyDateTime(start);
        return Interval1.fromDateTimes(dt, dt.plus(dur));
    };
    Interval1.before = function before(end, duration) {
        var dur = friendlyDuration(duration), dt = friendlyDateTime(end);
        return Interval1.fromDateTimes(dt.minus(dur), dt);
    };
    Interval1.fromISO = function fromISO(text, opts) {
        var _split = (text || "").split("/", 2), s14 = _split[0], e = _split[1];
        if (s14 && e) {
            var start, startIsValid;
            try {
                start = DateTime.fromISO(s14, opts);
                startIsValid = start.isValid;
            } catch (e1) {
                startIsValid = false;
            }
            var end, endIsValid;
            try {
                end = DateTime.fromISO(e, opts);
                endIsValid = end.isValid;
            } catch (e2) {
                endIsValid = false;
            }
            if (startIsValid && endIsValid) return Interval1.fromDateTimes(start, end);
            if (startIsValid) {
                var dur = Duration.fromISO(e, opts);
                if (dur.isValid) return Interval1.after(start, dur);
            } else if (endIsValid) {
                var _dur = Duration.fromISO(s14, opts);
                if (_dur.isValid) return Interval1.before(end, _dur);
            }
        }
        return Interval1.invalid("unparsable", "the input \"" + text + "\" can't be parsed as ISO 8601");
    };
    Interval1.isInterval = function isInterval(o) {
        return o && o.isLuxonInterval || false;
    };
    var _proto = Interval1.prototype;
    /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */ _proto.length = function length(unit) {
        if (unit === void 0) unit = "milliseconds";
        return this.isValid ? this.toDuration.apply(this, [
            unit
        ]).get(unit) : NaN;
    };
    _proto.count = function count(unit) {
        if (unit === void 0) unit = "milliseconds";
        if (!this.isValid) return NaN;
        var start = this.start.startOf(unit), end = this.end.startOf(unit);
        return Math.floor(end.diff(start, unit).get(unit)) + 1;
    };
    _proto.hasSame = function hasSame(unit) {
        return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
    };
    _proto.isEmpty = function isEmpty() {
        return this.s.valueOf() === this.e.valueOf();
    };
    _proto.isAfter = function isAfter(dateTime) {
        if (!this.isValid) return false;
        return this.s > dateTime;
    };
    _proto.isBefore = function isBefore(dateTime) {
        if (!this.isValid) return false;
        return this.e <= dateTime;
    };
    _proto.contains = function contains(dateTime) {
        if (!this.isValid) return false;
        return this.s <= dateTime && this.e > dateTime;
    };
    _proto.set = function set(_temp) {
        var _ref = _temp === void 0 ? {
        } : _temp, start = _ref.start, end = _ref.end;
        if (!this.isValid) return this;
        return Interval1.fromDateTimes(start || this.s, end || this.e);
    };
    _proto.splitAt = function splitAt() {
        var _this = this;
        if (!this.isValid) return [];
        for(var _len = arguments.length, dateTimes = new Array(_len), _key = 0; _key < _len; _key++)dateTimes[_key] = arguments[_key];
        var sorted = dateTimes.map(friendlyDateTime).filter(function(d) {
            return _this.contains(d);
        }).sort(), results = [];
        var s15 = this.s, i = 0;
        while(s15 < this.e){
            var added = sorted[i] || this.e, next = +added > +this.e ? this.e : added;
            results.push(Interval1.fromDateTimes(s15, next));
            s15 = next;
            i += 1;
        }
        return results;
    };
    _proto.splitBy = function splitBy(duration) {
        var dur = friendlyDuration(duration);
        if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) return [];
        var s16 = this.s, idx = 1, next;
        var results = [];
        while(s16 < this.e){
            var added = this.start.plus(dur.mapUnits(function(x) {
                return x * idx;
            }));
            next = +added > +this.e ? this.e : added;
            results.push(Interval1.fromDateTimes(s16, next));
            s16 = next;
            idx += 1;
        }
        return results;
    };
    _proto.divideEqually = function divideEqually(numberOfParts) {
        if (!this.isValid) return [];
        return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
    };
    _proto.overlaps = function overlaps(other) {
        return this.e > other.s && this.s < other.e;
    };
    _proto.abutsStart = function abutsStart(other) {
        if (!this.isValid) return false;
        return +this.e === +other.s;
    };
    _proto.abutsEnd = function abutsEnd(other) {
        if (!this.isValid) return false;
        return +other.e === +this.s;
    };
    _proto.engulfs = function engulfs(other) {
        if (!this.isValid) return false;
        return this.s <= other.s && this.e >= other.e;
    };
    _proto.equals = function equals(other) {
        if (!this.isValid || !other.isValid) return false;
        return this.s.equals(other.s) && this.e.equals(other.e);
    };
    _proto.intersection = function intersection(other) {
        if (!this.isValid) return this;
        var s17 = this.s > other.s ? this.s : other.s, e = this.e < other.e ? this.e : other.e;
        if (s17 >= e) return null;
        else return Interval1.fromDateTimes(s17, e);
    };
    _proto.union = function union(other) {
        if (!this.isValid) return this;
        var s18 = this.s < other.s ? this.s : other.s, e = this.e > other.e ? this.e : other.e;
        return Interval1.fromDateTimes(s18, e);
    };
    Interval1.merge = function merge(intervals) {
        var _intervals$sort$reduc = intervals.sort(function(a, b) {
            return a.s - b.s;
        }).reduce(function(_ref2, item) {
            var sofar = _ref2[0], current = _ref2[1];
            if (!current) return [
                sofar,
                item
            ];
            else if (current.overlaps(item) || current.abutsStart(item)) return [
                sofar,
                current.union(item)
            ];
            else return [
                sofar.concat([
                    current
                ]),
                item
            ];
        }, [
            [],
            null
        ]), found = _intervals$sort$reduc[0], final = _intervals$sort$reduc[1];
        if (final) found.push(final);
        return found;
    };
    Interval1.xor = function xor(intervals) {
        var _Array$prototype;
        var start = null, currentCount = 0;
        var results = [], ends = intervals.map(function(i) {
            return [
                {
                    time: i.s,
                    type: "s"
                },
                {
                    time: i.e,
                    type: "e"
                }
            ];
        }), flattened = (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, ends), arr = flattened.sort(function(a, b) {
            return a.time - b.time;
        });
        for(var _iterator = _createForOfIteratorHelperLoose(arr), _step; !(_step = _iterator()).done;){
            var i1 = _step.value;
            currentCount += i1.type === "s" ? 1 : -1;
            if (currentCount === 1) start = i1.time;
            else {
                if (start && +start !== +i1.time) results.push(Interval1.fromDateTimes(start, i1.time));
                start = null;
            }
        }
        return Interval1.merge(results);
    };
    _proto.difference = function difference() {
        var _this2 = this;
        for(var _len2 = arguments.length, intervals = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)intervals[_key2] = arguments[_key2];
        return Interval1.xor([
            this
        ].concat(intervals)).map(function(i) {
            return _this2.intersection(i);
        }).filter(function(i) {
            return i && !i.isEmpty();
        });
    };
    _proto.toString = function toString() {
        if (!this.isValid) return INVALID$1;
        return "[" + this.s.toISO() + " \u2013 " + this.e.toISO() + ")";
    };
    _proto.toISO = function toISO(opts) {
        if (!this.isValid) return INVALID$1;
        return this.s.toISO(opts) + "/" + this.e.toISO(opts);
    };
    _proto.toISODate = function toISODate() {
        if (!this.isValid) return INVALID$1;
        return this.s.toISODate() + "/" + this.e.toISODate();
    };
    _proto.toISOTime = function toISOTime(opts) {
        if (!this.isValid) return INVALID$1;
        return this.s.toISOTime(opts) + "/" + this.e.toISOTime(opts);
    };
    _proto.toFormat = function toFormat(dateFormat, _temp2) {
        var _ref3 = _temp2 === void 0 ? {
        } : _temp2, _ref3$separator = _ref3.separator, separator = _ref3$separator === void 0 ? " – " : _ref3$separator;
        if (!this.isValid) return INVALID$1;
        return "" + this.s.toFormat(dateFormat) + separator + this.e.toFormat(dateFormat);
    };
    _proto.toDuration = function toDuration(unit, opts) {
        if (!this.isValid) return Duration.invalid(this.invalidReason);
        return this.e.diff(this.s, unit, opts);
    };
    _proto.mapEndpoints = function mapEndpoints(mapFn) {
        return Interval1.fromDateTimes(mapFn(this.s), mapFn(this.e));
    };
    _createClass(Interval1, [
        {
            key: "start",
            get: function get() {
                return this.isValid ? this.s : null;
            }
        },
        {
            key: "end",
            get: function get() {
                return this.isValid ? this.e : null;
            }
        },
        {
            key: "isValid",
            get: function get() {
                return this.invalidReason === null;
            }
        },
        {
            key: "invalidReason",
            get: function get() {
                return this.invalid ? this.invalid.reason : null;
            }
        },
        {
            key: "invalidExplanation",
            get: function get() {
                return this.invalid ? this.invalid.explanation : null;
            }
        }
    ]);
    return Interval1;
}();
/**
 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
 */ var Info = /*#__PURE__*/ function() {
    function Info1() {
    }
    /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */ Info1.hasDST = function hasDST(zone) {
        if (zone === void 0) zone = Settings.defaultZone;
        var proto = DateTime.now().setZone(zone).set({
            month: 12
        });
        return !zone.universal && proto.offset !== proto.set({
            month: 6
        }).offset;
    };
    Info1.isValidIANAZone = function isValidIANAZone(zone) {
        return IANAZone.isValidSpecifier(zone) && IANAZone.isValidZone(zone);
    };
    Info1.normalizeZone = function normalizeZone$1(input) {
        return normalizeZone(input, Settings.defaultZone);
    };
    Info1.months = function months(length, _temp) {
        if (length === void 0) length = "long";
        var _ref = _temp === void 0 ? {
        } : _temp, _ref$locale = _ref.locale, locale = _ref$locale === void 0 ? null : _ref$locale, _ref$numberingSystem = _ref.numberingSystem, numberingSystem = _ref$numberingSystem === void 0 ? null : _ref$numberingSystem, _ref$locObj = _ref.locObj, locObj = _ref$locObj === void 0 ? null : _ref$locObj, _ref$outputCalendar = _ref.outputCalendar, outputCalendar = _ref$outputCalendar === void 0 ? "gregory" : _ref$outputCalendar;
        return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
    };
    Info1.monthsFormat = function monthsFormat(length, _temp2) {
        if (length === void 0) length = "long";
        var _ref2 = _temp2 === void 0 ? {
        } : _temp2, _ref2$locale = _ref2.locale, locale = _ref2$locale === void 0 ? null : _ref2$locale, _ref2$numberingSystem = _ref2.numberingSystem, numberingSystem = _ref2$numberingSystem === void 0 ? null : _ref2$numberingSystem, _ref2$locObj = _ref2.locObj, locObj = _ref2$locObj === void 0 ? null : _ref2$locObj, _ref2$outputCalendar = _ref2.outputCalendar, outputCalendar = _ref2$outputCalendar === void 0 ? "gregory" : _ref2$outputCalendar;
        return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
    };
    Info1.weekdays = function weekdays(length, _temp3) {
        if (length === void 0) length = "long";
        var _ref3 = _temp3 === void 0 ? {
        } : _temp3, _ref3$locale = _ref3.locale, locale = _ref3$locale === void 0 ? null : _ref3$locale, _ref3$numberingSystem = _ref3.numberingSystem, numberingSystem = _ref3$numberingSystem === void 0 ? null : _ref3$numberingSystem, _ref3$locObj = _ref3.locObj, locObj = _ref3$locObj === void 0 ? null : _ref3$locObj;
        return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
    };
    Info1.weekdaysFormat = function weekdaysFormat(length, _temp4) {
        if (length === void 0) length = "long";
        var _ref4 = _temp4 === void 0 ? {
        } : _temp4, _ref4$locale = _ref4.locale, locale = _ref4$locale === void 0 ? null : _ref4$locale, _ref4$numberingSystem = _ref4.numberingSystem, numberingSystem = _ref4$numberingSystem === void 0 ? null : _ref4$numberingSystem, _ref4$locObj = _ref4.locObj, locObj = _ref4$locObj === void 0 ? null : _ref4$locObj;
        return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
    };
    Info1.meridiems = function meridiems(_temp5) {
        var _ref5 = _temp5 === void 0 ? {
        } : _temp5, _ref5$locale = _ref5.locale, locale = _ref5$locale === void 0 ? null : _ref5$locale;
        return Locale.create(locale).meridiems();
    };
    Info1.eras = function eras(length, _temp6) {
        if (length === void 0) length = "short";
        var _ref6 = _temp6 === void 0 ? {
        } : _temp6, _ref6$locale = _ref6.locale, locale = _ref6$locale === void 0 ? null : _ref6$locale;
        return Locale.create(locale, null, "gregory").eras(length);
    };
    Info1.features = function features() {
        var intl = false, intlTokens = false, zones = false, relative = false;
        if (hasIntl()) {
            intl = true;
            intlTokens = hasFormatToParts();
            relative = hasRelative();
            try {
                zones = new Intl.DateTimeFormat("en", {
                    timeZone: "America/New_York"
                }).resolvedOptions().timeZone === "America/New_York";
            } catch (e) {
                zones = false;
            }
        }
        return {
            intl: intl,
            intlTokens: intlTokens,
            zones: zones,
            relative: relative
        };
    };
    return Info1;
}();
function dayDiff(earlier, later) {
    var utcDayStart = function utcDayStart(dt) {
        return dt.toUTC(0, {
            keepLocalTime: true
        }).startOf("day").valueOf();
    }, ms = utcDayStart(later) - utcDayStart(earlier);
    return Math.floor(Duration.fromMillis(ms).as("days"));
}
function highOrderDiffs(cursor, later, units) {
    var differs = [
        [
            "years",
            function(a, b) {
                return b.year - a.year;
            }
        ],
        [
            "quarters",
            function(a, b) {
                return b.quarter - a.quarter;
            }
        ],
        [
            "months",
            function(a, b) {
                return b.month - a.month + (b.year - a.year) * 12;
            }
        ],
        [
            "weeks",
            function(a, b) {
                var days = dayDiff(a, b);
                return (days - days % 7) / 7;
            }
        ],
        [
            "days",
            dayDiff
        ]
    ];
    var results = {
    };
    var lowestOrder, highWater;
    for(var _i = 0, _differs = differs; _i < _differs.length; _i++){
        var _differs$_i = _differs[_i], unit = _differs$_i[0], differ = _differs$_i[1];
        if (units.indexOf(unit) >= 0) {
            var _cursor$plus;
            lowestOrder = unit;
            var delta = differ(cursor, later);
            highWater = cursor.plus((_cursor$plus = {
            }, _cursor$plus[unit] = delta, _cursor$plus));
            if (highWater > later) {
                var _cursor$plus2;
                cursor = cursor.plus((_cursor$plus2 = {
                }, _cursor$plus2[unit] = delta - 1, _cursor$plus2));
                delta -= 1;
            } else cursor = highWater;
            results[unit] = delta;
        }
    }
    return [
        cursor,
        results,
        highWater,
        lowestOrder
    ];
}
function _diff(earlier, later, units, opts) {
    var _highOrderDiffs = highOrderDiffs(earlier, later, units), cursor = _highOrderDiffs[0], results = _highOrderDiffs[1], highWater = _highOrderDiffs[2], lowestOrder = _highOrderDiffs[3];
    var remainingMillis = later - cursor;
    var lowerOrderUnits = units.filter(function(u) {
        return [
            "hours",
            "minutes",
            "seconds",
            "milliseconds"
        ].indexOf(u) >= 0;
    });
    if (lowerOrderUnits.length === 0) {
        if (highWater < later) {
            var _cursor$plus3;
            highWater = cursor.plus((_cursor$plus3 = {
            }, _cursor$plus3[lowestOrder] = 1, _cursor$plus3));
        }
        if (highWater !== cursor) results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
    }
    var duration = Duration.fromObject(Object.assign(results, opts));
    if (lowerOrderUnits.length > 0) {
        var _Duration$fromMillis;
        return (_Duration$fromMillis = Duration.fromMillis(remainingMillis, opts)).shiftTo.apply(_Duration$fromMillis, lowerOrderUnits).plus(duration);
    } else return duration;
}
var numberingSystems = {
    arab: "[\u0660-\u0669]",
    arabext: "[\u06F0-\u06F9]",
    bali: "[\u1B50-\u1B59]",
    beng: "[\u09E6-\u09EF]",
    deva: "[\u0966-\u096F]",
    fullwide: "[\uFF10-\uFF19]",
    gujr: "[\u0AE6-\u0AEF]",
    hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
    khmr: "[\u17E0-\u17E9]",
    knda: "[\u0CE6-\u0CEF]",
    laoo: "[\u0ED0-\u0ED9]",
    limb: "[\u1946-\u194F]",
    mlym: "[\u0D66-\u0D6F]",
    mong: "[\u1810-\u1819]",
    mymr: "[\u1040-\u1049]",
    orya: "[\u0B66-\u0B6F]",
    tamldec: "[\u0BE6-\u0BEF]",
    telu: "[\u0C66-\u0C6F]",
    thai: "[\u0E50-\u0E59]",
    tibt: "[\u0F20-\u0F29]",
    latn: "\\d"
};
var numberingSystemsUTF16 = {
    arab: [
        1632,
        1641
    ],
    arabext: [
        1776,
        1785
    ],
    bali: [
        6992,
        7001
    ],
    beng: [
        2534,
        2543
    ],
    deva: [
        2406,
        2415
    ],
    fullwide: [
        65296,
        65303
    ],
    gujr: [
        2790,
        2799
    ],
    khmr: [
        6112,
        6121
    ],
    knda: [
        3302,
        3311
    ],
    laoo: [
        3792,
        3801
    ],
    limb: [
        6470,
        6479
    ],
    mlym: [
        3430,
        3439
    ],
    mong: [
        6160,
        6169
    ],
    mymr: [
        4160,
        4169
    ],
    orya: [
        2918,
        2927
    ],
    tamldec: [
        3046,
        3055
    ],
    telu: [
        3174,
        3183
    ],
    thai: [
        3664,
        3673
    ],
    tibt: [
        3872,
        3881
    ]
}; // eslint-disable-next-line
var hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
function parseDigits(str) {
    var value = parseInt(str, 10);
    if (isNaN(value)) {
        value = "";
        for(var i = 0; i < str.length; i++){
            var code = str.charCodeAt(i);
            if (str[i].search(numberingSystems.hanidec) !== -1) value += hanidecChars.indexOf(str[i]);
            else for(var key in numberingSystemsUTF16){
                var _numberingSystemsUTF = numberingSystemsUTF16[key], min = _numberingSystemsUTF[0], max = _numberingSystemsUTF[1];
                if (code >= min && code <= max) value += code - min;
            }
        }
        return parseInt(value, 10);
    } else return value;
}
function digitRegex(_ref, append) {
    var numberingSystem = _ref.numberingSystem;
    if (append === void 0) append = "";
    return new RegExp("" + numberingSystems[numberingSystem || "latn"] + append);
}
var MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";
function intUnit(regex, post) {
    if (post === void 0) post = function post(i) {
        return i;
    };
    return {
        regex: regex,
        deser: function deser(_ref) {
            var s19 = _ref[0];
            return post(parseDigits(s19));
        }
    };
}
var NBSP = String.fromCharCode(160);
var spaceOrNBSP = "( |" + NBSP + ")";
var spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");
function fixListRegex(s20) {
    // make dots optional and also make them literal
    // make space and non breakable space characters interchangeable
    return s20.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
}
function stripInsensitivities(s21) {
    return s21.replace(/\./g, "") // ignore dots that were made optional
    .replace(spaceOrNBSPRegExp, " ") // interchange space and nbsp
    .toLowerCase();
}
function oneOf(strings, startIndex) {
    if (strings === null) return null;
    else return {
        regex: RegExp(strings.map(fixListRegex).join("|")),
        deser: function deser(_ref2) {
            var s22 = _ref2[0];
            return strings.findIndex(function(i) {
                return stripInsensitivities(s22) === stripInsensitivities(i);
            }) + startIndex;
        }
    };
}
function offset(regex, groups) {
    return {
        regex: regex,
        deser: function deser(_ref3) {
            var h = _ref3[1], m = _ref3[2];
            return signedOffset(h, m);
        },
        groups: groups
    };
}
function simple(regex) {
    return {
        regex: regex,
        deser: function deser(_ref4) {
            var s23 = _ref4[0];
            return s23;
        }
    };
}
function escapeToken(value) {
    // eslint-disable-next-line no-useless-escape
    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function unitForToken(token, loc) {
    var one = digitRegex(loc), two = digitRegex(loc, "{2}"), three = digitRegex(loc, "{3}"), four = digitRegex(loc, "{4}"), six = digitRegex(loc, "{6}"), oneOrTwo = digitRegex(loc, "{1,2}"), oneToThree = digitRegex(loc, "{1,3}"), oneToSix = digitRegex(loc, "{1,6}"), oneToNine = digitRegex(loc, "{1,9}"), twoToFour = digitRegex(loc, "{2,4}"), fourToSix = digitRegex(loc, "{4,6}"), literal = function literal(t) {
        return {
            regex: RegExp(escapeToken(t.val)),
            deser: function deser(_ref5) {
                var s24 = _ref5[0];
                return s24;
            },
            literal: true
        };
    }, unitate = function unitate(t) {
        if (token.literal) return literal(t);
        switch(t.val){
            // era
            case "G":
                return oneOf(loc.eras("short", false), 0);
            case "GG":
                return oneOf(loc.eras("long", false), 0);
            // years
            case "y":
                return intUnit(oneToSix);
            case "yy":
                return intUnit(twoToFour, untruncateYear);
            case "yyyy":
                return intUnit(four);
            case "yyyyy":
                return intUnit(fourToSix);
            case "yyyyyy":
                return intUnit(six);
            // months
            case "M":
                return intUnit(oneOrTwo);
            case "MM":
                return intUnit(two);
            case "MMM":
                return oneOf(loc.months("short", true, false), 1);
            case "MMMM":
                return oneOf(loc.months("long", true, false), 1);
            case "L":
                return intUnit(oneOrTwo);
            case "LL":
                return intUnit(two);
            case "LLL":
                return oneOf(loc.months("short", false, false), 1);
            case "LLLL":
                return oneOf(loc.months("long", false, false), 1);
            // dates
            case "d":
                return intUnit(oneOrTwo);
            case "dd":
                return intUnit(two);
            // ordinals
            case "o":
                return intUnit(oneToThree);
            case "ooo":
                return intUnit(three);
            // time
            case "HH":
                return intUnit(two);
            case "H":
                return intUnit(oneOrTwo);
            case "hh":
                return intUnit(two);
            case "h":
                return intUnit(oneOrTwo);
            case "mm":
                return intUnit(two);
            case "m":
                return intUnit(oneOrTwo);
            case "q":
                return intUnit(oneOrTwo);
            case "qq":
                return intUnit(two);
            case "s":
                return intUnit(oneOrTwo);
            case "ss":
                return intUnit(two);
            case "S":
                return intUnit(oneToThree);
            case "SSS":
                return intUnit(three);
            case "u":
                return simple(oneToNine);
            // meridiem
            case "a":
                return oneOf(loc.meridiems(), 0);
            // weekYear (k)
            case "kkkk":
                return intUnit(four);
            case "kk":
                return intUnit(twoToFour, untruncateYear);
            // weekNumber (W)
            case "W":
                return intUnit(oneOrTwo);
            case "WW":
                return intUnit(two);
            // weekdays
            case "E":
            case "c":
                return intUnit(one);
            case "EEE":
                return oneOf(loc.weekdays("short", false, false), 1);
            case "EEEE":
                return oneOf(loc.weekdays("long", false, false), 1);
            case "ccc":
                return oneOf(loc.weekdays("short", true, false), 1);
            case "cccc":
                return oneOf(loc.weekdays("long", true, false), 1);
            // offset/zone
            case "Z":
            case "ZZ":
                return offset(new RegExp("([+-]" + oneOrTwo.source + ")(?::(" + two.source + "))?"), 2);
            case "ZZZ":
                return offset(new RegExp("([+-]" + oneOrTwo.source + ")(" + two.source + ")?"), 2);
            // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
            // because we don't have any way to figure out what they are
            case "z":
                return simple(/[a-z_+-/]{1,256}?/i);
            default:
                return literal(t);
        }
    };
    var unit = unitate(token) || {
        invalidReason: MISSING_FTP
    };
    unit.token = token;
    return unit;
}
var partTypeStyleToTokenVal = {
    year: {
        "2-digit": "yy",
        numeric: "yyyyy"
    },
    month: {
        numeric: "M",
        "2-digit": "MM",
        short: "MMM",
        long: "MMMM"
    },
    day: {
        numeric: "d",
        "2-digit": "dd"
    },
    weekday: {
        short: "EEE",
        long: "EEEE"
    },
    dayperiod: "a",
    dayPeriod: "a",
    hour: {
        numeric: "h",
        "2-digit": "hh"
    },
    minute: {
        numeric: "m",
        "2-digit": "mm"
    },
    second: {
        numeric: "s",
        "2-digit": "ss"
    }
};
function tokenForPart(part, locale, formatOpts) {
    var type = part.type, value = part.value;
    if (type === "literal") return {
        literal: true,
        val: value
    };
    var style = formatOpts[type];
    var val = partTypeStyleToTokenVal[type];
    if (typeof val === "object") val = val[style];
    if (val) return {
        literal: false,
        val: val
    };
    return undefined;
}
function buildRegex(units) {
    var re = units.map(function(u) {
        return u.regex;
    }).reduce(function(f, r) {
        return f + "(" + r.source + ")";
    }, "");
    return [
        "^" + re + "$",
        units
    ];
}
function match(input, regex, handlers) {
    var matches = input.match(regex);
    if (matches) {
        var all = {
        };
        var matchIndex = 1;
        for(var i in handlers)if (hasOwnProperty(handlers, i)) {
            var h = handlers[i], groups = h.groups ? h.groups + 1 : 1;
            if (!h.literal && h.token) all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
            matchIndex += groups;
        }
        return [
            matches,
            all
        ];
    } else return [
        matches,
        {
        }
    ];
}
function dateTimeFromMatches(matches) {
    var toField = function toField(token) {
        switch(token){
            case "S":
                return "millisecond";
            case "s":
                return "second";
            case "m":
                return "minute";
            case "h":
            case "H":
                return "hour";
            case "d":
                return "day";
            case "o":
                return "ordinal";
            case "L":
            case "M":
                return "month";
            case "y":
                return "year";
            case "E":
            case "c":
                return "weekday";
            case "W":
                return "weekNumber";
            case "k":
                return "weekYear";
            case "q":
                return "quarter";
            default:
                return null;
        }
    };
    var zone;
    if (!isUndefined(matches.Z)) zone = new FixedOffsetZone(matches.Z);
    else if (!isUndefined(matches.z)) zone = IANAZone.create(matches.z);
    else zone = null;
    if (!isUndefined(matches.q)) matches.M = (matches.q - 1) * 3 + 1;
    if (!isUndefined(matches.h)) {
        if (matches.h < 12 && matches.a === 1) matches.h += 12;
        else if (matches.h === 12 && matches.a === 0) matches.h = 0;
    }
    if (matches.G === 0 && matches.y) matches.y = -matches.y;
    if (!isUndefined(matches.u)) matches.S = parseMillis(matches.u);
    var vals = Object.keys(matches).reduce(function(r, k) {
        var f = toField(k);
        if (f) r[f] = matches[k];
        return r;
    }, {
    });
    return [
        vals,
        zone
    ];
}
var dummyDateTimeCache = null;
function getDummyDateTime() {
    if (!dummyDateTimeCache) dummyDateTimeCache = DateTime.fromMillis(1555555555555);
    return dummyDateTimeCache;
}
function maybeExpandMacroToken(token, locale) {
    if (token.literal) return token;
    var formatOpts = Formatter.macroTokenToFormatOpts(token.val);
    if (!formatOpts) return token;
    var formatter = Formatter.create(locale, formatOpts);
    var parts = formatter.formatDateTimeParts(getDummyDateTime());
    var tokens = parts.map(function(p) {
        return tokenForPart(p, locale, formatOpts);
    });
    if (tokens.includes(undefined)) return token;
    return tokens;
}
function expandMacroTokens(tokens, locale) {
    var _Array$prototype;
    return (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, tokens.map(function(t) {
        return maybeExpandMacroToken(t, locale);
    }));
}
/**
 * @private
 */ function explainFromTokens(locale, input, format) {
    var tokens = expandMacroTokens(Formatter.parseFormat(format), locale), units = tokens.map(function(t) {
        return unitForToken(t, locale);
    }), disqualifyingUnit = units.find(function(t) {
        return t.invalidReason;
    });
    if (disqualifyingUnit) return {
        input: input,
        tokens: tokens,
        invalidReason: disqualifyingUnit.invalidReason
    };
    else {
        var _buildRegex = buildRegex(units), regexString = _buildRegex[0], handlers = _buildRegex[1], regex = RegExp(regexString, "i"), _match = match(input, regex, handlers), rawMatches = _match[0], matches = _match[1], _ref6 = matches ? dateTimeFromMatches(matches) : [
            null,
            null
        ], result = _ref6[0], zone = _ref6[1];
        if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
        return {
            input: input,
            tokens: tokens,
            regex: regex,
            rawMatches: rawMatches,
            matches: matches,
            result: result,
            zone: zone
        };
    }
}
function parseFromTokens(locale, input, format) {
    var _explainFromTokens = explainFromTokens(locale, input, format), result = _explainFromTokens.result, zone = _explainFromTokens.zone, invalidReason = _explainFromTokens.invalidReason;
    return [
        result,
        zone,
        invalidReason
    ];
}
var nonLeapLadder = [
    0,
    31,
    59,
    90,
    120,
    151,
    181,
    212,
    243,
    273,
    304,
    334
], leapLadder = [
    0,
    31,
    60,
    91,
    121,
    152,
    182,
    213,
    244,
    274,
    305,
    335
];
function unitOutOfRange(unit, value) {
    return new Invalid("unit out of range", "you specified " + value + " (of type " + typeof value + ") as a " + unit + ", which is invalid");
}
function dayOfWeek(year, month, day) {
    var js = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
    return js === 0 ? 7 : js;
}
function computeOrdinal(year, month, day) {
    return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}
function uncomputeOrdinal(year, ordinal) {
    var table = isLeapYear(year) ? leapLadder : nonLeapLadder, month0 = table.findIndex(function(i) {
        return i < ordinal;
    }), day = ordinal - table[month0];
    return {
        month: month0 + 1,
        day: day
    };
}
/**
 * @private
 */ function gregorianToWeek(gregObj) {
    var year = gregObj.year, month = gregObj.month, day = gregObj.day, ordinal = computeOrdinal(year, month, day), weekday = dayOfWeek(year, month, day);
    var weekNumber = Math.floor((ordinal - weekday + 10) / 7), weekYear;
    if (weekNumber < 1) {
        weekYear = year - 1;
        weekNumber = weeksInWeekYear(weekYear);
    } else if (weekNumber > weeksInWeekYear(year)) {
        weekYear = year + 1;
        weekNumber = 1;
    } else weekYear = year;
    return Object.assign({
        weekYear: weekYear,
        weekNumber: weekNumber,
        weekday: weekday
    }, timeObject(gregObj));
}
function weekToGregorian(weekData) {
    var weekYear = weekData.weekYear, weekNumber = weekData.weekNumber, weekday = weekData.weekday, weekdayOfJan4 = dayOfWeek(weekYear, 1, 4), yearInDays = daysInYear(weekYear);
    var ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3, year;
    if (ordinal < 1) {
        year = weekYear - 1;
        ordinal += daysInYear(year);
    } else if (ordinal > yearInDays) {
        year = weekYear + 1;
        ordinal -= daysInYear(weekYear);
    } else year = weekYear;
    var _uncomputeOrdinal = uncomputeOrdinal(year, ordinal), month = _uncomputeOrdinal.month, day = _uncomputeOrdinal.day;
    return Object.assign({
        year: year,
        month: month,
        day: day
    }, timeObject(weekData));
}
function gregorianToOrdinal(gregData) {
    var year = gregData.year, month = gregData.month, day = gregData.day, ordinal = computeOrdinal(year, month, day);
    return Object.assign({
        year: year,
        ordinal: ordinal
    }, timeObject(gregData));
}
function ordinalToGregorian(ordinalData) {
    var year = ordinalData.year, ordinal = ordinalData.ordinal, _uncomputeOrdinal2 = uncomputeOrdinal(year, ordinal), month = _uncomputeOrdinal2.month, day = _uncomputeOrdinal2.day;
    return Object.assign({
        year: year,
        month: month,
        day: day
    }, timeObject(ordinalData));
}
function hasInvalidWeekData(obj) {
    var validYear = isInteger(obj.weekYear), validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)), validWeekday = integerBetween(obj.weekday, 1, 7);
    if (!validYear) return unitOutOfRange("weekYear", obj.weekYear);
    else if (!validWeek) return unitOutOfRange("week", obj.week);
    else if (!validWeekday) return unitOutOfRange("weekday", obj.weekday);
    else return false;
}
function hasInvalidOrdinalData(obj) {
    var validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
    if (!validYear) return unitOutOfRange("year", obj.year);
    else if (!validOrdinal) return unitOutOfRange("ordinal", obj.ordinal);
    else return false;
}
function hasInvalidGregorianData(obj) {
    var validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
    if (!validYear) return unitOutOfRange("year", obj.year);
    else if (!validMonth) return unitOutOfRange("month", obj.month);
    else if (!validDay) return unitOutOfRange("day", obj.day);
    else return false;
}
function hasInvalidTimeData(obj) {
    var hour = obj.hour, minute = obj.minute, second = obj.second, millisecond = obj.millisecond;
    var validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0, validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
    if (!validHour) return unitOutOfRange("hour", hour);
    else if (!validMinute) return unitOutOfRange("minute", minute);
    else if (!validSecond) return unitOutOfRange("second", second);
    else if (!validMillisecond) return unitOutOfRange("millisecond", millisecond);
    else return false;
}
var INVALID$2 = "Invalid DateTime";
var MAX_DATE = 8640000000000000;
function unsupportedZone(zone) {
    return new Invalid("unsupported zone", "the zone \"" + zone.name + "\" is not supported");
} // we cache week data on the DT object and this intermediates the cache
function possiblyCachedWeekData(dt) {
    if (dt.weekData === null) dt.weekData = gregorianToWeek(dt.c);
    return dt.weekData;
} // clone really means, "make a new object with these modifications". all "setters" really use this
// to create a new object while only changing some of the properties
function clone$1(inst, alts) {
    var current = {
        ts: inst.ts,
        zone: inst.zone,
        c: inst.c,
        o: inst.o,
        loc: inst.loc,
        invalid: inst.invalid
    };
    return new DateTime(Object.assign({
    }, current, alts, {
        old: current
    }));
} // find the right offset a given local time. The o input is our guess, which determines which
// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
function fixOffset(localTS, o, tz) {
    // Our UTC time is just a guess because our offset is just a guess
    var utcGuess = localTS - o * 60000; // Test whether the zone matches the offset for this ts
    var o2 = tz.offset(utcGuess); // If so, offset didn't change and we're done
    if (o === o2) return [
        utcGuess,
        o
    ];
     // If not, change the ts by the difference in the offset
    utcGuess -= (o2 - o) * 60000; // If that gives us the local time we want, we're done
    var o3 = tz.offset(utcGuess);
    if (o2 === o3) return [
        utcGuess,
        o2
    ];
     // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time
    return [
        localTS - Math.min(o2, o3) * 60000,
        Math.max(o2, o3)
    ];
} // convert an epoch timestamp into a calendar object with the given offset
function tsToObj(ts, offset6) {
    ts += offset6 * 60000;
    var d = new Date(ts);
    return {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate(),
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
        second: d.getUTCSeconds(),
        millisecond: d.getUTCMilliseconds()
    };
} // convert a calendar object to a epoch timestamp
function objToTS(obj, offset7, zone) {
    return fixOffset(objToLocalTS(obj), offset7, zone);
} // create a new DT instance by adding a duration, adjusting for DSTs
function adjustTime(inst, dur) {
    var oPre = inst.o, year = inst.c.year + Math.trunc(dur.years), month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c = Object.assign({
    }, inst.c, {
        year: year,
        month: month,
        day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
    }), millisToAdd = Duration.fromObject({
        years: dur.years - Math.trunc(dur.years),
        quarters: dur.quarters - Math.trunc(dur.quarters),
        months: dur.months - Math.trunc(dur.months),
        weeks: dur.weeks - Math.trunc(dur.weeks),
        days: dur.days - Math.trunc(dur.days),
        hours: dur.hours,
        minutes: dur.minutes,
        seconds: dur.seconds,
        milliseconds: dur.milliseconds
    }).as("milliseconds"), localTS = objToLocalTS(c);
    var _fixOffset = fixOffset(localTS, oPre, inst.zone), ts = _fixOffset[0], o = _fixOffset[1];
    if (millisToAdd !== 0) {
        ts += millisToAdd; // that could have changed the offset by going over a DST, but we want to keep the ts the same
        o = inst.zone.offset(ts);
    }
    return {
        ts: ts,
        o: o
    };
} // helper useful in turning the results of parsing into real dates
// by handling the zone options
function parseDataToDateTime(parsed, parsedZone, opts, format, text) {
    var setZone = opts.setZone, zone = opts.zone;
    if (parsed && Object.keys(parsed).length !== 0) {
        var interpretationZone = parsedZone || zone, inst = DateTime.fromObject(Object.assign(parsed, opts, {
            zone: interpretationZone,
            // setZone is a valid option in the calling methods, but not in fromObject
            setZone: undefined
        }));
        return setZone ? inst : inst.setZone(zone);
    } else return DateTime.invalid(new Invalid("unparsable", "the input \"" + text + "\" can't be parsed as " + format));
} // if you want to output a technical format (e.g. RFC 2822), this helper
// helps handle the details
function toTechFormat(dt, format, allowZ) {
    if (allowZ === void 0) allowZ = true;
    return dt.isValid ? Formatter.create(Locale.create("en-US"), {
        allowZ: allowZ,
        forceSimple: true
    }).formatDateTimeFromString(dt, format) : null;
} // technical time formats (e.g. the time part of ISO 8601), take some options
// and this commonizes their handling
function toTechTimeFormat(dt, _ref) {
    var _ref$suppressSeconds = _ref.suppressSeconds, suppressSeconds = _ref$suppressSeconds === void 0 ? false : _ref$suppressSeconds, _ref$suppressMillisec = _ref.suppressMilliseconds, suppressMilliseconds = _ref$suppressMillisec === void 0 ? false : _ref$suppressMillisec, includeOffset = _ref.includeOffset, _ref$includePrefix = _ref.includePrefix, includePrefix = _ref$includePrefix === void 0 ? false : _ref$includePrefix, _ref$includeZone = _ref.includeZone, includeZone = _ref$includeZone === void 0 ? false : _ref$includeZone, _ref$spaceZone = _ref.spaceZone, spaceZone = _ref$spaceZone === void 0 ? false : _ref$spaceZone, _ref$format = _ref.format, format = _ref$format === void 0 ? "extended" : _ref$format;
    var fmt = format === "basic" ? "HHmm" : "HH:mm";
    if (!suppressSeconds || dt.second !== 0 || dt.millisecond !== 0) {
        fmt += format === "basic" ? "ss" : ":ss";
        if (!suppressMilliseconds || dt.millisecond !== 0) fmt += ".SSS";
    }
    if ((includeZone || includeOffset) && spaceZone) fmt += " ";
    if (includeZone) fmt += "z";
    else if (includeOffset) fmt += format === "basic" ? "ZZZ" : "ZZ";
    var str = toTechFormat(dt, fmt);
    if (includePrefix) str = "T" + str;
    return str;
} // defaults for unspecified units in the supported calendars
var defaultUnitValues = {
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
}, defaultWeekUnitValues = {
    weekNumber: 1,
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
}, defaultOrdinalUnitValues = {
    ordinal: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
}; // Units in the supported calendars, sorted by bigness
var orderedUnits$1 = [
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "millisecond"
], orderedWeekUnits = [
    "weekYear",
    "weekNumber",
    "weekday",
    "hour",
    "minute",
    "second",
    "millisecond"
], orderedOrdinalUnits = [
    "year",
    "ordinal",
    "hour",
    "minute",
    "second",
    "millisecond"
]; // standardize case and plurality in units
function normalizeUnit(unit) {
    var normalized = {
        year: "year",
        years: "year",
        month: "month",
        months: "month",
        day: "day",
        days: "day",
        hour: "hour",
        hours: "hour",
        minute: "minute",
        minutes: "minute",
        quarter: "quarter",
        quarters: "quarter",
        second: "second",
        seconds: "second",
        millisecond: "millisecond",
        milliseconds: "millisecond",
        weekday: "weekday",
        weekdays: "weekday",
        weeknumber: "weekNumber",
        weeksnumber: "weekNumber",
        weeknumbers: "weekNumber",
        weekyear: "weekYear",
        weekyears: "weekYear",
        ordinal: "ordinal"
    }[unit.toLowerCase()];
    if (!normalized) throw new InvalidUnitError(unit);
    return normalized;
} // this is a dumbed down version of fromObject() that runs about 60% faster
// but doesn't do any validation, makes a bunch of assumptions about what units
// are present, and so on.
function quickDT(obj, zone) {
    // assume we have the higher-order units
    for(var _iterator = _createForOfIteratorHelperLoose(orderedUnits$1), _step; !(_step = _iterator()).done;){
        var u = _step.value;
        if (isUndefined(obj[u])) obj[u] = defaultUnitValues[u];
    }
    var invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
    if (invalid) return DateTime.invalid(invalid);
    var tsNow = Settings.now(), offsetProvis = zone.offset(tsNow), _objToTS = objToTS(obj, offsetProvis, zone), ts = _objToTS[0], o = _objToTS[1];
    return new DateTime({
        ts: ts,
        zone: zone,
        o: o
    });
}
function diffRelative(start, end, opts) {
    var round = isUndefined(opts.round) ? true : opts.round, format = function format(c, unit) {
        c = roundTo(c, round || opts.calendary ? 0 : 2, true);
        var formatter = end.loc.clone(opts).relFormatter(opts);
        return formatter.format(c, unit);
    }, differ = function differ(unit) {
        if (opts.calendary) {
            if (!end.hasSame(start, unit)) return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
            else return 0;
        } else return end.diff(start, unit).get(unit);
    };
    if (opts.unit) return format(differ(opts.unit), opts.unit);
    for(var _iterator2 = _createForOfIteratorHelperLoose(opts.units), _step2; !(_step2 = _iterator2()).done;){
        var unit1 = _step2.value;
        var count = differ(unit1);
        if (Math.abs(count) >= 1) return format(count, unit1);
    }
    return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
}
/**
 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
 *
 * A DateTime comprises of:
 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
 *
 * Here is a brief overview of the most commonly used functionality it provides:
 *
 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link local}, {@link utc}, and (most flexibly) {@link fromObject}. To create one from a standard string format, use {@link fromISO}, {@link fromHTTP}, and {@link fromRFC2822}. To create one from a custom string format, use {@link fromFormat}. To create one from a native JS date, use {@link fromJSDate}.
 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link toObject}), use the {@link year}, {@link month},
 * {@link day}, {@link hour}, {@link minute}, {@link second}, {@link millisecond} accessors.
 * * **Week calendar**: For ISO week calendar attributes, see the {@link weekYear}, {@link weekNumber}, and {@link weekday} accessors.
 * * **Configuration** See the {@link locale} and {@link numberingSystem} accessors.
 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link set}, {@link reconfigure}, {@link setZone}, {@link setLocale}, {@link plus}, {@link minus}, {@link endOf}, {@link startOf}, {@link toUTC}, and {@link toLocal}.
 * * **Output**: To convert the DateTime to other representations, use the {@link toRelative}, {@link toRelativeCalendar}, {@link toJSON}, {@link toISO}, {@link toHTTP}, {@link toObject}, {@link toRFC2822}, {@link toString}, {@link toLocaleString}, {@link toFormat}, {@link toMillis} and {@link toJSDate}.
 *
 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
 */ var DateTime = /*#__PURE__*/ function() {
    /**
   * @access private
   */ function DateTime1(config) {
        var zone = config.zone || Settings.defaultZone;
        var invalid = config.invalid || (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
        /**
     * @access private
     */ this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
        var c = null, o = null;
        if (!invalid) {
            var unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);
            if (unchanged) {
                var _ref2 = [
                    config.old.c,
                    config.old.o
                ];
                c = _ref2[0];
                o = _ref2[1];
            } else {
                var ot = zone.offset(this.ts);
                c = tsToObj(this.ts, ot);
                invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
                c = invalid ? null : c;
                o = invalid ? null : ot;
            }
        }
        /**
     * @access private
     */ this._zone = zone;
        /**
     * @access private
     */ this.loc = config.loc || Locale.create();
        /**
     * @access private
     */ this.invalid = invalid;
        /**
     * @access private
     */ this.weekData = null;
        /**
     * @access private
     */ this.c = c;
        /**
     * @access private
     */ this.o = o;
        /**
     * @access private
     */ this.isLuxonDateTime = true;
    } // CONSTRUCT
    /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */ DateTime1.now = function now() {
        return new DateTime1({
        });
    };
    DateTime1.local = function local(year, month, day, hour, minute, second, millisecond) {
        if (isUndefined(year)) return DateTime1.now();
        else return quickDT({
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second,
            millisecond: millisecond
        }, Settings.defaultZone);
    };
    DateTime1.utc = function utc(year, month, day, hour, minute, second, millisecond) {
        if (isUndefined(year)) return new DateTime1({
            ts: Settings.now(),
            zone: FixedOffsetZone.utcInstance
        });
        else return quickDT({
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second,
            millisecond: millisecond
        }, FixedOffsetZone.utcInstance);
    };
    DateTime1.fromJSDate = function fromJSDate(date, options) {
        if (options === void 0) options = {
        };
        var ts = isDate(date) ? date.valueOf() : NaN;
        if (Number.isNaN(ts)) return DateTime1.invalid("invalid input");
        var zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
        if (!zoneToUse.isValid) return DateTime1.invalid(unsupportedZone(zoneToUse));
        return new DateTime1({
            ts: ts,
            zone: zoneToUse,
            loc: Locale.fromObject(options)
        });
    };
    DateTime1.fromMillis = function fromMillis(milliseconds, options) {
        if (options === void 0) options = {
        };
        if (!isNumber(milliseconds)) throw new InvalidArgumentError("fromMillis requires a numerical input, but received a " + typeof milliseconds + " with value " + milliseconds);
        else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) // this isn't perfect because because we can still end up out of range because of additional shifting, but it's a start
        return DateTime1.invalid("Timestamp out of range");
        else return new DateTime1({
            ts: milliseconds,
            zone: normalizeZone(options.zone, Settings.defaultZone),
            loc: Locale.fromObject(options)
        });
    };
    DateTime1.fromSeconds = function fromSeconds(seconds, options) {
        if (options === void 0) options = {
        };
        if (!isNumber(seconds)) throw new InvalidArgumentError("fromSeconds requires a numerical input");
        else return new DateTime1({
            ts: seconds * 1000,
            zone: normalizeZone(options.zone, Settings.defaultZone),
            loc: Locale.fromObject(options)
        });
    };
    DateTime1.fromObject = function fromObject(obj) {
        var zoneToUse = normalizeZone(obj.zone, Settings.defaultZone);
        if (!zoneToUse.isValid) return DateTime1.invalid(unsupportedZone(zoneToUse));
        var tsNow = Settings.now(), offsetProvis = zoneToUse.offset(tsNow), normalized = normalizeObject(obj, normalizeUnit, [
            "zone",
            "locale",
            "outputCalendar",
            "numberingSystem"
        ]), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber, loc = Locale.fromObject(obj); // cases:
        // just a weekday -> this week's instance of that weekday, no worries
        // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
        // (gregorian month or day) + ordinal -> error
        // otherwise just use weeks or ordinals or gregorian, depending on what's specified
        if ((containsGregor || containsOrdinal) && definiteWeekDef) throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        if (containsGregorMD && containsOrdinal) throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
        var useWeekData = definiteWeekDef || normalized.weekday && !containsGregor; // configure ourselves to deal with gregorian dates or week stuff
        var units, defaultValues, objNow = tsToObj(tsNow, offsetProvis);
        if (useWeekData) {
            units = orderedWeekUnits;
            defaultValues = defaultWeekUnitValues;
            objNow = gregorianToWeek(objNow);
        } else if (containsOrdinal) {
            units = orderedOrdinalUnits;
            defaultValues = defaultOrdinalUnitValues;
            objNow = gregorianToOrdinal(objNow);
        } else {
            units = orderedUnits$1;
            defaultValues = defaultUnitValues;
        } // set default values for missing stuff
        var foundFirst = false;
        for(var _iterator3 = _createForOfIteratorHelperLoose(units), _step3; !(_step3 = _iterator3()).done;){
            var u = _step3.value;
            var v = normalized[u];
            if (!isUndefined(v)) foundFirst = true;
            else if (foundFirst) normalized[u] = defaultValues[u];
            else normalized[u] = objNow[u];
        } // make sure the values we have are in range
        var higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized), invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
        if (invalid) return DateTime1.invalid(invalid);
         // compute the actual time
        var gregorian = useWeekData ? weekToGregorian(normalized) : containsOrdinal ? ordinalToGregorian(normalized) : normalized, _objToTS2 = objToTS(gregorian, offsetProvis, zoneToUse), tsFinal = _objToTS2[0], offsetFinal = _objToTS2[1], inst = new DateTime1({
            ts: tsFinal,
            zone: zoneToUse,
            o: offsetFinal,
            loc: loc
        }); // gregorian data + weekday serves only to validate
        if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) return DateTime1.invalid("mismatched weekday", "you can't specify both a weekday of " + normalized.weekday + " and a date of " + inst.toISO());
        return inst;
    };
    DateTime1.fromISO = function fromISO(text, opts) {
        if (opts === void 0) opts = {
        };
        var _parseISODate = parseISODate(text), vals = _parseISODate[0], parsedZone = _parseISODate[1];
        return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
    };
    DateTime1.fromRFC2822 = function fromRFC2822(text, opts) {
        if (opts === void 0) opts = {
        };
        var _parseRFC2822Date = parseRFC2822Date(text), vals = _parseRFC2822Date[0], parsedZone = _parseRFC2822Date[1];
        return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
    };
    DateTime1.fromHTTP = function fromHTTP(text, opts) {
        if (opts === void 0) opts = {
        };
        var _parseHTTPDate = parseHTTPDate(text), vals = _parseHTTPDate[0], parsedZone = _parseHTTPDate[1];
        return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
    };
    DateTime1.fromFormat = function fromFormat(text, fmt, opts) {
        if (opts === void 0) opts = {
        };
        if (isUndefined(text) || isUndefined(fmt)) throw new InvalidArgumentError("fromFormat requires an input string and a format");
        var _opts = opts, _opts$locale = _opts.locale, locale = _opts$locale === void 0 ? null : _opts$locale, _opts$numberingSystem = _opts.numberingSystem, numberingSystem = _opts$numberingSystem === void 0 ? null : _opts$numberingSystem, localeToUse = Locale.fromOpts({
            locale: locale,
            numberingSystem: numberingSystem,
            defaultToEN: true
        }), _parseFromTokens = parseFromTokens(localeToUse, text, fmt), vals = _parseFromTokens[0], parsedZone = _parseFromTokens[1], invalid = _parseFromTokens[2];
        if (invalid) return DateTime1.invalid(invalid);
        else return parseDataToDateTime(vals, parsedZone, opts, "format " + fmt, text);
    };
    DateTime1.fromString = function fromString(text, fmt, opts) {
        if (opts === void 0) opts = {
        };
        return DateTime1.fromFormat(text, fmt, opts);
    };
    DateTime1.fromSQL = function fromSQL(text, opts) {
        if (opts === void 0) opts = {
        };
        var _parseSQL = parseSQL(text), vals = _parseSQL[0], parsedZone = _parseSQL[1];
        return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
    };
    DateTime1.invalid = function invalid(reason, explanation) {
        if (explanation === void 0) explanation = null;
        if (!reason) throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
        var invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) throw new InvalidDateTimeError(invalid);
        else return new DateTime1({
            invalid: invalid
        });
    };
    DateTime1.isDateTime = function isDateTime(o) {
        return o && o.isLuxonDateTime || false;
    } // INFO
    ;
    var _proto = DateTime1.prototype;
    _proto.get = function get(unit) {
        return this[unit];
    };
    /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */ _proto.resolvedLocaleOpts = function resolvedLocaleOpts(opts) {
        if (opts === void 0) opts = {
        };
        var _Formatter$create$res = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this), locale = _Formatter$create$res.locale, numberingSystem = _Formatter$create$res.numberingSystem, calendar = _Formatter$create$res.calendar;
        return {
            locale: locale,
            numberingSystem: numberingSystem,
            outputCalendar: calendar
        };
    } // TRANSFORM
    ;
    _proto.toUTC = function toUTC(offset8, opts) {
        if (offset8 === void 0) offset8 = 0;
        if (opts === void 0) opts = {
        };
        return this.setZone(FixedOffsetZone.instance(offset8), opts);
    };
    _proto.toLocal = function toLocal() {
        return this.setZone(Settings.defaultZone);
    };
    _proto.setZone = function setZone(zone, _temp) {
        var _ref3 = _temp === void 0 ? {
        } : _temp, _ref3$keepLocalTime = _ref3.keepLocalTime, keepLocalTime = _ref3$keepLocalTime === void 0 ? false : _ref3$keepLocalTime, _ref3$keepCalendarTim = _ref3.keepCalendarTime, keepCalendarTime = _ref3$keepCalendarTim === void 0 ? false : _ref3$keepCalendarTim;
        zone = normalizeZone(zone, Settings.defaultZone);
        if (zone.equals(this.zone)) return this;
        else if (!zone.isValid) return DateTime1.invalid(unsupportedZone(zone));
        else {
            var newTS = this.ts;
            if (keepLocalTime || keepCalendarTime) {
                var offsetGuess = zone.offset(this.ts);
                var asObj = this.toObject();
                var _objToTS3 = objToTS(asObj, offsetGuess, zone);
                newTS = _objToTS3[0];
            }
            return clone$1(this, {
                ts: newTS,
                zone: zone
            });
        }
    };
    _proto.reconfigure = function reconfigure(_temp2) {
        var _ref4 = _temp2 === void 0 ? {
        } : _temp2, locale = _ref4.locale, numberingSystem = _ref4.numberingSystem, outputCalendar = _ref4.outputCalendar;
        var loc = this.loc.clone({
            locale: locale,
            numberingSystem: numberingSystem,
            outputCalendar: outputCalendar
        });
        return clone$1(this, {
            loc: loc
        });
    };
    _proto.setLocale = function setLocale(locale) {
        return this.reconfigure({
            locale: locale
        });
    };
    _proto.set = function set(values) {
        if (!this.isValid) return this;
        var normalized = normalizeObject(values, normalizeUnit, []), settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
        if ((containsGregor || containsOrdinal) && definiteWeekDef) throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        if (containsGregorMD && containsOrdinal) throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
        var mixed;
        if (settingWeekStuff) mixed = weekToGregorian(Object.assign(gregorianToWeek(this.c), normalized));
        else if (!isUndefined(normalized.ordinal)) mixed = ordinalToGregorian(Object.assign(gregorianToOrdinal(this.c), normalized));
        else {
            mixed = Object.assign(this.toObject(), normalized); // if we didn't set the day but we ended up on an overflow date,
            // use the last day of the right month
            if (isUndefined(normalized.day)) mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
        }
        var _objToTS4 = objToTS(mixed, this.o, this.zone), ts = _objToTS4[0], o = _objToTS4[1];
        return clone$1(this, {
            ts: ts,
            o: o
        });
    };
    _proto.plus = function plus(duration) {
        if (!this.isValid) return this;
        var dur = friendlyDuration(duration);
        return clone$1(this, adjustTime(this, dur));
    };
    _proto.minus = function minus(duration) {
        if (!this.isValid) return this;
        var dur = friendlyDuration(duration).negate();
        return clone$1(this, adjustTime(this, dur));
    };
    _proto.startOf = function startOf(unit) {
        if (!this.isValid) return this;
        var o = {
        }, normalizedUnit = Duration.normalizeUnit(unit);
        switch(normalizedUnit){
            case "years":
                o.month = 1;
            // falls through
            case "quarters":
            case "months":
                o.day = 1;
            // falls through
            case "weeks":
            case "days":
                o.hour = 0;
            // falls through
            case "hours":
                o.minute = 0;
            // falls through
            case "minutes":
                o.second = 0;
            // falls through
            case "seconds":
                o.millisecond = 0;
                break;
        }
        if (normalizedUnit === "weeks") o.weekday = 1;
        if (normalizedUnit === "quarters") {
            var q = Math.ceil(this.month / 3);
            o.month = (q - 1) * 3 + 1;
        }
        return this.set(o);
    };
    _proto.endOf = function endOf(unit) {
        var _this$plus;
        return this.isValid ? this.plus((_this$plus = {
        }, _this$plus[unit] = 1, _this$plus)).startOf(unit).minus(1) : this;
    } // OUTPUT
    ;
    _proto.toFormat = function toFormat(fmt, opts) {
        if (opts === void 0) opts = {
        };
        return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID$2;
    };
    _proto.toLocaleString = function toLocaleString(opts) {
        if (opts === void 0) opts = DATE_SHORT;
        return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTime(this) : INVALID$2;
    };
    _proto.toLocaleParts = function toLocaleParts(opts) {
        if (opts === void 0) opts = {
        };
        return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
    };
    _proto.toISO = function toISO(opts) {
        if (opts === void 0) opts = {
        };
        if (!this.isValid) return null;
        return this.toISODate(opts) + "T" + this.toISOTime(opts);
    };
    _proto.toISODate = function toISODate(_temp3) {
        var _ref5 = _temp3 === void 0 ? {
        } : _temp3, _ref5$format = _ref5.format, format = _ref5$format === void 0 ? "extended" : _ref5$format;
        var fmt = format === "basic" ? "yyyyMMdd" : "yyyy-MM-dd";
        if (this.year > 9999) fmt = "+" + fmt;
        return toTechFormat(this, fmt);
    };
    _proto.toISOWeekDate = function toISOWeekDate() {
        return toTechFormat(this, "kkkk-'W'WW-c");
    };
    _proto.toISOTime = function toISOTime(_temp4) {
        var _ref6 = _temp4 === void 0 ? {
        } : _temp4, _ref6$suppressMillise = _ref6.suppressMilliseconds, suppressMilliseconds = _ref6$suppressMillise === void 0 ? false : _ref6$suppressMillise, _ref6$suppressSeconds = _ref6.suppressSeconds, suppressSeconds = _ref6$suppressSeconds === void 0 ? false : _ref6$suppressSeconds, _ref6$includeOffset = _ref6.includeOffset, includeOffset = _ref6$includeOffset === void 0 ? true : _ref6$includeOffset, _ref6$includePrefix = _ref6.includePrefix, includePrefix = _ref6$includePrefix === void 0 ? false : _ref6$includePrefix, _ref6$format = _ref6.format, format = _ref6$format === void 0 ? "extended" : _ref6$format;
        return toTechTimeFormat(this, {
            suppressSeconds: suppressSeconds,
            suppressMilliseconds: suppressMilliseconds,
            includeOffset: includeOffset,
            includePrefix: includePrefix,
            format: format
        });
    };
    _proto.toRFC2822 = function toRFC2822() {
        return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
    };
    _proto.toHTTP = function toHTTP() {
        return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
    };
    _proto.toSQLDate = function toSQLDate() {
        return toTechFormat(this, "yyyy-MM-dd");
    };
    _proto.toSQLTime = function toSQLTime(_temp5) {
        var _ref7 = _temp5 === void 0 ? {
        } : _temp5, _ref7$includeOffset = _ref7.includeOffset, includeOffset = _ref7$includeOffset === void 0 ? true : _ref7$includeOffset, _ref7$includeZone = _ref7.includeZone, includeZone = _ref7$includeZone === void 0 ? false : _ref7$includeZone;
        return toTechTimeFormat(this, {
            includeOffset: includeOffset,
            includeZone: includeZone,
            spaceZone: true
        });
    };
    _proto.toSQL = function toSQL(opts) {
        if (opts === void 0) opts = {
        };
        if (!this.isValid) return null;
        return this.toSQLDate() + " " + this.toSQLTime(opts);
    };
    _proto.toString = function toString() {
        return this.isValid ? this.toISO() : INVALID$2;
    };
    _proto.valueOf = function valueOf() {
        return this.toMillis();
    };
    _proto.toMillis = function toMillis() {
        return this.isValid ? this.ts : NaN;
    };
    _proto.toSeconds = function toSeconds() {
        return this.isValid ? this.ts / 1000 : NaN;
    };
    _proto.toJSON = function toJSON() {
        return this.toISO();
    };
    _proto.toBSON = function toBSON() {
        return this.toJSDate();
    };
    _proto.toObject = function toObject(opts) {
        if (opts === void 0) opts = {
        };
        if (!this.isValid) return {
        };
        var base = Object.assign({
        }, this.c);
        if (opts.includeConfig) {
            base.outputCalendar = this.outputCalendar;
            base.numberingSystem = this.loc.numberingSystem;
            base.locale = this.loc.locale;
        }
        return base;
    };
    _proto.toJSDate = function toJSDate() {
        return new Date(this.isValid ? this.ts : NaN);
    } // COMPARE
    ;
    _proto.diff = function diff(otherDateTime, unit, opts) {
        if (unit === void 0) unit = "milliseconds";
        if (opts === void 0) opts = {
        };
        if (!this.isValid || !otherDateTime.isValid) return Duration.invalid(this.invalid || otherDateTime.invalid, "created by diffing an invalid DateTime");
        var durOpts = Object.assign({
            locale: this.locale,
            numberingSystem: this.numberingSystem
        }, opts);
        var units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = _diff(earlier, later, units, durOpts);
        return otherIsLater ? diffed.negate() : diffed;
    };
    _proto.diffNow = function diffNow(unit, opts) {
        if (unit === void 0) unit = "milliseconds";
        if (opts === void 0) opts = {
        };
        return this.diff(DateTime1.now(), unit, opts);
    };
    _proto.until = function until(otherDateTime) {
        return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
    };
    _proto.hasSame = function hasSame(otherDateTime, unit) {
        if (!this.isValid) return false;
        var inputMs = otherDateTime.valueOf();
        var otherZoneDateTime = this.setZone(otherDateTime.zone, {
            keepLocalTime: true
        });
        return otherZoneDateTime.startOf(unit) <= inputMs && inputMs <= otherZoneDateTime.endOf(unit);
    };
    _proto.equals = function equals(other) {
        return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
    };
    _proto.toRelative = function toRelative(options) {
        if (options === void 0) options = {
        };
        if (!this.isValid) return null;
        var base = options.base || DateTime1.fromObject({
            zone: this.zone
        }), padding = options.padding ? this < base ? -options.padding : options.padding : 0;
        var units = [
            "years",
            "months",
            "days",
            "hours",
            "minutes",
            "seconds"
        ];
        var unit = options.unit;
        if (Array.isArray(options.unit)) {
            units = options.unit;
            unit = undefined;
        }
        return diffRelative(base, this.plus(padding), Object.assign(options, {
            numeric: "always",
            units: units,
            unit: unit
        }));
    };
    _proto.toRelativeCalendar = function toRelativeCalendar(options) {
        if (options === void 0) options = {
        };
        if (!this.isValid) return null;
        return diffRelative(options.base || DateTime1.fromObject({
            zone: this.zone
        }), this, Object.assign(options, {
            numeric: "auto",
            units: [
                "years",
                "months",
                "days"
            ],
            calendary: true
        }));
    };
    DateTime1.min = function min() {
        for(var _len = arguments.length, dateTimes = new Array(_len), _key = 0; _key < _len; _key++)dateTimes[_key] = arguments[_key];
        if (!dateTimes.every(DateTime1.isDateTime)) throw new InvalidArgumentError("min requires all arguments be DateTimes");
        return bestBy(dateTimes, function(i) {
            return i.valueOf();
        }, Math.min);
    };
    DateTime1.max = function max() {
        for(var _len2 = arguments.length, dateTimes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)dateTimes[_key2] = arguments[_key2];
        if (!dateTimes.every(DateTime1.isDateTime)) throw new InvalidArgumentError("max requires all arguments be DateTimes");
        return bestBy(dateTimes, function(i) {
            return i.valueOf();
        }, Math.max);
    } // MISC
    ;
    DateTime1.fromFormatExplain = function fromFormatExplain(text, fmt, options) {
        if (options === void 0) options = {
        };
        var _options = options, _options$locale = _options.locale, locale = _options$locale === void 0 ? null : _options$locale, _options$numberingSys = _options.numberingSystem, numberingSystem = _options$numberingSys === void 0 ? null : _options$numberingSys, localeToUse = Locale.fromOpts({
            locale: locale,
            numberingSystem: numberingSystem,
            defaultToEN: true
        });
        return explainFromTokens(localeToUse, text, fmt);
    };
    DateTime1.fromStringExplain = function fromStringExplain(text, fmt, options) {
        if (options === void 0) options = {
        };
        return DateTime1.fromFormatExplain(text, fmt, options);
    } // FORMAT PRESETS
    ;
    _createClass(DateTime1, [
        {
            key: "isValid",
            get: function get() {
                return this.invalid === null;
            }
        },
        {
            key: "invalidReason",
            get: function get() {
                return this.invalid ? this.invalid.reason : null;
            }
        },
        {
            key: "invalidExplanation",
            get: function get() {
                return this.invalid ? this.invalid.explanation : null;
            }
        },
        {
            key: "locale",
            get: function get() {
                return this.isValid ? this.loc.locale : null;
            }
        },
        {
            key: "numberingSystem",
            get: function get() {
                return this.isValid ? this.loc.numberingSystem : null;
            }
        },
        {
            key: "outputCalendar",
            get: function get() {
                return this.isValid ? this.loc.outputCalendar : null;
            }
        },
        {
            key: "zone",
            get: function get() {
                return this._zone;
            }
        },
        {
            key: "zoneName",
            get: function get() {
                return this.isValid ? this.zone.name : null;
            }
        },
        {
            key: "year",
            get: function get() {
                return this.isValid ? this.c.year : NaN;
            }
        },
        {
            key: "quarter",
            get: function get() {
                return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
            }
        },
        {
            key: "month",
            get: function get() {
                return this.isValid ? this.c.month : NaN;
            }
        },
        {
            key: "day",
            get: function get() {
                return this.isValid ? this.c.day : NaN;
            }
        },
        {
            key: "hour",
            get: function get() {
                return this.isValid ? this.c.hour : NaN;
            }
        },
        {
            key: "minute",
            get: function get() {
                return this.isValid ? this.c.minute : NaN;
            }
        },
        {
            key: "second",
            get: function get() {
                return this.isValid ? this.c.second : NaN;
            }
        },
        {
            key: "millisecond",
            get: function get() {
                return this.isValid ? this.c.millisecond : NaN;
            }
        },
        {
            key: "weekYear",
            get: function get() {
                return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
            }
        },
        {
            key: "weekNumber",
            get: function get() {
                return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
            }
        },
        {
            key: "weekday",
            get: function get() {
                return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
            }
        },
        {
            key: "ordinal",
            get: function get() {
                return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
            }
        },
        {
            key: "monthShort",
            get: function get() {
                return this.isValid ? Info.months("short", {
                    locObj: this.loc
                })[this.month - 1] : null;
            }
        },
        {
            key: "monthLong",
            get: function get() {
                return this.isValid ? Info.months("long", {
                    locObj: this.loc
                })[this.month - 1] : null;
            }
        },
        {
            key: "weekdayShort",
            get: function get() {
                return this.isValid ? Info.weekdays("short", {
                    locObj: this.loc
                })[this.weekday - 1] : null;
            }
        },
        {
            key: "weekdayLong",
            get: function get() {
                return this.isValid ? Info.weekdays("long", {
                    locObj: this.loc
                })[this.weekday - 1] : null;
            }
        },
        {
            key: "offset",
            get: function get() {
                return this.isValid ? +this.o : NaN;
            }
        },
        {
            key: "offsetNameShort",
            get: function get() {
                if (this.isValid) return this.zone.offsetName(this.ts, {
                    format: "short",
                    locale: this.locale
                });
                else return null;
            }
        },
        {
            key: "offsetNameLong",
            get: function get() {
                if (this.isValid) return this.zone.offsetName(this.ts, {
                    format: "long",
                    locale: this.locale
                });
                else return null;
            }
        },
        {
            key: "isOffsetFixed",
            get: function get() {
                return this.isValid ? this.zone.universal : null;
            }
        },
        {
            key: "isInDST",
            get: function get() {
                if (this.isOffsetFixed) return false;
                else return this.offset > this.set({
                    month: 1
                }).offset || this.offset > this.set({
                    month: 5
                }).offset;
            }
        },
        {
            key: "isInLeapYear",
            get: function get() {
                return isLeapYear(this.year);
            }
        },
        {
            key: "daysInMonth",
            get: function get() {
                return daysInMonth(this.year, this.month);
            }
        },
        {
            key: "daysInYear",
            get: function get() {
                return this.isValid ? daysInYear(this.year) : NaN;
            }
        },
        {
            key: "weeksInWeekYear",
            get: function get() {
                return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
            }
        }
    ], [
        {
            key: "DATE_SHORT",
            get: function get() {
                return DATE_SHORT;
            }
        },
        {
            key: "DATE_MED",
            get: function get() {
                return DATE_MED;
            }
        },
        {
            key: "DATE_MED_WITH_WEEKDAY",
            get: function get() {
                return DATE_MED_WITH_WEEKDAY;
            }
        },
        {
            key: "DATE_FULL",
            get: function get() {
                return DATE_FULL;
            }
        },
        {
            key: "DATE_HUGE",
            get: function get() {
                return DATE_HUGE;
            }
        },
        {
            key: "TIME_SIMPLE",
            get: function get() {
                return TIME_SIMPLE;
            }
        },
        {
            key: "TIME_WITH_SECONDS",
            get: function get() {
                return TIME_WITH_SECONDS;
            }
        },
        {
            key: "TIME_WITH_SHORT_OFFSET",
            get: function get() {
                return TIME_WITH_SHORT_OFFSET;
            }
        },
        {
            key: "TIME_WITH_LONG_OFFSET",
            get: function get() {
                return TIME_WITH_LONG_OFFSET;
            }
        },
        {
            key: "TIME_24_SIMPLE",
            get: function get() {
                return TIME_24_SIMPLE;
            }
        },
        {
            key: "TIME_24_WITH_SECONDS",
            get: function get() {
                return TIME_24_WITH_SECONDS;
            }
        },
        {
            key: "TIME_24_WITH_SHORT_OFFSET",
            get: function get() {
                return TIME_24_WITH_SHORT_OFFSET;
            }
        },
        {
            key: "TIME_24_WITH_LONG_OFFSET",
            get: function get() {
                return TIME_24_WITH_LONG_OFFSET;
            }
        },
        {
            key: "DATETIME_SHORT",
            get: function get() {
                return DATETIME_SHORT;
            }
        },
        {
            key: "DATETIME_SHORT_WITH_SECONDS",
            get: function get() {
                return DATETIME_SHORT_WITH_SECONDS;
            }
        },
        {
            key: "DATETIME_MED",
            get: function get() {
                return DATETIME_MED;
            }
        },
        {
            key: "DATETIME_MED_WITH_SECONDS",
            get: function get() {
                return DATETIME_MED_WITH_SECONDS;
            }
        },
        {
            key: "DATETIME_MED_WITH_WEEKDAY",
            get: function get() {
                return DATETIME_MED_WITH_WEEKDAY;
            }
        },
        {
            key: "DATETIME_FULL",
            get: function get() {
                return DATETIME_FULL;
            }
        },
        {
            key: "DATETIME_FULL_WITH_SECONDS",
            get: function get() {
                return DATETIME_FULL_WITH_SECONDS;
            }
        },
        {
            key: "DATETIME_HUGE",
            get: function get() {
                return DATETIME_HUGE;
            }
        },
        {
            key: "DATETIME_HUGE_WITH_SECONDS",
            get: function get() {
                return DATETIME_HUGE_WITH_SECONDS;
            }
        }
    ]);
    return DateTime1;
}();
function friendlyDateTime(dateTimeish) {
    if (DateTime.isDateTime(dateTimeish)) return dateTimeish;
    else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) return DateTime.fromJSDate(dateTimeish);
    else if (dateTimeish && typeof dateTimeish === "object") return DateTime.fromObject(dateTimeish);
    else throw new InvalidArgumentError("Unknown datetime argument: " + dateTimeish + ", of type " + typeof dateTimeish);
}
var VERSION = "1.28.0";
exports.DateTime = DateTime;
exports.Duration = Duration;
exports.FixedOffsetZone = FixedOffsetZone;
exports.IANAZone = IANAZone;
exports.Info = Info;
exports.Interval = Interval;
exports.InvalidZone = InvalidZone;
exports.LocalZone = LocalZone;
exports.Settings = Settings;
exports.VERSION = VERSION;
exports.Zone = Zone;

},{}],"jkQ8q":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "fromText", ()=>fromText
);
parcelHelpers.export(exports, "parseText", ()=>_parsetextDefault.default
);
parcelHelpers.export(exports, "isFullyConvertible", ()=>isFullyConvertible
);
parcelHelpers.export(exports, "toText", ()=>toText
);
var _totext = require("./totext");
var _totextDefault = parcelHelpers.interopDefault(_totext);
var _parsetext = require("./parsetext");
var _parsetextDefault = parcelHelpers.interopDefault(_parsetext);
var _index = require("../index");
var _indexDefault = parcelHelpers.interopDefault(_index);
var _i18N = require("./i18n");
var _i18NDefault = parcelHelpers.interopDefault(_i18N);
/*!
* rrule.js - Library for working with recurrence rules for calendar dates.
* https://github.com/jakubroztocil/rrule
*
* Copyright 2010, Jakub Roztocil and Lars Schoning
* Licenced under the BSD licence.
* https://github.com/jakubroztocil/rrule/blob/master/LICENCE
*
*/ /**
 *
 * Implementation of RRule.fromText() and RRule::toText().
 *
 *
 * On the client side, this file needs to be included
 * when those functions are used.
 *
 */ // =============================================================================
// fromText
// =============================================================================
/**
 * Will be able to convert some of the below described rules from
 * text format to a rule object.
 *
 *
 * RULES
 *
 * Every ([n])
 *       day(s)
 *     | [weekday], ..., (and) [weekday]
 *     | weekday(s)
 *     | week(s)
 *     | month(s)
 *     | [month], ..., (and) [month]
 *     | year(s)
 *
 *
 * Plus 0, 1, or multiple of these:
 *
 * on [weekday], ..., (or) [weekday] the [monthday], [monthday], ... (or) [monthday]
 *
 * on [weekday], ..., (and) [weekday]
 *
 * on the [monthday], [monthday], ... (and) [monthday] (day of the month)
 *
 * on the [nth-weekday], ..., (and) [nth-weekday] (of the month/year)
 *
 *
 * Plus 0 or 1 of these:
 *
 * for [n] time(s)
 *
 * until [date]
 *
 * Plus (.)
 *
 *
 * Definitely no supported for parsing:
 *
 * (for year):
 *     in week(s) [n], ..., (and) [n]
 *
 *     on the [yearday], ..., (and) [n] day of the year
 *     on day [yearday], ..., (and) [n]
 *
 *
 * NON-TERMINALS
 *
 * [n]: 1, 2 ..., one, two, three ..
 * [month]: January, February, March, April, May, ... December
 * [weekday]: Monday, ... Sunday
 * [nth-weekday]: first [weekday], 2nd [weekday], ... last [weekday], ...
 * [monthday]: first, 1., 2., 1st, 2nd, second, ... 31st, last day, 2nd last day, ..
 * [date]:
 *     [month] (0-31(,) ([year])),
 *     (the) 0-31.(1-12.([year])),
 *     (the) 0-31/(1-12/([year])),
 *     [weekday]
 *
 * [year]: 0000, 0001, ... 01, 02, ..
 *
 * Definitely not supported for parsing:
 *
 * [yearday]: first, 1., 2., 1st, 2nd, second, ... 366th, last day, 2nd last day, ..
 *
 * @param {String} text
 * @return {Object, Boolean} the rule, or null.
 */ var fromText = function(text, language) {
    if (language === void 0) language = _i18NDefault.default;
    return new _indexDefault.default(_parsetextDefault.default(text, language) || undefined);
};
var common = [
    'count',
    'until',
    'interval',
    'byweekday',
    'bymonthday',
    'bymonth'
];
_totextDefault.default.IMPLEMENTED = [];
_totextDefault.default.IMPLEMENTED[_indexDefault.default.HOURLY] = common;
_totextDefault.default.IMPLEMENTED[_indexDefault.default.MINUTELY] = common;
_totextDefault.default.IMPLEMENTED[_indexDefault.default.DAILY] = [
    'byhour'
].concat(common);
_totextDefault.default.IMPLEMENTED[_indexDefault.default.WEEKLY] = common;
_totextDefault.default.IMPLEMENTED[_indexDefault.default.MONTHLY] = common;
_totextDefault.default.IMPLEMENTED[_indexDefault.default.YEARLY] = [
    'byweekno',
    'byyearday'
].concat(common);
// =============================================================================
// Export
// =============================================================================
var toText = function(rrule, gettext, language) {
    return new _totextDefault.default(rrule, gettext, language).toString();
};
var isFullyConvertible = _totextDefault.default.isFullyConvertible;

},{"./totext":"fchUC","./parsetext":"908Jq","../index":"idCmx","./i18n":"cRPwz","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"fchUC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _i18N = require("./i18n");
var _i18NDefault = parcelHelpers.interopDefault(_i18N);
var _index = require("../index");
var _indexDefault = parcelHelpers.interopDefault(_index);
var _helpers = require("../helpers");
// =============================================================================
// Helper functions
// =============================================================================
/**
 * Return true if a value is in an array
 */ var contains = function(arr, val) {
    return arr.indexOf(val) !== -1;
};
var defaultGetText = function(id) {
    return id.toString();
};
/**
 *
 * @param {RRule} rrule
 * Optional:
 * @param {Function} gettext function
 * @param {Object} language definition
 * @constructor
 */ var ToText = function() {
    function ToText1(rrule, gettext, language) {
        if (gettext === void 0) gettext = defaultGetText;
        if (language === void 0) language = _i18NDefault.default;
        this.text = [];
        this.language = language || _i18NDefault.default;
        this.gettext = gettext;
        this.rrule = rrule;
        this.options = rrule.options;
        this.origOptions = rrule.origOptions;
        if (this.origOptions.bymonthday) {
            var bymonthday = [].concat(this.options.bymonthday);
            var bynmonthday = [].concat(this.options.bynmonthday);
            bymonthday.sort(function(a, b) {
                return a - b;
            });
            bynmonthday.sort(function(a, b) {
                return b - a;
            });
            // 1, 2, 3, .., -5, -4, -3, ..
            this.bymonthday = bymonthday.concat(bynmonthday);
            if (!this.bymonthday.length) this.bymonthday = null;
        }
        if (_helpers.isPresent(this.origOptions.byweekday)) {
            var byweekday = !_helpers.isArray(this.origOptions.byweekday) ? [
                this.origOptions.byweekday
            ] : this.origOptions.byweekday;
            var days = String(byweekday);
            this.byweekday = {
                allWeeks: byweekday.filter(function(weekday) {
                    return !weekday.n;
                }),
                someWeeks: byweekday.filter(function(weekday) {
                    return Boolean(weekday.n);
                }),
                isWeekdays: days.indexOf('MO') !== -1 && days.indexOf('TU') !== -1 && days.indexOf('WE') !== -1 && days.indexOf('TH') !== -1 && days.indexOf('FR') !== -1 && days.indexOf('SA') === -1 && days.indexOf('SU') === -1,
                isEveryDay: days.indexOf('MO') !== -1 && days.indexOf('TU') !== -1 && days.indexOf('WE') !== -1 && days.indexOf('TH') !== -1 && days.indexOf('FR') !== -1 && days.indexOf('SA') !== -1 && days.indexOf('SU') !== -1
            };
            var sortWeekDays = function(a, b) {
                return a.weekday - b.weekday;
            };
            this.byweekday.allWeeks.sort(sortWeekDays);
            this.byweekday.someWeeks.sort(sortWeekDays);
            if (!this.byweekday.allWeeks.length) this.byweekday.allWeeks = null;
            if (!this.byweekday.someWeeks.length) this.byweekday.someWeeks = null;
        } else this.byweekday = null;
    }
    /**
     * Test whether the rrule can be fully converted to text.
     * @param {RRule} rrule
     * @return {Boolean}
     */ ToText1.isFullyConvertible = function(rrule) {
        var canConvert = true;
        if (!(rrule.options.freq in ToText1.IMPLEMENTED)) return false;
        if (rrule.origOptions.until && rrule.origOptions.count) return false;
        for(var key in rrule.origOptions){
            if (contains([
                'dtstart',
                'wkst',
                'freq'
            ], key)) return true;
            if (!contains(ToText1.IMPLEMENTED[rrule.options.freq], key)) return false;
        }
        return canConvert;
    };
    ToText1.prototype.isFullyConvertible = function() {
        return ToText1.isFullyConvertible(this.rrule);
    };
    /**
     * Perform the conversion. Only some of the frequencies are supported.
     * If some of the rrule's options aren't supported, they'll
     * be omitted from the output an "(~ approximate)" will be appended.
     * @return {*}
     */ ToText1.prototype.toString = function() {
        var gettext = this.gettext;
        if (!(this.options.freq in ToText1.IMPLEMENTED)) return gettext('RRule error: Unable to fully convert this rrule to text');
        this.text = [
            gettext('every')
        ];
        // @ts-ignore
        this[_indexDefault.default.FREQUENCIES[this.options.freq]]();
        if (this.options.until) {
            this.add(gettext('until'));
            var until = this.options.until;
            this.add(this.language.monthNames[until.getUTCMonth()]).add(until.getUTCDate() + ',').add(until.getUTCFullYear().toString());
        } else if (this.options.count) this.add(gettext('for')).add(this.options.count.toString()).add(this.plural(this.options.count) ? gettext('times') : gettext('time'));
        if (!this.isFullyConvertible()) this.add(gettext('(~ approximate)'));
        return this.text.join('');
    };
    ToText1.prototype.HOURLY = function() {
        var gettext = this.gettext;
        if (this.options.interval !== 1) this.add(this.options.interval.toString());
        this.add(this.plural(this.options.interval) ? gettext('hours') : gettext('hour'));
    };
    ToText1.prototype.MINUTELY = function() {
        var gettext = this.gettext;
        if (this.options.interval !== 1) this.add(this.options.interval.toString());
        this.add(this.plural(this.options.interval) ? gettext('minutes') : gettext('minutes'));
    };
    ToText1.prototype.DAILY = function() {
        var gettext = this.gettext;
        if (this.options.interval !== 1) this.add(this.options.interval.toString());
        if (this.byweekday && this.byweekday.isWeekdays) this.add(this.plural(this.options.interval) ? gettext('weekdays') : gettext('weekday'));
        else this.add(this.plural(this.options.interval) ? gettext('days') : gettext('day'));
        if (this.origOptions.bymonth) {
            this.add(gettext('in'));
            this._bymonth();
        }
        if (this.bymonthday) this._bymonthday();
        else if (this.byweekday) this._byweekday();
        else if (this.origOptions.byhour) this._byhour();
    };
    ToText1.prototype.WEEKLY = function() {
        var gettext = this.gettext;
        if (this.options.interval !== 1) this.add(this.options.interval.toString()).add(this.plural(this.options.interval) ? gettext('weeks') : gettext('week'));
        if (this.byweekday && this.byweekday.isWeekdays) {
            if (this.options.interval === 1) this.add(this.plural(this.options.interval) ? gettext('weekdays') : gettext('weekday'));
            else this.add(gettext('on')).add(gettext('weekdays'));
        } else if (this.byweekday && this.byweekday.isEveryDay) this.add(this.plural(this.options.interval) ? gettext('days') : gettext('day'));
        else {
            if (this.options.interval === 1) this.add(gettext('week'));
            if (this.origOptions.bymonth) {
                this.add(gettext('in'));
                this._bymonth();
            }
            if (this.bymonthday) this._bymonthday();
            else if (this.byweekday) this._byweekday();
        }
    };
    ToText1.prototype.MONTHLY = function() {
        var gettext = this.gettext;
        if (this.origOptions.bymonth) {
            if (this.options.interval !== 1) {
                this.add(this.options.interval.toString()).add(gettext('months'));
                if (this.plural(this.options.interval)) this.add(gettext('in'));
            }
            this._bymonth();
        } else {
            if (this.options.interval !== 1) this.add(this.options.interval.toString());
            this.add(this.plural(this.options.interval) ? gettext('months') : gettext('month'));
        }
        if (this.bymonthday) this._bymonthday();
        else if (this.byweekday && this.byweekday.isWeekdays) this.add(gettext('on')).add(gettext('weekdays'));
        else if (this.byweekday) this._byweekday();
    };
    ToText1.prototype.YEARLY = function() {
        var gettext = this.gettext;
        if (this.origOptions.bymonth) {
            if (this.options.interval !== 1) {
                this.add(this.options.interval.toString());
                this.add(gettext('years'));
            }
            this._bymonth();
        } else {
            if (this.options.interval !== 1) this.add(this.options.interval.toString());
            this.add(this.plural(this.options.interval) ? gettext('years') : gettext('year'));
        }
        if (this.bymonthday) this._bymonthday();
        else if (this.byweekday) this._byweekday();
        if (this.options.byyearday) this.add(gettext('on the')).add(this.list(this.options.byyearday, this.nth, gettext('and'))).add(gettext('day'));
        if (this.options.byweekno) this.add(gettext('in')).add(this.plural(this.options.byweekno.length) ? gettext('weeks') : gettext('week')).add(this.list(this.options.byweekno, undefined, gettext('and')));
    };
    ToText1.prototype._bymonthday = function() {
        var gettext = this.gettext;
        if (this.byweekday && this.byweekday.allWeeks) this.add(gettext('on')).add(this.list(this.byweekday.allWeeks, this.weekdaytext, gettext('or'))).add(gettext('the')).add(this.list(this.bymonthday, this.nth, gettext('or')));
        else this.add(gettext('on the')).add(this.list(this.bymonthday, this.nth, gettext('and')));
    // this.add(gettext('DAY'))
    };
    ToText1.prototype._byweekday = function() {
        var gettext = this.gettext;
        if (this.byweekday.allWeeks && !this.byweekday.isWeekdays) this.add(gettext('on')).add(this.list(this.byweekday.allWeeks, this.weekdaytext));
        if (this.byweekday.someWeeks) {
            if (this.byweekday.allWeeks) this.add(gettext('and'));
            this.add(gettext('on the')).add(this.list(this.byweekday.someWeeks, this.weekdaytext, gettext('and')));
        }
    };
    ToText1.prototype._byhour = function() {
        var gettext = this.gettext;
        this.add(gettext('at')).add(this.list(this.origOptions.byhour, undefined, gettext('and')));
    };
    ToText1.prototype._bymonth = function() {
        this.add(this.list(this.options.bymonth, this.monthtext, this.gettext('and')));
    };
    ToText1.prototype.nth = function(n) {
        n = parseInt(n.toString(), 10);
        var nth;
        var npos;
        var gettext = this.gettext;
        if (n === -1) return gettext('last');
        npos = Math.abs(n);
        switch(npos){
            case 1:
            case 21:
            case 31:
                nth = npos + gettext('st');
                break;
            case 2:
            case 22:
                nth = npos + gettext('nd');
                break;
            case 3:
            case 23:
                nth = npos + gettext('rd');
                break;
            default:
                nth = npos + gettext('th');
        }
        return n < 0 ? nth + ' ' + gettext('last') : nth;
    };
    ToText1.prototype.monthtext = function(m) {
        return this.language.monthNames[m - 1];
    };
    ToText1.prototype.weekdaytext = function(wday) {
        var weekday = _helpers.isNumber(wday) ? (wday + 1) % 7 : wday.getJsWeekday();
        return (wday.n ? this.nth(wday.n) + ' ' : '') + this.language.dayNames[weekday];
    };
    ToText1.prototype.plural = function(n) {
        return n % 100 !== 1;
    };
    ToText1.prototype.add = function(s) {
        this.text.push(' ');
        this.text.push(s);
        return this;
    };
    ToText1.prototype.list = function(arr, callback, finalDelim, delim) {
        if (delim === void 0) delim = ',';
        if (!_helpers.isArray(arr)) arr = [
            arr
        ];
        var delimJoin = function(array, delimiter, finalDelimiter) {
            var list = '';
            for(var i = 0; i < array.length; i++){
                if (i !== 0) {
                    if (i === array.length - 1) list += ' ' + finalDelimiter + ' ';
                    else list += delimiter + ' ';
                }
                list += array[i];
            }
            return list;
        };
        callback = callback || function(o) {
            return o.toString();
        };
        var self = this;
        var realCallback = function(arg) {
            return callback && callback.call(self, arg);
        };
        if (finalDelim) return delimJoin(arr.map(realCallback), delim, finalDelim);
        else return arr.map(realCallback).join(delim + ' ');
    };
    return ToText1;
}();
exports.default = ToText;

},{"./i18n":"cRPwz","../index":"idCmx","../helpers":"9UCZ2","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"cRPwz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// =============================================================================
// i18n
// =============================================================================
var ENGLISH = {
    dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    tokens: {
        'SKIP': /^[ \r\n\t]+|^\.$/,
        'number': /^[1-9][0-9]*/,
        'numberAsText': /^(one|two|three)/i,
        'every': /^every/i,
        'day(s)': /^days?/i,
        'weekday(s)': /^weekdays?/i,
        'week(s)': /^weeks?/i,
        'hour(s)': /^hours?/i,
        'minute(s)': /^minutes?/i,
        'month(s)': /^months?/i,
        'year(s)': /^years?/i,
        'on': /^(on|in)/i,
        'at': /^(at)/i,
        'the': /^the/i,
        'first': /^first/i,
        'second': /^second/i,
        'third': /^third/i,
        'nth': /^([1-9][0-9]*)(\.|th|nd|rd|st)/i,
        'last': /^last/i,
        'for': /^for/i,
        'time(s)': /^times?/i,
        'until': /^(un)?til/i,
        'monday': /^mo(n(day)?)?/i,
        'tuesday': /^tu(e(s(day)?)?)?/i,
        'wednesday': /^we(d(n(esday)?)?)?/i,
        'thursday': /^th(u(r(sday)?)?)?/i,
        'friday': /^fr(i(day)?)?/i,
        'saturday': /^sa(t(urday)?)?/i,
        'sunday': /^su(n(day)?)?/i,
        'january': /^jan(uary)?/i,
        'february': /^feb(ruary)?/i,
        'march': /^mar(ch)?/i,
        'april': /^apr(il)?/i,
        'may': /^may/i,
        'june': /^june?/i,
        'july': /^july?/i,
        'august': /^aug(ust)?/i,
        'september': /^sep(t(ember)?)?/i,
        'october': /^oct(ober)?/i,
        'november': /^nov(ember)?/i,
        'december': /^dec(ember)?/i,
        'comma': /^(,\s*|(and|or)\s*)+/i
    }
};
exports.default = ENGLISH;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"908Jq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _i18N = require("./i18n");
var _i18NDefault = parcelHelpers.interopDefault(_i18N);
var _index = require("../index");
var _indexDefault = parcelHelpers.interopDefault(_index);
// =============================================================================
// Parser
// =============================================================================
var Parser = function() {
    function Parser1(rules) {
        this.done = true;
        this.rules = rules;
    }
    Parser1.prototype.start = function(text) {
        this.text = text;
        this.done = false;
        return this.nextSymbol();
    };
    Parser1.prototype.isDone = function() {
        return this.done && this.symbol === null;
    };
    Parser1.prototype.nextSymbol = function() {
        var best;
        var bestSymbol;
        var p = this;
        this.symbol = null;
        this.value = null;
        do {
            if (this.done) return false;
            var rule = void 0;
            best = null;
            for(var name_1 in this.rules){
                rule = this.rules[name_1];
                var match = rule.exec(p.text);
                if (match) {
                    if (best === null || match[0].length > best[0].length) {
                        best = match;
                        bestSymbol = name_1;
                    }
                }
            }
            if (best != null) {
                this.text = this.text.substr(best[0].length);
                if (this.text === '') this.done = true;
            }
            if (best == null) {
                this.done = true;
                this.symbol = null;
                this.value = null;
                return;
            }
        // @ts-ignore
        }while (bestSymbol === 'SKIP')
        // @ts-ignore
        this.symbol = bestSymbol;
        this.value = best;
        return true;
    };
    Parser1.prototype.accept = function(name) {
        if (this.symbol === name) {
            if (this.value) {
                var v = this.value;
                this.nextSymbol();
                return v;
            }
            this.nextSymbol();
            return true;
        }
        return false;
    };
    Parser1.prototype.acceptNumber = function() {
        return this.accept('number');
    };
    Parser1.prototype.expect = function(name) {
        if (this.accept(name)) return true;
        throw new Error('expected ' + name + ' but found ' + this.symbol);
    };
    return Parser1;
}();
function parseText(text, language) {
    if (language === void 0) language = _i18NDefault.default;
    var options = {
    };
    var ttr = new Parser(language.tokens);
    if (!ttr.start(text)) return null;
    S();
    function S() {
        // every [n]
        ttr.expect('every');
        var n = ttr.acceptNumber();
        if (n) options.interval = parseInt(n[0], 10);
        if (ttr.isDone()) throw new Error('Unexpected end');
        switch(ttr.symbol){
            case 'day(s)':
                options.freq = _indexDefault.default.DAILY;
                if (ttr.nextSymbol()) {
                    AT();
                    F();
                }
                break;
            // FIXME Note: every 2 weekdays != every two weeks on weekdays.
            // DAILY on weekdays is not a valid rule
            case 'weekday(s)':
                options.freq = _indexDefault.default.WEEKLY;
                options.byweekday = [
                    _indexDefault.default.MO,
                    _indexDefault.default.TU,
                    _indexDefault.default.WE,
                    _indexDefault.default.TH,
                    _indexDefault.default.FR
                ];
                ttr.nextSymbol();
                F();
                break;
            case 'week(s)':
                options.freq = _indexDefault.default.WEEKLY;
                if (ttr.nextSymbol()) {
                    ON();
                    F();
                }
                break;
            case 'hour(s)':
                options.freq = _indexDefault.default.HOURLY;
                if (ttr.nextSymbol()) {
                    ON();
                    F();
                }
                break;
            case 'minute(s)':
                options.freq = _indexDefault.default.MINUTELY;
                if (ttr.nextSymbol()) {
                    ON();
                    F();
                }
                break;
            case 'month(s)':
                options.freq = _indexDefault.default.MONTHLY;
                if (ttr.nextSymbol()) {
                    ON();
                    F();
                }
                break;
            case 'year(s)':
                options.freq = _indexDefault.default.YEARLY;
                if (ttr.nextSymbol()) {
                    ON();
                    F();
                }
                break;
            case 'monday':
            case 'tuesday':
            case 'wednesday':
            case 'thursday':
            case 'friday':
            case 'saturday':
            case 'sunday':
                options.freq = _indexDefault.default.WEEKLY;
                var key = ttr.symbol.substr(0, 2).toUpperCase();
                options.byweekday = [
                    _indexDefault.default[key]
                ];
                if (!ttr.nextSymbol()) return;
                // TODO check for duplicates
                while(ttr.accept('comma')){
                    if (ttr.isDone()) throw new Error('Unexpected end');
                    var wkd = decodeWKD();
                    if (!wkd) {
                        throw new Error('Unexpected symbol ' + ttr.symbol + ', expected weekday');
                    }
                    // @ts-ignore
                    options.byweekday.push(_indexDefault.default[wkd]);
                    ttr.nextSymbol();
                }
                MDAYs();
                F();
                break;
            case 'january':
            case 'february':
            case 'march':
            case 'april':
            case 'may':
            case 'june':
            case 'july':
            case 'august':
            case 'september':
            case 'october':
            case 'november':
            case 'december':
                options.freq = _indexDefault.default.YEARLY;
                options.bymonth = [
                    decodeM()
                ];
                if (!ttr.nextSymbol()) return;
                // TODO check for duplicates
                while(ttr.accept('comma')){
                    if (ttr.isDone()) throw new Error('Unexpected end');
                    var m = decodeM();
                    if (!m) {
                        throw new Error('Unexpected symbol ' + ttr.symbol + ', expected month');
                    }
                    options.bymonth.push(m);
                    ttr.nextSymbol();
                }
                ON();
                F();
                break;
            default:
                throw new Error('Unknown symbol');
        }
    }
    function ON() {
        var on = ttr.accept('on');
        var the = ttr.accept('the');
        if (!(on || the)) return;
        do {
            var nth = decodeNTH();
            var wkd = decodeWKD();
            var m = decodeM();
            // nth <weekday> | <weekday>
            if (nth) {
                // ttr.nextSymbol()
                if (wkd) {
                    ttr.nextSymbol();
                    if (!options.byweekday) options.byweekday = [];
                    // @ts-ignore
                    options.byweekday.push(_indexDefault.default[wkd].nth(nth));
                } else {
                    if (!options.bymonthday) options.bymonthday = [];
                    // @ts-ignore
                    options.bymonthday.push(nth);
                    ttr.accept('day(s)');
                }
            // <weekday>
            } else if (wkd) {
                ttr.nextSymbol();
                if (!options.byweekday) options.byweekday = [];
                // @ts-ignore
                options.byweekday.push(_indexDefault.default[wkd]);
            } else if (ttr.symbol === 'weekday(s)') {
                ttr.nextSymbol();
                if (!options.byweekday) {
                    options.byweekday = [
                        _indexDefault.default.MO,
                        _indexDefault.default.TU,
                        _indexDefault.default.WE,
                        _indexDefault.default.TH,
                        _indexDefault.default.FR
                    ];
                }
            } else if (ttr.symbol === 'week(s)') {
                ttr.nextSymbol();
                var n = ttr.acceptNumber();
                if (!n) {
                    throw new Error('Unexpected symbol ' + ttr.symbol + ', expected week number');
                }
                options.byweekno = [
                    parseInt(n[0], 10)
                ];
                while(ttr.accept('comma')){
                    n = ttr.acceptNumber();
                    if (!n) {
                        throw new Error('Unexpected symbol ' + ttr.symbol + '; expected monthday');
                    }
                    options.byweekno.push(parseInt(n[0], 10));
                }
            } else if (m) {
                ttr.nextSymbol();
                if (!options.bymonth) options.bymonth = [];
                // @ts-ignore
                options.bymonth.push(m);
            } else {
                return;
            }
        }while (ttr.accept('comma') || ttr.accept('the') || ttr.accept('on'))
    }
    function AT() {
        var at = ttr.accept('at');
        if (!at) return;
        do {
            var n = ttr.acceptNumber();
            if (!n) {
                throw new Error('Unexpected symbol ' + ttr.symbol + ', expected hour');
            }
            options.byhour = [
                parseInt(n[0], 10)
            ];
            while(ttr.accept('comma')){
                n = ttr.acceptNumber();
                if (!n) {
                    throw new Error('Unexpected symbol ' + ttr.symbol + '; expected hour');
                }
                options.byhour.push(parseInt(n[0], 10));
            }
        }while (ttr.accept('comma') || ttr.accept('at'))
    }
    function decodeM() {
        switch(ttr.symbol){
            case 'january':
                return 1;
            case 'february':
                return 2;
            case 'march':
                return 3;
            case 'april':
                return 4;
            case 'may':
                return 5;
            case 'june':
                return 6;
            case 'july':
                return 7;
            case 'august':
                return 8;
            case 'september':
                return 9;
            case 'october':
                return 10;
            case 'november':
                return 11;
            case 'december':
                return 12;
            default:
                return false;
        }
    }
    function decodeWKD() {
        switch(ttr.symbol){
            case 'monday':
            case 'tuesday':
            case 'wednesday':
            case 'thursday':
            case 'friday':
            case 'saturday':
            case 'sunday':
                return ttr.symbol.substr(0, 2).toUpperCase();
            default:
                return false;
        }
    }
    function decodeNTH() {
        switch(ttr.symbol){
            case 'last':
                ttr.nextSymbol();
                return -1;
            case 'first':
                ttr.nextSymbol();
                return 1;
            case 'second':
                ttr.nextSymbol();
                return ttr.accept('last') ? -2 : 2;
            case 'third':
                ttr.nextSymbol();
                return ttr.accept('last') ? -3 : 3;
            case 'nth':
                var v = parseInt(ttr.value[1], 10);
                if (v < -366 || v > 366) throw new Error('Nth out of range: ' + v);
                ttr.nextSymbol();
                return ttr.accept('last') ? -v : v;
            default:
                return false;
        }
    }
    function MDAYs() {
        ttr.accept('on');
        ttr.accept('the');
        var nth = decodeNTH();
        if (!nth) return;
        options.bymonthday = [
            nth
        ];
        ttr.nextSymbol();
        while(ttr.accept('comma')){
            nth = decodeNTH();
            if (!nth) {
                throw new Error('Unexpected symbol ' + ttr.symbol + '; expected monthday');
            }
            options.bymonthday.push(nth);
            ttr.nextSymbol();
        }
    }
    function F() {
        if (ttr.symbol === 'until') {
            var date = Date.parse(ttr.text);
            if (!date) throw new Error('Cannot parse until date:' + ttr.text);
            options.until = new Date(date);
        } else if (ttr.accept('for')) {
            options.count = parseInt(ttr.value[0], 10);
            ttr.expect('number');
        // ttr.expect('times')
        }
    }
    return options;
}
exports.default = parseText;

},{"./i18n":"cRPwz","../index":"idCmx","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"1v7S8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rrule = require("./rrule");
var _rruleDefault = parcelHelpers.interopDefault(_rrule);
var _dateutil = require("./dateutil");
var _dateutilDefault = parcelHelpers.interopDefault(_dateutil);
var _helpers = require("./helpers");
var __extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 *
 * @param {Boolean?} noCache
 *  The same stratagy as RRule on cache, default to false
 * @constructor
 */ var RRuleSet = function(_super) {
    __extends(RRuleSet1, _super);
    function RRuleSet1(noCache) {
        if (noCache === void 0) noCache = false;
        var _this = _super.call(this, {
        }, noCache) || this;
        _this._rrule = [];
        _this._rdate = [];
        _this._exrule = [];
        _this._exdate = [];
        return _this;
    }
    /**
     * Adds an RRule to the set
     *
     * @param {RRule}
     */ RRuleSet1.prototype.rrule = function(rrule) {
        if (!(rrule instanceof _rruleDefault.default)) throw new TypeError(String(rrule) + ' is not RRule instance');
        if (!_helpers.includes(this._rrule.map(String), String(rrule))) this._rrule.push(rrule);
    };
    /**
     * Adds an RDate to the set
     *
     * @param {Date}
     */ RRuleSet1.prototype.rdate = function(date) {
        if (!(date instanceof Date)) throw new TypeError(String(date) + ' is not Date instance');
        if (!_helpers.includes(this._rdate.map(Number), Number(date))) {
            this._rdate.push(date);
            _dateutilDefault.default.sort(this._rdate);
        }
    };
    /**
     * Adds an EXRULE to the set
     *
     * @param {RRule}
     */ RRuleSet1.prototype.exrule = function(rrule) {
        if (!(rrule instanceof _rruleDefault.default)) throw new TypeError(String(rrule) + ' is not RRule instance');
        if (!_helpers.includes(this._exrule.map(String), String(rrule))) this._exrule.push(rrule);
    };
    /**
     * Adds an EXDATE to the set
     *
     * @param {Date}
     */ RRuleSet1.prototype.exdate = function(date) {
        if (!(date instanceof Date)) throw new TypeError(String(date) + ' is not Date instance');
        if (!_helpers.includes(this._exdate.map(Number), Number(date))) {
            this._exdate.push(date);
            _dateutilDefault.default.sort(this._exdate);
        }
    };
    RRuleSet1.prototype.valueOf = function() {
        var result = [];
        if (this._rrule.length) this._rrule.forEach(function(rrule) {
            result.push('RRULE:' + rrule);
        });
        if (this._rdate.length) result.push('RDATE:' + this._rdate.map(function(rdate) {
            return _dateutilDefault.default.timeToUntilString(rdate.valueOf());
        }).join(','));
        if (this._exrule.length) this._exrule.forEach(function(exrule) {
            result.push('EXRULE:' + exrule);
        });
        if (this._exdate.length) result.push('EXDATE:' + this._exdate.map(function(exdate) {
            return _dateutilDefault.default.timeToUntilString(exdate.valueOf());
        }).join(','));
        return result;
    };
    /**
     * to generate recurrence field sush as:
     *   ["RRULE:FREQ=YEARLY;COUNT=2;BYDAY=TU;DTSTART=19970902T010000Z","RRULE:FREQ=YEARLY;COUNT=1;BYDAY=TH;DTSTART=19970902T010000Z"]
     */ RRuleSet1.prototype.toString = function() {
        return JSON.stringify(this.valueOf());
    };
    RRuleSet1.prototype._iter = function(iterResult) {
        var _exdateHash = {
        };
        var _exrule = this._exrule;
        var _accept = iterResult.accept;
        function evalExdate(after, before) {
            _exrule.forEach(function(rrule) {
                rrule.between(after, before, true).forEach(function(date) {
                    _exdateHash[Number(date)] = true;
                });
            });
        }
        this._exdate.forEach(function(date) {
            _exdateHash[Number(date)] = true;
        });
        iterResult.accept = function(date) {
            var dt = Number(date);
            if (!_exdateHash[dt]) {
                evalExdate(new Date(dt - 1), new Date(dt + 1));
                if (!_exdateHash[dt]) {
                    _exdateHash[dt] = true;
                    return _accept.call(this, date);
                }
            }
            return true;
        };
        if (iterResult.method === 'between') {
            evalExdate(iterResult.args.after, iterResult.args.before);
            iterResult.accept = function(date) {
                var dt = Number(date);
                if (!_exdateHash[dt]) {
                    _exdateHash[dt] = true;
                    return _accept.call(this, date);
                }
                return true;
            };
        }
        for(var i = 0; i < this._rdate.length; i++){
            if (!iterResult.accept(new Date(this._rdate[i].valueOf()))) break;
        }
        this._rrule.forEach(function(rrule) {
            rrule._iter(iterResult);
        });
        var res = iterResult._result;
        _dateutilDefault.default.sort(res);
        switch(iterResult.method){
            case 'all':
            case 'between':
                return res;
            case 'before':
                return res.length && res[res.length - 1] || null;
            case 'after':
                return res.length && res[0] || null;
            default:
                return null;
        }
    };
    /**
     * Create a new RRuleSet Object completely base on current instance
     */ RRuleSet1.prototype.clone = function() {
        var rrs = new RRuleSet1(!!this._cache);
        var i;
        for(i = 0; i < this._rrule.length; i++)rrs.rrule(this._rrule[i].clone());
        for(i = 0; i < this._rdate.length; i++)rrs.rdate(new Date(this._rdate[i].valueOf()));
        for(i = 0; i < this._exrule.length; i++)rrs.exrule(this._exrule[i].clone());
        for(i = 0; i < this._exdate.length; i++)rrs.exdate(new Date(this._exdate[i].valueOf()));
        return rrs;
    };
    return RRuleSet1;
}(_rruleDefault.default);
exports.default = RRuleSet;

},{"./rrule":"fQtN4","./dateutil":"gS1CZ","./helpers":"9UCZ2","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"ai34i":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rrule = require("./rrule");
var _rruleDefault = parcelHelpers.interopDefault(_rrule);
var _rruleset = require("./rruleset");
var _rrulesetDefault = parcelHelpers.interopDefault(_rruleset);
var _dateutil = require("./dateutil");
var _dateutilDefault = parcelHelpers.interopDefault(_dateutil);
var _weekday = require("./weekday");
var _helpers = require("./helpers");
/**
 * RRuleStr
 *  To parse a set of rrule strings
 */ var RRuleStr = function() {
    function RRuleStr1() {
        // tslint:disable:variable-name
        this._handle_BYDAY = this._handle_BYWEEKDAY;
        this._handle_INTERVAL = this._handle_int;
        this._handle_COUNT = this._handle_int;
        this._handle_BYSETPOS = this._handle_int_list;
        this._handle_BYMONTH = this._handle_int_list;
        this._handle_BYMONTHDAY = this._handle_int_list;
        this._handle_BYYEARDAY = this._handle_int_list;
        this._handle_BYEASTER = this._handle_int_list;
        this._handle_BYWEEKNO = this._handle_int_list;
        this._handle_BYHOUR = this._handle_int_list;
        this._handle_BYMINUTE = this._handle_int_list;
        this._handle_BYSECOND = this._handle_int_list;
    // tslint:enable:variable-name
    }
    // tslint:disable-next-line:variable-name
    RRuleStr1.prototype._handle_DTSTART = function(rrkwargs, _, value, __) {
        var parms = /^DTSTART(?:;TZID=([^:=]+))?(?::|=)(.*)/.exec(value);
        var ___ = parms[0], tzid = parms[1], dtstart = parms[2];
        rrkwargs['dtstart'] = _dateutilDefault.default.untilStringToDate(dtstart);
        if (tzid) rrkwargs['tzid'] = tzid;
    };
    RRuleStr1.prototype._handle_int = function(rrkwargs, name, value) {
        // @ts-ignore
        rrkwargs[name.toLowerCase()] = parseInt(value, 10);
    };
    RRuleStr1.prototype._handle_int_list = function(rrkwargs, name, value) {
        // @ts-ignore
        rrkwargs[name.toLowerCase()] = value.split(',').map(function(x) {
            return parseInt(x, 10);
        });
    };
    RRuleStr1.prototype._handle_FREQ = function(rrkwargs, _, value, __) {
        rrkwargs['freq'] = RRuleStr1._freq_map[value];
    };
    RRuleStr1.prototype._handle_UNTIL = function(rrkwargs, _, value, __) {
        try {
            rrkwargs['until'] = _dateutilDefault.default.untilStringToDate(value);
        } catch (error) {
            throw new Error('invalid until date');
        }
    };
    RRuleStr1.prototype._handle_WKST = function(rrkwargs, _, value, __) {
        rrkwargs['wkst'] = RRuleStr1._weekday_map[value];
    };
    RRuleStr1.prototype._handle_BYWEEKDAY = function(rrkwargs, _, value, __) {
        // Two ways to specify this: +1MO or MO(+1)
        var splt;
        var i;
        var j;
        var n;
        var w;
        var wday;
        var l = [];
        var wdays = value.split(',');
        for(i = 0; i < wdays.length; i++){
            wday = wdays[i];
            if (wday.indexOf('(') > -1) {
                // If it's of the form TH(+1), etc.
                splt = wday.split('(');
                w = splt[0];
                n = parseInt(splt.slice(1, -1)[0], 10);
            } else {
                // # If it's of the form +1MO
                for(j = 0; j < wday.length; j++){
                    if ('+-0123456789'.indexOf(wday[j]) === -1) break;
                }
                n = wday.slice(0, j) || null;
                w = wday.slice(j);
                if (n) n = parseInt(n, 10);
            }
            var weekday = new _weekday.Weekday(RRuleStr1._weekday_map[w], n);
            l.push(weekday);
        }
        rrkwargs['byweekday'] = l;
    };
    RRuleStr1.prototype._parseRfcRRule = function(line, options) {
        if (options === void 0) options = {
        };
        options.dtstart = options.dtstart || null;
        options.cache = options.cache || false;
        var name;
        var value;
        var parts;
        var nameRegex = /^([A-Z]+):(.*)$/;
        var nameParts = nameRegex.exec(line);
        if (nameParts && nameParts.length >= 3) {
            name = nameParts[1];
            value = nameParts[2];
            if (name !== 'RRULE') throw new Error("unknown parameter name " + name);
        } else value = line;
        var rrkwargs = {
        };
        var dtstart = /DTSTART(?:;TZID=[^:]+:)?[^;]+/.exec(line);
        if (dtstart && dtstart.length > 0) {
            var dtstartClause = dtstart[0];
            this._handle_DTSTART(rrkwargs, 'DTSTART', dtstartClause);
        }
        var pairs = value.split(';');
        for(var i = 0; i < pairs.length; i++){
            parts = pairs[i].split('=');
            name = parts[0].toUpperCase();
            if (/DTSTART|TZID/.test(name)) continue;
            value = parts[1].toUpperCase();
            // @ts-ignore
            var paramHandler = this["_handle_" + name];
            if (typeof paramHandler !== 'function') throw new Error("unknown parameter '" + name + "':" + value);
            paramHandler(rrkwargs, name, value);
        }
        rrkwargs.dtstart = rrkwargs.dtstart || options.dtstart;
        rrkwargs.tzid = rrkwargs.tzid || options.tzid;
        return new _rruleDefault.default(rrkwargs, !options.cache);
    };
    RRuleStr1.prototype._parseRfc = function(s, options) {
        if (options.compatible) {
            options.forceset = true;
            options.unfold = true;
        }
        s = s && s.trim();
        if (!s) throw new Error('Invalid empty string');
        var i = 0;
        var line;
        var lines;
        // More info about 'unfold' option
        // Go head to http://www.ietf.org/rfc/rfc2445.txt
        if (options.unfold) {
            lines = s.split('\n');
            while(i < lines.length){
                // TODO
                line = lines[i] = lines[i].replace(/\s+$/g, '');
                if (!line) lines.splice(i, 1);
                else if (i > 0 && line[0] === ' ') {
                    lines[i - 1] += line.slice(1);
                    lines.splice(i, 1);
                } else i += 1;
            }
        } else lines = s.split(/\s/);
        var rrulevals = [];
        var rdatevals = [];
        var exrulevals = [];
        var exdatevals = [];
        var name;
        var value;
        var parts;
        var dtstart;
        var tzid;
        var rset;
        var j;
        var k;
        var datestrs;
        var datestr;
        if (!options.forceset && lines.length === 1 && (s.indexOf(':') === -1 || s.indexOf('RRULE:') === 0)) return this._parseRfcRRule(lines[0], {
            cache: options.cache,
            dtstart: options.dtstart
        });
        else {
            for(var i_1 = 0; i_1 < lines.length; i_1++){
                line = lines[i_1];
                if (!line) continue;
                if (line.indexOf(':') === -1) {
                    name = 'RRULE';
                    value = line;
                } else {
                    parts = _helpers.split(line, ':', 1);
                    name = parts[0];
                    value = parts[1];
                }
                var parms = name.split(';');
                if (!parms) throw new Error('empty property name');
                name = parms[0].toUpperCase();
                parms = parms.slice(1);
                if (name === 'RRULE') {
                    for(j = 0; j < parms.length; j++){
                        var parm = parms[j];
                        throw new Error('unsupported RRULE parm: ' + parm);
                    }
                    rrulevals.push(value);
                } else if (name === 'RDATE') {
                    for(j = 0; j < parms.length; j++){
                        var parm = parms[j];
                        if (parm !== 'VALUE=DATE-TIME' && parm !== 'VALUE=DATE') throw new Error('unsupported RDATE parm: ' + parm);
                    }
                    rdatevals.push(value);
                } else if (name === 'EXRULE') {
                    for(j = 0; j < parms.length; j++){
                        var parm = parms[j];
                        throw new Error('unsupported EXRULE parm: ' + parm);
                    }
                    exrulevals.push(value);
                } else if (name === 'EXDATE') {
                    for(j = 0; j < parms.length; j++){
                        var parm = parms[j];
                        if (parm !== 'VALUE=DATE-TIME' && parm !== 'VALUE=DATE') throw new Error('unsupported EXDATE parm: ' + parm);
                    }
                    exdatevals.push(value);
                } else if (name === 'DTSTART') {
                    dtstart = _dateutilDefault.default.untilStringToDate(value);
                    if (parms.length) {
                        var _a = parms[0].split('='), key = _a[0], value_1 = _a[1];
                        if (key === 'TZID') tzid = value_1;
                    }
                } else throw new Error('unsupported property: ' + name);
            }
            if (options.forceset || rrulevals.length > 1 || rdatevals.length || exrulevals.length || exdatevals.length) {
                rset = new _rrulesetDefault.default(!options.cache);
                for(j = 0; j < rrulevals.length; j++)rset.rrule(this._parseRfcRRule(rrulevals[j], {
                    // @ts-ignore
                    dtstart: options.dtstart || dtstart
                }));
                for(j = 0; j < rdatevals.length; j++){
                    datestrs = rdatevals[j].split(',');
                    for(k = 0; k < datestrs.length; k++){
                        datestr = datestrs[k];
                        rset.rdate(_dateutilDefault.default.untilStringToDate(datestr));
                    }
                }
                for(j = 0; j < exrulevals.length; j++)rset.exrule(this._parseRfcRRule(exrulevals[j], {
                    // @ts-ignore
                    dtstart: options.dtstart || dtstart
                }));
                for(j = 0; j < exdatevals.length; j++){
                    datestrs = exdatevals[j].split(',');
                    for(k = 0; k < datestrs.length; k++){
                        datestr = datestrs[k];
                        rset.exdate(_dateutilDefault.default.untilStringToDate(datestr));
                    }
                }
                // @ts-ignore
                if (options.compatible && options.dtstart) rset.rdate(dtstart);
                return rset;
            } else return this._parseRfcRRule(rrulevals[0], {
                // @ts-ignore
                dtstart: options.dtstart || dtstart,
                cache: options.cache,
                // @ts-ignore
                tzid: options.tzid || tzid
            });
        }
    };
    RRuleStr1.prototype.parse = function(s, options) {
        if (options === void 0) options = {
        };
        var invalid = [];
        var keys = Object.keys(options);
        var defaultKeys = Object.keys(RRuleStr1.DEFAULT_OPTIONS);
        keys.forEach(function(key) {
            if (!_helpers.includes(defaultKeys, key)) invalid.push(key);
        }, this);
        if (invalid.length) throw new Error('Invalid options: ' + invalid.join(', '));
        // Merge in default options
        defaultKeys.forEach(function(key) {
            if (!_helpers.includes(keys, key)) options[key] = RRuleStr1.DEFAULT_OPTIONS[key];
        });
        return this._parseRfc(s, options);
    };
    // tslint:disable-next-line:variable-name
    RRuleStr1._weekday_map = {
        MO: 0,
        TU: 1,
        WE: 2,
        TH: 3,
        FR: 4,
        SA: 5,
        SU: 6
    };
    // tslint:disable-next-line:variable-name
    RRuleStr1._freq_map = {
        YEARLY: _rruleDefault.default.YEARLY,
        MONTHLY: _rruleDefault.default.MONTHLY,
        WEEKLY: _rruleDefault.default.WEEKLY,
        DAILY: _rruleDefault.default.DAILY,
        HOURLY: _rruleDefault.default.HOURLY,
        MINUTELY: _rruleDefault.default.MINUTELY,
        SECONDLY: _rruleDefault.default.SECONDLY
    };
    RRuleStr1.DEFAULT_OPTIONS = {
        dtstart: null,
        cache: false,
        unfold: false,
        forceset: false,
        compatible: false,
        tzid: null
    };
    return RRuleStr1;
}();
exports.default = RRuleStr;

},{"./rrule":"fQtN4","./rruleset":"1v7S8","./dateutil":"gS1CZ","./weekday":"2Q77D","./helpers":"9UCZ2","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"6auJa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "stop_scan", ()=>stop_scan
);
parcelHelpers.export(exports, "start_scan", ()=>start_scan
);
var _jsqr = require("jsqr");
var _jsqrDefault = parcelHelpers.interopDefault(_jsqr);
var _appJs = require("../../app.js");
let video;
let intv;
let stop_scan = function() {
    document.getElementById("qr-screen").style.display = "none";
    document.getElementById("cal-subs-url").focus();
    _appJs.status.view = "subscription";
    console.log("yeah");
};
let start_scan = function(callback) {
    document.getElementById("qr-screen").style.display = "block";
    console.log("start");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) navigator.getUserMedia({
        audio: false,
        video: {
            width: 200,
            height: 200
        }
    }, function(stream) {
        video = document.querySelector("video");
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
            var barcodeCanvas = document.createElement("canvas");
            intv = setInterval(()=>{
                barcodeCanvas.width = video.videoWidth;
                barcodeCanvas.height = video.videoHeight;
                var barcodeContext = barcodeCanvas.getContext("2d");
                var imageWidth = Math.max(1, Math.floor(video.videoWidth)), imageHeight = Math.max(1, Math.floor(video.videoHeight));
                barcodeContext.drawImage(video, 0, 0, imageWidth, imageHeight);
                var imageData = barcodeContext.getImageData(0, 0, imageWidth, imageHeight);
                var idd = imageData.data;
                let code = _jsqrDefault.default(idd, imageWidth, imageHeight);
                console.log(code);
                if (code) {
                    stop_scan();
                    callback(code.data);
                    clearInterval(intv);
                }
            }, 1000);
        };
    }, function(err) {
        console.log("The following error occurred: " + err.name);
    });
    else console.log("getUserMedia not supported");
};

},{"jsqr":"04jWG","../../app.js":"20BJq","@parcel/transformer-js/src/esmodule-helpers.js":"cj2YQ"}],"04jWG":[function(require,module,exports) {
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
    else if (typeof define === 'function' && define.amd) define([], factory);
    else if (typeof exports === 'object') exports["jsQR"] = factory();
    else root["jsQR"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
    return(/******/ (function(modules) {
        /******/ // The module cache
        /******/ var installedModules = {
        };
        /******/ /******/ // The require function
        /******/ function __webpack_require__(moduleId) {
            /******/ /******/ // Check if module is in cache
            /******/ if (installedModules[moduleId]) /******/ return installedModules[moduleId].exports;
            /******/ // Create a new module (and put it into the cache)
            /******/ var module = installedModules[moduleId] = {
                /******/ i: moduleId,
                /******/ l: false,
                /******/ exports: {
                }
            };
            /******/ /******/ // Execute the module function
            /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/ /******/ // Flag the module as loaded
            /******/ module.l = true;
            /******/ /******/ // Return the exports of the module
            /******/ return module.exports;
        /******/ }
        /******/ /******/ /******/ // expose the modules object (__webpack_modules__)
        /******/ __webpack_require__.m = modules;
        /******/ /******/ // expose the module cache
        /******/ __webpack_require__.c = installedModules;
        /******/ /******/ // define getter function for harmony exports
        /******/ __webpack_require__.d = function(exports, name, getter) {
            /******/ if (!__webpack_require__.o(exports, name)) /******/ Object.defineProperty(exports, name, {
                /******/ configurable: false,
                /******/ enumerable: true,
                /******/ get: getter
            });
        /******/ };
        /******/ /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/ __webpack_require__.n = function(module) {
            /******/ var getter = module && module.__esModule ? /******/ function getDefault() {
                return module['default'];
            } : /******/ function getModuleExports() {
                return module;
            };
            /******/ __webpack_require__.d(getter, 'a', getter);
            /******/ return getter;
        /******/ };
        /******/ /******/ // Object.prototype.hasOwnProperty.call
        /******/ __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/ /******/ // __webpack_public_path__
        /******/ __webpack_require__.p = "";
        /******/ /******/ // Load entry module and return exports
        /******/ return __webpack_require__(__webpack_require__.s = 3);
    /******/ })([
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix1 = function() {
                function BitMatrix(data, width) {
                    this.width = width;
                    this.height = data.length / width;
                    this.data = data;
                }
                BitMatrix.createEmpty = function(width, height) {
                    return new BitMatrix(new Uint8ClampedArray(width * height), width);
                };
                BitMatrix.prototype.get = function(x, y) {
                    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;
                    return !!this.data[y * this.width + x];
                };
                BitMatrix.prototype.set = function(x, y, v) {
                    this.data[y * this.width + x] = v ? 1 : 0;
                };
                BitMatrix.prototype.setRegion = function(left, top, width, height, v) {
                    for(var y = top; y < top + height; y++)for(var x = left; x < left + width; x++)this.set(x, y, !!v);
                };
                return BitMatrix;
            }();
            exports.BitMatrix = BitMatrix1;
        /***/ },
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var GenericGFPoly_1 = __webpack_require__(2);
            function addOrSubtractGF(a, b) {
                return a ^ b; // tslint:disable-line:no-bitwise
            }
            exports.addOrSubtractGF = addOrSubtractGF;
            var GenericGF1 = function() {
                function GenericGF(primitive, size, genBase) {
                    this.primitive = primitive;
                    this.size = size;
                    this.generatorBase = genBase;
                    this.expTable = new Array(this.size);
                    this.logTable = new Array(this.size);
                    var x = 1;
                    for(var i = 0; i < this.size; i++){
                        this.expTable[i] = x;
                        x = x * 2;
                        if (x >= this.size) x = (x ^ this.primitive) & this.size - 1; // tslint:disable-line:no-bitwise
                    }
                    for(var i = 0; i < this.size - 1; i++)this.logTable[this.expTable[i]] = i;
                    this.zero = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([
                        0
                    ]));
                    this.one = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([
                        1
                    ]));
                }
                GenericGF.prototype.multiply = function(a, b) {
                    if (a === 0 || b === 0) return 0;
                    return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
                };
                GenericGF.prototype.inverse = function(a) {
                    if (a === 0) throw new Error("Can't invert 0");
                    return this.expTable[this.size - this.logTable[a] - 1];
                };
                GenericGF.prototype.buildMonomial = function(degree, coefficient) {
                    if (degree < 0) throw new Error("Invalid monomial degree less than 0");
                    if (coefficient === 0) return this.zero;
                    var coefficients = new Uint8ClampedArray(degree + 1);
                    coefficients[0] = coefficient;
                    return new GenericGFPoly_1.default(this, coefficients);
                };
                GenericGF.prototype.log = function(a) {
                    if (a === 0) throw new Error("Can't take log(0)");
                    return this.logTable[a];
                };
                GenericGF.prototype.exp = function(a) {
                    return this.expTable[a];
                };
                return GenericGF;
            }();
            exports.default = GenericGF1;
        /***/ },
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var GenericGF_1 = __webpack_require__(1);
            var GenericGFPoly1 = function() {
                function GenericGFPoly(field, coefficients) {
                    if (coefficients.length === 0) throw new Error("No coefficients.");
                    this.field = field;
                    var coefficientsLength = coefficients.length;
                    if (coefficientsLength > 1 && coefficients[0] === 0) {
                        // Leading term must be non-zero for anything except the constant polynomial "0"
                        var firstNonZero = 1;
                        while(firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0)firstNonZero++;
                        if (firstNonZero === coefficientsLength) this.coefficients = field.zero.coefficients;
                        else {
                            this.coefficients = new Uint8ClampedArray(coefficientsLength - firstNonZero);
                            for(var i = 0; i < this.coefficients.length; i++)this.coefficients[i] = coefficients[firstNonZero + i];
                        }
                    } else this.coefficients = coefficients;
                }
                GenericGFPoly.prototype.degree = function() {
                    return this.coefficients.length - 1;
                };
                GenericGFPoly.prototype.isZero = function() {
                    return this.coefficients[0] === 0;
                };
                GenericGFPoly.prototype.getCoefficient = function(degree) {
                    return this.coefficients[this.coefficients.length - 1 - degree];
                };
                GenericGFPoly.prototype.addOrSubtract = function(other) {
                    var _a;
                    if (this.isZero()) return other;
                    if (other.isZero()) return this;
                    var smallerCoefficients = this.coefficients;
                    var largerCoefficients = other.coefficients;
                    if (smallerCoefficients.length > largerCoefficients.length) _a = [
                        largerCoefficients,
                        smallerCoefficients
                    ], smallerCoefficients = _a[0], largerCoefficients = _a[1];
                    var sumDiff = new Uint8ClampedArray(largerCoefficients.length);
                    var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
                    for(var i = 0; i < lengthDiff; i++)sumDiff[i] = largerCoefficients[i];
                    for(var i = lengthDiff; i < largerCoefficients.length; i++)sumDiff[i] = GenericGF_1.addOrSubtractGF(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
                    return new GenericGFPoly(this.field, sumDiff);
                };
                GenericGFPoly.prototype.multiply = function(scalar) {
                    if (scalar === 0) return this.field.zero;
                    if (scalar === 1) return this;
                    var size = this.coefficients.length;
                    var product = new Uint8ClampedArray(size);
                    for(var i = 0; i < size; i++)product[i] = this.field.multiply(this.coefficients[i], scalar);
                    return new GenericGFPoly(this.field, product);
                };
                GenericGFPoly.prototype.multiplyPoly = function(other) {
                    if (this.isZero() || other.isZero()) return this.field.zero;
                    var aCoefficients = this.coefficients;
                    var aLength = aCoefficients.length;
                    var bCoefficients = other.coefficients;
                    var bLength = bCoefficients.length;
                    var product = new Uint8ClampedArray(aLength + bLength - 1);
                    for(var i = 0; i < aLength; i++){
                        var aCoeff = aCoefficients[i];
                        for(var j = 0; j < bLength; j++)product[i + j] = GenericGF_1.addOrSubtractGF(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
                    }
                    return new GenericGFPoly(this.field, product);
                };
                GenericGFPoly.prototype.multiplyByMonomial = function(degree, coefficient) {
                    if (degree < 0) throw new Error("Invalid degree less than 0");
                    if (coefficient === 0) return this.field.zero;
                    var size = this.coefficients.length;
                    var product = new Uint8ClampedArray(size + degree);
                    for(var i = 0; i < size; i++)product[i] = this.field.multiply(this.coefficients[i], coefficient);
                    return new GenericGFPoly(this.field, product);
                };
                GenericGFPoly.prototype.evaluateAt = function(a) {
                    var result = 0;
                    if (a === 0) // Just return the x^0 coefficient
                    return this.getCoefficient(0);
                    var size = this.coefficients.length;
                    if (a === 1) {
                        // Just the sum of the coefficients
                        this.coefficients.forEach(function(coefficient) {
                            result = GenericGF_1.addOrSubtractGF(result, coefficient);
                        });
                        return result;
                    }
                    result = this.coefficients[0];
                    for(var i = 1; i < size; i++)result = GenericGF_1.addOrSubtractGF(this.field.multiply(a, result), this.coefficients[i]);
                    return result;
                };
                return GenericGFPoly;
            }();
            exports.default = GenericGFPoly1;
        /***/ },
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var binarizer_1 = __webpack_require__(4);
            var decoder_1 = __webpack_require__(5);
            var extractor_1 = __webpack_require__(11);
            var locator_1 = __webpack_require__(12);
            function scan(matrix) {
                var locations = locator_1.locate(matrix);
                if (!locations) return null;
                for(var _i = 0, locations_1 = locations; _i < locations_1.length; _i++){
                    var location_1 = locations_1[_i];
                    var extracted = extractor_1.extract(matrix, location_1);
                    var decoded = decoder_1.decode(extracted.matrix);
                    if (decoded) return {
                        binaryData: decoded.bytes,
                        data: decoded.text,
                        chunks: decoded.chunks,
                        version: decoded.version,
                        location: {
                            topRightCorner: extracted.mappingFunction(location_1.dimension, 0),
                            topLeftCorner: extracted.mappingFunction(0, 0),
                            bottomRightCorner: extracted.mappingFunction(location_1.dimension, location_1.dimension),
                            bottomLeftCorner: extracted.mappingFunction(0, location_1.dimension),
                            topRightFinderPattern: location_1.topRight,
                            topLeftFinderPattern: location_1.topLeft,
                            bottomLeftFinderPattern: location_1.bottomLeft,
                            bottomRightAlignmentPattern: location_1.alignmentPattern
                        }
                    };
                }
                return null;
            }
            var defaultOptions = {
                inversionAttempts: "attemptBoth"
            };
            function jsQR(data, width, height, providedOptions) {
                if (providedOptions === void 0) providedOptions = {
                };
                var options = defaultOptions;
                Object.keys(options || {
                }).forEach(function(opt) {
                    options[opt] = providedOptions[opt] || options[opt];
                });
                var shouldInvert = options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst";
                var tryInvertedFirst = options.inversionAttempts === "onlyInvert" || options.inversionAttempts === "invertFirst";
                var _a = binarizer_1.binarize(data, width, height, shouldInvert), binarized = _a.binarized, inverted = _a.inverted;
                var result = scan(tryInvertedFirst ? inverted : binarized);
                if (!result && (options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst")) result = scan(tryInvertedFirst ? binarized : inverted);
                return result;
            }
            jsQR.default = jsQR;
            exports.default = jsQR;
        /***/ },
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix_1 = __webpack_require__(0);
            var REGION_SIZE = 8;
            var MIN_DYNAMIC_RANGE = 24;
            function numBetween(value, min, max) {
                return value < min ? min : value > max ? max : value;
            }
            // Like BitMatrix but accepts arbitry Uint8 values
            var Matrix1 = function() {
                function Matrix(width, height) {
                    this.width = width;
                    this.data = new Uint8ClampedArray(width * height);
                }
                Matrix.prototype.get = function(x, y) {
                    return this.data[y * this.width + x];
                };
                Matrix.prototype.set = function(x, y, value) {
                    this.data[y * this.width + x] = value;
                };
                return Matrix;
            }();
            function binarize(data, width, height, returnInverted) {
                if (data.length !== width * height * 4) throw new Error("Malformed data passed to binarizer.");
                // Convert image to greyscale
                var greyscalePixels = new Matrix1(width, height);
                for(var x = 0; x < width; x++)for(var y = 0; y < height; y++){
                    var r = data[(y * width + x) * 4 + 0];
                    var g = data[(y * width + x) * 4 + 1];
                    var b = data[(y * width + x) * 4 + 2];
                    greyscalePixels.set(x, y, 0.2126 * r + 0.7152 * g + 0.0722 * b);
                }
                var horizontalRegionCount = Math.ceil(width / REGION_SIZE);
                var verticalRegionCount = Math.ceil(height / REGION_SIZE);
                var blackPoints = new Matrix1(horizontalRegionCount, verticalRegionCount);
                for(var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++)for(var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++){
                    var sum = 0;
                    var min = Infinity;
                    var max = 0;
                    for(var y = 0; y < REGION_SIZE; y++)for(var x = 0; x < REGION_SIZE; x++){
                        var pixelLumosity = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
                        sum += pixelLumosity;
                        min = Math.min(min, pixelLumosity);
                        max = Math.max(max, pixelLumosity);
                    }
                    var average = sum / Math.pow(REGION_SIZE, 2);
                    if (max - min <= MIN_DYNAMIC_RANGE) {
                        // If variation within the block is low, assume this is a block with only light or only
                        // dark pixels. In that case we do not want to use the average, as it would divide this
                        // low contrast area into black and white pixels, essentially creating data out of noise.
                        //
                        // Default the blackpoint for these blocks to be half the min - effectively white them out
                        average = min / 2;
                        if (verticalRegion > 0 && hortizontalRegion > 0) {
                            // Correct the "white background" assumption for blocks that have neighbors by comparing
                            // the pixels in this block to the previously calculated black points. This is based on
                            // the fact that dark barcode symbology is always surrounded by some amount of light
                            // background for which reasonable black point estimates were made. The bp estimated at
                            // the boundaries is used for the interior.
                            // The (min < bp) is arbitrary but works better than other heuristics that were tried.
                            var averageNeighborBlackPoint = (blackPoints.get(hortizontalRegion, verticalRegion - 1) + 2 * blackPoints.get(hortizontalRegion - 1, verticalRegion) + blackPoints.get(hortizontalRegion - 1, verticalRegion - 1)) / 4;
                            if (min < averageNeighborBlackPoint) average = averageNeighborBlackPoint;
                        }
                    }
                    blackPoints.set(hortizontalRegion, verticalRegion, average);
                }
                var binarized = BitMatrix_1.BitMatrix.createEmpty(width, height);
                var inverted = null;
                if (returnInverted) inverted = BitMatrix_1.BitMatrix.createEmpty(width, height);
                for(var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++)for(var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++){
                    var left = numBetween(hortizontalRegion, 2, horizontalRegionCount - 3);
                    var top_1 = numBetween(verticalRegion, 2, verticalRegionCount - 3);
                    var sum = 0;
                    for(var xRegion = -2; xRegion <= 2; xRegion++)for(var yRegion = -2; yRegion <= 2; yRegion++)sum += blackPoints.get(left + xRegion, top_1 + yRegion);
                    var threshold = sum / 25;
                    for(var xRegion = 0; xRegion < REGION_SIZE; xRegion++)for(var yRegion = 0; yRegion < REGION_SIZE; yRegion++){
                        var x = hortizontalRegion * REGION_SIZE + xRegion;
                        var y = verticalRegion * REGION_SIZE + yRegion;
                        var lum = greyscalePixels.get(x, y);
                        binarized.set(x, y, lum <= threshold);
                        if (returnInverted) inverted.set(x, y, !(lum <= threshold));
                    }
                }
                if (returnInverted) return {
                    binarized: binarized,
                    inverted: inverted
                };
                return {
                    binarized: binarized
                };
            }
            exports.binarize = binarize;
        /***/ },
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix_1 = __webpack_require__(0);
            var decodeData_1 = __webpack_require__(6);
            var reedsolomon_1 = __webpack_require__(9);
            var version_1 = __webpack_require__(10);
            // tslint:disable:no-bitwise
            function numBitsDiffering(x, y) {
                var z = x ^ y;
                var bitCount = 0;
                while(z){
                    bitCount++;
                    z &= z - 1;
                }
                return bitCount;
            }
            function pushBit(bit, byte) {
                return byte << 1 | bit;
            }
            // tslint:enable:no-bitwise
            var FORMAT_INFO_TABLE = [
                {
                    bits: 21522,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 0
                    }
                },
                {
                    bits: 20773,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 1
                    }
                },
                {
                    bits: 24188,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 2
                    }
                },
                {
                    bits: 23371,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 3
                    }
                },
                {
                    bits: 17913,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 4
                    }
                },
                {
                    bits: 16590,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 5
                    }
                },
                {
                    bits: 20375,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 6
                    }
                },
                {
                    bits: 19104,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 7
                    }
                },
                {
                    bits: 30660,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 0
                    }
                },
                {
                    bits: 29427,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 1
                    }
                },
                {
                    bits: 32170,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 2
                    }
                },
                {
                    bits: 30877,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 3
                    }
                },
                {
                    bits: 26159,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 4
                    }
                },
                {
                    bits: 25368,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 5
                    }
                },
                {
                    bits: 27713,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 6
                    }
                },
                {
                    bits: 26998,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 7
                    }
                },
                {
                    bits: 5769,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 0
                    }
                },
                {
                    bits: 5054,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 1
                    }
                },
                {
                    bits: 7399,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 2
                    }
                },
                {
                    bits: 6608,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 3
                    }
                },
                {
                    bits: 1890,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 4
                    }
                },
                {
                    bits: 597,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 5
                    }
                },
                {
                    bits: 3340,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 6
                    }
                },
                {
                    bits: 2107,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 7
                    }
                },
                {
                    bits: 13663,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 0
                    }
                },
                {
                    bits: 12392,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 1
                    }
                },
                {
                    bits: 16177,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 2
                    }
                },
                {
                    bits: 14854,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 3
                    }
                },
                {
                    bits: 9396,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 4
                    }
                },
                {
                    bits: 8579,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 5
                    }
                },
                {
                    bits: 11994,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 6
                    }
                },
                {
                    bits: 11245,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 7
                    }
                }, 
            ];
            var DATA_MASKS = [
                function(p) {
                    return (p.y + p.x) % 2 === 0;
                },
                function(p) {
                    return p.y % 2 === 0;
                },
                function(p) {
                    return p.x % 3 === 0;
                },
                function(p) {
                    return (p.y + p.x) % 3 === 0;
                },
                function(p) {
                    return (Math.floor(p.y / 2) + Math.floor(p.x / 3)) % 2 === 0;
                },
                function(p) {
                    return p.x * p.y % 2 + p.x * p.y % 3 === 0;
                },
                function(p) {
                    return (p.y * p.x % 2 + p.y * p.x % 3) % 2 === 0;
                },
                function(p) {
                    return ((p.y + p.x) % 2 + p.y * p.x % 3) % 2 === 0;
                }, 
            ];
            function buildFunctionPatternMask(version) {
                var dimension = 17 + 4 * version.versionNumber;
                var matrix = BitMatrix_1.BitMatrix.createEmpty(dimension, dimension);
                matrix.setRegion(0, 0, 9, 9, true); // Top left finder pattern + separator + format
                matrix.setRegion(dimension - 8, 0, 8, 9, true); // Top right finder pattern + separator + format
                matrix.setRegion(0, dimension - 8, 9, 8, true); // Bottom left finder pattern + separator + format
                // Alignment patterns
                for(var _i = 0, _a = version.alignmentPatternCenters; _i < _a.length; _i++){
                    var x = _a[_i];
                    for(var _b = 0, _c = version.alignmentPatternCenters; _b < _c.length; _b++){
                        var y = _c[_b];
                        if (!(x === 6 && y === 6 || x === 6 && y === dimension - 7 || x === dimension - 7 && y === 6)) matrix.setRegion(x - 2, y - 2, 5, 5, true);
                    }
                }
                matrix.setRegion(6, 9, 1, dimension - 17, true); // Vertical timing pattern
                matrix.setRegion(9, 6, dimension - 17, 1, true); // Horizontal timing pattern
                if (version.versionNumber > 6) {
                    matrix.setRegion(dimension - 11, 0, 3, 6, true); // Version info, top right
                    matrix.setRegion(0, dimension - 11, 6, 3, true); // Version info, bottom left
                }
                return matrix;
            }
            function readCodewords(matrix, version, formatInfo) {
                var dataMask = DATA_MASKS[formatInfo.dataMask];
                var dimension = matrix.height;
                var functionPatternMask = buildFunctionPatternMask(version);
                var codewords = [];
                var currentByte = 0;
                var bitsRead = 0;
                // Read columns in pairs, from right to left
                var readingUp = true;
                for(var columnIndex = dimension - 1; columnIndex > 0; columnIndex -= 2){
                    if (columnIndex === 6) columnIndex--;
                    for(var i = 0; i < dimension; i++){
                        var y = readingUp ? dimension - 1 - i : i;
                        for(var columnOffset = 0; columnOffset < 2; columnOffset++){
                            var x = columnIndex - columnOffset;
                            if (!functionPatternMask.get(x, y)) {
                                bitsRead++;
                                var bit = matrix.get(x, y);
                                if (dataMask({
                                    y: y,
                                    x: x
                                })) bit = !bit;
                                currentByte = pushBit(bit, currentByte);
                                if (bitsRead === 8) {
                                    codewords.push(currentByte);
                                    bitsRead = 0;
                                    currentByte = 0;
                                }
                            }
                        }
                    }
                    readingUp = !readingUp;
                }
                return codewords;
            }
            function readVersion(matrix) {
                var dimension = matrix.height;
                var provisionalVersion = Math.floor((dimension - 17) / 4);
                if (provisionalVersion <= 6) return version_1.VERSIONS[provisionalVersion - 1];
                var topRightVersionBits = 0;
                for(var y = 5; y >= 0; y--)for(var x = dimension - 9; x >= dimension - 11; x--)topRightVersionBits = pushBit(matrix.get(x, y), topRightVersionBits);
                var bottomLeftVersionBits = 0;
                for(var x = 5; x >= 0; x--)for(var y = dimension - 9; y >= dimension - 11; y--)bottomLeftVersionBits = pushBit(matrix.get(x, y), bottomLeftVersionBits);
                var bestDifference = Infinity;
                var bestVersion;
                for(var _i = 0, VERSIONS_1 = version_1.VERSIONS; _i < VERSIONS_1.length; _i++){
                    var version = VERSIONS_1[_i];
                    if (version.infoBits === topRightVersionBits || version.infoBits === bottomLeftVersionBits) return version;
                    var difference = numBitsDiffering(topRightVersionBits, version.infoBits);
                    if (difference < bestDifference) {
                        bestVersion = version;
                        bestDifference = difference;
                    }
                    difference = numBitsDiffering(bottomLeftVersionBits, version.infoBits);
                    if (difference < bestDifference) {
                        bestVersion = version;
                        bestDifference = difference;
                    }
                }
                // We can tolerate up to 3 bits of error since no two version info codewords will
                // differ in less than 8 bits.
                if (bestDifference <= 3) return bestVersion;
            }
            function readFormatInformation(matrix) {
                var topLeftFormatInfoBits = 0;
                for(var x = 0; x <= 8; x++)if (x !== 6) topLeftFormatInfoBits = pushBit(matrix.get(x, 8), topLeftFormatInfoBits);
                for(var y = 7; y >= 0; y--)if (y !== 6) topLeftFormatInfoBits = pushBit(matrix.get(8, y), topLeftFormatInfoBits);
                var dimension = matrix.height;
                var topRightBottomRightFormatInfoBits = 0;
                for(var y = dimension - 1; y >= dimension - 7; y--)topRightBottomRightFormatInfoBits = pushBit(matrix.get(8, y), topRightBottomRightFormatInfoBits);
                for(var x = dimension - 8; x < dimension; x++)topRightBottomRightFormatInfoBits = pushBit(matrix.get(x, 8), topRightBottomRightFormatInfoBits);
                var bestDifference = Infinity;
                var bestFormatInfo = null;
                for(var _i = 0, FORMAT_INFO_TABLE_1 = FORMAT_INFO_TABLE; _i < FORMAT_INFO_TABLE_1.length; _i++){
                    var _a = FORMAT_INFO_TABLE_1[_i], bits = _a.bits, formatInfo = _a.formatInfo;
                    if (bits === topLeftFormatInfoBits || bits === topRightBottomRightFormatInfoBits) return formatInfo;
                    var difference = numBitsDiffering(topLeftFormatInfoBits, bits);
                    if (difference < bestDifference) {
                        bestFormatInfo = formatInfo;
                        bestDifference = difference;
                    }
                    if (topLeftFormatInfoBits !== topRightBottomRightFormatInfoBits) {
                        difference = numBitsDiffering(topRightBottomRightFormatInfoBits, bits);
                        if (difference < bestDifference) {
                            bestFormatInfo = formatInfo;
                            bestDifference = difference;
                        }
                    }
                }
                // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits differing means we found a match
                if (bestDifference <= 3) return bestFormatInfo;
                return null;
            }
            function getDataBlocks(codewords, version, ecLevel) {
                var ecInfo = version.errorCorrectionLevels[ecLevel];
                var dataBlocks = [];
                var totalCodewords = 0;
                ecInfo.ecBlocks.forEach(function(block) {
                    for(var i = 0; i < block.numBlocks; i++){
                        dataBlocks.push({
                            numDataCodewords: block.dataCodewordsPerBlock,
                            codewords: []
                        });
                        totalCodewords += block.dataCodewordsPerBlock + ecInfo.ecCodewordsPerBlock;
                    }
                });
                // In some cases the QR code will be malformed enough that we pull off more or less than we should.
                // If we pull off less there's nothing we can do.
                // If we pull off more we can safely truncate
                if (codewords.length < totalCodewords) return null;
                codewords = codewords.slice(0, totalCodewords);
                var shortBlockSize = ecInfo.ecBlocks[0].dataCodewordsPerBlock;
                // Pull codewords to fill the blocks up to the minimum size
                for(var i1 = 0; i1 < shortBlockSize; i1++)for(var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++){
                    var dataBlock = dataBlocks_1[_i];
                    dataBlock.codewords.push(codewords.shift());
                }
                // If there are any large blocks, pull codewords to fill the last element of those
                if (ecInfo.ecBlocks.length > 1) {
                    var smallBlockCount = ecInfo.ecBlocks[0].numBlocks;
                    var largeBlockCount = ecInfo.ecBlocks[1].numBlocks;
                    for(var i1 = 0; i1 < largeBlockCount; i1++)dataBlocks[smallBlockCount + i1].codewords.push(codewords.shift());
                }
                // Add the rest of the codewords to the blocks. These are the error correction codewords.
                while(codewords.length > 0)for(var _a = 0, dataBlocks_2 = dataBlocks; _a < dataBlocks_2.length; _a++){
                    var dataBlock = dataBlocks_2[_a];
                    dataBlock.codewords.push(codewords.shift());
                }
                return dataBlocks;
            }
            function decodeMatrix(matrix) {
                var version = readVersion(matrix);
                if (!version) return null;
                var formatInfo = readFormatInformation(matrix);
                if (!formatInfo) return null;
                var codewords = readCodewords(matrix, version, formatInfo);
                var dataBlocks = getDataBlocks(codewords, version, formatInfo.errorCorrectionLevel);
                if (!dataBlocks) return null;
                // Count total number of data bytes
                var totalBytes = dataBlocks.reduce(function(a, b) {
                    return a + b.numDataCodewords;
                }, 0);
                var resultBytes = new Uint8ClampedArray(totalBytes);
                var resultIndex = 0;
                for(var _i = 0, dataBlocks_3 = dataBlocks; _i < dataBlocks_3.length; _i++){
                    var dataBlock = dataBlocks_3[_i];
                    var correctedBytes = reedsolomon_1.decode(dataBlock.codewords, dataBlock.codewords.length - dataBlock.numDataCodewords);
                    if (!correctedBytes) return null;
                    for(var i = 0; i < dataBlock.numDataCodewords; i++)resultBytes[resultIndex++] = correctedBytes[i];
                }
                try {
                    return decodeData_1.decode(resultBytes, version.versionNumber);
                } catch (_a) {
                    return null;
                }
            }
            function decode(matrix) {
                if (matrix == null) return null;
                var result = decodeMatrix(matrix);
                if (result) return result;
                // Decoding didn't work, try mirroring the QR across the topLeft -> bottomRight line.
                for(var x = 0; x < matrix.width; x++){
                    for(var y = x + 1; y < matrix.height; y++)if (matrix.get(x, y) !== matrix.get(y, x)) {
                        matrix.set(x, y, !matrix.get(x, y));
                        matrix.set(y, x, !matrix.get(y, x));
                    }
                }
                return decodeMatrix(matrix);
            }
            exports.decode = decode;
        /***/ },
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            // tslint:disable:no-bitwise
            var BitStream_1 = __webpack_require__(7);
            var shiftJISTable_1 = __webpack_require__(8);
            var Mode1;
            (function(Mode) {
                Mode["Numeric"] = "numeric";
                Mode["Alphanumeric"] = "alphanumeric";
                Mode["Byte"] = "byte";
                Mode["Kanji"] = "kanji";
                Mode["ECI"] = "eci";
            })(Mode1 = exports.Mode || (exports.Mode = {
            }));
            var ModeByte1;
            (function(ModeByte) {
                ModeByte[ModeByte["Terminator"] = 0] = "Terminator";
                ModeByte[ModeByte["Numeric"] = 1] = "Numeric";
                ModeByte[ModeByte["Alphanumeric"] = 2] = "Alphanumeric";
                ModeByte[ModeByte["Byte"] = 4] = "Byte";
                ModeByte[ModeByte["Kanji"] = 8] = "Kanji";
                ModeByte[ModeByte["ECI"] = 7] = "ECI";
            // StructuredAppend = 0x3,
            // FNC1FirstPosition = 0x5,
            // FNC1SecondPosition = 0x9,
            })(ModeByte1 || (ModeByte1 = {
            }));
            function decodeNumeric(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    10,
                    12,
                    14
                ][size];
                var length = stream.readBits(characterCountSize);
                // Read digits in groups of 3
                while(length >= 3){
                    var num = stream.readBits(10);
                    if (num >= 1000) throw new Error("Invalid numeric value above 999");
                    var a = Math.floor(num / 100);
                    var b = Math.floor(num / 10) % 10;
                    var c = num % 10;
                    bytes.push(48 + a, 48 + b, 48 + c);
                    text += a.toString() + b.toString() + c.toString();
                    length -= 3;
                }
                // If the number of digits aren't a multiple of 3, the remaining digits are special cased.
                if (length === 2) {
                    var num = stream.readBits(7);
                    if (num >= 100) throw new Error("Invalid numeric value above 99");
                    var a = Math.floor(num / 10);
                    var b = num % 10;
                    bytes.push(48 + a, 48 + b);
                    text += a.toString() + b.toString();
                } else if (length === 1) {
                    var num = stream.readBits(4);
                    if (num >= 10) throw new Error("Invalid numeric value above 9");
                    bytes.push(48 + num);
                    text += num.toString();
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            var AlphanumericCharacterCodes = [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                " ",
                "$",
                "%",
                "*",
                "+",
                "-",
                ".",
                "/",
                ":", 
            ];
            function decodeAlphanumeric(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    9,
                    11,
                    13
                ][size];
                var length = stream.readBits(characterCountSize);
                while(length >= 2){
                    var v = stream.readBits(11);
                    var a = Math.floor(v / 45);
                    var b = v % 45;
                    bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0), AlphanumericCharacterCodes[b].charCodeAt(0));
                    text += AlphanumericCharacterCodes[a] + AlphanumericCharacterCodes[b];
                    length -= 2;
                }
                if (length === 1) {
                    var a = stream.readBits(6);
                    bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0));
                    text += AlphanumericCharacterCodes[a];
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            function decodeByte(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    8,
                    16,
                    16
                ][size];
                var length = stream.readBits(characterCountSize);
                for(var i = 0; i < length; i++){
                    var b = stream.readBits(8);
                    bytes.push(b);
                }
                try {
                    text += decodeURIComponent(bytes.map(function(b) {
                        return "%" + ("0" + b.toString(16)).substr(-2);
                    }).join(""));
                } catch (_a) {
                // failed to decode
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            function decodeKanji(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    8,
                    10,
                    12
                ][size];
                var length = stream.readBits(characterCountSize);
                for(var i = 0; i < length; i++){
                    var k = stream.readBits(13);
                    var c = Math.floor(k / 192) << 8 | k % 192;
                    if (c < 7936) c += 33088;
                    else c += 49472;
                    bytes.push(c >> 8, c & 255);
                    text += String.fromCharCode(shiftJISTable_1.shiftJISTable[c]);
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            function decode(data, version) {
                var _a, _b, _c, _d;
                var stream = new BitStream_1.BitStream(data);
                // There are 3 'sizes' based on the version. 1-9 is small (0), 10-26 is medium (1) and 27-40 is large (2).
                var size = version <= 9 ? 0 : version <= 26 ? 1 : 2;
                var result = {
                    text: "",
                    bytes: [],
                    chunks: [],
                    version: version
                };
                while(stream.available() >= 4){
                    var mode = stream.readBits(4);
                    if (mode === ModeByte1.Terminator) return result;
                    else if (mode === ModeByte1.ECI) {
                        if (stream.readBits(1) === 0) result.chunks.push({
                            type: Mode1.ECI,
                            assignmentNumber: stream.readBits(7)
                        });
                        else if (stream.readBits(1) === 0) result.chunks.push({
                            type: Mode1.ECI,
                            assignmentNumber: stream.readBits(14)
                        });
                        else if (stream.readBits(1) === 0) result.chunks.push({
                            type: Mode1.ECI,
                            assignmentNumber: stream.readBits(21)
                        });
                        else // ECI data seems corrupted
                        result.chunks.push({
                            type: Mode1.ECI,
                            assignmentNumber: -1
                        });
                    } else if (mode === ModeByte1.Numeric) {
                        var numericResult = decodeNumeric(stream, size);
                        result.text += numericResult.text;
                        (_a = result.bytes).push.apply(_a, numericResult.bytes);
                        result.chunks.push({
                            type: Mode1.Numeric,
                            text: numericResult.text
                        });
                    } else if (mode === ModeByte1.Alphanumeric) {
                        var alphanumericResult = decodeAlphanumeric(stream, size);
                        result.text += alphanumericResult.text;
                        (_b = result.bytes).push.apply(_b, alphanumericResult.bytes);
                        result.chunks.push({
                            type: Mode1.Alphanumeric,
                            text: alphanumericResult.text
                        });
                    } else if (mode === ModeByte1.Byte) {
                        var byteResult = decodeByte(stream, size);
                        result.text += byteResult.text;
                        (_c = result.bytes).push.apply(_c, byteResult.bytes);
                        result.chunks.push({
                            type: Mode1.Byte,
                            bytes: byteResult.bytes,
                            text: byteResult.text
                        });
                    } else if (mode === ModeByte1.Kanji) {
                        var kanjiResult = decodeKanji(stream, size);
                        result.text += kanjiResult.text;
                        (_d = result.bytes).push.apply(_d, kanjiResult.bytes);
                        result.chunks.push({
                            type: Mode1.Kanji,
                            bytes: kanjiResult.bytes,
                            text: kanjiResult.text
                        });
                    }
                }
                // If there is no data left, or the remaining bits are all 0, then that counts as a termination marker
                if (stream.available() === 0 || stream.readBits(stream.available()) === 0) return result;
            }
            exports.decode = decode;
        /***/ },
        function(module, exports, __webpack_require__) {
            "use strict";
            // tslint:disable:no-bitwise
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitStream1 = function() {
                function BitStream(bytes) {
                    this.byteOffset = 0;
                    this.bitOffset = 0;
                    this.bytes = bytes;
                }
                BitStream.prototype.readBits = function(numBits) {
                    if (numBits < 1 || numBits > 32 || numBits > this.available()) throw new Error("Cannot read " + numBits.toString() + " bits");
                    var result = 0;
                    // First, read remainder from current byte
                    if (this.bitOffset > 0) {
                        var bitsLeft = 8 - this.bitOffset;
                        var toRead = numBits < bitsLeft ? numBits : bitsLeft;
                        var bitsToNotRead = bitsLeft - toRead;
                        var mask = 255 >> 8 - toRead << bitsToNotRead;
                        result = (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
                        numBits -= toRead;
                        this.bitOffset += toRead;
                        if (this.bitOffset === 8) {
                            this.bitOffset = 0;
                            this.byteOffset++;
                        }
                    }
                    // Next read whole bytes
                    if (numBits > 0) {
                        while(numBits >= 8){
                            result = result << 8 | this.bytes[this.byteOffset] & 255;
                            this.byteOffset++;
                            numBits -= 8;
                        }
                        // Finally read a partial byte
                        if (numBits > 0) {
                            var bitsToNotRead = 8 - numBits;
                            var mask = 255 >> bitsToNotRead << bitsToNotRead;
                            result = result << numBits | (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
                            this.bitOffset += numBits;
                        }
                    }
                    return result;
                };
                BitStream.prototype.available = function() {
                    return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
                };
                return BitStream;
            }();
            exports.BitStream = BitStream1;
        /***/ },
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shiftJISTable = {
                32: 32,
                33: 33,
                34: 34,
                35: 35,
                36: 36,
                37: 37,
                38: 38,
                39: 39,
                40: 40,
                41: 41,
                42: 42,
                43: 43,
                44: 44,
                45: 45,
                46: 46,
                47: 47,
                48: 48,
                49: 49,
                50: 50,
                51: 51,
                52: 52,
                53: 53,
                54: 54,
                55: 55,
                56: 56,
                57: 57,
                58: 58,
                59: 59,
                60: 60,
                61: 61,
                62: 62,
                63: 63,
                64: 64,
                65: 65,
                66: 66,
                67: 67,
                68: 68,
                69: 69,
                70: 70,
                71: 71,
                72: 72,
                73: 73,
                74: 74,
                75: 75,
                76: 76,
                77: 77,
                78: 78,
                79: 79,
                80: 80,
                81: 81,
                82: 82,
                83: 83,
                84: 84,
                85: 85,
                86: 86,
                87: 87,
                88: 88,
                89: 89,
                90: 90,
                91: 91,
                92: 165,
                93: 93,
                94: 94,
                95: 95,
                96: 96,
                97: 97,
                98: 98,
                99: 99,
                100: 100,
                101: 101,
                102: 102,
                103: 103,
                104: 104,
                105: 105,
                106: 106,
                107: 107,
                108: 108,
                109: 109,
                110: 110,
                111: 111,
                112: 112,
                113: 113,
                114: 114,
                115: 115,
                116: 116,
                117: 117,
                118: 118,
                119: 119,
                120: 120,
                121: 121,
                122: 122,
                123: 123,
                124: 124,
                125: 125,
                126: 8254,
                33088: 12288,
                33089: 12289,
                33090: 12290,
                33091: 65292,
                33092: 65294,
                33093: 12539,
                33094: 65306,
                33095: 65307,
                33096: 65311,
                33097: 65281,
                33098: 12443,
                33099: 12444,
                33100: 180,
                33101: 65344,
                33102: 168,
                33103: 65342,
                33104: 65507,
                33105: 65343,
                33106: 12541,
                33107: 12542,
                33108: 12445,
                33109: 12446,
                33110: 12291,
                33111: 20189,
                33112: 12293,
                33113: 12294,
                33114: 12295,
                33115: 12540,
                33116: 8213,
                33117: 8208,
                33118: 65295,
                33119: 92,
                33120: 12316,
                33121: 8214,
                33122: 65372,
                33123: 8230,
                33124: 8229,
                33125: 8216,
                33126: 8217,
                33127: 8220,
                33128: 8221,
                33129: 65288,
                33130: 65289,
                33131: 12308,
                33132: 12309,
                33133: 65339,
                33134: 65341,
                33135: 65371,
                33136: 65373,
                33137: 12296,
                33138: 12297,
                33139: 12298,
                33140: 12299,
                33141: 12300,
                33142: 12301,
                33143: 12302,
                33144: 12303,
                33145: 12304,
                33146: 12305,
                33147: 65291,
                33148: 8722,
                33149: 177,
                33150: 215,
                33152: 247,
                33153: 65309,
                33154: 8800,
                33155: 65308,
                33156: 65310,
                33157: 8806,
                33158: 8807,
                33159: 8734,
                33160: 8756,
                33161: 9794,
                33162: 9792,
                33163: 176,
                33164: 8242,
                33165: 8243,
                33166: 8451,
                33167: 65509,
                33168: 65284,
                33169: 162,
                33170: 163,
                33171: 65285,
                33172: 65283,
                33173: 65286,
                33174: 65290,
                33175: 65312,
                33176: 167,
                33177: 9734,
                33178: 9733,
                33179: 9675,
                33180: 9679,
                33181: 9678,
                33182: 9671,
                33183: 9670,
                33184: 9633,
                33185: 9632,
                33186: 9651,
                33187: 9650,
                33188: 9661,
                33189: 9660,
                33190: 8251,
                33191: 12306,
                33192: 8594,
                33193: 8592,
                33194: 8593,
                33195: 8595,
                33196: 12307,
                33208: 8712,
                33209: 8715,
                33210: 8838,
                33211: 8839,
                33212: 8834,
                33213: 8835,
                33214: 8746,
                33215: 8745,
                33224: 8743,
                33225: 8744,
                33226: 172,
                33227: 8658,
                33228: 8660,
                33229: 8704,
                33230: 8707,
                33242: 8736,
                33243: 8869,
                33244: 8978,
                33245: 8706,
                33246: 8711,
                33247: 8801,
                33248: 8786,
                33249: 8810,
                33250: 8811,
                33251: 8730,
                33252: 8765,
                33253: 8733,
                33254: 8757,
                33255: 8747,
                33256: 8748,
                33264: 8491,
                33265: 8240,
                33266: 9839,
                33267: 9837,
                33268: 9834,
                33269: 8224,
                33270: 8225,
                33271: 182,
                33276: 9711,
                33359: 65296,
                33360: 65297,
                33361: 65298,
                33362: 65299,
                33363: 65300,
                33364: 65301,
                33365: 65302,
                33366: 65303,
                33367: 65304,
                33368: 65305,
                33376: 65313,
                33377: 65314,
                33378: 65315,
                33379: 65316,
                33380: 65317,
                33381: 65318,
                33382: 65319,
                33383: 65320,
                33384: 65321,
                33385: 65322,
                33386: 65323,
                33387: 65324,
                33388: 65325,
                33389: 65326,
                33390: 65327,
                33391: 65328,
                33392: 65329,
                33393: 65330,
                33394: 65331,
                33395: 65332,
                33396: 65333,
                33397: 65334,
                33398: 65335,
                33399: 65336,
                33400: 65337,
                33401: 65338,
                33409: 65345,
                33410: 65346,
                33411: 65347,
                33412: 65348,
                33413: 65349,
                33414: 65350,
                33415: 65351,
                33416: 65352,
                33417: 65353,
                33418: 65354,
                33419: 65355,
                33420: 65356,
                33421: 65357,
                33422: 65358,
                33423: 65359,
                33424: 65360,
                33425: 65361,
                33426: 65362,
                33427: 65363,
                33428: 65364,
                33429: 65365,
                33430: 65366,
                33431: 65367,
                33432: 65368,
                33433: 65369,
                33434: 65370,
                33439: 12353,
                33440: 12354,
                33441: 12355,
                33442: 12356,
                33443: 12357,
                33444: 12358,
                33445: 12359,
                33446: 12360,
                33447: 12361,
                33448: 12362,
                33449: 12363,
                33450: 12364,
                33451: 12365,
                33452: 12366,
                33453: 12367,
                33454: 12368,
                33455: 12369,
                33456: 12370,
                33457: 12371,
                33458: 12372,
                33459: 12373,
                33460: 12374,
                33461: 12375,
                33462: 12376,
                33463: 12377,
                33464: 12378,
                33465: 12379,
                33466: 12380,
                33467: 12381,
                33468: 12382,
                33469: 12383,
                33470: 12384,
                33471: 12385,
                33472: 12386,
                33473: 12387,
                33474: 12388,
                33475: 12389,
                33476: 12390,
                33477: 12391,
                33478: 12392,
                33479: 12393,
                33480: 12394,
                33481: 12395,
                33482: 12396,
                33483: 12397,
                33484: 12398,
                33485: 12399,
                33486: 12400,
                33487: 12401,
                33488: 12402,
                33489: 12403,
                33490: 12404,
                33491: 12405,
                33492: 12406,
                33493: 12407,
                33494: 12408,
                33495: 12409,
                33496: 12410,
                33497: 12411,
                33498: 12412,
                33499: 12413,
                33500: 12414,
                33501: 12415,
                33502: 12416,
                33503: 12417,
                33504: 12418,
                33505: 12419,
                33506: 12420,
                33507: 12421,
                33508: 12422,
                33509: 12423,
                33510: 12424,
                33511: 12425,
                33512: 12426,
                33513: 12427,
                33514: 12428,
                33515: 12429,
                33516: 12430,
                33517: 12431,
                33518: 12432,
                33519: 12433,
                33520: 12434,
                33521: 12435,
                33600: 12449,
                33601: 12450,
                33602: 12451,
                33603: 12452,
                33604: 12453,
                33605: 12454,
                33606: 12455,
                33607: 12456,
                33608: 12457,
                33609: 12458,
                33610: 12459,
                33611: 12460,
                33612: 12461,
                33613: 12462,
                33614: 12463,
                33615: 12464,
                33616: 12465,
                33617: 12466,
                33618: 12467,
                33619: 12468,
                33620: 12469,
                33621: 12470,
                33622: 12471,
                33623: 12472,
                33624: 12473,
                33625: 12474,
                33626: 12475,
                33627: 12476,
                33628: 12477,
                33629: 12478,
                33630: 12479,
                33631: 12480,
                33632: 12481,
                33633: 12482,
                33634: 12483,
                33635: 12484,
                33636: 12485,
                33637: 12486,
                33638: 12487,
                33639: 12488,
                33640: 12489,
                33641: 12490,
                33642: 12491,
                33643: 12492,
                33644: 12493,
                33645: 12494,
                33646: 12495,
                33647: 12496,
                33648: 12497,
                33649: 12498,
                33650: 12499,
                33651: 12500,
                33652: 12501,
                33653: 12502,
                33654: 12503,
                33655: 12504,
                33656: 12505,
                33657: 12506,
                33658: 12507,
                33659: 12508,
                33660: 12509,
                33661: 12510,
                33662: 12511,
                33664: 12512,
                33665: 12513,
                33666: 12514,
                33667: 12515,
                33668: 12516,
                33669: 12517,
                33670: 12518,
                33671: 12519,
                33672: 12520,
                33673: 12521,
                33674: 12522,
                33675: 12523,
                33676: 12524,
                33677: 12525,
                33678: 12526,
                33679: 12527,
                33680: 12528,
                33681: 12529,
                33682: 12530,
                33683: 12531,
                33684: 12532,
                33685: 12533,
                33686: 12534,
                33695: 913,
                33696: 914,
                33697: 915,
                33698: 916,
                33699: 917,
                33700: 918,
                33701: 919,
                33702: 920,
                33703: 921,
                33704: 922,
                33705: 923,
                33706: 924,
                33707: 925,
                33708: 926,
                33709: 927,
                33710: 928,
                33711: 929,
                33712: 931,
                33713: 932,
                33714: 933,
                33715: 934,
                33716: 935,
                33717: 936,
                33718: 937,
                33727: 945,
                33728: 946,
                33729: 947,
                33730: 948,
                33731: 949,
                33732: 950,
                33733: 951,
                33734: 952,
                33735: 953,
                33736: 954,
                33737: 955,
                33738: 956,
                33739: 957,
                33740: 958,
                33741: 959,
                33742: 960,
                33743: 961,
                33744: 963,
                33745: 964,
                33746: 965,
                33747: 966,
                33748: 967,
                33749: 968,
                33750: 969,
                33856: 1040,
                33857: 1041,
                33858: 1042,
                33859: 1043,
                33860: 1044,
                33861: 1045,
                33862: 1025,
                33863: 1046,
                33864: 1047,
                33865: 1048,
                33866: 1049,
                33867: 1050,
                33868: 1051,
                33869: 1052,
                33870: 1053,
                33871: 1054,
                33872: 1055,
                33873: 1056,
                33874: 1057,
                33875: 1058,
                33876: 1059,
                33877: 1060,
                33878: 1061,
                33879: 1062,
                33880: 1063,
                33881: 1064,
                33882: 1065,
                33883: 1066,
                33884: 1067,
                33885: 1068,
                33886: 1069,
                33887: 1070,
                33888: 1071,
                33904: 1072,
                33905: 1073,
                33906: 1074,
                33907: 1075,
                33908: 1076,
                33909: 1077,
                33910: 1105,
                33911: 1078,
                33912: 1079,
                33913: 1080,
                33914: 1081,
                33915: 1082,
                33916: 1083,
                33917: 1084,
                33918: 1085,
                33920: 1086,
                33921: 1087,
                33922: 1088,
                33923: 1089,
                33924: 1090,
                33925: 1091,
                33926: 1092,
                33927: 1093,
                33928: 1094,
                33929: 1095,
                33930: 1096,
                33931: 1097,
                33932: 1098,
                33933: 1099,
                33934: 1100,
                33935: 1101,
                33936: 1102,
                33937: 1103,
                33951: 9472,
                33952: 9474,
                33953: 9484,
                33954: 9488,
                33955: 9496,
                33956: 9492,
                33957: 9500,
                33958: 9516,
                33959: 9508,
                33960: 9524,
                33961: 9532,
                33962: 9473,
                33963: 9475,
                33964: 9487,
                33965: 9491,
                33966: 9499,
                33967: 9495,
                33968: 9507,
                33969: 9523,
                33970: 9515,
                33971: 9531,
                33972: 9547,
                33973: 9504,
                33974: 9519,
                33975: 9512,
                33976: 9527,
                33977: 9535,
                33978: 9501,
                33979: 9520,
                33980: 9509,
                33981: 9528,
                33982: 9538,
                34975: 20124,
                34976: 21782,
                34977: 23043,
                34978: 38463,
                34979: 21696,
                34980: 24859,
                34981: 25384,
                34982: 23030,
                34983: 36898,
                34984: 33909,
                34985: 33564,
                34986: 31312,
                34987: 24746,
                34988: 25569,
                34989: 28197,
                34990: 26093,
                34991: 33894,
                34992: 33446,
                34993: 39925,
                34994: 26771,
                34995: 22311,
                34996: 26017,
                34997: 25201,
                34998: 23451,
                34999: 22992,
                35000: 34427,
                35001: 39156,
                35002: 32098,
                35003: 32190,
                35004: 39822,
                35005: 25110,
                35006: 31903,
                35007: 34999,
                35008: 23433,
                35009: 24245,
                35010: 25353,
                35011: 26263,
                35012: 26696,
                35013: 38343,
                35014: 38797,
                35015: 26447,
                35016: 20197,
                35017: 20234,
                35018: 20301,
                35019: 20381,
                35020: 20553,
                35021: 22258,
                35022: 22839,
                35023: 22996,
                35024: 23041,
                35025: 23561,
                35026: 24799,
                35027: 24847,
                35028: 24944,
                35029: 26131,
                35030: 26885,
                35031: 28858,
                35032: 30031,
                35033: 30064,
                35034: 31227,
                35035: 32173,
                35036: 32239,
                35037: 32963,
                35038: 33806,
                35039: 34915,
                35040: 35586,
                35041: 36949,
                35042: 36986,
                35043: 21307,
                35044: 20117,
                35045: 20133,
                35046: 22495,
                35047: 32946,
                35048: 37057,
                35049: 30959,
                35050: 19968,
                35051: 22769,
                35052: 28322,
                35053: 36920,
                35054: 31282,
                35055: 33576,
                35056: 33419,
                35057: 39983,
                35058: 20801,
                35059: 21360,
                35060: 21693,
                35061: 21729,
                35062: 22240,
                35063: 23035,
                35064: 24341,
                35065: 39154,
                35066: 28139,
                35067: 32996,
                35068: 34093,
                35136: 38498,
                35137: 38512,
                35138: 38560,
                35139: 38907,
                35140: 21515,
                35141: 21491,
                35142: 23431,
                35143: 28879,
                35144: 32701,
                35145: 36802,
                35146: 38632,
                35147: 21359,
                35148: 40284,
                35149: 31418,
                35150: 19985,
                35151: 30867,
                35152: 33276,
                35153: 28198,
                35154: 22040,
                35155: 21764,
                35156: 27421,
                35157: 34074,
                35158: 39995,
                35159: 23013,
                35160: 21417,
                35161: 28006,
                35162: 29916,
                35163: 38287,
                35164: 22082,
                35165: 20113,
                35166: 36939,
                35167: 38642,
                35168: 33615,
                35169: 39180,
                35170: 21473,
                35171: 21942,
                35172: 23344,
                35173: 24433,
                35174: 26144,
                35175: 26355,
                35176: 26628,
                35177: 27704,
                35178: 27891,
                35179: 27945,
                35180: 29787,
                35181: 30408,
                35182: 31310,
                35183: 38964,
                35184: 33521,
                35185: 34907,
                35186: 35424,
                35187: 37613,
                35188: 28082,
                35189: 30123,
                35190: 30410,
                35191: 39365,
                35192: 24742,
                35193: 35585,
                35194: 36234,
                35195: 38322,
                35196: 27022,
                35197: 21421,
                35198: 20870,
                35200: 22290,
                35201: 22576,
                35202: 22852,
                35203: 23476,
                35204: 24310,
                35205: 24616,
                35206: 25513,
                35207: 25588,
                35208: 27839,
                35209: 28436,
                35210: 28814,
                35211: 28948,
                35212: 29017,
                35213: 29141,
                35214: 29503,
                35215: 32257,
                35216: 33398,
                35217: 33489,
                35218: 34199,
                35219: 36960,
                35220: 37467,
                35221: 40219,
                35222: 22633,
                35223: 26044,
                35224: 27738,
                35225: 29989,
                35226: 20985,
                35227: 22830,
                35228: 22885,
                35229: 24448,
                35230: 24540,
                35231: 25276,
                35232: 26106,
                35233: 27178,
                35234: 27431,
                35235: 27572,
                35236: 29579,
                35237: 32705,
                35238: 35158,
                35239: 40236,
                35240: 40206,
                35241: 40644,
                35242: 23713,
                35243: 27798,
                35244: 33659,
                35245: 20740,
                35246: 23627,
                35247: 25014,
                35248: 33222,
                35249: 26742,
                35250: 29281,
                35251: 20057,
                35252: 20474,
                35253: 21368,
                35254: 24681,
                35255: 28201,
                35256: 31311,
                35257: 38899,
                35258: 19979,
                35259: 21270,
                35260: 20206,
                35261: 20309,
                35262: 20285,
                35263: 20385,
                35264: 20339,
                35265: 21152,
                35266: 21487,
                35267: 22025,
                35268: 22799,
                35269: 23233,
                35270: 23478,
                35271: 23521,
                35272: 31185,
                35273: 26247,
                35274: 26524,
                35275: 26550,
                35276: 27468,
                35277: 27827,
                35278: 28779,
                35279: 29634,
                35280: 31117,
                35281: 31166,
                35282: 31292,
                35283: 31623,
                35284: 33457,
                35285: 33499,
                35286: 33540,
                35287: 33655,
                35288: 33775,
                35289: 33747,
                35290: 34662,
                35291: 35506,
                35292: 22057,
                35293: 36008,
                35294: 36838,
                35295: 36942,
                35296: 38686,
                35297: 34442,
                35298: 20420,
                35299: 23784,
                35300: 25105,
                35301: 29273,
                35302: 30011,
                35303: 33253,
                35304: 33469,
                35305: 34558,
                35306: 36032,
                35307: 38597,
                35308: 39187,
                35309: 39381,
                35310: 20171,
                35311: 20250,
                35312: 35299,
                35313: 22238,
                35314: 22602,
                35315: 22730,
                35316: 24315,
                35317: 24555,
                35318: 24618,
                35319: 24724,
                35320: 24674,
                35321: 25040,
                35322: 25106,
                35323: 25296,
                35324: 25913,
                35392: 39745,
                35393: 26214,
                35394: 26800,
                35395: 28023,
                35396: 28784,
                35397: 30028,
                35398: 30342,
                35399: 32117,
                35400: 33445,
                35401: 34809,
                35402: 38283,
                35403: 38542,
                35404: 35997,
                35405: 20977,
                35406: 21182,
                35407: 22806,
                35408: 21683,
                35409: 23475,
                35410: 23830,
                35411: 24936,
                35412: 27010,
                35413: 28079,
                35414: 30861,
                35415: 33995,
                35416: 34903,
                35417: 35442,
                35418: 37799,
                35419: 39608,
                35420: 28012,
                35421: 39336,
                35422: 34521,
                35423: 22435,
                35424: 26623,
                35425: 34510,
                35426: 37390,
                35427: 21123,
                35428: 22151,
                35429: 21508,
                35430: 24275,
                35431: 25313,
                35432: 25785,
                35433: 26684,
                35434: 26680,
                35435: 27579,
                35436: 29554,
                35437: 30906,
                35438: 31339,
                35439: 35226,
                35440: 35282,
                35441: 36203,
                35442: 36611,
                35443: 37101,
                35444: 38307,
                35445: 38548,
                35446: 38761,
                35447: 23398,
                35448: 23731,
                35449: 27005,
                35450: 38989,
                35451: 38990,
                35452: 25499,
                35453: 31520,
                35454: 27179,
                35456: 27263,
                35457: 26806,
                35458: 39949,
                35459: 28511,
                35460: 21106,
                35461: 21917,
                35462: 24688,
                35463: 25324,
                35464: 27963,
                35465: 28167,
                35466: 28369,
                35467: 33883,
                35468: 35088,
                35469: 36676,
                35470: 19988,
                35471: 39993,
                35472: 21494,
                35473: 26907,
                35474: 27194,
                35475: 38788,
                35476: 26666,
                35477: 20828,
                35478: 31427,
                35479: 33970,
                35480: 37340,
                35481: 37772,
                35482: 22107,
                35483: 40232,
                35484: 26658,
                35485: 33541,
                35486: 33841,
                35487: 31909,
                35488: 21000,
                35489: 33477,
                35490: 29926,
                35491: 20094,
                35492: 20355,
                35493: 20896,
                35494: 23506,
                35495: 21002,
                35496: 21208,
                35497: 21223,
                35498: 24059,
                35499: 21914,
                35500: 22570,
                35501: 23014,
                35502: 23436,
                35503: 23448,
                35504: 23515,
                35505: 24178,
                35506: 24185,
                35507: 24739,
                35508: 24863,
                35509: 24931,
                35510: 25022,
                35511: 25563,
                35512: 25954,
                35513: 26577,
                35514: 26707,
                35515: 26874,
                35516: 27454,
                35517: 27475,
                35518: 27735,
                35519: 28450,
                35520: 28567,
                35521: 28485,
                35522: 29872,
                35523: 29976,
                35524: 30435,
                35525: 30475,
                35526: 31487,
                35527: 31649,
                35528: 31777,
                35529: 32233,
                35530: 32566,
                35531: 32752,
                35532: 32925,
                35533: 33382,
                35534: 33694,
                35535: 35251,
                35536: 35532,
                35537: 36011,
                35538: 36996,
                35539: 37969,
                35540: 38291,
                35541: 38289,
                35542: 38306,
                35543: 38501,
                35544: 38867,
                35545: 39208,
                35546: 33304,
                35547: 20024,
                35548: 21547,
                35549: 23736,
                35550: 24012,
                35551: 29609,
                35552: 30284,
                35553: 30524,
                35554: 23721,
                35555: 32747,
                35556: 36107,
                35557: 38593,
                35558: 38929,
                35559: 38996,
                35560: 39000,
                35561: 20225,
                35562: 20238,
                35563: 21361,
                35564: 21916,
                35565: 22120,
                35566: 22522,
                35567: 22855,
                35568: 23305,
                35569: 23492,
                35570: 23696,
                35571: 24076,
                35572: 24190,
                35573: 24524,
                35574: 25582,
                35575: 26426,
                35576: 26071,
                35577: 26082,
                35578: 26399,
                35579: 26827,
                35580: 26820,
                35648: 27231,
                35649: 24112,
                35650: 27589,
                35651: 27671,
                35652: 27773,
                35653: 30079,
                35654: 31048,
                35655: 23395,
                35656: 31232,
                35657: 32000,
                35658: 24509,
                35659: 35215,
                35660: 35352,
                35661: 36020,
                35662: 36215,
                35663: 36556,
                35664: 36637,
                35665: 39138,
                35666: 39438,
                35667: 39740,
                35668: 20096,
                35669: 20605,
                35670: 20736,
                35671: 22931,
                35672: 23452,
                35673: 25135,
                35674: 25216,
                35675: 25836,
                35676: 27450,
                35677: 29344,
                35678: 30097,
                35679: 31047,
                35680: 32681,
                35681: 34811,
                35682: 35516,
                35683: 35696,
                35684: 25516,
                35685: 33738,
                35686: 38816,
                35687: 21513,
                35688: 21507,
                35689: 21931,
                35690: 26708,
                35691: 27224,
                35692: 35440,
                35693: 30759,
                35694: 26485,
                35695: 40653,
                35696: 21364,
                35697: 23458,
                35698: 33050,
                35699: 34384,
                35700: 36870,
                35701: 19992,
                35702: 20037,
                35703: 20167,
                35704: 20241,
                35705: 21450,
                35706: 21560,
                35707: 23470,
                35708: 24339,
                35709: 24613,
                35710: 25937,
                35712: 26429,
                35713: 27714,
                35714: 27762,
                35715: 27875,
                35716: 28792,
                35717: 29699,
                35718: 31350,
                35719: 31406,
                35720: 31496,
                35721: 32026,
                35722: 31998,
                35723: 32102,
                35724: 26087,
                35725: 29275,
                35726: 21435,
                35727: 23621,
                35728: 24040,
                35729: 25298,
                35730: 25312,
                35731: 25369,
                35732: 28192,
                35733: 34394,
                35734: 35377,
                35735: 36317,
                35736: 37624,
                35737: 28417,
                35738: 31142,
                35739: 39770,
                35740: 20136,
                35741: 20139,
                35742: 20140,
                35743: 20379,
                35744: 20384,
                35745: 20689,
                35746: 20807,
                35747: 31478,
                35748: 20849,
                35749: 20982,
                35750: 21332,
                35751: 21281,
                35752: 21375,
                35753: 21483,
                35754: 21932,
                35755: 22659,
                35756: 23777,
                35757: 24375,
                35758: 24394,
                35759: 24623,
                35760: 24656,
                35761: 24685,
                35762: 25375,
                35763: 25945,
                35764: 27211,
                35765: 27841,
                35766: 29378,
                35767: 29421,
                35768: 30703,
                35769: 33016,
                35770: 33029,
                35771: 33288,
                35772: 34126,
                35773: 37111,
                35774: 37857,
                35775: 38911,
                35776: 39255,
                35777: 39514,
                35778: 20208,
                35779: 20957,
                35780: 23597,
                35781: 26241,
                35782: 26989,
                35783: 23616,
                35784: 26354,
                35785: 26997,
                35786: 29577,
                35787: 26704,
                35788: 31873,
                35789: 20677,
                35790: 21220,
                35791: 22343,
                35792: 24062,
                35793: 37670,
                35794: 26020,
                35795: 27427,
                35796: 27453,
                35797: 29748,
                35798: 31105,
                35799: 31165,
                35800: 31563,
                35801: 32202,
                35802: 33465,
                35803: 33740,
                35804: 34943,
                35805: 35167,
                35806: 35641,
                35807: 36817,
                35808: 37329,
                35809: 21535,
                35810: 37504,
                35811: 20061,
                35812: 20534,
                35813: 21477,
                35814: 21306,
                35815: 29399,
                35816: 29590,
                35817: 30697,
                35818: 33510,
                35819: 36527,
                35820: 39366,
                35821: 39368,
                35822: 39378,
                35823: 20855,
                35824: 24858,
                35825: 34398,
                35826: 21936,
                35827: 31354,
                35828: 20598,
                35829: 23507,
                35830: 36935,
                35831: 38533,
                35832: 20018,
                35833: 27355,
                35834: 37351,
                35835: 23633,
                35836: 23624,
                35904: 25496,
                35905: 31391,
                35906: 27795,
                35907: 38772,
                35908: 36705,
                35909: 31402,
                35910: 29066,
                35911: 38536,
                35912: 31874,
                35913: 26647,
                35914: 32368,
                35915: 26705,
                35916: 37740,
                35917: 21234,
                35918: 21531,
                35919: 34219,
                35920: 35347,
                35921: 32676,
                35922: 36557,
                35923: 37089,
                35924: 21350,
                35925: 34952,
                35926: 31041,
                35927: 20418,
                35928: 20670,
                35929: 21009,
                35930: 20804,
                35931: 21843,
                35932: 22317,
                35933: 29674,
                35934: 22411,
                35935: 22865,
                35936: 24418,
                35937: 24452,
                35938: 24693,
                35939: 24950,
                35940: 24935,
                35941: 25001,
                35942: 25522,
                35943: 25658,
                35944: 25964,
                35945: 26223,
                35946: 26690,
                35947: 28179,
                35948: 30054,
                35949: 31293,
                35950: 31995,
                35951: 32076,
                35952: 32153,
                35953: 32331,
                35954: 32619,
                35955: 33550,
                35956: 33610,
                35957: 34509,
                35958: 35336,
                35959: 35427,
                35960: 35686,
                35961: 36605,
                35962: 38938,
                35963: 40335,
                35964: 33464,
                35965: 36814,
                35966: 39912,
                35968: 21127,
                35969: 25119,
                35970: 25731,
                35971: 28608,
                35972: 38553,
                35973: 26689,
                35974: 20625,
                35975: 27424,
                35976: 27770,
                35977: 28500,
                35978: 31348,
                35979: 32080,
                35980: 34880,
                35981: 35363,
                35982: 26376,
                35983: 20214,
                35984: 20537,
                35985: 20518,
                35986: 20581,
                35987: 20860,
                35988: 21048,
                35989: 21091,
                35990: 21927,
                35991: 22287,
                35992: 22533,
                35993: 23244,
                35994: 24314,
                35995: 25010,
                35996: 25080,
                35997: 25331,
                35998: 25458,
                35999: 26908,
                36000: 27177,
                36001: 29309,
                36002: 29356,
                36003: 29486,
                36004: 30740,
                36005: 30831,
                36006: 32121,
                36007: 30476,
                36008: 32937,
                36009: 35211,
                36010: 35609,
                36011: 36066,
                36012: 36562,
                36013: 36963,
                36014: 37749,
                36015: 38522,
                36016: 38997,
                36017: 39443,
                36018: 40568,
                36019: 20803,
                36020: 21407,
                36021: 21427,
                36022: 24187,
                36023: 24358,
                36024: 28187,
                36025: 28304,
                36026: 29572,
                36027: 29694,
                36028: 32067,
                36029: 33335,
                36030: 35328,
                36031: 35578,
                36032: 38480,
                36033: 20046,
                36034: 20491,
                36035: 21476,
                36036: 21628,
                36037: 22266,
                36038: 22993,
                36039: 23396,
                36040: 24049,
                36041: 24235,
                36042: 24359,
                36043: 25144,
                36044: 25925,
                36045: 26543,
                36046: 28246,
                36047: 29392,
                36048: 31946,
                36049: 34996,
                36050: 32929,
                36051: 32993,
                36052: 33776,
                36053: 34382,
                36054: 35463,
                36055: 36328,
                36056: 37431,
                36057: 38599,
                36058: 39015,
                36059: 40723,
                36060: 20116,
                36061: 20114,
                36062: 20237,
                36063: 21320,
                36064: 21577,
                36065: 21566,
                36066: 23087,
                36067: 24460,
                36068: 24481,
                36069: 24735,
                36070: 26791,
                36071: 27278,
                36072: 29786,
                36073: 30849,
                36074: 35486,
                36075: 35492,
                36076: 35703,
                36077: 37264,
                36078: 20062,
                36079: 39881,
                36080: 20132,
                36081: 20348,
                36082: 20399,
                36083: 20505,
                36084: 20502,
                36085: 20809,
                36086: 20844,
                36087: 21151,
                36088: 21177,
                36089: 21246,
                36090: 21402,
                36091: 21475,
                36092: 21521,
                36160: 21518,
                36161: 21897,
                36162: 22353,
                36163: 22434,
                36164: 22909,
                36165: 23380,
                36166: 23389,
                36167: 23439,
                36168: 24037,
                36169: 24039,
                36170: 24055,
                36171: 24184,
                36172: 24195,
                36173: 24218,
                36174: 24247,
                36175: 24344,
                36176: 24658,
                36177: 24908,
                36178: 25239,
                36179: 25304,
                36180: 25511,
                36181: 25915,
                36182: 26114,
                36183: 26179,
                36184: 26356,
                36185: 26477,
                36186: 26657,
                36187: 26775,
                36188: 27083,
                36189: 27743,
                36190: 27946,
                36191: 28009,
                36192: 28207,
                36193: 28317,
                36194: 30002,
                36195: 30343,
                36196: 30828,
                36197: 31295,
                36198: 31968,
                36199: 32005,
                36200: 32024,
                36201: 32094,
                36202: 32177,
                36203: 32789,
                36204: 32771,
                36205: 32943,
                36206: 32945,
                36207: 33108,
                36208: 33167,
                36209: 33322,
                36210: 33618,
                36211: 34892,
                36212: 34913,
                36213: 35611,
                36214: 36002,
                36215: 36092,
                36216: 37066,
                36217: 37237,
                36218: 37489,
                36219: 30783,
                36220: 37628,
                36221: 38308,
                36222: 38477,
                36224: 38917,
                36225: 39321,
                36226: 39640,
                36227: 40251,
                36228: 21083,
                36229: 21163,
                36230: 21495,
                36231: 21512,
                36232: 22741,
                36233: 25335,
                36234: 28640,
                36235: 35946,
                36236: 36703,
                36237: 40633,
                36238: 20811,
                36239: 21051,
                36240: 21578,
                36241: 22269,
                36242: 31296,
                36243: 37239,
                36244: 40288,
                36245: 40658,
                36246: 29508,
                36247: 28425,
                36248: 33136,
                36249: 29969,
                36250: 24573,
                36251: 24794,
                36252: 39592,
                36253: 29403,
                36254: 36796,
                36255: 27492,
                36256: 38915,
                36257: 20170,
                36258: 22256,
                36259: 22372,
                36260: 22718,
                36261: 23130,
                36262: 24680,
                36263: 25031,
                36264: 26127,
                36265: 26118,
                36266: 26681,
                36267: 26801,
                36268: 28151,
                36269: 30165,
                36270: 32058,
                36271: 33390,
                36272: 39746,
                36273: 20123,
                36274: 20304,
                36275: 21449,
                36276: 21766,
                36277: 23919,
                36278: 24038,
                36279: 24046,
                36280: 26619,
                36281: 27801,
                36282: 29811,
                36283: 30722,
                36284: 35408,
                36285: 37782,
                36286: 35039,
                36287: 22352,
                36288: 24231,
                36289: 25387,
                36290: 20661,
                36291: 20652,
                36292: 20877,
                36293: 26368,
                36294: 21705,
                36295: 22622,
                36296: 22971,
                36297: 23472,
                36298: 24425,
                36299: 25165,
                36300: 25505,
                36301: 26685,
                36302: 27507,
                36303: 28168,
                36304: 28797,
                36305: 37319,
                36306: 29312,
                36307: 30741,
                36308: 30758,
                36309: 31085,
                36310: 25998,
                36311: 32048,
                36312: 33756,
                36313: 35009,
                36314: 36617,
                36315: 38555,
                36316: 21092,
                36317: 22312,
                36318: 26448,
                36319: 32618,
                36320: 36001,
                36321: 20916,
                36322: 22338,
                36323: 38442,
                36324: 22586,
                36325: 27018,
                36326: 32948,
                36327: 21682,
                36328: 23822,
                36329: 22524,
                36330: 30869,
                36331: 40442,
                36332: 20316,
                36333: 21066,
                36334: 21643,
                36335: 25662,
                36336: 26152,
                36337: 26388,
                36338: 26613,
                36339: 31364,
                36340: 31574,
                36341: 32034,
                36342: 37679,
                36343: 26716,
                36344: 39853,
                36345: 31545,
                36346: 21273,
                36347: 20874,
                36348: 21047,
                36416: 23519,
                36417: 25334,
                36418: 25774,
                36419: 25830,
                36420: 26413,
                36421: 27578,
                36422: 34217,
                36423: 38609,
                36424: 30352,
                36425: 39894,
                36426: 25420,
                36427: 37638,
                36428: 39851,
                36429: 30399,
                36430: 26194,
                36431: 19977,
                36432: 20632,
                36433: 21442,
                36434: 23665,
                36435: 24808,
                36436: 25746,
                36437: 25955,
                36438: 26719,
                36439: 29158,
                36440: 29642,
                36441: 29987,
                36442: 31639,
                36443: 32386,
                36444: 34453,
                36445: 35715,
                36446: 36059,
                36447: 37240,
                36448: 39184,
                36449: 26028,
                36450: 26283,
                36451: 27531,
                36452: 20181,
                36453: 20180,
                36454: 20282,
                36455: 20351,
                36456: 21050,
                36457: 21496,
                36458: 21490,
                36459: 21987,
                36460: 22235,
                36461: 22763,
                36462: 22987,
                36463: 22985,
                36464: 23039,
                36465: 23376,
                36466: 23629,
                36467: 24066,
                36468: 24107,
                36469: 24535,
                36470: 24605,
                36471: 25351,
                36472: 25903,
                36473: 23388,
                36474: 26031,
                36475: 26045,
                36476: 26088,
                36477: 26525,
                36478: 27490,
                36480: 27515,
                36481: 27663,
                36482: 29509,
                36483: 31049,
                36484: 31169,
                36485: 31992,
                36486: 32025,
                36487: 32043,
                36488: 32930,
                36489: 33026,
                36490: 33267,
                36491: 35222,
                36492: 35422,
                36493: 35433,
                36494: 35430,
                36495: 35468,
                36496: 35566,
                36497: 36039,
                36498: 36060,
                36499: 38604,
                36500: 39164,
                36501: 27503,
                36502: 20107,
                36503: 20284,
                36504: 20365,
                36505: 20816,
                36506: 23383,
                36507: 23546,
                36508: 24904,
                36509: 25345,
                36510: 26178,
                36511: 27425,
                36512: 28363,
                36513: 27835,
                36514: 29246,
                36515: 29885,
                36516: 30164,
                36517: 30913,
                36518: 31034,
                36519: 32780,
                36520: 32819,
                36521: 33258,
                36522: 33940,
                36523: 36766,
                36524: 27728,
                36525: 40575,
                36526: 24335,
                36527: 35672,
                36528: 40235,
                36529: 31482,
                36530: 36600,
                36531: 23437,
                36532: 38635,
                36533: 19971,
                36534: 21489,
                36535: 22519,
                36536: 22833,
                36537: 23241,
                36538: 23460,
                36539: 24713,
                36540: 28287,
                36541: 28422,
                36542: 30142,
                36543: 36074,
                36544: 23455,
                36545: 34048,
                36546: 31712,
                36547: 20594,
                36548: 26612,
                36549: 33437,
                36550: 23649,
                36551: 34122,
                36552: 32286,
                36553: 33294,
                36554: 20889,
                36555: 23556,
                36556: 25448,
                36557: 36198,
                36558: 26012,
                36559: 29038,
                36560: 31038,
                36561: 32023,
                36562: 32773,
                36563: 35613,
                36564: 36554,
                36565: 36974,
                36566: 34503,
                36567: 37034,
                36568: 20511,
                36569: 21242,
                36570: 23610,
                36571: 26451,
                36572: 28796,
                36573: 29237,
                36574: 37196,
                36575: 37320,
                36576: 37675,
                36577: 33509,
                36578: 23490,
                36579: 24369,
                36580: 24825,
                36581: 20027,
                36582: 21462,
                36583: 23432,
                36584: 25163,
                36585: 26417,
                36586: 27530,
                36587: 29417,
                36588: 29664,
                36589: 31278,
                36590: 33131,
                36591: 36259,
                36592: 37202,
                36593: 39318,
                36594: 20754,
                36595: 21463,
                36596: 21610,
                36597: 23551,
                36598: 25480,
                36599: 27193,
                36600: 32172,
                36601: 38656,
                36602: 22234,
                36603: 21454,
                36604: 21608,
                36672: 23447,
                36673: 23601,
                36674: 24030,
                36675: 20462,
                36676: 24833,
                36677: 25342,
                36678: 27954,
                36679: 31168,
                36680: 31179,
                36681: 32066,
                36682: 32333,
                36683: 32722,
                36684: 33261,
                36685: 33311,
                36686: 33936,
                36687: 34886,
                36688: 35186,
                36689: 35728,
                36690: 36468,
                36691: 36655,
                36692: 36913,
                36693: 37195,
                36694: 37228,
                36695: 38598,
                36696: 37276,
                36697: 20160,
                36698: 20303,
                36699: 20805,
                36700: 21313,
                36701: 24467,
                36702: 25102,
                36703: 26580,
                36704: 27713,
                36705: 28171,
                36706: 29539,
                36707: 32294,
                36708: 37325,
                36709: 37507,
                36710: 21460,
                36711: 22809,
                36712: 23487,
                36713: 28113,
                36714: 31069,
                36715: 32302,
                36716: 31899,
                36717: 22654,
                36718: 29087,
                36719: 20986,
                36720: 34899,
                36721: 36848,
                36722: 20426,
                36723: 23803,
                36724: 26149,
                36725: 30636,
                36726: 31459,
                36727: 33308,
                36728: 39423,
                36729: 20934,
                36730: 24490,
                36731: 26092,
                36732: 26991,
                36733: 27529,
                36734: 28147,
                36736: 28310,
                36737: 28516,
                36738: 30462,
                36739: 32020,
                36740: 24033,
                36741: 36981,
                36742: 37255,
                36743: 38918,
                36744: 20966,
                36745: 21021,
                36746: 25152,
                36747: 26257,
                36748: 26329,
                36749: 28186,
                36750: 24246,
                36751: 32210,
                36752: 32626,
                36753: 26360,
                36754: 34223,
                36755: 34295,
                36756: 35576,
                36757: 21161,
                36758: 21465,
                36759: 22899,
                36760: 24207,
                36761: 24464,
                36762: 24661,
                36763: 37604,
                36764: 38500,
                36765: 20663,
                36766: 20767,
                36767: 21213,
                36768: 21280,
                36769: 21319,
                36770: 21484,
                36771: 21736,
                36772: 21830,
                36773: 21809,
                36774: 22039,
                36775: 22888,
                36776: 22974,
                36777: 23100,
                36778: 23477,
                36779: 23558,
                36780: 23567,
                36781: 23569,
                36782: 23578,
                36783: 24196,
                36784: 24202,
                36785: 24288,
                36786: 24432,
                36787: 25215,
                36788: 25220,
                36789: 25307,
                36790: 25484,
                36791: 25463,
                36792: 26119,
                36793: 26124,
                36794: 26157,
                36795: 26230,
                36796: 26494,
                36797: 26786,
                36798: 27167,
                36799: 27189,
                36800: 27836,
                36801: 28040,
                36802: 28169,
                36803: 28248,
                36804: 28988,
                36805: 28966,
                36806: 29031,
                36807: 30151,
                36808: 30465,
                36809: 30813,
                36810: 30977,
                36811: 31077,
                36812: 31216,
                36813: 31456,
                36814: 31505,
                36815: 31911,
                36816: 32057,
                36817: 32918,
                36818: 33750,
                36819: 33931,
                36820: 34121,
                36821: 34909,
                36822: 35059,
                36823: 35359,
                36824: 35388,
                36825: 35412,
                36826: 35443,
                36827: 35937,
                36828: 36062,
                36829: 37284,
                36830: 37478,
                36831: 37758,
                36832: 37912,
                36833: 38556,
                36834: 38808,
                36835: 19978,
                36836: 19976,
                36837: 19998,
                36838: 20055,
                36839: 20887,
                36840: 21104,
                36841: 22478,
                36842: 22580,
                36843: 22732,
                36844: 23330,
                36845: 24120,
                36846: 24773,
                36847: 25854,
                36848: 26465,
                36849: 26454,
                36850: 27972,
                36851: 29366,
                36852: 30067,
                36853: 31331,
                36854: 33976,
                36855: 35698,
                36856: 37304,
                36857: 37664,
                36858: 22065,
                36859: 22516,
                36860: 39166,
                36928: 25325,
                36929: 26893,
                36930: 27542,
                36931: 29165,
                36932: 32340,
                36933: 32887,
                36934: 33394,
                36935: 35302,
                36936: 39135,
                36937: 34645,
                36938: 36785,
                36939: 23611,
                36940: 20280,
                36941: 20449,
                36942: 20405,
                36943: 21767,
                36944: 23072,
                36945: 23517,
                36946: 23529,
                36947: 24515,
                36948: 24910,
                36949: 25391,
                36950: 26032,
                36951: 26187,
                36952: 26862,
                36953: 27035,
                36954: 28024,
                36955: 28145,
                36956: 30003,
                36957: 30137,
                36958: 30495,
                36959: 31070,
                36960: 31206,
                36961: 32051,
                36962: 33251,
                36963: 33455,
                36964: 34218,
                36965: 35242,
                36966: 35386,
                36967: 36523,
                36968: 36763,
                36969: 36914,
                36970: 37341,
                36971: 38663,
                36972: 20154,
                36973: 20161,
                36974: 20995,
                36975: 22645,
                36976: 22764,
                36977: 23563,
                36978: 29978,
                36979: 23613,
                36980: 33102,
                36981: 35338,
                36982: 36805,
                36983: 38499,
                36984: 38765,
                36985: 31525,
                36986: 35535,
                36987: 38920,
                36988: 37218,
                36989: 22259,
                36990: 21416,
                36992: 36887,
                36993: 21561,
                36994: 22402,
                36995: 24101,
                36996: 25512,
                36997: 27700,
                36998: 28810,
                36999: 30561,
                37000: 31883,
                37001: 32736,
                37002: 34928,
                37003: 36930,
                37004: 37204,
                37005: 37648,
                37006: 37656,
                37007: 38543,
                37008: 29790,
                37009: 39620,
                37010: 23815,
                37011: 23913,
                37012: 25968,
                37013: 26530,
                37014: 36264,
                37015: 38619,
                37016: 25454,
                37017: 26441,
                37018: 26905,
                37019: 33733,
                37020: 38935,
                37021: 38592,
                37022: 35070,
                37023: 28548,
                37024: 25722,
                37025: 23544,
                37026: 19990,
                37027: 28716,
                37028: 30045,
                37029: 26159,
                37030: 20932,
                37031: 21046,
                37032: 21218,
                37033: 22995,
                37034: 24449,
                37035: 24615,
                37036: 25104,
                37037: 25919,
                37038: 25972,
                37039: 26143,
                37040: 26228,
                37041: 26866,
                37042: 26646,
                37043: 27491,
                37044: 28165,
                37045: 29298,
                37046: 29983,
                37047: 30427,
                37048: 31934,
                37049: 32854,
                37050: 22768,
                37051: 35069,
                37052: 35199,
                37053: 35488,
                37054: 35475,
                37055: 35531,
                37056: 36893,
                37057: 37266,
                37058: 38738,
                37059: 38745,
                37060: 25993,
                37061: 31246,
                37062: 33030,
                37063: 38587,
                37064: 24109,
                37065: 24796,
                37066: 25114,
                37067: 26021,
                37068: 26132,
                37069: 26512,
                37070: 30707,
                37071: 31309,
                37072: 31821,
                37073: 32318,
                37074: 33034,
                37075: 36012,
                37076: 36196,
                37077: 36321,
                37078: 36447,
                37079: 30889,
                37080: 20999,
                37081: 25305,
                37082: 25509,
                37083: 25666,
                37084: 25240,
                37085: 35373,
                37086: 31363,
                37087: 31680,
                37088: 35500,
                37089: 38634,
                37090: 32118,
                37091: 33292,
                37092: 34633,
                37093: 20185,
                37094: 20808,
                37095: 21315,
                37096: 21344,
                37097: 23459,
                37098: 23554,
                37099: 23574,
                37100: 24029,
                37101: 25126,
                37102: 25159,
                37103: 25776,
                37104: 26643,
                37105: 26676,
                37106: 27849,
                37107: 27973,
                37108: 27927,
                37109: 26579,
                37110: 28508,
                37111: 29006,
                37112: 29053,
                37113: 26059,
                37114: 31359,
                37115: 31661,
                37116: 32218,
                37184: 32330,
                37185: 32680,
                37186: 33146,
                37187: 33307,
                37188: 33337,
                37189: 34214,
                37190: 35438,
                37191: 36046,
                37192: 36341,
                37193: 36984,
                37194: 36983,
                37195: 37549,
                37196: 37521,
                37197: 38275,
                37198: 39854,
                37199: 21069,
                37200: 21892,
                37201: 28472,
                37202: 28982,
                37203: 20840,
                37204: 31109,
                37205: 32341,
                37206: 33203,
                37207: 31950,
                37208: 22092,
                37209: 22609,
                37210: 23720,
                37211: 25514,
                37212: 26366,
                37213: 26365,
                37214: 26970,
                37215: 29401,
                37216: 30095,
                37217: 30094,
                37218: 30990,
                37219: 31062,
                37220: 31199,
                37221: 31895,
                37222: 32032,
                37223: 32068,
                37224: 34311,
                37225: 35380,
                37226: 38459,
                37227: 36961,
                37228: 40736,
                37229: 20711,
                37230: 21109,
                37231: 21452,
                37232: 21474,
                37233: 20489,
                37234: 21930,
                37235: 22766,
                37236: 22863,
                37237: 29245,
                37238: 23435,
                37239: 23652,
                37240: 21277,
                37241: 24803,
                37242: 24819,
                37243: 25436,
                37244: 25475,
                37245: 25407,
                37246: 25531,
                37248: 25805,
                37249: 26089,
                37250: 26361,
                37251: 24035,
                37252: 27085,
                37253: 27133,
                37254: 28437,
                37255: 29157,
                37256: 20105,
                37257: 30185,
                37258: 30456,
                37259: 31379,
                37260: 31967,
                37261: 32207,
                37262: 32156,
                37263: 32865,
                37264: 33609,
                37265: 33624,
                37266: 33900,
                37267: 33980,
                37268: 34299,
                37269: 35013,
                37270: 36208,
                37271: 36865,
                37272: 36973,
                37273: 37783,
                37274: 38684,
                37275: 39442,
                37276: 20687,
                37277: 22679,
                37278: 24974,
                37279: 33235,
                37280: 34101,
                37281: 36104,
                37282: 36896,
                37283: 20419,
                37284: 20596,
                37285: 21063,
                37286: 21363,
                37287: 24687,
                37288: 25417,
                37289: 26463,
                37290: 28204,
                37291: 36275,
                37292: 36895,
                37293: 20439,
                37294: 23646,
                37295: 36042,
                37296: 26063,
                37297: 32154,
                37298: 21330,
                37299: 34966,
                37300: 20854,
                37301: 25539,
                37302: 23384,
                37303: 23403,
                37304: 23562,
                37305: 25613,
                37306: 26449,
                37307: 36956,
                37308: 20182,
                37309: 22810,
                37310: 22826,
                37311: 27760,
                37312: 35409,
                37313: 21822,
                37314: 22549,
                37315: 22949,
                37316: 24816,
                37317: 25171,
                37318: 26561,
                37319: 33333,
                37320: 26965,
                37321: 38464,
                37322: 39364,
                37323: 39464,
                37324: 20307,
                37325: 22534,
                37326: 23550,
                37327: 32784,
                37328: 23729,
                37329: 24111,
                37330: 24453,
                37331: 24608,
                37332: 24907,
                37333: 25140,
                37334: 26367,
                37335: 27888,
                37336: 28382,
                37337: 32974,
                37338: 33151,
                37339: 33492,
                37340: 34955,
                37341: 36024,
                37342: 36864,
                37343: 36910,
                37344: 38538,
                37345: 40667,
                37346: 39899,
                37347: 20195,
                37348: 21488,
                37349: 22823,
                37350: 31532,
                37351: 37261,
                37352: 38988,
                37353: 40441,
                37354: 28381,
                37355: 28711,
                37356: 21331,
                37357: 21828,
                37358: 23429,
                37359: 25176,
                37360: 25246,
                37361: 25299,
                37362: 27810,
                37363: 28655,
                37364: 29730,
                37365: 35351,
                37366: 37944,
                37367: 28609,
                37368: 35582,
                37369: 33592,
                37370: 20967,
                37371: 34552,
                37372: 21482,
                37440: 21481,
                37441: 20294,
                37442: 36948,
                37443: 36784,
                37444: 22890,
                37445: 33073,
                37446: 24061,
                37447: 31466,
                37448: 36799,
                37449: 26842,
                37450: 35895,
                37451: 29432,
                37452: 40008,
                37453: 27197,
                37454: 35504,
                37455: 20025,
                37456: 21336,
                37457: 22022,
                37458: 22374,
                37459: 25285,
                37460: 25506,
                37461: 26086,
                37462: 27470,
                37463: 28129,
                37464: 28251,
                37465: 28845,
                37466: 30701,
                37467: 31471,
                37468: 31658,
                37469: 32187,
                37470: 32829,
                37471: 32966,
                37472: 34507,
                37473: 35477,
                37474: 37723,
                37475: 22243,
                37476: 22727,
                37477: 24382,
                37478: 26029,
                37479: 26262,
                37480: 27264,
                37481: 27573,
                37482: 30007,
                37483: 35527,
                37484: 20516,
                37485: 30693,
                37486: 22320,
                37487: 24347,
                37488: 24677,
                37489: 26234,
                37490: 27744,
                37491: 30196,
                37492: 31258,
                37493: 32622,
                37494: 33268,
                37495: 34584,
                37496: 36933,
                37497: 39347,
                37498: 31689,
                37499: 30044,
                37500: 31481,
                37501: 31569,
                37502: 33988,
                37504: 36880,
                37505: 31209,
                37506: 31378,
                37507: 33590,
                37508: 23265,
                37509: 30528,
                37510: 20013,
                37511: 20210,
                37512: 23449,
                37513: 24544,
                37514: 25277,
                37515: 26172,
                37516: 26609,
                37517: 27880,
                37518: 34411,
                37519: 34935,
                37520: 35387,
                37521: 37198,
                37522: 37619,
                37523: 39376,
                37524: 27159,
                37525: 28710,
                37526: 29482,
                37527: 33511,
                37528: 33879,
                37529: 36015,
                37530: 19969,
                37531: 20806,
                37532: 20939,
                37533: 21899,
                37534: 23541,
                37535: 24086,
                37536: 24115,
                37537: 24193,
                37538: 24340,
                37539: 24373,
                37540: 24427,
                37541: 24500,
                37542: 25074,
                37543: 25361,
                37544: 26274,
                37545: 26397,
                37546: 28526,
                37547: 29266,
                37548: 30010,
                37549: 30522,
                37550: 32884,
                37551: 33081,
                37552: 33144,
                37553: 34678,
                37554: 35519,
                37555: 35548,
                37556: 36229,
                37557: 36339,
                37558: 37530,
                37559: 38263,
                37560: 38914,
                37561: 40165,
                37562: 21189,
                37563: 25431,
                37564: 30452,
                37565: 26389,
                37566: 27784,
                37567: 29645,
                37568: 36035,
                37569: 37806,
                37570: 38515,
                37571: 27941,
                37572: 22684,
                37573: 26894,
                37574: 27084,
                37575: 36861,
                37576: 37786,
                37577: 30171,
                37578: 36890,
                37579: 22618,
                37580: 26626,
                37581: 25524,
                37582: 27131,
                37583: 20291,
                37584: 28460,
                37585: 26584,
                37586: 36795,
                37587: 34086,
                37588: 32180,
                37589: 37716,
                37590: 26943,
                37591: 28528,
                37592: 22378,
                37593: 22775,
                37594: 23340,
                37595: 32044,
                37596: 29226,
                37597: 21514,
                37598: 37347,
                37599: 40372,
                37600: 20141,
                37601: 20302,
                37602: 20572,
                37603: 20597,
                37604: 21059,
                37605: 35998,
                37606: 21576,
                37607: 22564,
                37608: 23450,
                37609: 24093,
                37610: 24213,
                37611: 24237,
                37612: 24311,
                37613: 24351,
                37614: 24716,
                37615: 25269,
                37616: 25402,
                37617: 25552,
                37618: 26799,
                37619: 27712,
                37620: 30855,
                37621: 31118,
                37622: 31243,
                37623: 32224,
                37624: 33351,
                37625: 35330,
                37626: 35558,
                37627: 36420,
                37628: 36883,
                37696: 37048,
                37697: 37165,
                37698: 37336,
                37699: 40718,
                37700: 27877,
                37701: 25688,
                37702: 25826,
                37703: 25973,
                37704: 28404,
                37705: 30340,
                37706: 31515,
                37707: 36969,
                37708: 37841,
                37709: 28346,
                37710: 21746,
                37711: 24505,
                37712: 25764,
                37713: 36685,
                37714: 36845,
                37715: 37444,
                37716: 20856,
                37717: 22635,
                37718: 22825,
                37719: 23637,
                37720: 24215,
                37721: 28155,
                37722: 32399,
                37723: 29980,
                37724: 36028,
                37725: 36578,
                37726: 39003,
                37727: 28857,
                37728: 20253,
                37729: 27583,
                37730: 28593,
                37731: 30000,
                37732: 38651,
                37733: 20814,
                37734: 21520,
                37735: 22581,
                37736: 22615,
                37737: 22956,
                37738: 23648,
                37739: 24466,
                37740: 26007,
                37741: 26460,
                37742: 28193,
                37743: 30331,
                37744: 33759,
                37745: 36077,
                37746: 36884,
                37747: 37117,
                37748: 37709,
                37749: 30757,
                37750: 30778,
                37751: 21162,
                37752: 24230,
                37753: 22303,
                37754: 22900,
                37755: 24594,
                37756: 20498,
                37757: 20826,
                37758: 20908,
                37760: 20941,
                37761: 20992,
                37762: 21776,
                37763: 22612,
                37764: 22616,
                37765: 22871,
                37766: 23445,
                37767: 23798,
                37768: 23947,
                37769: 24764,
                37770: 25237,
                37771: 25645,
                37772: 26481,
                37773: 26691,
                37774: 26812,
                37775: 26847,
                37776: 30423,
                37777: 28120,
                37778: 28271,
                37779: 28059,
                37780: 28783,
                37781: 29128,
                37782: 24403,
                37783: 30168,
                37784: 31095,
                37785: 31561,
                37786: 31572,
                37787: 31570,
                37788: 31958,
                37789: 32113,
                37790: 21040,
                37791: 33891,
                37792: 34153,
                37793: 34276,
                37794: 35342,
                37795: 35588,
                37796: 35910,
                37797: 36367,
                37798: 36867,
                37799: 36879,
                37800: 37913,
                37801: 38518,
                37802: 38957,
                37803: 39472,
                37804: 38360,
                37805: 20685,
                37806: 21205,
                37807: 21516,
                37808: 22530,
                37809: 23566,
                37810: 24999,
                37811: 25758,
                37812: 27934,
                37813: 30643,
                37814: 31461,
                37815: 33012,
                37816: 33796,
                37817: 36947,
                37818: 37509,
                37819: 23776,
                37820: 40199,
                37821: 21311,
                37822: 24471,
                37823: 24499,
                37824: 28060,
                37825: 29305,
                37826: 30563,
                37827: 31167,
                37828: 31716,
                37829: 27602,
                37830: 29420,
                37831: 35501,
                37832: 26627,
                37833: 27233,
                37834: 20984,
                37835: 31361,
                37836: 26932,
                37837: 23626,
                37838: 40182,
                37839: 33515,
                37840: 23493,
                37841: 37193,
                37842: 28702,
                37843: 22136,
                37844: 23663,
                37845: 24775,
                37846: 25958,
                37847: 27788,
                37848: 35930,
                37849: 36929,
                37850: 38931,
                37851: 21585,
                37852: 26311,
                37853: 37389,
                37854: 22856,
                37855: 37027,
                37856: 20869,
                37857: 20045,
                37858: 20970,
                37859: 34201,
                37860: 35598,
                37861: 28760,
                37862: 25466,
                37863: 37707,
                37864: 26978,
                37865: 39348,
                37866: 32260,
                37867: 30071,
                37868: 21335,
                37869: 26976,
                37870: 36575,
                37871: 38627,
                37872: 27741,
                37873: 20108,
                37874: 23612,
                37875: 24336,
                37876: 36841,
                37877: 21250,
                37878: 36049,
                37879: 32905,
                37880: 34425,
                37881: 24319,
                37882: 26085,
                37883: 20083,
                37884: 20837,
                37952: 22914,
                37953: 23615,
                37954: 38894,
                37955: 20219,
                37956: 22922,
                37957: 24525,
                37958: 35469,
                37959: 28641,
                37960: 31152,
                37961: 31074,
                37962: 23527,
                37963: 33905,
                37964: 29483,
                37965: 29105,
                37966: 24180,
                37967: 24565,
                37968: 25467,
                37969: 25754,
                37970: 29123,
                37971: 31896,
                37972: 20035,
                37973: 24316,
                37974: 20043,
                37975: 22492,
                37976: 22178,
                37977: 24745,
                37978: 28611,
                37979: 32013,
                37980: 33021,
                37981: 33075,
                37982: 33215,
                37983: 36786,
                37984: 35223,
                37985: 34468,
                37986: 24052,
                37987: 25226,
                37988: 25773,
                37989: 35207,
                37990: 26487,
                37991: 27874,
                37992: 27966,
                37993: 29750,
                37994: 30772,
                37995: 23110,
                37996: 32629,
                37997: 33453,
                37998: 39340,
                37999: 20467,
                38000: 24259,
                38001: 25309,
                38002: 25490,
                38003: 25943,
                38004: 26479,
                38005: 30403,
                38006: 29260,
                38007: 32972,
                38008: 32954,
                38009: 36649,
                38010: 37197,
                38011: 20493,
                38012: 22521,
                38013: 23186,
                38014: 26757,
                38016: 26995,
                38017: 29028,
                38018: 29437,
                38019: 36023,
                38020: 22770,
                38021: 36064,
                38022: 38506,
                38023: 36889,
                38024: 34687,
                38025: 31204,
                38026: 30695,
                38027: 33833,
                38028: 20271,
                38029: 21093,
                38030: 21338,
                38031: 25293,
                38032: 26575,
                38033: 27850,
                38034: 30333,
                38035: 31636,
                38036: 31893,
                38037: 33334,
                38038: 34180,
                38039: 36843,
                38040: 26333,
                38041: 28448,
                38042: 29190,
                38043: 32283,
                38044: 33707,
                38045: 39361,
                38046: 40614,
                38047: 20989,
                38048: 31665,
                38049: 30834,
                38050: 31672,
                38051: 32903,
                38052: 31560,
                38053: 27368,
                38054: 24161,
                38055: 32908,
                38056: 30033,
                38057: 30048,
                38058: 20843,
                38059: 37474,
                38060: 28300,
                38061: 30330,
                38062: 37271,
                38063: 39658,
                38064: 20240,
                38065: 32624,
                38066: 25244,
                38067: 31567,
                38068: 38309,
                38069: 40169,
                38070: 22138,
                38071: 22617,
                38072: 34532,
                38073: 38588,
                38074: 20276,
                38075: 21028,
                38076: 21322,
                38077: 21453,
                38078: 21467,
                38079: 24070,
                38080: 25644,
                38081: 26001,
                38082: 26495,
                38083: 27710,
                38084: 27726,
                38085: 29256,
                38086: 29359,
                38087: 29677,
                38088: 30036,
                38089: 32321,
                38090: 33324,
                38091: 34281,
                38092: 36009,
                38093: 31684,
                38094: 37318,
                38095: 29033,
                38096: 38930,
                38097: 39151,
                38098: 25405,
                38099: 26217,
                38100: 30058,
                38101: 30436,
                38102: 30928,
                38103: 34115,
                38104: 34542,
                38105: 21290,
                38106: 21329,
                38107: 21542,
                38108: 22915,
                38109: 24199,
                38110: 24444,
                38111: 24754,
                38112: 25161,
                38113: 25209,
                38114: 25259,
                38115: 26000,
                38116: 27604,
                38117: 27852,
                38118: 30130,
                38119: 30382,
                38120: 30865,
                38121: 31192,
                38122: 32203,
                38123: 32631,
                38124: 32933,
                38125: 34987,
                38126: 35513,
                38127: 36027,
                38128: 36991,
                38129: 38750,
                38130: 39131,
                38131: 27147,
                38132: 31800,
                38133: 20633,
                38134: 23614,
                38135: 24494,
                38136: 26503,
                38137: 27608,
                38138: 29749,
                38139: 30473,
                38140: 32654,
                38208: 40763,
                38209: 26570,
                38210: 31255,
                38211: 21305,
                38212: 30091,
                38213: 39661,
                38214: 24422,
                38215: 33181,
                38216: 33777,
                38217: 32920,
                38218: 24380,
                38219: 24517,
                38220: 30050,
                38221: 31558,
                38222: 36924,
                38223: 26727,
                38224: 23019,
                38225: 23195,
                38226: 32016,
                38227: 30334,
                38228: 35628,
                38229: 20469,
                38230: 24426,
                38231: 27161,
                38232: 27703,
                38233: 28418,
                38234: 29922,
                38235: 31080,
                38236: 34920,
                38237: 35413,
                38238: 35961,
                38239: 24287,
                38240: 25551,
                38241: 30149,
                38242: 31186,
                38243: 33495,
                38244: 37672,
                38245: 37618,
                38246: 33948,
                38247: 34541,
                38248: 39981,
                38249: 21697,
                38250: 24428,
                38251: 25996,
                38252: 27996,
                38253: 28693,
                38254: 36007,
                38255: 36051,
                38256: 38971,
                38257: 25935,
                38258: 29942,
                38259: 19981,
                38260: 20184,
                38261: 22496,
                38262: 22827,
                38263: 23142,
                38264: 23500,
                38265: 20904,
                38266: 24067,
                38267: 24220,
                38268: 24598,
                38269: 25206,
                38270: 25975,
                38272: 26023,
                38273: 26222,
                38274: 28014,
                38275: 29238,
                38276: 31526,
                38277: 33104,
                38278: 33178,
                38279: 33433,
                38280: 35676,
                38281: 36000,
                38282: 36070,
                38283: 36212,
                38284: 38428,
                38285: 38468,
                38286: 20398,
                38287: 25771,
                38288: 27494,
                38289: 33310,
                38290: 33889,
                38291: 34154,
                38292: 37096,
                38293: 23553,
                38294: 26963,
                38295: 39080,
                38296: 33914,
                38297: 34135,
                38298: 20239,
                38299: 21103,
                38300: 24489,
                38301: 24133,
                38302: 26381,
                38303: 31119,
                38304: 33145,
                38305: 35079,
                38306: 35206,
                38307: 28149,
                38308: 24343,
                38309: 25173,
                38310: 27832,
                38311: 20175,
                38312: 29289,
                38313: 39826,
                38314: 20998,
                38315: 21563,
                38316: 22132,
                38317: 22707,
                38318: 24996,
                38319: 25198,
                38320: 28954,
                38321: 22894,
                38322: 31881,
                38323: 31966,
                38324: 32027,
                38325: 38640,
                38326: 25991,
                38327: 32862,
                38328: 19993,
                38329: 20341,
                38330: 20853,
                38331: 22592,
                38332: 24163,
                38333: 24179,
                38334: 24330,
                38335: 26564,
                38336: 20006,
                38337: 34109,
                38338: 38281,
                38339: 38491,
                38340: 31859,
                38341: 38913,
                38342: 20731,
                38343: 22721,
                38344: 30294,
                38345: 30887,
                38346: 21029,
                38347: 30629,
                38348: 34065,
                38349: 31622,
                38350: 20559,
                38351: 22793,
                38352: 29255,
                38353: 31687,
                38354: 32232,
                38355: 36794,
                38356: 36820,
                38357: 36941,
                38358: 20415,
                38359: 21193,
                38360: 23081,
                38361: 24321,
                38362: 38829,
                38363: 20445,
                38364: 33303,
                38365: 37610,
                38366: 22275,
                38367: 25429,
                38368: 27497,
                38369: 29995,
                38370: 35036,
                38371: 36628,
                38372: 31298,
                38373: 21215,
                38374: 22675,
                38375: 24917,
                38376: 25098,
                38377: 26286,
                38378: 27597,
                38379: 31807,
                38380: 33769,
                38381: 20515,
                38382: 20472,
                38383: 21253,
                38384: 21574,
                38385: 22577,
                38386: 22857,
                38387: 23453,
                38388: 23792,
                38389: 23791,
                38390: 23849,
                38391: 24214,
                38392: 25265,
                38393: 25447,
                38394: 25918,
                38395: 26041,
                38396: 26379,
                38464: 27861,
                38465: 27873,
                38466: 28921,
                38467: 30770,
                38468: 32299,
                38469: 32990,
                38470: 33459,
                38471: 33804,
                38472: 34028,
                38473: 34562,
                38474: 35090,
                38475: 35370,
                38476: 35914,
                38477: 37030,
                38478: 37586,
                38479: 39165,
                38480: 40179,
                38481: 40300,
                38482: 20047,
                38483: 20129,
                38484: 20621,
                38485: 21078,
                38486: 22346,
                38487: 22952,
                38488: 24125,
                38489: 24536,
                38490: 24537,
                38491: 25151,
                38492: 26292,
                38493: 26395,
                38494: 26576,
                38495: 26834,
                38496: 20882,
                38497: 32033,
                38498: 32938,
                38499: 33192,
                38500: 35584,
                38501: 35980,
                38502: 36031,
                38503: 37502,
                38504: 38450,
                38505: 21536,
                38506: 38956,
                38507: 21271,
                38508: 20693,
                38509: 21340,
                38510: 22696,
                38511: 25778,
                38512: 26420,
                38513: 29287,
                38514: 30566,
                38515: 31302,
                38516: 37350,
                38517: 21187,
                38518: 27809,
                38519: 27526,
                38520: 22528,
                38521: 24140,
                38522: 22868,
                38523: 26412,
                38524: 32763,
                38525: 20961,
                38526: 30406,
                38528: 25705,
                38529: 30952,
                38530: 39764,
                38531: 40635,
                38532: 22475,
                38533: 22969,
                38534: 26151,
                38535: 26522,
                38536: 27598,
                38537: 21737,
                38538: 27097,
                38539: 24149,
                38540: 33180,
                38541: 26517,
                38542: 39850,
                38543: 26622,
                38544: 40018,
                38545: 26717,
                38546: 20134,
                38547: 20451,
                38548: 21448,
                38549: 25273,
                38550: 26411,
                38551: 27819,
                38552: 36804,
                38553: 20397,
                38554: 32365,
                38555: 40639,
                38556: 19975,
                38557: 24930,
                38558: 28288,
                38559: 28459,
                38560: 34067,
                38561: 21619,
                38562: 26410,
                38563: 39749,
                38564: 24051,
                38565: 31637,
                38566: 23724,
                38567: 23494,
                38568: 34588,
                38569: 28234,
                38570: 34001,
                38571: 31252,
                38572: 33032,
                38573: 22937,
                38574: 31885,
                38575: 27665,
                38576: 30496,
                38577: 21209,
                38578: 22818,
                38579: 28961,
                38580: 29279,
                38581: 30683,
                38582: 38695,
                38583: 40289,
                38584: 26891,
                38585: 23167,
                38586: 23064,
                38587: 20901,
                38588: 21517,
                38589: 21629,
                38590: 26126,
                38591: 30431,
                38592: 36855,
                38593: 37528,
                38594: 40180,
                38595: 23018,
                38596: 29277,
                38597: 28357,
                38598: 20813,
                38599: 26825,
                38600: 32191,
                38601: 32236,
                38602: 38754,
                38603: 40634,
                38604: 25720,
                38605: 27169,
                38606: 33538,
                38607: 22916,
                38608: 23391,
                38609: 27611,
                38610: 29467,
                38611: 30450,
                38612: 32178,
                38613: 32791,
                38614: 33945,
                38615: 20786,
                38616: 26408,
                38617: 40665,
                38618: 30446,
                38619: 26466,
                38620: 21247,
                38621: 39173,
                38622: 23588,
                38623: 25147,
                38624: 31870,
                38625: 36016,
                38626: 21839,
                38627: 24758,
                38628: 32011,
                38629: 38272,
                38630: 21249,
                38631: 20063,
                38632: 20918,
                38633: 22812,
                38634: 29242,
                38635: 32822,
                38636: 37326,
                38637: 24357,
                38638: 30690,
                38639: 21380,
                38640: 24441,
                38641: 32004,
                38642: 34220,
                38643: 35379,
                38644: 36493,
                38645: 38742,
                38646: 26611,
                38647: 34222,
                38648: 37971,
                38649: 24841,
                38650: 24840,
                38651: 27833,
                38652: 30290,
                38720: 35565,
                38721: 36664,
                38722: 21807,
                38723: 20305,
                38724: 20778,
                38725: 21191,
                38726: 21451,
                38727: 23461,
                38728: 24189,
                38729: 24736,
                38730: 24962,
                38731: 25558,
                38732: 26377,
                38733: 26586,
                38734: 28263,
                38735: 28044,
                38736: 29494,
                38737: 29495,
                38738: 30001,
                38739: 31056,
                38740: 35029,
                38741: 35480,
                38742: 36938,
                38743: 37009,
                38744: 37109,
                38745: 38596,
                38746: 34701,
                38747: 22805,
                38748: 20104,
                38749: 20313,
                38750: 19982,
                38751: 35465,
                38752: 36671,
                38753: 38928,
                38754: 20653,
                38755: 24188,
                38756: 22934,
                38757: 23481,
                38758: 24248,
                38759: 25562,
                38760: 25594,
                38761: 25793,
                38762: 26332,
                38763: 26954,
                38764: 27096,
                38765: 27915,
                38766: 28342,
                38767: 29076,
                38768: 29992,
                38769: 31407,
                38770: 32650,
                38771: 32768,
                38772: 33865,
                38773: 33993,
                38774: 35201,
                38775: 35617,
                38776: 36362,
                38777: 36965,
                38778: 38525,
                38779: 39178,
                38780: 24958,
                38781: 25233,
                38782: 27442,
                38784: 27779,
                38785: 28020,
                38786: 32716,
                38787: 32764,
                38788: 28096,
                38789: 32645,
                38790: 34746,
                38791: 35064,
                38792: 26469,
                38793: 33713,
                38794: 38972,
                38795: 38647,
                38796: 27931,
                38797: 32097,
                38798: 33853,
                38799: 37226,
                38800: 20081,
                38801: 21365,
                38802: 23888,
                38803: 27396,
                38804: 28651,
                38805: 34253,
                38806: 34349,
                38807: 35239,
                38808: 21033,
                38809: 21519,
                38810: 23653,
                38811: 26446,
                38812: 26792,
                38813: 29702,
                38814: 29827,
                38815: 30178,
                38816: 35023,
                38817: 35041,
                38818: 37324,
                38819: 38626,
                38820: 38520,
                38821: 24459,
                38822: 29575,
                38823: 31435,
                38824: 33870,
                38825: 25504,
                38826: 30053,
                38827: 21129,
                38828: 27969,
                38829: 28316,
                38830: 29705,
                38831: 30041,
                38832: 30827,
                38833: 31890,
                38834: 38534,
                38835: 31452,
                38836: 40845,
                38837: 20406,
                38838: 24942,
                38839: 26053,
                38840: 34396,
                38841: 20102,
                38842: 20142,
                38843: 20698,
                38844: 20001,
                38845: 20940,
                38846: 23534,
                38847: 26009,
                38848: 26753,
                38849: 28092,
                38850: 29471,
                38851: 30274,
                38852: 30637,
                38853: 31260,
                38854: 31975,
                38855: 33391,
                38856: 35538,
                38857: 36988,
                38858: 37327,
                38859: 38517,
                38860: 38936,
                38861: 21147,
                38862: 32209,
                38863: 20523,
                38864: 21400,
                38865: 26519,
                38866: 28107,
                38867: 29136,
                38868: 29747,
                38869: 33256,
                38870: 36650,
                38871: 38563,
                38872: 40023,
                38873: 40607,
                38874: 29792,
                38875: 22593,
                38876: 28057,
                38877: 32047,
                38878: 39006,
                38879: 20196,
                38880: 20278,
                38881: 20363,
                38882: 20919,
                38883: 21169,
                38884: 23994,
                38885: 24604,
                38886: 29618,
                38887: 31036,
                38888: 33491,
                38889: 37428,
                38890: 38583,
                38891: 38646,
                38892: 38666,
                38893: 40599,
                38894: 40802,
                38895: 26278,
                38896: 27508,
                38897: 21015,
                38898: 21155,
                38899: 28872,
                38900: 35010,
                38901: 24265,
                38902: 24651,
                38903: 24976,
                38904: 28451,
                38905: 29001,
                38906: 31806,
                38907: 32244,
                38908: 32879,
                38976: 34030,
                38977: 36899,
                38978: 37676,
                38979: 21570,
                38980: 39791,
                38981: 27347,
                38982: 28809,
                38983: 36034,
                38984: 36335,
                38985: 38706,
                38986: 21172,
                38987: 23105,
                38988: 24266,
                38989: 24324,
                38990: 26391,
                38991: 27004,
                38992: 27028,
                38993: 28010,
                38994: 28431,
                38995: 29282,
                38996: 29436,
                38997: 31725,
                38998: 32769,
                38999: 32894,
                39000: 34635,
                39001: 37070,
                39002: 20845,
                39003: 40595,
                39004: 31108,
                39005: 32907,
                39006: 37682,
                39007: 35542,
                39008: 20525,
                39009: 21644,
                39010: 35441,
                39011: 27498,
                39012: 36036,
                39013: 33031,
                39014: 24785,
                39015: 26528,
                39016: 40434,
                39017: 20121,
                39018: 20120,
                39019: 39952,
                39020: 35435,
                39021: 34241,
                39022: 34152,
                39023: 26880,
                39024: 28286,
                39025: 30871,
                39026: 33109,
                39071: 24332,
                39072: 19984,
                39073: 19989,
                39074: 20010,
                39075: 20017,
                39076: 20022,
                39077: 20028,
                39078: 20031,
                39079: 20034,
                39080: 20054,
                39081: 20056,
                39082: 20098,
                39083: 20101,
                39084: 35947,
                39085: 20106,
                39086: 33298,
                39087: 24333,
                39088: 20110,
                39089: 20126,
                39090: 20127,
                39091: 20128,
                39092: 20130,
                39093: 20144,
                39094: 20147,
                39095: 20150,
                39096: 20174,
                39097: 20173,
                39098: 20164,
                39099: 20166,
                39100: 20162,
                39101: 20183,
                39102: 20190,
                39103: 20205,
                39104: 20191,
                39105: 20215,
                39106: 20233,
                39107: 20314,
                39108: 20272,
                39109: 20315,
                39110: 20317,
                39111: 20311,
                39112: 20295,
                39113: 20342,
                39114: 20360,
                39115: 20367,
                39116: 20376,
                39117: 20347,
                39118: 20329,
                39119: 20336,
                39120: 20369,
                39121: 20335,
                39122: 20358,
                39123: 20374,
                39124: 20760,
                39125: 20436,
                39126: 20447,
                39127: 20430,
                39128: 20440,
                39129: 20443,
                39130: 20433,
                39131: 20442,
                39132: 20432,
                39133: 20452,
                39134: 20453,
                39135: 20506,
                39136: 20520,
                39137: 20500,
                39138: 20522,
                39139: 20517,
                39140: 20485,
                39141: 20252,
                39142: 20470,
                39143: 20513,
                39144: 20521,
                39145: 20524,
                39146: 20478,
                39147: 20463,
                39148: 20497,
                39149: 20486,
                39150: 20547,
                39151: 20551,
                39152: 26371,
                39153: 20565,
                39154: 20560,
                39155: 20552,
                39156: 20570,
                39157: 20566,
                39158: 20588,
                39159: 20600,
                39160: 20608,
                39161: 20634,
                39162: 20613,
                39163: 20660,
                39164: 20658,
                39232: 20681,
                39233: 20682,
                39234: 20659,
                39235: 20674,
                39236: 20694,
                39237: 20702,
                39238: 20709,
                39239: 20717,
                39240: 20707,
                39241: 20718,
                39242: 20729,
                39243: 20725,
                39244: 20745,
                39245: 20737,
                39246: 20738,
                39247: 20758,
                39248: 20757,
                39249: 20756,
                39250: 20762,
                39251: 20769,
                39252: 20794,
                39253: 20791,
                39254: 20796,
                39255: 20795,
                39256: 20799,
                39257: 20800,
                39258: 20818,
                39259: 20812,
                39260: 20820,
                39261: 20834,
                39262: 31480,
                39263: 20841,
                39264: 20842,
                39265: 20846,
                39266: 20864,
                39267: 20866,
                39268: 22232,
                39269: 20876,
                39270: 20873,
                39271: 20879,
                39272: 20881,
                39273: 20883,
                39274: 20885,
                39275: 20886,
                39276: 20900,
                39277: 20902,
                39278: 20898,
                39279: 20905,
                39280: 20906,
                39281: 20907,
                39282: 20915,
                39283: 20913,
                39284: 20914,
                39285: 20912,
                39286: 20917,
                39287: 20925,
                39288: 20933,
                39289: 20937,
                39290: 20955,
                39291: 20960,
                39292: 34389,
                39293: 20969,
                39294: 20973,
                39296: 20976,
                39297: 20981,
                39298: 20990,
                39299: 20996,
                39300: 21003,
                39301: 21012,
                39302: 21006,
                39303: 21031,
                39304: 21034,
                39305: 21038,
                39306: 21043,
                39307: 21049,
                39308: 21071,
                39309: 21060,
                39310: 21067,
                39311: 21068,
                39312: 21086,
                39313: 21076,
                39314: 21098,
                39315: 21108,
                39316: 21097,
                39317: 21107,
                39318: 21119,
                39319: 21117,
                39320: 21133,
                39321: 21140,
                39322: 21138,
                39323: 21105,
                39324: 21128,
                39325: 21137,
                39326: 36776,
                39327: 36775,
                39328: 21164,
                39329: 21165,
                39330: 21180,
                39331: 21173,
                39332: 21185,
                39333: 21197,
                39334: 21207,
                39335: 21214,
                39336: 21219,
                39337: 21222,
                39338: 39149,
                39339: 21216,
                39340: 21235,
                39341: 21237,
                39342: 21240,
                39343: 21241,
                39344: 21254,
                39345: 21256,
                39346: 30008,
                39347: 21261,
                39348: 21264,
                39349: 21263,
                39350: 21269,
                39351: 21274,
                39352: 21283,
                39353: 21295,
                39354: 21297,
                39355: 21299,
                39356: 21304,
                39357: 21312,
                39358: 21318,
                39359: 21317,
                39360: 19991,
                39361: 21321,
                39362: 21325,
                39363: 20950,
                39364: 21342,
                39365: 21353,
                39366: 21358,
                39367: 22808,
                39368: 21371,
                39369: 21367,
                39370: 21378,
                39371: 21398,
                39372: 21408,
                39373: 21414,
                39374: 21413,
                39375: 21422,
                39376: 21424,
                39377: 21430,
                39378: 21443,
                39379: 31762,
                39380: 38617,
                39381: 21471,
                39382: 26364,
                39383: 29166,
                39384: 21486,
                39385: 21480,
                39386: 21485,
                39387: 21498,
                39388: 21505,
                39389: 21565,
                39390: 21568,
                39391: 21548,
                39392: 21549,
                39393: 21564,
                39394: 21550,
                39395: 21558,
                39396: 21545,
                39397: 21533,
                39398: 21582,
                39399: 21647,
                39400: 21621,
                39401: 21646,
                39402: 21599,
                39403: 21617,
                39404: 21623,
                39405: 21616,
                39406: 21650,
                39407: 21627,
                39408: 21632,
                39409: 21622,
                39410: 21636,
                39411: 21648,
                39412: 21638,
                39413: 21703,
                39414: 21666,
                39415: 21688,
                39416: 21669,
                39417: 21676,
                39418: 21700,
                39419: 21704,
                39420: 21672,
                39488: 21675,
                39489: 21698,
                39490: 21668,
                39491: 21694,
                39492: 21692,
                39493: 21720,
                39494: 21733,
                39495: 21734,
                39496: 21775,
                39497: 21780,
                39498: 21757,
                39499: 21742,
                39500: 21741,
                39501: 21754,
                39502: 21730,
                39503: 21817,
                39504: 21824,
                39505: 21859,
                39506: 21836,
                39507: 21806,
                39508: 21852,
                39509: 21829,
                39510: 21846,
                39511: 21847,
                39512: 21816,
                39513: 21811,
                39514: 21853,
                39515: 21913,
                39516: 21888,
                39517: 21679,
                39518: 21898,
                39519: 21919,
                39520: 21883,
                39521: 21886,
                39522: 21912,
                39523: 21918,
                39524: 21934,
                39525: 21884,
                39526: 21891,
                39527: 21929,
                39528: 21895,
                39529: 21928,
                39530: 21978,
                39531: 21957,
                39532: 21983,
                39533: 21956,
                39534: 21980,
                39535: 21988,
                39536: 21972,
                39537: 22036,
                39538: 22007,
                39539: 22038,
                39540: 22014,
                39541: 22013,
                39542: 22043,
                39543: 22009,
                39544: 22094,
                39545: 22096,
                39546: 29151,
                39547: 22068,
                39548: 22070,
                39549: 22066,
                39550: 22072,
                39552: 22123,
                39553: 22116,
                39554: 22063,
                39555: 22124,
                39556: 22122,
                39557: 22150,
                39558: 22144,
                39559: 22154,
                39560: 22176,
                39561: 22164,
                39562: 22159,
                39563: 22181,
                39564: 22190,
                39565: 22198,
                39566: 22196,
                39567: 22210,
                39568: 22204,
                39569: 22209,
                39570: 22211,
                39571: 22208,
                39572: 22216,
                39573: 22222,
                39574: 22225,
                39575: 22227,
                39576: 22231,
                39577: 22254,
                39578: 22265,
                39579: 22272,
                39580: 22271,
                39581: 22276,
                39582: 22281,
                39583: 22280,
                39584: 22283,
                39585: 22285,
                39586: 22291,
                39587: 22296,
                39588: 22294,
                39589: 21959,
                39590: 22300,
                39591: 22310,
                39592: 22327,
                39593: 22328,
                39594: 22350,
                39595: 22331,
                39596: 22336,
                39597: 22351,
                39598: 22377,
                39599: 22464,
                39600: 22408,
                39601: 22369,
                39602: 22399,
                39603: 22409,
                39604: 22419,
                39605: 22432,
                39606: 22451,
                39607: 22436,
                39608: 22442,
                39609: 22448,
                39610: 22467,
                39611: 22470,
                39612: 22484,
                39613: 22482,
                39614: 22483,
                39615: 22538,
                39616: 22486,
                39617: 22499,
                39618: 22539,
                39619: 22553,
                39620: 22557,
                39621: 22642,
                39622: 22561,
                39623: 22626,
                39624: 22603,
                39625: 22640,
                39626: 27584,
                39627: 22610,
                39628: 22589,
                39629: 22649,
                39630: 22661,
                39631: 22713,
                39632: 22687,
                39633: 22699,
                39634: 22714,
                39635: 22750,
                39636: 22715,
                39637: 22712,
                39638: 22702,
                39639: 22725,
                39640: 22739,
                39641: 22737,
                39642: 22743,
                39643: 22745,
                39644: 22744,
                39645: 22757,
                39646: 22748,
                39647: 22756,
                39648: 22751,
                39649: 22767,
                39650: 22778,
                39651: 22777,
                39652: 22779,
                39653: 22780,
                39654: 22781,
                39655: 22786,
                39656: 22794,
                39657: 22800,
                39658: 22811,
                39659: 26790,
                39660: 22821,
                39661: 22828,
                39662: 22829,
                39663: 22834,
                39664: 22840,
                39665: 22846,
                39666: 31442,
                39667: 22869,
                39668: 22864,
                39669: 22862,
                39670: 22874,
                39671: 22872,
                39672: 22882,
                39673: 22880,
                39674: 22887,
                39675: 22892,
                39676: 22889,
                39744: 22904,
                39745: 22913,
                39746: 22941,
                39747: 20318,
                39748: 20395,
                39749: 22947,
                39750: 22962,
                39751: 22982,
                39752: 23016,
                39753: 23004,
                39754: 22925,
                39755: 23001,
                39756: 23002,
                39757: 23077,
                39758: 23071,
                39759: 23057,
                39760: 23068,
                39761: 23049,
                39762: 23066,
                39763: 23104,
                39764: 23148,
                39765: 23113,
                39766: 23093,
                39767: 23094,
                39768: 23138,
                39769: 23146,
                39770: 23194,
                39771: 23228,
                39772: 23230,
                39773: 23243,
                39774: 23234,
                39775: 23229,
                39776: 23267,
                39777: 23255,
                39778: 23270,
                39779: 23273,
                39780: 23254,
                39781: 23290,
                39782: 23291,
                39783: 23308,
                39784: 23307,
                39785: 23318,
                39786: 23346,
                39787: 23248,
                39788: 23338,
                39789: 23350,
                39790: 23358,
                39791: 23363,
                39792: 23365,
                39793: 23360,
                39794: 23377,
                39795: 23381,
                39796: 23386,
                39797: 23387,
                39798: 23397,
                39799: 23401,
                39800: 23408,
                39801: 23411,
                39802: 23413,
                39803: 23416,
                39804: 25992,
                39805: 23418,
                39806: 23424,
                39808: 23427,
                39809: 23462,
                39810: 23480,
                39811: 23491,
                39812: 23495,
                39813: 23497,
                39814: 23508,
                39815: 23504,
                39816: 23524,
                39817: 23526,
                39818: 23522,
                39819: 23518,
                39820: 23525,
                39821: 23531,
                39822: 23536,
                39823: 23542,
                39824: 23539,
                39825: 23557,
                39826: 23559,
                39827: 23560,
                39828: 23565,
                39829: 23571,
                39830: 23584,
                39831: 23586,
                39832: 23592,
                39833: 23608,
                39834: 23609,
                39835: 23617,
                39836: 23622,
                39837: 23630,
                39838: 23635,
                39839: 23632,
                39840: 23631,
                39841: 23409,
                39842: 23660,
                39843: 23662,
                39844: 20066,
                39845: 23670,
                39846: 23673,
                39847: 23692,
                39848: 23697,
                39849: 23700,
                39850: 22939,
                39851: 23723,
                39852: 23739,
                39853: 23734,
                39854: 23740,
                39855: 23735,
                39856: 23749,
                39857: 23742,
                39858: 23751,
                39859: 23769,
                39860: 23785,
                39861: 23805,
                39862: 23802,
                39863: 23789,
                39864: 23948,
                39865: 23786,
                39866: 23819,
                39867: 23829,
                39868: 23831,
                39869: 23900,
                39870: 23839,
                39871: 23835,
                39872: 23825,
                39873: 23828,
                39874: 23842,
                39875: 23834,
                39876: 23833,
                39877: 23832,
                39878: 23884,
                39879: 23890,
                39880: 23886,
                39881: 23883,
                39882: 23916,
                39883: 23923,
                39884: 23926,
                39885: 23943,
                39886: 23940,
                39887: 23938,
                39888: 23970,
                39889: 23965,
                39890: 23980,
                39891: 23982,
                39892: 23997,
                39893: 23952,
                39894: 23991,
                39895: 23996,
                39896: 24009,
                39897: 24013,
                39898: 24019,
                39899: 24018,
                39900: 24022,
                39901: 24027,
                39902: 24043,
                39903: 24050,
                39904: 24053,
                39905: 24075,
                39906: 24090,
                39907: 24089,
                39908: 24081,
                39909: 24091,
                39910: 24118,
                39911: 24119,
                39912: 24132,
                39913: 24131,
                39914: 24128,
                39915: 24142,
                39916: 24151,
                39917: 24148,
                39918: 24159,
                39919: 24162,
                39920: 24164,
                39921: 24135,
                39922: 24181,
                39923: 24182,
                39924: 24186,
                39925: 40636,
                39926: 24191,
                39927: 24224,
                39928: 24257,
                39929: 24258,
                39930: 24264,
                39931: 24272,
                39932: 24271,
                40000: 24278,
                40001: 24291,
                40002: 24285,
                40003: 24282,
                40004: 24283,
                40005: 24290,
                40006: 24289,
                40007: 24296,
                40008: 24297,
                40009: 24300,
                40010: 24305,
                40011: 24307,
                40012: 24304,
                40013: 24308,
                40014: 24312,
                40015: 24318,
                40016: 24323,
                40017: 24329,
                40018: 24413,
                40019: 24412,
                40020: 24331,
                40021: 24337,
                40022: 24342,
                40023: 24361,
                40024: 24365,
                40025: 24376,
                40026: 24385,
                40027: 24392,
                40028: 24396,
                40029: 24398,
                40030: 24367,
                40031: 24401,
                40032: 24406,
                40033: 24407,
                40034: 24409,
                40035: 24417,
                40036: 24429,
                40037: 24435,
                40038: 24439,
                40039: 24451,
                40040: 24450,
                40041: 24447,
                40042: 24458,
                40043: 24456,
                40044: 24465,
                40045: 24455,
                40046: 24478,
                40047: 24473,
                40048: 24472,
                40049: 24480,
                40050: 24488,
                40051: 24493,
                40052: 24508,
                40053: 24534,
                40054: 24571,
                40055: 24548,
                40056: 24568,
                40057: 24561,
                40058: 24541,
                40059: 24755,
                40060: 24575,
                40061: 24609,
                40062: 24672,
                40064: 24601,
                40065: 24592,
                40066: 24617,
                40067: 24590,
                40068: 24625,
                40069: 24603,
                40070: 24597,
                40071: 24619,
                40072: 24614,
                40073: 24591,
                40074: 24634,
                40075: 24666,
                40076: 24641,
                40077: 24682,
                40078: 24695,
                40079: 24671,
                40080: 24650,
                40081: 24646,
                40082: 24653,
                40083: 24675,
                40084: 24643,
                40085: 24676,
                40086: 24642,
                40087: 24684,
                40088: 24683,
                40089: 24665,
                40090: 24705,
                40091: 24717,
                40092: 24807,
                40093: 24707,
                40094: 24730,
                40095: 24708,
                40096: 24731,
                40097: 24726,
                40098: 24727,
                40099: 24722,
                40100: 24743,
                40101: 24715,
                40102: 24801,
                40103: 24760,
                40104: 24800,
                40105: 24787,
                40106: 24756,
                40107: 24560,
                40108: 24765,
                40109: 24774,
                40110: 24757,
                40111: 24792,
                40112: 24909,
                40113: 24853,
                40114: 24838,
                40115: 24822,
                40116: 24823,
                40117: 24832,
                40118: 24820,
                40119: 24826,
                40120: 24835,
                40121: 24865,
                40122: 24827,
                40123: 24817,
                40124: 24845,
                40125: 24846,
                40126: 24903,
                40127: 24894,
                40128: 24872,
                40129: 24871,
                40130: 24906,
                40131: 24895,
                40132: 24892,
                40133: 24876,
                40134: 24884,
                40135: 24893,
                40136: 24898,
                40137: 24900,
                40138: 24947,
                40139: 24951,
                40140: 24920,
                40141: 24921,
                40142: 24922,
                40143: 24939,
                40144: 24948,
                40145: 24943,
                40146: 24933,
                40147: 24945,
                40148: 24927,
                40149: 24925,
                40150: 24915,
                40151: 24949,
                40152: 24985,
                40153: 24982,
                40154: 24967,
                40155: 25004,
                40156: 24980,
                40157: 24986,
                40158: 24970,
                40159: 24977,
                40160: 25003,
                40161: 25006,
                40162: 25036,
                40163: 25034,
                40164: 25033,
                40165: 25079,
                40166: 25032,
                40167: 25027,
                40168: 25030,
                40169: 25018,
                40170: 25035,
                40171: 32633,
                40172: 25037,
                40173: 25062,
                40174: 25059,
                40175: 25078,
                40176: 25082,
                40177: 25076,
                40178: 25087,
                40179: 25085,
                40180: 25084,
                40181: 25086,
                40182: 25088,
                40183: 25096,
                40184: 25097,
                40185: 25101,
                40186: 25100,
                40187: 25108,
                40188: 25115,
                40256: 25118,
                40257: 25121,
                40258: 25130,
                40259: 25134,
                40260: 25136,
                40261: 25138,
                40262: 25139,
                40263: 25153,
                40264: 25166,
                40265: 25182,
                40266: 25187,
                40267: 25179,
                40268: 25184,
                40269: 25192,
                40270: 25212,
                40271: 25218,
                40272: 25225,
                40273: 25214,
                40274: 25234,
                40275: 25235,
                40276: 25238,
                40277: 25300,
                40278: 25219,
                40279: 25236,
                40280: 25303,
                40281: 25297,
                40282: 25275,
                40283: 25295,
                40284: 25343,
                40285: 25286,
                40286: 25812,
                40287: 25288,
                40288: 25308,
                40289: 25292,
                40290: 25290,
                40291: 25282,
                40292: 25287,
                40293: 25243,
                40294: 25289,
                40295: 25356,
                40296: 25326,
                40297: 25329,
                40298: 25383,
                40299: 25346,
                40300: 25352,
                40301: 25327,
                40302: 25333,
                40303: 25424,
                40304: 25406,
                40305: 25421,
                40306: 25628,
                40307: 25423,
                40308: 25494,
                40309: 25486,
                40310: 25472,
                40311: 25515,
                40312: 25462,
                40313: 25507,
                40314: 25487,
                40315: 25481,
                40316: 25503,
                40317: 25525,
                40318: 25451,
                40320: 25449,
                40321: 25534,
                40322: 25577,
                40323: 25536,
                40324: 25542,
                40325: 25571,
                40326: 25545,
                40327: 25554,
                40328: 25590,
                40329: 25540,
                40330: 25622,
                40331: 25652,
                40332: 25606,
                40333: 25619,
                40334: 25638,
                40335: 25654,
                40336: 25885,
                40337: 25623,
                40338: 25640,
                40339: 25615,
                40340: 25703,
                40341: 25711,
                40342: 25718,
                40343: 25678,
                40344: 25898,
                40345: 25749,
                40346: 25747,
                40347: 25765,
                40348: 25769,
                40349: 25736,
                40350: 25788,
                40351: 25818,
                40352: 25810,
                40353: 25797,
                40354: 25799,
                40355: 25787,
                40356: 25816,
                40357: 25794,
                40358: 25841,
                40359: 25831,
                40360: 33289,
                40361: 25824,
                40362: 25825,
                40363: 25260,
                40364: 25827,
                40365: 25839,
                40366: 25900,
                40367: 25846,
                40368: 25844,
                40369: 25842,
                40370: 25850,
                40371: 25856,
                40372: 25853,
                40373: 25880,
                40374: 25884,
                40375: 25861,
                40376: 25892,
                40377: 25891,
                40378: 25899,
                40379: 25908,
                40380: 25909,
                40381: 25911,
                40382: 25910,
                40383: 25912,
                40384: 30027,
                40385: 25928,
                40386: 25942,
                40387: 25941,
                40388: 25933,
                40389: 25944,
                40390: 25950,
                40391: 25949,
                40392: 25970,
                40393: 25976,
                40394: 25986,
                40395: 25987,
                40396: 35722,
                40397: 26011,
                40398: 26015,
                40399: 26027,
                40400: 26039,
                40401: 26051,
                40402: 26054,
                40403: 26049,
                40404: 26052,
                40405: 26060,
                40406: 26066,
                40407: 26075,
                40408: 26073,
                40409: 26080,
                40410: 26081,
                40411: 26097,
                40412: 26482,
                40413: 26122,
                40414: 26115,
                40415: 26107,
                40416: 26483,
                40417: 26165,
                40418: 26166,
                40419: 26164,
                40420: 26140,
                40421: 26191,
                40422: 26180,
                40423: 26185,
                40424: 26177,
                40425: 26206,
                40426: 26205,
                40427: 26212,
                40428: 26215,
                40429: 26216,
                40430: 26207,
                40431: 26210,
                40432: 26224,
                40433: 26243,
                40434: 26248,
                40435: 26254,
                40436: 26249,
                40437: 26244,
                40438: 26264,
                40439: 26269,
                40440: 26305,
                40441: 26297,
                40442: 26313,
                40443: 26302,
                40444: 26300,
                40512: 26308,
                40513: 26296,
                40514: 26326,
                40515: 26330,
                40516: 26336,
                40517: 26175,
                40518: 26342,
                40519: 26345,
                40520: 26352,
                40521: 26357,
                40522: 26359,
                40523: 26383,
                40524: 26390,
                40525: 26398,
                40526: 26406,
                40527: 26407,
                40528: 38712,
                40529: 26414,
                40530: 26431,
                40531: 26422,
                40532: 26433,
                40533: 26424,
                40534: 26423,
                40535: 26438,
                40536: 26462,
                40537: 26464,
                40538: 26457,
                40539: 26467,
                40540: 26468,
                40541: 26505,
                40542: 26480,
                40543: 26537,
                40544: 26492,
                40545: 26474,
                40546: 26508,
                40547: 26507,
                40548: 26534,
                40549: 26529,
                40550: 26501,
                40551: 26551,
                40552: 26607,
                40553: 26548,
                40554: 26604,
                40555: 26547,
                40556: 26601,
                40557: 26552,
                40558: 26596,
                40559: 26590,
                40560: 26589,
                40561: 26594,
                40562: 26606,
                40563: 26553,
                40564: 26574,
                40565: 26566,
                40566: 26599,
                40567: 27292,
                40568: 26654,
                40569: 26694,
                40570: 26665,
                40571: 26688,
                40572: 26701,
                40573: 26674,
                40574: 26702,
                40576: 26803,
                40577: 26667,
                40578: 26713,
                40579: 26723,
                40580: 26743,
                40581: 26751,
                40582: 26783,
                40583: 26767,
                40584: 26797,
                40585: 26772,
                40586: 26781,
                40587: 26779,
                40588: 26755,
                40589: 27310,
                40590: 26809,
                40591: 26740,
                40592: 26805,
                40593: 26784,
                40594: 26810,
                40595: 26895,
                40596: 26765,
                40597: 26750,
                40598: 26881,
                40599: 26826,
                40600: 26888,
                40601: 26840,
                40602: 26914,
                40603: 26918,
                40604: 26849,
                40605: 26892,
                40606: 26829,
                40607: 26836,
                40608: 26855,
                40609: 26837,
                40610: 26934,
                40611: 26898,
                40612: 26884,
                40613: 26839,
                40614: 26851,
                40615: 26917,
                40616: 26873,
                40617: 26848,
                40618: 26863,
                40619: 26920,
                40620: 26922,
                40621: 26906,
                40622: 26915,
                40623: 26913,
                40624: 26822,
                40625: 27001,
                40626: 26999,
                40627: 26972,
                40628: 27000,
                40629: 26987,
                40630: 26964,
                40631: 27006,
                40632: 26990,
                40633: 26937,
                40634: 26996,
                40635: 26941,
                40636: 26969,
                40637: 26928,
                40638: 26977,
                40639: 26974,
                40640: 26973,
                40641: 27009,
                40642: 26986,
                40643: 27058,
                40644: 27054,
                40645: 27088,
                40646: 27071,
                40647: 27073,
                40648: 27091,
                40649: 27070,
                40650: 27086,
                40651: 23528,
                40652: 27082,
                40653: 27101,
                40654: 27067,
                40655: 27075,
                40656: 27047,
                40657: 27182,
                40658: 27025,
                40659: 27040,
                40660: 27036,
                40661: 27029,
                40662: 27060,
                40663: 27102,
                40664: 27112,
                40665: 27138,
                40666: 27163,
                40667: 27135,
                40668: 27402,
                40669: 27129,
                40670: 27122,
                40671: 27111,
                40672: 27141,
                40673: 27057,
                40674: 27166,
                40675: 27117,
                40676: 27156,
                40677: 27115,
                40678: 27146,
                40679: 27154,
                40680: 27329,
                40681: 27171,
                40682: 27155,
                40683: 27204,
                40684: 27148,
                40685: 27250,
                40686: 27190,
                40687: 27256,
                40688: 27207,
                40689: 27234,
                40690: 27225,
                40691: 27238,
                40692: 27208,
                40693: 27192,
                40694: 27170,
                40695: 27280,
                40696: 27277,
                40697: 27296,
                40698: 27268,
                40699: 27298,
                40700: 27299,
                40768: 27287,
                40769: 34327,
                40770: 27323,
                40771: 27331,
                40772: 27330,
                40773: 27320,
                40774: 27315,
                40775: 27308,
                40776: 27358,
                40777: 27345,
                40778: 27359,
                40779: 27306,
                40780: 27354,
                40781: 27370,
                40782: 27387,
                40783: 27397,
                40784: 34326,
                40785: 27386,
                40786: 27410,
                40787: 27414,
                40788: 39729,
                40789: 27423,
                40790: 27448,
                40791: 27447,
                40792: 30428,
                40793: 27449,
                40794: 39150,
                40795: 27463,
                40796: 27459,
                40797: 27465,
                40798: 27472,
                40799: 27481,
                40800: 27476,
                40801: 27483,
                40802: 27487,
                40803: 27489,
                40804: 27512,
                40805: 27513,
                40806: 27519,
                40807: 27520,
                40808: 27524,
                40809: 27523,
                40810: 27533,
                40811: 27544,
                40812: 27541,
                40813: 27550,
                40814: 27556,
                40815: 27562,
                40816: 27563,
                40817: 27567,
                40818: 27570,
                40819: 27569,
                40820: 27571,
                40821: 27575,
                40822: 27580,
                40823: 27590,
                40824: 27595,
                40825: 27603,
                40826: 27615,
                40827: 27628,
                40828: 27627,
                40829: 27635,
                40830: 27631,
                40832: 40638,
                40833: 27656,
                40834: 27667,
                40835: 27668,
                40836: 27675,
                40837: 27684,
                40838: 27683,
                40839: 27742,
                40840: 27733,
                40841: 27746,
                40842: 27754,
                40843: 27778,
                40844: 27789,
                40845: 27802,
                40846: 27777,
                40847: 27803,
                40848: 27774,
                40849: 27752,
                40850: 27763,
                40851: 27794,
                40852: 27792,
                40853: 27844,
                40854: 27889,
                40855: 27859,
                40856: 27837,
                40857: 27863,
                40858: 27845,
                40859: 27869,
                40860: 27822,
                40861: 27825,
                40862: 27838,
                40863: 27834,
                40864: 27867,
                40865: 27887,
                40866: 27865,
                40867: 27882,
                40868: 27935,
                40869: 34893,
                40870: 27958,
                40871: 27947,
                40872: 27965,
                40873: 27960,
                40874: 27929,
                40875: 27957,
                40876: 27955,
                40877: 27922,
                40878: 27916,
                40879: 28003,
                40880: 28051,
                40881: 28004,
                40882: 27994,
                40883: 28025,
                40884: 27993,
                40885: 28046,
                40886: 28053,
                40887: 28644,
                40888: 28037,
                40889: 28153,
                40890: 28181,
                40891: 28170,
                40892: 28085,
                40893: 28103,
                40894: 28134,
                40895: 28088,
                40896: 28102,
                40897: 28140,
                40898: 28126,
                40899: 28108,
                40900: 28136,
                40901: 28114,
                40902: 28101,
                40903: 28154,
                40904: 28121,
                40905: 28132,
                40906: 28117,
                40907: 28138,
                40908: 28142,
                40909: 28205,
                40910: 28270,
                40911: 28206,
                40912: 28185,
                40913: 28274,
                40914: 28255,
                40915: 28222,
                40916: 28195,
                40917: 28267,
                40918: 28203,
                40919: 28278,
                40920: 28237,
                40921: 28191,
                40922: 28227,
                40923: 28218,
                40924: 28238,
                40925: 28196,
                40926: 28415,
                40927: 28189,
                40928: 28216,
                40929: 28290,
                40930: 28330,
                40931: 28312,
                40932: 28361,
                40933: 28343,
                40934: 28371,
                40935: 28349,
                40936: 28335,
                40937: 28356,
                40938: 28338,
                40939: 28372,
                40940: 28373,
                40941: 28303,
                40942: 28325,
                40943: 28354,
                40944: 28319,
                40945: 28481,
                40946: 28433,
                40947: 28748,
                40948: 28396,
                40949: 28408,
                40950: 28414,
                40951: 28479,
                40952: 28402,
                40953: 28465,
                40954: 28399,
                40955: 28466,
                40956: 28364,
                161: 65377,
                162: 65378,
                163: 65379,
                164: 65380,
                165: 65381,
                166: 65382,
                167: 65383,
                168: 65384,
                169: 65385,
                170: 65386,
                171: 65387,
                172: 65388,
                173: 65389,
                174: 65390,
                175: 65391,
                176: 65392,
                177: 65393,
                178: 65394,
                179: 65395,
                180: 65396,
                181: 65397,
                182: 65398,
                183: 65399,
                184: 65400,
                185: 65401,
                186: 65402,
                187: 65403,
                188: 65404,
                189: 65405,
                190: 65406,
                191: 65407,
                192: 65408,
                193: 65409,
                194: 65410,
                195: 65411,
                196: 65412,
                197: 65413,
                198: 65414,
                199: 65415,
                200: 65416,
                201: 65417,
                202: 65418,
                203: 65419,
                204: 65420,
                205: 65421,
                206: 65422,
                207: 65423,
                208: 65424,
                209: 65425,
                210: 65426,
                211: 65427,
                212: 65428,
                213: 65429,
                214: 65430,
                215: 65431,
                216: 65432,
                217: 65433,
                218: 65434,
                219: 65435,
                220: 65436,
                221: 65437,
                222: 65438,
                223: 65439,
                57408: 28478,
                57409: 28435,
                57410: 28407,
                57411: 28550,
                57412: 28538,
                57413: 28536,
                57414: 28545,
                57415: 28544,
                57416: 28527,
                57417: 28507,
                57418: 28659,
                57419: 28525,
                57420: 28546,
                57421: 28540,
                57422: 28504,
                57423: 28558,
                57424: 28561,
                57425: 28610,
                57426: 28518,
                57427: 28595,
                57428: 28579,
                57429: 28577,
                57430: 28580,
                57431: 28601,
                57432: 28614,
                57433: 28586,
                57434: 28639,
                57435: 28629,
                57436: 28652,
                57437: 28628,
                57438: 28632,
                57439: 28657,
                57440: 28654,
                57441: 28635,
                57442: 28681,
                57443: 28683,
                57444: 28666,
                57445: 28689,
                57446: 28673,
                57447: 28687,
                57448: 28670,
                57449: 28699,
                57450: 28698,
                57451: 28532,
                57452: 28701,
                57453: 28696,
                57454: 28703,
                57455: 28720,
                57456: 28734,
                57457: 28722,
                57458: 28753,
                57459: 28771,
                57460: 28825,
                57461: 28818,
                57462: 28847,
                57463: 28913,
                57464: 28844,
                57465: 28856,
                57466: 28851,
                57467: 28846,
                57468: 28895,
                57469: 28875,
                57470: 28893,
                57472: 28889,
                57473: 28937,
                57474: 28925,
                57475: 28956,
                57476: 28953,
                57477: 29029,
                57478: 29013,
                57479: 29064,
                57480: 29030,
                57481: 29026,
                57482: 29004,
                57483: 29014,
                57484: 29036,
                57485: 29071,
                57486: 29179,
                57487: 29060,
                57488: 29077,
                57489: 29096,
                57490: 29100,
                57491: 29143,
                57492: 29113,
                57493: 29118,
                57494: 29138,
                57495: 29129,
                57496: 29140,
                57497: 29134,
                57498: 29152,
                57499: 29164,
                57500: 29159,
                57501: 29173,
                57502: 29180,
                57503: 29177,
                57504: 29183,
                57505: 29197,
                57506: 29200,
                57507: 29211,
                57508: 29224,
                57509: 29229,
                57510: 29228,
                57511: 29232,
                57512: 29234,
                57513: 29243,
                57514: 29244,
                57515: 29247,
                57516: 29248,
                57517: 29254,
                57518: 29259,
                57519: 29272,
                57520: 29300,
                57521: 29310,
                57522: 29314,
                57523: 29313,
                57524: 29319,
                57525: 29330,
                57526: 29334,
                57527: 29346,
                57528: 29351,
                57529: 29369,
                57530: 29362,
                57531: 29379,
                57532: 29382,
                57533: 29380,
                57534: 29390,
                57535: 29394,
                57536: 29410,
                57537: 29408,
                57538: 29409,
                57539: 29433,
                57540: 29431,
                57541: 20495,
                57542: 29463,
                57543: 29450,
                57544: 29468,
                57545: 29462,
                57546: 29469,
                57547: 29492,
                57548: 29487,
                57549: 29481,
                57550: 29477,
                57551: 29502,
                57552: 29518,
                57553: 29519,
                57554: 40664,
                57555: 29527,
                57556: 29546,
                57557: 29544,
                57558: 29552,
                57559: 29560,
                57560: 29557,
                57561: 29563,
                57562: 29562,
                57563: 29640,
                57564: 29619,
                57565: 29646,
                57566: 29627,
                57567: 29632,
                57568: 29669,
                57569: 29678,
                57570: 29662,
                57571: 29858,
                57572: 29701,
                57573: 29807,
                57574: 29733,
                57575: 29688,
                57576: 29746,
                57577: 29754,
                57578: 29781,
                57579: 29759,
                57580: 29791,
                57581: 29785,
                57582: 29761,
                57583: 29788,
                57584: 29801,
                57585: 29808,
                57586: 29795,
                57587: 29802,
                57588: 29814,
                57589: 29822,
                57590: 29835,
                57591: 29854,
                57592: 29863,
                57593: 29898,
                57594: 29903,
                57595: 29908,
                57596: 29681,
                57664: 29920,
                57665: 29923,
                57666: 29927,
                57667: 29929,
                57668: 29934,
                57669: 29938,
                57670: 29936,
                57671: 29937,
                57672: 29944,
                57673: 29943,
                57674: 29956,
                57675: 29955,
                57676: 29957,
                57677: 29964,
                57678: 29966,
                57679: 29965,
                57680: 29973,
                57681: 29971,
                57682: 29982,
                57683: 29990,
                57684: 29996,
                57685: 30012,
                57686: 30020,
                57687: 30029,
                57688: 30026,
                57689: 30025,
                57690: 30043,
                57691: 30022,
                57692: 30042,
                57693: 30057,
                57694: 30052,
                57695: 30055,
                57696: 30059,
                57697: 30061,
                57698: 30072,
                57699: 30070,
                57700: 30086,
                57701: 30087,
                57702: 30068,
                57703: 30090,
                57704: 30089,
                57705: 30082,
                57706: 30100,
                57707: 30106,
                57708: 30109,
                57709: 30117,
                57710: 30115,
                57711: 30146,
                57712: 30131,
                57713: 30147,
                57714: 30133,
                57715: 30141,
                57716: 30136,
                57717: 30140,
                57718: 30129,
                57719: 30157,
                57720: 30154,
                57721: 30162,
                57722: 30169,
                57723: 30179,
                57724: 30174,
                57725: 30206,
                57726: 30207,
                57728: 30204,
                57729: 30209,
                57730: 30192,
                57731: 30202,
                57732: 30194,
                57733: 30195,
                57734: 30219,
                57735: 30221,
                57736: 30217,
                57737: 30239,
                57738: 30247,
                57739: 30240,
                57740: 30241,
                57741: 30242,
                57742: 30244,
                57743: 30260,
                57744: 30256,
                57745: 30267,
                57746: 30279,
                57747: 30280,
                57748: 30278,
                57749: 30300,
                57750: 30296,
                57751: 30305,
                57752: 30306,
                57753: 30312,
                57754: 30313,
                57755: 30314,
                57756: 30311,
                57757: 30316,
                57758: 30320,
                57759: 30322,
                57760: 30326,
                57761: 30328,
                57762: 30332,
                57763: 30336,
                57764: 30339,
                57765: 30344,
                57766: 30347,
                57767: 30350,
                57768: 30358,
                57769: 30355,
                57770: 30361,
                57771: 30362,
                57772: 30384,
                57773: 30388,
                57774: 30392,
                57775: 30393,
                57776: 30394,
                57777: 30402,
                57778: 30413,
                57779: 30422,
                57780: 30418,
                57781: 30430,
                57782: 30433,
                57783: 30437,
                57784: 30439,
                57785: 30442,
                57786: 34351,
                57787: 30459,
                57788: 30472,
                57789: 30471,
                57790: 30468,
                57791: 30505,
                57792: 30500,
                57793: 30494,
                57794: 30501,
                57795: 30502,
                57796: 30491,
                57797: 30519,
                57798: 30520,
                57799: 30535,
                57800: 30554,
                57801: 30568,
                57802: 30571,
                57803: 30555,
                57804: 30565,
                57805: 30591,
                57806: 30590,
                57807: 30585,
                57808: 30606,
                57809: 30603,
                57810: 30609,
                57811: 30624,
                57812: 30622,
                57813: 30640,
                57814: 30646,
                57815: 30649,
                57816: 30655,
                57817: 30652,
                57818: 30653,
                57819: 30651,
                57820: 30663,
                57821: 30669,
                57822: 30679,
                57823: 30682,
                57824: 30684,
                57825: 30691,
                57826: 30702,
                57827: 30716,
                57828: 30732,
                57829: 30738,
                57830: 31014,
                57831: 30752,
                57832: 31018,
                57833: 30789,
                57834: 30862,
                57835: 30836,
                57836: 30854,
                57837: 30844,
                57838: 30874,
                57839: 30860,
                57840: 30883,
                57841: 30901,
                57842: 30890,
                57843: 30895,
                57844: 30929,
                57845: 30918,
                57846: 30923,
                57847: 30932,
                57848: 30910,
                57849: 30908,
                57850: 30917,
                57851: 30922,
                57852: 30956,
                57920: 30951,
                57921: 30938,
                57922: 30973,
                57923: 30964,
                57924: 30983,
                57925: 30994,
                57926: 30993,
                57927: 31001,
                57928: 31020,
                57929: 31019,
                57930: 31040,
                57931: 31072,
                57932: 31063,
                57933: 31071,
                57934: 31066,
                57935: 31061,
                57936: 31059,
                57937: 31098,
                57938: 31103,
                57939: 31114,
                57940: 31133,
                57941: 31143,
                57942: 40779,
                57943: 31146,
                57944: 31150,
                57945: 31155,
                57946: 31161,
                57947: 31162,
                57948: 31177,
                57949: 31189,
                57950: 31207,
                57951: 31212,
                57952: 31201,
                57953: 31203,
                57954: 31240,
                57955: 31245,
                57956: 31256,
                57957: 31257,
                57958: 31264,
                57959: 31263,
                57960: 31104,
                57961: 31281,
                57962: 31291,
                57963: 31294,
                57964: 31287,
                57965: 31299,
                57966: 31319,
                57967: 31305,
                57968: 31329,
                57969: 31330,
                57970: 31337,
                57971: 40861,
                57972: 31344,
                57973: 31353,
                57974: 31357,
                57975: 31368,
                57976: 31383,
                57977: 31381,
                57978: 31384,
                57979: 31382,
                57980: 31401,
                57981: 31432,
                57982: 31408,
                57984: 31414,
                57985: 31429,
                57986: 31428,
                57987: 31423,
                57988: 36995,
                57989: 31431,
                57990: 31434,
                57991: 31437,
                57992: 31439,
                57993: 31445,
                57994: 31443,
                57995: 31449,
                57996: 31450,
                57997: 31453,
                57998: 31457,
                57999: 31458,
                58000: 31462,
                58001: 31469,
                58002: 31472,
                58003: 31490,
                58004: 31503,
                58005: 31498,
                58006: 31494,
                58007: 31539,
                58008: 31512,
                58009: 31513,
                58010: 31518,
                58011: 31541,
                58012: 31528,
                58013: 31542,
                58014: 31568,
                58015: 31610,
                58016: 31492,
                58017: 31565,
                58018: 31499,
                58019: 31564,
                58020: 31557,
                58021: 31605,
                58022: 31589,
                58023: 31604,
                58024: 31591,
                58025: 31600,
                58026: 31601,
                58027: 31596,
                58028: 31598,
                58029: 31645,
                58030: 31640,
                58031: 31647,
                58032: 31629,
                58033: 31644,
                58034: 31642,
                58035: 31627,
                58036: 31634,
                58037: 31631,
                58038: 31581,
                58039: 31641,
                58040: 31691,
                58041: 31681,
                58042: 31692,
                58043: 31695,
                58044: 31668,
                58045: 31686,
                58046: 31709,
                58047: 31721,
                58048: 31761,
                58049: 31764,
                58050: 31718,
                58051: 31717,
                58052: 31840,
                58053: 31744,
                58054: 31751,
                58055: 31763,
                58056: 31731,
                58057: 31735,
                58058: 31767,
                58059: 31757,
                58060: 31734,
                58061: 31779,
                58062: 31783,
                58063: 31786,
                58064: 31775,
                58065: 31799,
                58066: 31787,
                58067: 31805,
                58068: 31820,
                58069: 31811,
                58070: 31828,
                58071: 31823,
                58072: 31808,
                58073: 31824,
                58074: 31832,
                58075: 31839,
                58076: 31844,
                58077: 31830,
                58078: 31845,
                58079: 31852,
                58080: 31861,
                58081: 31875,
                58082: 31888,
                58083: 31908,
                58084: 31917,
                58085: 31906,
                58086: 31915,
                58087: 31905,
                58088: 31912,
                58089: 31923,
                58090: 31922,
                58091: 31921,
                58092: 31918,
                58093: 31929,
                58094: 31933,
                58095: 31936,
                58096: 31941,
                58097: 31938,
                58098: 31960,
                58099: 31954,
                58100: 31964,
                58101: 31970,
                58102: 39739,
                58103: 31983,
                58104: 31986,
                58105: 31988,
                58106: 31990,
                58107: 31994,
                58108: 32006,
                58176: 32002,
                58177: 32028,
                58178: 32021,
                58179: 32010,
                58180: 32069,
                58181: 32075,
                58182: 32046,
                58183: 32050,
                58184: 32063,
                58185: 32053,
                58186: 32070,
                58187: 32115,
                58188: 32086,
                58189: 32078,
                58190: 32114,
                58191: 32104,
                58192: 32110,
                58193: 32079,
                58194: 32099,
                58195: 32147,
                58196: 32137,
                58197: 32091,
                58198: 32143,
                58199: 32125,
                58200: 32155,
                58201: 32186,
                58202: 32174,
                58203: 32163,
                58204: 32181,
                58205: 32199,
                58206: 32189,
                58207: 32171,
                58208: 32317,
                58209: 32162,
                58210: 32175,
                58211: 32220,
                58212: 32184,
                58213: 32159,
                58214: 32176,
                58215: 32216,
                58216: 32221,
                58217: 32228,
                58218: 32222,
                58219: 32251,
                58220: 32242,
                58221: 32225,
                58222: 32261,
                58223: 32266,
                58224: 32291,
                58225: 32289,
                58226: 32274,
                58227: 32305,
                58228: 32287,
                58229: 32265,
                58230: 32267,
                58231: 32290,
                58232: 32326,
                58233: 32358,
                58234: 32315,
                58235: 32309,
                58236: 32313,
                58237: 32323,
                58238: 32311,
                58240: 32306,
                58241: 32314,
                58242: 32359,
                58243: 32349,
                58244: 32342,
                58245: 32350,
                58246: 32345,
                58247: 32346,
                58248: 32377,
                58249: 32362,
                58250: 32361,
                58251: 32380,
                58252: 32379,
                58253: 32387,
                58254: 32213,
                58255: 32381,
                58256: 36782,
                58257: 32383,
                58258: 32392,
                58259: 32393,
                58260: 32396,
                58261: 32402,
                58262: 32400,
                58263: 32403,
                58264: 32404,
                58265: 32406,
                58266: 32398,
                58267: 32411,
                58268: 32412,
                58269: 32568,
                58270: 32570,
                58271: 32581,
                58272: 32588,
                58273: 32589,
                58274: 32590,
                58275: 32592,
                58276: 32593,
                58277: 32597,
                58278: 32596,
                58279: 32600,
                58280: 32607,
                58281: 32608,
                58282: 32616,
                58283: 32617,
                58284: 32615,
                58285: 32632,
                58286: 32642,
                58287: 32646,
                58288: 32643,
                58289: 32648,
                58290: 32647,
                58291: 32652,
                58292: 32660,
                58293: 32670,
                58294: 32669,
                58295: 32666,
                58296: 32675,
                58297: 32687,
                58298: 32690,
                58299: 32697,
                58300: 32686,
                58301: 32694,
                58302: 32696,
                58303: 35697,
                58304: 32709,
                58305: 32710,
                58306: 32714,
                58307: 32725,
                58308: 32724,
                58309: 32737,
                58310: 32742,
                58311: 32745,
                58312: 32755,
                58313: 32761,
                58314: 39132,
                58315: 32774,
                58316: 32772,
                58317: 32779,
                58318: 32786,
                58319: 32792,
                58320: 32793,
                58321: 32796,
                58322: 32801,
                58323: 32808,
                58324: 32831,
                58325: 32827,
                58326: 32842,
                58327: 32838,
                58328: 32850,
                58329: 32856,
                58330: 32858,
                58331: 32863,
                58332: 32866,
                58333: 32872,
                58334: 32883,
                58335: 32882,
                58336: 32880,
                58337: 32886,
                58338: 32889,
                58339: 32893,
                58340: 32895,
                58341: 32900,
                58342: 32902,
                58343: 32901,
                58344: 32923,
                58345: 32915,
                58346: 32922,
                58347: 32941,
                58348: 20880,
                58349: 32940,
                58350: 32987,
                58351: 32997,
                58352: 32985,
                58353: 32989,
                58354: 32964,
                58355: 32986,
                58356: 32982,
                58357: 33033,
                58358: 33007,
                58359: 33009,
                58360: 33051,
                58361: 33065,
                58362: 33059,
                58363: 33071,
                58364: 33099,
                58432: 38539,
                58433: 33094,
                58434: 33086,
                58435: 33107,
                58436: 33105,
                58437: 33020,
                58438: 33137,
                58439: 33134,
                58440: 33125,
                58441: 33126,
                58442: 33140,
                58443: 33155,
                58444: 33160,
                58445: 33162,
                58446: 33152,
                58447: 33154,
                58448: 33184,
                58449: 33173,
                58450: 33188,
                58451: 33187,
                58452: 33119,
                58453: 33171,
                58454: 33193,
                58455: 33200,
                58456: 33205,
                58457: 33214,
                58458: 33208,
                58459: 33213,
                58460: 33216,
                58461: 33218,
                58462: 33210,
                58463: 33225,
                58464: 33229,
                58465: 33233,
                58466: 33241,
                58467: 33240,
                58468: 33224,
                58469: 33242,
                58470: 33247,
                58471: 33248,
                58472: 33255,
                58473: 33274,
                58474: 33275,
                58475: 33278,
                58476: 33281,
                58477: 33282,
                58478: 33285,
                58479: 33287,
                58480: 33290,
                58481: 33293,
                58482: 33296,
                58483: 33302,
                58484: 33321,
                58485: 33323,
                58486: 33336,
                58487: 33331,
                58488: 33344,
                58489: 33369,
                58490: 33368,
                58491: 33373,
                58492: 33370,
                58493: 33375,
                58494: 33380,
                58496: 33378,
                58497: 33384,
                58498: 33386,
                58499: 33387,
                58500: 33326,
                58501: 33393,
                58502: 33399,
                58503: 33400,
                58504: 33406,
                58505: 33421,
                58506: 33426,
                58507: 33451,
                58508: 33439,
                58509: 33467,
                58510: 33452,
                58511: 33505,
                58512: 33507,
                58513: 33503,
                58514: 33490,
                58515: 33524,
                58516: 33523,
                58517: 33530,
                58518: 33683,
                58519: 33539,
                58520: 33531,
                58521: 33529,
                58522: 33502,
                58523: 33542,
                58524: 33500,
                58525: 33545,
                58526: 33497,
                58527: 33589,
                58528: 33588,
                58529: 33558,
                58530: 33586,
                58531: 33585,
                58532: 33600,
                58533: 33593,
                58534: 33616,
                58535: 33605,
                58536: 33583,
                58537: 33579,
                58538: 33559,
                58539: 33560,
                58540: 33669,
                58541: 33690,
                58542: 33706,
                58543: 33695,
                58544: 33698,
                58545: 33686,
                58546: 33571,
                58547: 33678,
                58548: 33671,
                58549: 33674,
                58550: 33660,
                58551: 33717,
                58552: 33651,
                58553: 33653,
                58554: 33696,
                58555: 33673,
                58556: 33704,
                58557: 33780,
                58558: 33811,
                58559: 33771,
                58560: 33742,
                58561: 33789,
                58562: 33795,
                58563: 33752,
                58564: 33803,
                58565: 33729,
                58566: 33783,
                58567: 33799,
                58568: 33760,
                58569: 33778,
                58570: 33805,
                58571: 33826,
                58572: 33824,
                58573: 33725,
                58574: 33848,
                58575: 34054,
                58576: 33787,
                58577: 33901,
                58578: 33834,
                58579: 33852,
                58580: 34138,
                58581: 33924,
                58582: 33911,
                58583: 33899,
                58584: 33965,
                58585: 33902,
                58586: 33922,
                58587: 33897,
                58588: 33862,
                58589: 33836,
                58590: 33903,
                58591: 33913,
                58592: 33845,
                58593: 33994,
                58594: 33890,
                58595: 33977,
                58596: 33983,
                58597: 33951,
                58598: 34009,
                58599: 33997,
                58600: 33979,
                58601: 34010,
                58602: 34000,
                58603: 33985,
                58604: 33990,
                58605: 34006,
                58606: 33953,
                58607: 34081,
                58608: 34047,
                58609: 34036,
                58610: 34071,
                58611: 34072,
                58612: 34092,
                58613: 34079,
                58614: 34069,
                58615: 34068,
                58616: 34044,
                58617: 34112,
                58618: 34147,
                58619: 34136,
                58620: 34120,
                58688: 34113,
                58689: 34306,
                58690: 34123,
                58691: 34133,
                58692: 34176,
                58693: 34212,
                58694: 34184,
                58695: 34193,
                58696: 34186,
                58697: 34216,
                58698: 34157,
                58699: 34196,
                58700: 34203,
                58701: 34282,
                58702: 34183,
                58703: 34204,
                58704: 34167,
                58705: 34174,
                58706: 34192,
                58707: 34249,
                58708: 34234,
                58709: 34255,
                58710: 34233,
                58711: 34256,
                58712: 34261,
                58713: 34269,
                58714: 34277,
                58715: 34268,
                58716: 34297,
                58717: 34314,
                58718: 34323,
                58719: 34315,
                58720: 34302,
                58721: 34298,
                58722: 34310,
                58723: 34338,
                58724: 34330,
                58725: 34352,
                58726: 34367,
                58727: 34381,
                58728: 20053,
                58729: 34388,
                58730: 34399,
                58731: 34407,
                58732: 34417,
                58733: 34451,
                58734: 34467,
                58735: 34473,
                58736: 34474,
                58737: 34443,
                58738: 34444,
                58739: 34486,
                58740: 34479,
                58741: 34500,
                58742: 34502,
                58743: 34480,
                58744: 34505,
                58745: 34851,
                58746: 34475,
                58747: 34516,
                58748: 34526,
                58749: 34537,
                58750: 34540,
                58752: 34527,
                58753: 34523,
                58754: 34543,
                58755: 34578,
                58756: 34566,
                58757: 34568,
                58758: 34560,
                58759: 34563,
                58760: 34555,
                58761: 34577,
                58762: 34569,
                58763: 34573,
                58764: 34553,
                58765: 34570,
                58766: 34612,
                58767: 34623,
                58768: 34615,
                58769: 34619,
                58770: 34597,
                58771: 34601,
                58772: 34586,
                58773: 34656,
                58774: 34655,
                58775: 34680,
                58776: 34636,
                58777: 34638,
                58778: 34676,
                58779: 34647,
                58780: 34664,
                58781: 34670,
                58782: 34649,
                58783: 34643,
                58784: 34659,
                58785: 34666,
                58786: 34821,
                58787: 34722,
                58788: 34719,
                58789: 34690,
                58790: 34735,
                58791: 34763,
                58792: 34749,
                58793: 34752,
                58794: 34768,
                58795: 38614,
                58796: 34731,
                58797: 34756,
                58798: 34739,
                58799: 34759,
                58800: 34758,
                58801: 34747,
                58802: 34799,
                58803: 34802,
                58804: 34784,
                58805: 34831,
                58806: 34829,
                58807: 34814,
                58808: 34806,
                58809: 34807,
                58810: 34830,
                58811: 34770,
                58812: 34833,
                58813: 34838,
                58814: 34837,
                58815: 34850,
                58816: 34849,
                58817: 34865,
                58818: 34870,
                58819: 34873,
                58820: 34855,
                58821: 34875,
                58822: 34884,
                58823: 34882,
                58824: 34898,
                58825: 34905,
                58826: 34910,
                58827: 34914,
                58828: 34923,
                58829: 34945,
                58830: 34942,
                58831: 34974,
                58832: 34933,
                58833: 34941,
                58834: 34997,
                58835: 34930,
                58836: 34946,
                58837: 34967,
                58838: 34962,
                58839: 34990,
                58840: 34969,
                58841: 34978,
                58842: 34957,
                58843: 34980,
                58844: 34992,
                58845: 35007,
                58846: 34993,
                58847: 35011,
                58848: 35012,
                58849: 35028,
                58850: 35032,
                58851: 35033,
                58852: 35037,
                58853: 35065,
                58854: 35074,
                58855: 35068,
                58856: 35060,
                58857: 35048,
                58858: 35058,
                58859: 35076,
                58860: 35084,
                58861: 35082,
                58862: 35091,
                58863: 35139,
                58864: 35102,
                58865: 35109,
                58866: 35114,
                58867: 35115,
                58868: 35137,
                58869: 35140,
                58870: 35131,
                58871: 35126,
                58872: 35128,
                58873: 35148,
                58874: 35101,
                58875: 35168,
                58876: 35166,
                58944: 35174,
                58945: 35172,
                58946: 35181,
                58947: 35178,
                58948: 35183,
                58949: 35188,
                58950: 35191,
                58951: 35198,
                58952: 35203,
                58953: 35208,
                58954: 35210,
                58955: 35219,
                58956: 35224,
                58957: 35233,
                58958: 35241,
                58959: 35238,
                58960: 35244,
                58961: 35247,
                58962: 35250,
                58963: 35258,
                58964: 35261,
                58965: 35263,
                58966: 35264,
                58967: 35290,
                58968: 35292,
                58969: 35293,
                58970: 35303,
                58971: 35316,
                58972: 35320,
                58973: 35331,
                58974: 35350,
                58975: 35344,
                58976: 35340,
                58977: 35355,
                58978: 35357,
                58979: 35365,
                58980: 35382,
                58981: 35393,
                58982: 35419,
                58983: 35410,
                58984: 35398,
                58985: 35400,
                58986: 35452,
                58987: 35437,
                58988: 35436,
                58989: 35426,
                58990: 35461,
                58991: 35458,
                58992: 35460,
                58993: 35496,
                58994: 35489,
                58995: 35473,
                58996: 35493,
                58997: 35494,
                58998: 35482,
                58999: 35491,
                59000: 35524,
                59001: 35533,
                59002: 35522,
                59003: 35546,
                59004: 35563,
                59005: 35571,
                59006: 35559,
                59008: 35556,
                59009: 35569,
                59010: 35604,
                59011: 35552,
                59012: 35554,
                59013: 35575,
                59014: 35550,
                59015: 35547,
                59016: 35596,
                59017: 35591,
                59018: 35610,
                59019: 35553,
                59020: 35606,
                59021: 35600,
                59022: 35607,
                59023: 35616,
                59024: 35635,
                59025: 38827,
                59026: 35622,
                59027: 35627,
                59028: 35646,
                59029: 35624,
                59030: 35649,
                59031: 35660,
                59032: 35663,
                59033: 35662,
                59034: 35657,
                59035: 35670,
                59036: 35675,
                59037: 35674,
                59038: 35691,
                59039: 35679,
                59040: 35692,
                59041: 35695,
                59042: 35700,
                59043: 35709,
                59044: 35712,
                59045: 35724,
                59046: 35726,
                59047: 35730,
                59048: 35731,
                59049: 35734,
                59050: 35737,
                59051: 35738,
                59052: 35898,
                59053: 35905,
                59054: 35903,
                59055: 35912,
                59056: 35916,
                59057: 35918,
                59058: 35920,
                59059: 35925,
                59060: 35938,
                59061: 35948,
                59062: 35960,
                59063: 35962,
                59064: 35970,
                59065: 35977,
                59066: 35973,
                59067: 35978,
                59068: 35981,
                59069: 35982,
                59070: 35988,
                59071: 35964,
                59072: 35992,
                59073: 25117,
                59074: 36013,
                59075: 36010,
                59076: 36029,
                59077: 36018,
                59078: 36019,
                59079: 36014,
                59080: 36022,
                59081: 36040,
                59082: 36033,
                59083: 36068,
                59084: 36067,
                59085: 36058,
                59086: 36093,
                59087: 36090,
                59088: 36091,
                59089: 36100,
                59090: 36101,
                59091: 36106,
                59092: 36103,
                59093: 36111,
                59094: 36109,
                59095: 36112,
                59096: 40782,
                59097: 36115,
                59098: 36045,
                59099: 36116,
                59100: 36118,
                59101: 36199,
                59102: 36205,
                59103: 36209,
                59104: 36211,
                59105: 36225,
                59106: 36249,
                59107: 36290,
                59108: 36286,
                59109: 36282,
                59110: 36303,
                59111: 36314,
                59112: 36310,
                59113: 36300,
                59114: 36315,
                59115: 36299,
                59116: 36330,
                59117: 36331,
                59118: 36319,
                59119: 36323,
                59120: 36348,
                59121: 36360,
                59122: 36361,
                59123: 36351,
                59124: 36381,
                59125: 36382,
                59126: 36368,
                59127: 36383,
                59128: 36418,
                59129: 36405,
                59130: 36400,
                59131: 36404,
                59132: 36426,
                59200: 36423,
                59201: 36425,
                59202: 36428,
                59203: 36432,
                59204: 36424,
                59205: 36441,
                59206: 36452,
                59207: 36448,
                59208: 36394,
                59209: 36451,
                59210: 36437,
                59211: 36470,
                59212: 36466,
                59213: 36476,
                59214: 36481,
                59215: 36487,
                59216: 36485,
                59217: 36484,
                59218: 36491,
                59219: 36490,
                59220: 36499,
                59221: 36497,
                59222: 36500,
                59223: 36505,
                59224: 36522,
                59225: 36513,
                59226: 36524,
                59227: 36528,
                59228: 36550,
                59229: 36529,
                59230: 36542,
                59231: 36549,
                59232: 36552,
                59233: 36555,
                59234: 36571,
                59235: 36579,
                59236: 36604,
                59237: 36603,
                59238: 36587,
                59239: 36606,
                59240: 36618,
                59241: 36613,
                59242: 36629,
                59243: 36626,
                59244: 36633,
                59245: 36627,
                59246: 36636,
                59247: 36639,
                59248: 36635,
                59249: 36620,
                59250: 36646,
                59251: 36659,
                59252: 36667,
                59253: 36665,
                59254: 36677,
                59255: 36674,
                59256: 36670,
                59257: 36684,
                59258: 36681,
                59259: 36678,
                59260: 36686,
                59261: 36695,
                59262: 36700,
                59264: 36706,
                59265: 36707,
                59266: 36708,
                59267: 36764,
                59268: 36767,
                59269: 36771,
                59270: 36781,
                59271: 36783,
                59272: 36791,
                59273: 36826,
                59274: 36837,
                59275: 36834,
                59276: 36842,
                59277: 36847,
                59278: 36999,
                59279: 36852,
                59280: 36869,
                59281: 36857,
                59282: 36858,
                59283: 36881,
                59284: 36885,
                59285: 36897,
                59286: 36877,
                59287: 36894,
                59288: 36886,
                59289: 36875,
                59290: 36903,
                59291: 36918,
                59292: 36917,
                59293: 36921,
                59294: 36856,
                59295: 36943,
                59296: 36944,
                59297: 36945,
                59298: 36946,
                59299: 36878,
                59300: 36937,
                59301: 36926,
                59302: 36950,
                59303: 36952,
                59304: 36958,
                59305: 36968,
                59306: 36975,
                59307: 36982,
                59308: 38568,
                59309: 36978,
                59310: 36994,
                59311: 36989,
                59312: 36993,
                59313: 36992,
                59314: 37002,
                59315: 37001,
                59316: 37007,
                59317: 37032,
                59318: 37039,
                59319: 37041,
                59320: 37045,
                59321: 37090,
                59322: 37092,
                59323: 25160,
                59324: 37083,
                59325: 37122,
                59326: 37138,
                59327: 37145,
                59328: 37170,
                59329: 37168,
                59330: 37194,
                59331: 37206,
                59332: 37208,
                59333: 37219,
                59334: 37221,
                59335: 37225,
                59336: 37235,
                59337: 37234,
                59338: 37259,
                59339: 37257,
                59340: 37250,
                59341: 37282,
                59342: 37291,
                59343: 37295,
                59344: 37290,
                59345: 37301,
                59346: 37300,
                59347: 37306,
                59348: 37312,
                59349: 37313,
                59350: 37321,
                59351: 37323,
                59352: 37328,
                59353: 37334,
                59354: 37343,
                59355: 37345,
                59356: 37339,
                59357: 37372,
                59358: 37365,
                59359: 37366,
                59360: 37406,
                59361: 37375,
                59362: 37396,
                59363: 37420,
                59364: 37397,
                59365: 37393,
                59366: 37470,
                59367: 37463,
                59368: 37445,
                59369: 37449,
                59370: 37476,
                59371: 37448,
                59372: 37525,
                59373: 37439,
                59374: 37451,
                59375: 37456,
                59376: 37532,
                59377: 37526,
                59378: 37523,
                59379: 37531,
                59380: 37466,
                59381: 37583,
                59382: 37561,
                59383: 37559,
                59384: 37609,
                59385: 37647,
                59386: 37626,
                59387: 37700,
                59388: 37678,
                59456: 37657,
                59457: 37666,
                59458: 37658,
                59459: 37667,
                59460: 37690,
                59461: 37685,
                59462: 37691,
                59463: 37724,
                59464: 37728,
                59465: 37756,
                59466: 37742,
                59467: 37718,
                59468: 37808,
                59469: 37804,
                59470: 37805,
                59471: 37780,
                59472: 37817,
                59473: 37846,
                59474: 37847,
                59475: 37864,
                59476: 37861,
                59477: 37848,
                59478: 37827,
                59479: 37853,
                59480: 37840,
                59481: 37832,
                59482: 37860,
                59483: 37914,
                59484: 37908,
                59485: 37907,
                59486: 37891,
                59487: 37895,
                59488: 37904,
                59489: 37942,
                59490: 37931,
                59491: 37941,
                59492: 37921,
                59493: 37946,
                59494: 37953,
                59495: 37970,
                59496: 37956,
                59497: 37979,
                59498: 37984,
                59499: 37986,
                59500: 37982,
                59501: 37994,
                59502: 37417,
                59503: 38000,
                59504: 38005,
                59505: 38007,
                59506: 38013,
                59507: 37978,
                59508: 38012,
                59509: 38014,
                59510: 38017,
                59511: 38015,
                59512: 38274,
                59513: 38279,
                59514: 38282,
                59515: 38292,
                59516: 38294,
                59517: 38296,
                59518: 38297,
                59520: 38304,
                59521: 38312,
                59522: 38311,
                59523: 38317,
                59524: 38332,
                59525: 38331,
                59526: 38329,
                59527: 38334,
                59528: 38346,
                59529: 28662,
                59530: 38339,
                59531: 38349,
                59532: 38348,
                59533: 38357,
                59534: 38356,
                59535: 38358,
                59536: 38364,
                59537: 38369,
                59538: 38373,
                59539: 38370,
                59540: 38433,
                59541: 38440,
                59542: 38446,
                59543: 38447,
                59544: 38466,
                59545: 38476,
                59546: 38479,
                59547: 38475,
                59548: 38519,
                59549: 38492,
                59550: 38494,
                59551: 38493,
                59552: 38495,
                59553: 38502,
                59554: 38514,
                59555: 38508,
                59556: 38541,
                59557: 38552,
                59558: 38549,
                59559: 38551,
                59560: 38570,
                59561: 38567,
                59562: 38577,
                59563: 38578,
                59564: 38576,
                59565: 38580,
                59566: 38582,
                59567: 38584,
                59568: 38585,
                59569: 38606,
                59570: 38603,
                59571: 38601,
                59572: 38605,
                59573: 35149,
                59574: 38620,
                59575: 38669,
                59576: 38613,
                59577: 38649,
                59578: 38660,
                59579: 38662,
                59580: 38664,
                59581: 38675,
                59582: 38670,
                59583: 38673,
                59584: 38671,
                59585: 38678,
                59586: 38681,
                59587: 38692,
                59588: 38698,
                59589: 38704,
                59590: 38713,
                59591: 38717,
                59592: 38718,
                59593: 38724,
                59594: 38726,
                59595: 38728,
                59596: 38722,
                59597: 38729,
                59598: 38748,
                59599: 38752,
                59600: 38756,
                59601: 38758,
                59602: 38760,
                59603: 21202,
                59604: 38763,
                59605: 38769,
                59606: 38777,
                59607: 38789,
                59608: 38780,
                59609: 38785,
                59610: 38778,
                59611: 38790,
                59612: 38795,
                59613: 38799,
                59614: 38800,
                59615: 38812,
                59616: 38824,
                59617: 38822,
                59618: 38819,
                59619: 38835,
                59620: 38836,
                59621: 38851,
                59622: 38854,
                59623: 38856,
                59624: 38859,
                59625: 38876,
                59626: 38893,
                59627: 40783,
                59628: 38898,
                59629: 31455,
                59630: 38902,
                59631: 38901,
                59632: 38927,
                59633: 38924,
                59634: 38968,
                59635: 38948,
                59636: 38945,
                59637: 38967,
                59638: 38973,
                59639: 38982,
                59640: 38991,
                59641: 38987,
                59642: 39019,
                59643: 39023,
                59644: 39024,
                59712: 39025,
                59713: 39028,
                59714: 39027,
                59715: 39082,
                59716: 39087,
                59717: 39089,
                59718: 39094,
                59719: 39108,
                59720: 39107,
                59721: 39110,
                59722: 39145,
                59723: 39147,
                59724: 39171,
                59725: 39177,
                59726: 39186,
                59727: 39188,
                59728: 39192,
                59729: 39201,
                59730: 39197,
                59731: 39198,
                59732: 39204,
                59733: 39200,
                59734: 39212,
                59735: 39214,
                59736: 39229,
                59737: 39230,
                59738: 39234,
                59739: 39241,
                59740: 39237,
                59741: 39248,
                59742: 39243,
                59743: 39249,
                59744: 39250,
                59745: 39244,
                59746: 39253,
                59747: 39319,
                59748: 39320,
                59749: 39333,
                59750: 39341,
                59751: 39342,
                59752: 39356,
                59753: 39391,
                59754: 39387,
                59755: 39389,
                59756: 39384,
                59757: 39377,
                59758: 39405,
                59759: 39406,
                59760: 39409,
                59761: 39410,
                59762: 39419,
                59763: 39416,
                59764: 39425,
                59765: 39439,
                59766: 39429,
                59767: 39394,
                59768: 39449,
                59769: 39467,
                59770: 39479,
                59771: 39493,
                59772: 39490,
                59773: 39488,
                59774: 39491,
                59776: 39486,
                59777: 39509,
                59778: 39501,
                59779: 39515,
                59780: 39511,
                59781: 39519,
                59782: 39522,
                59783: 39525,
                59784: 39524,
                59785: 39529,
                59786: 39531,
                59787: 39530,
                59788: 39597,
                59789: 39600,
                59790: 39612,
                59791: 39616,
                59792: 39631,
                59793: 39633,
                59794: 39635,
                59795: 39636,
                59796: 39646,
                59797: 39647,
                59798: 39650,
                59799: 39651,
                59800: 39654,
                59801: 39663,
                59802: 39659,
                59803: 39662,
                59804: 39668,
                59805: 39665,
                59806: 39671,
                59807: 39675,
                59808: 39686,
                59809: 39704,
                59810: 39706,
                59811: 39711,
                59812: 39714,
                59813: 39715,
                59814: 39717,
                59815: 39719,
                59816: 39720,
                59817: 39721,
                59818: 39722,
                59819: 39726,
                59820: 39727,
                59821: 39730,
                59822: 39748,
                59823: 39747,
                59824: 39759,
                59825: 39757,
                59826: 39758,
                59827: 39761,
                59828: 39768,
                59829: 39796,
                59830: 39827,
                59831: 39811,
                59832: 39825,
                59833: 39830,
                59834: 39831,
                59835: 39839,
                59836: 39840,
                59837: 39848,
                59838: 39860,
                59839: 39872,
                59840: 39882,
                59841: 39865,
                59842: 39878,
                59843: 39887,
                59844: 39889,
                59845: 39890,
                59846: 39907,
                59847: 39906,
                59848: 39908,
                59849: 39892,
                59850: 39905,
                59851: 39994,
                59852: 39922,
                59853: 39921,
                59854: 39920,
                59855: 39957,
                59856: 39956,
                59857: 39945,
                59858: 39955,
                59859: 39948,
                59860: 39942,
                59861: 39944,
                59862: 39954,
                59863: 39946,
                59864: 39940,
                59865: 39982,
                59866: 39963,
                59867: 39973,
                59868: 39972,
                59869: 39969,
                59870: 39984,
                59871: 40007,
                59872: 39986,
                59873: 40006,
                59874: 39998,
                59875: 40026,
                59876: 40032,
                59877: 40039,
                59878: 40054,
                59879: 40056,
                59880: 40167,
                59881: 40172,
                59882: 40176,
                59883: 40201,
                59884: 40200,
                59885: 40171,
                59886: 40195,
                59887: 40198,
                59888: 40234,
                59889: 40230,
                59890: 40367,
                59891: 40227,
                59892: 40223,
                59893: 40260,
                59894: 40213,
                59895: 40210,
                59896: 40257,
                59897: 40255,
                59898: 40254,
                59899: 40262,
                59900: 40264,
                59968: 40285,
                59969: 40286,
                59970: 40292,
                59971: 40273,
                59972: 40272,
                59973: 40281,
                59974: 40306,
                59975: 40329,
                59976: 40327,
                59977: 40363,
                59978: 40303,
                59979: 40314,
                59980: 40346,
                59981: 40356,
                59982: 40361,
                59983: 40370,
                59984: 40388,
                59985: 40385,
                59986: 40379,
                59987: 40376,
                59988: 40378,
                59989: 40390,
                59990: 40399,
                59991: 40386,
                59992: 40409,
                59993: 40403,
                59994: 40440,
                59995: 40422,
                59996: 40429,
                59997: 40431,
                59998: 40445,
                59999: 40474,
                60000: 40475,
                60001: 40478,
                60002: 40565,
                60003: 40569,
                60004: 40573,
                60005: 40577,
                60006: 40584,
                60007: 40587,
                60008: 40588,
                60009: 40594,
                60010: 40597,
                60011: 40593,
                60012: 40605,
                60013: 40613,
                60014: 40617,
                60015: 40632,
                60016: 40618,
                60017: 40621,
                60018: 38753,
                60019: 40652,
                60020: 40654,
                60021: 40655,
                60022: 40656,
                60023: 40660,
                60024: 40668,
                60025: 40670,
                60026: 40669,
                60027: 40672,
                60028: 40677,
                60029: 40680,
                60030: 40687,
                60032: 40692,
                60033: 40694,
                60034: 40695,
                60035: 40697,
                60036: 40699,
                60037: 40700,
                60038: 40701,
                60039: 40711,
                60040: 40712,
                60041: 30391,
                60042: 40725,
                60043: 40737,
                60044: 40748,
                60045: 40766,
                60046: 40778,
                60047: 40786,
                60048: 40788,
                60049: 40803,
                60050: 40799,
                60051: 40800,
                60052: 40801,
                60053: 40806,
                60054: 40807,
                60055: 40812,
                60056: 40810,
                60057: 40823,
                60058: 40818,
                60059: 40822,
                60060: 40853,
                60061: 40860,
                60062: 40864,
                60063: 22575,
                60064: 27079,
                60065: 36953,
                60066: 29796,
                60067: 20956,
                60068: 29081
            };
        /***/ },
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var GenericGF_1 = __webpack_require__(1);
            var GenericGFPoly_1 = __webpack_require__(2);
            function runEuclideanAlgorithm(field, a, b, R) {
                var _a;
                // Assume a's degree is >= b's
                if (a.degree() < b.degree()) _a = [
                    b,
                    a
                ], a = _a[0], b = _a[1];
                var rLast = a;
                var r = b;
                var tLast = field.zero;
                var t = field.one;
                // Run Euclidean algorithm until r's degree is less than R/2
                while(r.degree() >= R / 2){
                    var rLastLast = rLast;
                    var tLastLast = tLast;
                    rLast = r;
                    tLast = t;
                    // Divide rLastLast by rLast, with quotient in q and remainder in r
                    if (rLast.isZero()) // Euclidean algorithm already terminated?
                    return null;
                    r = rLastLast;
                    var q = field.zero;
                    var denominatorLeadingTerm = rLast.getCoefficient(rLast.degree());
                    var dltInverse = field.inverse(denominatorLeadingTerm);
                    while(r.degree() >= rLast.degree() && !r.isZero()){
                        var degreeDiff = r.degree() - rLast.degree();
                        var scale = field.multiply(r.getCoefficient(r.degree()), dltInverse);
                        q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
                        r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
                    }
                    t = q.multiplyPoly(tLast).addOrSubtract(tLastLast);
                    if (r.degree() >= rLast.degree()) return null;
                }
                var sigmaTildeAtZero = t.getCoefficient(0);
                if (sigmaTildeAtZero === 0) return null;
                var inverse = field.inverse(sigmaTildeAtZero);
                return [
                    t.multiply(inverse),
                    r.multiply(inverse)
                ];
            }
            function findErrorLocations(field, errorLocator) {
                // This is a direct application of Chien's search
                var numErrors = errorLocator.degree();
                if (numErrors === 1) return [
                    errorLocator.getCoefficient(1)
                ];
                var result = new Array(numErrors);
                var errorCount = 0;
                for(var i = 1; i < field.size && errorCount < numErrors; i++)if (errorLocator.evaluateAt(i) === 0) {
                    result[errorCount] = field.inverse(i);
                    errorCount++;
                }
                if (errorCount !== numErrors) return null;
                return result;
            }
            function findErrorMagnitudes(field, errorEvaluator, errorLocations) {
                // This is directly applying Forney's Formula
                var s = errorLocations.length;
                var result = new Array(s);
                for(var i = 0; i < s; i++){
                    var xiInverse = field.inverse(errorLocations[i]);
                    var denominator = 1;
                    for(var j = 0; j < s; j++)if (i !== j) denominator = field.multiply(denominator, GenericGF_1.addOrSubtractGF(1, field.multiply(errorLocations[j], xiInverse)));
                    result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));
                    if (field.generatorBase !== 0) result[i] = field.multiply(result[i], xiInverse);
                }
                return result;
            }
            function decode(bytes, twoS) {
                var outputBytes = new Uint8ClampedArray(bytes.length);
                outputBytes.set(bytes);
                var field = new GenericGF_1.default(285, 256, 0); // x^8 + x^4 + x^3 + x^2 + 1
                var poly = new GenericGFPoly_1.default(field, outputBytes);
                var syndromeCoefficients = new Uint8ClampedArray(twoS);
                var error = false;
                for(var s = 0; s < twoS; s++){
                    var evaluation = poly.evaluateAt(field.exp(s + field.generatorBase));
                    syndromeCoefficients[syndromeCoefficients.length - 1 - s] = evaluation;
                    if (evaluation !== 0) error = true;
                }
                if (!error) return outputBytes;
                var syndrome = new GenericGFPoly_1.default(field, syndromeCoefficients);
                var sigmaOmega = runEuclideanAlgorithm(field, field.buildMonomial(twoS, 1), syndrome, twoS);
                if (sigmaOmega === null) return null;
                var errorLocations = findErrorLocations(field, sigmaOmega[0]);
                if (errorLocations == null) return null;
                var errorMagnitudes = findErrorMagnitudes(field, sigmaOmega[1], errorLocations);
                for(var i = 0; i < errorLocations.length; i++){
                    var position = outputBytes.length - 1 - field.log(errorLocations[i]);
                    if (position < 0) return null;
                    outputBytes[position] = GenericGF_1.addOrSubtractGF(outputBytes[position], errorMagnitudes[i]);
                }
                return outputBytes;
            }
            exports.decode = decode;
        /***/ },
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.VERSIONS = [
                {
                    infoBits: null,
                    versionNumber: 1,
                    alignmentPatternCenters: [],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 7,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 19
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 10,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 13,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 17,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 9
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 2,
                    alignmentPatternCenters: [
                        6,
                        18
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 10,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 34
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 16,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 28
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 22
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 3,
                    alignmentPatternCenters: [
                        6,
                        22
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 15,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 55
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 44
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 17
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 4,
                    alignmentPatternCenters: [
                        6,
                        26
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 80
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 32
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 24
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 16,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 9
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 5,
                    alignmentPatternCenters: [
                        6,
                        30
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 108
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 43
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 11
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 12
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 6,
                    alignmentPatternCenters: [
                        6,
                        34
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 68
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 16,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 27
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 19
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 15
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 31892,
                    versionNumber: 7,
                    alignmentPatternCenters: [
                        6,
                        22,
                        38
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 78
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 31
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 13
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 14
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 34236,
                    versionNumber: 8,
                    alignmentPatternCenters: [
                        6,
                        24,
                        42
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 97
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 38
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 39
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 18
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 19
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 39577,
                    versionNumber: 9,
                    alignmentPatternCenters: [
                        6,
                        26,
                        46
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 116
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 36
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 37
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 13
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 42195,
                    versionNumber: 10,
                    alignmentPatternCenters: [
                        6,
                        28,
                        50
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 68
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 69
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 43
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 44
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 19
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 20
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 48118,
                    versionNumber: 11,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 81
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 50
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 51
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 13
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 51042,
                    versionNumber: 12,
                    alignmentPatternCenters: [
                        6,
                        32,
                        58
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 92
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 93
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 36
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 37
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 20
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 21
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 55367,
                    versionNumber: 13,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 107
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 37
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 38
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 20
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 21
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 11
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 12
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 58893,
                    versionNumber: 14,
                    alignmentPatternCenters: [
                        6,
                        26,
                        46,
                        66
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 40
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 41
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 13
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 63784,
                    versionNumber: 15,
                    alignmentPatternCenters: [
                        6,
                        26,
                        48,
                        70
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 87
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 88
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 41
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 42
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 13
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 68472,
                    versionNumber: 16,
                    alignmentPatternCenters: [
                        6,
                        26,
                        50,
                        74
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 98
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 99
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 19
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 20
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 70749,
                    versionNumber: 17,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        78
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 107
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 108
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 76311,
                    versionNumber: 18,
                    alignmentPatternCenters: [
                        6,
                        30,
                        56,
                        82
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 120
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 121
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 9,
                                    dataCodewordsPerBlock: 43
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 44
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 79154,
                    versionNumber: 19,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 113
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 114
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 44
                                },
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 45
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 21
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 22
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 9,
                                    dataCodewordsPerBlock: 13
                                },
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 14
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 84390,
                    versionNumber: 20,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62,
                        90
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 107
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 108
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 41
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 42
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 87683,
                    versionNumber: 21,
                    alignmentPatternCenters: [
                        6,
                        28,
                        50,
                        72,
                        94
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 116
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 117
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 42
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 92361,
                    versionNumber: 22,
                    alignmentPatternCenters: [
                        6,
                        26,
                        50,
                        74,
                        98
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 111
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 112
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 46
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 96236,
                    versionNumber: 23,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        74,
                        102
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 121
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 122
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 102084,
                    versionNumber: 24,
                    alignmentPatternCenters: [
                        6,
                        28,
                        54,
                        80,
                        106
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 117
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 118
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 30,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 102881,
                    versionNumber: 25,
                    alignmentPatternCenters: [
                        6,
                        32,
                        58,
                        84,
                        110
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 106
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 107
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 110507,
                    versionNumber: 26,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86,
                        114
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 114
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 115
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 28,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 33,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 110734,
                    versionNumber: 27,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62,
                        90,
                        118
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 122
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 123
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 23
                                },
                                {
                                    numBlocks: 26,
                                    dataCodewordsPerBlock: 24
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 28,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 117786,
                    versionNumber: 28,
                    alignmentPatternCenters: [
                        6,
                        26,
                        50,
                        74,
                        98,
                        122
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 117
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 118
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 31,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 31,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 119615,
                    versionNumber: 29,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        78,
                        102,
                        126
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 116
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 117
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 21,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 23
                                },
                                {
                                    numBlocks: 37,
                                    dataCodewordsPerBlock: 24
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 26,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 126325,
                    versionNumber: 30,
                    alignmentPatternCenters: [
                        6,
                        26,
                        52,
                        78,
                        104,
                        130
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 25,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 25,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 127568,
                    versionNumber: 31,
                    alignmentPatternCenters: [
                        6,
                        30,
                        56,
                        82,
                        108,
                        134
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 29,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 42,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 28,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 133589,
                    versionNumber: 32,
                    alignmentPatternCenters: [
                        6,
                        34,
                        60,
                        86,
                        112,
                        138
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 115
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 35,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 35,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 136944,
                    versionNumber: 33,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86,
                        114,
                        142
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 21,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 29,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 46,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 141498,
                    versionNumber: 34,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62,
                        90,
                        118,
                        146
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 44,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 59,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 145311,
                    versionNumber: 35,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        78,
                        102,
                        126,
                        150
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 121
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 122
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 26,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 39,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 41,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 150283,
                    versionNumber: 36,
                    alignmentPatternCenters: [
                        6,
                        24,
                        50,
                        76,
                        102,
                        128,
                        154
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 121
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 122
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 46,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 64,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 152622,
                    versionNumber: 37,
                    alignmentPatternCenters: [
                        6,
                        28,
                        54,
                        80,
                        106,
                        132,
                        158
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 122
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 123
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 29,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 49,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 24,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 46,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 158308,
                    versionNumber: 38,
                    alignmentPatternCenters: [
                        6,
                        32,
                        58,
                        84,
                        110,
                        136,
                        162
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 122
                                },
                                {
                                    numBlocks: 18,
                                    dataCodewordsPerBlock: 123
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 32,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 48,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 42,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 32,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 161089,
                    versionNumber: 39,
                    alignmentPatternCenters: [
                        6,
                        26,
                        54,
                        82,
                        110,
                        138,
                        166
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 20,
                                    dataCodewordsPerBlock: 117
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 118
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 40,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 43,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 67,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 167017,
                    versionNumber: 40,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86,
                        114,
                        142,
                        170
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 118
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 119
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 18,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 31,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 20,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 61,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                }, 
            ];
        /***/ },
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix_1 = __webpack_require__(0);
            function squareToQuadrilateral(p1, p2, p3, p4) {
                var dx3 = p1.x - p2.x + p3.x - p4.x;
                var dy3 = p1.y - p2.y + p3.y - p4.y;
                if (dx3 === 0 && dy3 === 0) return {
                    a11: p2.x - p1.x,
                    a12: p2.y - p1.y,
                    a13: 0,
                    a21: p3.x - p2.x,
                    a22: p3.y - p2.y,
                    a23: 0,
                    a31: p1.x,
                    a32: p1.y,
                    a33: 1
                };
                else {
                    var dx1 = p2.x - p3.x;
                    var dx2 = p4.x - p3.x;
                    var dy1 = p2.y - p3.y;
                    var dy2 = p4.y - p3.y;
                    var denominator = dx1 * dy2 - dx2 * dy1;
                    var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
                    var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
                    return {
                        a11: p2.x - p1.x + a13 * p2.x,
                        a12: p2.y - p1.y + a13 * p2.y,
                        a13: a13,
                        a21: p4.x - p1.x + a23 * p4.x,
                        a22: p4.y - p1.y + a23 * p4.y,
                        a23: a23,
                        a31: p1.x,
                        a32: p1.y,
                        a33: 1
                    };
                }
            }
            function quadrilateralToSquare(p1, p2, p3, p4) {
                // Here, the adjoint serves as the inverse:
                var sToQ = squareToQuadrilateral(p1, p2, p3, p4);
                return {
                    a11: sToQ.a22 * sToQ.a33 - sToQ.a23 * sToQ.a32,
                    a12: sToQ.a13 * sToQ.a32 - sToQ.a12 * sToQ.a33,
                    a13: sToQ.a12 * sToQ.a23 - sToQ.a13 * sToQ.a22,
                    a21: sToQ.a23 * sToQ.a31 - sToQ.a21 * sToQ.a33,
                    a22: sToQ.a11 * sToQ.a33 - sToQ.a13 * sToQ.a31,
                    a23: sToQ.a13 * sToQ.a21 - sToQ.a11 * sToQ.a23,
                    a31: sToQ.a21 * sToQ.a32 - sToQ.a22 * sToQ.a31,
                    a32: sToQ.a12 * sToQ.a31 - sToQ.a11 * sToQ.a32,
                    a33: sToQ.a11 * sToQ.a22 - sToQ.a12 * sToQ.a21
                };
            }
            function times(a, b) {
                return {
                    a11: a.a11 * b.a11 + a.a21 * b.a12 + a.a31 * b.a13,
                    a12: a.a12 * b.a11 + a.a22 * b.a12 + a.a32 * b.a13,
                    a13: a.a13 * b.a11 + a.a23 * b.a12 + a.a33 * b.a13,
                    a21: a.a11 * b.a21 + a.a21 * b.a22 + a.a31 * b.a23,
                    a22: a.a12 * b.a21 + a.a22 * b.a22 + a.a32 * b.a23,
                    a23: a.a13 * b.a21 + a.a23 * b.a22 + a.a33 * b.a23,
                    a31: a.a11 * b.a31 + a.a21 * b.a32 + a.a31 * b.a33,
                    a32: a.a12 * b.a31 + a.a22 * b.a32 + a.a32 * b.a33,
                    a33: a.a13 * b.a31 + a.a23 * b.a32 + a.a33 * b.a33
                };
            }
            function extract(image, location) {
                var qToS = quadrilateralToSquare({
                    x: 3.5,
                    y: 3.5
                }, {
                    x: location.dimension - 3.5,
                    y: 3.5
                }, {
                    x: location.dimension - 6.5,
                    y: location.dimension - 6.5
                }, {
                    x: 3.5,
                    y: location.dimension - 3.5
                });
                var sToQ = squareToQuadrilateral(location.topLeft, location.topRight, location.alignmentPattern, location.bottomLeft);
                var transform = times(sToQ, qToS);
                var matrix = BitMatrix_1.BitMatrix.createEmpty(location.dimension, location.dimension);
                var mappingFunction = function(x, y) {
                    var denominator = transform.a13 * x + transform.a23 * y + transform.a33;
                    return {
                        x: (transform.a11 * x + transform.a21 * y + transform.a31) / denominator,
                        y: (transform.a12 * x + transform.a22 * y + transform.a32) / denominator
                    };
                };
                for(var y1 = 0; y1 < location.dimension; y1++)for(var x1 = 0; x1 < location.dimension; x1++){
                    var xValue = x1 + 0.5;
                    var yValue = y1 + 0.5;
                    var sourcePixel = mappingFunction(xValue, yValue);
                    matrix.set(x1, y1, image.get(Math.floor(sourcePixel.x), Math.floor(sourcePixel.y)));
                }
                return {
                    matrix: matrix,
                    mappingFunction: mappingFunction
                };
            }
            exports.extract = extract;
        /***/ },
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var MAX_FINDERPATTERNS_TO_SEARCH = 4;
            var MIN_QUAD_RATIO = 0.5;
            var MAX_QUAD_RATIO = 1.5;
            var distance = function(a, b) {
                return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
            };
            function sum(values) {
                return values.reduce(function(a, b) {
                    return a + b;
                });
            }
            // Takes three finder patterns and organizes them into topLeft, topRight, etc
            function reorderFinderPatterns(pattern1, pattern2, pattern3) {
                var _a, _b, _c, _d;
                // Find distances between pattern centers
                var oneTwoDistance = distance(pattern1, pattern2);
                var twoThreeDistance = distance(pattern2, pattern3);
                var oneThreeDistance = distance(pattern1, pattern3);
                var bottomLeft;
                var topLeft;
                var topRight;
                // Assume one closest to other two is B; A and C will just be guesses at first
                if (twoThreeDistance >= oneTwoDistance && twoThreeDistance >= oneThreeDistance) _a = [
                    pattern2,
                    pattern1,
                    pattern3
                ], bottomLeft = _a[0], topLeft = _a[1], topRight = _a[2];
                else if (oneThreeDistance >= twoThreeDistance && oneThreeDistance >= oneTwoDistance) _b = [
                    pattern1,
                    pattern2,
                    pattern3
                ], bottomLeft = _b[0], topLeft = _b[1], topRight = _b[2];
                else _c = [
                    pattern1,
                    pattern3,
                    pattern2
                ], bottomLeft = _c[0], topLeft = _c[1], topRight = _c[2];
                // Use cross product to figure out whether bottomLeft (A) and topRight (C) are correct or flipped in relation to topLeft (B)
                // This asks whether BC x BA has a positive z component, which is the arrangement we want. If it's negative, then
                // we've got it flipped around and should swap topRight and bottomLeft.
                if ((topRight.x - topLeft.x) * (bottomLeft.y - topLeft.y) - (topRight.y - topLeft.y) * (bottomLeft.x - topLeft.x) < 0) _d = [
                    topRight,
                    bottomLeft
                ], bottomLeft = _d[0], topRight = _d[1];
                return {
                    bottomLeft: bottomLeft,
                    topLeft: topLeft,
                    topRight: topRight
                };
            }
            // Computes the dimension (number of modules on a side) of the QR Code based on the position of the finder patterns
            function computeDimension(topLeft, topRight, bottomLeft, matrix) {
                var moduleSize = (sum(countBlackWhiteRun(topLeft, bottomLeft, matrix, 5)) / 7 + sum(countBlackWhiteRun(topLeft, topRight, matrix, 5)) / 7 + sum(countBlackWhiteRun(bottomLeft, topLeft, matrix, 5)) / 7 + sum(countBlackWhiteRun(topRight, topLeft, matrix, 5)) / 7) / 4;
                if (moduleSize < 1) throw new Error("Invalid module size");
                var topDimension = Math.round(distance(topLeft, topRight) / moduleSize);
                var sideDimension = Math.round(distance(topLeft, bottomLeft) / moduleSize);
                var dimension = Math.floor((topDimension + sideDimension) / 2) + 7;
                switch(dimension % 4){
                    case 0:
                        dimension++;
                        break;
                    case 2:
                        dimension--;
                        break;
                }
                return {
                    dimension: dimension,
                    moduleSize: moduleSize
                };
            }
            // Takes an origin point and an end point and counts the sizes of the black white run from the origin towards the end point.
            // Returns an array of elements, representing the pixel size of the black white run.
            // Uses a variant of http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
            function countBlackWhiteRunTowardsPoint(origin, end, matrix, length) {
                var switchPoints = [
                    {
                        x: Math.floor(origin.x),
                        y: Math.floor(origin.y)
                    }
                ];
                var steep = Math.abs(end.y - origin.y) > Math.abs(end.x - origin.x);
                var fromX;
                var fromY;
                var toX;
                var toY;
                if (steep) {
                    fromX = Math.floor(origin.y);
                    fromY = Math.floor(origin.x);
                    toX = Math.floor(end.y);
                    toY = Math.floor(end.x);
                } else {
                    fromX = Math.floor(origin.x);
                    fromY = Math.floor(origin.y);
                    toX = Math.floor(end.x);
                    toY = Math.floor(end.y);
                }
                var dx = Math.abs(toX - fromX);
                var dy = Math.abs(toY - fromY);
                var error = Math.floor(-dx / 2);
                var xStep = fromX < toX ? 1 : -1;
                var yStep = fromY < toY ? 1 : -1;
                var currentPixel = true;
                // Loop up until x == toX, but not beyond
                for(var x = fromX, y = fromY; x !== toX + xStep; x += xStep){
                    // Does current pixel mean we have moved white to black or vice versa?
                    // Scanning black in state 0,2 and white in state 1, so if we find the wrong
                    // color, advance to next state or end if we are in state 2 already
                    var realX = steep ? y : x;
                    var realY = steep ? x : y;
                    if (matrix.get(realX, realY) !== currentPixel) {
                        currentPixel = !currentPixel;
                        switchPoints.push({
                            x: realX,
                            y: realY
                        });
                        if (switchPoints.length === length + 1) break;
                    }
                    error += dy;
                    if (error > 0) {
                        if (y === toY) break;
                        y += yStep;
                        error -= dx;
                    }
                }
                var distances = [];
                for(var i = 0; i < length; i++)if (switchPoints[i] && switchPoints[i + 1]) distances.push(distance(switchPoints[i], switchPoints[i + 1]));
                else distances.push(0);
                return distances;
            }
            // Takes an origin point and an end point and counts the sizes of the black white run in the origin point
            // along the line that intersects with the end point. Returns an array of elements, representing the pixel sizes
            // of the black white run. Takes a length which represents the number of switches from black to white to look for.
            function countBlackWhiteRun(origin, end, matrix, length) {
                var _a;
                var rise = end.y - origin.y;
                var run = end.x - origin.x;
                var towardsEnd = countBlackWhiteRunTowardsPoint(origin, end, matrix, Math.ceil(length / 2));
                var awayFromEnd = countBlackWhiteRunTowardsPoint(origin, {
                    x: origin.x - run,
                    y: origin.y - rise
                }, matrix, Math.ceil(length / 2));
                var middleValue = towardsEnd.shift() + awayFromEnd.shift() - 1; // Substract one so we don't double count a pixel
                return (_a = awayFromEnd.concat(middleValue)).concat.apply(_a, towardsEnd);
            }
            // Takes in a black white run and an array of expected ratios. Returns the average size of the run as well as the "error" -
            // that is the amount the run diverges from the expected ratio
            function scoreBlackWhiteRun(sequence, ratios) {
                var averageSize = sum(sequence) / sum(ratios);
                var error = 0;
                ratios.forEach(function(ratio, i) {
                    error += Math.pow(sequence[i] - ratio * averageSize, 2);
                });
                return {
                    averageSize: averageSize,
                    error: error
                };
            }
            // Takes an X,Y point and an array of sizes and scores the point against those ratios.
            // For example for a finder pattern takes the ratio list of 1:1:3:1:1 and checks horizontal, vertical and diagonal ratios
            // against that.
            function scorePattern(point, ratios, matrix) {
                try {
                    var horizontalRun = countBlackWhiteRun(point, {
                        x: -1,
                        y: point.y
                    }, matrix, ratios.length);
                    var verticalRun = countBlackWhiteRun(point, {
                        x: point.x,
                        y: -1
                    }, matrix, ratios.length);
                    var topLeftPoint = {
                        x: Math.max(0, point.x - point.y) - 1,
                        y: Math.max(0, point.y - point.x) - 1
                    };
                    var topLeftBottomRightRun = countBlackWhiteRun(point, topLeftPoint, matrix, ratios.length);
                    var bottomLeftPoint = {
                        x: Math.min(matrix.width, point.x + point.y) + 1,
                        y: Math.min(matrix.height, point.y + point.x) + 1
                    };
                    var bottomLeftTopRightRun = countBlackWhiteRun(point, bottomLeftPoint, matrix, ratios.length);
                    var horzError = scoreBlackWhiteRun(horizontalRun, ratios);
                    var vertError = scoreBlackWhiteRun(verticalRun, ratios);
                    var diagDownError = scoreBlackWhiteRun(topLeftBottomRightRun, ratios);
                    var diagUpError = scoreBlackWhiteRun(bottomLeftTopRightRun, ratios);
                    var ratioError = Math.sqrt(horzError.error * horzError.error + vertError.error * vertError.error + diagDownError.error * diagDownError.error + diagUpError.error * diagUpError.error);
                    var avgSize = (horzError.averageSize + vertError.averageSize + diagDownError.averageSize + diagUpError.averageSize) / 4;
                    var sizeError = (Math.pow(horzError.averageSize - avgSize, 2) + Math.pow(vertError.averageSize - avgSize, 2) + Math.pow(diagDownError.averageSize - avgSize, 2) + Math.pow(diagUpError.averageSize - avgSize, 2)) / avgSize;
                    return ratioError + sizeError;
                } catch (_a) {
                    return Infinity;
                }
            }
            function recenterLocation(matrix, p) {
                var leftX = Math.round(p.x);
                while(matrix.get(leftX, Math.round(p.y)))leftX--;
                var rightX = Math.round(p.x);
                while(matrix.get(rightX, Math.round(p.y)))rightX++;
                var x = (leftX + rightX) / 2;
                var topY = Math.round(p.y);
                while(matrix.get(Math.round(x), topY))topY--;
                var bottomY = Math.round(p.y);
                while(matrix.get(Math.round(x), bottomY))bottomY++;
                var y = (topY + bottomY) / 2;
                return {
                    x: x,
                    y: y
                };
            }
            function locate(matrix) {
                var finderPatternQuads = [];
                var activeFinderPatternQuads = [];
                var alignmentPatternQuads = [];
                var activeAlignmentPatternQuads = [];
                var _loop_1 = function(y) {
                    var length_1 = 0;
                    var lastBit = false;
                    var scans = [
                        0,
                        0,
                        0,
                        0,
                        0
                    ];
                    var _loop_2 = function(x) {
                        var v = matrix.get(x, y);
                        if (v === lastBit) length_1++;
                        else {
                            scans = [
                                scans[1],
                                scans[2],
                                scans[3],
                                scans[4],
                                length_1
                            ];
                            length_1 = 1;
                            lastBit = v;
                            // Do the last 5 color changes ~ match the expected ratio for a finder pattern? 1:1:3:1:1 of b:w:b:w:b
                            var averageFinderPatternBlocksize = sum(scans) / 7;
                            var validFinderPattern = Math.abs(scans[0] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[1] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[2] - 3 * averageFinderPatternBlocksize) < 3 * averageFinderPatternBlocksize && Math.abs(scans[3] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[4] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && !v; // And make sure the current pixel is white since finder patterns are bordered in white
                            // Do the last 3 color changes ~ match the expected ratio for an alignment pattern? 1:1:1 of w:b:w
                            var averageAlignmentPatternBlocksize = sum(scans.slice(-3)) / 3;
                            var validAlignmentPattern = Math.abs(scans[2] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && Math.abs(scans[3] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && Math.abs(scans[4] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && v; // Is the current pixel black since alignment patterns are bordered in black
                            if (validFinderPattern) {
                                // Compute the start and end x values of the large center black square
                                var endX_1 = x - scans[3] - scans[4];
                                var startX_1 = endX_1 - scans[2];
                                var line = {
                                    startX: startX_1,
                                    endX: endX_1,
                                    y: y
                                };
                                // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                                // that line as the starting point.
                                var matchingQuads = activeFinderPatternQuads.filter(function(q) {
                                    return startX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX || endX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX || startX_1 <= q.bottom.startX && endX_1 >= q.bottom.endX && scans[2] / (q.bottom.endX - q.bottom.startX) < MAX_QUAD_RATIO && scans[2] / (q.bottom.endX - q.bottom.startX) > MIN_QUAD_RATIO;
                                });
                                if (matchingQuads.length > 0) matchingQuads[0].bottom = line;
                                else activeFinderPatternQuads.push({
                                    top: line,
                                    bottom: line
                                });
                            }
                            if (validAlignmentPattern) {
                                // Compute the start and end x values of the center black square
                                var endX_2 = x - scans[4];
                                var startX_2 = endX_2 - scans[3];
                                var line = {
                                    startX: startX_2,
                                    y: y,
                                    endX: endX_2
                                };
                                // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                                // that line as the starting point.
                                var matchingQuads = activeAlignmentPatternQuads.filter(function(q) {
                                    return startX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX || endX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX || startX_2 <= q.bottom.startX && endX_2 >= q.bottom.endX && scans[2] / (q.bottom.endX - q.bottom.startX) < MAX_QUAD_RATIO && scans[2] / (q.bottom.endX - q.bottom.startX) > MIN_QUAD_RATIO;
                                });
                                if (matchingQuads.length > 0) matchingQuads[0].bottom = line;
                                else activeAlignmentPatternQuads.push({
                                    top: line,
                                    bottom: line
                                });
                            }
                        }
                    };
                    for(var x2 = -1; x2 <= matrix.width; x2++)_loop_2(x2);
                    finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function(q) {
                        return q.bottom.y !== y && q.bottom.y - q.top.y >= 2;
                    }));
                    activeFinderPatternQuads = activeFinderPatternQuads.filter(function(q) {
                        return q.bottom.y === y;
                    });
                    alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads.filter(function(q) {
                        return q.bottom.y !== y;
                    }));
                    activeAlignmentPatternQuads = activeAlignmentPatternQuads.filter(function(q) {
                        return q.bottom.y === y;
                    });
                };
                for(var y2 = 0; y2 <= matrix.height; y2++)_loop_1(y2);
                finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function(q) {
                    return q.bottom.y - q.top.y >= 2;
                }));
                alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads);
                var finderPatternGroups = finderPatternQuads.filter(function(q) {
                    return q.bottom.y - q.top.y >= 2;
                }) // All quads must be at least 2px tall since the center square is larger than a block
                .map(function(q) {
                    var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
                    var y = (q.top.y + q.bottom.y + 1) / 2;
                    if (!matrix.get(Math.round(x), Math.round(y))) return;
                    var lengths = [
                        q.top.endX - q.top.startX,
                        q.bottom.endX - q.bottom.startX,
                        q.bottom.y - q.top.y + 1
                    ];
                    var size = sum(lengths) / lengths.length;
                    var score = scorePattern({
                        x: Math.round(x),
                        y: Math.round(y)
                    }, [
                        1,
                        1,
                        3,
                        1,
                        1
                    ], matrix);
                    return {
                        score: score,
                        x: x,
                        y: y,
                        size: size
                    };
                }).filter(function(q) {
                    return !!q;
                }) // Filter out any rejected quads from above
                .sort(function(a, b) {
                    return a.score - b.score;
                })// Now take the top finder pattern options and try to find 2 other options with a similar size.
                .map(function(point, i, finderPatterns) {
                    if (i > MAX_FINDERPATTERNS_TO_SEARCH) return null;
                    var otherPoints = finderPatterns.filter(function(p, ii) {
                        return i !== ii;
                    }).map(function(p) {
                        return {
                            x: p.x,
                            y: p.y,
                            score: p.score + Math.pow(p.size - point.size, 2) / point.size,
                            size: p.size
                        };
                    }).sort(function(a, b) {
                        return a.score - b.score;
                    });
                    if (otherPoints.length < 2) return null;
                    var score = point.score + otherPoints[0].score + otherPoints[1].score;
                    return {
                        points: [
                            point
                        ].concat(otherPoints.slice(0, 2)),
                        score: score
                    };
                }).filter(function(q) {
                    return !!q;
                }) // Filter out any rejected finder patterns from above
                .sort(function(a, b) {
                    return a.score - b.score;
                });
                if (finderPatternGroups.length === 0) return null;
                var _a = reorderFinderPatterns(finderPatternGroups[0].points[0], finderPatternGroups[0].points[1], finderPatternGroups[0].points[2]), topRight = _a.topRight, topLeft = _a.topLeft, bottomLeft = _a.bottomLeft;
                var alignment = findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft);
                var result = [];
                if (alignment) result.push({
                    alignmentPattern: {
                        x: alignment.alignmentPattern.x,
                        y: alignment.alignmentPattern.y
                    },
                    bottomLeft: {
                        x: bottomLeft.x,
                        y: bottomLeft.y
                    },
                    dimension: alignment.dimension,
                    topLeft: {
                        x: topLeft.x,
                        y: topLeft.y
                    },
                    topRight: {
                        x: topRight.x,
                        y: topRight.y
                    }
                });
                // We normally use the center of the quads as the location of the tracking points, which is optimal for most cases and will account
                // for a skew in the image. However, In some cases, a slight skew might not be real and instead be caused by image compression
                // errors and/or low resolution. For those cases, we'd be better off centering the point exactly in the middle of the black area. We
                // compute and return the location data for the naively centered points as it is little additional work and allows for multiple
                // attempts at decoding harder images.
                var midTopRight = recenterLocation(matrix, topRight);
                var midTopLeft = recenterLocation(matrix, topLeft);
                var midBottomLeft = recenterLocation(matrix, bottomLeft);
                var centeredAlignment = findAlignmentPattern(matrix, alignmentPatternQuads, midTopRight, midTopLeft, midBottomLeft);
                if (centeredAlignment) result.push({
                    alignmentPattern: {
                        x: centeredAlignment.alignmentPattern.x,
                        y: centeredAlignment.alignmentPattern.y
                    },
                    bottomLeft: {
                        x: midBottomLeft.x,
                        y: midBottomLeft.y
                    },
                    topLeft: {
                        x: midTopLeft.x,
                        y: midTopLeft.y
                    },
                    topRight: {
                        x: midTopRight.x,
                        y: midTopRight.y
                    },
                    dimension: centeredAlignment.dimension
                });
                if (result.length === 0) return null;
                return result;
            }
            exports.locate = locate;
            function findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft) {
                var _a;
                // Now that we've found the three finder patterns we can determine the blockSize and the size of the QR code.
                // We'll use these to help find the alignment pattern but also later when we do the extraction.
                var dimension;
                var moduleSize;
                try {
                    _a = computeDimension(topLeft, topRight, bottomLeft, matrix), dimension = _a.dimension, moduleSize = _a.moduleSize;
                } catch (e) {
                    return null;
                }
                // Now find the alignment pattern
                var bottomRightFinderPattern = {
                    x: topRight.x - topLeft.x + bottomLeft.x,
                    y: topRight.y - topLeft.y + bottomLeft.y
                };
                var modulesBetweenFinderPatterns = (distance(topLeft, bottomLeft) + distance(topLeft, topRight)) / 2 / moduleSize;
                var correctionToTopLeft = 1 - 3 / modulesBetweenFinderPatterns;
                var expectedAlignmentPattern = {
                    x: topLeft.x + correctionToTopLeft * (bottomRightFinderPattern.x - topLeft.x),
                    y: topLeft.y + correctionToTopLeft * (bottomRightFinderPattern.y - topLeft.y)
                };
                var alignmentPatterns = alignmentPatternQuads.map(function(q) {
                    var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
                    var y = (q.top.y + q.bottom.y + 1) / 2;
                    if (!matrix.get(Math.floor(x), Math.floor(y))) return;
                    var lengths = [
                        q.top.endX - q.top.startX,
                        q.bottom.endX - q.bottom.startX,
                        q.bottom.y - q.top.y + 1
                    ];
                    var size = sum(lengths) / lengths.length;
                    var sizeScore = scorePattern({
                        x: Math.floor(x),
                        y: Math.floor(y)
                    }, [
                        1,
                        1,
                        1
                    ], matrix);
                    var score = sizeScore + distance({
                        x: x,
                        y: y
                    }, expectedAlignmentPattern);
                    return {
                        x: x,
                        y: y,
                        score: score
                    };
                }).filter(function(v) {
                    return !!v;
                }).sort(function(a, b) {
                    return a.score - b.score;
                });
                // If there are less than 15 modules between finder patterns it's a version 1 QR code and as such has no alignmemnt pattern
                // so we can only use our best guess.
                var alignmentPattern = modulesBetweenFinderPatterns >= 15 && alignmentPatterns.length ? alignmentPatterns[0] : expectedAlignmentPattern;
                return {
                    alignmentPattern: alignmentPattern,
                    dimension: dimension
                };
            }
        /***/ }
    ])["default"]);
});

},{}]},["5r4QG","20BJq"], "20BJq", "parcelRequire8806")

