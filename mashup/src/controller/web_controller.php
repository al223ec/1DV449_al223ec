<?php

class WebController {
	public function getTrafficInfo(){
		echo $this->performCurl("http://api.sr.se/api/v2/traffic/messages?format=json&indent=true");
	}

	private function performCurl($url){
		$ch = curl_init();
		//http://unitstep.net/blog/2009/05/05/using-curl-in-php-to-access-https-ssltls-protected-sites/
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 200); 
		
		$result = curl_exec($ch);
		curl_close($ch); 

	     return $result;
	}
}