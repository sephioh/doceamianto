Crafty.c('Particle', {
     
	init: function() {
		this.requires("2D, Canvas, Color, Tween");
		    
		return this;
	},
	
	interpolation: function(props, time){
		this.tween(props, time)
		    .bind('TweenEnd', function() { 
			    this.destroy(); 
		    });
		return this;
	}
    
  });
	