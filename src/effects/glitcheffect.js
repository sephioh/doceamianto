// glitch by snorpey https://github.com/snorpey/jpg-glitch MIT license 

// GlitchEffect instantiates Glitch (embedded in GlitchEffect)

function GlitchEffect () {
	
	this.glitchScreen = function (canvas_one, canvas_two, glitch_options)
	{	
		
		var ctx_1 = canvas_one.getContext( '2d' );
		this.ctx_2 = canvas_two.getContext( '2d' );
		
		// storing canvas dimensions
		var canvas_width = canvas_one.clientWidth;
		var canvas_height = canvas_one.clientHeight;

		// getting the image data from canvas one
		// https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D#getImageData()
		var image_data_1 = ctx_1.getImageData( 0, 0, canvas_width, canvas_height );
		
		var _this = this;
		    
		// glitch the image data ( pass drawImageDataInCanvasTwo as a callback function and its context (ie. this) )
		this.glitchObj.glitchImage( image_data_1, glitch_options, _this.drawImageDataInCanvasTwo , _this );
		
	}
	
	this.glitchPic = function (image_data, canvas_to, glitch_options)
	{	
		this.ctx_2 = canvas_to.getContext( '2d' );
				
		var _this = this;
		    
		// glitch the image data ( pass drawImageDataInCanvasTwo as a callback function and its context (ie. this) )
		this.glitchObj.glitchImage( image_data, glitch_options, _this.drawImageDataInCanvasTwo , _this );
		
	}

	this.drawImageDataInCanvasTwo = function ( image_data )
	{
		// put the glitched image data on canvas two.
		// https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D#putImageData()
		this.ctx_2.putImageData( image_data, 0, 0 );
	}

	this.Glitch = function ()
	{
		this.canvas = document.createElement( 'canvas' );
		this.ctx = this.canvas.getContext( '2d' );

		this.tmp_canvas = document.createElement( 'canvas' );
		this.tmp_ctx = this.tmp_canvas.getContext( '2d' );

		this.canvas_size = { width: 10, height: 10 };

		this.base64_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		this.base64_map = this.base64_chars.split( '' );
		this.reverse_base64_map = { };

		this.iterations;
		this.quality;
		this.seed;
		this.amount;
		this.base64;
		this.byte_array;
		this.jpg_header_length;
		this.img;
		this.new_image_data;
		this.image_data;
		this.input;
		
		var _this = this;
		this.base64_map.forEach( function( val, key ) { _this.reverse_base64_map[val] = key; } );

		this.glitchImage = function ( image_data, input, callback, thisArg )
		{
			this.seed = input.seed / 100;
			this.quality = input.quality / 100;
			this.amount = input.amount / 100;
			this.iterations = input.iterations;

			// changed this part a bit to remove dependency
			this.canvas.width = image_data.width;
			this.canvas.height = image_data.height;

			this.tmp_canvas.width = image_data.width;
			this.tmp_canvas.height = image_data.height;
			// end changes

			this.base64 = this.getBase64FromImageData( image_data, this.quality );
			this.byte_array = this.base64ToByteArray( this.base64 );
			this.jpg_header_length = this.getJpegHeaderSize( this.byte_array );

			for ( i = 0; i < this.iterations; i++ )
			{
				this.glitchJpegBytes( this.byte_array, this.jpg_header_length, this.seed, this.amount, i, this.iterations );
			}

			this.img = new Image();
			
			var _this = this;
			this.img.onload = function() {
				_this.ctx.drawImage( _this.img, 0, 0 );
				_this.new_image_data = _this.ctx.getImageData( 0, 0, image_data.width, image_data.height );
				
				if(thisArg !== undefined)
					callback.call(thisArg, _this.new_image_data);
				else
					callback(_this.new_image_data);
			};
			
			this.img.src = this.byteArrayToBase64( this.byte_array );
			
		}

		this.glitchJpegBytes = function( byte_array, jpg_header_length, seed, amount, i, len )
		{
			var max_index = byte_array.length - jpg_header_length - 4;
			var px_min = parseInt( max_index / len * i, 10 );
			var px_max = parseInt( max_index / len * ( i + 1 ), 10 );

			var delta = px_max - px_min;
			var px_i = parseInt( px_min + delta * seed, 10 );

			if ( px_i > max_index )
			{
				px_i = max_index;
			}

			var index = Math.floor( jpg_header_length + px_i );

			this.byte_array[index] = Math.floor( amount * 256 );
		}

		this.getBase64FromImageData = function ( image_data, quality )
		{
			var q = typeof quality === 'number' && quality < 1 && quality > 0 ? quality : 0.1;
			this.tmp_ctx.putImageData( image_data, 0, 0 );
			return this.tmp_canvas.toDataURL( 'image/jpeg', q );
		}

		this.getJpegHeaderSize = function ( data )
		{
			var result = 417;

			for ( var i = 0, l = data.length; i < l; i++ )
			{
				if (
					data[i] === 0xFF &&
					data[i + 1] === 0xDA
				)
				{
					result = i + 2;
					break;
				}
			}

			return result;
		}

		// https://github.com/mutaphysis/smackmyglitchupjs/blob/master/glitch.html
		// base64 is 2^6, byte is 2^8, every 4 base64 values create three bytes
		this.base64ToByteArray = function ( str )
		{
			var result = [ ];
			var digit_num;
			var cur;
			var prev;

			for ( var i = 23, l = str.length; i < l; i++ )
			{
				cur = this.reverse_base64_map[ str.charAt( i ) ];
				digit_num = ( i - 23 ) % 4;

				switch ( digit_num )
				{
					// case 0: first digit - do nothing, not enough info to work with
					case 1: // second digit
						result.push( prev << 2 | cur >> 4 );
						break;
					case 2: // third digit
						result.push( ( prev & 0x0f ) << 4 | cur >> 2 );
						break;
					case 3: // fourth digit
						result.push( ( prev & 3 ) << 6 | cur );
						break;
				}

				prev = cur;
			}

			return result;
		}

		this.byteArrayToBase64 = function ( arr )
		{
			var result = [ 'data:image/jpeg;base64,' ];
			var byte_num;
			var cur;
			var prev;
			var i;
			//var _this = this;

			for ( var i = 0, l = arr.length; i < l; i++ )
			{
				cur = arr[i];
				byte_num = i % 3;

				switch ( byte_num )
				{
					case 0: // first byte
						result.push( this.base64_map[ cur >> 2 ] );
						break;
					case 1: // second byte
						result.push( this.base64_map[( prev & 3 ) << 4 | ( cur >> 4 )] );
						break;
					case 2: // third byte
						result.push( this.base64_map[( prev & 0x0f ) << 2 | ( cur >> 6 )] );
						result.push( this.base64_map[cur & 0x3f] );
						break;
				}

				prev = cur;
			}

			if ( byte_num === 0 )
			{
				result.push( this.base64_map[( prev & 3 ) << 4] );
				result.push( '==' );
			}

			else if ( byte_num === 1 )
			{
				result.push( this.base64_map[( prev & 0x0f ) << 2] );
				result.push( '=' );
			}

			return result.join( '' );
		}

		this.getImageDataCopy = function ( image_data )
		{
			var copy = this.tmp_ctx.createImageData( image_data.width, image_data.height );
			copy.data.set( image_data.data );
			return copy;
		}
	}
	
	this.ctx_2;
	this.glitchObj = new this.Glitch();
	
}