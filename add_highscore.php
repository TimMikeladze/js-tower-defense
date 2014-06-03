<?
require("init.php");

$Name = db_string($_POST['name']);
$Score = db_string($_POST['score']);

if (!empty($Name) && !empty($Score)) {
	G::$DB->query("INSERT INTO highscores (Name, Score) VALUES ('$Name', '$Score')");
	echo json_encode(array("status" => "success"));
} else {
	echo json_encode(array("status" => "failure"));
}
