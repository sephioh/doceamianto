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
					var hitDirY = Math.round(hit[i].normal.y), hitDirX = Math.round(hit[i].normal.x);
					if (hitDirY !== 0) { // hit bottom or top
						if (hitDirY === 1)  // hit the bottom 
							this.y = hit[i].obj.y + hit[i].obj.h;
						else 
						if (hitDirY === -1) // hit the top
							this.y = hit[i].obj.y - this._h;
						if(Math.round(this._prevPos.x) == Math.round(this._x)) 
							this._stopMoving();
					} else if(hitDirX !== 0) { // hit right or left
						if (hitDirX === 1) // hit right side
							this.x = hit[i].obj.x + hit[i].obj.w;
						else 
						if(hitDirX === -1) // hit left side
							this.x = hit[i].obj.x - this._w;
						if(Math.round(this._prevPos.y) == Math.round(this._y))
							this._stopMoving();
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
							model.fellInLove();
						}
					}
				}
			  })
			.moveTo(model.get('speed'))
			.setTargetDeviation(((entity._w/2) * -1),(entity._h * -1))
			.setName("Amianto01")
			.animate("AmiantoMovingTowards", 0, 0, 7)
			.animate("AmiantoMovingLeft", 0, 1, 7)
			.animate("AmiantoMovingRight", 0, 2, 7)
			.animate("AmiantoHittingDarkHeart", 0, 3, 7)
			.animate("AmiantoStumbling", 0, 4, 7)
			.animate("AmiantoFalling", 0, 5, 7)
			.animate("AmiantoHittingTheGround", 0, 6, 7)
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