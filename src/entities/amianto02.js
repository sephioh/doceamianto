Amianto = BaseEntity.extend({
    defaults: {
        'speed' : 4,
		'love' : 0
    },
    initialize: function() {
    	var model = this,
	    entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", amianto02, SpriteAnimation, MoveTo, Collision");
		entity
			.attr({x: 350, y: 350, z: 300, w:214, h:197 })
			.collision(new Crafty.polygon([[0,0],[214,0],[214,197],[0,197]]))
			//.twoway(model.get('speed'), model.get('speed')*2)
			.onHit('solid', function(hit) {
				for (var i = 0; i < hit.length; i++) {
					var hitDirY = Math.round(hit[i].normal.y), hitDirX = Math.round(hit[i].normal.x);
					if (hitDirY !== 0) { // hit bottom or top
						if (hitDirY === 1)  // hit the bottom 
							this.y = hit[i].obj.y + hit[i].obj.h;
						else 
						if (hitDirY === -1) // hit the top
							this.y = hit[i].obj.y - this._h;
						if(Math.round(this._prevPos.x) == Math.round(this._x)) 
							this._stopMoving();
					} else if(hitDirX !== 0) { // hit right or left
						if (hitDirX === 1) // hit right side
							this.x = hit[i].obj.x + hit[i].obj.w;
						else 
						if(hitDirX === -1) // hit left side
							this.x = hit[i].obj.x - this._w;
						if(Math.round(this._prevPos.y) == Math.round(this._y))
							this._stopMoving();
					}
				}
			  })
			/*.bind('Moved', function(e) {
			if(this._x<0 || this._y<0 || this._x>(MAP_WIDTH - entity._w) || this._y>(MAP_HEIGHT - entity._h)){
				this.attr({x: e.x, y: e.y});
				console.log(this.x+" "+this.y);
			}
			  })*/
			.bind('Click', function(e) {
				
			  })
			.bind('NewDirection',  function (d) {
			//console.log("X: "+ d.x + ", Y: " + d.y);
			  })
			.moveTo(model.get('speed'))
			.setTargetDeviation(((entity._w/2) * -1),(entity._h * -1))
			.setName('Player');
		
		model.set({'entity' : entity });
		
    }
    
});