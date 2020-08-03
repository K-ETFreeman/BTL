"use strict";

//IE HTMLcollection foreach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

;
var imagepopupcontainer = document.querySelector('.imagepopup');
var imgpopuped = false,
    imgpopupposition = 0;

var popupClick = function popupClick(elem) {
  imagepopupcontainer.innerHTML = "";
  var clone = elem.cloneNode();
  imagepopupcontainer.appendChild(clone);
  imagepopupcontainer.classList.remove('hidden');
  imgpopuped = true;
  imgpopupposition = pageYOffset;
};

var popupCheck = function popupCheck(elem) {
  if (!elem.onclick) {
    elem.onclick = function () {
      return popupClick(elem);
    };
  }
};

document.querySelectorAll('.popuping').forEach(function (item) {
  return item.onclick = function () {
    return popupClick(item);
  };
});

imagepopupcontainer.onclick = function () {
  imgpopuped = false;
  this.classList.add('hidden');
};

document.addEventListener('scroll', function () {
  if (imgpopuped && Math.abs(imgpopupposition - pageYOffset) > 15) {
    imgpopuped = false;
    imagepopupcontainer.classList.add('hidden');
  }
});
;
var subSwiper = document.querySelector('.subnav__swiper .swiper-wrapper');

var getActive = function getActive() {
  return subSwiper.querySelector('.swiper-slide-active');
};

var count = 1;

var setMarginValue = function setMarginValue(item, swiperWidth, baseMargin, defaultMargin) {
  var j = 0,
      totalWidth = 0,
      currentWidth = 0;

  for (var i = item; j < count; j++) {
    currentWidth = i.children[0].offsetWidth;
    totalWidth += currentWidth;
    i.style.setProperty('width', currentWidth + 'px');
    i = i.nextElementSibling;
  }

  j = 0;
  var marginValue1 = (swiperWidth - totalWidth) / (count - 1);
  var marginValue2 = (swiperWidth - totalWidth) / (count + 1);

  if (marginValue2 >= baseMargin) {
    item.style.setProperty('margin-left', marginValue2 + 'px');

    for (var _i = item; j < count; j++) {
      _i.style.setProperty("margin-right", marginValue2 + 'px');

      if (j == count - 1 && marginValue2 < defaultMargin) _i.style.setProperty("margin-right", defaultMargin + 'px');
      _i = _i.nextElementSibling;
    }
  } else for (var _i2 = item; j < count - 1; j++) {
    _i2.style.setProperty("margin-right", marginValue1 + 'px');

    _i2 = _i2.nextElementSibling;
  }
};

var reset = function reset(item, swiperWidth, margin) {
  item.style.setProperty('width', (swiperWidth - margin * (count - 1)) / count + 'px');
  item.style.setProperty('margin-right', margin + 'px');
  item.style.removeProperty('margin-left');
};

function calculateAll() {
  var active = getActive();

  for (var i = 0; i < subSwiper.children.length; i++) {
    if (i == active) break;
    reset(subSwiper.children[i], subSwiper.offsetWidth, 150);
  }

  if (count < 2) return;
  setMarginValue(active, subSwiper.offsetWidth, 30, 150);
}

