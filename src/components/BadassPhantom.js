Crafty.c("BadassPhantom", {
  
	init: function() {
		this.requires('2D, '+gameContainer.conf.get('renderType')+', Collision, Tween, Delay, SpriteAnimation, badass_phantom');
		this.reel("Shaping",2000,0,0,9)
		    .reel("Floating",2000,0,1,8)
		    .reel("Attacking",1000,0,2,9)
		    .collision()
		    .onHit("carlos", function(hit){
			if(this._currentReelId == "Attacking") {
				hit[0].obj.trigger("LifeDrained");
				this.cancelDelay(this.attack);
			}
		    })
		    .alpha = 0.8;
	},
	
	shaping: function() {
		this.animate("Shaping", 1)
		    .one("AnimationEnd", function(){
			  this.animate("Floating", -1);
		    });
		return this;
	},
	 
	hunt: function() {
		this.delay(this.attack, 4000, -1);
		return this;
	},
	
	attack: function() {
		var C = Crafty("carlos");
		if (!C._dead) {
			if (C._x > this._x && !this._flipX)
				this.flip("X");
			else if (C._x < this._x && this._flipX)
				this.unflip("X");
			this.animate("Attacking")
			    .tween({ x: C._x, y: C._y - 40 }, 1000)
			    .one("TweenEnd", function() {
				var delta;
				if (!this._flipX)
					delta = { x: this._x + 100, y: this._y - 180 };
				else
					delta = { x: this._x - 100, y: this._y - 180 };
				this.animate("Floating", -1)
				    .tween(delta, 1000);
			    });
		}
	}
	
});