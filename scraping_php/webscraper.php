<?php 

class WebScraper{
	//Skulle kunna göra om denna till en basklass med vissa statiska metoder.
	private $numberOfRequests = 0; 
	private $scrapedPages = array(); 

	private $requestTime = 0; 
	
	private $courses = array(); 

	private function performCurlExec($url){
		if(!$url){
			throw new \Exception("WebScraper::performCurlExec() url is false!!");
		}

		$ch = curl_init();

		echo "<pre>";
		print_r("scraping: " . $url);

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 400); 

		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	    	'Webbteknik 2 Laboration 01 Skrapa: al223ec',
	    ));

		$scrapedPage = curl_exec($ch);
		$this->numberOfRequests += 1; 
		$this->scrapedPages[$url]= $scrapedPage; 

		$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		$this->requestTime += curl_getinfo($ch, CURLINFO_TOTAL_TIME); 
		curl_close($ch);

		print_r("response: " . $httpCode);

		if($httpCode == 404){
			return false; 
		}
		return $scrapedPage;
	}


	public function getCourses(){
		return $this->courses; 
	}
	
	public function scrapeCourses($numberOfCourses = 10, $url = "https://coursepress.lnu.se/kurser/"){
		$dom = new DOMDocument(); 
		$scrapedPage = $this->performCurlExec($url); 
		if(@$dom->loadHTML($scrapedPage)){
			$xpath = new DOMXPath($dom); 

			$latestBloggPostLinks = $xpath->query('//ul[@id="blogs-list"]/li/div[@class="action"]/div[@class="meta"]/a');
			$titels =  $xpath->query('//div[@class="item-title"]/a');

			foreach ($titels as $title) {
				//Jag vill bara skrapa kurser
				if(strpos($title->getAttribute('href'), "//coursepress.lnu.se/kurs/") !== false){
					$course = new CourseScraper($title->nodeValue, $title->getAttribute('href')); 
					$course->scrapeCoursePage($this->performCurlExec($title->getAttribute('href')));
					$this->courses[] = $course;

					foreach ($latestBloggPostLinks as $key => $link){
						//Osnygg lösning 
						if((strpos($link->getAttribute('href'), $course->getURL()) !== false ||
							strpos($link->getAttribute('href'), str_replace("https", "http", $course->getURL())) !== false )
							&& strpos($course->getURL(), "kurs") !== false){
							//Alla länkar jag vill spara innehåller kurs så bekräftar detta
							$course->setPostUrl(str_replace("http", "https", $link->getAttribute('href')));							
							//måste dela upp detta//$course->scrapePostPage($this->performCurlExec(str_replace("http", "https", $link->getAttribute('href'))));
							break; 
						}
					}
					if(count($this->courses) > $numberOfCourses){
						return; 
					}
				}
			}
		}else{
			throw new \Exception("WebScraper::scrapeCourses() Kunde inte läsa in sidan"); 
		}


		$pagination = $xpath->query('//*[@id="blog-dir-pag-bottom"]/a[@class="next page-numbers"]'); 
		if($pagination->item(0)){
			$nextPageURL = substr($pagination->item(0)->getAttribute('href'), strpos($pagination->item(0)->getAttribute('href'), '?')); 
			
			//Måste ta bort det tillagda argumentetn ?bpage=X om det finns i url:en
			$strpos = strpos($url, '?'); 
			if($strpos){
				$url = substr($url, 0, $strpos); 
			}
			//Rekursivt anrop
			$this->scrapeCourses($numberOfCourses, $url . $nextPageURL); 
		}


	}

	public function scrapeLatestpost(){
		foreach($this->courses as $course){
			if($course->getPostURL()){ //Vill bara skrapa om det finns någon url
				$course->scrapePostPage($this->performCurlExec($course->getPostURL()));
			}
		}
	}

	public function getNumberOfRequests(){
		return $this->numberOfRequests; 
	}

	public function getRequestTime(){
		return $this->requestTime; 
	}
}