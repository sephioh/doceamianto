AmiantoToBlanche = BaseEntity.extend({
    defaults: {
	    'startingPoint' : { x: 800, y: 1271, z:300},
	    'dimensions' : { height: 164, width: 184},
    },
    initialize: function(){
		var model = this,
			entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", amiantotoblanche, SpriteAnimation");
		entity
			.attr({x: model.get('startingPoint').x, 
				   y: model.get('startingPoint').y,
				   z: model.get('startingPoint').z,
				   h: model.get('dimensions').height,
				   w: model.get('dimensions').width,
			})
			.setName('AmiantoToBlanche')
			.animate('AmiantoTurningBlanche', [[0,0], [1,0], [2,0], [3,0], [4,0] ,[5,0],
											   [0,1], [1,1], [2,1], [3,1], [4,1] ,[5,1],
											   [0,2], [1,2], [2,2], [3,2], [4,2] ,[5,2],
											   [0,3], [1,3], [2,3], [3,3], [4,3] ,[5,3],
											   [0,4], [1,4], [2,4], [3,4], [4,4] ,[5,4],
											   [0,5], [1,5], [2,5], [3,5], [4,5] ,[5,5]])
			.animate('BlancheFlying', [[0,6], [1,6], [2,6], [3,6], [4,6] ,[5,6]])
			.bind('StartAmiantoToBlancheAnimation', function(){
				if(!this._currentReelId){
					this.bind('AnimationEnd', function() {
						this.playAnimation('BlancheFlying', 6*5, -1);						
					});
					this.playAnimation('AmiantoTurningBlanche', 36*5, 0);
				}
			});
;
		model.set({'entity' : entity });
    }
});