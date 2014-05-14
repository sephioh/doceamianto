Crafty.scene("level04", function() {
	
	var functions = gameContainer.scene.functions;
	
	//Crafty.background("#000000");
	Crafty.background("#FCC6AC");
	
	Crafty.audio.play("theme04", -1);
	
	//gameContainer.conf.set({'renderType': 'DOM'});
	
	//var MapBytesArray = stringOfByteArrayToArrayOfBytes(gameContainer.loadedStrings[0]);
	
	//LZMA.decompress(MapBytesArray, function(result) {
        //console.log("Decompressed.");
	
	sc['player'] = new Carlos(),
	sc['mm'] = new MapsManager(),
	sc['map'] = Crafty.e("2D, Canvas, TiledMapBuilder"),
	sc['delays'] = Crafty.e("Delay"),
	sc['transitionAreas'] = [],
	sc['delimiters'] = [],
	sc['checkpoints'] = [],
	sc['figurants'] = [],
	sc['pmSpawners'] = [],
	sc['teleporters'] = [],
	sc['playerMock'] = {},
	sc['boss'] = {};
	
	var mapObj1 = JSON.parse(gameContainer.getSceneTexts()[0]), 
	    playerEnt = sc.player.getEntity(),
	    playerInitPos = sc.player.get('startingPoint'),
	    bgMoveRate = 15;
	
	sc['bg1'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Image")
	    .attr({ x: 0, y: 0, z: playerEnt._z - 2 })
	    .image("web/images/bg1-level04.png"),
	sc['bg2'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Image")
	    .attr({ x: 0, y: 0, z: playerEnt._z - 3 })
	    .image("web/images/bg2-level04.png"),
	sc['bg3'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Image")
	    .image("web/images/bg3-level04.png","repeat")
	    .attr({ x: 0, y: 0, z: playerEnt._z - 4, w: mapObj1.width * mapObj1.tilewidth, h: mapObj1.height * mapObj1.tileheight });
	
	sc.mm.prepTileset(mapObj1.tilesets[0])
	    .addMap()
	    .one("TiledLevelLoaded", function(o) {
		Crafty.viewport.clampToEntities = false,
		Crafty.viewport.follow(playerEnt, 0, 0),
		
		_.each(this._layerArray[0].tiles, function(t){ t.z = playerEnt._z - 1 }),
		_.each(this._layerArray[1].tiles, function(t){ t.z = playerEnt._z - 1 }),
		_.each(this._layerArray[2].tiles, function(t){ t.z = playerEnt._z + 2 }),
		
		Crafty("upStairs").each(function() {
			this.collision(new Crafty.polygon([[0,31],[31,0]]));
		}),
		Crafty("downStairs").each(function() {
			this.collision(new Crafty.polygon([[0,0],[31,31]]));
		}),
		Crafty("leftWall").each(function() {
			if(this.__c.top)
				this.collision(new Crafty.polygon([[24,4],[24,31]]));
			else
				this.collision(new Crafty.polygon([[24,0],[24,31]]));
		      
		}),
		Crafty("rightWall").each(function() {
			if(this.__c.top)
				this.collision(new Crafty.polygon([[8,4],[8,31]]));
			else
				this.collision(new Crafty.polygon([[8,0],[8,31]]));
		}),
		Crafty("grnd mud").each(function() {
			this.collision(new Crafty.polygon([[0,8],[31,8]]))
			    .z = playerEnt._z + 1;
		}),
		playerEnt.gravity();
	    })
	    .buildTiledLevel(mapObj1, gameContainer.conf.get('renderType'), false);
	
	sc.delimiters = [
		Crafty.e("Delimiter, wall").attr({ x: 388, y: 256, w: 1, h: 320 }), 
		Crafty.e("Delimiter, wall").attr({ x: 20950, y: 1792, w: 1, h: 320 }),
		Crafty.e("Delimiter, bossArea").attr({ x: 18496, y: 1792, w: 1, h: 320 })
	];
	
	sc.checkpoints = [
		Crafty.e("Delimiter, checkpoint").attr({ x: 832, y: 352, h: 224, w: 1 }).identifier = 1,
		Crafty.e("Delimiter, checkpoint").attr({ x: 8960, y: 992, h: 224, w: 1 }).identifier = 2,
		Crafty.e("Delimiter, checkpoint").attr({ x: 13120, y: 896, h: 224, w: 1 }).identifier = 3
	];
	
	sc.teleporters = [
		Crafty.e("Delimiter, teleporter").attr({ x: 10240, y: 2144, h: 1, w: 192 }),
		Crafty.e("Delimiter, teleporter").attr({ x: 11776, y: 2048, h: 1, w: 640 })
	];
	
	var fig_dev_y = 30;
	
	sc.figurants = [
		Crafty.e("Figurant").setFace(0).attr({ x: 832, y: 448+fig_dev_y, z: playerEnt._z - 1, h: playerEnt._h }).wanderLoop(),
		Crafty.e("Figurant").setFace(1).attr({ x: 4512, y: 576+fig_dev_y, z: playerEnt._z - 1, h: playerEnt._h }).wanderLoop(),
		Crafty.e("Figurant").setFace(2).attr({ x: 8864, y: 1088+fig_dev_y, z: playerEnt._z - 1, h: playerEnt._h }).wanderLoop(),
		Crafty.e("Figurant").setFace(3).attr({ x: 10944, y: 1472+fig_dev_y, z: playerEnt._z - 1, h: playerEnt._h }).wanderLoop(),
		Crafty.e("Figurant").setFace(4).attr({ x: 12064, y: 1184+fig_dev_y, z: playerEnt._z - 1, h: playerEnt._h }).wanderLoop(),
		Crafty.e("Figurant").setFace(5).attr({ x: 15328, y: 1248+fig_dev_y, z: playerEnt._z - 1, h: playerEnt._h }).wanderLoop()
	];
	
	sc.pmSpawners = [ 
		Crafty.e("PoliceSpawner").attr({ x: 1824, y: 448+fig_dev_y, z: playerEnt._z - 1, h: playerEnt._h, w: playerEnt._w }).setTarget(playerEnt), 
		Crafty.e("PoliceSpawner").attr({ x: 7392, y: 1088+fig_dev_y, z: playerEnt._z - 1, h: playerEnt._h, w: playerEnt._w }).setTarget(playerEnt),
		Crafty.e("PoliceSpawner").attr({ x: 11168, y: 1472+fig_dev_y, z: playerEnt._z - 1, h: playerEnt._h, w: playerEnt._w }).setTarget(playerEnt), 
		Crafty.e("PoliceSpawner").attr({ x: 15488, y: 1248+fig_dev_y, z: playerEnt._z - 1, h: playerEnt._h, w: playerEnt._w }).setTarget(playerEnt)
	];
	
	functions.callPolicemen = function() {
		_.each(sc.pmSpawners, function(S) {
			S.spawn();
		});
	};
	
	// event bindings
	
	// background parallax
	this.bind("PlayerMoved", function (prevPos){
		if(prevPos._x !== playerEnt._x){
			var XD = (playerEnt._x - playerInitPos.x) / bgMoveRate;
			sc.bg1.x = XD,
			sc.bg2.x = XD / 0.5;
		} else {
			var YD = (playerEnt._y - playerInitPos.y) / bgMoveRate;
			sc.bg1.y = YD,
			sc.bg2.y = YD / 0.5;
		}
	});
		
	this.one("PlayerShoot", function() {
		this.trigger("Alert", 1);
	});
	
	this.one("FigurantDied", function() {
		this.trigger("Alert", 2);    
		// call policemen now and each 20 seconds
		functions.callPolicemen();
		sc.delays.delay(functions.callPolicemen, 20000, -1);
	});
	
	this.one("BossFight", function() {
		
		sc.boss = Crafty.e("BadassPhantom").attr({ x: 19712, y: 1824, z: playerEnt._z });
		
		sc.playerMock = Crafty.e("2D,"+gameContainer.conf.get('renderType')+", SpriteAnimation, carlos, Tween")
			.attr({ x: playerEnt._x, y: playerEnt._y, z: playerEnt._z, h: playerEnt._h, w: playerEnt._w })
			.reel("Running", 500, 1, 0, 5);
				
		playerEnt.disableControl()
			.alpha = 0;
		Crafty.viewport.follow(sc.playerMock, 0, 0);
		sc.playerMock.animate("Running", -1)
			.tween({ x: 19426 }, 5000)
			.one("TweenEnd", function() {
				playerEnt.attr({ x: this._x, y: this._y })
				    .enableControl()
				    .alpha = 1;
				Crafty.viewport.follow(playerEnt, 0, 0);
				this.destroy();
				sc.delimiters[2].addComponent("wall");
				sc.boss.shaping()
				    .hunt();
			});
		
	});
	
}, function(){ 
	//get rid of unwanted bindings, functions and files
	Crafty.viewport.x = 0,
	Crafty.viewport.y = 0;
	resources.removeAudio("level04");
});