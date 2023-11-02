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
      const HumanString = '<svg width="27" height="34" viewBox="0 0 46 58" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.6545 29.8327C15.6545 27.7234 17.3556 26.0134 19.4541 26.0134H29.2466C31.3451 26.0134 33.0463 27.7234 33.0463 29.8327V54.1807C33.0463 56.29 31.3451 58 29.2466 58H19.4541C17.3556 58 15.6545 56.29 15.6545 54.1807V29.8327Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M29.2466 26.9817H19.4541C17.8877 26.9817 16.6178 28.2582 16.6178 29.8327V54.1807C16.6178 55.7553 17.8877 57.0317 19.4541 57.0317H29.2466C30.8131 57.0317 32.0829 55.7553 32.0829 54.1807V29.8327C32.0829 28.2582 30.8131 26.9817 29.2466 26.9817ZM19.4541 26.0134C17.3556 26.0134 15.6545 27.7234 15.6545 29.8327V54.1807C15.6545 56.29 17.3556 58 19.4541 58H29.2466C31.3451 58 33.0463 56.29 33.0463 54.1807V29.8327C33.0463 27.7234 31.3451 26.0134 29.2466 26.0134H19.4541Z" fill="#323232"/><path d="M16.5928 46.5018V36.587H33.1152C31.8707 41.6713 24.4507 46.7763 16.5928 46.5018Z" fill="#7E7E7E" fill-opacity="0.45"/><path d="M14.4503 25.0882C14.4503 28.2301 11.6468 30.7771 8.18848 30.7771C4.7302 30.7771 1.9267 28.2301 1.9267 25.0882C1.9267 21.9463 4.7302 19.3993 8.18848 19.3993C11.6468 19.3993 14.4503 21.9463 14.4503 25.0882Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.18848 29.8088C11.2087 29.8088 13.4869 27.6055 13.4869 25.0882C13.4869 22.5708 11.2087 20.3676 8.18848 20.3676C5.1683 20.3676 2.89005 22.5708 2.89005 25.0882C2.89005 27.6055 5.1683 29.8088 8.18848 29.8088ZM8.18848 30.7771C11.6468 30.7771 14.4503 28.2301 14.4503 25.0882C14.4503 21.9463 11.6468 19.3993 8.18848 19.3993C4.7302 19.3993 1.9267 21.9463 1.9267 25.0882C1.9267 28.2301 4.7302 30.7771 8.18848 30.7771Z" fill="#323232"/><path d="M33.4764 25.0882C33.4764 28.2301 36.2799 30.7771 39.7382 30.7771C43.1965 30.7771 46 28.2301 46 25.0882C46 21.9463 43.1965 19.3993 39.7382 19.3993C36.2799 19.3993 33.4764 21.9463 33.4764 25.0882Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M39.7382 29.8088C36.718 29.8088 34.4398 27.6055 34.4398 25.0882C34.4398 22.5708 36.718 20.3676 39.7382 20.3676C42.7584 20.3676 45.0366 22.5708 45.0366 25.0882C45.0366 27.6055 42.7584 29.8088 39.7382 29.8088ZM39.7382 30.7771C36.2799 30.7771 33.4764 28.2301 33.4764 25.0882C33.4764 21.9463 36.2799 19.3993 39.7382 19.3993C43.1965 19.3993 46 21.9463 46 25.0882C46 28.2301 43.1965 30.7771 39.7382 30.7771Z" fill="#323232"/><path d="M40.4607 23.4138C40.4607 34.4477 34.6317 40.5383 24.091 40.5383C13.5504 40.5383 7.46597 34.4477 7.46597 23.4138C7.46597 12.3799 13.5504 0.352777 24.091 0.352777C34.6317 0.352777 40.4607 12.3799 40.4607 23.4138Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M35.5341 35.4427C38.0849 32.7752 39.4974 28.767 39.4974 23.4138C39.4974 18.0495 38.0768 12.4714 35.4157 8.26519C32.7633 4.07267 28.9419 1.3211 24.091 1.3211C19.2361 1.3211 15.3492 4.07719 12.6333 8.27362C9.9099 12.4814 8.42932 18.0575 8.42932 23.4138C8.42932 28.7562 9.89977 32.7638 12.5127 35.4348C15.1234 38.1037 19.0035 39.57 24.091 39.57C29.1778 39.57 32.989 38.1044 35.5341 35.4427ZM24.091 40.5383C34.6317 40.5383 40.4607 34.4477 40.4607 23.4138C40.4607 12.3799 34.6317 0.352777 24.091 0.352777C13.5504 0.352777 7.46597 12.3799 7.46597 23.4138C7.46597 34.4477 13.5504 40.5383 24.091 40.5383Z" fill="#323232"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24.2176 26.7587C24.4732 26.8331 24.6204 27.1015 24.5465 27.3584C24.1058 28.8893 23.875 29.6943 23.846 31.1303C24.2981 31.2948 24.7997 31.3462 25.6452 31.3392C25.9113 31.337 26.1287 31.552 26.1309 31.8194C26.1331 32.0868 25.9192 32.3053 25.6532 32.3075C24.5849 32.3164 23.8887 32.2403 23.1534 31.8867C22.9861 31.8063 22.8796 31.6364 22.8796 31.45C22.8796 29.6652 23.1433 28.749 23.619 27.0964L23.6211 27.0893C23.695 26.8324 23.9621 26.6844 24.2176 26.7587Z" fill="#323232"/><path d="M17.2284 28.1199C17.2284 29.3263 16.4987 30.3044 15.5985 30.3044C14.6983 30.3044 13.9686 29.3263 13.9686 28.1199C13.9686 26.9135 14.6983 25.9355 15.5985 25.9355C16.4987 25.9355 17.2284 26.9135 17.2284 28.1199Z" fill="#323232"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.9437 29.8098C16.6145 30.251 16.1414 30.5464 15.5985 30.5464C15.0556 30.5464 14.5825 30.251 14.2533 29.8098C13.9242 29.3687 13.7277 28.7704 13.7277 28.1199C13.7277 27.4694 13.9242 26.8711 14.2533 26.43C14.5825 25.9889 15.0556 25.6934 15.5985 25.6934C16.1414 25.6934 16.6145 25.9889 16.9437 26.43C17.2728 26.8711 17.4693 27.4694 17.4693 28.1199C17.4693 28.7704 17.2728 29.3687 16.9437 29.8098ZM15.5985 30.3044C16.4987 30.3044 17.2284 29.3263 17.2284 28.1199C17.2284 26.9135 16.4987 25.9355 15.5985 25.9355C14.6983 25.9355 13.9686 26.9135 13.9686 28.1199C13.9686 29.3263 14.6983 30.3044 15.5985 30.3044Z" fill="#323232"/><path d="M16.7662 27.5837C16.7662 27.8511 16.5506 28.0679 16.2845 28.0679C16.0185 28.0679 15.8029 27.8511 15.8029 27.5837C15.8029 27.3163 16.0185 27.0996 16.2845 27.0996C16.5506 27.0996 16.7662 27.3163 16.7662 27.5837Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.007 27.5837C17.007 27.9848 16.6836 28.31 16.2845 28.31C15.8855 28.31 15.562 27.9848 15.562 27.5837C15.562 27.1826 15.8855 26.8575 16.2845 26.8575C16.6836 26.8575 17.007 27.1826 17.007 27.5837ZM16.2845 28.0679C16.5506 28.0679 16.7662 27.8511 16.7662 27.5837C16.7662 27.3163 16.5506 27.0996 16.2845 27.0996C16.0185 27.0996 15.8029 27.3163 15.8029 27.5837C15.8029 27.8511 16.0185 28.0679 16.2845 28.0679Z" fill="#323232"/><path d="M34.5687 28.1199C34.5687 29.3264 33.839 30.3044 32.9388 30.3044C32.0386 30.3044 31.3089 29.3264 31.3089 28.1199C31.3089 26.9135 32.0386 25.9355 32.9388 25.9355C33.839 25.9355 34.5687 26.9135 34.5687 28.1199Z" fill="#323232"/><path fill-rule="evenodd" clip-rule="evenodd" d="M34.284 29.8098C33.9548 30.251 33.4817 30.5464 32.9388 30.5464C32.3959 30.5464 31.9228 30.251 31.5936 29.8098C31.2645 29.3687 31.0681 28.7705 31.0681 28.1199C31.0681 27.4694 31.2645 26.8711 31.5936 26.43C31.9228 25.9889 32.3959 25.6934 32.9388 25.6934C33.4817 25.6934 33.9548 25.9889 34.284 26.43C34.6131 26.8711 34.8096 27.4694 34.8096 28.1199C34.8096 28.7705 34.6131 29.3687 34.284 29.8098ZM32.9388 30.3044C33.839 30.3044 34.5687 29.3264 34.5687 28.1199C34.5687 26.9135 33.839 25.9355 32.9388 25.9355C32.0386 25.9355 31.3089 26.9135 31.3089 28.1199C31.3089 29.3264 32.0386 30.3044 32.9388 30.3044Z" fill="#323232"/><path d="M34.1065 27.5837C34.1065 27.8511 33.8909 28.0679 33.6248 28.0679C33.3588 28.0679 33.1432 27.8511 33.1432 27.5837C33.1432 27.3163 33.3588 27.0996 33.6248 27.0996C33.8909 27.0996 34.1065 27.3163 34.1065 27.5837Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.0929 34.2757C22.2988 34.1064 22.6022 34.1369 22.7707 34.3438C23.0872 34.7326 23.6473 35.1807 24.2801 35.3073C24.8623 35.4237 25.5924 35.2871 26.3602 34.3438C26.5286 34.1369 26.8321 34.1064 27.038 34.2757C27.2439 34.445 27.2742 34.75 27.1058 34.957C26.1396 36.144 25.0634 36.4512 24.0921 36.257C23.1715 36.0729 22.4311 35.4558 22.0251 34.957C21.8567 34.75 21.887 34.445 22.0929 34.2757Z" fill="#323232"/><path d="M16.6178 33.1548C16.6178 33.8902 15.5934 34.4863 14.3298 34.4863C13.0662 34.4863 12.0419 33.8902 12.0419 33.1548C12.0419 32.4195 13.0662 31.8234 14.3298 31.8234C15.5934 31.8234 16.6178 32.4195 16.6178 33.1548Z" fill="#E8E8E8"/><path d="M35.644 33.1548C35.644 33.8902 34.6196 34.4863 33.356 34.4863C32.0924 34.4863 31.0681 33.8902 31.0681 33.1548C31.0681 32.4195 32.0924 31.8234 33.356 31.8234C34.6196 31.8234 35.644 32.4195 35.644 33.1548Z" fill="#E8E8E8"/><path d="M7.7068 19.8834C7.31176 14.5399 12.4031 3.25773 16.8586 2.16837C16.8586 2.16837 30.1047 -5.20915 36.789 7.2521C43.4732 19.7133 39.2565 31.5813 39.2565 31.5813C35.7644 27.9501 37.2094 26.7828 36.789 22.1341C29.3822 26.2986 22.6387 25.3303 18.0628 20.9728C16.377 24.483 13.3665 25.2092 12.4643 25.2092C12.9815 28.19 10.1152 30.734 8.79057 31.4603C7.40475 28.0711 8.00135 24.8472 7.7068 19.8834Z" fill="#323232"/><path d="M7.97315 11.51C8.09273 5.17958 13.2323 0.110639 19.5313 0.110639H28.7078C34.9784 0.110639 40.1056 5.13555 40.2643 11.4365L40.4607 19.2351H7.82723L7.97315 11.51Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M28.7078 1.07896H19.5313C13.7572 1.07896 9.04594 5.7255 8.93633 11.5283L8.80904 18.2668H39.4727L39.3013 11.461C39.1558 5.68513 34.4558 1.07896 28.7078 1.07896ZM40.2643 11.4365C40.1056 5.13555 34.9784 0.110639 28.7078 0.110639H19.5313C13.2323 0.110639 8.09273 5.17958 7.97315 11.51L7.82723 19.2351H40.4607L40.2643 11.4365Z" fill="#323232"/><path d="M16.6178 8.09933C16.6178 3.821 20.0683 0.35272 24.3246 0.35272Lnan nanL24.3246 0.35272C28.581 0.35272 32.0314 3.821 32.0314 8.09933V19.2351H16.6178V8.09933Z" fill="#323232" fill-opacity="0.38"/><path fill-rule="evenodd" clip-rule="evenodd" d="M31.0681 18.2668V8.09933C31.0681 4.35579 28.0489 1.32105 24.3246 1.32105C20.6003 1.32105 17.5812 4.35579 17.5812 8.09933V18.2668H31.0681ZM24.3246 0.35272C20.0683 0.35272 16.6178 3.821 16.6178 8.09933V19.2351H32.0314V8.09933C32.0314 3.821 28.581 0.35272 24.3246 0.35272Z" fill="#323232"/><path d="M-nan -nanC-nan -nan 0.431307 18.3447 0.963351 18.3447C0.96335 18.3447 0.963352 18.3447 0.963351 18.3447H40.2199V19.313H0L-nan -nanZ" fill="#323232"/></svg>';
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
        el.style="color:white;";
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
