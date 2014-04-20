var EnemyThree = function (x, y) {
	Enemy.call(this, x, y, 12, 12, "#0000FF", 3);
}

EnemyThree.prototype = Object.create(Enemy.prototype);
EnemyThree.prototype.constructor = EnemyThree;