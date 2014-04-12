var Bezier = function () {

}

Bezier.smoothing = 200;

Bezier.calculateBezierPoint = function (t, p0, p1, p2, p3) {
	var u = 1 - t;
	var tt = t*t;
	var uu = u * u;
	var uuu = uu * u;
	var ttt = tt * t;

	var p = p0.clone().multiplyScalar(uuu);
	p.addSelf(p1.clone().multiplyScalar(3 * uu * t));
	p.addSelf(p2.clone().multiplyScalar(3 * u * tt));
	p.addSelf(p3.clone().multiplyScalar(ttt));

	return p;

}

Bezier.calculateCurve = function (controlPoints) {
	var calculatedPoints = [];

	for (var i = 0; i < controlPoints.length - 3; i += 3) {
		var p0 = controlPoints[i];
		var p1 = controlPoints[i + 1];
		var p2 = controlPoints[i + 2];
		var p3 = controlPoints[i + 3];

		if (i == 0) {
			calculatedPoints.push(Bezier.calculateBezierPoint(0, p0, p1, p2, p3));
		}

		for (var j = 1; j <= Bezier.smoothing; j++) {
			calculatedPoints.push(Bezier.calculateBezierPoint(j * 1.0 / Bezier.smoothing, p0, p1, p2, p3));
		}
	}
	return calculatedPoints;
}
