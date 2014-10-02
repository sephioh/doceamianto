
Crafty.c("Camera", {
	externalBounds: undefined,
	vp: Crafty.viewport,
	init: function () {
		this.addComponent("2D")
			.attr({w: this.vp.width, h: this.vp.height})
			.bind("EnterFrame", this.step);
		Crafty.addEvent(this, window, "resize", this.reload);
	},
	step: function () {
		this.checkBounds();		
		this.vp.moveTo(-this.x, -this.y);
	},
	follow: function (target) {
		
		var that = this; // Fucking javascript!
		function move () {
			that.attr({
				x: target.x + target.w / 2 - that.w / 2,
				y: target.y + target.h / 2 - that.h / 2
			});
		};
		
		move(); // Update it now
		target.bind("Move", move);
		return this;
	},
	keepWithinBounds: function (bounds) {
		this.externalBounds = bounds;
		return this;
	},
	checkBounds: function () {
		if (this.externalBounds) {
			var bounds = this.externalBounds;
			if (this.x < bounds.left) this.x = bounds.left;
			else if ((this.x + this.w) > bounds.right) this.x = bounds.right - this.w;
			if (this.y < bounds.top) this.y = bounds.top;
			else if ((this.y + this.h) > bounds.bottom) this.y = bounds.bottom - this.h;
		}
	},
	reload: function () {
		this.attr({
			w: this.vp.width,
			h: this.vp.height
		});
	},
});