var Enemy = function (x, y, width, height, color, speed) {
	Entity.call(this, null, x, y, width, height);
	this.pointer = 0;
	this.pathDrawn = false;

	this.bezierPoints = Bezier.calculateCurve(EnemyQueue.generatePath());

	this.renderPath = function () {
		this.bezierPoints.forEach(function (p) {
			gameCanvas.context.fillStyle = "#FF0000";
			gameCanvas.context.fillRect(p.x, p.y, 1, 1);
		});
	};

	this.render = function () {
		gameCanvas.context.fillStyle = color;
		gameCanvas.context.fillRect(this.x, this.y, this.width, this.height);
	};

	this.move = function () {
		if (this.pointer < this.bezierPoints.length) {
			this.x = this.bezierPoints[this.pointer].x;
			this.y = this.bezierPoints[this.pointer].y;
			this.pointer++;
		}
	};
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;


