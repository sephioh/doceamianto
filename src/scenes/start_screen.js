Crafty.scene('start_screen', function(){
	var startGame = function(){
		if(Crafty.mobile)
			Crafty.trigger("ToogleFullscreen");
		Crafty.audio.play('diamondshine');
		sc.startDiamond
		    .one('TweenEnd',function(){
			gameContainer.runScene("level01", { backgroundColor: '#000000', entsColor: '#C0C0C0' });
		    })
		    .tween({ alpha: 0 }, 1500);
	};
	Crafty.background('#000000');
	sc.startDiamond = Crafty.e('2D, ' + gameContainer.conf.get('renderType') + ', SpriteAnimation, start_diamond, Tween, Delay');
	sc.startDiamond.attr({ x: Crafty.viewport.width/2 - sc.startDiamond._w/2, y: Crafty.viewport.height/2 - sc.startDiamond._h/2, z: 1 })
	    .reel('Shine', 1500, 0, 0, 8)
	    .animate('Shine', -1);
	sc.invisibleLayer = Crafty.e('2D, ' + gameContainer.conf.get('renderType') + ', Mouse')
	    .one('KeyDown', function(){
		this.unbind('Click');
		startGame();
	    })
	    .one('Click', function(){
		this.unbind('KeyDown');
		startGame();
	    })
	    .attr({ w: Crafty.viewport.width, h: Crafty.viewport.height, z: 5000 });
}, function() {					// executed after scene() is called within the present scene
	Crafty.removeAssets(resources.get('start_screen'));
});