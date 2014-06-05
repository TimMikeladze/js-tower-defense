var Map = function () {

	this.tiles = [];
	this.controlPoints = [];
	this.path = [];
	this.loaded = false;

	this.loadMap = function(level, callback) {
		if (level) {
			level = "?level=" + level;
		} else {
			level = "";
		}

		var that = this;
		ajax.get("http://71.19.151.5/highscores/get_map.php" + level, function(response) {
			var json = JSON.parse(response);
			var data = JSON.parse(atob(json.data));

			data.tiles.forEach(function(tile) {
				that.tiles.push(new Tile(tile.key, tile.x, tile.y, tile.width, tile.height, tile.scale, true));
			});

			data.controlPoints.forEach(function(cp) {
				that.controlPoints.push(new Vector2(cp.point.x, cp.point.y));
			});

			that.path = Bezier.calculateCurve(that.controlPoints);

			that.loaded = true;
			callback();
		});
	};

	this.render = function(canvas) {
		canvas.clear("#FFFFFF");

		this.tiles.forEach(function (t) {
			t.render(canvas);
		});
	};

};