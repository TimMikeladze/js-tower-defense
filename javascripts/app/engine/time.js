var Time = function () {
	this.gameTime = 0;
	this.maxStep = 0.5;
	this.stamp = 0;

	this.tick = function () {
		this.stamp = Date.now();
		this.gameTime += this.maxStep;
	};
};