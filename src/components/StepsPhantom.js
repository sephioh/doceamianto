Crafty.c("StepsPhantom", {
	init: function(){
		this.requires('2D, '+gameContainer.conf.get('renderType')+', Tween, Delay, Collision, SpriteAnimation, nightclub_phantom')
		    .attr({ h: 80, w: 85 })
		    .reel("Moving",500,0,0,5)
		    .reel("Puft",500,[[0,0],[0,0],[6,0],[6,0],[0,0],[0,0],[6,0],[6,0],[0,0],[0,0],[6,0],[6,0]])
		    .animate("Moving",-1)
		    .collision(new Crafty.polygon([[this.w/4,0],[3*this._w/4,0],[3*this._w/4,this._h],[this._w/4,this._h]]))
		    /*.onHit("amianto05", function(hit){
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
			
		    })*/
		    .attr({alpha: .5, z: 300});
		this._step = 0;
	},
	followSteps: function(rails, steps, attack){
		this.attr(steps[0]);
		this._rails = rails;
		this._steps = steps;
		this._attackObj = attack;
		this._nextStep();
	},
	_nextStep: function(){
		var n = ++this._step,
		    dev = 0,
		    obj = this._attackObj;;
		if (n > 13)
			this.flip("X");
		if(n + 1 > this._steps.length){
			  this.destroy();
			  return;
		}
		if(n<=12 || n>13 || !obj){
			if(obj && this._attackDir)
				dev = obj._w/2 * this._attackDir; 
			var next = { x: this._steps[n].x + dev, y: this._steps[n].y - this._h };
			this.tween(next, 400)
			    .delay(function(){ this.one("TweenEnd", this._nextStep) }, 175)
			    .z += 1;
		}else{
			this._attack();
		}   
	/*	++this._step;
		var n = this._step;
		if (n > 13)
			this.flip("X");
		if(n<=12 || n>13 || !this._attackObj){
			var obj = this._attackObj,
			    jack = 0;
			if(n + 1 > this._steps.length){
			    this.destroy();
			    return;
			}
			if(this._attackDir)
				jack = obj._w/2 * this._attackDir; 
			var next = { x: this._steps[n].x + jack, y: this._steps[n].y - this._h };
			this.tween(next, 300)
			    .delay(function(){ this.one("TweenEnd", this._nextStep) }, 175)
			    .z += 1;
		}else{
			
			this._attack();
		}*/
	},
	_attack: function(){
		var obj = this._attackObj,
		    dirX = obj._x > this._x ? 1 : -1,
		    plusSteps = 7,
		    coords,
		    diff,
		    cStep,
		    goTo,
		    newRail;
		this._attackDir = dirX;
		this._step += plusSteps;
		for(var r in this._rails){
			coords = this._rails[r][this._step],
			diff = obj._x + obj._w/2 - coords.x;
			if(!goTo || (cStep && Math.abs(diff) < Math.abs(obj._x + obj._w/2 - cStep.x))){
				cStep = coords;
				goTo = { x:cStep.x + obj._w/2 * dirX, y: cStep.y - this._h };
				newRail = this._rails[r];
			}
		}
		this._steps = newRail;
		if (dirX===1)
			this.flip("X");
		this.tween(goTo, 420)
		    .delay(function(){ this._z += plusSteps; this.one("TweenEnd", this._nextStep); }, 175);
	},
	beDestroyed: function(){
		this.cancelTween('x')
		    .cancelTween('y')
		    .animate("Puft")
		    .one("AnimationEnd", function(){ this.destroy() })
		    ._delays = [];
	}
});