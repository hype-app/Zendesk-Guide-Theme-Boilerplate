/**
 * Initializes the chatbot
 * @return {undefined} undefined
 */
function initChatbot(){
  var chatbotColor = '#00A5FD';

  var isTimPersonal =
    window.location.pathname.toLowerCase().indexOf('timpersonal') > -1;

  // @remarks removed because the following statement won't be executed for TIM partner right now
  // if (isTimPersonal) {
  //   chatbotColor = '#004691'
  // }

  var WWW_ROOT = 'https://www.hype.it'

  if (!isTimPersonal) {
    window.chatbotInstance = Chatbot.init({
      width: '340px',
      padding: '50px',
      color: chatbotColor, //'#00A5FD'
      chatbotName: 'Hypebot',
      emailAddress: 'help@hype.it',
      fontFamily: 'Muli, sans-serif',
      robotIcon: WWW_ROOT + '/assets/images/robot-icon.png',
      userIcon: WWW_ROOT + '/assets/images/user-icon.png',
      errorIcon: WWW_ROOT + '/assets/images/error-icon.png',
      surveyIcons: {
        '1': {
          default: WWW_ROOT + '/assets/images/chat_survey/icn_40x40_feedback_entusiasta_normal.png',
          active: WWW_ROOT + '/assets/images/chat_survey/icn_40x40_feedback_entusiasta_active_hover.png'
        },
        '2': {
          default: WWW_ROOT + '/assets/images/chat_survey/icn_40x40_feedback_soddisfatto_normal.png',
          active: WWW_ROOT + '/assets/images/chat_survey/icn_40x40_feedback_soddisfatto_active_hover.png'
        },
        '3': {
          default: WWW_ROOT + '/assets/images/chat_survey/icn_40x40_feedback_neutrale_normal.png',
          active: WWW_ROOT + '/assets/images/chat_survey/icn_40x40_feedback_neutrale_active_hover.png'
        },
        '4': {
          default: WWW_ROOT + '/assets/images/chat_survey/icn_40x40_feedback_deluso_normal.png',
          active: WWW_ROOT + '/assets/images/chat_survey/icn_40x40_feedback_deluso_active_hover.png'
        },
        '5': {
          default: WWW_ROOT + '/assets/images/chat_survey/icn_40x40_feedback_irritato_normal.png',
          active: WWW_ROOT + '/assets/images/chat_survey/icn_40x40_feedback_irritato_active_hover.png'
        }
      },
      selector: '#chatbot',
      endpoint: 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/57858072-d02e-4dd6-bd72-73da2d55eb5b/generateAnswer',
      subKey: '35f376e3f5294748886e1cd937a75f3e',
      operatorChatApiRoot: WWW_ROOT + '/Chat/service/gc/',
      hypeCheck: WWW_ROOT + '/api/rest/FREE/services'
    });
  }

  Array.prototype.slice
  .call(document.querySelectorAll('.js-chatbot'))
  .forEach(function (el) {
    el.onclick = function (e) {
      e.preventDefault();
      window.chatbotInstance.open();
    };
  });
}


$(document).ready(function() {

  // DOM Ready, execute code
  // checkCookie();
  //handleQueryString();
  //createSlider();
  //subsVideo();

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

// Animazione di entrata su alcuni elementi
$('[data-animated]').each(function() {
    $(this).addClass('animated-out');
});


// chatbot init start
initChatbot();

var decodedQs = decodeURIComponent(window.location.search);

window.chatbotInstance.setCredentials({
        name: decodedQs.replace(/^.*\Wname\=([^&]*).*$/i,'$1'),
        surname: decodedQs.replace(/^.*\Wsurname\=([^&]*).*$/i,'$1'),
        email:  decodedQs.replace(/^.*\Wemail\=([^&]*).*$/i,'$1')
      });
//chatbot init end

});

$(window).scroll(function() {
    var scroll = $(window).scrollTop();
		//console.log(scroll)
    var height = $(window).height();
		//console.log(height)
		//console.log(scroll + height)

    $('.animated-out[data-animated]').each(function() {
        var $this = $(this);
				//console.log($this.offset().top)
        if (scroll + height >= $this.offset().top + 160) {
            var delay = parseInt($this.attr('data-animated'));
            if (isNaN(delay) || 0 === delay) {
                $this.removeClass('animated-out').addClass('animated-in');
            } else {
                setTimeout(function() {
                    $this.removeClass('animated-out').addClass('animated-in');
                }, delay);
            }
        }
    });
});
