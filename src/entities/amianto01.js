Amianto01 = BaseEntity.extend({
	defaults: {
	    'love' : 0,
		    'maxLove' : 6,
		    'minLove' : 0
	},
	initialize: function() {
		var WIDTH = 125,		// Initial width
			HEIGHT = 168,		// Initial height
			POSX = 350, 		// Initial x coordinate
			POSY = 220,  		// Initial y coordinate
			POSZ = 300,			// Initial z coordinate
			SPEED = 3,			// Amianto speed when move horizontally
			model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", amianto01, SpriteAnimation, Collision, CustomControls"),
			shadow = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Sprite, amianto01Shadow");
		entity
			.attr({x: POSX, y: POSY, z: POSZ, w:WIDTH, h:HEIGHT })
			.multiwayer(SPEED, {RIGHT_ARROW: 0, LEFT_ARROW: 180}, ['RIGHT_ARROW','LEFT_ARROW'])
			.collision(new Crafty.polygon([[33,25], [WIDTH-33,25], [WIDTH-33,(HEIGHT-25)/2], [WIDTH-63,HEIGHT-25], [33, (HEIGHT-25)/2]]))
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
					if(hit[i].obj._z == this._z) {
						var luv = model.get('love');
						if(hit[i].obj.__c.darkHeart) {
							Crafty.audio.play("hitdarkheart", 1);
							if(luv>model.get('minLove'))
								model.set({ 'love' : luv-1 });
							hit[i].obj.destroy();
							model._stopMoving();
							entity
								.disableControl()
								.animate("AmiantoHittingDarkHeart")
								.one('AnimationEnd', function() { 
									entity.enableControl();
									model.startMoving();
								});
						} else 
						if(hit[i].obj.__c.redHeart) {
							Crafty.audio.play("hitredheart", 1);
							model.set({ 'love' : luv+1 });
							hit[i].obj.destroy();
							model._stopMoving();
							entity
								.disableControl()
								.animate("AmiantoHittingRedHeart")
								.one('AnimationEnd', function() { 
									if(model.get('love') < model.get('maxLove')) {
										model.startMoving();
										entity.enableControl();
									}
								});
							model._fellInLove();
						}
					}
				}
			  })
			.setName("Amianto01")
			.reel("AmiantoMovingTowards", 2000, [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1]])
			.reel("AmiantoMovingLeft", 1000, 0, 2, 7)
			.reel("AmiantoMovingRight", 1000, 0, 3, 7)
			.reel("AmiantoHittingRedHeart", 1000, 0, 4, 7)
			.reel("AmiantoHittingDarkHeart", 1000, 0, 5, 7)
			.reel("AmiantoStumbling", 1000, 0, 6, 7)
			.reel("AmiantoFalling", 1000, 0, 7, 7)
			.reel("AmiantoHittingTheGround", 1000, 0, 8, 7)
			.bind('NewDirection', function (d) {
				if(!entity.disableControls) {
					if (d.x > 0) {
						if(!entity.isPlaying("AmiantoMovingRight"))
							entity.animate("AmiantoMovingRight", -1);
					} else if (d.x < 0) {
						if(!entity.isPlaying("AmiantoMovingLeft"))
							entity.animate("AmiantoMovingLeft", -1);
					} else {
						if(!entity.isPlaying("AmiantoMovingTowards"))
							entity.animate("AmiantoMovingTowards", -1);
					}
				}
			  });
		shadow
			.attr({ x: entity._x+14, y: entity._y+12, w: 164, h: entity._h, z: entity._z })
			.bind('EnterFrame', function(){ 
				shadow.x = entity._x+14;
			});
		model.set({'entity' : entity, 'shadow' : shadow });
	},
	startMoving: function() {
		this.getEntity()
			.bind('EnterFrame', this._keepMoving);
	},
	_keepMoving: function() {	// function bound to the entity's context
		if(!this._isPlaying)
			this.animate("AmiantoMovingTowards", -1);
	},
	_stopMoving: function() {
		this.getEntity()
			.unbind('EnterFrame', this._keepMoving)
			.pauseAnimation();
	},
	_fellInLove: function() {
		if(this.get('love') >= this.get('maxLove')) {
			this.getEntity()
				.disableControl();
			this.get('shadow')
				.destroy();
			Crafty.trigger("TooMuchLove");
		}
	},
	stumble: function() {
		this.getEntity()
			.animate("AmiantoStumbling", 1)
			.one('AnimationEnd', this._falling);
	},
	_falling: function() { 		// function bound to the entity's context
		this.animate("AmiantoFalling", -1);
	}
});