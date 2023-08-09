
// Accordation
$(document).ready(function() {
						   
	$('.menu-bar').click(function() {
		$('.menu-bar').removeClass('active');
		$('.nav-bar').slideUp(10);
		$('.overlay').removeClass('show');
		$('body').removeClass('hidden-body');
		if($(this).next().is(':hidden') == true) {
			$(this).addClass('active');
			$(this).next().slideDown(10);
			$('.overlay').addClass('show');
			$('body').addClass('hidden-body');
		}
	});
	
});


// Custom Codes
$(document).ready(function() {			
	
	$('input,textarea').focus(function(){
		$(this).data('placeholder',$(this).attr('placeholder')).attr('placeholder','');
	}).blur(function(){
		$(this).attr('placeholder',$(this).data('placeholder'));
	});
	
});


// images came from prompt api in choose-art page
$(document).ready(function(){
	if (window.location.href.indexOf("choose") > -1) {
		if (localStorage.getItem('prompt') != null){
			var str = localStorage.getItem('prompt')
		} else {
			str = 'cyber punk'
		}
		$('.image_art').each(function(i, obj) {
			fetch("http://54.173.169.111/api/diffusion/generate?prompt="+ str).then((response) => response.json())
			.then((data) => {
				console.log(data)
				if (data && data.status) {
					localStorage.setItem('job_id',data.id)
						let image = document.querySelector('#image_art'+i);
						image.src = data.images[0];		
				}
			});
		});
				
		localStorage.removeItem('prompt',null)
		// console.log(divStr);
	   }
       //function for compare art
	   if (window.location.href.indexOf("compare") > -1) {
		// console.log(localStorage.getItem('mergify'))
		
		if (localStorage.getItem('mergify') != null){
			
			var storedImages = JSON.parse(localStorage.getItem("mergify"));
			// var imgArrLen = storedImages.length
			
			// var objLen = $('.carousel-item').length;
			$('.carousel-item').each(function(i, obj){
				
				if(storedImages[i] !== undefined) {
				    imgObj = $(obj).find('.art-img')
					imgObj.attr("src", storedImages[i]['upscaled']);
					imgObj.attr('alt', storedImages[i]['original']);
					
				}else{
					obj.remove();
				}
				});
    		}
	   } 
	   if (window.location.href.indexOf("select-merch") > -1) {
		// console.log(localStorage.getItem('mergify'))
		
		if (localStorage.getItem('mergify') != null){
			
			var storedImages = JSON.parse(localStorage.getItem("mergify"));
			// var imgArrLen = storedImages.length
			
			// var objLen = $('.carousel-item').length;
			$('.figure').each(function(i, obj){
				
				if(storedImages[i] !== undefined) {
				    imgObj = $(obj).find('.art-imgaes')
					imgObj.attr("src", storedImages[i]['upscaled']);
					imgObj.attr('alt', storedImages[i]['original']);
					
				}else{
					obj.remove();
				}
				});
    		}
	   } 
});



// Image Zoom
/*
$(document).ready(function() {
	
	$('.show').zoomImage();
	$('.show-small-img:first-of-type').css({'border': 'solid 2px #5757FF', 'opacity': '1', 'padding': '0'})
	$('.show-small-img:first-of-type').attr('alt', 'now').siblings().removeAttr('alt')
	$('.show-small-img').click(function () {
	  $('#show-img').attr('src', $(this).attr('src'))
	  $('#big-img').attr('src', $(this).attr('src'))
	  $(this).attr('alt', 'now').siblings().removeAttr('alt')
	  $(this).css({'border': 'solid 2px #5757FF', 'opacity': '1', 'padding': '0'}).siblings().css({'border': 'none', 'opacity': '1', 'padding': '0'})
	  if ($('#small-img-roll').children().length > 4) {
		if ($(this).index() >= 3 && $(this).index() < $('#small-img-roll').children().length - 1){
		  $('#small-img-roll').css('left', -($(this).index() - 2) * 106 + 'px')
		} else if ($(this).index() == $('#small-img-roll').children().length - 1) {
		  $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 106 + 'px')
		} else {
		  $('#small-img-roll').css('left', '0')
		}
	  }
	});
		
	$('#next-img').click(function (){
	  $('#show-img').attr('src', $(".show-small-img[alt='now']").next().attr('src'))
	  $('#big-img').attr('src', $(".show-small-img[alt='now']").next().attr('src'))
	  $(".show-small-img[alt='now']").next().css({'border': 'solid 2px #5757FF', 'opacity': '1', 'padding': '0'}).siblings().css({'border': 'none', 'opacity': '1', 'padding': '0'})
	  $(".show-small-img[alt='now']").next().attr('alt', 'now').siblings().removeAttr('alt')
	  if ($('#small-img-roll').children().length > 4) {
		if ($(".show-small-img[alt='now']").index() >= 3 && $(".show-small-img[alt='now']").index() < $('#small-img-roll').children().length - 1){
		  $('#small-img-roll').css('left', -($(".show-small-img[alt='now']").index() - 2) * 106 + 'px')
		} else if ($(".show-small-img[alt='now']").index() == $('#small-img-roll').children().length - 1) {
		  $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 106 + 'px')
		} else {
		  $('#small-img-roll').css('left', '0')
		}
	  }
	});
	
	$('#prev-img').click(function (){
	  $('#show-img').attr('src', $(".show-small-img[alt='now']").prev().attr('src'))
	  $('#big-img').attr('src', $(".show-small-img[alt='now']").prev().attr('src'))
	  $(".show-small-img[alt='now']").prev().css({'border': 'solid 2px #5757FF', 'opacity': '1', 'padding': '0'}).siblings().css({'border': 'none', 'opacity': '1', 'padding': '0'})
	  $(".show-small-img[alt='now']").prev().attr('alt', 'now').siblings().removeAttr('alt')
	  if ($('#small-img-roll').children().length > 4) {
		if ($(".show-small-img[alt='now']").index() >= 3 && $(".show-small-img[alt='now']").index() < $('#small-img-roll').children().length - 1){
		  $('#small-img-roll').css('left', -($(".show-small-img[alt='now']").index() - 2) * 106 + 'px')
		} else if ($(".show-small-img[alt='now']").index() == $('#small-img-roll').children().length - 1) {
		  $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 106 + 'px')
		} else {
		  $('#small-img-roll').css('left', '0')
		}
	  }
	});
		
});

// Image Zoom
$(window).on("load", function () {	
	
	$(".show-small-img:first-child").trigger("click");
		
});
*/


// Select
(function($) {
// Color the empty select
$.fn.selectColored = function(options) {
	var defaults = {
		def        : -1,
		classSel   : 'colorize',
		classEmpty : 'empty',
		classDef   : 'def'
	};
	// extend default options with those provided
	var opts = $.extend(defaults, options);

	// implementation code
	return this.each(function() {
		var $select = $(this);
		$select
			.addClass(opts.classSel)
			.find('option[value="' + opts.def + '"]')
			.addClass(opts.classDef);

		function color() {
			$select.toggleClass(opts.classEmpty, ($select.val() == opts.def));
		}

		$select.bind('change', function() {
			color();
		});

		// initialize
		color();
	});
};// end plugin definition
})(jQuery);
$(document).ready(function() {
	$('select').selectColored();
});
