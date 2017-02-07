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

	class Main {
		constructor() {
			const productCards = new ProductCards();

			productCards.init();
		}
	}

	$(document).ready(() => new Main());
}(jQuery));