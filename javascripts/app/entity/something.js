var Something = function (x, y, z) {
	Entity.call(this, x, y);

	this.z = z;

	var old = this.toString;
	this.toString = function () {
		return old.call(this) + ", z: " + this.z;
	}
}


