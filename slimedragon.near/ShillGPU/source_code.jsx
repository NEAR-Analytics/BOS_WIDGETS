let contractId = "v1.shillgpu.near";
let accountId = context.accountId;
let debugMode = !!props.debug ?? false;
const MAX_MESSAGE_LENGTH = 600;

if (props.referral_id && props.referral_id !== Storage.get("referral_id")) {
  Storage.set("referral_id", props.referral_id);
  console.log("referral_id", Storage.get("referral_id"));
}

let allTokens = {
  "intel.tkn.near": {
    name: "INTEAR",
    decimals: 18,
    image:
      "data:image/png;base64,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",
  },
  "radeonear.tkn.near": {
    name: "RADEONEAR",
    decimals: 18,
    image:
      "data:image/jpeg;base64,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",
  },
  "nearnvidia.near": {
    name: "NEARVIDIA",
    decimals: 8,
    image:
      "data:image/jpeg;base64,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",
  },
};

if (state === undefined) {
  State.init({
    selectedTab: !!accountId ? "Main" : "About",
    showUnstakeForm: false,
    buyCreditAmount: 0.1,
    withdrawCreditAmount: 0,
    nonce: 0,
    pauseNonce: false,
    requestFromAccountId: props.requestFrom,
    tokenInMessage: "",
    tokenOutMessage: "",
    refLink: accountId
      ? `https://near.social/slimedragon.near/widget/ShillGPU?referral_id=${accountId}`
      : null,
  });

  // Auto refresh orders and account
  setInterval(() => {
    State.update((state) => ({
      ...state,
      nonce:
        accountId && !state.pauseNonce && !state.requestFrom
          ? state.nonce + 1
          : state.nonce,
    }));
  }, 1000);
}

const getTokenPrices = () => {
  if (!state.pricesNonce || state.pricesNonce + 10 <= state.nonce) {
    asyncFetch("https://indexer.ref.finance/list-token-price").then((r) => {
      State.update({
        pricesNonce: state.nonce ?? 0,
        prices: JSON.parse(r?.body ?? "{}"),
      });
    });
  }
};

const getUserBalance = (tokenId) => {
  Near.asyncView(tokenId, "ft_balance_of", {
    account_id: accountId,
  }).then((balance) => {
    if (balance !== null) {
      let userBalances = state.userBalances ?? {};
      userBalances[tokenId] = getFtBalance(tokenId, balance ?? 0);
      State.update({ userBalances });
    }
  });
};

const getUserRequestResponse = (requestAccountId) => {
  if (requestAccountId) {
    Near.asyncView(contractId, "get_user_request_response", {
      account_id: requestAccountId,
    }).then((userRequestResponse) => {
      if (userRequestResponse) {
        if (userRequestResponse?.request?.token_in) {
          userRequestResponse.request.tokenInName =
            allTokens[userRequestResponse.request["token_in"]].name;
        }
        if (userRequestResponse?.request?.token_out) {
          userRequestResponse.request.tokenOutName =
            allTokens[userRequestResponse.request["token_out"]].name;
        }

        console.log("userRequestResponse", userRequestResponse);
        if (
          userRequestResponse?.response.ok &&
          userRequestResponse?.response.text
        ) {
          userRequestResponse.response.shillAccepted =
            /SHILL_ACCEPTED_.+$/g.test(userRequestResponse.response.text);
          userRequestResponse.response.shillDeclined =
            userRequestResponse.response.text.endsWith("SHILL_DECLINED");
          userRequestResponse.response.textCleaned =
            userRequestResponse.response.text
              .replace("SHILL_ACCEPTED_HALF", "")
              .replace("SHILL_ACCEPTED_QUARTER", "")
              .replace("SHILL_ACCEPTED_EIGHTH", "")
              .replace("SHILL_ACCEPTED_SIXTEENTH", "")
              .replace("SHILL_DECLINED", "")
              .trim();

          if (
            userRequestResponse.response.text.endsWith("SHILL_ACCEPTED_HALF")
          ) {
            userRequestResponse.response.verdict = "Shill accepted!!!";
            userRequestResponse.response.color = "#00a951";
          } else if (
            userRequestResponse.response.text.endsWith("SHILL_ACCEPTED_QUARTER")
          ) {
            userRequestResponse.response.verdict =
              "Shill accepted by half amount!";
            userRequestResponse.response.color = "#00a951";
          } else if (
            userRequestResponse.response.text.endsWith("SHILL_ACCEPTED_EIGHTH")
          ) {
            userRequestResponse.response.verdict =
              "Shill accepted by quoter amount";
            userRequestResponse.response.color = "#00a951";
          } else if (
            userRequestResponse.response.text.endsWith(
              "SHILL_ACCEPTED_SIXTEENTH"
            )
          ) {
            userRequestResponse.response.verdict =
              "Shill accepted by eighth amount";
            userRequestResponse.response.color = "#00a951";
          } else if (
            userRequestResponse.response.text.endsWith("SHILL_DECLINED")
          ) {
            userRequestResponse.response.verdict = "Shill declined...";
            userRequestResponse.response.color = "#e02e49";
          }
        } else if (userRequestResponse?.response.ok == false) {
          userRequestResponse.response.verdict = "Shill Failed";
          userRequestResponse.response.textCleaned =
            userRequestResponse.response.text;
          userRequestResponse.response.color = "#e02e49";
        } else {
          userRequestResponse.response = { verdict: "Pending" };
          userRequestResponse.response.color = "#36aeb3";
        }
      }

      State.update({ userRequestResponse });
    });
  }
};

let whitelist = Near.view(contractId, "get_whitelist");
let pools = Near.view(contractId, "get_pools");
let user_pools = [],
  user_credits_data = [];
if (accountId) {
  user_pools = Near.view(contractId, "get_pools_for_user", {
    account_id: accountId,
  });
  user_credits_data = Near.view(contractId, "get_credits", {
    account_id: accountId,
  });
}
let requestCost = Near.view(contractId, "get_request_cost");

