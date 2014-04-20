var Enemy = function (x, y, width, height, color, speed) {
	Entity.call(this, x, y, width, height);
	this.pointer = 0;

	this.controlPoints = [new Vector2(5.5, 55), new Vector2(62.5, 83), new Vector2(85.5, 160), new Vector2(153.5, 198), new Vector2(201.5, 250), new Vector2(267.5, 292), new Vector2(348.5, 273), new Vector2(390.5, 213), new Vector2(422.5, 127), new Vector2(477.5, 165), new Vector2(502.5, 228), new Vector2(525.5, 261), new Vector2(571.5, 328), new Vector2(596.5, 358)];

	this.bezierPoints = Bezier.calculateCurve(this.controlPoints);


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


