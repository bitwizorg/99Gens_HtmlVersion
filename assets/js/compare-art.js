$(document).ready(function() {
    renderArtsInCompareBoard();
  });
  // Art Selection For Comparing
  $('.owl-carousel').on('click', '.carousel-item', function () {
    $(this).toggleClass('selected');
    if($('.carousel-container .carousel-item.selected').length > 2) {
      $(this).removeClass('selected');
    }
    // render arts in compare board
    renderArtsInCompareBoard();
  });
  
  function renderArtsInCompareBoard() {
    // render arts in compare board
    var selectedArts = $('.carousel-container .carousel-item.selected .art-img-item-wrapper');
    $('.art-wrapper').empty();
    $('.magnifying-result-container .result-img-container').empty();
    if(selectedArts.length > 0) {
      for(var i = 0; i < selectedArts.length; i++) {
        $('.art-wrapper').append(`
          <div class="art-img-item">
            <div class="art-img-item-wrapper">
              <div class="art-img-wrapper">
                <img class="art-img" src="${$(selectedArts[i]).find('img')[0].src}" alt="">
              </div>
              <div class="art-name">
                ${$(selectedArts[i]).find('.art-name').text()}
              </div>
            </div>
          </div>
        `);
      }
      // magnifying result
      for(var i = 0; i < selectedArts.length; i++) {
        $('.magnifying-result-container .result-img-container').append(`
          <div class="result-img">
            <div class="art-ele" style="background-image: url(${$(selectedArts[i]).find('img')[0].src})"></div>
          </div>
        `);
      }
    } else {
      $('.art-wrapper').append(`<span>There is no selected art.</span>`);
      // magnifying result
      $('.magnifying-result-container .result-img-container').append(`<span>There is no selected art.</span>`);
    }
    // 
    if(selectedArts.length < 2 
      || $('#compareContainer').hasClass('layered-side-by-side') 
      || $('#compareContainer').hasClass('side-by-side')) {
      $('.btn-toggle').hide();
      $('.art-wrapper').removeClass('toggled')
    } else {
      $('.btn-toggle').show();
    }
    // 
    if($('#compareContainer').hasClass('layered-toggle-view')) {
      if(selectedArts.length === 0) {
        $('#btnFullscreenToggle').hide();
      } else {
        $('#btnFullscreenToggle').show();
      }
    }
    if($('#compareContainer').hasClass('layered-side-by-side')) {
      initLayeredSideBySide();
      if(selectedArts.length === 0) {
        $('#btnFullscreenSideBySide').hide();
      } else {
        $('#btnFullscreenSideBySide').show();
      }
    }
  }
  
  // View Option Change Event
  $(document).on('change', '.view-option input[name=viewOption]', function() {
    hideMagnifyingResult();
    // uncheck all view options
    $('.view-options').find('input[value=layered-toggle-view], input[value=layered-side-by-side], input[value=magnify]').prop('checked', false);
    // check selected view option
    $('.view-options').find(`input[name=viewOption][value=${this.value}`).prop('checked', true);
    $('#compareContainer')[0].className = `${this.value}`;
    $('#fullscreenContent')[0].className = `${this.value}`;
    $('#fullScreenModal').removeClass('layered-toggle-view');
    $('#fullScreenModal').removeClass('layered-side-by-side');
    $('#fullScreenModal').removeClass('magnify');
    $('#fullScreenModal').addClass(this.value);
    if(this.value === 'layered-toggle-view') {
      renderArtsInCompareBoard();
      initLayeredToggleModal();
    }
    else if(this.value === 'layered-side-by-side') {
      initLayeredSideBySide();
      initSideBySideModal();
    } 
    else if(this.value === 'magnify') {
      renderArtsInCompareBoard();
      initMagnifyModal();
      // 
      $('#artWrapper').addClass('magnifying');
      $('.btn-toggle').hide();
      showMagnifyingResult();
    }
  });
  // 
  function initLayeredSideBySide() {
    var selectedArts = $('.carousel-container .carousel-item.selected .art-img-item-wrapper');
    if(selectedArts.length === 2) {
      $('.btn-toggle').hide();
      $('#artWrapper').beforeAfter({
        movable: true,
        clickMove: true,
      });
    } else {
      $('.art-wrapper').html(`<span>Requried 2 arts.</span>`);
    }
  }
  // 1. Layered Toggle View
  $(document).on('click', '.btn-toggle, .layered-toggle-view .art-img', function() {
    $('.art-wrapper').toggleClass('toggled');
    $('#fullscreenContent.layered-toggle-view .result-img-names').toggleClass('toggled');
    $('#fullscreenContent.layered-toggle-view .result-img-container').toggleClass('toggled');
  });
  // View Option2 Change Event
  function showMagnifyingResult() {
    // var magnifyingGlass = `<img class="magnifying-glass" src="assets/img/magnifying-glass-plus.svg" alt="">`;
    var magnifyingGlass = `<span class="magnifying-glass-icon"></span>`;
    // var pointDetector = `<div class="point-detector">
    //   <div class="top-left"></div>
    //   <div class="top-right"></div>
    //   <div class="center-center"></div>
    //   <div class="bottom-left"></div>
    //   <div class="bottom-right"></div>
    // </div>`;
    // $('#artWrapper .art-img-wrapper').append(pointDetector);
    $('#artWrapper .art-img-wrapper').append(magnifyingGlass);
    $('.carousel-container').hide();
    $('.magnifying-result-container').show();
  }
  function hideMagnifyingResult() {
    $('#artWrapper').removeClass('magnifying');
    // $('#artWrapper .art-img-wrapper .magnifying-glass').remove();
    $('#artWrapper .art-img-wrapper .magnifying-glass-icon').remove();
    $('.carousel-container').show();
    $('.magnifying-result-container').hide();
  }
  $(document).ready(function() {
    hideMagnifyingResult();
  });
  
  // Mangnifying Function
  $(document).on('touchstart', '#artWrapper .art-img-item', function(e) {
    $('body').css('overflow', 'hidden');
  });
  $(document).on('touchcancel touchend', '#artWrapper .art-img-item', function(e) {
    $('body').css('overflow', 'auto');
  });
  $(document).on('mousemove touchmove', '#artWrapper .art-img-item', function(e) {
    var wrapperX = $(this).offset().left - window.scrollX;
    var wrapperY = $(this).offset().top - window.scrollY;
    var artW = $('#artWrapper .art-img-item .art-img')[0].width;
    var artH = $('#artWrapper .art-img-item .art-img')[0].height;
    var mouseX = e.clientX || e.touches[0].clientX, mouseY = e.clientY || e.touches[0].clientY;
    // 
    var zoomPosX = mouseX - wrapperX, zoomPosY = mouseY - wrapperY;
    // var mgX = mouseX - wrapperX - 36, mgY = mouseY - wrapperY - 36;
    var mgX = mouseX - wrapperX - 40 / 2, mgY = mouseY - wrapperY - 40 / 2;
    // if(mgX > -66 / 2 && mgX < artW - 66 / 2) {
    if(mgX > -40 / 2 && mgX < artW - 40/ 2) {
      // $('#artWrapper .magnifying-glass').css({'left': mgX});
      $('#artWrapper .magnifying-glass-icon').css({'left': mgX});
    }
    // if(mgY > -70 / 2 && mgY < artH - 70 / 2) {
    if(mgY > -40 / 2 && mgY < artH - 40 / 2) {
      // $('#artWrapper .magnifying-glass').css({'top': mgY});
      $('#artWrapper .magnifying-glass-icon').css({'top': mgY});
    }
    $('.magnifying-result .art-ele').css({'background-position': `${100 * zoomPosX / artW}% ${100 * zoomPosY / artH}%`});
  });
  function getZoomValue() {
    var maxZoom = 8;
    var zoomStep = maxZoom / 100;
    var zoom = $('.slider-range, .slider-input').eq(0).val();
    if(zoom > 100) zoom = 100;
    if (zoom < 1) zoom = 1;
    var realZoom = 1 + zoomStep * (zoom - 1);
    return realZoom;
  }
  
  // FullScreen Modal
  function adjustFullscreenModalSize() {
    var sWidth = window.innerWidth, sHeight = window.innerHeight;
    if (sWidth > sHeight) {
      var mmW = $('#fullScreenModal').hasClass('magnify') ? sHeight : sHeight - 168;
      $('#fullScreenModal .modal-dialog').css({'max-width': `${mmW}px`});
    } else {
      $('#fullScreenModal .modal-dialog').css({'max-width': `100%`});
    }
  }
  function initLayeredToggleModal() {
    adjustFullscreenModalSize();
    // 
    var selectedArts = $('.carousel-container .carousel-item.selected .art-img-item-wrapper');
    $('#fullscreenContent .result-img-container').empty();
    $('#fullscreenContent .result-img-names').empty();
    if(selectedArts.length === 2) {
      for(var i = 0; i < selectedArts.length; i++) {
        $('#fullscreenContent .result-img-container').append(`
          <div class="art-img-item">
            <div class="art-img-wrapper">
              <img class="art-img" src="${$(selectedArts[i]).find('img')[0].src}" alt="">
            </div>
          </div>
        `);
      }
      // 
      for(var i = 0; i < selectedArts.length; i++) {
        $('#fullScreenModal .fullscreen-result .result-img-names').append(`
          <div class="art-name">${$(selectedArts[i]).find('.art-name').text()}</div>
        `);
      }
    } else {
      $('#fullscreenContent .result-img-container').append(`<span>Required 2 arts.</span>`);
    }
  }
  function initSideBySideModal() {
    adjustFullscreenModalSize();
    // 
    var selectedArts = $('.carousel-container .carousel-item.selected .art-img-item-wrapper');
    $('#fullscreenContent .result-img-container').empty();
    $('#fullscreenContent .result-img-names').empty();
    if(selectedArts.length === 2) {
      for(var i = 0; i < selectedArts.length; i++) {
        $('#fullscreenContent .result-img-container').append(`
          <img class="art-img" src="${$(selectedArts[i]).find('img')[0].src}" alt="">
        `);
      }
      // 
      for(var i = 0; i < selectedArts.length; i++) {
        $('#fullScreenModal .fullscreen-result .result-img-names').append(`
          <div class="art-name">${$(selectedArts[i]).find('.art-name').text()}</div>
        `);
      }
    } else {
      $('#fullscreenContent .result-img-container').append(`<span>Required 2 arts.</span>`);
    }
    $('#fullscreenContent .result-img-container').beforeAfter({
      movable: true,
      clickMove: true,
    });
  }
  function initMagnifyModal() {
    adjustFullscreenModalSize();
    // 
    var selectedArts = $('.carousel-container .carousel-item.selected .art-img-item-wrapper');
    $('#fullscreenContent .result-img-container').empty();
    $('#fullscreenContent .result-img-names').empty();
    if(selectedArts.length > 0) {
      for(var i = 0; i < selectedArts.length; i++) {
        $('#fullscreenContent .result-img-container').append(`
          <div class="result-img">
            <div class="art-ele" style="background-image: url(${$(selectedArts[i]).find('img')[0].src})"></div>
          </div>
        `);
      }
      // 
      for(var i = 0; i < selectedArts.length; i++) {
        $('#fullScreenModal .fullscreen-result .result-img-names').append(`
          <div class="art-name">${$(selectedArts[i]).find('.art-name').text()}</div>
        `);
      }
    } else {
      $('#fullScreenModal .fullscreen-result .result-img-container').append(`<span>There is no selected art.</span>`);
    }
    resizeZoomedImages();
  }
  $(document).on('click', '.btn-fullscreen', function() {
    var currentViewOption = $('#compareContainer')[0].className;
    if(currentViewOption === 'layered-toggle-view') {
      initLayeredToggleModal();
    } else if(currentViewOption === 'layered-side-by-side') {
      initSideBySideModal();
    } else if(currentViewOption === 'magnify') {
      initMagnifyModal();
    }
  });
  
  // Mangnifying Function In Fullscreen Mode
  $(document).on('touchstart', '#fullScreenModal .result-img', function(e) {
    $('body').css('overflow', 'hidden');
  });
  $(document).on('touchend', '#fullScreenModal .result-img', function(e) {
    $('body').css('overflow', 'auto');
  });
  $(document).on('mousemove touchmove', '#fullScreenModal .result-img', function(e) {
    var wrapperX = $(this).offset().left - window.scrollX;
    var wrapperY = $(this).offset().top - window.scrollY;
    var artW = $(this).find('.art-ele')[0].clientWidth;
    var artH = $(this).find('.art-ele')[0].clientHeight;
    var mouseX = e.clientX || e.touches[0].clientX, mouseY = e.clientY || e.touches[0].clientY;
    // 
    var zoomPosX = mouseX - wrapperX, zoomPosY = mouseY - wrapperY;
    var realZoom = getZoomValue();
    console.log('hi - ', realZoom);
    $('#fullScreenModal .fullscreen-result .art-ele').css({'background-position': `calc(${100 * zoomPosX / artW}% + ${8 * (realZoom - 1)}px) calc(${100 * zoomPosY / artH}% + ${8 * (realZoom - 1)}px)`});
  });
  
  // Zoom Slider Event
  $(document).on('input', '.slider-range, .slider-input', function() {
    var zoom = this.value;
    if(zoom > 100) zoom = 100;
    if (zoom < 1) zoom = 1;
    $('.slider-range, .slider-input').val(zoom);
    resizeZoomedImages();
  });
  function resizeZoomedImages() {
    var realZoom = getZoomValue();
    var sMZoomedImg = $('.magnifying-result .result-img-container .result-img .art-ele');
    var fMZoomedImg = $('.fullscreen-result .result-img-container .result-img .art-ele');
    sMZoomedImg.css({'background-size': `${realZoom * 100}% ${realZoom * 100}%`});
    fMZoomedImg.css({'background-size': `${realZoom * 100}% ${realZoom * 100}%`});
  }