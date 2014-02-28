Crafty.c('Bullet', {
    
    _bulletFlightTime: 500,
    
    init: function() {
	this.requires('2D, '+gameContainer.conf.get('renderType')+', Color, Tween, Collision');
	this.color('black');
	return this;
    },
    
    shoot: function(props) {
	this.color('yellow')
	    .tween(props, this._bulletFlightTime)
	    .one("TweenEnd", function(){ this.destroy(); })
	return this;
    },
    
    setFlightTime: function(ms) {
	this._bulletFlightTime = ms;
	return this;
    }
    
  });