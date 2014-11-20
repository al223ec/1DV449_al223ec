<?php

class UserDb extends Db {
	private $table = "users"; 

	public function __construct(){
		parent::__construct($this->table); 
	}

	public function login($userName, $password){
		$result = $this->findBy("user_name", $userName);
		if($result){
			return $this->validateByPassword($password, $result['password_hash']); 
		}
		return false; 
	}

	private function validateByPassword($password, $passwordHash){
		return crypt($password, $passwordHash) === $passwordHash;
	}

	private function createHash($password){
		$cost = 10;
		$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
		$salt = sprintf("$2a$%02d$", $cost) . $salt;
		return crypt($password, $salt);
	}


	private function setInitialData(){
		try{
			$file_db = $this->connection(); 
		    //Create table                   	  *
		    $file_db->exec("CREATE TABLE IF NOT EXISTS ". $this->table ." (
		                    id INTEGER PRIMARY KEY, 
		                    user_name TEXT, 
		                    password_hash TEXT
		                    )");
	         
		    $users = array(
		                  array('user_name' => 'admin',
		                        'password_hash' => $this->createHash("password")
		                        )
		                );
		 
		 
		    // Prepare INSERT statement to SQLite3 file db
		    $insert = "INSERT INTO users (user_name, password_hash) 
		                VALUES (:user_name, :password_hash)";
		    $stmt = $file_db->prepare($insert);
		 
		    // Bind parameters to statement variables
		    $stmt->bindParam(':user_name', $user_name);
		    $stmt->bindParam(':password_hash', $password_hash);
		 
		    // Loop thru all users and execute prepared insert statement
		    foreach ($users as $user) {
		      // Set values to bound variables
		      $user_name = $user['user_name'];
		      $password_hash = $user['password_hash'];

		      // Execute statement'
		      $stmt->execute();
	  		}	

		    $file_db = null; 	     
		} catch(PDOException $e) {
	   		die($e->getMessage());
	  	}
	}
}