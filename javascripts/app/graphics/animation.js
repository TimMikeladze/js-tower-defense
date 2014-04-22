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

	var x = 0;
	var y = 0;

	var framesRow = [];

	log("width frames " + this.totalWidthFrames);

	for (var i = 0; i < this.totalFrames; i++) {

		framesRow.push(new Frame(i, x, y, this.frameWidth, this.frameHeight));

		if (i % this.totalWidthFrames == 0) {
			log("pushed " + i);
			this.frames.push(framesRow);
			if (i > 0) {
				framesRow = [];
			}
		}

		x += this.frameWidth;

		if (x - this.frameWidth >= this.image.width) {
			x = 0;
			y += this.frameHeight;
			log(y);
		}
	}

	console.log(this.frames);

	this.getFrameAt = function (x, y) {
		return this.frames[y][x];
	};

	this.getFrame = function (frameIndex) {
		var row = parseInt(frameIndex / this.totalWidthFrames);
		var column = frameIndex % this.totalWidthFrames;
		//log("Row " + row);
		//log("Column " + column);

		return this.frames[row][column];
	};

};


