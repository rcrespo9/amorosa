(function(window, jQuery, undefined) {
	'use strict';

	class ProductCards {
		constructor() {
			this.productTiles = $('#js-product-tiles');
		}

		flipCard(e) {
			const $cardTarget = $(e.target);
			const productCardSelector = '.product__card';
			const flippedClass = 'flipped';

			console.log(e.target);

			e.preventDefault();

			if($cardTarget.hasClass('card__more')) {
				$cardTarget.closest(productCardSelector).addClass(flippedClass);
			} else if ($cardTarget.hasClass('card--back')) {
				$cardTarget.closest(productCardSelector).removeClass(flippedClass);
			}
		}

		init() {
			this.productTiles.on('click', '.card__more, .card--back', this.flipCard);
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