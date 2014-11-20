<?php

class AuthModel {
	private $dbModel; 
	private $sessionKey = "AuthModel::sessionKey"; 

	public function __construct(){
		$this->dbModel = new UserDb(); 
	}
	public function login($username, $password){
		if($this->dbModel->login($username, $password)){
			$this->saveSession(); 
		}
	}

	public function isUserLoggedIn(){
		return isset($_SESSION[$this->sessionKey]) ? $_SESSION[$this->sessionKey] : false; 
	}

	public function saveSession(){
			$_SESSION[$this->sessionKey] = true; 
	}
}