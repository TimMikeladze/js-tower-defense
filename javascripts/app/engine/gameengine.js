var GameEngine = function(socket) {
	this.socket = socket;
	this.towers = [];
	this.remoteTowers = [];
	this.enemies = [];
	this.floatingEntity = null;
	this.click = null;
	this.mouse = null;
	this.wheel = null;

	this.init = function() {
		this.startInput();
		this.setSocketEventHandler();
	}

	this.start = function () {
		log("starting game");
		var that = this;
		(function gameLoop() {
			that.loop();
			requestAnimFrame(gameLoop, gameCanvas.canvas);
		})();
	}

	this.loop = function() {
		this.update();
		this.draw();
		this.click = null;
		this.wheel = null;
	}

	this.update = function() {
		this.towers.forEach(function (entity) {
		});

		this.enemies.forEach(function (entity) {
			entity.move();
		});
	}

	this.draw = function() {
		gameCanvas.clear();

		this.towers.forEach(function (entity) {
			entity.render();
		});

		this.remoteTowers.forEach(function (entity) {
			entity.render();
		});

		this.enemies.forEach(function (entity) {
			entity.render();
		});

		if (this.floatingEntity) {
			this.floatingEntity.render();
		}
	}

	this.addEnemy = function(entity) {
		this.enemies.push(entity);
	}

	this.setFloatingEntity = function(entity) {
		this.floatingEntity = entity;
	}

	this.clearFloatingEntitiy = function() {
		this.floatingEntity = null;
	}

	this.addTower = function() {
		this.towers.push(this.floatingEntity);
		this.socket.emit("updateTowers", this.towers);
	}

	this.addRemoteTower = function(entity) {
		this.remoteTowers.push(entity);
	}

}