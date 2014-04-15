
var LOCAL_SERVER = false;
var SERVER_URL = LOCAL_SERVER ? "http://192.168.1.101" : "http://71.19.151.5";
var SERVER_PORT = 9191;

Require.setBasePath("javascripts/app");
Require.setLibraryPath("javascripts/lib");

Require.addLibrary("socket.io", ["socket.io.min"]);

Require.add("util", ["prototypes", "logging"]);
Require.add("math", ["bezier", "vector2", "random"]);
Require.add("networking", ["connection"]);
Require.add("engine", ["gameengine", "input", "socketevents", "enemyqueue"]);
Require.add("graphics", ["canvas"]);
Require.add("entity", ["entity", "tower", "enemy"]);

var gameCanvas;
var connection;

Require.loadFiles(function () {
	Logging.DEBUG = true;
	Logging.VERBOSE = false;

	gameCanvas = new Canvas("canvas");

	connection = new Connection(SERVER_URL, SERVER_PORT);
	connection.connect();

	var engine = new GameEngine(connection.socket);

	engine.init();
	engine.start();

	var enemy = new Enemy();
	enemy.setDimensions(10, 10);
	engine.addEnemy(enemy);
});