useEffect(() => {
  if (accountId && state.nonce % 10 === 0) {
    (whitelist ?? []).map((t) => getUserBalance(t));
  }

  getTokenPrices();
  getUserRequestResponse(state.requestFromAccountId ?? accountId);
}, [state.nonce]);

if (!whitelist || !pools || !requestCost) {
  return "Loading";
}

getUserRequestResponse(state.requestFromAccountId ?? accountId);

const userCredits = user_credits_data[0];
const userFreeEntryAvailable = user_credits_data[1];
const userCreditsAvailable =
  userFreeEntryAvailable || Number(userCredits ?? 0) > 0;

const request = () => {
  if (state.tokenIn && state.tokenOut) {
    let args = {
      request: {
        token_in: state.tokenIn,
        token_out: state.tokenOut,
        token_in_message: state.tokenInMessage ?? "",
        token_out_message: state.tokenOutMessage ?? "",
      },
    };

    if (Storage.get("referral_id")) {
      args.referral_id = Storage.get("referral_id");
    }

    Near.call(
      contractId,
      "request",
      args,
      "300000000000000",
      state.attachNearToEveryRequest || !userCreditsAvailable ? requestCost : 0
    );
  }
};

const deposit = () => {
  if (state.depositAmount && state.depositToken) {
    let amount = Big(state.depositAmount)
      .mul(Big(10).pow(allTokens[state.depositToken].decimals))
      .toFixed();
    Near.call(
      state.depositToken,
      "ft_transfer_call",
      {
        receiver_id: contractId,
        amount,
        msg: '"Deposit"',
      },
      "50000000000000",
      "1"
    );
  }
};

const getFtBalance = (tokenId, balance, decimals) => {
  if (decimals == undefined) {
    decimals = 10;
  }
  if (balance === undefined || balance === null) {
    return "Undefined";
  }
  return Number(
    Big(balance).div(Big(10).pow(allTokens[tokenId].decimals)).toFixed(decimals)
  );
};

const getFtWithDecimals = (tokenId, balance) => {
  if (balance === undefined || balance === null) {
    return "0";
  }
  return Big(balance).mul(Big(10).pow(allTokens[tokenId].decimals)).toFixed();
};

const getNearBalance = (balance, decimals) => {
  if (decimals == undefined) {
    decimals = 10;
  }
  if (balance === undefined) {
    return "Undefined";
  }
  let res = Big(balance).div(Big(10).pow(24)).toFixed(decimals);
  return Number(res);
};

const getYoctoNear = (balance) => {
  if (!balance) return 0;
  return Big(balance).mul(Big(10).pow(24)).toFixed();
};

const withdrawCredit = () => {
  if (state.withdrawCreditAmount) {
    Near.call(
      contractId,
      "withdraw_credits",
      { amount: getYoctoNear(state.withdrawCreditAmount) },
      "30000000000000"
    );
  }
};

const buyCredit = () => {
  if (state.buyCreditAmount) {
    Near.call(
      contractId,
      "buy_credits",
      {},
      "30000000000000",
      getYoctoNear(state.buyCreditAmount)
    );
  }
};

const unstake = () => {
  if (state.unstakeAmount) {
    Near.call(
      contractId,
      "unstake",
      {
        token_id: state.unstakeTokenId,
        amount: getFtWithDecimals(state.unstakeTokenId, state.unstakeAmount),
      },
      "70000000000000"
    );
  }
};

const css = `.balances{
cursor: pointer;
display: flex;
flex-direction: row;
-webkit-box-align: center;
align-items: center;
padding: 0.3em 0.65em;
margin-right: 0.5em;
gap: 0.5em;
background: #6c757d;
border-radius: 14px;
flex: 0 0 auto;
order: 0;
-webkit-box-flex: 0;
font-style: normal;
font-weight: 600;
font-size: 0.7em;
line-height: 1em;
color: white;
}

h2 {
font-style: normal;
font-weight: 700;
font-size: 2em;
line-height: 36px;
color: #000000;
margin:0;
}

h3 {
font-style: normal;
font-weight: 700;
font-size: 1.5em;
line-height: 36px;
color: #000000;
margin:0;
}

h4{
font-style: normal;
font-weight: 700;
font-size: 1.2em;    
color: #000000;
margin:0;
}

.main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 0.75em;
    gap: 0.75em;

    @media (max-width: 600px) {
    flex-direction: column;
    }
}

.main-title {
font-style: normal;
font-weight: 700;
font-size: 1.75em;
color: #101828;

@media screen and (max-width: 768px) {
font-size: 1.25em;
}
}

.main-subtitle {
ont-style: normal;
font-weight: 400;
font-size: 1.3em;
line-height: 1.5em;
color: #475467;

@media screen and (max-width: 768px) {
font-size: 1em;
}
}

.tabs-container{
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start;
overflow: hidden;
border-bottom: 1px solid #eceef0;
width: 100%;
padding: 0;
}


.olcards, .olcards * {
margin: 0;
padding: 0;
box-sizing: border-box;
}

.olcards {
list-style: none;
counter-reset: cardCount;
font-family: sans-serif;
display: flex;
flex-direction: column;
--cardsGap: 1rem;
gap: var(--cardsGap);
padding-bottom: var(--cardsGap);
}

.olcards li {
counter-increment: cardCount;
display: flex;
color: white;
--labelOffset: 1rem;
--arrowClipSize: 1.5rem;
margin-top: var(--labelOffset);
}

.olcards li .icon {
grid-area: icon;
align-self: start;
font-size: 2em;
}

.olcards li .content .title {
grid-area: title;
font-size: 1.25em;  
}

.olcards li .content .text {
grid-area: text;
}
`;

const Notice = styled.div`    
padding: ${(props) =>
  props.isSmall
    ? `7px 7px 7px ${props.paddingLeft ?? "7px"}!important`
    : `15px 15px 15px ${props.paddingLeft ?? "15px"}!important`};
font-size: ${(props) => (props.isSmall ? "90%" : "100%")};
background-color: #fafafa;
border-left: 6px solid #7f7f84;
margin-bottom: ${(props) => `${props.marginBottom ?? "10px"}`};
-webkit-box-shadow: 0 5px 8px -6px rgba(0,0,0,.2);
-moz-box-shadow: 0 5px 8px -6px rgba(0,0,0,.2);
box-shadow: 0 5px 8px -6px rgba(0,0,0,.2);
border-color: ${(props) => props.cardColor};
}
`;

