var util = require("util");
var io = require("socket.io");

var PORT = 9191;

var Game = function (id) {
	this.id = id;
	this.socket = null;

	util.log("Game created with ID " + this.id);
	this.players = [];
	this.towers = [];

	this.toString = function () {
		return "Players: " + this.players.length;
	}

	this.addPlayer = function (player) {
		this.players.push(player);
		util.log("Played " + player + " added to game " + this.id);
	}

	this.removeAllPlayers = function () {
		this.players = [];
		util.log("All players removed from " + this.id);
	}

	this.removePlayer = function (player) {
		this.players.splice(this.players.indexOf(player), 1);
		util.log("Player " + player + " removed from " + this.id);
	}

	this.isFull = function () {
		return this.players.length >= 2;
	}

	this.isEmpty = function () {
		return this.players.length == 0;
	}

	this.setSocket = function(socket) {
		this.socket = socket;
	}

	this.broadcastPlayers = function(handler, data) {
		util.log(this.id);
		this.socket.broadcast.to(this.id).emit(handler, data);
	}

	this.broadcastAllPlayers = function(handler, data) {
		io.sockets.in(this.id).emit(handler, data);
	}

	this.addTower = function(tower) {
		this.towers.push(tower);
		this.broadcastPlayers("addTower", tower);
	}

};

var GameFactory = function () {
	this.games = {};
	this.players = {};

	this.findGameByID = function (id) {
		return this.games[id];
	}

	this.findGameByPlayerID = function(id) {
		return this.players[id];
	}

	this.generateGameID = function () {
		var s = "";
		for (var i = 0; i < 32; i++) {
			s += Math.floor(Math.random() * 0xF).toString(0xF);
		}
		return s;
	}

	this.createGame = function () {
		var id = this.generateGameID();
		this.games[id] = new Game(id);
		return id;
	}

	this.removeAllGames = function () {
		this.games = {};
		this.players = {};
		util.log("All games removed");
		util.log("All players removed");
	}

	this.removeGameByID = function (id) {
		var game = this.games[id];
		delete this.games[id];
		util.log("Game " + game.id + " removed");
		var that = this;
		game.players.forEach(function (p) {
			delete that.players[p];
			util.log("Player " + p + " removed");
		});
	}

	this.addPlayer = function (player, socket) {
		var addedPlayer = false;
		var game;
		for (var id in this.games) {
			game = this.games[id];
			if (!game.isFull()) {
				game.addPlayer(player, socket);
				addedPlayer = true;
				break;
			}
		}
		if (!addedPlayer) {
			var id = this.createGame();
			game = this.games[id];
			game.addPlayer(player, socket);
		}

		this.players[player] = game;
		return game;
	}

	this.removePlayer = function (id) {
		var game = this.players[id];
		delete this.players[id];
		game.removePlayer(id);
		if (game.isEmpty()) {
			delete this.games[game];
			util.log("Game " + game.id + " deleted");
		}
	}

	this.toString = function () {
		var s = "\n"
		var players = "";
		var games = ""
		for (var player in this.players) {
			players += player + " => " + this.players[player].id + "\n";
		}
		s += "Players / Games\n";
		s += players + "\n";
		for (var game in this.games) {
			games += game + " => " + this.games[game] + "\n";
		}
		s += "Games\n";
		s += games;
		return s;
	}

};

var gameFactory;
var io;

function init() {
	io = io.listen(PORT);

	io.configure(function () {
		io.set("transports", ["websocket"]);
		io.set("log level", 2);
	});

	gameFactory = new GameFactory();

	setEventHandlers();
}

function setEventHandlers() {
	io.sockets.on('connection', function (client) {
		var gameID = gameFactory.addPlayer(client.id, client).id;

		client.join(gameID);
		client.on("disconnect", onClientDisconnect);
		client.on("addTower", onAddTower);

		io.sockets.in(gameID).emit("setGameID", gameID);
		io.sockets.in(gameID).emit("numberOfPlayers", gameFactory.findGameByID(gameID).players.length);
	});
}

function onAddTower(tower) {
	var game = gameFactory.findGameByPlayerID(this.id);
	game.setSocket(this);
	game.addTower(tower);
}

function onClientDisconnect() {
	util.log("Player has disconnected: " + this.id);

	gameFactory.removePlayer(this.id);
	util.log(gameFactory.toString());

}

init();
