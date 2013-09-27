Crafty.scene("level02", function() {
	
	sc = [];
	
	//Crafty.init(2400, 32000); // reset stage to accommodate the tilemap
	//Crafty.viewport.init(800, 600);
	Crafty.background("#000000");
	
	//var MapBytesArray = stringOfByteArrayToArrayOfBytes(gameContainer.loadedStrings[0]);
	
	//LZMA.decompress(MapBytesArray, function(result) {
        //console.log("Decompressed.");
		var mapObj = JSON.parse(gameContainer.loadedStrings[0]);
		sc['player'] = new Amianto02(),
		sc['diamond'] = new Diamond(),
		sc['mapBuider'] = Crafty.e("TiledLevel"), // create an entity with the "TiledLevel" component.
		sc['tiledMap'] = sc.mapBuider.buildTiledLevel(mapObj, gameContainer.conf.get('renderType')),
		sc['camera'] = Crafty.e("Camera");
		
		sc.tiledMap.bind("TiledLevelLoaded", function() { // upon loading and creating the tilemap,
			Crafty("grnd").each(function() { 
				this.addComponent("Collision");
			});
			
			var playerEnt = sc.player.getEntity();
			
			Crafty.viewport.centerOn(playerEnt, 1);
			sc.camera.camera(playerEnt);
			//Crafty.viewport.follow(mainEntity, 100, 100);
			playerEnt.gravity();
			console.log("finished loading and assembling tilemap");
		});
    /*}, function(percent) {
        /// Decompressing progress code goes here.
        console.log("Decompressing: " + (percent * 100) + "%");
    });*/
	
	// when everything is loaded, 
//	require(elements, function() {					//tiledMapString) {
		
		
		
//	});
		
}, function(){ 
  
});