var util = require("util");
var io = require("socket.io");

var PORT = 9191;

var socket;
var players;
var towers;


function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}


var Game = function (id) {
	this.id = id;
	util.log("Game created with ID " + this.id);
	this.players = [];

	this.addPlayer = function (player) {
		this.players.push(player);
		util.log("Played added to game " + this.id);
	}

	this.removeAllPlayers = function () {
		this.players = [];
		util.log("All players removed from " + this.id);
	}

	this.removePlayer = function (id) {
		var player = this.findPlayerByID(id);
		this.players.splice(this.players.indexOf(player), 1);
		util.log("Player " + player.id + " removed from " + this.id);
	}

	this.findPlayerByID = function (id) {
		this.players.forEach(function (p) {
			if (p.id == id) {
				return p;
			}
		});
	}

	this.isFull = function () {
		return this.players.length >= 2;
	}

	this.toString = function () {
		return "Players: " + this.players.length;
	}
};


var GameFactory = function () {
	this.games = [];

	this.findGameByID = function (id) {
		this.games.forEach(function (g) {
			if (g.id == id) {
				return g;
			}
		});
	}

	this.generateGameID = function () {
		return  (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
	}

	this.createGame = function () {
		this.games.push(new Game(this.generateGameID()));
	}

	this.removeAllGames = function () {
		this.games = [];
		util.log("All games removed");
	}

	this.removeGameByID = function (id) {
		var game = this.findGameByID(id);
		this.games.splice(this.games.indexOf(game), 1);
		util.log("Game " + id + " removed");
	}

	this.addPlayer = function (player) {
		var addedPlayer = false;
		if (this.games.length > 0) {
			for (var i = 0; i < this.games.length; i++) {
				var g = this.games[i];
				if (!g.isFull()) {
					g.addPlayer(player);
					addedPlayer = true;
				}
			}
		}
		if (!addedPlayer || this.games.length == 0) {
			this.createGame();
			this.games[this.games.length - 1].addPlayer((player));
		}
	}
}


function init() {
	games = [];
	players = [];
	towers = [];

	socket = io.listen(PORT);

	socket.configure(function () {
		socket.set("transports", ["websocket"]);
		socket.set("log level", 2);
	});

	setEventHandlers();
};


var setEventHandlers = function () {
	socket.sockets.on("connection", onSocketConnection);

};

function onSocketConnection(client) {
	util.log("New player has connected: " + client.id);
	players.push(client);

	client.on("disconnect", onClientDisconnect);
	client.on("getTowers", onGetTowers);
	client.on("updateTowers", onUpdateTowers);
};

function onClientDisconnect() {
	util.log("Player has disconnected: " + this.id);

	var removePlayer = playerById(this.id);

	if (!removePlayer) {
		util.log("Player not found: " + this.id);
		return;
	}
	;

	players.splice(players.indexOf(removePlayer), 1);

	if (players.length == 0) {
		towers = [];
	}
}

function onUpdateTowers(data) {
	this.broadcast.emit("updateTowers", data);
	//socket.sockets.emit("updateTowers", data);
	data.forEach(function (d) {
		towers.push(d);
	});
	util.log("towers updated");
};

function onGetTowers() {
	//this.broadcast.emit("updateTowers", data);
	socket.sockets.emit("getTowers", towers);
	util.log(towers);
	util.log("towers get");
};


//init();

var gameFactory = new GameFactory();

gameFactory.addPlayer("test player");
gameFactory.addPlayer("test player");
gameFactory.addPlayer("test player");
gameFactory.addPlayer("test player");
gameFactory.addPlayer("test player");

util.log(gameFactory.games);
