var Tile = function (key, x, y, width, height, scale, applied) {
	this.key = key;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.id = this.generateID();
	this.scale = scale;
	this.alpha = applied ? 1.0 : 0.5;

	this.id = this.generateID();

	this.clone = function() {
		return new Tile(this.key, this.x, this.y, this.width, this.height, this.scale, true);
	}

	this.render = function (canvas) {
		canvas.context.globalAlpha = this.alpha;
		canvas.context.drawImage(Require.getImage(this.key), this.x, this.y, this.width, this.height);
		canvas.context.globalAlpha = 1.0;
	};

	this.getCenter = function () {
		return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
	};

	this.applyTile = function () {
		this.alpha = 1.0;
	};
};