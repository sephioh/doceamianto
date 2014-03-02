    Crafty.c('Figurant', {
      
	_startingSpeed: 0.3,
	_speed: 0.3,
	_alert: 0,
	_wandering: false,
	_wanderingLoop: false,
	
	init: function() {
		this.requires('2D, '+gameContainer.conf.get('renderType')+', SpriteAnimation, Tween, Collision, Delay');
		this.onHit('playerBullet', function(h) {
			if(!this._wasHit)
				this.animate("Dying",1)
					.delay(function() {
						this.destroy();
						//! here goes "transformation" to phatom
						
						
					}, 5000);
			h[0].obj.destroy();
			this._wasHit = true;
		}).onHit('wall', function(h) {
			var hitDirX = hit[i].normal.x;
			this.walkLeftOrRight(hitDirX);
		}).bind('alert',function(int) {
			this.setAlert(int);
		});
		return this;
	},
		
	setSpeed: function(newSpeed) {
	    this._speed = newSpeed;
	    return this;
	},
	
	// @param {number} face: identifier of figurant
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
		if(_.isNumber(num) && num<3)
		      this._alert = num;
		// set speed to double or triple the starting speed
		return this.setSpeed(this._startingSpeed * num+1);
	},
	
	// @param dir: accepted values -1, 1 for left and right
	// @param dis: distance in pixels
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
				this.animate("StandingStill",1);
				this._wandering = false;
				if(this._wanderingLoop)
					this.wanderLoop();
			});
		this._wandering = true;
		return this;
	},
	
	wanderLoop: function() {
		var time = Math.ceil(Math.random() * 5000);
		this._wanderingLoop = true;
		this.delay(function () {
			if(!this._wandering)
				this.walkLeftOrRight();
		},time,0);
	},
	
	stopWalking: function() {
		this.cancelTween('x');
		this._wandering = false;
		return this;
	},
	
	stopWanderLoop: function() {
		this._wanderingLoop = false;
		return this;
	}
  });