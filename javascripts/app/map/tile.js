var Tile = function (color, x, y, width, height) {
	this.color = color;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.alpha = 0.5;

	this.draw = function (canvas) {
		canvas.context.globalAlpha = this.alpha;
		canvas.context.fillStyle = this.color;
		canvas.context.fillRect(this.x, this.y, this.width, this.height);
		canvas.context.globalAlpha = 1.0;
	};

	this.getCenter = function () {
		return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
	};

	this.applyTile = function () {
		this.alpha = 1.0;
	};
};