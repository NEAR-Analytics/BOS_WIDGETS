const accountId = context.accountId;
const authorId = "meta-pool-official.near";
const isSignedIn = !!accountId;
const tokenDecimals = 24;
const BIG_ROUND_DOWN = 0;
const MIN_BALANCE_CHANGE = 0.5;
const contractId = "meta-pool.near";
const GAS = "200000000000000";
const ONE_NEAR = new BN("1" + "0".repeat(24));

State.init({
  openModal: false,
  validation: "",
  nearUsdPrice: null,
  nearUsdPriceIsFetched: false,
  metrics: null,
  metricsIsFetched: false,
  nearBalance: null,
  nearBalanceIsFetched: false,
  stNearBalance: null,
  stNearBalanceIsFetched: false,
  dataIntervalStarted: false,
  token: "near", // "near" | "wnear"
  action: "stake", // "
});

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

const fetchMetrics = () => {
  asyncFetch("https://validators.narwallets.com/metrics_json").then((resp) => {
    if (resp) {
      console.log("@metrics", resp?.body);
      State.update({ metrics: resp?.body ?? "...", metricsIsFetched: true });
    }
  });
};

const fetchNearPrice = () => {
  asyncFetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd"
  ).then((resp) => {
    const nearUsdPrice = resp?.body?.near.usd;
    if (nearUsdPrice && !isNaN(nearUsdPrice)) {
      console.log("@nearPrice", nearUsdPrice);
      State.update({
        nearUsdPrice: Number(nearUsdPrice),
        nearUsdPriceIsFetched: true,
      });
    }
  });
};

function getStNearBalance(subscribe) {
  Near.asyncView(
    contractId,
    "ft_balance_of",
    {
      account_id: accountId,
    },
    undefined,
    subscribe
  ).then((stNearBalanceRaw) => {
    if (!stNearBalanceRaw) return "-";
    const balance = Big(stNearBalanceRaw).div(Big(10).pow(tokenDecimals));
    console.log("@stNEAR balance", balance.lt(0) ? "0" : balance.toFixed());
    State.update({
      stNearBalance: balance.lt(0) ? "0" : balance.toFixed(),
      stNearBalanceIsFetched: true,
    });
  });
}

function getNearBalance(onInvalidate) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      },
    }),
  };
  asyncFetch("https://rpc.mainnet.near.org", options).then((res) => {
    console.log("@rpc view account", res);
    const { amount, storage_usage } = res?.body?.result;
    const COMMON_MIN_BALANCE = 0.05;

    let newBalance = "-";
    if (amount) {
      const availableBalance = Big(amount || 0).minus(
        Big(storage_usage).mul(Big(10).pow(19))
      );
      const balance = availableBalance
        .div(Big(10).pow(tokenDecimals))
        .minus(COMMON_MIN_BALANCE);
      newBalance = balance.lt(0) ? "0" : balance.toFixed(5, BIG_ROUND_DOWN);
    }
    console.log("@near balance", newBalance);
    State.update({
      nearBalance: newBalance,
      nearBalanceIsFetched: true,
    });
    if (onInvalidate) {
      onInvalidate(nearBalance, newBalance);
    }
  });
}
const update = (state) => State.update({ state });

const onSubmitStake = () => {
  const deposit = Big(state.value).mul(Big(10).pow(tokenDecimals)).toFixed(0);
  Near.call(contractId, "deposit_and_stake", {}, GAS, deposit);
};

const onSubmitDelayedUnstake = () => {
  // manage register stNEAR - should make a call attached
  const args = {
    amount: Big(state.value).mul(Big(10).pow(tokenDecimals)).toFixed(0),
  };
  Near.call(contractId, "unstake", args, GAS, 0);
};

const onSubmitFastUnstake = () => {
  // manage register stNEAR - should make a call attached
  const l = Big(state.value).mul(Big(10).pow(tokenDecimals)).toFixed(0);
  const e = l.mul(state.metrics.st_near_price_usd);
  const tx = {
    contractName: contractId,
    methodName: "liquid_unstake",
    deposit: 0,
    args: {
      st_near_to_burn: l.toFixed(0),
      min_expected_near: e.sub(ONE_NEAR.divn(10)).toFixed(0),
    },
  };
  Near.call([tx]);
};

const handleInputNear = (value) => {
  if (
    (parseFloat(value) < 1 && parseFloat(value) > 0) ||
    parseFloat(value) < 0
  ) {
    State.update({
      validation: "The minimum amount is 1 NEAR.",
    });
  } else if (parseFloat(value) > parseFloat(state.nearBalance)) {
    State.update({
      validation: "You don't have enough NEAR.",
    });
  } else {
    State.update({
      validation: "",
    });
  }
  State.update({ value });
};

