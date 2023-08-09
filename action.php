<?php 
//trigger exception in a "try" block
try {
$url = 'https://api.printful.com/mockup-generator/task?task_key='.$_GET['task_key'];


$curl = curl_init();
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Authorization: Basic aG96ZnJ1eWQtMWRrZC1jZjMxOnhxMjktcW41bnNpdmJhcXp3'

));
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HEADER, false);
 
$data = curl_exec($curl);




if (curl_errno($curl)) {
    $error_msg = curl_error($curl);


    
}
curl_close($curl);

if (isset($error_msg)) {
    echo json_encode(["status"=>false,"message"=>$error_msg]);
    die();
}else{
    $front_url ='';
    $top_url = '';
    $bottom_url =  '';
    $d = json_decode($data,true);
    foreach($d['result']['mockups'] as $d){
        if ($d['placement'] == 'front'){
            $front_url = $d['mockup_url'];
        }
        if ($d['placement'] == 'top'){
            $top_url = $d['mockup_url'];
        }
        if ($d['placement'] == 'bottom'){
            $bottom_url = $d['mockup_url'];
        }
    }
    $data_array = ['status' => true,'data' =>['front_url' => $front_url,'top_url' => $top_url,'bottom_url' => $bottom_url]];
    echo json_encode($data_array);
    die();
}

}//catch exception
catch(Exception $e) {
  
echo json_encode(["status"=>false,"message"=>$e->getMessage()]);
die();
}

?>
