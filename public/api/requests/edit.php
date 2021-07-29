<?php
  require_once('headers.inc.php');
  require_once('autoloader.php');
  require "vendor/autoload.php";
  use \Firebase\JWT\JWT;

  $error = false;
  $data = json_decode(file_get_contents('php://input'));

  if(isset($data->edit)) {
    $token = $data->token;
    $id = $data->id;
    $contactName = Clean::string($data->contactName);
    $contactNumber = Clean::string($data->contactNumber);
    $contactUserId = Clean::string($data->contactUserId);
    $secretKey = 'phonebook';

    $errors['name'] = Validate::string($contactName, 'Name');
    $errors['number'] = Validate::phone($contactNumber);

    foreach($errors as $err) {
      if(isset($err)) {
        $error = true;
        $output = array(
          'error' => true,
          'message' => $err
        );
        echo json_encode($output);
        break;                
      }
    }

    if(!$error) {
      if($token) {
        try {
          $jwt = JWT::decode($token, $secretKey, array('HS256'));
          
          $editContact = Contact::findById($id);
          if($editContact) {
            $editContact['contactName'] = $contactName;
            $editContact['contactNumber'] = $contactNumber;
            $editContact = new Contact($editContact);
            $editContact->save();
            $output = array(
              'error' => false,
              'message' => 'Contact edited successfully'
            );
            echo json_encode($output);
          } else {
            $output = array(
              'error' => true,
              'message' => 'Unable to edit contact'
            );
            echo json_encode($output);
          }
        }catch (Exception $e) {
          $output = array(
            'error' => true,
            'message' => 'Unable to edit contact'
          );
          echo json_encode($output);
        }
      } else {
        $output = array(
          'error' => true,
          'message' => 'Unable to create contact'
        );
        echo json_encode($output);
      }
    }    
  }
?>