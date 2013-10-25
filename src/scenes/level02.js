	Crafty.scene("level02", function() {
	
	sc = [];
	var scene = this;
	
	Crafty.background("#000000");
	
	Crafty.audio.play("theme02", -1);
	
	//var MapBytesArray = stringOfByteArrayToArrayOfBytes(gameContainer.loadedStrings[0]);
	
	//LZMA.decompress(MapBytesArray, function(result) {
        //console.log("Decompressed.");
		var mapObj = JSON.parse(gameContainer.loadedStrings[0]);
		sc['player'] = new Amianto02(),
		sc['diamond'] = new Diamond(),
		sc['mapBuider'] = Crafty.e("TiledLevel"), // create an entity with the "TiledLevel" component.
		sc['tiledMap'] = sc.mapBuider.buildTiledLevel(mapObj, gameContainer.conf.get('renderType')),
		sc['camera'] = Crafty.e("Camera"),
		sc['delays'] = Crafty.e("Delay"),
		sc['delimiters'] = [],
		sc['checkpoints'] = [];
		//sc['obstacle'] = new Obstacle();
		
		sc.tiledMap.bind("TiledLevelLoaded", function() { // upon loading and creating the tilemap,
			
			var playerEnt = sc.player.getEntity();
			
			_.each(sc.tiledMap._layerArray[1].tiles, function(obj) {
			    obj.z = playerEnt._z + 1;
			    obj.alpha = sc.tiledMap._layerArray[1].opacity;
			});
		  
			// setting collision for tiles
			
			Crafty("upStairs").each(function() { 
				this.collision(new Crafty.polygon([[0,32],[32,0]]));
			});
			Crafty("downStairs").each(function() { 
				this.collision(new Crafty.polygon([[0,0],[32,32]]));
			});
			
			//Crafty.viewport.centerOn(playerEnt, 1);
			sc.camera.camera(playerEnt);
			
			console.log("finished loading and assembling tilemap");
			
			sc.delays.delay(function() {
				playerEnt.bind("AnimationEnd", function stand_up() {
					this.unbind("AnimationEnd", stand_up)
						.collision(this.poly)
						.gravity()
						.enableControl();
				})
				.playAnimation("AmiantoStandingUp", 13*8, 0);
			}, 3000);
			
		});

		//<delimiters>
		var delimitersMap = {
			left: 	{ x: 435, y: 1275, w: 2, h: 180, shape: [[0,0],[1,0],[1,180],[0,180]] }, 
			right: 	{ x: 37869, y: 1275, w: 2, h: 180, shape: [[0,0],[1,0],[1,180],[0,180]] }
		};
	
		_.each(delimitersMap, function(obj) {
			var delimiter = Crafty.e("2D, Collision, wall, WiredHitBox")
				.attr({x: obj.x, y: obj.y, w: obj.w, h: obj.h});
			sc.delimiters.push(delimiter);
		});
		//</delimiters>

		//<checkpoints>
		var checkPointsMap = {
			checkpoint1: { x: 7008, y: 1275, w: 1, h: 180, shape: [[0,0],[1,0],[1,180],[0,180]], value: 1 },
			checkpoint2: { x: 10432, y: 1275, w: 1, h: 180, shape: [[0,0],[1,0],[1,180],[0,180]], value: 2 },
			checkpoint3: { x: 12992, y: 1275, w: 1, h: 180, shape: [[0,0],[1,0],[1,180],[0,180]], value: 3 },
			checkpoint4: { x: 16672, y: 1275, w: 1, h: 180, shape: [[0,0],[1,0],[1,180],[0,180]], value: 4 },
			checkpoint5: { x: 18912, y: 1568, w: 1, h: 180, shape: [[0,0],[1,0],[1,180],[0,180]], value: 5 },
			checkpoint6: { x: 22016, y: 1504, w: 1, h: 180, shape: [[0,0],[1,0],[1,180],[0,180]], value: 6 },
			checkpoint7: { x: 24896, y: 992, w: 1, h: 180, shape: [[0,0],[1,0],[1,180],[0,180]], value: 7 },
			checkpoint8: { x: 28480, y: 320, w: 1, h: 180, shape: [[0,0],[1,0],[1,180],[0,180]], value: 8 },
			checkpoint9: { x: 31456, y: 736, w: 1, h: 180, shape: [[0,0],[1,0],[1,180],[0,180]], value: 9 },
			checkpoint10: { x: 32320, y: 736, w: 1, h: 180, shape: [[0,0],[1,0],[1,180],[0,180]], value: 10 }
		};
	
		_.each(checkPointsMap, function(obj) {
			var checkpoint = Crafty.e("2D, Collision, checkpoint, WiredHitBox")
				.attr({x: obj.x, y: obj.y, w: obj.w, h: obj.h});
			checkpoint['value'] = obj.value;
			sc.checkpoints.push(checkpoint);
		});
		//</checkpoints>

		// events' declarations
				
		this.amiantoCameIntoLight = function() {
			var playerEnt = sc.player.getEntity();
			
			playerEnt
				.tween({ x: playerEnt._x+1500 }, 1500)//{ x: 37152 }, 20
				.playAnimation("AmiantoRunning9", 4*5, -1)
				.bind("EnterFrame", function(){ sc.camera.set(this); })
				.bind("TweenEnd", function keep_ahead() {
				  
					this.unbind("TweenEnd", keep_ahead).pauseAnimation();	
					
					scene.finalAmiantoAttr = {x: this._x, y: this._y, z: this._z, w: this._w, h: this._h},
					scene.screenPos = {x:0,y:0};
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
							.animate("Kaboom!",[
								[0,0],[1,0],[2,0],[3,0],[4,0],
								[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],
								[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],
								[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],
								[12,0],[13,0],[14,0]
							]);
					
					sc.explosion
						.bind("AnimationEnd", function(){ 
							this.destroy();
						})
						.bind("FrameChange", function create_white_layer(obj){ 
							if(obj.frameNumber==5){
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
						})
						.playAnimation("Kaboom!", 29*5);
						
					var amiantoToBlancheOptions = { 
						  initialX: scene.finalAmiantoAttr.x-80, 
						  initialY: scene.finalAmiantoAttr.y-30, 
						  initialZ: scene.finalAmiantoAttr.z+5, 
						  finalY: scene.finalAmiantoAttr.y-300, 
						  finalX: scene.finalAmiantoAttr.x+800, 
						  //finalZ: scene.finalAmiantoAttr.z+100, 
						  flightTime: 450 
					};
					sc['amiantoToBlanche'] = new AmiantoToBlanche(amiantoToBlancheOptions);
					Crafty.trigger("StartAmiantoToBlancheAnimation");
					this.destroy();
					
				});
		}		
		
		this.bind('AmiantoReachedLightArea', this.amiantoCameIntoLight);
		
		this.loadLevel03 = function() {
			//this code is to be replaced when work on third level begins
			sc['continua'] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Tween, Text")
				.attr({ x: scene.screenPos.x+110, 
					  y: scene.screenPos.y, 
					  w: 147, 
					  h: 520, 
					  z: scene.finalAmiantoAttr.z+4, 
					  alpha: 0.0 })
				.text("Continua...")
				.textFont({ family: 'Arial', size : '30px' })
				.textColor("#000000");
			sc.continua.tween({ alpha: 1.0 }, 150);
		}
		
		this.bind('LevelTransition', this.loadLevel03);
		
    /*}, function(percent) {
        /// Decompressing progress code goes here.
        console.log("Decompressing: " + (percent * 100) + "%");
    });*/
		
}, function(){ 
  
});