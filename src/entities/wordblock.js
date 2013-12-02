Wordblock = BaseEntity.extend({
    defaults: {
	    'movable': true
    },
    initialize: function(){
		var model = this,
			//poly = new Crafty.polygon([[5,0],[-5,136],[58,136],[58,0]]),
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", wordblock, Text, Collision")
				.attr({x: model.get('initialX'), 
					  y: model.get('initialY'),
					  z: model.get('initialZ'),
					  movable: model.get('movable'),
					  full_text: model.get('full_text')
				});
		entity
			.text(model.get('full_text'))
			.textFont({ size: '20px', family: 'Perfect_dos_vga_437' })
			// Collision with other wordblocks
			.onHit('wordblock', function(hit) {
				for (var i = 0; i < hit.length; i++) {
					if(hit[i].obj.movable){
						hit[i].obj.x -= (hit[i].normal.x * -hit[i].overlap);
						hit[i].obj.y -= (hit[i].normal.y * -hit[i].overlap);
					}
				}
			})
			// Stop wordblocks when they try to go out of scenario
			.onHit('wall', function(hit) {
				for (var i = 0; i < hit.length; i++) {
					// find position different than word_placeholder and other words
					this.x = Math.random()*800;
					this.y = Math.random()*600;
				}
			})
			.onHit('amianto03',function(hit){
				if(this.movable) {
					if (hit[0].normal.x!==0)
						this.x += hit[0].normal.x * -hit[0].overlap;
					else
						this.y += hit[0].normal.y * -hit[0].overlap;
					this.textColor("#00FFFF").textFont({ type: "italic" })
				}
			},function(){
				this.textColor("#000000").textFont({ type: "normal" })
			})
			.onHit('wordplaceholder',function(hit){
				
			},function(){
			  
			});
			
		model.set({'entity' : entity });
    }
});