<?php
  require_once('headers.inc.php');
  require_once('autoloader.php');

  $error = false;
  $data = json_decode(file_get_contents('php://input'));

  if(isset($data->register)) {
    $args['userName'] = Clean::string($data->userName);
    $args['userEmail'] = Clean::string($data->userEmail);
    $userPassword = Clean::string($data->userPassword);
    $userRepeatedPassword = Clean::string($data->userRepeatedPassword);

    $errors['name'] = Validate::string($args['userName'], 'Name');
    $errors['email'] = Validate::email($args['userEmail']);
    $errors['password'] = Validate::password($userPassword, $userRepeatedPassword);

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
      $userExists = User::findArgsByColumnName($args['userEmail'], 'userEmail');

      if($userExists) {
        $output = array(
          'error' => true,
          'message' => 'Email already in use.'
        );
        echo json_encode($output);
      } else {
        $args['userPassword'] = md5($userPassword);
        $user = new User($args);
        $user->save();
        $output = array(
          'error' => false,
          'message' => 'You registered successfully.'
        );
        echo json_encode($output);
      }
    }
  } else {
    $output = array(
      'error' => true,
      'message' => 'You dont have permission for that'
    );
    echo json_encode($output);
  }
?>