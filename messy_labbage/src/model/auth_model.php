<?php

class AuthModel {
	private $dbModel; 
	private $sessionLoggedInKey = "AuthModel::sessionKey"; 
	private $userAgentKey = "AuthModel::userAgentKey"; 


	public function __construct(){
		$this->dbModel = new UserDb(); 
	}
	public function login($username, $password){
		if($this->dbModel->login($username, $password)){
			$this->saveSession(); 
		}
	}

	public function isUserLoggedIn(){
		return isset($_SESSION[$this->sessionLoggedInKey]) ? $_SESSION[$this->sessionLoggedInKey] : false; 
	}
	private function confirmSession(){
		isset($_SESSION[$this->sessionLoggedInKey]) && $_SESSION[$this->userAgentKey] == $_SERVER['HTTP_USER_AGENT']; 
	}

	public function saveSession(){
		$_SESSION[$this->sessionLoggedInKey] = true; 
		$_SESSION[$this->userAgentKey] = $_SERVER['HTTP_USER_AGENT']; //Motverka sessionsstölder

	}
}