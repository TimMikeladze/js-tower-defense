var Pig = function (x, y, width, height) {
	this.sprite = "pigs/pig2.png";
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.pointer = 0;

	Entity.call(this, this.sprite, this.x, this.y, this.width, this.height);

	this.bezierPoints = Bezier.calculateCurve(EnemyQueue.generatePath());

	this.renderPath = function () {
		this.bezierPoints.forEach(function (p) {
			gameCanvas.context.fillStyle = "#FF0000";
			gameCanvas.context.fillRect(p.x, p.y, 1, 1);
		});
	};

	this.render = function () {
		var image = Require.getImage(this.sprite);
		var frame = this.animation.getFrame(1);
		gameCanvas.context.drawImage(image, frame.x, frame.y, frame.width, frame.height, this.x, this.y, this.width / this.scale, this.height / this.scale);
	};

	this.move = function () {
		if (this.pointer < this.bezierPoints.length) {
			this.x = this.bezierPoints[this.pointer].x;
			this.y = this.bezierPoints[this.pointer].y;
			this.pointer++;
		}
	};
};

Pig.prototype = Object.create(Entity.prototype);
Pig.prototype.constructor = Pig;


