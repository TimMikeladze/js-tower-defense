var YellowBirdProjectile = function (position, destination) {
	var velocity = new Vector2(1, 1);
	Projectile.call(this, "birds/ybird0.png", position, destination, velocity, 66, 65, 0.75);

	this.frameSpeeds = [500, 500];
	this.animation = new Animation(this.sprite, this.width, this.height, this.scale, this.frameSpeeds);
	this.animator.setDefaultFrame(0);

	this.inFlightFrames = [2];
	this.maxFlightDistanceFrames = [1];

};

YellowBirdProjectile.prototype = Object.create(Projectile.prototype);
YellowBirdProjectile.prototype.constructor = YellowBirdProjectile;
