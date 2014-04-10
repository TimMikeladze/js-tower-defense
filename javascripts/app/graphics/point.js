var Point = function(x, y) {
	this.x = x;
	this.y = y;

	this.toString = function() {
		return "x: " + this.x + ", y: " + this.y;
	}

	this.getX = function() {
		return this.x;
	}

	this.getY = function() {
		return this.y;
	}
}