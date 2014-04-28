Crafty.c("LilPhantom", {
	init: function(){
		this.requires('2D, '+gameContainer.conf.get('renderType')+', Tween, SpriteAnimation, lil_phantom');
		this.reel("Arising",1000,0,1,8)
		    .reel("Moving",1000,0,0,8)
		    .alpha = 0.7;
		if (Crafty.math.randomInt(0,1) === 0)
			this.flip("X");
	},
	 
	arise: function(){
		this.animate("Arising")
		    .one("AnimationEnd", this.moveUp);
	},
	 
	moveUp: function(){
		this.animate("Moving", -1);
		this.tween({ y: this._y - 1000 }, 7500)
		    .one("TweenEnd", function(){
			this.destroy();
		    });
	}
});