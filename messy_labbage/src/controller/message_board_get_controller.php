<?php

class MessageBoardGetController extends MessageBoardController{

	public function __construct($auth){
		parent::__construct($auth); 
	}
	
	public function getMessages($latestRequest){
		$latestRequest = intval($latestRequest);
		$startTime = time(); 
		
		if($this->auth->userIsLoggedIn()){	
			session_write_close();
    		while(time() <= $startTime + 10){
				if($latestRequest === 0 || $this->newMessagePosted($startTime)){
					$this->performRequest(); 
					return;
				} else {
					sleep(1); //Sov 1 sekund
			        continue;
				}
			}
			$this->performRequest(); 
		}
	}
	private function newMessagePosted($startTime){ 
		$latestUpdate = intval(file_get_contents($this->filePath));
		return $latestUpdate > intval($startTime);
	}
	private function performRequest(){
		$messages = $this->messageDb->getMessages();
		foreach ($messages as $mess) {
			$mess['name'] = $this->sanitize($mess['name']);
			$mess['message'] = $this->sanitize($mess['message']); 
		}
		echo json_encode($messages); 
	}
}