Crafty.c("VanillaTimer", {
	init: function(){
		this._timedFunctions = {};
	},
	setTimer: function(f, t){
		var timeoutId = setTimeout(f, t);
		this._timedFunctions[timeoutId] = JSON.stringify(f);
		return this;
	},
	cancelTimer: function(f){
		if(f){
			for(var tID in this._timedFunctions){
				var fu = JSON.stringify(f),
				    timed = this._timedFunctions[tID];
				if(timed === fu){
					clearTimeout(tID);
					delete this._timedFunctions[tID];
				}
			}
		}else{
			for(var tID in this._timedFunctions)
				clearTimeout(tID);
			this._timedFunctions = {};
		}
		return this;
	}
});