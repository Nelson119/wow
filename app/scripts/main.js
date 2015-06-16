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
	    loop: true,
        ended : function(mediaElement){
        	videoSetStatus('stop',mediaElement);
        },
		success: function (mediaElement) { 
        // add event listener
        window.mediaElement = mediaElement;
        mediaElement.addEventListener('timeupdate', function(e) {
             
           // document.getElementById('current-time').innerHTML = mediaElement.currentTime;
        //    e.toString();
        //    if(mediaElement.currentTime+3 > mediaElement.duration){
        //    		videoSetStatus('pause',mediaElement);
        // 		$('.mejs-poster mejs-layer').fadeIn();
     			// videoSetStatus('stop',mediaElement);
        //    }
        }, false);
        // call the play method
        setTimeout(function(){
	        mediaElement.play();
	     	videoSetStatus('play',mediaElement);
	     	volumeSetStatus('up',mediaElement);
	     }, 100);
         
         
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
		$('#fullpage').width($(window).width() > 768 ? $(window).width() : 768);
		$('#fullpage').height($(window).height());
		$('.video-preview').width($(window).width() > 768 ? $(window).width() : 768);
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
        scrollingSpeed: 650,
        autoScrolling: true,
        fitToSection: true,
        scrollBar: true,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '.footer',
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
        sectionsColor : [ '#0f0704', '#0f0704', '#0f0704','#0f0704'],
        paddingTop: '3em',
        paddingBottom: '10px',
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){
        },
        afterLoad: function(anchorLink, index){
        	var mediaElement = window.mediaElement;
        	if(index === 1){
		        // call the play method
	     		videoSetStatus('play',mediaElement);
        	}else{
	     		videoSetStatus('pause',mediaElement);
        	}
        	if(index === 5){
		        // call the play method
		     	$('#features').fadeTo(250,0.45);
        	}else {
		     	$('#features').fadeTo(250,1);
	     	}
        },
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    });
	$('#race .nav.nav-alliance li').on('mouseover',function(){
		race($(this).attr('data-race'), 'alliance');
	});
	$('#race .nav.nav-horde li').on('mouseover',function(){
		race($(this).attr('data-race'), 'horde');
	});
	$('#classes nav li').on('mouseover',function(){
		classes($(this).attr('data-classes'));
	});
	function race(name, alliance){
		var content = $('#race article .'+name) ;
		TweenMax.set(content, {
			opacity:0, 
			display:'block'
		});
		TweenMax.to(content, 0.45, {
			opacity:1, 
			ease:Linear.easeNone
		});
		TweenMax.to(content.siblings(), 0.25, {
			opacity:0, 
			ease:Linear.easeNone,
			onComplete:function(){
				content.siblings().removeClass('active');
				var btn = $('#race .nav.nav-'+alliance+' li.' + name.replace(/horde[-]/ig,''))
					.addClass('active');
				$('#race .nav.nav-alliance li').not(btn).removeClass('active');
				$('#race .nav.nav-horde li').not(btn).removeClass('active');
				
				TweenMax.set($('#race'), {
					backgroundImage:'url(images/race/'+name.replace(/horde[-]/ig,'')+'-bg.png)'
					
				});

			}
		});
		TweenMax.to($('#race .bg-mask'), 0.05, {
			opacity:1, 
			ease:Linear.easeNone,
			onComplete:function(){
				TweenMax.set($('#race'), {
					backgroundImage:'url(images/race/'+name.replace(/horde[-]/ig,'')+'-bg.png)'
					
				});
				TweenMax.to($('#race .bg-mask'), 0.45, {
					opacity:0, 
					ease:Linear.easeNone
				});
			}
		});
	}
	function classes(name){
		var content = $('#classes article .'+name) ;
		TweenMax.set(content, {
			opacity:0, 
			display:'block'
		});
		TweenMax.to(content, 0.45, {
			opacity:1, 
			ease:Linear.easeNone
		});
		TweenMax.to(content.siblings(), 0.25, {
			opacity:0, 
			ease:Linear.easeNone,
			onComplete:function(){
				content.siblings().removeClass('active');
				var btn = $('#classes nav li.' + name)
					.addClass('active');
				$('#classes nav li').not(btn).removeClass('active');
				
			}
		});
	}
});