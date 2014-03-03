Crafty.scene("level04", function() {
	
	var scene = this;
	
	Crafty.background("#000000");
	
	Crafty.audio.play("theme02", -1);
	
	//gameContainer.conf.set({'renderType': 'DOM'});
	
	//var MapBytesArray = stringOfByteArrayToArrayOfBytes(gameContainer.loadedStrings[0]);
	
	//LZMA.decompress(MapBytesArray, function(result) {
        //console.log("Decompressed.");
	var mapObj1 = JSON.parse(gameContainer.loadedStrings[0]), 
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
	sc['figurants'] = [];

	 sc.mm.prepTileset(mapObj1.tilesets[0])
	    .addMap()
	    .one("TiledLevelLoaded", function(o) {
	      
		Crafty("upStairs").each(function() { 
		      this.collision(new Crafty.polygon([[1,32],[32,1]]));
		}),
		Crafty("downStairs").each(function() { 
		      this.collision(new Crafty.polygon([[1,1],[32,32]]));
		});
		
		var playerEnt = sc.player.getEntity();
		playerEnt.gravity();
		sc.figurants = [
		    Crafty.e("Figurant").setFace(0).attr({ x: playerEnt._x+400, y: playerEnt._y, z: playerEnt._z }),
		    Crafty.e("Figurant").setFace(1).attr({ x: playerEnt._x+100, y: playerEnt._y, z: playerEnt._z }),
		    Crafty.e("Figurant").setFace(2).attr({ x: playerEnt._x-200, y: playerEnt._y, z: playerEnt._z }),
		    Crafty.e("Figurant").setFace(3).attr({ x: playerEnt._x+600, y: playerEnt._y, z: playerEnt._z }),
		    Crafty.e("Figurant").setFace(4).attr({ x: playerEnt._x-400, y: playerEnt._y, z: playerEnt._z }),
		    Crafty.e("Figurant").setFace(5).attr({ x: playerEnt._x+200, y: playerEnt._y, z: playerEnt._z })
		    ];
		_.each(sc.figurants, function(f) {
			f.wanderLoop();
		});
	    })
	    .buildTiledLevel(mapObj1, gameContainer.conf.get('renderType'), false);
	
	/*
	var START_COLUMN =0, START_ROW = 5, LAZY_TILE_HEIGHT = 20, LAZY_TILE_WIDTH = 30;
	sc.map
	    .setMapDataSource( mapObj1 )
	    .createView( START_ROW, START_COLUMN, LAZY_TILE_WIDTH, LAZY_TILE_HEIGHT, function( tiledmap ){
		
	    });*/
		
	Crafty.viewport.clampToEntities = false;
	Crafty.viewport.follow(sc.player.getEntity(), 0, 0);
	
	// binding events
	
	scene
	    .bind("PlayerShoot", function alert1() {
		    this.unbind(alert1);
		    this.trigger("Alert", 1);
	    })
	    .bind("FigurantDied", function alert2() {
		    this.unbind(alert2);
		    this.trigger("Alert", 2);    
	    });
	
	  /*
	    var ls = mapObj1.layers;
	    sc.transitionAreas = [
	    new AreaTransition({ 
	      x: ((ls[0].properties.lInitialX + ls[0].properties.lWidth) * mapObj1.tilewidth) - Crafty.viewport.width/2,
	      y: ls[0].properties.lInitialY * mapObj1.tileheight,
	      w: 2,
	      h: (ls[0].properties.lHeight - ls[0].properties.lInitialY) * mapObj1.tileheight,
	      show: "P2",
	      side: "left"
	    }), 
	     new AreaTransition({ 
	      x: ((ls[0].properties.lInitialX + ls[0].properties.lWidth) * mapObj1.tilewidth) + Crafty.viewport.width/2,
	      y: ls[0].properties.lInitialY * mapObj1.tileheight,
	      w: 2,
	      h: (ls[0].properties.lHeight - ls[0].properties.lInitialY) * mapObj1.tileheight,
	      show: "P1"
	    }), 
	     new AreaTransition({ 
	      x: ((ls[2].properties.lInitialX + ls[2].properties.lWidth) * mapObj1.tilewidth) - Crafty.viewport.width/2,
	      y: ls[2].properties.lInitialY * mapObj1.tileheight,
	      w: 2,
	      h: (ls[2].properties.lHeight - ls[2].properties.lInitialY) * mapObj1.tileheight,
	      show: "P3",
	      side: "left"
	    }), 
	     new AreaTransition({ 
	      x: ((ls[2].properties.lInitialX + ls[2].properties.lWidth) * mapObj1.tilewidth) + Crafty.viewport.width/2,
	      y: ls[2].properties.lInitialY * mapObj1.tileheight,
	      w: 2,
	      h: (ls[2].properties.lHeight - ls[2].properties.lInitialY) * mapObj1.tileheight,
	      show: "P2"
	    }), 
	     new AreaTransition({ 
	      x: ((ls[4].properties.lInitialX + ls[4].properties.lWidth) * mapObj1.tilewidth) - Crafty.viewport.width/2,
	      y: ls[4].properties.lInitialY * mapObj1.tileheight,
	      w: 2,
	      h: (ls[4].properties.lHeight - ls[4].properties.lInitialY) * mapObj1.tileheight,
	      show: "P4",
	      side: "left"
	    }), 
	     new AreaTransition({ 
	      x: ((ls[4].properties.lInitialX + ls[4].properties.lWidth) * mapObj1.tilewidth) + Crafty.viewport.width/2,
	      y: ls[4].properties.lInitialY * mapObj1.tileheight,
	      w: 2,
	      h: (ls[4].properties.lHeight - ls[4].properties.lInitialY) * mapObj1.tileheight,
	      show: "P3"
	    }), 
	     new AreaTransition({ 
	      x: ((ls[6].properties.lInitialX + ls[6].properties.lWidth) * mapObj1.tilewidth) - Crafty.viewport.width/2,
	      y: ls[6].properties.lInitialY * mapObj1.tileheight,
	      w: 2,
	      h: (ls[6].properties.lHeight - ls[6].properties.lInitialY) * mapObj1.tileheight,
	      show: "P5",
	      side: "left"
	    }), 
	     new AreaTransition({ 
	      x: ((ls[6].properties.lInitialX + ls[6].properties.lWidth) * mapObj1.tilewidth) + Crafty.viewport.width/2,
	      y: ls[6].properties.lInitialY * mapObj1.tileheight,
	      w: 2,
	      h: (ls[6].properties.lHeight - ls[6].properties.lInitialY) * mapObj1.tileheight,
	      show: "P4"
	    }), 
	     new AreaTransition({ 
	      x: ((ls[8].properties.lInitialX + ls[8].properties.lWidth) * mapObj1.tilewidth) - Crafty.viewport.width/2,
	      y: ls[8].properties.lInitialY * mapObj1.tileheight,
	      w: 2,
	      h: (ls[8].properties.lHeight - ls[8].properties.lInitialY) * mapObj1.tileheight,
	      show: "P6",
	      side: "left"
	    }), 
	     new AreaTransition({ 
	      x: ((ls[8].properties.lInitialX + ls[8].properties.lWidth) * mapObj1.tilewidth) + Crafty.viewport.width/2,
	      y: ls[8].properties.lInitialY * mapObj1.tileheight,
	      w: 2,
	      h: (ls[8].properties.lHeight - ls[8].properties.lInitialY) * mapObj1.tileheight,
	      show: "P5"
	    })
	];*/
	
}, function(){ 
	//get rid of unwanted bindings, functions and files
	Crafty.viewport.x = 0,
	Crafty.viewport.y = 0;
	resources.removeAudio("level04");
});