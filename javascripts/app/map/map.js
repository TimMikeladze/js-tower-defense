//var Map = function (canvas) {
	/*
	this.canvas = canvas;

	this.scale = 30;

	this.tileWidth = this.canvas.width / this.scale;
	this.tileHeight = this.canvas.height / this.scale;

	this.tiles = [];

	this.controlPoints = [];
	this.path = [];
	*/

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

loadJSON('assets/maps/map1.json',
        function(data) { 
			
			for (var i = 0; i < data.length; i++) {
				var record = data[i];
				console.log(record.x + ", " + record.y);
			}
			
			//console.log(data); 
		},
        function(xhr) { console.error(xhr); }
);