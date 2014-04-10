var Entity = function(x, y) {
	this.x = x;
	this.y = y;
	this.alpha = 1;

	this.toString = function() {
		return "x: " + this.x + ", y: " + this.y;
	}

	this.setX = function(x) {
		this.x = x;
	}

	this.setY = function(y) {
		this.y = y;
	}

	this.getX = function() {
		return this.x;
	}

	this.getY = function() {
		return this.y;
	}

	this.setCoordinates = function(x, y) {
		this.setX(x);
		this.setY(y);
	}
}

