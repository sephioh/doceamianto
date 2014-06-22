Amianto05 = BaseEntity.extend({
	defaults: {
	  'speed' : 3,
	  'startingSpeed': 3,
	  'startingPoint' : { x: 40, y: 0 },
	  'width' : 90,
	  'height' : 122,
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
		    .twoway(model.get('speed'), model.get('speed')*2)
		    .reel("StandingStill", 50, [[0,0],[0,0]])
		    .reel("Running", 500, 0, 0, 8)
		    .reel("JumpingUp", 500, [[0,1],[0,1],[1,1]])
		    .reel("JumpingFalling", 500, [[2,1],[3,1],[3,1]])
		    .reel("Landing", 500, [[4,1],[5,1]])
		    .onHit('grnd', function(hit) {
			var justHit = false;
			
			if (this._currentReelId == "JumpingFalling" ||
			    this._currentReelId == "JumpingUp" ||
			    (this._falling && this._up) &&
			    !this._currentReelId == "Running") {
			    justHit = true;
			    this._blockedDoubleJump = false;
			    this.animate("StandingStill", 1)
				.one("AnimationEnd", function(){
					//this.animate("LosingMyTime",-1);
				});
			}
			for (var i = 0; i < hit.length; i++) {
				var hitDirY = Math.round(hit[i].normal.y);
				if (hitDirY !== 0) { // hit bottom or top
					if (hitDirY === -1) { // hit the top, stop falling
						if((!this.isDown("UP_ARROW") && !this.isDown("W")) ||
						  ((this.isDown("UP_ARROW") || this.isDown("W")) && this._falling))
							this._up = false;
						
						if((justHit && (!this._up || this._falling)) || this._onStairs)
							
						  
						this.y += Math.ceil(hit[i].normal.y * -hit[i].overlap);
						
						if(this._falling)
							this._falling = false;
						
						if (hit[i].obj.__c.DanceFloor){
							var cc = model.get('currentCheckpoint');
							if(cc === null || hit[i].obj.floorIndex !== cc.floorIndex || Crafty("FloorSet").teleporting){
								model.set({ 'currentCheckpoint': hit[i].obj });
							}
							Crafty.trigger("DanceFloorSteppedOver", hit[i].obj.floorIndex);
						}
						return;
					}
				}
			}
		      })
		      .addComponent("WiredHitBox")
		    .onHit('teleporter', function() { 
			    var cc = model.get('currentCheckpoint');
			    Crafty("FloorSet").teleporting = true;
			    if(cc){
				  Crafty.trigger("PlayerWasTeleported");
				  this.attr({ x: cc._x - 25 , y: cc._y - 220 });
			    }
		    })/*
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
		      })*/
		    .bind('KeyUp', function(e) {
			var k = e.key;
			if((k == Crafty.keys['LEFT_ARROW'] || k == Crafty.keys['A']) ||
			  (k == Crafty.keys['RIGHT_ARROW'] || k == Crafty.keys['D'])) 
				if(this.isPlaying("Running")){ 
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
		      })
		    .collision(new Crafty.polygon([[32,45],[70,45],[70,124],[32,124]]))
		model.set({'entity' : entity});
		    
	}
	
});