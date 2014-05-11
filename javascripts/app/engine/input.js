GameEngine.prototype.startInput = function () {
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
		that.mouse = getClickedPoint(e);

	}, false);

	this.canvas.addEventListener("mousewheel", function (e) {
		that.wheel = e;
	}, false);

};