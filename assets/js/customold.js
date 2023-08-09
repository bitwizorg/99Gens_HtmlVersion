
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


$(document).ready(function(){

	
	if (window.location.href.indexOf("choose") > -1) {
		if (localStorage.getItem('prompt') != null){
			var str = localStorage.getItem('prompt')
		}else{
			str = 'cyber punk'
		}
		
		
		
		$('.image_art').each(function(i, obj) {

				let image = document.querySelector('#image_art'+i);
				fetch("http://52.207.235.77/api/diffusion/generate?prompt="+ str)
				.then((response) => response.blob())
				.then((blob) => {
  				let objectURL = URL.createObjectURL(blob);
				console.log(objectURL);
  				image.src = objectURL;
				// divStr += '<div class="col-md-4"><a href="#" class="box"> <div class="figure"><img class="image_art" src="'+objectURL+'" alt="art-5" /></div> <div class="aside"></div></a></div>'

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
					
					imgObj.attr("src", storedImages[i]);
					
				}else{
					obj.remove();
				}
				


				});
    		}
	   } 
});