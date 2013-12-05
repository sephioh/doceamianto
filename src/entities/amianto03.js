Amianto03 = BaseEntity.extend({
    defaults: {
		'initial_x' : 100,
		'initial_y' : 100,
		'initial_z' : 1,
		'initial_w' : 78,
		'initial_h' : 96,
		'initial_speed' : 3,
		'newly_created' : false
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
				   h: model.get('initial_h'),
				   newly_created: model.get('newly_created')
			})
			// Set entity name
			.setName("Amianto03")
			// Animation definitions
			.reel("Standing", 500, 0, 0, 5)
			.reel("MovingVertically", 500, 0, 1, 5)
			.reel("MovingLeft", 500, 0, 2, 5)
			.reel("MovingRight", 500, 0, 3, 5)
			.reel("PushingRight", 500, 0, 4, 5)
			.reel("PushingLeft", 500, 0, 5, 5)
			// Default animation when amianto is created
			.animate("Standing", -1)
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
						if(this._currentReelId !== "MovingVertically")
							this.animate("MovingVertically", -1);
						break;
					case "down" :
						if(this._currentReelId !== "MovingVertically")
							this.animate("MovingVertically", -1);
						break;
					case "left":
						if(this._currentReelId !== "MovingLeft")
							this.animate("MovingLeft", -1);
						break;
					case "right": 
						if(this._currentReelId !== "MovingRight")
							this.animate("MovingRight", -1);
						break;
				}
			})
			.bind('KeyUp', function(e) {
				// When user release some key, amianto begins standing animation
				this.animate("Standing", -1);
			})
			// Collision with scenario delimiters
			.onHit('wall', function(hit) {
				var amianto = this,
					createAnew = true,
					nAmiantoPos = { x:0, y:0 };
					
				Crafty("amianto03").each(function(){
					if(this.newly_created)
						createAnew = false;
				});
				
				if(createAnew){
					switch(hit[0].obj.id) {
						case "left":
							nAmiantoPos.x = (Crafty.viewport.width-1) + amianto._w,
							nAmiantoPos.y = amianto._y;
							break;
						case "right":
							nAmiantoPos.x = 0 - amianto._w,
							nAmiantoPos.y = amianto._y;
							break;
						case "up":
							nAmiantoPos.x = amianto.x,
							nAmiantoPos.y = (Crafty.viewport.height-1) + amianto._h;
							break;
						case "down":
							nAmiantoPos.x = amianto._x,
							nAmiantoPos.y = 0 - amianto._h;
							break;
					}
					var nAmianto = new Amianto03({ initial_x: nAmiantoPos.x, initial_y: nAmiantoPos.y, newly_created: true });
				}
			}, function(){
				if(!this.newly_created){
					if((this._x > Crafty.viewport.width || this._x < 0) || 
					    (this._y > Crafty.viewport.height || this._y < 0))
					this.destroy();
				}else{
					this.newly_created = false;
				}
			})
			// Collision with wordblocks
			.onHit('wordblock', function(hit) {
				for (var i = 0; i < hit.length; i++) {
					if(hit[i].obj.movable){
						if(hit[i].normal.x < 0 && !this.isPlaying("PushingRight")){
							this.animate("PushingRight");
						} else if (hit[i].normal.x > 0 && !this.isPlaying("PushingLeft")){
							this.animate("PushingLeft");
						}
					}
				}
			});
		model.set({'entity' : entity});
	}
});