(function ($) {
    $(document).ready(function () {
        //========== SIDEBAR/SEARCH AREA ============= //
        $(".hamburger_menu").on("click", function (e) {
            e.preventDefault();
            $(".slide-bar").toggleClass("show");
            $("body").addClass("on-side");
            $('.body-overlay').addClass('active');
            $(this).addClass('active');
        });

        $(".close-mobile-menu > a").on("click", function (e) {
            e.preventDefault();
            $(".slide-bar").removeClass("show");
            $("body").removeClass("on-side");
            $('.body-overlay').removeClass('active');
            $('.hamburger_menu').removeClass('active');
        });

        //========== PAGE PROGRESS STARTS ============= //
        var progressPath = document.querySelector(".progress-wrap path");
        if (progressPath) {
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = "none";
            progressPath.style.strokeDasharray = pathLength + " " + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
            var updateProgress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength) / height;
                progressPath.style.strokeDashoffset = progress;
            };
            updateProgress();
            $(window).scroll(updateProgress);
            var offset = 50;
            var duration = 550;
            jQuery(window).on("scroll", function () {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery(".progress-wrap").addClass("active-progress");
                } else {
                    jQuery(".progress-wrap").removeClass("active-progress");
                }
            });
            jQuery(".progress-wrap").on("click", function (event) {
                event.preventDefault();
                jQuery("html, body").animate({ scrollTop: 0 }, duration);
                return false;
            });
        }
        
        //========== VIDEO POPUP (MAGNIFIC) STARTS ============= //
        if ($(".popup-youtube").length > 0) {
            $(".popup-youtube").magnificPopup({
                type: "iframe",
            });
        }
        
        //========== AOS INITIALIZATION ============= //
        AOS.init({ disable: 'mobile' });

        //========== NICE SELECT (FOR THE NEW POPUP FORM) ============= //
        if ($('.nice-select').length) {
            $('select.nice-select').niceSelect();
        }

        //========== NEW POPUP AREA (HIRE ME & LETS CREATE) ============= //
        $(".popup-trigger").on('click', function (e) {
            e.preventDefault(); // Prevents the link from trying to navigate
            $(".custom-model-main").addClass('model-open');
        });

        $(".close-btn, .bg-overlay").click(function () {
            $(".custom-model-main").removeClass('model-open');
        });

        //========== OLD POPUP AREA (for .click-here) ============= //
        $(".click-here").on('click', function () {
            $(".custom-model-main").addClass('model-open');
        });

    });

    //========== COUNTER UP============= //
    const ucounter = $('.counter');
    if (ucounter.length > 0) {
        ucounter.countUp();
    };

    //========== PRELOADER ============= //
    $(window).on("load", function (event) {
        setTimeout(function () {
            $("#preloader").fadeToggle();
        }, 200);
    });

})(jQuery);

//========== GSAP AREA ============= //
if ($('.reveal').length) { gsap.registerPlugin(ScrollTrigger); let revealContainers = document.querySelectorAll(".reveal"); revealContainers.forEach((container) => { let image = container.querySelector("img"); let tl = gsap.timeline({ scrollTrigger: { trigger: container, toggleActions: "play none none none" } }); tl.set(container, { autoAlpha: 1 }); tl.from(container, 1.5, { xPercent: -100, ease: Power2.out }); tl.from(image, 1.5, { xPercent: 100, scale: 1.3, delay: -1.5, ease: Power2.out }); }); }

// Theme toggle functionality
const toggleButton = document.getElementById('theme-toggle');
if(toggleButton) {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('light-mode');
        toggleButton.checked = true;
    }
    toggleButton.addEventListener('change', () => {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark-mode');
            localStorage.removeItem('theme'); // Default is dark
        }
    });
}

// Custom Cursor
var cursor = document.querySelector('.procus-cursor');
var cursorinner = document.querySelector('.procus-cursor2');
var a = document.querySelectorAll('a');

if(cursor && cursorinner) {
    document.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
    });

    document.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        cursorinner.style.left = x + 'px';
        cursorinner.style.top = y + 'px';
    });

    document.addEventListener('mousedown', function () {
        cursor.classList.add('click');
        cursorinner.classList.add('cursorinnerhover')
    });

    document.addEventListener('mouseup', function () {
        cursor.classList.remove('click')
        cursorinner.classList.remove('cursorinnerhover')
    });

    a.forEach(item => {
        item.addEventListener('mouseover', () => {
            cursor.classList.add('hover');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    })
}


// Portfolio Item Video Player Logic
document.addEventListener('DOMContentLoaded', function() {
  let currentVideoItem = null;

  document.querySelectorAll('.portfolio-item').forEach(item => {
    // --- FEATURE: Click to play or pause ---
    item.addEventListener('click', function() {
      // If the clicked item is the one already playing, we close it.
      if (currentVideoItem === this) {
        const videoContainer = this.querySelector('.video-container');
        const thumbnail = this.querySelector('.thumbnail');
        
        if (videoContainer) {
          videoContainer.innerHTML = '';
          videoContainer.style.display = 'none';
        }
        if (thumbnail) {
          thumbnail.style.display = 'block';
        }
        
        currentVideoItem = null;
        return;
      }

      // Closes the previously playing video when a new one is clicked
      if (currentVideoItem) {
        const oldContainer = currentVideoItem.querySelector('.video-container');
        const oldThumbnail = currentVideoItem.querySelector('.thumbnail');
        
        if (oldContainer) {
          oldContainer.innerHTML = '';
          oldContainer.style.display = 'none';
        }
        if (oldThumbnail) {
          oldThumbnail.style.display = 'block';
        }
      }
      
      const thumbnail = this.querySelector('.thumbnail');
      const videoContainer = this.querySelector('.video-container');
      const videoUrl = this.getAttribute('data-video') + '?autoplay=1&loop=1&controls=0&title=0&byline=0&portrait=0';
      
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', videoUrl);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'autoplay; picture-in-picture');

      // --- NEW: Add a transparent overlay to capture clicks on the video itself ---
      const clickOverlay = document.createElement('div');
      clickOverlay.style.position = 'absolute';
      clickOverlay.style.top = '0';
      clickOverlay.style.left = '0';
      clickOverlay.style.width = '100%';
      clickOverlay.style.height = '100%';
      clickOverlay.style.zIndex = '1'; // Ensures it's on top of the iframe

      // Add both the iframe and the overlay to the container
      videoContainer.innerHTML = '';
      videoContainer.appendChild(iframe);
      videoContainer.appendChild(clickOverlay); // The overlay sits on top
      videoContainer.style.display = 'block';

      thumbnail.style.display = 'none';
      currentVideoItem = this;
    });

    // --- FEATURE: Disable right-click and long-press ---
    // This listener prevents the context menu from appearing on right-click.
    item.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
  });
});
