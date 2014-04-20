GameEngine.prototype.setSocketEventHandler = function () {
	var that = this;

	this.socket.on("log", function(data) {
		log(data);
	});

	this.socket.on("setGameID", function(gameID) {
		that.gameID = gameID;
		log("Game ID: " + gameID);
	});

	this.socket.on("numberOfPlayers", function(players) {
		log("Players " + players);
	});

	this.socket.on("addTower", function(tower) {
		tower = new Tower(tower.x, tower.y);
		that.addTower(tower, false);
	});

	this.socket.on("getTowers", function(towers) {
		towers.forEach(function(t) {
				
		});
	});

}
