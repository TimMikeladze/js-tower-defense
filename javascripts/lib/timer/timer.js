function Timer(delay, callbacks) {
	if (Object.prototype.toString.call(callbacks) === "[object Function]") {
		callbacks = [callbacks];
	}
	this.callbacks = callbacks;
	var that = this;
	var id = setInterval(function tick() {
		if (!that.running) return;
		for (var i = 0; i < that.callbacks.length; i++) {
			that.callbacks[i].call(that);
		}
		that.count++;
	}, delay);
	this.__defineGetter__('id', function () {
		return id
	});
	this.__defineGetter__('delay', function () {
		return delay
	});
	Timer.all.push(this);
}
Timer.prototype.running = true;
Timer.prototype.count = 0;
Timer.prototype.pause = function pause() {
	this.running = false;
	return this;
};
Timer.prototype.run = function run() {
	this.running = true;
	return this;
};
Timer.prototype.stop = function stop() {
	// Unlike pause, once you stop timer, you can't run it again
	clearInterval(this.id);
	this.stopped = true;
	return this;
};

Timer.all = [];
Timer.all.pause = function pause() {
	var all = Timer.all;
	for (var i = 0; i < all.length; i++) {
		all[i].pause();
	}
	return all;
};
Timer.all.run = function run() {
	var all = Timer.all;
	for (var i = 0; i < all.length; i++) {
		all[i].run();
	}
	return all;
};
Timer.all.stop = function stop() {
	var all = Timer.all;
	for (var i = 0; i < all.length; i++) {
		all[i].stop();
	}
	return all;
};