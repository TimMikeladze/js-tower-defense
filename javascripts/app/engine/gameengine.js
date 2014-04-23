var GameEngine = function (socket) {
	this.socket = socket;
	this.gameID = null;
	this.click = null;
	this.mouse = null;
	this.wheel = null;

	this.entities = [];
//	this.enemyQueue = new EnemyQueue(this);
	this.funds = null;

	this.localSlingshot = null;
	this.remoteSlingshot = null;

	this.init = function () {
		this.startInput();
		this.setSocketEventHandler();
	};

	this.start = function () {
	//	this.enemyQueue.populateEngine();
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
		log(canvasCenter);
		var sx = canvasCenter.x - sw / 2;
		var sy = canvasCenter.y - sh / 2;
		return new Slingshot(sx, sy, sw, sh);
	};

	this.loop = function () {
		this.update();
		this.draw();
		this.click = null;
	};

	this.update = function () {
		this.entities.forEach(function (entity) {
		});
	};

	this.draw = function () {
		gameCanvas.clear();
		this.entities.forEach(function (entity) {

		});
		this.localSlingshot.render();
	};

	this.addRemoteSlingshot = function() {
	};

	this.removeRemoteSlingshot = function() {
	};

};