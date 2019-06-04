var CLIENTNAME = {

	// --------------------------------------------
	// CACHE SOME COMMON PROPERTIES
	// --------------------------------------------

	getSettings: function(){
		this.$html = $('html');
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

		$('.js-mobileTrigger').click(function(){
			CLIENTNAME.toggleMobileNav($(this));
		});

		// --------------------------------------------
		// PREVENT BACKGROUND SCROLLING esp on iOS while
		// various overlays are on.
		// Uses this lib: https://github.com/willmcpo/body-scroll-lock
		// --------------------------------------------

		// toggle method allows a single element to do both on and off functions...
		$('.js-toggleScrollLock').click(function(){
			if ($(this).data('scrollLockState') == 'off') {
				var target = $($(this).data('scrollLockEl'))[0];
				bodyScrollLock.disableBodyScroll(target);
				$(this).data('scrollLockState','on');
			} else {
				bodyScrollLock.clearAllBodyScrollLocks();
				$(this).data('scrollLockState','off');
			}
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
	// browser auto-scroll to the hash location (E.g. tab UIs,
	// where we want them to be URL-addressable but don't want
	// the scroll position to change on window.load)
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
	},

	toggleMobileNav: function(triggerEl){

		// toggle .withNavOn on <html> el...
		CLIENTNAME.$html.toggleClass('withNavOn');

		// toggle aria expanded on the trigger button...
		var expanded = triggerEl[0].getAttribute('aria-expanded') === 'true' || false;
		triggerEl.attr('aria-expanded', !expanded);

		// toggle tabindices on the nav items to prevent keyboard focusing them while hidden.
		// (Typically, you'd instead give the parent a [hidden] attribute which would
		// remove the need for this (hidden children are not focussable))... BUT, doing
		// that makes it tricky to use transitions, so instead we can turn the tabIndex
		// from -1 to 0 (0 is basically 'auto').
		$('.mobileNav a').attr('tabIndex', function(i,attr){ return this.tabIndex == '-1' ? '0' : '-1'; });
	}
};

CLIENTNAME.init();