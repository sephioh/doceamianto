DarkHeart = BaseEntity.extend({
	defaults: {

    },
    initialize: function(){
		var POSX = Crafty.math.randomInt(0,Crafty.viewport.width), // Initial x coordinate: any x possible value in screen
			POSY = Crafty.viewport.height+300,  // Initial y coordinate: it´s created under the viewport
			POSZ = 375,                        // Initial z coordinate
			VPX = 400,						  // Perspective´s vanish point: x axis
			VPY = 530,						 // Perspective´s vanish point: y axis
			WIDTH = 250,					// Initial width
			HEIGHT = 250,				   // Initial height
			TAN = (VPY-POSY)/(VPX-POSX),  // Slope(tan) of a line that between vanish point and initial position
			SPEED = 1,					 // Movement speed rate
			model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", heart, darkHeart, Collision");
		entity['poly'] = new Crafty.polygon([[0,0],[WIDTH,0],[WIDTH,HEIGHT],[0,HEIGHT]]);
		entity
			.attr({x: POSX, y: POSY, z: POSZ, w: WIDTH, h: HEIGHT})
			.collision(entity.poly)
			.bind('EnterFrame',function() {
				// At each frame, test if darkheart seeable 
				if(Math.round(this._w)>0) {

					// Calculate new values for instance attributes:
					var newY = this._y - SPEED,         			// reduced using fixed rate(SPEED)		   
						newX = ((newY-POSY)/TAN) + POSX,    		// change using new y-coordinate and TAN
						newZ = this._z - SPEED, 					// reduced using fixed rate(SPEED)
						sizeRate = ((newY-VPY)/(POSY-VPY)) * WIDTH; // used for new witdth and height; reduced using new y-coordinate

					// Apply new values
					this.attr({x: newX, y: newY, z: newZ, w: sizeRate, h: sizeRate });

					// Calculate new coordinates used for collision tests (NEED TO BE FIXED!)
					entity.poly.shift(sizeRate * -1,sizeRate * -1);

				} else {
					// If DarkHeart width is the minimum possible(its not seeable), destroy itself 	
					this.destroy();
				}
			  })
			.setName('Dark heart');
		model.set({'entity' : entity });
    }
});