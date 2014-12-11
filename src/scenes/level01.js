Crafty.scene("level01", function() {
	var i = 0,
	    yellow = { r: 255, g: 226, b: 78 },
	    pink = { r: 255, g: 77, b: 153 },
	    violet = { r: 128, g: 16, b: 216 },
	    green = { r: 117, g: 232, b: 7 },
	    heartComing = function() {
		// 80% chance of creating a dark heart
		if(Crafty.math.randomInt(1,100)<=80) {
			sc.hearts.push(new Heart({ heartColor:"dark" }));
		} else {
			sc.hearts.push(new Heart({ heartColor:"red" }));
		}
	    },
	    backgroundChange = function() {
		if(!sc.bckgrndFade.isTweeningColor()) {
			switch(i) {
				case 0: 
					sc.bckgrndFade.tweenColor(yellow, 255);
					break;
				case 1: 
					sc.bckgrndFade.tweenColor(pink, 255);
					break;
				case 2: 
					sc.bckgrndFade.tweenColor(violet, 255);
					break;
				case 3: 
					sc.bckgrndFade.tweenColor(green, 255);
					break;
			}
			if(++i > 3) 
				i = 0; 
		}
	    },
	    createParticles = function() { 						// each half sec,
		var partAmount = 6,						// create 6 particles 
		    j=0,
		    particle;
		while(j<partAmount) {
			++j;
			particle = Crafty.e("Particle");
			particle.attr({ x: Crafty.math.randomInt(1,795), y: Crafty.viewport.height, 
			    h: Crafty.math.randomInt(1,5)+3, w: Crafty.math.randomInt(1,5)+3, alpha: 1.0, z: 1 })
			  .color("rgb(80,80,80)")		// dark grey
			  .interpolation({ y:0, alpha:0.0 }, 2000);
			sc.spcParticles.push(particle);
		}
	    };
	
	// Play theme
	Crafty.audio.play("theme01", -1, 0.1, 63.2);
			
	sc.player = new Amianto01(),
	sc.hearts = [],
	sc.delimiters = [],
	sc.delays = Crafty.e("Delay"),
	sc.bckgrndFade = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Tween, TweenColor")
	    .attr({ x: 0, y: 0, w: 800, h: 600, z: 1000, alpha: 1.0 }),
	sc.bckgrndGradient = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Sprite, Tween, gradient01")
	    .attr({ x: 0, y: 0, w: 800, h: 600, z: 1, alpha: 1.0 });
	
	sc.player.startMoving();
	
	sc.bckgrndFade
		.rgb({ r:0, g:0, b:0 })
		.tween({ alpha:0.0 }, 1500)
		.one('TweenEnd', function() {
			this.rgb({ r:255, g:255, b:255 })
			    .attr({ z:0, alpha:1.0 });
			Crafty.bind('EnterFrame', backgroundChange);
		});

	sc.delimiters = [
		Crafty.e("Delimiter").attr({ x: 50, y: 242, w: 1, h: 400 }), 
		Crafty.e("Delimiter").attr({ x: 750, y: 242, w: 1, h: 400 })
	    ];
    
	sc.delays.delay(heartComing,750,-1);
	
	Crafty.background("#FFFFFF");
	utils.setViewportBounds(sc.player.getEntity());

	// Event declarations

	// Amianto get max number of RedHearts
	this.one('TooMuchLove', function() {
		Crafty.audio.stop("theme01");
		sc.delays.cancelDelay(heartComing);
		_.each(sc.hearts, function(heart){					// destroy all hearts
			heart.remove();
		});
		Crafty.audio.play("fall", 1);
		Crafty.unbind('EnterFrame', backgroundChange); 				// stop backgroundChange loop
		sc.delimiters[0].destroy();						// destroy delimiter
		sc.delimiters[1].destroy();						// destroy delimiter
		sc.bckgrndFade.stopTweeningColor();					// stop tweening color
		sc.bckgrndFade.tweenColor({ r: 0, g: 0, b: 0 }, 90); 			// tween black
		sc.bckgrndGradient.tween({ alpha: 0.0 }, 1000); 			// tween black
		
		// events until level02
		sc.delays.delay(function() {						// after half sec,
			sc.player.stumble(); 						// make amianto stumble, and then fall
		}, 500, 0, function() {
		  	sc.spcParticles = []; 						// space particles' container
			this.delay(createParticles, 500, -1)
			    .delay(function() {
				sc.player.getEntity().animate("AmiantoHittingTheGround", 1);	// Amianto hits the ground
				this.cancelDelay(createParticles);
				Crafty("Particle").each(function(){ this.destroy(); }); 	// destroy all particles
				Crafty.background("#000000"); 					// set background to black
				sc.bckgrndFade.attr({ alpha: 0.0, z:1000 }); // make bckgrndFade transparent and put it above other entities
			    }, 10700, 0, function() {
				this.delay(function() { 
					sc.bckgrndFade
						.tween({ alpha: 1.0 }, 1000) // tween bckgrndFade making it cover everything
						.one("TweenEnd", function() {
							// run level02 scene
							gameContainer.runScene("level02", { backgroundColor: "#000000", entsColor:"#C0C0C0" });
						});
				}, 5000, 0);
			    });
		});
	});
	
}, function() { 				// executed after scene() is called within the present scene
	sc.delays.destroy();	// destroy delays
	var l = "level01";
	Crafty.removeAssets(resources.get(l));
	gameContainer.removeSceneTexts(l);
});