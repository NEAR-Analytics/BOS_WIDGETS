const generatePopup = (image, heading, subtitle, link) =>
  `<div id="${heading}" style="display:flex;"><img style="height:55px; width:50px; transform:scale(1.5);border-radius:0px;" src="${image}"/><a href="${link}" target="_blank" style="text-decoration:none; color:black;"><div style="padding-left:25px;padding-right:0px;"><p style="font-size:16px; font-weight:600;margin-bottom:-5px; font-family:Mona-Sans, sans-serif;">${heading}</p> <p style="font-size:12px; margin-top:4px;font-family:Mona-Sans, sans-serif;">${subtitle}</p></div></a></div>`;

const src = `
<html>
<head>
<meta charset="utf-8">
<title>Display a popup</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js"></script>
<link href="https://fonts.cdnfonts.com/css/mona-sans" rel="stylesheet"></link>
<style>
body { margin: 0; padding: 0; }
#map { position: absolute; top: 0; bottom: 0; width: 100%; }
.mapboxgl-popup-content {padding:0px;border-radius:10px; overflow:hidden;padding-right:16px;font-family: 'Mona-Sans', sans-serif;}
*:focus {
    outline: none;
}

</style>
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css" type="text/css">
</head>
<body>
<div id="map"></div>
<script>

	mapboxgl.accessToken = 'pk.eyJ1IjoiMzMzMzMzMzMiLCJhIjoiY2xuYnJvNGQ4MGlueTJqcjdlbng0cWpycCJ9.pVVNrWeRzrqSdWxg2n-lqw';
    const geojson = {
        'type': 'FeatureCollection',
        'features': [
        {
        'type': 'Feature',
        'properties': {
        'message': 'Foo',
        'iconSize': [60, 60]
        },
        'geometry': {
        'type': 'Point',
        'coordinates': [-9.10412980335633, 38.74123958634596]
        }
        },
        {
        'type': 'Feature',
        'properties': {
        'message': 'Bar',
        'iconSize': [50, 50]
        },
        'geometry': {
        'type': 'Point',
        'coordinates': [-9.1062259067202, 38.73516922235015]
        }
        },
        {
        'type': 'Feature',
        'properties': {
        'message': 'Baz',
        'iconSize': [40, 40]
        },
        'geometry': {
        'type': 'Point',
        'coordinates': [-9.103527750504185, 38.741422291924266]
        }
        }
        ]
};
const map = new mapboxgl.Map({
container: 'map',
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/mapbox/dark-v11',
center: [${props.state.coordinates[0]}, ${props.state.coordinates[1]}],
zoom: ${props.state.zoom},
 maxBounds: [ 
  [ -9.170036057954437, 38.70129203456352],
  [-9.078861058284827, 38.801977920823795]
  ]
});  

for (const marker of geojson.features) {
// Create a DOM element for each marker.
const el = document.createElement('div');
const width = marker.properties.iconSize[0];
const height = marker.properties.iconSize[1];
el.className = 'marker';
el.style.width = "15px";
el.style.height = "15px";
el.style.border = '5px solid #fff'
el.style.borderRadius = '100px';
el.style.backgroundColor="#00ec97";
el.style.backgroundSize = '100%';
 
// Add markers to the map.
new mapboxgl.Marker(el)
.setLngLat(marker.geometry.coordinates)
.addTo(map);
}
const popup = new mapboxgl.Popup({ closeButton: false,closeOnClick:false,anchor:"top-left" })
.setLngLat([-9.10412980335633, 38.74123958634596])
.setHTML('${generatePopup(
  "https://i.ibb.co/Hr1XRXj/community.png",
  "Community HQ",
  "Garagem Lisboa",
  "https://www.google.com/maps/place/R.+Pereira+Henriques,+Lisboa,+Portugal/@38.7409173,-9.1060679,17z/data=!3m1!4b1!4m6!3m5!1s0xd1933df3bc717d7:0xa6dbc055f9d40a3f!8m2!3d38.7409131!4d-9.103493!16s%2Fg%2F1thhlsmg?entry=ttu"
)}')
.addTo(map);

const popup2 = new mapboxgl.Popup({ closeButton: false,closeOnClick:false,anchor:"top"})
.setLngLat([-9.1062259067202, 38.73516922235015])
.setHTML('${generatePopup(
  "https://i.ibb.co/WzJYS9V/nearconhq.png",
  "NEARCON HQ",
  "Convento Do Beato",
  "https://www.google.com/maps/place/Convento+do+Beato/@38.7348554,-9.1088421,17z/data=!3m1!4b1!4m6!3m5!1s0xd1933e0e05a00ab:0x1ab47681c49d3234!8m2!3d38.7348512!4d-9.1062672!16s%2Fm%2F0_qdlv1?entry=ttu"
)}')
.addTo(map);

const popup3 = new mapboxgl.Popup({ closeButton: false,closeOnClick:false, })
.setLngLat([-9.103527750504185, 38.741422291924266])
.setHTML('${generatePopup(
  "https://i.ibb.co/YBdG3rk/hacker.png",
  "Hacker HQ",
  "Armazem 16",
  "https://www.google.com/maps/place/R.+Pereira+Henriques+16,+1950-242+Lisboa,+Portugal/@38.7410407,-9.1060257,17z/data=!3m1!4b1!4m6!3m5!1s0xd1933df23292a97:0x66ead8aebe385527!8m2!3d38.7410365!4d-9.1034508!16s%2Fg%2F11c1yl_sby?entry=ttu"
)}')
.addTo(map);
  setTimeout(()=>{
  document.getElementById("NEARCON HQ").addEventListener('click', () => {
  window.parent.postMessage("NEARCON HQ", '*');
  });
   document.getElementById('Hacker HQ').addEventListener('click', () => {
  window.parent.postMessage('Hacker HQ', '*');
  });
 document.getElementById('Community HQ').addEventListener('click', () => {
  window.parent.postMessage('Community HQ', '*');
  });
  },2000);

//   // Request directions between the three points
// map.on('load', function () {
//   map.addSource('route', {
//     'type': 'geojson',
//     'data': {
//       'type': 'Feature',
//       'properties': {},
//       'geometry': {
//         'type': 'LineString',
//         'coordinates': [
//           [-9.10412980335633, 38.74123958634596],
//           [-9.1062259067202, 38.73516922235015],
//           [-9.103527750504185, 38.741422291924266]
//         ]
//       }
//     }
//   });

//   map.addLayer({
//     'id': 'route',
//     'type': 'line',
//     'source': 'route',
//     'layout': {
//       'line-join': 'round',
//       'line-cap': 'round'
//     },
//     'paint': {
//       'line-color': '#00ec97',
//       'line-width': 5
//     }
//   });
// });

// 
// 
//
//
//

// // Initialize the directions control
// const directions = new MapboxDirections({
//   accessToken: mapboxgl.accessToken,
//   unit: 'metric',
//   profile: 'mapbox/driving',
//   interactive: false, // Disable user interactions
//   zoom: false, // Disable automatic zoom
//   controls: {
//     inputs: false, // Show origin and destination input fields
//     instructions: true, // Show turn-by-turn instructions
//     profileSwitcher: true, // Allow profile switching (e.g., driving, walking)
//     geocoder: true, // Enable the geocoder for location search
//     tripButton: true, // Show "Plan trip" button
//   },

// });

// // Add the directions control to the map
// map.addControl(directions, 'top-left');


// // Define the origin, stop, and endpoint coordinates
// const originCoords = [-9.10412980335633, 38.74123958634596];
// const stopCoords = [-9.1062259067202, 38.73516922235015];
// const endpointCoords = [-9.103527750504185, 38.741422291924266];

// // Set the origin and destination
// directions.setOrigin(originCoords);
// directions.setDestination(endpointCoords);

// // Add a stop in between
// directions.addWaypoint(1, stopCoords); // The '1' specifies the index of the stop


</script>
 
</body>
</html>
`;

return (
  <iframe
    style={{ width: "100%", height: "100vh" }}
    onMessage={(data) => {
      props?.update?.({ location: data });
    }}
    srcDoc={src}
  />
);
