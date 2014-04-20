var EnemyOne = function (x, y) {
	Enemy.call(this, x, y, 10, 10, "#FF0000", 1);
};

EnemyOne.prototype = Object.create(Enemy.prototype);
EnemyOne.prototype.constructor = EnemyOne;



