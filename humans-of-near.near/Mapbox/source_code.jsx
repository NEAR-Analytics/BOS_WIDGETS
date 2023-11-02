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
        // background-image: url('https://humans.nearverselabs.com/Human.png');
        // background-size: cover;
        width: 27px;
        height: 34px;
        // border-radius: 50%;
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
      const HumanString = '<svg width="27" height="35" viewBox="0 0 27 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.18848 17.591C9.18848 16.3472 10.187 15.3389 11.4187 15.3389H17.1665C18.3982 15.3389 19.3967 16.3472 19.3967 17.591V31.9479C19.3967 33.1917 18.3982 34.2 17.1665 34.2H11.4187C10.187 34.2 9.18848 33.1917 9.18848 31.9479V17.591Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.1665 15.9099H11.4187C10.4993 15.9099 9.75393 16.6626 9.75393 17.591V31.9479C9.75393 32.8764 10.4993 33.629 11.4187 33.629H17.1665C18.0859 33.629 18.8313 32.8764 18.8313 31.9479V17.591C18.8313 16.6626 18.0859 15.9099 17.1665 15.9099ZM11.4187 15.3389C10.187 15.3389 9.18848 16.3472 9.18848 17.591V31.9479C9.18848 33.1917 10.187 34.2 11.4187 34.2H17.1665C18.3982 34.2 19.3967 33.1917 19.3967 31.9479V17.591C19.3967 16.3472 18.3982 15.3389 17.1665 15.3389H11.4187Z" fill="currentColor"/><path d="M9.73924 27.42V21.5737H19.4372C18.7067 24.5717 14.3515 27.5819 9.73924 27.42Z" fill="currentColor" fill-opacity="0.45"/><path d="M8.48168 14.7934C8.48168 16.646 6.83615 18.1479 4.80628 18.1479C2.77642 18.1479 1.13089 16.646 1.13089 14.7934C1.13089 12.9407 2.77642 11.4389 4.80628 11.4389C6.83615 11.4389 8.48168 12.9407 8.48168 14.7934Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.80628 17.5769C6.579 17.5769 7.91623 16.2777 7.91623 14.7934C7.91623 13.309 6.579 12.0099 4.80628 12.0099C3.03357 12.0099 1.69634 13.309 1.69634 14.7934C1.69634 16.2777 3.03357 17.5769 4.80628 17.5769ZM4.80628 18.1479C6.83615 18.1479 8.48168 16.646 8.48168 14.7934C8.48168 12.9407 6.83615 11.4389 4.80628 11.4389C2.77642 11.4389 1.13089 12.9407 1.13089 14.7934C1.13089 16.646 2.77642 18.1479 4.80628 18.1479Z" fill="currentColor"/><path d="M19.6492 14.7934C19.6492 16.646 21.2947 18.1479 23.3246 18.1479C25.3545 18.1479 27 16.646 27 14.7934C27 12.9407 25.3545 11.4389 23.3246 11.4389C21.2947 11.4389 19.6492 12.9407 19.6492 14.7934Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.3246 17.5769C21.5519 17.5769 20.2147 16.2777 20.2147 14.7934C20.2147 13.309 21.5519 12.0099 23.3246 12.0099C25.0973 12.0099 26.4346 13.309 26.4346 14.7934C26.4346 16.2777 25.0973 17.5769 23.3246 17.5769ZM23.3246 18.1479C21.2947 18.1479 19.6492 16.646 19.6492 14.7934C19.6492 12.9407 21.2947 11.4389 23.3246 11.4389C25.3545 11.4389 27 12.9407 27 14.7934C27 16.646 25.3545 18.1479 23.3246 18.1479Z" fill="currentColor"/><path d="M23.7487 13.8061C23.7487 20.3122 20.3273 23.9036 14.1404 23.9036C7.95347 23.9036 4.3822 20.3122 4.3822 13.8061C4.3822 7.29988 7.95347 0.208017 14.1404 0.208017C20.3273 0.208017 23.7487 7.29988 23.7487 13.8061Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.857 20.899C22.3542 19.326 23.1832 16.9626 23.1832 13.8061C23.1832 10.643 22.3494 7.35382 20.7875 4.87361C19.2306 2.40147 16.9876 0.778995 14.1404 0.778995C11.2908 0.778995 9.00933 2.40414 7.41517 4.87858C5.81668 7.35975 4.94764 10.6477 4.94764 13.8061C4.94764 16.9562 5.81073 19.3193 7.34439 20.8943C8.87678 22.4681 11.1542 23.3326 14.1404 23.3326C17.1261 23.3326 19.3631 22.4685 20.857 20.899ZM14.1404 23.9036C20.3273 23.9036 23.7487 20.3122 23.7487 13.8061C23.7487 7.29988 20.3273 0.208017 14.1404 0.208017C7.95347 0.208017 4.3822 7.29988 4.3822 13.8061C4.3822 20.3122 7.95347 23.9036 14.1404 23.9036Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.2147 15.7784C14.3647 15.8223 14.4511 15.9806 14.4077 16.132C14.1491 17.0347 14.0136 17.5094 13.9966 18.3562C14.2619 18.4531 14.5563 18.4835 15.0526 18.4793C15.2088 18.478 15.3364 18.6048 15.3377 18.7625C15.339 18.9201 15.2134 19.049 15.0573 19.0503C14.4302 19.0555 14.0216 19.0106 13.59 18.8022C13.4918 18.7547 13.4293 18.6546 13.4293 18.5446C13.4293 17.4923 13.5841 16.952 13.8633 15.9776L13.8645 15.9733C13.9079 15.8219 14.0647 15.7346 14.2147 15.7784Z" fill="currentColor"/><path d="M10.1123 16.5811C10.1123 17.2924 9.68401 17.8691 9.15564 17.8691C8.62728 17.8691 8.19895 17.2924 8.19895 16.5811C8.19895 15.8697 8.62728 15.293 9.15564 15.293C9.68401 15.293 10.1123 15.8697 10.1123 16.5811Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.94521 17.5775C9.752 17.8376 9.47429 18.0119 9.15564 18.0119C8.83699 18.0119 8.55928 17.8376 8.36607 17.5775C8.17289 17.3174 8.05759 16.9646 8.05759 16.5811C8.05759 16.1975 8.17289 15.8447 8.36607 15.5846C8.55928 15.3245 8.83699 15.1502 9.15564 15.1502C9.47429 15.1502 9.752 15.3245 9.94521 15.5846C10.1384 15.8447 10.2537 16.1975 10.2537 16.5811C10.2537 16.9646 10.1384 17.3174 9.94521 17.5775ZM9.15564 17.8691C9.68401 17.8691 10.1123 17.2924 10.1123 16.5811C10.1123 15.8697 9.68401 15.293 9.15564 15.293C8.62728 15.293 8.19895 15.8697 8.19895 16.5811C8.19895 17.2924 8.62728 17.8691 9.15564 17.8691Z" fill="currentColor"/><path d="M9.84104 16.2649C9.84104 16.4226 9.71446 16.5504 9.55831 16.5504C9.40217 16.5504 9.27559 16.4226 9.27559 16.2649C9.27559 16.1072 9.40217 15.9794 9.55831 15.9794C9.71446 15.9794 9.84104 16.1072 9.84104 16.2649Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.9824 16.2649C9.9824 16.5014 9.79253 16.6931 9.55831 16.6931C9.3241 16.6931 9.13423 16.5014 9.13423 16.2649C9.13423 16.0284 9.3241 15.8366 9.55831 15.8366C9.79253 15.8366 9.9824 16.0284 9.9824 16.2649ZM9.55831 16.5504C9.71446 16.5504 9.84104 16.4226 9.84104 16.2649C9.84104 16.1072 9.71446 15.9794 9.55831 15.9794C9.40217 15.9794 9.27559 16.1072 9.27559 16.2649C9.27559 16.4226 9.40217 16.5504 9.55831 16.5504Z" fill="currentColor"/><path d="M20.2903 16.5811C20.2903 17.2924 19.862 17.8691 19.3337 17.8691C18.8053 17.8691 18.377 17.2924 18.377 16.5811C18.377 15.8697 18.8053 15.293 19.3337 15.293C19.862 15.293 20.2903 15.8697 20.2903 16.5811Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.1232 17.5775C19.93 17.8376 19.6523 18.0119 19.3337 18.0119C19.015 18.0119 18.7373 17.8376 18.5441 17.5775C18.3509 17.3174 18.2356 16.9646 18.2356 16.5811C18.2356 16.1975 18.3509 15.8447 18.5441 15.5846C18.7373 15.3245 19.015 15.1502 19.3337 15.1502C19.6523 15.1502 19.93 15.3245 20.1232 15.5846C20.3164 15.8447 20.4317 16.1975 20.4317 16.5811C20.4317 16.9646 20.3164 17.3174 20.1232 17.5775ZM19.3337 17.8691C19.862 17.8691 20.2903 17.2924 20.2903 16.5811C20.2903 15.8697 19.862 15.293 19.3337 15.293C18.8053 15.293 18.377 15.8697 18.377 16.5811C18.377 17.2924 18.8053 17.8691 19.3337 17.8691Z" fill="currentColor"/><path d="M20.019 16.2649C20.019 16.4226 19.8925 16.5504 19.7363 16.5504C19.5802 16.5504 19.4536 16.4226 19.4536 16.2649C19.4536 16.1072 19.5802 15.9794 19.7363 15.9794C19.8925 15.9794 20.019 16.1072 20.019 16.2649Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.9676 20.2108C13.0884 20.111 13.2665 20.129 13.3654 20.251C13.5512 20.4803 13.88 20.7445 14.2514 20.8191C14.5931 20.8878 15.0216 20.8072 15.4723 20.251C15.5712 20.129 15.7493 20.111 15.8701 20.2108C15.991 20.3107 16.0088 20.4905 15.9099 20.6126C15.3428 21.3125 14.7111 21.4937 14.141 21.3791C13.6007 21.2706 13.1661 20.9067 12.9278 20.6126C12.8289 20.4905 12.8467 20.3107 12.9676 20.2108Z" fill="currentColor"/><path d="M9.75393 19.5499C9.75393 19.9835 9.15268 20.335 8.411 20.335C7.66931 20.335 7.06806 19.9835 7.06806 19.5499C7.06806 19.1163 7.66931 18.7648 8.411 18.7648C9.15268 18.7648 9.75393 19.1163 9.75393 19.5499Z" fill="currentColor"/><path d="M20.9215 19.5499C20.9215 19.9835 20.3202 20.335 19.5785 20.335C18.8369 20.335 18.2356 19.9835 18.2356 19.5499C18.2356 19.1163 18.8369 18.7648 19.5785 18.7648C20.3202 18.7648 20.9215 19.1163 20.9215 19.5499Z" fill="currentColor"/><path d="M4.52355 11.7244C4.29168 8.57352 7.28011 1.92094 9.89529 1.27859C9.89529 1.27859 17.6702 -3.0716 21.5935 4.27624C25.5169 11.6241 23.0419 18.6221 23.0419 18.6221C20.9921 16.4809 21.8403 15.7926 21.5935 13.0515C17.2461 15.5071 13.288 14.9361 10.6021 12.3667C9.61256 14.4365 7.84555 14.8648 7.31603 14.8648C7.61956 16.6224 5.93717 18.1225 5.15968 18.5507C4.34627 16.5523 4.69644 14.6513 4.52355 11.7244Z" fill="currentColor"/><path d="M4.67989 6.78691C4.75008 3.05417 7.76678 0.065239 11.464 0.065239H16.8502C20.5308 0.065239 23.5403 3.0282 23.6334 6.74358L23.7487 11.3421H4.59424L4.67989 6.78691Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8502 0.636217H11.464C8.07488 0.636217 5.30957 3.37607 5.24524 6.79775L5.17052 10.7711H23.1687L23.0681 6.75803C22.9828 3.35227 20.2241 0.636217 16.8502 0.636217ZM23.6334 6.74358C23.5403 3.0282 20.5308 0.065239 16.8502 0.065239H11.464C7.76678 0.065239 4.75008 3.05417 4.67989 6.78691L4.59424 11.3421H23.7487L23.6334 6.74358Z" fill="currentColor"/><path d="M9.75393 4.77581C9.75393 2.25307 11.7792 0.207984 14.2775 0.207984Lnan nanL14.2775 0.207984C16.7758 0.207984 18.801 2.25307 18.801 4.77581V11.3421H9.75393V4.77581Z" fill="currentColor" fill-opacity="0.38"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.2356 10.7711V4.77581C18.2356 2.56841 16.4635 0.778962 14.2775 0.778962C12.0915 0.778962 10.3194 2.56841 10.3194 4.77581V10.7711H18.2356ZM14.2775 0.207984C11.7792 0.207984 9.75393 2.25307 9.75393 4.77581V11.3421H18.801V4.77581C18.801 2.25307 16.7758 0.207984 14.2775 0.207984Z" fill="currentColor"/><path d="M-nan -nanC-nan -nan 0.253158 10.817 0.565445 10.817C0.565444 10.817 0.565446 10.817 0.565445 10.817H23.6073V11.388H0L-nan -nanZ" fill="currentColor"/></svg>';
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
        el.innerHTML = HumanString.trim();
        el.className = 'marker';
        el.style="color:black;";
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
