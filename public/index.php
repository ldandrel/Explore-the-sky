<?php

require dirname(__DIR__) . '/vendor/autoload.php';

session_start();

error_reporting(E_ALL);
set_error_handler('Core\Error::errorHandler');
set_exception_handler('Core\Error::exceptionHandler');


/**
 * Routing
 */
$router = new Core\Router();

// Add the routes
$router->add('', ['controller' => 'Constellation', 'action' => 'Constellation']);
$router->add('welcome', ['controller' => 'Constellation', 'action' => 'Welcome']);
$router->add('api/constellations/', ['controller' => 'Constellation', 'action' => 'api']);



$router->dispatch($_SERVER['QUERY_STRING']);
