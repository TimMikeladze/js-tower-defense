var DEBUG = true;

var baseUrl = "javascripts/app";
var includes = [];

include("util", ["prototypes", "logging"]);
include("graphics", ["canvas"]);
include("entity", ["entity", "something"]);

var canvas;

function main() {
	var entity = new Entity(1, 2);
	var something = new Something(4, 5, 3);

	log(entity);
	log(something);

	canvas = new Canvas("canvas");

	canvas.draw(function() {
		canvas.context.fillStyle = "#FF0000";
		canvas.context.fillRect(canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50);
	});
}


function include(path, files) {
	files.forEach(function (file) {
		includes.push(baseUrl + "/" + path + "/" + file + ".js");
	});
}

requirejs.config({baseUrl: baseUrl});
require(includes, main);