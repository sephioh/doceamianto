Crafty.scene("level02", function() {
	
	Crafty.init(2400, 32000); // reset stage to accommodate the tilemap
	Crafty.viewport.init(800, 600);
	Crafty.background("#000000");
	
	var MapBytesArray = stringOfByteArrayToArrayOfBytes(gameContainer.loadedStrings[0]);
	
	LZMA.decompress(MapBytesArray, function(result) {
        console.log("Decompressed.");
		
		var mapBuider = Crafty.e("TiledLevel"), // create an entity with the "TiledLevel" component.
			tiledMap = mapBuider.buildTiledLevel(result, gameContainer.conf.get('renderType')),
			camera = Crafty.e("Camera"),
			entitySpeed = 4,
			startingPoint = { x: 384, y: 1232 },
			entityW = 30,
			entityH = 50,
			rotationDegree = 45,
			mainEntity = Crafty.e("2D, Canvas, Color, Twoway, Gravity, Collision")
				.attr({ x: startingPoint.x, y: startingPoint.y, w: entityW, h: entityH, z: 1000 })
				.color("red")
				.twoway(entitySpeed, entitySpeed)
				.collision()
				.onHit('grnd', function(hit) {
					for (var i = 0; i < hit.length; i++) {
						var hitDirY = Math.round(hit[i].normal.y), hitDirX = Math.round(hit[i].normal.x);
						if (hitDirY !== 0) { // hit bottom or top
							if (hitDirY === 1)  // hit the bottom 
								this.y = hit[i].obj.y + hit[i].obj.h;
							else 
							if (hitDirY === -1) // hit the top
								this.y = hit[i].obj.y - this._h;
						} else if(hitDirX !== 0) { // hit right or left
							if (hitDirX === 1) // hit right side
								this.x = hit[i].obj.x + hit[i].obj.w;
							else 
							if(hitDirX === -1) // hit left side
								this.x = hit[i].obj.x - this._w;
						}
					}
				  }),
			shadow = Crafty.e("2D, Canvas, Color")
				.attr({ x: mainEntity._x+(mainEntity._w/3), y: mainEntity._y+mainEntity._h, w: 10, h: mainEntity._h, z: mainEntity._z })
				.origin("center top")
				.color("rgb(145,145,145)");
				
			mainEntity.bind('Moved', function(d){
					if (this._movement.x > 0) {
						shadow.x = mainEntity._x+(mainEntity._w/3);
						
						shadow.rotation = rotationDegree++;
					} else if (this._movement.x < 0) {
						//if(!entity.isPlaying("AmiantoMovingLeft"))
						shadow.x = mainEntity._x+(mainEntity._w/3);
						
						shadow.rotation = rotationDegree--;
					} /*else if (d.y > 0) {
						//if(!entity.isPlaying("AmiantoMovingTowards"))
						//shadow.alpha = 0.0;
					} else if (d.y < 0) {
						//if(!entity.isPlaying("AmiantoMovingTowards"))
					}*/
				})
				.onHit('grnd', function(hit) {
					shadow.alpha = 1.0;
				});
		
		tiledMap.bind("TiledLevelLoaded", function() { // upon loading and creating the tilemap,
			Crafty("grnd").each(function(){ 
				this.addComponent("Collision");
				this.collision();
			});
			Crafty.viewport.centerOn(mainEntity, 1);
			camera.camera(mainEntity);
			//Crafty.viewport.follow(mainEntity, 100, 100);
			mainEntity.gravity('grnd');
			console.log("finished loading and assembling tilemap");
			
		});
    }, function(percent) {
        /// Decompressing progress code goes here.
        console.log("Decompressing: " + (percent * 100) + "%");
    });
	
	// when everything is loaded, 
//	require(elements, function() {					//tiledMapString) {
		
		
		
//	});
		
}, function(){ 
  
});