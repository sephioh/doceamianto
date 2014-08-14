/**@
* #TweenSpriteColor
* @category Graphics
* Tweens color of the sprite, respecting its format.
* 
* Adapted from TweenColor component, by @bisrael: https://github.com/bisrael/LD26/blob/master/scripts/components/TweenColor.js
* Uses modified (so that rgba color can be passed to spriteColor function) SpriteColor component, original by @luizbills: https://github.com/luizbills/CraftySpriteColor/blob/master/src/SpriteColor.js
*
* *Note: Canvas only*
*/
Crafty.c('TweenSpriteColor', {
    init: function() {
      return this.requires('SpriteColor');
    },
    sprgba: function(r, g, b, a) {
      var c, _ref;

      if (arguments.length) {
        if (arguments.length === 1) {
          this.attr(r);
          _ref = r, r = _ref.r, g = _ref.g, b = _ref.b, a = _ref.a;
        } else {
          this.attr({
            r: r,
            g: g,
            b: b,
	    a: a
          });
        }
        c = "rgba(" + ~~r + ", " + ~~g + ", " + ~~b + ", " + a.toFixed(1) + ")";
	if(this._color != c)
		this.spriteColor(c);
	return this;
      } else {
        return {
          r: this.attr('r'),
          g: this.attr('g'),
          b: this.attr('b'),
	  a: this.attr('a')
        };
      }
    },
    isTweeningSpriteColor: function() {
      return this._tswc_frameListener != null;
    },
    stopTweeningSpriteColor: function() {
      if (this.isTweeningSpriteColor()) {
        this.unbind('EnterFrame', this._tswc_frameListener);
        return this._tswc_frameListener = null;
      }
    },
    tweenSpriteColor: function(to, time) {
      var elapsed, from, step, _ref, _ref1, _ref2, _ref3;

      this.stopTweeningSpriteColor();
      from = this.sprgba();
      if ((_ref = to.r) == null) {
        to.r = from.r;
      }
      if ((_ref1 = to.g) == null) {
        to.g = from.g;
      }
      if ((_ref2 = to.b) == null) {
        to.b = from.b;
      }
      if ((_ref3 = to.a) == null) {
        to.a = from.a;
      }
      step = {
        r: (to.r - from.r) / time,
        g: (to.g - from.g) / time,
        b: (to.b - from.b) / time,
	a: (to.a - from.a) / time
      };
      elapsed = 0;
      this._tswc_frameListener = function(e) {
        elapsed += 1;
        if (elapsed >= time) {
          this.stopTweeningSpriteColor();
	  this.sprgba(to);
	  this.trigger("TweenSpriteColorEnd");
          return;
        }
        from.r += step.r;
        from.g += step.g;
        from.b += step.b;
	from.a += step.a;
        this.sprgba(from);
        Crafty.trigger("Invalidate");
	return this;
      };
      this.bind('EnterFrame', this._tswc_frameListener);
      return this.bind('RemoveComponent', function(c) {
        if (c === 'TweenSpriteColor') {
          return this.stopTweeningSpriteColor();
        }
      });
    }
  });