var LOCAL_SERVER = window.location.host == "timmikeladze.github.io" ? false : true;
var SERVER_URL = LOCAL_SERVER ? "http://192.168.1.101" : "http://71.19.151.5";
var SERVER_PORT = 9191;

Require.setBasePath("javascripts/app");
Require.setLibraryPath("javascripts/lib");
Require.setImagesPath("assets/img");

Require.addLibrary("timer", ["timer"]);
Require.addLibrary("socket.io", ["socket.io.min"]);
Require.addLibrary("ajax", ["ajax"]);

Require.addScript("util", ["prototypes", "logging"]);
Require.addScript("math", ["vector2", "bezier"]);
Require.addScript("map", ["map", "mapeditor", "tile"]);
Require.addScript("graphics", ["canvas", "animation"]);
Require.addScript("networking", ["connection"]);

Require.addImage("maptiles", ["grass1.png", "grass2.png", "path0.png", "path1.png", "path2.png", "path3.png", "path4.png", "water0.png"]);

var mapCanvas;
var connection;

Require.load(function () {
	Logging.DEBUG = true;
	Logging.VERBOSE = false;

	mapCanvas = new Canvas("map_canvas");
	mapCanvas.clear("#458B00");

	var connection = new Connection(SERVER_URL, SERVER_PORT, false);
	connection.connect();
	var mapEditor = new MapEditor(mapCanvas, connection.socket);

	mapEditor.init();
	mapEditor.start();

});








