var Animator = function() {
	this.currentFrame = 0;
	this.currentFrames = [];
	this.time = null;

	this.tick = function(time, animation, frames) {
		this.currentFrames = frames;
		var speed = animation.getFrame(this.currentFrame).speed;
		if (time.stamp > (this.time + speed)) {
			this.time = time.stamp;
			this.currentFrame++;
			this.currentFrame = this.currentFrame % this.currentFrames.length;
		}
	};

	this.currentFrameIndex = function() {
		return this.currentFrames[this.currentFrame];
	};
};
