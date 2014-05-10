var MapEditor = function (canvas) {
	this.canvas = canvas;

	this.tileWidth = this.canvas.width / 20;
	this.tileHeight = this.canvas.height / 20;

	this.floatingTitle = null;

	this.tiles = [];

	this.init = function () {
		this.startInput();
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

			if(that.floatingTitle) {
				var tile = new Tile(that.floatingTitle.color, that.floatingTitle.x, that.floatingTitle.y, that.floatingTitle.width, that.floatingTitle.height);
				tile.applyTile();
				that.tiles.push(tile);
			}
		}, false);

		this.canvas.addEventListener("mousemove", function (e) {
			that.mouse = getClickedPoint(e);

			var x = Math.floor(that.mouse.x / that.tileWidth) * that.tileWidth;
			var y = Math.floor(that.mouse.y / that.tileHeight) * that.tileHeight;

			if(!that.floatingTitle) {
				that.floatingTitle = new Tile("#926239", x, y, that.tileWidth, that.tileHeight);
			} else {
				that.floatingTitle.x = x;
				that.floatingTitle.y = y;
			}
		}, false);

		this.canvas.addEventListener("mousewheel", function (e) {
			that.wheel = e;
		}, false);
	};

	this.loop = function () {
		this.update();
		this.draw();
	};

	this.update = function () {

	};

	this.draw = function () {
		this.canvas.clear("#458B00");
		if(this.floatingTitle) {
			this.floatingTitle.draw(this.canvas);
		}
		var that = this;
		this.tiles.forEach(function(t) {
			t.draw(that.canvas);
		});
	};
};