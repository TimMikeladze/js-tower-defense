var SideBar = function () {

	this.render = function (canvas) {
		// Global Variables
		var ctx = canvas.context;
		var borderSize = 10;
		var width = canvas.width;
		var height = canvas.length;
		// Score,waves, ememies and gold variables
		var scoreLabel = 0;
		var wavesLeftLabel = 0;
		var enemiesLeftLabel = 0;
		var goldLabel = 0;

		initShapes(ctx);
		initStaticText(ctx);
		initValues(ctx);

		function initStaticText(ctx) {
			var textBorder = 5;
			ctx.save();
			// Title
			ctx.font = "30px Verdana";
			ctx.fillText("Tower",40,35);
			ctx.fillText("Defense", 40, 60);
			ctx.fillText("Logo", 40, 85);
			// Score, Wave, Towers Left, Gold
			ctx.font = "20px Verdana";
			ctx.fillText("Score:", (borderSize + textBorder), 120);
			ctx.fillText("Wave:", (borderSize + textBorder), 160);
			ctx.fillText("Left:", (borderSize + textBorder), 200);
			ctx.fillText("Gold:", (borderSize + textBorder), 240);
			// Towers
			ctx.fillText("Towers:", (borderSize + textBorder), 300);
			// Pause, Quit
			ctx.fillText("Pause", (borderSize + textBorder), 532);
			ctx.fillText("Quit", ((width) / 2) + 10, 532);
			ctx.restore();
		}

		function initShapes(ctx) {
			ctx.save();
			ctx.globalAlpha = 0.2;	
			ctx.fillStyle = "rgba(34,139,34, .5)";
			// Logo Box TODO!! REMOVE THIS WHEN THE LOGO IS ADDED!!!
			ctx.strokeRect(borderSize, borderSize, width - (2 * borderSize), 80);
			// Score and info box
			ctx.fillRect(borderSize, 100, width - (2 * borderSize), 170);
			// Towers box
			ctx.fillRect(borderSize, 280, width - 2 * borderSize, 230);
			// Pause button
			ctx.fillRect(borderSize, 515, (width - 30) / 2, 20);
			// Quit button
			ctx.fillRect(((width - borderSize) / 2) + borderSize, 515, (width - (3 * borderSize)) / 2, (2 * borderSize));

			// Tower borders
			ctx.strokeRect(20, 310, 60, 60);
			ctx.strokeRect(20, 375, 60, 60);
			ctx.strokeRect(20, 440, 60, 60);
			ctx.strokeRect(((width - 10) / 2) + 10, 310, 60, 60);
			ctx.strokeRect(((width - 10) / 2) + 10, 375, 60, 60);
			ctx.strokeRect(((width - 10) / 2) + 10, 440, 60, 60);
			ctx.restore();
		}

		function initValues(ctx) {
			ctx.font = "20px Verdana";
			// Init Score, Wave, Left, Gold
			ctx.fillText(scoreLabel, 70, 140);
			ctx.fillText(wavesLeftLabel, 70, 180);
			ctx.fillText(enemiesLeftLabel, 70, 220);
			ctx.fillText(goldLabel, 70, 260);
		}

		function updateScore(newScore) {
			scoreLabel = newScore;
		}

		function updateWaves(wavesLeft) {
			wavesLeftLabel = wavesLeft;
		}

		function updateEnemiesLeft(enemiesLeft) {
			enemiesLeftLabel = enemiesLeft;
		}

		function updateGold(newGold) {
			goldLabel = newGold;
		}
	}
};
