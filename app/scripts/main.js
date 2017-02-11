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
	var requestTimeout = function (fn, delay) {
		var requestAnimFrame = (function () {
			return window.requestAnimationFrame || function (callback, element) {
				window.setTimeout(callback, 1000 / 60);
			};
		})(),
		start = new Date().getTime(),
		handle = {};
		function loop() {
			var current = new Date().getTime(),
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
	var clearRequestTimeout = function (handle) {
		if (window.cancelAnimationFrame) {
			window.cancelAnimationFrame(handle.value);
		} else {
			window.clearTimeout(handle);
		}

	};

	class ProductCards {
		constructor() {
			this.tilesContainer = $('#js-product-tiles');
			this.productCardSelector = '.product__card';
			this.flippedClass = 'flipped';
		}

		flipCard(e) {
			const $flipCardLink = $(e.target);

			e.preventDefault();

			$flipCardLink.closest(this.productCardSelector).addClass(this.flippedClass);
		}

		flipCardBack(e) {
			const $flipCardBackLink = $(e.target);

			e.preventDefault();

			$flipCardBackLink.closest(this.productCardSelector).removeClass(this.flippedClass);
		}

		init() {
			this.tilesContainer.on('click', '.card__flip', this.flipCard.bind(this));
			this.tilesContainer.on('click', '.card__flipback', this.flipCardBack.bind(this));
		}
	}

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
			requestAnimationFrame(this.autoSlide.bind(this));

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

	class Main {
		constructor() {
			const productCards = new ProductCards();
			productCards.init();

			const lenceriaSlider = new ProductSlider('#js-lenceria-slider');
			const sostenesSlider = new ProductSlider('#js-sostenes-slider');
			const pantisSlider = new ProductSlider('#js-pantis-slider');
			const bathingSlider = new ProductSlider('#js-bathing-slider');
			lenceriaSlider.init();
			sostenesSlider.init();
			pantisSlider.init();
			bathingSlider.init();
		}
	}

	$(document).ready(() => new Main());
}(window, jQuery));