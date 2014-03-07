RedHeart = BaseEntity.extend({
    defaults: {
		'framesCount' : 0,
		'VTime' : 400,
		'SIZE' : 250,	// Initial width/height
    },
    initialize: function(){
		var model = this,
			// Initial size
			SIZE = model.get('SIZE'),
			// Initial coordinates	
			POSX = Crafty.math.randomInt(0,Crafty.viewport.width - SIZE),
			POSY = Crafty.viewport.height+100,
			POSZ = 300,
			// Vanishing points
			VPX = (POSX < Crafty.viewport.width/2) ? Crafty.math.randomInt(SIZE, Crafty.viewport.width / 2)
												   : Crafty.math.randomInt(Crafty.viewport.width/2, Crafty.viewport.width - SIZE ),
			VPY = 210,
			// Components
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", heart, redHeart, Tween, Collision");
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
			})
			.setName('Red Heart');
		model.set({'entity' : entity });
    }
});