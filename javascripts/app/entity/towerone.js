var TowerOne = function (x, y) {
	this.sprite = Require.getImage("towerone/sprite.png");
	this.WIDTH = 118;
	this.HEIGHT = 118;
	this.MAX_ROTATION = 8;
	this.SCALE = 2;

	Tower.call(this, this.sprite, x, y, this.WIDTH, this.HEIGHT, this.SCALE, this.MAX_ROTATION);

};

TowerOne.prototype = Object.create(Tower.prototype);
TowerOne.prototype.constructor = TowerOne;