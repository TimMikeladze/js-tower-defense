var BlackBird = function (position) {
	Bird.call(this, "birds/bbird0.png", position, 140, 600, 70, 91, 0.75);

	this.frameSpeeds = [1500, 500, 1000];
	this.animation = new Animation(this.sprite, this.width, this.height, this.scale, this.frameSpeeds);
	this.animator.setDefaultFrame(0);
	this.shotInterval = 1500;
	this.damage = 200;

	this.idlingFrames = [0, 1, 2];
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
		var projectile = new BlackBirdProjectile(this.position.clone(), destination.clone());
		projectile.setRotationAngle(this.rotationAngle);
		projectile.setMaxFlightDistance(this.fireRadius);
		projectile.setDamage(this.damage);
		projectile.fire();
		engine.addProjectile(projectile);
	};
};

BlackBird.prototype = Object.create(Bird.prototype);
BlackBird.prototype.constructor = BlackBird;