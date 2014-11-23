<?php

class MessageBoardGetController extends MessageBoardController{

	public function __construct($auth){
		parent::__construct($auth); 
	}
	
	public function getMessages($latestRequest){
		$latestRequest = intval($latestRequest);
		$startTime = time(); 
		clearstatcache();
		
		if($this->auth->userIsLoggedIn()){	
			while (true) {
				if($latestRequest === 0 || $latestRequest < (time() - 2) || $this->newMessagePosted($startTime)){
					$messages = $this->messageDb->getMessages();
					foreach ($messages as $mess) {
						$mess['name'] = $this->sanitize($mess['name']);
						$mess['message'] = $this->sanitize($mess['message']); 
					}
					echo json_encode($messages); 
					break;
				} else {
					sleep(1); //Sov 1 sekund
			        continue;
				}
			}
		}
	}
	private function newMessagePosted($startTime){ 
		$latestUpdate = intval(file_get_contents($this->filePath));
		return $latestUpdate > intval($startTime);
	}
}