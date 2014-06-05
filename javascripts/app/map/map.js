var Map = function (canvas) {
	this.canvas = canvas;

	this.tiles = [];
	this.controlPoints = [];

	this.loadMap = function(level, callback) {
		if (level) {
			level = "?level=" + level;
		} else {
			level = "";
		}

		ajax.get("http://71.19.151.5/highscores/get_map.php" + level, function(response) {
			var json = JSON.parse(response);

			log(json.data);

			callback();
		});
	};

};