Amianto03 = BaseEntity.extend({
    defaults: {
		'initial_x' : 0,
		'initial_y' : 0,
		'initial_z' : 1,
		'initial_w' : 78,
		'initial_h' : 96,
		'initial_speed' : 3
    },
    initialize: function() {
		var model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", amianto03, SpriteAnimation, Multiway, Collision");
		entity
			// Set initial atributes
			.attr({x: model.get('initial_x'),
				   y: model.get('initial_y'),
				   z: model.get('initial_z'),
				   w: model.get('initial_w'),
				   h: model.get('initial_h')})
			// Set entity name
			.setName("Amianto03")
			// Animation definitions
			.animate("Standing", 0, 0, 5)
			.animate("MovingVertically", 0, 1, 5)
			.animate("MovingLeft", 0, 2, 5)
			.animate("MovingRight", 0, 3, 5)
			.animate("PushingRight", 0, 4, 5)
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
			})
			// Collision with scenario delimiters
			.onHit('wall', function(hit) {
				// Stop amianto when she try to go out of scenario
				for (var i = 0; i < hit.length; i++) {
					this.x += Math.ceil(hit[i].normal.x * -hit[i].overlap);
					this.y += Math.ceil(hit[i].normal.y * -hit[i].overlap);
				}
			})
			// Collision with wordblocks
			.onHit('wordblock', function(hit) {
				for (var i = 0; i < hit.length; i++) {
					if(hit[i].obj.movable){
						
						if(hit[i].normal.x < 0){
							this.playAnimation("PushingRight");
						} else if (hit[i].normal.x > 0){
							this.playAnimation("PushingLeft");
						}
					}
				}
			});
		model.set({'entity' : entity});
	},
});