<?php
session_start();
//set_time_limit(0);
include_once('./definer.php'); 

if((isset($_POST["action"]) ? $_POST["action"] : "") === "addMessage"){
	$boardController = new MessageBoardController(new AuthController());
	$boardController->addMessage(); 
}