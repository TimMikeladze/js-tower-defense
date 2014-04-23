var Slingshot = function (x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.angle = 0;

	Entity.call(this, null, this.x, this.y, this.width, this.height, null);

	this.render = function () {
		gameCanvas.context.save();
		//TODO(tim) move this center of entity calculation to entity
		gameCanvas.context.translate(this.x + this.width / 2, this.y + this.height / 2);
		gameCanvas.context.rotate(this.angle * Math.PI / 180);
		gameCanvas.context.translate(-this.x - this.width / 2, -this.y - this.height / 2);
		gameCanvas.context.fillRect(this.x, this.y, this.width, this.height);
		gameCanvas.context.restore();
	};

	this.rotateTo = function (position) {

		var distance = position.distanceTo(this.position);
		var y = position.y - this.position.y;

		this.angle = Math.acos(y / distance) * Math.PI * 180;

		if (position.x > this.position.x && y > 0) {
			this.angle += 90;
		} else if (position.x < this.position.x && y < 0) {
			this.angle += 90;
		} else if (position.x < this.position.x && y > 0) {
			this.angle += 90;
		}
		/*
		 if (y > 0) {
		 log("below");
		 } else {
		 log("above");
		 }
		 if(position.x > this.position.x) {
		 log("right");
		 }
		 if(position.x < this.position.x) {
		 log("left");
		 }
		 */

		log(position.x + ", " + position.y + " " + this.angle);
	}

};


Slingshot.prototype = Object.create(Entity.prototype);
Slingshot.prototype.constructor = Slingshot;