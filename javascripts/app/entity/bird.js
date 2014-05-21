var Bird = function (sprite, position, width, height, scale, speed, fireRadius) {
	Entity.call(this, sprite, position, width, height, scale);

	this.alpha = 0.5;

	this.state = Bird.FLOATING;

	this.rotationAngle = 0;

	this.minPig = null;
	this.speed = speed;
	this.fireRadius = fireRadius;
	this.flightPath = null;
	this.lastShotTime = null;

	var renderParent = this.render;
	this.render = function (canvas) {
		renderParent.call(this, canvas);

		canvas.context.beginPath();
		canvas.context.arc(this.position.x, this.position.y, this.fireRadius, 0, Math.PI * 2, true);
		canvas.context.stroke();
		canvas.context.closePath();


		if (this.minPig && this.minPig.position.distanceTo(this.position) <= this.fireRadius) {
			this.flightPath = this.flightPath ? this.flightPath : this.generateFlightPath(this.position, this.minPig.position);
			this.flightPath.forEach(function (p) {
				canvas.context.fillStyle = "#FF0000";
				canvas.context.fillRect(p.x, p.y, 1, 1);
			});
		}
	};

	this.generateFlightPath = function(positionA, positionB) {
		var midpoint = new Vector2((positionA.x + positionB.x) / 2, (positionA.y + positionB.y) / 2);
		var midpointA = new Vector2((positionA.x + positionB.x) / 2, (positionA.y + positionB.y) / 2);
		var midpointB = new Vector2((positionB.x + midpoint.x) / 2, (positionB.y + midpoint.y) / 2);
		return Bezier.calculateCurve([positionA.clone(), midpointA, midpointB, positionB.clone()]);
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


