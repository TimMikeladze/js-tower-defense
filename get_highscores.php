<?
header('Access-Control-Allow-Origin: *'); 
require("init.php");

G::$DB->query("SELECT ID, Name, Score FROM highscores ORDER BY Score DESC");
$Results = G::$DB->to_array(false, MYSQLI_ASSOC);

echo json_encode($Results);

