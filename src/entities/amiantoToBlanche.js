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
			.attr({x: model.get('initialX'), 
				  y: model.get('initialY'),
				  z: model.get('initialZ'),
				  h: model.get('dimensions').height,
				  w: model.get('dimensions').width,
			})
			.reel('AmiantoTurningBlanche', 9500, [
				[0,0], [1,0], [2,0], [3,0], [4,0] ,[5,0],
				[0,1], [1,1], [2,1], [3,1], [4,1] ,[5,1],
				[0,2], [1,2], [2,2], [3,2], [4,2] ,[5,2],
				[0,3], [1,3], [2,3], [3,3], [4,3] ,[5,3],
				[0,4], [1,4], [2,4], [3,4], [4,4] ,[5,4],
				[0,5], [1,5], [2,5], [3,5], [4,5] ,[5,5],
	
				[0,6], [1,6], [2,6], [3,6], [4,6], [5,6],
				[0,6], [1,6], [2,6], [3,6], [4,6], [5,6],
				[0,6], [1,6], [2,6], [3,6], [4,6], [5,6],
				[0,6], [1,6], [2,6], [3,6], [4,6], [5,6],
				[0,6], [1,6], [2,6], [3,6], [4,6], [5,6],
				[0,6], [1,6], [2,6], [3,6], [4,6], [5,6]
			])
			.setName('AmiantoToBlanche');
		model.set({'entity' : entity });
	},
	
	turnToBlanche: function(){
		var model = this;
		model.getEntity()
			.animate('AmiantoTurningBlanche', 1)
			.one('AnimationEnd', function() {
				Crafty.trigger("LevelTransition");
			})
			.bind('FrameChange', function fly_away(obj){
				if(obj.currentFrame==37){
					this.unbind('FrameChange',fly_away)
					    .tween({ x: model.get('finalX'), y: model.get('finalY') }, model.get('flightTime'))
				}
			});;
	}
    
});