const handleInputStNear = (value) => {
  if (
    (parseFloat(value) < 1 && parseFloat(value) > 0) ||
    parseFloat(value) < 0
  ) {
    State.update({
      validation: "The minimum amount is 1 stNEAR.",
    });
  } else if (parseFloat(value) > parseFloat(state.stNearBalance)) {
    State.update({
      validation: "You don't have enough stNEAR.",
    });
  } else {
    State.update({
      validation: "",
    });
  }
  State.update({ value });
};

const getUserAddress = () => {
  if (!accountId) return "";
  return accountId.length > 20
    ? accountId.substring(0, 8) +
        "..." +
        accountId.substring(accountId.length - 6, accountId.length)
    : accountId;
};

const onClickMaxNear = () => {
  const value =
    state.nearBalance > 0.1
      ? (parseFloat(state.nearBalance) - 0.1).toFixed(2)
      : "0";
  handleInputNear(value);
};

const onClickMaxStNear = () => {
  const value =
    state.stNearBalance > 0.1
      ? (parseFloat(state.stNearBalance) - 0.1).toFixed(2)
      : "0";
  handleInputStNear(value);
};

// UPDATE DATA

const updateData = () => {
  fetchNearPrice();
  fetchMetrics();
  getNearBalance();
  getStNearBalance();
};

if (!state.dataIntervalStarted) {
  State.update({ dataIntervalStarted: true });

  setInterval(() => {
    updateData();
  }, 10000);
}

// parametrize props
const allProps = {
  stake: {
    tokenInputBalance: state.nearBalance,
    tokenInput: "NEAR",
    tokenOutputBalance: state.stNearBalance,
    tokenOutput: "stNEAR",
    tokenInputUsd: state.nearUsdPrice,
    tokenOutputUsd: state.metrics?.st_near_price_usd,
    apy: state.metrics?.st_near_30_day_apy,
    inputPlaceholder: "Enter NEAR amount",
    buttonText: "Stake now",
    handleInput: handleInputNear,
    tokenInputIconUrl:
      "https://ipfs.near.social/ipfs/bafkreid5xjykpqdvinmj432ldrkbjisrp3m4n25n4xefd32eml674ypqly",
    tokenOutputIconUrl:
      "https://ipfs.near.social/ipfs/bafkreigblrju2jzbkezxstqomekvlswl6ksqz56rohwzyoymrfzise7fdq",
    onClickMax: onClickMaxNear,
    onSubmit: onSubmitStake,
    stakeInfoLeftText: "Available to Stake",
    stakeInforRightText: "Staked amount",
  },
  delayed: {
    tokenInputBalance: state.stNearBalance,
    tokenInput: "stNEAR",
    tokenOutputBalance: state.nearBalance,
    tokenOutput: "NEAR",
    tokenInputUsd: state.metrics?.st_near_price_usd,
    tokenOutputUsd: state.nearUsdPrice,
    apy: state.metrics?.st_near_30_day_apy,
    inputPlaceholder: "Enter stNEAR amount",
    buttonText: "Unstake",
    handleInput: handleInputStNear,
    tokenOutputIconUrl:
      "https://ipfs.near.social/ipfs/bafkreid5xjykpqdvinmj432ldrkbjisrp3m4n25n4xefd32eml674ypqly",
    tokenInputIconUrl:
      "https://ipfs.near.social/ipfs/bafkreigblrju2jzbkezxstqomekvlswl6ksqz56rohwzyoymrfzise7fdq",
    onClickMax: onClickMaxStNear,
    onSubmit: onSubmitDelayedUnstake,
    stakeInfoLeftText: "Available to Unstake",
    stakeInforRightText: "NEAR available amount",
  },
  fast: {
    tokenInputBalance: state.stNearBalance,
    tokenInput: "stNEAR",
    tokenOutputBalance: state.nearBalance,
    tokenOutput: "NEAR",
    tokenInputUsd: state.metrics?.st_near_price_usd,
    tokenOutputUsd: state.nearUsdPrice,
    apy: state.metrics?.st_near_30_day_apy,
    inputPlaceholder: "Enter stNEAR amount",
    buttonText: "Unstake",
    handleInput: handleInputStNear,
    tokenOutputIconUrl:
      "https://ipfs.near.social/ipfs/bafkreid5xjykpqdvinmj432ldrkbjisrp3m4n25n4xefd32eml674ypqly",
    tokenInputIconUrl:
      "https://ipfs.near.social/ipfs/bafkreigblrju2jzbkezxstqomekvlswl6ksqz56rohwzyoymrfzise7fdq",
    onClickMax: onClickMaxStNear,
    onSubmit: onSubmitFastUnstake,
    stakeInfoLeftText: "Available to Unstake",
    stakeInforRightText: "NEAR available amount",
  },
}[state.action];

