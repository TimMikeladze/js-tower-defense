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
		this.sideBar.initSideBar(this.sideCanvas, this);

		this.map = new Map();
		this.map.loadMap();

		this.enemyQueue = new EnemyQueue(this, this.map.path);

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

		/*ctx.fillStyle = "#FFFFFF";
		ctx.strokeStyle = "#000000";
		ctx.letterSpacing = "2";
		ctx.font = "normal 70px FeastOfFlesh";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";*/
		this.gameCanvas.clear();
		var ctx = this.gameCanvas.context;
		ctx.drawImage(Require.getImage("canvasbg/bg1.png"), 0, 0);
		var img1 = Require.getImage("menu/resume0.png");
		var img2 = Require.getImage("menu/quit0.png");
		ctx.drawImage(img1, gameCanvas.width/2 - img1.width/3, gameCanvas.height/2-60);
		ctx.drawImage(img2, gameCanvas.width/2 - img2.width/3, gameCanvas.height/2+0);
		
		//ctx.lineWidth = "3";
		//ctx.strokeText("Resume", gameCanvas.width/2, gameCanvas.height/2-30);
		//ctx.fillText("Resume", gameCanvas.width/2, gameCanvas.height/2-30);		
		//ctx.fillText("Quit", gameCanvas.width/2, gameCanvas.height/2+30);
		//ctx.strokeText("Quit", gameCanvas.width/2, gameCanvas.height/2+30);
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