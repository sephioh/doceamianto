Crafty.c("LilPhantom", {
  
	init: function(){
		this.requires('2D, '+gameContainer.conf.get('renderType')+', Tween, SpriteAnimation, lil_phantom')
		    .attr({ h: 80, w: 85 })
		    .reel("Arising",1000,0,1,8)
		    .reel("Moving",1000,0,0,8)
		    .alpha = .7;
		if (Crafty.math.randomInt(0,1) === 0)
			this.flip("X");
	},
	 
	arise: function(){
		this.animate("Arising")
		    .one("AnimationEnd", function(){ this.wend({ y: this._y - 1000 }); });
	},
	 
	wend: function(to){
		this.animate("Moving", -1)
		    .tween(to, 7500)
		    .one("TweenEnd", function(){
			this.destroy();
		    });
	},
	
});