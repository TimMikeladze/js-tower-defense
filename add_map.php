<?
header('Access-Control-Allow-Origin: *');
require("init.php");

$Name = db_string($_POST['name']);
$Level = (int) $_POST['level'];
$Data = $_POST['map'];

if (!empty($Name) && !empty($Level) && !empty($Data)) {
	G::$DB->query("INSERT INTO maps (Name, Level, Data) VALUES ('$Name', '$Level', '$Data')");
	echo json_encode(array("status" => "success"));
} else {
	echo json_encode(array("status" => "failure"));
}
