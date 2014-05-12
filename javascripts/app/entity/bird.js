var Bird = function (sprite, position, width, height, scale) {
	Entity.call(this, sprite, position, width, height, scale);

	this.render = function(canvas) {
	};
};

Bird.prototype = Object.create(Entity.prototype);
Bird.prototype.constructor = Bird;


