Object.prototype.getName = function () {
	var funcNameRegex = /function (.{1,})\(/;
	var results = (funcNameRegex).exec((this).constructor.toString());
	return (results && results.length > 1) ? results[1] : "";
};

CanvasRenderingContext2D.prototype.drawFrame = function (sprite, frame, x, y, width, height, scale) {
	var image = Require.getImage(sprite);
	scale = scale ? scale : 1;
	this.drawImage(image, frame.x, frame.y, frame.width, frame.height, x, y, width * scale, height * scale);
}

CanvasRenderingContext2D.prototype.drawFrame = function (sprite, frame, position, width, height, scale) {
	var image = Require.getImage(sprite);
	scale = scale ? scale : 1;
	this.drawImage(image, frame.x, frame.y, frame.width, frame.height, position.x, position.y, width * scale, height * scale);
}