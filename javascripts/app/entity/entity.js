var Entity = function (sprite, position, width, height, scale) {
	this.sprite = sprite;
	this.position = position;
	this.width = width;
	this.height = height;
	this.scale = scale ? scale : 1;

	this.time = null;

	this.destroy = false;

	this.currentFrames = [];
	this.currentFrame = 0;

	this.idlingFrames = [];

	this.toString = function () {
		return this.position.toString();
	};

	this.setPosition = function (v) {
		this.position = v.clone();
	};

	this.setDimensions = function (width, height) {
		this.width = width;
		this.height = height;
	};


	this.tick = function (time, engine) {

	};


};

