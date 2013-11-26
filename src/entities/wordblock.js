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
					  h: model.get('initialH'),
					  w: model.get('initialW'),
					  movable: model.get('movable'),
					  full_text: model.get('full_text')
				});
		entity
			.text(model.attributes.full_text)
			.textFont({ size: '20px', weight: 'bold', family: 'Perfect_dos_vga_437' })
			// Collision with other wordblocks
			.onHit('wordblock', function(hit) {
				for (var i = 0; i < hit.length; i++) {
					if(hit[i].obj.movable){
						hit[i].obj.x -= (hit[i].normal.x * -hit[i].overlap);
						hit[i].obj.y -= (hit[i].normal.y * -hit[i].overlap);
					}
				}
			});
		model.set({'entity' : entity });
    }
});