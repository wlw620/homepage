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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register */ \"./pwa/register.js\");\n/* harmony import */ var _push__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./push */ \"./pwa/push.js\");\n/* harmony import */ var _send__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./send */ \"./pwa/send.js\");\n\n\n\n\nif (window.navigator.serviceWorker) {\n  // 注册\n  Object(_register__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('/sw.js').then(registration => {\n    // 注册成功\n    console.log(\"serviceWorker register success:\" + registration.scope);\n  }).catch((err) => {\n    // 注册失败\n    console.log('ServiceWorker registration failed: ', err);\n  });\n}\n\nif (window.PushManager) {\n  navigator.serviceWorker.ready.then((registration) => {\n    // 订阅推送\n    Object(_push__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(registration).then((subscription) => {\n      console.log('pushManager success');\n      let body = {\n        subscription: subscription,\n        uniqueid: new Date().getTime()\n      };\n      console.log('uniqueid', body.uniqueid);\n\n      // 将生成的客户端订阅信息存储在自己的服务器上\n      Object(_send__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(JSON.stringify(body)).then(res => {\n        return res.json();\n      }).then(data => {\n        console.log(\"sendSubscriptionToServer: \" + data.status);\n      });\n    });\n  });\n}\n\n\n//# sourceURL=webpack:///./pwa/index.js?");

/***/ }),

/***/ "./pwa/push.js":
/*!*********************!*\
  !*** ./pwa/push.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((registration) => {\n\n  return registration.pushManager.subscribe({\n    userVisibleOnly: true\n  }).then((pushSubscription) => {\n    return pushSubscription;\n  });\n\n});\n\n\n//# sourceURL=webpack:///./pwa/push.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((body) => {\n  let request = new Request('http://localhost:5000/subscription', {\n    method: 'POST',\n    body: body\n  });\n  return fetch(request);\n});\n\n\n//# sourceURL=webpack:///./pwa/send.js?");

/***/ })

/******/ });