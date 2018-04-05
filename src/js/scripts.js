$(document).ready(function() {

document.addEventListener('DOMContentLoaded', function () {
  // DOM Ready, execute code
  // checkCookie();
  createBurger();
  handleQueryString();
  createSlider();
  openVideo();
  //subsVideo();

  var chatbotColor = '#00A5FD';

  var isTimPersonal =
    window.location.pathname.toLowerCase().indexOf('timpersonal') > -1;

  // @remarks removed because the following statement won't be executed for TIM partner right now
  // if (isTimPersonal) {
  //   chatbotColor = '#004691'
  // }

  if (!isTimPersonal) {
    window.chatbotInstance = Chatbot.init({
      width: '340px',
      padding: '50px',
      color: chatbotColor, //'#00A5FD'
      chatbotName: 'Hypebot',
      emailAddress: 'help@hype.it',
      fontFamily: 'Muli, sans-serif',
      robotIcon: '/assets/images/robot-icon.png',
      userIcon: '/assets/images/user-icon.png',
      errorIcon: '/assets/images/error-icon.png',
      selector: '#chatbot',
      endpoint: 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/57858072-d02e-4dd6-bd72-73da2d55eb5b/generateAnswer',
      subKey: '35f376e3f5294748886e1cd937a75f3e',
      operatorChatURL: '/Chat/',
      __hypeCheck: '/api/rest/FREE/services'
    });
  }
});

// chatbotInstance.toggle()

Array.prototype.slice
  .call(document.querySelectorAll('.js-chatbot'))
  .forEach(function (el) {
    el.onclick = function (e) {
      e.preventDefault();
      window.chatbotInstance.open();
    };
  });

//slider
var createSlider = function () {
  var slider = document.getElementById('js-slider');
  var prev = document.getElementById('js-slider__prev');
  var next = document.getElementById('js-slider__next');
  var slides = document.getElementsByClassName('js-slider__slide');
  var currentSlide = 0;
  var isSliding = false;

  if (!slider) return;

  // Setup
  prev.classList.add('c-customer-reviews-slider__arrow--inactive');
  slides[0].classList.add('js-slider__slide--active');

  prev.onclick = function () {
    slideAnimation('prev');
  };
  next.onclick = function () {
    slideAnimation('next');
  };

  // Slide baby slide
  function slideAnimation(direction) {
    var slideToAnimate = currentSlide;

    if (direction === 'prev') {
      if (currentSlide - 1 < 0 || !!isSliding) return;
      slideToAnimate = currentSlide - 1;
    } else if (direction === 'next') {
      if (currentSlide + 1 >= slides.length || !!isSliding) return;
      slideToAnimate = currentSlide + 1;
    } else {
      throw 'Direction should be either \'prev\' or \'next\'.';
    }

    isSliding = true;

    slides[currentSlide].classList.add('animated');
    slides[currentSlide].classList.add('zoomOut');

    // Fadeout animation is 500ms, so we setTimeout for 500
    window.setTimeout(function () {
      slides[slideToAnimate].classList.add('animated');
      slides[slideToAnimate].classList.add('fadeInUp');
    }, 500);

    // Animation finished... Cleanup time
    window.setTimeout(function () {
      slides[currentSlide].classList.remove('js-slider__slide--active');
      slides[currentSlide].classList.remove('animated');
      slides[currentSlide].classList.remove('zoomOut');
      slides[slideToAnimate].classList.add('js-slider__slide--active');
      slides[slideToAnimate].classList.remove('animated');
      slides[slideToAnimate].classList.remove('fadeInUp');
      currentSlide = slideToAnimate;
      isSliding = false;
    }, 500);
  }
};

// Burger menu
var createBurger = function () {
  var navigation = document.getElementById('js-mobileMenu');
  var burger = document.getElementById('js-mobileMenu__button');
  var featuresNavigationBar = document.getElementById('js-featuresNavigation');
  var closeText = 'CHIUDI';

  if (!navigation || !burger) return;

  if (window.location.href.split('/').indexOf('en') >= 0) {
    closeText = 'CLOSE';
  }

  burger.onclick = function (e) {
    e.preventDefault();
    if (navigation.classList.contains('c-mobile-navigation--closed')) {
      navigation.classList.remove('c-mobile-navigation--closed');
      navigation.classList.add('c-mobile-navigation--open');
      if (!!featuresNavigationBar) {
        featuresNavigationBar.classList.add('c-features-navigation--hidden');
      }
      burger.innerHTML = closeText;
    } else {
      navigation.classList.remove('c-mobile-navigation--open');
      navigation.classList.add('c-mobile-navigation--closed');
      if (!!featuresNavigationBar) {
        featuresNavigationBar.classList.remove('c-features-navigation--hidden');
      }
      burger.innerHTML = 'MENU';
    }
  };
};

// cookie
// var checkCookie = function () {
//   if (localStorage.getItem('cookie') !== 'viewed') {
//     document
//       .getElementById('js-cookie')
//       .classList.remove('c-cookie-block--closed');
//     navigationBar.classList.add('cookie-on');
//   }
// };
//
// var cookieCloseBtn = document.getElementById('js-cookie-button');
// cookieCloseBtn.onclick = function (/*e*/) {
//   document.getElementById('js-cookie').classList.add('c-cookie-block--closed');
//   navigationBar.classList.remove('cookie-on');
//   localStorage.setItem('cookie', 'viewed');
// };

var navigationBar = document.getElementById('js-fixedNav');

console.log(navigationBar);
var isDesktopOrLanding = function () {
  return window.matchMedia('(min-width: 769px)').matches || Array.from(document.body.classList).find(function (c) {
      return c.indexOf('e-landing') > -1
    });
};


window.onscroll = function () {
  var mobileNavigation = document.getElementById('js-mobileMenu');

  var scroll = isNaN(window.scrollY)
    ? document.documentElement.scrollTop
    : window.scrollY;

  if (scroll > 0) {
    if (isDesktopOrLanding()) {
      navigationBar.classList.add('is-sticky');
    }
    else {
      mobileNavigation.classList.add('is-sticky');
    }
    //document
    //  .getElementById('js-cookie')
    //  .classList.add('c-cookie-block--closed');
    //navigationBar.classList.remove('cookie-on');
  }
  else {
    if (isDesktopOrLanding()) {
      navigationBar.classList.remove('is-sticky');

    }
    else {
      mobileNavigation.classList.remove('is-sticky');
    }
  }

  // if (scroll > 310){
  //   if (window.matchMedia("(min-width: 768px)").matches) {
  //     document.getElementById('js-card').classList.add('animate')
  //     document.getElementById('js-profile').classList.add('animate')
  //   }
  // }
};

// handle query string
var handleQueryString = function () {
  var query = window.location.search;

  var links = document.querySelectorAll('a[href="../signup"]');
  [].forEach.call(links, function (link) {
    link.href += query;
  });

  var linksTim = document.querySelectorAll(
    'a[href="../signup/request/hype4tim"]'
  );
  [].forEach.call(linksTim, function (link) {
    link.href += query;
  });
};

//open video hype

var openVideo = function () {
  var modalVideo = document.getElementById('js-video');
  var btnVideo = document.getElementById('js-video-modal-button');
  var body = document.body;
  var span = document.getElementsByClassName('c-video__close')[0];
  var iframe = document.getElementById('js-iframe-video');

  if (!btnVideo) return;
  btnVideo.onclick = function () {
    modalVideo.classList.add('open');
    modalVideo.classList.remove('hidden');
    body.classList.add('t-noscroll');
    iframe.src =
      'https://www.youtube.com/embed/NuAKnlcBGVc?rel=0&showinfo=0&autoplay=1&color=white&modestbranding=1&theme=light';
  };

  if (!span) return;
  span.onclick = function () {
    modalVideo.classList.add('hidden');
    modalVideo.classList.remove('open');
    body.classList.remove('t-noscroll');
    iframe.src = '';
  };

  window.onclick = function (event) {
    if (event.target === modalVideo) {
      modalVideo.classList.add('hidden');
      modalVideo.classList.remove('open');
      body.classList.remove('t-noscroll');
      iframe.src = '';
    }
  };
};

var tl1 = new TimelineMax(),
    tl2 = new TimelineMax();

// Timeline Tweenmax prima sezione
tl1
.from("#c-ill-window__item-1 .c-ill-window__item-bubble",1,{ scale:0 , opacity:0 , ease: Bounce.easeOut },1)
  .to("#c-ill-window__item-1 .c-ill-window__item-bubble",0,{ scale:1 , opacity:1 , ease: Bounce.easeIn })
.from("#c-ill-window__item-2 .c-ill-window__item-bubble",1,{ scale:0 , opacity:0 , ease: Bounce.easeOut },2)
  .to("#c-ill-window__item-2 .c-ill-window__item-bubble",0,{ scale:1 , opacity:1 , ease: Bounce.easeIn });
// .from("#section-1 .section__text div",1,{ y:1000 , opacity:1 , ease: Expo. easeOut },1)
//   .to("#section-1 .section__text div",0,{ y:0 , opacity:1 , ease: Expo. easeOut })
// .fromTo("#section-1 .section-animate__left", 0.5, {css: {bottom: "100%"}}, {css:{bottom: "0"}},2)
// .fromTo("#section-1 .section-animate__right", 0.5, {css: {top: "100%"}}, {css:{top: "0"}},2)
// .from("#section-1 .reveal-bottom img",1,{ y:1000 , opacity:1 , ease: Expo. easeOut },"+=0.5")
//   .to("#section-1 .reveal-bottom img",0,{ y:0 , opacity:1 , ease: Expo. easeOut })
// .from("#section-1 .reveal-left img",1,{ x:-800 , opacity:1 , ease: Expo. easeOut },"+=0.5")
//   .to("#section-1 .reveal-left img",0,{ x:0 , opacity:1 , ease: Expo. easeOut });

console.log(tl1);

});
