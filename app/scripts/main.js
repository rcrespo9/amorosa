const tagline = document.querySelector('.hero__tagline');

document.querySelector('.page-hero').addEventListener('mousemove', function(e) {
	tagline.style.backgroundPosition = `${-e.clientX}px ${-e.clientY}px`;
});