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
	
	document.getElementsByTagName("canvas")[0].id = "mainCanvas";
	
	//Crafty.settings.modify("autoPause",true);
	
	require([
		"src/resources.js?v="+version+"",
		"src/config.js?v="+version+"",
		"src/utils.js?v="+version+"",
		"src/entities/base/BaseEntity.js",
		"src/components/Ellipsis.js",
		// Crafty parts to be overridden
		"src/components/Twoway.js",
		"src/components/Gravity.js",
		"src/components/Delay.js",
		"src/extensions/scene.js",
		//"src/extensions/assets.js"
		//"src/extensions/sprite.js",
		"src/extensions/loader.js",
		"src/extensions/sound.js",
		"src/extensions/sprite-animation.js",
	], function() {
		
		// allow playing MP3 files
		Crafty.support.audio = true;
		
		resources  = new Resources(),
		utils = new Utils();
		
		gameContainer.conf = new Config({});
		gameContainer.lang = utils.getLang();
		
		Crafty.paths({ audio: "web/audio/", images: "web/images/" });
			
		// the loading screen - will be displayed while assets are loaded
		// callback obj -> { backgroundColor: 'color', soundToPlay: 'sound', ellipsisColor: 'hexcolor', 'image': { url, w, h } }
		Crafty.scene("loading", function(obj) { 
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
					  .image(obj.image.src)
					  .attr({ x: 0, y: 0, w: obj.image.w, h: obj.image.h });
			}
			
			// set sprites for next scene
			//resources.createSprites(gameContainer._scn());
			
			sc['ellipsis'] = Crafty.e("Ellipsis").textColor(ellipsisColor);
			
			// load takes an object of assets and a callback when complete
			Crafty.load(resources.get(gameContainer.$scn()), function() {
					// use eval for executing require(), also loading possible texts/maps
					
					var require_str = '', text_args = '', text_args_count = 0, regElms = [], textElms = [], elements;
					// build text_args string, if there are texts to load
					_.each(gameContainer.getSceneElements(), function(ele, i){ 
						// if element has not already been loded 
						if(gameContainer.alreadyLoadedElements.indexOf(ele) === -1)
							//search for texts, first things to load,
							if(ele.indexOf("text!") !== -1) {
								textElms[text_args_count] = ele;
								text_args_count++;
								if(text_args != ''){
									text_args += ', ';
									text_args += 'arg' + text_args_count;
								}
							} else {
								regElms[regElms.length] = ele;
							}
					});
					
					// text elements (json,xml,txt,etc) followed by regular elements (js)
					elements = textElms.concat(regElms); 
					
					require_str = 
					// require elements and pass callback
					'require(elements, function(' + text_args + ') { ' +
					// if text files were loaded, push them to gameContainer.loadedStrings
					'if (arguments.length) gameContainer.setSceneTexts(arguments); ' +
					// push lodedElements to gameContainer.alreadyLoadedElements then destroy ellipsis
					'gameContainer.alreadyLoadedElements.push(elements); sc.ellipsis.destroy(); sc = [];' +
					// run specified scene
					'if (gameContainer.$scn() !== undefined) Crafty.scene(gameContainer.$scn()); })';
					
					eval( '(' + require_str + ')' );
				},
				function(e) {
					console.log(e);
				},
				function(e) {
					console.log("error: " + e);
				}
			);
		});
		
		// set scenes' loading parameters (scene name, scene elements to be loaded)
				
		gameContainer
		    .setSceneInfo({ 
			name: "level01",
			elements: [
				"src/components/TweenColor.js",
				"src/components/Delimiter.js",
				"src/components/Particle.js",
				"src/entities/amianto01.js",
				"src/entities/heart.js"
				]
		    }).setSceneInfo({ 
			name: "level02",
			elements: [
				"text!src/scenes/tilemaps/level02.json", 
				"src/components/TiledLevelImporter.js",
				"src/components/Delimiter.js",
				"src/entities/diamond.js",
				"src/entities/amianto02.js",
				"src/entities/obstacle.js",
				"src/entities/amiantoToBlanche.js"
			      ],
		    }).setSceneInfo({
			name: "level03",
			elements: [
				"src/components/Delimiter.js",
				"src/entities/amianto03.js",
				"src/entities/wordblock.js",
				"src/entities/wordplaceholder.js",
				"src/effects/glitcheffect.js",
				"text!src/lang/level03-"+gameContainer.lang+".json"
			      ],
		    }).setSceneInfo({
			name: "level04",
			elements: [
				"text!src/scenes/tilemaps/level04-8.json",
				"src/components/TiledLevelImporter.js",
				"src/components/Delimiter.js",
				"src/components/Bullet.js",
				"src/components/Figurant.js",
				"src/components/LilPhantom.js",
				"src/components/BadassPhantom.js",
				"src/components/Policeman.js",
				"src/components/PoliceSpawner.js",
				"src/components/SpriteColor.js",
				"src/entities/carlos.js",
				"src/entities/mapsmanager.js",
			      ],
		    });
		
		// declare all scenes
		
		var scenes = [
			"src/scenes/level01.js?v="+version+"",
			"src/scenes/level02.js?v="+version+"",
			"src/scenes/level03.js?v="+version+"",
			"src/scenes/level04.js?v="+version+"",
		];
		
		
		require(scenes, function() {
			var sceneArg;
			if(gameContainer.env == "dev"){ 
				sceneArg = utils.getUrlVars()['scene'];
				sceneArg = sceneArg?sceneArg:"level01";
			}else{
				sceneArg = "level01";
			}
			gameContainer.runScene(sceneArg);
		});
	
	});

};

gameContainer = {
  
	env : 'dev',
	gameVersion : '0.0.1',
	conf: {},
	lang: '',
	scene : {},
	scenes : [],
	alreadyLoadedElements : [],
	loadedStrings : {},
	
	setSceneInfo : function(scnInfo) {
		this.scenes[scnInfo.name] =  scnInfo.elements;
		
		return this;
	},
	runScene: function(scn, options) {
		this.scene = { name: scn, functions: {} };
		Crafty.scene("loading", options);
	},
	getSceneElements: function(scn) {
		return this.scenes[this.$scn(scn)];
	},
	setSceneTexts: function(texts,scn) {
		this.loadedStrings[this.$scn(scn)] = texts;
		return this;
	},
	getSceneTexts: function(scn) {
		return this.loadedStrings[this.$scn(scn)];
	},
	removeSceneTexts: function(scn) {
		var alreadyLdd = this.alreadyLoadedElements,
		    scnElements = this.getSceneElements(scn);
		for(var ele in scnElements){
			if(ele.indexOf("text!") === -1){
				continue;
			} else {
				this.alreadyLoadedElements.splice(alreadyLdd.indexOf(ele),1);
				delete this.loadedStrings[this.$scn(scn)];
			}
			break;
		}
	},
	$scn: function(scn) {
		return _.isUndefined(scn)?this.scene.name:scn;
	}
	
},
sc    = [], // container for scene elements
infc  = [], // container for backbone interface elements
resources = {}, // container for Assets obj
utils = {}; 