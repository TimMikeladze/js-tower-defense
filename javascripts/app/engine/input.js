GameEngine.prototype.startInput = function () {
	var getClickedPoint = function (e) {
		var x = e.clientX - gameCanvas.canvas.getBoundingClientRect().left;
		var y = e.clientY - gameCanvas.canvas.getBoundingClientRect().top;

		return new Vector2(x, y);
	}

	var that = this;

	gameCanvas.addEventListener("click", function (e) {
		that.click = getClickedPoint(e);
		that.addTower();
		that.clearFloatingEntitiy();

	}, false);

	gameCanvas.addEventListener("mousemove", function (e) {
		that.mouse = getClickedPoint(e);
		if(that.floatingEntity) {
			that.floatingEntity.setCoordinates(that.mouse.x - that.floatingEntity.width / 2, that.mouse.y - that.floatingEntity.height / 2);
		} else {
			var tower = new Tower();
			tower.setCoordinates(that.mouse.x - tower.width / 2, that.mouse.y - tower.height / 2);
			that.setFloatingEntity(tower);
		}

	}, false);

	gameCanvas.addEventListener("mousewheel", function (e) {
		that.wheel = e;
	}, false);

	log("input started");
}