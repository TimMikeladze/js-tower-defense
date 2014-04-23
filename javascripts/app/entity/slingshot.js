var Slingshot = function (x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	Entity.call(this, null, this.x, this.y, this.width, this.height, null);

	this.render = function () {
		gameCanvas.context.fillRect(this.x, this.y, this.width, this.height);
	};

	this.rotateTo = function(position) {
		
	}
};


Slingshot.prototype = Object.create(Entity.prototype);
Slingshot.prototype.constructor = Slingshot;