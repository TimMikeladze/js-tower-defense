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
	this.render = function (canvas) {
		renderParent.call(this, canvas);


		canvas.context.beginPath();
		canvas.context.arc(this.getCenter().x, this.getCenter().y, this.fireRadius, 0, Math.PI * 2, true);
		canvas.context.stroke();
		canvas.context.closePath();

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


