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

Sprites = Backbone.Model.extend({
    defaults: {
        images:{
            'player' : {
                 'file' : 'web/images/Sheet_amianto_redimensionada.png',
                 'tile' : 94,
                 'tileh' : 126,
                 'elements': {
                     'amianto01' : [0, 0]
                 }
            },
			'redHeart' : {
                 'file' : 'web/images/redheart.png',
                 'tile' : 50,
                 'tileh' : 50,
                 'elements': {
                     'redHeart' : [0, 0]
                 }
            },
            'darkHeart' : {
                 'file' : 'web/images/darkheart.png',
                 'tile' : 50,
                 'tileh' : 50,
                 'elements': {
                     'darkHeart' : [0, 0]
                 }
            }
            
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
    create: function(key){
        if(key != undefined){
            element = this.get('images')[key];
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
    		
            return true;
        };

        _.each(this.get('images'), function(element, k){ 
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
        });

    },
    
    getImageData: function(key){
      return this.get('images')[key];
    },
    
    /**
     * Get path for sprites files - for loading
     * 
     * @return array array of files paths
     */
    getPaths: function(){
        var array = [], i=0;
        _.each(this.get('images'), function(element, key){ 
            array[i] = element['file']
            i++;
        });

        return array;
    }
});