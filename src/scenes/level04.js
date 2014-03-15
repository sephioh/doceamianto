Crafty.scene("level04", function() {
	
	var scene = this;
	
	Crafty.background("#FFFFFF");
	
	Crafty.audio.play("theme02", -1);
	
	//gameContainer.conf.set({'renderType': 'DOM'});
	
	//var MapBytesArray = stringOfByteArrayToArrayOfBytes(gameContainer.loadedStrings[0]);
	
	//LZMA.decompress(MapBytesArray, function(result) {
        //console.log("Decompressed.");
	var mapObj1 = JSON.parse(gameContainer.getSceneTexts()[0]), 
	    alert = 0;
	    //mapObj2 = JSON.parse(gameContainer.loadedStrings[1]),
	    //mapObj3 = JSON.parse(gameContainer.loadedStrings[2]);
	
	sc['player'] = new Carlos(),
	sc['mm'] = new MapsManager(),
	sc['map'] = Crafty.e("2D, Canvas, TiledMapBuilder"),
	sc['delays'] = Crafty.e("Delay"),
	sc['transitionAreas'] = [],
	sc['delimiters'] = [],
	sc['checkpoints'] = [],
	sc['obstacles'] = [],
	sc['figurants'] = [],
	sc['policemen'] = [],
	sc['background1'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Image")
	    .attr({ x: 0, y: 30, z: 299 })
	    .image("web/images/bg1-level04.png"),
	sc['background2'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Image")
	    .attr({ x: 0, y: -30, z: 298 })
	    .image("web/images/bg2-level04.png");

	 sc.mm.prepTileset(mapObj1.tilesets[0])
	    .addMap()
	    .one("TiledLevelLoaded", function(o) {
	      
		Crafty("upStairs").each(function() { 
		      this.collision(new Crafty.polygon([[0,31],[31,0]]));
		}),
		Crafty("downStairs").each(function() { 
		      this.collision(new Crafty.polygon([[0,0],[31,31]]));
		});
		
		Crafty.viewport.clampToEntities = false;
		Crafty.viewport.follow(sc.player.getEntity(), 0, 0);
	    })
	    .buildTiledLevel(mapObj1, gameContainer.conf.get('renderType'), false);
	    
	var playerEnt = sc.player.getEntity();
	playerEnt.gravity();
	
	sc.delimiters = [
		Crafty.e("Delimiter, levelLimits").attr({ x: 388, y: 540, w: 1, h: 150 }), 
		Crafty.e("Delimiter, levelLimits").attr({ x: 23428 + playerEnt._w, y: 2070, w: 1, h: 150 })
	  ];
	
	sc.figurants = [
		Crafty.e("Figurant").setFace(0).attr({ x: playerEnt._x+400, y: playerEnt._y, z: playerEnt._z, h: playerEnt._h }),
		Crafty.e("Figurant").setFace(1).attr({ x: playerEnt._x+100, y: playerEnt._y, z: playerEnt._z, h: playerEnt._h }),
		Crafty.e("Figurant").setFace(2).attr({ x: playerEnt._x-200, y: playerEnt._y, z: playerEnt._z, h: playerEnt._h }),
		Crafty.e("Figurant").setFace(3).attr({ x: playerEnt._x+600, y: playerEnt._y, z: playerEnt._z, h: playerEnt._h }),
		Crafty.e("Figurant").setFace(4).attr({ x: playerEnt._x-400, y: playerEnt._y, z: playerEnt._z, h: playerEnt._h }),
		Crafty.e("Figurant").setFace(5).attr({ x: playerEnt._x+200, y: playerEnt._y, z: playerEnt._z, h: playerEnt._h })
	];
	  
	_.each(sc.figurants, function(f) {
		f.wanderLoop();
	});
	
	// event bindings
	
	this.bind("PlayerShoot", function alert1() {
		this.unbind("PlayerShoot", alert1);
		if(alert < 1)
			this.trigger("Alert", 1);
	  });
	this.bind("FigurantDied", function alert2() {
		this.unbind("FigurantDied", alert2);
		if(alert < 2){
			this.trigger("Alert", 2);    
			this.callPolicemen();
		}
	  });
	this.bind("PlayerMoved", function(prevPos) {
		this.moveBG(prevPos);
	  });
	
	// event functions
	    
	this.callPolicemen = function(){
		sc.delays.delay(function() {
			var polen = Crafty("Policeman").length;
			if(polen < 2){
				if(polen < 1){ 
					// !TODO create 1 policeman at each side
					
					/*
					sc.policemen.push(new Policeman().);
					sc.policemen.push(new Policeman().);
					*/
				}
				else{	
					// !TODO create 1 policeman on left or right
					
					/*
					sc.policemen.push(new Policeman().);
					*/
				}
			}
		},6000,6);
	};
	
	// parallax background scrolling
	
	var playerInitPos = sc.player.get('startingPoint');
	    bgMoveRate = 15;
	
	this.moveBG = function (prevPos){
		if(prevPos._x !== playerEnt._x){
			var XD = (playerEnt._x - playerInitPos.x) / bgMoveRate;
			sc.background1.x = XD,
			sc.background2.x = XD / 0.5;
		} else 
		if(prevPos._y !== playerEnt._y){
			var YD = (playerEnt._y - playerInitPos.y) / bgMoveRate;
			sc.background1.y = YD - 32,
			sc.background2.y = (YD / 0.5) + 32;
		}
	}
	
}, function(){ 
	//get rid of unwanted bindings, functions and files
	Crafty.viewport.x = 0,
	Crafty.viewport.y = 0;
	resources.removeAudio("level04");
});