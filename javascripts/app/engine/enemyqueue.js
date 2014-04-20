var EnemyQueue = function(engine, enemies, path, rate) {
	this.engine = engine ? engine : null;
	this.enemies = Array.isArray(enemies) ? enemies : EnemyQueue.generateEnemies();
	this.path = path ? path : EnemyQueue.generatePath();
	this.rate = rate ? rate : 1;

	this.nextEnemy = function() {
		return enemies.length > 0 ? enemies.shift() : null;
	}

	this.getRemainingEnemies = function() {
		return enemies.length;
	}
}

EnemyQueue.generatePath = function() {

}

EnemyQueue.generateEnemies = function() {
	return [new EnemyOne(),new EnemyTwo(),new EnemyThree()];
}

