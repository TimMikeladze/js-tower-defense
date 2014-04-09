function GameEngine() {
	this.entities = [];
	this.click = null;
	this.mouse = null;
	this.wheel = null;

	this.init = function() {
		this.startInput();
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
		this.entities.forEach(function (entity) {
			entity.move();
		});
	}

	this.draw = function() {
		gameCanvas.clear();
		this.entities.forEach(function (entity) {
			entity.render();
		});
	}

	this.addEntity = function(entity) {
		this.entities.push(entity);
	}
}