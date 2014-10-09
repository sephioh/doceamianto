Crafty.scene("level06", function() {
	
	var i = 0,
	    yellow = { r: 255, g: 226, b: 78 },
	    pink = { r: 255, g: 77, b: 153 },
	    violet = { r: 128, g: 16, b: 216 },
	    green = { r: 117, g: 232, b: 7 },
	    rails = [
	      [
		{x:700,y:86},{x:620,y:102},{x:545,y:118},{x:475,y:136},{x:420,y:152},
		{x:380,y:170},{x:340,y:188},{x:315,y:204},{x:298,y:221},{x:276,y:239},
		{x:264,y:257},{x:264,y:282},{x:264,y:300},{x:268,y:318},{x:272,y:336},
		{x:280,y:352},{x:292,y:368},{x:314,y:384},{x:330,y:400},{x:355,y:416},
		{x:385,y:431},{x:415,y:448},{x:465,y:464},{x:515,y:480},{x:575,y:496},
		{x:650,y:512},{x:720,y:528},{x:810,y:544},{x:900,y:560}
	      ],
	      [
		{x:710,y:86},{x:653,y:102},{x:578,y:118},{x:515,y:136},{x:471,y:152},
		{x:443,y:170},{x:415,y:188},{x:396,y:204},{x:382,y:221},{x:368,y:239},
		{x:359,y:257},{x:359,y:282},{x:359,y:300},{x:363,y:318},{x:367,y:336},
		{x:374,y:352},{x:382,y:368},{x:404,y:384},{x:423,y:400},{x:449,y:416},
		{x:478,y:431},{x:510,y:448},{x:560,y:464},{x:608,y:480},{x:665,y:496},
		{x:730,y:512},{x:800,y:528},{x:896,y:544}
	      ],
	      [
		{x:720,y:86},{x:687,y:102},{x:611,y:118},{x:555,y:136},{x:522,y:152},
		{x:506,y:170},{x:490,y:188},{x:477,y:204},{x:467,y:221},{x:459,y:239},
		{x:454,y:257},{x:454,y:282},{x:454,y:300},{x:458,y:318},{x:462,y:336},
		{x:468,y:352},{x:472,y:368},{x:494,y:384},{x:516,y:400},{x:542,y:416},
		{x:570,y:431},{x:605,y:448},{x:655,y:464},{x:700,y:480},{x:755,y:496},
		{x:810,y:512},{x:880,y:528},{x:885,y:544}
	      ],
	      [
		{x:730,y:86},{x:704,y:102},{x:656,y:118},{x:605,y:136},{x:596,y:152},
		{x:581,y:170},{x:567,y:188},{x:555,y:204},{x:546,y:221},{x:539,y:239},
		{x:535,y:257},{x:535,y:282},{x:535,y:300},{x:538,y:318},{x:542,y:336},
		{x:549,y:352},{x:556,y:368},{x:574,y:384},{x:595,y:400},{x:620,y:416},
		{x:649,y:431},{x:680,y:448},{x:722,y:464},{x:765,y:480},{x:815,y:496},
		{x:890,y:512}
	      ],
	      [
		{x:740,y:86},{x:720,y:102},{x:702,y:118},{x:686,y:136},{x:670,y:152},
		{x:656,y:170},{x:644,y:188},{x:634,y:204},{x:626,y:221},{x:620,y:239},
		{x:616,y:257},{x:616,y:282},{x:616,y:300},{x:618,y:318},{x:623,y:336},
		{x:630,y:352},{x:640,y:368},{x:654,y:384},{x:674,y:400},{x:698,y:416},
		{x:728,y:431},{x:756,y:448},{x:790,y:464},{x:830,y:480},{x:876,y:496}
	      ]
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