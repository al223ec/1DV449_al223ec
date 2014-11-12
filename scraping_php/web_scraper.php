<?php 

include_once('scraper_information.php'); 

abstract class WebScraper implements JsonSerializable {
	//Skulle kunna göra om denna till en basklass med vissa statiska metoder.
	private $scraperInformationArr = array(); 
	protected $courses = array(); 

	private function performCurlExec($url){
		if(!$url){
			throw new \Exception("WebScraper::performCurlExec() url is false!!");
		}


		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 400); 

		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	    	'Webbteknik 2 Laboration 01 Skrapa: al223ec',
	    ));

		$scrapedPage = curl_exec($ch);
		
		$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		$this->saveScrapeInformation($ch, $url, $scrapedPage, $httpCode); 

		curl_close($ch);
		if($httpCode == 404){
			return false; 
		}
		return $scrapedPage;
	}

	protected function saveScrapeInformation($ch, $url, $scrapedPage, $httpCode){
		$scraperInformation = new ScraperInformation(); 
		
		$scraperInformation->scrapedURL = $url; 
		$scraperInformation->scrapedPage = $scrapedPage; 


		$scraperInformation->httpCode = $httpCode; 
		$scraperInformation->requestTime = curl_getinfo($ch, CURLINFO_TOTAL_TIME); 
		
		$this->scraperInformationArr[] = $scraperInformation;
	}

	protected function getXpath($url){
		$dom = new DOMDocument(); 
		$scrapedPage = $this->performCurlExec($url); 

		if(@$dom->loadHTML($scrapedPage)){
		 	return new DOMXPath($dom);
		 }
		 return null; 
	}

	private function getNumberOfRequests(){
		return count($this->scraperInformationArr); 
	}

	private function getRequestTime(){
		$time = 0; 
		foreach ($this->scraperInformationArr as $info) {
			$time += $info->requestTime; 
		}
		return $time; 
	}

	public function jsonSerialize() {

		$infoArray = array('info' =>
			array(
			'time' => time(),
			'numberOfReqests' => $this->getNumberOfRequests(),
			'totalTime' => $this->getRequestTime(),
			'coursesScraped' => count($this->courses),
			)); 

		$array = array_merge($infoArray, $this->scraperInformationArr, $this->courses);
		return $array; 
	}
}