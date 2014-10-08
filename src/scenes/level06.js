Crafty.scene("level06", function() {
	
	var i = 0,
	    yellow = { r: 255, g: 226, b: 78 },
	    pink = { r: 255, g: 77, b: 153 },
	    violet = { r: 128, g: 16, b: 216 },
	    green = { r: 117, g: 232, b: 7 },
	    /*
	    286
	    332, 352 383 423 479 572 710
	    46, 66, 97, 137, 193, 286, 424
	    23, 33, 48, 66, 96, 143, 212
	    mid -> 504 */ 
	    
	    
	    rails = [
	      /*[
		{x:705,y:86},{x:620,y:102},{x:545,y:118},{x:475,y:136},{x:420,y:152},
		{x:380,y:170},{x:340,y:188},{x:315,y:204},{x:298,y:221},{x:276,y:239},
		{x:264,y:257},{x:264,y:282},{x:264,y:300},{x:268,y:318},{x:272,y:336},
		{x:280,y:352},{x:292,y:368},{x:314,y:384},{x:330,y:400},{x:360,y:416},
		{x:400,y:431},{x:450,y:448},{x:515,y:464},/*{x:700,y:480},{x:755,y:496},
		{x:810,y:512},{x:880,y:528},{x:885,y:544}
	      ],*/
	      /*[
		{x:720,y:86},{x:687,y:102},{x:611,y:118},{x:559,y:136},{x:526,y:152},
		{x:506,y:170},{x:490,y:188},{x:477,y:204},{x:467,y:221},{x:459,y:239},
		{x:355,y:257},{x:355,y:282},{x:355,y:300},{x:458,y:318},{x:462,y:336},
		{x:468,y:352},{x:472,y:368},{x:494,y:384},{x:516,y:400},{x:542,y:416},
		{x:570,y:431},{x:605,y:448},{x:655,y:464},{x:700,y:480},{x:755,y:496},
		{x:810,y:512},{x:880,y:528},{x:885,y:544}/*,{x: ,y: 577}
	      ],*/
	      [
		{x:720,y:86},{x:687,y:102},{x:611,y:118},{x:555,y:136},{x:522,y:152},
		{x:506,y:170},{x:490,y:188},{x:477,y:204},{x:467,y:221},{x:459,y:239},
		{x:454,y:257},{x:454,y:282},{x:454,y:300},{x:458,y:318},{x:462,y:336},
		{x:468,y:352},{x:472,y:368},{x:494,y:384},{x:516,y:400},{x:542,y:416},
		{x:570,y:431},{x:605,y:448},{x:655,y:464},{x:700,y:480},{x:755,y:496},
		{x:810,y:512},{x:880,y:528},{x:885,y:544}/*,{x: ,y: 577}*/
	      ],
	      /*
	      [
		{x:720,y:86},{x:687,y:102},{x:611,y:118},{x:555,y:136},{x:522,y:152},
		{x:506,y:170},{x:490,y:188},{x:477,y:204},{x:467,y:221},{x:459,y:239},
		{x:454,y:257},{x:454,y:282},{x:454,y:300},{x:458,y:318},{x:462,y:336},
		{x:468,y:352},{x:472,y:368},{x:494,y:384},{x:516,y:400},{x:542,y:416},
		{x:570,y:431},{x:605,y:448},{x:655,y:464},{x:700,y:480},{x:755,y:496},
		{x:810,y:512},{x:880,y:528},{x:885,y:544}/*,{x: ,y: 577}*/
	      //],
	      /*
	      [
		{x:720,y:86},{x:687,y:102},{x:611,y:118},{x:555,y:136},{x:522,y:152},
		{x:506,y:170},{x:490,y:188},{x:477,y:204},{x:467,y:221},{x:459,y:239},
		{x:454,y:257},{x:454,y:282},{x:454,y:300},{x:458,y:318},{x:462,y:336},
		{x:468,y:352},{x:472,y:368},{x:494,y:384},{x:516,y:400},{x:542,y:416},
		{x:570,y:431},{x:605,y:448},{x:655,y:464},{x:700,y:480},{x:755,y:496},
		{x:810,y:512},{x:880,y:528},{x:885,y:544}/*,{x: ,y: 577}
	      ] */
	    ],
	    heartComing = function() {
		var r = rails[Crafty.math.randomInt(0,rails.length - 1)];
		// 80% chance of creating a dark heart
		if(Crafty.math.randomInt(1,100)<=80) {
			sc.hearts.push(new Heart({ heartColor: "dark", initAttr: { z: 301, w: 50, h: 50 } }));
		} else {
			sc.hearts.push(new Heart({ heartColor: "red", initAttr: { z: 301, w: 50, h: 50 } }));
		}
		
		sc.hearts[sc.hearts.length - 1].followSteps(r);
	    };
	
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
	    .attr({ x:156, w: 850, h: 870, y: -270, z: 300 })
	    .reel("stairwayAnimation", 400, 0, 0, 3)
	    .animate("stairwayAnimation", -1)
	    .bind("Click", function(e){ console.log("x: "+e.x, "y: "+e.y); });
	
	//sc.player.startMoving();

	sc.delimiters = [
		Crafty.e("Delimiter").attr({ x: 0, y: 242, w: 1, h: 400 }), 
		Crafty.e("Delimiter").attr({ x: 800, y: 242, w: 1, h: 400 })
	    ];

	sc.delays.delay(heartComing,1000,-1);
	
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