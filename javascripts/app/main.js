var DEBUG = true;

Require.setBasePath("javascripts/app");

Require.add("util", ["prototypes", "logging"]);
Require.add("engine", ["gameengine", "input"]);
Require.add("graphics", ["canvas", "point"]);
Require.add("entity", ["entity", "something"]);

var gameCanvas;

Require.loadFiles(function () {

	gameCanvas = new Canvas("canvas");

	var entity = new Entity(1, 2);
	var something = new Something(gameCanvas.width / 2 - 25, gameCanvas.height / 2 - 25);

	var engine = new GameEngine();
	engine.init();
	engine.start();
	//engine.addEntity(something);
});








