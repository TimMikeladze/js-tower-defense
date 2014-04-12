GameEngine.prototype.startInput = function () {
	var getClickedPoint = function (e) {
		var x = e.clientX - gameCanvas.canvas.getBoundingClientRect().left;
		var y = e.clientY - gameCanvas.canvas.getBoundingClientRect().top;

		return new Vector2(x, y);
	}

	var that = this;

	gameCanvas.addEventListener("click", function (e) {
		that.click = getClickedPoint(e);
		that.applyFloatingEntity();
		that.clearFloatingEntitiy();

	}, false);

	gameCanvas.addEventListener("mousemove", function (e) {
		that.mouse = getClickedPoint(e);
		var something = new Something();
		something.setCoordinates(that.mouse.x - something.width / 2, that.mouse.y - something.height / 2);
		that.clearFloatingEntitiy();
		that.setFloatingEntity(something);

	}, false);

	gameCanvas.addEventListener("mousewheel", function (e) {
		that.wheel = e;
	}, false);

	log("input started");
}