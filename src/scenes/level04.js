Crafty.scene("level04", function() {
	
	sc = [];
	var scene = this;
	
	Crafty.background("#000000");
	
	Crafty.audio.play("theme02", -1);
	
	//var MapBytesArray = stringOfByteArrayToArrayOfBytes(gameContainer.loadedStrings[0]);
	
	//LZMA.decompress(MapBytesArray, function(result) {
        //console.log("Decompressed.");
		var mapObj = JSON.parse(gameContainer.loadedStrings[0]);
		sc['player'] = new Carlos(),
		sc['mapBuilder'] = Crafty.e("TiledLevel"), // create an entity with the "TiledLevel" component.
		sc['tiledMap'] = sc.mapBuilder.buildTiledLevel(mapObj, gameContainer.conf.get('renderType')),
		sc['delays'] = Crafty.e("Delay"),
		sc['delimiters'] = [],
		sc['checkpoints'] = [],
		sc['obstacles'] = [];

		sc.tiledMap.bind("TiledLevelLoaded", function() { // upon loading and creating the tilemap,
			
			var playerEnt = sc.player.getEntity();
			
			/*_.each(sc.tiledMap._layerArray[1].tiles, function(obj) {
			    obj.z = playerEnt._z + 1;
			    obj.alpha = sc.tiledMap._layerArray[1].opacity;
			});*/
		  
			// setting collision for tiles
			Crafty("upStairs").each(function() { 
				this.collision(new Crafty.polygon([[0,31],[31,0]]));
			});
			Crafty("downStairs").each(function() { 
				this.collision(new Crafty.polygon([[0,0],[31,31]]));
			});
			Crafty("water").each(function() { 
				this.collision(new Crafty.polygon([[0,24],[31,24]]));
			});
			Crafty("leftWall").each(function() { 
				this.collision(new Crafty.polygon([[0,0],[23,0],[23,31],[0,31]]));
				this.z = playerEnt._z - 2;
			});

			Crafty.viewport.clampToEntities = false;
			Crafty.viewport.follow(playerEnt, 0, 0);
			
			console.log("finished loading level04 map")
			
		});

		//<delimiters>
		var delimitersMap = {
			left: 	{ x: 435, y: 1275, w: 2, h: 180 }, 
			right: 	{ x: 37869, y: 1275, w: 2, h: 180 }
		};
	
		/*
		_.each(delimitersMap, function(obj) {
			var delimiter = Crafty.e("2D, Collision, wall")
				.attr({x: obj.x, y: obj.y, w: obj.w, h: obj.h});
			sc.delimiters.push(delimiter);
		});
		*/
		//</delimiters>

		//<checkpoints>
		var checkPointsMap = {
			checkpoint1: { x: 7008, y: 1275, w: 1, h: 180, value: 1 },
			checkpoint2: { x: 10432, y: 1275, w: 1, h: 180, value: 2 },
			checkpoint3: { x: 12992, y: 1275, w: 1, h: 180, value: 3 },
			checkpoint4: { x: 16672, y: 1275, w: 1, h: 180, value: 4 },
			checkpoint5: { x: 18912, y: 1568, w: 1, h: 180, value: 5 },
			checkpoint6: { x: 22016, y: 1504, w: 1, h: 180, value: 6 },
			checkpoint7: { x: 24896, y: 992, w: 1, h: 180, value: 7 },
			checkpoint8: { x: 28480, y: 320, w: 1, h: 180, value: 8 },
			checkpoint9: { x: 31456, y: 736, w: 1, h: 180, value: 9 },
			checkpoint10: { x: 32320, y: 736, w: 1, h: 180, value: 10 }
		};
	
		/*
		_.each(checkPointsMap, function(obj) {
			var checkpoint = Crafty.e("2D, Collision, checkpoint")
				.attr({x: obj.x, y: obj.y, w: obj.w, h: obj.h});
			checkpoint['value'] = obj.value;
			sc.checkpoints.push(checkpoint);
		});
		*/
		//</checkpoints>
		

		
}, function(){ 
	//get rid of unwanted bindings, functions and files
	Crafty.viewport.x = 0,
	Crafty.viewport.y = 0;
	resources.removeAudio("level04");
});