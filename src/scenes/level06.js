Crafty.scene("level06", function() {
	
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
	    moveBackground = function() {
		
	    };
	
	Crafty.background("#FFFFFF");
	// Play theme
	//Crafty.audio.play("theme06", -1, 0.3);
			
	sc.player = new Amianto06(),
	sc.hearts = [],
	sc.delimiters = [],
	sc.delays = Crafty.e("Delay"),
	sc.bckgrndFade = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Tween, TweenColor")
	    .attr({ x: 0, y: 0, w: 800, h: 600, z: 1000, alpha: 1.0 }),
	sc.bckgrndGradient = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Sprite, Tween, gradient01")
	    .attr({ x: 0, y: 0, w: 800, h: 600, z: 1, alpha: 1.0 });
	
	sc.player.startMoving();

	sc.delimiters = [
		Crafty.e("Delimiter").attr({ x: 0, y: 242, w: 1, h: 400 }), 
		Crafty.e("Delimiter").attr({ x: 800, y: 242, w: 1, h: 400 })
	    ];
    
	sc.delays.delay(heartComing,750,-1);
	
	utils.setViewportBounds({ x:0, y:0 }, { x:800, y:600 }, sc.player.getEntity());

	// Event declarations

	// Amianto get max number of RedHearts
	this.one('TooMuchLove', function() {
		
	});
	
}, function() { 				// executed after scene() is called within the present scene
	utils.resetViewportBounds();
	sc.delays.destroy();	// destroy delays
	var l = "level06";
	Crafty.removeAssets(resources.get(l));
	gameContainer.removeSceneTexts(l);
});