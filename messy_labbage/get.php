<?php

session_start();
//set_time_limit(0);
include_once('./definer.php');

if((isset($_GET["action"]) ? $_GET["action"] : "") === "getMessages"){
	$authController = new AuthController(); 
	$latestRequest = intval($_GET["latestRequest"]); 
	$getController = new MessageBoardGetController($authController); 
	$getController->getMessages($latestRequest);
}