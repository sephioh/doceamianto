Heart = BaseEntity.extend({
    defaults: {
		'framesCount' : 0,
		'VTime' : 6000,
		'SIZE' : 250,	// Initial width/height
    },
    initialize: function(){
		var model = this,
		    maxRes = gameContainer.conf.get('maxRes');
		    // Initial size
		    SIZE = model.get('SIZE'),
		    // Initial coordinates	
		    POSX = Crafty.math.randomInt(0,maxRes.w - SIZE),
		    POSY = maxRes.h + 100,
		    POSZ = 300,
		    // Vanishing points
		    VPX = (POSX < maxRes.w/2) ? Crafty.math.randomInt(SIZE, maxRes.w / 2) : 
			Crafty.math.randomInt(maxRes.w/2, maxRes.width - SIZE ),
		    VPY = 210,
		    // Components
		    entity = Crafty.e("2D, " + gameContainer.conf.get('renderType') + ", heart, " + 
			  model.get("heartColor") + "Heart, Tween, Collision");
		entity
		    .attr({x: POSX, y: POSY, z: POSZ, w: SIZE, h: SIZE})
		    .tween({x: VPX, y: VPY, w: 0, h: 0}, model.get('VTime'))
		    .bind('TweenEnd', function() {
			    // When tween end, destroy heart
			    entity.destroy();
		      })
		    .bind('EnterFrame', function towards_oblivion() {
			if(this._y<320){
				    this.z = 5;
				    this.unbind('EnterFrame', towards_oblivion);
			}
		    });
		model.set({'entity' : entity });
    }
});