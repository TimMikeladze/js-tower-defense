GameEngine.prototype.setSocketEventHandler = function () {
	var that = this;

	this.socket.on("log", function (data) {
		log(data);
	});

	this.socket.on("setGameID", function (gameID) {
		that.gameID = gameID;
		log("Game ID: " + gameID);
	});

	this.socket.on("numberOfPlayers", function (players) {
		log("Players " + players);
	});

	this.socket.on("addTower", function (recievedTower) {
	});

	this.socket.on("sendTowers", function (towers) {
	});

};
