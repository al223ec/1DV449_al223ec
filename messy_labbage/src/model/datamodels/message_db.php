<?php

class MessageDb extends Db{
	private $table = "messages"; 

	public function __construct(){
		parent::__construct($this->table);
	}

	public function getMessages($latestRequest){  
		$sql = "
			SELECT " . $this->table . ".*
			FROM " . $this->table . "
			WHERE ". $this->table .".time > :time
		";
		$params = array(":time" => $latestRequest);
		return $this->query($sql, $params);
	}

	public function addMessage($name, $message){
		$sql = "INSERT INTO ". $this->table ."(name, message, time) VALUES(:name, :message, :time);";
		$params = array(":name" => $name, ":message" => $message, ':time' => time()); 
	
		return $this->query($sql, $params);
	}
/*
	private function createTable(){	
		try{
			$file_db = $this->connection(); 
		    //Create table
		    $file_db->exec("CREATE TABLE IF NOT EXISTS ". $this->table ." (
		                    id INTEGER PRIMARY KEY, 
		                    message TEXT, 
		                    name TEXT,
		                    time INTEGER
		                    )");
	        $file_db = null; 

		} catch(PDOException $e) {
	   		die($e->getMessage());
	  	}
	}*/
}