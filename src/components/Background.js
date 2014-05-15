Crafty.c("Background", {
  
	init: function(){
		this.requires("2D, "+gameContainer.conf.get('renderType')+", Image");
		this.divisor = 1,
		this.placement = null,
		this.visible = false;
	}
	
});