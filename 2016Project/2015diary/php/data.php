<?php
require  $_SERVER['DOCUMENT_ROOT'].'/lib/medoo.php';
$deviceId = $_GET["deviceid"];
$empty =  array("device" => $deviceId, "play_count" => 0, "play_day" => 0, "play_total_time" => 0, "play_order" => 0, "m1" => 0, "m2" => 0, "m3" => 0, "m4" => 0,"m5" => 0);
if (!$deviceId || !is_numeric($deviceId)) {
	calData($empty);
	echo json_encode($empty);
	return;
}

$mem  = new Memcache();
$mem->addServer('10.121.89.222', 50008);
$content = $mem->get("new3_".$deviceId);
if ($content) {
	//$obj = json_decode($content);
	//$obj["cache"] = true;
	echo $content;
	return;
}
/*
if( $mem->add("mystr","this is a memcache test!",3600)){
    echo  '原始数据缓存成功!';
}else{
    echo '数据已存在：'.$mem->get("mystr");
}
*/
/*
$test =  array("device" => $deviceId, "play_count" => 0, "play_day" => 0, "play_total_time" => 0, "play_order" => 0, "m1" => 1, "m2" => 2, "m3" => 3, "m4" => 0,"m5" => 0);
*/
function calData(&$data) {
	$temp = array();
	calStar($data, "m1", $temp);
	calStar($data, "m2", $temp);
	calStar($data, "m3", $temp);
	calStar($data, "m4", $temp);
	calStar($data, "m5", $temp);
	$maxStar = count($temp);
	krsort($temp);
	$star = $maxStar;
	foreach ($temp as $key => $value) {
		for($i = 0 ; $i < count($value); $i++) {
			if ($star == $maxStar) {
				 $data["result"] = substr($value[$i], -1);    
			}
			$data[$value[$i]] = $star;
		}
		$star--;
	}
	if ($data["play_day"] == 0) {
		if ($data["play_count"] > 0 ) {
			$data["play_day"] = ceil($data["play_count"] / 3);
		}
	}
	if ($data["play_count"] == 0) {
		if ($data["play_day"] > 0 ) {
			$data["play_count"] = $data["play_day"] * 3;
		}
	}
	$playCount = $data["play_count"];
	if ($playCount == 0) {
		$data["percentage"] = "0%";
	}
	if ($playCount > 0 && $playCount <= 5) {
		$data["percentage"] = "4%";
	}
	if ($playCount >= 6 && $playCount <= 10) {
		$data["percentage"] = "8%";
	}
	if ($playCount >= 11 && $playCount <= 20) {
		$data["percentage"] = "10%";
	}
	if ($playCount >= 21 && $playCount <= 30) {
		$data["percentage"] = "15%";
	}
	if ($playCount >= 31 && $playCount <= 50) {
		$data["percentage"] = "20%";
	}
	if ($playCount >= 31 && $playCount <= 50) {
		$data["percentage"] = "20%";
	}
	if ($playCount >= 51 && $playCount <= 100) {
		$data["percentage"] = "30%";
	}
	if ($playCount >= 101 && $playCount <= 200) {
		$data["percentage"] = "40%";
	}
	if ($playCount >= 201 && $playCount <= 500) {
		$data["percentage"] = "50%";
	}
	if ($playCount >= 501 && $playCount <= 1000) {
		$data["percentage"] = "60%";
	}
	if ($playCount >= 1001 && $playCount <= 2000) {
		$data["percentage"] = "70%";
	}
	if ($playCount >= 2001 && $playCount <= 5000) {
		$data["percentage"] = "80%";
	}
	if ($playCount >= 5001 && $playCount <= 10000) {
		$data["percentage"] = "83%";
	}
	if ($playCount >= 10001 && $playCount <= 20000) {
		$data["percentage"] = "85%";
	}
	if ($playCount >= 20001) {
		$data["percentage"] = "90%";
	}
	$scores = array();
	if ($data["m1"] < 3) {
		$data["m1"] += 2;
		if ($data["m".$data["result"]] < 5) {
	 		$data["m".$data["result"]] += 1;
		}
	}
	$score = array();
	$score["value"] = $data["m1"];
	$score["txt"] = "故事";
	array_push ($scores ,$score);
	if ($data["m2"] < 3) {
		$data["m2"] += 2;
		if ($data["m".$data["result"]] < 5) {
	 		$data["m".$data["result"]] += 1;
		}
	}
	$score = array();
	$score["value"] = $data["m2"];
	$score["txt"] = "动画";
	array_push ($scores ,$score);
	if ($data["m3"] < 3) {
		$data["m3"] += 2;
		if ($data["m".$data["result"]] < 5) {
	 		$data["m".$data["result"]] += 1;
		}
	}
	$score = array();
	$score["value"] = $data["m3"];
	$score["txt"] = "外语";
	array_push ($scores ,$score);
	if ($data["m4"] < 3) {
		$data["m4"] += 2;
		if ($data["m".$data["result"]] < 5) {
	 		$data["m".$data["result"]] += 1;
		}
	}
	$score = array();
	$score["value"] = $data["m4"];
	$score["txt"] = "儿歌";
	array_push ($scores ,$score);
	if ($data["m5"] < 3) {
		$data["m5"] += 2;
		if ($data["m".$data["result"]] < 5) {
	 		$data["m".$data["result"]] += 1;
		}
	}
	$score = array();
	$score["value"] = $data["m5"];
	$score["txt"] = "国学";
	array_push ($scores ,$score);
	
    usort($scores, "cmp");
    $data["scores"] = $scores;
	$data["time"] = "19:00-21:00";
}

function cmp($scorea, $scoreb)
{
    if ($scorea["value"] == $scoreb["value"]) {
        return 0;
    }
    return ($scorea["value"] < $scoreb["value"]) ? 1 : -1;
}




function calStar($data, $key, &$temp) {
	if (!array_key_exists($data[$key], $temp)) {
		$temp[$data[$key]] = array($key);
	}
	else {
		array_push($temp[$data[$key]], $key);
	}
}

//calData($empty);
//echo json_encode($empty);

$database = new medoo([
	// required
	'database_type' => 'mysql',
	'database_name' => 'db_operation_game',
	'server' => '10.206.30.118',
	'username' => 'mttbaby',
	'password' => 'mttbaby2012',
	'charset' => 'utf8',
	'port' => 4281
]);
$datas = $database->select("t_bbtt_big_data_2015", ["device","play_count","play_day","play_total_time","play_order","m1","m2","m3","m4","m5"
], [
	"device[=]" => $deviceId
]);

if (count($datas) == 0) {
	calData($empty);
	echo json_encode($empty);
}
else {
	$data = $datas[0];
	calData($data);
	$returnData = json_encode($data);
	$mem->add("new3_".$deviceId, $returnData);
	$data["cache"] = false;
	echo json_encode($data);
}



?>