var MenuButton = function () {

	this.bindButton = function (id, callback) {
		var button = document.getElementById(id);
		button.onclick = function () {
			callback();
		}
	};
}

var PauseButton = function(sprite, x, y, xOffset, yOffset) {
	this.sprite = sprite;
	this.x = x;
	this.y = y;
	this.width = null;
	this.height = null;

	this.render = function(canvas) {
		var ctx = canvas.context;
		ctx.drawImage(Require.getImage(this.sprite), x + xOffset, y + yOffset);
	}
}
