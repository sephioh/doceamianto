Crafty.c("Camera", {
    init: function() {},
    camera: function(obj) {
        this.set(obj);
        var that = this;
        obj.bind("Moved", function(location) {
            that.set(location);
        });
    },
    set: function(obj) {
        var xx = ((-obj._x + Crafty.viewport.width / 2) + obj._w/2),
	    yy = ((-obj._y + Crafty.viewport.height / 2) + obj._h/2);
        Crafty.viewport.x = xx;
        Crafty.viewport.y = yy;
    }
});