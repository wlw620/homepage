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
/*! no static exports found */
/***/ (function(module, exports) {

eval("if (navigator.serviceWorker) {\n\n  // 注册\n  navigator.serviceWorker.register('/sw.js')\n    .then(registration => {\n\n      // 注册成功\n      console.log('ServiceWorker registration successful with scope: ', registration.scope);\n\n\n      let serviceWorker;\n\n      if (registration.installing) {\n\n        serviceWorker = registration.installing;\n      }\n      else if (registration.waiting) {\n\n        serviceWorker = registration.waiting;\n      }\n      else if (registration.active) {\n\n        serviceWorker = registration.active;\n      }\n\n      if (serviceWorker) {\n        serviceWorker.addEventListener('statechange', (e) => {\n          console.log('ServiceWorker statechange: ' + e.target.state);\n        });\n      }\n\n    })\n    .catch(function (err) {\n\n      // 注册失败\n      console.log('ServiceWorker registration failed: ', err);\n    });\n}\n\n\n//# sourceURL=webpack:///./pwa/index.js?");

/***/ })

/******/ });