var SideBar = function () {

	// Global Variables
	this.ctx = null;
	this.gameEngine = null;
	this.borderSize = 10;
	this, width = null;
	this.height = null;
	this.background = "rgba(34,139,34, .5)";
	// Score,waves, ememies and gold variables
	this.scoreLabel = 0;
	this.wavesLeftLabel = 0;
	this.enemiesLeftLabel = 0;
	this.goldLabel = 100;
	this.livesLabel = 5;
	// Buttons
	this.pauseButtonX1 = null;
	this.pauseButtonX2 = null;
	this.pauseButtonY1 = null;
	this.pauseButtonY2 = null;
	this.quitButtonX1 = null;
	this.quitButtonX2 = null;
	this.quitButtonY1 = null;
	this.quitButtonY2 = null;
	this.nextButtonX1 = null;
	this.nextButtonX2 = null;
	this.nextButtonY1 = null;
	this.nextButtonY2 = null;

	this.initSideBar = function (canvas, gameEngine) {
		this.ctx = canvas.context;
		this.gameEngine = gameEngine;
		this.width = canvas.width;
		this.height = canvas.length;

		this.initShapes(this.ctx);
		this.initStaticText(this.ctx);
		this.initValues(this.ctx);
	};

	this.initStaticText = function (ctx) {
		var textBorder = 5;
		ctx.save();
		// Title Logo
		ctx.drawImage(Require.getImage("menu/mini_logo.png"), 7, 10);

		// Score, Wave, Towers Left, Gold
		ctx.font = "15pt BadaBoom";
		ctx.fillText("Score:", (this.borderSize + textBorder), 100);
		ctx.fillText("Wave:", (this.borderSize + textBorder), 140);
		ctx.fillText("Remaining:", (this.borderSize + textBorder), 180);
		ctx.fillText("Gold:", (this.borderSize + textBorder), 225);
		ctx.fillText("Lives:", (this.borderSize + textBorder), 265);

		// Towers
		ctx.fillText("Towers:", (this.borderSize + textBorder), 330);
		// Next button
		ctx.font = "20pt BadaBoom";
		ctx.fillText("Send Wave", (this.borderSize + textBorder), 505);
		// Pause, Quit
		ctx.font = "14pt BadaBoom";
		ctx.fillText("Pause", (this.borderSize + textBorder), 532);
		ctx.fillText("Quit", ((this.width) / 2) + 10, 532);
		ctx.restore();
	};

	this.initShapes = function (ctx) {
		ctx.save();
		ctx.globalAlpha = 1;
		ctx.fillStyle = this.background;
		// Score and info box
		ctx.fillRect(this.borderSize, 80, this.width - (2 * this.borderSize), 220);
		// Towers box
		ctx.fillRect(this.borderSize, 310, this.width - 2 * this.borderSize, 165);
		// Next Wave box
		ctx.fillRect(this.borderSize, 480, this.width - 2 * this.borderSize, 30);
		// Pause button
		ctx.fillRect(this.borderSize, 515, (this.width - 30) / 2, 20);
		// Quit button
		ctx.fillRect(((this.width - this.borderSize) / 2) + this.borderSize, 515,
			(this.width - (3 * this.borderSize)) / 2, (2 * this.borderSize));
		ctx.globalAlpha = 1;

		this.pauseButtonX1 = this.borderSize;
		this.pauseButtonX2 = this.pauseButtonX1 + (this.width - 30) / 2;
		this.pauseButtonY1 = 515;
		this.pauseButtonY2 = this.pauseButtonY1 + 20;
		this.quitButtonX1 = ((this.width - this.borderSize) / 2) + this.borderSize;
		this.quitButtonX2 = this.quitButtonX1 + (this.width - (3 * this.borderSize)) / 2;
		this.quitButtonY1 = 515;
		this.quitButtonY2 = this.quitButtonY1 + (2 * this.borderSize);
		this.nextButtonX1 = this.borderSize;
		this.nextButtonX2 = this.nextButtonX1 + this.width - 2 * this.borderSize;
		this.nextButtonY1 = 480;
		this.nextButtonY2 = this.nextButtonY1 + 30;

		// Tower borders
		ctx.strokeRect(20, 340, 60, 60);
		ctx.strokeRect(20, 405, 60, 60);
		ctx.strokeRect(((this.width - 10) / 2) + 10, 340, 60, 60);
		ctx.strokeRect(((this.width - 10) / 2) + 10, 405, 60, 60);
		ctx.restore();
	};

	this.initValues = function (ctx) {
		ctx.font = "20px Verdana";
		// Init Score, Wave, Left, Gold
		ctx.fillText(this.scoreLabel, 70, 120);
		ctx.fillText(this.wavesLeftLabel, 70, 160);
		ctx.fillText(this.enemiesLeftLabel, 70, 205);
		ctx.fillText(this.goldLabel, 70, 245);
		ctx.fillText(this.livesLabel, 70, 290);
	};

	this.repaint = function (ctx, y, label) {
		ctx.clearRect(this.borderSize, y - 20, this.width - (2 * this.borderSize), 20);
		ctx.save();
		ctx.globalAlpha = 1;
		ctx.fillStyle = this.background;
		ctx.fillRect(this.borderSize, y - 20, this.width - (2 * this.borderSize), 20);
		ctx.restore();
		ctx.fillText(label, 70, y);
	};

	this.updateScore = function () {
		this.scoreLabel += 1;
		this.repaint(this.ctx, 120, this.scoreLabel);
	};

	this.updateWaves = function () {
		this.wavesLeftLabel += 1;
		this.repaint(this.ctx, 160, this.wavesLeftLabel);
	};

	this.updateEnemiesLeft = function (left) {
		this.enemiesLeftLabel += left;
		this.repaint(this.ctx, 205, this.enemiesLeftLabel);
		if (this.enemiesLeftLabel == 11) {
			this.wavesEnabled(true);
			console.log("en");
		}
	};

	this.updateGold = function (amount) {
		this.goldLabel += amount;
		this.repaint(this.ctx, 245, this.goldLabel);
	};

	this.updateLives = function () {
		this.livesLabel -= 1;
		this.repaint(this.ctx, 290, this.livesLabel);
	};

	this.newWave = function () {
		if ( this.enemiesLeftLabel == 0 ) {
			this.gameEngine.enemyQueue.addWave(1);
			this.wavesEnabled(false);
			console.log("dis")
		}
		else {
			console.log("There are still enemies out there bud!");
		}
	}

	this.wavesEnabled = function (status) {
		if (status) {
			// Restore
			this.ctx.clearRect(this.borderSize, 480, this.width - 2 * this.borderSize, 30);
			this.ctx.save();
			this.ctx.globalAlpha = 1;
			this.ctx.fillStyle = this.background;
			this.ctx.fillRect(this.borderSize, 480, this.width - 2 * this.borderSize, 30);
			this.ctx.restore();
			this.ctx.save();
			this.ctx.font = "20pt BadaBoom";
			this.ctx.fillText("Send Wave", (this.borderSize + 5), 505);
			this.ctx.restore();
		}
		else {
			// Grey out
			this.ctx.save();
			this.ctx.globalAlpha = 1;
			this.ctx.fillStyle = "rgba(96,96,96, .5)";
			this.ctx.fillRect(this.borderSize, 480, this.width - 2 * this.borderSize, 30);
			this.ctx.restore();
		}
	}

	this.checkButton = function (x, y) {
		if (x > this.pauseButtonX1 && x < this.pauseButtonX2 &&
			y > this.pauseButtonY1 && y < this.pauseButtonY2) {
			this.gameEngine.pauseFlag = !this.gameEngine.pauseFlag;
		}
		else if (x > this.quitButtonX1 && x < this.quitButtonX2 &&
			y > this.quitButtonY1 && y < this.quitButtonY2) {
			console.log("quit");
			this.gameEngine.init();
		}
		else if (x > this.nextButtonX1 && x < this.nextButtonX2 &&
			y > this.nextButtonY1 && y < this.nextButtonY2) {
			this.newWave();
		}
	};
};
