Crafty.c('Policeman', {
      
	_sightRange: 700,
	_gunRange: 350,
	_shotDeviation: 22,
	_heightDeviation: 30,
	
	init: function() {
		this.requires('Figurant');
		this._startingSpeed = 1.1;
		this._speed = 1.1;
		this.walkLeftOrRight = function(dir,dis) {
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
			this.animate("Running", -1)
				.tween({ x: this._x + dis }, time)
				.one("TweenEnd",function() {
					if(!this._wasHit){
						this.animate("HostileStand", 1)
						    ._wandering = false;
						if(this._wanderingLoop)
							this.wanderLoop();    
					}
				});
			this._wandering = true;
			return this;
		};
		this.setFace = function(face) {
			this.addComponent("policeman" + face);
			face = face * 4;
			this.reel("Running", 700, [[1,face],[2,face],[3,face],[4,face],[1,face+1],[2,face+1],[3,face+1],[4,face+1]])
			    .reel("HostileStand", 50, 0, face+2, 1)
			    .reel("Shooting", 500, 1, face+2, 4)
			    .reel("Dying", 1000, 0, face+3, 5);
			    
			return this;
		};
		return this;
	},
	
	watchOutFor: function(obj) {
		var aimAtTime = null,
		    fps = Crafty.timer.FPS();
		this.bind("EnterFrame", function attention(e) {
			if (this._currentReelId == "Dying" || obj._dead) {
				this.unbind("EnterFrame", attention);
				return;
			}
			
			var that = this,
			    diff = this._x - obj._x,
			    canShoot = !this.isPlaying("HostileStand") && 
				this._currentReelId != "Shooting" && 
				obj._y < this._y + this._h && 
				obj._y > this._y - obj._h,
			    canRun = !this._wandering && 
				!this.isPlaying("Running") && 
				this._currentReelId != "Shooting",
			    toShootOrNotToShoot = function() {
				that.stopWalking();
				
				var f = e.frame;
				
				if(!aimAtTime) aimAtTime = f;
			  
				if(that.isPlaying("Running")) 
					that.pauseAnimation("Running");
			
				if(aimAtTime && 
				  ((f%(fps/2) == 0 && f > aimAtTime + fps/2) || 
				  aimAtTime + fps == f))
					that.pullTrigger();
			    };
			
			// if player is at the left side
			if (diff >= 0) {
				if (diff + this._shotDeviation <= this._gunRange && canShoot) {
					if(!this._flipX)
						this.flip('X');
					toShootOrNotToShoot();
				} else if (diff + obj._w <= this._sightRange && diff + this._shotDeviation > this._gunRange && canRun) {
					aimAtTime = null;
					this.walkLeftOrRight(-1, this._sightRange - this._gunRange);
				}
			} 
			else { 
				if ((diff + this._shotDeviation) * -1 <= this._gunRange && canShoot) {
					if (this._flipX)
						this.unflip('X');
					toShootOrNotToShoot();
				} else if ((diff + this._w) * -1 <= this._sightRange && (diff + this._shotDeviation) * -1 > this._gunRange && canRun) {
					aimAtTime = null;
					this.walkLeftOrRight(1, this._sightRange - this._gunRange);
				}
			}
		});
	},
	
	pullTrigger: function() {
		var bullet = Crafty.e("Bullet");
		this.animate("Shooting", 1)
		    .bind("FrameChange", function pulledTrigger(o) {
			if (o.currentFrame === 2) {
			      this._fire(bullet);
			      this.unbind("FrameChange", pulledTrigger);
			}
		    })
		    .one("AnimationEnd", function(){ if (this._currentReelId != "Dying") this.animate("HostileStand",1); });  
	},
	
	_fire: function(bullet) {
		var reach = this._gunRange;
		bullet.attr({ x: this._x, y: this._y + this._heightDeviation, w: 5, h: 3, z: this._z });
		if(this._flipX) {
			bullet.x += this._shotDeviation;
			reach *= -1;
		} else {
			bullet.x += this._w - this._shotDeviation;
		}
		Crafty.audio.play("pistolshot");
		bullet.onHit("carlos", function(hit) {
			if (hit[0].obj._currentReelId != "ShotDead") {
				hit[0].obj.trigger("GotShot");
				this.destroy();
			}
		    })
		    .shoot({ x: bullet._x + reach });
	}
	
  });