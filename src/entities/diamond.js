Diamond = BaseEntity.extend({
    defaults: {
	    'startingPoint' : { x: 2000, y: 1132}
    },
    initialize: function() {
		
	var model = this,
	    WIDTH = 94,	// Initial width
	    HEIGHT = 126,
	    entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Tween, diamond, diamond1, WiredHitBox");
	entity['value'] = 1,
	entity['_held'] = false;
	entity.attr({
	      x: model.get('startingPoint').x, 
	      y: model.get('startingPoint').y, 
	      z: 300, 
	      w: WIDTH, 
	      h: HEIGHT, 
	      alpha: 1.0
	    })
	    .setName('Diamond');
	
	model.set({'entity' : entity});
    },
    grow: function(to) {
	    var ent = this.getEntity();
	    if(to > ent.value) {
		    ent.removeComponent("diamond" + ent.value.toString()).addComponent("diamond" + to.toString());
		    ent.value = to;
		    Crafty.trigger("DiamondGrew", to);
	    }
    }
});