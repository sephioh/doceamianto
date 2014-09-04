Crafty.scene("level03", function() {
	
	Crafty.audio.play("theme03", -1);
	
	// Add initial elements to scene
	sc.player = new Amianto03(),
	sc.delays = Crafty.e("Delay"),
	sc.background = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Image")
	    .image("web/images/level03-background.png"),
	sc.ornament = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Image")
	    .image("web/images/level03-ornament.png"),
	sc.delimiters = [],
	sc.corners = [],
	sc.wordblocks = [];

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
		Crafty.e("Delimiter, Canvas, blocker, cornerUpLeft").attr({ x: -10, y: -10, w: 20, h: 20 }),
		Crafty.e("Delimiter, Canvas, blocker, cornerUpRight").attr({ x: -10, y: 590, w: 20, h: 20 }),
		Crafty.e("Delimiter, Canvas, blocker, cornerDownLeft").attr({ x: 790, y: -10, w: 20, h: 20 }),
		Crafty.e("Delimiter, Canvas, blocker, cornerDownRight").attr({ x: 790, y: 590, w: 20, h: 20 })
	];
	
	var txts = JSON.parse(gameContainer.getSceneTexts()[0]),
	    txtSize = 55;

	// Word blocks
	sc.wordblocks = [
		new Wordblock({ initialX: 400, initialY: 175, initialZ: 0, initialH: txtSize, initialW: txts.text01.length*txtSize, word_text: txts.text01, text_size: txtSize }),
		new Wordblock({ initialX: 180, initialY: 355, initialZ: 0, initialH: txtSize, initialW: txts.text02.length*txtSize, word_text: txts.text02, text_size: txtSize }),
		new Wordblock({ initialX: 466, initialY: 117, initialZ: 0, initialH: txtSize, initialW: txts.text03.length*txtSize, word_text: txts.text03, text_size: txtSize }),
		new Wordblock({ initialX: 86, initialY: 117, initialZ: 0, initialH: txtSize, initialW: txts.text04.length*txtSize, word_text: txts.text04, text_size: txtSize }),
		new Wordblock({ initialX: 486, initialY: 424, initialZ: 0, initialH: txtSize, initialW: txts.text05.length*txtSize, word_text: txts.text05, text_size: txtSize }),
		new Wordblock({ initialX: 100, initialY: 300, initialZ: 0, initialH: txtSize, initialW: txts.text06.length*txtSize, word_text: txts.text06, text_size: txtSize }),
		new Wordblock({ initialX: 50, initialY: 519, initialZ: 0, initialH: txtSize, initialW: txts.text07.length*txtSize, word_text: txts.text07, text_size: txtSize })
	];

	// Wordplaceholders
	sc.wordplaceholders = [
		new Wordplaceholder({ initialX: 164, initialY: 153, word_text: txts.text01 }),
		new Wordplaceholder({ initialX: 512, initialY: 153, word_text: txts.text02 }),
		new Wordplaceholder({ initialX: 208, initialY: 202, word_text: txts.text03 }),
		new Wordplaceholder({ initialX: 483, initialY: 202, word_text: txts.text04 }),
		new Wordplaceholder({ initialX: 204, initialY: 293, word_text: txts.text05 }),
		new Wordplaceholder({ initialX: 492, initialY: 293, word_text: txts.text06 }),
		new Wordplaceholder({ initialX: 360, initialY: 400, word_text: txts.text07 })
	];
	
	utils.setViewportBounds({ x:0, y:0 }, { x:800, y:600 }, sc.player.getEntity());
	
	// declaring events
	
	this.one("Tilt", function(){
	  
		Crafty.audio.stop("theme03");
		Crafty.audio.play("tilt");
	
		var glitchEffect = new GlitchEffect(),
		    canvas1 = document.getElementById("mainCanvas"),
		    canvas2 = document.getElementById("glitchedCanvas"),
		    glitchOptions = { amount: 10, seed: 15, iterations: 3, quality: 30 };
		
		sc.player.getEntity().disableControl().pauseAnimation();
		    
		if(!canvas2){
			canvas2 = document.createElement("canvas");
			canvas2.style.zIndex = 2,
			canvas2.style.position = "absolute",
			canvas2.width = Crafty.viewport.width,
			canvas2.height = Crafty.viewport.height,
			canvas2.id = "glitchedCanvas",
			canvas1.style.zIndex = 1,
			canvas1.style.position = "absolute";
			canvas1.parentNode.appendChild(canvas2);
		}
		
		sc.delays.delay(function(){
			glitchEffect.glitchScreen(canvas1,canvas2,glitchOptions);
			glitchOptions.amount += 5;
			glitchOptions.iterations += 2;
			//glitchOptions.seed += 5;
		}, 350, 5, function(){
			this.delay(function(){ Crafty.trigger("LevelTransition") }, 300)
		});
		
	});
	
	this.one("LevelTransition", function(){
		gameContainer.runScene("level04");
	});
	
}, function() {					// executed after scene() is called within the present scene
  	utils.resetViewportBounds();
	sc.delays.destroy();	// destroy delays
	var g = document.getElementById("glitchedCanvas"),
	    l = "level03";
	g.parentNode.removeChild(g);
	Crafty.removeAssets(resources.get(l));
	gameContainer.removeSceneTexts(l);
});