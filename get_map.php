<?
header('Access-Control-Allow-Origin: *');
require("init.php");

$Level = (int) $_GET['level'];
$LevelSQL = "";
if (!empty($Level)) {
	$LevelSQL = " WHERE Level = '$Level' ";
}

G::$DB->query("SELECT Name, Level, Data FROM maps $LevelSQL ORDER BY RAND() LIMIT 1");;

if (G::$DB->record_count()) {
	$Results = G::$DB->to_array(false, MYSQLI_ASSOC);
	echo json_encode($Results);
} else {
	echo json_encode(array("status" => "failure"));
}