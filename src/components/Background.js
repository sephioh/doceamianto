Crafty.c("Background", {
  
	init: function(){
		this.requires("2D, "+gameContainer.conf.get('renderType')+", Image");
		this.placement = null,
		this.visible = false;
	}
	
});