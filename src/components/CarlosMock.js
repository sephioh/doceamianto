Crafty.c("CarlosMock",{
	init: function(){
		this.requires("2D,"+gameContainer.conf.get('renderType')+", SpriteAnimation, carlos, Gravity, Tween, Collision")
		this.reel("Running", 500, 1, 0, 5)
		    .reel("JumpingFalling", 500, [[2,2],[3,2],[3,2]])
		    .bind("Move", function(prevPos) {
			  //Crafty.trigger("PlayerMoved", prevPos);
		    })
		    .collision(new Crafty.polygon([[38,15],[70,15],[70,95],[38,95]]))
		    .onHit('grnd', function(hit) {
			for (var i = 0; i < hit.length; i++) {
				this.y += Math.ceil(hit[i].normal.y * -hit[i].overlap),
				this._up = false,
				this._falling = false,
				this.antigravity();
				if (this._currentReelId != "Running")
					this.animate("Running", -1);
			}
		    })
		    .gravity();
	}
  
})