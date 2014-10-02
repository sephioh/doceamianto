Crafty.c("CustomControls", {
  
	init: function() {
		
	},
	 
	twowayer: function(speed, jumpspeed, keys) {
		this.requires("Twoway");
		this.twoway(speed, jumpspeed);
		if (Crafty.mobile)
			this.initInfcKeys(keys);
		return this;
	},
	 
	multiwayer: function(speed, dirs, keys){
		this.requires("Multiway, Keyboard");
		this.multiway(speed, dirs);
		if (Crafty.mobile)
			this.initInfcKeys(keys);
		return this;
	},
	 
	initInfcKeys: function(keys) {
		infc.keys = {};
		var keysCoords = resources.get("interfc_keys_relative_coordinates"),
		    that = this,
		    screenRes = gameContainer.conf.get('screenRes');
		for (var k in keys) {
			var b = Crafty.e('2D, ' + gameContainer.conf.get('renderType') + ', Mouse, interfc_button'),
			    key = keys[k],
			    sprName = key + "_sprite";
			    
			b.relativePos = keysCoords[key];
			b.key = key;
			b.requires(sprName);
			b.bind("MouseDown", function(){
				if(!that.isDown(this.key)){
					Crafty.trigger("KeyDown", { key: Crafty.keys[this.key] });
					Crafty.keydown[Crafty.keys[this.key]] = true;
				}
			}).bind("MouseUp", function(){
				if(that.isDown(this.key)){
					Crafty.trigger("KeyUp", { key: Crafty.keys[this.key] });
					delete Crafty.keydown[Crafty.keys[this.key]];
				}
			}).bind("MouseOut", function(){
				if(that.isDown(this.key)){
					Crafty.trigger("KeyUp", { key: Crafty.keys[this.key] });
					delete Crafty.keydown[Crafty.keys[this.key]];
				}
			}).bind("EnterFrame", function(){
				this.attr({
				  x: (Crafty.viewport.x * -1) + Crafty.viewport.width - this.relativePos.x,
				  y: (Crafty.viewport.y * -1) + Crafty.viewport.height - this.relativePos.y
				});
			}).z = 2000;
			infc.keys[key] = b;
		}
	}
	
});