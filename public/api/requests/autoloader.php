<?php
  spl_autoload_register('myAutoloader');

  function myAutoloader($className) {
    $url = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    $extension = '.class.php';
    if(strpos($url, 'requests')) {
      $path = '../classes/';
    } else {
      $path = 'classes/';
    }
    $className = strtolower($className);
    $nameOfFile = $path . $className . $extension;
    if(!file_exists($nameOfFile)) {
      return;
    }
    require_once $nameOfFile;
  }
?>