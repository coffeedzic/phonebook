<?php
  class Contact extends DbObject {
    protected static $dbTable = 'contacts';
    protected static $dbTableFields = array('contactName', 'contactNumber', 'contactPicture', 'contactUserId');
    public $id;
    public $contactName;
    public $contactNumber;
    public $contactPicture;
    public $contactUserId;

    public function __construct($args) {
      if(isset($args['id'])) { $this->id = $args['id']; }
      $this->contactName = $args['contactName'];
      $this->contactNumber = $args['contactNumber'];
      $this->contactPicture = $args['contactPicture'];
      $this->contactUserId = $args['contactUserId'];
    }
  }
?>