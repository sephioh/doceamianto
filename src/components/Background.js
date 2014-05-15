Crafty.c("Background", {
  
	bgMoveRate: 15,
	backgroundSectionSize: 965 - 1,
	mapSectionSize: 1067.2,
	playerEnt: null,
	playerInitPos: null,
	
	init: function(){
		this.requires("2D, "+gameContainer.conf.get('renderType')+", Image");
		this.divisor = 1,
		this.placement = null,
		this.visible = false;
	}
	
});