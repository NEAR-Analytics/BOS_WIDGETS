const accessToken = `pk.eyJ1IjoiMzMzMzMzMzMiLCJhIjoiY2xuYnJvNGQ4MGlueTJqcjdlbng0cWpycCJ9.pVVNrWeRzrqSdWxg2n-lqw`;

const coordinateObject = {
  hacker: {
    coordinates: [-9.103527750504185, 38.741422291924266],
  },
  community: {
    coordinates: [-9.10412980335633, 38.74123958634596],
  },
  nearcon: {
    coordinates: [-9.1062259067202, 38.73516922235015],
  },
};

const DataMap = {
  "Community HQ": {
    img: "https://i.ibb.co/Hr1XRXj/community.png",
    address: "Garagem Lisboa",
    map: "https://www.google.com/maps/place/R.+Pereira+Henriques,+Lisboa,+Portugal/@38.7409173,-9.1060679,17z/data=!3m1!4b1!4m6!3m5!1s0xd1933df3bc717d7:0xa6dbc055f9d40a3f!8m2!3d38.7409131!4d-9.103493!16s%2Fg%2F1thhlsmg?entry=ttu",
    appleMaps:
      "https://maps.apple.com/?address=Rua%20Pereira%20Henriques%203,%201950-242%20Lisboa,%20Portugal&auid=6832312148092515891&ll=38.740628,-9.104362&lsp=9902&q=Garagem%20Lisboa",
  },
  "NEARCON HQ": {
    img: "https://i.ibb.co/WzJYS9V/nearconhq.png",
    address: "Convento Do Beato",
    map: "https://www.google.com/maps/place/Convento+do+Beato/@38.7348554,-9.1088421,17z/data=!3m1!4b1!4m6!3m5!1s0xd1933e0e05a00ab:0x1ab47681c49d3234!8m2!3d38.7348512!4d-9.1062672!16s%2Fm%2F0_qdlv1?entry=ttu",
    appleMaps:
      "https://maps.apple.com/?address=Alameda%20do%20Beato%2041,%201950-042%20Lisboa,%20Portugal&auid=16456445038167086154&ll=38.735012,-9.106280&lsp=9902&q=Convento%20do%20Beato",
  },
  "Hacker HQ": {
    img: "https://i.ibb.co/YBdG3rk/hacker.png",
    address: "Armazem 16",
    map: "https://www.google.com/maps/place/R.+Pereira+Henriques+16,+1950-242+Lisboa,+Portugal/@38.7410407,-9.1060257,17z/data=!3m1!4b1!4m6!3m5!1s0xd1933df23292a97:0x66ead8aebe385527!8m2!3d38.7410365!4d-9.1034508!16s%2Fg%2F11c1yl_sby?entry=ttu",
    appleMaps:
      "https://maps.apple.com/?address=Rua%20Pereira%20Henriques%2016,%201950-242%20Lisboa,%20Portugal&ll=38.741024,-9.103644&q=Rua%20Pereira%20Henriques%2016",
  },
};

initState({
  coordinates: [-9.105177855038266, 38.738204404348055],
  zoom: 13,
  initialize: false,
});

if (props.hq) {
  const data = coordinateObject[props.hq];
  State.update({
    coordinates: data.coordinates,
    zoom: 17,
    initialize: true,
  });
} else {
  State.update({ initialize: true });
}

const generatePopup = (image, heading, subtitle, link) =>
  `<div id="${heading}" style="display:flex;"><img style="height:50px;width:50px; transform:scale(1.5);border-radius:0px;" src="${image}"/><a href="${link}" target="_blank" style="text-decoration:none; color:black;"><div style="padding-left:25px;padding-right:0px;"><p style="font-size:12px; font-weight:500;margin-bottom:-5px">${heading}</p> <p style="font-size:9px; margin-top:0px">${subtitle}</p></div></a></div>`;

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
.mapboxgl-popup-content {padding:0px;border-radius:10px; overflow:hidden;width:190px;font-family: 'Mona-Sans', sans-serif;}
*:focus {
    outline: none;
}
</style>
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
center: [${state.coordinates[0]}, ${state.coordinates[1]}],
zoom: ${state.zoom}
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
  },2000)
</script>
 
</body>
</html>
`;

const NoFlexInMobile = styled.div`
  @media only screen and (max-width: 800px) {
  display:block;
  }
  width:100%;
  display:flex;
  a {
    font-size:8px !important;
    text-align:center;
  }
`;

const CustomLink = ({ heading, image, link, subtitle, appleLink }) => (
  <div
    id={heading}
    style={{
      display: "flex",
      alignItems: "center",
      position: "absolute",
      bottom: 100,
      left: 0,
      margin: 20,
      borderRadius: 10,
      overflow: "hidden",
      width: "calc(100% - 40px)",
      backgroundColor: "white",
    }}
  >
    <img
      style={{
        height: "150px",
        width: "150px",
        transform: "scale(1.2)",
        borderRadius: "0px",
      }}
      src={image}
      alt={heading}
    />
    <div style={{ paddingLeft: "25px", paddingRight: "45px" }}>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "500",
          marginBottom: "-5px",
        }}
      >
        {heading}
      </p>
      <p
        style={{
          fontSize: "14px",
          marginTop: "0px",
          marginBottom: "8px",
        }}
      >
        {subtitle}
      </p>
      <NoFlexInMobile
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <a
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: 10,
            borderRadius: 5,
            fontSize: 14,
            display: "block",
            marginBottom: 10,
          }}
          target="_blank"
          href={link}
        >
          Open on Google Maps
        </a>
        <a
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: 10,
            borderRadius: 5,
            fontSize: 14,
            display: "block",
            marginBottom: 10,
          }}
          target="_blank"
          href={appleLink}
        >
          Open on Apple Maps
        </a>
      </NoFlexInMobile>
    </div>
  </div>
);

return (
  <div>
    {state.location && (
      <CustomLink
        heading={state.location}
        image={DataMap[state.location].img}
        subtitle={DataMap[state.location].address}
        link={DataMap[state.location].map}
        appleLink={DataMap[state.location].appleMaps}
      />
    )}
    {state.initialize && (
      <iframe
        style={{ width: "100%", height: "100vh" }}
        onMessage={(data) => {
          State.update({ location: data });
        }}
        srcDoc={src}
      />
    )}
  </div>
);
