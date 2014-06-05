var Connection = function (url, port, latency) {
	this.url = url + ":" + port;
	this.socket = null;

	this.connect = function () {
		this.socket = io.connect(this.url);

		if (latency) {
			var that = this.socket;
			setInterval(function () {
				var startTime = Date.now();
				that.emit('ping');
				that.on('pong', function () {
					var latency = Date.now() - startTime;
					log("Latency: " + latency);
				});
			}, 2000);
		}
	};


};