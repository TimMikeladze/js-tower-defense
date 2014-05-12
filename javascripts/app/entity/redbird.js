var RedBird = function (position) {
	Bird.call(this, "birds/rbird1.png", position, 62, 62, 1);

	this.alpha = 0.5;
	this.animation = new Animation(this.sprite, this.width, this.height);

	this.render = function(canvas) {
		canvas.context.globalAlpha = this.alpha;
		canvas.context.drawFrame(this.sprite, this.animation.getFrame(0), this.position, this.width / this.scale, this.height / this.scale);
	};

	this.placeBird = function() {
		this.alpha = 1;
	};

};

RedBird.prototype = Object.create(Bird.prototype);
RedBird.prototype.constructor = RedBird;


