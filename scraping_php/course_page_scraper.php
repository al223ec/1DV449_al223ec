<?php 

include_once('web_scraper.php');

class CoursePageScraper extends WebScraper{

	public function scrapeCourses($numberOfCourses = 4, $url = "http://coursepress.lnu.se/kurser/", $xpath = null){
		$xpath = $xpath == null ? $this->getXpath($url) : $xpath; 
		
		if($xpath !== null){
			$latestBloggPostLinks = $xpath->query('//ul[@id="blogs-list"]/li/div[@class="action"]/div[@class="meta"]/a');
			$titels =  $xpath->query('//div[@class="item-title"]/a');

			foreach ($titels as $title) {
				//Jag vill bara skrapa kurser
				if(strpos($title->getAttribute('href'), "//coursepress.lnu.se/kurs/") !== false){

					$course = new CourseScraper($title->nodeValue, $title->getAttribute('href')); 
					$course->scrapeCoursePage($this->getXpath($title->getAttribute('href')));
					$this->courses[] = $course;

					foreach ($latestBloggPostLinks as $key => $link){
						//Osnygg lösning 
						if((strpos($link->getAttribute('href'), $course->getURL()) !== false ||
							strpos($link->getAttribute('href'), str_replace("https", "http", $course->getURL())) !== false )
							&& strpos($course->getURL(), "kurs") !== false){
							//Alla länkar jag vill spara innehåller kurs så bekräftar detta
							$course->setPostUrl($link->getAttribute('href'));							
							
							//$course->setPostUrl(str_replace("http", "https", $link->getAttribute('href')));							
							//måste dela upp detta//$course->scrapePostPage($this->performCurlExec(str_replace("http", "https", $link->getAttribute('href'))));
							break; 
						}
					}
					if(count($this->courses) >= $numberOfCourses){
						return; 
					}
				}
			}
		}else{
			throw new \Exception("WebScraper::scrapeCourses() Kunde inte läsa in sidan"); 
		}
		//Hämta nextpage länken
		$pagination = $xpath->query('//*[@id="blog-dir-pag-bottom"]/a[@class="next page-numbers"]'); 
		if($pagination->item(0)){
			$nextPageURL = substr($pagination->item(0)->getAttribute('href'), strpos($pagination->item(0)->getAttribute('href'), '?')); 
			
			//Måste ta bort det tillagda argumentet ?bpage=X om det finns i url:en
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
				$course->scrapePostPage($this->getXpath($course->getPostURL()));
			}
		}
	}
} 