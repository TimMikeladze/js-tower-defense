GameEngine.prototype.setSocketEventHandler = function () {
	var that = this;

	this.socket.on("setGameID", function(gameID) {
		that.gameID = gameID;
		log("Game ID: " + gameID);
	});


	this.socket.on("numberOfPlayers", function(players) {
		log("Players " + players);
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
