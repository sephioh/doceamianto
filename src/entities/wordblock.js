Wordblock = BaseEntity.extend({
	defaults: {
		  'movable': true,
		  'text_size' : 20,
	},
	initialize: function(){
		var model = this,
		    entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", wordblock, Text, Collision")
			.attr({	
			  x: model.get('initialX'), 
			  y: model.get('initialY'),
			  z: model.get('initialZ'),
			  h: model.get('initialH'),
			  w: model.get('initialW'),
			  movable: model.get('movable'),
			  full_text: model.get('full_text'),
			  text_size: model.get('text_size')
			});
		entity
			.text(model.get('full_text'))
			.textColor("#FFFFFF")
			.textFont({ size: entity.text_size+"px", family: 'Perfect_dos_vga_437' })
			// Collision with other wordblocks
			.onHit('wordblock', function(hit) {
			})
			// Collision with scenario delimiters
			.onHit('wall', function(hit) {
			})
			.onHit('amianto03', function(hit){
			})
			.onHit('wordplaceholder',function(hit){
			},function(){
			})
			.collision(new Crafty.polygon([[0,0],[entity._w,0],
			    [entity._w,entity._h-(entity._h/5)],[0,entity._h-(entity._h/5)]]));
			
		model.set({'entity' : entity });
	}
});