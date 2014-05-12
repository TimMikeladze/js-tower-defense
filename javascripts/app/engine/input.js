GameEngine.prototype.startInput = function () {
	var that = this;

	var getClickedPoint = function (e) {
		var x = e.clientX - that.canvas.canvas.getBoundingClientRect().left;
		var y = e.clientY - that.canvas.canvas.getBoundingClientRect().top;

		return new Vector2(x, y);
	};

	this.canvas.addEventListener("click", function (e) {
		that.click = getClickedPoint(e);

		if (that.floatingEntity != null) {
			that.floatingEntity.placeBird();
			that.entities.push(that.floatingEntity);
			that.floatingEntity = null;
		}
	}, false);

	this.canvas.addEventListener("mousemove", function (e) {
		that.mouse = getClickedPoint(e);

		if (that.floatingEntity == null) {
			that.floatingEntity = new RedBird(that.mouse);
		} else {
			that.floatingEntity.setPosition(that.mouse);
		}

	}, false);

	this.canvas.addEventListener("mousewheel", function (e) {
		that.wheel = e;
	}, false);

};