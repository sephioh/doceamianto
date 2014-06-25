Crafty.c("DanceFloor", {
  
	tileSize: 64,
	 
	init: function(){
		this.requires("SpriteAnimation")
		    .attr({ alpha: 0, floorIndex: null })
		this._fading = false;
		this.reel("transformation1",500,[[1,1],[4,1],[7,1],[10,1]])
		    .reel("transformation2",500,[[1,3],[4,3],[7,3],[10,3]])
		    .reel("transformation3",500,[[1,5],[4,5],[7,5],[10,5]])
		    .reel("transformation4",500,[[1,7],[4,7],[7,7],[10,7]]);
	},
	 
	setIndex: function(i){
		this.floorIndex = i;
	},
	 
	steppedOver: function(){
		if(!this._fading){
			this.addComponent("Delay");
			this.alpha = 1;
			this.fadeOff();
		}
	},
	 
	reveal: function(){
		this._fading = false;
		this._delays = [];
		this.reel("transformation1");
		this.addComponent("grnd");
		this.alpha = 0.5;
	},
	
	fadeOff: function(){
		this._fading = true;
		var h = 0;
		this.delay(function(){
			this.animate("transformation"+(++h));
		    }, 1000, 2, function(){
			this.one("AnimationEnd", function(){
				this.delay(function(){
				      this.animate("transformation4")
					  .one("AnimationEnd", function(){
						this.removeComponent("grnd")
						    .alpha = 0;
					  });
				},500);
			});
		    });
	}
	
});