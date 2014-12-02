<?php 

class Router{
	/**
	* Routens uppgift är att dela upp url:en och disturbera dessa delar
	*/
	const ALLOWED_URL_CHARS = "/[^A-z0-9\/\^]/"; 
	private $controller; 
	private $action;
	private $params;

	public function __construct(){
		$this->controller = new WebController();

		$route = isset($_GET['url']) ? $_GET['url'] : '';
		//Se till att inte otillåtna tecken skickas med i urlen
		if(preg_match(self::ALLOWED_URL_CHARS, $route)){
			$route = ""; 
		}

		$routeParts = explode('/', $route);
		$this->action = isset($routeParts[1]) ? $routeParts[1] : "";

		//Remove the first element from an array
		array_shift($routeParts);
		array_shift($routeParts);
		
		$this->params = $routeParts;

	}
	public function route(){
		if($_SERVER['REQUEST_METHOD'] === 'GET'){
			$this->controller->getTrafficInfo();
		}
	}
	private function getAction(){
		return $this->action;
	}  

	private function getParams(){
	    return $this->params;  
	}
}