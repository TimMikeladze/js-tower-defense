var Something = function (x, y) {
	Entity.call(this, x, y);
	this.width = 25;
	this.height = 25;
	this.speed = 1;

	this.render = function () {
		gameCanvas.context.globalAlpha = 0.5;
		gameCanvas.context.fillStyle = "#FF0000";
		gameCanvas.context.fillRect(this.x, this.y, this.width, this.height);
		gameCanvas.context.globalAlpha = 1.0;
	}

	this.move = function() {
		this.x = this.x + this.speed;
		if ((this.x + this.width > gameCanvas.width) || (this.x < 0)) {
		  this.speed = this.speed * - 1;
		}
	}

	var old = this.toString;
	this.toString = function () {
		return old.call(this);
	}
}


