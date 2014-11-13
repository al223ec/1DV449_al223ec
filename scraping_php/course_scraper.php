<?php 
include_once('post.php'); 

class CourseScraper implements JsonSerializable{
	//Kursens namn
	private $name = "no information";
	//Den URL kurswebbplatsen har
	private $URL = "no information"; 
	//Kurskod
	private $courseCode = "no information"; 
	//URL till kursplanen
	private $coursePlanURL = "no information"; 
	//Den inledande texten om varje kurs
	private $text = "no information"; 
	//Den senaste posten
	private $post = "no information"; 

	private $postURL; 

	public function __construct($name, $URL){
		$this->name = $name; 
		$this->URL = $URL; 
	}

	public function setPostUrl($postURL){
		$this->postURL = $postURL; 
	}

	public function getURL(){
		return $this->URL;
	}

	public function getPostURL(){
		return $this->postURL; 
	}

	public function scrapeCoursePage($xpath){
		if($xpath == null){
			throw new \Exception("Course::getInfo() scrapedPage is false!");
		}
		//Den inledande texten om varje kurs
		$entryContent = $xpath->query('//div[@id="content"]/article/div[@class="entry-content"]/p');
		foreach ($entryContent as $p) {
			$this->text .= $p->nodeValue . " "; 
		}

		//Kurskoden
		$courseCodeDOM = $xpath->query('//div[@id="header-wrapper"]/ul/li/a');
		if($courseCodeDOM->length !== 0){
			$this->courseCode = $courseCodeDOM->item($courseCodeDOM->length-1)->nodeValue; 
		}

		//Kursplan
		$navigationDOM = $xpath->query('//*[@id="navigation"]/section/div/ul/li/ul/li/a');
		if($navigationDOM->length !== 0){
			foreach ($navigationDOM as $dom) {
				if(strpos($dom->getAttribute('href'), "coursesyllabus") !== false || strpos($dom->getAttribute('href'), "syllabus") !== false){
					$this->coursePlanURL = $dom->getAttribute('href'); 
					break; 
				}
			}
		}
	}

	public function scrapePostPage($xpath){
		if($xpath == null){
			//Inget att skrapa
			return;
		}

		$heading = $xpath->query('//header[@class="entry-header"]/h1');
		$heading = $heading->item(0)->nodeValue; 

		$author = $xpath->query('//header/p[@class="entry-byline"]/strong');
		$author = $author->item(0)->nodeValue;  

		$time = $xpath->query('//header/p[@class="entry-byline"]/text()'); 
		$time = trim(preg_replace("/[^0-9-: ]/","", $time->item(0)->nodeValue)); 

		$this->post = new Post($heading, $author, $time); 
		
	}

	public function jsonSerialize() {
         return $array = array('name' => $this->name, 'URL' => $this->URL, 'courseCode' => $this->courseCode, 
        'coursePlanURL' => $this->coursePlanURL, 'text' => $this->text, 'post' => $this->post);
    }
}