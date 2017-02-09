(function(window, jQuery, undefined) {
	'use strict';

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

		goToNextSlide(e) {
			e.preventDefault();

			this.nextSlide();
		}

		goToPrevSlide(e) {
			e.preventDefault();

			clearInterval(this.autoSlide);

			this.currentIndex -= 1;

			if (this.currentIndex < 0) {
				this.currentIndex = this.sliderImgsLength - 1;
			}

			this.cycleImgs();
		}

		autoSlide() {
			setInterval(this.nextSlide.bind(this), 5000);
		}

		init() {
			this.autoSlide();
			this.productSlider.on('click', '.slider__control--next', this.goToNextSlide.bind(this));
			this.productSlider.on('click', '.slider__control--prev', this.goToPrevSlide.bind(this));
		}
	}

	class Main {
		constructor() {
			const productCards = new ProductCards();
			const lenceriaSlider = new ProductSlider('#js-lenceria-slider');
			const sostenesSlider = new ProductSlider('#js-sostenes-slider');
			const pantisSlider = new ProductSlider('#js-pantis-slider');
			const bathingSlider = new ProductSlider('#js-bathing-slider');

			productCards.init();

			lenceriaSlider.init();
			sostenesSlider.init();
			pantisSlider.init();
			bathingSlider.init();
		}
	}

	$(document).ready(() => new Main());
}(jQuery));