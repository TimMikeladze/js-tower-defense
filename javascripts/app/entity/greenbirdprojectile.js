var GreenBirdProjectile = function (position, destination) {
	var velocity = new Vector2(1, 1);
	Projectile.call(this, "birds/gbird0.png", position, destination, velocity, 106, 74, 0.70);

	this.frameSpeeds = [500, 500];
	this.animation = new Animation(this.sprite, this.width, this.height, this.scale, this.frameSpeeds);
	this.animator.setDefaultFrame(0);

	this.inFlightFrames = [2];
	this.maxFlightDistanceFrames = [1];

};

GreenBirdProjectile.prototype = Object.create(Projectile.prototype);
GreenBirdProjectile.prototype.constructor = GreenBirdProjectile;