// read previousTimestamp
// premium.social.near/badge/premium/
// premium.social.near/badge/premium/accounts/${context.accountId}
const previousTimestamp = 1756975916422;
const price = "96000000000000000000000000";
const priceWholesale = "84000000000000000000000000";

const yearInMs = 31556926000;

const getEndDate = (purchasedPeriod) => {
  console.log("purchasedPeriod", purchasedPeriod);
  const previousTimestamp = state.previousTimestamp ?? Date.now();
  const nextTimestamp = previousTimestamp + purchasedPeriod;
  const dateObj = new Date(nextTimestamp);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  const nthNumber = (number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${month} ${day}${nthNumber(day)}, ${year}`;
};

State.init({
  type: "custom",
  customAmount: 1,
  previousTimestamp,
  purchasedPeriod: 0,
  price,
  priceWholesale,
});

const Theme = styled.div`
    .container {
background-color:#fff;
background-position:0 -100px;
background-repeat:no-repeat;
background-image:url(https://pluminite.mypinata.cloud/ipfs/QmPDQvqLE9ZHAMZjPSYLybHprVfiEPCfo9LHy9bVfZZRtd);
background-size:cover;
background-position:bottom;
height:400px;
padding:30px 12px 100px
}

.container-block {
margin:0 auto;
max-width:500px
}

.header {
border-radius:12px;
background-color:#000;
color:#fff;
padding-top:12px;
padding-right:16px;
font-size:20px;
font-weight:800;
display:flex;
gap:10px;
padding-left:16px;
width:100%
}

.header-text {
flex:4;
font-family:inherit;
word-wrap:break-word;
padding-bottom:10px
}

.illustration {
flex:1;
width:150px;
min-height:50px;
display:inline-block
}

.illustration img {
width:100%
}

.radiogroup {
margin-top:24px;
margin-bottom:12px;
width:100%
}

.selector {
display:flex;
width:100%;
background-color:#2a2d30;
padding:10px;
border-radius:12px;
align:center
}

.menu-active {
background-color:#000;
color:rgba(231,233,234,1.00)!important;
border-radius:12px
}

.menu-active .menu-item-text {
color:rgba(231,233,234,1.00)!important
}

.menu-item .sale {
color:#c2f1dc;
line-height:12px;
font-size:11px;
font-weight:700;
margin-left:10px
}

.menu-item {
padding:4px;
flex:1 1 0;
-webkit-box-align:center;
align-items:center;
justify-content:center;
display:flex;
cursor:pointer;
text-align:center;
font-weight:700
}

.menu-item .menu-item-text {
color:#71767b;
justify-content:center;
display:flex;
align-items:center
}

.disabled {
pointer-events:none
}

.subscribe {
border:#000 1px solid;
margin:24px auto 0;
background-color:#eff3f4;
width:75%;
min-height:36px;
-webkit-box-align:center;
text-align:center;
border-radius:999px;
display:flex;
justify-content:center;
align-items:center
}

.subscribe-text {
cursor:pointer;
justify-content:center;
font-weight:700;
flex-grow:1;
color:#0f1419;
flex-direction:row
}

.old-price {
text-decoration-line:line-through;
font-weight:initial
}

.subscribe-amount-block {
width:75%;
color:#fff;
font-weight:700;
text-align:center;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
margin:0 auto;
margin-top:24px
}

.subscribe-amount-text {
margin-bottom:8px;
color:#71767b;
font-size:15px
}

.subscribe-amount {
width:100%;
text-align:center
}

.action {
}

.premium-details {
padding-top:20px;
text-align:center
}
`;

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const deposit = () => {
  console.log("F", state.customAmount);
};

const convertNearToMs = (amount) => {
  const amountYocto = Big(10).pow(24).mul(Big(amount));
  const priceRegular = Big(state.price);
  const priceWholesale = Big(state.priceWholesale);

  const price = amountYocto.gt(priceWholesale) ? priceWholesale : priceRegular;

  const res = amountYocto.mul(Big(yearInMs)).div(price).toFixed(0);

  console.log("r", res);

  return Number(res);
};

return (
  <Theme>
    <div class="container">
      <div class="container-block">
        <div class="header">
          <div class="header-text">
            Premium subscribers will get a blue checkmark and extra features.
          </div>
          <div class="illustration">
            <img
              draggable="false"
              src="https://pluminite.mypinata.cloud/ipfs/QmeaN2XXfa9fkaVw9QBpew69MKT7SxJtsgedoqttTfyGLm"
            />
          </div>
        </div>

        <div class="radiogroup">
          <div class="selector">
            <div
              class={`menu-item ${
                state.type == "annually" ? "menu-active" : ""
              }`}
            >
              <div
                class="menu-item-text"
                onClick={() =>
                  State.update({ type: "annually", purchasedPeriod: yearInMs })
                }
              >
                Annually<div class="sale">SAVE 12%</div>
              </div>
            </div>
            <div
              class={`menu-item ${
                state.type == "monthly" ? "menu-active" : ""
              }`}
              onClick={() =>
                State.update({
                  type: "monthly",
                  purchasedPeriod: yearInMs / 12,
                })
              }
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
                onChange={(e) => {
                  const customAmount = isNumber(e.target.value)
                    ? parseFloat(e.target.value)
                    : "";
                  State.update({
                    customAmount,
                    purchasedPeriod: customAmount
                      ? convertNearToMs(customAmount)
                      : 0,
                  });
                }}
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
        {state.purchasedPeriod > 0 && (
          <div class="premium-details">
            You will have premium until: {getEndDate(state.purchasedPeriod)}
          </div>
        )}
        {state.purchasedPeriod == 0 && state.previousTimestamp && (
          <div class="premium-details">
            You've already got premium until: {getEndDate(0)}
          </div>
        )}
      </div>
    </div>
  </Theme>
);
