<?php

class MessageBoardController extends Controller{
	protected $auth; 
	protected $messageDb;
	protected $sessionTimestampKey = "MessageBoardController::sessionTimestampKey"; 

	public function __construct(AuthController $authController){
		$this->auth = $authController;
		$this->messageDb = new MessageDb();
		$this->viewVars['userIsLoggedIn'] = $this->auth->userIsLoggedIn(); 
	}

	public function controll(){
		$this->auth->controll(); 
		if($this->auth->userIsLoggedIn()){
			$_SESSION["CSRFPreventionString"] = $this->getCSRFPreventionString();  
			$this->viewVars['CSRFPreventionString'] = $_SESSION["CSRFPreventionString"]; 
			$this->auth->bindVars($this->viewVars); 
			$this->render("message_board"); 
		}
		//övriga senarios renderas i authcontroller
	}

	public function addMessage(){
		if($this->auth->userIsLoggedIn()){
			$n = $this->getCleanInput('name'); 
			$m = $this->getCleanInput('message'); 

			$CSRFPreventionString = $this->getCleanInput('CSRFPreventionString'); 
			
			if($CSRFPreventionString === $_SESSION["CSRFPreventionString"]){
				if($n !== "" && $m !== ""){
					$this->messageDb->addMessage($n, $m); 
					$_SESSION[$this->sessionTimestampKey] = time(); 
					echo "message added"; //$this->messageDb->getLatestMessage();
					return;
				}
			}
		}
	}

	//http://stackoverflow.com/questions/4356289/php-random-string-generator
	private function getCSRFPreventionString(){
		$length = 50; 
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, strlen($characters) - 1)];
	    }
	    return $randomString;
	}
}