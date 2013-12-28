Carlos = BaseEntity.extend({
	defaults: {
	  'speed' : 4,
	  'startingSpeed': 4,
	  'startingPoint' : { x: 500, y: 448 },
	  'width' : 94,
	  'height' : 126,
	  'withDiamond' : 0,
	  'strength' : 6,
	},
	initialize: function() {
		var model = this,
		entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, Color") //Twoway, Gravity, Collision, SpriteAnimation, Tween, amianto02")
			.attr({ 
				x: model.get('startingPoint').x, 
				y: model.get('startingPoint').y, 
				w: model.get('width'), 
				h: model.get('height'), 
				z: 301
			})
			.color("Red")
			.multiway(model.get('startingSpeed'), {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
		//entity['poly'] = new Crafty.polygon([[17,60],[47,38],[77,60],[55,116],[39,116]]);
		/*
		entity
			.twoway(model.get('speed'), model.get('speed'))
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
			* /
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
			])
			.reel("AmiantoJumpingUp0", 375, [[9,1],[9,1],[10,1]])
			.reel("AmiantoJumpingFalling0", 375, [[11,1],[11,1],[12,1]])
			.reel("AmiantoRunning0", 1000, [[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[1,1]])
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
			.disableControl();*/
															    
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
