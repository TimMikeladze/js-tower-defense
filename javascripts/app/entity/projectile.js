var Projectile = function (sprite, position, destination, velocity, width, height, scale) {
	Entity.call(this, sprite, position, width, height, scale);

	this.destination = destination;
	this.velocity = Projectile.getAdjustedVelocityVector(position, destination, velocity)

	this.state = Projectile.IDLE;
	this.rotationAngle = 0;
	this.maxFlightDistance = 0;

	this.animation = null;
	this.inFlightFrames = null;
	this.maxFlightDistanceFrames = null;


	this.originalPosition = this.position.clone();

	this.setMaxFlightDistance = function (distance) {
		this.maxFlightDistance = distance;
	};

	this.setRotationAngle = function (angle) {
		this.rotationAngle = angle;
	};

	this.fire = function () {
		this.state = Projectile.INFLIGHT;
	};

	var renderParent = this.render;
	this.render = function (canvas) {
		renderParent.call(this, canvas);
		canvas.context.save();
		var cX = this.position.x + 0.5 * this.width;
		var cY = this.position.y + 0.5 * this.height;
		canvas.context.translate(cX, cY);
		if (this.destination.x > this.position.x) {
			canvas.context.rotate(360 - ((Math.PI / 180) * -this.rotationAngle) + 45);
			canvas.context.scale(-1, 1);
		} else {
			canvas.context.rotate((Math.PI / 180) * this.rotationAngle);
		}
		canvas.context.translate(-cX, -cY);
		canvas.context.drawFrame(this.sprite, this.animation.getFrame(this.animator.currentFrameIndex()), this.position, this.width, this.height);
		canvas.context.restore();
	};

	this.tick = function (time, engine) {
		if (Math.abs(this.originalPosition.distanceTo(this.position)) > this.maxFlightDistance) {
			this.state = Projectile.MAXDISTANCE;
		}

		if (this.state == Projectile.INFLIGHT) {
			this.currentFrames = this.inFlightFrames;
		}

		if (this.state == Projectile.MAXDISTANCE) {
			this.currentFrames = this.maxFlightDistanceFrames;
		}

		if (this.state == Projectile.INFLIGHT || this.state == Projectile.MAXDISTANCE) {
			this.position = this.position.addSelf(this.velocity);
		}

		this.animator.tick(time, this.animation, this.currentFrames);

		var that = this;
		engine.pigs.forEach(function (pig) {
			if (Collisions.isColliding(pig, that)) {
				pig.destroy = true;
				that.destroy = true;
				return;
			}
		});

		if (this.position.x + this.width > engine.gameCanvas.width || this.position.x + this.width < 0 || this.position.y - this.height > engine.gameCanvas.height || this.position.y + this.height < 0) {
			this.destroy = true;
		}
	};

};

Projectile.getAdjustedVelocityVector = function (origin, destination, velocity) {
	var x = destination.x < origin.x ? -1 : 1;
	var y = destination.y < origin.y ? -1 : 1;
	return new Vector2(velocity.x * x, velocity.y * y);
};

Projectile.IDLE = 0;
Projectile.INFLIGHT = 1;
Projectile.COLLISION = 2;
Projectile.MAXDISTANCE = 3;

Projectile.prototype = Object.create(Entity.prototype);
Projectile.prototype.constructor = Projectile;


