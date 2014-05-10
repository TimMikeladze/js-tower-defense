var MapEditor = function(canvas) {
	this.canvas = canvas;

	this.init = function () {
		this.startInput();
	};

	this.start = function () {
		var that = this;
		(function gameLoop() {
			that.loop();
			requestAnimFrame(gameLoop, this.canvas);
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
		}, false);

		this.canvas.addEventListener("mousemove", function (e) {
			//that.mouse = getClickedPoint(e);
		}, false);

		this.canvas.addEventListener("mousewheel", function (e) {
			that.wheel = e;
		}, false);
	};

	this.loop = function() {

	};
};