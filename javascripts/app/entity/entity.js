var Entity = function (sprite, x, y, width, height, scale) {
	this.sprite = sprite;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.scale = scale;
	this.alpha = 1;

	if (this.sprite) {
		this.animation = new Animation(this.sprite, this.width, this.height);
	}

	this.toString = function () {
		return "x: " + this.x + ", y: " + this.y;
	};

	this.render = function () {

	};

	this.setCoordinates = function(x, y) {
		this.x = x;
		this.y = y;
	};

	this.setDimensions = function(width, height) {
		this.width = width;
		this.height = height;
	};
};

