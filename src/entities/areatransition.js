AreaTransition = BaseEntity.extend({
    defaults: {
    },
    initialize: function() {
	var model = this,
	    entity = Crafty.e("2D, Collision")
		.attr({
		  x: model.get('x'), 
		  y: model.get('y'), 
		  w: model.get('w'), 
		  h: model.get('h')
		}),
	    show = this.get('show'),
	    side = this.get('side');
	entity.onHit("carlos", function(hit) { 
		var C = hit[0].obj, norm = hit[0].normal, walk;
		if(!C._transiting) {
			if(norm.x !== 0) {
				C._transiting = true;

				if(norm.x === 1) {
					if (side == "left") {
						sc.mm.showMapPart(show);
					}
					else {
						sc.mm.showMapPart(show, false);
					}
				} else {
					if (side == "left") {
						sc.mm.showMapPart(show, false);
					}
					else {
						sc.mm.showMapPart(show);
					}
					
				}
			}
		}
	    }, function(){
		    Crafty("carlos")._transiting = false;
	  });
	
	model.set({'entity' : entity});
    }
});