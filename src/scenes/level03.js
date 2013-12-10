Crafty.scene("level03", function() {
	// Clear scene elements
	sc =[];

	var scene = this;
	// Set scene background 	
	
	// Add initial elements to scene
	sc['player'] = new Amianto03(),
	sc['delays'] = Crafty.e("Delay"),
	sc['background'] = Crafty.e("2D, Canvas, Sprite, background03"),
	sc['ornament'] = Crafty.e("2D, Canvas, Sprite, ornament03"),
	sc['delimiters'] = [],
	sc['blockers'] = [],
	sc['wordblocks'] = [];

	sc.ornament.x = (Crafty.viewport.width/2) - (sc.ornament._w/2);
	
	// Scenario delimiters
	var delimitersMap = {
		left: 	{ x: 0,   y: 0, w: 1, h: 600, id: "left" },
		right: 	{ x: 800, y: 0, w: 1, h: 600, id: "right" },
		up: 	{ x: 0,   y: 0, w: 800, h: 1, id: "up" },
		down: 	{ x: 0,   y: 600, w: 800, h: 1, id: "down" }
	};
	_.each(delimitersMap, function(obj) {
		var delimiter = Crafty.e("2D, Collision, wall")
			.attr({x: obj.x, y: obj.y, w: obj.w, h: obj.h, id: obj.id });
		sc.delimiters.push(delimiter);
	});
 
	// Scenario blockers
	var blockers = {
		left_up: 	{ x: -10, y: -10, w: 20, h: 20 },
		left_down: 	{ x: -10, y: 590, w: 20, h: 20 },
		right_up: 	{ x: 790, y: -10, w: 20, h: 20 },
		right_down: 	{ x: 790, y: 590, w: 20, h: 20 }

	};
	_.each(blockers, function(obj) {
		var blocker = Crafty.e("2D, Collision, blocker, WiredHitBox")
			.attr({ x: obj.x, y: obj.y, w: obj.w, h: obj.h });
		sc.blockers.push(blocker);
	});
	
	var txts = JSON.parse(gameContainer.loadedStrings[0]),
	     txtSize = 55;

	// Word blocks
	
	sc.wordblocks = [
		new Wordblock({ initialX: 400, initialY: 155, initialZ: 0, initialH: txtSize, initialW: txts.text01.length*txtSize, full_text: txts.text01, text_size: txtSize }),
		new Wordblock({ initialX: 180, initialY: 355, initialZ: 0, initialH: txtSize, initialW: txts.text02.length*txtSize, full_text: txts.text02, text_size: txtSize }),
		new Wordblock({ initialX: 466, initialY: 117, initialZ: 0, initialH: txtSize, initialW: txts.text03.length*txtSize, full_text: txts.text03, text_size: txtSize }),
		new Wordblock({ initialX: 236, initialY: 617, initialZ: 0, initialH: txtSize, initialW: txts.text04.length*txtSize, full_text: txts.text04, text_size: txtSize }),
		new Wordblock({ initialX: 486, initialY: 424, initialZ: 0, initialH: txtSize, initialW: txts.text05.length*txtSize, full_text: txts.text05, text_size: txtSize }),
		new Wordblock({ initialX: 366, initialY: 335, initialZ: 0, initialH: txtSize, initialW: txts.text06.length*txtSize, full_text: txts.text06, text_size: txtSize }),
		new Wordblock({ initialX: 166, initialY: 399, initialZ: 0, initialH: txtSize, initialW: txts.text07.length*txtSize, full_text: txts.text07, text_size: txtSize }),
		new Wordblock({ initialX: 266, initialY: 275, initialZ: 0, initialH: txtSize, initialW: txts.text08.length*txtSize, full_text: txts.text08, text_size: txtSize })
	];

	// Wordplaceholders
	sc.wordplaceholders = [
		new Wordplaceholder({ initialX: 166, initialY: 155, full_text: txts.text01 }),
		new Wordplaceholder({ initialX: 393, initialY: 155, full_text: txts.text02 }),
		new Wordplaceholder({ initialX: 644, initialY: 155, full_text: txts.text03 }),
		new Wordplaceholder({ initialX: 234, initialY: 241, full_text: txts.text04 }),
		new Wordplaceholder({ initialX: 554, initialY: 241, full_text: txts.text05 }),
		new Wordplaceholder({ initialX: 245, initialY: 335, full_text: txts.text06 }),
		new Wordplaceholder({ initialX: 614, initialY: 335, full_text: txts.text07 }),
		new Wordplaceholder({ initialX: 410, initialY: 447, full_text: txts.text08 }),
	];
	
	// declaring events

	this.glitch_effect = function(){ 
	
		var glitchEffect = new GlitchEffect(),
		    stage = document.getElementById("cr-stage"),
		    canvases = document.getElementsByTagName("canvas"),
		    canvas1 = canvases[0],
		    glitchOptions = { amount: 10, seed: 15, iterations: 3, quality: 30 },
		    canvas2 = canvases.length > 1 ? canvases[1] : document.createElement("canvas");
		
		sc.player.getEntity().disableControl().pauseAnimation();
		    
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
			glitchOptions.iterations += 2;
			//glitchOptions.seed += 5;
		}, 250, 5);
		
	}
	
	this.one("Tilt", this.glitch_effect);
	
}, function() {	// executed after scene() is called within the present scene
});