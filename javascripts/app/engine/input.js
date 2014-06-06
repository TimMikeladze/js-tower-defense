GameEngine.prototype.startInput = function () {
	var that = this;

	var getClickedPoint = function (e, currentCanvas) {
		var x = e.clientX - currentCanvas.canvas.getBoundingClientRect().left;
		var y = e.clientY - currentCanvas.canvas.getBoundingClientRect().top;

		return new Vector2(x, y);
	};

	this.gameCanvas.addEventListener("click", function (e) {
		that.click = getClickedPoint(e, that.gameCanvas);
		if (that.pauseFlag) {
			log("clicked on pause: " + that.click.x + " " + that.click.y);

		} else if (!that.pauseFlag && that.floatingEntity && that.floatingEntity.canPlace(that)) {
			that.floatingEntity.placeBird(that);
			that.addBird(that.floatingEntity);
			that.floatingEntity = null;
		}
	}, false);

	this.gameCanvas.addEventListener("mousemove", function (e) {
		that.mouse = getClickedPoint(e, that.gameCanvas);
		if (that.floatingEntity != null) {
			that.floatingEntity.setPosition(that.mouse);
		}
	}, false);

	this.gameCanvas.addEventListener("mousewheel", function (e) {
		that.wheel = e;
	}, false);

	this.sideCanvas.addEventListener("click", function (e) {
		that.click = getClickedPoint(e, that.sideCanvas);

		that.sideBar.checkButton(that.click.x, that.click.y);

	}, false);

	this.sideCanvas.addEventListener("mousemove", function (e) {
		that.click = getClickedPoint(e, that.sideCanvas);
		that.sideBar.checkHover(that.click.x, that.click.y);
		that.sideBar.canPaint(that.click.x, that.click.y);
	}, false);


	window.addEventListener("keydown", function (e) {
		e.preventDefault();
		if (e.keyCode === 80) {
			that.pauseFlag = !that.pauseFlag;
		}
	}, false);
};