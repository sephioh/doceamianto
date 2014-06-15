/**@
* #SpriteColor
* @category Graphics
* Similar to Color and Tint, but it respects the format of sprite.
*
* *Note: Only works for Canvas*
*/
;(function() {
	var sc_canvas,
		sc_ctx,
		sc_drawFunc;
	
	sc_setTmpCtx = function(){
		sc_canvas = document.createElement('canvas'), // create an hidden canvas
		sc_ctx = sc_canvas.getContext('2d');
	};
	
	sc_destroyTmpCtx = function(){
		sc_canvas = null,
		sc_ctx = null;
	};
	
	// draw callback
	sc_drawFunc = function(){
		sc_setTmpCtx();
		// sprite coordinates
		var co = this.__coord,
		// context 2d of hidden canvas
		ctx = sc_ctx;
		// draw the sprite on hidden canvas
		ctx.drawImage(this.img, //image element
			co[0], //x position on sprite
			co[1], //y position on sprite
			co[2], //width on sprite
			co[3], 0, 0, //height on sprite
			this._w, //width on canvas
			this._h //height on canvas
		);
		// Draw a rectangle over the sprite using a overlay
		ctx.save();
		ctx.globalCompositeOperation = "source-in";
		// paint the rectangle with a color
		ctx.fillStyle = this._color;
		ctx.beginPath();
		ctx.fillRect(0, 0, this._w, this._h);
		ctx.closePath();
		ctx.restore();
		// draw the hidden canvas on Crafty canvas
		Crafty.canvas.context.drawImage(sc_canvas, this._x, this._y);
		sc_destroyTmpCtx();
	};

	// the component
	Crafty.c("SpriteColor", {
		init: function(){
			this._color = 'rgba(255,255,255,1)';
			this.bind("Draw", sc_drawFunc)
				.bind("RemoveComponent", function(c) {
					if (c === "SpriteColor") this.unbind("Draw", sc_drawFunc);
				});
		},
	
		/**@
		* #.spriteColor
		* @comp SpriteColor
		* @trigger Change - when the color is applied
		* @sign public this .spriteColor(String hexcolor, Number strength)
		* @param color - The color in HEXADECIMAL
		* @param strength - Level of opacity
		*
		* The argument must be a color readable depending on which browser you
		* choose to support. IE 8 and below doesn't support the rgb() syntax.
		* 
		* @example
		* ~~~
		* Crafty.sprite(16, "http://craftyjs.com/demos/tutorial/sprite.png", {player:[0,3]});
		*
		* Crafty.e("2D, Canvas, player, SpriteColor")
		* 	.spriteColor("#FF0000",0.5); // red with 50% transparency
		* ~~~
		*/
		spriteColor: function(rgbaColor){
			//this._color = Crafty.toRGB(hexcolor, strength);
			this._color = rgbaColor;
			this.trigger("Change");
			return this;
		}
	});
})();
