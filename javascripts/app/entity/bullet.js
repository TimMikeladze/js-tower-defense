var Bullet = function (x, y) {
	this.sprite = "towerone/bullet.png";
	Entity.call(this, this.sprite, x, y, 48, 177, 5);

	this.render = function () {
		var image = Require.getImage(this.sprite);
		var frame = this.animation.getFrame(0);
		gameCanvas.context.globalAlpha = this.alpha;
		gameCanvas.context.drawImage(image, frame.x, frame.y, frame.width, frame.height, this.x, this.y, this.width / this.scale, this.height / this.scale);
		gameCanvas.context.globalAlpha = 1.0;
	};
};

Bullet.prototype = Object.create(Entity.prototype);
Bullet.prototype.constructor = Bullet;