const MyListItem = styled.li`
.icon img {
width: 32px;
}
.content::before {
content: "";
position: absolute;
width: var(--labelOffset);
height: var(--labelOffset);
background: ${(props) => props.cardColor};
left: 0;
bottom: 0;
clip-path: polygon(0 0, 100% 0, 0 100%);
filter: brightness(0.75);  
display: ${(props) => props.displayNumber};
}

&::before {
content: counter(cardCount, decimal-leading-zero);
background: ${(props) => props.backColor};
color: ${(props) => props.cardColor};
font-size: 2em;
font-weight: 700;
transform: translateY(calc(-1 * var(--labelOffset)));
margin-right: calc(-1 * var(--labelOffset));
z-index: 1;
display: flex;
justify-content: center;
align-items: center;
padding-inline: 0.5em;
display: ${(props) => props.displayNumber};
}

.content::after {
content: "";
position: absolute;
height: var(--cardsGap);
width: var(--cardsGap);
background: linear-gradient(to right, rgba(0, 0, 0, 0.25), transparent 50%);
left: 0;
top: 100%;
display: ${(props) => props.displayNumber};
}

.content {
background-color: ${(props) => props.cardColor};
--inlinePadding: 1em;
--boxPadding: 0.5em;
display: grid;
padding: var(--boxPadding) calc(var(--inlinePadding) + var(--arrowClipSize))
var(--boxPadding) calc(var(--inlinePadding) + var(--labelOffset));
grid-template-areas:    "icon text";
align-items: center;
gap: 0.25em 1em;
clip-path: polygon(0 0, calc(100% - var(--arrowClipSize)) 0, 100% 50%, calc(100% - var(--arrowClipSize)) 100%, calc(100% - var(--arrowClipSize)) calc(100% + var(--cardsGap)), 0 calc(100% + var(--cardsGap)));
position: relative;
}
`;

