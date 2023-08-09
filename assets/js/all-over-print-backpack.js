$(document).ready(function() {
    var retrievedData = localStorage.getItem("bag_pack");
    var dataArray = JSON.parse(retrievedData);
    document.getElementById('show-img').src = dataArray[0]
    document.getElementById('img_one').src = dataArray[0]
    document.getElementById('img_two').src = dataArray[1]
    document.getElementById('img_three').src = dataArray[2]



});

function changesrc(_src)
{
    document.getElementById('show-img').src = _src
}
