Resources = Backbone.Model.extend({
	
	defaults: {
		imagesFolder: "web/images/",
		audioFolder: "web/audio/",
		
		// declaration of scenes' elements
		level01: {
			'images' : {
				'player' : {
					'file' : 'sheet_amianto01.png',
					'tile' : 94,
					'tileh' : 114,
					'elements': {
						'amianto01' : [0, 0]
					}
				},
				'redHeart' : {
					'file' : 'redheart.png',
					'tile' : 144,
					'tileh' : 128,
					'elements': {
						'redHeart' : [0, 0]
					}
				},
				'darkHeart' : {
					'file' : 'darkheart.png',
					'tile' : 144,
					'tileh' : 128,
					'elements': {
						'darkHeart' : [0, 0]
					}
				},
				'degrade' : {
					'file' : 'degrade.png',
					'tile' : 400,
					'tileh' : 300,
					'elements': {
						'degrade' : [0, 0]
					}
				},
				'amianto01Shadow' : {
					'file' : 'amiantoShadow01.png',
					'tile' : 164,
					'tileh' : 114,
					'elements': {
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
			}
		},
		level02: {
			'images' : {
				'player' : {
					'file' : 'sheet_amianto02.png',
					'tile' : 94,
					'tileh' : 126,
					'elements': {
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
				'obstacle' : {
					'file' : 'obstacle.png',
					'tile' : 73,
					'tileh' : 136,
					'elements': {
						'obstacle' : [0, 0]
					}
				},
				'explosion' : {
					'file' : 'explosion-sheet.png',
					'tile' : 240,
					'tileh' : 180,
					'elements': {
						'colorsExplosion' : [0, 0]
					}
				},
				'amiantotoblanchesheet' : {
					'file' : 'amiantotoblanche.png',
					'tile' : 184,
					'tileh' : 164,
					'elements': {
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
				'theme' : 
					['theme02.aac',
					  'theme02.ogg'
					],
				'diamond' :
					['diamondgrow.ogg',
					  'diamondgrow.mp3',
					],
				'thelight' : 
					['ohthelight.ogg',
					  'ohthelight.mp3'
					]
			}
		},
		level03: {
			'images' : {
				'background' : {
					'file' : 'level03-background.png',
					'tile' : 800,
					'tileh' : 600,
					'elements': {
						'background03' : [0, 0]
					}
				},
				'ornament' : {
					'file' : 'level03-ornament.png',
					'tile' : 192,
					'tileh' : 61,
					'elements': {
						'ornament03' : [0, 0]
					}
				},
				'corners' : {
					'file' : 'level03-corners.png',
					'tile' : 100,
					'tileh' : 100,
					'elements': {
						'cornerUpLeft': [1, 1],
						'cornerUpRight': [1, 0],
						'cornerDownLeft': [0, 1],
						'cornerDownRight': [0, 0]
					}
				},
				'player' : {
					'file' : 'sheet_amianto03.png',
					'tile' : 78,
					'tileh' : 96,
					'elements': {
						'amianto03' : [0, 0]
					}
				},
				'shining' : {
					'file' : 'level03-wordplaceholder.png',
					'tile' : 80,
					'tileh' : 80,
					'elements': {
						'wordplaceholder' : [0, 0]
					}
				}
			},
			'audio' : {
			}
		},
		level04: {
			'images' : {
				'player' : {
					'file' : 'sheet_carlos.png',
					'tile' : 92,
					'tileh' : 100,
					'elements': {
						'carlos' : [0, 0]
					}
				},
				'tileset' : {
					'file' : 'tileset-level04.png',
					'tile' : 1280,
					'tileh' : 1298
				},
				'figurants':{
					'file':'sheet_figurants04.png',
					'tile' : 106,
					'tileh': 123.333333333,
					'elements': {
						'figurant0': [0,1],
						'figurant1': [0,3],
						'figurant2': [0,5],
						'figurant3': [0,7],
						'figurant4': [0,9],
						'figurant5': [0,11]
					}
				  
				}
			},
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
	createSprite: function(scene,key){
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