Amianto06 = BaseEntity.extend({
	defaults: {
	    'love' : 0,
		    'maxLove' : 20,
		    'minLove' : 0
	},
	initialize: function() {
		var WIDTH = 145,		// Initial width
		    HEIGHT = 185,		// Initial height
		    POSX = 350, 		// Initial x coordinate
		    POSY = 276,  		// Initial y coordinate
		    POSZ = 322,			// Initial z coordinate
		    SPEED = 3,			// Amianto speed when move horizontally
		    model = this,
		    entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", amianto06, SpriteAnimation, Collision, CustomControls, WiredHitBox");
		entity
			.attr({x: POSX, y: POSY, z: POSZ, w:WIDTH, h:HEIGHT })
			.twowayer(SPEED, SPEED*2, ['RIGHT_ARROW','LEFT_ARROW','UP_ARROW'])
			.collision(new Crafty.polygon([[33,25], [WIDTH-33,25], [WIDTH-33,(HEIGHT-25)/2], [WIDTH-72,HEIGHT-25], [33, (HEIGHT-25)/2]]))
			.onHit('Delimiter', function(hit) {
				for (var i = 0; i < hit.length; i++) {
					var hitDirX = Math.round(hit[i].normal.x);
					if(hitDirX !== 0) {
						if (hitDirX === 1) {
							this.x = this._x + 3;
						} else {
							if(hitDirX === -1){
								this.x = this._x - 3;
							}
						}
					}
				}
			})
			.onHit('heart',function(hit) {
				for (var i = 0; i < hit.length; i++) {
					if(!this._up && hit[i].obj._y > this._y + this._h/2 && hit[i].obj._y < this._y + this._h - this._h/4) {
						var luv = model.get('love');
						if(hit[i].obj.__c.darkHeart) {
							Crafty.audio.play("hitdarkheart");
							if(luv > model.get('minLove')){
								model.set({ 'love' : --luv });
							}
							hit[i].obj.destroy();
							model._stopMoving();
							entity
								.disableControl()
								.animate("AmiantoWasHit")
								.one('AnimationEnd', function() { 
									entity.enableControl();
									model.startMoving();
								});
						} else 
						if(hit[i].obj.__c.redHeart) {
							Crafty.audio.play("hitredheart");
							luv++;
							model.set({ 'love' : luv });
							hit[i].obj.destroy();
							if(luv < model.get('maxLove')) {
							      model.startMoving();
							}
							model._fellInLove();
						}
						Crafty.trigger("HitHeart", luv);
					}
				}
			  })
			.onHit('StepsPhantom',function(hit) {
				for (var i = 0; i < hit.length; i++) {
					if(!this._up && hit[i].obj._y > this._y + this._h/2 && 
					  hit[i].obj._y < this._y + this._h - this._h/4 &&
					  this._currentReelId != "AmiantoWasHit" || 
					  (hit[i].obj.attackDir && this._currentReelId != "AmiantoWasHit")) {
						var luv = model.get('love');
						//Crafty.audio.play("hitdarkheart");
						if(luv > model.get('minLove')){
							model.set({ 'love' : --luv });
						}
						//hit[i].obj.destroy();
						model._stopMoving();
						entity
							.disableControl()
							.animate("AmiantoWasHit")
							.one('AnimationEnd', function() { 
								entity.enableControl();
								model.startMoving();
							});
						Crafty.trigger("HitHeart", luv);
					}else if(this._up && hit[i].normal.y === -1 && hit[i].overlap < 5){
						hit[i].obj.beDestroyed();
					}
				}
			  })
			.reel("AmiantoMovingTowards", 1200, 0, 0, 10)
			.reel("AmiantoWasHit", 1200, 0, 1, 10)
			.reel("AmiantoJumping", 600, 0, 2, 6)
			.bind('Moved', function(prevPos) {
				var moved = "";
				
				// if this moved up
				if(this._y < prevPos.y) 
					moved = "up";
				
				if(this._currentReelId != "AmiantoJumping" && moved == "up")
					this.animate("AmiantoJumping");
			})
			.gravity("grnd");
		model.set({'entity' : entity });
	},
	startMoving: function() {
		this.getEntity()
			.bind('EnterFrame', this._keepMoving);
	},
	_keepMoving: function() {	// function bound to the entity's context
		if(!this._up && !this._isPlaying)
			this.animate("AmiantoMovingTowards", -1);
	},
	_stopMoving: function() {
		this.getEntity()
			.unbind('EnterFrame', this._keepMoving)
			.pauseAnimation();
	},
	_fellInLove: function() {
		if(this.get('love') >= this.get('maxLove')) {
			var ent = this.getEntity();
			ent.disableControl();
			//ent.tween({ y: ent._y - 80}, 1000);
			console.log("fire TooMuchLove");
			Crafty.trigger("TooMuchLove");
			console.log("TooMuchLove fired");
		}
	}
});