State.init({ type: "custom", customAmount: 1 });

const Theme = styled.div`
    .container {
      background-color: white;
      max-width: 700px;
        background-position: 0px -100px;
        background-repeat: no-repeat;
        background-image: url("https://abs.twimg.com/sticky/illustrations/twitter_blue_images_v2/background-600W.png");
            padding-left: 72px;
    padding-right: 72px;

    background-size: cover;
     padding-bottom: 100px;
     padding-top: 30px;
    }
   .header {
       border-radius: 12px; 
       background-color: black;
       color: white;
       padding-top: 12px;
    padding-right: 16px;
    font-size: 20px;
    //width: 65%;

    font-weight: 800;
    display: flex;
    // line-height: 24px;

    padding-left: 16px;
    width: 100%;
 
   }
   .header-text {
     // vertical-align:center;
     flex: 4.7;
           font-family: inherit;

    word-wrap: break-word;
    //width: 65%;
    //display: inline-block;
   }
   .illustration{
     flex: 1;
     width: 150px;
     min-height: 50px;
     margin-left: 20px;
       // width: 20%;
        //height: 20%;
        display: inline-block;
   }
   .illustration img {
       width: 100%
   }
   .radiogroup{
       margin-top: 24px;
       margin-bottom: 12px;
      width: 100%;
      
   }
   .selector {
     display: flex;
       width: 100%;
           background-color: rgb(42, 45, 48);
          // flex-direction: row;
           padding: 10px;
            border-radius: 12px;
            align: center;
   }
   .menu-active {
       background-color: rgb(27, 32, 35);
       color: rgba(231,233,234,1.00) !important; 
       border-radius: 12px;
      
   }
    .menu-active .menu-item-text {
       color: rgba(231,233,234,1.00) !important;        
   }
   .menu-item .sale {
      color: rgb(194, 241, 220);
      line-height: 12px;
      font-size: 11px;
          font-weight: 700;
          margin-left: 10px;
   }
   .menu-item{
           padding: 4px;
   flex: 1 1 0%;
    -webkit-box-align: center;
          align-items: center;
          justify-content: center;
display: flex;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
  
   }
   .menu-item .menu-item-text {
    color: rgb(113, 118, 123);
    justify-content: center;
    display: flex;
    align-items: center;

   }
  .disabled {
    pointer-events:none;
  }
.subscribe {
  border: black 1px solid;
     margin: 24px auto 0px;
  background-color: rgb(239, 243, 244);
    width: 75%;
    min-height: 36px;
        -webkit-box-align: center;
 
    text-align: center;
    border-radius: 999px;
     display: flex;
  justify-content: center;
  align-items: center;   
}
.subscribe-text {
      cursor: pointer;
  justify-content: center;
  font-weight: bold;

    flex-grow: 1;    color: rgb(15, 20, 25);

    flex-direction: row;
}
.old-price{
  text-decoration-line: line-through;
      font-weight: initial;
}
.subscribe-amount-block {
 
  width: 75%;
  color: white;
   font-weight: bold;
   text-align: center;
        display: flex;
 justify-content: flex-start;
  align-items: center;   
      flex-direction: column;
          margin: 0px auto;
           margin-top: 24px;
}
.subscribe-amount-text {
    margin-bottom: 8px;
        color:  rgb(113, 118, 123);
    font-size: 15px;
}
.subscribe-amount{
  width: 100%;
  text-align: center;
}
.action {
  min-height: 200px;
}
`;

const isNumber = (n) => {
  console.log(n);
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const deposit = () => {
  console.log("F", state.customAmount);
};

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
          <div
            class={`menu-item ${state.type == "annually" ? "menu-active" : ""}`}
          >
            <div
              class="menu-item-text"
              onClick={() => State.update({ type: "annually" })}
            >
              Annually<div class="sale">SAVE 12%</div>
            </div>
          </div>
          <div
            class={`menu-item ${state.type == "monthly" ? "menu-active" : ""}`}
            onClick={() => State.update({ type: "monthly" })}
          >
            <div class="menu-item-text">Monthly</div>
          </div>
          <div
            class={`menu-item ${state.type == "custom" ? "menu-active" : ""}`}
            onClick={() => State.update({ type: "custom" })}
          >
            <div class="menu-item-text">Custom</div>
          </div>
        </div>
      </div>

      {state.type !== "custom" && (
        <div class="action">
          <div class="subscribe">
            <div class="subscribe-text">
              {state.type == "monthly" ? (
                <>8 NEAR / month</>
              ) : (
                <>
                  <span class="old-price">96 NEAR</span> 84 NEAR / year
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {state.type === "custom" && (
        <div class="action">
          <div class="subscribe-amount-block">
            <div class="subscribe-amount-text">Enter amount:</div>
            <input
              type="text"
              class="subscribe-amount"
              value={state.customAmount}
              onChange={(e) =>
                State.update({
                  customAmount: isNumber(e.target.value)
                    ? parseFloat(e.target.value)
                    : "",
                })
              }
            />
            <div class="subscribe">
              <div
                class={`subscribe-text ${
                  state.customAmount > 1 ? "" : "disabled"
                } `}
                onClick={() => deposit()}
              >
                {state.customAmount
                  ? `Deposit ${state.customAmount} NEAR`
                  : "Min deposit: 1 NEAR"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </Theme>
);
