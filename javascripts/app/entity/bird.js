var Bird = function (x, y, width, height) {
	this.sprite = "birds/rbird2.png";
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.angle = 0;
	this.currentFrame = 0;
	this.timer = null;

	Entity.call(this, this.sprite, this.x, this.y, this.width, this.height);

	//TODO(tim) x,y = v_i_xy, * t + 1/2 a_xy + t^2
	this.fire = function(location) {
	};

	this.render = function (angle) {
		if(!this.timer) {
			var that = this;
			this.timer = new Timer(700, function() {
				that.currentFrame++;
				if (that.currentFrame > 1) {
					that.currentFrame = 0;
				}
			});
		};

		var image = Require.getImage(this.sprite);
		var frame = this.animation.getFrame(this.currentFrame);

		gameCanvas.context.save();
		//TODO(tim) move this center of entity calculation to entity
		gameCanvas.context.translate(this.x + this.width / 2, this.y + this.height / 2);
		gameCanvas.context.rotate(angle);
		gameCanvas.context.translate(-this.x - this.width / 2, -this.y - this.height / 2);
		gameCanvas.context.drawImage(image, frame.x, frame.y, frame.width, frame.height, this.x, this.y, this.width / this.scale, this.height / this.scale);
		gameCanvas.context.restore();
	};

};

Bird.prototype = Object.create(Entity.prototype);
Bird.prototype.constructor = Bird;


