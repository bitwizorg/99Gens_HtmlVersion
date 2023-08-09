// $(document).ready(function() {
//     var pMsg1 = 'Generating print files and mockups...';
//     var pMsg2 = 'Waiting to be pushed to your store...';
//     $('.progress-message').text(pMsg1);
//     setTimeout(function() {
//         $('.progress-message').text(pMsg2);
//     }, 5000);
//     // 
//     startProgressBar();
//     setTimeout(function() {
//         stopProgressBar();
//     }, 10000);
// });

var progressInterval;
function startProgressBar() {
    $('.product-progress').show();
    var progressBarWrapperWidth = $('.progress-bar').width();
    progressInterval = setInterval(function() {
        var oldLeft = $('.progress-bar .progress-indicator').position().left;
        if(oldLeft > progressBarWrapperWidth) {
            $('.progress-bar .progress-indicator').css({'left': `${-1 * progressBarWrapperWidth}px`})
        } else {
            $('.progress-bar .progress-indicator').css({'left': `${oldLeft + 1}px`})
        }
    }, 1);
}
function stopProgressBar() {
    $('.product-progress').hide();
    clearInterval(progressInterval);
}