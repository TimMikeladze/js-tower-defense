GameEngine.prototype.startInput = function() {
	var getClickedPoint = function (e) {
		var x = e.clientX - gameCanvas.canvas.getBoundingClientRect().left;
		var y = e.clientY - gameCanvas.canvas.getBoundingClientRect().top;

		if (x < 1024) {
			x = Math.floor(x / 32);
			y = Math.floor(y / 32);
		}

		return new Point(x, y);
	}

	var that = this;

	gameCanvas.addEventListener("click", function (e) {
		that.click = getClickedPoint(e);
		log(that.click);
	}, false);

	gameCanvas.addEventListener("mousemove", function (e) {
		that.mouse = getClickedPoint(e);
	}, false);

	gameCanvas.addEventListener("mousewheel", function (e) {
		that.wheel = e;
	}, false);

	log("input started");
}