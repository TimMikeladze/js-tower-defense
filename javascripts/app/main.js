var DEBUG = true;

Require.setBasePath("javascripts/app");

Require.add("util", ["prototypes", "logging"]);
Require.add("engine", ["gameengine", "input"]);
Require.add("graphics", ["canvas", "point"]);
Require.add("entity", ["entity", "something", "enemy"]);

var gameCanvas;

Require.loadFiles(function () {

	gameCanvas = new Canvas("canvas");

	var entity = new Entity(1, 2);
	var something = new Something(gameCanvas.width / 2 - 25, gameCanvas.height / 2 - 25);

	var engine = new GameEngine();

	engine.init();
	engine.start();

	for (var i = 0; i <  5; i++) {
		var x = getRandomArbitary(0, gameCanvas.width);
		var y = getRandomArbitary(0, gameCanvas.height);
		var width = getRandomArbitary(15, 25);
		engine.addEnemy(new Enemy(x, y, width, width));
	};

	//engine.addEntity(something);
});








