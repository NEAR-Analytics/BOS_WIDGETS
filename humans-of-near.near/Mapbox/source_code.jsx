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

state = State.init({
  opened: false,
});

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
        font-size: 18px;
      }

      .text-wrap{
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .mapboxgl-popup-content{
        width: 250px;
        color: white;
        padding: 10px;
        border: 1px solid;
        border-radius: 9px;
        background: #22272B;
      }

      .mapboxgl-popup-close-button{
        color: white;
      }

      .popup{
          padding: 10px; 
          display:flex; 
          flex-direction: column;
          gap:12px;
          @media (max-width: 510px) {
            padding: 0;
          }
      }

      .d-flex{
        display: flex;
      }

      .logo{
        width:48px; 
        height:60px;
        border-radius: 5px;
        @media (max-width: 510px) {
          width:36px; 
          height:50px;
        }        
      }

      .logo-container{
        height: 60px;
      }

      .mapboxgl-ctrl-logo {
          display: none !important;
      }

      .gap-16{
        display:flex; 
        align-items:center;
        gap: 16px;
      }

      .gap-14{
        gap: 14px;
        display:flex; 
        overflow: hidden;
        flex-direction:column;
        justify-content: space-between;
        @media (max-width: 510px) {
          gap: 3px;
        } 
      }

      a {
        outline: 0;
      }

      .role{
        color: #22272B;
        font-size: 12px;
        font-weight: 500;
        padding: 2px 10px;
        width: fit-content;
        border-radius: 54px;
        background: #E6E6E6;
        text-transform: capitalize;
      }
    </style>
  </head>
  <body>

    <div id="map"></div>

    <script>

      const Commnuities = [
        {
          id: "south_america",
          name: "South America",
          color: "#0040FF",
        },
        {
          id: "asia",
          name: "Asia",
          color: "#E311C2",
        },
        {
          id: "north_america",
          name: "North America",
          color: "#F33E01",
        },
        {
          id: "africa",
          name: "Africa",
          color: "#00BBEA",
        },
        {
          id: "europe",
          name: "Europe",
          color: "#008000",
        },
        {
          id: "anz",
          name: "ANZ",
          color: "#FED52E",
        },
      ];

    mapboxgl.accessToken = "${ACCESS_TOKEN}";

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: '${styleUrl}',
        center: [${center[0]}, ${center[1]}], 
        zoom: ${zoom}
    });

    function handleLink (link){
      window.top.postMessage(link, "*");
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
      const profileImageUrl = "https://i.near.social/magic/large/https://near.social/magic/img/account/"+ user.accountId;
      
      
       const HTML = '<div class="popup">'+
          '<div class="d-flex" style="gap:20px">'+
            '<div class="logo-container">'+
              '<img src="'+ profileImageUrl +'" class="logo" />'+
            '</div>'+
            '<div class="gap-14">'+
              '<div class="d-flex" style="gap:16px; overflow:hidden">'+
                '<h6 class="text-wrap">'+title+'</h6>'+
                '<svg style="width:16px" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_378)"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM7.54347 11.424L12.1493 5.66613L11.3173 5.00053L7.38987 9.90827L4.608 7.5904L3.92533 8.4096L7.54347 11.4251V11.424Z" fill="#E6E6E6"/></g><defs><clipPath id="clip0_1_378"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>'+
              '</div>'+
              '<div class="role">'+
                user.role+
              '</div>'+
            '</div>'+
          '</div>'+
          (user.bio ? '<div >'+user.bio.length>150?user.bio.slice(0, 150)+'...':user.bio+'</div>':'')+
          '<div class="gap-16">'+
              (state.social? "<a href='"+user.social+"' target='_blank' onclick='handleLink("+JSON.stringify(user.social)+")'   >  " : '') +
              '<svg width="29" height="12" viewBox="0 0 29 12" fill="'+(state.social?'white':'grey')+'" xmlns="http://www.w3.org/2000/svg"><path d="M0.240133 7.38517V4.85885L10.3454 0.409091V3.31579L3.42674 6.0933L3.52004 5.94258V6.30144L3.42674 6.15072L10.3454 8.92823V11.8349L0.240133 7.38517ZM28.7599 7.38517L18.6546 11.8349V8.92823L25.5733 6.15072L25.48 6.30144V5.94258L25.5733 6.0933L18.6546 3.31579V0.409091L28.7599 4.85885V7.38517Z"></path></svg>'+
              (state.social? '</a>' : '') +
              (state.twitter? "<a href='"+user.twitter+"' target='_blank' onclick='handleLink("+JSON.stringify(user.twitter)+")'   >  " : '') +
              '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24"><path fill="'+(state.twitter?'white':'grey')+'" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'+
              (state.twitter? '</a>' : '') +
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
        if(marker.user.community){
          const _com = Commnuities.find((row)=>row.id == marker.user.community);
          el.style="color:"+_com.color+";";
        }
        console.log(marker.user, "/", Commnuities, el);
        ${
          accountId
            ? `if(marker.user.accountId === "${accountId}") el.id = 'mymarker';`
            : ``
        }
        new mapboxgl.Marker(el)
            .setLngLat([marker.longitude, marker.latitude])
            .setPopup(
                new mapboxgl.Popup({ offset: 25, closeButton: false }) // add popups
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

/* reset */
button,
fieldset,
input {
  all: unset;
}

.DialogOverlay {
  background-color: var(--blackA9);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.DialogContent {
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
.DialogContent:focus {
  outline: none;
}

.DialogTitle {
  margin: 0;
  font-weight: 500;
  color: var(--mauve12);
  font-size: 17px;
}

.DialogDescription {
  margin: 10px 0 20px;
  color: var(--mauve11);
  font-size: 15px;
  line-height: 1.5;
}

.Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
}
.Button.violet {
  background-color: white;
  color: var(--violet11);
  box-shadow: 0 2px 10px var(--blackA7);
}
.Button.violet:hover {
  background-color: var(--mauve3);
}
.Button.violet:focus {
  box-shadow: 0 0 0 2px black;
}
.Button.green {
  background-color: var(--green4);
  color: var(--green11);
}
.Button.green:hover {
  background-color: var(--green5);
}
.Button.green:focus {
  box-shadow: 0 0 0 2px var(--green7);
}

.IconButton {
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--violet11);
  position: absolute;
  top: 10px;
  right: 10px;
}
.IconButton:hover {
  background-color: var(--violet4);
}
.IconButton:focus {
  box-shadow: 0 0 0 2px var(--violet7);
}

.Fieldset {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
}

.Label {
  font-size: 15px;
  color: var(--violet11);
  width: 90px;
  text-align: right;
}

.Input {
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  color: var(--violet11);
  box-shadow: 0 0 0 1px var(--violet7);
  height: 35px;
}
.Input:focus {
  box-shadow: 0 0 0 2px var(--violet8);
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
`;

return (
  <Container>
    <Dialog.Root open={state.opened}>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Redirect</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          Click{" "}
          <a href={state.url} target="_blank">
            {" "}
            here{" "}
          </a>{" "}
          to open the link in new tab.
        </Dialog.Description>
        <Dialog.Close asChild>
          <button
            className="IconButton"
            aria-label="Close"
            onClick={() => {
              State.update({ opened: false });
            }}
          >
            X
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
    <iframe
      id="myMap"
      className="w-100 h-100"
      srcDoc={code}
      onMessage={(response) => {
        State.update({ opened: true, url: response });
      }}
    />
  </Container>
);
