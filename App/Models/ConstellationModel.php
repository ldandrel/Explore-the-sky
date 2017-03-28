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

    public static function find($id,$iau,$name)
    {
        $db = static::getDB();
        $sql = $db->query("SELECT * FROM constellations WHERE  IAU = '$iau' OR name = '$name' OR id IN ($id)");
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }
}
