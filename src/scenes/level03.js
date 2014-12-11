Crafty.scene("level03", function() {
	Crafty.audio.play("theme03", -1, 1, 46.5);
	Crafty.background("#000000");
	
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
	
	// "limits" used to cover the character when using mobiles - actually 'tis a workaround to bad design
	sc.emptyLimits = [
		Crafty.e("2D, Canvas, Color").color("black").attr({ x: -80, y: -10, w: 80, h: 620, z: 400 }),
		Crafty.e("2D, Canvas, Color").color("black").attr({ x: 0, y: -100, w: 800, h: 100, z: 400 }),
		Crafty.e("2D, Canvas, Color").color("black").attr({ x: 800, y: -80, w: 80, h: 600, z: 400 }),
		Crafty.e("2D, Canvas, Color").color("black").attr({ x: 0, y: 600, w: 800, h: 100, z: 400 })
	];
	
	var txts = JSON.parse(gameContainer.getSceneTexts()[0]),
	    txtSize = 35;

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
	
	utils.setViewportBounds(sc.player.getEntity());
	
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
			try {
				glitchEffect.glitchScreen(canvas1,canvas2,glitchOptions);
				glitchOptions.amount += 5;
				glitchOptions.iterations += 2;
			} catch(e) {
				console.log(e);
			}
			//glitchOptions.seed += 5;
		}, 350, 5, function(){
			this.delay(function(){ Crafty.trigger("LevelTransition"); }, 3000);
		});
	});
	
	this.one("LevelTransition", function(){
		var g = document.getElementById("glitchedCanvas");
		gameContainer.runScene("level04", {
		    image: {
			src: g.toDataURL("image/png"),
			w: g.width,
			h: g.height
		    }
		});
	});
	
}, function() {					// executed after scene() is called within the present scene
  	sc.delays.destroy();	// destroy delays
	var glitched = document.getElementById("glitchedCanvas"),
	    l = "level03";
	Crafty.removeAssets(resources.get(l));
	gameContainer.removeSceneTexts(l);
	glitched.parentNode.removeChild(glitched);
});