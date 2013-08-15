RedHeart = BaseEntity.extend({
	defaults: {
        
    },
    initialize: function(){
		var X = Crafty.math.randomInt(210,800),
			Y = 550,
			model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", heart, redHeart, Collision");
		entity['poly'] = new Crafty.polygon([[0,0],[50,0],[50,50],[0,50]]);
		entity
			.attr({x: X, y: Y, z: 375, h:50, w:50 })
			.collision(entity.poly)
			.bind('EnterFrame',function() {
				var rate = 0.1;
				if(Math.round(this._h - rate)==0) {
					this.destroy();
				} else {
				  this.attr({y: this._y - 0.02, x: this._x+(rate/2), w: this._w - rate, h: this._h - rate});
				  if(this._z > 0) {
					 entity.z = this._z - 1;
				  }
				  entity.poly.shift(rate * -1,rate * -1);
				  //this.css('backgroundSize','cover');
				}
			  })
			.setName('Red heart');
		model.set({'entity' : entity });
	}
});