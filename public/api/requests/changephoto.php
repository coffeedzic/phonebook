<?php
  require_once('headers.inc.php');
  require_once('autoloader.php');
  require 'vendor/autoload.php';
  use \Firebase\JWT\JWT;

  $data = json_decode(file_get_contents('php://input'));

  if(isset($data->changephoto)) {
    $id = Clean::string($data->id);
    $contactUserId = Clean::string($data->contactUserId);
    $contactPicture = ($data->contactPicture);
    $token = $data->token;
    $secretKey = 'phonebook';

    if($token) {
      try {
        $jwt = JWT::decode($token, $secretKey, array('HS256'));
        $contact = Contact::findById($id);

        if(isset($contact['contactUserId']) && $contact['contactUserId'] === $contactUserId) {
          $userPhotoToDelete = new Contact($contact);
          if(isset($userPhotoToDelete->contactPicture) && !$userPhotoToDelete->contactPicture == '') {
            $destinationFolder = 'images/';
            $photoToDelete = $destinationFolder . $userPhotoToDelete->contactPicture;
            unlink($photoToDelete);
          }

          $destinationFolder = 'images/';
          $imageParts = explode(";base64,", $contactPicture);
          $imageTypeAux = explode("image/", $imageParts[0]);
          $imageType = $imageTypeAux[1];
          $imageBase64 = base64_decode($imageParts[1]);
          $filename = uniqid() . '.png';
          $file = $destinationFolder . $filename;
          file_put_contents($file, $imageBase64);
          $contact['contactPicture'] = $filename;

          $editPhoto = new Contact($contact);
          $editPhoto->save();
          
          $output = array(
            'error' => false,
            'message' => 'Photo changed successfully'
          );
          echo json_encode($output);
        } else {
          $output = array(
            'error' => true,
            'message' => 'You dont have permission to change photo'
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
    }
  }
?>