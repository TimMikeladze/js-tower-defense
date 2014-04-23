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
		// TODO update rotation, flip to always face the right direction
		var dy = position.y - this.position.y;
		var dx = position.x - this.position.x;
			
		var turn = Math.atan2(dy, dx) * 100 / Math.PI;
		
		this.angle =  turn / 32 - 160;
		
	}

	this.setBird = function (bird) {
		this.bird = bird;
	};

	this.shoot = function(location) {

	};

};


Slingshot.prototype = Object.create(Entity.prototype);
Slingshot.prototype.constructor = Slingshot;