var HelmetPig = function (position) {
	Pig.call(this, "pigs/pig3.png", position, 1, 110, 93, 0.50);

	this.animation = new Animation(this.sprite, this.width, this.height, this.scale, [1500, 500, 1000]);
	this.animator.setDefaultFrame(0);

	this.idlingFrames = [0, 1, 2];
	this.hurtFrames = [3, 4, 5];
	this.badlyHurtFrames = [6, 7, 8];
	this.health = 1200;

	var renderParent = this.render;
	this.render = function (canvas) {
		renderParent.call(this, canvas);
		if (this.state == Pig.IDLING || this.state == Pig.HURT || this.state == Pig.BADLY_HURT) {
			var position = this.position.clone();
			canvas.context.drawFrame(this.sprite, this.animation.getFrame(this.animator.currentFrameIndex()), position, this.width, this.height);
		} 
	};

	var tickParent = this.tick;
	this.tick = function (time, engine) {
		this.time = this.time == null ? time.stamp : this.time;
		
		if (this.health <= 200) {
			this.state = Pig.BADLY_HURT;
			this.currentFrames = this.badlyHurtFrames;
		} else if (this.health <= 400) {
			this.state = Pig.HURT;
			this.currentFrames = this.hurtFrames;
		} else {
			this.state = Pig.IDLING;
			this.currentFrames = this.idlingFrames;
		}
		this.animator.tick(time, this.animation, this.currentFrames);
		tickParent.call(this, time, engine);
	};
};

HelmetPig.prototype = Object.create(Pig.prototype);
HelmetPig.prototype.constructor = HelmetPig;