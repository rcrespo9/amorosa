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

		autoSlide() {
			const self = this;

			setInterval(function() {
				self.currentIndex += 1;

				if (self.currentIndex > self.sliderImgsLength - 1) {
					self.currentIndex = 0;
				}

				self.cycleImgs();
			}, 5000)
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

			if ($sliderControl.closest(sliderControlSelector).hasClass('slider__control--next')) {
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
			this.autoSlide();
			// this.tilesContainer.on('click', '.slider__control', this.changeSlide);
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