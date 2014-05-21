var EnemyQueue = function (engine, enemies, path, rate) {
	this.engine = engine;
	this.enemies = Array.isArray(enemies) ? enemies : EnemyQueue.generateEnemies(path, enemies);
	this.path = path;
	this.rate = rate ? rate : 1000;

	this.nextEnemy = function () {
		return this.enemies.length > 0 ? enemies.shift() : null;
	};

	this.getRemainingEnemies = function () {
		return this.enemies.length;
	};

	this.populateEngine = function () {
		var that = this;
		var length = that.enemies.length;
		new Timer(this.rate, function () {
			that.engine.addPig(that.enemies.shift());
			if (this.count == length - 1) {
				this.stop();
			}
		});
	};
};

EnemyQueue.generateEnemies = function (path, amount) {
	var result = [];

	for (var i = 0; i < amount; i++) {
		var enemyToAdd = new GreenPig(path[0]);
		enemyToAdd.setPath(path);
		result.push(enemyToAdd);
	}

	return result;
};


