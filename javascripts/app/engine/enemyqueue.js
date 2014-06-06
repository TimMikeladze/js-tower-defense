var EnemyQueue = function (engine) {
	this.engine = engine;
	this.map = engine.map;
	this.enemies = EnemyQueue.generateEnemies(this.map.path, 10);
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

	this.addWave = function (wave, level) {
		var numEnemiesWave = 10 + (wave * 2);
		this.engine.sideBar.updateEnemiesLeft(numEnemiesWave);

		var enemyStrength = 0;
		if (wave >= 4 && wave <= 6) {
			enemyStrength = 1;
		} else if (wave >= 7) {
			enemyStrength = 2;
		}

		console.log("enemy strength" + enemyStrength);
		this.enemies = EnemyQueue.generateEnemies(this.map.path, numEnemiesWave, level + enemyStrength);
		this.populateEngine();
	};
};

EnemyQueue.generateEnemies = function (path, amount, level) {
	var result = [];

	for (var i = 0; i < amount; i++) {
		var enemyToAdd, enemy;

		switch (level) {
			case 1: // 1
				enemy = 1;
				break;
			case 2: // 1, 2
				enemy = Random.getRandomInt(1, 2);
				break;
			case 3: // 1, 2, 3
				enemy = Random.getRandomInt(1, 3);
				break;
			case 4: // 2
				enemy = 2;
				break;
			case 5: // 2, 3
				enemy = Random.getRandomInt(2, 3);
				break;
			case 6: // 2, 3, 4
				enemy = Random.getRandomInt(2, 4);
				break;
			case 7: // 3
				enemy = 3;
				break;
			case 8: // 3, 4
				enemy = Random.getRandomInt(3, 4);
				break;
			default: // 4
				enemy = 4;
				break;
		}
		switch (enemy) {
			case 2:
				enemyToAdd = new MustachePig(path[0]);
				break;
			case 3:
				enemyToAdd = new KingPig(path[0]);
				break;
			case 4:
				enemyToAdd = new HelmetPig(path[0]);
				break;
			default:
				enemyToAdd = new GreenPig(path[0]);
				break;
		}
		enemyToAdd.setPath(path);
		result.push(enemyToAdd);
	}
	return result;
};


