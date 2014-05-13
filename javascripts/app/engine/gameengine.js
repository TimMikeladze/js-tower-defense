var GameEngine = function (canvas, socket) {
	this.canvas = canvas;

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

	this.init = function () {
		this.time = new Time();

		this.map = new Map(Require.getFile("maps/map1.json"));
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
			requestAnimFrame(gameLoop, that.canvas.canvas);
		})();
	};

	this.startMenu = function () {
		var width = 350;
		var height = 210;
		this.menu = new Menu(Require.getImage("menu/main.png"), width, height);
		this.menu.setCoordinates(this.canvas.width / 2 - width / 2, this.canvas.height / 2 - height / 2,
			this.canvas.width / 2 + width / 2, this.canvas.height / 2 + height / 2);
	}

	this.loop = function () {
		this.clockTick = this.time.tick();
		this.update();
		this.draw();
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

	this.draw = function () {
		var that = this;
		this.canvas.clear();

		this.map.render(this.canvas, true);

		if (this.floatingEntity) {
			this.floatingEntity.render(this.canvas);
		}

		this.entities.forEach(function (entity) {
			entity.render(that.canvas);
		});
	};

	this.addPig = function (pig) {
		this.entities.push(pig);
	};

};