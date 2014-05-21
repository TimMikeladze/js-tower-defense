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

	var halt = false;

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

	this.empty = function() {
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

		this.init();
		this.start();
	}

	this.start = function () {
		this.funds = new Funds(100);
		var that = this;
		(function gameLoop() {
			that.loop();
			if (halt == true) {
				return;
			}
			requestAnimFrame(gameLoop, that.gameCanvas.canvas);
		})();
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
		if (this.enemyQueue && this.enemyQueue.getRemainingEnemies() === 0) {
			var answer = confirm("Game over! Play again?");
			if (answer === true) {
				this.empty();
			} else {
				halt = true;
			}
		}
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