// STYLED COMPONENTS

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    margin: 0px auto;
    min-width: 380px;
    width: 100%;
    padding: 0px 12px 12px 12px;
    position: relative;
    margin-top: 8px;
    margin-bottom: 8px;
    background:  linear-gradient( rgb(206, 255, 26) 0%, rgb(206, 255, 26) 270px, rgb(247, 249, 251) 270px, rgb(247, 249, 251) 100%);
  `;

const StakeFormTopContainer = styled.div`
  margin-top: 0px;
  display: flex;
  margin: 10px 0px;
  `;

const StakeFormTopContainerLeft = styled.div`
margin-right: 8px;
flex-basis: 50%;
-webkit-box-flex: 1;
flex-grow: 1;
font-size: 12px;
line-height: 1.6em;
`;

const StakeFormTopContainerLeftContent1 = styled.div`
display: flex;
flex-direction: row;
-webkit-box-pack: start;
justify-content: flex-start;
-webkit-box-align: center;
align-items: center;
`;

const StakeFormTopContainerRightContent1Text = styled.div`
padding: 0px 6px;
font-weight: 400;
font-size: 16px;
background-color: #0002;
border: solid 4px #000B;
border-radius: 14px;
`;

const Header = styled.div`
    font-weight: 800;
    font-size: 26px;
    padding: 15px 20px 0 20px;
    margin-bottom: 0.2em;
    line-height: 1.2em;
    text-align: center;
  `;

const SelectionContainer = styled.div`
    width: 100%;
    max-width: 600px;
    align-self: center;
    background-color: white;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
    border-radius: 20px;
    padding: 12px 26px;
    box-shadow: none;
    color: #fff;    
    margin-bottom: 1em;
    padding: 12px 26px 32px 26px;
  `;

const Spacer = styled.div`
    height: 20px;
  `;

const ButtonConnectContainer = styled.div`
    ${".buttonClass{ width: 100%;  border-radius: 1000px;  font-size: 20px;  font-weight: bold;  padding: 8px 0;  /* transition: all 0.3s ease-in-out;*/display: inline-flex;  align-items: center;  justify-content: center;  user-select: none;  position: relative;  white-space: nowrap;  vertical-align: middle;  line-height: 1.2;  border-radius: 1000px;  font-weight: 400;  min-height: 48px;  text-align: center;  box-sizing: border-box;  padding: 0 24px;  color: rgb(255, 255, 255);  background: rgb(12, 34, 70);  border: 2px solid transparent;  &:disabled { background: rgb(12, 34, 70);    color: white;    cursor: not-allowed } &:hover { border: 4px solid rgb(12, 34, 70);    color:  rgb(12, 34, 70);    background: transparent;    }}"}
  `;

const SelectToken = styled.div`
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding-block-end: 20px;
  width: 100%;
`;

const SelectAction = styled.div`
border-bottom-left-radius: 0px;
border-bottom-right-radius: 0px;
border-radius: 20px;
display: flex;
flex-direction: column;
width: 100%;
`;

const TokensList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const TokensItem = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 18px;
  width: 12em;
  text-align: left;
  align-items: center;

  border: 0.8px solid rgb(215, 224, 228);
  background: rgb(247, 249, 251);
  opacity: 0.8;

  border-radius: 38px;

  ${({ active }) =>
    active
      ? `
    background: rgb(206, 255, 26);
  `
      : `
    :hover {
      background: rgb(215, 224, 228);
    }
  `}

  
// add support for disabled 
  ${({ disabled }) =>
    disabled
      ? `
    background: rgb(215, 224, 228);
    opacity: 0.5;
    :hover {
      background: rgb(215, 224, 228);
    }
  `
      : ``}


  div {
    display: flex;
    flex-direction: column;
  }
`;

const ActionItem = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
  width: 12em;
  height: 6em;
  text-align: left;
  align-items: center;
  border: 0.8px solid rgb(215, 224, 228);
  background: rgb(247, 249, 251);
  opacity: 0.8;

  border-radius: 24px;

  ${({ active }) =>
    active
      ? `
    background: rgb(206, 255, 26);
  `
      : `
    :hover {
      background: rgb(215, 224, 228);
    }
  `}


  div {
    display: flex;
    flex-direction: column;
  }
