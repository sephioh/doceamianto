Crafty.c('Figurant', {
  
    _startingSpeed: 0.3,
    _speed: 0.3,
    _alert: 0,
    
    init: function() {
	this.requires('2D, '+gameContainer.conf.get('renderType')+', SpriteAnimation, Tween, Collision, Delay');
	this.onHit('playerBullet', function(h) {
		if(!this._wasHit)
			this.animate("Dying",1)
			    .delay(function(){
				this.destroy();
			    }, 5000);
		h[0].obj.destroy();
		this._wasHit = true;
	})
	.onHit('wall', function(h) {
		var hitDirX = hit[i].normal.x;
		//this.x += Math.ceil(hit[i].normal.x * -hit[i].overlap);
		
		this.walkLeftOrRight(hitDirX);
		
		/*if(hitDirX === 1)
			this.walkLeftOrRight("left");
		if(hitDirX === -1)
			this.walkLeftOrRight("right");*/
	});
	return this;
    },
    
    setSpeed: function(newSpeed) {
	this._speed = newSpeed;
	return this;
    },
    
    // @param {number} face: identifier of figurant
    setFace: function(face) {
	this.addComponent("Figurant" + face);
	face = face*2;
	this.reel("Walking0", 1500, 0, face, 7)
	    .reel("Walking1", 1100, 0, face, 7)
	    .reel("Walking2", 700, 0, face, 7)
	    .reel("StandingStill", 50, [[0,face+1],[0,face+1]])
	    .reel("Dying", 1000, 3, face+1, 4);
	return this;
    },
    
    walkLeftOrRight: function(dir,dis) {
	var time;
	if (this._wandering)
		this.stopWalking();
	if (_.isUndefined(dir)) 
		dir = Math.random() < 0.5?-1:1;
	if (_.isUndefined(dis))
		dis = Math.ceil(Math.random() * 500);
	time = Math.ceil((dis*5)/this._speed);
	if (dir == -1)
		dis *= -1;
	this.animate("Walking" + this._alert, -1)
	    .tween({ x: this._x + dis }, time)
	    .one("TweenEnd",function() {
		this.animate("StandingStill",1);
		this._wandering = false;
	    });
	this._wandering = true;
	return this;
    },
    
    stopWalking: function() {
	this.cancelTween('x');
	this._wandering = false;
	return this;
    },
  
    setAlert: function() {
      
    }
    
  });