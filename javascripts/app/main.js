var DEBUG = true;
var SERVER_URL = "http://192.168.1.101";
var SERVER_PORT = 9191;

Require.setBasePath("javascripts/app");
Require.setLibraryPath("javascripts/lib");

Require.addLibrary("socket.io", ["socket.io.min"]);

Require.add("util", ["prototypes", "logging"]);
Require.add("math", ["bezier", "vector2", "random"]);
Require.add("networking", ["connection"]);
Require.add("engine", ["gameengine", "input"]);
Require.add("graphics", ["canvas"]);
Require.add("entity", ["entity", "tower", "enemy"]);

var gameCanvas;
var connection;

Require.loadFiles(function () {
	gameCanvas = new Canvas("canvas");

	connection = new Connection(SERVER_URL, SERVER_PORT);
	connection.connect();

	connection.socket.on('news', function (data) {
		console.log(data);
		connection.socket.emit('my other event', { my: 'data' });
	});

	var engine = new GameEngine();

	engine.init();
	engine.start();

	var enemy = new Enemy();
	enemy.setDimensions(10, 10);
	//engine.addEnemy(enemy);
});








