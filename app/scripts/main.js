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

		changeSlide(e) {
			const $sliderControl = $(e.target);
			const sliderControlsParentSelector = '.slider__controls';
			const sliderControlSelector = '.slider__control';
			const sliderImgSelector = '.slider__img';
			const sliderImgActiveSelector = '.slider__img--active';
			const sliderImgActiveClass = 'slider__img--active';

			e.preventDefault();

			if($sliderControl.closest(sliderControlSelector).hasClass('slider__control--left')) {
				$sliderControl
					.closest(sliderControlsParentSelector)
					.siblings(sliderImgActiveSelector)
					.prev(sliderImgSelector)
					.addClass(sliderImgActiveClass)
					.next(sliderImgSelector)
					.removeClass(sliderImgActiveClass);
			} else if ($sliderControl.closest(sliderControlSelector).hasClass('slider__control--right')) {
				$sliderControl
					.closest(sliderControlsParentSelector)
					.siblings(sliderImgActiveSelector)
					.next(sliderImgSelector)
					.addClass(sliderImgActiveClass)
					.prev(sliderImgSelector)
					.removeClass(sliderImgActiveClass);
			}
		}

		init() {
			this.productTiles.on('click', '.slider__control', this.changeSlide);
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