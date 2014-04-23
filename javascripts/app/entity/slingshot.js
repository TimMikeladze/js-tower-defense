var Slingshot = function (x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.angle = 0;

	this.bird = null;

	Entity.call(this, null, this.x, this.y, this.width, this.height, null);

	this.render = function () {
		if (this.bird) {
			this.bird.render(this.angle);
		}
	};

	this.rotateTo = function (position) {
		var distance = position.distanceTo(this.position);
		var y = position.y - this.position.y;

		if (position.x > this.position.x) {
			this.angle = Math.asin(y / distance);
		} else {
			this.angle = Math.acos(y / distance);
		}

		this.angle += 1.57079633;
	}

	this.setBird = function (bird) {
		this.bird = bird;
	};

};


Slingshot.prototype = Object.create(Entity.prototype);
Slingshot.prototype.constructor = Slingshot;