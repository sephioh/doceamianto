Crafty.scene('start_screen', function(){
	Crafty.c('StartDiamond', {
		init: function(){
			this.requires('2D, ' + gameContainer.conf.get('renderType') + ', SpriteAnimation, start_diamond, Tween, Delay');
			this.attr({ x: Crafty.viewport.width/2 - this._w/2, y: Crafty.viewport.height/2 - this._h/2 })
			    .reel('Shine', 1500, 0, 0, 8);
		},
		
		startGame: function(){
			Crafty.audio.play('diamondshine');
			this.animate('Shine')
			    .tween({ alpha: 0 }, 1500)
			    .delay(function(){
				if(Crafty.mobile)
					utils.toggleFullScreen();
				gameContainer.runScene("level01", { backgroundColor: '#000000', entsColor: '#C0C0C0' });
			    }, 1500);
		}
	});
	Crafty.background('#000000');
	sc.startDiamond = Crafty.e('StartDiamond');
	sc.invisibleLayer = Crafty.e('2D, ' + gameContainer.conf.get('renderType')+ ', Mouse')
	    .one('KeyDown', function(){
		    this.unbind('Click');
		    sc.startDiamond.startGame();
	    })
	    .one('Click', function(){
		    this.unbind('KeyDown');
		    sc.startDiamond.startGame();
	    })
	    .attr({ w: Crafty.viewport.width, h: Crafty.viewport.height });
	
}, function() {					// executed after scene() is called within the present scene
	Crafty.removeAssets(resources.get('start_screen'));
});