GameEngine.prototype.startInput = function () {
	var that = this;

	var getClickedPoint = function (e) {
		var x = e.clientX - gameCanvas.canvas.getBoundingClientRect().left;
		var y = e.clientY - gameCanvas.canvas.getBoundingClientRect().top;

		return new Vector2(x, y);
	};

	gameCanvas.addEventListener("click", function (e) {

	}, false);

	gameCanvas.addEventListener("mousemove", function (e) {
		that.mouse = getClickedPoint(e);
		this.localSlingshot.rotateTo(that.mouse);

	}, false);

	gameCanvas.addEventListener("mousewheel", function (e) {
		that.wheel = e;
	}, false);

};