Crafty.c("PoliceSpawner", {

	maxEntities: 1,
	
	init: function(){
		this.requires("2D");
		this.currentEntities = [];
		this.target = null;
	},

	spawn: function() {
		while (this.currentEntities.length < this.maxEntities) {
			var _this = this;
			var pm = Crafty.e("Policeman")
			    .setFace(Crafty.math.randomInt(0,2))
			    .attr({ x: this._x, y: this._y, z: this._z })
			    .one("Remove", function(){ _this.currentEntities.pop(pm); })
			    .walkLeftOrRight(undefined, Crafty.math.randomInt(50,300))
			    .hunt(this.target);
			this.currentEntities.push(pm);
		}
		return this;
	},

	setTarget: function(obj) {
		this.target = obj;
		return this;
	}
	
});