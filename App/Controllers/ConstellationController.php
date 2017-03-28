<?php

namespace App\Controllers;

use \Core\View;
use \App\Models\ConstellationModel;
use \App\Controllers\Controller;

class ConstellationController extends Controller
{

    public function Constellation()
    {
        View::renderTemplate('Home/index.twig', []);
    }


    public function api(){
        $model = new ConstellationModel();
        $id = (isset($_GET['id']) ? $_GET['id'] : "''");
        $iau = (isset($_GET['iau']) ? $_GET['iau'] : '');
        $name = (isset($_GET['name']) ? $_GET['name'] : '');
        if(isset($_GET['id']) || isset($_GET['iau']) || isset($_GET['name'])) {
            $results = $model -> find($id,$iau,$name);
            foreach ($results as $result) {
                $neighbors = $result['neighbor'];
                $neighbors = $model -> find($neighbors,$iau,$name);
                 foreach ($neighbors as $neighbor) {
                     var_dump($neighbor['name']);
                 }
            }


        } else {
            $data = $model -> all();
        }

        //header('Content-Type: application/json');
        //echo json_encode($data);
    }
}
