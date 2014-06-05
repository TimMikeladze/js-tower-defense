var RedBird = function (position) {
	Bird.call(this, "birds/rbird1.png", position, 100, 100, 62, 62, 0.75);

	this.frameSpeeds = [1500, 500];
	this.animation = new Animation(this.sprite, this.width, this.height, this.scale, this.frameSpeeds);
	this.animator.setDefaultFrame(0);

	this.idlingFrames = [4, 3];
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
		var projectile = new RedBirdProjectile(this.position.clone(), destination.clone());
		projectile.setRotationAngle(this.rotationAngle);
		projectile.setMaxFlightDistance(this.fireRadius);
		projectile.fire();
		engine.addProjectile(projectile);
	};
};

RedBird.prototype = Object.create(Bird.prototype);
RedBird.prototype.constructor = RedBird;


