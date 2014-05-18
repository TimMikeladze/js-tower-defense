var Pig = function (sprite, position, speed, width, height, scale) {
	Entity.call(this, sprite, position, width, height, scale);

	this.speed = speed;
	this.state = Pig.IDLING;
	this.path = null;
	this.moveTime = null;

	this.currentPathIndex = 0;

	var renderParent = this.render;
	this.render = function (canvas) {
		renderParent.call(this, canvas);
	};

	this.tick = function (time, engine) {
		this.currentPathIndex += speed;
		if (this.currentPathIndex < this.path.length) {
			this.position = this.path[this.currentPathIndex];
			this.position = this.position.clone().set(this.position.x - this.width / 2, this.position.y - this.height/ 2);
		} else {
			this.destroy = true;
		}
	};

	this.setPath = function (path) {
		this.path = path;
	};
};

Pig.IDLING = 0

Pig.prototype = Object.create(Entity.prototype);
Pig.prototype.constructor = Pig;


