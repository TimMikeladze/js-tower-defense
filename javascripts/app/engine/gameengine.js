var GameEngine = function (canvas, socket) {
	this.socket = socket;
	this.gameID = null;
	this.click = null;
	this.mouse = null;
	this.wheel = null;

	this.entities = [];
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
		});
	};

	this.draw = function () {
		this.canvas.clear();
		this.entities.forEach(function (entity) {
			entity.render();
		});
	};

};