var EnemyQueue = function (engine, path) {
	this.engine = engine;
	this.enemies = EnemyQueue.generateEnemies(path, 10);
	this.path = path;
	this.rate = 3000;

	this.nextEnemy = function () {
		return this.enemies.length > 0 ? this.enemies.shift() : null;
	};

	this.getRemainingEnemies = function () {
		return this.enemies.length;
	};

	this.populateEngine = function () {
		var that = this;
		var length = that.enemies.length;
		new Timer(that.rate, function () {
			that.engine.addPig(that.enemies.shift());
			if (this.count == length - 1) {
				this.stop();
			}
		});
	};

	this.addWave = function (level) {
		var numEnemiesWave = 10 + (level * 5);
		this.enemies = EnemyQueue.generateEnemies(path, numEnemiesWave, level);
		this.populateEngine();
		this.engine.sideBar.updateWaves();
		this.engine.sideBar.updateEnemiesLeft(numEnemiesWave);
	};
};

EnemyQueue.generateEnemies = function (path, amount, level) {
	var result = [];

	for (var i = 0; i < amount; i++) {
		var enemyToAdd = new GreenPig(path[0]);
		enemyToAdd.setPath(path);
		result.push(enemyToAdd);
	}

	return result;
};


