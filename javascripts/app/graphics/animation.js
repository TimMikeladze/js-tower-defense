var Animation = function (sprite, frameWidth, frameHeight) {

	var Frame = function (i, x, y, width, height) {
		this.i = i;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	};

	this.frameWidth = frameWidth;
	this.frameHeight = frameHeight;
	this.frames = [];

	var image = Require.getImage(sprite);
	if (image) {
		this.totalWidthFrames = Math.floor(image.width / this.frameWidth);
		this.totalHeightFrames = Math.floor(image.height / this.frameHeight);
		this.totalFrames = Math.floor(this.totalWidthFrames * this.totalHeightFrames);

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
			if (x >= image.width) {
				x = 0;
				y += this.frameHeight;
			}
		}
	}

	this.getFrameAt = function (x, y) {
		return this.frames[y][x];
	};

	this.getFrame = function (frameIndex) {
		var row = Math.floor(frameIndex / this.totalWidthFrames);
		var column = frameIndex % this.totalWidthFrames;

		return this.frames[row][column];
	};

};


