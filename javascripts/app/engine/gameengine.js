var GameEngine = function(socket) {
	this.socket = socket;
	this.gameID = null;
	this.entities = [];
	this.enemies = [];
	this.click = null;
	this.mouse = null;
	this.enemyQueue = new EnemyQueue(this);

	this.init = function() {
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

	this.loop = function() {
		this.update();
		this.draw();
		this.click = null;
	}

	this.update = function() {
		this.enemies.forEach(function (entity) {
			entity.move();
		});
	}

	this.draw = function() {
		gameCanvas.clear();

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

	this.addTower = function(tower) {

	}

}