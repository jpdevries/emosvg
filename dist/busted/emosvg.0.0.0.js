(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	function emoSVG(elements) {
	  var promises = [];
	  if (elements.length !== undefined) {
	    // it is an Array
	    for (var i = 0; i < elements.length; i++) {
	      promises.push(replaceEmoji(elements[i]));
	    }
	  } else {
	    // it is a DOM element
	    promises.push(replaceEmoji(elements));
	  }

	  return Promise.all(promises);

	  function replaceEmoji(element) {
	    var isSpan = element.matches('span'),
	        artwork = isSpan ? element.getAttribute('data-emosvg') || element.getAttribute('emosvg') : '',
	        isSprite = artwork.includes('.svg#'),
	        style = element.getAttribute('style') ? 'style="' + element.getAttribute('style') + '" ' : '',
	        classAttr = element.getAttribute('class') ? 'class="' + element.getAttribute('class') + '" ' : '',
	        alt = element.getAttribute('data-emosvg-alt') || element.getAttribute('emosvg-alt') || '',
	        ariaHidden = element.hasAttribute('aria-hidden') ? 'aria-hidden="' + element.getAttribute('aria-hidden') + '" ' : '',
	        inline = isSpan && element.getAttribute('data-emosvg-inline') == 'true' ? true : false,
	        svgTitle = alt ? '<title>' + alt + '</title>\n' : '',
	        origHTML = isSpan ? 'data-emosvg-orig="' + encodeURI(element.outerHTML) + '" ' : '';

	    var html = '';

	    if (isSpan) {
	      html = isSprite ? '<svg ' + classAttr + style + ariaHidden + origHTML + '>\n    ' + svgTitle + '<use xlink:href="' + artwork + '"></use>\n  </svg>' : '<img src="' + artwork + '" alt="' + alt + '" ' + classAttr + style + ariaHidden + origHTML + '>';
	    } else {
	      html = decodeURI(element.getAttribute('data-emosvg-orig'));
	    }

	    if (!inline) {
	      return new Promise(function (resolve, reject) {
	        element.outerHTML = html;
	        resolve();
	      });
	    } else {
	      return new Promise(function (resolve, reject) {
	        fetch(artwork).then(function (response) {
	          // http://caniuse.com/#feat=fetch
	          response.text().then(function (svg) {
	            var parser = new DOMParser(),
	                parsed = parser.parseFromString(svg, "text/xml");
	            parsed.querySelector('svg').setAttribute('data-emosvg-orig', encodeURI(element.outerHTML));
	            parsed.querySelector('svg').setAttribute('class', element.getAttribute('class'));
	            parsed.querySelector('title') ? parsed.querySelector('title').innerHTML = alt : parsed.querySelector('svg').innerHTML = '' + svgTitle + parsed.querySelector('svg').innerHTML;
	            if (element.hasAttribute('aria-hidden')) parsed.querySelector('svg').setAttribute('aria-hidden', element.getAttribute('aria-hidden'));
	            if (element.hasAttribute('style')) parsed.querySelector('svg').setAttribute('style', element.getAttribute('style'));

	            element.outerHTML = function () {
	              // IE 11 doesn't support parsed.querySelector('svg').outerHTML :(
	              var div = document.createElement('div');
	              div.appendChild(parsed.querySelector('svg'));
	              return div.innerHTML;
	            }();

	            resolve();
	          });
	        });
	      });
	    }
	  }
	}

	module.exports = {
	  emoSVG: emoSVG
	};

/***/ }
/******/ ])
});
;