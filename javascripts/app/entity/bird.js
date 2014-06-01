var Bird = function (sprite, position, fireRadius, width, height, scale) {
	Entity.call(this, sprite, position, width, height, scale);

	this.alpha = 0.5;

	this.state = Bird.FLOATING;

	this.rotationAngle = 0;

	this.minPig = null;
	this.fireRadius = fireRadius;
	this.lastShotTime = null;
	this.shotInterval = 3000;

	var renderParent = this.render;
	this.render = function (canvas, animation) {
		renderParent.call(this, canvas);
		canvas.context.beginPath();
		canvas.context.arc(this.getCenter().x, this.getCenter().y, this.fireRadius, 0, Math.PI * 2, true);
		canvas.context.stroke();
		canvas.context.closePath();
		
		if (this.state == Bird.FLOATING) {
			canvas.context.globalAlpha = this.alpha;
			canvas.context.drawFrame(this.sprite, animation.getFrame(this.idlingFrames[0]), this.position, this.width, this.height);
			canvas.context.globalAlpha = 1.0;
		} else {
			if (this.rotationAngle !== 0) {
				canvas.context.save();
				var cX = this.position.x + 0.5 * this.width;
				var cY = this.position.y + 0.5 * this.height;
				canvas.context.translate(cX, cY);
				if (this.minPig.position.x > this.position.x) {
					canvas.context.rotate(360 - ((Math.PI / 180) * -this.rotationAngle) + 45);
					canvas.context.scale(-1, 1);
				} else {
					canvas.context.rotate((Math.PI / 180) * this.rotationAngle);
				}
				canvas.context.translate(-cX, -cY);
				canvas.context.drawFrame(this.sprite, animation.getFrame(this.animator.currentFrameIndex()), this.position, this.width, this.height);
				canvas.context.restore();
			} else {
				canvas.context.drawFrame(this.sprite, animation.getFrame(this.animator.currentFrameIndex()), this.position, this.width, this.height);
			}
		}
	};

	this.tick = function (time, engine) {
		var that = this;
		this.lastShotTime = this.lastShotTime == null ? time.stamp : this.lastShotTime;

		if (engine.pigs.length > 0) {
			var minDistance;
			engine.pigs.forEach(function (pig) {
				var distance = pig.position.distanceTo(that.position);
				if (minDistance == null || distance < minDistance) {
					minDistance = distance;
					that.minPig = pig;
					return;
				}
			});

			var deltaX = that.minPig.position.x - that.position.x;
			var deltaY = that.minPig.position.y - that.position.y;

			that.rotationAngle = 360 - (Math.atan2(deltaX, deltaY) * 180 / Math.PI) - 90;
		}

		if (this.position) {
			//var inRange = this.fireRadius >= Math.abs(this.minPig.position.distanceTo(this.position));
			var inRange = true;
			if (this.minPig && inRange && (this.lastShotTime + this.shotInterval <= time.stamp)) {
				this.lastShotTime = time.stamp;
				this.fire(this.minPig.position, engine);
			}
		}
	};

	this.fire = function (destination, engine) {

	};

	this.placeBird = function () {
		this.alpha = 1;
		this.state = Bird.IDLING;
	};

	this.canPlace = function (engine) {
		var tiles = engine.map.tiles;
		var that = this;
		var answer = true;

		tiles.forEach(function (tile) {
			if (!((tile.y + tile.height < that.position.y)
				|| (tile.y > that.position.y + that.height)
				|| (tile.x > that.position.x + that.width)
				|| (tile.x + tile.width < that.position.x))) {
				answer = false;
				return;
			}
		});

		if (answer) {
			engine.birds.forEach(function (entity) {
				if (!((entity.position.y + entity.height < that.position.y)
					|| (entity.position.y > that.position.y + that.height)
					|| (entity.position.x > that.position.x + that.width)
					|| (entity.position.x + entity.width < that.position.x))) {
					answer = false;
					return;
				}
			});
			return answer;
		}
	};
};

Bird.FLOATING = 0;
Bird.IDLING = 1;

Bird.prototype = Object.create(Entity.prototype);
Bird.prototype.constructor = Bird;


