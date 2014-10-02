Crafty.c("StartDiamond", {
	init: function(){
		this.requires("2D, " + gameContainer.conf.get('renderType') + ", SpriteAnimation, start_diamond, Tween, Delay");
		this.attr({ x: Crafty.viewport.width/2 - this._w/2, y: Crafty.viewport.height/2 - this._h/2, z: 999 })
		    .reel("Shine", 1500, 0, 0, 8);
	},
	
	startGame: function(){
		Crafty.audio.play("diamondshine");
		this.animate("Shine");
		this.tween({ alpha: 0 }, 1500);
		this.delay(function(){
			if(Crafty.mobile)
				utils.toggleFullScreen();
			gameContainer.runScene("level01", { backgroundColor: '#000000', entsColor: '#C0C0C0' });
		}, 1500);
	}
});