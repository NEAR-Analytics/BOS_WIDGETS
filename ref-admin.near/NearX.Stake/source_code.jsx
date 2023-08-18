const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;
const NEAR_DECIMALS = 24;
const BIG_ROUND_DOWN = 0;
const CONTRACT_ID = "v2-nearx.stader-labs.near";
const validatorRefId = props.refId ?? "zavodil.poolv1.near";
const utmReferral = props.utmReferral ?? "Zavodil";
const tokenName = "NearX";

function getNearBalance(accountId) {
  const account = fetch("https://rpc.mainnet.near.org", {
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
  });
  const { amount, storage_usage } = account.body.result;

  const COMMON_MIN_BALANCE = 0.05;
  if (!amount) return "-";
  const availableBalance = Big(amount || 0).minus(
    Big(storage_usage).mul(Big(10).pow(19))
  );
  const balance = availableBalance
    .div(Big(10).pow(NEAR_DECIMALS))
    .minus(COMMON_MIN_BALANCE);
  return balance.lt(0) ? "0" : balance.toFixed(5, BIG_ROUND_DOWN);
}

State.init({
  inputValue: "",
  inputError: "",
  nearBalance: getNearBalance(accountId),
});
const nearBalance =
  !state.nearBalance || state.nearBalance === "-"
    ? getNearBalance(accountId)
    : state.nearBalance;

if (state.api === undefined) {
  const result = fetch(
    "https://us-central1-staderdao.cloudfunctions.net/nearApr"
  );
  if (!result.ok) {
    return "Loading";
  }
  State.update({ apy: result.body.baseStakingApy });
}

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

if (state.tokenPrice === undefined) {
  const tokenPrice = Big(Near.view(CONTRACT_ID, "get_nearx_price", `{}`) ?? "0")
    .div(Big(10).pow(24))
    .toFixed();
  console.log("tokenPrice", tokenPrice);
  if (Number(tokenPrice)) {
    State.update({ tokenPrice });
  }
}

const youWillReceive =
  state.tokenPrice === undefined
    ? "0"
    : (Big(state.tokenPrice).lte(0)
      ? Big(0)
      : Big(isValid(state.inputValue) ? state.inputValue : 0).div(
        Big(state.tokenPrice)
      )
    ).toFixed(5, BIG_ROUND_DOWN);

const Title = styled.h1`
      font-size: 40px;
      font-weight: bold;
  `;

const Main = styled.div`
      color: white;
      width: 100%;
      height: 80vh;
      background: #09071f;
      padding: 20px;
  
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column
  `;

const Description = styled.div`
      font-size: 14px;
      color: #999999;
      margin-top: 5px;
  `;

const disabledStakeButton =
  !isValid(state.inputValue) || Big(state.inputValue).eq(0) || state.inputError;
const StakeButton = styled.button`
      border: none;
      color: white;
      width: 100%;
      border-radius: 10px;
      font-size: 20px;
      font-weight: bold;
      overflow: hidden;
      padding: 8px 0;
  
      background-size: 100%;
      background-image: linear-gradient(180deg, #5561ff 0%, #3643fc 100%, #3643fc 100%);
      position: relative;
      z-index: 0;
      &:disabled {
          background: #1C2056;
          color: #3D47D6;
      }
      &:before {
          background-image: linear-gradient(180deg, #4954f2 0%, #2029a7 100%);
          content: "";
          display: block;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          width: 100%;
          z-index: -100;
          transition: opacity 0.6s;
      }
      &:hover:before {
          opacity: ${disabledStakeButton ? "0" : "1"};
      }
  `;

const InputWrapper = styled.div`
      width: 100%;
      border-radius: 10px;
      background: #0d0d2b;
      padding: 20px;
  `;

const HorizentalLine = styled.hr`
      height: 1px;
      border: none;
      background: white;
      opacity: 0.1;
      margin-top: 16px;
      margin-bottom: 8px;
  `;

const BalanceContainer = styled.div`
      color: #c1c1c1;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      .error {
          color: #ec6868;
      }
  `;

const NEARInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NEARTexture = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`;

const LogoWithText = styled.div`
  display: flex;
  align-items: center;
`;

const MaxTexture = styled.div`
  font-size: 24px;
  color: #4451FD;
  cursor: pointer;
`;

const FooterLink = styled.a`
    display:flex;
    align-items:center;
    justify-content:center;
    color: #fff;
    text-decoration: underline;
    transition: all 0.2s ease-in-out;
    margin-top: 12px;
    text-underline-offset: 3px;
`;

const YouWillReceive = styled.div`
    display: flex;
    justify-content: space-between;

    font-size: 14px;
    margin-top: 16px;
