Crafty.scene("level03", function() {
	// Clear scene elements
	sc =[];

	// Set scene background 	
    Crafty.background("url('web/images/level03-background.png')");
	
	// Add initial elements to scene
	sc['player'] = new Amianto03();
	sc['delays'] = Crafty.e("Delay");

}, function() {	// executed after scene() is called within the present scene
});