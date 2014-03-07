Carlos = BaseEntity.extend({
	defaults: {
	  'speed' : 4,
	  'startingSpeed': 4,
	  'startingPoint' : { x: 500, y: 548 },
	  'width' : 92,
	  'height' : 100,
	  'withDiamond' : 0,
	  'strength' : 6,
	},
	initialize: function() {
		var model = this,
		entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Twoway, Gravity, Collision, SpriteAnimation, Tween, carlos")
			.attr({ 
				x: model.get('startingPoint').x, 
				y: model.get('startingPoint').y, 
				w: model.get('width'), 
				h: model.get('height'), 
				z: 301,
				canShoot: true
			});
		//.multiway(model.get('startingSpeed'), {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
		//entity['poly'] = new Crafty.polygon([[22,7],[70,7],[60,87],[32,87]]);//22 //33,87
		
		entity
		    .twoway(model.get('speed'),model.get('speed')+(model.get('speed')/2))
		    .onHit('grnd', function(hit) {
			    var justHit = false;
			    
			    if(this._currentReelId == "JumpingFalling" || 
				this._currentReelId == "JumpingUp" || 
				(this._currentReelId == "Running" && this._falling && this._up) ||
				(!this.isPlaying("StandingUp") && this._currentReelId == "StandingUp")) {
				    justHit = true;  
				    this.animate("StandingStill", -1);
			    }
			    for (var i = 0; i < hit.length; i++) {
				    var hitDirY = Math.round(hit[i].normal.y);
				    if (hitDirY !== 0) { 						// hit bottom or top
					    if (hitDirY === -1) { // hit the top, stop falling
						    
						    if((!this.isDown("UP_ARROW") && !this.isDown("W")) || 
						      ((this.isDown("UP_ARROW") || this.isDown("W")) && this._falling)) 
							    this._up = false;
						    
						    if((justHit && (!this._up || this._falling)) || 
						      this._onStairs)
							    this.y += Math.ceil(hit[i].normal.y * -hit[i].overlap);
						    
						    if(this._falling) 
							    this._falling = false;
						    
						    return;
						    
					    }
					    
				    }
			    }
		      })
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
		    .onHit('wall', function(hit) {
			    for (var i = 0; i < hit.length; i++) {
				    this.x += Math.ceil(hit[i].normal.x * -hit[i].overlap);
			    }
			    this._blocked = true;
			},function(){
			    this._blocked = false;
			})
		    .onHit('stairs', function(hit) {
			    var justHit = false,
				speed = model.get('speed'),
				isfalling = ((this._currentReelId == "JumpingFalling" || 
					this._currentReelId == "JumpingUp" ) && this._falling);
			    
			    if(isfalling || this._currentReelId == "Running")
				    justHit = true;
				
			    for (var i = 0; i < hit.length; i++) {
				    var actualStairs = (hit[i].obj.__c.upStairs || hit[i].obj.__c.downStairs);
				    
				    if(isfalling && actualStairs)
					    this.animate("StandingStill", -1);
				    
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
		    .onHit('water', function() { 
				
		      })
		    .bind('KeyDown', function(e){ 
			if((e.key ==  Crafty.keys['ENTER'] || e.key ==  Crafty.keys['SPACE']) &&
			  (this.hit('grnd') || this._onStairs || this._up) &&
			  this._currentReelId != "Shooting" && this._currentReelId != "JumpingShooting")
				model.pullTrigger();
			if (!this._falling && (e.key === Crafty.keys.UP_ARROW || e.key === Crafty.keys.W || e.key === Crafty.keys.Z)) {
			    this._canJumpAgain = true;
			} else if (this._canJumpAgain && (e.key === Crafty.keys.UP_ARROW || e.key === Crafty.keys.W || e.key === Crafty.keys.Z)) {
			    this._up = true;
			    this._gy = 0;
			    this._canJumpAgain = false;
			}
		      })
		    .bind('KeyUp', function(e) {
			var k = e.key;
			if((k == Crafty.keys['LEFT_ARROW'] || k == Crafty.keys['A']) ||
			  (k == Crafty.keys['RIGHT_ARROW'] || k == Crafty.keys['D'])) 
				if(this.isPlaying("Running") && !this._transiting){ 
					this.animate("StandingStill"); 
				}
		    })
		    .reel("StandingStill", 50, [[0,0],[0,0]])
		    .reel("Running", 500, 1, 0, 5)
		    .reel("Shooting", 500, 0, 1, 6)
		    .reel("WasHit", 500, 4, 2, 2)
		    .reel("JumpingUp", 500, [[0,2],[0,2],[1,2]])
		    .reel("JumpingFalling", 500, [[2,2],[3,2],[3,2]])
		    .reel("JumpingShooting", 500, 0, 3, 6)
		    .reel("ShotFromBehind", 750, 0, 4, 6)
		    .setName('Player')
		    .bind('Moved', function(prevPos) {
		    
			// controlling animations
				
			if(this.isPlaying("StandingStill")) this.pauseAnimation();
				
			var moved = "";
			
			if(!this._blocked) {
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
			  
				Crafty.trigger("PlayerMoved", moved);
			      
				switch(moved) {
					case "up" : 
					    if(this._currentReelId != "JumpingUp" &&
					      (this.isPlaying("StandingStill") || 
					      (this._currentReelId != "JumpingUp" && this._currentReelId != "JumpingFalling" && this._currentReelId != "JumpingShooting")))
						    this.animate("JumpingUp");
					    break;
					case "down" : 
					    if(this._currentReelId != "JumpingFalling" &&
					      ((this._currentReelId == "JumpingUp" && !this.isPlaying("JumpingUp")) ||
					      (!this._onStairs && (this._currentReelId == "Running" || this._currentReelId == "StandingStill"))))
						    this.animate("JumpingFalling");
					    break;
					case "left":
					    if(!this._flipX) 	// if moved left and is unflipped
						    this.flip("X");	// flip sprite
					    if((!this.isPlaying("Running") && !this._up) && 
					      (this._currentReelId != "JumpingUp" && this._currentReelId != "JumpingFalling" && !this._up)) {
						    this.animate("Running", -1);
					    }
					    break;
					case "right": 
					    if(this._flipX) 				// if moved right and is flipped 
						    this.unflip("X");			// unflip sprite
					    if((!this.isPlaying("Running") && !this._up) &&
					      (this._currentReelId != "JumpingUp" && this._currentReelId != "JumpingFalling" && !this._up)) {
						    this.animate("Running", -1);
					    }
					    break;
				  }
			    
			  }
		      })
		    .onHit('levelLimits', function(hit) {
			for (var i = 0; i < hit.length; i++) {
				this.x += Math.ceil(hit[i].normal.x * -hit[i].overlap);
				this._blocked = true;
			}
		      },function(){
				this._blocked = false;
		      })
		    .collision(new Crafty.polygon([[30,7],[60,7],[60,87],[30,87]]));
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
	
	pullTrigger : function() { 
		var ent = this.getEntity(), model = this; 
		if(ent.canShoot) {
			var bullet = Crafty.e("Bullet");
			if(!ent._up){
				ent.disableControl()
				  .animate("Shooting",1)
				  .bind("FrameChange", function(o){
				      if(o.currentFrame == 3) {
					      model._fire.call(this,bullet);
				      }
				    })
				  .one("AnimationEnd", function(){ 
				      this.unbind("FrameChange")
					  .animate("StandingStill",1)
					  .enableControl();
				  });
			} else {
				ent.animate("JumpingShooting",1)
				  .bind("FrameChange", function(o){
				      if(o.currentFrame == 3) {
					      model._fire.call(this,bullet);
				      }
				    })
				  .one("AnimationEnd", function(){ 
				      this.unbind("FrameChange")
					  .animate("JumpingFalling",1);
				  });
			}
		}
	},
	
	// must be called from within entity context
	_fire: function(bullet) {
		var reach = 500;
		bullet.attr({ x: this._x, y: this._y+23, w: 2, h: 2, z: this._z+1 });
		if(this._flipX) {
			bullet.x += 30;
			reach *= -1;
		} else {
			bullet.x += 67;
		}
		bullet.onHit("Collision", function(hit) {
			for(var i=0, len = hit.length; i<len; i++) {
				if(hit[i].obj.__c.Figurant && !hit[i].obj._wasHit) {
					hit[i].obj.shot();
					this.destroy();
					break;
				} 
				else 
				if(hit[i].obj.__c.wall) {
					this.destroy();
					break;
				}
			}
		    })
		    .shoot({ x: bullet._x + reach });
		Crafty.trigger("PlayerShoot");
	}
	
});