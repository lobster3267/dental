/* Description: Custom JS file */


(function($) {
    "use strict"; 
	
	 /* Populate the gallery from the grid folder in a new order on each load. */
    var gridImages = [];
    for (var gridIndex = 1; gridIndex <= 60; gridIndex++) {
        var paddedIndex = String(gridIndex).padStart(3, '0');
        var imageType = gridIndex <= 27 ? '2x1' : (gridIndex <= 49 ? '1x2' : '1x1');
        gridImages.push({
            path: 'grid/' + paddedIndex + '_image_' + imageType + '.jpg',
            type: imageType
        });
    }

    gridImages.sort(function() {
        return Math.random() - 0.5;
    });

    $.each(gridImages, function(index, image) {
        var className = image.type === '2x1' ? 'is-landscape' : (image.type === '1x2' ? 'is-portrait' : 'is-square');
        $('<div>', { class: 'grid-gallery-item ' + className })
            .append($('<img>', {
                src: image.path,
                alt: 'Selected work ' + (index + 1),
                loading: index < 12 ? 'eager' : 'lazy'
            }))
            .appendTo('#gridGallery');
    });
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

    /* Showreel modal: autoplay on open, stop video completely on close */
    var showreelSrc = 'images/showreel2026.mp4';
    var $showreelMedia = $('#showreelModal video');

    $('#showreelModal').on('show.bs.modal', function () {
        $showreelMedia.attr('src', showreelSrc);
        var media = $showreelMedia.get(0);
        if (media) {
            media.load();
            media.play().catch(function() {
                // autoplay may be blocked by browser if not muted
            });
        }
    });

    $('#showreelModal').on('hidden.bs.modal', function () {
        var media = $showreelMedia.get(0);
        if (media) {
            media.pause();
        }
        $showreelMedia.attr('src', '');
        if (media) {
            media.load();
        }
    });

    $('.project-video-container').on('click keydown', function (event) {
        if (event.type === 'keydown' && event.which !== 13 && event.which !== 32) {
            return;
        }

        event.preventDefault();

        if ($(this).hasClass('is-playing')) {
            return;
        }

        $(this).addClass('is-playing');
        $(this).find('.project-video-frame').attr('src', $(this).data('video-url'));
    });

    $('.work-video-trigger').on('click keydown', function (event) {
        if (event.type === 'keydown' && event.which !== 13 && event.which !== 32) {
            return;
        }

        event.preventDefault();
        var videoUrl = $(this).data('video-url');
        $('#worksVideoModal iframe').attr('src', videoUrl);
        $('#worksVideoModal').modal('show');
    });

    $('#worksVideoModal').on('hidden.bs.modal', function () {
        $('#worksVideoModal iframe').attr('src', '');
    });

})(jQuery);
