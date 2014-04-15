var util = require("util");
var io = require("socket.io");

var PORT = 9191;

var socket;
var players;

var towers;

function init() {
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
	util.log("Player has disconnected: "+this.id);

	var removePlayer = playerById(this.id);

	if (!removePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};

	players.splice(players.indexOf(removePlayer), 1);

	if (players.length == 0) {
		towers = [];
	}
}

function onUpdateTowers(data) {
	this.broadcast.emit("updateTowers", data);
	//socket.sockets.emit("updateTowers", data);
	data.forEach(function(d) {
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

function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};

	return false;
};

init();


