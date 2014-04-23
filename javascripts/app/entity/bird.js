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

	this.move = function() {

	};

	this.render = function () {
		if(!this.timer) {
			var that = this;
			this.timer = new Timer(100, function() {
				if (that.count > 3) {
					that.currentFrame = 0;
				}
			//	that.currentFrame++;
			});
		};
		var image = Require.getImage(this.sprite);
		var frame = this.animation.getFrame(this.currentFrame);
		gameCanvas.context.drawImage(image, frame.x, frame.y, frame.width, frame.height, this.x, this.y, this.width / this.scale, this.height / this.scale);
	};

};

Bird.prototype = Object.create(Entity.prototype);
Bird.prototype.constructor = Bird;


