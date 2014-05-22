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
	this.shotInterval = 3000;
	this.flightPathIndex = 0;
	this.inFlight = false;

	this.clone = function () {

	};

	var renderParent = this.render;
	this.render = function (canvas) {
		renderParent.call(this, canvas);

		/*
		 canvas.context.beginPath();
		 canvas.context.arc(this.getCenter().x, this.getCenter().y, this.fireRadius, 0, Math.PI * 2, true);
		 canvas.context.stroke();
		 canvas.context.closePath();
		 */

		/*
		if (this.minPig && this.minPig.position.distanceTo(this.position) <= this.fireRadius && this.flightPath) {
			this.flightPath.forEach(function (p) {
				canvas.context.fillStyle = "#FF0000";
				canvas.context.fillRect(p.x, p.y, 1, 1);
			});
		}
		*/
	};

	this.generateFlightPath = function (positionA, positionB) {
		var midpoint = new Vector2((positionA.x + positionB.x) / 2, (positionA.y + positionB.y) / 2);
		var midpointA = new Vector2((positionA.x + positionB.x) / 2, (positionA.y + positionB.y) / 2);
		var midpointB = new Vector2((positionB.x + midpoint.x) / 2, (positionB.y + midpoint.y) / 2);
		return Bezier.calculateCurve([positionA.clone(), midpointA, midpointB, positionB.clone()]);
	};

	this.tick = function (time, engine) {
		var that = this;
		var pigs = [];
		this.lastShotTime = this.lastShotTime == null ? time.stamp : this.lastShotTime;

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

				var deltaX = that.minPig.position.x - that.position.x;
				var deltaY = that.minPig.position.y - that.position.y;
				
				that.rotationAngle = 360 - (Math.atan2(deltaX, deltaY) * 180 / Math.PI) - 90;
			}
		}

		//TODO(tim) fix firing
		if (!this.inFlight && this.minPig && (this.lastShotTime + this.shotInterval <= time.stamp)) {
			this.lastShotTime = time.stamp;
			this.flightPath = this.generateFlightPath(this.getCenter(), this.minPig.getCenter());
			var bird = new RedBird(this.position.clone());
			//TODO(tim) fix bird scaling when shot
			//bird.animation = new Animation(bird.sprite, bird.width, bird.height, 0.5, bird.frameSpeeds);
			bird.placeBird();
			bird.flightPath = this.flightPath;
			bird.inFlight = true;
			//TODO(tim) fix tick bug
			bird.tick(time, engine);
			engine.entities.push(bird);
		}

		if (this.inFlight) {
			this.flightPathIndex += this.speed;
			if (this.flightPathIndex < this.flightPath.length) {
				this.position = this.flightPath[this.flightPathIndex];
			} else {
				this.destroy = true;
			}

			var that = this;
			pigs.forEach(function (pig) {
				if (Collisions.isColliding(pig, that)) {
					pig.destroy = true;
					that.destroy = true;
					return;
				}
			});
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


