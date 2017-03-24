(function(window, jQuery, undefined) {
	'use strict';

	class Main {
		constructor() {
			const userFeed = new Instafeed({
			    get: 'user',
			    userId: '2902294630',
			    accessToken: '2902294630.1677ed0.0a71d20a11234d48be96415c27c2d116',
			    resolution: 'standard_resolution',
			    limit: 4,
			    template: '<a class="instafeed__item" href="{{link}}" rel="noopener noreferrer" target="_blank"><img src="{{image}}" /></a>'
			});
			userFeed.run();
		}
	}

	$(document).ready(() => new Main());
}(window, jQuery));