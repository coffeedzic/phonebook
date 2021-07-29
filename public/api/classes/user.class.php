<?php
  class User extends DbObject {      
    protected static $dbTable = 'users';
    protected static $dbTableFields = array('userName', 'userEmail', 'userPassword');
    public $id;
    public $userName;
    public $userEmail;
    public $userPassword;
    
    public function __construct($args) {
      if(isset($args['id'])) { $this->id = $args['id']; }
      $this->userName = $args['userName'];
      $this->userEmail = $args['userEmail'];
      $this->userPassword = $args['userPassword'];
    }

    public static function login($userEmail, $userPassword) {
      $userExists = parent::findArgsByColumnName($userEmail, 'userEmail');
      if(!$userExists) {
        return false;
      } else if($userPassword == $userExists['userPassword']) {
        return $userExists;
      } else {
        return false;
      }
    }      
  }
?>