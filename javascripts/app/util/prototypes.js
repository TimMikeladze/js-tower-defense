Object.prototype.getName = function () {
	var funcNameRegex = /function (.{1,})\(/;
	var results = (funcNameRegex).exec((this).constructor.toString());
	return (results && results.length > 1) ? results[1] : "";
};

CanvasRenderingContext2D.prototype.drawFrame = function(sprite, frame, x, y, width, height) {
	var image = Require.getImage(sprite);
	this.drawImage(image, frame.x, frame.y, frame.width, frame.height, x, y, width, height);
}

CanvasRenderingContext2D.prototype.drawFrame = function(sprite, frame, position, width, height) {
	var image = Require.getImage(sprite);
	this.drawImage(image, frame.x, frame.y, frame.width, frame.height, position.x, position.y, width, height);
}