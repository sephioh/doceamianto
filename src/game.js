gameContainer = {
  
	env : 'dev',
	gameVersion : '0.0.1',
	conf: {},
	lang: '',
	scene : undefined,
	scenes : [],
	loadedStrings : [],
	
	setSceneInfo : function(sceneInfo) {
		//this.loadedStrings = [],
		this.scenes[this.scenes.length] = sceneInfo;
		
		return this;
	},
	
	runScene: function(scene, options) { 
		this.scene = scene;
		try {
			Crafty.scene("loading", options);
		} catch(e) {
			console.error(e);
		}
	}
	
},
sc    = [], // container for scene elements
infc  = [], // container for backbone interface elements
resources = {}, // container for Assets obj
utils = {}; 

window.onload = function() {
  
	var version = null,
	    today = new Date();
	
	    // Fix for cache
	if(gameContainer.env == 'dev') {
		    version = today.getDay()+"_"+ today.getHours() +"_"+today.getSeconds();
	    } else {
		    version = gameContainer.gameVersion;
	    };    
	
	//start Crafty
	Crafty.init(800, 600);
	Crafty.canvas.init();
	//Crafty.settings.modify("autoPause",true);
	
	require([
		"src/resources.js?v="+version+"",
		"src/config.js?v="+version+"",
		"src/utils.js?v="+version+"",
		"src/entities/base/BaseEntity.js",
		// Crafty parts to be overridden
		"src/components/Twoway.js",
		"src/components/Gravity.js",
		"src/extensions/scene.js",
		"src/extensions/assets.js"
	], function() {
		
		// allow playing MP3 files
		Crafty.support.audio = true;
		
		resources  = new Resources(),
		utils = new Utils();
		
		gameContainer.conf = new Config({});
		gameContainer.lang = utils.getLang();
			
		// the loading screen - will be displayed while assets are loaded
		Crafty.scene("loading", function(obj) { // obj -> { backgroundColor: 'color', soundToPlay: 'sound', ellipsisColor: 'hexcolor' }
			// clear scene
			sc = [], infc = [], sounds = {};
			
			var ellipsisColor = '#000000';
			
			if (typeof obj !== 'undefined') {
				if(obj.backgroundColor)
					Crafty.background(obj.backgroundColor);
				if(obj.soundToPlay)
					Crafty.audio.play(obj.soundToPlay, -1);
				if(obj.ellipsisColor)
					ellipsisColor = obj.ellipsisColor;
				if(obj.image)
					sc['loadingImage'] = Crafty.e("2D, DOM, Image")
					  .attr({ x: 0, y: 0, w: obj.image.w, h: obj.image.h })
					  .image(obj.image.url);
			}
			
			// set sprites for next scene
			resources.createSprite(gameContainer.scene);
			
			sc['ellipsis'] = Crafty.e("2D, Canvas, Text");
			sc.ellipsis['nFrames'] = 25, // each nFrames, add a '. '
			sc.ellipsis['eFrames'] = 0; // elapsed frames since last '. ' added
			sc.ellipsis.attr({ x: Crafty.viewport.width/2, y: 500, w: 78, h: 50,  z: 1000 })
				.textColor(ellipsisColor)
				.textFont({ weight: 'bold', family: 'Arial', size : '50px', family: 'Perfect_dos_vga_437' })
				.text(". . . ")
				.bind('EnterFrame', function() {
					this.eFrames++;
					if(this.eFrames === this.nFrames) {
						this.eFrames = 0;
						
						if(this._text === ". . . ") {
							this.text("")
						} else {
							this.text(this._text + ". ")
							    .attr({ x: this._x - this._w/2 });
						}
					}
				});
			
			// load takes an array of assets and a callback when complete
			Crafty.load(resources.getPaths(gameContainer.scene), function() {
					// use eval for executing require(), also loading possible texts/maps
					
					var require_str = '', require_args = '', require_args_count = 0, regElms = [], textElms = [], elements;
					// build require_args string, if there are texts to load
					for(var i = 0, scns = gameContainer.scenes; i<gameContainer.scenes.length; i++) {
						if(scns[i].name === gameContainer.scene){
							_.each(scns[i].elements, function(ele, i) { 
								// search for texts, first things to load
								if( ele.lastIndexOf("text!") !== -1 ) {
									textElms[require_args_count] = ele;
									require_args_count++;
									if(require_args != '')
										require_args += ', ';
									require_args += 'arg' + require_args_count.toString();
								} else {
									regElms[regElms.length] = ele;
								}
							});
							break;
						}
					}
					
					elements = textElms.concat(regElms); // text elements (json,xml,txt,etc) followed by regular elements (js)
					
					require_str = 
					// require elements and pass callback
					'require(elements, function(' + require_args + ') { ' +
					// if text files were loaded, add them to gameContainer.loadedStrings array
					'gameContainer.loadedStrings = []; if (arguments.length) _.each(arguments, function(a) { gameContainer.loadedStrings.push(a); });' +
					// destroy ellipsis and run the specified scene
					'sc.ellipsis.destroy(); sc = []; if (gameContainer.scene !== undefined) Crafty.scene(gameContainer.scene); })';
					
					eval( '(' + require_str + ')' );
				},
				function(e) {
					console.log(e);
				},
				function(e) {
					console.error(e);
				}
			);
		});
		
		// declare all scenes
		
		var scenes = [
			"src/scenes/level01.js?v="+version+"",
			"src/scenes/level02.js?v="+version+"",
			"src/scenes/level03.js?v="+version+"",
			"src/scenes/level04.js?v="+version+"",
		];
		
		// set scenes' loading parameters (scene name, scene elements to be loaded)
		
		gameContainer
		    .setSceneInfo({ 
			name: "level01",
			elements: [
				"src/components/TweenColor.js",
				"src/entities/amianto01.js",
				"src/entities/darkheart.js",
				"src/entities/redheart.js"
				]
		    }).setSceneInfo({ 
			name: "level02",
			elements: [
				"text!src/scenes/tilemaps/level02.json", 
				"src/components/TiledLevelImporter.js",
				"src/entities/diamond.js",
				"src/entities/amianto02.js",
				"src/entities/obstacle.js",
				"src/entities/amiantoToBlanche.js"
			      ],
		    }).setSceneInfo({
			name: "level03",
			elements: [
				"src/entities/amianto03.js",
				"src/entities/wordblock.js",
				"src/entities/wordplaceholder.js",
				"src/effects/glitcheffect.js",
				"text!src/lang/level03-"+gameContainer.lang+".json"
			      ],
		    }).setSceneInfo({
			name: "level04",
			elements: [
				"text!src/scenes/tilemaps/level04.json",
				//"text!src/scenes/tilemaps/level04-2.json",
				//"text!src/scenes/tilemaps/tilemap-level04-1.json",
				//"text!src/scenes/tilemaps/tilemap-level04-2.json",
				//"text!src/scenes/tilemaps/tilemap-level04-3.json",
				//"src/components/TiledLevelImporter.js",
				"src/modules/create_mocks_module.js",
				"src/components/tiledmapbuilder.js",
				"src/components/Bullet.js",
				"src/components/Figurant.js",
				"src/entities/carlos.js",
				"src/entities/areatransition.js",
				"src/entities/mapsmanager.js",
			      ],
		    });
		
		require(scenes, function() {
			var sceneArg;
			if(gameContainer.env == "dev") 
				sceneArg = utils.getUrlVars()['scene'],
				sceneArg = sceneArg?sceneArg:"level01";
			else
				sceneArg = "level01";
			gameContainer.runScene(sceneArg);
		});
	
	});

};