Crafty.c("BadassPhantom", {
  
	init: function(){
		this.requires('2D, '+gameContainer.conf.get('renderType')+', Collision, Tween, SpriteAnimation, badass_phantom');
		this.reel("Shaping",2000,0,0,9)
		    .reel("Floating",2000,0,1,8)
		    .reel("Attacking",1500,0,2,9)
		    .collision()
		    .onHit("carlos", function(hit){
			
		    })
		    .alpha = 0.7;
	},
	
	shaping: function(){
		this.animate("Shaping", 1)
		    .one("AnimationEnd", function(){
			  this.animate("Floating", -1);
		    });
	}
	
});