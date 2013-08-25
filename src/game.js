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
    Crafty.viewport.init(800,600);
    
    require([
	    "src/assets.js?v="+version+"",
	    "src/config.js?v="+version+"",
	    "src/lang/lang-"+lang+".js?v="+version+"",
    ], function() {
	
	// allow playing MP3 files
	Crafty.support.audio = true;
	
	assets = new Assets();
	
	// set sprites for level01
	assets.createSprite(gameContainer.scene);
	// set sounds for level01
	assets.createSound(gameContainer.scene);
	
	gameContainer['conf'] = new Config({});
	
	//the loading screen - that will be display while assets loaded
	Crafty.scene("loading", function() {
	    // clear scene and interface
	    sc = []; infc = [];   

	    var loadingText = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
		.attr({w: 500, h: 20, x: ((Crafty.viewport.width) / 2), y: (Crafty.viewport.height / 2), z: 2})
		.text(Lang.text01+'...')
		.textColor('#000')
		.textFont({'size' : '24px', 'family': 'Arial'});

	    // load takes an array of assets and a callback when complete
	    Crafty.load(assets.getPaths(gameContainer.scene), function() {
			
			// array with local components
			var elements = [
			"src/components/movetwo.js?v="+version+"",
			"src/components/TweenColor.js?v="+version+"",
			"src/entities/base/BaseEntity.js?v="+version+"",
			];

		    //when everything is loaded, run the level01 scene
		    require(elements, function() {	   
			    loadingText.destroy();
			    if (gameContainer.scene != undefined) {
				    
					Crafty.scene(gameContainer.scene);
				    
			    }
		    });
	    },
		    function(e) {
			    loadingText.text(Lang.text01+' ('+(e.percent.toFixed(0))+'%)');
		    });
	});
	    
	// declare all scenes
	var scenes = [
		"src/scenes/level01.js?v="+version+"",
	];
	    
	require(scenes, function(){});
	
	//automatically play the loading scene
	Crafty.scene("loading");
    });
    
};
