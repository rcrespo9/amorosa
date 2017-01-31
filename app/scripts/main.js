document.querySelector('.card__more').addEventListener('click', function(e) {
	e.preventDefault();

	document.querySelector('.product__card').classList.add('flipped');
});

document.querySelector('.card--back').addEventListener('click', function(e) {
	e.preventDefault();

	document.querySelector('.product__card').classList.remove('flipped');
});