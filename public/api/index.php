<?php
  $request = $_GET['request'];
  $filename = 'requests/' . $request . '.php';

  if(file_exists($filename)) {
    require($filename);
  } else {
    $output = array(
      'error' => true,
      'message' => 'Action does not exists'
    );
    echo json_encode($output);
  }
?>