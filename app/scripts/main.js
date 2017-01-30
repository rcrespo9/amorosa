document.querySelector('.product__flip--right').addEventListener('click', function(e) {
	e.preventDefault();

	document.getElementById('js-card-flip').classList.add('flipped');
});

document.querySelector('.product__flippable--back').addEventListener('click', function(e) {
	e.preventDefault();

	document.getElementById('js-card-flip').classList.remove('flipped');
});