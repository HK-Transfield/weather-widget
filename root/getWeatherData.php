<?php
    require_once('dbconnect.php'); // home database, change when at school

    if(!empty($_GET['town'])) {
      $default_query = "SELECT * FROM weather WHERE town="."'".$_GET['town']."'"; 

      $result = $con->query($default_query); // get result of query from database
      if (!$con) {
          die('Oops, could not connect: ' . mysql_error());
        }

      $row = $result->fetch(PDO::FETCH_ASSOC);
      $JSON = json_encode($row);

      echo $JSON;
    }
