/**
    examples:             
    'sprites_name' : {
         'file' : 'path/to/file',
         'tile' : width,
         'tileh' : height,
         'elements': {
             'sprite_name' : [0, 0]
         }
    },
*/

Assets = Backbone.Model.extend({
  
	// declaration of scenes' elements
    defaults: {
		level01: {
			'images' : {
				'player' : {
					'file' : 'web/images/sheet_amianto01.png',
					'tile' : 94,
					'tileh' : 114,
					'elements': {
						'amianto01' : [0, 0]
					}
				},
				'redHeart' : {
					'file' : 'web/images/redheart.png',
					'tile' : 144,
					'tileh' : 128,
					'elements': {
						'redHeart' : [0, 0]
					}
				},
				'darkHeart' : {
					'file' : 'web/images/darkheart.png',
					'tile' : 144,
					'tileh' : 128,
					'elements': {
						'darkHeart' : [0, 0]
					}
				},
				'degrade' : {
					'file' : 'web/images/degrade.png',
					'tile' : 400,
					'tileh' : 300,
					'elements': {
						'degrade' : [0, 0]
					}
				},
				'amianto01Shadow' : {
					'file' : 'web/images/amiantoShadow01.png',
					'tile' : 164,
					'tileh' : 114,
					'elements': {
						'amianto01Shadow' : [0, 0]
					}
				}
			},
			'audio' : {
				'theme' : {
					'files' : [ 'web/audio/theme01.ogg',
						    'web/audio/theme01.wav'
						  ],
					'cmd' : 'theme01'
				},
				'hitRedHeart' : {
					'files' : ['web/audio/hitredheart.mp3',
						    'web/audio/hitredheart.aac',
						    'web/audio/hitredheart.ogg',
						    'web/audio/hitredheart.m4a'
						  ],
					'cmd' : 'hitRedHeart'
				},
			       'hitDarkHeart' : {
					'files' : ['web/audio/hitdarkheart.mp3',
						    'web/audio/hitdarkheart.aac',
						    'web/audio/hitdarkheart.ogg',
						    'web/audio/hitdarkheart.m4a'
						  ],
					'cmd' : 'hitDarkHeart'
				},
			       'fall' : {
					'files' : ['web/audio/fall01.mp3',
						    'web/audio/fall01.aac',
						    'web/audio/fall01.ogg',
						    'web/audio/fall01.m4a'
						  ],
					'cmd' : 'falling01'
				}
			}
		},
		level02: {
			'images' : {
				'player' : {
					'file' : 'web/images/sheet_amianto02.png',
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
						'diamond9' : [0, 10],
					}
				},
			},
			/*'audio' : {
				'theme' : {
					'files' : ['web/audio/',
							   'web/audio/'],
					'cmd' : 'theme02'
				}
			}*/
		}
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
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
    		
            return true;
        };
		
        _.each(this.get(scene)['images'], function(element, k){ 
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
        });
    },
    
	createSound: function(scene,key){
	   if(key != undefined){
            element = this.get(scene)['audio'][key];
	    
            Crafty.audio.add(element['cmd'], element['files']);
    		
            return true;
        };
		
		var audioObj = {};
        _.each(this.get(scene)['audio'], function(element, ke){ 
			audioObj[element['cmd']] = element['files'];
        });
		
		Crafty.audio.add(audioObj);
	},
	
    getSpriteData: function(scene,key){
		return this.get(scene)['images'][key];
    },
    
    /**
     * Get path for assets files - for loading
     * 
     * @return array array of files paths
     */
    getPaths: function(scene){
        var array = [], i=0;
        _.each(this.get(scene)['images'], function(imgElement, key){ 
            array[i] = imgElement['file'];
            i++;
        });
	_.each(this.get(scene)['audio'], function(audElement, ke){ 
			_.each(audElement['files'], function(audFile, k) {
				array[i] = audFile;
				i++;
			});
        });
		
        return array;
    }
    
});