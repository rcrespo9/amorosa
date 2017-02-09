(function(window, jQuery, undefined) {
	'use strict';

	class ProductCards {
		constructor() {
			this.tilesContainer = $('#js-product-tiles');
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
			this.tilesContainer.on('click', '.card__flip', this.flipCard);
			this.tilesContainer.on('click', '.card__flipback', this.flipCardBack);
		}
	}

	class ProductSliders {
		constructor() {
			this.tilesContainer = $('#js-product-tiles');
		}

		changeSlide(e) {
			const $sliderControl = $(e.target);
			const sliderControlSelector = '.slider__control';
			const $slider = $sliderControl.closest('.tile__slider');
			const $sliderImgs = $slider.children('.slider__img');
			const $sliderImgActive = $slider.children('.slider__img--active');
			const sliderImgsLength = $sliderImgs.length;

			let currentIndex = $sliderImgs.index($sliderImgActive);

			const cycleImgs = function() {
				const $sliderImg = $sliderImgs.eq(currentIndex);
				const sliderImgActiveClass = 'slider__img--active';

				$sliderImgs.removeClass(sliderImgActiveClass);
				$sliderImg.addClass(sliderImgActiveClass);
			}

			e.preventDefault();

			if($sliderControl.closest(sliderControlSelector).hasClass('slider__control--next')) {
				currentIndex += 1;

				if (currentIndex > sliderImgsLength - 1) {
					currentIndex = 0;
				}

				cycleImgs();
			} else if ($sliderControl.closest(sliderControlSelector).hasClass('slider__control--prev')) {
				currentIndex -= 1;

				if (currentIndex < 0) {
					currentIndex = sliderImgsLength - 1;
				}

				cycleImgs();
			}
		}

		init() {
			this.tilesContainer.on('click', '.slider__control', this.changeSlide);
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