var MenuButton = function () {

	this.bindButton = function(id, callback) {
		var button = document.getElementById(id);
		button.onclick = function() {
			callback();
		}
	};
}
