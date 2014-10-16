Heart = BaseEntity.extend({
	defaults: {
		'stepTime' : 100,
		'SIZE' : 250,	// Initial width/height
		'initPos' : 0
	},
	initialize: function(){
		var model = this,
		    entity = Crafty.e("2D, " + gameContainer.conf.get('renderType') + ", heart, " + model.get("heartColor") + "Heart, Tween, Collision, Delay")
			    .collision();
		if(model.get("initAttr"))
		    entity.attr(model.get("initAttr"));
		entity._nextStep = function(){
		      ++this._step;
		      var n = this._step;
		      if(n + 1 > this._steps.length){
			  this.destroy();
			  return;
		      }
		      var next = { x: this._steps[n].x - this._w - this._w/2, y: this._steps[n].y - this._h };
		      this.tween(next, 400);
		      this.delay(function(){ this.one("TweenEnd", this._nextStep) }, 175);
		};
		entity._step = 0;
		model.set({'entity' : entity });
	},
	followSteps: function(rail){
	      var ent = this.getEntity(),
		  next = { x: rail[0].x - ent._w, y: rail[0].y - ent._h };
	      ent.attr(next);
	      ent._steps = rail;
	      ent._nextStep();
	}
});