function MapsManager() {

    var maps = [],
	currentMap = null,
	bgs = { bg1: [], bg2: [], bg3: {} },
	level,
	paroundEnt,
	paInitPos,
	current_background_sections,
	background_section_size = 965,
	map_section_size = 1067.2,
	bgMoveRate = 15;
	
    this.m = function (a) {
	var map;
	if (typeof a === 'undefined' && currentMap !== null) {
	    a = currentMap;
	} 
	if (typeof a === 'number') {
	    map = maps[a];
	} else
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
	currentMap = maps.push(Crafty.e("TiledLevel")) - 1;
	return this.m();
    },
    
    this.prepTilesets = function(tm) {
	var _this = this;
	_.each(tm.tilesets, function(ts){
	  this.prepTileset(ts);
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
    
    this.getCurrentMap = function() {
	return this.m(currentMap);
    },
    
    this.setLevel = function(l){
	level = l;
	return this;
    },
    
    this.setBackgrounds = function(arr) {
	var bg1 = "bg1", 
	    bg2 = "bg2", 
	    bg3 = "bg3", 
	    s = "-", 
	    l = level, 
	    ext = ".png", 
	    bgIndex, 
	    imagesPath = Crafty.paths().images, 
	    pE = paroundEnt;

	for (var i = 0, len = arr.length; i<len; i++) {
	    if (arr[i].search(bg1) !== -1) {
		bgIndex = parseInt(arr[i].replace(bg1+s+l+s,"").replace(ext,""));
		bgs.bg1[bgIndex] = Crafty.e("Background").attr({ x: bgIndex * background_section_size, z: pE._z - 2 }).image(imagesPath+arr[i]);
		bgs.bg1[bgIndex].playerEnt = pE,
		bgs.bg1[bgIndex].playerInitPos = paInitPos,
		bgs.bg1[bgIndex].placement = bgIndex,
		bgs.bg1[bgIndex].startParallaxing();
	    } else if (arr[i].search(bg2) !== -1) {
		bgIndex = parseInt(arr[i].replace(bg2+s+l+s,"").replace(ext,""));
		bgs.bg2[bgIndex] = Crafty.e("Background").attr({ x: bgIndex * background_section_size, z: pE._z - 3 }).image(imagesPath+arr[i]);
		bgs.bg2[bgIndex].playerEnt = pE,
		bgs.bg2[bgIndex].playerInitPos = paInitPos,
		bgs.bg2[bgIndex].placement = bgIndex,
		bgs.bg2[bgIndex].divisor = 0.5,
		bgs.bg2[bgIndex].startParallaxing();
	    } else if (arr[i].search(bg3) !== -1) {
		bgs.bg3 = Crafty.e("Background").attr({ x: 0, z: pE._z - 4 , w: map_section_size * 20, h: 2464,  visible: true }).image(imagesPath+arr[i], "repeat");
	    }
	}
	return this;
    },
    
    this.parallaxAround = function (pa, paInit) {
	paroundEnt = pa,
	paInitPos = paInit;
	return this;
    },
    
    this.getBackgrounds = function() {
	return bgs;
    }
	
}