<?
foreach (glob("classes/*.php") as $Filename)
{
    include $Filename;
}


$DB = new DB_MYSQL;
G::initialize();
session_start();



?>
