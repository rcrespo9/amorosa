(function() {
	'use strict';

	class AnchorLinks {
		constructor() {
			this.anchorLinks = $('.js-anchor-link');
		}

		goToElement() {
			const $htmlBody = $('html, body');
			const target = $(this.hash);

			if(target.length) {
				$htmlBody.animate({
					scrollTop: target.offset().top
				}, 1000);
			}

			return false;
		}

		init() {
			this.anchorLinks.on('click', this.goToElement);
		}
	}

	class Main {
		constructor() {
			const userFeed = new Instafeed({
				get: 'user',
				userId: '2902294630',
				accessToken: '2902294630.1677ed0.0a71d20a11234d48be96415c27c2d116',
				resolution: 'standard_resolution',
				limit: 4,
				template: '<li class="instafeed__item"><a class="instafeed__link" href="{{link}}" rel="noopener noreferrer" target="_blank"><div class="instafeed__overlay"><div class="instafeed__counters"><span class="instafeed__counter"><svg class="instafeed__icon"><use xlink:href="#icon-heart"></use></svg>{{likes}}</span><span class="instafeed__counter"><svg class="instafeed__icon"><use xlink:href="#icon-bubble"></use></svg>{{comments}}</span></div></div><img class="instafeed__img" src="{{image}}" alt="{{caption}}" /></a></li>'
			});
			userFeed.run();

			const anchorLinks = new AnchorLinks();
			anchorLinks.init();
		}
	}

	document.addEventListener('DOMContentLoaded', (e) => new Main());
})();