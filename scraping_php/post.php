<?php

class Post implements JsonSerializable {
	private $heading; 
	private $author;
	private $time; 

	public function __construct($heading, $author, $time){
		$this->heading = $heading; 
		$this->author = $author; 
		$this->time = $time; 
	}

	public function jsonSerialize() {
        return $array = array('heading' => $this->heading, 'auhtor' => $this->author, 'time' => $this->time);
    }
}
