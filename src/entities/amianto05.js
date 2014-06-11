Amianto05 = BaseEntity.extend({
	defaults: {
	  'speed' : 4,
	  'startingSpeed': 4,
	  'startingPoint' : { x: 0, y: 0 },
	  'width' : 110,
	  'height' : 105,
	  'health' : 5,
	  'currentCheckpoint' : null
	},
	initialize: function() {
		var model = this,
		entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Twoway, Gravity, Collision, SpriteAnimation, Tween, amianto05")
			.attr({ 
				x: model.get('startingPoint').x, 
				y: model.get('startingPoint').y, 
				w: model.get('width'), 
				h: model.get('height'), 
				z: 301
			});
		
		entity
		    .twoway(model.get('speed'),model.get('speed')+(model.get('speed')/2))
		    .reel("StandingStill", 50, [[0,0],[0,0]])
		    .reel("Running", 500, 0, 0, 8)
		    .reel("Shooting", 500, 0, 1, 6)
		    .reel("WasHit", 500, 4, 2, 2)
		    .reel("JumpingUp", 500, [[0,2],[0,2],[1,2]])
		    .reel("JumpingFalling", 500, [[2,2],[3,2],[3,2]])
		    .onHit('grnd', function(hit) {
			var justHit = false,
			    speed = model.get("speed")
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
		    /*.onHit('checkpoint', function(hit){
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
		    .collision(new Crafty.polygon([[38,15],[70,15],[70,95],[38,95]]));*/
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
	}
	
});