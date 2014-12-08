Wordblock = BaseEntity.extend({
	defaults: {
		  'movable': true
	},
	initialize: function(){
		var model = this,
		    entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", wordblock, Text, Collision, Delay")
			.attr({	
			  x: model.get('initialX'), 
			  y: model.get('initialY'),
			  z: model.get('initialZ'),
			  h: model.get('initialH'),
			  w: model.get('initialW'),
			  word_text: model.get('word_text'),
			  movable: model.get('movable')
			});
		entity
			.text(model.get('word_text'))
			.textColor("#FFFFFF")
			.textFont({ size: model.get('text_size')+"px", family: 'Amiga4ever_pro2' })
			// Collision with corners
			.onHit('blocker',function(hit){
				for (var i = 0; i < hit.length; i++) {
					this.x -= Math.floor(hit[i].normal.x * hit[i].overlap),
					this.y -= Math.floor(hit[i].normal.y * hit[i].overlap);
				}
			})
			.bind("Move", function(){
				this.textColor("#99FFFF"); 
			})
			.delay(function(){
				this.textColor("#FFFFFF");
			},75,-1)
			.collision(new Crafty.polygon([[0,0],[entity._w,0],
			    [entity._w,entity._h-(entity._h/5)],[0,entity._h-(entity._h/5)]]));
			
		model.set({'entity' : entity });
	}
});