Crafty.scene("level04", function() {
	
	var scene = this;
	
	Crafty.background("#000000");
	
	Crafty.audio.play("theme02", -1);
	
	//var MapBytesArray = stringOfByteArrayToArrayOfBytes(gameContainer.loadedStrings[0]);
	
	//LZMA.decompress(MapBytesArray, function(result) {
        //console.log("Decompressed.");
	var mapObj1 = JSON.parse(gameContainer.loadedStrings[0]),
	    mapObj2 = JSON.parse(gameContainer.loadedStrings[1]),
	    mapObj3 = JSON.parse(gameContainer.loadedStrings[2]);
		
	sc['player'] = new Carlos(),
	sc['mm'] = new MapsManager(),
	sc['delays'] = Crafty.e("Delay"),
	sc['transitionAreas'] = [],
	sc['delimiters'] = [],
	sc['checkpoints'] = [],
	sc['obstacles'] = [];

	sc.mm.prepTileset(mapObj1.tilesets[0])
	    .addMap()
	    .one("TiledLevelLoaded", function(o) {
		    sc.mm.configTiles(o);
		    sc.player.getEntity().gravity();
		    sc.mm.addMap()
			.one("TiledLevelLoaded", function(o) {
				sc.mm.configTiles(o);
				
				sc.mm.addMap()
				    .one("TiledLevelLoaded", function(o) {
					      sc.mm.configTiles(o);
				      })
				    .buildTiledLevel(mapObj3, gameContainer.conf.get('renderType'), false);
			})
			.buildTiledLevel(mapObj2, gameContainer.conf.get('renderType'), false);
	    })
	    .buildTiledLevel(mapObj1, gameContainer.conf.get('renderType'), false);
		
	Crafty.viewport.clampToEntities = false;
	Crafty.viewport.follow(sc.player.getEntity(), 0, 0);
	
	console.log(mapObj1.height,mapObj1.tileheight,mapObj1.height*mapObj1.tileheight)
	
	sc.transitionAreas = [
	    new AreaTransition({ 
	      x: - mapObj1.tilewidth,
	      y: 0,
	      w: mapObj1.tilewidth * 2,
	      h: mapObj1.height * mapObj1.tileheight,
	      hide: null,
	      show: null
	    }),
	    new AreaTransition({ 
	      x: (mapObj1.width - 1) * mapObj1.tilewidth,
	      y: mapObj1.layers[0].y,
	      w: mapObj1.tilewidth * 2,
	      h: mapObj1.height * mapObj1.tileheight,
	      hide: mapObj1.properties.name,
	      show: mapObj2.properties.name
	    }),
	    new AreaTransition({ 
	      x: mapObj2.x + ((mapObj2.width - 1) * mapObj2.tilewidth),
	      y: mapObj2.layers[0].y,
	      h: mapObj2.tilewidth * 2, 
	      w: mapObj2.height * mapObj2.tileheight,
	      hide: mapObj2.properties.name,
	      show: mapObj3.properties.name
	    }),
	    new AreaTransition({ 
	      x: mapObj3.x + ((mapObj3.width - 1) * mapObj3.tilewidth),
	      y: mapObj3.layers[0].y,
	      h: mapObj3.tilewidth * 2, 
	      w: mapObj3.height * mapObj3.tileheight,
	      hide: mapObj3.properties.name,
	      show: null
	    })
	];
	
}, function(){ 
	//get rid of unwanted bindings, functions and files
	Crafty.viewport.x = 0,
	Crafty.viewport.y = 0;
	resources.removeAudio("level04");
});