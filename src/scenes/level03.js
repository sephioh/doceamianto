Crafty.scene("level03", function() {
	// Clear scene elements
	sc =[];

	var scene = this;
	// Set scene background 	
	
	// Add initial elements to scene
	sc['player'] = new Amianto03(),
	sc['delays'] = Crafty.e("Delay"),
	sc['background'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Sprite, background03"),
	sc['ornament'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Sprite, ornament03"),
	sc['delimiters'] = [],
	sc['corners'] = [],
	sc['wordblocks'] = [];

	sc.ornament.x = (Crafty.viewport.width/2) - (sc.ornament._w/2);
	
	// Scenario delimiters
	sc.delimiters = [
		Crafty.e("Delimiter, wall").attr({ x: 0, y: 0, w: 1, h: 600 }),
		Crafty.e("Delimiter, wall").attr({ x: 800, y: 0, w: 1, h: 600 }),
		Crafty.e("Delimiter, wall").attr({ x: 0, y: 0, w: 800, h: 1 }),
		Crafty.e("Delimiter, wall").attr({ x: 0, y: 600, w: 800, h: 1 })
	];
 
	// Scenario corners
	sc.corners = [
		Crafty.e("Delimiter, Canvas, blocker, Sprite, cornerUpLeft").attr({ x: -10, y: -10, w: 20, h: 20 }),
		Crafty.e("Delimiter, Canvas, blocker, Sprite, cornerUpRight").attr({ x: -10, y: 590, w: 20, h: 20 }),
		Crafty.e("Delimiter, Canvas, blocker, Sprite, cornerDownLeft").attr({ x: 790, y: -10, w: 20, h: 20 }),
		Crafty.e("Delimiter, Canvas, blocker, Sprite, cornerDownRight").attr({ x: 790, y: 590, w: 20, h: 20 })
	];
	
	var txts = JSON.parse(gameContainer.getSceneTexts()[0]),
	    txtSize = 55;

	// Word blocks
	sc.wordblocks = [
		new Wordblock({ initialX: 400, initialY: 175, initialZ: 0, initialH: txtSize, initialW: txts.text01.length*txtSize, full_text: txts.text01, text_size: txtSize }),
		new Wordblock({ initialX: 180, initialY: 355, initialZ: 0, initialH: txtSize, initialW: txts.text02.length*txtSize, full_text: txts.text02, text_size: txtSize }),
		new Wordblock({ initialX: 466, initialY: 117, initialZ: 0, initialH: txtSize, initialW: txts.text03.length*txtSize, full_text: txts.text03, text_size: txtSize }),
		new Wordblock({ initialX:  86, initialY: 117, initialZ: 0, initialH: txtSize, initialW: txts.text04.length*txtSize, full_text: txts.text04, text_size: txtSize }),
		new Wordblock({ initialX: 486, initialY: 424, initialZ: 0, initialH: txtSize, initialW: txts.text05.length*txtSize, full_text: txts.text05, text_size: txtSize }),
		new Wordblock({ initialX: 100, initialY: 300, initialZ: 0, initialH: txtSize, initialW: txts.text06.length*txtSize, full_text: txts.text06, text_size: txtSize }),
		new Wordblock({ initialX: 50, initialY: 519, initialZ: 0, initialH: txtSize, initialW: txts.text07.length*txtSize, full_text: txts.text07, text_size: txtSize })
		//new Wordblock({ initialX: 266, initialY: 275, initialZ: 0, initialH: txtSize, initialW: txts.text08.length*txtSize, full_text: txts.text08, text_size: txtSize })
	];

	// Wordplaceholders
	sc.wordplaceholders = [
		new Wordplaceholder({ initialX: 164, initialY: 153, full_text: txts.text01 }),
		new Wordplaceholder({ initialX: 512, initialY: 153, full_text: txts.text02 }),
		new Wordplaceholder({ initialX: 208, initialY: 202, full_text: txts.text03 }),
		new Wordplaceholder({ initialX: 483, initialY: 202, full_text: txts.text04 }),
		new Wordplaceholder({ initialX: 204, initialY: 293, full_text: txts.text05 }),
		new Wordplaceholder({ initialX: 492, initialY: 293, full_text: txts.text06 }),
		new Wordplaceholder({ initialX: 360, initialY: 400, full_text: txts.text07 })
		//new Wordplaceholder({ initialX: 410, initialY: 447, full_text: txts.text08 })
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