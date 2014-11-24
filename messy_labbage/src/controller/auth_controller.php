<?php

class AuthController extends Controller{
	private $authModel; 
	private $userNameKey = "AuthController::userNameKey"; 
	private $passwordKey = "AuthController::passwordKey"; 
	private $loginAction = "AuthController::login";
	private $logoutAction = "AuthController::logout"; 

	public function __construct(){
		$this->authModel = new AuthModel(); 
	}

	public function controll(){
		switch ($this->getAction()) {
			case $this->loginAction :
				$this->login();
				break;
			case $this->logoutAction : 
				$this->logout(); 
				break; 
			default :
				if($this->userIsLoggedIn()){
					return;
				}
				$this->loginForm();
				break;
		}
	}


	public function userIsLoggedIn(){
		return $this->authModel->isUserLoggedIn(); 
	}

	private function loginForm(){
		if($this->userIsLoggedIn()){
			return;  
		}
		
		$this->viewVars["loginAction"] = $this->loginAction; 
		$this->viewVars["userNameKey"] = $this->userNameKey;
		$this->viewVars["passwordKey"] = $this->passwordKey;  

		$this->render("login_form");  
	}

	private function login(){
		$u = $this->getCleanInput($this->userNameKey);
		$p = $this->getCleanInput($this->passwordKey);

		if(isset($u) && isset($p)){
			$this->authModel->login($u, $p);
		} 
		$this->redirect(); 
	}

	private function logout(){
		$this->authModel->logout(); 
		$this->redirect(); 
	}
}