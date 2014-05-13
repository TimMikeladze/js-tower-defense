var Map = function (mapFile) {

	this.tiles = [];
	this.controlPoints = [];
	this.path = [];
	this.mapFile = mapFile;

	this.loadMap = function () {
		var data = JSON.parse(this.mapFile);

		for (var i = 0; i < data.length; i++) {
			var record = data[i];
			var tile = new Tile("#926239", record.x, record.y, record.width, record.height, true);

			this.tiles.push(tile);
			this.controlPoints.push(tile.getCenter());

			if (this.controlPoints.length > 3) {
				this.path = Bezier.calculateCurve(this.controlPoints);
			}
		}
	};

	this.render = function (canvas, drawPath) {
		this.tiles.forEach(function (tile) {
			tile.render(canvas);
		});

		if (drawPath) {
			this.path.forEach(function (p) {
				canvas.context.fillStyle = "#FF0000";
				canvas.context.fillRect(p.x, p.y, 1, 1);
			});
		}
	};
};