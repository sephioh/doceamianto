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
			// Controls
			.multiway(model.get('initial_speed'), {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})
		model.set({'entity' : entity});
	},
});