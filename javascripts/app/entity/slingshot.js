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

	this.rotateTo = function (location) {
		var distance = location.distanceTo(this.position);
		var y = location.y - this.position.y;

		if (location.x > this.position.x) {
			this.angle = Math.asin(y / distance);
		} else {
			this.angle = Math.acos(y / distance);
		}

		this.angle += 1.57079633;
	}

	this.setBird = function (bird) {
		this.bird = bird;
	};

	this.shoot = function(location) {

	};

};


Slingshot.prototype = Object.create(Entity.prototype);
Slingshot.prototype.constructor = Slingshot;