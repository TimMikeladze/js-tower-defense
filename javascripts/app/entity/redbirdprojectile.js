var RedBirdProjectile = function (position, destination) {
	var velocity = new Vector2(1, 1);
	Projectile.call(this, "birds/rbird1.png", position, destination, velocity, 62, 62, 0.75);

	this.frameSpeeds = [500, 500];
	this.animation = new Animation(this.sprite, this.width, this.height, this.scale, this.frameSpeeds);
	this.animator.setDefaultFrame(0);

	this.inFlightFrames = [2];
	this.maxFlightDistanceFrames = [1];

};

RedBirdProjectile.prototype = Object.create(Projectile.prototype);
RedBirdProjectile.prototype.constructor = RedBirdProjectile;


