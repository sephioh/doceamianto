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
		this.scene = scn;
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
		}
		return this;
	},
	$scn: function(scn) {
		return _.isUndefined(scn)?this.scene:scn;
	}
	
},
sc    = {}, // container for scene elements
infc  = {}, // container for interface elements
resources = {}, // container for scenes' resources
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
	
	require([
		"src/resources.js?v="+version+"",
		"src/config.js?v="+version+"",
		"src/utils.js?v="+version+"",
		"src/entities/base/BaseEntity.js",
		"src/components/ProgressBar.js",
		// Crafty parts to be overridden
		"src/override/controls.js",
		"src/components/Delay.js",
		"src/components/CustomControls.js",
		"src/override/scene.js",
		"src/override/loader.js",
		"src/override/sound.js",
		"src/override/sprite-animation.js",
		"src/override/viewport.js"
	], function() {
		// !! remover quando der conta da gambiarra
		require(["src/components/Twoway.js","src/components/Gravity.js"]);

		// initializing
		gameContainer.conf = new Config({
			screenRes: { w: window.screen.availWidth, h: window.screen.availHeight }
		}),
		resources  = new Resources(),
		utils = new Utils();
		
		var res = gameContainer.conf.get('maxRes');
		if(Crafty.mobile){
			var max = gameContainer.conf.get('maxRes');
			res = gameContainer.conf.get('screenRes');
			if (res.h > res.w)
				// invert screen resolution values
				res = { w: res.h, h: res.w };
			if (res.h > max.h)
				res.h = max.h;
			if (res.w > max.w)
				res.w = max.w;
		}
	      
		Crafty.init(res.w, res.h);
		Crafty.canvas.init();
		
		document.getElementsByTagName("canvas")[0].id = "mainCanvas";
		Crafty.support.audio = true;
		//gameContainer.conf.set({ 'renderType': (Crafty.support.webgl? "WebGL" : "Canvas") });
		gameContainer.lang = utils.getLang();
		
		Crafty.paths({ audio: resources.get("audioFolder"), images: resources.get("imagesFolder") });
		
		// stuff for mobile
		if(Crafty.mobile){
			var warning = gameContainer.lang == "pt"? 
			  "Este jogo foi feito para o modo paisagem." : "This game is meant to be played in landscape mode.";
			document.getElementById("warning").innerHTML = warning;
			
			Crafty.load(resources.get("interfc_keys"), function(){
				if(Crafty.viewport.height < gameContainer.conf.get('maxRes').h)
					Crafty.e('2D, ' + gameContainer.conf.get('renderType') + 
					    ', Mouse, Persist, interface_button, FULL_SCREEN_up_sprite')
					    .bind('EnterFrame', function(){
						this.attr({
						  x: Crafty.viewport.x * -1,
						  y: Crafty.viewport.y * -1
						});
					    })
					    .bind('MouseDown', function(){
						utils.toggleFullScreen('cr-stage');
						var rc, ac;
						if(this.__c.FULL_SCREEN_up_sprite)
							rc = "FULL_SCREEN_up_sprite",
							ac = "FULL_SCREEN_down_sprite";
						else
							rc = "FULL_SCREEN_down_sprite",
							ac = "FULL_SCREEN_up_sprite";
						this.removeComponent(rc)
						    .addComponent(ac);
					    })
					    .addComponent('Color');
			    });
		}
		// initialized
		
		// set scenes' loading parameters (scene name, scene elements to be loaded)
		gameContainer
		    .setSceneInfo({
			name: "start_screen",
			elements: []
		    })
		    .setSceneInfo({ 
			name: "level01",
			elements: [
				"src/components/TweenColor.js",
				"src/components/Delimiter.js",
				"src/components/Particle.js",
				"src/entities/amianto01.js",
				"src/entities/heart01.js"
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
				"src/entities/amiantoToBlanche.js",
				"src/entities/mapsmanager.js",
			      ]
		    }).setSceneInfo({
			name: "level03",
			elements: [
				"src/components/Delimiter.js",
				"src/entities/amianto03.js",
				"src/entities/wordblock.js",
				"src/entities/wordplaceholder.js",
				"src/effects/glitcheffect.js",
				"text!src/lang/level03-"+gameContainer.lang+".json"
			      ]
		    }).setSceneInfo({
			name: "level04",
			elements: [
				"text!src/scenes/tilemaps/level04-10.json",
				"src/components/TiledLevelImporter.js",
				"src/components/Background.js",
				"src/components/Delimiter.js",
				"src/components/Bullet.js",
				"src/components/Figurant.js",
				"src/components/LilPhantom.js",
				"src/components/BadassPhantom.js",
				"src/components/Policeman.js",
				"src/components/PoliceSpawner.js",
				"src/components/CarlosMock.js",
				"src/entities/carlos.js",
				"src/entities/mapsmanager.js"
			      ]
		    }).setSceneInfo({ 
			name: "level05",
			elements: [
				"text!src/scenes/tilemaps/level05-2.json",
				"src/components/TiledLevelImporter.js",
				"src/components/Delimiter.js",
				"src/components/DanceFloor.js",
				"src/components/FloorSet.js",
				"src/components/SpriteColor.js",
				"src/components/TweenSpriteColor.js",
				"src/components/Shine.js",
				"src/components/NightclubPhantom.js",
				"src/entities/mapsmanager.js",
				"src/entities/amianto05.js"
			      ]
		    }).setSceneInfo({ 
			name: "level06",
			elements: [
				"src/components/Delimiter.js",
				"src/components/SpriteText.js",
				"src/entities/amianto06.js",
				"src/entities/heart06.js",
			      ]
		    });
		
		// declare all scenes
		
		var scenes = [
			"src/scenes/loading.js",
			"src/scenes/start_screen.js?v="+version+"",
			"src/scenes/level01.js?v="+version+"",
			"src/scenes/level02.js?v="+version+"",
			"src/scenes/level03.js?v="+version+"",
			"src/scenes/level04.js?v="+version+"",
			"src/scenes/level05.js?v="+version+"",
			"src/scenes/level06.js?v="+version+"",
		];
		
		require(scenes, function() {
			var sceneArg, options;
			if(gameContainer.env == "dev"){ 
				sceneArg = utils.getUrlVars()['scene'];
			}
			sceneArg = sceneArg?sceneArg:"start_screen";
			if (sceneArg == "start_screen") {
				options = { backgroundColor: "#000000" };
			}
			gameContainer.runScene(sceneArg, options);
		});
	
	});

};