var EnemyQueue = function (engine, enemies, path, rate) {
	this.engine = engine;
	this.enemies = Array.isArray(enemies) ? enemies : EnemyQueue.generateEnemies();
	this.path = path ? path : EnemyQueue.generatePath();
	this.rate = rate ? rate : 1;

	this.nextEnemy = function () {
		return enemies.length > 0 ? enemies.shift() : null;
	};

	this.getRemainingEnemies = function () {
		return enemies.length;
	};

	this.populateEngine = function () {
		var that = this;

		new Timer(1500, function () {
			that.engine.addPig(that.enemies.shift());
			if (this.count >= 4) {
				this.stop();
			}
		});
	};
};

EnemyQueue.generatePath = function () {
	return [new Vector2(5.5, 55), new Vector2(62.5, 83), new Vector2(85.5, 160), new Vector2(153.5, 198), new Vector2(201.5, 250), new Vector2(267.5, 292), new Vector2(348.5, 273), new Vector2(390.5, 213), new Vector2(422.5, 127), new Vector2(477.5, 165), new Vector2(502.5, 228), new Vector2(525.5, 261), new Vector2(571.5, 328), new Vector2(596.5, 358), new Vector2(650, 600), new Vector2(700, 600), Vector2(800, 600)];
};

EnemyQueue.generateEnemies = function () {
	var result = [];

	for (var i = 4; i <= 30; i++) {
		var enemyToAdd = new Pig(0, 0, 100, 97);
		result.push(enemyToAdd);
	}

	return result;
};


