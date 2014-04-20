var Random = function () {

};

Random.getRandomArbitary = function (min, max) {
	return Math.random() * (max - min) + min;
};

Random.getRandomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
