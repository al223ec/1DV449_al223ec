<?php
require_once ('./src/model/datamodels/db.php');
require_once ('./src/model/datamodels/message_db.php');

switch (isset($_GET["action"]) ? $_GET["action"] : "") {
	case 'getMessages':
		getMessages(); 
		break; 
}

switch (isset($_POST["action"]) ? $_POST["action"] : "") {
	case 'addMessage':
		addMessage(); 
		break;
}

function getMessages(){
	$messageDb = new MessageDb(); 
	echo json_encode($messageDb->getMessages()); 
}

function addMessage(){
	$n = $_POST['name']; 
	$m = $_POST['message']; 

	$messageDb = new MessageDb(); 
	$messageDb->addMessage($n, $m); 

	echo "addmessage $m"; 
	die(); 

}