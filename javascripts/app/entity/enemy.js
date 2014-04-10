var Enemy = function (x, y, width, height) {
	Entity.call(this, x, y, width, height);
	this.speed = 1;

	this.render = function () {
		gameCanvas.context.fillStyle = "#0000FF";
		gameCanvas.context.fillRect(this.x, this.y, this.width, this.height);
	}

	this.move = function() {
		this.x = this.x + this.speed;
		if ((this.x + this.width > gameCanvas.width) || (this.x < 0)) {
		  this.speed = this.speed * - 1;
		}
	}
}


