Crafty.scene("level05",function(){
	Crafty.background("#16377A");
	Crafty.audio.play("theme05", -1, 1, 40.1);
		
	var particlesOptions = {
	    maxParticles: 200,
	    size: 5,
	    sizeRandom: 4,
	    speed: .1,
	    speedRandom: .3,
	    lifeSpan: 70,
	    lifeSpanRandom: 10,
	    angle: 225,
	    angleRandom: 35,
	    startColour: [0, 204, 255, 1],
	    startColourRandom: [60, 60, 60, .2],
	    endColour: [0, 255, 255, 0],
	    endColourRandom: [60, 60, 60, .2],
	    sharpness: 20,
	    sharpnessRandom: 10,
	    spread: Crafty.viewport.width,
	    duration: -1,
	    fastMode: false,
	    gravity: { x: -0.05, y: 0.1 },
	    jitter: 3
	};

	sc.player = new Amianto05(),
	sc.mm = new MapsManager(),
	sc.delays = Crafty.e("Delay"),
	sc.delimiters = [],
	sc.checkpoints = [],
	sc.teleporters = [],
	sc.floorSet = Crafty.e("FloorSet"),
	sc.particles = Crafty.e("2D, Canvas, Particles")
	    .particles(particlesOptions)
	    .bind("EnterFrame",function(){
		this.attr({ x: Crafty.viewport._x * -1, y: Crafty.viewport._y * -1 });
	    }),
	sc.gradient = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", gradient05")
	    .attr({ w: Crafty.viewport.width, h: Crafty.viewport.height, z: sc.player.getEntity()._z - 1, alpha: 0.7 })
	    .bind("EnterFrame",function(){
		this.attr({ x: Crafty.viewport._x * -1, y: Crafty.viewport._y * -1 });
	    });
	
	var mapObj = JSON.parse(gameContainer.getSceneTexts()[0]), 
	    playerEnt = sc.player.getEntity(),
	    haunt = function(){
		var nPhantoms = Crafty.math.randomInt(1,3),
		    time = Crafty.math.randomInt(100,400),
		    partialDelta = function(){ return (Crafty.math.randomInt(0,1)? 1 : -1) * Crafty.math.randomInt(175,350); };
		sc.delays.delay(function(){
			Crafty.e("NightclubPhantom")
				.attr({
				  x: playerEnt._x + partialDelta(),
				  y: playerEnt._y + partialDelta(),
				  z: playerEnt._z
				})
				.attack(playerEnt);
		}, time, nPhantoms - 1);
	    };

	sc.mm.prepTileset(mapObj.tilesets[0])
	    .addMap()
	    .one("TiledLevelLoaded", function(o) {
		Crafty.viewport.clampToEntities = false,
		Crafty.viewport.follow(playerEnt, 0, 0);
		
		Crafty("shine").each(function(){ this.z = playerEnt._z + 1; });
		Crafty("dance_floor").each(function(){ this.z = playerEnt._z; });
		
		sc.floorSet
		    .setFloorsSeries(mapObj.layers[4].objects[0], o, mapObj.tilewidth)
		    .revealFloor();
		
		playerEnt.gravity();

		sc.delays.delay(haunt, 7500, -1);
	    })
	    .buildTiledLevel(mapObj, gameContainer.conf.get('renderType'), false);

	sc.teleporters = [
		Crafty.e("Delimiter, teleporter").attr({ x: -500, y: mapObj.height * mapObj.tileheight * 1.5, h: 1, w: (mapObj.width * mapObj.tilewidth) + 1000 }),
		Crafty.e("Delimiter, level_transition").attr({ x: 7728, y: 700, h: 214, w: 1 })
	];
	
	this.one("LevelTransition", function(){
		Crafty.audio.stop("theme05");
		Crafty.audio.play("shiwsish");
		Crafty("DanceFloor, Shine").each(function(){
			if (this._alpha != 0)
				this.addComponent("Tween")
				    .tween({ alpha: 0 }, 2000);
		});
		sc.delays.cancelDelay(haunt)
		    .delay(function(){
			playerEnt.pauseAnimation()
			    .antigravity();
		    }, 500);
		playerEnt.disableControl()
		    .tween({ alpha:0 }, 2500)
		    .one('TweenEnd', function(){ gameContainer.runScene('level06', { backgroundColor: '#000066', entsColor: '#C0C0C0' }) });
		Crafty("NightclubPhantom").each(function(){ this.destroy() });
	});
	
}, function(){
  	this.viewport.x = 0,
	this.viewport.y = 0;
	var l = "level05";
	this.removeAssets(resources.get(l));
	gameContainer.removeSceneTexts(l);
});