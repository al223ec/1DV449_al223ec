<?php

session_start();
//set_time_limit(0);
include_once('./definer.php'); 

$authController = new AuthController(); 
$boardController = new MessageBoardController($authController );

if((isset($_GET["action"]) ? $_GET["action"] : "") === "getMessages"){
	$latestRequest = intval($_GET["latestRequest"]); 
	$getController = new MessageBoardGetController($authController); 
	$getController->getMessages($latestRequest);
}else if((isset($_POST["action"]) ? $_POST["action"] : "") === "addMessage"){
	//$boardController = new MessageBoardController(new AuthController());
	$boardController->addMessage(); 
}else{
	$boardController->controll(); //Renderar vyn
}