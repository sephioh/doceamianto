Crafty.scene("level01", function() {
	
	var elements = [
        "src/entities/amianto.js",
		"src/entities/darkheart.js",
		"src/entities/redheart.js"
	];
	
	Crafty.background("#FFFFFF");
		
	//when everything is loaded, run the level01 scene
	require(elements, function() {
				
		sc['player'] = new Amianto();
		sc['hearts'] = [];
		sc['delimiters'] = [];
		sc['delays'] = Crafty.e("Delay");
		sc['bckgrndFade'] = Crafty.e("2D, Canvas, TweenColor").attr({ x: 0, y: 0, w: 800, h: 600, z: 0 });
		sc['bckgrndDegrade'] = Crafty.e("2D, DOM, Image").attr({ x: 0, y: 378, w: 800, h: 222, z: 0 }).image("web/images/transp01.png","repeat-x");
				
		// Play theme
		Crafty.audio.play("theme01", -1);
		
		//<hearts' loop> 
		var summoningHearts = sc.delays.delay(function() {
			sc.hearts.push(new DarkHeart());  
			sc.hearts.push(new RedHeart());
			sc.hearts.push(new DarkHeart());
		},2000,-1);
		//</hearts' loop>
		
		//<change background color>
		var i = 0,
			white = { r: 255, g: 255, b: 255 },
			yellow = { r: 255, g: 226, b: 78 },
			pink = { r: 255, g: 77, b: 153 },
			violet = { r: 128, g: 16, b: 216 },
			green = { r: 117, g: 232, b: 7 };
		  
		sc.bckgrndFade.rgb(white);
		
		Crafty.backgroundChange = Crafty.bind("EnterFrame",function() {
			if(!sc.bckgrndFade.isTweeningColor()){
				switch(i) {
					case 0: 
						sc.bckgrndFade.tweenColor(yellow, 255);
						break;
					case 1: 
						sc.bckgrndFade.tweenColor(pink, 255);
						break;
					case 2: 
						sc.bckgrndFade.tweenColor(violet, 255);
						break;
					case 3: 
						sc.bckgrndFade.tweenColor(green, 255);
						break;
				}
				if(++i > 3) 
					i = 0; 
			}
		});
		//</change background color>
		
		//<delimiters>
		var delimitersMap = {
			left: 	{ x: 0, y: 242, w: 1, h: 400, 	shape: [[0,0],[1,400]], isfloor: false }, 
			right: 	{ x: 800, y: 242, w: 1, h: 400, 	shape: [[0,0],[1,400]], isfloor: false }
		};
		
		_.each(delimitersMap, function(obj) {
			var delimiter = Crafty.e("2D, Collision, solid")
				.attr({x: obj.x, y: obj.y, w: obj.w, h: obj.h})
				.collision(new Crafty.polygon(obj.shape));
			if(obj.isfloor)
				delimiter.addComponent("floor");
			sc.delimiters.push(delimiter);
		});
		//</delimiters>
		
		Crafty.settings.modify("autoPause",true);
		
	});
	
	//	Event declarations

	// Amianto get max number of RedHearts
	this.muchLove = Crafty.bind('TooMuchLove', function() {
		var playerEnt = sc.player.get('entity');	// get Amianto object
		sc.delays.destroy();						//
		sc.delimiters[0].destroy();					// destroy delimiters
		sc.delimiters[1].destroy();					// destroy delimiters
		playerEnt._stopMoving();					//	
		playerEnt.disregardMouseInput = true;		// disable mouse controls
		playerEnt.disableControl();					// disable keyboard controls
		playerEnt.animate("AmiantoFalling",32,-1);	// animate Amianto falling

	});
	
}, function(){ 
	Crafty.unbind('TooMuchLove', this.muchLove); 
	Crafty.unbind('EnterFrame', Crafty.backgroundChange); 
});
