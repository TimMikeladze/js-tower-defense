var HighScores = function() {

};

HighScores.showHighScores = function(limit) {
	var limit = limit ? "?limit=" + limit : "";

	ajax.get("http://71.19.151.5/highscores/get_highscores.php" + limit, function (response) {
		var json = JSON.parse(response);

		for(var i = 0; i < json.length; i++) {
			var obj = json[i];
			var tableRef = document.getElementById('scoreTable').getElementsByTagName('tbody')[0];

			// Insert a row in the table at row index 0
			var newRow   = tableRef.insertRow(tableRef.rows.length);

			// Insert a cell in the row at index 0
			var newCell  = newRow.insertCell(0);
			var newCell2 = newRow.insertCell(1);

			// Append a text node to the cell
			var newText  = document.createTextNode(obj.Name);
			var newText2 = document.createTextNode(obj.Score);
			newCell.appendChild(newText);
			newCell2.appendChild(newText2);
		}

	});
};