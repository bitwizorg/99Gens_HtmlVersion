//helper function 
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


// api for rudalle upscale image 3rd step
function merchfiyIt(){
  var conceptName = $(".selected").find('.figure img');
  // $('.art-image').find(":selected").text()
  const arrImg = []
  $.each( conceptName, function( key, value ) {
    arrImg.push(value.src);
});
$('.new_gif').css('display','flex');
  dataPostRequest = {
    "id": localStorage.getItem('job_id'),
    "images": arrImg
  }
  console.log(dataPostRequest);
  const merchifyArr = []
  postData('http://54.173.169.111/api/rudalle/upscale2x', dataPostRequest)
  .then((data) => {
    if (data && data.status){
      $.map( data.images, function( val, i ) {
        if (val.status == 'succeeded'){
          merchifyArr.push({
            "id_val":i ,
            "original":val.original,
            "upscaled":val.upscaled
        })
        }
      });
      localStorage.setItem('mergify',JSON.stringify(merchifyArr))

    }
    
  window.location.href = 'select-merch.html'
  }); 
}

function resizeIt(){

  var createItImageObj = $(".selected").find('.art-img-wrapper img');
  //check length of object if greater than 1 then return false
  if(createItImageObj.length > 1){
    alert('Cannot select More than one Image')
    return false
  }else{
    $('.new_gif').css('display','flex');
    imgUrl = createItImageObj.attr('alt')

    localStorage.setItem('image_resize', imgUrl)
    window.location.href = 'mockup.html'
  }

}
// api for printfull to return backpacks
function createIt(){

  // var createItImageObj = $(".selected").find('.art-img-wrapper img');
  //check length of object if greater than 1 then return false
  // if(createItImageObj.length > 1){
  //   alert('Cannot select More than one Image')
  //   return false
  // }else{
    $('.new_gif').css('display','flex');
    imgUrl = localStorage.getItem('image_resize')
    // let base64image = getBase64Image(imgUrl);
    this.getBase64ImageFromUrl(imgUrl, function(){
      // console.log(result)
      var settings = {
        "url": "http://54.173.169.111/api/printful/create_task",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "image": imgUrl,
          "id": localStorage.getItem('job_id')

        }),
      };
      data_key = ''
      $.ajax(settings).done(function (response) {
   
        if (response && response.status) {
          const { result } = response.que
          console.log(result.task_key)

          data_key = result.task_key
          //ajax call for printful
          // document.getElementById('').style.display = "none";
          // document.getElementById('').style.display = "none";
          // document.getElementById('').style.display = "block";
          // $('#image_file_input').css('display','block');
          // $('#my_image').css('display','none');
          
          // $('.new_gif').css('display','block');
          // $('body').css('background','black');
          // $('#createItBtn').remove()
          
          // document.getElementById('body').style.backgroundColor = "black";

          setTimeout(
            function () {
              redirectToBagPack(data_key)
            }, 10000);

        } else {
          return data_key
        }

      });
    });
  //   const arrImgArt = []
  //   $.each( createItImageObj, function( key, value ) {
  //     console.log(value)
  //     arrImgArt.push(value.src);
  // });
  }



function getBase64ImageFromUrl(imgUrl, callback) {

  var img = new Image();

  // onload fires when the image is fully loadded, and has width and height

  img.onload = function(){

    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png"),
        dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
   
    callback(dataURL); // the base64 string

  };
  console.log(img)
  // set attributes and src 
  img.setAttribute('crossOrigin', 'anonymous'); //
  img.src = imgUrl;

}
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#my_image').attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
    getBase64(input.files[0]).then(function (result) {
      $('.new_gif').css('display','flex');

      splitDataString = result.replace(/^data:image\/[a-z]+;base64,/, "");
      return splitDataString;

    }).then(function (result) {
      let data;
      // console.log(result)
      var settings = {
        "url": "http://52.207.235.77/api/crop",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "image": result

        }),
      };
      data_key = ''
      $.ajax(settings).done(function (response) {

        if (response && response.status) {
          const { result } = response.que
          console.log(result.task_key)

          data_key = result.task_key
          //ajax call for printful
          // document.getElementById('').style.display = "none";
          // document.getElementById('').style.display = "none";
          // document.getElementById('').style.display = "block";
          $('#image_file_input').css('display','block');
          // $('#my_image').css('display','none');
          $('.new_gif').css('display','flex');
          // $('body').css('background','black');
          
          // document.getElementById('body').style.backgroundColor = "black";

          setTimeout(
            function () {

              ajaxphp(data_key)
            }, 10000);

        } else {
          return data_key
        }

      });

    });

  }
}


