var EnemyTwo = function (x, y) {
	Enemy.call(this, x, y, 15, 15, "#00FF00", 2);
};

EnemyTwo.prototype = Object.create(Enemy.prototype);
EnemyTwo.prototype.constructor = EnemyTwo;