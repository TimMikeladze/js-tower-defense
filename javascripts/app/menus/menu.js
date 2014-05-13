// not done
var Menu = function (path, width, height) {
	this.path = path;
	this.width = width;
	this.height = height;

	this.x1 = null;
	this.y1 = null;
	this.x2 = null;
	this.y2 = null;

	this.buttons = {};
	var buttonIndex = 0;

	this.setCoordinates = function (x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}

	this.addButtonCoords = function (name, x1, y1, x2, y2) {
		buttons.push(name, {x1: x1, y1: y1, x2: x2, y2: y2});
	}
}