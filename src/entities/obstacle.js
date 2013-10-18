Obstacle = BaseEntity.extend({
    defaults: {
	    'startingPoint' : { x: 800, y: 1271, z:300},
	    'dimensions' : { height: 163, width: 53},
	    'movable': true,
	    'weight': 2,
    },
    initialize: function(){
		var model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", obstacle, grnd, Collision, Gravity");
		entity
			.attr({x: model.get('startingPoint').x, 
				   y: model.get('startingPoint').y,
				   z: model.get('startingPoint').z,
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