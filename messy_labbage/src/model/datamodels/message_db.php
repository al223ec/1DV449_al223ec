<?php

class MessageDb extends Db{
	private $table = "messages"; 

	public function __construct(){
		parent::__construct($this->table);
	}

	public function getMessages(){
		$sql = "SELECT * FROM ". $this->table; 
		return $this->query($sql); 
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
	}

	private function setInitialData(){
		try{
			$file_db = $this->connection(); 
		    $messages = array(
		                  array('message' => 'ett till test meddelande',
		                        'name' => "ett till namn",
		                        'time' => time()
 		                        )
		                );
		 
		 
		    // Prepare INSERT statement to SQLite3 file db
		    $insert = "INSERT INTO ". $this->table ." (message, name, time) 
		                VALUES (:message, :name, :time)";
		    $stmt = $file_db->prepare($insert);
		 
		    // Bind parameters to statement variables
		    $stmt->bindParam(':message', $message);
		    $stmt->bindParam(':name', $name);
		 	$stmt->bindParam(':time', $time);
		    // Loop thru all users and execute prepared insert statement
		    foreach ($messages as $mess) {
		      // Set values to bound variables
		      $message = $mess['message'];
		      $name = $mess['name'];
		      $time = $mess['time'];
		      // Execute statement'
		      $stmt->execute();
	  		}	
		    $file_db = null; 	     
		} catch(PDOException $e) {
	   		die($e->getMessage());
	  	}
	  }
*/
}