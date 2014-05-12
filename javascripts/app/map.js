var LOCAL_SERVER = window.location.host == "timmikeladze.github.io" ? false : true;
var SERVER_URL = LOCAL_SERVER ? "http://192.168.1.101" : "http://71.19.151.5";
var SERVER_PORT = 9191;

Require.setBasePath("javascripts/app");
Require.setLibraryPath("javascripts/lib");
Require.setImagesPath("assets/img");

Require.addLibrary("timer", ["timer"]);
Require.addLibrary("socket.io", ["socket.io.min"]);

Require.addScript("util", ["prototypes", "logging"]);
Require.addScript("math", ["vector2", "bezier"]);
Require.addScript("map", ["map", "mapeditor", "tile"]);
Require.addScript("graphics", ["canvas", "animation"]);

Require.addImage("pigs", ["pig0.png"]);
Require.addImage("birds", ["rbird2.png"]);

var mapCanvas;
var connection;

Require.load(function () {
	Logging.DEBUG = true;
	Logging.VERBOSE = false;

	mapCanvas = new Canvas("map_canvas");
	mapCanvas.clear("#458B00");

	var mapEditor = new MapEditor(mapCanvas);

	mapEditor.init();
	mapEditor.start();

});








