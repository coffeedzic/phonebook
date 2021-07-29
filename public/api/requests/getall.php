<?php
  require_once('headers.inc.php');
  require_once('autoloader.php');
  require 'vendor/autoload.php';
  use \Firebase\JWT\JWT;

  $data = json_decode(file_get_contents('php://input'));

  if(isset($data->getAll)) {
    $userId = $data->userId;
    $token = $data->token;
    $secretKey = 'phonebook';

    if($token) {
      try {
        $jwt = JWT::decode($token, $secretKey, array('HS256'));
        $contacts = Contact::findArgsByColumnName($userId, 'contactUserId', 'contactName', true);
        $contactsArray = [];

        if($contacts && $contacts->num_rows > 0) {
          while($contact = $contacts->fetch_assoc()) {
            array_push($contactsArray, $contact);
          }
        }

        $output = array(
          'error' => false,
          'contacts' => $contactsArray
        );
        echo json_encode($output);
      }catch (Exception $e) {
        $output = array(
          'error' => true,
          'message' => 'Error fetching contacts.'
        );
        echo json_encode($output);
      }
    } else {
      $output = array(
        'error' => true,
        'message' => 'You dont have rights to fetch contacts.'
      );
      echo json_encode($output);
    }
  } else {
    $output = array(
      'error' => true,
      'message' => 'Error fetching contacts.'
    );
    echo json_encode($output);
  }
?>

