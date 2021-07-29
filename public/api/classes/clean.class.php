<?php
  class Clean {      
    public static function string($value) {
      $value = trim($value);
      $value = htmlspecialchars($value);
      return $value;
    }
  }
?>