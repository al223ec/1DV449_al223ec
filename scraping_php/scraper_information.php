<?php

class ScraperInformation implements JsonSerializable{

	private $data = array(
		'scrapedURL' => '',
		'requestTime' => '',
		'httpCode' => '',
		'scrapedPage' => '',
		'time' => '',
		); 
	
	public function __construct(){
		$this->data['time'] = time(); 
	}	

	public function __get($key){
   		if (isset($this->data[$key])) {
        	return $this->data[$key];
        }
	}

	public function __set($key, $value){
        if (isset($this->data[$key])) {
            if($this->data[$key] === ''){
            	$this->data[$key] = $value; 
            }else{
            	throw new \Exception("ScraperInformation::__set du får endast sätte detta värde en gång!");
            }
        } else {
            throw new \Exception("ScraperInformation::__set '$key' trying to set non existing porperty '$key'");
        }
	}

	public function jsonSerialize() {
		$arrCopy = $this->data; 
		unset($arrCopy['scrapedPage']);
		return $arrCopy;  
	}
}