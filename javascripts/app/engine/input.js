GameEngine.prototype.startInput = function () {
	var that = this;

	var getClickedPoint = function (e) {
		var x = e.clientX - gameCanvas.canvas.getBoundingClientRect().left;
		var y = e.clientY - gameCanvas.canvas.getBoundingClientRect().top;

		return new Vector2(x, y);
	}

	gameCanvas.addEventListener("click", function (e) {
		that.click = getClickedPoint(e);
		that.addTower(x, y);
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

	log("input started");
}