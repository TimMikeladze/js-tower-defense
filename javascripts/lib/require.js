var Require = function () {

};

Require.files = [];

Require.getBasePath = function () {
	return Require.basePath;
};

Require.setBasePath = function (path) {
	Require.basePath = path;
};

Require.add = function (path, files) {
	files.forEach(function (file) {
		var url = Require.getBasePath() + "/" + path + "/" + file + ".js";
		Require.files.push(url);
	});
};

Require.getLibraryPath = function () {
	return Require.libraryPath;
};

Require.setLibraryPath = function (path) {
	Require.libraryPath = path;
};

Require.addLibrary = function (path, files) {
	files.forEach(function (file) {
		var url = Require.getLibraryPath() + "/" + path + "/" + file + ".js";
		Require.files.push(url);
	});
};

Require.load = function (file, callback) {
	callback = callback ||
		function () {
		};
	var filenode;

	filenode = document.createElement('script');
	filenode.src = file;
	filenode.onreadystatechange = function () {
		if (filenode.readyState === 'loaded' || filenode.readyState === 'complete') {
			filenode.onreadystatechange = null;
			callback();
		}
	};
	filenode.onload = function () {
		callback();
	};
	document.head.appendChild(filenode);
};

Require.loadFiles = function () {
	var index = 0;
	return function (callback) {
		index++;
		Require.load(Require.files[index - 1], callBackCounter);

		function callBackCounter() {
			if (index === Require.files.length) {
				index = 0;
				callback();
			} else {
				Require.loadFiles(callback);
			}
		};
	};
}();