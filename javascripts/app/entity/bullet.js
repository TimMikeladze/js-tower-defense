var Bullet = function (x, y, degree, speed) {
	this.sprite = "towerone/bullet.png";
	this.x = x;
	this.y = y;
	this.degree = degree;
	this.speed = speed;
	this.index = 0;
	Entity.call(this, this.sprite, this.x, this.y, 48, 177, 5);
	//TODO(tim) x,y = v_i_xy, * t + 1/2 a_xy + t^2

	this.move = function() {

	};

	this.render = function () {
		var image = Require.getImage(this.sprite);
		var frame = this.animation.getFrame(0);
		gameCanvas.context.globalAlpha 	= this.alpha;
		gameCanvas.context.drawImage(image, frame.x, frame.y, frame.width, frame.height, this.x, this.y, this.width / this.scale, this.height / this.scale);
		gameCanvas.context.globalAlpha = 1.0;
	};

};

Bullet.prototype = Object.create(Entity.prototype);
Bullet.prototype.constructor = Bullet;


