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
	
	/*gameContainer.setNextSceneInfo({ 
	  name: "level01",
	  elements: [
		  "src/components/TweenColor.js?v="+version+"",
		  "src/entities/base/BaseEntity.js?v="+version+"",
		]
	});*/
	
	gameContainer.setNextSceneInfo({ 
	  name: "level02",
	  elements: [
		  "text!src/scenes/tilemaps/level02.txt",
		  "src/components/TweenColor.js?v="+version+"",
		  "src/entities/base/BaseEntity.js?v="+version+"",
		  "src/components/TiledLevelImporter.js",
		  "src/components/camera.js",
		],
	});
	
	gameContainer['conf'] = new Config({});
		
	// the loading screen - will be displayed while assets are loaded
	Crafty.scene("loading", function(obj) { // { backgroundColor: '', soundToPlay: '' }
	    // clear scene and interface
	    sc = []; infc = [];   
		
		if (obj.backgroundColor!=undefined)
			Crafty.backgroundColor(obj.backgroundColor);
		if (obj.soundToPlay!=undefined)
			Crafty.audio.play(obj.soundToPlay, -1);
		
		// set sprites for next scene
		assets.createSprite(gameContainer.scene);
		// set sounds for next scene
		assets.createSound(gameContainer.scene);
		
	    var progressbar = Crafty.e("2D, ProgressBar")
			.attr({ x: 150, y : 140, w: 300, h: 25, z: 100 })
			// this .progressBar(String eventName, Number blockCount, Number maxValue, 
			// Boolean flipDirection, String emptyColor, String filledColor, String renderMethod)
			.progressBar("LoadingProgress", 10, 100, false, "white", "red", "DOM");
		
		// load takes an array of assets and a callback when complete
	    Crafty.load(assets.getPaths(gameContainer.scene), 
			function() {
				// use eval for executing require(), also loading possible texts/maps
				
				var require_str = '', require_args = '', require_args_count = 0;
				// build require_args string, if there are text files to load
				_.each(gameContainer.elementsToLoad, function(ele){ 
					// search for texts, first things to load
					if( ele.lastIndexOf("text!") !== -1 ) {
						require_args_count++;
						if(require_args != '')
							require_args += ', ';
						require_args += 'arg' + require_args_count.toString();
					}
				});
				
				require_str = 
 				// require elements and execute callback
				'require(gameContainer.elementsToLoad, function(' + require_args + ') { ' +
				// if text files were loaded, add them to gameContainer.loadedStrings array
				'if(arguments.length) _.each(arguments, function(a) { gameContainer.loadedStrings.push(a); });' +
				// destroy progressbar and run the specified scene
				'progressbar.destroy(); if (gameContainer.scene != undefined) { Crafty.scene(gameContainer.scene); } })';
				
				eval( '(' + require_str + ')' );
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