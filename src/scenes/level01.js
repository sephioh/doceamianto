Crafty.scene("level01", function() {
	
	var scene = this;
	
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
		.bind('TweenEnd', function initial_fade_in() {
			this.unbind('TweenEnd', initial_fade_in)
			    .rgb({ r:255, g:255, b:255 })
			    .attr({ z:0, alpha:1.0 });
			scene.bind('EnterFrame', scene.backgroundChange);
		});
	
	//Crafty.viewport.scale(3);
	//Crafty.viewport.zoom(1/3,Crafty.viewport.x/2,Crafty.viewport.y/2,50);
	//Crafty.viewport.zoom(1/3,sc.player.attributes.entity._x,sc.player.attributes.entity._y,50);
	
	//<hearts' loop> 
	this.heartComing = function() {
		// 80% chance of creating a dark heart
		if(Crafty.math.randomInt(1,100)<=80) {
			sc.hearts.push(new DarkHeart());
		} else {
			sc.hearts.push(new RedHeart());
		}
	}
	
	sc.delays.delay(this.heartComing,750,-1);
	//</hearts' loop>
	
	//<change background color>
	var i = 0,
		yellow = { r: 255, g: 226, b: 78 },
		pink = { r: 255, g: 77, b: 153 },
		violet = { r: 128, g: 16, b: 216 },
		green = { r: 117, g: 232, b: 7 };
	
	this.backgroundChange = function() {
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
	}
	//</change background color>
	
	sc.delimiters = [
		Crafty.e("Delimiter").attr({ x: 0, y: 242, w: 1, h: 400 }), 
		Crafty.e("Delimiter").attr({ x: 800, y: 242, w: 1, h: 400 })
	    ];
	
	//	Event declarations

	// Amianto get max number of RedHearts
	this.muchLove = function() {
		
		var time = 60;								// time in frames, duration of tweening effects
		
		Crafty.audio.stop();
		Crafty.audio.play("fall01", 1);
		
		sc.delays.destroy();							// destroy delays
		sc.delays = undefined;							// reset delays
		sc['delays'] = Crafty.e("Delay");					// reset delays
		Crafty.unbind('EnterFrame', Crafty.backgroundChange); 			// stop backgroundChange loop
		
		sc.delimiters[0].destroy();						// destroy delimiter
		sc.delimiters[1].destroy();						// destroy delimiter
		_.each(sc.hearts, function(heart){					// destroy all hearts
			heart.remove();
		});
		sc.bckgrndFade.stopTweeningColor();					// stop tweening color
		sc.bckgrndFade.tweenColor({ r: 0, g: 0, b: 0 }, time); 			// tween black
		sc.bckgrndGradient.tween({ alpha: 0.0 }, time); 			// tween black
		
		sc.delays.delay(function() {						// after half sec,
			sc.player.stumble(); 						// make amianto stumble, and then fall
		}, 500);
		
		sc['spcParticles'] = []; 						// space particles' container
		
		sc.delays.delay(function() { 						// each half sec,
			var partAmount = 6,						// create 6 particles 
				i=0;
			while(i<partAmount) {
				particle = Crafty.e("Particle, spaceParticle");
				particle.attr({ x: Crafty.math.randomInt(1,795), y: Crafty.viewport.height, 
				    h: Crafty.math.randomInt(1,5)+3, w: Crafty.math.randomInt(1,5)+3, alpha: 1.0, z: 1 })
				  .color("rgb(80,80,80)")		// dark grey
				  .interpolation({ y:0, alpha:0.0 }, 150); 
				i++;
				sc.spcParticles.push(particle);
			}		  
		}, 500, -1);
		
		sc.delays.delay(function() {												// after 10.5 sec,
			sc.player.getEntity().animate("AmiantoHittingTheGround");	// Amianto hits the ground
			sc.delays.destroy();						//destroy delays
			sc.delays = undefined;						// reset delays
			sc['delays'] = Crafty.e("Delay");				// reset delays
			Crafty("spaceParticle").each(function(){ this.destroy(); }); 	// destroy all particles
			Crafty.background("#000000"); 					// set background to black
			sc.bckgrndFade.attr({ alpha: 0.0, z:1000 }); // make bckgrndFade transparent and put it above other entities
			Crafty.trigger('LevelTransition');
		}, 10500);
		
	};
	
	this.one('TooMuchLove', this.muchLove);
	
	this.loadLevel02 = function() { // load level02
	
		sc.delays.delay(function() { 
			sc.bckgrndFade
				.tween({ alpha: 1.0 }, 20) // tween bckgrndFade making it cover everything
				.bind("TweenEnd", function() {
					// run level02 scene
					Crafty.runScene("level02", { backgroundColor: "#000000", ellipsisColor:"#FFFFFF" });
				});	
		}, 5000);
		
	}; 
	
	this.one('LevelTransition', this.loadLevel02);
	
}, function() { 											// executed after scene() is called within the present scene
	//Crafty.heartComing = undefined;							// clear level functions held in Crafty obj
	//Crafty.backgroundChange = undefined;					// clear level functions held in Crafty obj
	resources.removeAudio("level01");
	sc.delays.destroy();									// destroy delays
});