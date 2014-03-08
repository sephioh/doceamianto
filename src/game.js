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
		gameContainer.scene = "level01";
			
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
					  .image(obj.image.src);
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
					
					var require_str = '', args_texts = '', args_texts_count = 0, regElms = [], textElms = [], elements;
					// build args_texts string, if there are texts to load
					_.each(gameContainer.getSceneElements(), function(ele, i){ 
						// if element has not already been loded 
						if(gameContainer.alreadyLoadedElements.indexOf(ele) === -1)
							//search for texts, first things to load,
							if(ele.indexOf("text!") !== -1){
								textElms[args_texts_count] = ele;
								args_texts_count++;
								if(args_texts != ''){
									args_texts += ', ';
									args_texts += 'arg' + args_texts_count.toString();
								}
							} else {
								regElms[regElms.length] = ele;
							}
					});
					
					// text elements (json,xml,txt,etc) followed by regular elements (js)
					elements = textElms.concat(regElms); 
					
					require_str = 
					// require elements and pass callback
					'require(elements, function(' + args_texts + ') { ' +
					// if text files were loaded, push them to gameContainer.loadedStrings
					'if (arguments.length) gameContainer.setSceneTexts(arguments); ' +
					// push lodedElements to gameContainer.alreadyLoadedElements then destroy ellipsis
					'gameContainer.alreadyLoadedElements.push(elements); sc.ellipsis.destroy(); sc = [];' +
					// run specified scene
					'if (gameContainer.scene !== undefined) Crafty.scene(gameContainer.scene); })';
					
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
		
		require(scenes, function() {
			var sceneArg;
			if(gameContainer.env == "dev") 
				sceneArg = utils.getUrlVars()['scene'],
				sceneArg = sceneArg?sceneArg:gameContainer.scene;
			else
				sceneArg = "level01";
			gameContainer.runScene(sceneArg);
		});
	
	});

};

gameContainer = {
  
	env : 'dev',
	gameVersion : '0.0.1',
	conf: {},
	lang: '',
	scene : undefined,
	scenes : [],
	alreadyLoadedElements : [],
	loadedStrings : {},
	
	setSceneInfo : function(scnInfo) {
		this.scenes[scnInfo.name] = scnInfo.elements;
		
		return this;
	},
	runScene: function(scn, options) { 
		this.scene = scn;
		try {
			Crafty.scene("loading", options);
		} catch(e) {
			console.log(e);
		}
	},
	getSceneElements: function(scn){
		return this.scenes[this._scn(scn)];
	},
	setSceneTexts: function(texts,scn) {
		this.loadedStrings[this._scn(scn)] = texts;
		return this;
	},
	getSceneTexts: function(scn){
		return this.loadedStrings[this._scn(scn)];
		return this;
	},
	removeSceneTexts: function(scn) {
		var alreadyLdd = this.alreadyLoadedElements,
		    scnElements = this.getSceneElements(scn);
		for(var ele in scnElements){
			if(ele.indexOf("text!") === -1){
				continue;
			} else {
				this.alreadyLoadedElements[alreadyLdd.indexOf(ele)] = undefined;
				delete this.loadedStrings[this._scn(scn)];
			}
			return this;
		}
	},
	_scn: function(scn) {
		return _.isUndefined(scn)?this.scene:scn;
	}
	
},
sc    = [], // container for scene elements
infc  = [], // container for backbone interface elements
resources = {}, // container for Assets obj
utils = {}; 

// set scenes' loading parameters (scene name, scene elements to be loaded)
		
gameContainer
    .setSceneInfo({ 
	name: "level01",
	elements: [
		"src/components/TweenColor.js",
		"src/components/Delimiter.js",
		"src/components/Particle.js",
		"src/entities/amianto01.js",
		"src/entities/darkheart.js",
		"src/entities/redheart.js"
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
		"text!src/scenes/tilemaps/level04-2.json",
		"src/components/Twoway.js",
		"src/components/TiledLevelImporter.js",
		"src/components/Delimiter.js",
		"src/components/Bullet.js",
		"src/components/Figurant.js",
		"src/entities/carlos.js",
		"src/entities/areatransition.js",
		"src/entities/mapsmanager.js",
	      ],
    });