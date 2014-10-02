Crafty.scene("level06", function() {
	
	var i = 0,
	    yellow = { r: 255, g: 226, b: 78 },
	    pink = { r: 255, g: 77, b: 153 },
	    violet = { r: 128, g: 16, b: 216 },
	    green = { r: 117, g: 232, b: 7 },
	    heartComing = function() {
		// 80% chance of creating a dark heart
		/*if(Crafty.math.randomInt(1,100)<=80) {
			sc.hearts.push(new Heart({ heartColor:"dark" }));
		} else {
			sc.hearts.push(new Heart({ heartColor:"red" }));
		}*/
	    },
	    moveBackground = function() {
		
	    }; 
	    /*rails = [
	      [
		{x:,y: 86},{x:,y: 102},{x:,y: 118},{x:,y: 136},{x:,y: 152},{x:,y: 170},{x:,y: 188},{x:,y: 204},{x:,y: 221},{x:,y: 255},
		{x:,y: 271},{x:,y: 288},{x:,y: 306},{x:,y: 321},{x:,y: 340},{x:,y: 356},{x:,y: 374},{x:,y: 390},{x: ,y: 406},{x:,y: 424},
		{x: ,y: 441},{x: ,y: 459},{x: ,y: 476},{x: ,y: 493},{x: ,y: 510},{x: ,y: 527},{x: ,y: 543},{x: ,y: 561},{x: ,y: 577}
	      ],
	      [
		{x:,y: 86},{x:,y: 102},{x:,y: 118},{x:,y: 136},{x:,y: 152},{x:,y: 170},{x:,y: 188},{x:,y: 204},{x:,y: 221},{x:,y: 255},
		{x:,y: 271},{x:,y: 288},{x:,y: 306},{x:,y: 321},{x:,y: 340},{x:,y: 356},{x:,y: 374},{x:,y: 390},{x: ,y: 406},{x:,y: 424},
		{x: ,y: 441},{x: ,y: 459},{x: ,y: 476},{x: ,y: 493},{x: ,y: 510},{x: ,y: 527},{x: ,y: 543},{x: ,y: 561},{x: ,y: 577}
	      ],
	      [
		{x:,y: 86},{x:,y: 102},{x:,y: 118},{x:,y: 136},{x:,y: 152},{x:,y: 170},{x:,y: 188},{x:,y: 204},{x:,y: 221},{x:,y: 255},
		{x:,y: 271},{x:,y: 288},{x:,y: 306},{x:,y: 321},{x:,y: 340},{x:,y: 356},{x:,y: 374},{x:,y: 390},{x: ,y: 406},{x:,y: 424},
		{x: ,y: 441},{x: ,y: 459},{x: ,y: 476},{x: ,y: 493},{x: ,y: 510},{x: ,y: 527},{x: ,y: 543},{x: ,y: 561},{x: ,y: 577}
	      ],
	      [
		{x:,y: 86},{x:,y: 102},{x:,y: 118},{x:,y: 136},{x:,y: 152},{x:,y: 170},{x:,y: 188},{x:,y: 204},{x:,y: 221},{x:,y: 255},
		{x:,y: 271},{x:,y: 288},{x:,y: 306},{x:,y: 321},{x:,y: 340},{x:,y: 356},{x:,y: 374},{x:,y: 390},{x: ,y: 406},{x:,y: 424},
		{x: ,y: 441},{x: ,y: 459},{x: ,y: 476},{x: ,y: 493},{x: ,y: 510},{x: ,y: 527},{x: ,y: 543},{x: ,y: 561},{x: ,y: 577}
	      ],
	      [
		{x:,y: 86},{x:,y: 102},{x:,y: 118},{x:,y: 136},{x:,y: 152},{x:,y: 170},{x:,y: 188},{x:,y: 204},{x:,y: 221},{x:,y: 255},
		{x:,y: 271},{x:,y: 288},{x:,y: 306},{x:,y: 321},{x:,y: 340},{x:,y: 356},{x:,y: 374},{x:,y: 390},{x: ,y: 406},{x:,y: 424},
		{x: ,y: 441},{x: ,y: 459},{x: ,y: 476},{x: ,y: 493},{x: ,y: 510},{x: ,y: 527},{x: ,y: 543},{x: ,y: 561},{x: ,y: 577}
	      ]
	    ];*/
	
	Crafty.background("#FFFFFF");
	// Play theme
	//Crafty.audio.play("theme06", -1, 0.3);
			
	//sc.player = new Amianto06(),
	sc.hearts = [],
	sc.delimiters = [],
	sc.delays = Crafty.e("Delay"),
	/*sc.bckgrndFade = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Tween, TweenColor")
	    .attr({ x: 0, y: 0, w: 800, h: 600, z: 1000, alpha: 1.0 }),
	sc.bckgrndGradient = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Sprite, Tween, gradient01")
	    .attr({ x: 0, y: 0, w: 800, h: 600, z: 1, alpha: 1.0 });*/
	sc.stairway = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SpriteAnimation, stairway, Mouse")
	    .attr({ x:156, w: 850, h: 870, y: -270, z: 500 })
	    .reel("stairwayAnimation", 400, 0, 0, 3)
	    .animate("stairwayAnimation", 1)
	    .bind("Click", function(e){ console.log("x: "+e.x, "y: "+e.y); });
	
	//sc.player.startMoving();

	sc.delimiters = [
		Crafty.e("Delimiter").attr({ x: 0, y: 242, w: 1, h: 400 }), 
		Crafty.e("Delimiter").attr({ x: 800, y: 242, w: 1, h: 400 })
	    ];

	sc.delays.delay(heartComing,750,-1);
	
	//utils.setViewportBounds(sc.player.getEntity());

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