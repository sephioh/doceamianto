Wordplaceholder = BaseEntity.extend({
    defaults: {
	    'initialH': 80,
	    'initialW': 80,
	    'initialZ': 1
    },
    initialize: function(){
		var model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", wordplaceholder, Collision, SpriteAnimation")
				.attr({x: model.get('initialX'), 
					   y: model.get('initialY'),
					   z: model.get('initialZ'),
					   h: model.get('initialH'),
					   w: model.get('initialW')});
		entity
			.animate("Shining", 0, 0, 5)
			.playAnimation("Shining", 20, -1);
		model.set({'entity' : entity });
    }
});