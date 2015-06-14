"use strict";$(function(){function e(o,i){switch(o){case"play":i.play(),$(".glyphicon-play").toggleClass("glyphicon-pause").toggleClass("glyphicon-play"),$(".video-control").unbind("click").bind("click",function(){e("pause",i)});break;case"pause":i.pause(),$(".glyphicon-pause").toggleClass("glyphicon-pause").toggleClass("glyphicon-play"),$(".video-control").unbind("click").bind("click",function(){e("play",i)});break;case"stop":$(".mejs-poster mejs-layer").fadeIn()}}function o(e,i){var n=$(".glyphicon-volume-up,.glyphicon-volume-down,.glyphicon-volume-off");switch(n.removeClass("glyphicon-volume-up").removeClass("glyphicon-volume-down").removeClass("glyphicon-volume-off"),n.addClass("glyphicon-volume-"+e),e){case"up":i.setVolume(.5),$(".volume-control").unbind("click").bind("click",function(){o("off",i)});break;case"down":i.setVolume(.3),$(".volume-control").unbind("click").bind("click",function(){o("up",i)});break;case"off":i.setVolume(0),$(".volume-control").unbind("click").bind("click",function(){o("down",i)})}}function i(e,o){var i=$("#race article ."+e);TweenMax.set(i,{opacity:0,display:"block"}),TweenMax.to(i,.45,{opacity:1,ease:Linear.easeNone}),TweenMax.to(i.siblings(),.25,{opacity:0,ease:Linear.easeNone,onComplete:function(){i.siblings().removeClass("active");var n=$("#race .nav.nav-"+o+" li."+e).addClass("active");$("#race .nav.nav-alliance li").not(n).removeClass("active"),$("#race .nav.nav-horde li").not(n).removeClass("active"),TweenMax.set($("#race"),{backgroundImage:"url(images/race/"+e.replace(/horde[-]/gi,"")+"-bg.png)"})}})}function n(e){var o=$("#classes article ."+e);TweenMax.set(o,{opacity:0,display:"block"}),TweenMax.to(o,.45,{opacity:1,ease:Linear.easeNone}),TweenMax.to(o.siblings(),.25,{opacity:0,ease:Linear.easeNone,onComplete:function(){o.siblings().removeClass("active");var i=$("#classes nav li."+e).addClass("active");$("#classes nav li").not(i).removeClass("active")}})}$("video").mediaelementplayer({controls:!1,features:[],alwaysShowControls:!1,iPadUseNativeControls:!1,iPhoneUseNativeControls:!1,AndroidUseNativeControls:!1,startVolume:.2,loop:!0,ended:function(o){e("stop",o)},success:function(i){window.mediaElement=i,i.addEventListener("timeupdate",function(e){},!1),setTimeout(function(){i.play(),e("play",i),o("up",i)},100)}}),$(window).on("scroll resize",function(){$("#fullpage").width($(window).width()>1280?$(window).width():1280),$("#fullpage").height($(window).height()),$(".video-preview").width($(window).width()>1280?$(window).width():1280),$(".video-preview").height($(window).height())}).trigger("resize"),$("#fullpage").fullpage({menu:!1,navigation:!0,navigationPosition:"right",showActiveTooltip:!1,slidesNavigation:!1,slidesNavPosition:"top",css3:!0,scrollingSpeed:650,autoScrolling:!0,fitToSection:!0,scrollBar:!0,easing:"easeInOutCubic",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,normalScrollElements:".footer",scrollOverflow:!1,touchSensitivity:15,normalScrollElementTouchThreshold:5,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,controlArrows:!0,verticalCentered:!0,resize:!1,sectionsColor:["#000","#000","#000","#000"],paddingTop:"3em",paddingBottom:"10px",responsiveWidth:0,responsiveHeight:0,sectionSelector:".section",slideSelector:".slide",onLeave:function(e,o,i){},afterLoad:function(o,i){var n=window.mediaElement;1===i&&e("play",n),5===i?$("#feature").fadeTo(250,.6):$("#feature").fadeTo(250,1)},afterRender:function(){},afterResize:function(){},afterSlideLoad:function(e,o,i,n){},onSlideLeave:function(e,o,i,n,a){}}),$("#race .nav.nav-alliance li").on("click",function(){i($(this).attr("data-race"),"alliance")}),$("#race .nav.nav-horde li").on("click",function(){i($(this).attr("data-race"),"horde")}),$("#classes nav li").on("click",function(){n($(this).attr("data-classes"))})});