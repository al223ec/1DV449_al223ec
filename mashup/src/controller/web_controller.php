<?php

class WebController {

	private $srTrafficMessagesUrl = "http://api.sr.se/api/v2/traffic/messages?format=json&indent=true&pagination=false";
	//private $srTrafficAreasUrl = "http://api.sr.se/api/v2/traffic/areas?format=json"; 

	private $numberOfMessages = 100;
	private $updateIntervalSeconds = 180; 

	private $jsonFilePathTraffic = "srTraffic.json"; 
	//private $jsonFilePathAreas = "srAreas.json";
	private $timeStampPath = "timestamp";  

	public function getTrafficInfo(){
		@$response = file_get_contents($this->jsonFilePathTraffic); 

		if($this->shouldUpdate() || !$response){
			$messages = $this->performApiRequest($this->srTrafficMessagesUrl, 'messages', $this->numberOfMessages); 
			$response = json_encode(array("messages" => $messages), JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS);
			file_put_contents($this->timeStampPath, time());
			file_put_contents($this->jsonFilePathTraffic, $response);
		}
		echo $response;
	}

	private function performApiRequest($url, $dataName, $dataLimit = 1000){
		$returnData = array(); 
		$json = json_decode($this->performCurl($url));
		if($json){
			foreach ($json->$dataName as $data) {
				$returnData[] = $data; 
			}
		}
		$returnData = array_reverse($returnData); 
		return array_slice($returnData, 0, $dataLimit); 
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
	/*
	public function getTrafficAreas(){
		@$response = file_get_contents($this->jsonFilePathAreas); 

		if($this->shouldUpdate() || !$response){
			$areas = $this->performApiRequest($this->srTrafficAreasUrl, 'areas'); 
			//http://php.net/manual/en/json.constants.php, 
			$response = json_encode(array("area" => $areas), JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS);
			file_put_contents($this->jsonFilePathAreas, $response);
		}
		echo $response;
	}
	*/
	/*
	private function performApiPagination($url, $dataName, $dataLimit = 1000){
		$nextpage = $url; 
		$returnData = array(); 
		do{
			$json = json_decode($this->performCurl($nextpage));
			if($json){
				foreach ($json->$dataName as $data) {
					$returnData[] = $data; 
				}
				$nextpage = isset($json->pagination->nextpage) ? $json->pagination->nextpage : false;
			} else {
				break; 
			}
		} while ($nextpage && count($returnData) < $dataLimit);
		return $returnData; 
	}
	*/

}