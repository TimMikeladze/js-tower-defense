var Enemy = function (x, y, width, height, color, speed) {
	Entity.call(this, x, y, width, height);
	this.pointer = 0;

	this.bezierPoints = Bezier.calculateCurve(EnemyQueue.generatePath());


	this.render = function () {
		this.bezierPoints.forEach(function (p) {
			gameCanvas.context.fillStyle = "#FF0000";
			gameCanvas.context.fillRect(p.x, p.y, 1, 1);
		});

		gameCanvas.context.fillStyle = color;
		gameCanvas.context.fillRect(this.x, this.y, this.width, this.height);

	}

	this.move = function() {
		if (this.pointer >= this.bezierPoints.length) {
			this.pointer = 0;
		}
		this.x = this.bezierPoints[this.pointer].x;
		this.y = this.bezierPoints[this.pointer].y;
		this.pointer++;

	}
}


