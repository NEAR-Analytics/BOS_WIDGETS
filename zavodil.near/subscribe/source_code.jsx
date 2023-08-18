const previousTimestampString = Social.get(
  `premium.social.near/badge/premium/accounts/${context.accountId}`,
  "final"
);

const previousTimestamp = previousTimestampString
  ? Number(previousTimestampString)
  : null;

const price = "96000000000000000000000000";
const priceWholesale = "84000000000000000000000000";

const yearInMs = 31556926000;

const getEndDate = (purchasedPeriod) => {
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

if (state.theme === undefined) {
  const css = fetch(
    "https://ipfs.near.social/ipfs/bafkreickjanlocwi253a2qcqiep6dfh4pnvytiwdmi3jv4b7wylcu4nc3u"
  ).body;
  if (!css) return "";

  State.update({ theme: styled.div`${css}` });
}

const Theme = state.theme;

const customOnChange = (e) => {
  const customAmount = isNumber(e.target.value)
    ? parseFloat(e.target.value)
    : "";
  State.update({
    purchasedPeriod: customAmount ? convertNearToMs(customAmount) : 0,
    customAmount,
  });
};

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const deposit = (amount) => {
  const gas = 200000000000000;
  const deposit = new Big(amount);
  Near.call(
    "premium.social.near",
    "purchase",
    { name: "premium" },
    gas,
    deposit
  );
};

const convertNearToMs = (amount) => {
  const amountYocto = Big(10).pow(24).mul(Big(amount));
  const priceRegular = Big(state.price);
  const priceWholesale = Big(state.priceWholesale);

  const price = amountYocto.gt(priceWholesale) ? priceWholesale : priceRegular;

  const res = amountYocto.mul(Big(yearInMs)).div(price).toFixed(0);

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
              src="https://ipfs.near.social/ipfs/bafkreihfjwfijsedf4r75iwn77yua5ey3ufv6swgcjupqeigh2fw4wqm4a"
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
                Year<div class="sale">SAVE 12%</div>
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
              <div class="menu-item-text">Month</div>
            </div>
            <div
              class={`menu-item ${state.type == "custom" ? "menu-active" : ""}`}
              onClick={() =>
                State.update({ type: "custom", purchasedPeriod: 0 })
              }
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
                  <div onClick={() => deposit(state.price / 12)}>
                    8 NEAR / month
                  </div>
                ) : (
                  <div onClick={() => deposit(state.priceWholesale)}>
                    <span class="old-price">96 NEAR</span> 84 NEAR / year
                  </div>
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
                onChange={customOnChange}
              />
              <div class="subscribe">
                <div
                  class={`subscribe-text ${
                    state.customAmount >= 1 ? "" : "disabled"
                  } `}
                  onClick={() =>
                    deposit(
                      Big(state.customAmount).mul(Big(10).pow(24)).toFixed()
                    )
                  }
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
