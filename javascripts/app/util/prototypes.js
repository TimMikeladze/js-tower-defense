Object.prototype.getName = function () {
	var funcNameRegex = /function (.{1,})\(/;
	var results = (funcNameRegex).exec((this).constructor.toString());
	return (results && results.length > 1) ? results[1] : "";
};

function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
