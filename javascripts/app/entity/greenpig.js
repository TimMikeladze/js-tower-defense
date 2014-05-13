var GreenPig = function (position) {
	Pig.call(this, "pigs/pig0.png", position, 3, 100, 97, 0.45);

	this.animation = new Animation(this.sprite, this.width, this.height, [1500, 500, 1000]);

	this.idlingFrames = [0, 1, 2];

	this.render = function (canvas) {
		if (this.state == Pig.IDLING) {
			var position = this.position.clone();
			//TODO(tim) investigate
			position.set(position.x - this.width / 2, position.y - this.height / 2)
			canvas.context.drawFrame(this.sprite, this.animation.getFrame(this.idlingFrames[this.currentFrame]), position, this.width, this.height, this.scale);
		}
	};

	var parent = this.tick;
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

		parent.call(this, time);
	};
};

GreenPig.prototype = Object.create(Pig.prototype);
GreenPig.prototype.constructor = GreenPig;