var subnavSwiper = new Swiper('.subnav__swiper', {
  direction: 'horizontal',
  slidesPerView: 'auto',
  on: {
    init: function init() {
      calculateAll();
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = '.subnav__link { transition: .15s ease-out; }';
      setTimeout(function () {
        return document.getElementsByTagName('head')[0].appendChild(style);
      }, 300);
    },
    resize: calculateAll,
    slideChangeTransitionStart: calculateAll,
    breakpoint: function breakpoint() {
      count = 1;
      if (window.innerWidth >= 750) count = 2;
      if (window.innerWidth >= 950) count = 3;
      if (window.innerWidth >= 1300) count = 4;
      if (window.innerWidth >= 1550) count = 5;
    }
  },
  spaceBetween: 150,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    750: {
      slidesPerView: 2
    },
    950: {
      slidesPerView: 3
    },
    1300: {
      slidesPerView: 4
    },
    1550: {
      slidesPerView: 5
    }
  },
  navigation: {
    nextEl: '.subnav__right',
    prevEl: '.subnav__left'
  }
});
var casesSwiper = new Swiper('.cases__swiper', {
  direction: 'horizontal',
  loop: true,
  breakpoints: {
    769: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3
    }
  },
  navigation: {
    nextEl: '.cases__rightarrow',
    prevEl: '.cases__leftarrow'
  }
});
var testimonialsSwiper = new Swiper('.testimonials__container', {
  direction: 'horizontal',
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 30
    },
    700: {
      slidesPerView: 2,
      centeredSlides: false,
      spaceBetween: 50
    },
    900: {
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 50
    },
    1024: {
      slidesPerView: 1.1,
      centeredSlides: true,
      spaceBetween: 150
    }
  },
  on: {
    init: function init() {
      document.querySelectorAll('.testimonials__container .popuping').forEach(function (item) {
        popupCheck(item);
      });
    },
    breakpoint: function breakpoint() {
      document.querySelectorAll('.testimonials__container .popuping').forEach(function (item) {
        return popupCheck(item);
      });
    }
  },
  navigation: {
    nextEl: '.testimonials__arrow_right',
    prevEl: '.testimonials__arrow_left'
  }
});
/*
var gratitudeSwiper = new Swiper('.gratitudes__swiper', {
  direction: 'horizontal',
  loop: true,
  spaceBetween: 20,
  breakpoints: {
    620: {
      slidesPerView: 1
    },
    950: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3
    },
    1400: {
      slidesPerView: 4
    }
  },
  navigation: {
    nextEl: '.swiper-btn-next-gratitude',
    prevEl: '.swiper-btn-prev-gratitude',
  }
})

var socialSwiper = new Swiper('.social__swiper-container ', {

  direction: 'horizontal',
  loop: true,

  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1000: {
      slidesPerView: 1
    }
  },

  navigation: {
    nextEl: '.swiper-btn-next-social',
    prevEl: '.swiper-btn-prev-social',
  }

})*/

; //tags logic, IE-compatible

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

var LArrow = document.querySelector('.tags-linewrapper-leftarrow'),
    RArrow = document.querySelector('.tags-linewrapper-rightarrow');
var LineWrapper = document.querySelector('.tags-linewrapper-content'),
    Line = document.querySelector('.tags-linewrapper:first-child .tags-line');
var l,
    r,
    ROffset,
    LOffset = 0,
    currentOffset = 0;

function tagsData() {
  var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var Wrapperdata = LineWrapper.getBoundingClientRect(),
      baseLeft = Wrapperdata.left + parseInt(getComputedStyle(LineWrapper).paddingLeft) - 4,
      baseRight = Wrapperdata.right - parseInt(getComputedStyle(LineWrapper).paddingRight) - 15;
  r = -1, l = -1;

  for (var i = 0; i < Line.children.length; i++) {
    if (Line.children[i].getBoundingClientRect().right > baseRight + shift && r == -1) {
      r = i;
      ROffset = Math.ceil(Line.children[i].getBoundingClientRect().right - baseRight - shift);
    }

    if (Line.children[i].getBoundingClientRect().left < baseLeft + shift && i > l) {
      l = i;
      LOffset = Math.ceil(baseLeft - Line.children[i].getBoundingClientRect().left + shift);
    }
  }

  if (l == -1) {
    LOffset = 0;
    LArrow.classList.add('tags-linewrapper-leftarrow_hidden');
  } else LArrow.classList.remove('tags-linewrapper-leftarrow_hidden');

  if (r == -1) {
    ROffset = 0;
    RArrow.classList.add('tags-linewrapper-rightarrow_hidden');
  } else RArrow.classList.remove('tags-linewrapper-rightarrow_hidden');
}

