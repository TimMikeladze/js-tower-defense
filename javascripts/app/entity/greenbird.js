var GreenBird = function (position) {
	Bird.call(this, "birds/gbird0.png", position, 160, 400, 106, 74, 0.70);

	this.frameSpeeds = [1500, 500];
	this.animation = new Animation(this.sprite, this.width, this.height, this.scale, this.frameSpeeds);
	this.animator.setDefaultFrame(0);
	this.shotInterval = 1500;
	this.damage = 150;
	 
	this.idlingFrames = [1, 2];
	var renderParent = this.render;
	this.render = function (canvas) {
		renderParent.call(this, canvas);
	};

	var tickParent = this.tick;
	this.tick = function (time, engine) {
		this.time = this.time == null ? time.stamp : this.time;

		if (this.state == Bird.IDLING) {
			this.currentFrames = this.idlingFrames;
		}

		this.animator.tick(time, this.animation, this.currentFrames);

		tickParent.call(this, time, engine);
	};

	this.fire = function (destination, engine) {
		var projectile = new GreenBirdProjectile(this.position.clone(), destination.clone());
		projectile.setRotationAngle(this.rotationAngle);
		projectile.setMaxFlightDistance(this.fireRadius);
		projectile.setDamage(this.damage);
		projectile.fire();
		engine.addProjectile(projectile);
	};
};

GreenBird.prototype = Object.create(Bird.prototype);
GreenBird.prototype.constructor = GreenBird;