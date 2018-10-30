function loadScript(url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  if (script.readyState) {
    //IE
    script.onreadystatechange = () => {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    //Others
    script.onload = () => {
      callback();
    };
  }

  script.src = url;
  document.body.appendChild(script);
}

/**
 * Initializes the chat widget
 * @return {undefined} undefined
 */
function initChatWidget() {
  if (!window.chatWidget) {
    if (typeof ChatWidget === 'undefined') {
      loadScript('https://www.te-hype.it/assets/js/chat-widget.min.js', () => {
        window.chatWidget = ChatWidget.default.init({
          selector: 'chat-widget',
          theme: 'hype',
          chatAccountKey: 'N3KwuCDduJaQMDOIQM0FgwF3woTZTazk',
          botAccountKey: '6943f66c-7671-4ce9-80b8-f581f5a52be2',
          botEndpoint:
            'https://hypebotqna.azurewebsites.net/qnamaker/knowledgebases/6caa7eed-9b39-4033-8637-9028fec8751d/generateAnswer',
          emailAddress: 'hello@hype.it',
          servicesCheckUrl: 'https://www.te-hype.it/api/rest/FREE/services'
        });

        document.querySelector('#chat-widget .chat-button').style.display =
          'none';

        var decodedQs = decodeURIComponent(window.location.search);
        var chatCredentials = {
          name: decodedQs.replace(/^.*\Wname\=([^&]*).*$/i, '$1'),
          surname: decodedQs.replace(/^.*\Wsurname\=([^&]*).*$/i, '$1'),
          email: decodedQs.replace(/^.*\Wemail\=([^&]*).*$/i, '$1'),
          phone: decodedQs.replace(/^.*\phone\=([^&]*).*$/i, '$1')
        };

        window.chatWidget.setVisitorInfo({
          display_name:
            chatCredentials.name +
            (chatCredentials.surname ? ' ' : '') +
            chatCredentials.surname,
          email: chatCredentials.email,
          phone: chatCredentials.phone
        });

        var openChatbotFromLink = function (e) {
          e.preventDefault();
          window.chatWidget.setVisible(true);
        };

        Array.prototype.slice
          .call(document.querySelectorAll('.js-chatbot'))
          .forEach(function (el) {
            el.onclick = openChatbotFromLink;
          });

        // $('div.article-more-questions').text('Hai ancora bisogno d’aiuto?');
        $('.article-more-questions a')
          .text('Avvia chat')
          .attr('href', '#')
          .addClass('js-chatbot')
          .on('click', openChatbotFromLink);
      });
    }
  }
}

$(document).ready(function () {
  // DOM Ready, execute code
  // checkCookie();
  //handleQueryString();
  //createSlider();
  //subsVideo();

  $('#request_issue_type_select option[value="360000065513"]').remove();
  $('.nesty-panel').on('DOMNodeInserted', function(e) {
    $(this)
      .children('ul')
      .children()
      .remove('#360000065513');
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

  // console.log(navigationBar);
  var isDesktopOrLanding = function () {
    return (
      window.matchMedia('(min-width: 769px)').matches ||
      Array.from(document.body.classList).find(function (c) {
        return c.indexOf('e-landing') > -1;
      })
    );
  };

  window.onscroll = function () {
    var mobileNavigation = document.getElementById('js-mobileMenu');

    var scroll = isNaN(window.scrollY)
      ? document.documentElement.scrollTop
      : window.scrollY;

    if (scroll > 0) {
      if (isDesktopOrLanding()) {
        navigationBar.classList.add('is-sticky');
      } else {
        mobileNavigation.classList.add('is-sticky');
      }
      //document
      //  .getElementById('js-cookie')
      //  .classList.add('c-cookie-block--closed');
      //navigationBar.classList.remove('cookie-on');
    } else {
      if (isDesktopOrLanding()) {
        navigationBar.classList.remove('is-sticky');
      } else {
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
    .from(
      '#c-ill-window__item-1 .c-ill-window__item-bubble',
      1,
      { scale: 0, opacity: 0, ease: Bounce.easeOut },
      1
    )
    .to('#c-ill-window__item-1 .c-ill-window__item-bubble', 0, {
      scale: 1,
      opacity: 1,
      ease: Bounce.easeIn
    })
    .from(
      '#c-ill-window__item-2 .c-ill-window__item-bubble',
      1,
      { scale: 0, opacity: 0, ease: Bounce.easeOut },
      2
    )
    .to('#c-ill-window__item-2 .c-ill-window__item-bubble', 0, {
      scale: 1,
      opacity: 1,
      ease: Bounce.easeIn
    });
  // .from("#section-1 .section__text div",1,{ y:1000 , opacity:1 , ease: Expo. easeOut },1)
  //   .to("#section-1 .section__text div",0,{ y:0 , opacity:1 , ease: Expo. easeOut })
  // .fromTo("#section-1 .section-animate__left", 0.5, {css: {bottom: "100%"}}, {css:{bottom: "0"}},2)
  // .fromTo("#section-1 .section-animate__right", 0.5, {css: {top: "100%"}}, {css:{top: "0"}},2)
  // .from("#section-1 .reveal-bottom img",1,{ y:1000 , opacity:1 , ease: Expo. easeOut },"+=0.5")
  //   .to("#section-1 .reveal-bottom img",0,{ y:0 , opacity:1 , ease: Expo. easeOut })
  // .from("#section-1 .reveal-left img",1,{ x:-800 , opacity:1 , ease: Expo. easeOut },"+=0.5")
  //   .to("#section-1 .reveal-left img",0,{ x:0 , opacity:1 , ease: Expo. easeOut });

  // console.log(tl1);

  // Animazione di entrata su alcuni elementi
  $('[data-animated]').each(function () {
    $(this).addClass('animated-out');
  });

  initChatWidget();
});

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  //console.log(scroll)
  var height = $(window).height();
  //console.log(height)
  //console.log(scroll + height)

  $('.animated-out[data-animated]').each(function () {
    var $this = $(this);
    //console.log($this.offset().top)
    if (scroll + height >= $this.offset().top + 160) {
      var delay = parseInt($this.attr('data-animated'));
      if (isNaN(delay) || 0 === delay) {
        $this.removeClass('animated-out').addClass('animated-in');
      } else {
        setTimeout(function () {
          $this.removeClass('animated-out').addClass('animated-in');
        }, delay);
      }
    }
  });
});
