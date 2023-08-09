/* Choose Art JS */

// Select Art Image
$(document).on('click', '#artContainer .box', function(e) {
    $(this).toggleClass('selected');
    var orderNum = $('#artContainer .selected').length;
    if($(this).hasClass('selected')) {
        $(this).find('.aside').html(`<div class="number">${orderNum}</div>`);
        $(this).find('.figure img').css('transform', 'scale(1.1)');
    } else {
        var clickedNum = $(this).find('.number').text();
        $(this).find('.aside').empty();
        // ReOrder the Number of Art
        var selectedArts = $('#artContainer .selected');
        selectedArts.each(function() {
            var oldNum = Number($(this).find('.number').text());
            if(oldNum > clickedNum) {
                $(this).find('.number').text(Number(oldNum - 1));
            }
        });
        $(this).find('.figure img').css('transform', 'scale(1.0)');
    }
});

// 
$(document).on('mouseover', '#artContainer .box', function(e) {
    $(this).find('.figure img').css('transform', 'scale(1.1)');
});
$(document).on('mouseout', '#artContainer .box', function(e) {
    if(!$(this).hasClass('selected')) {
        $(this).find('.figure img').css('transform', 'scale(1.0)');
    }
});

// Temporarily - See More function
$(document).on('click', '#btnSeeMore', function() {
    if($('#artContainer').hasClass('select-merch')) {
        for (var i = 7; i < 12; i++) {
            $('#artContainer').append(`<div class="col-md-4">
                <a href="#" class="box">
                    <div class="figure">
                    <img src="assets/img/art-${i}.png" alt="art-${i}" />
                    </div>
                    <div class="aside">
                    </div>
                </a>
            </div>`);
        }
    } else {
        for (var i = 1; i < 6; i++) {
            $('#artContainer').append(`<div class="col-md-4">
                <a href="#" class="box">
                    <div class="figure">
                    <img src="assets/img/art-${i}.png" alt="art-${i}" />
                    </div>
                    <div class="aside">
                    </div>
                </a>
            </div>`);
        }
    }
});