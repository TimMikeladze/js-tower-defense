var Animation = function (image, frameWidth, frameHeight) {

	var Frame = function(i, x, y, width, height) {
		this.i = i;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	};

	this.image = image;
	this.frameWidth = frameWidth;
	this.frameHeight = frameHeight;

	this.frames = [];

	this.totalWidthFrames = this.image.width / this.frameWidth;
	this.totalHeightFrames = this.image.height / this.frameHeight;
	this.totalFrames = this.totalWidthFrames * this.totalHeightFrames;

	this.generateFrames = function() {
		var x = 0;
		var y = 0;

		var row = 1;
		var framesRow = [];
		for (var i = 0; i < this.totalFrames; i++) {
			var frame = new Frame(i, x, y, this.frameWidth, this.frameHeight);
			framesRow.push(frame);
			if ((i + 1) / row == this.totalWidthFrames) {
				this.frames.push(framesRow);
				row++;
				framesRow = [];
			}
			x += this.frameWidth;
			if (x >= this.image.width) {
				x = 0;
				y += this.frameHeight;
			}
		}
	};

	this.getFrameAt = function (x, y) {
		return this.frames[y][x];
	};

	this.getFrame = function (frameIndex) {
		var row = Math.floor(frameIndex / this.totalWidthFrames);
		var column = frameIndex % this.totalWidthFrames;

		return this.frames[row][column];
	};

	this.generateFrames();
};

