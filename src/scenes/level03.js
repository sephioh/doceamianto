Crafty.scene("level03", function() {
	// Clear scene elements
	sc =[];

	var scene = this;
	// Set scene background 	
    Crafty.e("2D, Canvas, Image").image('web/images/level03-background.png');
	
	// Add initial elements to scene
	sc['player'] = new Amianto03();
	sc['delays'] = Crafty.e("Delay");
	sc['delimiters'] = [];
	sc['wordblocks'] = [];

	// Scenario delimiters
	var delimitersMap = {
		left: 	{ x: 0,   y: 0, w: 1, h: 600, shape: [[0,0],[1,0],[1,600],[0,600]]},
		right: 	{ x: 800, y: 0, w: 1, h: 600, shape: [[799,0],[800,0],[800,600],[799,600]]},
		up: 	{ x: 0,   y: 0, w: 800, h: 1, shape: [[0,0],[0,1],[800,1],[800,0]]},
		down: 	{ x: 0,   y: 600, w: 800, h: 1, shape: [[0,599],[0,600],[800,600],[800,599]]},
	};
	_.each(delimitersMap, function(obj) {
		var delimiter = Crafty.e("2D, Collision, wall")
			.attr({x: obj.x, y: obj.y, w: obj.w, h: obj.h});
		sc.delimiters.push(delimiter);
	});
	
	var txts = JSON.parse(gameContainer.loadedStrings[0]);

	// Word blocks
	sc.wordblocks = [
		new Wordblock({ initialX: 166, initialY: 155, initialZ: 1, initialH: 15, initialW: 76,  full_text: txts.text01 }),
		new Wordblock({ initialX: 266, initialY: 155, initialZ: 1, initialH: 15, initialW: 177, full_text: txts.text02 }),
		new Wordblock({ initialX: 466, initialY: 155, initialZ: 1, initialH: 15, initialW: 85,  full_text: txts.text03 }),
		new Wordblock({ initialX: 566, initialY: 155, initialZ: 1, initialH: 15, initialW: 75,  full_text: txts.text04 }),
		new Wordblock({ initialX: 466, initialY: 455, initialZ: 1, initialH: 15, initialW: 138, full_text: txts.text05 }),
		new Wordblock({ initialX: 166, initialY: 255, initialZ: 1, initialH: 15, initialW: 85,  full_text: txts.text06 }),
		new Wordblock({ initialX: 366, initialY: 355, initialZ: 1, initialH: 15, initialW: 115, full_text: txts.text07 })
	];

	// Wordplaceholders
	sc.wordplaceholders = [
		new Wordplaceholder({ initialX: 166, initialY: 155 }),
		new Wordplaceholder({ initialX: 234, initialY: 241 }),
		new Wordplaceholder({ initialX: 245, initialY: 335 }),
		new Wordplaceholder({ initialX: 393, initialY: 155 }),
		new Wordplaceholder({ initialX: 410, initialY: 447 }),
		new Wordplaceholder({ initialX: 554, initialY: 241 }),
		new Wordplaceholder({ initialX: 644, initialY: 155 }),
		new Wordplaceholder({ initialX: 614, initialY: 335 })
	];


	sc.wordblocks[6].getEntity().addComponent("Mouse").bind("Click",function(){ 
	
		var glitchEffect = new GlitchEffect(),
		    stage = document.getElementById("cr-stage"),
		    canvases = document.getElementsByTagName("canvas"),
		    canvas1 = canvases[0],
		    glitchOptions = { amount: 10, seed: 45, iterations: 30, quality: 30 };
		var canvas2 = canvases.length > 1 ? canvases[1] : document.createElement("canvas");
		
		if(canvases.length === 1) {
			canvas2.style.zIndex = 2,
			canvas2.style.position = "absolute",
			canvas2.width = Crafty.viewport.width,
			canvas2.height = Crafty.viewport.height,
			canvas1.style.zIndex = 1,
			canvas1.style.position = "absolute";
			stage.appendChild(canvas2);
		}
		
		sc.delays.delay(function(){
			glitchEffect.glitchScreen(canvas1,canvas2,glitchOptions);
			glitchOptions.amount += 5;
		}, 250, 5);
		
	});
	
}, function() {	// executed after scene() is called within the present scene
});