var LOCAL_SERVER = window.location.host == "timmikeladze.github.io" ? false : true;
var SERVER_URL = LOCAL_SERVER ? "http://192.168.1.101" : "http://71.19.151.5";
var SERVER_PORT = 9191;

var SHOW_BOUNDING_RECTANGLE = true;

Require.setBasePath("javascripts/app");
Require.setLibraryPath("javascripts/lib");
Require.setImagesPath("assets/img");
Require.setFilesPath("assets");

Require.addLibrary("timer", ["timer"]);
Require.addLibrary("socket.io", ["socket.io.min"]);

Require.addScript("util", ["prototypes", "logging"]);
Require.addScript("math", ["bezier", "vector2", "random"]);
Require.addScript("networking", ["connection"]);
Require.addScript("map", ["map", "tile"]);
Require.addScript("menus", ["menu", "sidebar"]);
Require.addScript("engine", ["time", "collisions", "funds", "gameengine", "input", "socketevents", "enemyqueue"]);
Require.addScript("graphics", ["canvas", "animation", "animator"]);
Require.addScript("entity", ["entity", , "bird", "pig", "redbird", "greenpig"]);

Require.addImage("pigs", ["pig0.png"]);
Require.addImage("birds", ["rbird1.png"]);

//Require.addFile("maps", ["map1.json"]);

Require.load(function () {
	Logging.DEBUG = true;
	Logging.VERBOSE = false;

	var menu = new Menu();

//	menu.bindButton("play_button", function() {
		var gameCanvas = new Canvas("game_canvas");
		gameCanvas.clear("#458B00");

		var sideCanvas = new Canvas("side_canvas");

		var connection = new Connection(SERVER_URL, SERVER_PORT, false);
		connection.connect();

		var engine = new GameEngine(gameCanvas, sideCanvas, connection.socket);

		engine.init();
		engine.start();
//	});

});




