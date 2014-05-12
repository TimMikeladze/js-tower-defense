var Bird = function (sprite, position, width, height) {
	Entity.call(this, sprite, position, width, height);

	this.render = function(canvas) {
	};
};

Bird.prototype = Object.create(Entity.prototype);
Bird.prototype.constructor = Bird;


