<?php
  class Database {
    private $databaseHost = 'localhost';
    private $databaseUser = '';
    private $databasePassword = '';
    private $databaseName = '';
    private $port = '';

    public $connection;
    private $charset = 'utf8mb4';
    private static $instance;

    public function __construct() {
      $this->openConnection();
    }

    public function openConnection() {
      $this->connection = new mysqli($this->databaseHost, $this->databaseUser, $this->databasePassword, $this->databaseName);
      if($this->connection->connect_errno) {
        $output = array(
          'error' => true,
          'message' => $this->connection->connect_error
        );
        echo json_encode($output);
        die();
      }
      $this->connection->set_charset($this->charset);
    }

    public static function instance() {			
			if(!self::$instance) { 				
				self::$instance = new self();
			}
			return self::$instance;
		}

    private function __clone() {}

    public function connect() {
      return $this->connection;    
    }

    public function query($sql) {
      $result = $this->connection->query($sql);
      $this->confirmQuery($result);
      return $result;
    }

    private function confirmQuery($result) {
      if(!$result) {
        $output = array(
          'error' => 'true',
          'message' => $this->connection->connect_error
        );
        echo json_encode($output);
        die();
      }
    }

    public function escape($string) {
      $escaped = $this->connection->real_escape_string($string);
      return $escaped;
    }

    public function lastId() {
      return $this->connection->insert_id;
    }
  }
?>