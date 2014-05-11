window.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback, element) {
			window.setTimeout(callback, 1000 / 60);
		};
})();


var Canvas = function (id) {
	this.canvas = document.getElementById(id);
	this.context = this.canvas.getContext("2d");
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.color = null;

	this.clear = function (hex) {
		if (hex) {
			this.color = hex;
		}
		this.context.fillStyle = this.color;
		this.context.fillRect(0, 0, this.width, this.height);
	};

	this.getCenter = function () {
		return new Vector2(this.width / 2, this.height / 2);
	}

	this.draw = function (callback) {
		callback.call();
	};

	this.addEventListener = function (type, listener, useCapture) {
		this.canvas.addEventListener(type, listener, useCapture);
	};

};
