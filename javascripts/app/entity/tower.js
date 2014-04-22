var Tower = function (sprite, x, y, height, width, scale, rotations) {
	Entity.call(this, x, y);

	this.sprite = sprite;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.scale = scale;
	this.rotations = rotations;

	this.frameIndex = 1;
	this.frameX = 0;
	this.frameY = 0;

	this.alpha = 0.5;
	this.rotation = 0;

	this.rotateUp = function() {
		this.updateFrame();
		this.rotation++;
	};

	this.rotateDown = function() {
		this.updateFrame();
		this.rotation--;
	};

	this.getRotation = function() {
		return Math.abs(this.rotation % this.rotations);
	};

	this.updateFrame = function() {
		var rotation = this.getRotation();

		var frames = this.sprite.width / this.width * this.sprite.height / this.height;

		log(rotation);

		if (rotation == this.rotations) {
			this.frameX = 0;
			this.frameY = 0;
			this.frameIndex = 0;
		} else if (this.frameX + this.width >= this.sprite.width) {
			this.frameX = 0;
			this.frameY += this.height;
			this.frameIndex = 0;
		} else {
			this.frameX = this.frameIndex * this.width;
			this.frameIndex++;
		}

		log(this.frameX + ", " + this.frameY);
	};

	this.placeTower = function () {
		this.alpha = 1.0;
	};

	this.render = function () {
		gameCanvas.context.globalAlpha = this.alpha;
		gameCanvas.context.drawImage(this.sprite, this.frameX, this.frameY, this.width, this.height, this.x, this.y, this.width / this.scale, this.height / this.scale);
		gameCanvas.context.globalAlpha = 1.0;
	};

};


Tower.prototype = Object.create(Entity.prototype);
Tower.prototype.constructor = Tower;