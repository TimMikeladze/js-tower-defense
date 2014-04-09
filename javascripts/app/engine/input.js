GameEngine.prototype.startInput = function() {
	var getXandY = function (e) {
		var x = e.clientX - gameCanvas.canvas.getBoundingClientRect().left;
		var y = e.clientY - gameCanvas.canvas.getBoundingClientRect().top;

		if (x < 1024) {
			x = Math.floor(x / 32);
			y = Math.floor(y / 32);
		}

		return { x: x, y: y };
	}

	var that = this;

	canvas.addEventListener("click", function (e) {
		that.click = getXandY(e);
		log(that.click.x);
	}, false);

	canvas.addEventListener("mousemove", function (e) {
		that.mouse = getXandY(e);
	}, false);

	canvas.addEventListener("mousewheel", function (e) {
		that.wheel = e;
	}, false);

	log("input started");
}