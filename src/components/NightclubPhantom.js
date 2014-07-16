Crafty.c("NightclubPhantom", {
  
	init: function(){
		this.requires('2D, '+gameContainer.conf.get('renderType')+', Tween, Delay, Collision, SpriteAnimation, nightclub_phantom')
		    .attr({ h: 80, w: 85 })
		    .reel("Moving",500,0,0,5)
		    .animate("Moving",-1)
		    .collision()
		    .onHit("amianto05", function(hit){
			if(hit[0].obj._x > this._x && !hit[0].obj.tweens.length){
				hit[0].obj.disableControl()
					.animate("WasPushed",1)
					.unflip("X")
					.tween({ x: hit[0].obj._x + 150 }, 500)
					.one("TweenEnd", function(){ this.enableControl(); });
			}else if(!hit[0].obj.tweens.length){
				hit[0].obj.disableControl()
					.animate("WasPushed",1)
					.flip("X")
					.tween({ x: hit[0].obj._x - 150 }, 500)
					.one("TweenEnd", function(){ this.enableControl(); });
			}
		    })
		    .alpha = .2;
	},
	 
	attack: function(obj){
		var props,
		// time
		dur = Crafty.math.randomInt(0,750) + 750,
		// directions
		dirX = obj._x > this._x ? 1 : -1,
		dirY = obj._y > this._y ? 1 : -1,
		// para encontrar linha a percorrer, faz-se semelhança de triângulos
		A = {x: this._x, y: this._y},
		B = {x: this._x, y: obj._y},
		C = {x: obj._x, y: obj._y},
		D, E,
		angleBAC, angleACB, hyp1, hyp2,
		oc = C.x - B.x,
		ac = B.y - A.y;
		
		// a soma dos quadrados dos catetos é igual a[o quadrado da] porra da hipotenusa
		hyp1 = Math.sqrt( Math.pow(ac, 2) + Math.pow(oc, 2) );
		// ângulos agudos
		angleBAC = Math.round( Math.atan( oc / ac ) * 180 / Math.PI * 10000 ) / 10000;
		angleACB = Math.round( Math.atan( ac / oc ) * 180 / Math.PI * 10000 ) / 10000;
		// hipotenusa do triângulo maior
		hyp2 = hyp1 + 150;
		D = { x: A.x, y: A.y + ((Math.round( Math.cos(angleBAC * Math.PI / 180) * hyp2 * 10000 ) / 10000) * dirY) };
		E = { x: D.x + ((Math.round( Math.cos(angleACB * Math.PI / 180) * hyp2 * 10000 ) / 10000) * dirX), y: D.y };
		
		if (dirX===1)
			this.flip("X");
		props = E,
		props.alpha = 1;
		this.tween(props, dur)
		    .one("TweenEnd", function(){
			this.delay(function(){
				this.tween({ alpha: 0 },450)
				    .one("TweenEnd", function(){
					this.destroy();
				    });
			},50);
		    });
	}
	
});