const TabItem = styled.a`
position: relative;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
cursor: pointer;
padding: 1em;
margin: 0;
text-decoration: none;
transition: all 0.2s ease-in-out;
border-bottom: 4px solid
${({ selected }) => (selected ? "#0091ff" : "transparent")};
font-style: normal;
font-weight: 600;
font-size: 0.9em;
line-height: 1em;
color: ${({ selected }) => (selected ? "#11181c" : "#687076")};

&:hover {
color: #667085;
text-decoration: none;
background-color: #f9fafb;
}

span {
margin-left: 0.25em;
margin-right: ${({ hasCount }) => (hasCount ? "1.75em" : "0")};
}  
`;

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}    
`,
  });
}

const Theme = state.theme;

const navTabs = !!accountId
  ? ["Main", "Credits", "Pools", "Earn", "About"]
  : ["Main", "Pools", "Earn", "About"];

let now = Date.now();
let isLatestResponseExpired =
  (state.userRequestResponse?.request_timestamp ?? 0) / 1000000 +
    10 * 60 * 1000 >
  now;

let showLatestResponse = !state.requestFromAccountId
  ? isLatestResponseExpired
  : true;

console.log("showLatestResponse", showLatestResponse);

const timestampBeforeNow = (timestamp) => {
  let date = timestamp / 1000000;
  let now = Date.now();
  console.log("date", date, now);
  return date <= now;
};

const timestampToHumanDate = (timestamp) => {
  var date = new Date(timestamp / 1000000);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear().toString().slice(-2);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return day + "/" + month + "/" + year + " " + hours + ":" + minutes;
};

const copySvg = (
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
);

console.log("pools", pools, user_pools);

let tokenOutBalance = null;
if (state.tokenOut && user_pools) {
  let tokenOutPool = (user_pools ?? []).filter((p) => p[0] == state.tokenOut);
  if (tokenOutPool.length) {
    tokenOutBalance = getFtBalance(
      tokenOutPool[0]?.[0],
      tokenOutPool[0]?.[1]?.user_balance,
      2
    );

    if (tokenOutBalance == "0.00" || tokenOutBalance == 0) {
      tokenOutBalance = null;
    }
  }
}

const timeSince = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

const latestResponseBlock = (
  <div
    id="latestResponse"
    class="card"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    style={{ width: "100%" }}
  >
    {state.userRequestResponse?.response?.verdict && (
      <div class="card-header">
        <h4 class="me-auto">{state.userRequestResponse?.response?.verdict}</h4>
      </div>
    )}
    <div class="card-body">
      <Notice
        isSmall={1}
        paddingLeft="10px"
        marginBottom="1rem"
        cardColor={state.userRequestResponse?.response?.color}
      >
        {`👀 ${!!state.requestFromAccountId ? "" : "Your"} Last Request at
                ${new Date(
                  (state.userRequestResponse?.["request_timestamp"] ?? 0) /
                    1000000
                ).toLocaleTimeString()}`}
      </Notice>
      <ol class="olcards">
        <MyListItem
          cardColor={state.userRequestResponse?.response?.color}
          displayNumber="none"
          style={{ marginTop: 0 }}
        >
          <div class="content" style={{ paddingLeft: "1rem" }}>
            <div class="icon">
              <img
                src={
                  allTokens[state.userRequestResponse?.request?.token_in].image
                }
              />
            </div>
            <div class="text">
              <div>
                <strong>{`Sell:
                    ${state.userRequestResponse?.request?.tokenInName}`}</strong>
              </div>

              <div>
                {state.userRequestResponse.request["token_in_message"] ??
                  "No Message"}
              </div>
            </div>
          </div>
        </MyListItem>
        <MyListItem
          cardColor={state.userRequestResponse?.response?.color}
          displayNumber="none"
          style={{ marginTop: 0 }}
        >
          <div class="content" style={{ paddingLeft: "1rem" }}>
            <div class="icon">
              <img
                src={
                  allTokens[state.userRequestResponse?.request?.token_out].image
                }
              />
            </div>
            <div class="text">
              <div>
                <strong>{`Buy:
                   ${state.userRequestResponse?.request?.tokenOutName}`}</strong>
              </div>
              <div>
                {state.userRequestResponse.request["token_out_message"] ??
                  "No Message"}
              </div>
            </div>
          </div>{" "}
        </MyListItem>
        {state.userRequestResponse?.response &&
          (state.userRequestResponse?.response?.ok == false ||
            state.userRequestResponse?.response?.shillAccepted ||
            state.userRequestResponse?.response?.shillDeclined) && (
            <MyListItem
              cardColor={state.userRequestResponse?.response?.color}
              displayNumber="none"
              style={{ marginTop: 0 }}
            >
              <div class="content" style={{ paddingLeft: "1rem" }}>
                <div class="icon">{`${
                  state.userRequestResponse?.response?.shillAccepted
                    ? `🤑`
                    : state.userRequestResponse?.response?.shillDeclined
                    ? `🤯`
                    : `🤨`
                }`}</div>
                <div class="text">
                  <div>
                    <strong>ShillGPU respond:</strong>
                  </div>
                  <div>{state.userRequestResponse?.response?.textCleaned}</div>
                </div>
              </div>
            </MyListItem>
          )}
        {state.userRequestResponse?.response?.verdict !== "Pending" &&
          state.userRequestResponse?.amount_in &&
          state.userRequestResponse?.amount_out && (
            <Notice
              isSmall={1}
              paddingLeft="10px"
              cardColor={state.userRequestResponse?.response?.color}
            >
              🚀
              {`${getFtBalance(
                state.userRequestResponse?.request?.token_in,
                state.userRequestResponse?.amount_in,
                2
              )} ${
                state.userRequestResponse?.request?.tokenInName
              } was sold to buy ${getFtBalance(
                state.userRequestResponse?.request?.token_out,
                state.userRequestResponse?.amount_out,
                2
              )} ${state.userRequestResponse?.request?.tokenOutName}`}
            </Notice>
          )}

        {state.userRequestResponse?.response?.verdict &&
          state.userRequestResponse?.response?.shillDeclined === false &&
          state.userRequestResponse?.response?.verdict !== "Pending" &&
          !state.userRequestResponse?.amount_in &&
          !state.userRequestResponse?.amount_out && (
            <Notice
              isSmall={1}
              paddingLeft="10px"
              cardColor={state.userRequestResponse?.response?.color}
            >
              {" "}
              🚀Swapping on AMM...
            </Notice>
          )}
      </ol>
    </div>
  </div>
);

const headerBlock = (
  <div id="container-header">
    <div class="main-header align-items-start">
      <img
        src="https://ipfs.near.social/ipfs/bafkreicl47xwc3ggn5fcbaqxweohl7nmdl5nzirjprmhjuskglagta3nja"
        alt="ShillGPU"
        title="ShillGPU"
        class="img-fluid"
      />
      <div class="mt-lg-3  d-flex">
        {!!accountId && (
          <div
            class="balances"
            onClick={() => {
              State.update({ selectedTab: "Credits" });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              class="bi bi-wallet"
              viewBox="0 0 16 16"
            >
              <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
            </svg>
            <span>
              {" "}
              {!!userFreeEntryAvailable && <div>Free request available!</div>}
              {!userFreeEntryAvailable && (
                <div class="text-white">
                  Credits: ${getNearBalance(userCredits, 4)}
                </div>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
    <div class="main-title">Shill tokens to the AI bot and earn rewards!</div>
    <div class="main-subtitle">
      The first <strong>AI</strong> that manages{" "}
      <strong>GPU coin treasuries</strong> and rebalances them upon{" "}
      <strong>your influence</strong>.
    </div>
  </div>
);

if (!!state.requestFromAccountId) {
  return (
    <Theme>
      {headerBlock}
      <div>
        <div
          class="toast show mt-2"
          style={{ width: "100%" }}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header">
            <strong class="me-auto">
              Latest response from{" "}
              <Widget
                src="mob.near/widget/N.ProfileLine"
                props={{ accountId: state.requestFromAccountId }}
              />
            </strong>
            {state.userRequestResponse && (
              <small>
                {timeSince(
                  (state.userRequestResponse?.["request_timestamp"] ?? 0) /
                    1000000
                )}{" "}
                ago
              </small>
            )}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => {
                State.update({ requestFromAccountId: null });
              }}
            ></button>
          </div>

          <div class="toast-body">
            {state.userRequestResponse ? (
              latestResponseBlock
            ) : (
              <div>Not found</div>
            )}
          </div>
        </div>
      </div>
    </Theme>
  );
}

return (
  <Theme>
    {headerBlock}

    <div class="tabs-container mt-2 mb-3">
      {navTabs.map((tab) => (
        <TabItem
          selected={state.selectedTab == tab}
          href="#"
          onClick={() =>
            State.update({
              selectedTab: tab,
            })
          }
          key={tab}
        >
          <span>{tab}</span>
        </TabItem>
      ))}
    </div>

    {state.selectedTab == "About" && (
      <div id="about">
        <div class="card  mb-3">
          <div class="card-header">
            <h4>How it works</h4>
          </div>

          <div class="card-body">
            <ol class="olcards">
              <MyListItem cardColor="#e02e49" backColor="#eee">
                <div class="content">
                  <div class="icon">🚀</div>
                  <div class="text">
                    Shill a promising GPU vendor, and the AI bot will immidately
                    buy it on Ref Finance
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#e02e49" backColor="#eee">
                <div class="content">
                  <div class="icon">🤑</div>
                  <div class="text">
                    <a
                      class="text-white text-decoration-underline"
                      href="#"
                      onClick={() => State.update({ selectedTab: "Earn" })}
                    >
                      Earn GPU coins
                    </a>{" "}
                    if you have previously provided liquidity to the pool for
                    the token purchased by the ShillGPU.
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#e02e49" backColor="#eee">
                <div class="content">
                  <div class="icon">👌</div>
                  <div class="text">
                    The bot does not charge any fees for exchanges. However,
                    there is a {getNearBalance(requestCost, 2)} NEAR fee per
                    request, which covers the expenses associated with accessing
                    various AI models.
                  </div>
                </div>
              </MyListItem>
            </ol>
          </div>
        </div>

        <div class="card  mb-3">
          <div class="card-header">
            <h4>How to get started</h4>
          </div>
          <div class="card-body">
            <ol class="olcards mb-4">
              <MyListItem cardColor="#f15f0e" backColor="#eee">
                <div class="content">
                  <div class="icon">💸</div>
                  <div class="text">
                    <a
                      class="text-white text-decoration-underline"
                      href="#"
                      onClick={() => State.update({ selectedTab: "Credits" })}
                    >{`Deposit`}</a>{" "}
                    some NEAR to the smart virtual balance (you can withdraw it
                    at any time)
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#f15f0e" backColor="#eee">
                <div class="content">
                  <div class="icon">😎</div>
                  <div class="text">
                    Go to{" "}
                    <a
                      class="text-white text-decoration-underline"
                      href="#"
                      onClick={() => State.update({ selectedTab: "Main" })}
                    >{`Shillbox`}</a>
                    and make a request to the AI bot and convince why one GPU
                    coin should be exchanged for another GPU coin.
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#f15f0e" backColor="#eee">
                <div class="content">
                  <div class="icon">😇</div>
                  <div class="text">
                    When confirming the first request transaction, make sure you
                    to toggle on the option to "Don't ask again for sending
                    similar ..." at the bottom
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#f15f0e" backColor="#eee">
                <div class="content">
                  <div class="icon">👍</div>
                  <div class="text">
                    If your request was convincing, the ShillGPU will exchange
                    tokens according to your command on the AMM, rebalancing the
                    treasury. Depending on how convincing your arguments were,
                    the ShillGPU may exchange tokens from 1/16 to 1/2 of the
                    pool.
                  </div>
                </div>
              </MyListItem>
            </ol>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-header">
            <h4>Whitelisted tokens</h4>
          </div>

          <div class="card-body">
            <ol class="olcards">
              {whitelist.map((t) => (
                <MyListItem cardColor="#36aeb3" backColor="#eee">
                  <div class="content">
                    <div class="icon">
                      <img src={allTokens[t].image} />
                    </div>
                    <div class="text">${allTokens[t].name}</div>
                  </div>
                </MyListItem>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )}

    {state.selectedTab == "Main" && (
      <div id="shillbox">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="card  mb-3">
                <div class="card-header">
                  <h4>Shill Box</h4>
                </div>

                <div class="card-body">
                  {!userCreditsAvailable && (
                    <div class="alert alert-warning" role="alert">
                      We strongly recommend{" "}
                      <a
                        href="#"
                        onClick={() => State.update({ selectedTab: "Credits" })}
                      >
                        deposit NEAR
                      </a>{" "}
                      in ShillGPU to avoid confirming each transaction in the
                      wallet and to enhance user experience.
                    </div>
                  )}

                  <div class="row g-3 align-items-center mb-3">
                    <div class={!showLatestResponse ? `col-2` : `col-4`}>
                      <label for="tokenToSale" class="col-form-label">
                        Token to sale:
                      </label>
                    </div>
                    <div class="col-auto">
                      <div class="dropdown">
                        <button
                          class="btn btn-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          id="tokenToSale"
                        >
                          {state.tokenIn
                            ? allTokens[state.tokenIn].name
                            : "Select token"}
                        </button>
                        <ul class="dropdown-menu">
                          {whitelist.map((t) => (
                            <li>
                              <a
                                class={`dropdown-item ${
                                  state.tokenIn == t ? "active" : ""
                                } ${state.tokenOut == t ? "disabled" : ""}`}
                                href="#"
                                onClick={() => {
                                  State.update({ tokenIn: t });
                                }}
                              >
                                {allTokens[t].name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="row g-3 align-items-center mb-3">
                    <div class={!showLatestResponse ? `col-2` : `col-4`}>
                      <label for="tokenToBuy" class="col-form-label">
                        Token to buy:
                      </label>
                    </div>
                    <div class="col-auto">
                      <div class="dropdown">
                        <button
                          class="btn btn-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          id="tokenToBuy"
                        >
                          {state.tokenOut
                            ? allTokens[state.tokenOut].name
                            : "Select token"}
                        </button>
                        <ul class="dropdown-menu">
                          {whitelist.map((t) => (
                            <li>
                              <a
                                class={`dropdown-item ${
                                  state.tokenOut == t ? "active" : ""
                                } ${state.tokenIn == t ? "disabled" : ""}`}
                                href="#"
                                onClick={() => {
                                  State.update({ tokenOut: t });
                                }}
                              >
                                {allTokens[t].name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {state.tokenOut && !tokenOutBalance && (
                      <Notice cardColor="#FEAF20">
                        You haven't deposit {allTokens[state.tokenOut].name}{" "}
                        yet.
                        <a
                          href="#"
                          onClick={() => State.update({ selectedTab: "Pools" })}
                        >{`Provide liquidity to the pool`}</a>
                        and whenever ShillGPU purchases more
                        {`${allTokens[state.tokenOut].name},`} your balance in
                        the pool will grow.
                      </Notice>
                    )}
                  </div>

                  {state.tokenIn && (
                    <div class="row g-3 align-items-center mb-3">
                      <div class={!showLatestResponse ? `col-2` : `col-4`}>
                        <label for="tokenInMessage" class="form-label">
                          Why to sale {allTokens[state.tokenIn].name}?{" "}
                          <div>
                            <small>Optional</small>
                          </div>
                        </label>
                      </div>
                      <div class="col-8">
                        <div>
                          <textarea
                            class="form-control"
                            id="tokenInMessage"
                            rows="3"
                            onChange={(e) =>
                              State.update({ tokenInMessage: e.target.value })
                            }
                            value={state.tokenInMessage}
                          ></textarea>
                        </div>{" "}
                        {(state.tokenInMessage ?? "").length >
                          MAX_MESSAGE_LENGTH && (
                          <div class="text-secondary">Message is too long</div>
                        )}
                      </div>
                    </div>
                  )}
                  {state.tokenOut && (
                    <div class="row g-3 align-items-center mb-3">
                      <div class={!showLatestResponse ? `col-2` : `col-4`}>
                        <label for="tokenOutMessage" class="col-form-label">
                          Why to buy {allTokens[state.tokenOut].name}?{" "}
                          <div>
                            <small>Optional</small>
                          </div>
                        </label>
                      </div>
                      <div class="col-8">
                        <div>
                          <textarea
                            class="form-control"
                            id="tokenOutMessage"
                            rows="3"
                            onChange={(e) =>
                              State.update({ tokenOutMessage: e.target.value })
                            }
                            value={state.tokenOutMessage}
                          ></textarea>
                        </div>
                        {(state.tokenOutMessage ?? "").length >
                          MAX_MESSAGE_LENGTH && (
                          <div class="text-secondary">Message is too long</div>
                        )}
                      </div>
                    </div>
                  )}

                  {userFreeEntryAvailable && (
                    <Notice cardColor="#80D651" isSmall={1}>
                      <div class="text-secondary">
                        You have free request as a new user!{" "}
                      </div>
                    </Notice>
                  )}
                  {!accountId && (
                    <span role="button">
                      <button onClick={props.requestSignIn}>
                        Sign in to continue
                      </button>{" "}
                    </span>
                  )}
                  {!!accountId &&
                    !userFreeEntryAvailable &&
                    !userCreditsAvailable && (
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          checked={!userCreditsAvailable}
                          disabled={userCreditsAvailable}
                          id="attachNearToEveryRequest"
                          onChange={(e) => {
                            State.update({
                              attachNearToEveryRequest: e.target.checked,
                            });
                          }}
                        />
                        <label
                          class="form-check-label"
                          for="attachNearToEveryRequest"
                        >
                          Attach deposit to every request{" "}
                          {userCreditsAvailable && (
                            <span>(not recommeded)</span>
                          )}
                          {!userCreditsAvailable && (
                            <span>
                              (Not recommended.
                              <a
                                href="#"
                                onClick={() =>
                                  State.update({ selectedTab: "Credits" })
                                }
                              >
                                Deposit NEAR
                              </a>{" "}
                              to avoid wallet confirmation on every request)
                            </span>
                          )}
                        </label>
                      </div>
                    )}

                  {!!accountId && (
                    <>
                      <button
                        type="submit"
                        class={`btn btn-primary ${
                          state.tokenIn &&
                          state.tokenOut &&
                          state.tokenInMessage.length +
                            state.tokenOutMessage.length >
                            0 &&
                          (state.tokenInMessage ?? "").length <=
                            MAX_MESSAGE_LENGTH &&
                          (state.tokenOutMessage ?? "").length <=
                            MAX_MESSAGE_LENGTH
                            ? ""
                            : "disabled"
                        }`}
                        onClick={() => request()}
                      >
                        Submit
                      </button>

                      {!(state.tokenIn && state.tokenOut) && (
                        <div class="mt-2">
                          <Notice
                            isSmall={1}
                            paddingLeft="12px"
                            cardColor="#FEAF20"
                          >
                            Select tokens to shill: what to sale and what to buy
                          </Notice>
                        </div>
                      )}

                      {state.tokenIn &&
                        state.tokenOut &&
                        state.tokenInMessage.length +
                          state.tokenOutMessage.length ==
                          0 && (
                          <div class="mt-2">
                            <Notice
                              isSmall={1}
                              paddingLeft="12px"
                              cardColor="#FEAF20"
                            >
                              At least one message about tokens required
                            </Notice>
                          </div>
                        )}

                      <div class="mt-2">
                        <Notice
                          isSmall={1}
                          paddingLeft="12px"
                          cardColor="#FEAF20"
                        >
                          When confirming the first request transaction, make
                          sure you to toggle on the option to "Don't ask again
                          for sending similar ..." at the bottom
                        </Notice>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {showLatestResponse &&
              state.userRequestResponse?.["request_timestamp"] && (
                <div class="col">{latestResponseBlock}</div>
              )}
          </div>
        </div>
      </div>
    )}

    {state.selectedTab == "Pools" && (
      <div id="pools">
        <div class="container">
          <div class="row">
            {!!accountId && (
              <div class="col">
                <div class="card  mb-3">
                  <div class="card-header">
                    <h4>Deposit to pool</h4>
                  </div>
                  <div class="card-body">
                    <div class="row g-3 align-items-center mb-3">
                      <div class="col-4 col-md-2">
                        <label for="depositAmount" class="col-form-label">
                          Token
                        </label>
                      </div>
                      <div class="col-auto">
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {state.depositToken
                              ? allTokens[state.depositToken].name
                              : "Select token"}
                          </button>
                          <ul class="dropdown-menu">
                            {whitelist.map((t) => (
                              <li>
                                <a
                                  class={`dropdown-item ${
                                    state.depositToken == t ? "active" : ""
                                  }`}
                                  href="#"
                                  onClick={() => {
                                    State.update({ depositToken: t });
                                    getUserBalance(t);
                                  }}
                                >
                                  {allTokens[t].name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="row g-3 align-items-center mb-3">
                      <div class="col-4 col-md-2">
                        <label for="depositAmount" class="col-form-label">
                          Amount
                        </label>
                      </div>
                      <div class="col-auto">
                        <input
                          type="number"
                          class="form-control"
                          step="0.01"
                          id="depositAmount"
                          value={state.depositAmount}
                          onChange={(e) =>
                            State.update({ depositAmount: e.target.value })
                          }
                        />
                      </div>
                      <div class="col-auto">
                        {state.depositToken && (
                          <span
                            class="form-text"
                            role="button"
                            onClick={() =>
                              State.update({
                                depositAmount: Big(
                                  state.userBalances[state.depositToken] ?? 0
                                )
                                  .round(2, Big.roundDown)
                                  .toString(),
                              })
                            }
                          >
                            Your balance:{" "}
                            {Big(state.userBalances[state.depositToken] ?? 0)
                              .round(2, Big.roundDown)
                              .toString()}
                            {`${allTokens[state.depositToken].name}`}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      class={`btn btn-primary ${
                        state.depositAmount &&
                        parseFloat(state.depositAmount) > 0 &&
                        state.depositToken &&
                        state.userBalances[state.depositToken] &&
                        Big(state.userBalances[state.depositToken]).gte(
                          Big(state.depositAmount)
                        )
                          ? ""
                          : "disabled"
                      }`}
                      onClick={() => deposit()}
                    >
                      Deposit
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div class="col">
              <div class="card mb-3">
                <div class="card-body">
                  <Notice cardColor="#80D651" isSmall={1}>
                    Provide liquidity to one of the GPU coin pools and receive a
                    share in that pool. Then, whenever the ShillGPU buys more of
                    that token, your balance in the pool will increase.
                  </Notice>
                  <Notice cardColor="#80D651" isSmall={1}>
                    Note that if the bot is convinced to sell tokens from your
                    pool, the balance of your tokens in the pool will decrease
                    as well.
                    <a
                      class="text-decoration-underline text-black"
                      href="#"
                      onClick={() => State.update({ selectedTab: "About" })}
                    >
                      More details
                    </a>
                  </Notice>
                  <Notice cardColor="#80D651" isSmall={1}>
                    Minimal pool staking period: 7 days from the last user's
                    deposit in this pool.
                  </Notice>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="card  mb-3">
                <div class="card-header">
                  <h4>Treasury</h4>
                </div>
                <div class="card-body">
                  <ol class="olcards">
                    {pools.map((p) => {
                      let tokenBalance = getFtBalance(
                        p[0],
                        p[1].total_balance,
                        2
                      );
                      let tokenValue = (
                        parseFloat(state.prices[p[0]]?.price ?? 0) *
                        parseFloat(tokenBalance ?? 0)
                      ).toFixed(2);
                      return (
                        <MyListItem
                          cardColor="#36aeb3"
                          backColor="#eee"
                          id={`pool-${p[0]}`}
                        >
                          <div class="content">
                            <div class="icon">
                              <img src={allTokens[p[0]].image} />
                            </div>
                            <div class="text">
                              <div>
                                <strong>{allTokens[p[0]].name}</strong>
                              </div>
                              <span>
                                {`Total Balance: ${tokenBalance} ($${tokenValue})`}
                              </span>

                              {debugMode && (
                                <div>
                                  <span>Total shares: {p[1].total_shares}</span>
                                  <span>
                                    Locked balance:{" "}
                                    {getFtBalance(p[0], p[1].locked_balance, 2)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </MyListItem>
                      );
                    })}
                  </ol>
                </div>{" "}
              </div>
            </div>

            {((user_pools ?? []).filter((p) => p[1].user_balance > 0) ?? [])
              .length > 0 && (
              <div class="col">
                <div id="user-pools" class="card  mb-3">
                  <div class="card-header">
                    <h4>Your Pools</h4>
                  </div>
                  <div class="card-body">
                    <ol class="olcards">
                      {(user_pools ?? []).map(
                        (up) =>
                          up[1].user_balance > 0 &&
                          getFtBalance(up[0], up[1].user_balance, 2) > 0 && (
                            <MyListItem
                              cardColor="#00a951"
                              backColor="#eee"
                              key={`userpool-${up[0]}`}
                              id={`userpool-${up[0]}`}
                            >
                              <div class="content">
                                <div class="icon">
                                  <img src={allTokens[up[0]].image} />
                                </div>
                                <div class="text">
                                  <div>
                                    <strong>{allTokens[up[0]].name}</strong>
                                  </div>
                                  <div>
                                    <span>
                                      {`User balance: ${getFtBalance(
                                        up[0],
                                        up[1].user_balance,
                                        2
                                      )}.`}
                                      {!timestampBeforeNow(
                                        up[1].user_unstake_date
                                      ) && (
                                        <span>{`Unstake: 
                      ${timestampToHumanDate(
                        up[1].user_unstake_date ?? 0
                      )}`}</span>
                                      )}
                                    </span>

                                    {timestampBeforeNow(
                                      up[1].user_unstake_date
                                    ) && (
                                      <span
                                        class="badge bg-secondary ms-1 p-2"
                                        role="button"
                                        onClick={() => {
                                          State.update({
                                            showUnstakeForm: true,
                                            unstakeTokenId: up[0],
                                            unstakeAmount: getFtBalance(
                                              up[0],
                                              up[1].user_balance
                                            ),
                                          });
                                        }}
                                      >
                                        Unstake
                                      </span>
                                    )}
                                  </div>
                                  {debugMode && (
                                    <span>{`User shares: ${up[1].user_shares}.`}</span>
                                  )}
                                </div>
                              </div>
                            </MyListItem>
                          )
                      )}
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>

          {state.showUnstakeForm && state.unstakeTokenId && (
            <div class="card  mb-3">
              <div class="card-header">
                <h4>
                  {" "}
                  Unstake from {allTokens[state.unstakeTokenId].name} pool
                </h4>
              </div>

              <div class="card-body" id="unstake">
                <div>
                  Keep in mind that the token balance in the pool constantly
                  changes due to treasury rebalancing.
                </div>

                <div class="row g-3 align-items-center mb-3">
                  <div class="col-4">
                    <label for="depositAmount" class="col-form-label">
                      Specify the minimum amount of tokens to withdraw
                    </label>
                  </div>
                  <div class="col-auto">
                    <input
                      type="number"
                      class="form-control col"
                      id="unstakeAmount"
                      step="0.01"
                      value={state.unstakeAmount}
                      onChange={(e) =>
                        State.update({ unstakeAmount: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <button
                    class={`btn btn-small btn-secondary mb-2 ${
                      !!parseFloat(state.unstakeAmount) ? "" : "disabled"
                    }`}
                    type="button"
                    onClick={() => unstake()}
                  >
                    Unstake
                  </button>
                </div>
              </div>
            </div>
          )}

          <div class="row">
            <div class="col">
              <div class="card  mb-3">
                <div class="card-header text-center">
                  <h4>TVL by Token</h4>
                </div>
                <div class="card-body justify-content-center">
                  <Widget
                    src="slimedragon.near/widget/ShillGPUPoolsChart"
                    props={{
                      pools,
                      allTokens,
                      pricesData: {
                        ok: true,
                        body: JSON.stringify(state.prices),
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {state.selectedTab == "Credits" && (
      <div id="credits">
        <div class="card  mb-3">
          <div class="card-header">
            <h4>Deposit NEAR</h4>
          </div>

          <div class="card-body">
            <div class="mb-4">
              <div class="mb-3">
                <Notice cardColor="#45ABCD">
                  Deposit NEAR to avoid wallet confirmation on every request to
                  ShillGPU. Withdraw the remaining balance at any moment.
                </Notice>
              </div>

              <div class="row g-3 align-items-center mb-2">
                <div class="col-4 col-md-2">
                  <label for="buyCreditAmount" class="col-form-label">
                    Amount in NEAR:
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="number"
                    class="form-control"
                    id="buyCreditAmount"
                    step="0.01"
                    value={state.buyCreditAmount}
                    onChange={(e) =>
                      State.update({ buyCreditAmount: e.target.value })
                    }
                  />
                </div>
              </div>
              <div class="row g-3 align-items-center mb-2">
                <div class="col-4 col-md-2">
                  <label for="buyCreditAmount" class="col-form-label">
                    Request cost:
                  </label>
                </div>
                <div class="col-auto">
                  {getNearBalance(requestCost, 2)} NEAR
                </div>
              </div>

              <button
                class={`btn btn-small btn-secondary mb-2 ${
                  parseFloat(state.buyCreditAmount) > 0 ? "" : "disabled"
                }`}
                type="button"
                onClick={() => buyCredit()}
              >
                Deposit
              </button>
              <div>
                Will be enought to make
                {Big(getYoctoNear(state.buyCreditAmount ?? 0))
                  .div(Big(requestCost))
                  .toFixed()}{" "}
                requests
              </div>
            </div>
          </div>
        </div>

        {userCreditsAvailable && (
          <div class="card  mb-3">
            <div class="card-header">
              <h4>Withdraw NEAR</h4>
            </div>
            <div class="card-body">
              <div class="row g-3 align-items-center mb-2">
                <div class="col-4 col-md-2">
                  <label for="buyCreditAmount" class="col-form-label">
                    Amount to withdraw:
                  </label>
                </div>

                <div class="col-auto">
                  <input
                    type="number"
                    class="form-control"
                    id="withdrawCreditAmount"
                    step="0.01"
                    value={state.withdrawCreditAmount}
                    onChange={(e) =>
                      State.update({ withdrawCreditAmount: e.target.value })
                    }
                  />
                </div>
              </div>
              <div class="row g-3 align-items-center mb-2">
                <div class="col-4 col-md-2">
                  <label class="col-form-label">Your credits</label>
                </div>

                <div
                  class="col-auto"
                  role="button"
                  onClick={() =>
                    State.update({
                      withdrawCreditAmount: getNearBalance(userCredits, 4),
                    })
                  }
                >
                  {getNearBalance(userCredits, 4)} NEAR
                </div>
              </div>
              <button
                class={`btn btn-small btn-secondary mb-2 ${
                  parseFloat(state.withdrawCreditAmount) <=
                  getNearBalance(userCredits, 4)
                    ? ""
                    : "disabled"
                }`}
                type="button"
                onClick={() => withdrawCredit()}
              >
                Withdraw
              </button>
            </div>
          </div>
        )}
      </div>
    )}

    {state.selectedTab == "Earn" && (
      <>
        <div id="earn" class="card mb-3">
          <div class="card-header">
            <h4>Earn GPU coins</h4>
          </div>

          <div class="card-body">
            <ol class="olcards">
              <MyListItem cardColor="#36aeb3" backColor="#eee">
                <div class="content">
                  <div class="icon">💰</div>
                  <div class="text">
                    <a
                      class="text-white text-decoration-underline"
                      href="#"
                      onClick={() => State.update({ selectedTab: "Pools" })}
                    >
                      Provide liquidity
                    </a>{" "}
                    to one of the GPU coin pools and receive a share in that
                    pool. Then, whenever the ShillGPU buys more of that token,
                    your balance in the pool will increase.
                  </div>
                </div>
              </MyListItem>
              <MyListItem cardColor="#36aeb3" backColor="#eee">
                <div class="content">
                  <div class="icon">🤔</div>
                  <div class="text">
                    For instance, if there were 100 tokens in the GPU coin pool
                    and you added another 100, you would own 50% of that pool.
                    Subsequently, if you persuaded the bot to sell some other
                    token and buy the GPU coin from your pool, let's say the bot
                    bought an additional 300 tokens. The total pool balance
                    would then be 500 tokens (200 existing tokens plus 300
                    purchased). You would still own 50% of the pool, enabling
                    you to withdraw 250 tokens instead of just the initial 100
                    you deposited.
                  </div>
                </div>
              </MyListItem>

              <MyListItem cardColor="#36aeb3" backColor="#eee">
                <div class="content">
                  <div class="icon">⚠️</div>
                  <div class="text">
                    Note that if the bot is convinced to sell tokens from your
                    pool, the balance of your tokens in the pool will decrease
                    as well. Assess the risks before depositing tokens into the
                    pool.
                  </div>
                </div>
              </MyListItem>

              <MyListItem cardColor="#36aeb3" backColor="#eee">
                <div class="content">
                  <div class="icon">👆</div>
                  <div class="text">
                    Users can withdraw funds from the pool no earlier than 7
                    days after the their last deposit in this pool.
                  </div>
                </div>
              </MyListItem>
            </ol>
          </div>
        </div>
      </>
    )}

    <div class="text-center mb-3">
      <small class="text-secondary" style={{ fontSize: "0.7em" }}>
        <div>
          This project is currently in its beta phase. We appreciate your
          support and patience as we work to improve and enhance its
          functionality.{" "}
        </div>
        <div>
          Your feedback is invaluable to us in shaping the final product. Thank
          you for being a part of this journey with us.
        </div>
      </small>
    </div>
  </Theme>
);
