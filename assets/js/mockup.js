/****************************************
 * Generating Mockup CSS *
*****************************************/ 
var mockupParams;
// - mockup-tab select
$(document).ready(function() {
  renderFrontMockup();
  initScaleSlider();
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

$(document).ready(function() {			
	
	$('input,textarea').focus(function(){
		$(this).data('placeholder',$(this).attr('placeholder')).attr('placeholder','');
	}).blur(function(){
		$(this).attr('placeholder',$(this).data('placeholder'));
	});
  let imgs = localStorage.getItem('image_resize')
  console.log(imgs)
  const img = document.createElement("img");
    img.classList.add("mockup-img");
 
    console.log(img)
    $('.mockup-design').html(img);
    img.src = imgs
    console.log(img.naturalWidth)
    generateMockupHandler(img.naturalWidth, img.naturalHeight);
        $('.upload-design').hide();
	
});


$(document).on('click', '.mockup-tab', function() {
  // save the mockup work
  saveMockupDesign();
  // clear the old work
  clearMockupDesign();
  // 
  $('.mockup-tab').removeClass('active');
  $(this).addClass('active');
  switch($(this).data('id')) {
    case 'front' :
      renderFrontMockup();
      break;
    case 'top' :
      renderTopMockup();
      break;
    case 'bottom' :
      renderBottomMockup();
      break;
    case 'inside' :
      renderInsideMockup();
      break;
    default : break;
  }
  // remember the mockup
  rememberMockupDesign(this);
  console.log('saved params - ', mockupParams);
});
function saveMockupDesign() {
  var orgPart = $('.mockup-tab.active');
  // save mockup
  if(!$('.mockup-handler').length) {
    return;
  }
  var width = $('.mockup-handler')[0].style.width;
  var height = $('.mockup-handler')[0].style.height;
  var left = $('.mockup-handler')[0].style.left;
  var top = $('.mockup-handler')[0].style.top;
  var transform = $('.mockup-handler')[0].style.transform;
  var param = {
    ...mockupParams[orgPart.data('id')],
    width: width,
    height: height,
    left: left,
    top: top,
    transform: transform
  };
  mockupParams = {...mockupParams, [orgPart.data('id')]: param};
}
function clearMockupDesign() {
  $('.upload-design').show();
  $('.mockup-img').remove();
  $('.mockup-design-over').remove();
}
function rememberMockupDesign(part) { // part: design part of product
  var selectedPart = $(part).data('id');
  var param = mockupParams ? mockupParams[selectedPart] : '';
  if(!param) {
    return;
  }
  // remember mockup
  // - remember file
  if(param && param.file && param.src) {
    const img = document.createElement("img");
    img.classList.add("mockup-img");
    img.file = param.file;
    img.src = param.src;
    img.style.width = param.width;
    img.style.height = param.height;
    img.style.left = param.left;
    img.style.top = param.top;
    img.style.transform = param.transform;
    $('.mockup-design').html(img);
  }
  // remember mockup handler
  var mockupHandler = `
    <div class="mockup-design-over">
      <div class="box mockup-handler" id="mockupHandler"
        style="width: ${param.width}; height: ${param.height}; left: ${param.left}; top: ${param.top}; transform: ${param.transform};"
      >
      </div>
    </div>
  `;
  $('.mockup-design-over').remove();
  $('.generator-mockup').append(mockupHandler);
  // 
  initBoxModeling();
  $('.upload-design').hide();
  // 
  initScaleSlider();
}
// 
var generatorMockup = $('.generator-mockup');
// 
function renderFrontMockup() {
  var mockupContent = `
    <div class="backpack-mockup front">
      <img src="assets/mockup/backpack/front.png" alt="" />
      <span class="safe-print-area-top">Safe Print Area</span>
      <span class="safe-print-area-bottom">Safe Print Area</span>
      <span class="front-top">Front top</span>
      <span class="fold-line">Fold line</span>
      <span class="front-pocket">Front Pocket</span>
      <span class="placement-on-product">Placement on product</span>
    </div>
  `;
  $('.backpack-mockup').remove();
  generatorMockup.append(mockupContent);
}
// 
function renderTopMockup() {
  var mockupContent = `
    <div class="backpack-mockup top">
      <img src="assets/mockup/backpack/top.png" alt="" />
      <span class="safe-print-area-top">Safe Print Area</span>
      <span class="safe-print-area-bottom">Safe Print Area</span>
      <span class="placement-on-product">Placement on product</span>
    </div>
  `;
  $('.backpack-mockup').remove();
  generatorMockup.append(mockupContent);
}
// 
function renderBottomMockup() {
  var mockupContent = `
    <div class="backpack-mockup bottom">
      <img src="assets/mockup/backpack/bottom.png" alt="" />
      <span class="safe-print-area-bottom">Safe Print Area</span>
      <span class="placement-on-product">Placement on product</span>
    </div>
  `;
  $('.backpack-mockup').remove();
  generatorMockup.append(mockupContent);
}
// 
function renderInsideMockup() {
  var mockupContent = `
    <div class="backpack-mockup inside">
      <img src="assets/mockup/backpack/inside.png" alt="" />
      <span class="safe-print-area-bottom">Safe Print Area</span>
      <span class="placement-on-product">Placement on product</span>
    </div>
  `;
  $('.backpack-mockup').remove();
  generatorMockup.append(mockupContent);
}

// - Upload Design
$(document).on('click', '.btn-upload', function(){
 
  $('.upload-file').click();
});
$(document).on('change', '.upload-file', function(e){
  
  if(this.files.length > 0) {
    const file = this.files[0];
    // 
    const img = document.createElement("img");
    img.classList.add("mockup-img");
    img.file = file;
    
    $('.mockup-design').html(img);
    // 
    const reader = new FileReader();
    reader.onload = (e) => { 
      img.src = e.target.result; 
      // 
      var image = new Image();
      image.onload = function (imageEvent) {
        var width = image.width,
            height = image.height;
        // save choosen file
        mockupParams = {
          ...mockupParams,
          [$('.mockup-tab.active').data('id')]: {
            originWidth: width,
            originHeight: height,
            whRatio: Math.round(width * 100 / height) / 100,
            file: file,
            src: e.target.result
          }
        };
        // generate mockup handler
        generateMockupHandler(width, height);
        $('.upload-design').hide();
      }
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
    // 
  }
});
// 
function generateMockupHandler(width, height) {
  initScaleSlider();
  var mockup = $('.mockup-img');
  var mockupHandler = ``;
  if(width > height) {
    mockupHandler = `
    <div class="mockup-design-over">
      <div class="box mockup-handler" id="mockupHandler"
      style="width: ${mockup.width()}px; height: ${Math.round(mockup.width() * (height / width))}px"
      >
      </div>
    </div>
    `;
    // sync mockup img
    $('.mockup-img').css({
      width: `${mockup.width()}px`,
      height: `${Math.round(mockup.width() * (height / width))}px`
    });
  } else {
    mockupHandler = `
    <div class="mockup-design-over">
      <div class="box mockup-handler" id="mockupHandler"
      style="height: ${mockup.width()}px; width: ${Math.round(mockup.width() * (width / height))}px"
      >
      </div>
    </div>
    `;
    // sync mockup img
    $('.mockup-img').css({
      height: `${mockup.width()}px`,
      width: `${Math.round(mockup.width() * (width / height))}px`
    });
  }
  $('.mockup-design-over').remove();
  $('.generator-mockup').append(mockupHandler);
  $('.scale-slider').val(1);
  // 
  initBoxModeling();
}

function initBoxModeling() {
  $('.mockup-handler').boxModeling({
    rotate: true,
    resize: true,
    move: true,
    syncSelector: 'mockup-img',
  });
}

// Scale Slider Event
function initScaleSlider() {
  if($('.mockup-img')[0]) {
    $('.designer-toolbar').show();
  } else {
    $('.designer-toolbar').hide();
  }
}
function scaleHander(scale) {
  var initW = $('.mockup-img').width(), 
    initH = $('.mockup-img').height();
  var orgWH = $('.mockup-design').width();
  if(initW > initH) {
    $('.mockup-handler, .mockup-img').css({
      width: `${orgWH * scale}px`,
      height: `${orgWH * (initH / initW) * scale}px`
    });
  } else {
    $('.mockup-handler, .mockup-img').css({
      width: `${orgWH * (initW / initH) * scale}px`,
      height: `${orgWH * scale}px`
    });
  }
}

$(document).on('input', '.scale-slider', function(e) {
  var scale = e.target.value;
  // 
  scaleHander(scale);
});

$(document).on('click', '.scale-button', function(e) {
  var scaleSlider = $(this).parents().find('.scale-slider');
  var scale = Number(scaleSlider.val());
  if($(this).hasClass('plus') && scaleSlider.val() < 2) {
    scale += 0.01;
  }
  if($(this).hasClass('minus') && scaleSlider.val() > 0.1) {
    scale -= 0.01;
  }
  scaleSlider.val(scale);
  scaleHander(scale);
});