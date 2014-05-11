var Collisions = function () {
	// Don't put anything here
};

// tests that first entity will collide with the second
Collisions.isColliding = function (entityA, entityB) {
	if (entityA.x < entityB.x + entityB.width && entityA.x + entityA.width > entityB.x &&
		entityA.y < entityB.y + entityB.height && entityA.y + entityA.height > entityB.y) {
		// The objects are touching
		return true;
	} else {
		return false;
	}
};