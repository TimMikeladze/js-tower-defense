var ajax = {
	get: function (url, callback) {
		var req = (typeof(window.ActiveXObject) === 'undefined') ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		if (callback !== undefined) {
			req.onreadystatechange = function () {
				if (req.readyState !== 4 || req.status !== 200) {
					return;
				}
				callback(req.responseText);
			};
		}
		req.open("GET", url, true);
		req.send(null);
	},
	post: function (url, data, callback) {
		var req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		var params = ajax.serialize(data);
		if (callback !== undefined) {
			req.onreadystatechange = function () {
				if (req.readyState !== 4 || req.status !== 200) {
					return;
				}
				callback(req.responseText);
			};
		}
		req.open('POST', url, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send(params);
	},
	serialize: function (data) {
		var query = '';
		for (var key in data) {
			query += key + '=' + encodeURIComponent(data[key]) + '&';
		}
		return query.substr(0, query.length - 1);
	}
};