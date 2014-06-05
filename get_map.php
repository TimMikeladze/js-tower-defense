<?
header('Access-Control-Allow-Origin: *');
require("init.php");

$Level = (int) $_GET['level'];
$LevelSQL = "";
if (!empty($Level)) {
	$LevelSQL = " WHERE Level = '$Level' ";
}

G::$DB->query("SELECT ID, Name, Level, Data FROM maps $LevelSQL ORDER BY RAND() LIMIT 1");;

if (G::$DB->record_count()) {
	list($ID, $Name, $Level, $Data) = G::$DB->next_record();
	echo json_encode(array("id" => $ID, "name" => $Name, "level" => $Level, "data" => $Data));
} else {
	echo json_encode(array("status" => "failure"));
}
