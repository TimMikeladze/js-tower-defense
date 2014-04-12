var DEBUG = true;

Require.setBasePath("javascripts/app");

Require.add("util", ["prototypes", "logging"]);
Require.add("math", ["bezier", "vector2", "random"]);
Require.add("engine", ["gameengine", "input"]);
Require.add("graphics", ["canvas"]);
Require.add("entity", ["entity", "something", "enemy"]);

var gameCanvas;

Require.loadFiles(function () {

	gameCanvas = new Canvas("canvas");

	var entity = new Entity(1, 2);
	var something = new Something(gameCanvas.width / 2 - 25, gameCanvas.height / 2 - 25);

	var engine = new GameEngine();

	engine.init();
	engine.start();

	var enemy = new Enemy();
	enemy.setDimensions(10, 10);
	engine.addEnemy(enemy);



});








