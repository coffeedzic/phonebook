<?php
  require_once('headers.inc.php');
  require_once('autoloader.php');
  require 'vendor/autoload.php';
  use \Firebase\JWT\JWT;

  $data = json_decode(file_get_contents('php://input'));

  if(isset($data->getcontact)) {
    $id = Clean::string($data->id);
    $contactUserId = Clean::string($data->contactUserId);
    $token = $data->token;
    $secretKey = 'phonebook';

    if($token) {
      try {
        $jwt = JWT::decode($token, $secretKey, array('HS256'));
        $contact = Contact::findById($id);

        if(isset($contact['contactUserId']) && $contact['contactUserId'] === $contactUserId) {
          $output = array(
            'error' => false,
            'message' => false,
            'contact' => $contact
          );
          echo json_encode($output);
        } else {
          $output = array(
            'error' => true,
            'message' => 'You dont have permission to view this contact'
          );
          echo json_encode($output);
        }
      }catch (Exception $e) {
        $output = array(
          'error' => true,
          'message' => 'Your session expired, please log in'
        );
        echo json_encode($output);
      }
    } else {
      $output = array(
        'error' => true,
        'message' => 'You dont have permission to do this'
      );
      echo json_encode($output);
    }
  }
?>