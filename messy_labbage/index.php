<?php

session_start();
define('DS', DIRECTORY_SEPARATOR);
define('ROOT_DIR', dirname(__FILE__) . DS);
//define('ROOT_PATH', '/' . basename(dirname(__FILE__)) . '/');
define('SRC_DIR', ROOT_DIR . 'src' . DS);

require_once ('./src/model/datamodels/db.php');
require_once ('./src/model/datamodels/user_db.php');
require_once ('./src/model/datamodels/message_db.php');
require_once ('./src/controller/controller.php');
require_once ('./src/model/auth_model.php');
require_once ('./src/controller/auth_controller.php');
require_once ('./src/controller/message_board_controller.php');

$boardController = new MessageBoardController(new AuthController());

if((isset($_GET["action"]) ? $_GET["action"] : "") === "getMessages"){
	$boardController->getMessages();
}else if((isset($_POST["action"]) ? $_POST["action"] : "") === "addMessage"){
	$boardController->addMessage(); 
}else{
	$boardController->controll(); //Renderar vyn
}

