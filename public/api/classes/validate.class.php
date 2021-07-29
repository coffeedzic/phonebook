<?php
  class Validate {
    public static function string($string, $nameOfField) {
      if(empty($string)) {
        return $nameOfField . ' cannot be empty.';
      }
      if(!preg_match('/^[a-zA-ZZžćčđšŽĆČĐŠ\p{L}0-9\-\/\s,\.\+\?]*$/u', $string)) {
        return $nameOfField . ' can only contain letters, numbers, spaces and special characters "., /? -"';
      }
    }

    public static function email($email) {
      if(empty($email)) {
        return 'E-mail cannot be empty';
      }
      if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return 'E-mail is not valid';
      }
    }

    public static function password($password, $confirmPassword) {
      $uppercase = preg_match('@[A-Z]@', $password);
      $lowercase = preg_match('@[a-z]@', $password);
      $number    = preg_match('@[0-9]@', $password);

      if(!$uppercase || !$lowercase || !$number || strlen($password) < 6) {
        return 'Password must contain 6 characters, 1 number, 1 uppercase and 1 lowercase letter.';
      }
      if(empty($password)) {
        return 'Password cannot be empty';
      }
      if($password !== $confirmPassword) {
        return 'Passwords do not match.';
      }
    }

    public static function phone($phone) {
      if(empty($phone)) {
        return 'Phone number cannot be empty';
      }
      if(!preg_match('/^[+1-9][0-9]/', $phone)) {
        return 'Phone format is not valid';
      }
      if(strlen($phone) < 9 || strlen($phone) > 14) {
        return 'Phone must containt between 9 and 14 characters';
      }
    }
  }
?>