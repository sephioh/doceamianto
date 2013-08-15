Info = BaseEntity.extend({
	defaults: {
        'text' : Lang.text02,
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e("2D, DOM, Text");

    	entity
            .attr({x: (((MAP_WIDTH/2)/2)/2), y: ((MAP_HEIGHT/2)+(MAP_HEIGHT/4)), z: 0, w: 600})
            .text(model.get('text'))
            .textColor('#FFFFFF')
            .textFont({'size' : '24px', 'family': 'Arial'})
            .bind('Click', function(){
                                
            });

    	model.set({'entity' : entity });
    }
});