Wordblock = BaseEntity.extend({
    defaults: {
	    'movable': true
    },
    initialize: function(){
		var model = this,
			//poly = new Crafty.polygon([[5,0],[-5,136],[58,136],[58,0]]),
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", wordblock, Text, Collision")
				.attr({x: model.attributes.initialX, 
					  y: model.attributes.initialY,
					  z: model.attributes.initialZ,
					  h: model.attributes.initialH,
					  w: model.attributes.initialW,
					  movable: model.get('movable'),
					  full_text:  model.attributes.full_text
				});
		entity
			// .collision(new Crafty.polygon([[0,0], [33,25], [33,2], [63, 25]])) 
			.text(model.attributes.full_text)
			.textFont({ size: '20px', weight: 'bold' });
		model.set({'entity' : entity });
    }
});