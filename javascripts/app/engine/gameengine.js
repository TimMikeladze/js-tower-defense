var GameEngine = function (gameCanvas, sideCanvas, socket) {
	this.gameCanvas = gameCanvas;
	this.sideCanvas = sideCanvas;
	this.socket = socket;

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
	
	this.map = null;
	this.sideBar = null;

	this.init = function () {
		this.time = new Time();

		this.sideBar = new SideBar();
		this.sideBar.initSideBar(this.sideCanvas);

		this.map = new Map();
		this.map.loadMap();

		this.enemyQueue = new EnemyQueue(this, this.map.path);
		this.enemyQueue.addWave(1);

		this.startInput();
		this.setSocketEventHandler();
	};

	this.empty = function () {
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
		this.map = null;
		this.sideBar = null;

		this.init();
		this.start();
	};

	this.start = function () {
		this.funds = new Funds(100);
		var that = this;
		(function gameLoop() {
			that.loop();
			requestAnimFrame(gameLoop, that.gameCanvas.canvas);
		})();
	};

	this.loop = function () {
		this.time.tick();
		if (this.pauseFlag === false) {
			this.update();
			this.render();
		} else {
			this.pause();
		}
		this.click = null;
	};

	this.pause = function () {
		log("paused");
		//render your pause menu here
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
		//TODO(tim) The render call for sidebar should only be done when it's updated, not on every frame,
		this.sideBar.render(this.sideCanvas);

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