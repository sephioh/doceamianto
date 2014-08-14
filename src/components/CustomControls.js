Crafty.c("CustomControls", {
  
	init: function() {
		
	},
	 
	twowayer: function(speed, jumpspeed, keys) {
		this.requires("Twoway");
		this.twoway(speed, jumpspeed);
		if (gameContainer.conf.get('touch'))
			this.initInfcKeys(keys);
		return this;
	},
	 
	multiwayer: function(speed, dirs, keys){
		this.requires("Multiway, Keyboard");
		this.multiway(speed, dirs);
		if (gameContainer.conf.get('touch'))
			this.initInfcKeys(keys);
		return this;
	},
	 
	initInfcKeys: function(keys) {
		infc.keys = {};
		var keyOpts = resources.get("interfc_keys_options"),
		    that = this,
		    screenRes = gameContainer.conf.get('screenRes');
		for (var k in keys) {
			var b = Crafty.e("2D, Canvas, Mouse, key_button"),
			    key = keys[k],
			    sprName = key + "_sprite",
			    pos = { x: keyOpts[key].x, y: screenRes.h - keyOpts[key].y };
			    
			b.relativePos = keyOpts[key];
			b.key = key;
			b.requires(sprName);
			b.bind("MouseDown", function(){
				if(!that.isDown(this.key))
					Crafty.trigger("KeyDown", { key: Crafty.keys[this.key] });
			}).bind("MouseUp", function(){
				if(that.isDown(this.key))
					Crafty.trigger("KeyUp", { key: Crafty.keys[this.key] });
			}).bind("MouseOut", function(){
				if(that.isDown(this.key))
					Crafty.trigger("KeyUp", { key: Crafty.keys[this.key] });
			}).bind("EnterFrame", function(){
				this.attr({
				  x: (Crafty.viewport.x * -1) + this.relativePos.x,
				  y: (Crafty.viewport.y * -1) + this.relativePos.y
				});
			}).z = 2000;
			infc.keys[key] = b;
		}
	}
	
});