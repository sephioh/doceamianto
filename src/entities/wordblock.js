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
			.textFont({ size: '20px', weight: 'bold', family: 'Perfect_dos_vga_437' });
		model.set({'entity' : entity });
    }
});