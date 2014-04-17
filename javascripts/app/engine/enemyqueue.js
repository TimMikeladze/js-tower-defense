var EnemyQueue = function(enemies, path, rate) {
	this.enemies = Arrays.isArray(enemies) ? enemies : EnemyQueue.generateEnemies();
	this.path = path ? path : EnemyQueue.generatePath();
	this.rate = rate ? rate : 1;

	this.nextEnemy = function() {
		return enemies.length > 0 enemies.shift() : null;
	}

	this.getRemainingEnemies = function() {
		return enemies.length;
	}
}

EnemyQueue.generatePath = function() {

}

EnemyQueue.generateEnemies = function() {

}

