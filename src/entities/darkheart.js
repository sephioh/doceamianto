DarkHeart = BaseEntity.extend({
	defaults: {

    },
    initialize: function(){
		var WIDTH = 250,	// Initial width
			HEIGHT = 250,	// Initial height
			POSX = Crafty.math.randomInt(0,Crafty.viewport.width - WIDTH), // Initial x coordinate: any x possible value in screen
			POSY = Crafty.viewport.height+100,  // Initial y coordinate: it´s created under the viewport
			POSZ = 300,							// Initial z coordinate
			VPX = 400,						  // Perspective´s vanish point: x axis
			VPY = 210,						 // Perspective´s vanish point: y axis
			SPEED = 400	,					 // Movement speed rate
			model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", heart, darkHeart, Collision, Tween, WiredHitBox"),
			amianto = Crafty("amianto01");
		entity['poly'] = new Crafty.polygon([[0,0],[WIDTH,0],[WIDTH,HEIGHT],[0,HEIGHT]]);
		entity
			.attr({x: POSX, y: POSY, z: POSZ, w: WIDTH, h: HEIGHT})
			.collision(entity.poly)
			.tween({x: VPX, y: VPY, w: 0, h: 0}, SPEED)
			.bind('TweenEnd',function() {
				// When tween end, destroy heart
				entity.destroy();
			  })
			.setName('Dark heart');
		model.set({'entity' : entity });
    }
});