Resources = Backbone.Model.extend({
	
	defaults: {
		imagesFolder: "web/images/",
		audioFolder: "web/audio/",
		
		// declaration of scenes' elements
		level01: {
			'sprites' : {
				'sheet_amianto01.png' : {
					'tile' : 94,
					'tileh' : 114,
					'map': {
						'amianto01' : [0, 0]
					}
				},
				'redheart.png' : {
					'tile' : 144,
					'tileh' : 128,
					'map': {
						'redHeart' : [0, 0]
					}
				},
				'darkheart.png' : {
					'tile' : 144,
					'tileh' : 128,
					'map': {
						'darkHeart' : [0, 0]
					}
				},
				'degrade.png' : {
					'tile' : 400,
					'tileh' : 300,
					'map': {
						'gradient' : [0, 0]
					}
				},
				'amiantoShadow01.png' : {
					'tile' : 164,
					'tileh' : 114,
					'map': {
						'amianto01Shadow' : [0, 0]
					}
				}
			},
			'audio' : {
				'theme' : 
					['theme01.aac',
					  'theme01.ogg' 
					],
				'hitredheart' : 
					['hitredheart.aac',
					  'hitredheart.ogg',
					  'hitredheart.mp3' 
					],
			      'hitdarkheart' : 
					['hitdarkheart.aac',
					  'hitdarkheart.ogg',
					  'hitdarkheart.mp3'
					],
				'fall' : 
					['fall01.aac',
					  'fall01.ogg',
					  'fall01.mp3'
					]
			},
			'images': ['obstacle.png']
		},
		level02: {
			'sprites' : {
				'sheet_amianto02.png' : {
					'tile' : 94,
					'tileh' : 126,
					'map': {
						'amianto02' : [0, 0],
						'diamond1' : [0, 2],
						'diamond2' : [0, 3],
						'diamond3' : [0, 4],
						'diamond4' : [0, 5],
						'diamond5' : [0, 6],
						'diamond6' : [0, 7],
						'diamond7' : [0, 8],
						'diamond8' : [0, 9],
						'diamond9' : [0, 10]
					}
				},
				'obstacle.png' : {
					'tile' : 73,
					'tileh' : 136,
					'map': {
						'obstacle' : [0, 0]
					}
				},
				'explosion-sheet.png' : {
					'tile' : 240,
					'tileh' : 180,
					'map': {
						'colorsExplosion' : [0, 0]
					}
				},
				'amiantotoblanche.png' : {
					'tile' : 184,
					'tileh' : 164,
					'map': {
						'amiantotoblanche' : [0, 0]
					}
				}
			},
			'audio' : {
				/*'blanche' :
					['blancheflying.aac',
					  'blancheflying.ogg',
					  'blancheflying.mp3'
					],*/
				'theme02' : 
					['theme02.aac',
					  'theme02.ogg'
					],
				'diamondgrow' :
					['diamondgrow.ogg',
					  'diamondgrow.mp3',
					],
				'ohthelight' : 
					['ohthelight.ogg',
					  'ohthelight.mp3'
					]
			}
		},
		level03: {
			'sprites' : {
				'level03-corners.png': {
					'tile' : 100,
					'tileh' : 100,
					'maps': {
						'cornerUpLeft': [1, 1],
						'cornerUpRight': [1, 0],
						'cornerDownLeft': [0, 1],
						'cornerDownRight': [0, 0]
					}
				},
				'sheet_amianto03.png': {
					'tile' : 78,
					'tileh' : 96,
					'maps': {
						'amianto03' : [0, 0]
					}
				},
				'level03-wordplaceholder.png': {
					'tile' : 80,
					'tileh' : 80,
					'maps': {
						'wordplaceholder' : [0, 0]
					}
				}
			},
			'images' : ['level03-background.png','level03-ornament.png'],
			'audio' : {
				/*'theme' : 
				      ['theme03.aac',
					'theme03.ogg'
				      ],*/
			}
		},
		level04: {
			'sprites' : {
				'sheet_carlos.png' : {
					'tile' : 140,
					'tileh' : 128,
					'map': {
						'carlos' : [0, 0],
						'carlos_phantom': [0, 5]
					}
				},
				'sheet_figurants04.png': {
					'tile' : 106,
					'tileh': 123.333333333,
					'map': {
						'figurant0': [0,1],
						'figurant1': [0,3],
						'figurant2': [0,5],
						'figurant3': [0,7],
						'figurant4': [0,9],
						'figurant5': [0,11]
					}
				},
				'sheet_policemen.png': {
					'tile' : 120,
					'tileh': 124,
					'map': {
						'policeman0': [0,0],
						'policeman1': [0,4],
						'policeman2': [0,8],
					}
				  
				},
				'sheet_lil_phantom.png': {
					'tile' : 124,
					'tileh': 114,
					'map': {
						'lil_phantom': [0,0]
					}
				},
				'sheet_badass_phantom.png': {
					'tile' : 170,
					'tileh': 170,
					'map': {
						'badass_phantom': [0,0]
					}
				}
			},
			'images': ['tileset-level04.png',
				'bg1-level04-0.png',
				'bg1-level04-1.png',
				'bg1-level04-2.png',
				'bg1-level04-3.png',
				'bg1-level04-4.png',
				'bg1-level04-5.png',
				'bg1-level04-6.png',
				'bg1-level04-7.png',
				'bg1-level04-8.png',
				'bg1-level04-9.png',
				'bg1-level04-10.png',
				'bg1-level04-11.png',
				'bg1-level04-12.png',
				'bg1-level04-13.png',
				'bg1-level04-14.png',
				'bg1-level04-15.png',
				'bg1-level04-16.png',
				'bg1-level04-17.png',
				'bg1-level04-18.png',
				'bg1-level04-19.png',
				'bg2-level04-0.png',
				'bg2-level04-1.png',
				'bg2-level04-2.png',
				'bg2-level04-3.png',
				'bg2-level04-4.png',
				'bg2-level04-5.png',
				'bg2-level04-6.png',
				'bg2-level04-7.png',
				'bg2-level04-8.png',
				'bg2-level04-9.png',
				'bg2-level04-10.png',
				'bg2-level04-11.png',
				'bg2-level04-12.png',
				'bg2-level04-13.png',
				'bg2-level04-14.png',
				'bg2-level04-15.png',
				'bg2-level04-16.png',
				'bg2-level04-17.png',
				'bg2-level04-18.png',
				'bg2-level04-19.png',
				'bg3-level04.png'],
			'audio' : {
				
			}
		},
	},
	    
	initialize: function(){
	    
	},
	    
	/**
	* Create Crafty sprites from images object
	* Pass key if You want create only one choosen sprite.
	* 
	* @param  string key - sprite definition key
	*/
	createSprites: function(scene,key){
	    if(key != undefined){
		element = this.get(scene)['images'][key];
		if(element['tileh'] == undefined && element['elements'])
		    Crafty.sprite(element['tile'], this.get('imagesFolder')+element['file'], element['elements']);
		else
		if(element['elements'])
		    Crafty.sprite(element['tile'], element['tileh'], this.get('imagesFolder')+element['file'], element['elements']);
		else 
		    return false;
		    
		return true;
	    };
	    var _this = this;	
	    _.each(this.get(scene)['images'], function(element, k){ 
		if(element['tileh'] == undefined && element['elements'])
		    Crafty.sprite(element['tile'], _this.get('imagesFolder')+element['file'], element['elements']);
		else
		if(element['elements'])
		    Crafty.sprite(element['tile'], element['tileh'], _this.get('imagesFolder')+element['file'], element['elements']);
	    });
	    return true;
	},
	
	formatJSON: function(scene) {
	    var json = "{",
		audio = JSON.stringify(this.get(scene)['audio']),
		images = JSON.stringify(this.get(scene)['images']),
		sprites = JSON.stringify(this.get(scene)['sprites']);
	    json += "\"audio\": " + audio + ",";
	    json += "\"images\": " + images + ",";
	    json += "\"sprites\": " + sprites ;
	    json += "}";
	    /*var json = this.get(scene);*/
	    return json;
	},
	
	getAssetUrl: function(scene,type,asset) {
		var type = this.get(scene)[type][asset];
                return f.search("://") === -1? (type=="audio"? paths.audio + f : paths.images + f) : f;
	},
	
	getSpriteData: function(scene,key){
	    return this.get(scene)['images'][key];
	},
	
	/**
	* Get path for assets files - for loading
	* 
	* @return array array of files paths
	*/
	getPaths: function(scene) {
		var array = [], i=0, _this = this;
		_.each(this.get(scene)['images'], function(imgElement){ 
			array[i] = _this.get('imagesFolder')+imgElement['file'];
			i++;
		});
		
		_.each(this.get(scene)['audio'], function(audElement){ 
			for (var j = 0; j < audElement.length; j++) {
				var ext = audElement[j].substr(audElement[j].lastIndexOf('.') + 1, 3).toLowerCase();
				if(Crafty.audio.supports(ext)) {
					array[array.length] = _this.get('audioFolder')+audElement[j];
					break;
				}
			}
		});
		
		return array;
	},
	
	removeAudio: function(scene,key){
		if(key != undefined) {
			return Crafty.audio.remove(key);
		};
			
		var _this = this;
		_.each(this.get(scene)['audio'], function(audElement) {
			Crafty.audio.remove(_this._getAudioCmd(audElement));
		});
	},
	
	_getAudioCmd: function(audElement){
		var n = audElement[0].substr(audElement[0].lastIndexOf('/') + 1);
		n = n.substring(0, n.lastIndexOf('.'));
		return n;
	},
      
});