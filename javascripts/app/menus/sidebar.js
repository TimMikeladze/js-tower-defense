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
	this.wavesLeftLabel = 1;
	this.enemiesLeftLabel = 0;
	this.level = 7;
	this.goldLabel = 400;
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
	this.redbirdButton = null;
	this.blackbirdButton = null;
	this.yellowbirdButton = null;
	this.greenbirdButton = null;

	// Birds (towers)
	this.redbird = Require.getImage("towers/redbird.png");
	this.yellowbird = Require.getImage("towers/yellowbird.png");
	this.greenbird = Require.getImage("towers/greenbird.png");
	this.blackbird = Require.getImage("towers/blackbird.png");

	this.initSideBar = function (canvas, gameEngine) {
		this.ctx = canvas.context;
		this.gameEngine = gameEngine;
		this.width = canvas.width;
		this.height = canvas.length;

		this.redbirdButton = [20, 340, 80, 400];
		this.blackbirdButton = [((this.width - 10) / 2) + 10, 405, ((this.width - 10) / 2) + 70, 465];
		this.yellowbirdButton = [((this.width - 10) / 2) + 10, 340, ((this.width - 10) / 2) + 70, 400];
		this.greenbirdButton = [20, 405, 80, 465];

		this.initShapes(this.ctx);
		this.initStaticText(this.ctx);
		this.initValues(this.ctx);
		this.loadImages();

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
		ctx.fillText("Level:", (this.borderSize + textBorder), 180);
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
		ctx.clearRect(this.borderSize, 80, this.width - (2 * this.borderSize), 220);
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

	this.loadImages = function () {
		this.ctx.save();
		var secondColumn = ((this.width - 10) / 2) + 10;

		if (this.goldLabel >= 200) {
			this.ctx.clearRect(20, 340, 60, 60);
			this.ctx.drawImage(this.redbird, 20, 340);
		}
		else {
			this.ctx.clearRect(20, 340, 60, 60);
			this.ctx.drawImage(this.redbird, 20, 340);
			this.ctx.fillStyle = this.background;
			this.ctx.fillRect(20, 340, 60, 60);
		}

		if (this.goldLabel >= 300) {
			this.ctx.clearRect(secondColumn, 340, 60, 60);
			this.ctx.drawImage(this.yellowbird, secondColumn, 340);
		}
		else {
			this.ctx.clearRect(secondColumn, 340, 60, 60);
			this.ctx.drawImage(this.yellowbird, secondColumn, 340);
			this.ctx.fillStyle = this.background;
			this.ctx.fillRect(secondColumn, 340, 60, 60);
		}

		if (this.goldLabel >= 400) {
			this.ctx.clearRect(20, 405, 60, 60);
			this.ctx.drawImage(this.greenbird, 20, 405);
		}
		else {
			this.ctx.clearRect(20, 405, 60, 60);
			this.ctx.drawImage(this.greenbird, 20, 405);
			this.ctx.fillStyle = this.background;
			this.ctx.fillRect(20, 405, 60, 60);
		}

		if (this.goldLabel >= 500) {
			this.ctx.clearRect(secondColumn, 405, 60, 60);
			this.ctx.drawImage(this.blackbird, secondColumn, 405);
		}
		else {
			this.ctx.clearRect(secondColumn, 405, 60, 60);
			this.ctx.drawImage(this.blackbird, secondColumn, 405);
			this.ctx.fillStyle = this.background;
			this.ctx.fillRect(secondColumn, 405, 60, 60);
		}

		this.ctx.restore();
	}

	this.initValues = function (ctx) {
		ctx.font = "20px BadaBoom";
		// Init Score, Wave, Left, Gold
		ctx.fillText(this.scoreLabel, 70, 120);
		ctx.fillText(this.wavesLeftLabel, 70, 160);
		ctx.fillText(this.level, 70, 205);
		ctx.fillText(this.goldLabel, 70, 245);
		ctx.fillText(this.livesLabel, 70, 290);
	};

	this.repaint = function (ctx, y, label) {
		ctx.clearRect(this.borderSize, y - 20, this.width - (2 * this.borderSize), 20);
		ctx.save();
		ctx.globalAlpha = 1;
		ctx.fillStyle = this.background;
		ctx.font = "20px BadaBoom";
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
		if (this.enemiesLeftLabel <= 0) {
			this.wavesEnabled(true);
		}
	};

	this.updateLevel = function () {
		this.level += 1;
		this.repaint(this.ctx, 205, this.level);
		var sound = new Howl({
			urls: ['assets/sounds/level_up0.wav']
		}).play();
	};

	this.updateGold = function (amount) {
		this.goldLabel += amount;
		this.repaint(this.ctx, 245, this.goldLabel);
		this.loadImages();
	};

	this.updateLives = function () {
		this.livesLabel -= 1;
		this.repaint(this.ctx, 290, this.livesLabel);
	};

	this.newWave = function () {
		if (this.enemiesLeftLabel <= 0) {
			this.updateWaves();
			if (this.wavesLeftLabel > 10) {
				this.wavesLeftLabel = 0;
				this.updateWaves();
				this.updateLevel();
			}
			this.gameEngine.enemyQueue.addWave(this.wavesLeftLabel, this.level);
			this.wavesEnabled(false);
		} else {
			console.log("There are still enemies out there bud!");
		}
	};

	this.wavesEnabled = function (status) {
		this.ctx.clearRect(this.borderSize, 480, this.width - 2 * this.borderSize, 30);
		this.ctx.save();
		this.ctx.globalAlpha = 1;
		this.ctx.fillStyle = this.background;
		this.ctx.fillRect(this.borderSize, 480, this.width - 2 * this.borderSize, 30);
		this.ctx.restore();
		this.ctx.save();	
		this.ctx.font = "20pt BadaBoom";
		if (!status) {
			this.ctx.fillStyle = "rgba(0,0,0, 0.2)";
		}
		this.ctx.fillText("Send Wave", (this.borderSize + 5), 505);
		this.ctx.restore();
	};

	this.checkButton = function (x, y) {
		if (x > this.pauseButtonX1 && x < this.pauseButtonX2 &&
			y > this.pauseButtonY1 && y < this.pauseButtonY2) {
			this.gameEngine.pauseFlag = !this.gameEngine.pauseFlag;
		}
		else if (x > this.quitButtonX1 && x < this.quitButtonX2 &&
			y > this.quitButtonY1 && y < this.quitButtonY2) {
			this.gameEngine.gameOver();
		}
		else if (x > this.nextButtonX1 && x < this.nextButtonX2 &&
			y > this.nextButtonY1 && y < this.nextButtonY2) {
			this.newWave();
		}
		else {
			this.checkIfTower(x, y);
		}
	};

	this.checkIfTower = function (x, y) {
		if (x > this.redbirdButton[0] && x < this.redbirdButton[2] &&
			y > this.redbirdButton[1] && y < this.redbirdButton[3]) {
			if (this.goldLabel >= 200) {
				this.gameEngine.floatingEntity = new RedBird(this.gameEngine.mouse);
				
			}
			return "red";
		}
		else if (x > this.yellowbirdButton[0] && x < this.yellowbirdButton[2] &&
			y > this.yellowbirdButton[1] && y < this.yellowbirdButton[3]) {
			if (this.goldLabel >= 300) {
				this.gameEngine.floatingEntity = new YellowBird(this.gameEngine.mouse);
				
			}
			return "gold";
		}
		else if (x > this.greenbirdButton[0] && x < this.greenbirdButton[2] &&
			y > this.greenbirdButton[1] && y < this.greenbirdButton[3]) {
			if (this.goldLabel >= 400) {
				this.gameEngine.floatingEntity = new GreenBird(this.gameEngine.mouse);
				
			}
			return "green";
		}
		else if (x > this.blackbirdButton[0] && x < this.blackbirdButton[2] &&
			y > this.blackbirdButton[1] && y < this.blackbirdButton[3]) {
			if (this.goldLabel >= 500) {
				this.gameEngine.floatingEntity = new BlackBird(this.gameEngine.mouse);

			}
			return "black";
		}

	}

	this.checkHover = function (x, y) {
		if (x > this.redbirdButton[0] && x < this.redbirdButton[2] &&
			y > this.redbirdButton[1] && y < this.redbirdButton[3]) {
			this.hoverRepaint("red");
		}
		else if (x > this.yellowbirdButton[0] && x < this.yellowbirdButton[2] &&
			y > this.yellowbirdButton[1] && y < this.yellowbirdButton[3]) {
			this.hoverRepaint("yellow");
		}
		else if (x > this.greenbirdButton[0] && x < this.greenbirdButton[2] &&
			y > this.greenbirdButton[1] && y < this.greenbirdButton[3]) {
			this.hoverRepaint("green");
		}
		else if (x > this.blackbirdButton[0] && x < this.blackbirdButton[2] &&
			y > this.blackbirdButton[1] && y < this.blackbirdButton[3]) {
			this.hoverRepaint("black");
		}
		else {
			this.hoverRepaint();
		}
	}

	this.hoverRepaint = function (bird) {
		this.ctx.save();
		var secondColumn = ((this.width - 10) / 2) + 10;

		this.ctx.fillStyle = this.background;
		this.ctx.clearRect(this.borderSize, 80, this.width - (2 * this.borderSize), 220);
		this.ctx.fillRect(this.borderSize, 80, this.width - (2 * this.borderSize), 220);
		this.ctx.restore();
		this.ctx.fillText("Gold:", (this.borderSize + 5), 100);
		this.ctx.fillText(this.goldLabel, 70, 120);
		switch (bird) {
			case "red":
				this.ctx.save();
				this.ctx.fillText("Red Bird", (this.borderSize + 5), 140);
				this.ctx.fillText("Cost", (this.borderSize + 5), 170);
				this.ctx.fillText("Damage", (this.borderSize + 5), 200);
				this.ctx.fillText("Range", (this.borderSize + 5), 230);
				this.ctx.fillText("Fire Rate", (this.borderSize + 5), 260);
				this.ctx.restore();
				break;
			case "yellow":
				this.ctx.save();
				this.ctx.fillText("Red Bird", (this.borderSize + 5), 140);
				this.ctx.fillText("Cost", (this.borderSize + 5), 170);
				this.ctx.fillText("Damage", (this.borderSize + 5), 200);
				this.ctx.fillText("Range", (this.borderSize + 5), 230);
				this.ctx.fillText("Fire Rate", (this.borderSize + 5), 260);
				this.ctx.restore();
				break;
			case "green":
				this.ctx.save();
				this.ctx.fillText("Red Bird", (this.borderSize + 5), 140);
				this.ctx.fillText("Cost", (this.borderSize + 5), 170);
				this.ctx.fillText("Damage", (this.borderSize + 5), 200);
				this.ctx.fillText("Range", (this.borderSize + 5), 230);
				this.ctx.fillText("Fire Rate", (this.borderSize + 5), 260);
				this.ctx.restore();
				break;
			case "black":
				this.ctx.save();
				this.ctx.fillText("Red Bird", (this.borderSize + 5), 140);
				this.ctx.fillText("Cost", (this.borderSize + 5), 170);
				this.ctx.fillText("Damage", (this.borderSize + 5), 200);
				this.ctx.fillText("Range", (this.borderSize + 5), 230);
				this.ctx.fillText("Fire Rate", (this.borderSize + 5), 260);
				this.ctx.restore();
				break;
			default:
				this.ctx.save();
				this.ctx.fillStyle = this.background;
				this.ctx.globalAlpha = 1;
				this.ctx.clearRect(this.borderSize, 80, this.width - (2 * this.borderSize), 220);
				this.ctx.fillRect(this.borderSize, 80, this.width - (2 * this.borderSize), 220);
				this.ctx.restore();
				this.ctx.save();
				// Next button
				this.ctx.font = "15pt BadaBoom";
				this.ctx.fillText("Score:", (this.borderSize + 5), 100);
				this.ctx.fillText("Wave:", (this.borderSize + 5), 140);
				this.ctx.fillText("Level:", (this.borderSize + 5), 180);
				this.ctx.fillText("Gold:", (this.borderSize + 5), 225);
				this.ctx.fillText("Lives:", (this.borderSize + 5), 265);
				this.ctx.font = "20px BadaBoom";
				// Init Score, Wave, Left, Gold
				this.ctx.fillText(this.scoreLabel, 70, 120);
				this.ctx.fillText(this.wavesLeftLabel, 70, 160);
				this.ctx.fillText(this.level, 70, 205);
				this.ctx.fillText(this.goldLabel, 70, 245);
				this.ctx.fillText(this.livesLabel, 70, 290);
				this.ctx.restore();
				break;
		}
	}
};
