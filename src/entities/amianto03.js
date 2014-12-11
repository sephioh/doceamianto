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
		    entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", CustomControls, SpriteAnimation, Collision, amianto03")
			// Set initial atributes
			.attr({x: model.get('initial_x'),
			    y: model.get('initial_y'),
			    z: model.get('initial_z'),
			    w: model.get('initial_w'),
			    h: model.get('initial_h'),
			    newly_created: model.get('newly_created')
			});
		entity
		    //.collision(new Crafty.polygon([[22,10],[59,10],[57,88],[24,88]]))
		    // Animation definitions
		    .reel("Standing", 500, 0, 0, 5)
		    .reel("MovingVertically", 500, 0, 1, 5)
		    .reel("MovingLeft", 500, 0, 2, 5)
		    .reel("MovingRight", 500, 0, 3, 5)
		    .reel("PushingRight", 500, 0, 4, 5)
		    .reel("PushingLeft", 500, 0, 5, 5)
		    // Controls
		    .multiwayer(model.get('initial_speed'), {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180}, 
			['UP_ARROW', 'DOWN_ARROW', 'RIGHT_ARROW', 'LEFT_ARROW'])
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
			var amianto = this;
			for(var i = 0;i<hit.length;i++) {
				var createAnew = true,
				    nAmiantoPos = { x: amianto._x, y:amianto._y },
				    yNormal = Math.round(hit[i].normal.y),
				    xNormal = Math.round(hit[i].normal.x),
				    maxRes = gameContainer.conf.get('maxRes');
					
				Crafty("amianto03").each(function(){
					if(this.newly_created){
						createAnew = false;
						return;
					}
				});
				
				//console.log(createAnew);
				if(createAnew) {
					if(yNormal !== 0)
						// up side
						if(yNormal === 1) {
							nAmiantoPos.y = maxRes.h - 1;
						} 
						// down side
						else {
							nAmiantoPos.y = 1 - amianto._h;
						}
					else
						// left side
						if(xNormal === 1) {
							nAmiantoPos.x = maxRes.w - 1;
						} 
						// right side
						else {
							nAmiantoPos.x = 1 - amianto._w;
						}
					
					//console.log("amianto created at "+JSON.stringify(nAmiantoPos));
					sc.player = new Amianto03({ initial_x: nAmiantoPos.x, initial_y: nAmiantoPos.y, newly_created: true });
				}
								
				if(Crafty.mobile && 
				  ((yNormal === -1 && this._y < hit[i].obj._y + this._h/2) ||
				  (yNormal === 1 && this._y - this._h/2 > hit[i].obj._y) ||
				  (xNormal === -1 && this._x < hit[i].obj._x + this._w/2) ||
				  (xNormal === 1 && this._x - this._w/2 > hit[i].obj._x))){
					Crafty.viewport.follow(this, 0, 0);
				  }
			}
		    }, function(){
			var x = this._x, y = this._y, maxRes = gameContainer.conf.get('maxRes');
			if (x > maxRes.w || x < -1 || 
 			    y > maxRes.h || y < -1){
				this.destroy();
				Crafty.viewport.follow(Crafty("amianto03"), 0, 0);
			    }
			if (this.newly_created){
				this.newly_created = false;				
			}
		    })
		    // Collision with wordblocks
		    .onHit('wordblock', function(hit) {
			for (var i = 0; i < hit.length; i++) {
				if(hit[i].obj.movable){
					// Do pushing animation
					if(hit[i].normal.x == -1){
						this.animate("PushingRight");
					} else if (hit[i].normal.x == 1){
						this.animate("PushingLeft");
					}

					// Push wordblocks if they are no colliding with another one or wall at its movement direction
					var wordblock_is_pushable = true,
					    current_wordblock = hit[i],
					    another_wordblocks = hit[i].obj.hit('wordblock'),
					    walls = hit[i].obj.hit('wall');
					
					// Test if current_wordblock is colliding with another_blocks at its movement direction
					if (another_wordblocks){
						for (var j = 0; j < another_wordblocks.length; j++) {
							if(current_wordblock.normal.x == another_wordblocks[j].normal.x &&
							   current_wordblock.normal.y == another_wordblocks[j].normal.y &&
							   current_wordblock.obj.movable &&
							   another_wordblocks[j].obj.movable) {
								wordblock_is_pushable = false;
							}
						}
					}

					// Test if current_wordblock is colliding with walls at its movement direction and if amianto is not hitting a wall
					if (walls){
						for (var i = 0; i < walls.length; i++) {
							if(current_wordblock.normal.y === walls[i].normal.y){
								wordblock_is_pushable = false;

								var playerHitWall = this.hit('wall');

								if(playerHitWall)
									for(var h = 0; h < playerHitWall.length; h++)
										// If the wall colliding with this wordblock is opposite to the wall the player hit
										if(walls[i].normal.y === -playerHitWall[h].normal.y && 
										    walls[i].normal.x === -playerHitWall[h].normal.x)
											wordblock_is_pushable = true; 
							}
						}
					}

					// Move wordblock if it's possible, or keep amianto(s) at its(their) previous position
					if(wordblock_is_pushable){
						current_wordblock.obj.x -= Math.ceil(current_wordblock.normal.x * -current_wordblock.overlap);
						current_wordblock.obj.y -= Math.ceil(current_wordblock.normal.y * -current_wordblock.overlap);
					} else {
						Crafty("amianto03").each(function(){
							this.x += Math.ceil(current_wordblock.normal.x * -current_wordblock.overlap);
							this.y += Math.ceil(current_wordblock.normal.y * -current_wordblock.overlap);
						});
					}
				}
			}
		    })
		    .onHit('blocker', function(hit) {
			// Stop amianto when she try to go out of scenario through corners
			for (var i = 0; i < hit.length; i++) {
				this.x += Math.ceil(hit[i].normal.x * -hit[i].overlap);
				this.y += Math.ceil(hit[i].normal.y * -hit[i].overlap);
			}
		    })
		    .animate("Standing", -1);
		model.set({'entity' : entity});
	},
	/*
	getPolygonMostSidePoint: function(side) {
		var ent = this.getEntity(), points = ent.map.points, most;
		for(var i = 0, plen = points.length; i < plen; i++){
			var p0 = points[i][0] - ent._x, p1 = points[i][1] - ent._y;
			switch(side){
			    case "left":
				most = _.isUndefined(most) ? p0 : p0 < most ? p0 : most;
				break;
			    case "right":
				most = _.isUndefined(most) ? p0 : p0 > most ? p0 : most;
				break;
			    case "up":
				most = _.isUndefined(most) ? p1 : p1 < most ? p1 : most;
				break;
			    case "down":
				most = _.isUndefined(most) ? p1 : p1 > most ? p1 : most;
				break;
			}
		}
		return most;
	}*/
});