var LOCAL_SERVER = window.location.host == "http://192.168.1.101" ? true : false;
var SERVER_URL = LOCAL_SERVER ? "http://192.168.1.101" : "http://71.19.151.5";
var SERVER_PORT = 9191;

var SHOW_BOUNDING_RECTANGLE = false;

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
Require.addScript("entity", ["entity", "bird", "pig", "redbird", "greenpig", "projectile", "redbirdprojectile", "mustachepig", "kingpig", "helmetpig", "yellowbird", "yellowbirdprojectile", "greenbird", "greenbirdprojectile", "blackbird", "blackbirdprojectile"]);

Require.addImage("pigs", ["pig0.png", "pig1.png", "pig2.png", "pig3.png"]);
Require.addImage("birds", ["rbird1.png", "ybird0.png", "gbird0.png", "bbird0.png"]);
Require.addImage("canvasbg", ["bg1.png"]);
Require.addImage("menu", ["paused_title.png", "mini_logo.png", "gameover_title.png"]);

Require.addImage("towers", ["redbird.png", "yellowbird.png", "greenbird.png", "blackbird.png"]);

Require.addImage("maptiles", ["grass1.png", "grass2.png", "path0.png", "path1.png", "path2.png", "path3.png", "path4.png", "water0.png"]);

var canvasArea;
var menuArea;
var creditsArea;
var scoresArea;

Require.load(function () {
	Logging.DEBUG = true;
	Logging.VERBOSE = false;

	var backgroundMusic = new Howl({
			urls: ['assets/sounds/theme.mp3'],
			loop: true
		}).play();

	document.getElementById("loading_div").style.display = "none";
	document.getElementById("menu_div").style.display = "block";

	canvasArea = document.getElementById("canvas_area");
	menuArea = document.getElementById("menu_area");
	creditsArea = document.getElementById("credits_area");
	scoresArea = document.getElementById("scores_area");

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
		var table = document.getElementById("scoreTable");
		for(var i = table.rows.length - 1; i > 0; i--) {
    		table.deleteRow(i);
		}
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




