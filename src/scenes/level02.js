	Crafty.scene("level02", function() {
	
	sc = [];
	var scene = this;
	
	Crafty.background("#000000");
	
	Crafty.audio.play("theme02", -1);
	
	//var MapBytesArray = stringOfByteArrayToArrayOfBytes(gameContainer.loadedStrings[0]);
	
	//LZMA.decompress(MapBytesArray, function(result) {
        //console.log("Decompressed.");
		var mapObj = JSON.parse(gameContainer.getSceneTexts()[0]);
		sc['player'] = new Amianto02(),
		sc['diamond'] = new Diamond(),
		sc['mapBuilder'] = Crafty.e("TiledLevel"), // create an entity with the "TiledLevel" component.
		sc['tiledMap'] = sc.mapBuilder.buildTiledLevel(mapObj, gameContainer.conf.get('renderType')),
		sc['delays'] = Crafty.e("Delay"),
		sc['delimiters'] = [],
		sc['checkpoints'] = [],
		sc['obstacles'] = [];

		sc.tiledMap.bind("TiledLevelLoaded", function() { // upon loading and creating the tilemap,
			
			var playerEnt = sc.player.getEntity();
			
			_.each(sc.tiledMap._layerArray[1].tiles, function(obj) {
			    obj.z = playerEnt._z + 1;
			    obj.alpha = sc.tiledMap._layerArray[1].opacity;
			});
		  
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
			
			sc.delays.delay(function() {
				sc.player.getUp();
			}, 3000);
			
			sc.obstacles = [ 
				new Obstacle({initialX: 13500, initialY: 1100, initialZ: playerEnt._z-1}),
				new Obstacle({initialX: 16300, initialY: 1271, initialZ: playerEnt._z-1}),
				new Obstacle({initialX: 25337, initialY:  960, initialZ: playerEnt._z-1}),
				new Obstacle({initialX: 25785, initialY:  960, initialZ: playerEnt._z-1})
			];
			
		});

		sc.delimiters = [
			Crafty.e("Delimiter, wall").attr({ x: 435, y: 1275, w: 2, h: 180 }), 
			Crafty.e("Delimiter, wall").attr({ x: 37869, y: 1275, w: 2, h: 180 })
		];
		

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
	
		_.each(checkPointsMap, function(obj) {
			var checkpoint = Crafty.e("2D, Collision, checkpoint")
				.attr({x: obj.x, y: obj.y, w: obj.w, h: obj.h});
			checkpoint['value'] = obj.value;
			sc.checkpoints.push(checkpoint);
		});
		//</checkpoints>
		
		// events' declarations
		
		this.one('AmiantoReachedLightArea', function() {
			var playerEnt = sc.player.getEntity();
			Crafty.audio.play("ohthelight",1,0.1);
			utils.fadeSound("theme02", 0, 45);
			utils.fadeSound("ohthelight", 1, 45);
			
			//Crafty.audio.stop();
			
			playerEnt.antigravity();
			playerEnt.disableControl()
				.unbind("Moved")
				.unbind("KeyUp")
				.tween({ x: playerEnt._x + 800 }, 5000)
				.animate("AmiantoRunning9", -1)
				.one("TweenEnd", function() {
				  
					this.pauseAnimation();	
					
					scene.finalAmiantoAttr = { x: this._x, y: this._y, z: this._z, w: this._w, h: this._h },
					scene.screenPos = { x:0, y:0 };
					scene.screenPos.x = ((scene.finalAmiantoAttr.x - Crafty.viewport.width / 2) + scene.finalAmiantoAttr.w/2), 
					scene.screenPos.y = ((scene.finalAmiantoAttr.y - Crafty.viewport.height / 2) + scene.finalAmiantoAttr.h/2);
				
					sc['explosion'] = Crafty.e("2D, " + gameContainer.conf.get('renderType') + ", colorsExplosion, SpriteAnimation")
							.attr({ 
								x: scene.screenPos.x,
								y: scene.screenPos.y,
								w: Crafty.viewport.width,
								h: Crafty.viewport.height,
								z: scene.finalAmiantoAttr.z+4
							})
							.reel("Kaboom!",4125,[
								[0,0],[1,0],[2,0],[3,0],[4,0],
								[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],
								[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],
								[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],
								[5,0],[6,0],[7,0],[8,0],[12,0],[13,0],[14,0]
							]);
					
					sc.explosion
						.animate("Kaboom!")
						.bind("AnimationEnd", function(){ 
							this.destroy();
						})
						.bind("FrameChange", function create_white_layer(obj){ 
							if(obj.currentFrame==5){
								this.unbind("FrameChange", create_white_layer);
								sc['coloredLayer'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Color")
									.attr({ 
										x: scene.screenPos.x,
										y: scene.screenPos.y,
										w: Crafty.viewport.width, 
										h: Crafty.viewport.height, 
										z: scene.finalAmiantoAttr.z+3, 
										alpha: 1.0 
									})
									.color("#FFFFFF");
							}
						});
						
					var amiantoToBlancheOptions = { 
						initialX: scene.finalAmiantoAttr.x-80, 
						initialY: scene.finalAmiantoAttr.y-30, 
						initialZ: scene.finalAmiantoAttr.z+5, 
						finalY: scene.finalAmiantoAttr.y-300, 
						finalX: scene.finalAmiantoAttr.x+600, 
						//finalZ: scene.finalAmiantoAttr.z+100, 
						flightTime: 3000
					};
					sc['amiantoToBlanche'] = new AmiantoToBlanche(amiantoToBlancheOptions);
					sc.amiantoToBlanche.turnToBlanche();
					this.destroy();
					
				});
		});
		
		this.one('LevelTransition', function() {
			gameContainer.runScene("level03", { backgroundColor:"#FFFFFF", ellipsisColor:"#000000" });
		});
		
    /*}, function(percent) {
        /// Decompressing progress code goes here.
        console.log("Decompressing: " + (percent * 100) + "%");
    });*/
		
}, function(){ 
	//get rid of unwanted bindings, functions and files
	Crafty.viewport.x = 0,
	Crafty.viewport.y = 0;
	resources.removeAudio("level02");
});