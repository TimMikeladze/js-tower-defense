// not done

var Menu = function (canvas, path, x, y, width, height) {
	this.canvas = canvas;
	this.image = Require.getImage(path);
	this.width = width;
	this.height = height;

	this.x = x;
	this.y = y;
	this.buttons = {};
	var buttonIndex = 0;

	this.start() {
		canvas.context.drawImage(Require.getImage(path), this.x, this.y);
	}

	this.addButtonCoords = function (name, x, y, w, h) {
		buttons.push(name, {x: x, y: y, width: w, height: h});
	}
} 
