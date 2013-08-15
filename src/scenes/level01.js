Crafty.scene("main", function() {
	
	//MAP_HEIGHT = Crafty.DOM.window.height;//15*32;
	//MAP_WIDTH = Crafty.DOM.window.width;//30*32;
	
	var elements = [
        "src/entities/amianto.js",
		"src/entities/darkheart.js",
		"src/entities/redheart.js",
        //"src/interfaces/info.js",
	];
	
 	//Crafty.background("rgb(0,0,0)");
	//Crafty.box2D.init(0, 10, 32, true);
	
	//when everything is loaded, run the main scene
	require(elements, function() {
		//var map = Crafty.e("TiledLevel"); //Creates an entity with the "TiledLevel" component.
		//var tiledMap = map.tiledLevel("./scenery/dungeon.json", gameContainer.conf.get('renderType')); //Draw the level
		
		//infc['info'] = new Info();
		sc['player'] = new Amianto();
		sc['hearts'] = [];
		sc['delimiters'] = [];
		sc['hrtsDelay'] = Crafty.e("Delay");
		
		//<hearts' loop> 
		var summoning = sc.hrtsDelay.delay(function() {
			sc.hearts.push(new DarkHeart());  
			sc.hearts.push(new RedHeart());
		    sc.hearts.push(new DarkHeart());
		},2000,-1);
		//</hearts' loop>
		
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