Wordplaceholder = BaseEntity.extend({
	defaults: {
		'initialH': 80,
		'initialW': 80,
		'initialZ': 1
	},
	initialize: function(){
		var model = this,
		    entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", wordplaceholder, Collision, SpriteAnimation")
		      .collision(new Crafty.polygon([[28,34],[39,34],[39,45],[28,45]]))
		      .attr({
			x: model.get('initialX'), 
			y: model.get('initialY'),
			z: model.get('initialZ'),
			full_text: model.get('full_text')
		      })
		      .reel("Shining", 500, 0, 0, 6)
		      .animate("Shining", -1)
		      .onHit('wordblock', function(hit){
			for (var i=0; i < hit.length; i++) {
				if(hit[i].obj.full_text == this.full_text){
					hit[i].obj.movable = false,
					hit[i].obj.z = 0,
					hit[i].obj.y = this._y + (this._h/2 - (hit[i].obj.h/2)),
					hit[i].obj.x = this._x - ((hit[i].obj.w/2) - this._w/2);
					var movableWordblocks = 0;
					Crafty("wordblock").each(function(){
						if(this.movable) 
							movableWordblocks++;
					});
					if(!movableWordblocks)
						Crafty.trigger("Tilt");
					this.destroy();
				}
			}
		      });
		model.set({'entity' : entity });
	}
});