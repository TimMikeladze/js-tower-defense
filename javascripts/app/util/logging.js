var Logging = function () {

};

Logging.DEBUG = true;
Logging.VERBOSE = false;

function log(message, force) {
	if (Logging.DEBUG || force) {
		if (Logging.VERBOSE) {
			var caller = arguments.callee.caller.name ? arguments.callee.caller.name : "global";
			console.log(caller);
		}
		console.log(message);
	}
}
