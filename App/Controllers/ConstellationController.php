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

    public function api()
    {
        $model = new ConstellationModel();
        $data = $model->all();
        //View::renderTemplate('Home/index.twig', []);
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function test(){
        $id = $_GET['id'];
        $model = new ConstellationModel();
        $data = $model -> find($id);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
