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
		
		for (var i = 0; i < 30; i++) { 
			setInterval(function tick() {
				that.engine.addEnemy(that.enemies.shift());
			}, Math.floor((Math.random()*500)));
		}
		
		/*
		new Timer(500, function(){
			that.engine.addEnemy(that.enemies.shift());
			if (this.count >= 30) {
				this.stop();
			}
		});
		*/
	}
}

EnemyQueue.generatePath = function() {
	return [new Vector2(5.5, 55), new Vector2(62.5, 83), new Vector2(85.5, 160), new Vector2(153.5, 198), new Vector2(201.5, 250), new Vector2(267.5, 292), new Vector2(348.5, 273), new Vector2(390.5, 213), new Vector2(422.5, 127), new Vector2(477.5, 165), new Vector2(502.5, 228), new Vector2(525.5, 261), new Vector2(571.5, 328), new Vector2(596.5, 358)];
}

EnemyQueue.generateEnemies = function() {
	var result = [];
	
	for (var i = 0; i < 30; i++) { 
		var enemyType = Math.floor((Math.random()*3));
		var enemyToAdd = null;
		
		switch(enemyType) {
			case 0:
				enemyToAdd = new EnemyOne();
				break;
			case 1:
				enemyToAdd = new EnemyTwo();
				break;
			case 2:
				enemyToAdd = new EnemyThree();
		}
		
		result.push(enemyToAdd);
	}
	
	return result;
};


