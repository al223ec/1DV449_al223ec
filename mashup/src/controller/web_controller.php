<?php

class WebController {

	private $srTrafficMessagesUrl = "http://api.sr.se/api/v2/traffic/messages?format=json&indent=true";
	private $srTrafficAreasUrl = "http://api.sr.se/api/v2/traffic/areas?format=json"; 

	private $numberOfMessages = 100;
	private $updateIntervalSeconds = 180; 

	private $jsonFilePathTraffic = "srTraffic.json"; 
	private $jsonFilePathAreas = "srAreas.json";
	private $timeStampPath = "timestamp";  

	public function getTrafficInfo(){
		@$response = file_get_contents($this->jsonFilePathTraffic); 

		if($this->shouldUpdate() || !$response){
			$messages = $this->performApiPagination($this->srTrafficMessagesUrl, 'messages', $this->numberOfMessages); 
			$response = json_encode(array("messages" => $messages)); 
			file_put_contents($this->timeStampPath, time());
			file_put_contents($this->jsonFilePathTraffic, $response);
		}
		echo $response;
	}

	public function getTrafficAreas(){
		@$response = file_get_contents($this->jsonFilePathAreas); 

		if($this->shouldUpdate() || !$response){
			$areas = $this->performApiPagination($this->srTrafficAreasUrl, 'areas'); 
			$response = json_encode(array("area" => $areas));
			file_put_contents($this->jsonFilePathAreas, $response);
		}
		echo $response;
	}

	private function performApiPagination($url, $dataName, $dataLimit = 1000){
		$nextpage = $url; 
		$returnData = array(); 
		do{
			$json = json_decode($this->performCurl($nextpage));
			if($json){
				foreach ($json->$dataName as $area) {
					$returnData[] = $area; 
				}
				$nextpage = isset($json->pagination->nextpage) ? $json->pagination->nextpage : false;
			} else {
				break; 
			}
		} while ($nextpage && count($returnData) < $dataLimit);
		return $returnData; 
	}

	private function performCurl($url){
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 200); 
		
		$result = curl_exec($ch);
		curl_close($ch); 

	    return $result;
	}

	private function shouldUpdate(){
		return intval(file_get_contents($this->timeStampPath)) + $this->updateIntervalSeconds < time();
	}
}