Carlos = BaseEntity.extend({
	defaults: {
	  'speed' : 4,
	  'startingSpeed': 4,
	  'startingPoint' : { x: 500, y: 440 },
	  'width' : 110,
	  'height' : 105,
	  'health' : 5,
	  'kills': 0,
	  'currentCheckpoint' : null
	},
	initialize: function() {
		var model = this,
		entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", CustomControls, Collision, SpriteAnimation, Tween, carlos")
			.attr({ 
				x: model.get('startingPoint').x, 
				y: model.get('startingPoint').y, 
				w: model.get('width'), 
				h: model.get('height'), 
				z: 301,
				canShoot: true
			});
		
		entity
		    .twowayer(model.get('speed'),model.get('speed')+(model.get('speed')/2), ['LEFT_ARROW','UP_ARROW','RIGHT_ARROW','SPACE'])
		    .reel("StandingStill", 50, [[0,0],[0,0]])
		    .reel("Running", 500, 1, 0, 5)
		    .reel("Shooting", 500, 0, 1, 6)
		    .reel("WasHit", 500, 4, 2, 2)
		    .reel("JumpingUp", 500, [[0,2],[0,2],[1,2]])
		    .reel("JumpingFalling", 500, [[2,2],[3,2],[3,2]])
		    .reel("JumpingShooting", 500, 0, 3, 6)
		    .reel("ShotDead", 1000, 0, 4, 6)
		    .reel("Shock", 1200, [[2,6],[3,6],[4,6],[5,6],[0,7],[1,7],[2,7],[3,7],[4,7]])
		    .onHit('grnd', function(hit) {
			var justHit = false,
			    speed = model.get("speed"),
			    startingSpeed = model.get("startingSpeed");
			
			if (this._currentReelId == "JumpingFalling" || 
			    this._currentReelId == "JumpingUp" || 
			    (this._falling && this._up) &&
			    !this._currentReelId == "Running") {
			    justHit = true;  
			    this._blockedDoubleJump = false;
			    if (!this._dead)
				this.animate("StandingStill", -1);
			}
			for (var i = 0; i < hit.length; i++) {
				var hitDirY = Math.round(hit[i].normal.y);
				if (hitDirY !== 0) { // hit bottom or top
					if (hitDirY === -1) { // hit the top, stop falling
						
						if((!this.isDown("UP_ARROW") && !this.isDown("W")) || 
						  ((this.isDown("UP_ARROW") || this.isDown("W")) && this._falling)) 
							this._up = false;
						
						//if((justHit && (!this._up || this._falling)) || this._onStairs)
							this.y += Math.ceil(hit[i].normal.y * -hit[i].overlap);
						
						if(this._falling) 
							this._falling = false;
						
						if (hit[i].obj.__c.mud && speed == startingSpeed)
							model._setSpeed(1,true)
						else if (speed != startingSpeed && !hit[i].obj.__c.mud)
							model._setSpeed(startingSpeed,true);
						
						return;
						
					}
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
					this._currentReelId == "JumpingUp") && this._falling);
			    
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
					    this.x += Math.ceil(hit[i].normal.x * -hit[i].overlap),
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
		    .onHit('checkpoint', function(hit){
			var cc = model.get("currentCheckpoint");
			if (cc) {
			    if (cc.identifier !== hit[0].obj.identifier)
				   model.set({ 'currentCheckpoint': hit[0].obj });
			} else {
			    model.set({ 'currentCheckpoint': hit[0].obj });
			}
		    })
		    .onHit('teleporter', function() { 
			    var cc = model.get('currentCheckpoint');
			    if(cc)
				  this.attr({ x: cc._x, y: cc._y });
		    })
		    .onHit('bossArea', function(hit) { 
			if(model.get('kills') > 0)
				Crafty.trigger("BossFight");
		    })
		    .bind('KeyDown', function(e){ 
			if((e.key ==  Crafty.keys['ENTER'] || e.key ==  Crafty.keys['SPACE']) &&
			  (this.hit('grnd') || this._onStairs || this._up) &&
			  this._currentReelId != "Shooting" && this._currentReelId != "JumpingShooting"){
				model.pullTrigger();
			}
		      })
		    .bind('KeyDown', function(e){ 
			if ((!this._blockedDoubleJump && !this._canJumpAgain) &&
			  (e.key === Crafty.keys.UP_ARROW || e.key === Crafty.keys.W || e.key === Crafty.keys.Z)){
			    this._up = true;
			    this._canJumpAgain = true;
			}
			else
			if (this._canJumpAgain && !this._blockedDoubleJump && (e.key === Crafty.keys.UP_ARROW || e.key === Crafty.keys.W || e.key === Crafty.keys.Z)) {
			    this._up = true;
			    this._gy = 0;
			    this._canJumpAgain = false;
			    this._blockedDoubleJump = true;
			}
		      })
		    .bind('KeyUp', function(e) {
			var k = e.key;
			if((k == Crafty.keys['LEFT_ARROW'] || k == Crafty.keys['A']) ||
			  (k == Crafty.keys['RIGHT_ARROW'] || k == Crafty.keys['D'])) 
				if(this.isPlaying("Running") && !this._transiting && !this._dead){ 
					this.animate("StandingStill"); 
				}
		    })
		    .bind('Moved', function(prevPos) {
		    
			// controlling animations
				
			if(this.isPlaying("StandingStill")) this.pauseAnimation();
				
			var moved = "";
			
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
				if(this._currentReelId != "JumpingUp" &&
				  (this.isPlaying("StandingStill") || 
				  (this._currentReelId != "JumpingUp" && this._currentReelId != "JumpingFalling" && this._currentReelId != "JumpingShooting")))
					this.animate("JumpingUp");
				break;
			    case "down" : 
				if(this._currentReelId != "JumpingFalling" && this._currentReelId != "WasHit" &&
				  ((this._currentReelId == "JumpingUp" && !this.isPlaying("JumpingUp")) ||
				  (!this._onStairs && (this._currentReelId == "Running" || this._currentReelId == "StandingStill"))))
					this.animate("JumpingFalling");
				break;
			    case "left":
				if(!this._flipX) 			// if moved left and is unflipped
					this.flip("X");		// flip sprite
				if((!this.isPlaying("Running") && !this._up) && 
				  (this._currentReelId != "JumpingUp" && this._currentReelId != "JumpingFalling" && !this._up)) {
					this.animate("Running", -1);
				}
				break;
			    case "right": 
				if(this._flipX) 			// if moved right and is flipped 
					this.unflip("X");		// unflip sprite
				if((!this.isPlaying("Running") && !this._up) &&
				  (this._currentReelId != "JumpingUp" && this._currentReelId != "JumpingFalling" && !this._up)) {
					this.animate("Running", -1);
				}
				break;
			  }
			Crafty.trigger("PlayerMoved", prevPos);
		      })
		    .bind("GotShot", function() {
			var H = model.get('health');
			this.disableControl();	
			if (H-- > 1) {
				this.animate("WasHit")
				    .one("AnimationEnd", function() {
					if (this._up) 
						this.animate("JumpingFalling");
					else if (!this._dead)
						this.animate("StandingStill");
					this.enableControl();
				    });
			} else {
				this.addComponent("Delay")
				    .unbind("Moved")
				    .unbind("KeyUp")
				    .unbind("KeyDown")
				    .unbind("GotShot")
				    .animate("ShotDead")
				    .one("AnimationEnd", function() {
					this.delay(model.losingLife, 3000);
				    })
				    ._dead = true;
			}
			model.set({ 'health': H });
		    })
		    .one("LifeDrained", function() {
			this.disableControl()
			    .addComponent("Delay")
			    .unbind("Moved")
			    .unbind("KeyUp")
			    .unbind("KeyDown")
			    .unbind("GotShot")
			    .animate("Shock")
			    .one("AnimationEnd", function() {
				this.delay(model.losingLife, 3000);
			    })
			    ._dead = true;
			model.set({ 'health': 0 });
		    })
		    .collision(new Crafty.polygon([[38,15],[70,15],[70,75],[60,95],[55,95],[38,75]]));
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
			    ent._jumpSpeed = speed + speed/2;
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
				Crafty.audio.play("rifleshot");
				ent.disableControl()
				  .animate("Shooting",1)
				  .bind("FrameChange", function(o){
				      if(o.currentFrame == 3) {
					      model._fire(bullet);
				      }
				    })
				  .one("AnimationEnd", function(){ 
				      this.unbind("FrameChange");
				      if(!this._dead)
					    this.animate("StandingStill",1)
						.enableControl();
				  });
			} else {
				Crafty.audio.play("rifleshot");
				ent.animate("JumpingShooting",1)
				  .bind("FrameChange", function(o){
				      if(o.currentFrame == 3) {
					      model._fire(bullet);
				      }
				    })
				  .one("AnimationEnd", function(){ 
				      this.unbind("FrameChange")
					  .animate("JumpingFalling",1);
				  });
			}
		}
	},
	
	_fire: function(bullet) {
		var reach = 500, 
		    model = this, 
		    ent = this.getEntity(), 
		    kills = this.get('kills');
		bullet.attr({ x: ent._x, y: ent._y+35, w: 5, h: 3, z: ent._z });
		if(ent._flipX) {
			bullet.x += 40;
			reach *= -1;
		} else {
			bullet.x += 100;
		}
		bullet.onHit("Collision", function(hit) {
			for(var i=0, len = hit.length; i<len; i++) {
				if (hit[i].obj.__c.Figurant) {
					if (!hit[i].obj._wasHit) {
						hit[i].obj.shot();
						model.set({ 'kills': ++kills });
						this.destroy();
						return;
					}
				} 
				else 
				if (hit[i].obj.__c.wall) {
					this.destroy();
					return;
				}
			}
		    })
		    .shoot({ x: bullet._x + reach });
		Crafty.trigger("PlayerShoot");
	},
	
	losingLife: function(){
		var ent = this;
		Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Tween, SpriteAnimation, carlos_phantom")
		    .attr({ x: ent._x, y: ent._y, z: ent._z, alpha: 0.7 , h: 100, w: 90 })
		    .reel("LosingLife", 1000, [[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[0,6],[1,6]])
		    .reel("Torment", 1000, [[5,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8]])
		    .animate("LosingLife")
		    .one("AnimationEnd", function() {
			this.animate("Torment", -1)
			    .tween({ y: this._y - 1000 }, 7500)
			    .one("TweenEnd", function() {
				this.destroy();
				Crafty.trigger("LevelTransition");
			    })
		    });
		    
	},
	
	carlosMockAnimation: function(){
		var ent = this.getEntity(),
		    playerMock = Crafty.e("CarlosMock")
		      .attr({ x: ent._x, y: ent._y, z: ent._z, h: ent._h, w: ent._w }),
		    d = 930, 
		    t = 5000;
		    
		if(playerMock._falling)
			playerMock.animate("JumpingFalling");
		ent.tween({ x: ent._x + d }, t)
		    .alpha = 0;
		playerMock
		    .tween({ x: ent._x + d }, t)
		    .one("TweenEnd", function(){
			    this.destroy();
			    ent.alpha = 1;
		    });
	}
	
});