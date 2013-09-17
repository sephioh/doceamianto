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
        xx = (-obj.x + Crafty.viewport.width / 2)
        yy = (-obj.y + Crafty.viewport.height / 2)
        Crafty.viewport.x = xx;
        Crafty.viewport.y = yy;
    }
});