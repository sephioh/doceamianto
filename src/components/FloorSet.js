Crafty.c("FloorSet", {
  
	_tileSet: {},
	_polylineObj: null,
	_tiledObj: null,
	_currentTile: null,
	teleporting: false,
	 
	init: function(){
		this.bind("DanceFloorSteppedOver", function(tI){
			if(!this._currentTile || this._currentTile.obj.floorIndex != tI || this.teleporting){
				if(!this._currentTile)
					this.currentFloor(0);  
				this.activateFloor(tI)
				    .revealFloor();
				if(this.teleporting)
					this.teleporting = false;
			}
		    })
		    .bind("PlayerWasTeleported", function(){
			this.revealFloor(this._currentTile.obj.floorIndex);
		    });
		return this;
	},
	 
	setPolylineObj: function(polylineObj){
		this._polylineObj = polylineObj;
		return this;
	},
	 
	setTiledObj: function(tiledObj){
		this._tiledObj = tiledObj;
		return this;
	},
	 
	addTile: function(tile, tX, tY, tL, tIndex){
		var tI = "t" + tIndex,
		    newEntry = {};
		tile.setIndex(tIndex);
		newEntry = { tX: tX, tY: tY, tL: tL, obj: tile };
		this._tileSet[tI] = newEntry;
		return this;
	},
	 
	revealFloor: function(tIndex){
		var floor = tIndex !== undefined ? this._tileSet["t" + tIndex] : this.nextFloor(),
		    tiled = this._tiledObj,
		    s = this.getFloorShine(floor.tY, floor.tX, floor.tL),
		    i = 0, 
		    l = s.length;
		for(; i < l; i++)
			s[i].reveal();
		floor.obj.reveal();
		return this;
	},
	
	nextFloor: function(){
		var currIndex = this._currentTile? this._currentTile.obj.floorIndex : -1;
		return this._tileSet["t" + (currIndex + 1)];
	},
	
	currentFloor: function(t){
		return this._currentTile = this._tileSet["t" + t];
	},
	 
	activateFloor: function(tIndex){
		var curr = this.currentFloor(tIndex),
		    tiled = this._tiledObj,
		    s = this.getFloorShine(curr.tY, curr.tX, curr.tL),
		    i = 0,
		    l = s.length;
		for(; i < l; i++)
			s[i].fullShine();
		curr.obj.steppedOver();
		return this;
	},
	 
	setFloorsSeries: function(poly, tiled, tileSize) {
		this.setPolylineObj(poly)
		    .setTiledObj(tiled);
		
		var i = 0,
		    pl = poly.polyline.length,
		    pX = poly.x,
		    pY = poly.y,
		    layer = 2, 
		    tX, tY;
		for (; i < pl; i++) {
			tX = Math.floor((pX + poly.polyline[i].x)/tileSize),
			tY = Math.floor((pY + poly.polyline[i].y)/tileSize);

			var t = tiled.getTile(tY,tX,layer),
			    s = this.getFloorShine(tY,tX,layer);
			if (t && t.__c.dance_floor) {
				t.removeComponent("grnd")
				    .addComponent("DanceFloor");
				for(var h = 0, l = s.length; h < l; h++){
					if(s[h]) s[h].addComponent("Shine");
				}
				this.addTile(t, tX, tY, layer, i);    
			} else {
				console.error("FloorSet: Problem in tile sequence.");
			}
			if(layer == 0)
				layer = 2;
			else
				layer--;
		}
		return this;
	},
	 
	getFloorShine: function(tY, tX, tL){
		var s = [], tiled = this._tiledObj;
		s[0] = tiled.getTile(tY, tX - 1, tL),
		s[1] = tiled.getTile(tY - 1, tX - 1, tL),
		s[2] = tiled.getTile(tY - 1, tX, tL),
		s[3] = tiled.getTile(tY - 1, tX + 1, tL),
		s[4] = tiled.getTile(tY, tX + 1, tL);
		return s;
	}
	
	
});