var Bird = function (sprite, position, width, height, scale) {
	Entity.call(this, sprite, position, width, height, scale);

	this.alpha = 0.5;

	this.state = Bird.FLOATING;

	this.rotationAngle = 0;

	this.minPig = null;

	var renderParent = this.render;
	this.render = function (canvas) {
		renderParent.call(this, canvas);

		if(this.minPig) {
			canvas.context.beginPath();
			canvas.context.moveTo(this.position.x, this.position.y);
			canvas.context.lineTo(this.minPig.position.x, this.minPig.position.y);
			canvas.context.stroke();
		}
	};

	this.tick = function (time, engine) {
		var that = this;
		var pigs = [];
		if (engine.entities) {
			engine.entities.forEach(function (entity) {
				if (entity instanceof Pig) {
					pigs.push(entity);
				}
			});

			if (pigs.length > 0) {
				var minDistance;

				pigs.forEach(function (pig) {
					var distance = pig.position.distanceTo(that.position);
					if (minDistance == null || distance < minDistance) {
						minDistance = distance;
						that.minPig = pig;
						return;
					}
				});

				if (this.minPig.position.x > that.position.x) {
					that.rotationAngle = 180;
				} else {
					that.rotationAngle = 0;
				}
			}
		}
	};


	this.placeBird = function () {
		this.alpha = 1;
		this.state = Bird.IDLING;
	};

	this.canPlace = function(engine) {
		var tiles = engine.map.tiles;
		var that = this;
		var answer = true;

		tiles.forEach(function(tile) {
			if (!((tile.y + tile.height < that.position.y)
					|| (tile.y > that.position.y + that.height)
					|| (tile.x > that.position.x + that.width)
					|| (tile.x + tile.width < that.position.x))) {

				answer = false;
				return;
			}
		});

		if (answer) {
			if (engine.entities) {
				engine.entities.forEach(function (entity) {
					if (entity instanceof Bird) {
						if (!((entity.position.y + entity.height < that.position.y)
								|| (entity.position.y > that.position.y + that.height)
								|| (entity.position.x > that.position.x + that.width)
								|| (entity.position.x + entity.width < that.position.x))) {
							answer = false;
							return;
						}
					}
				});
			}
			return answer;
		}
	};
};

Bird.FLOATING = 0;
Bird.IDLING = 1;

Bird.prototype = Object.create(Entity.prototype);
Bird.prototype.constructor = Bird;


