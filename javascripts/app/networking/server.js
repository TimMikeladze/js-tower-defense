var util = require("util");
var io = require("socket.io");

var socket;
var players;

function init() {
	players = [];

	socket = io.listen(9191);

	socket.configure(function () {
		// Only use WebSockets
		socket.set("transports", ["websocket"]);

		// Restrict log output
		socket.set("log level", 2);
	});

	setEventHandlers();
};


var setEventHandlers = function () {
	socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
	util.log("yes");
	util.log("New player has connected: " + client.id);

	client.on("disconnect", onClientDisconnect);

	client.on("new player", onNewPlayer);

	client.on("move player", onMovePlayer);
};

function onClientDisconnect() {
	util.log("Player has disconnected: " + this.id);

	var removePlayer = playerById(this.id);

	// Player not found
	if (!removePlayer) {
		util.log("Player not found: " + this.id);
		return;
	}
	;

	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);

	// Broadcast removed player to connected socket clients
	this.broadcast.emit("remove player", {id: this.id});
};

// New player has joined
function onNewPlayer(data) {
	// Create a new player
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = this.id;

	// Broadcast new player to connected socket clients
	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});

	// Send existing players to the new player
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
	}
	;

	// Add new player to the players array
	players.push(newPlayer);
};

// Player has moved
function onMovePlayer(data) {
	// Find player in array
	var movePlayer = playerById(this.id);

	// Player not found
	if (!movePlayer) {
		util.log("Player not found: " + this.id);
		return;
	}
	;

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);

	// Broadcast updated position to connected socket clients
	this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
};


function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	}
	;

	return false;
};

init();


