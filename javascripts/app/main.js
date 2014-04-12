var DEBUG = true;

Require.setBasePath("javascripts/app");

Require.add("util", ["prototypes", "logging"]);
Require.add("math", ["bezier", "vector2", "random"]);
Require.add("engine", ["gameengine", "input"]);
Require.add("graphics", ["canvas", "point"]);
Require.add("entity", ["entity", "something", "enemy"]);

var gameCanvas;

var points = [];

Require.loadFiles(function () {

	gameCanvas = new Canvas("canvas");

	var entity = new Entity(1, 2);
	var something = new Something(gameCanvas.width / 2 - 25, gameCanvas.height / 2 - 25);

	var engine = new GameEngine();

	engine.init();
	engine.start();

	var controlPoints = [new Vector2(5.5, 55), new Vector2(62.5, 83), new Vector2(85.5, 160), new Vector2(153.5, 198), new Vector2(201.5, 250), new Vector2(267.5, 292), new Vector2(348.5, 273), new Vector2(390.5, 213), new Vector2(422.5, 127), new Vector2(477.5, 165), new Vector2(502.5, 228), new Vector2(525.5, 261), new Vector2(571.5, 328), new Vector2(596.5, 358)];

	var bezier = Bezier.calculateCurve(controlPoints);

	bezier.forEach(function (p) {
		gameCanvas.context.fillStyle = "#FF0000";
		gameCanvas.context.fillRect(p.x, p.y, 1, 1);
	});


});








