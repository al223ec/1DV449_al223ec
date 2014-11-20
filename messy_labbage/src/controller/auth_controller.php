<?php

class AuthController extends Controller{
	private $dbModel; 
	private $userNameKey = "AuthController::userNameKey"; 
	private $passwordKey = "AuthController::passwordKey"; 
	private $loginAction = "AuthController::login";

	public function __construct(){
		$this->dbModel = new UserDb(); 
	}

	public function controll(){
		switch ($this->getAction()) {
			case $this->loginAction :
				$this->login();
				break;
			default :
				$this->index();
				break;
		}
	}


	public function userIsLoggedIn(){
		return $this->dbModel->isUserLoggedIn(); 
	}

	private function index(){
		if($this->userIsLoggedIn()){
			$this->render("logged_in");
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
			var_dump($this->dbModel->login($u, $p));
			die();  
		} 
		$this->redirect(); 
	}

	private function logout(){
		$this->redirect(); 
	}
}