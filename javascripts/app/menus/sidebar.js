var SideBar = function () {

	// Global Variables
	this.ctx = null;
	this.gameEngine = null;
	this.borderSize = 10;
	this,width = null;
	this.height = null;;
	// Score,waves, ememies and gold variables
	this.scoreLabel = 0;
	this.wavesLeftLabel = 0;
	this.enemiesLeftLabel = 0;
	this.goldLabel = 100;
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
		// Title
		ctx.font = "30px Verdana";
		ctx.fillText("Tower", 40, 35);
		ctx.fillText("Defense", 40, 60);
		ctx.fillText("Logo", 40, 85);
		// Score, Wave, Towers Left, Gold
		ctx.font = "20px Verdana";
		ctx.fillText("Score:", (this.borderSize + textBorder), 120);
		ctx.fillText("Wave:", (this.borderSize + textBorder), 160);
		ctx.fillText("Left:", (this.borderSize + textBorder), 200);
		ctx.fillText("Gold:", (this.borderSize + textBorder), 240);
		// Towers
		ctx.fillText("Towers:", (this.borderSize + textBorder), 300);
		// Next button
		ctx.font = "27px Verdana";
		ctx.fillText("Send Wave", (this.borderSize + textBorder), 490);
		ctx.font = "20px Verdana";
		// Pause, Quit
		ctx.fillText("Pause", (this.borderSize + textBorder), 532);
		ctx.fillText("Quit", ((this.width) / 2) + 10, 532);
		ctx.restore();
	};

	this.initShapes = function (ctx) {
		ctx.save();
		ctx.globalAlpha = 1;
		ctx.fillStyle = "rgba(34,139,34, .5)";
		// Logo Box TODO!! REMOVE THIS WHEN THE LOGO IS ADDED!!!
		ctx.strokeRect(this.borderSize, this.borderSize, this.width - (2 * this.borderSize), 80);
		// Score and info box
		ctx.fillRect(this.borderSize, 100, this.width - (2 * this.borderSize), 170);
		// Towers box
		ctx.fillRect(this.borderSize, 280, this.width - 2 * this.borderSize, 165);
		// Next Wave box
		ctx.fillRect(this.borderSize, 450, this.width - 2 * this.borderSize, 60);
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
		this.nextButtonY1 = 450;
		this.nextButtonY2 = this.nextButtonY1 + 60;

		// Tower borders
		ctx.strokeRect(20, 310, 60, 60);
		ctx.strokeRect(20, 375, 60, 60);
		ctx.strokeRect(((this.width - 10) / 2) + 10, 310, 60, 60);
		ctx.strokeRect(((this.width - 10) / 2) + 10, 375, 60, 60);
		ctx.restore();
	};

	this.initValues = function (ctx) {
		ctx.font = "20px Verdana";
		// Init Score, Wave, Left, Gold
		ctx.fillText(this.scoreLabel, 70, 140);
		ctx.fillText(this.wavesLeftLabel, 70, 180);
		ctx.fillText(this.enemiesLeftLabel, 70, 220);
		ctx.fillText(this.goldLabel, 70, 260);
	};

	this.repaint = function (ctx, y, label) {
		ctx.clearRect(this.borderSize, y - 20, this.width - (2 * this.borderSize), 20);
		ctx.save();
		ctx.globalAlpha = 1;
		ctx.fillStyle = "rgba(34,139,34, .5)";
		ctx.fillRect(this.borderSize, y - 20, this.width - (2 * this.borderSize), 20);
		ctx.restore();
		ctx.fillText(label, 70, y);
	};

	this.updateScore = function () {
		this.scoreLabel += 1;
		this.repaint(this.ctx, 140, this.scoreLabel);
	};

	this.updateWaves = function () {
		this.wavesLeftLabel += 1;
		this.repaint(this.ctx, 180, this.wavesLeftLabel);
	};

	this.updateEnemiesLeft = function (left) {
		this.enemiesLeftLabel += left;
		this.repaint(this.ctx, 220, this.enemiesLeftLabel);
	};

	this.updateGold = function (amount) {
		this.goldLabel += amount;
		this.repaint(this.ctx, 260, this.goldLabel);
	};

	this.checkButton = function (x, y) {
		if (x > this.pauseButtonX1 && x < this.pauseButtonX2 &&
			y > this.pauseButtonY1 && y < this.pauseButtonY2) {
			this.gameEngine.pauseFlag = !this.gameEngine.pauseFlag;
		}
		else if (x > this.quitButtonX1 && x < this.quitButtonX2 &&
			y > this.quitButtonY1 && y < this.quitButtonY2) {
			console.log("quit");
		}
		else if (x > this.nextButtonX1 && x < this.nextButtonX2 &&
			y > this.nextButtonY1 && y < this.nextButtonY2) {
			this.gameEngine.enemyQueue.addWave(1);
		}
	};
};
