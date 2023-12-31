/** state init start */
State.init({
  inputValue: "",
  inputError: "",
});
/** state init end */

// load config
const config = props.config;
if (!config) {
  return "Component not be loaded. Missing `config` props";
}

/** common lib start */
const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;
const NEAR_DECIMALS = 24;
const BIG_ROUND_DOWN = 0;

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

function formatAmount(a) {
  return isValid(a)
    ? Number(a).toLocaleString(undefined, {
        minimumFractionDigits: 5,
        maximumFractionDigits: 5,
      })
    : a;
}

/** common lib end */
const nearBalance = props.nearBalance || "-";
const linearBalance = props.linearBalance || "-";

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

const onClickStake = async () => {
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

  const stake = {
    contractName: config.contractId,
    methodName: "deposit_and_stake",
    deposit: Big(state.inputValue).mul(Big(10).pow(NEAR_DECIMALS)).toFixed(0),
    args: {},
  };
  const registerFt = {
    contractName: config.contractId,
    methodName: "ft_balance_of",
    args: {
      account_id: accountId,
    },
  };
  const txs = [stake];
  // If account has no LiNEAR, we assume she/he needs to register LiNEAR token.
  // By adding a `ft_balance_of` function call, the NEAR indexer will automatically
  // add LiNEAR token into caller's NEAR wallet token list.
  if (Number(linearBalance) === 0) {
    txs.push(registerFt);
  }

  Near.call(txs);

  // update account balances
  if (props.updateAccountInfo) {
    props.updateAccountInfo();
  }
};
/** events end */

const disabledStakeButton =
  !isValid(state.inputValue) || Big(state.inputValue).eq(0) || state.inputError;

const linearPrice = Big(
  Near.view(config.contractId, "ft_price", `{}`) ?? "0"
).div(Big(10).pow(24));

const receivedLinear = (
  linearPrice.lte(0)
    ? Big(0)
    : Big(isValid(state.inputValue) ? state.inputValue : 0).div(linearPrice)
).toFixed(5, BIG_ROUND_DOWN);
const formattedReceivedLinear = formatAmount(receivedLinear);

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
return (
  <StakeFormWrapper>
    <div class="arr">
      <Widget
        src={`${config.ownerId}/widget/stake-bannerIcon`}
        props={{
          firstIconName: "NEAR",
          firstIconUrl:
            "https://ipfs.near.social/ipfs/bafkreid5xjykpqdvinmj432ldrkbjisrp3m4n25n4xefd32eml674ypqly",
          secondIconName: "",
          secondIconUrl:
            "https://ipfs.near.social/ipfs/bafkreie2nqrjdjka3ckf4doocsrip5hwqrxh37jzwul2nyzeg3badfl2pm",
          componentType: "liNEAR",
        }}
      ></Widget>
    </div>
    <div class="contentArea">
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Input`}
        props={{
          placeholder: "0",
          value: state.inputValue,
          onChange,
          onClickMax,
          inputError: state.inputError,
          balance: nearBalance,
        }}
      />
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Button`}
        props={{
          onClick: onClickStake,
          disabled: disabledStakeButton,
          text: "Stake",
        }}
      />
      <div class="footer">
        <Widget
          src={`${config.ownerId}/widget/LiNEAR.Message.YouWillReceive`}
          props={{ text: `${formattedReceivedLinear}` }}
        />
      </div>
    </div>
  </StakeFormWrapper>
);
