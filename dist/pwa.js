/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pwa/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pwa/index.js":
/*!**********************!*\
  !*** ./pwa/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register */ \"./pwa/register.js\");\n/* harmony import */ var _push__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./push */ \"./pwa/push.js\");\n/* harmony import */ var _send__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./send */ \"./pwa/send.js\");\n\n\n\n\n/**\n * 注册 Service Worker\n */\nif (window.navigator.serviceWorker) {\n\n  Object(_register__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('/sw.js')\n    .then(registration => {\n      return Promise.all([\n        registration,\n        askPermission()\n      ]);\n    })\n    .then((result) => {\n      let registration = result[0];\n      // 注册成功\n      console.log(\"serviceWorker register success:\" + registration.scope);\n      registration.showNotification(\"推送成功~~~\");\n    })\n    .catch((err) => {\n      // 注册失败\n      console.log('ServiceWorker registration failed: ', err);\n    });\n\n}\n\n\n/**\n * 后台同步\n */\nif (window.SyncManager) {\n\n  navigator.serviceWorker.ready.then(function (registration) {\n    window.myBgSync = (tag) => {\n      registration.sync.register(tag).then(function () {\n        console.log('后台同步已触发', tag);\n      }).catch(function (err) {\n        console.log('后台同步触发失败', err);\n      });\n    }\n  });\n\n}\n\n/**\n *  订阅推送\n */\nif (window.PushManager) {\n\n  navigator.serviceWorker.ready.then((registration) => {\n\n    return registration.pushManager.getSubscription()\n      .then(async (subscription) => {\n\n        // 防止重复注册\n        if (subscription) {\n          return subscription;\n        }\n\n        // 注册 subscribe\n        return Object(_push__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(registration);\n\n      }).then((subscription) => {\n        console.log('subscription success', subscription);\n        let body = {\n          subscription: subscription,\n          uniqueid: new Date().getTime()\n        };\n        console.log('uniqueid', body.uniqueid);\n\n        // 存储到后端\n        Object(_send__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(JSON.stringify(body))\n          .then(res => {\n            return res.json();\n          })\n          .then(data => {\n            console.log(\"sendSubscriptionToServer: \" + data.status);\n          });\n\n      });\n\n  });\n\n}\n\n\nfunction askPermission() {\n  return new Promise((resolve, reject) => {\n    var permissionResult = Notification.requestPermission((result) => {\n      resolve(result);\n    });\n\n    if (permissionResult) {\n      permissionResult.then(resolve, reject);\n    }\n  }).then((permissionResult) => {\n    if (permissionResult !== 'granted') {\n      throw new Error('We weren\\'t granted permission.');\n    }\n  });\n}\n\n\n//# sourceURL=webpack:///./pwa/index.js?");

/***/ }),

/***/ "./pwa/push.js":
/*!*********************!*\
  !*** ./pwa/push.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst urlBase64ToUint8Array = (base64String) => {\n  let padding = '='.repeat((4 - base64String.length % 4) % 4);\n  let base64 = (base64String + padding)\n    .replace(/\\-/g, '+')\n    .replace(/_/g, '/');\n\n  let rawData = window.atob(base64);\n  let outputArray = new Uint8Array(rawData.length);\n\n  for (let i = 0; i < rawData.length; ++i) {\n    outputArray[i] = rawData.charCodeAt(i);\n  }\n  return outputArray;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((registration) => {\n  let convertedVapidKey = urlBase64ToUint8Array('BByfbpQaH5CBVOQmKGaIvN9svkZl1zjpg6-k2_bocLCmQ111S4-LLEWqpt0RnijShWkAaneVE08cYI-qKZJ2LAo');\n  return registration.pushManager.subscribe({\n    userVisibleOnly: true,\n    applicationServerKey: convertedVapidKey\n  }).then(function (pushSubscription) {\n    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));\n    return pushSubscription;\n  });;\n});\n\n\n//# sourceURL=webpack:///./pwa/push.js?");

/***/ }),

/***/ "./pwa/register.js":
/*!*************************!*\
  !*** ./pwa/register.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((file) => {\n  return navigator.serviceWorker.register(file);\n});\n\n\n//# sourceURL=webpack:///./pwa/register.js?");

/***/ }),

/***/ "./pwa/send.js":
/*!*********************!*\
  !*** ./pwa/send.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((body) => {\n  return fetch('http://localhost:5000/subscription', {\n    method: 'POST',\n    headers: {\n      'Content-type': 'application/json'\n    },\n    body: body\n  });\n});\n\n\n//# sourceURL=webpack:///./pwa/send.js?");

/***/ })

/******/ });