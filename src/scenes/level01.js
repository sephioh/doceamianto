Crafty.scene("level01", function() {
	
	Crafty.background("#FFFFFF");
		
	//when everything is loaded, run the level01 scene
	
				
		sc['player'] = new Amianto01(),
		sc['hearts'] = [],
		sc['delimiters'] = [],
		sc['delays'] = Crafty.e("Delay"),
		sc['bckgrndFade'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Tween, TweenColor")
		    .attr({ x: 0, y: 0, w: 800, h: 600, z: 0, alpha: 1.0 }),
		sc['bckgrndDegrade'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Sprite, Tween, degrade")
		    .attr({ x: 0, y: 0, w: 800, h: 600, z: 0, alpha: 1.0 });
		
		sc.player.startMoving();
		// Play theme
		sounds.theme01.play({
		  loops: 15
		});
		
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
			white = { r: 255, g: 255, b: 255 },
			yellow = { r: 255, g: 226, b: 78 },
			pink = { r: 255, g: 77, b: 153 },
			violet = { r: 128, g: 16, b: 216 },
			green = { r: 117, g: 232, b: 7 };
		  
		sc.bckgrndFade.rgb(white);
		
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
		
		this.bind('EnterFrame', Crafty.backgroundChange);
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
	
	//	Event declarations

	// Amianto get max number of RedHearts
	this.muchLove = function() {
		
		var time = 60;										// time in frames, duration of tweening effects
		
		//Crafty.audio.stop();
		//Crafty.audio.play("falling01", 1);
		sounds.theme01.stop();
		sounds.falling01.play();
		
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
		
		sc.delays.delay(function() {						// after half sec,
			sc.player.stumble(); 							// make amianto stumble, and then fall
		}, 500);
		
		sc['spcParticles'] = []; 							// space particles' container
		
		sc.delays.delay(function() { 						// each half sec,
			var partAmount = 6,								// create 6 particles 
				i=0;
			while(i<partAmount) {
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
					.tween({ y:0, alpha:0.0 }, 150)
					.bind('TweenEnd', function() { 
						particle.destroy(); 
					}); 
				i++;
				sc.spcParticles.push(particle);
			}		  
		}, 500, -1);
		
		sc.delays.delay(function() {												// after 10.5 sec,
			sc.player.getEntity().playAnimation("AmiantoHittingTheGround",40,0);	// Amianto hits the ground
			sc.delays.destroy();						//destroy delays
			sc.delays = undefined;						// reset delays
			sc['delays'] = Crafty.e("Delay");			// reset delays
			Crafty("spaceParticle").destroy(); 			// destroy all particles
			Crafty.background("#000000"); 				// set background to black
			sc.bckgrndFade.attr({ alpha: 0.0, z:1000 }); // make bckgrndFade transparent and put it above other entities
			Crafty.trigger('LevelTransition');
		}, 10500);
		
	}
	
	this.bind('TooMuchLove', this.muchLove);
	
	this.loadLevel02 = function() { // load level02
	
		sc.delays.delay(function() { 
			sc.bckgrndFade
				.tween({ alpha: 1.0 }, 200) // tween bckgrndFade making it cover everything
				.bind("TweenEnd", function() {
					// set level02 scene info
					gameContainer.setNextSceneInfo({ 
					  name: "level02",
					  elements: [
						  // texts must come first
						  "text!src/scenes/tilemaps/level02.json", 
						  "src/components/TiledLevelImporter.js",
						  "src/components/camera.js",
						  "src/entities/diamond.js",
						  "src/entities/amianto02.js"
						],
					});
					// run level02 scene
					Crafty.scene("loading",{ backgroundColor: "#000000", ellipsisColor:"#FFFFFF" });
				});	
		}, 5000);
		
	}; 
	
	this.bind('LevelTransition', this.loadLevel02);
	
}, function() { 											// executed after scene() is called within the present scene
	//Crafty.heartComing = undefined;							// clear level functions held in Crafty obj
	//Crafty.backgroundChange = undefined;					// clear level functions held in Crafty obj
	sc.delays.destroy();									// destroy delays
	sc = [];												// clear scene
	Crafty("2D").destroy();									// Destroy all entities with 2D component
});