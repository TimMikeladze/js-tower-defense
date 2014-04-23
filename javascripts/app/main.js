var LOCAL_SERVER = window.location.host == "timmikeladze.github.io" ? false : true;
var SERVER_URL = LOCAL_SERVER ? "http://192.168.1.101" : "http://71.19.151.5";
var SERVER_PORT = 9191;

Require.setBasePath("javascripts/app");
Require.setLibraryPath("javascripts/lib");
Require.setImagesPath("assets/img");

Require.addLibrary("timer", ["timer"]);
Require.addLibrary("socket.io", ["socket.io.min"]);

Require.addScript("util", ["prototypes", "logging"]);
Require.addScript("math", ["bezier", "vector2", "random"]);
Require.addScript("networking", ["connection"]);
Require.addScript("engine", ["funds", "gameengine", "input", "socketevents", "enemyqueue"]);
Require.addScript("graphics", ["canvas", "animation"]);
Require.addScript("entity", ["entity", "slingshot", "bird", "pig"]);

Require.addImage("pigs", ["pig2.png"]);
Require.addImage("birds", ["rbird1.png"]);

var gameCanvas;
var menuCanvas;
var connection;

Require.load(function () {
	Logging.DEBUG = true;
	Logging.VERBOSE = false;

	gameCanvas = new Canvas("main_canvas");
	gameCanvas.clear();
	menuCanvas = new Canvas("menu_canvas");
	menuCanvas.clear("D3D3D3");

	connection = new Connection(SERVER_URL, SERVER_PORT, false);
	connection.connect();

	var engine = new GameEngine(connection.socket);

	engine.init();
	engine.start();
});








