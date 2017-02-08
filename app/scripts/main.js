(function(window, jQuery, undefined) {
	'use strict';

	class ProductCards {
		constructor() {
			this.productTiles = $('#js-product-tiles');
		}

		flipCard(e) {
			const $cardTarget = $(e.target);

			e.preventDefault();

			$cardTarget.closest('.product__card').addClass('flipped');
		}

		flipCardBack(e) {
			const $cardTarget = $(e.target);

			e.preventDefault();

			$cardTarget.closest('.product__card').removeClass('flipped');
		}

		init() {
			this.productTiles.on('click', '.card__flip', this.flipCard);
			this.productTiles.on('click', '.card__flipback', this.flipCardBack);
		}
	}

	class ProductSliders {
		constructor() {
			this.productTiles = $('#js-product-tiles');
		}

		prevSlide(e) {
			const $sliderControl = $(e.target);

			e.preventDefault();

			$sliderControl
				.closest('.slider__controls')
				.siblings('.slider__img--active')
				.prev('.slider__img')
				.addClass('slider__img--active')
				.next('.slider__img')
				.removeClass('slider__img--active');
		}

		nextSlide(e) {
			const $sliderControl = $(e.target);

			e.preventDefault();

			$sliderControl
				.closest('.slider__controls')
				.siblings('.slider__img--active')
				.next('.slider__img')
				.addClass('slider__img--active')
				.prev('.slider__img')
				.removeClass('slider__img--active');
		}

		init() {
			this.productTiles.on('click', '.slider__control--right', this.nextSlide);
			this.productTiles.on('click', '.slider__control--left', this.prevSlide);
		}
	}

	class Main {
		constructor() {
			const productCards = new ProductCards();
			const productSliders = new ProductSliders();

			productCards.init();
			productSliders.init();
		}
	}

	$(document).ready(() => new Main());
}(jQuery));