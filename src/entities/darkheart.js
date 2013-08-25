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
			TAN = (VPY-POSY)/(VPX-POSX),  // Slope(tan) of a line that between vanish point and initial position
			SPEED = 1,					 // Movement speed rate
			model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", heart, darkHeart, Collision");
		entity['poly'] = new Crafty.polygon([[0,0],[WIDTH,0],[WIDTH,HEIGHT],[0,HEIGHT]]);
		entity
			.attr({x: POSX, y: POSY, z: POSZ, w: WIDTH, h: HEIGHT})
			.collision(entity.poly)
			.bind('EnterFrame',function() {
				// At each frame, test if darkheart is visible
				if(this._w>0) {
					// Calc position that hearts stays behind Amianto
					var amianto = Crafty("amianto01"),
						max_y_collision = amianto._y + (amianto._h * 3/4);

					// If hearts achieves its MAX y, reduces y so it stays behind Amianto
					if(this._y <= max_y_collision)
						this._z = this._z - SPEED;
					console.log(this._z);

					// Calculate new values for instance attributes:
					var newY = this._y - SPEED,         				   // reduced using fixed rate(SPEED)
						newX = ((newY-POSY)/TAN) + POSX,    			   // change using new y-coordinate and TAN
						sizeRate = ((newY-VPY)/(POSY-VPY)) * WIDTH, 	   // used for new witdth and height; reduced using new y-coordinate
						newPoly = entity.poly.shift(newX-this._x, -SPEED); // creates a new polygon for collision tests

					// Apply new values
					this.attr({x: newX, y: newY, w: sizeRate, h: sizeRate });
					entity.collision(newPoly);

				} else {
					// If DarkHeart's lifetime is over, destroy itself 	
					this.destroy();
				}
			  })
			.setName('Dark heart');
		model.set({'entity' : entity });
    }
});