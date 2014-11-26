<?php

class AuthModel {
	private $dbModel; 
	private $sessionLoggedInKey = "AuthModel::sessionKey"; 
	private $userAgentKey = "AuthModel::userAgentKey"; 

	public function __construct(){
		$this->dbModel = new UserDb();

		//http://stackoverflow.com/questions/520237/how-do-i-expire-a-php-session-after-30-minutes
		if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) {
			$this->logout(); 
		    // last request was more than 30 minutes ago
		    session_unset();     // unset $_SESSION variable for the run-time 
		    session_destroy();   // destroy session data in storage
		}
		$_SESSION['LAST_ACTIVITY'] = time(); // update last activity time stamp
		if (!isset($_SESSION['CREATED'])) {
		    $_SESSION['CREATED'] = time();
		} else if (time() - $_SESSION['CREATED'] > 180) {
		    session_regenerate_id(true);    // change session ID for the current session and invalidate old session ID
		    $_SESSION['CREATED'] = time();  // update creation time
		}
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
		isset($_SESSION[$this->sessionLoggedInKey]) && $_SESSION[$this->userAgentKey] === $_SERVER['HTTP_USER_AGENT']; 
	}

	public function saveSession(){
		$_SESSION[$this->sessionLoggedInKey] = true; 
		$_SESSION[$this->userAgentKey] = $_SERVER['HTTP_USER_AGENT']; //Motverka sessionsstölder

	}
	public function logout(){
		$_SESSION[$this->sessionLoggedInKey] = null; 
		$_SESSION[$this->userAgentKey] = null;
	}
}