var Animation = function (image, frameWidth, frameHeight) {

	var Frame = function(frame, x, y) {
		this.frame = frame;
		this.x = x;
		this.y = y;
	};

	this.image = image;
	this.frameWidth = frameWidth;
	this.frameHeight = frameHeight;

	this.frames = [];

	this.totalFrames = this.image.width / this.frameWidth * this.image.height / this.frameHeight;

	var x = 0;
	var y = 0;

	for (var i = 0; i < this.totalFrames; i++) {
		this.frames.push(new Frame(i, x, y));

		x += this.frameWidth;
		y += this.frameHeight;

		if (x >= this.image.width) {
			x = 0;
		}

		if (y >= this.image.height) {
			y = 0;
		}
	}

	this.getFrameAt = function (x, y) {
		
	};

	this.getFrame = function (frameIndex) {

	};

};


