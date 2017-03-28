<?php

require dirname(__DIR__) . '/vendor/autoload.php';



//error_reporting(E_ALL);
//set_error_handler('Core\Error::errorHandler');
//set_exception_handler('Core\Error::exceptionHandler');


/**
 * Routing
 */
$router = new Core\Router();

// Add the routes
$router->add('', ['controller' => 'ConstellationController', 'action' => 'Constellation']);
$router->add('api/constellations/', ['controller' => 'ConstellationController', 'action' => 'api']);


    
$router->dispatch($_SERVER['QUERY_STRING']);
