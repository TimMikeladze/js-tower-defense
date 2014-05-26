var GreenPig = function (position) {
	Pig.call(this, "pigs/pig0.png", position, 3, 100, 97, 0.45);

	this.animation = new Animation(this.sprite, this.width, this.height, this.scale, [1500, 500, 1000]);
	this.animator.setDefaultFrame(0);

	this.idlingFrames = [0, 1, 2];

	var renderParent = this.render;
	this.render = function (canvas) {
		renderParent.call(this, canvas);
		if (this.state == Pig.IDLING) {
			var position = this.position.clone();
			canvas.context.drawFrame(this.sprite, this.animation.getFrame(this.animator.currentFrameIndex()), position, this.width, this.height);
		}
	};


	var tickParent = this.tick;
	this.tick = function (time, engine) {
		this.time = this.time == null ? time.stamp : this.time;

		if (this.state == Pig.IDLING) {
			this.currentFrames = this.idlingFrames;
		}

		this.animator.tick(time, this.animation, this.currentFrames);
		tickParent.call(this, time, engine);
	};
};

GreenPig.prototype = Object.create(Pig.prototype);
GreenPig.prototype.constructor = GreenPig;


