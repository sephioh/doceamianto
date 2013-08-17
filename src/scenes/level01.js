Crafty.scene("level01", function() {
	
	var elements = [
        "src/entities/amianto.js",
		"src/entities/darkheart.js",
		"src/entities/redheart.js",
        //"src/interfaces/info.js",
	];
	
	Crafty.background("#FFFFFF"); 
	
	//when everything is loaded, run the level01 scene
	require(elements, function() {
		
		sc['player'] = new Amianto();
		sc['hearts'] = [];
		sc['delimiters'] = [];
		sc['delays'] = Crafty.e("Delay");
		sc['bckgrndFade'] = Crafty.e("2D, Canvas, TweenColor").attr({ x: 0, y: 0, w: 800, h: 600, z: 0 }).rgb({ r:255, g: 255, b: 255 });
		
		//<hearts' loop> 
		var summoning = sc.delays.delay(function() {
			sc.hearts.push(new DarkHeart());  
			sc.hearts.push(new RedHeart());
		    sc.hearts.push(new DarkHeart());
		},2000,-1);
		//</hearts' loop>
		
		//<change background color>
		var i = 0,
			blue = { r: 0 , g: 0 , b: 255 },
			yellow = { r: 255, g: 255, b: 0 },
			white = { r: 255, g: 255, b: 255 };
		  
		var backgroundChange = sc.delays.delay(function() {
			switch(i) {
				case 0: 
					sc.bckgrndFade.tweenColor(blue, 255);
					break;
				case 1: 
					sc.bckgrndFade.tweenColor(yellow, 255);
					break;
				case 2: 
					sc.bckgrndFade.tweenColor(white, 255);
					break;
			}
			if(++i > 2) 
				i = 0; 
		},10000,-1);
		//</change background color>
		
		//<delimiters>
		var delimitersMap = {
			bottom: { x: 210, y: 643, w: 590, h: 1, 	shape: [[0,0],[590,1]], isfloor: true }, 
			left: 	{ x: 210, y: 242, w: 1, h: 400, 	shape: [[0,0],[1,400]], isfloor: false }, 
			top: 	{ x: 210, y: 242, w: 590, h: 1, 	shape: [[0,0],[590,1]], isfloor: false }, 
			right: 	{ x: 800, y: 242, w: 1, h: 400, 	shape: [[0,0],[1,400]], isfloor: false }, 
			under: 	{ x: 210, y: 1700, w: 590, h: 1,	shape: [[0,0],[590,1]], isfloor: true } 
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
		
		Crafty.viewport.centerOn(sc.player.get('entity'),1);
		
		Crafty.settings.modify("autoPause",true);
		
	});
	
	this.muchLove = Crafty.bind('TooMuchLove', function() {
		var playerEnt = sc.player.get('entity');
		sc.hrtsDelay.destroy();
		sc.delimiters[0].destroy();
		Crafty.viewport.follow(playerEnt,0,0);
		playerEnt._stopMoving();
		playerEnt.disregardMouseInput = true;
		playerEnt.animate("AmiantoFalling",32,-1);
		window.setInterval(function(){ playerEnt.animate("AmiantoHittingTheGround",32,0); },4500);
		//playerEnt.addComponent("Gravity");
 		//playerEnt.gravity('floor');
	});
	
}, function(){ 
	Crafty.unbind('TooMuchLove', this.muchLove); 
});
