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

    		while(time() <= $startTime + 15){
				$latestUpdate = $this->readTimeStamp(); 
				if($latestRequest === 0 || $latestRequest < $latestUpdate){
					$this->performRequest($latestRequest); 
				} else {
					sleep(1); //Sov 1 sekund
			        continue;
				}
			}
			$this->performRequest($latestRequest); 
		}
	}

	private function performRequest($latestRequest){ 
		$messages = $this->messageDb->getMessages($latestRequest);
		if($messages !== null){
			foreach ($messages as $key => $mess) {
				if(intval($mess['time']) > $latestRequest){
					$mess['name'] = $this->sanitize($mess['name']);
					$mess['message'] = $this->sanitize($mess['message']);
				}else{
					unset($messages[$key]);
				}
			}
		}
		echo json_encode($messages); 
		die();
	}
}