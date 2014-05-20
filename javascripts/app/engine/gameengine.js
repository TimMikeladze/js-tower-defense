var GameEngine = function (gameCanvas, sideCanvas, socket) {
	this.gameCanvas = gameCanvas;
	this.sideCanvas = sideCanvas;
	this.socket = socket;

	this.gameID = null;
	this.click = null;
	this.mouse = null;
	this.wheel = null;

	this.entities = [];
	this.floatingEntity = null;

	this.enemyQueue = null;
	this.funds = null;

	this.time = null;
	this.clockTick = null;

	this.map = null;

	this.sideBar = null;

	this.init = function () {
		this.time = new Time();

		this.sideBar = new SideBar();

		this.map = new Map();
		this.map.loadMap();

		this.enemyQueue = new EnemyQueue(this, 10, this.map.path, 3000);
		this.enemyQueue.populateEngine();

		this.startInput();
		this.setSocketEventHandler();
	};

	this.start = function () {
		this.funds = new Funds(100);
		var that = this;
		//this.startMenu();
		(function gameLoop() {
			that.loop();
			requestAnimFrame(gameLoop, that.gameCanvas.canvas);
		})();
	};

	this.startMenu = function () {
		var that = this;
		var main_menu = new Menu(gameCanvas, "menu/main.png", 0, 0);
		main_menu.start();
	};

	this.loop = function () {
		this.clockTick = this.time.tick();
		this.update();
		this.render();
		this.click = null;
	};

	this.update = function () {
		var that = this;

		var i = 0;
		this.entities.forEach(function (entity) {
			entity.tick(that.time, that);
			if (entity.destroy) {
				that.entities.splice(i, 1);
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

		this.entities.forEach(function (entity) {
			entity.render(that.gameCanvas);
		});
	};

	this.addPig = function (pig) {
		this.entities.push(pig);
	};

};