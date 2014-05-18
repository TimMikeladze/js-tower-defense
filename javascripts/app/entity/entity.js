var Entity = function (sprite, position, width, height, scale) {
	this.sprite = sprite;
	this.position = position;
	this.scale = scale ? scale : 1;
	this.width = width * scale
	this.height = height * scale;

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

	this.tick = function (time, engine) {

	};

	this.render = function (canvas) {
		if (canvas && SHOW_BOUNDING_RECTANGLE) {
			canvas.context.beginPath();
			canvas.context.rect(this.position.x, this.position.y, this.width, this.height);
			canvas.context.stroke();
		}
	};

	this.renderParent = this.render;


};

