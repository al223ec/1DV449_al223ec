<?php

class WebController {

	private $srUrl = "http://api.sr.se/api/v2/traffic/messages?format=json&indent=true";
	private $numberOfPages = 10;

	private $jsonFilePath = "srTraffic.json"; 
	private $timeStampPath = "timestamp";  

	public function getTrafficInfo(){
		@$response = file_get_contents($this->jsonFilePath); 

		if($this->shouldUpdate() || !$response){
			$response = ''; 
			$nextpage = $this->srUrl; 
			$messages = array(); 
			for ($i=0; $i < $this->numberOfPages; $i++) { 
				//$response .= $this->performCurl($nextpage);
				$json = json_decode($this->performCurl($nextpage));
				if($json){
					foreach ($json->messages as $mess) {
						$messages[] = $mess; 
					}
					$nextpage = $json->pagination->nextpage;
				}
			}
			$response = json_encode(array("messages" => $messages)); 
			file_put_contents($this->timeStampPath, time());
			file_put_contents($this->jsonFilePath, $response);
		}
		echo $response;
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
		return intval(file_get_contents($this->timeStampPath)) + 100000 < time();
	}
}