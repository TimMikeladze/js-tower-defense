var MapEditor = function (canvas, socket) {
	this.canvas = canvas;
	this.socket = socket;

	this.scale = 20;

	this.tileWidth = this.canvas.width / this.scale;
	this.tileHeight = this.canvas.height / this.scale;

	this.floatingTile = null;

	this.tiles = [];
	this.controlPoints = [];
	this.paths = {};
	this.pathsPixels = [];

	this.pathID = null;
	this.recordingPath = false;

	this.key = "maptiles/grass1.png";

	var that = this;
	document.getElementById("save").addEventListener("click", function () {
		var map = btoa(JSON.stringify({tiles: that.tiles, controlPoints: that.controlPoints}));

		var name = prompt("Name of map");
		var level = prompt("Map difficulty (integer from 0 to n)");
		ajax.post("http://71.19.151.5/highscores/add_map.php", {name: name, level: level, map: map}, function (response) {
			alert("Map saved");
		});
	});

	var tileElements = document.getElementsByClassName("tile");
	Array.prototype.filter.call(tileElements, function (element) {
		element.addEventListener("click", function () {
			that.key = "maptiles/" + this.src.substr(this.src.lastIndexOf('/') + 1);
		});
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
		that.paths = {};
		that.pathsPixels = [];

		that.pathID = null;
		that.recordingPath = false;

		document.getElementById("path").innerText = "Start Path";
		that.socket.emit("clear");
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

	this.generatePaths = function() {
		var that = this;
		that.paths = {};
		that.controlPoints.forEach(function (cp) {
			if (that.paths.hasOwnProperty(cp.id)) {
				that.paths[cp.id].push(new Vector2(cp.point.x, cp.point.y));
			} else {
				that.paths[cp.id] = [];
				that.paths[cp.id].push(new Vector2(cp.point.x, cp.point.y));
			}
		});

		that.pathsPixels = [];
		for (var path in that.paths) {
			if(that.paths[path].length > 3) {
				Bezier.calculateCurve(that.paths[path]).forEach(function(p) {
					that.pathsPixels.push(p);
				});
			}
		}
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

			that.generatePaths();
		}, false);

		this.canvas.addEventListener("mousemove", function (e) {
			that.mouse = getClickedPoint(e);

			var x = Math.floor(that.mouse.x / that.tileWidth) * that.tileWidth;
			var y = Math.floor(that.mouse.y / that.tileHeight) * that.tileHeight;

			if (!that.floatingTile) {
				that.floatingTile = new Tile(that.key, x, y, that.tileWidth, that.tileHeight, that.scale);
			} else {
				that.floatingTile.x = x;
				that.floatingTile.y = y;
				that.floatingTile.key = that.key;
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

		this.socket.on("clear", function (data) {
			that.tiles = [];
			that.controlPoints = [];
		});

		this.socket.on("addTile", function (recievedTile) {
			that.tiles.push(new Tile(recievedTile.key, recievedTile.x, recievedTile.y, recievedTile.width, recievedTile.height, recievedTile.scale, true))
		});

		this.socket.on("addControlPoint", function (controlPoint) {
			that.controlPoints.push({id: controlPoint.pathID, point: controlPoint.point});
			that.generatePaths();
		});

		this.socket.on("sendAll", function (everything) {
			var tiles = everything.tiles;
			tiles.forEach(function (recievedTile) {
				that.tiles.push(new Tile(recievedTile.key, recievedTile.x, recievedTile.y, recievedTile.width, recievedTile.height, recievedTile.scale, true))
			});

			var controlPoints = everything.controlPoints;
			controlPoints.forEach(function (cp) {
				that.controlPoints.push({id: cp.pathID, point: cp.point});
			});
			that.generatePaths();
		});
	};

	this.loop = function () {
		this.draw();
	};

	this.draw = function () {
		var that = this;

		this.canvas.clear("#000000");

		if (this.floatingTile) {
			this.floatingTile.render(this.canvas);
		}


		this.tiles.forEach(function (t) {
			t.render(that.canvas);
		});

		this.controlPoints.forEach(function (p) {
			canvas.context.fillStyle = "#FF0000";
			canvas.context.fillRect(p.point.x, p.point.y, 2, 2);
			canvas.context.globalAlpha = 1.0;
		});

		this.pathsPixels.forEach(function (p) {
			canvas.context.fillStyle = "#FF0000";
			canvas.context.fillRect(p.x, p.y, 2, 2);
			canvas.context.globalAlpha = 1.0;
		});

	};


};