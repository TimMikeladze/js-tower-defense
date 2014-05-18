var RedBird = function (position) {
	Bird.call(this, "birds/rbird1.png", position, 62, 62, 0.75);

	this.animation = new Animation(this.sprite, this.width, this.height, this.scale, [1500, 500]);

	this.idlingFrames = [0, 1];

	this.render = function (canvas) {
		this.renderParent.call(this, canvas);
		if (this.state == Bird.FLOATING) {
			canvas.context.globalAlpha = this.alpha;
			canvas.context.drawFrame(this.sprite, this.animation.getFrame(0), this.position, this.width, this.height);
			canvas.context.globalAlpha = 1.0;
		} else {
			canvas.context.drawFrame(this.sprite, this.animation.getFrame(this.idlingFrames[this.currentFrame]), this.position, this.width, this.height);
		}
	};

	var tickParent = this.tick;
	this.tick = function (time, engine) {
		this.time = this.time == null ? time.stamp : this.time;

		if (this.state == Bird.IDLING) {
			this.currentFrames = this.idlingFrames;
		}

		var speed = this.animation.getFrame(this.currentFrame).speed;
		if (time.stamp > (this.time + speed)) {
			this.time = time.stamp;
			this.currentFrame++;
			this.currentFrame = this.currentFrame % this.currentFrames.length;
		}
		tickParent.call(this, time, engine);
	};
};

RedBird.prototype = Object.create(Bird.prototype);
RedBird.prototype.constructor = RedBird;


