Crafty.c("CustomControls", {
  
	init: function() {
		
	},
	 
	twowayer: function(speed, jumpspeed, keys) {
		this.requires("Twoway");
		this.twoway(speed, jumpspeed);
		if (Crafty.mobile)
			this._initInfcKeys(keys);
		return this;
	},
	 
	multiwayer: function(speed, dirs, keys){
		this.requires("Multiway, Keyboard");
		this.multiway(speed, dirs);
		if (Crafty.mobile)
			this._initInfcKeys(keys);
		return this;
	},
	 
	_initInfcKeys: function(keys) {
		if(infc.keys)
			for(var k in infc.keys)
				infc.keys[k].destroy();
		infc.keys = {};
		var keysCoords = resources.get("interfc_keys_relative_coordinates"),
		    that = this,
		    screenRes = gameContainer.conf.get('screenRes'),
		    upSpr = "_up_sprite",
		    downSpr = "_down_sprite";
		for (var k in keys) {
			var b = Crafty.e('2D, ' + gameContainer.conf.get('renderType') + ', Mouse, interfc_button'),
			    key = keys[k],
			    sprName = key + upSpr;
			b.relativePos = keysCoords[key];
			b.key = key;
			b.requires(sprName);
			b.bind("MouseDown", function(){
				if(!that.isDown(this.key)){
					var upSprName = this.key + upSpr,
					    downSprName = this.key + downSpr;
					this.removeComponent(upSprName)
					    .addComponent(downSprName);
					Crafty.trigger("KeyDown", { key: Crafty.keys[this.key] });
					Crafty.keydown[Crafty.keys[this.key]] = true;
				}
			}).bind("MouseUp", function(){
				if(that.isDown(this.key)){
					var upSprName = this.key + upSpr,
					    downSprName = this.key + downSpr;
					this.removeComponent(downSprName)
					    .addComponent(upSprName);
					Crafty.trigger("KeyUp", { key: Crafty.keys[this.key] });
					delete Crafty.keydown[Crafty.keys[this.key]];
				}
			}).bind("MouseOut", function(){
				if(that.isDown(this.key)){
					var upSprName = this.key + upSpr,
					    downSprName = this.key + downSpr;
					this.removeComponent(downSprName)
					    .addComponent(upSprName);
					Crafty.trigger("KeyUp", { key: Crafty.keys[this.key] });
					delete Crafty.keydown[Crafty.keys[this.key]];
				}
			}).attr({
			    x: (Crafty.viewport.x * -1) + Crafty.viewport.width - b.relativePos.x,
			    y: (Crafty.viewport.y * -1) + Crafty.viewport.height - b.relativePos.y,
			    z: 2000
			});
			b.bind("EnterFrame", function(){
				this.attr({
				  x: (Crafty.viewport.x * -1) + Crafty.viewport.width - this.relativePos.x,
				  y: (Crafty.viewport.y * -1) + Crafty.viewport.height - this.relativePos.y
				});
			});
			infc.keys[key] = b;
		}
	}
	
});