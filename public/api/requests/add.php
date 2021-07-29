<?php
  require_once('headers.inc.php');
  require_once('autoloader.php');
  require "vendor/autoload.php";
  use \Firebase\JWT\JWT;

  $error = false;
  $data = json_decode(file_get_contents('php://input'));

  if(isset($data->add)) {
    $token = $data->token;
    $args['contactName'] = Clean::string($data->contactName);
    $args['contactNumber'] = Clean::string($data->contactNumber);
    $args['contactPicture'] = Clean::string($data->contactPicture);
    $args['contactUserId'] = Clean::string($data->contactUserId);
    $secretKey = 'phonebook';

    $errors['name'] = Validate::string($args['contactName'], 'Name');
    $errors['number'] = Validate::phone($args['contactNumber']);

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

          if($args['contactPicture']) {
            $destinationFolder = 'images/';
            $imageParts = explode(";base64,", $args['contactPicture']);
            $imageTypeAux = explode("image/", $imageParts[0]);
            $imageType = $imageTypeAux[1];
            $imageBase64 = base64_decode($imageParts[1]);
            $filename = uniqid() . '.png';
            $file = $destinationFolder . $filename;
            file_put_contents($file, $imageBase64);
            $args['contactPicture'] = $filename;
          }
          
          $newContact = new Contact($args);
          $newContact->save();

          $output = array(
            'error' => false,
            'message' => 'Contact added successfully'
          );
          echo json_encode($output);
        }catch (Exception $e) {
          $output = array(
            'error' => true,
            'message' => 'Unable to create contact'
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