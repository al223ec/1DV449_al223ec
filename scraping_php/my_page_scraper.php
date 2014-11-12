<?php 

include_once('web_scraper.php');

class MyPageScraper extends CoursePageScraper{
	private $tmpFileName; 

	public function __construct(){
		$this->tmpFileName = tempnam("/tmp", "COOKIE");
	}


	public function scrapeMyPage($userName, $password, $numberOfCourses = 12){

		$url = "https://coursepress.lnu.se/kurser/";
		$xpath = $this->getXpath($url);

		$form = $xpath->query('//*[@id="cp-slider"]/div/div[3]/form');

		$postUrl = $form->item(0)->getAttribute('action');

		$this->performCurlForLogin($postUrl, $userName, $password);
		$result  = $this->performLoggedInCurl($url);

		$dom = new DOMDocument(); 
		if(@$dom->loadHTML($result)){
		 	$xpath =  new DOMXPath($dom);

		 	$myCourses = $xpath->query('//*[@id="blogs-personal"]/a')->item(0);

		 	$dom = new DOMDocument(); 
		 	
		 	$result = $this->performLoggedInCurl($myCourses->getAttribute('href'));

			if(@$dom->loadHTML($result)){
		 		$xpath =  new DOMXPath($dom);

			 	$this->scrapeCourses($numberOfCourses, $myCourses->getAttribute('href'), $xpath); 
			 }
		 }
	}

	private function performCurlForLogin($url, $userName, $password){
		$fields = array(
			'log' => urlencode($userName),
			'pwd' => urlencode($password),
		);

		$fields_string = ""; 
		//url-ify the data for the POST
		foreach($fields as $key=>$value) { 
			$fields_string .= $key.'='.$value.'&'; 
		}
		
		rtrim($fields_string, '&');

		$ch = curl_init ($url);

		curl_setopt ($ch, CURLOPT_COOKIEJAR, $this->tmpFileName);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

		curl_setopt($ch,CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);

		$scrapedPage = curl_exec ($ch);

		$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		$this->saveScrapeInformation($ch, $url, $scrapedPage, $httpCode); 

		curl_close($ch);
	}

	private function performLoggedInCurl($url){

		$ch = curl_init ($url);

		curl_setopt ($ch, CURLOPT_COOKIEFILE, $this->tmpFileName);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); //detta kan jag inte använda på mitt webbhotell och jag vet inte hur jag ska fixa det
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

		$result = curl_exec ($ch);
		
		$response = curl_getinfo($ch); 
		$httpCode = $response['http_code'];

		$this->saveScrapeInformation($ch, $url, $result, $httpCode); 

		curl_close($ch);
		/*
		if($httpCode == 301 || $httpCode == 302){
			echo $response['url'];
			$headers = get_headers($response['url']);

			$location = "";
			foreach($headers as $value ){
				if(strpos($value, "location:")){
					echo "found location"; 
				}
				echo ($value); 
			}
		}*/
		return $result; 
	}
}

//https://coursepress.lnu.se/medlemmar/al223ec/kurserHTTP/1.0 302 FoundDate: Wed, 12 Nov 2014 18:26:53 GMTServer: Apache/2.2.22 (Ubuntu)X-Powered-By: PHP/5.3.10-1ubuntu3.15Set-Cookie: PHPSESSID=lg8abhu2tsce59klp6lluse3p1; path=/Expires: Wed, 11 Jan 1984 05:00:00 GMTCache-Control: no-cache, must-revalidate, max-age=0Pragma: no-cacheX-Pingback: http://coursepress.lnu.se/xmlrpc.phpLast-Modified: Wed, 12 Nov 2014 18:26:53 GMTLocation: /wp-login.phpAccess-Control-Allow-Origin: http://coursepress.lnu.seVary: Accept-EncodingContent-Length: 0Connection: closeContent-Type: text/html; charset=UTF-8HTTP/1.1 200 OKDate: Wed, 12 Nov 2014 18:26:54 GMTServer: Apache/2.2.22 (Ubuntu)X-Powered-By: PHP/5.3.10-1ubuntu3.15Set-Cookie: PHPSESSID=9mot923tq8pa3dd96vcnrgjf64; path=/Expires: Wed, 11 Jan 1984 05:00:00 GMTCache-Control: no-cache, must-revalidate, max-age=0Pragma: no-cacheLast-Modified: Wed, 12 Nov 2014 18:26:54 GMTSet-Cookie: wordpress_test_cookie=WP+Cookie+check; path=/X-Frame-Options: SAMEORIGINAccess-Control-Allow-Origin: http://coursepress.lnu.seVary: Accept-EncodingContent-Length: 2157Connection: closeContent-Type: text/html; charset=UTF-8