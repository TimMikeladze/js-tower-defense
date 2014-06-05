var LOCAL_SERVER = window.location.host == "http://192.168.1.101" ? true : false;
var SERVER_URL = LOCAL_SERVER ? "http://192.168.1.101" : "http://71.19.151.5";
var SERVER_PORT = 9191;

var SHOW_BOUNDING_RECTANGLE = true;

Require.setBasePath("javascripts/app");
Require.setLibraryPath("javascripts/lib");
Require.setImagesPath("assets/img");
Require.setFilesPath("assets");

Require.addLibrary("timer", ["timer"]);
Require.addLibrary("socket.io", ["socket.io.min"]);
Require.addLibrary("howler", ["howler.min"]);
Require.addLibrary("ajax", ["ajax"]);

Require.addScript("util", ["prototypes", "logging"]);
Require.addScript("math", ["bezier", "vector2", "random"]);
Require.addScript("map", ["map", "tile"]);
Require.addScript("menus", ["menubutton", "sidebar", "ingamemenus", "highscores"]);
Require.addScript("engine", ["time", "collisions", "funds", "gameengine", "input", "enemyqueue"]);
Require.addScript("graphics", ["canvas", "animation", "animator"]);
Require.addScript("entity", ["entity", "bird", "pig", "redbird", "greenpig", "projectile", "redbirdprojectile", "mustachepig", "kingpig", "helmetpig", "yellowbird", "yellowbirdprojectile"]);

Require.addImage("pigs", ["pig0.png"]);
Require.addImage("pigs", ["pig1.png"]);
Require.addImage("pigs", ["pig2.png"]);
Require.addImage("pigs", ["pig3.png"]);
Require.addImage("birds", ["rbird1.png"]);
Require.addImage("birds", ["ybird0.png"]);
Require.addImage("canvasbg", ["bg1.png"]);
Require.addImage("menu", ["paused_title.png", "mini_logo.png", "gameover_title.png"]);
//Require.addFile("maps", ["map1.json"]);

Require.addImage("towers", ["redbird.png"]);
Require.addImage("towers", ["yellowbird.png"]);

Require.load(function () {
	Logging.DEBUG = true;
	Logging.VERBOSE = false;

	var canvasArea = document.getElementById("canvas_area");
	var menuArea = document.getElementById("menu_area");
	var creditsArea = document.getElementById("credits_area");
	var scoresArea = document.getElementById("scores_area");

	var playButton = new MenuButton();

	//high scores
	var scoresButton = new MenuButton();
	scoresButton.bindButton("high_scores_button", function () {
		scoresArea.style.display = "block";
		menuArea.style.display = "none";
		HighScores.showHighScores(20);
	});

	var backButton2 = new MenuButton();
	backButton2.bindButton("back_button2", function () {
		scoresArea.style.display = "none";
		menuArea.style.display = "block";
	})

	//credits
	var creditsButton = new MenuButton();
	creditsButton.bindButton("credits_button", function () {
		creditsArea.style.display = "block";
		menuArea.style.display = "none";
	});

	var backButton = new MenuButton();
	backButton.bindButton("back_button", function () {
		creditsArea.style.display = "none";
		menuArea.style.display = "block";
	})

	//play game
	playButton.bindButton("play_button", function () {
		canvasArea.style.display = "block";
		canvasArea.style.background = "none";
		menuArea.style.display = "none";

		var gameCanvas = new Canvas("game_canvas");
		gameCanvas.clear("#458B00");

		var sideCanvas = new Canvas("side_canvas");

		var engine = new GameEngine(gameCanvas, sideCanvas);

		engine.init();
		engine.start();
	});


});




