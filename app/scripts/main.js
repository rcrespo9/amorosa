(function(window, jQuery, undefined) {
	'use strict';

	class Navigation {
		constructor() {
			this.body = $('body');
			this.burgerBtn = $('#js-burger-btn');
		}

		toggleMenu() {
			this.body.toggleClass('open-nav');
		}

		init() {
			this.burgerBtn.on('click', this.toggleMenu.bind(this));
		}
	}

	class Main {
		constructor() {
			const userFeed = new Instafeed({
			    get: 'user',
			    userId: '2902294630',
			    accessToken: '2902294630.1677ed0.0a71d20a11234d48be96415c27c2d116',
			    resolution: 'standard_resolution',
			    limit: 20,
			    template: '<a class="instafeed__item" href="{{link}}" rel="noopener noreferrer" target="_blank"><img src="{{image}}" /></a>'
			});
			userFeed.run();

			const navigation = new Navigation();
			navigation.init();
		}
	}

	$(document).ready(() => new Main());
}(window, jQuery));