Crafty.c("FloorSet", {
  
	_tileSet: {},
	_polylineObj: null,
	_tiledObj: null,
	_currentTile: null,
	 
	init: function(){
		this.bind("DanceFloorSteppedOver", function(tI){ 
			if(!this._currentTile || this._currentTile.obj.floorIndex != tI){
				if(!this._currentTile)
					this.currentFloor(0);  
				this.activateFloor(tI)
				    .revealNextFloor();
			}
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
	 
	revealNextFloor: function(){
		var next = this.nextFloor(),
		    tiled = this._tiledObj,
		    ntShine = [];
		ntShine[0] = tiled.getTile(next.tY, next.tX - 1, next.tL),
		ntShine[1] = tiled.getTile(next.tY - 1, next.tX - 1, next.tL),
		ntShine[2] = tiled.getTile(next.tY - 1, next.tX, next.tL),
		ntShine[3] = tiled.getTile(next.tY - 1, next.tX + 1, next.tL),
		ntShine[4] = tiled.getTile(next.tY, next.tX + 1, next.tL);

		for(var i = 0, l = ntShine.length; i < l; i++)
			ntShine[i].reveal();
		next.obj.reveal();
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
		    ctShine = [];

		ctShine[0] = tiled.getTile(curr.tY, curr.tX - 1, curr.tL),
		ctShine[1] = tiled.getTile(curr.tY - 1, curr.tX - 1, curr.tL),
		ctShine[2] = tiled.getTile(curr.tY - 1, curr.tX, curr.tL),
		ctShine[3] = tiled.getTile(curr.tY - 1, curr.tX + 1, curr.tL),
		ctShine[4] = tiled.getTile(curr.tY, curr.tX + 1, curr.tL);
		
		for(var i = 0, l = ctShine.length; i < l; i++)
			ctShine[i].fullShine();
		curr.obj.steppedOver();
		return this;
	},
	 
	setFloorsSeries: function(poly,tiled,tileSize) {
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

		    var t = tiled.getTile(tY,tX,layer);
		    if (t && t.__c.dance_floor) {
			    if (i==0) {
			      
			    }
			    this.addTile(t, tX, tY, layer, i);    
		    }
		    if(layer == 0)
			    layer = 2;
		    else
			    layer--;
	    }
	    return this;
	}
	
});