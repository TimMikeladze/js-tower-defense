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
		//TODO(tim) need to make this generic to handle all tower types
		var tower = new TowerOne(recievedTower.x, recievedTower.y);
		tower.rotationIndex = recievedTower.rotationIndex;
		that.addTower(tower, false);
	});

	this.socket.on("sendTowers", function (towers) {
		log("Towers recieved");
		towers.forEach(function (recievedTower) {
			var tower = new TowerOne(recievedTower.x, recievedTower.y);
			tower.rotationIndex = recievedTower.rotationIndex;
			that.addTower(tower, false);
		});
	});

};
