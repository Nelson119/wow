'use strict';
/* jshint devel:true, latedef:false,unused: false  */
$(function(){


	$('video').mediaelementplayer({
		controls:false,
	    features: [],
	    // Hide controls when playing and mouse is not over the video
	    alwaysShowControls: false,
	    // force iPad's native controls
	    iPadUseNativeControls: false,
	    // force iPhone's native controls
	    iPhoneUseNativeControls: false, 
	    // force Android's native controls
	    AndroidUseNativeControls: false,
	    // initial volume when the player starts
	    startVolume: 0.2,
	    // useful for <audio> player loops
	    loop: false,
        ended : function(mediaElement){
        	videoSetStatus('stop',mediaElement);
        },
		success: function (mediaElement) { 
        // add event listener
        mediaElement.addEventListener('timeupdate', function(e) {
             
           // document.getElementById('current-time').innerHTML = mediaElement.currentTime;
           e.toString();
           if(mediaElement.currentTime+3 > mediaElement.duration){
           		videoSetStatus('pause',mediaElement);
        		$('.mejs-poster mejs-layer').fadeIn();
     			videoSetStatus('stop',mediaElement);
           }
        }, false);
         
        // call the play method
        mediaElement.play();
     	videoSetStatus('play',mediaElement);
     	volumeSetStatus('up',mediaElement);
         
    }});
	function videoSetStatus(stat,mediaElement){
		switch(stat){
			case 'play':
				mediaElement.play();
				$('.glyphicon-play').toggleClass('glyphicon-pause').toggleClass('glyphicon-play');
				$('.video-control').unbind('click').bind('click',function(){
	                videoSetStatus('pause',mediaElement);
	            });
	            break;
			case 'pause':
				mediaElement.pause();
				$('.glyphicon-pause').toggleClass('glyphicon-pause').toggleClass('glyphicon-play');
				$('.video-control').unbind('click').bind('click',function(){
	                videoSetStatus('play',mediaElement);
	            });
	            break;
			case 'stop':
        		$('.mejs-poster mejs-layer').fadeIn();
	            break;
		}
	}
	function volumeSetStatus(stat,mediaElement){
		var btn = $('.glyphicon-volume-up,.glyphicon-volume-down,.glyphicon-volume-off');

		btn.removeClass('glyphicon-volume-up')
			.removeClass('glyphicon-volume-down')
			.removeClass('glyphicon-volume-off');
		btn.addClass('glyphicon-volume-'+stat);

		switch(stat){
			case 'up':
				mediaElement.setVolume(0.5);
				$('.volume-control').unbind('click').bind('click',function(){
	                volumeSetStatus('off',mediaElement);
	            });
	            break;
			case 'down':
				mediaElement.setVolume(0.3);
				$('.volume-control').unbind('click').bind('click',function(){
	                volumeSetStatus('up',mediaElement);
	            });
	            break;
			case 'off':
				mediaElement.setVolume(0);
				$('.volume-control').unbind('click').bind('click',function(){
	                volumeSetStatus('down',mediaElement);
	            });
	            break;
		}
	}
	$(window).on('scroll resize',function(){
		$('#fullpage').width($(window).width());
		$('#fullpage').height($(window).height());
		$('.video-preview').width($(window).width());
		$('.video-preview').height($(window).height());
	}).trigger('resize');
    $('#fullpage').fullpage({
        //Navigation
        menu: false,
        navigation: true,
        navigationPosition: 'right',
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'top',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        scrollBar: true,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        resize : false,
        sectionsColor : [ '#fff', '#000', '#fff','#000'],
        paddingTop: '3em',
        paddingBottom: '10px',
        fixedElements: '#header, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){},
        afterLoad: function(anchorLink, index){},
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    });
});