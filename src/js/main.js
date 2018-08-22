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
		// ON-OFF TOGGLERS
		// --------------------------------------------

		$('.js-onOff').click(function(){
			CLIENTNAME.onOff($(this));
			return false;
		});
	},

	// --------------------------------------------
	// ON-OFF TOGGLERS This is a generic reusable
	// function that switches one thing on (data-on=".selectors"),
	// (or href attribute if it exists), and another thing off (data-off=".selectors").
	// Use data-mode="instant" to avoid the need for creating .active class styles
	//
	// Pass data-suffix="-something" to break the link
	// between ids and location.hash, thereby preventing
	// browser auto-scroll to the hash location (See e.g.
	// product tabs, where we want them to be URL-addressable
	// but don't want the scroll position to change on window.load)
	// --------------------------------------------

	onOff: function(el){
		var toggleTarget = (el.attr('href') && el.attr('href') != '#') ? $(el.attr('href')) : $(el.data('on'));
		// reset toggleTarget if there's a suffix.
		if (el.data('suffix')) { toggleTarget = $(el.data('on') + el.data('suffix')); }
		var toggleOrigin = $(el.data('off'));
		if (el.data('mode') == 'instant'){
			toggleTarget.add(toggleOrigin).toggle();
		} else {
			toggleOrigin.removeClass('active');
			toggleTarget.add(el).addClass('active');
		}
	}
};

CLIENTNAME.init();