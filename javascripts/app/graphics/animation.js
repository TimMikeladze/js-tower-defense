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
	var row = 1;
	
	var framesRow = new Array();

	log("width frames " + this.totalWidthFrames);
	log("total frames " + this.totalFrames);

	for (var i = 0; i < this.totalFrames; i++) {
		log("i " + i);
		
		log("coordinates " + x + " " + y);
		var frame = new Frame(i, x, y, this.frameWidth, this.frameHeight);
		framesRow.push(frame);

		if ((i + 1) / row == this.totalWidthFrames) {
			log("pushed length " + framesRow.length);
			this.frames.push(framesRow);
			log("row cleared");
			row++;
			framesRow = [];
		}

		x += this.frameWidth;
		
		if (x >= this.image.width) {
			x = 0;
			y += this.frameHeight;
			log(y + " at " + i);
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


