var DEBUG = true;

var baseUrl = "javascripts/app";
var includes = [];

include("util", ["prototypes", "logging"]);
include("entity", ["entity", "something"]);


function main() {
	var entity = new Entity(1, 2);
	var something = new Something(4, 5, 3);
	log(entity);
	log(something);
}


function include(path, files) {
	files.forEach(function (file) {
		includes.push(baseUrl + "/" + path + "/" + file + ".js");
	});
}

requirejs.config({baseUrl: baseUrl});
require(includes, main);