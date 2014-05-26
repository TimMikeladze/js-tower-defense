var RedBird = function (position) {
	Bird.call(this, "birds/rbird1.png", position, 100, 62, 62, 0.75);

	this.frameSpeeds = [1500, 500];
	this.animation = new Animation(this.sprite, this.width, this.height, this.scale, this.frameSpeeds);
	this.animator.setDefaultFrame(0);

	this.idlingFrames = [4, 3];

	var renderParent = this.render;
	this.render = function (canvas) {
		renderParent.call(this, canvas);
		if (this.state == Bird.FLOATING) {
			canvas.context.globalAlpha = this.alpha;
			canvas.context.drawFrame(this.sprite, this.animation.getFrame(this.idlingFrames[0]), this.position, this.width, this.height);
			canvas.context.globalAlpha = 1.0;
		} else {
			if (this.rotationAngle !== 0) {
				canvas.context.save();
				var cX = this.position.x + 0.5 * this.width;
				var cY = this.position.y + 0.5 * this.height;
				canvas.context.translate(cX, cY);
				if (this.minPig.position.x > this.position.x) {
					canvas.context.rotate(360 - ((Math.PI / 180) * -this.rotationAngle) + 45);
					canvas.context.scale(-1, 1);
				} else {
					canvas.context.rotate((Math.PI / 180) * this.rotationAngle);
				}
				canvas.context.translate(-cX, -cY);
				canvas.context.drawFrame(this.sprite, this.animation.getFrame(this.animator.currentFrameIndex()), this.position, this.width, this.height);
				canvas.context.restore();
			} else {
				canvas.context.drawFrame(this.sprite, this.animation.getFrame(this.animator.currentFrameIndex()), this.position, this.width, this.height);
			}
		}
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
	}
};

RedBird.prototype = Object.create(Bird.prototype);
RedBird.prototype.constructor = RedBird;


