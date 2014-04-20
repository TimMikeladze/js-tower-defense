var Tower = function (x, y) {
	Entity.call(this, x, y);
	this.width = 25;
	this.height = 25;
	this.alpha = 0.5;

	this.placeTower = function () {
		this.alpha = 1.0;
	};

	this.render = function () {
		gameCanvas.context.globalAlpha = this.alpha;
		gameCanvas.context.fillStyle = "#FF0000";
		gameCanvas.context.fillRect(this.x, this.y, this.width, this.height);
		gameCanvas.context.globalAlpha = 1.0;
	};

	var old = this.toString;
	this.toString = function () {
		return old.call(this);
	};
};


Tower.prototype = Object.create(Entity.prototype);
Tower.prototype.constructor = Tower;