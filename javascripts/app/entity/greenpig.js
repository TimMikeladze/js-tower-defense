var GreenPig = function (position) {
	Pig.call(this, "pigs/pig0.png", position, 3, 100, 97, 0.45);

	this.animation = new Animation(this.sprite, this.width, this.height, this.scale, [1500, 500, 1000]);

	this.idlingFrames = [0, 1, 2];

	var renderParent = this.render;
	this.render = function (canvas) {
		renderParent.call(this, canvas);
		if (this.state == Pig.IDLING) {
			var position = this.position.clone();
			canvas.context.drawFrame(this.sprite, this.animation.getFrame(this.idlingFrames[this.currentFrame]), position, this.width, this.height);
		}
	};

	var tickParent = this.tick;
	this.tick = function (time) {
		this.time = this.time == null ? time.stamp : this.time;

		if (this.state == Pig.IDLING) {
			this.currentFrames = this.idlingFrames;
		}

		//TODO(tim) We need a proper timer for this
		var speed = this.animation.getFrame(this.currentFrame).speed;
		if (time.stamp > (this.time + speed)) {
			this.time = time.stamp;
			this.currentFrame++;
			this.currentFrame = this.currentFrame % this.currentFrames.length;

		}

		tickParent.call(this, time);
	};
};

GreenPig.prototype = Object.create(Pig.prototype);
GreenPig.prototype.constructor = GreenPig;


