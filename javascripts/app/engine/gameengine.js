var GameEngine = function (gameCanvas, sideCanvas) {
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

	this.map = null;
	this.sideBar = null;

	this.init = function () {
		this.time = new Time();

		this.sideBar = new SideBar();
		this.sideBar.initSideBar(this.sideCanvas, this);

		this.map = new Map();
		this.map.loadMap();

		this.enemyQueue = new EnemyQueue(this, this.map.path);

		this.startInput();
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
		if (!this.pauseFlag) {
			this.update();
			this.render();
		} else {
			this.pause();
		}
		this.click = null;
	};

	this.pause = function () {
		log("paused");
		this.gameCanvas.clear();

		var ctx = this.gameCanvas.context;
		var img = Require.getImage("menu/paused_title.png");

		var x = this.gameCanvas.width / 2;
		var y = this.gameCanvas.height / 2;

		ctx.drawImage(Require.getImage("canvasbg/bg1.png"), 0, 0);
		ctx.drawImage(img, x - img.width / 3, y - img.height);

		ctx.font = "28pt BadaBoom";
		ctx.fillStyle = "#000";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("press P to unpause", x + 30, y + 20);
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