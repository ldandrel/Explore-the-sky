<?php

namespace App\Controllers;

use App\Models\MeteoModel;
use \Core\View;
use \Core\App;
use \App\Models\ConstellationModel;
use \App\Config;
use \App\Controllers\Controller;

class Constellation extends Controller
{

    public function Constellation()
    {
        $model = new ConstellationModel();
        $data = $model->all();
        App::secured();
        View::renderTemplate('pages/index.twig', [
            'city' => (isset($_SESSION['city']) ? $_SESSION['city'] : 'Paris, France'),
            'lat' => (isset($_SESSION['city']) ? $_SESSION['city'] : 'false'),
            'long' => (isset($_SESSION['city']) ? $_SESSION['city'] : 'false'),
            'date' => date_default_timezone_get(),
            'constellations' => $data
        ]);
    }

    public function Welcome()
    {

        if(isset($_POST['start'])){
            $_SESSION['start'] = true;
            App::redirect();
        }


        View::renderTemplate('pages/welcome.twig', [
            'title' => 'Welcome'
        ]);
    }


    public function api(){
        $model = new ConstellationModel();
        $id = (isset($_GET['id']) ? $_GET['id'] : "''");
        $iau = (isset($_GET['iau']) ? $_GET['iau'] : '');
        $name = (isset($_GET['name']) ? $_GET['name'] : '');

        header('Content-Type: application/json');

        if(isset($_GET['id']) || isset($_GET['iau']) || isset($_GET['name'])) {
            $results = $model -> find($id,$iau,$name);
            foreach ($results as $result) {
                $neighbors = $result['neighbor'];
                $neighbors = $model -> find($neighbors,$iau,$name);

                foreach ($neighbors as $neighbor) {
                    $neighbor = $neighbor['name'];
                    $items[] =  $neighbor;
                }

                $data['neighbors_name'] = $items;
                $data['constellation'] = $results;
                $data['constellation'][0]['images'] = Config::URL . 'assets/' . $data['constellation'][0]['images'];
                echo json_encode($data);
            }

        } else {
            $data = $model -> all();
            echo json_encode($data);
        }






    }
}
