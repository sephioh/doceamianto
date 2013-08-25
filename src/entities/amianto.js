Amianto = BaseEntity.extend({
    defaults: {
        'speed' : 4,
		'love' : 0
    },
    initialize: function() {
		var WIDTH = 125,	// Initial width
			HEIGHT = 168,	// Initial height
			POSX = 350, 	// Initial x coordinate
			POSY = 220,  	// Initial y coordinate
			POSZ = 300,		// Initial z coordinate
			SPEED = 3,
			model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", amianto01, SpriteAnimation, MoveTwo, Collision, Multiway");
		entity
			.attr({x: POSX, y: POSY, z: POSZ, w:WIDTH, h:HEIGHT })
			.multiway(SPEED, {RIGHT_ARROW: 0, LEFT_ARROW: 180})
			.collision(new Crafty.polygon([[33,25], [WIDTH-33,25], [WIDTH-33,(HEIGHT-25)/2], [WIDTH-63,HEIGHT-25], [33, (HEIGHT-25)/2]]))
			.onHit('solid', function(hit) {
				for (var i = 0; i < hit.length; i++) {
					var hitDirX = Math.round(hit[i].normal.x);
					if(hitDirX !== 0) {
						if (hitDirX === 1) {
							this.x = this.x + 3;
						} else {
							if(hitDirX === -1){
								this.x = this.x - 3;
							}
						}
					}
				}
			})
			.onHit('heart',function(hit) {
				for (var i = 0; i < hit.length; i++) {
					if(hit[i].obj._z == this._z){
						if(hit[i].obj.__c.darkHeart) {
							model.set({ 'love' : model.get('love')-1 });
							hit[i].obj.destroy();
							entity._stopMoving();
							entity.disregardMouseInput = true;
							entity.stop().animate("AmiantoHittingDarkHeart", 32, 0);
						} else 
						if(hit[i].obj.__c.redHeart) {
							model.set({ 'love' : model.get('love')+1 });
							hit[i].obj.destroy();
							entity.stop().animate("AmiantoHittingRedHeart", 32, 0);
							model.fellInLove();
						}
					}
				}
			  })
			.moveTo(model.get('speed'))
			.setTargetDeviation(((entity._w/2) * -1),(entity._h * -1))
			.setName("Amianto01")
			.animate("AmiantoMovingTowards", 0, 0, 15)
			.animate("AmiantoMovingLeft", 0, 2, 7)
			.animate("AmiantoMovingRight", 0, 3, 7)
			.animate("AmiantoHittingRedHeart", 0, 4, 7)
			.animate("AmiantoHittingDarkHeart", 0, 5, 7)
			.animate("AmiantoStumbling", 0, 6, 7)
			.animate("AmiantoFalling", 0, 7, 7)
			.animate("AmiantoHittingTheGround", 0, 8, 7)
			.bind('NewDirection', function (d) {
				if (d.x > 0) {
				  entity.stop().animate('AmiantoMovingRight', 32, -1);
				} else if (d.x < 0) {
				  entity.stop().animate('AmiantoMovingLeft', 32, -1);
				} else {
				  entity.stop().animate('AmiantoMovingTowards', 32, -1);
				}
			  })
			.bind('EnterFrame', function() {
				if(!entity.isPlaying()){
					entity.animate('AmiantoMovingTowards', 32, -1);
					entity.disregardMouseInput = false;
				}
			  });
		model.set({'entity' : entity });
		
    },
	fellInLove: function() {
		if(this.get('love') > 4)
			Crafty.trigger('TooMuchLove');
	},
    
});