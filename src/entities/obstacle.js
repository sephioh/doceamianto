Obstacle = BaseEntity.extend({
    defaults: {
	    'dimensions' : { height: 136, width: 57},
	    'movable': true,
	    'weight': 3,
    },
    initialize: function(){
		var model = this,
			poly = new Crafty.polygon([[-5,0],[-5,136],[48,136],[48,0]]),
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
			.collision(poly)
			.onHit('water', function(hit) { 
				this.antigravity();
				this.movable = false;
				this._falling = false;
				this._up = false;
				this.y += Math.ceil(hit[0].normal.y * -hit[0].overlap);
			})
			.gravityConst(4).gravity('grnd')
		model.set({'entity' : entity });
    }
});