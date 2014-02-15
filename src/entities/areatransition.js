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
	    hide = model.get('hide'),
	    show = model.get('show');
		
	if(hide !== null || show !== null) {	
		entity.onHit("carlos", function(hit) { 
			var C = hit[0].obj, norm = hit[0].normal, walk;
			if(!C._transiting) {
				C.disableControl()
				    .pauseAnimation();
				C._transiting = true;
				if(norm.x !== 0) {
					if(norm.x === 1){
						walk = this._w + C._w + 1;
						if(hide !== null)
							// hide 'hide' map
							sc.mm.showMap(hide, false);
						if(show !== null)
							// show 'show' map
							sc.mm.showMap(show);
					}else{
						walk = - this._w - C._w - 1;
						if(hide !== null)
							// show 'hide' map
							sc.mm.showMap(hide); 
						if(show !== null)
							// hide 'show' map
							sc.mm.showMap(show, false); 
					}
				}
				
				C.animate("Running", -1)
					.tween({ x: C._x + walk }, 1000)
					.one("TweenEnd", function() {
						C.animate("StandingStill", 1)
						    .enableControl();
						C._transiting = false;
					});
				}
		    });
	} else {
		entity.addComponent('wall');
	}
	model.set({'entity' : entity});
    }
});