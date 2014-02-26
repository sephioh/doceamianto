Crafty.scene("level04", function() {
	
	var scene = this;
	
	Crafty.background("#000000");
	
	Crafty.audio.play("theme02", -1);
	
	//var MapBytesArray = stringOfByteArrayToArrayOfBytes(gameContainer.loadedStrings[0]);
	
	//LZMA.decompress(MapBytesArray, function(result) {
        //console.log("Decompressed.");
	var mapObj1 = JSON.parse(gameContainer.loadedStrings[0]);//,
	    //mapObj2 = JSON.parse(gameContainer.loadedStrings[1]),
	    //mapObj3 = JSON.parse(gameContainer.loadedStrings[2]);
	
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
		    /*sc.mm.addMap()
			.one("TiledLevelLoaded", function(o) {
				sc.mm.configTiles(o);
				
				sc.mm.addMap()
				    .one("TiledLevelLoaded", function(o) {
					      sc.mm.configTiles(o);
				      })
				    .buildTiledLevel(mapObj3, gameContainer.conf.get('renderType'), false);
			})
			.buildTiledLevel(mapObj2, gameContainer.conf.get('renderType'), false);*/
	    })
	    .buildTiledLevel(mapObj1, gameContainer.conf.get('renderType'), false);
		
	Crafty.viewport.clampToEntities = false;
	Crafty.viewport.follow(sc.player.getEntity(), 0, 0);
	
	var ls = mapObj1.layers;
	
	//console.log(((ls[2].properties.lInitialX + ls[2].properties.lWidth) * mapObj1.tilewidth));
	
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
	];
	
}, function(){ 
	//get rid of unwanted bindings, functions and files
	Crafty.viewport.x = 0,
	Crafty.viewport.y = 0;
	resources.removeAudio("level04");
});