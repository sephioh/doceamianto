Crafty.c("BadassPhantom", {
  
	lil_phantoms: [],
	lil_phantoms_at_place: 0,
  
	init: function() {
		this.requires('2D, '+gameContainer.conf.get('renderType')+', Collision, Tween, Delay, SpriteAnimation, badass_phantom');
		this.reel("Fusion",2500,0,0,9)
		    .reel("Floating",1000,0,1,8)
		    .reel("Attacking1",1250,0,2,9)
		    .reel("Attacking2",1000,0,2,9)
		    .reel("Attacking3",750,0,2,9)
		    .attr({ h: 120, w: 120 })
		    .collision()
		    .onHit("carlos", function(hit){
			if(this._currentReelId == "Attacking" + this.attacks.toString()) {
				hit[0].obj.trigger("LifeDrained");
				this.cancelDelay(this.attack);
			}
		    })
		    .bind("LilPhantomAtPlace", function(){
			++this.lil_phantoms_at_place;
			if (this.lil_phantoms_at_place == 3)
				this.delay(function(){
					this.alpha = .7,
					this.lil_phantoms[0].destroy(),
					this.lil_phantoms[1].destroy(),
					this.lil_phantoms[2].destroy(),
					this.animate("Fusion")
					    .bind("FrameChange", function gaindsubstance(o){
						  if (o.currentFrame == 5)
							  this.unbind("FrameChange", gaindsubstance)
							      .alpha = .8;
					    })
					    .one("AnimationEnd", function(){
						  this.animate("Floating", -1)
						      .hunt();
						  Crafty.trigger("BadassPhantomFinishedTransforming");
					    });
				    },1000)
				    .unbind("LilPhantomAtPlace");
			      
		    })
		    .attr({ 
		      alpha: 0,
		      speedIncrRate: .05,
		      attacks: 1
		    });
	},
	
	shaping: function() {
		var that = this;
		
		this.lil_phantoms[0] = Crafty.e("LilPhantom")
		    .attr({ x: this._x - 700, y: this._y - 200, z: this._z })
		    .flip("X")
		    .animate("Moving", -1)
		    .tween({ x: this._x - 5, y: this._y + 38 }, 6000)
		    .one("TweenEnd", function(){ this.unflip("X"); that.trigger("LilPhantomAtPlace"); }),
	 
		this.lil_phantoms[1] = Crafty.e("LilPhantom")
		    .unflip("X")
		    .attr({ x: this._x , y: this._y - 1000, z: this._z })
		    .animate("Moving", -1)
		    .tween({ x: this._x + 15, y: this._y - 5 }, 6000)
		    .one("TweenEnd", function(){ that.trigger("LilPhantomAtPlace"); }),
	 
		this.lil_phantoms[2] = Crafty.e("LilPhantom")
		    .unflip("X")
		    .attr({ x: this._x + 1000, y: this._y + 200, z: this._z })
		    .animate("Moving", -1)
		    .tween({ x: this._x + 45, y: this._y + 38 }, 6000)
		    .one("TweenEnd", function(){ that.trigger("LilPhantomAtPlace"); });
		
		return this;
	},
	 
	hunt: function() {
		this.delay(this.attack, 4000, -1);
		return this;
	},
	
	attack: function() {
		var C = Crafty("carlos"),
		    T = Math.round((Math.abs(C._x - this._x) + 1 * 20000) / this.attacks * this.speedIncrRate);
		if (!C._dead) {
			if (C._x > this._x && !this._flipX)
				this.flip("X");
			else if (C._x < this._x && this._flipX)
				this.unflip("X");
			this.animate("Attacking" + this.attacks.toString())
			    .tween({ x: C._x, y: C._y - 40 }, T)
			    .one("TweenEnd", function() {
				var delta;
				if (!this._flipX)
					delta = { x: this._x + 100, y: this._y - 180 };
				else
					delta = { x: this._x - 100, y: this._y - 180 };
				this.animate("Floating", -1)
				    .tween(delta, 1000);
			    });
			if(this.attacks < 3)
				++this.attacks;
		}
	}
	
});