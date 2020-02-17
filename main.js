mapboxgl.accessToken = 'pk.eyJ1IjoicHJpbWU5MCIsImEiOiJjazU4bzJyNGQwZ3c3M25vMTZ0Y2d6dHRjIn0.KCP2cmkSomOlkvPk7nugng';
var map = new mapboxgl.Map({
	container: 'map', // container id
	style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
	center: [-105.077, 40.55], // starting position [lng, lat]
	zoom: 10 // starting zoom
});
// sets zoom to specified geojson bounds
var bounds = new mapboxgl.LngLatBounds();
geojson_lc_bike_lanes.features.forEach(function (feature) {
	bounds.extend(feature.geometry.coordinates[0]);
});
map.fitBounds(bounds, {
	'padding': 9
})
map.on('load', function () {
	// layer - rail road
	map.addLayer({
		'id': 'Railroad',
		'type': 'line',
		'source': {
			'type': 'geojson',
			'data': geojson_railRoad,
		},
		'layout': {
			'visibility': 'none'
		}
	});
	// layer - rr_buffer_1mi
	map.addLayer({
		'id': 'RR_buffer_1mi',
		'type': 'fill',
		'source': {
			'type': 'geojson',
			'data': geojson_rr_buff_1mi,
		},
		'paint': {
			'fill-color': '#76d7c4',
			'fill-opacity': 0.2,
		},
		'layout': {
			'visibility': 'none'
		}
	});
	// layer - rr_buffer_half_mi
	map.addLayer({
		'id': 'RR_buffer_half_mi',
		'type': 'fill',
		'source': {
			'type': 'geojson',
			'data': geojson_rr_buff_half_mi,
		},
		'paint': {
			'fill-color': '#f7dc6f',
			'fill-opacity': 0.2,
		},
		'layout': {
			'visibility': 'visible'
		}
	});
	// layer - rr_buffer_100_yrds
	map.addLayer({
		'id': 'RR_buffer_100_yrds',
		'type': 'fill',
		'source': {
			'type': 'geojson',
			'data': geojson_rr_buff_100_yrds,
		},
		'paint': {
			'fill-color': '#ec7063',
			'fill-opacity': 0.2,
		},
		'layout': {
			'visibility': 'none'
		}
	});
	// layer - high_comfort_bike_lanes
	map.addLayer({
		'id': 'High Comfort Bike Lanes',
		'type': 'line',
		'source': {
			'type': 'geojson',
			'data': geojson_hc_bike_lanes,
		},
		'paint': {
			'line-color': '#3498db',
			'line-width': 2,
		},
		'layout': {
			'visibility': 'none'
		}
	});
	// layer - low_comfort_bike_lanes
	map.addLayer({
		'id': 'Low Comfort Bike Lanes',
		'type': 'line',
		'source': {
			'type': 'geojson',
			'data': geojson_lc_bike_lanes,
		},
		'paint': {
			'line-color': '#3498db',
			'line-width': 1,
		},
		'layout': {
			'visibility': 'none'
		}
	});
	// layer - paved_trails
	map.addLayer({
		'id': 'Paved Trails',
		'type': 'line',
		'source': {
			'type': 'geojson',
			'data': geojson_paved_trails,
		},
		'paint': {
			'line-color': '#138d75',
			'line-width': 2,
		},
		'layout': {
			'visibility': 'none'
		}
	});
	// layer - natural_trails
	map.addLayer({
		'id': 'Natural_Trails',
		'type': 'line',
		'source': {
			'type': 'geojson',
			'data': geojson_natural_trails,
		},
		'paint': {
			'line-color': '#138d75',
			'line-width': 1,
			'line-dasharray': [10, 4]
		},
		'layout': {
			'visibility': 'none'
		}
	});
	map.addLayer({
		'id': 'Breweries',
		'type': 'circle',
		'source': {
			'type': 'geojson',
			'data': geojson_breweries,
		},
		'paint': {
			'circle-stroke-width': 2,
			'circle-stroke-color': '#a569bd'
		},
		'layout': {
			'visibility': 'visible'
		}
	});
	map.addLayer({
		'id': 'Cannabis_Stores',
		'type': 'circle',
		'source': {
			'type': 'geojson',
			'data': geojson_cannabis_stores,
		},
		'paint': {
			'circle-stroke-width': 2,
			'circle-stroke-color': '#00c400'
		},
		'layout': {
			'visibility': 'visible'
		}
	});
	map.addLayer({
		'id': 'Climbing_Gyms',
		'type': 'circle',
		'source': {
			'type': 'geojson',
			'data': geojson_climbinggyms,
		},
		'paint': {
			'circle-stroke-width': 2,
			'circle-stroke-color': '#DD0A0A'
		},
		'layout': {
			'visibility': 'visible'
		}
	});
	// // layer control functionality
	function layerControl(htmlID, htmlClass, mapboxID) {
		// toggles layers via click and change color based on visibility
		htmlID.onclick = function () {
			var visibility = map.getLayoutProperty(mapboxID, 'visibility');
			if (visibility === 'visible') {
				map.setLayoutProperty(mapboxID, 'visibility', 'none');
				htmlID.style.color = '#A9A9A9'
				htmlClass.style.background = '#A9A9A9'
				htmlClass.style.borderColor = '#D3D3D3'
			} else {
				map.setLayoutProperty(mapboxID, 'visibility', 'visible');
				htmlID.style.color = '#00ACEA'
				htmlClass.style.background = ""
				htmlClass.style.borderColor = ""
			}
		};
		// sets default color property on webiste load based on layer visibility
		var visibility = map.getLayoutProperty(mapboxID, 'visibility');
		if (visibility === 'visible') {
			htmlID.style.color = '#00ACEA';
			htmlClass.style.background = ""
		} else {
			htmlID.style.color = '#A9A9A9'
			htmlClass.style.background = '#A9A9A9'
		}
	};
	var tracks_layer = document.getElementById("tracks");
	var tracks_icon = document.getElementsByClassName("tracks")[0]
	layerControl(tracks_layer, tracks_icon, 'Railroad');
	var rrmi_layer = document.getElementById("mile-buff");
	var rrmi_icon = document.getElementsByClassName("one-mile")[0]
	layerControl(rrmi_layer, rrmi_icon, 'RR_buffer_1mi');
	var rrhalfmi_layer = document.getElementById("half-buff");
	var rrhalfmi_icon = document.getElementsByClassName("half-mile")[0];
	layerControl(rrhalfmi_layer, rrhalfmi_icon, 'RR_buffer_half_mi');
	var rrhunyrds_layer = document.getElementById("onehun-yrds");
	var rrhunyrds_icon = document.getElementsByClassName("onehun-yrds")[0];
	layerControl(rrhunyrds_layer, rrhunyrds_icon, 'RR_buffer_100_yrds');
	var hclanes_layer = document.getElementById("hc-lanes");
	var hclanes_icon = document.getElementsByClassName("hclanes")[0];
	layerControl(hclanes_layer, hclanes_icon, 'High Comfort Bike Lanes');
	var lclanes_layer = document.getElementById("lc-lanes");
	var lclanes_icon = document.getElementsByClassName("lclanes")[0];
	layerControl(lclanes_layer, lclanes_icon, 'Low Comfort Bike Lanes');
	var paved_layer = document.getElementById("paved");
	var paved_icon = document.getElementsByClassName("paved")[0];
	layerControl(paved_layer, paved_icon, 'Paved Trails');
	var natural_layer = document.getElementById("natural");
	var natural_icon = document.getElementsByClassName("natural")[0];
	layerControl(natural_layer, natural_icon, 'Natural_Trails');
	var allbrew_layer = document.getElementById("allbrew");
	var allbrew_icon = document.getElementsByClassName("allbrew")[0];
	layerControl(allbrew_layer, allbrew_icon, 'Breweries');
	var climbgym_layer = document.getElementById("climbgym");
	var climbgym_icon = document.getElementsByClassName("climbgym")[0];
	layerControl(climbgym_layer, climbgym_icon, 'Climbing_Gyms');
	var canstore_layer = document.getElementById("canstore");
	var canstore_icon = document.getElementsByClassName("canstore")[0];
	layerControl(canstore_layer, canstore_icon, 'Cannabis_Stores');
	// brewery popups
	var popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false
	});
	// // mouse over brewery points
	map.on('mouseenter', 'Breweries', function (e) {
		// Change the cursor style as a UI indicator.
		map.getCanvas().style.cursor = 'pointer';
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description = e.features[0].properties.Brewery;
		// Ensure that if the map is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}
		// Populate the popup and set its coordinates
		// based on the feature found.
		popup.setLngLat(coordinates).setHTML(description).addTo(map);
	});
	map.on('mouseleave', 'Breweries', function () {
		map.getCanvas().style.cursor = '';
		popup.remove();
	});
	// // climbing gyms click popup
	map.on('click', 'Climbing_Gyms', function (e) {
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description = e.features[0].properties.Name;
		var website = e.features[0].properties.Website;
		// Ensure that if the map is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}
		// Populate the popup and set its coordinates
		// based on the feature found.
		new mapboxgl.Popup().setLngLat(coordinates).setHTML("<a href=" + website + " " + "target=&quot_blank&quot>" + description + "</a>").addTo(map);
	});
	map.on('mouseenter', 'Climbing_Gyms', function () {
		map.getCanvas().style.cursor = 'pointer';
		popup.remove();
	});
	map.on('mouseleave', 'Climbing_Gyms', function () {
		map.getCanvas().style.cursor = '';
		popup.remove();
	});

	map.on('click', 'Cannabis_Stores', function (e) {
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description = e.features[0].properties.Name;
		var website = e.features[0].properties.Website;
				// Ensure that if the map is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}
		// Populate the popup and set its coordinates
		// based on the feature found.
		new mapboxgl.Popup().setLngLat(coordinates).setHTML("<a href=" + website + " " + "target=&quot_blank&quot>" + description + "</a>").addTo(map);
	})
	map.on('mouseenter', 'Cannabis_Stores', function () {
		map.getCanvas().style.cursor = 'pointer';
		popup.remove();
	});
	map.on('mouseleave', 'Cannabis_Stores', function () {
		map.getCanvas().style.cursor = '';
		popup.remove();
	});
	
	var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        zoom: 13,
        placeholder: "Enter an address or place name",
		bbox: [-105.214, 40.451, -104.850, 40.841],
      });

	  map.addControl(geocoder, 'top-left');

	//   var isoButt = document.getElementById("buttonIso")
	//   isoButt.addEventListener('click', getIso);
	var profile = 'cycling';
	var minutes = 10;

	  function getIso() {		
		function plotIso() {
			// // Create variables to use in isochrone API
			var urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';
			var lng = geocoder.mapMarker._lngLat.lng;
			var lat = geocoder.mapMarker._lngLat.lat;
			// Create a function that sets up the Isochrone API query then makes an Ajax call
				var query = urlBase + profile + '/' + lng + ',' + lat + '?contours_minutes=' + minutes + '&polygons=true&access_token=' + mapboxgl.accessToken;
				$.ajax({
					method: 'GET',
					url: query
					}).done(function(data) {
						map.getSource('iso').setData(data);
				});
				map.addSource('iso', {
					type: 'geojson',
					data: {
					'type': 'FeatureCollection',
					'features': []
					}
				});
				map.addLayer({
					'id': 'isoLayer',
					'type': 'fill',
					// Use "iso" as the data source for this layer
					'source': 'iso',
					'layout': {},
					'paint': {
					// The fill color for the layer is set to a light purple
					'fill-color': '#00ACEA',
					'fill-opacity': 0.3
					}
				}, "poi-label");
		}
		var search = document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0];
		search.addEventListener('keyup', function(e) {
			if (e.keyCode === 13) { 
					plotIso();
				};				
		});

		var searchSugg = document.getElementsByClassName('suggestions')[0];
		searchSugg.addEventListener('mouseup', function(e) {
			if(e.target && e.target.nodeName == "DIV") {
				plotIso();
			}
		});

		var resetSearchButt = document.getElementsByClassName('mapboxgl-ctrl-geocoder--button')[0];
		resetSearchButt.addEventListener('click', function() {
			map.removeLayer('isoLayer');
			map.removeSource('iso');
		});
		var resetSearchInput = document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0];
		resetSearchInput.addEventListener('keyup', function(e) {
			if (e.keyCode === 8) { 
				map.removeLayer('isoLayer');
				map.removeSource('iso');
			};
		});
		// Target the "params" form in the HTML portion of your code
		var params = document.getElementById('params');
		// When a user changes the value of profile or duration by clicking a button, change the parameter's value and make the API query again
		params.addEventListener('change', function(e) {
			if (e.target.name === 'profile') {
				profile = e.target.value;
				map.removeLayer('isoLayer');
				map.removeSource('iso');
				plotIso();
			} else if (e.target.name === 'duration') {
				minutes = e.target.value;
				map.removeLayer('isoLayer');
				map.removeSource('iso');
				plotIso();
			}
		});
	};
	getIso();	
	});
