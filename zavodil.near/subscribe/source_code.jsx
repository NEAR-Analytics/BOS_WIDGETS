const Theme = styled.div`
    .container {
        background-position: 0px -100px;
        background-repeat: no-repeat;
        background-image: url("https://abs.twimg.com/sticky/illustrations/twitter_blue_images_v2/background-600W.png");
            padding-left: 72px;
    padding-right: 72px;
    }
   .header {
       border-radius: 12px; 
       background-color: black;
       color: white;
       padding-top: 12px;
    padding-right: 16px;
    font-size: 20px;
    width: 65%;

    font-weight: 800;

    line-height: 24px;

    padding-left: 16px;
    width: 100%;
 
   }
   .header-text {
           font-family: inherit;

    word-wrap: break-word;
    width: 65%;
    display: inline-block;
   }
   .illustration{
           vertical-align: top;
       inset: 0px;

    z-index: -1;
        width: 20%;
        height: 20%;
        display: inline-block;
   }
   .illustration img {
       width: 100%
   }
   .radiogroup{
       margin-top: 24px;
       margin-bottom: 24px;
      width: 100%;
      
   }
   .selector {
       width: 100%;
           background-color: rgb(42, 45, 48);
           flex-direction: row;
           padding: 10px;
            border-radius: 12px;
            display: inline;
            align: center;
   }
   .menu-active {
       background-color: rgb(27, 32, 35);
       color: rgba(231,233,234,1.00) !important; 
       border-radius: 12px;
       padding: 4px;
   }
   .menu-item{

    width: 45%;
 display: inline-block;
    cursor: pointer;
    text-align: center;
  
   }
   .men-item div {
       gap: 16px;
       
        color: rgb(113, 118, 123);
text-align: center;  -webkit-box-pack: justify;
    justify-content: space-between;

   }

`;
return (
  <Theme>
    <div class="container">
      <div class="header">
        <div class="header-text">
          Premium subscribers will get a blue checkmark and extra features.
        </div>
        <div class="illustration">
          <img
            draggable="false"
            src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
          />
        </div>
      </div>

      <div class="radiogroup">
        <div class="selector">
          <div class="menu-item">
            <div class="menu-active">Annually</div>
          </div>
          <div class="menu-item">
            <div>Monthly</div>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
