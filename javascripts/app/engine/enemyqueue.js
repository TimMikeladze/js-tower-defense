var EnemyQueue = function(engine, enemies, path, rate) {
	this.engine = engine;
	this.enemies = Array.isArray(enemies) ? enemies : EnemyQueue.generateEnemies();
	this.path = path ? path : EnemyQueue.generatePath();
	this.rate = rate ? rate : 1;

	this.nextEnemy = function() {
		return enemies.length > 0 ? enemies.shift() : null;
	}

	this.getRemainingEnemies = function() {
		return enemies.length;
	}

	this.populateEngine = function() {
		var that = this;
		t1 = new Timer(500, function(){
			that.engine.addEnemy(that.enemies.shift());
			if (this.count >= 2) {
				this.stop();
			}
		});

	}
}

EnemyQueue.generatePath = function() {

}

EnemyQueue.generateEnemies = function() {
	return [new EnemyOne(),new EnemyTwo(),new EnemyThree()];
}

