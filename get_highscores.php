<?
header('Access-Control-Allow-Origin: *'); 
require("init.php");

$Limit = (int) $_GET['limit'];
$LimitSQL = "";
if (!empty($Limit)) {
    $LimitSQL = " LIMIT $Limit ";
}

G::$DB->query("SELECT ID, Name, Score FROM highscores ORDER BY Score DESC $LimitSQL");
$Results = G::$DB->to_array(false, MYSQLI_ASSOC);

echo json_encode($Results);

