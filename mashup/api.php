<?php

include_once './src/controller/web_controller.php';

$controller = new WebController();

if($_SERVER['REQUEST_METHOD'] === 'GET'){
	$controller->getTrafficInfo();
}
