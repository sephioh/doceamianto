Crafty.c('Figurant', {

	_startingSpeed: 0.3,
	_speed: 0.3,
	_alert: 0,
	_wandering: false,
	_wanderingLoop: false,
	
	init: function() {
		this.requires('2D, '+gameContainer.conf.get('renderType')+', SpriteAnimation, Tween, Collision, Delay');
		this.onHit('wall', function(hit) {
			var hitDirX = hit[0].normal.x;
			if (!this._wasHit)
				this.walkLeftOrRight(hitDirX);
		    })
		    .onHit('mud', function(hit) {
			var hitDirX = hit[0].normal.x;
			if (!this._wasHit)
				this.walkLeftOrRight(hitDirX);
		    })
		    .onHit('stairs', function(hit) {
			var hitDirX = Math.round(hit[0].normal.x);
			if (!this._wasHit)
				this.walkLeftOrRight(hitDirX);
		    })
		    .onHit('platform_border', function(hit) {
			var hitDirX = hit[0].normal.x;
			if (!this._wasHit)
				this.walkLeftOrRight(hitDirX);
		    })
		    .bind('Alert',function(int) {
			if (!this._wasHit)
				this.setAlert(int)
				    .walkLeftOrRight();
		    });
		return this;
	},
		
	setSpeed: function(newSpeed) {
	    this._speed = newSpeed;
	    return this;
	},
	
	// {number} face: identifier of figurant
	setFace: function(face) {
		this.addComponent("figurant" + face);
		face = face*2;
		this.reel("Walking0", 1500, 0, face, 8)
		    .reel("Walking1", 1100, 0, face, 8)
		    .reel("Walking2", 700, 0, face, 8)
		    .reel("StandingStill", 50, [[0,face+1],[0,face+1]])
		    .reel("Dying", 1000, 3, face+1, 5);
		return this;
	},
	
	// 0, 1, 2
	setAlert: function(num) {
		if (_.isNumber(num) && num < 3)
			this._alert = num;
		// set speed to double or triple the starting speed
		return this.setSpeed(this._startingSpeed * (num+1));
	},
	
	// dir: accepted values are -1 or 1 for left or right respectively
	// dis: distance in pixels
	walkLeftOrRight: function(dir,dis) {
		var time;
		if (this._wandering)
			this.stopWalking();
		if (_.isUndefined(dir)) 
			dir = Math.random() < 0.5?-1:1;
		if (_.isUndefined(dis))
			dis = Math.ceil(Math.random() * 500);
		time = Math.ceil((dis*5)/this._speed);
		if (dir == -1) {
			dis *= -1;
			if(!this._flipX)
				this.flip('X');
		}
		else 
		if (this._flipX) {
			this.unflip('X');
		}
		this.animate("Walking" + this._alert, -1)
			.tween({ x: this._x + dis }, time)
			.one("TweenEnd",function() {
				if(!this._wasHit){
					this.animate("StandingStill", 1)
					    ._wandering = false;
					if(this._wanderingLoop)
						this.wanderLoop();    
				}
			});
		this._wandering = true;
		return this;
	},
	
	_walk: function () {
		if(!this._wandering && this._wanderingLoop)
			this.walkLeftOrRight();
	},
	
	wanderLoop: function() {
		var time = Math.ceil(Math.random() * 5000);
		this._wanderingLoop = true;
		this.delay(this._walk,time,0);
		return this;
	},
	
	stopWalking: function() {
		this.cancelTween('x')
		    .cancelDelay(this._walk)
		    ._wandering = false;
		return this;
	},
	
	stopWanderLoop: function() {
		this._wanderingLoop = false;
		if(this._wandering)
			this.stopWalking();
		return this;
	},
	
	shot: function() {
		this._wasHit = true;
		Crafty.trigger("FigurantDied");
		this.stopWanderLoop()
		    .animate("Dying", 1)
		    .delay(function() {
			Crafty.e("LilPhantom").attr({ x: this._x, y: this._y, z: this._z }).arise();
			this.delay(function(){
				this.destroy();
			}, 5000);
		    }, 3500);
		return this;
	}
	
});