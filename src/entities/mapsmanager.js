
function MapsManager() {

	maps = [],
	currentMap = "";
	    
	this.m = function (a) {
		var map;
		if (typeof a === 'undefined') {
			a = currentMap;
		} else if (typeof a === 'number') {
			map = maps[a];
		}
		if (typeof a === 'string') {
			for(var i = 0, l = maps.length; i<l; i++) {
				if(maps[i].properties.name === a) {
					map = maps[i];
					break;
				}
			}
		}
		return map;
	},
	
	this.addMap = function(){
		maps.push(Crafty.e("TiledLevel"));
		return maps[maps.length - 1];
	},
	
	this.configTiles = function(o) {
		console.log("carregado ", o);
	},
	
	this.prepTilesets = function(tm) {
	    var _this = this;
	    _.each(tm.tilesets, function(ts){
	      _this.makeTiles(ts, gameContainer.conf.get('renderType'));
	    });
	    return this;
	},
	
	this.prepTileset = function(ts) {
	    this.makeTiles(ts, gameContainer.conf.get('renderType'));
	    return this;
	},
	
	this.makeTiles = function(ts, drawType) {
	    var components, i, posx, posy, sMap, sName, tHeight, tName, tNum, tWidth, tsHeight, tsImage, tsHash, tsProperties, tsWidth, xCount, yCount, _i, _ref;
	    tsImage = ts.image, tNum = ts.firstgid, tsWidth = ts.imagewidth;
	    tsHeight = ts.imageheight, tWidth = ts.tilewidth, tHeight = ts.tileheight, tsHash = utils.djb2Code(tsImage);
	    tsProperties = ts.tileproperties;
	    xCount = tsWidth / tWidth | 0;
	    yCount = tsHeight / tHeight | 0;
	    sMap = {};
	    for (i = _i = 0, _ref = yCount * xCount; _i < _ref; i = _i += 1) {
	      posx = i % xCount;
	      posy = i / xCount | 0;
	      sName = "tileSprite" + tsHash + "_" + tNum;
	      tName = "tile" + tNum;
	      sMap[sName] = [posx, posy];
	      components = "2D, " + drawType + ", " + sName + ", MapTile";
	      if (tsProperties) {
		if (tsProperties[tNum - 1]) {
		  if (tsProperties[tNum - 1]["components"]) {
		    components += ", " + tsProperties[tNum - 1]["components"];
		  }
		}
	      }
	      Crafty.c(tName, {
		comp: components,
		init: function() {
		  this.addComponent(this.comp);
		  return this;
		}
	      });
	      tNum++;
	    }
	    Crafty.sprite(tWidth, tHeight, tsImage, sMap);
	    return null;
	},
	
	this.switchMap = function(map,side) {
		
		//!TODO Store current map in DB or make its elements invisible
		this.showMap(currentMap,false); // ?
		
		//!TODO Show already built map and put character on proper side of it
		// entrances can be set as component of tiles
		this.showMap(map); // [...] ?
		
		//!TODO? Configure tiles, if not already configured
		
	},
	
	this.showMap = function(map, bool) {
		map = this.m(map),
		bool = typeof bool !== "boolean"?true:bool;
		
		Crafty(map.properties.name).each(function(){ this.visible = bool; });
	
		return this;
	},
	
	this.getCurrentMap = function() {
	  
	}
	
}