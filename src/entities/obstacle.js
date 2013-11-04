Obstacle = BaseEntity.extend({
    defaults: {
	    'dimensions' : { height: 163, width: 53},
	    'movable': true,
	    'weight': 2,
    },
    initialize: function(){
		var model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", obstacle, grnd, Collision, Gravity");
		entity
			.attr({x: model.attributes.initialX, 
				   y: model.attributes.initialY,
				   z: model.attributes.initialZ,
				   h: model.get('dimensions').height,
				   w: model.get('dimensions').width,
				   movable: model.get('movable'),
				   weight: model.get('weight'),
			})
			.onHit('water', function(hit) { 
				this.movable = false;
			})
			.setName('Obstacle');
		model.set({'entity' : entity });
    }
});