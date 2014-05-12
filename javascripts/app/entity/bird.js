var Bird = function (sprite, position, width, height, scale) {
	Entity.call(this, sprite, position, width, height, scale);

	this.alpha = 0.5;

	this.state = Bird.FLOATING;

	this.render = function(canvas) {

	};

	this.tick = function(time) {

	};

	this.placeBird = function() {
		this.alpha = 1;
		this.state = Bird.IDLING;
	};

};

Bird.FLOATING = 0
Bird.IDLING = 1;

Bird.prototype = Object.create(Entity.prototype);
Bird.prototype.constructor = Bird;