// this comes after printfull/create_task api
function redirectToBagPack(str) {

  var settings = {
    "url": "http://54.173.169.111/api/printful/status?task_key="+str+"&id="+localStorage.getItem('job_id'),
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    // "headers": {
    //   "Authorization": "Basic aG96ZnJ1eWQtMWRrZC1jZjMxOnhxMjktcW41bnNpdmJhcXp3",
    //   'Access-Control-Allow-Origin': "https://api.printful.com"
    // },
  };

  $.ajax(settings).done(function (response) {
    // const obj = JSON.parse(response)
    // alert(response)
    if (response && response.code == 200) {
      console.log(response.result)

      if (response.result && response.result.status == 'completed'){
        const result = response.result.mockups
        const images = []
        $.map( result, function( val, i ) {
          // console.log(val.placement)
          images.push(val.mockup_url)
        });
        localStorage.setItem('bag_pack',JSON.stringify(images))
        localStorage.removeItem("job_id");
        localStorage.removeItem("mergify");
        localStorage.removeItem("image_resize");
        window.location.href = 'all-over-print-backpack.html'
      }else{
        alert("somthing went wrong!")
        localStorage.clear();
        window.location.href = 'staging.html'


      }
      // document.getElementById('').style.display = "block";
      // document.getElementById('new_gif').style.display = "none";
      // document.getElementById('').style.display = "block";
      
      // const images = []
      // images.push(result.front_url)
      // images.push(result.top_url)
      // images.push(result.bottom_url)
      // localStorage.setItem('bacg_pack',JSON.stringify(images))
      // // document.getElementById('front_bagpack').src = front_url_fetched
      // // document.getElementById('top_bagpack').src = top_url_fetched
      // // document.getElementById('bottom_bagpack').src = bottom_url_fetched
      // window.location.href = 'all-over-print-backpack.html'


      // $('.new_gif').css('display','none');
      // $('#response_resultsV2').css('display','block');
      // $('#compareContainer').remove()
      // $('.carousel-container').remove()
      // $('.magnifying-result-container').remove()
      // $('#fullScreenModal').remove()
      
      // $('body').css('background','white');

     
      // document.getElementById('queue_id').textContent =  result.task_key && result.task_key
      // document.getElementById('queue_id').textContent =  result.task_key && result.task_key


    }
  });
}





function ajaxphp(str) {

  var settings = {
    "url": "action.php?task_key=" + str,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "headers": {
      "Authorization": "Basic aG96ZnJ1eWQtMWRrZC1jZjMxOnhxMjktcW41bnNpdmJhcXp3",
      'Access-Control-Allow-Origin': "https://api.printful.com"
    },
  };

  $.ajax(settings).done(function (response) {
    const obj = JSON.parse(response)
    // alert(response)
    if (obj && obj.status) {
      // document.getElementById('').style.display = "block";
      // document.getElementById('new_gif').style.display = "none";
      // document.getElementById('').style.display = "block";

      $('#heading').css('display','block');
      $('.new_gif').css('display','none');
      $('#response_results').css('display','block');
      $('body').css('background','white');

      const result = obj.data

      front_url_fetched = result.front_url
      top_url_fetched = result.top_url
      bottom_url_fetched = result.bottom_url
      document.getElementById('front_bagpack').src = front_url_fetched
      document.getElementById('top_bagpack').src = top_url_fetched
      document.getElementById('bottom_bagpack').src = bottom_url_fetched
      // document.getElementById('queue_id').textContent =  result.task_key && result.task_key
      // document.getElementById('queue_id').textContent =  result.task_key && result.task_key


    }
  });


}


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


// staging.html prompt api
function generateArtImage(){
  str =  document.getElementById('commentsart2').value; 
  if(str ==''){
    $("#error_create_art").text("Please descibe your thought!");
     return false
  }else{
    // $.redirect('choose-art.html', {'prompt': str});
    localStorage.setItem('prompt', str)

    window.location.href = 'choose-art.html'
  }
}
