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
		this.startMenu();
		(function gameLoop() {
			that.loop();
			requestAnimFrame(gameLoop, that.gameCanvas.canvas);
		})();
	};

	this.startMenu = function () {
		var width = 350;
		var height = 210;
		this.menu = new Menu(Require.getImage("menu/main.png"), width, height);
		this.menu.setCoordinates(this.gameCanvas.width / 2 - width / 2, this.gameCanvas.height / 2 - height / 2,
			this.gameCanvas.width / 2 + width / 2, this.gameCanvas.height / 2 + height / 2);
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