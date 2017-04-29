(function() {
	'use strict';

	class Navigation {
		constructor() {
			this.anchorLinks = $('.js-anchor-link');
			this.navToggle = $('#js-nav-toggle');
		}

		mobileNavToggle() {
			const $theBody = $('body');
			const $document = $(document);

			$theBody.toggleClass('open-nav');
			$document.scrollTop(0);
		}

		goToElement() {
			const $htmlBody = $('html, body');
			const target = $(this.hash);

			if($htmlBody.hasClass('open-nav')) {
				$htmlBody.removeClass('open-nav');
			}

			if(target.length) {
				$htmlBody.animate({
					scrollTop: target.offset().top
				}, 1000);
			}

			return false;
		}

		init() {
			this.anchorLinks.on('click', this.goToElement);

			if (window.matchMedia("(min-width: 750px)").matches) {
			  this.navToggle.off('click', this.mobileNavToggle);
			} else {
				this.navToggle.on('click', this.mobileNavToggle);
			}
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

			const navigation = new Navigation();
			navigation.init();
		}
	}

	document.addEventListener('DOMContentLoaded', (e) => new Main());
})();