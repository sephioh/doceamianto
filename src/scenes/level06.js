Crafty.scene("level06", function() {
	Crafty.background("#000000");
	var rails = [
		[
		  {x:625,y:86},{x:545,y:102},{x:470,y:118},{x:400,y:136},{x:345,y:152},
		  {x:305,y:170},{x:265,y:188},{x:240,y:204},{x:223,y:221},{x:201,y:239},
		  {x:189,y:257},{x:189,y:282},{x:189,y:300},{x:193,y:318},{x:197,y:336},
		  {x:205,y:352},{x:217,y:368},{x:239,y:384},{x:255,y:400},{x:280,y:416},
		  {x:310,y:431},{x:340,y:448},{x:390,y:464},{x:440,y:480},{x:500,y:496},
		  {x:575,y:512},{x:645,y:528},{x:735,y:544},{x:825,y:560}
		],
		[
		  {x:635,y:86},{x:578,y:102},{x:503,y:118},{x:440,y:136},{x:396,y:152},
		  {x:368,y:170},{x:340,y:188},{x:321,y:204},{x:307,y:221},{x:293,y:239},
		  {x:284,y:257},{x:284,y:282},{x:284,y:300},{x:288,y:318},{x:292,y:336},
		  {x:299,y:352},{x:307,y:368},{x:329,y:384},{x:348,y:400},{x:374,y:416},
		  {x:403,y:431},{x:435,y:448},{x:485,y:464},{x:533,y:480},{x:590,y:496},
		  {x:655,y:512},{x:725,y:528},{x:821,y:544}
		],
		[
		  {x:645,y:86},{x:612,y:102},{x:536,y:118},{x:480,y:136},{x:447,y:152},
		  {x:431,y:170},{x:415,y:188},{x:402,y:204},{x:392,y:221},{x:384,y:239},
		  {x:379,y:257},{x:379,y:282},{x:379,y:300},{x:383,y:318},{x:387,y:336},
		  {x:393,y:352},{x:397,y:368},{x:419,y:384},{x:441,y:400},{x:467,y:416},
		  {x:495,y:431},{x:530,y:448},{x:580,y:464},{x:625,y:480},{x:680,y:496},
		  {x:735,y:512},{x:805,y:528},{x:810,y:544}
		],
		[
		  {x:655,y:86},{x:629,y:102},{x:581,y:118},{x:530,y:136},{x:521,y:152},
		  {x:506,y:170},{x:492,y:188},{x:480,y:204},{x:471,y:221},{x:464,y:239},
		  {x:460,y:257},{x:460,y:282},{x:460,y:300},{x:463,y:318},{x:467,y:336},
		  {x:474,y:352},{x:481,y:368},{x:499,y:384},{x:520,y:400},{x:545,y:416},
		  {x:574,y:431},{x:605,y:448},{x:647,y:464},{x:690,y:480},{x:740,y:496},
		  {x:815,y:512}
		],
		[
		  {x:665,y:86},{x:645,y:102},{x:627,y:118},{x:611,y:136},{x:595,y:152},
		  {x:581,y:170},{x:569,y:188},{x:559,y:204},{x:551,y:221},{x:545,y:239},
		  {x:541,y:257},{x:541,y:282},{x:541,y:300},{x:543,y:318},{x:548,y:336},
		  {x:555,y:352},{x:565,y:368},{x:579,y:384},{x:599,y:400},{x:623,y:416},
		  {x:653,y:431},{x:681,y:448},{x:715,y:464},{x:755,y:480},{x:801,y:496}
		]
	    ],
	    domeY = -796,
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
			o = Crafty.e("StepsPhantom");
		}
		if(o)
			if(o.__c){
				var attack = rand <= 70 ? sc.player.getEntity() : false;
				o.followSteps(rails, rail, attack);
				sc.phantoms.push(o);
			}else{
				o.followSteps(rail);
				sc.hearts.push(o);
			}
	    },
	    skySection = function(x, y){
		return Crafty.e("2D, Canvas, Image, Tween, backgroundSection")
		  .image("web/images/bg_sky_level06.png", "repeat-y")
		  .attr({ x: x, y: y, w: 800, h: 3000, z: 1, alpha: 1.0 });
	    },
	    citySection = function(x, y){
		return Crafty.e("2D, Canvas, Image, Tween, backgroundSection")
		  .image("web/images/bg_skyline_level06.png", "repeat-x")
		  .attr({ x: x, y: y, w: 462, h: 600, z: 2, alpha: 1.0 });
	    },
	    rotation_time = 700,
	    dist = 25,
	    rotatingBackground = function(){
		  for(var layer in sc.bckgrnd){
			if(layer == 0){
				for(var pos in sc.bckgrnd[layer]){
					var city = sc.bckgrnd[layer][pos];
					if(!Object.keys(city).length)
						city = sc.bckgrnd[layer][pos] = pos == 0 ? citySection(0,330) : citySection(461,330);
					if(pos == 0 && 
					  (city._x + city._w < (Crafty.viewport._x * -1))){
						city.destroy();
						city = sc.bckgrnd[layer][pos] = sc.bckgrnd[layer][parseInt(pos) + 1];
						sc.bckgrnd[layer][parseInt(pos) + 1] = citySection(461 - dist, city._y);
					}
					city.tween({ x: city._x - dist, y: city._y + 2}, rotation_time);
				}
			}else{
				for(var pos in sc.bckgrnd[layer]){
					var sky = sc.bckgrnd[layer][pos];
					if(!Object.keys(sky).length)
						sky = sc.bckgrnd[layer][pos] = pos == 0 ? skySection(0,0) : skySection(799,-2400);
					if(pos == 0 && 
					  (sky._x < (Crafty.viewport._x * -1) - sky._w)){
						sky.destroy();
						sky = sc.bckgrnd[layer][pos] = sc.bckgrnd[layer][parseInt(pos) + 1];
						sc.bckgrnd[layer][parseInt(pos) + 1] = skySection(799 - dist * 2, sky._y);
					}
					sky.tween({ x: sky._x - dist * 2 }, rotation_time);
				}
			}
		  }
	    },
	    initial_negative_score = 20,
	    font_size = 30;
	
	// Play theme
	//Crafty.audio.play("theme06", -1, 0.3);
	sc.player = new Amianto06(),
	sc.hearts = [],
	sc.delimiters = [],
	sc.phantoms = [],
	sc.delays = Crafty.e("Delay"),
	sc.positiveScore = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SpriteText")
	    .registerFont("red_electronic",font_size,"web/images/sheet_red_numbers.png","0123456789")
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
	    .registerFont("blue_electronic",font_size,"web/images/sheet_blue_numbers.png","0123456789")
	    .text(initial_negative_score),
	sc.stairway = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SpriteAnimation, stairway")
	    .attr({ x:156, w: 850, h: 870, y: -270, z: 300 })
	    .reel("stairwayAnimation", 400, 0, 0, 3)
	    .animate("stairwayAnimation", -1),
	sc.columnLayer = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SpriteAnimation, stairColumnMask")
	    .attr({ x: 600, y: -263, w: 200, h: 530, z: 316 })
	    .reel("stairwayAnimation", 400, 0, 0, 3)
	    .animate("stairwayAnimation", -1),
	sc.delimiters = [
		Crafty.e("Delimiter").attr({ x: 265, y: 242, w: 1, h: 400 }), 
		Crafty.e("Delimiter").attr({ x: 715, y: 242, w: 1, h: 400 }),
		Crafty.e("Delimiter, grnd").attr({ x: 0, y: 440, w: 800, h: 1 })
	    ],
	sc.bckgrnd = [
		// primeira camada - cidade
		[{},{}],
		// segunda camada - ceu
		[{},{}]
	    ];
	sc.positiveScore.attr({w: font_size*2, h: font_size}).attr({x: Crafty.viewport.width - sc.positiveScore._w - 20, y: 20, z:1000}),
	sc.negativeScore.attr({w: font_size*2, h: font_size}).attr({x: 20, y:20, z: 1000}),
	sc.player.startMoving(),
	rotatingBackground(),
	sc.delays.delay(stuffComing,1000,-1)
	    .delay(rotatingBackground, rotation_time + 50, -1),
	Crafty.audio.play("theme06", -1, 1, 63.3);
	//utils.setViewportBounds(sc.player.getEntity());
	
	// Event declarations

	// Amianto get max number of RedHearts
	this.one('TooMuchLove', function(){
	  	Crafty.background("#000000");
		this('interfc_button').each(function(){ this.destroy(); });
		Crafty.audio.stop("theme06");
		Crafty.audio.play("kiss0");
		sc.stairway.pauseAnimation();
		sc.columnLayer.pauseAnimation();
		sc.delays.cancelDelay(stuffComing)
		    .cancelDelay(rotatingBackground);
		Crafty("backgroundSection").each(function(){
			this.cancelTween('x')
			    .cancelTween('y');
		});
		_.each(sc.hearts, function(o){ try{ o.stopMovement(); } catch(e){ console.log("what"); } });
		_.each(sc.phantoms, function(o){ try{ o.stopMovement(); } catch(e){ console.log("é o que"); } });
		sc.kissAnimation = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SpriteAnimation, coupleKissing")
			.reel("Kiss", 5000, [
			  [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],
			  [0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],
			  [0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2]
			])
			.attr({ x:710, y:-356, h: 145, w:155, z: 331 })
			.bind("FrameChange", function erection(o){
				if(o.currentFrame==15)
					Crafty.audio.play("kiss2");
			});
		sc.moon = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Tween, moon")
			.attr({ x: 376, y: domeY + 200, w: 650, h:650, z: 250 });
		var t = 1500;
		this.viewport.clampToEntities = false;
		this.one("CameraAnimationDone", function(){
			this.one("CameraAnimationDone", function(){
				sc.delays.delay(function(){
					Crafty.audio.play("kiss1");
					sc.kissAnimation.animate("Kiss")
					    .one("AnimationEnd", function(){
						sc.delays.delay(function(){ Crafty.trigger('Credits'); },2000);
					    });
					utils.fadeSound("kiss0", 0, Crafty.timer.FPS());
					utils.fadeSound("kiss1", 0, Crafty.timer.FPS());
				},4000);
			});
			this.viewport.zoom(1.5,800,-358, t);
			sc.moon.tween({ x: sc.moon._x + 100 }, t);
		});
		sc.moon.tween({ y: sc.moon._y - 100 }, t);
		this.viewport.pan(0,-500, t);
	});
	
	// final credits
	this.one('Credits', function(){
		sc.fireworks = [],
		sc.displayedCredits = [],
		sc.creditsPic;
		var colors = [ '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF' ], 
		    c = 0,
		    fireworks = function(){
			Crafty.background(colors[c++]);
			if (c == colors.length)
				c = 0;
		    };
		
		sc.fireworks[0] = Crafty.e("Fireworks")
		    .attr({ 
			x: (Crafty.viewport._x * -1), 
			y: (Crafty.viewport._y * -1), 
			w: Crafty.viewport._width/4, 
			h: 2*(Crafty.viewport._height/3),
			z: 299 
		    })
		    .animate("explosion")
		    .bind("FrameChange", function(o){
			if(o.currentFrame == 16){
				Crafty("backgroundSection").each(function(){
					this.destroy();
				});
				fireworks();
				sc.delays.delay(fireworks, 200, -1);
			}
		    });
		sc.delays.delay(function(){
			sc.fireworks[1] = Crafty.e("Fireworks")
			    .attr({ 
				x: (Crafty.viewport._x * -1) + Crafty.viewport.width/3 + 50, 
				y: (Crafty.viewport._y * -1), 
				w: Crafty.viewport._width/4, 
				h: 2*(Crafty.viewport._height/3),
				z: 299 
			    })
			    .flip("X")
			    .animate("explosion")
			    .one("AnimationEnd", function(){
				Crafty.one("CameraAnimationDone", function(){
					var credTxts = JSON.parse(gameContainer.getSceneTexts()[0]),
					    card = "text0",
					    t = 0,
					    textsize = 15,
					    nextText = function(){
						for(var d in sc.displayedCredits)
							sc.displayedCredits[d].destroy();
						sc.displayedCredits = [];
						if(t == Object.keys(credTxts).length){
							sc.delays.cancelDelay(nextText);
							sc.creditsPic.destroy();
							return;
						}
						sc.creditsPic.animate("part" + t, -1);
						var text = credTxts[card + t++].split("|");
						for(var l in text)
							sc.displayedCredits[l] = Crafty.e("2D, Canvas, Text")
							    .attr({
								x: (Crafty.viewport._x * -1) + Crafty.viewport._width/3 - ((textsize * text[l].length)/2) + 15, 
								y: (Crafty.viewport._y * -1) + Crafty.viewport._height/3 + (textsize * l), 
								w: textsize * text[l].length, 
								h: textsize,
								z: 400
							    })
							    .text(text[l])
							    .textColor("#FFFFFF")
							    .textFont({ size: textsize + 'px', family: 'Amiga4ever_pro2' });
					    };
					sc.creditsPic = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SpriteAnimation, coupleCredits");
					sc.creditsPic
					    .reel("part0", 1000, 0, 0, 2)
					    .reel("part1", 1000, 0, 1, 2)
					    .reel("part2", 1000, 0, 2, 2)
					    .reel("part3", 1000, 0, 3, 2)
					    .reel("part4", 1000, 0, 4, 2)
					    .reel("part5", 1000, 0, 5, 2)
					    .reel("part6", 1000, 0, 6, 2)
					    .reel("part7", 1000, 0, 7, 2)
					    .reel("part8", 1000, 0, 8, 2)
					    .attr({
						x: (Crafty.viewport._x * -1) + Crafty.viewport._width/3 - sc.creditsPic._w/2 + 20,
						y: (Crafty.viewport._y * -1) + Crafty.viewport._height/3 - sc.creditsPic._h - textsize,
						z: 400
					    });
					
					nextText();
					sc.delays.delay(nextText, 5000, -1);
				});
				Crafty.viewport.zoom(1,800,-958, 1500);
			    });
		},1000);
	});
	
}, function() { 				// executed after scene() is called within the present scene
	utils.resetViewportBounds();
	sc.delays.destroy();	// destroy delays
	var l = "level06";
	Crafty.removeAssets(resources.get(l));
	gameContainer.removeSceneTexts(l);
});