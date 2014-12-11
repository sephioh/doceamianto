Utils = Backbone.Model.extend({
  
	defaults: {
	  
	},
	
	initialize: function() {
	  
	},
	
	getLang: function(){
		var lang = this.getUrlVars()['lang'];
		lang = lang != 'en'?'pt':'en';
		return lang;
	},
	
	getUrlVars: function() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	},
	
	getRandomColor: function () {
		var letters = '0123456789ABCDEF'.split( '' );
		var color = '#';
		
		for ( var i = 0; i < 6; i++ )
		{
			color += letters[ Math.round(Math.random() * 15) ];
		}

		return color;
	},
	
	hashCode: function(str){
	    var hash = 0;
	    if (str.length == 0) return hash;
	    for (i = 0; i < str.length; i++) {
		char = str.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	    }
	    return hash;
	},
	
	djb2Code: function(str){
	    var hash = 5381;
	    for (i = 0; i < str.length; i++) {
		char = str.charCodeAt(i);
		hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
	    }
	    return hash;
	},
	
	/*
	* turns a string containing array of bytes to an actual 'bytes' (integer) array
	* @param str - string
	* returns array
	*/
	stringOfByteArrayToArrayOfBytes: function (str) {
		var byteArray = str.split(",");
		_.each(byteArray, function(byte, key){
			byteArray[key] = parseInt(byte);
		});
		return byteArray;
	},
	
	/* fadeSound - fade sound to defined value, increasing or decreasing by 0.1 each given frames
	  * 
	  * @param soundId - id of the audio element
	  * @param to - volume to "fade" to
	  * @param rate - rate at which volume will be changed, in frames
	*/
	fadeSound: function(soundId,to,rate) {
		var eFrames = 0,
			C,
			down;
		for(var i = 0; i < Crafty.audio.channels.length; i++){
			var c = Crafty.audio.channels[i];
			if(c._is(soundId)){
				C = c;
				break;
			}
		}
		      
		if(C){
			if(to > C.obj.volume)
				if(to <= 1){
					down = false;
				}else{
					return false;
				}
			else
			if(to < C.obj.volume)
				if(to >= 0){
					down = true;
				}else{
					return false;
				}
			else 
				return false;
			Crafty.bind("EnterFrame", function gradually_change_volume() {
				if(eFrames === rate){
					eFrames = 0;
					
					if(down){
						var nVol = C.obj.volume - 0.1;      
						nVol = Number(nVol.toFixed(1));
						if(nVol === to){
							Crafty.unbind("EnterFrame", gradually_change_volume);
							if(!nVol)
								Crafty.audio.stop(soundId);
						} else {
							C.obj.volume = nVol;
						}
					}
					else{
						var nVol = C.obj.volume + 0.1;
						nVol = Number(nVol.toFixed(1));
						if(nVol === to){
							Crafty.unbind("EnterFrame", gradually_change_volume);
						}
						if(nVol <= 1){
							C.obj.volume = nVol;
						}
					}
				  
				}
				eFrames++;
			});
			return this;
		}
		else {
			return C;
		}
 	},
	
	toggleFullScreen: function(ele){
		if (!document.fullscreenElement &&
		!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
			var element = document.getElementById(ele);
			if(element.requestFullScreen)
			    element.requestFullScreen();
			else if(element.msRequestFullScreen)
			    element.msRequestFullScreen();
			else if(element.webkitRequestFullScreen)
			    element.webkitRequestFullScreen();
			else if(element.mozRequestFullScreen)
			    element.mozRequestFullScreen();
		} else {
			if (document.exitFullscreen)
			    document.exitFullscreen();
			else if (document.msExitFullscreen)
			    document.msExitFullscreen();
			else if (document.webkitExitFullscreen)
			    document.webkitExitFullscreen();
			else if (document.mozCancelFullScreen)
			    document.mozCancelFullScreen();
		}
	},
	
	setViewportBounds: function(obj){
		if(Crafty.mobile) {
			//Crafty.viewport.bounds = { min: { x:0, y:0 }, max: gameContainer.conf.get('maxRes') };
			if(obj)
				Crafty.viewport.follow(obj,0,0);
		}
	}
	
});