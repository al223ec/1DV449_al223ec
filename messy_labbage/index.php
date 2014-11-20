<?php

session_start();
define('DS', DIRECTORY_SEPARATOR);
define('ROOT_DIR', dirname(__FILE__) . DS);
define('ROOT_PATH', '/' . basename(dirname(__FILE__)) . '/');
define('SRC_DIR', ROOT_DIR . 'src' . DS);

require_once ('./src/model/db.php');
require_once ('./src/model/user_db.php');
require_once ('./src/controller/controller.php');
require_once ('./src/controller/auth_controller.php');


$authController = new AuthController(); 
$authController->controll(); 
//$authController->index(); 