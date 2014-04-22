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

	this.clear = function (hex) {
		if (hex) {		
			this.context.fillStyle = hex;
			this.context.fillRect(0, 0, this.width, this.height);
		} else {
			var background = document.getElementById("bg");
			this.context.drawImage(background, 0, 0);
		}
	};

	this.draw = function (callback) {
		callback.call();
	};

	this.addEventListener = function (type, listener, useCapture) {
		this.canvas.addEventListener(type, listener, useCapture);
	};

};
