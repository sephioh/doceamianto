Crafty.scene("level01", function() {
	
	var functions = gameContainer.scene.functions;
	
	Crafty.background("#FFFFFF");
	// Play theme
	Crafty.audio.play("theme01", -1, 0.3);
			
	sc['player'] = new Amianto01(),
	sc['hearts'] = [],
	sc['delimiters'] = [],
	sc['delays'] = Crafty.e("Delay"),
	sc['bckgrndFade'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Tween, TweenColor")
	    .attr({ x: 0, y: 0, w: 800, h: 600, z: 1000, alpha: 1.0 }),
	sc['bckgrndGradient'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Sprite, Tween, gradient")
	    .attr({ x: 0, y: 0, w: 800, h: 600, z: 1, alpha: 1.0 });
	
	sc.player.startMoving();
	
	sc.bckgrndFade
		.rgb({ r:0, g:0, b:0 })
		.tween({ alpha:0.0 }, 90)
		.one('TweenEnd', function() {
			this.rgb({ r:255, g:255, b:255 })
			    .attr({ z:0, alpha:1.0 });
			Crafty.bind('EnterFrame', functions.backgroundChange);
		});

	// Instantiate hearts
	functions.heartComing = function() {
		// 80% chance of creating a dark heart
		if(Crafty.math.randomInt(1,100)<=80) {
			sc.hearts.push(new Heart({ heartColor:"dark" }));
		} else {
			sc.hearts.push(new Heart({ heartColor:"red" }));
		}
	};

	var i = 0,
	    yellow = { r: 255, g: 226, b: 78 },
	    pink = { r: 255, g: 77, b: 153 },
	    violet = { r: 128, g: 16, b: 216 },
	    green = { r: 117, g: 232, b: 7 };

	// Change background color
	functions.backgroundChange = function() {
		
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
	};

	functions.createParticles = function() { 						// each half sec,
		var partAmount = 6,						// create 6 particles 
		    i=0,
		    particle;
		while(i<partAmount) {
			particle = Crafty.e("Particle");
			particle.attr({ x: Crafty.math.randomInt(1,795), y: Crafty.viewport.height, 
			    h: Crafty.math.randomInt(1,5)+3, w: Crafty.math.randomInt(1,5)+3, alpha: 1.0, z: 1 })
			  .color("rgb(80,80,80)")		// dark grey
			  .interpolation({ y:0, alpha:0.0 }, 2000); 
			i++;
			sc.spcParticles.push(particle);
		}
	};

	sc.delimiters = [
		Crafty.e("Delimiter").attr({ x: 0, y: 242, w: 1, h: 400 }), 
		Crafty.e("Delimiter").attr({ x: 800, y: 242, w: 1, h: 400 })
	    ];
    
	sc.delays.delay(functions.heartComing,750,-1);

	// Event declarations

	// Amianto get max number of RedHearts
	this.one('TooMuchLove', function() {
		
		var time = 60;								// time in frames, duration of tweening effects
		
		Crafty.audio.stop();
		Crafty.audio.play("fall01", 1);
		sc.delays.cancelDelay(functions.heartComing);
		Crafty.unbind('EnterFrame', functions.backgroundChange); 			// stop backgroundChange loop
		
		sc.delimiters[0].destroy();						// destroy delimiter
		sc.delimiters[1].destroy();						// destroy delimiter
		_.each(sc.hearts, function(heart){					// destroy all hearts
			heart.remove();
		});
		sc.bckgrndFade.stopTweeningColor();					// stop tweening color
		sc.bckgrndFade.tweenColor({ r: 0, g: 0, b: 0 }, time); 			// tween black
		sc.bckgrndGradient.tween({ alpha: 0.0 }, time); 			// tween black
		
		// events until level02
		sc.delays.delay(function() {						// after half sec,
			sc.player.stumble(); 						// make amianto stumble, and then fall
		}, 500, 0, function(){
		  	sc['spcParticles'] = []; 						// space particles' container
			this.delay(functions.createParticles, 500, -1)
			    .delay(function() {
				sc.player.getEntity().animate("AmiantoHittingTheGround", 1);	// Amianto hits the ground
				this.cancelDelay(functions.createParticles);
				Crafty("Particle").each(function(){ this.destroy(); }); 	// destroy all particles
				Crafty.background("#000000"); 					// set background to black
				sc.bckgrndFade.attr({ alpha: 0.0, z:1000 }); // make bckgrndFade transparent and put it above other entities
			    }, 10500, 0, function() { 
				this.delay(function() { 
					sc.bckgrndFade
						.tween({ alpha: 1.0 }, 1000) // tween bckgrndFade making it cover everything
						.one("TweenEnd", function() {
							// run level02 scene
							gameContainer.runScene("level02", { backgroundColor: "#000000", ellipsisColor:"#FFFFFF" });
						});
				}, 5000, 0);
			    });
		});
	});
	
}, function() { 											// executed after scene() is called within the present scene
	resources.removeAudio("level01");
	sc.delays.destroy();									// destroy delays
});