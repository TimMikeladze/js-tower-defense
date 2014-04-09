function log(message, force) {
	if (DEBUG || force) {
		var caller = arguments.callee.caller.name ? arguments.callee.caller.name : "global";
		console.log(caller + ": " + message);
	}
}
