var GameEngine = function (gameCanvas, sideCanvas) {
	this.gameCanvas = gameCanvas;
	this.sideCanvas = sideCanvas;

	this.gameID = null;
	this.time = null;

	this.click = null;
	this.mouse = null;
	this.wheel = null;
	this.theScore = 0;

	this.pigs = [];
	this.birds = [];
	this.projectiles = [];
	this.floatingEntity = null;
	this.enemyQueue = null;

	this.pauseFlag = false;
	this.gameOverFlag = false;
	this.highScore = false;

	this.map = null;
	this.sideBar = null;
	this.stopFlag = false;

	this.menus = new InGameMenus(this.gameCanvas);

	this.init = function () {
		this.time = new Time();

		this.sideBar = new SideBar();
		this.sideBar.initSideBar(this.sideCanvas, this);

		var that = this;
		this.map = new Map();
		this.map.loadMap(null, function() {
			that.enemyQueue = new EnemyQueue(that);
			that.startInput();
		});
	};

	this.start = function () {
		var that = this;
		this.funds = new Funds(100);
		
		(function gameLoop() {
			that.loop();
			requestAnimFrame(gameLoop, that.gameCanvas.canvas);
		})();
	};

	this.stop = function() {
		this.stopFlag = true;

		this.gameCanvas = gameCanvas;
		this.sideCanvas = sideCanvas;

		this.gameID = null;
		this.time = null;
 
		this.click = null;
		this.mouse = null;
		this.wheel = null;
 
		this.pigs = [];
		this.birds = [];
		this.projectiles = [];
		this.floatingEntity = null;
		this.enemyQueue = null;
  
		this.pauseFlag = false;
		this.gameEnd = 0;
 
		this.map = null;
		if (this.sideBar.scoreLabel > 0) {
			this.highScore = true;
		}
		this.sideBar = null;
		this.menus = new InGameMenus(this.gameCanvas);
	};

	this.loop = function () {
		if (!this.stopFlag) {
			if (this.map.loaded) {
				if (this.sideBar.livesLabel <= 0) {
					this.gameOverFlag = true;
				}
				if (!this.gameOverFlag) {
					this.time.tick();
					if (!this.pauseFlag) {
						this.update();
						this.render();
					} else {
						this.pause();
					}
					this.click = null;
				} else {
					this.gameOver();
				}
			}
		}
	};

	this.pause = function () {
		this.menus.showPause();
	};

	this.gameOver = function () {
		this.theScore = this.sideBar.scoreLabel;
		this.menus.showGameOver();
		this.stop();
		if (this.gameOverFlag && this.highScore) {
			this.menus.showHighscorePrompt(this.theScore);
			this.gameOverFlag = false;
			this.highScore = false;
		} 
	};

	this.update = function () {
		this.updateEntities(this.pigs);
		this.updateEntities(this.birds);
		this.updateEntities(this.projectiles);
	};

	this.updateEntities = function (entities) {
		var that = this;
		var i = 0;
		entities.forEach(function (entity) {
			entity.tick(that.time, that);
			if (entity.destroy) {
				if (entity instanceof Pig) {
					that.sideBar.updateEnemiesLeft(-1);
				}
				entities.splice(i, 1);
			}
			i++;
		});
	};

	this.render = function () {
		var that = this;
		this.gameCanvas.clear();

		this.map.render(this.gameCanvas, true);

		if (this.floatingEntity) {
			this.floatingEntity.render(this.gameCanvas);
		}

		this.renderEntities(this.pigs);
		this.renderEntities(this.birds);
		this.renderEntities(this.projectiles);
	};

	this.renderEntities = function (entities) {
		var that = this;
		entities.forEach(function (entity) {
			entity.render(that.gameCanvas);
		});
	};

	this.addPig = function (pig) {
		this.pigs.push(pig);
	};

	this.addBird = function (bird) {
		this.birds.push(bird);
	};

	this.addProjectile = function (projectile) {
		this.projectiles.push(projectile);
	};
};