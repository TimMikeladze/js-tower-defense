var Bird = function (sprite, position, width, height, scale) {
	Entity.call(this, sprite, position, width, height, scale);

	this.alpha = 0.5;

	this.state = Bird.FLOATING;

	var renderParent = this.render;
	this.render = function (canvas) {
		renderParent.call(this, canvas);
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
				var minPig;
				var minDistance;

				pigs.forEach(function (pig) {
					var distance = pig.position.distanceTo(that.position);
					if (minDistance == null || distance < minDistance) {
						minDistance = distance;
						minPig = pig;
					}
				});
			}
		}
	};


	this.placeBird = function () {
		this.alpha = 1;
		this.state = Bird.IDLING;
	};

	this.canPlace = function(map) {
		var tiles = map.tiles;
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

		return answer;
	};

};

Bird.FLOATING = 0;
Bird.IDLING = 1;

Bird.prototype = Object.create(Entity.prototype);
Bird.prototype.constructor = Bird;


