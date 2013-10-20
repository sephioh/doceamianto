Crafty.c("Camera", {
    init: function() {},
    camera: function(obj) {
        this.set(obj);
        var that = this;
        obj.bind("Moved", function(location) {
		 var d = location;
		  d.w = obj._w,
		  d.h = obj._h;
		 that.set(location);
        });
    },
    set: function(obj) {
	  var xx = (-obj.x + Crafty.viewport.width / 2) - obj.w/2,
		yy = (-obj.y + Crafty.viewport.height / 2) - obj.h/2;
        Crafty.viewport.x = xx,
        Crafty.viewport.y = yy;
    }
});