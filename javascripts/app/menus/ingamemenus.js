var InGameMenus = function (canvas) {
	this.canvas = canvas;

	this.showPause = function () {
		this.canvas.clear();

		var ctx = this.canvas.context;
		var img = Require.getImage("menu/paused_title.png");

		var x = this.canvas.width / 2;
		var y = this.canvas.height / 2;

		ctx.drawImage(Require.getImage("canvasbg/bg1.png"), 0, 0);
		ctx.drawImage(img, x - img.width / 3, y - img.height);

		ctx.font = "28pt BadaBoom";
		ctx.fillStyle = "#000";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("press P to unpause", x + 30, y + 20);
	};

	this.showGameOver = function () {
		this.canvas.clear();

		var ctx = this.canvas.context;
		var img = Require.getImage("menu/gameover_title.png");

		var x = this.canvas.width / 2;
		var y = this.canvas.height / 2;

		ctx.drawImage(Require.getImage("canvasbg/bg1.png"), 0, 0);
		ctx.drawImage(img, x - img.width / 2 + 20, y - img.height);

		//Something needed here to go back to the main menu

		ctx.font = "28pt BadaBoom";
		ctx.fillStyle = "#000";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
	};

	this.showHighscorePrompt = function (engine) {
		var name = prompt("Congrats on the High Score!\n\nPlease enter your name...");
		var score2 = engine.sideBar.scoreLabel;
		ajax.post("http://71.19.151.5/highscores/add_highscore.php", {"name": name, score: score2}, function (response) {
			console.log(response);
		}
	};
}