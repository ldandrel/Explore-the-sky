<?php

namespace App\Models;

use PDO;
use \App\Models\Model;


class ConstellationModel extends Model
{

    public static function all()
    {
        $db = static::getDB();
        $stmt = $db->query('SELECT * FROM constellations');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find($id, $name)
    {
        $db = static::getDB();
        if($id != ''){
            $sql = $db->query("SELECT * FROM constellations WHERE name LIKE '%$name%' AND id IN ($id)");
            return $sql->fetchAll(PDO::FETCH_ASSOC);
        } else if ($name != '') {
            $sql = $db->query("SELECT * FROM constellations WHERE name LIKE '$name%'");
            return $sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return array(['error' => 'An error occured']);
        }
    }

}
