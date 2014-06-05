var MapEditor = function (canvas, socket) {
	this.canvas = canvas;
	this.socket = socket;

	this.scale = 30;

	this.tileWidth = this.canvas.width / this.scale;
	this.tileHeight = this.canvas.height / this.scale;

	this.floatingTile = null;

	this.tiles = [];
	this.controlPoints = [];
	this.paths = [];

	this.pathID = null;
	this.recordingPath = false;

	var that = this;
	document.getElementById("save").addEventListener("click", function () {
		var json = JSON.stringify(that.tiles);
		var pom = document.createElement('a');
		pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
		pom.setAttribute('download', "map.json");
		pom.click();
	});

	document.getElementById("path").addEventListener("click", function () {
		if (!that.recordingPath) {
			that.pathID = that.generateID();
			document.getElementById("path").innerText = "Stop Path";
			that.recordingPath = true;
		} else {
			document.getElementById("path").innerText = "Start Path";
			that.recordingPath = false;
		}
	});

	document.getElementById("clear").addEventListener("click", function () {
		that.floatingTile = null;

		that.tiles = [];
		that.controlPoints = [];
		that.paths = [];

		that.pathID = null;
		that.recordingPath = false;

		document.getElementById("path").innerText = "Start Path";
	});

	this.init = function () {
		this.startInput();
		this.setSocketEventHandler();
	};

	this.start = function () {
		var that = this;
		(function gameLoop() {
			that.loop();
			requestAnimFrame(gameLoop, that.canvas.canvas);
		})();
	};

	this.startInput = function () {
		var that = this;

		var getClickedPoint = function (e) {
			var x = e.clientX - that.canvas.canvas.getBoundingClientRect().left;
			var y = e.clientY - that.canvas.canvas.getBoundingClientRect().top;
			return new Vector2(x, y);
		};

		this.canvas.addEventListener("click", function (e) {
			that.click = getClickedPoint(e);

			if (that.floatingTile) {
				that.floatingTile.applyTile();
				that.tiles.push(that.floatingTile.clone());
				that.socket.emit("addTile", that.floatingTile.clone());
				if (that.recordingPath) {
					var cp = {id: that.pathID, point: that.floatingTile.getCenter()};
					that.controlPoints.push(cp);
					that.socket.emit("addControlPoint", cp);
				}

			}
		}, false);

		this.canvas.addEventListener("mousemove", function (e) {
			that.mouse = getClickedPoint(e);

			var x = Math.floor(that.mouse.x / that.tileWidth) * that.tileWidth;
			var y = Math.floor(that.mouse.y / that.tileHeight) * that.tileHeight;

			if (!that.floatingTile) {
				that.floatingTile = new Tile(that.currentPathIndex, x, y, that.tileWidth, that.tileHeight, that.scale);
			} else {
				that.floatingTile.x = x;
				that.floatingTile.y = y;
			}
		}, false);

		this.canvas.addEventListener("mousewheel", function (e) {
			that.wheel = e;
		}, false);
	};

	this.setSocketEventHandler = function () {
		var that = this;

		this.socket.on("log", function (data) {
			log(data);
		});

		this.socket.on("setGameID", function (gameID) {
			that.gameID = gameID;
			log("Game ID: " + gameID);
		});

		this.socket.on("numberOfPlayers", function (players) {
			log("Players " + players);
		});

		this.socket.on("addTile", function (recievedTile) {
			that.tiles.push(new Tile(recievedTile.key, recievedTile.x, recievedTile.y, recievedTile.width, recievedTile.height, recievedTile.scale, true))
		});

		this.socket.on("addControlPoint", function (controlPoint) {
			that.controlPoints.push({id: controlPoint.pathID, point: controlPoint.point});
		});

		this.socket.on("sendAll", function (everything) {
			var tiles = everything.tiles;
			tiles.forEach(function(recievedTile) {
				that.tiles.push(new Tile(recievedTile.key, recievedTile.x, recievedTile.y, recievedTile.width, recievedTile.height, recievedTile.scale, true))
			});

			var controlPoints = everything.controlPoints;
			controlPoints.forEach(function(cp) {
				log(cp);
				that.controlPoints.push({id: cp.pathID, point: cp.point});
			});
		});
	};

	this.loop = function () {
		this.update();
		this.draw();
	};

	this.update = function () {

	};

	this.draw = function () {
		this.canvas.clear("#000000");

		if (this.floatingTile) {
			this.floatingTile.render(this.canvas);
		}


		var that = this;
		this.tiles.forEach(function (t) {
			t.render(that.canvas);
		});

		this.controlPoints.forEach(function(p) {
			canvas.context.fillStyle = "#FF0000";
			canvas.context.fillRect(p.point.x, p.point.y, 5, 5);
			canvas.context.globalAlpha = 1.0;
		});

	};


};