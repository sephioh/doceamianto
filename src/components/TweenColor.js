Crafty.c('TweenColor', {
    init: function() {
      return this.requires('Color');
    },
    rgb: function(r, g, b) {
      var c, _ref;

      if (arguments.length) {
        if (arguments.length === 1) {
          this.attr(r);
          _ref = r, r = _ref.r, g = _ref.g, b = _ref.b;
        } else {
          this.attr({
            r: r,
            g: g,
            b: b
          });
        }
        c = "rgb(" + ~~r + ", " + ~~g + ", " + ~~b + ")";
		
        return this.color(c);
      } else {
        return {
          r: this.attr('r'),
          g: this.attr('g'),
          b: this.attr('b')
        };
      }
    },
    isTweeningColor: function() {
      return this._twc_frameListener != null;
    },
    stopTweeningColor: function() {
      if (this.isTweeningColor()) {
        this.unbind('EnterFrame', this._twc_frameListener);
        return this._twc_frameListener = null;
      }
    },
    tweenColor: function(to, time) {
      var elapsed, from, step, _ref, _ref1, _ref2;

      this.stopTweeningColor();
      from = this.rgb();
      if ((_ref = to.r) == null) {
        to.r = from.r;
      }
      if ((_ref1 = to.g) == null) {
        to.g = from.g;
      }
      if ((_ref2 = to.b) == null) {
        to.b = from.b;
      }
      step = {
        r: (to.r - from.r) / time,
        g: (to.g - from.g) / time,
        b: (to.b - from.b) / time
      };
      elapsed = 0;
      this._twc_frameListener = function(e) {
        elapsed += 1;
        if (elapsed >= time) {
          this.stopTweeningColor();
          this.rgb(to);
          return;
        }
        from.r += step.r;
        from.g += step.g;
        from.b += step.b;
        return this.rgb(from);
      };
      this.bind('EnterFrame', this._twc_frameListener);
      return this.bind('RemoveComponent', function(c) {
        if (c === 'TweenColor') {
          return this.stopTweeningColor();
        }
      });
    }
  });