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
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

		$result = curl_exec ($ch);
		
		$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		$this->saveScrapeInformation($ch, $url, $result, $httpCode); 

		curl_close($ch);

		return $result; 
	}
}