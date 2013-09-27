DarkHeart = BaseEntity.extend({
    defaults: {
	'framesCount' : 0,
	'VTime' : 400,
	'SIZE' : 250,	// Initial width/height
    },
    initialize: function() {
		var model = this,
			SIZE = model.get('SIZE'),	
			POSX = Crafty.math.randomInt(0,Crafty.viewport.width - SIZE), // Initial x coordinate: any x possible value in screen
			POSY = Crafty.viewport.height+100,  // Initial y coordinate: it´s created under the viewport
			POSZ = 300,							// Initial z coordinate
			VPX = 400,						  // Perspective´s vanish point: x axis
			VPY = 210,						 // Perspective´s vanish point: y axis
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", heart, darkHeart, Tween, Collision");
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
			.setName('Dark Heart');
		model.set({'entity' : entity });
    }
});