var Entity = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.alpha = 1;

	this.toString = function() {
		return "x: " + this.x + ", y: " + this.y;
	}

	this.render = function() {

	}

	this.setCoordinates = function(x, y) {
		this.x = x;
		this.y = y;
	}

	this.setDimensions = function(width, height) {
		this.width = width;
		this.height = height;
	}
}

