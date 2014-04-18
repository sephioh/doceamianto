Crafty.c('Ellipsis', {
      
	nFrames: 25,
	eFrames: 0,
	
	init: function() {
		this.requires('2D, '+gameContainer.conf.get('renderType')+', Text');
		
		this.attr({ x: Crafty.viewport.width/2, y: 500, w: 78, h: 50,  z: 1000 })
		    .textFont({ weight: 'bold', family: 'Arial', size : '50px', family: 'Perfect_dos_vga_437' })
		    .text(". . . ")
		    .bind('EnterFrame', function() {
			    this.eFrames++;
			    if(this.eFrames === this.nFrames) {
				    this.eFrames = 0;
				    
				    if(this._text === ". . . ") {
					    this.text("")
				    } else {
					    this.text(this._text + ". ")
						.attr({ x: this._x - this._w/2 });
				    }
			    }
		    });
		return this;
	}
	 
});