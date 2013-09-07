Crafty.scene("level01", function() {
	
	var elements = [
        "src/entities/amianto.js",
		"src/entities/darkheart.js",
		"src/entities/redheart.js"
	];
	
	Crafty.background("#FFFFFF");
		
	//when everything is loaded, run the level01 scene
	require(elements, function() {
				
		sc['player'] = new Amianto(),
		sc['hearts'] = [],
		sc['delimiters'] = [],
		sc['delays'] = Crafty.e("Delay"),
		sc['bckgrndFade'] = Crafty.e("2D, Canvas, Tween, TweenColor").attr({ x: 0, y: 0, w: 800, h: 600, z: 0, alpha: 1.0 }),
		sc['bckgrndDegrade'] = Crafty.e("2D, Canvas, Sprite, Tween, degrade").attr({ x: 0, y: 0, w: 800, h: 600, z: 0, alpha: 1.0 });
		
		sc.player.startMoving();
		// Play theme
		Crafty.audio.play("theme01", -1);
		
		//<hearts' loop> 
		Crafty.heartComing = function() {
			// 80% chance of creating a dark heart
			if(Crafty.math.randomInt(1,100)<=80) {
				sc.hearts.push(new DarkHeart());
			} else {
				sc.hearts.push(new RedHeart());
			}
		}
		
		sc.delays.delay(Crafty.heartComing,750,-1);
		//</hearts' loop>
		
		//<change background color>
		var i = 0,
			white = { r: 255, g: 255, b: 255 },
			yellow = { r: 255, g: 226, b: 78 },
			pink = { r: 255, g: 77, b: 153 },
			violet = { r: 128, g: 16, b: 216 },
			green = { r: 117, g: 232, b: 7 };
		  
		sc.bckgrndFade.rgb(white);
		
		Crafty.backgroundChange = function() {
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
		
		Crafty.bind('EnterFrame', Crafty.backgroundChange);
		//</change background color>
		
		//<delimiters>
		var delimitersMap = {
			left: 	{ x: 0, y: 242, w: 1, h: 400, 	shape: [[0,0],[1,400]] }, 
			right: 	{ x: 800, y: 242, w: 1, h: 400, shape: [[0,0],[1,400]] }
		};
		
		_.each(delimitersMap, function(obj) {
			var delimiter = Crafty.e("2D, Collision, solid")
				.attr({x: obj.x, y: obj.y, w: obj.w, h: obj.h})
				.collision(new Crafty.polygon(obj.shape));
			sc.delimiters.push(delimiter);
		});
		//</delimiters>
		
		Crafty.settings.modify("autoPause",true);
		
	});
	
	//	Event declarations

	// Amianto get max number of RedHearts
	this.muchLove = Crafty.bind('TooMuchLove', function() {
		
		var playerEnt = sc.player.getEntity(),				// get Amianto object
			time = 60;										// time in frames to control effects
				
		sc.delays.destroy();								// destroy delays
		sc.delays = undefined;								// reset delays
		sc['delays'] = Crafty.e("Delay");					// reset delays
		Crafty.unbind('EnterFrame', Crafty.backgroundChange); // stop backgroundChange loop
		
		sc.delimiters[0].destroy();							// destroy delimiter
		sc.delimiters[1].destroy();							// destroy delimiter
		_.each(sc.hearts, function(heart){					// destroy all hearts
			heart.remove();
		});
		sc.bckgrndFade.stopTweeningColor();					// stop tweening color
		sc.bckgrndFade.tweenColor({ r: 0, g: 0, b: 0 }, time); // tween black
		sc.bckgrndDegrade.tween({ alpha: 0.0 }, time); 			// tween black
		
		sc.delays.delay(function() {							// after half sec,
			playerEnt.animate("AmiantoFalling",32,-1);		// Amianto falls
		}, 500);
		
		sc['spcParticles'] = []; 							// space particles' container
		sc.delays.delay(function() { 						// creating 6 particles each half sec
			var partAmount = 6,
				i=0;
			while(i<partAmount){
				particle = Crafty.e("2D, Canvas, Color, Tween, spaceParticle");
				particle
					.attr({ 
					  x: Crafty.math.randomInt(1,795),
					  y: Crafty.viewport.height,
					  h: Crafty.math.randomInt(1,5)+3,
					  w: Crafty.math.randomInt(1,5)+3,
					  alpha: 1.0,
					  z: 1
					})
					.color("rgb(80,80,80)")		// dark grey
					.tween({ y:0, alpha:0.0 }, 185)
					.bind('TweenEnd', function() { particle.destroy(); } ); 
				i++;
				sc.spcParticles.push(particle);
			}		  
		}, 500, -1);
		
		sc.delays.delay(function() {										// after 11 sec,
			playerEnt.stop().animate("AmiantoHittingTheGround",32,0);	// Amianto hits the ground
			sc.delays.destroy();						//destroy delays
			sc.delays = undefined;						// reset delays
			sc['delays'] = Crafty.e("Delay");			// reset delays
			Crafty("spaceParticle").each(function() { 	// select particles and stop their tweening
				this.unbind('EnterFrame', this.tweenEnterFrame);			
			});
			Crafty.background("#000000"); 				// set background to black
			sc.bckgrndFade.attr({ alpha: 0.0, z:1000 }); // make bckgrndFade transparent and put it above other entities
			Crafty.trigger('LoadLevel02');
		}, 11000);
		
	});
	
	this.levelTransition =  Crafty.bind('LoadLevel02', function() { // load level02
		sc.delays.delay(function() { 
			sc.bckgrndFade.tween({ alpha: 1.0 }, 200);	// tween bckgrndFade making it cover everything
		}, 5000);
		
		// !TODO require level02 files
	});
	
}, function() {
	Crafty.unbind('TooMuchLove', this.muchLove); // works? not sure
	Crafty.heartComing = undefined;
	Crafty.backgroundChange = undefined;
});