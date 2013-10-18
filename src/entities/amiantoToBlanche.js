AmiantoToBlanche = BaseEntity.extend({
	// Arguments to initialize Entity
	// @options { initialX, initialY }

	defaults: {
		'dimensions' : { height: 164, width: 184 },
		'flyingTime' : 20,
    },
    initialize: function(options){

		var model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", amiantotoblanche, Tween, SpriteAnimation");

		entity
			.attr({x: model.attributes.options.initialX, 
				   y: model.attributes.options.initialY,
				   z: model.attributes.options.initialZ,
				   h: model.get('dimensions').height,
				   w: model.get('dimensions').width,
			})
			.animate('AmiantoTurningBlanche', [[0,0], [1,0], [2,0], [3,0], [4,0] ,[5,0],
											   [0,1], [1,1], [2,1], [3,1], [4,1] ,[5,1],
											   [0,2], [1,2], [2,2], [3,2], [4,2] ,[5,2],
											   [0,3], [1,3], [2,3], [3,3], [4,3] ,[5,3],
											   [0,4], [1,4], [2,4], [3,4], [4,4] ,[5,4],
											   [0,5], [1,5], [2,5], [3,5], [4,5] ,[5,5]])
			.animate('BlancheFlying', [[0,6], [1,6], [2,6], [3,6], [4,6] ,[5,6]])
			.bind('StartAmiantoToBlancheAnimation', function(){
				this.bind('AnimationEnd', function() {
					this.playAnimation('BlancheFlying', 6*5, -1);
					this.tween({x: model.attributes.options.finalX, 
						        y: model.attributes.options.finalY,
						        z: model.attributes.options.finalZ,}, model.attributes.options.flightTime);
				});
				this.playAnimation('AmiantoTurningBlanche', 36*5, 0);
			})
			.setName('AmiantoToBlanche');
		model.set({'entity' : entity });
    }
});