"use strict";$(function(){function e(o,a){switch(o){case"play":a.play(),$(".glyphicon-play").toggleClass("glyphicon-pause").toggleClass("glyphicon-play"),$(".video-control").unbind("click").bind("click",function(){e("pause",a)});break;case"pause":a.pause(),$(".glyphicon-pause").toggleClass("glyphicon-pause").toggleClass("glyphicon-play"),$(".video-control").unbind("click").bind("click",function(){e("play",a)});break;case"stop":$(".mejs-poster mejs-layer").fadeIn()}}function o(e,a){var n=$(".glyphicon-volume-up,.glyphicon-volume-down,.glyphicon-volume-off");switch(n.removeClass("glyphicon-volume-up").removeClass("glyphicon-volume-down").removeClass("glyphicon-volume-off"),n.addClass("glyphicon-volume-"+e),e){case"up":a.setVolume(.5),$(".volume-control").unbind("click").bind("click",function(){o("off",a)});break;case"down":a.setVolume(.3),$(".volume-control").unbind("click").bind("click",function(){o("up",a)});break;case"off":a.setVolume(0),$(".volume-control").unbind("click").bind("click",function(){o("down",a)})}}function a(e,o){var a=$("#race article ."+e);TweenMax.set(a,{opacity:0,display:"block"}),TweenMax.to(a,.45,{opacity:1,ease:Linear.easeNone}),TweenMax.to(a.siblings(),.25,{opacity:0,ease:Linear.easeNone,onComplete:function(){a.siblings().removeClass("active");var n=$("#race .nav.nav-"+o+" li."+e.replace(/horde[-]/gi,"")).addClass("active");$("#race .nav.nav-alliance li").not(n).removeClass("active"),$("#race .nav.nav-horde li").not(n).removeClass("active"),TweenMax.set($("#race"),{backgroundImage:"url(images/race/"+e.replace(/horde[-]/gi,"")+"-bg.png)"})}}),TweenMax.to($("#race .bg-mask"),.05,{opacity:1,ease:Linear.easeNone,onComplete:function(){TweenMax.set($("#race"),{backgroundImage:"url(images/race/"+e.replace(/horde[-]/gi,"")+"-bg.png)"}),TweenMax.to($("#race .bg-mask"),.45,{opacity:0,ease:Linear.easeNone})}})}function n(e){var o=$("#classes article ."+e);TweenMax.set(o,{opacity:0,display:"block"}),TweenMax.to(o,.45,{opacity:1,ease:Linear.easeNone}),TweenMax.to(o.siblings(),.25,{opacity:0,ease:Linear.easeNone,onComplete:function(){o.siblings().removeClass("active");var a=$("#classes nav li."+e).addClass("active");$("#classes nav li").not(a).removeClass("active")}})}$("video").mediaelementplayer({controls:!1,features:[],alwaysShowControls:!1,iPadUseNativeControls:!1,iPhoneUseNativeControls:!1,AndroidUseNativeControls:!1,startVolume:.2,loop:!0,ended:function(o){e("stop",o)},success:function(a){window.mediaElement=a,a.addEventListener("timeupdate",function(e){},!1),setTimeout(function(){a.play(),e("play",a),o("up",a)},100)}}),$(window).on("scroll resize",function(){$("#fullpage").width($(window).width()>768?$(window).width():768),$("#fullpage").height($(window).height()),$(".video-preview").width($(window).width()>768?$(window).width():768),$(".video-preview").height($(window).height())}).trigger("resize"),$("#fullpage").fullpage({menu:!1,navigation:!0,navigationPosition:"right",showActiveTooltip:!1,slidesNavigation:!1,slidesNavPosition:"top",css3:!0,scrollingSpeed:650,autoScrolling:!0,fitToSection:!0,scrollBar:!0,easing:"easeInOutCubic",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,normalScrollElements:".footer",scrollOverflow:!1,touchSensitivity:15,normalScrollElementTouchThreshold:5,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,controlArrows:!0,verticalCentered:!0,resize:!1,sectionsColor:["#0f0704","#0f0704","#0f0704","#0f0704"],paddingTop:"3em",paddingBottom:"10px",responsiveWidth:0,responsiveHeight:0,sectionSelector:".section",slideSelector:".slide",onLeave:function(e,o,a){},afterLoad:function(o,a){var n=window.mediaElement;1===a?e("play",n):e("pause",n),5===a?$("#features").fadeTo(250,.45):$("#features").fadeTo(250,1)},afterRender:function(){},afterResize:function(){},afterSlideLoad:function(e,o,a,n){},onSlideLeave:function(e,o,a,n,i){}}),$("#race .nav.nav-alliance li").on("mouseover",function(){a($(this).attr("data-race"),"alliance")}),$("#race .nav.nav-horde li").on("mouseover",function(){a($(this).attr("data-race"),"horde")}),$("#classes nav li").on("mouseover",function(){n($(this).attr("data-classes"))})});