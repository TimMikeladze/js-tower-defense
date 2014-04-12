GameEngine.prototype.setSocketEventHandler = function () {
	var that = this;

	this.socket.on("connect", function() {
		that.socket.emit("getTowers");
	});

	this.socket.on("updateTowers", function (towers) {
		towers.forEach(function (entity) {
			var tower = new Tower(entity.x, entity.y);
			that.addRemoteTower(tower);
		});
	});

	this.socket.on("getTowers", function (towers) {
		towers.forEach(function (entity) {
			var tower = new Tower(entity.x, entity.y);
			that.addRemoteTower(tower);
		});
	});
}
