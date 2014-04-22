var Tower = function (sprite, x, y, width, height, scale, rotations) {
	Entity.call(this, x, y);

	this.sprite = sprite;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.scale = scale;
	this.rotation = 0;
	this.rotationIndex = 0;
	this.rotations = rotations;
	this.alpha = 0.5;

	this.animation = new Animation(this.sprite, this.width, this.height);

	this.rotateUp = function() {
		this.rotation++;
		this.calculateRotationIndex();
	};

	this.rotateDown = function() {
		this.rotation--;
		this.calculateRotationIndex();
	};

	this.calculateRotationIndex = function() {
		this.rotationIndex = Math.abs(this.rotation % this.rotations);
	};

	this.placeTower = function () {
		this.alpha = 1.0;
	};

	this.render = function () {
		var frame = this.animation.getFrame(this.rotationIndex);
		var image = Require.getImage(this.sprite);
		gameCanvas.context.globalAlpha = this.alpha;
		gameCanvas.context.drawImage(image, frame.x, frame.y, frame.width, frame.height, this.x, this.y, this.width / this.scale, this.height / this.scale);
		gameCanvas.context.globalAlpha = 1.0;
	};

};


Tower.prototype = Object.create(Entity.prototype);
Tower.prototype.constructor = Tower;