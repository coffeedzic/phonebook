<?php
  require_once('headers.inc.php');
  require_once('autoloader.php');
  require 'vendor/autoload.php';
  use \Firebase\JWT\JWT;

  $data = json_decode(file_get_contents('php://input'));

  if(isset($data->login)) {
    $userEmail = Clean::string($data->userEmail);
    $userPassword = Clean::string($data->userPassword);

    $user = User::login($userEmail, md5($userPassword));

    if($user) {
      $secret_key = "phonebook";
      $issuerClaim = "coffeedzic";
      $audienceClaim = "THE_AUDIENCE";
      $issuedAtClaim = time();
      $notBeforeClaim = $issuedAtClaim;
      $expireClaim = $issuedAtClaim + 3600;
      $token = array(
        "iss" => $issuerClaim,
        "aud" => $audienceClaim,
        "iat" => $issuedAtClaim,
        "nbf" => $notBeforeClaim,
        "exp" => $expireClaim,
        "data" => array(
          "id" => $user['id'],
          "userName" => $user['userName'],
          "userEmail" => $user['userEmail']
        )
      );
      $jwt = JWT::encode($token, $secret_key);
      $output = array(
        "error" => false,
        "message" => "Login successful",
        "jwt" => $jwt,
        "email" => $user['userEmail'],
        "expireAt" => $expireClaim
      );
      echo json_encode($output);
    } else {
      $output = array(
        'error' => true,
        'message' => 'Wrong email or password'
      );
      echo json_encode($output);
    }
  } else {
    $output = array(
      'error' => true,
      'message' => 'Login unsuccessful'
    );
    echo json_encode($output);
  }
?>