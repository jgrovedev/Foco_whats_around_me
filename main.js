mapboxgl.accessToken = 'pk.eyJ1IjoicHJpbWU5MCIsImEiOiJjazU4bzJyNGQwZ3c3M25vMTZ0Y2d6dHRjIn0.KCP2cmkSomOlkvPk7nugng';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
    center: [-105.077, 40.55], // starting position [lng, lat]
    zoom: 10 // starting zoom
    });

    map.on('load', function() {
        // layer - rail road
        map.addLayer({
            'id': 'Railroad',
            'type': 'line',
            'source': {
                'type': 'geojson',
                'data': geojson_railRoad,
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

            }
        });    
    });        

