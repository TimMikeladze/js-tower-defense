var YellowBird = function (position) {
	Bird.call(this, "birds/ybird0.png", position, 120, 200, 66, 65, 0.75);

	this.frameSpeeds = [1500, 500];
	this.animation = new Animation(this.sprite, this.width, this.height, this.scale, this.frameSpeeds);
	this.animator.setDefaultFrame(0);
	this.shotInterval = 2000;
	this.damage = 100;
	
	this.idlingFrames = [0, 1];
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
		var projectile = new YellowBirdProjectile(this.position.clone(), destination.clone());
		projectile.setRotationAngle(this.rotationAngle);
		projectile.setMaxFlightDistance(this.fireRadius);
		projectile.fire();
		engine.addProjectile(projectile);
	};
};

YellowBird.prototype = Object.create(Bird.prototype);
YellowBird.prototype.constructor = YellowBird;
