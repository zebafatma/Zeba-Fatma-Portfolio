// script.js — jQuery animations & simple interactions
$(function () {

  // Header sticky reveal
  setTimeout(function () {
    $('.site-header').addClass('sticky');
  }, 200);

  // Smooth scroll for nav anchors
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 18
      }, 600);
    }
  });

  // Animate progress bars when skills section enters viewport
  function animateProgress() {
    $('.progress').each(function () {
      var $this = $(this);
      if ($this.data('animated')) return;
      var top = $this.offset().top;
      var scrollTop = $(window).scrollTop();
      var winH = $(window).height();
      if (top < (scrollTop + winH - 40)) {
        var val = $this.data('value') || 70;
        $this.find('.bar').css('width', val + '%');
        $this.data('animated', true);
      }
    });
  }
  $(window).on('scroll resize load', animateProgress);
  animateProgress();

  // Fade-in cards when they appear
  function revealOnScroll() {
    $('.card').each(function (i) {
      var $el = $(this);
      if ($el.data('revealed')) return;
      var top = $el.offset().top;
      var winBottom = $(window).scrollTop() + $(window).height();
      if (winBottom > top + 40) {
        setTimeout(function () {
          $el.css({ opacity: 1, transform: 'translateY(0)' });
        }, 80 * i);
        $el.data('revealed', true);
      }
    });
  }
  // initial style for reveal transition
  $('.card').css({ opacity: 0, transform: 'translateY(6px)', transition: 'all 420ms cubic-bezier(.2,.9,.3,1)' });
  $(window).on('scroll resize load', revealOnScroll);
  revealOnScroll();

  // Basic contact form validation (client-side)
$('#contact-form').on('submit', function (e) {
    e.preventDefault();  // stop page reload

    let name = $('#name').val().trim();
    let email = $('#email').val().trim();
    let message = $('#message').val().trim();

    if (!name || !email || !message) {
        showPopup("Please fill all fields.");
        return;
    }

    showPopup("Opening Gmail…");

    let gmailLink =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" + encodeURIComponent("zeb.iicm@gmail.com") +
        "&su=" + encodeURIComponent("Message from " + name) +
        "&body=" + encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            message
        );

    setTimeout(() => {
        window.open(gmailLink, "_blank");
    }, 600); // delay for smooth popup
});



  // Small hover micro-interaction on project cards
  $('.project').hover(
    function () { $(this).css('transform', 'translateY(-6px)'); },
    function () { $(this).css('transform', 'translateY(0)'); }
  );

});
// Expand/Collapse Projects — fixed version
$(document).ready(function() {
  $(".toggle-btn").click(function() {
    let card = $(this).closest(".project-item");        // only this card
    let content = card.find(".project-content");         // only this content

    // Close any other open cards (optional)
    $(".project-content").not(content).slideUp();
    $(".toggle-btn").not(this).text("Show More");

    // Toggle this one
    content.slideToggle(300);

    // Change button text
    if ($(this).text() === "Show More") {
      $(this).text("Show Less");
    } else {
      $(this).text("Show More");
    }
  });
});

$(function () {
  var $btn = $('#backToTop');

  // Safety: if button doesn't exist, stop here
  if ($btn.length === 0) return;

  // Show / hide button on scroll
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 300) {
      $btn.fadeIn(200);
    } else {
      $btn.fadeOut(200);
    }
  });

  // Click handler — scroll the page to top
  $btn.on('click', function (e) {
    e.preventDefault();

    // Primary attempt: animate the document
    $('html, body').stop().animate({ scrollTop: 0 }, 600, 'swing');
  });

  // Run once on load in case page is already scrolled
  if ($(window).scrollTop() > 300) $btn.show();
});
