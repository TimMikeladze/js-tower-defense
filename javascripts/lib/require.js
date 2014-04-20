var Require = function () {

};

Require.files = [];
Require.images = {};

Require.getBasePath = function () {
	return Require.basePath;
};

Require.setBasePath = function (path) {
	Require.basePath = path;
};

Require.getLibraryPath = function () {
	return Require.libraryPath;
};

Require.setLibraryPath = function (path) {
	Require.libraryPath = path;
};

Require.getImagesPath = function () {
	return Require.imagesPath;
};

Require.setImagesPath = function (path) {
	Require.imagesPath = path;
};

Require.getImage = function(path) {
	return Require.images[path];
}

Require.addScript = function (path, files) {
	files.forEach(function (file) {
		var url = Require.getBasePath() + "/" + path + "/" + file + ".js";
		Require.files.push({type: "script", url: url});
	});
};

Require.addLibrary = function (path, files) {
	files.forEach(function (file) {
		var url = Require.getLibraryPath() + "/" + path + "/" + file + ".js";
		Require.files.push({type: "script", url: url});
	});
};

Require.addImage = function(path, files) {
	files.forEach(function (file) {
		var url = Require.getImagesPath() + "/" + path + "/" + file;
		Require.files.push({type: "image", url: url});
	});
};

Require.loadFiles = function (file, callback) {
	callback = callback ||
		function () {
		};

	switch (file.type) {
		case "script":
			var filenode;

			filenode = document.createElement('script');
			filenode.src = file.url;
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
			break;
		case "image":
			var img = new Image();
			img.addEventListener("load", function () {
				callback();
			});
			img.addEventListener("error", function () {
				callback();
			});
			img.src = file.url;
			var path = file.url.split("/").slice(-2).join("/");
			Require.images[path] = img;
			break;
		default:
			break;
	}

};

Require.load = function () {
	var index = 0;
	return function (callback) {
		index++;
		Require.loadFiles(Require.files[index - 1], callBackCounter);

		function callBackCounter() {
			if (index === Require.files.length) {
				index = 0;
				callback();
			} else {
				Require.load(callback);
			}
		};
	};
}();