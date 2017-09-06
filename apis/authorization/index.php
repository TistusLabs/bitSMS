<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	ini_set('xdebug.var_display_max_depth', 5);
	ini_set('xdebug.var_display_max_children', 256);
	ini_set('xdebug.var_display_max_data', 1024);	

 	require_once ($_SERVER['DOCUMENT_ROOT'] . "/include/config.php");
	require_once(ROOT_PATH . "/dwcommon.php");
 	require_once (ROOT_PATH .'/include/flight/Flight.php');
	require_once ("./userauth.php");
	//require_once ("./test.php");

	new UserAuthorization();
	//new TestService();
	
	Flight::start();

	header('Access-Control-Allow-Headers: Content-Type');
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');  
?>
