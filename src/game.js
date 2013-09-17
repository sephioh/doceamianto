window.onload = function() {
  
    var version = null,
		today = new Date(),
		lang = getUrlVars()['lang'];
	lang = ((lang != 'en')?'pt':'en');
	
	// Fix for cache
    if(gameContainer.env == 'dev') {
		version = today.getDay()+"_"+ today.getHours() +"_"+today.getSeconds();
	} else {
		version = gameContainer.gameVersion;
	};
    
    //start Crafty
    Crafty.init(800, 600);
    Crafty.canvas.init();
    
    require([
	    "src/assets.js?v="+version+"",
	    "src/config.js?v="+version+"",
	    "src/lang/lang-"+lang+".js",
		"src/components/ProgressBar.js",
    ], function() {
	
	// allow playing MP3 files
	Crafty.support.audio = true;
	
	assets = new Assets();
	
	gameContainer.setNextSceneInfo({ 
	  name: "level01",
	  elements: [
		  "src/components/TweenColor.js?v="+version+"",
		  "src/entities/base/BaseEntity.js?v="+version+"",
		]
	});
	
	gameContainer['conf'] = new Config({});
		
	//the loading screen - that will be display while assets loaded
	Crafty.scene("loading", function() {
	    // clear scene and interface
	    sc = []; infc = [];   
		
		// set sprites for next scene
		assets.createSprite(gameContainer.scene);
		// set sounds for next scene
		assets.createSound(gameContainer.scene);
		
	    sc['progressbar'] = Crafty.e("2D, ProgressBar, Persist")
			.attr({ x: 150, y : 140, w: 300, h: 25, z: 100 })
			// this .progressBar(String eventName, Number blockCount, Number maxValue, 
			// Boolean flipDirection, String emptyColor, String filledColor, String renderMethod)
			.progressBar("LoadingProgress", 10, 100, false, "white", "red", "DOM");
		
		// load takes an array of assets and a callback when complete
	    Crafty.load(assets.getPaths(gameContainer.scene), 
			function() {	
				//when everything is loaded, run scene specified in gameContainer
				require(gameContainer.elementsToLoad, function() {	   
					progressbar.destroy();
					
					if (gameContainer.scene != undefined) {
						
						Crafty.scene(gameContainer.scene);
						
					}
				});
			},
			function(e) {
				//progress
				Crafty.trigger("LoadingProgress", e.percent);
			},
			function(e) {
				//error
			}
		);
	});
	    
	// declare all scenes
	var scenes = [
		"src/scenes/level01.js?v="+version+"",
		"src/scenes/level02.js?v="+version+"",
	];
	    
	require(scenes, function(){});

	//automatically play the loading scene
		Crafty.scene("loading");
    });
};