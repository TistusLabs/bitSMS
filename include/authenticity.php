<?php

// if logged in an navigated to login page redirect him to the main page
$actual_link = "$_SERVER[REQUEST_URI]";
if(isset($_COOKIE['securityToken'])){
    
    if($actual_link == "/bitSMS/auth/"){
        header("Location: ../");
    }
}else{
    if($actual_link == "/bitSMS/"){
        header("Location: auth/");
    }
}   

?>