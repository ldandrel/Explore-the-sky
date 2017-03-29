<?php

namespace App\Controllers;

use \Core\View;
use \Core\App;
use \App\Models\ConstellationModel;
use \App\Controllers\Controller;

class Constellation extends Controller
{

    public function Constellation()
    {
        $model = new ConstellationModel();
        $data = $model->all();
        App::secured();
        View::renderTemplate('pages/index.twig', [
            'city' => $_SESSION['city'][2],
            'lat' => $_SESSION['city'][0],
            'long' => $_SESSION['city'][1],
            'date' => date_default_timezone_get(),
            'constellations' => $data
        ]);
    }

    public function Welcome()
    {

        $model = new ConstellationModel();
        $city = (isset($_GET['city']) ? $_GET['city'] : '');
        if($city = $model->city($city)){
            $_SESSION['city'] = $city;
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
                echo json_encode($data);
            }

        } else {
            $data = $model -> all();
            echo json_encode($data);
        }






    }
}
