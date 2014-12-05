<?php

include_once './src/controller/web_controller.php';

$controller = new WebController();

$ALLOWED_URL_CHARS = "/[^A-z0-9\/\^]/"; 
if($_SERVER['REQUEST_METHOD'] === 'GET'){
	$action = isset($_GET['action']) ? $_GET['action'] : "";
	
	if($action == "trafficInfo"){
		$controller->getTrafficInfo();
	}
}
