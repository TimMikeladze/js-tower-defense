function draw(elem) {
	var canvas = document.getElementById(elem);
	var canvasHeight = 150;
	var canvasWidth = 540;

    	var ctx = canvas.getContext('2d');
    	addStaticText(ctx);
    	initializeValues(ctx);
    	addRect(ctx);
    	createTowerBorders(ctx);

    function addStaticText(ctx) {
    	ctx.font = "30px Verdana";
    	// Create gradient
    	var gradient = ctx.createLinearGradient(0, 0, canvasWidth, 0);
    	gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		// Fill with gradient
		ctx.fillStyle = gradient;
		// Title
		//ctx.fillText("Tims",10,35);
		ctx.fillText("Tower", 15, 60);
		ctx.fillText("Defense!", 20, 85);
		// Score, Wave, Towers Left, Gold
		ctx.font = "20px Verdana";
		ctx.fillText("Score:", 15, 120);
		ctx.fillText("Wave:", 15, 160);
		ctx.fillText("Left:", 15, 200);
		ctx.fillText("Gold:", 15, 240);
		// Towers
		ctx.fillText("Towers:", 15, 300);
		// Pause, Quit
		ctx.fillText("Pause", 14, 532);
		ctx.fillText("Quit", ((canvasWidth)/2)+10, 532);
    }

    function addRect(ctx) {
		ctx.fillStyle = "rgba(128,255,0, .5)";
	    ctx.fillRect (10, 100, canvasWidth-20, 170);

	    ctx.fillStyle = "rgba(128,255,0, .5)";
	    ctx.fillRect (10, 280, canvasWidth-20, 230);

	    ctx.fillStyle = "rgba(128,255,0, .5)";
	    ctx.fillRect (10, 515, (canvasWidth-30)/2, 20);

	    ctx.fillStyle = "rgba(128,255,0, .5)";
	    ctx.fillRect (((canvasWidth-10)/2)+10, 515, (canvasWidth-30)/2, 20);
	}

	function initializeValues(ctx) {
		ctx.font = "20px Verdana";
		// Init Score, Wave, Left, Gold
		ctx.fillText("0", 70, 140);
		ctx.fillText("0", 70, 180);
		ctx.fillText("0", 70, 220);
		ctx.fillText("0", 70, 260);
	}

	function createTowerBorders(ctx) {
		//ctx.strokeStyle = "orange";
		ctx.strokeRect(20, 310, 45, 45);
		ctx.strokeRect(20, 365, 45, 45);
		ctx.strokeRect(20, 420, 45, 45);

		ctx.strokeRect(((canvasWidth-10)/2)+10, 310, 45, 45);
		ctx.strokeRect(((canvasWidth-10)/2)+10, 365, 45, 45);
		ctx.strokeRect(((canvasWidth-10)/2)+10, 420, 45, 45);
	}
}
