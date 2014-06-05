var util = require("util");
var io = require("socket.io");

var PORT = 9191;

var Game = function (id) {
	this.id = id;
	this.socket = null;
	util.log("Game created with ID " + this.id);

	this.players = [];
	this.tiles = [];
	this.controlPoints = [];

	this.toString = function () {
		return "Players: " + this.players.length;
	};

	this.addPlayer = function (player) {
		this.players.push(player);
		util.log("Player " + player + " added to game " + this.id);
	};

	this.removeAllPlayers = function () {
		this.players = [];
		util.log("All players removed from " + this.id);
	};

	this.removePlayer = function (player) {
		this.players.splice(this.players.indexOf(player), 1);
		util.log("Player " + player + " removed from " + this.id);
	};

	this.isFull = function () {
		return this.players.length >= 5;
	};

	this.isEmpty = function () {
		return this.players.length == 0;
	};

	this.setSocket = function (socket) {
		this.socket = socket;
	};

	this.broadcastPlayers = function (handler, data) {
		this.socket.broadcast.to(this.id).emit(handler, data);
	};

	this.broadcastToPlayer = function (handler, data) {
		this.socket.emit(handler, data);
	};

	this.broadcastAllPlayers = function (handler, data) {
		io.sockets.in(this.id).emit(handler, data);
	};

	this.addTile = function (tile) {
		this.tiles.push(tile);
		this.broadcastPlayers("addTile", tile);
		util.log("Tiles added by " + this.socket.id + " to " + this.id);
	};

	this.addControlPoint = function(point) {
		this.controlPoints.push(point);
		this.broadcastPlayers("addControlPoint", point);
		util.log("Control Point added by " + this.socket.id + " to " + this.id);
	};

	this.sendAll = function () {
		this.broadcastToPlayer("sendAll", {tiles : this.tiles, controlPoints: this.controlPoints});
		util.log("Everything sent to " + this.socket.id + " on " + this.id);
	};

	this.clear = function() {
		this.tiles = [];
		this.controlPoints = [];
		this.broadcastPlayers("clear");
	};

};

var GameFactory = function () {
	this.games = {};
	this.players = {};

	this.findGameByID = function (id) {
		return this.games[id];
	};

	this.findGameByPlayerID = function (id) {
		return this.players[id];
	};

	this.generateGameID = function () {
		var s = "";
		for (var i = 0; i < 32; i++) {
			s += Math.floor(Math.random() * 0xF).toString(0xF);
		}
		return s;
	};

	this.createGame = function () {
		var id = this.generateGameID();
		this.games[id] = new Game(id);
		return id;
	};

	this.removeAllGames = function () {
		this.games = {};
		this.players = {};
		util.log("All games removed");
		util.log("All players removed");
	};

	this.removeGameByID = function (id) {
		var game = this.games[id];
		delete this.games[id];
		util.log("Game " + game.id + " removed");
		var that = this;
		game.players.forEach(function (p) {
			delete that.players[p];
			util.log("Player " + p + " removed");
		});
	};

	this.addPlayer = function (player) {
		var addedPlayer = false;
		var game;
		for (var id in this.games) {
			game = this.games[id];
			if (!game.isFull()) {
				game.addPlayer(player);
				addedPlayer = true;
				break;
			}
		}

		if (!addedPlayer) {
			var id = this.createGame();
			game = this.games[id];
			game.addPlayer(player);
		}
		this.players[player] = game;
		return game;
	};

	this.removePlayer = function (id) {
		var game = this.players[id];
		delete this.players[id];
		game.removePlayer(id);
		if (game.isEmpty()) {
			delete this.games[game.id];
			util.log("Game " + game.id + " deleted");
		}
	};

	this.toString = function () {
		var s = "\n";
		var players = "";
		var games = "";
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
	};

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
		var gameID = gameFactory.addPlayer(client.id).id;
		var game = gameFactory.findGameByID(gameID);

		util.log(gameFactory.toString());

		client.join(gameID);
		client.on("disconnect", onClientDisconnect);
		client.on("addTile", onAddTile);
		client.on("addControlPoint", onAddControlPoint);
		client.on("clear", onClear);

		game.broadcastAllPlayers("setGameID", gameID);
		game.broadcastAllPlayers("numberOfPlayers", gameFactory.findGameByID(gameID).players.length);

		game.setSocket(client);
		game.sendAll();

		client.on('ping', function () {
			client.emit('pong');
		});
	});
}

function onClear() {
	getGame(this).clear();
}

function onAddTile(tile) {
	getGame(this).addTile(tile);
}

function onAddControlPoint(point) {
	getGame(this).addControlPoint(point);
}

function getGame(reference) {
	var game = gameFactory.findGameByPlayerID(reference.id);
	game.setSocket(reference);
	return game;
}

function onClientDisconnect() {
	util.log("Player has disconnected: " + this.id);

	gameFactory.removePlayer(this.id);
	util.log(gameFactory.toString());
}

init();
