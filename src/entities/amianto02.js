Amianto02 = BaseEntity.extend({
	defaults: {
	  'speed' : 4,
	  'startingSpeed': 4,
	  'startingPoint' : { x: 500, y: 1324 },
	  'width' : 94,
	  'height' : 126,
	  'withDiamond' : 0,
	  'strength' : 6
	},
	initialize: function() {
		var model = this,
		entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", CustomControls, Collision, SpriteAnimation, Tween, amianto02")
			.attr({ 
				x: model.get('startingPoint').x, 
				y: model.get('startingPoint').y, 
				w: model.get('width'), 
				h: model.get('height'), 
				z: 301,
				pushingObstacle: false,
			});
		entity['poly'] = new Crafty.polygon([[17,60],[47,38],[77,60],[55,116],[39,116]]);
		entity
			.twowayer(model.get('speed'), model.get('speed'), ['LEFT_ARROW','UP_ARROW','RIGHT_ARROW','SPACE'])
			.onHit('grnd', function(hit) {
				var justHit = false,
					diamondInt = model.get('withDiamond'),
					diamondStr = diamondInt.toString();
				
				if(this._currentReelId == "AmiantoJumpingFalling" + diamondStr || 
				   this._currentReelId == "AmiantoJumpingUp" + diamondStr || 
				   (this._currentReelId == "AmiantoRunning" + diamondStr && this._falling && this._up) ||
				   (!this.isPlaying("AmiantoStandingUp") && this._currentReelId == "AmiantoStandingUp")) {
					justHit = true;  
					
					if (!diamondInt) this.animate("AmiantoStandingStill0", -1);
					else
					if (diamondInt > 0) this.animate("AmiantoStandingStill" + diamondStr, -1);
					
				}
				for (var i = 0; i < hit.length; i++) {
					var hitDirY = Math.round(hit[i].normal.y);
					if (hitDirY !== 0) { 						// hit bottom or top
						if (hitDirY === -1) { // hit the top, stop falling
							try{
								if((!this.isDown("UP_ARROW") && !this.isDown("W")) || 
								  ((this.isDown("UP_ARROW") || this.isDown("W")) && this._falling)) 
									this._up = false;
								
								if((justHit && (!this._up || this._falling)) || 
								  this._onStairs)
									this.y += Math.ceil(hit[i].normal.y * -hit[i].overlap);
								
								if(this._falling) 
									this._falling = false;
								
								return;
							} catch (e){ 
								
							}
						}
						
					}
				}
			  })
			/*
			.onHit('ceiling', function(hit){
				for (var i = 0; i < hit.length; i++){
					var hitDirY = Math.round(hit[i].normal.y);
					if(hitDirY === 1){
						this._up = false,
						this.y += Math.ceil(hit[i].normal.y * -hit[i].overlap);
						return;
					}   
				}
			})
			*/
			.onHit('wall', function(hit) {
				for (var i = 0; i < hit.length; i++) {
					this.x += Math.ceil(hit[i].normal.x * -hit[i].overlap);
				}
			  })
			.onHit('stairs', function(hit) {
				var justHit = false,
				    diamondInt = model.get('withDiamond'),
				    diamondStr = diamondInt.toString(),
				    speed = model.get('speed'),
				    isfalling = ((this._currentReelId == "AmiantoJumpingFalling" + diamondStr || 
					    this._currentReelId == "AmiantoJumpingUp" + diamondStr ) && this._falling);
				
				if((isfalling || this._currentReelId == "AmiantoRunning" + diamondStr))
					justHit = true;
				    
				for (var i = 0; i < hit.length; i++) {
					var actualStairs = (hit[i].obj.__c.upStairs || hit[i].obj.__c.downStairs);
					
					if(isfalling && actualStairs)
						if (!diamondInt) this.animate("AmiantoStandingStill0", -1);
						else
						if (diamondInt > 0) this.animate("AmiantoStandingStill"+diamondStr, -1);
					
					if(justHit)
						if(hit[i].obj.__c.upStairs || hit[i].obj.__c.upStairsFirstStepDown) {
							speed = speed^2===0?speed:speed-1;
							this.multiway(speed/2, {
								LEFT_ARROW: 135,
								RIGHT_ARROW: 0,
								A: 135,
								D: 0,
								Q: 135
							});
							this._onStairs = true;
							this._onUpStairs = true;
						}
						else
						if(hit[i].obj.__c.downStairs || hit[i].obj.__c.downStairsFirstStepDown) {
							speed = speed^2===0?speed:speed-1;
							this.multiway(speed/2, {
								LEFT_ARROW: 180,
								RIGHT_ARROW: 45,
								A: 180,
								D: 45,
								Q: 180
							});
							this._onStairs = true;
							this._onDownStairs = true;
						}
					
					if(justHit && this._up && actualStairs) 
						this._up = false;
					
					if(!this._up && justHit && actualStairs)
						this.y += Math.ceil(hit[i].normal.y * -hit[i].overlap),
						justHit = false;
					
					if(this._falling && actualStairs) 
						this._falling = false;
				}
			  }, function() {
				this.multiway(model.get('speed'), {
					LEFT_ARROW: 180,
					RIGHT_ARROW: 0,
					A: 180,
					D: 0,
					Q: 180
				});
				this._onStairs = false;
				this._onUpStairs = false;
				this._onDownStairs = false;
			  })
			.onHit('diamond', function() { 
			      if(!this._shiningEyes) { 
				  this._shiningEyes = true; // _shiningEyes true makes it possible to pick up the diamond
			      }
			  }, function() {
			    this._shiningEyes = false;
			  })
			.onHit('water', function() { 
				var currentDiamondValue = Crafty("diamond").value,
				    currentCheckPoint = sc.checkpoints[currentDiamondValue - 1];
				if(!model.get('withDiamond'))
					model._holdDiamond();
				this.x = currentCheckPoint._x;
				this.y = currentCheckPoint._y;
			  })
			.onHit('checkpoint', function(hit) { 
				for (var i = 0; i < hit.length; i++) {
					var currentDiamondValue = Crafty("diamond").value,
					    checkPointValue = hit[i].obj['value'];
					if(currentDiamondValue < checkPointValue && model.get('withDiamond') && checkPointValue<10) {
						sc.diamond.grow(checkPointValue);
					} 
					else 
					if(checkPointValue==9) {
						if(!model.get('withDiamond'))
							this.x += Math.ceil(hit[i].normal.x * -hit[i].overlap);
						else
							model._pickUpDiamond = function(){ return };
					}
					else 
					if(checkPointValue==10) {
						Crafty.trigger("AmiantoReachedLightArea");
					}
				}
			  })
			.onHit('obstacle', function(hit) {
				for (var i = 0; i < hit.length; i++) {
					// If collision is horizontally
					if(hit[i].normal.x != 0) {
						if(hit[i].obj.movable && 		  // if obstacle didnt fall into water and
						   !this._up &&                  // Amianto is not jumping and
						   !model.get('withDiamond')){  // Amianto isn't holding the diamond
								//this.x += (hit[i].normal.x * -hit[i].overlap);
								hit[i].obj.x -= (hit[i].normal.x * -hit[i].overlap);
								model._setSpeed(1, false);
								if(this._currentReelId != "AmiantoPushing")
									this.animate("AmiantoPushing", -1);
								this.pushingObstacle = true;
								hit[i].obj.wasMoved = true;
						} else if(this._up){
							this.x += Math.ceil(hit[i].normal.x * -hit[i].overlap);
							this.pushingObstacle = false;
						} else if(!hit[i].obj.movable || model.get('withDiamond')){
							this.pushingObstacle = false;
							this.x += Math.ceil(hit[i].normal.x * -hit[i].overlap);
						} else {
							// Amianto dont cross the obstacle at x axis, she dont
							// cross y axis because obstacle has grnd component
							this.x += Math.ceil(hit[i].normal.y * -hit[i].overlap);
							this.pushingObstacle = false;
						}
					} else {
						this.pushingObstacle = false;
						model._setSpeed(model.get('startingSpeed'), false);
					}
				}
			}, function() {
				if(!this.isDown('LEFT_ARROW') && !this.isDown('RIGHT_ARROW') && !this.isDown('A') && !this.isDown('D') && !this.isDown('Q')) {
					if(model.get('withDiamond')){
						var diamond = model.get('withDiamond').toString();
						this.animate("AmiantoStandingStill" + diamond, -1);
					} else {
						this.animate("AmiantoStandingStill0", -1);
					}
				}
				model._setSpeed(model.get('startingSpeed'), false);
				this.pushingObstacle = false;
			})
			.bind('KeyDown', function(e){ 
				if((e.key ==  Crafty.keys['ENTER'] || e.key ==  Crafty.keys['SPACE']) &&
				  ((!model.get('withDiamond') && this._shiningEyes) || model.get('withDiamond')) && 
				  (this.hit('grnd') || this._onStairs))
					model._pickUpDiamond(); // pick/drop diamond
			  })
			.bind('KeyUp', function(e) {
				var k = e.key, diamond = model.get('withDiamond').toString();
				if((k == Crafty.keys['LEFT_ARROW'] || k == Crafty.keys['A']) ||
				  (k == Crafty.keys['RIGHT_ARROW'] || k == Crafty.keys['D'])) 
					if(this.isPlaying("AmiantoRunning0"))
						this.animate("AmiantoStandingStill0", -1);
					else
					if(this.isPlaying("AmiantoRunning" + diamond))
						this.animate("AmiantoStandingStill" + diamond, -1);
			})
			.reel("AmiantoStandingUp", 2600, 0, 0, 12)
			.reel("AmiantoStandingStill0", 6125, [
			  [12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],
			  [12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],
			  [12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],
			  [12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],[12,0],
			 [0,1],[0,1],[0,1],[0,1],[12,0],[11,0],[11,0],[11,0],[11,0] 
			]) // 57 frames
			.reel("AmiantoStandingStill1", 1, [[2,2]])
			.reel("AmiantoStandingStill2", 1, [[2,3]])
			.reel("AmiantoStandingStill3", 1, [[2,4]])
			.reel("AmiantoStandingStill4", 1, [[2,5]])
			.reel("AmiantoStandingStill5", 1, [[2,6]])
			.reel("AmiantoStandingStill6", 1, [[2,7]])
			.reel("AmiantoStandingStill7", 1, [[2,8]])
			.reel("AmiantoStandingStill8", 1, [[2,9]])
			.reel("AmiantoStandingStill9", 1, [[2,10]])
			.reel("AmiantoJumpingUp0", 375, [[9,1],[9,1],[10,1]])
			.reel("AmiantoJumpingUp1", 375, [[9,2],[9,2],[10,2]])
			.reel("AmiantoJumpingUp2", 375, [[9,3],[9,3],[10,3]])
			.reel("AmiantoJumpingUp3", 375, [[9,4],[9,4],[10,4]])
			.reel("AmiantoJumpingUp4", 375, [[9,5],[9,5],[10,5]])
			.reel("AmiantoJumpingUp5", 375, [[9,6],[9,6],[10,6]])
			.reel("AmiantoJumpingUp6", 375, [[9,7],[9,7],[10,7]])
			.reel("AmiantoJumpingUp7", 375, [[9,8],[9,8],[10,8]])
			.reel("AmiantoJumpingUp8", 375, [[9,9],[9,9],[10,9]])
			.reel("AmiantoJumpingUp9", 375, [[9,10],[9,10],[10,10]])
			.reel("AmiantoJumpingFalling0", 375, [[11,1],[11,1],[12,1]])
			.reel("AmiantoJumpingFalling1", 375, [[11,2],[11,2],[12,2]])
			.reel("AmiantoJumpingFalling2", 375, [[11,3],[11,3],[12,3]])
			.reel("AmiantoJumpingFalling3", 375, [[11,4],[11,4],[12,4]])
			.reel("AmiantoJumpingFalling4", 375, [[11,5],[11,5],[12,5]])
			.reel("AmiantoJumpingFalling5", 375, [[11,6],[11,6],[12,6]])
			.reel("AmiantoJumpingFalling6", 375, [[11,7],[11,7],[12,7]])
			.reel("AmiantoJumpingFalling7", 375, [[11,8],[11,8],[12,8]])
			.reel("AmiantoJumpingFalling8", 375, [[11,9],[11,9],[12,9]])
			.reel("AmiantoJumpingFalling9", 375, [[11,10],[11,10],[12,10]])
			.reel("AmiantoRunning0", 1000, [[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[1,1]])
			.reel("AmiantoRunning1", 500, [[4,2],[5,2],[6,2],[7,2]])
			.reel("AmiantoRunning2", 500, [[4,3],[5,3],[6,3],[7,3]])
			.reel("AmiantoRunning3", 500, [[4,4],[5,4],[6,4],[7,4]])
			.reel("AmiantoRunning4", 500, [[4,5],[5,5],[6,5],[7,5]])
			.reel("AmiantoRunning5", 500, [[4,6],[5,6],[6,6],[7,6]])
			.reel("AmiantoRunning6", 500, [[4,7],[5,7],[6,7],[7,7]])
			.reel("AmiantoRunning7", 500, [[4,8],[5,8],[6,8],[7,8]])
			.reel("AmiantoRunning8", 500, [[4,9],[5,9],[6,9],[7,9]])
			.reel("AmiantoRunning9", 500, [[4,10],[5,10],[6,10],[7,10]])
			.reel("AmiantoPushing", 625, 0, 11, 4)
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
				
				if(!this.pushingObstacle){
					switch(moved) {
						case "up" : 
							if(this._currentReelId != "AmiantoJumpingUp" &&
							  (this.isPlaying("AmiantoStandingStill" + diamond) || 
							  (this._currentReelId != "AmiantoJumpingUp" + diamond && this._currentReelId != "AmiantoJumpingFalling" + diamond)))
								this.animate("AmiantoJumpingUp" + diamond);
							break;
						case "down" : 
							if(this._currentReelId != "AmiantoJumpingFalling" &&
							  ((this._currentReelId == "AmiantoJumpingUp" + diamond && !this.isPlaying("AmiantoJumpingUp" + diamond)) ||
							  (!this._onStairs && (this._currentReelId=="AmiantoRunning" + diamond || this._currentReelId=="AmiantoStandingStill" + diamond))))
								this.animate("AmiantoJumpingFalling" + diamond);
							break;
						case "left":
							if(!this._flipX) 	// if moved left and is unflipped
								this.flip("X");	// flip sprite
							if((!this.isPlaying("AmiantoRunning" + diamond) && !this._up) && 
							  (this._currentReelId != "AmiantoJumpingUp" + diamond && this._currentReelId != "AmiantoJumpingFalling" + diamond && !this._up)) {
							    if(!model.get('withDiamond')) 
								this.animate("AmiantoRunning0", -1);
							    else 
								this.animate("AmiantoRunning" + diamond, -1);
							}
							    
							break;
						case "right": 
							if(this._flipX) 							// if moved right and is flipped 
								this.unflip("X");					// unflip sprite
							if((!this.isPlaying("AmiantoRunning" + diamond) && !this._up) &&
							  (this._currentReelId != "AmiantoJumpingUp" + diamond && this._currentReelId != "AmiantoJumpingFalling" + diamond && !this._up)) {
							    if(!model.get('withDiamond'))
								this.animate("AmiantoRunning0", -1);
							    else
								this.animate("AmiantoRunning" + diamond, -1);
							}    
							break;
					}
				}
			})
			.bind("DiamondGrew", function(to){
				model.set({ 'withDiamond' : to });
				var strength = model.get('strength');
				if(to>strength){
					var newSpeed = model.get('startingSpeed')-(Math.abs(strength-to));
					model._setSpeed(newSpeed,true);
				}
			})
			.disableControl();
															    
		model.set({'entity' : entity});
		    
	},	
	
	/* _setDir : set speed and keys' directions
	 @speed Integer; @jump Boolean */
	
	_setSpeed: function (speed,jump){
		if(typeof speed === "number") {
			var ent = this.getEntity(),
			    keys;
			speed = Math.floor(speed);
			this.set({'speed' : speed});
			if(jump)
			    ent._jumpSpeed = speed;
			if(ent._onUpStairs)
			    speed = speed/2,
			    keys = {
				LEFT_ARROW: 135,
				RIGHT_ARROW: 0,
				A: 135,
				D: 0,
				Q: 135
			    };
			else 
			if(ent._onDownStairs)
			    speed = speed/2,
			    keys = {
				LEFT_ARROW: 180,
				RIGHT_ARROW: 45,
				A: 180,
				D: 45,
				Q: 180
			    };
			else
			    keys = {
				LEFT_ARROW: 180,
				RIGHT_ARROW: 0,
				A: 180,
				D: 0,
				Q: 180
			    };
			
			ent.multiway(speed, keys);
			
		} else { 
			return false;
		}
	},
	
	_holdDiamond: function() {
		var diamond = Crafty("diamond"), 
		    entity = this.getEntity(), 
		    strength = this.get('strength'),
		    startingSpeed = this.get('startingSpeed');
		diamond._held = true;
		diamond.alpha = 0.0;
		this.set({ 'withDiamond' : diamond.value });
		if(diamond.value>strength){
			var newSpeed = startingSpeed-(Math.abs(strength-diamond.value));
			this._setSpeed(newSpeed,true);
		}
		entity.animate("AmiantoStandingStill" + diamond.value.toString(), -1);
	},
	
	_pickUpDiamond: function() { 
		var diamond = Crafty("diamond"), 
		    entity = this.getEntity(), 
		    strength = this.get('strength'), 
		    speed = this.get('speed'), 
		    startingSpeed = this.get('startingSpeed');
		    
		if(!diamond._held && entity._shiningEyes) {
			diamond._held = true;
			diamond.alpha = 0.0;
			this.set({ 'withDiamond' : diamond.value });
			if(diamond.value>strength){
				var newSpeed = startingSpeed-(Math.abs(strength-diamond.value));
				this._setSpeed(newSpeed,true);
			}
			entity.animate("AmiantoStandingStill" + diamond.value.toString(), -1);
		} 
		else 
		if(diamond._held) {
			diamond._held = false;
			diamond.attr({x: entity._x, y: entity._y, alpha: 1.0});
			this.set({ 'withDiamond' : 0 });
			if(speed != startingSpeed){
			    this._setSpeed(startingSpeed,true);
			}
			entity.animate("AmiantoStandingStill0", -1);
		}
	},
	
	getUp: function() {
		this.getEntity().one("AnimationEnd", function() {
				this
				  .collision(this.poly)
				  .gravity()
				  .enableControl();
			})
			.animate("AmiantoStandingUp", 1);
	}
	
});
