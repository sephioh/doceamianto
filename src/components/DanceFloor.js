Crafty.c("DanceFloor", {
  
	tileSize: 64,
	 
	init: function(){
		this.index = null;
	},
	 
	setIndex: function(i) {
		this.attr({ alpha: 0, index: i });
	},
	 
	showNextTile: function() {
		
	}
	
})