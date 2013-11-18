Amianto03 = BaseEntity.extend({
    defaults: {
		'initial_x' : 0,
		'initial_y' : 0,
		'initial_z' : 0,
		'initial_w' : 78,
		'initial_h' : 96,
		'initial_speed' : 3
    },
    initialize: function() {
		var model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", amianto03, SpriteAnimation, Multiway");
		entity
			// Set initial atributes
			.attr({x: model.get('initial_x'),
				   y: model.get('initial_y'),
				   z: model.get('initial_z'),
				   w: model.get('initial_w'),
				   h: model.get('initial_h')})
			// Set entity name
			.setName("Amianto03")
			// Animations
			.animate("Standing", 0, 0, 5)
			.animate("MovingVertically", 0, 1, 5)
			.animate("MovingLeft", 0, 2, 5)
			.animate("MovingRight", 0, 3, 5)
			.animate("PushingRigth", 0, 4, 5)
			.animate("PushingLeft", 0, 5, 5)
			// Default animation when amianto is created
			.playAnimation("Standing", 20, -1)
			// Controls
			.multiway(model.get('initial_speed'), {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})
			.bind('Moved', function(prevPos) {
				// if amianto move to right
				if(this._x > prevPos.x)
					moved = "right";
				else
				// if amianto move to up
				if(this._y < prevPos.y) 
					moved = "up";
				else
				// if amianto move to left
				if(this._x < prevPos.x)
					moved = "left";
				else
				// if amianto move to down
				if(this._y > prevPos.y) 
					moved = "down";

				switch(moved) {
					case "up" :
						this.playAnimation("MovingVertically", 20, -1);
						break;
					case "down" :
						this.playAnimation("MovingVertically", 20, -1);
						break;
					case "left":
						this.playAnimation("MovingLeft", 20, -1);
						break;
					case "right": 
						this.playAnimation("MovingRight", 20, -1);
						break;
				}
			})
			.bind('KeyUp', function(e) {
				// When user release some key, amianto begins standing animation
				this.playAnimation("Standing", 20, -1);
			});
		model.set({'entity' : entity});
	},
});