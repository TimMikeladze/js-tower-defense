var Entity = function (sprite, position, width, height, scale) {
	this.sprite = sprite;
	this.position = position;
	this.scale = scale ? scale : 1;
	this.width = width * scale;
	this.height = height * scale;

	this.time = null;

	this.destroy = false;

	this.currentFrames = [];
	this.currentFrame = 0;

	this.idlingFrames = [];

	this.animator = new Animator();

	this.id = Entity.generateID();

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

	this.getCenter = function() {
		return new Vector2(this.position.x + this.width / 2, this.position.y + this.height / 2);
	}

};

Entity.generateID = function() {
	var s = "";
	for (var i = 0; i < 32; i++) {
		s += Math.floor(Math.random() * 0xF).toString(0xF);
	}
	return s;
};
