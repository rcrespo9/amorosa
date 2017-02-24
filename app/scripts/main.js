(function(window, jQuery, undefined) {
	'use strict';

	/*!
	 * Behaves the same as setTimeout except uses requestAnimationFrame()
	 * where possible for better performance
	 * modified gist.github.com/joelambert/1002116
	 * the fallback function requestAnimFrame is incorporated
	 * gist.github.com/joelambert/1002116
	 * gist.github.com/englishextra/873c8f78bfda7cafc905f48a963df07b
	 * jsfiddle.net/englishextra/dnyomc4j/
	 * @param {Object} fn The callback function
	 * @param {Int} delay The delay in milliseconds
	 * requestTimeout(fn,delay);
	 */
	const requestTimeout = function (fn, delay) {
		const requestAnimFrame = (function () {
			return window.requestAnimationFrame || function (callback, element) {
				window.setTimeout(callback, 1000 / 60);
			};
		})(),
		start = new Date().getTime(),
		handle = {};
		function loop() {
			const current = new Date().getTime(),
			delta = current - start;
			if (delta >= delay) {
				fn.call();
			} else {
				handle.value = requestAnimFrame(loop);
			}
		}
		handle.value = requestAnimFrame(loop);
		return handle;
	};

	/*!
	 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame()
	 * where possible for better performance
	 * gist.github.com/joelambert/1002116
	 * gist.github.com/englishextra/873c8f78bfda7cafc905f48a963df07b
	 * jsfiddle.net/englishextra/dnyomc4j/
	 * @param {Int|Object} handle The callback function
	 * clearRequestTimeout(handle);
	 */
	const clearRequestTimeout = function (handle) {
		if (window.cancelAnimationFrame) {
			window.cancelAnimationFrame(handle.value);
		} else {
			window.clearTimeout(handle);
		}

	};

	class ProductSlider {
		constructor(sliderId) {
			this.productSlider = $(sliderId);
			this.sliderImgs = this.productSlider.children('.slider__img');
			this.sliderImgActive = this.productSlider.children('.slider__img--active');
			this.sliderImgsLength = this.sliderImgs.length;
			this.currentIndex = this.sliderImgs.index(this.sliderImgActive);
		}

		cycleImgs() {
			const $sliderImg = this.sliderImgs.eq(this.currentIndex);
			const sliderImgActiveClass = 'slider__img--active';

			this.sliderImgs.removeClass(sliderImgActiveClass);
			$sliderImg.addClass(sliderImgActiveClass);
		}

		nextSlide() {
			this.currentIndex += 1;

			if (this.currentIndex > this.sliderImgsLength - 1) {
				this.currentIndex = 0;
			}

			this.cycleImgs();
		}

		autoSlide() {
			this.nextSlide();
			requestTimeout(this.autoSlide.bind(this), 5000);
		}

		goToNextSlide(e) {
			e.preventDefault();

			clearRequestTimeout(this.autoSlide.bind(this));

			this.nextSlide();
		}

		goToPrevSlide(e) {
			e.preventDefault();

			clearRequestTimeout(this.autoSlide.bind(this));

			this.currentIndex -= 1;

			if (this.currentIndex < 0) {
				this.currentIndex = this.sliderImgsLength - 1;
			}

			this.cycleImgs();
		}

		init() {
			requestTimeout(this.autoSlide.bind(this), 5000);

			if (Modernizr.touchevents) {
			  this.productSlider.swipe({
			  	swipeLeft: this.goToNextSlide.bind(this),
			  	swipeRight: this.goToPrevSlide.bind(this),
			  	threshold: 0
			  });
			} else {
			  this.productSlider.on('click', '.slider__control--next', this.goToNextSlide.bind(this));
			  this.productSlider.on('click', '.slider__control--prev', this.goToPrevSlide.bind(this));
			}
		}
	}

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
			const lenceriaSlider = new ProductSlider('#js-lenceria-slider');
			const sostenesSlider = new ProductSlider('#js-sostenes-slider');
			const pantisSlider = new ProductSlider('#js-pantis-slider');
			const bathingSlider = new ProductSlider('#js-bathing-slider');
			lenceriaSlider.init();
			sostenesSlider.init();
			pantisSlider.init();
			bathingSlider.init();

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