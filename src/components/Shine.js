Crafty.c("Shine", {
  
	init: function(){
		this.requires("SpriteAnimation")
		    .attr({ alpha: 0, shineIndex: null })
		this._fading = false;
	},
	 
	setShineAnimations: function(shIndex){
		if(typeof shIndex == "number")
			this.shineIndex = shIndex;
		switch(this.shineIndex){
		  case 0:
		    this.reel("transformation1",500,[[0,1],[3,1],[6,1],[9,1]])
			.reel("transformation2",500,[[0,3],[3,3],[6,3],[9,3]])
			.reel("transformation3",500,[[0,5],[3,5],[6,5],[9,5]])
			.reel("transformation4",500,[[0,7],[3,7],[6,7],[9,7]]);
		    break;
		  case 1: 
		    this.reel("transformation1",500,[[0,0],[3,0],[6,0],[9,0]])
			.reel("transformation2",500,[[0,2],[3,2],[6,2],[9,2]])
			.reel("transformation3",500,[[0,4],[3,4],[6,4],[9,4]])
			.reel("transformation4",500,[[0,6],[3,6],[6,6],[9,6]]);
		    break;
		  case 2:   
		    this.reel("transformation1",500,[[1,0],[4,0],[7,0],[10,0]])
			.reel("transformation2",500,[[1,2],[4,2],[7,2],[10,2]])
			.reel("transformation3",500,[[1,4],[4,4],[7,4],[10,4]])
			.reel("transformation4",500,[[1,6],[4,6],[7,6],[10,6]]);
		    break;
		  case 3: 
		    this.reel("transformation1",500,[[2,0],[5,0],[8,0],[11,0]])
			.reel("transformation2",500,[[2,2],[5,2],[8,2],[11,2]])
			.reel("transformation3",500,[[2,4],[5,4],[8,4],[11,4]])
			.reel("transformation4",500,[[2,6],[5,6],[8,6],[11,6]]);
		    break;
		  case 4:
		    this.reel("transformation1",500,[[2,1],[5,1],[8,1],[11,1]])
			.reel("transformation2",500,[[2,3],[5,3],[8,3],[11,3]])
			.reel("transformation3",500,[[2,5],[5,5],[8,5],[11,5]])
			.reel("transformation4",500,[[2,7],[5,7],[8,7],[11,7]]);
		    break;
		  default: 
		    throw "Tile shine animations could not be defined. Is .shineIndex correctly set?";
		}
		return this;
	},

	reveal: function(){
		this._fading = false;
		this._delays = [];
		this.reel("transformation1");
		this.alpha = 0.5;
	},
	
	fullShine: function(){
		if(!this._fading){
			this.addComponent("Delay");
			this.alpha = 1;
			this.fadeOff();
		}
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
						    this.alpha = 0;
					  });
				},500);
			});
		    });
	}
	
})