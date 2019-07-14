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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/base/lazy-load.js":
/*!******************************!*\
  !*** ./js/base/lazy-load.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Source from Kevin Powell: https://www.youtube.com/watch?v=mC93zsEsSrg
var images = document.querySelectorAll('[data-lazy]');

var preloadImage = function preloadImage(img) {
  var src = img.getAttribute('data-lazy');
  if (!src) return;
  img.src = src;
  img.removeAttribute('data-lazy');
};

var imgOptions = {
  threshold: 0,
  rootMargin: '0px 0px 300px 0px'
};
var imgObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    preloadImage(entry.target);
    observer.unobserve(entry.target);
  });
}, imgOptions);
images.forEach(function (image) {
  return imgObserver.observe(image);
});

/***/ }),

/***/ "./js/components/button.js":
/*!*********************************!*\
  !*** ./js/components/button.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var backToTopBtn = document.querySelector('.back-to-top-btn');
window.addEventListener('scroll', function () {
  if (window.pageYOffset > 300) {
    if (!backToTopBtn.classList.contains('btn-enter')) {
      backToTopBtn.classList.add('btn-enter');
      backToTopBtn.classList.remove('btn-exit');
      backToTopBtn.style.display = 'inline-block';
    }
  } else if (!backToTopBtn.classList.contains('btn-exit')) {
    backToTopBtn.classList.add('btn-exit');
    backToTopBtn.classList.remove('btn-enter');
    setTimeout(function () {
      backToTopBtn.style.display = 'none';
    }, 300);
  }
});
backToTopBtn.addEventListener('click', function () {
  window.scrollTo(0, 0);
});

/***/ }),

/***/ "./js/components/carousel.js":
/*!***********************************!*\
  !*** ./js/components/carousel.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var track = document.querySelector('.carousel-track');
var slides = Array.from(track.children);
var prevButton = document.querySelector('.carousel-button-left');
var nextButton = document.querySelector('.carousel-button-right');
var carouselNav = document.querySelector('.carousel-nav');
var navItems = Array.from(carouselNav.children);
var slideWidth = slides[0].getBoundingClientRect().width;

var moveToSlide = function moveToSlide(currentSlide, targetSlide) {
  track.style.transform = "translateX(-".concat(targetSlide.style.left, ")");
  currentSlide.classList.remove('carousel-slide-current');
  targetSlide.classList.add('carousel-slide-current');
};

var updateNavItems = function updateNavItems(currNavItem, targetNavItem) {
  currNavItem.classList.remove('carousel-indicator-current');
  targetNavItem.classList.add('carousel-indicator-current');
}; // arrange the slides next to one another


var setSlidePosition = function setSlidePosition(slide, index) {
  slide.style.left = "".concat(slideWidth * index, "px");
};

slides.forEach(setSlidePosition); // initialize the current slide and nav indicator on page load

slides[0].classList.add('carousel-slide-current');
navItems[0].classList.add('carousel-indicator-current');
var currSlide = document.querySelector('.carousel-slide-current');

if (currSlide !== slides[0]) {
  moveToSlide(slides[0], currSlide);
} // when I click right, move slides to the right


nextButton.addEventListener('click', function () {
  var currentSlide = track.querySelector('.carousel-slide-current');
  var currNavItem = carouselNav.querySelector('.carousel-indicator-current'); // if at the end of the carousel, bring back to beginning

  if (currentSlide === slides[slides.length - 1]) {
    moveToSlide(currentSlide, slides[0]);
    updateNavItems(currNavItem, navItems[0]);
  } else {
    var nextSlide = currentSlide.nextElementSibling;
    var nextNavItem = currNavItem.nextElementSibling;
    moveToSlide(currentSlide, nextSlide);
    updateNavItems(currNavItem, nextNavItem);
  }
}); // when I click left, move slides to the left

prevButton.addEventListener('click', function () {
  var currentSlide = document.querySelector('.carousel-slide-current');
  var currNavItem = carouselNav.querySelector('.carousel-indicator-current'); // if at the beginning of the carousel, bring to the end of it

  if (currentSlide === slides[0]) {
    moveToSlide(currentSlide, slides[slides.length - 1]);
    updateNavItems(currNavItem, navItems[navItems.length - 1]);
  } else {
    var prevSlide = currentSlide.previousElementSibling;
    var prevNavItem = currNavItem.previousElementSibling;
    moveToSlide(currentSlide, prevSlide);
    updateNavItems(currNavItem, prevNavItem);
  }
}); // when I click the nav indicators, move to that slide

carouselNav.addEventListener('click', function (e) {
  var targetNavItem = e.target.closest('button');
  if (!targetNavItem) return;
  var currentSlide = track.querySelector('.carousel-slide-current');
  var currNavItem = carouselNav.querySelector('.carousel-indicator-current');
  var targetIndex = navItems.findIndex(function (item) {
    return item === targetNavItem;
  });
  var targetSlide = slides[targetIndex];
  moveToSlide(currentSlide, targetSlide);
  updateNavItems(currNavItem, targetNavItem);
});

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layout_navbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout/navbar */ "./js/layout/navbar.js");
/* harmony import */ var _layout_navbar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_layout_navbar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout_contact_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout/contact-form */ "./js/layout/contact-form.js");
/* harmony import */ var _layout_contact_form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_layout_contact_form__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/button */ "./js/components/button.js");
/* harmony import */ var _components_button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/carousel */ "./js/components/carousel.js");
/* harmony import */ var _components_carousel__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_carousel__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base_lazy_load__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base/lazy-load */ "./js/base/lazy-load.js");
/* harmony import */ var _base_lazy_load__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_base_lazy_load__WEBPACK_IMPORTED_MODULE_4__);






/***/ }),

/***/ "./js/layout/contact-form.js":
/*!***********************************!*\
  !*** ./js/layout/contact-form.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var form = document.querySelector('.contact-form');
var confirmMsg = 'Thank you for your submission';
var confirmEl = document.createElement('p');
confirmEl.innerText = confirmMsg;
confirmEl.style.cssText = 'transition: all 0.5s; opacity: 0; visibility: 0; display: none; background-color: rgb(44, 162, 46); padding: 1rem; border: 1px solid #fff; border-radius: 0.15rem; margin-top: 1rem;';
form.parentNode.insertBefore(confirmEl, form);
form.addEventListener('submit', function (e) {
  e.preventDefault();
  form.reset();
  confirmEl.style.display = 'block';
  confirmEl.style.opacity = 1;
  confirmEl.style.visibility = 1;
  setTimeout(function () {
    confirmEl.style.opacity = 0;
    confirmEl.style.visibility = 0;
    setTimeout(function () {
      confirmEl.style.display = 'none';
    }, 500);
  }, 5000);
});

/***/ }),

/***/ "./js/layout/navbar.js":
/*!*****************************!*\
  !*** ./js/layout/navbar.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var navSubMenu = document.querySelector('.navbar-submenu');
var navbarBtn = document.querySelector('.navbar-toggle');
navbarBtn.addEventListener('click', function () {
  return navSubMenu.classList.toggle('navbar-active');
}); // intended to disable navbar collapse animation on resize

/*
const classes = document.body.classList;
let timer = 0;
window.addEventListener('resize', () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  } else {
    classes.add('stop-transitions');
  }

  timer = setTimeout(() => {
    classes.remove('stop-transitions');
    timer = null;
  }, 100);
});
*/

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map