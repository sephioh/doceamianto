Amianto02 = BaseEntity.extend({
    defaults: {
        'speed' : 4,
		'startingPoint' : { x: 384, y: 1322 },
		'width' : 94,
		'height' : 126,
		'withDiamond' : 0
    },
    initialize: function() {
    	var model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Twoway, Gravity, Collision, SpriteAnimation, amianto02")
				.attr({ 
					x: model.get('startingPoint').x, 
					y: model.get('startingPoint').y, 
					w: model.get('width'), 
					h: model.get('height'), 
					z: 300 
				}), 
			shadow = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Color");
			entity['poly'] = new Crafty.polygon([[32,60],[47,38],[62,60],[47,116]]);
			entity.poly['_shiningEyes'] = false,
			entity.poly['topMost'] = entity.poly.getSideMostPoint("top"),
			entity.poly['bottomMost'] = entity.poly.getSideMostPoint("bottom"),
			entity.poly['rightMost'] = entity.poly.getSideMostPoint("right"),
			entity.poly['leftMost'] = entity.poly.getSideMostPoint("left");
			entity
				.twoway(model.get('speed'), model.get('speed'))
				.onHit('grnd', function(hit) {
				  var justHit = false,
					  diamondInt = model.get('withDiamond'),
					  diamondStr = diamondInt.toString();
				  
				  if((this._currentReelId == "AmiantoJumpingFalling" + diamondStr) || (this._currentReelId == "AmiantoJumpingUp" + diamondStr)){
					  justHit = true;  
					  
					  if (diamondInt === 0) this.playAnimation("AmiantoStandingStill0", 73*5, -1);
					  else
					  if (diamondInt > 0) this.playAnimation("AmiantoStandingStill"+diamondStr, 5, -1);
					  
				  }
				  for (var i = 0; i < hit.length; i++) {
						var hitDirY = Math.round(hit[i].normal.y);
						if (hitDirY !== 0) { 						// hit bottom or top
							if (hitDirY === -1) { // hit the top, stop falling
								
								if((!this.isDown("UP_ARROW") && !this.isDown("W")) || 
								  ((this.isDown("UP_ARROW") || this.isDown("W")) && this._isfalling)) 
									this._up = false;
								
								if((!this._up && justHit) || this._currentReelId === null)
									this.y = ((hit[i].obj.y - this._h) + (this._h - this.poly.bottomMost))
								
								if(this._falling) 
									this._falling = false;
								
								return;
							}
						}
					}
				  })
				.onHit('wall', function(hit) {
					for (var i = 0; i < hit.length; i++) {
						var hitDirX = Math.round(hit[i].normal.x)
						if (hitDirX === 1) // hit right side
								this.x = hit[i].obj._x + this._w;
							else 
							if(hitDirX === -1) // hit left side
								this.x = hit[i].obj._x - hit[i].obj._w;
					}
				  })
				.onHit('diamond', function(hit) { 
				      if(!this._shiningEyes) { 
					  this._shiningEyes = true; // _shiningEyes true makes it possible to pick up the diamond
				      }
				  }, function() {
				     this._shiningEyes = false;
				  })
				.onHit('upStairs', function(hit) {
					for (var i = 0; i < hit.length; i++) {
						var hitDirY = Math.round(hit[i].normal.y), hitDirX = Math.round(hit[i].normal.x);
						if (hitDirY !== 0) { // hit bottom or top
							if (hitDirY === 1)  // hit the bottom 
								console.log("");
							else 
							if (hitDirY === -1) // hit the top
								console.log("");
						} else if(hitDirX !== 0) { // hit right or left
							if (hitDirX === 1) // hit right side
								console.log("");
							else 
							if(hitDirX === -1) // hit left side
								console.log("");
						}
					}
				  })
				.onHit('downStairs', function(hit) {
					for (var i = 0; i < hit.length; i++) {
						var hitDirY = Math.round(hit[i].normal.y), hitDirX = Math.round(hit[i].normal.x);
						if (hitDirY !== 0) { // hit bottom or top
							if (hitDirY === 1)  // hit the bottom 
								console.log("");
							else 
							if (hitDirY === -1) // hit the top
								console.log("");
						} else if(hitDirX !== 0) { // hit right or left
							if (hitDirX === 1) // hit right side
								console.log("");
							else 
							if(hitDirX === -1) // hit left side
								console.log("");
						}
					}
				  })
				.onHit('light', function(hit) {
					// "cast" shadow and rotate
				  })
				.onHit('solid', function(hit) {
					for (var i = 0; i < hit.length; i++) {
						var hitDirX = Math.round(hit[i].normal.x);
						if(hitDirX !== 0) {
							if (hitDirX === 1) {
								this.x = this._x + 4;
							} 
						}
					}
				})
				.bind('KeyDown', function(e){ 
					if(e.key ==  Crafty.keys['ENTER'] || e.key ==  Crafty.keys['SPACE']) {
					    if((!model.get('withDiamond') && this._shiningEyes) || model.get('withDiamond'))
						model._pickUpDiamond(); // pick/drop diamond
					}
				  })
				.bind('KeyUp', function(e) {
					var k = e.key, diamond = model.get('withDiamond').toString();
					
					if((k == Crafty.keys['LEFT_ARROW'] || k == Crafty.keys['A']) ||
					  (k == Crafty.keys['RIGHT_ARROW'] || k == Crafty.keys['D'])) 
						if(this.isPlaying("AmiantoRunning0"))
							this.playAnimation("AmiantoStandingStill0", 73*5, -1);
						else
						if(this.isPlaying("AmiantoRunning" + diamond))
							this.playAnimation("AmiantoStandingStill" + diamond, 5, -1);
				})
				.animate("AmiantoStandingUp", 0, 0, 12)
				.animate("AmiantoStandingStill0", [
				  [12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],
				  [12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],
				  [12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],
				  [12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],
				  [12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],
				  [12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],
				  [12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],
				  [0,1],[0,1],[0,1],[0,1],[12,0],[11,0],[11,0],[11,0],[11,0] 
				]) // 73 frames
				.animate("AmiantoStandingStill1", [[2,2]])
				.animate("AmiantoStandingStill2", [[2,3]])
				.animate("AmiantoStandingStill3", [[2,4]])
				.animate("AmiantoStandingStill4", [[2,5]])
				.animate("AmiantoStandingStill5", [[2,6]])
				.animate("AmiantoStandingStill6", [[2,7]])
				.animate("AmiantoStandingStill7", [[2,8]])
				.animate("AmiantoStandingStill8", [[2,9]])
				.animate("AmiantoStandingStill9", [[2,10]])
				.animate("AmiantoJumpingUp0", [[9,1],[9,1],[10,1]])
				.animate("AmiantoJumpingUp1", [[9,2],[9,2],[10,2]])
				.animate("AmiantoJumpingUp2", [[9,3],[9,3],[10,3]])
				.animate("AmiantoJumpingUp3", [[9,4],[9,4],[10,4]])
				.animate("AmiantoJumpingUp4", [[9,5],[9,5],[10,5]])
				.animate("AmiantoJumpingUp5", [[9,6],[9,6],[10,6]])
				.animate("AmiantoJumpingUp6", [[9,7],[9,7],[10,7]])
				.animate("AmiantoJumpingUp7", [[9,8],[9,8],[10,8]])
				.animate("AmiantoJumpingUp8", [[9,9],[9,9],[10,9]])
				.animate("AmiantoJumpingUp9", [[9,10],[9,10],[10,10]])
				.animate("AmiantoJumpingFalling0", [[11,1],[11,1],[12,1]])
				.animate("AmiantoJumpingFalling1", [[11,2],[11,2],[12,2]])
				.animate("AmiantoJumpingFalling2", [[11,3],[11,3],[12,3]])
				.animate("AmiantoJumpingFalling3", [[11,4],[11,4],[12,4]])
				.animate("AmiantoJumpingFalling4", [[11,5],[11,5],[12,5]])
				.animate("AmiantoJumpingFalling5", [[11,6],[11,6],[12,6]])
				.animate("AmiantoJumpingFalling6", [[11,7],[11,7],[12,7]])
				.animate("AmiantoJumpingFalling7", [[11,8],[11,8],[12,8]])
				.animate("AmiantoJumpingFalling8", [[11,9],[11,9],[12,9]])
				.animate("AmiantoJumpingFalling9", [[11,10],[11,10],[12,10]])
				.animate("AmiantoRunning0", [[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[1,1]])
				.animate("AmiantoRunning1", [[4,2],[5,2],[6,2],[7,2]])
				.animate("AmiantoRunning2", [[4,3],[5,3],[6,3],[7,3]])
				.animate("AmiantoRunning3", [[4,4],[5,4],[6,4],[7,4]])
				.animate("AmiantoRunning4", [[4,5],[5,5],[6,5],[7,5]])
				.animate("AmiantoRunning5", [[4,6],[5,6],[6,6],[7,6]])
				.animate("AmiantoRunning6", [[4,7],[5,7],[6,7],[7,7]])
				.animate("AmiantoRunning7", [[4,8],[5,8],[6,8],[7,8]])
				.animate("AmiantoRunning8", [[4,9],[5,9],[6,9],[7,9]])
				.animate("AmiantoRunning9", [[4,10],[5,10],[6,10],[7,10]])
				.setName('Player')
				.bind('Moved', function(prevPos) {
					// controlling animations
					
					if(this.isPlaying("AmiantoStandingStill")) this.pauseAnimation();
						
					var moved = "", diamond = model.get('withDiamond').toString();
					
					// if this moved right
					if(this._x > prevPos.x)
						moved = "right";
					else
					// if this moved up
					if(this._y < prevPos.y) 
						moved = "up";
					else
					// if this moved left
					if(this._x < prevPos.x)
						moved = "left";
					else
					// if this moved down
					if(this._y > prevPos.y) 
						moved = "down";
					
					switch(moved) {
					  case "up" :
						if(this.isPlaying("AmiantoStandingStill" + diamond) || 
						  (this._currentReelId != "AmiantoJumpingUp" + diamond && this._currentReelId != "AmiantoJumpingFalling" + diamond))
							this.playAnimation("AmiantoJumpingUp" + diamond, 15, 0, 0);
						break;
					  case "down" :
						if(this._currentReelId != "AmiantoJumpingUp" + diamond && this._currentReelId == "AmiantoJumpingUp" + diamond)
							this.playAnimation("AmiantoJumpingFalling" + diamond, 15, 0, 0);
						break;
					  case "left":
						if(!this._flipX) 	// if moved left and is unflipped
							this.flip("X");						// flip sprite
						if(!this.isPlaying("AmiantoRunning" + diamond) && !this._up)
						    if(!model.get('withDiamond')) {
							this.playAnimation("AmiantoRunning0", 40, -1);
						    } else {
							this.playAnimation("AmiantoRunning" + diamond, 20, -1);
						    }
						break;
					  case "right": 
						if(this._flipX) 							// if moved right and is flipped 
							this.unflip("X");					// unflip sprite
						if(!this.isPlaying("AmiantoRunning" + diamond) && !this._up)
						    if(!model.get('withDiamond')) {
							this.playAnimation("AmiantoRunning0", 40, -1);
						    } else {
							this.playAnimation("AmiantoRunning" + diamond, 20, -1);
						    }
						break;
					}
				})
				.bind("DiamondGrew", function(to) {
					var diamond = this.get('withDiamond').toString();
					model.set({ 'withDiamond' : to });
				})
				.disableControl();
		
		model.set({'entity' : entity});
		
    },	
    _pickUpDiamond: function() { 
	var diamond = Crafty("diamond"), entity = this.getEntity();
	if(!diamond._held && entity._shiningEyes) {
		diamond._held = true;
		diamond.alpha = 0.0;
		this.set({ 'withDiamond' : diamond.value });
		entity.playAnimation("AmiantoStandingStill" + diamond.value.toString(), 5, -1);
	} else if(diamond._held) {
		diamond._held = false;
		diamond.attr({x: entity._x, y: entity._y, alpha: 1.0});
		this.set({ 'withDiamond' : 0 });
		entity.playAnimation("AmiantoStandingStill0", 73*5, -1);
	}
    },
});