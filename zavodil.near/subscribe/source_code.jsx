const price = "96000000000000000000000000";
const priceWholesale = "84000000000000000000000000";
const yearInMs = 31556926000;

const referralId = props.referralId ?? "";

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
  type: "annually",
  purchasedPeriod: yearInMs,
  customAmount: 1,
  previousTimestamp,
  price,
  priceWholesale,
  buyOption: "myself",
  referralUrl: `https://near.social/zavodil.near/widget/subscribe?referralId=${context.accountId}`,
});

const isGift = () => state.buyOption == "gift" && state.recepientAccountId;

const previousTimestampString = Social.get(
  `premium.social.near/badge/premium/accounts/${
    isGift() ? state.recepientAccountId : context.accountId
  }`,
  "final"
);

const previousTimestamp = previousTimestampString
  ? Number(previousTimestampString)
  : null;

if (state.previousTimestamp != previousTimestamp) {
  State.update({
    previousTimestampExpired: previousTimestamp <= Date.now(),
    previousTimestamp,
  });
}

if (state.theme === undefined) {
  const css = fetch(
    "https://ipfs.near.social/ipfs/bafkreiaglrponkowprlfu2y7kcxmpxbnca224aj7zqgaea3c7k7j55b73a"
  ).body;
  if (!css) return "";

  State.update({
    theme: styled.div`${css}
  `,
  });
}

const check = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <g>
      <path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path>
    </g>
  </svg>
);

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
  const args = { name: "premium" };
  if (isGift()) {
    args.receiver_id = getBuyerAccountId();
    args.referral_id = context.accountId;
  } else if (referralId) {
    args.referral_id = referralId;
  }
  Near.call("premium.social.near", "purchase", args, gas, deposit);
};

const convertNearToMs = (amount) => {
  const amountYocto = Big(10).pow(24).mul(Big(amount));
  const priceRegular = Big(state.price);
  const priceWholesale = Big(state.priceWholesale);

  const price = amountYocto.gt(priceWholesale) ? priceWholesale : priceRegular;

  const res = amountYocto.mul(Big(yearInMs)).div(price).toFixed(0);

  return Number(res);
};

const updateBuyOption = (e) => {
  State.update({ buyOption: e.target.id });
};

const getBuyerAccountId = () => {
  return state.buyOption == "gift"
    ? state.recepientAccountId
    : context.accountId;
};

const getBuyer = () => {
  return state.buyOption == "gift"
    ? state.recepientAccountId ?? "Recepient"
    : "You";
};

const SaveToClipboard = () => {
  clipboard.writeText(state.referralUrl).then(() => {
    State.update({ copied: true });
  });
};

const features = [
  "Premium blue checkmark",
  "Posts featured in the default feed",
  <>
    Access to the link shortener{" "}
    <a href="https://near.fm/" target="_black">
      near.fm
    </a>
  </>,
  "Increased referral commission",
  "Transfer of premium subscription between accounts",
];

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

        <div class="premium-description">
          <h6>Enhanced Experience</h6>
          {features.map((item) => (
            <div class="d-flex flex-row">
              <div class="flex-grow-1">{item}</div>
              <div>{check}</div>
            </div>
          ))}
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

        <div class="mx-auto" style={{ width: "150px" }}>
          <div class="purchase-options">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="buy-options"
                id="myself"
                checked={state.buyOption === "myself"}
                onClick={updateBuyOption}
              />
              <label class="form-check-label" for="myself">
                Buy for myself
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="buy-options"
                id="gift"
                checked={state.buyOption === "gift"}
                onClick={updateBuyOption}
              />
              <label class="form-check-label" for="gift">
                Buy as a gift
              </label>
            </div>
          </div>
        </div>
        {state.buyOption == "gift" && (
          <div class="mx-auto mt-2" style={{ width: "300px" }}>
            <div class="mb-3">
              <label for="recepientAccountId" class="form-label">
                Provide recipient's NEAR account:
              </label>
              <input
                type="text"
                class="form-control"
                id="recepientAccountId"
                placeholder="name.near"
                value={state.recepientAccountId}
                onChange={(e) =>
                  State.update({ recepientAccountId: e.target.value })
                }
              />
            </div>
          </div>
        )}

        <div class={`action ${!getBuyerAccountId() ? "disabled" : ""}`}>
          {state.type !== "custom" && (
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
          )}

          {state.type === "custom" && (
            <div class="subscribe-amount-block">
              <div class="subscribe-amount-text">Enter amount:</div>
              <input
                type="text"
                class="form-control subscribe-amount"
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
          )}
        </div>

        {state.purchasedPeriod > 0 && (
          <div class="premium-details">
            {getBuyer()} will have premium until
            {getEndDate(state.purchasedPeriod)}
          </div>
        )}
        {state.purchasedPeriod == 0 && state.previousTimestamp && (
          <div class="premium-details">
            {state.previousTimestampExpired
              ? `Your prior premium subscription lasped on `
              : `${getBuyer()}'ve already got premium until`}
            {getEndDate(0)}
          </div>
        )}

        <div class="card mx-auto mt-3" style={{ width: "75%" }}>
          <div class="card-body">
            <h6 class="card-title">Preview</h6>
            <Widget
              loading={""}
              src="mob.near/widget/Profile.ShortInlineBlock"
              props={{
                isPremium: true,
                accountId: getBuyerAccountId(),
              }}
            />
          </div>
        </div>

        {!state.showReferral && (
          <div class="mt-4 text-center">
            <button
              type="button"
              onClick={() => State.update({ showReferral: true })}
              class="btn btn-outline-success"
            >
              Premium referral program
            </button>
          </div>
        )}

        {state.showReferral && (
          <div class="card mt-4 mx-auto" style={{ width: "100%" }}>
            <div class="card-header">Join the referral program!</div>
            <div class="card-body">
              <p>
                Invite your friends to purchase premium and instantly receive
                rewards in NEAR when they subscribe to premium.
              </p>

              <ul>
                <li>
                  Commission for referral rewards: 10% (increases to 15% if the
                  referrer has an active premium).
                </li>
                <li>
                  Referral commission will be paid on all subsequent purchases
                  by the invited user in the future.
                </li>
                <li>
                  If you gift premium to your friend, you will be automatically
                  registered as their referrer.
                </li>
              </ul>

              <label for="invite-url" class="form-label">
                Your invite URL:
              </label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="invite-url"
                  value={state.referralUrl}
                  aria-describedby="save-to-clipboard"
                />
                <OverlayTrigger
                  placement="auto"
                  overlay={
                    <Tooltip>
                      {state.copied ? "Copied!" : "Copy to clipboard"}
                    </Tooltip>
                  }
                >
                  <button
                    class="input-group-text"
                    id="save-to-clipboard"
                    onClick={SaveToClipboard}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      style={{ width: "1em", marginTop: "-0.2em" }}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="14" rx="2" ry="2" width="14" x="8" y="8" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  </button>
                </OverlayTrigger>
              </div>
              <div>
                A widget for tracking referral statistics will be available
                soon.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </Theme>
);
