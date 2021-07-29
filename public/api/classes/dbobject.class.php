<?php
  class DbObject {
    protected function properties() {
      $database = Database::instance();
      $properties = array();
      foreach (static::$dbTableFields as $dbField) {        
        if(property_exists($this, $dbField)) {        
            $properties[$dbField] = $this->$dbField;
            $properties[$dbField] = $database->escape($properties[$dbField]);        
        }        
      }        
      return $properties;        
    }

    public function save() {
      return isset($this->id) ? $this->update() : $this->create();
    }

    public function create() {
      $database = Database::instance();
      $properties = $this->properties();
      $sql = "INSERT INTO " . static::$dbTable . "(" . implode(",", array_keys($properties)) . ") ";
      $sql .= "VALUES ('". implode("','", array_values($properties)) ."')";
      if($database->query($sql)) {
        $this->id = $database->lastId();    
        return $this->id;    
      } else {    
        return false;
      }
    }

    public function update() {
      $database = Database::instance(); 
      $properties = $this->properties();    
      foreach ($properties as $key => $value) {
        $propertiesPairs[] = "{$key}='{$value}'";
      }    
      $sql = "UPDATE  " . static::$dbTable . "  SET ";
      $sql .= implode(", ", $propertiesPairs);
      $sql .= " WHERE id= " . $database->escape($this->id);    
      $database->query($sql);    
      return (mysqli_affected_rows($database->connection) == 1) ? true : false;       
    }

    public function delete() {
      $database = Database::instance();  			
      $properties = $this->properties();
      $sql = "DELETE FROM  " . static::$dbTable . "  ";
      $sql .= "WHERE id = '" . $database->escape($this->id);
      $sql .= "' LIMIT 1";
      $database->query($sql);
      return (mysqli_affected_rows($database->connection) == 1) ? true : false;
    }

    public static function findById($id) {
      $database = Database::instance();
      $sql = "SELECT * FROM " . static::$dbTable . " WHERE id = $id";
      $result = $database->query($sql);
      if($result->num_rows == 1) {
          $result = $result->fetch_assoc();
          return $result;
      } else {
        $output = array(
          'error' => 'true',
          'message' => $this->connection->connect_error
        );
        echo json_encode($output);
        die();
      }            
    }

    public static function countAll() {
      $database = Database::instance();
      $sql = "SELECT COUNT(*) FROM " . static::$dbTable;
      $result = $database->query($sql);
      return $result->num_rows;
    }

    public static function findArgsByColumnName($arg, $columnName, $orderBy = 'id', $isArray = false) {
      $database = Database::instance();
      $sql = "SELECT * FROM " . static::$dbTable . " WHERE " . $columnName . " = '" . $arg . "' ORDER BY " . $orderBy;
      $result = $database->query($sql);
      if(!$isArray && $result->num_rows >= 1) {
        return $result = $result->fetch_assoc();
      } else if($isArray && $result->num_rows >= 1) {
        return $result;
      } else {
        return false;
      }
    }
  }
?>