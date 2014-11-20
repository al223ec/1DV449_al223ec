<?php

class MessageBoardController extends Controller{
	private $auth; 

	public function __construct(AuthController $authController){
		$this->auth = $authController; 
	}

	public function controll(){
		$this->auth->controll(); 
		if($this->auth->userIsLoggedIn()){
			$this->render("message_board"); 
		}
	}
}