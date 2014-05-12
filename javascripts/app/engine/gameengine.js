var GameEngine = function (canvas, socket) {
	this.canvas = canvas;

	this.socket = socket;
	this.gameID = null;
	this.click = null;
	this.mouse = null;
	this.wheel = null;

	this.entities = [];
	this.floatingEntity = null;

	this.enemyQueue = new EnemyQueue(this);
	this.funds = null;

	this.time = null;
	this.clockTick = null;


	this.init = function () {
		this.time = new Time();
		this.startInput();
		this.setSocketEventHandler();
	};

	this.start = function () {
		this.funds = new Funds(100);
		var that = this;
		(function gameLoop() {
			that.loop();
			requestAnimFrame(gameLoop, that.canvas.canvas);
		})();
	};

	this.loop = function () {
		this.clockTick = this.time.tick();
		this.update();
		this.draw();
		this.click = null;
	};

	this.update = function () {
		var that = this;
		this.entities.forEach(function (entity) {
			entity.tick(that.time);
		});
	};

	this.draw = function () {
		var that = this;
		this.canvas.clear();

		if (this.floatingEntity) {
			this.floatingEntity.render(this.canvas);
		}

		this.entities.forEach(function (entity) {
			entity.render(that.canvas);
		});
	};

};