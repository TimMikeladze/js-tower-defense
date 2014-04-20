var GameEngine = function (socket) {
	this.socket = socket;
	this.gameID = null;
	this.entities = [];
	this.enemies = [];
	this.click = null;
	this.mouse = null;
	this.enemyQueue = new EnemyQueue(this);

	this.init = function () {
		this.startInput();
		this.setSocketEventHandler();
	}

	this.start = function () {
		log("starting game");
		this.enemyQueue.populateEngine();
		var that = this;
		(function gameLoop() {
			that.loop();
			requestAnimFrame(gameLoop, gameCanvas.canvas);
		})();
	}

	this.loop = function () {
		this.update();
		this.draw();
		this.click = null;
	}

	this.update = function () {
		this.entities.forEach(function (entity) {
			if (entity instanceof Enemy) {
				entity.move();
			}
		});
	}

	this.draw = function () {
		gameCanvas.clear();
		var pathDrawn = false;

		this.entities.forEach(function (entity) {
			if (entity instanceof Enemy) {
				if (!pathDrawn) {
					entity.renderPath();
					pathDrawn = true;
				}
				entity.render();
			}
			if (entity instanceof Tower) {
				entity.render();
			}
		});

		if (this.floatingEntity) {
			this.floatingEntity.render();
		}
	}

	this.addEnemy = function (entity) {
		this.entities.push(entity);
	}

	this.setFloatingEntity = function (entity) {
		this.floatingEntity = entity;
	}

	this.clearFloatingEntitiy = function () {
		this.floatingEntity = null;
	}

	this.addTower = function (tower, emit) {
		tower.placeTower();
		this.entities.push(tower);
		if (emit) {
			this.socket.emit("addTower", tower);
		}
	};

}