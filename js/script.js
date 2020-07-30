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
var subnavSwiper = new Swiper('.subnav__swiper', {
  direction: 'horizontal',
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    535: {
      slidesPerView: 2
    },
    820: {
      slidesPerView: 3,
      spaceBetween: 35
    },
    1200: {
      allowTouchMove: false,
      slidesPerView: 4,
      spaceBetween: 35
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
    570: {
      slidesPerView: 1,
      centeredSlides: true,
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

;
var linkNav = document.querySelectorAll('[href^="#"]'),
    V = 1;

function easeOutCubic(x) {
  if (x > .99) return 1;
  return 1 - Math.pow(1 - x, 3);
}

var bodyheight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;

for (var i = 0; i < linkNav.length; i++) {
  linkNav[i].addEventListener('click', function (e) {
    e.preventDefault();
    var w = window.pageYOffset,
        hash = this.href.replace(/[^#]*(.*)/, '$1');
    t = document.querySelector(hash).getBoundingClientRect().top, start = null;
    t1 = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var V = 1000 / t;
    V = V * (t > 0 ? 1 : -1);
    requestAnimationFrame(step);

    function step(time) {
      if (start === null) start = time;
      var progress = 1000 * easeOutCubic((time - start) / 1000),
          r = t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t);
      window.scrollTo(0, r);

      if (r != w + t && Math.abs(pageYOffset - t) > 1 && (t <= 0 || t1 > pageYOffset)) {
        requestAnimationFrame(step);
      } else {
        location.hash = hash;
      }
    }
  }, false);
}

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

  for (var _i = 0; _i < Line.children.length; _i++) {
    if (Line.children[_i].getBoundingClientRect().right > baseRight + shift && r == -1) {
      r = _i;
      ROffset = Math.ceil(Line.children[_i].getBoundingClientRect().right - baseRight - shift);
    }

    if (Line.children[_i].getBoundingClientRect().left < baseLeft + shift && _i > l) {
      l = _i;
      LOffset = Math.ceil(baseLeft - Line.children[_i].getBoundingClientRect().left + shift);
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

function ibg() {
  var ibg = document.querySelectorAll(".ibg");

  for (var i = 0; i < ibg.length; i++) {
    var img = void 0,
        arr = void 0;
    arr = ibg[i].querySelectorAll('.ibg__image');

    for (var j = 0; j < arr.length; j++) {
      if (getComputedStyle(arr[j]).display != "none") {
        img = arr[j];
        break;
      }
    }

    if (img) {
      ibg[i].style.backgroundImage = 'url(' + img.getAttribute('src') + ')';
    } else {
      obj = ibg[i].getElementsByClassName('grid__item-icon')[0];

      if (obj) {
        obj.onload = function () {
          var img = this.contentDocument.getElementsByTagName('svg')[0].cloneNode(true);
          img.querySelector('path').setAttribute('fill-opacity', '0.2');
          img.setAttribute('class', "grid__item-bgicon");
          this.parentNode.appendChild(img);
        };
      }
    }
  }
}

ibg();
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
objectFitImages();