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
	},
	
	startParallaxing: function() {
		if ( this.placement !== null && this.playerInitPos !== null && this.playerEnt !== null ) {
			return this.bind("PlayerMoved", function (prevPos) {
				var bgI = Math.floor(this.playerEnt._x / this.mapSectionSize),
				    shown = this.placement < bgI + 2 && this.placement > bgI - 2;
				if (!this._visible && shown)
					this.visible = true;
				else if (this._visible && !shown)
					this.visible = false;
				if (prevPos._x !== this.playerEnt._x) {
					var XD = (this.playerEnt._x - this.playerInitPos.x) / this.bgMoveRate;
					this.x = (XD / this.divisor) + (this.backgroundSectionSize * this.placement);
				} else {
					var YD = (this.playerEnt._y - this.playerInitPos.y) / this.bgMoveRate;
					this.y = YD / this.divisor;
				}
			});
		} else {
			return false;
		}
	}
	
});