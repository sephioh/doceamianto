Crafty.scene("level03", function() {
	// Clear scene elements
	sc =[];

	// Set scene background 	
    Crafty.background("url('web/images/level03-background.png')");
	
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
	
	var txts = gameContainer.langStrings;
	// Word blocks
	
	sc.wordkblocks = [
		new Wordblock({ initialX: 166, initialY: 155, initialZ: 1, initialH: 15, initialW: 83,  full_text: txts.text01 }),
		new Wordblock({ initialX: 266, initialY: 155, initialZ: 1, initialH: 15, initialW: 177, full_text: txts.text02 }),
		new Wordblock({ initialX: 466, initialY: 155, initialZ: 1, initialH: 15, initialW: 85,  full_text: txts.text03 }),
		new Wordblock({ initialX: 566, initialY: 155, initialZ: 1, initialH: 15, initialW: 75,  full_text: txts.text04 }),
		new Wordblock({ initialX: 466, initialY: 455, initialZ: 1, initialH: 15, initialW: 138, full_text: txts.text05 }),
		new Wordblock({ initialX: 166, initialY: 255, initialZ: 1, initialH: 15, initialW: 85,  full_text: txts.text06 }),
		new Wordblock({ initialX: 366, initialY: 355, initialZ: 1, initialH: 15, initialW: 115, full_text: txts.text07 })
	];
	
}, function() {	// executed after scene() is called within the present scene
});