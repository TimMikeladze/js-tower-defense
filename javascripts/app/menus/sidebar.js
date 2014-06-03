var SideBar = function () {

	// Global Variables
	this.ctx = null;
	this.borderSize = 10;
	this,width = null;
	this.height = null;;
	// Score,waves, ememies and gold variables
	this.scoreLabel = 0;
	this.wavesLeftLabel = 0;
	this.enemiesLeftLabel = 0;
	this.goldLabel = 0;

	this.render = function (canvas) {



	}

	this.initSideBar = function (canvas) {
		this.ctx = canvas.context;
		this.width = canvas.width;
		this.height = canvas.length;

		this.initShapes(this.ctx);
		this.initStaticText(this.ctx);
		this.initValues(this.ctx);
	}

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
		// Pause, Quit
		ctx.fillText("Pause", (this.borderSize + textBorder), 532);
		ctx.fillText("Quit", ((this.width) / 2) + 10, 532);
		ctx.restore();
	}

	this.initShapes = function (ctx) {
		ctx.save();
		ctx.globalAlpha = 0.2;
		ctx.fillStyle = "rgba(34,139,34, .5)";
		// Logo Box TODO!! REMOVE THIS WHEN THE LOGO IS ADDED!!!
		ctx.strokeRect(this.borderSize, this.borderSize, this.width - (2 * this.borderSize), 80);
		// Score and info box
		ctx.fillRect(this.borderSize, 100, this.width - (2 * this.borderSize), 170);
		// Towers box
		ctx.fillRect(this.borderSize, 280, this.width - 2 * this.borderSize, 230);
		// Pause button
		ctx.fillRect(this.borderSize, 515, (this.width - 30) / 2, 20);
		// Quit button
		ctx.fillRect(((this.width - this.borderSize) / 2) + this.borderSize, 515, (this.width - (3 * this.borderSize)) / 2, (2 * this.borderSize));

		// Tower borders
		ctx.strokeRect(20, 310, 60, 60);
		ctx.strokeRect(20, 375, 60, 60);
		ctx.strokeRect(20, 440, 60, 60);
		ctx.strokeRect(((this.width - 10) / 2) + 10, 310, 60, 60);
		ctx.strokeRect(((this.width - 10) / 2) + 10, 375, 60, 60);
		ctx.strokeRect(((this.width - 10) / 2) + 10, 440, 60, 60);
		ctx.restore();
	}

	this.initValues = function (ctx) {
		ctx.font = "20px Verdana";
		// Init Score, Wave, Left, Gold
		ctx.fillText(this.scoreLabel, 70, 140);
		ctx.fillText(this.wavesLeftLabel, 70, 180);
		ctx.fillText(this.enemiesLeftLabel, 70, 220);
		ctx.fillText(this.goldLabel, 70, 260);
	}

	this.updateScore = function () {
		this.scoreLabel += 1;
	}

	this.updateWaves = function (wavesLeft) {
		this.wavesLeftLabel = wavesLeft;
	}

	this.updateEnemiesLeft = function () {
		this.enemiesLeftLabel -= 1;
	}

	this.updateGold = function () {
		this.goldLabel += 100;
	}
};