tagsData();

RArrow.onclick = function () {
  var shift = ROffset;
  tagsData(shift);
  currentOffset -= shift;
  Line.style.setProperty('transform', 'translateX(' + currentOffset + 'px)');
};

LArrow.onclick = function () {
  var shift = LOffset;
  tagsData(-shift);
  currentOffset += shift;
  Line.style.setProperty('transform', 'translateX(' + currentOffset + 'px)');
};

tagsData();
window.addEventListener('resize', function () {
  scratchFooterTags();
});

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }

    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

function scratchFooterTags() {
  var prevHeight;
  document.querySelectorAll('.footerTags-content-item').forEach(function (item) {
    item.classList.remove('footerTags-content-item_notfirst');
    var itemHeight = item.getBoundingClientRect().bottom;

    if (prevHeight == undefined) {
      prevHeight = itemHeight;
    } else {
      if (itemHeight == prevHeight) {
        item.classList.add('footerTags-content-item_notfirst');
      } else {
        prevHeight = itemHeight;
      }
    }
  });
}

window.addEventListener('load', function () {
  scratchFooterTags();
});
;

function getVideoHtml(dataLink) {
  return '<iframe height="100%" width="100%" src="' + dataLink + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay="1"; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}

document.querySelectorAll('.youtubevideo').forEach(function (item) {
  return item.onclick = function () {
    item.innerHTML += getVideoHtml(item.getAttribute('data-link'));
  };
});
;
document.querySelectorAll('.interactive-trigger').forEach(function (item) {
  return item.addEventListener('click', function () {
    var target = item.getAttribute('data-target'),
        selector = item.getAttribute('data-sel'),
        toggleClass = item.getAttribute('data-toggleclass'),
        detailsMode = item.getAttribute('data-detailsMode');
    if (target == "this") target = item;
    if (target == "parent") target = item.parentNode;
    if (target == "grandparent") target = item.parentNode.parentNode;
    if (!target) target = document;
    if (selector) return target.querySelectorAll(selector).forEach(function (item) {
      if (detailsMode && item.classList.contains('details')) {
        if (item.style.maxHeight) item.style.removeProperty('max-height');else item.style.maxHeight = item.scrollHeight + 'px';
      }

      item.classList.toggle(toggleClass);
    });
    return target.classList.toggle(toggleClass);
  });
});
;
{
  var button = document.getElementById('up');
  var prevScroll,
      visible = false;
  var topElem = document.querySelector('section.BTL');
  button.addEventListener('click', function () {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });
  window.addEventListener('load', function () {
    prevScroll = pageYOffset;
  });
  window.addEventListener('scroll', function () {
    if (!visible && prevScroll) {
      if (pageYOffset < prevScroll && topElem.getBoundingClientRect().bottom < 0) {
        visible = true;
        button.classList.add('visible');
      } else {
        visible = false;
        button.classList.remove('visible');
      }
    } else visible = false;

    prevScroll = pageYOffset;
  });
}
;
{
  document.querySelectorAll('.hoverjs').forEach(function (item) {
    var target = document.getElementById(item.getAttribute('data-hoverid'));
    item.addEventListener('mouseenter', function () {
      target.classList.add('hover');
    });
    item.addEventListener('mouseleave', function () {
      target.classList.remove('hover');
    });
  });
}
;
var textarea = document.querySelector('.calculation__form textarea');
textarea.addEventListener('input', function () {
  if (textarea.offsetHeight < textarea.scrollHeight) textarea.classList.add('overflow');else textarea.classList.remove('overflow');
});
var burger = document.querySelector('.burger');

burger.onclick = function (e) {
  if (burger.classList.contains('active')) {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
    bodyScrollLock.disableBodyScroll(document.body);
  } else {
    bodyScrollLock.enableBodyScroll(document.body);
  }
};

objectFitImages();