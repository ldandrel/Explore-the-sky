<?php
namespace Core;

use App\Config;

class App
{
    public static function redirect($path = '') {
        $location = 'Location: ' . Config::URL . $path;
        header($location);
    }

    public static function secured() {
        if(!isset($_SESSION['city']) || $_SESSION['city'] == false) {
            self::redirect('welcome');
            exit;
        }
    }
}