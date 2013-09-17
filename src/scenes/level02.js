Crafty.scene("level02", function(obj) {
	
	var elements = [
		"src/interfaces/info.js",
        //"text!src/scenes/tilemaps/level02.json",
	];
	
	Crafty.init(2400, 32000); // reset stage to accommodate the tilemap
	Crafty.viewport.init(800, 600);
 	Crafty.background("#000000");
	
	// when everything is loaded, 
	require(elements, function() {					//tiledMapString) {
		
		var mapBuider = Crafty.e("TiledLevel"), // create an entity with the "TiledLevel" component.
			tiledMap = mapBuider.tiledLevel("src/scenes/tilemaps/level02.min.json", gameContainer.conf.get('renderType')),
			camera = Crafty.e("Camera"),
			entitySpeed = 4,
			startingPoint = { x: 384, y: 1232 },
			entityW = 30,
			entityH = 50,
			mainEntity = Crafty.e("2D, Canvas, Color, Twoway, Gravity, Collision")
				.attr({ x: startingPoint.x, y: startingPoint.y, w: entityW, h: entityH, z: 1000 })
				.color("red")
				.twoway(entitySpeed, entitySpeed)
				.onHit('solid', function(hit) {
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
				  });
				/*.bind('Moved', function(e) {
				  if(this._x<0 || this._y<0 || this._x>(MAP_WIDTH - entity._w) || this._y>(MAP_HEIGHT - entity._h)){
					  this.attr({x: e.x, y: e.y});
					  console.log(this.x+" "+this.y);
				  }
				  });*/
				//.gravity('grnd'); // draw the level
		
		tiledMap.bind("TiledLevelLoaded", function() { // upon loading and creating the tilemap,
			
			Crafty.viewport.centerOn(mainEntity, 1);
			camera.camera(mainEntity);
			//Crafty.viewport.follow(mainEntity, 100, 100);
			mainEntity.gravity('grnd');
			console.log("finished loading and assembling tilemap");
			
		});
		
	});
		
}, function(){ 
  
});