`;

const Text = styled.p`
  color:#000000;
  font-size: 14px;
  line-height: 21px;
`;

const renderTokens = (
  <SelectToken>
    <Text>Select token</Text>
    <TokensList>
      <TokensItem
        href={`/meta-pool-official.near/widget/MetaPoolStake.Near?token=near`}
        active={state.token === "near"}
      >
        <div>
          <div>NEAR</div>
          {/* <div>{state.metrics.st_near_30_day_apy}% APY</div> */}
        </div>
        <img
          style={{
            height: "70%",
            width: "auto",
          }}
          src="https://ipfs.near.social/ipfs/bafkreiftukbt7zacsnbfmhppzgfk7jj4mn5qckd3j7dgto7kutgiqj3vgi"
          alt="Brand Logo"
          // height={20}
          width={"auto"}
        />
      </TokensItem>
      <TokensItem
        href={`/meta-pool-official.near/widget/MetaPoolStake.wNear?token=wnear`}
        active={state.token === "wnear"}
      >
        <div>
          <div>wNEAR</div>
          {/* <div>{state.metrics.st_near_30_day_apy}% APY</div> */}
        </div>
        <img
          style={{
            height: "70%",
            width: "auto",
          }}
          src="https://ipfs.near.social/ipfs/bafkreigbbmef2vo3jcnr2llayeyom7rplcyn7efqcuo2lzclf3mr2nevwy"
          alt="wnear Logo"
          // height={20}
          width={"auto"}
        />
      </TokensItem>
    </TokensList>
  </SelectToken>
);

const renderActions = (
  <SelectAction>
    <Text>Select action</Text>
    <TokensList>
      <ActionItem
        onClick={() => {
          State.update({ action: "stake" });
        }}
        active={state.action === "stake"}
      >
        <div>Stake</div>
        <div>
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M16,7,6,17l1.41,1.41L15,10.83V28H2v2H15a2,2,0,0,0,2-2V10.83l7.59,7.58L26,17Z"></path>
            <path d="M6,8V4H26V8h2V4a2,2,0,0,0-2-2H6A2,2,0,0,0,4,4V8Z"></path>
          </svg>
        </div>
      </ActionItem>
      <ActionItem
        onClick={() => {
          State.update({ action: "fast" });
        }}
        active={state.action === "fast"}
      >
        <div>Fast Unstake</div>
        <div>
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M18,30H4a2,2,0,0,1-2-2V14a2,2,0,0,1,2-2H18a2,2,0,0,1,2,2V28A2,2,0,0,1,18,30ZM4,14V28H18V14Z"></path>
            <path d="M25,23H23V9H9V7H23a2,2,0,0,1,2,2Z"></path>
            <path d="M30,16H28V4H16V2H28a2,2,0,0,1,2,2Z"></path>
          </svg>
        </div>
      </ActionItem>
      {state.token == "near" && (
        <ActionItem
          onClick={() => {
            State.update({ action: "delayed" });
          }}
          active={state.action === "delayed"}
        >
          <div>Delayed Unstake</div>
          <div>
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M15 19H17V21H15zM15 23H17V25H15z"></path>
              <path d="M23,11.67V4h3V2H6V4H9v7.67a2,2,0,0,0,.4,1.2L11.75,16,9.4,19.13a2,2,0,0,0-.4,1.2V28H6v2H26V28H23V20.33a2,2,0,0,0-.4-1.2L20.25,16l2.35-3.13A2,2,0,0,0,23,11.67ZM21,4v7H11V4Zm0,16.33V28H11V20.33L14.25,16,12,13h8l-2.25,3Z"></path>
            </svg>
          </div>
        </ActionItem>
      )}
    </TokensList>
  </SelectAction>
);
if (
  !state.metricsIsFetched ||
  !state.nearUsdPriceIsFetched ||
  !state.nearBalanceIsFetched ||
  !state.stNearBalanceIsFetched
)
  return "Loading..";

 return (
  <Widget
    src={`${authorId}/widget/MetaPoolStake.Container`}
    props={{
      update,
      token: state.token,
      action: state.action,
      getUserAddress,
      children: (
        <Widget
          src={`${authorId}/widget/MetaPoolStake.Near.Form`}
          props={{ ...allProps, update, state, isSignedIn }}
        />
      ),
    }}
  />
);