<?php $name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$formcontent = "From: $name \n Message: $message";
$recipient = "kevbergstrom1@hotmail.com";
$subject = "Portfolio Contact Form";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("error");
?>