(function() {
	'use strict';

	class Main {
		constructor() {
			const userFeed = new Instafeed({
				get: 'user',
				userId: '2902294630',
				accessToken: '2902294630.1677ed0.0a71d20a11234d48be96415c27c2d116',
				resolution: 'standard_resolution',
				limit: 4,
				template: '<li class="instafeed__item"><a class="instafeed__link" href="{{link}}" rel="noopener noreferrer" target="_blank"><img class="instafeed__img" src="{{image}}" alt="{{caption}}" /></a></li>'
			});
			userFeed.run();
		}
	}

	document.addEventListener('DOMContentLoaded', (e) => new Main());
})();

function initMap() {
	const amorosaLocation = {lat: 18.417541, lng: -70.112982};

	const styledMapType = new google.maps.StyledMapType(
		[{
		    "elementType": "geometry",
		    "stylers": [{
		        "color": "#f5f5f5"
		    }]
		}, {
		    "elementType": "labels.icon",
		    "stylers": [{
		        "visibility": "off"
		    }]
		}, {
		    "elementType": "labels.text.fill",
		    "stylers": [{
		        "color": "#616161"
		    }]
		}, {
		    "elementType": "labels.text.stroke",
		    "stylers": [{
		        "color": "#f5f5f5"
		    }]
		}, {
		    "featureType": "administrative.land_parcel",
		    "elementType": "labels.text.fill",
		    "stylers": [{
		        "color": "#bdbdbd"
		    }]
		}, {
		    "featureType": "poi",
		    "elementType": "geometry",
		    "stylers": [{
		        "color": "#eeeeee"
		    }]
		}, {
		    "featureType": "poi",
		    "elementType": "labels.text.fill",
		    "stylers": [{
		        "color": "#757575"
		    }]
		}, {
		    "featureType": "poi.park",
		    "elementType": "geometry",
		    "stylers": [{
		        "color": "#e5e5e5"
		    }]
		}, {
		    "featureType": "poi.park",
		    "elementType": "labels.text.fill",
		    "stylers": [{
		        "color": "#9e9e9e"
		    }]
		}, {
		    "featureType": "road",
		    "elementType": "geometry",
		    "stylers": [{
		        "color": "#ffffff"
		    }]
		}, {
		    "featureType": "road.arterial",
		    "elementType": "labels.text.fill",
		    "stylers": [{
		        "color": "#757575"
		    }]
		}, {
		    "featureType": "road.highway",
		    "elementType": "geometry",
		    "stylers": [{
		        "color": "#dadada"
		    }]
		}, {
		    "featureType": "road.highway",
		    "elementType": "labels.text.fill",
		    "stylers": [{
		        "color": "#616161"
		    }]
		}, {
		    "featureType": "road.local",
		    "elementType": "labels.text.fill",
		    "stylers": [{
		        "color": "#9e9e9e"
		    }]
		}, {
		    "featureType": "transit.line",
		    "elementType": "geometry",
		    "stylers": [{
		        "color": "#e5e5e5"
		    }]
		}, {
		    "featureType": "transit.station",
		    "elementType": "geometry",
		    "stylers": [{
		        "color": "#eeeeee"
		    }]
		}, {
		    "featureType": "water",
		    "elementType": "geometry",
		    "stylers": [{
		        "color": "#c9c9c9"
		    }]
		}, {
		    "featureType": "water",
		    "elementType": "labels.text.fill",
		    "stylers": [{
		        "color": "#9e9e9e"
		    }]
		}], { name: 'Styled Map' }
	);

	const map = new google.maps.Map(document.getElementById('js-amorosa-map'), {
		zoom: 19,
		center: amorosaLocation,
		scrollwheel: false
	});

	const marker = new google.maps.Marker({
		position: amorosaLocation,
		map: map,
		icon: '../images/heart-map-marker.svg'
	});

	map.mapTypes.set('styled_map', styledMapType);
	map.setMapTypeId('styled_map');
}