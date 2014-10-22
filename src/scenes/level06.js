Crafty.scene("level06", function() {
  
	Crafty.background("#000000");
	
	var i = 0,
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
	    stuffComing = function() {
		var rail = rails[Crafty.math.randomInt(0,rails.length - 1)],
		    rand = Crafty.math.randomInt(1,100),
		    o;
		// 80% chance of creating a dark heart
		if(rand <= 50) {
			o = new Heart({ heartColor: "dark", initAttr: { z: 300, w: 50, h: 50 } });
		} else if (rand <= 65) {
			o = new Heart({ heartColor: "red", initAttr: { z: 300, w: 50, h: 50 } });
		} else if (rand <= 75) {
			// TODO phantom appears
			
		}
		if(o)
			if(o.getEntity().__c.heart){
				o.followSteps(rail);
				sc.hearts.push(o);
			}/*else{ // if phantom
				TODO
				
			}*/
	    },
	    moveSkyline = function() {
		if(sc.bckgrndSkyline._x < sc.bckgrndSkyline._w * -1){
		      sc.delays.cancelDelay(moveSkyline);
		      return;
		}
		sc.bckgrndSkyline.tween({x: sc.bckgrndSkyline._x - 25, y: sc.bckgrndSkyline._y + 2}, 700);
	    },
	    moveSky = function() {
		sc.bckgrndSky.tween({x: sc.bckgrndSky._x - 50, y: sc.bckgrndSky._y + 1}, 700);
	    }, 
	    initial_negative_score = 20;
	
	// Play theme
	//Crafty.audio.play("theme06", -1, 0.3);
	sc.player = new Amianto06(),
	sc.hearts = [],
	sc.delimiters = [],
	sc.delays = Crafty.e("Delay"),
	sc.positiveScore = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SpriteText")
	    .registerFont("red_electronic",30,"web/images/sheet_red_numbers.png","0123456789")
	    .text("00")
	    .bind("HitHeart", function(s){
		var posiScore = s,
		    negaScore = initial_negative_score - posiScore,
		    newPositiveScore = posiScore.toString().length == 1? "0" + posiScore : posiScore,
		    newNegativeScore = negaScore.toString().length == 1? "0" + negaScore : negaScore;
		sc.positiveScore.text(newPositiveScore);
		sc.negativeScore.text(newNegativeScore);
	    }),
	sc.negativeScore = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SpriteText")
	    .registerFont("blue_electronic",30,"web/images/sheet_blue_numbers.png","0123456789")
	    .text(initial_negative_score),
	sc.bckgrndSky = Crafty.e("2D, Canvas, Image, Tween")
	    .image("web/images/bg_sky_level06.png", "repeat")
	    .attr({ x: 0, y: -600, w: 35000, h: 1200, z: 1, alpha: 1.0 }),
	sc.bckgrndSkyline = Crafty.e("2D, Canvas, Image, Tween")
	    .image("web/images/bg_skyline_level06.png", "repeat-x")
	    .attr({ x: 0, y: 330, w: 7000, h: 600, z: 2, alpha: 1.0 }),
	sc.stairway = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SpriteAnimation, stairway")
	    .attr({ x:156, w: 850, h: 870, y: -270, z: 300 })
	    .reel("stairwayAnimation", 400, 0, 0, 3)
	    .animate("stairwayAnimation", -1),
	sc.columnLayer = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SpriteAnimation, stairColumnMask")
	    .attr({ x: 600, y: -263, w: 200, h: 530, z: 309 })
	    .reel("stairwayAnimation", 400, 0, 0, 3)
	    .animate("stairwayAnimation", -1),
	sc.delimiters = [
		Crafty.e("Delimiter").attr({ x: 280, y: 242, w: 1, h: 400 }), 
		Crafty.e("Delimiter").attr({ x: 715, y: 242, w: 1, h: 400 }),
		Crafty.e("Delimiter, grnd").attr({ x: 0, y: 435, w: 800, h: 1 })
	    ];
	sc.positiveScore.attr({w: 60, h: 30}).attr({x: Crafty.viewport.width - sc.positiveScore._w - 20, y: 20, z:1000}),
	sc.negativeScore.attr({w: 60, h: 30}).attr({x: 20, y:20, z: 1000}),
	sc.player.startMoving(),
	moveSkyline(),
	moveSky(),
	sc.delays.delay(stuffComing,1000,-1)
	    .delay(moveSkyline,750,-1)
	    .delay(moveSky,750,-1);
	
	//utils.setViewportBounds(sc.player.getEntity());
	
	// Event declarations

	// Amianto get max number of RedHearts
	this.one('TooMuchLove', function(){
		sc.kissAnimation = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SpriteAnimation, coupleKissing")
			.reel("Kiss", 5000, [
			  [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],
			  [0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],
			  [0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2]
			])
			.attr({ x:710, y:-356, h: 145, w:155, z: 316 });
		sc.stairway.pauseAnimation();
		sc.delays.cancelDelay(stuffComing)
		    .cancelDelay(moveSkyline)
		    .cancelDelay(moveSky);
		this.viewport.clampToEntities = false;
		this.one("CameraAnimationDone", function(){
			this.one("CameraAnimationDone", function(){
				sc.delays.delay(function(){
					sc.kissAnimation.animate("Kiss");
				},4000);
			});
			//this.viewport.pan(300,0,700);
			this.viewport.zoom(1.5,800,-358,1500);
		});
		this.viewport.pan(0,-500,1500);
	});
	
}, function() { 				// executed after scene() is called within the present scene
	utils.resetViewportBounds();
	sc.delays.destroy();	// destroy delays
	var l = "level06";
	Crafty.removeAssets(resources.get(l));
	gameContainer.removeSceneTexts(l);
});