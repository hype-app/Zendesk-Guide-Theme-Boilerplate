////////// COPENHAGEN THEME JAVASCRIPT //////////

/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {
  // social share popups
  $('.share a').click(function(e) {
    e.preventDefault();
    window.open(this.href, '', 'height = 500, width = 500');
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var $commentContainerTextarea = $('.comment-container textarea'),
    $commentContainerFormControls = $('.comment-form-controls, .comment-ccs');

  $commentContainerTextarea.one('focus', function() {
    $commentContainerFormControls.show();
  });

  if ($commentContainerTextarea.val() !== '') {
    $commentContainerFormControls.show();
  }

  // Expand Request comment form when Add to conversation is clicked
  var $showRequestCommentContainerTrigger = $(
      '.request-container .comment-container .comment-show-container'
    ),
    $requestCommentFields = $(
      '.request-container .comment-container .comment-fields'
    ),
    $requestCommentSubmit = $(
      '.request-container .comment-container .request-submit-comment'
    );

  $showRequestCommentContainerTrigger.on('click', function() {
    $showRequestCommentContainerTrigger.hide();
    $requestCommentFields.show();
    $requestCommentSubmit.show();
    $commentContainerTextarea.focus();
  });

  // Mark as solved button
  var $requestMarkAsSolvedButton = $(
      '.request-container .mark-as-solved:not([data-disabled])'
    ),
    $requestMarkAsSolvedCheckbox = $(
      '.request-container .comment-container input[type=checkbox]'
    ),
    $requestCommentSubmitButton = $(
      '.request-container .comment-container input[type=submit]'
    );

  $requestMarkAsSolvedButton.on('click', function () {
    $requestMarkAsSolvedCheckbox.attr('checked', true);
    $requestCommentSubmitButton.prop('disabled', true);
    $(this)
      .attr('data-disabled', true)
      .closest('form')
      .submit();
  });

  // Change Mark as solved text according to whether comment is filled
  var $requestCommentTextarea = $(
    '.request-container .comment-container textarea'
  );

  $requestCommentTextarea.on('keyup', function() {
    if ($requestCommentTextarea.val() !== '') {
      $requestMarkAsSolvedButton.text(
        $requestMarkAsSolvedButton.data('solve-and-submit-translation')
      );
      $requestCommentSubmitButton.prop('disabled', false);
    } else {
      $requestMarkAsSolvedButton.text(
        $requestMarkAsSolvedButton.data('solve-translation')
      );
      $requestCommentSubmitButton.prop('disabled', true);
    }
  });

  // Disable submit button if textarea is empty
  if ($requestCommentTextarea.val() === '') {
    $requestCommentSubmitButton.prop('disabled', true);
  }

  // Submit requests filter form in the request list page
  $('#request-status-select, #request-organization-select').on(
    'change',
    function() {
      search();
    }
  );

  // Submit requests filter form in the request list page
  $('#quick-search').on('keypress', function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $('#quick-search').val(),
      status: $('#request-status-select').val(),
      organization_id: $('#request-organization-select').val()
    });
  }

  $('.header .icon-menu').on('click', function(e) {
    e.stopPropagation();
    var menu = document.getElementById('user-nav');
    var isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', !isExpanded);
  });

  if ($('#user-nav').children().length === 0) {
    $('.header .icon-menu').hide();
  }

  // Submit organization form in the request page
  $('#request-organization select').on('change', function() {
    this.form.submit();
  });

  // Toggles expanded aria to collapsible elements
  $('.collapsible-nav, .collapsible-sidebar').on('click', function(e) {
    e.stopPropagation();
    var isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
  });
});

function subsVideo() {
  // console.log('Qui')
  var iframe = $('iframe:first');
  var iframe_src = iframe.attr('src');
  var youtube_video_id = iframe_src
    .match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)
    .pop();

  if (youtube_video_id.length == 11) {
    var video_thumbnail = $(
      '<img src="//img.youtube.com/vi/' + youtube_video_id + '/0.jpg">'
    );
    $(body).append(video_thumbnail);
  }

  // var modalVideo = document.getElementById('js-video');
  // var btnVideo = document.getElementById('js-video-modal-button');
  // var body = document.body;
  // var span = document.getElementsByClassName('c-video__close')[0];
  // var iframe = document.getElementById('js-iframe-video');
  // var img = document.getElementById('js-iframe-video');
  // var src = document.getElementById("video");

  // var node = document.createElement("img");
  // var textnode = document.createTextNode("Water");
  // node.appendChild(textnode);
  // document.getElementById("myList").appendChild(node);

  // var img = document.createElement("img");
  // img.src = "http://i.ytimg.com/vi/" + src.dataset.video + "/maxresdefault.jpg";
  //
  // src.appendChild(img);
  //
  // if (!btnVideo) return;
  // btnVideo.onclick = function () {
  //   modalVideo.classList.add('open');
  //   modalVideo.classList.remove('hidden');
  //   body.classList.add('t-noscroll');
  //   iframe.src = urlVideo;
  // };
  //
  // if (!span) return;
  // span.onclick = function () {
  //   modalVideo.classList.add('hidden');
  //   modalVideo.classList.remove('open');
  //   body.classList.remove('t-noscroll');
  //   iframe.src = '';
  // };
  //
  // window.onclick = function (event) {
  //   if (event.target === modalVideo) {
  //     modalVideo.classList.add('hidden');
  //     modalVideo.classList.remove('open');
  //     body.classList.remove('t-noscroll');
  //     iframe.src = '';
  //   }
  // };
}

////////// COPENHAGEN THEME JAVASCRIPT END //////////
