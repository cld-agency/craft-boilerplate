var CLIENTNAME = {

	// --------------------------------------------
	// CACHE SOME COMMON PROPERTIES
	// --------------------------------------------

	getSettings: function(){
		// this.$win		= $(window);
		// etc
	},

	// --------------------------------------------
	// GET THIS PARTY STARTED...
	// --------------------------------------------

	init: function(){
		CLIENTNAME.getSettings();
		CLIENTNAME.bindUI();
	},

	// --------------------------------------------
	// UI EVENT BINDINGS
	// --------------------------------------------

	bindUI: function(){

		// --------------------------------------------
		// NAVIGATION
		// --------------------------------------------

		$('.js-menu-trigger').click(function(){
			$(this).toggleClass('open');
			return false;
		});

		// --------------------------------------------
		// SOMETHING ELSE
		// --------------------------------------------
	},

	// --------------------------------------------
	// ANOTHER THING
	// --------------------------------------------

	anotherThing: function(){

	}
};

CLIENTNAME.init();