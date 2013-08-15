Crafty.scene("second", function() {
	
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
		var map = Crafty.e("TiledLevel"); //Creates an entity with the "TiledLevel" component.
		var tiledMap = map.tiledLevel("./scenery/dungeon.json", gameContainer.conf.get('renderType')); //Draw the level
		
		//infc['info'] = new Info();
		sc['player'] = new Amianto();
		sc['hearts'] = [];
		sc['delimiters'] = [];
		sc['hrtsDelay'] = Crafty.e("Delay");
		
		Crafty.viewport.centerOn(sc.player.get('entity'),1);
		
	});
		
}, function(){ 
});