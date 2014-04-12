var Connection = function(url, port) {
	this.url = url + ":" + port;
	this.socket = null;

	this.connect = function() {
		this.socket = io.connect(this.url);
	}
};