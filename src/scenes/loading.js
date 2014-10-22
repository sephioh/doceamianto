// the loading screen - will be displayed while assets are loaded
// callback obj argument -> { backgroundColor: 'hexcolor', soundToPlay: 'sound', entitiesColor: 'hexcolor', image: { url, w, h } }
Crafty.scene("loading", function(obj) {
      // clear scene
      sc = {}, infc = {};
      
      var entsColor = '#000000',
	  bgColor = '#FFFFFF',
	  t = gameContainer.lang == "pt"? "carregando..." : "loading...",
	  tsize = 15;
      
      if (typeof obj !== 'undefined') {
	      if(obj.backgroundColor)
		      bgColor = obj.backgroundColor;
	      if(obj.soundToPlay)
		      Crafty.audio.play(obj.soundToPlay, -1);
	      if(obj.entsColor)
		      entsColor = obj.entsColor;
	      if(obj.image)
		      sc.lImage = Crafty.e("2D, DOM, Image")
			.image(obj.image.src)
			.attr({ x: 0, y: 0, w: obj.image.w, h: obj.image.h });
      }
      
      Crafty.background(bgColor);
      
      // loading text
      var lText = Crafty.e("2D, Canvas, Text")
	  .text(t)
	  .attr({ x: tsize, y: Crafty.viewport.height - tsize - 10, w: tsize*t.length, h: tsize,  z: 100 })
	  .textFont({ family: 'Arial', size : tsize.toString()+'px', family: 'Perfect_dos_vga_437' })
	  .textColor(entsColor),
      // progress bar
	  lProgBar = Crafty.e("ProgressBar")
	  .attr({ x: 0, y : Crafty.viewport.height - 3, w: Crafty.viewport.width, h: 3, z: 100 })
	  .progressBar("LOADING_PROGRESS", 20, 100, false, bgColor, entsColor, gameContainer.conf.get('renderType'));
      
      // load takes an object of assets and a callback when complete
      Crafty.load(resources.get(gameContainer.$scn()), function() {
	      // use eval for executing require(), also loading possible texts/maps
	      
	      var require_str = '', text_args = '', regElms = [], textElms = [], elements;
	      // build text_args string, if there are texts to load
	      _.each(gameContainer.getSceneElements(), function(ele, i){ 
		      // if element has not already been loded 
		      if(gameContainer.alreadyLoadedElements.indexOf(ele) === -1)
			      //search for texts, first things to load,
			      if (ele.indexOf("text!") !== -1) {
				      var tl = textElms.length;
				      textElms[tl] = ele;
				      if(text_args != ''){
					      text_args += ', ';
					      text_args += 'arg' + tl;
				      }
			      } else {
				      regElms[regElms.length] = ele;
			      }
	      });
	      
	      // text elements (json,xml,txt,etc) followed by regular elements (js)
	      elements = textElms.concat(regElms); 
	      
	      require_str = 
	      // require elements and pass callback
	      'require(elements, function(' + text_args + ') {' +
	      // if text files were loaded, push them to gameContainer.loadedStrings
	      'if (arguments.length) gameContainer.setSceneTexts(arguments);' +
	      // push lodedElements to gameContainer.alreadyLoadedElements
	      'gameContainer.alreadyLoadedElements.push(elements);' +
	      // run specified scene
	      'Crafty.scene(gameContainer.$scn()); })';
	      
	      eval( '(' + require_str + ')' );
	  },
	  function(e) {
		  lProgBar.trigger("LOADING_PROGRESS", e.percent);
	  },
	  function(e) {
		  console.log("Error loading file: " + e.src);
	  });
});