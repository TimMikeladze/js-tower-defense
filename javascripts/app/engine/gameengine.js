var GameEngine = function (socket) {
	this.socket = socket;
	this.gameID = null;
	this.click = null;
	this.mouse = null;
	this.wheel = null;

	this.entities = [];
	this.enemyQueue = new EnemyQueue(this);
	this.funds = null;

	this.localSlingshot = null;
	this.remoteSlingshot = null;

	//TODO(tim) remove this
	this.collisionOccured = false;

	this.init = function () {
		this.startInput();
		this.setSocketEventHandler();
	};

	this.start = function () {
		this.enemyQueue.populateEngine();
		this.funds = new Funds(100);
		this.localSlingshot = this.createInitialSlinghot();
		var that = this;
		(function gameLoop() {
			that.loop();
			requestAnimFrame(gameLoop, gameCanvas.canvas);
		})();
	};

	this.createInitialSlinghot = function() {
		var canvasCenter = gameCanvas.getCenter();
		var sw = 20;
		var sh = 20;
		var sx = canvasCenter.x - sw / 2;
		//TODO(tim) not adjustment here, confirm that isnt needed
		var sy = canvasCenter.y - sh;
		var s = new Slingshot(sx, sy, sw, sh);
		s.setBird(new Bird(sx, sy, 85, 100));
		return s;
	};

	this.loop = function () {
		this.update();
		this.draw();
		this.click = null;
	};

	this.update = function () {
		var that = this;
		this.entities.forEach(function (entity) {
			if (entity instanceof Pig) {
				entity.move();
				if (Collisions.isColliding(entity, that.localSlingshot.bird)) {
					if(!that.collisionOccured) {
						alert("Collision!");
						that.collisionOccured = true;
					}
				}
			}
		});
	};

	this.draw = function () {
		gameCanvas.clear();
		this.entities.forEach(function (entity) {
			entity.render();
		});

		this.localSlingshot.render();
	};

	this.addRemoteSlingshot = function() {
	};

	this.removeRemoteSlingshot = function() {
	};

	this.addPig = function(pig) {
		this.entities.push(pig);
	};

};