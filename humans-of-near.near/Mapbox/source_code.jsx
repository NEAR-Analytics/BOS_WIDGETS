const API_URL = props.API_URL || "";
const ACCESS_TOKEN =
  props.accessToken ||
  "pk.eyJ1IjoiZWpsYnJhZW0iLCJhIjoiY2xrbmIwaW53MGE0NTNtbGsydWd2MmpyZSJ9.m1ZfEqv2fGet2zblGknT8A";
const styleUrl = props.styleUrl || "mapbox://styles/mapbox/streets-v12"; // see https://docs.mapbox.com/api/maps/styles/#mapbox-styles
const center = props.center || [-87.6298, 41.8781]; // starting position [lng, lat]
const zoom = props.zoom || 9; // starting zoom
const accountId = context.accountId;
const edit = props.edit || false;
const markers = props.markers || [];

const handleLink = ({ e }) => {
  return (
    <Link to="/michaelpeter.near/widget/HelloWorld" target="_blank">
      {e}
    </Link>
  );
};

const code = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
    
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet">
    
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
    
    <style>
      body { margin: 0; padding: 0; }
      #map { position: absolute; top: 0; bottom: 0; width: 100%; }

      .marker {
        background-image: url('https://humans.nearverselabs.com/Human.png');
        background-size: cover;
        width: 27px;
        height: 34px;
        border-radius: 50%;
        cursor: pointer;
      }

      #mymarker {
        background-image: url('https://humans.nearverselabs.com/active.svg') !important;
      }

      h6 {
        margin:0;
        font-size: 16px;
      }

      .mapboxgl-popup-content{
        background: rgb(25, 26, 26);
        color: white;
        border: 1px solid;
        border-radius: 9px;
        padding: 10px;
      }

      .mapboxgl-popup-close-button{
        color: white;
      }

      .popup{
          padding: 10px; 
          display:flex; 
          gap:12px;
          @media (max-width: 510px) {
            padding: 0;
          }
      }

      .logo{
        width:48px; 
        height:60px;
        @media (max-width: 510px) {
          width:36px; 
          height:50px;
        }        
      }

      .gap-16{
        display:flex; 
        align-items:center;
        gap: 16px;
      }

      .gap-14{
        display:flex; 
        gap: 14px;
        flex-direction:column;
        @media (max-width: 510px) {
          gap: 3px;
        } 
      }

      a {
        border: 0
      }
    </style>
  </head>
  <body>

    <div id="map"></div>

    <script>

    mapboxgl.accessToken = "${ACCESS_TOKEN}";

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: '${styleUrl}',
        center: [${center[0]}, ${center[1]}], 
        zoom: ${zoom}
    });

    function onCopy  (e, text)  {
      console.log(e,"==>e", text);
      
      onOpen(text);
      // navigator.clipboard.writeText(text);
    }

    function getDetail (row) {
      const user = row.user;
       var title = "";
       const near = row.user.accountId.indexOf(".near");
       if(user.name){
        title = user.name;
       } else if(near !== -1){
        title = user.accountId;
       } else {
          title = user.accountId.slice(0, 12);
       }

      var state = {
        twitter: false,
        social:false
      }

      if(user.twitter !== "https://twitter.com/"){
        state.twitter = true
      }
      if(user.social !== "https://social.near.page/u/"){
        state.social = true
      }

        console.log(${handleLink("123")});
       const HTML = '<div class="popup">'+
          '<img src="https://humans.nearverselabs.com/Human.png" class="logo" />'+
          '<div class="gap-14">'+
            '<h6>'+title+'</h6>'+
            '<div class="gap-16">'+
            '${handleLink("123")}' +
            (state.social? "<a href='"+user.social+"' target='_blank' onclick='onCopy( this, "+JSON.stringify(user.social)+")' >" : '') +
            '<svg width="29" height="12" viewBox="0 0 29 12" fill="'+(state.social?'white':'grey')+'" xmlns="http://www.w3.org/2000/svg"><path d="M0.240133 7.38517V4.85885L10.3454 0.409091V3.31579L3.42674 6.0933L3.52004 5.94258V6.30144L3.42674 6.15072L10.3454 8.92823V11.8349L0.240133 7.38517ZM28.7599 7.38517L18.6546 11.8349V8.92823L25.5733 6.15072L25.48 6.30144V5.94258L25.5733 6.0933L18.6546 3.31579V0.409091L28.7599 4.85885V7.38517Z"></path></svg>'+
             (state.social? '</a>' : '') +
             (state.twitter? '<a href="'+user.twitter+'" target="_blank">' : '') +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="'+(state.twitter?'white':'grey')+'" d="M22.212 5.656a8.384 8.384 0 0 1-2.401.658A4.195 4.195 0 0 0 21.649 4c-.82.488-1.719.83-2.655 1.015a4.182 4.182 0 0 0-7.126 3.814a11.874 11.874 0 0 1-8.621-4.37a4.168 4.168 0 0 0-.566 2.103c0 1.45.739 2.731 1.86 3.481a4.169 4.169 0 0 1-1.894-.523v.051a4.185 4.185 0 0 0 3.355 4.102a4.205 4.205 0 0 1-1.89.072A4.185 4.185 0 0 0 8.02 16.65a8.394 8.394 0 0 1-6.192 1.732a11.831 11.831 0 0 0 6.41 1.88c7.694 0 11.9-6.373 11.9-11.9c0-.18-.004-.362-.012-.541a8.497 8.497 0 0 0 2.086-2.164Z"/></svg>'+
             (state.twitter? '</a>' : '') +
           '</div>'+
          '</div>'+
        '</div>';
        
        return HTML;
    };

    // Function to populate markers to the map
    function populateMarkers() {
        const markersData = ${JSON.stringify(markers)};
        markersData.forEach(marker => {
          
        const el = document.createElement('div');
        el.className = 'marker';
        ${
          accountId
            ? `if(marker.user.accountId === "${accountId}") el.id = 'mymarker';`
            : ``
        }
        new mapboxgl.Marker(el)
            .setLngLat([marker.longitude, marker.latitude])
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(
                    getDetail(marker)
              )
            ).addTo(map);
        });
    }

    populateMarkers();

    ${
      accountId && edit
        ? `map.on('click', function(event) {
            const { lngLat } = event;

            const _el = document.getElementById("mymarker");
            const myel = _el ? _el : document.createElement('div');
            myel.className = 'marker';
            myel.id = 'mymarker';
            
            new mapboxgl.Marker(myel)
                .setLngLat([lngLat.lng, lngLat.lat])
                .addTo(map);

            const data = {
              lngLat,
              accountId : "${accountId}"
            };

            fetch("${API_URL}/location/bos", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data),
            });
        
      });     
`
        : ``
    }
    
    </script>
  </body>
</html>
  `;

const Container = styled.div`
    height: 100%;
    display: flex;
`;
return (
  <Container>
    <iframe
      id="myMap"
      className="w-100 h-100"
      sandbox="allow-same-origin allow-scripts allow-top-navigation allow-popups allow-popups-to-escape-sandbox"
      srcDoc={code}
      target="_parent"
      allow="geolocation *;"
    />
  </Container>
);
