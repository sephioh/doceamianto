Wordblock = BaseEntity.extend({
    defaults: {
	    'movable': true,
		'newly_created' : false

    },
    initialize: function(){
		var model = this,
			//poly = new Crafty.polygon([[5,0],[-5,136],[58,136],[58,0]]),
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", wordblock, Text, Collision")
				.attr({	
					  x: model.get('initialX'), 
					  y: model.get('initialY'),
					  z: model.get('initialZ'),
					  movable: model.get('movable'),
					  full_text: model.get('full_text'),
					  newly_created: model.get('newly_created')
				});
		entity
			.text(model.get('full_text'))
			.textColor('#FFFFFF')
			.textFont({ size: '70px', family: 'Perfect_dos_vga_437' })
			// Collision with other wordblocks
			.onHit('wordblock', function(hit) {
				for (var i = 0; i < hit.length; i++) {
					if(hit[i].obj.movable){
						hit[i].obj.x -= (hit[i].normal.x * -hit[i].overlap);
						hit[i].obj.y -= (hit[i].normal.y * -hit[i].overlap);
					}
				}
			})
			// Collision with scenario delimiters
			.onHit('wall', function(hit) {
				var wordblock = this;
				for(var i = 0;i<hit.length;i++) {
					var	worblocksCount = 0, // Number of wordblocks with same full_text of "this" instance
					nWordblockPos = { x: wordblock._x, y:wordblock._y };

					Crafty("wordblock").each(function(){
						if(wordblock.full_text == this.full_text)
							worblocksCount += 1;
					});
					// If we have 1 wordblock with the word, we create another one
					if(worblocksCount == 1){
						switch(hit[i].obj.id) {
							case "left":
								nWordblockPos.x = Crafty.viewport.width;
								break;
							case "right":
								nWordblockPos.x = -wordblock._w;
								break;
							case "up":
								nWordblockPos.y = Crafty.viewport.height;
								break;
							case "down":
								nWordblockPos.y = -wordblock._h;
								break;
						}
						var newWorkBlock = new Wordblock({ initialX: nWordblockPos.x,
										    initialY: nWordblockPos.y,
										    initialZ: wordblock._z,
										    initialH: wordblock._h,
										    initialW: wordblock._w,
										    full_text: wordblock.full_text });
						sc.wordblocks.push(newWorkBlock);
					}
				}
			}, function(){
				if(!this.newly_created){
					if((this._x > Crafty.viewport.width || this._x < 0) ||
					    (this._y > Crafty.viewport.height || this._y < 0)) {
						this.destroy();
					}
				} else {
					this.newly_created = false;
				}
			})
			.onHit('amianto03',function(hit){
				var wordblock = this,
					delta = { x: 0, y:0 };

				if(this.movable) {
					if (hit[0].normal.x!==0){
						delta.x = hit[0].normal.x * -hit[0].overlap;
					} else {
						delta.y = hit[0].normal.y * -hit[0].overlap;
					}
					// If some other wordblock with same full_text, it have to be moved too
					Crafty("wordblock").each(function(){
						if(wordblock.full_text == this.full_text){
							this.x += delta.x;
							this.y += delta.y;
							this.textColor("#00FFFF").textFont({ type: "italic" })
						}
					});
				}
			},function(){
				this.textColor("#FFFFFF").textFont({ type: "normal" })
			})
			.onHit('wordplaceholder',function(hit){
				
			},function(){
			  
			});
			
		model.set({'entity' : entity });
    }
});