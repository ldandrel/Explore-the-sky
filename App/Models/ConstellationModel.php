<?php

namespace App\Models;

use PDO;
use \App\Models\Model;


class ConstellationModel extends Model
{

    public static function all()
    {
        $db = static::getDB();
        $stmt = $db->query('SELECT * FROM constellation');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find($id)
    {
        $db = static::getDB();
        $stmt = $db->query("SELECT * FROM constellation WHERE id = $id");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
