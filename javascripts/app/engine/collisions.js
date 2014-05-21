var Collisions = function () {
	// Don't put anything here
};

// tests that first entity will collide with the second
Collisions.isColliding = function (entityA, entityB) {
	if (entityA.position.x < entityB.position.x + entityB.width && entityA.position.x + entityA.width > entityB.position.x &&
		entityA.position.y < entityB.position.y + entityB.height && entityA.position.y + entityA.height > entityB.position.y) {
		// The objects are touching
		return true;
	} else {
		return false;
	}
};