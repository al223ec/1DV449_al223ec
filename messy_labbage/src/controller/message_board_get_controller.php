<?php

class MessageBoardGetController extends MessageBoardController{

	public function __construct($auth){
		parent::__construct($auth); 
	}
	
	public function getMessages($latestRequest){
		$latestRequest = intval($latestRequest);
		$startTime = time(); 
		
		if($this->auth->userIsLoggedIn()){	
			$latestUpdate = intval(isset($_SESSION[$this->sessionTimestampKey]) ? 
				$_SESSION[$this->sessionTimestampKey] : 0);

			$_SESSION[$this->sessionTimestampKey] = time(); 
			
			session_write_close();
    		while(time() <= $startTime + 4){
				if($latestRequest === 0 || $startTime > $latestUpdate){
					$this->performRequest($latestRequest); 
					return;
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
	}
}