`;
const StakeFormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding-top: 10px;
  background: #25283A;
  border-radius: 16px;
  margin-top:20px;
  padding-bottom:20px;
  .contentArea{
    background: #25283A;
    border-radius: 16px;
    padding:20px 30px 0 30px;
  }
  .contentArea p{
    color: #7C7F96;
    font-size:14px;
  }
  .contentArea hr{
    background: #373A53;
    height:2px;
  }
  .arr .bigIcon{
    background: #373A53;
  }
  .arr .boldText{
    font-weight: 500;
  }
  .arr .apr{
    color: #7C7F96;
  }
  .arr .apr .value{
    color:#FFFFFF;
    font-weight: 500;
  }
  .footer p{
    color:#FFFFFF;
  }
`;
/** events start */
const onChange = (e) => {
  // Has user signed in?
  if (!isSignedIn) {
    State.update({
      inputError: "Sign in please",
    });
    return;
  }
  const targetValue = e.target.value;
  if (targetValue !== "" && !targetValue.match(/^\d*(\.\d*)?$/)) {
    return;
  }
  let stakeAmount = targetValue.replace(/^0+/, "0"); // remove prefix 0
  // limit 24 decimals
  const most24DecimalsPattern = /^-?\d+(\.\d{0,24})?/;
  let values = stakeAmount.match(most24DecimalsPattern);
  if (values) {
    stakeAmount = values[0];
  }
  if (
    nearBalance &&
    (isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lt(1) ||
      Big(stakeAmount).gt(Big(nearBalance)))
  ) {
    if (
      isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lt(1)
    ) {
      State.update({
        inputValue: stakeAmount,
        inputError: "Stake at least 1 NEAR",
      });
    } else {
      State.update({
        inputValue: stakeAmount,
        inputError: `Max is ${nearBalance} NEAR`,
      });
    }
    return;
  }
  State.update({
    inputValue: stakeAmount,
    inputError: "",
  });
};

const onClickMax = () => {
  if (
    isNaN(Number(nearBalance)) ||
    nearBalance === "" ||
    Big(nearBalance).lt(1)
  ) {
    State.update({
      inputValue: nearBalance,
      inputError: "Stake at least 1 NEAR",
    });
    return;
  } else {
    State.update({
      inputValue: nearBalance,
      inputError: "",
    });
  }
};

const onClickStake = () => {
  const stakeAmount = state.inputValue;
  if (
    nearBalance &&
    (isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lt(1) ||
      Big(stakeAmount).gt(Big(nearBalance)))
  ) {
    if (
      isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lt(1)
    ) {
      State.update({ inputError: "Stake at least 1 NEAR" });
    } else if (Big(stakeAmount).gt(Big(nearBalance))) {
      State.update({
        inputError: `Max is ${nearBalance} NEAR`,
      });
    } else setInputError("");
    return;
  }
  Near.call(
    CONTRACT_ID,
    "direct_deposit_and_stake",
    { validator: validatorRefId },
    undefined,
    Big(state.inputValue).mul(Big(10).pow(NEAR_DECIMALS)).toFixed(0)
  );
  // check and update balance
  const interval = setInterval(() => {
    const balance = getNearBalance(accountId);
    if (balance !== nearBalance) {
      clearInterval(interval);
      State.update({
        inputValue: "",
        inputError: "",
        nearBalance: balance,
      });
    }
  }, 500);
};
console.log("00000");
return (
  <StakeFormWrapper>
    <div class="arr">
      <Widget
        src={`ref-admin.near/widget/stake-bannerIcon`}
        props={{
          firstIconName: "NEAR",
          firstIconUrl:
            "https://ipfs.near.social/ipfs/bafkreid5xjykpqdvinmj432ldrkbjisrp3m4n25n4xefd32eml674ypqly",
          secondIconName: "",
          secondIconUrl:
            "https://ipfs.near.social/ipfs/bafkreia7nzk2nlapfchtgtdnguzrz425fdkhqdsx5gwutuvttetao63rii",
          componentType: "NearX",
          apy_value: state.apy,
        }}
      ></Widget>
    </div>
    <div class="contentArea">
      <Widget
        src={`ref-admin.near/widget/LiNEAR.Input`}
        props={{
          firstIconName: "NEAR",
          placeholder: "0",
          value: state.inputValue,
          onChange,
          onClickMax,
          inputError: state.inputError,
          balance: nearBalance,
        }}
      />
      <Widget
        src={`ref-admin.near/widget/LiNEAR.Button`}
        props={{
          onClick: onClickStake,
          disabled: disabledStakeButton,
          text: "Stake",
          firstIconName: "NEAR",
        }}
      />
      <div class="footer">
        <Widget
          src={`ref-admin.near/widget/LiNEAR.Message.YouWillReceive`}
          props={{
            text: `${youWillReceive} ${tokenName}`, secondIconName: "NearX",
            secondIconUrl: "https://ipfs.near.social/ipfs/bafkreia7nzk2nlapfchtgtdnguzrz425fdkhqdsx5gwutuvttetao63rii",
          }}
        />
      </div>
    </div>
    <FooterLink
      href={`https://www.staderlabs.com/near/lt/near/?tab=Unstake&utm_referral=${utmReferral}`}
      target="_blank"
    >
      Unstake {tokenName}
    </FooterLink>
  </StakeFormWrapper>
);
