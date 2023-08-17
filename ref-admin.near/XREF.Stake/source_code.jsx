/** state init start */
State.init({
  inputValue: "",
  inputError: "",
  stakeMax: false,
});
/** state init end */
// load config
const config = props.config;
if (!config) {
  return "Component not be loaded. Missing `config` props";
}

const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;
const REF_DECIMALS = 18;
const XREF_DECIMALS = 18;
const DECIMALS_XREF_REF_TRANSTER = 8;
const BIG_ROUND_DOWN = 0;
const storageToken = Near.view(config.XREF_TOKEN_ID, "storage_balance_of", {
  account_id: accountId,
});
const shrinkToken = (value, decimals) => {
  return new Big(value).div(new Big(10).pow(decimals)).toFixed();
};
const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals)).toFixed();
};
function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

/** common lib end */
function getRefBalance(accountId) {
  const balanceRaw = Near.view(config.REF_TOKEN_ID, "ft_balance_of", {
    account_id: accountId,
  });
  if (!balanceRaw) return "-";
  const balance = Big(balanceRaw).div(Big(10).pow(REF_DECIMALS));
  return [
    balance.lt(0) ? "0" : balance.toFixed(5, BIG_ROUND_DOWN),
    balance.lt(0) ? "0" : balance.toFixed(),
  ];
}
function getRate() {
  const rateRow = Near.view(config.XREF_TOKEN_ID, "get_virtual_price");
  if (!rateRow) return 1;
  const rate = Big(rateRow)
    .div(Big(10).pow(DECIMALS_XREF_REF_TRANSTER))
    .toFixed();
  return rate;
}

const [refBalance, refBalanceWhole] = getRefBalance(accountId);
const refToxrefRate = getRate();
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
  // limit 18 decimals
  const most18DecimalsPattern = /^-?\d+(\.\d{0,18})?/;
  let values = stakeAmount.match(most18DecimalsPattern);
  if (values) {
    stakeAmount = values[0];
  }
  if (
    refBalance &&
    (isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).gt(Big(refBalanceWhole)))
  ) {
    if (
      isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lte(0)
    ) {
      State.update({
        inputValue: stakeAmount,
        stakeMax: false,
        inputError: "Stake at least greater than zero REF",
      });
    } else {
      State.update({
        inputValue: stakeAmount,
        stakeMax: false,
        inputError: `Max is ${refBalance} REF`,
      });
    }
    return;
  }
  State.update({
    inputValue: stakeAmount,
    stakeMax: false,
    inputError: "",
  });
};

const onClickMax = () => {
  if (
    isNaN(Number(refBalance)) ||
    refBalance === "" ||
    Big(refBalance).lte(0)
  ) {
    State.update({
      inputValue: refBalance,
      stakeMax: true,
      inputError: "Stake at least greater than zero REF",
    });
    return;
  } else {
    State.update({
      inputValue: refBalance,
      stakeMax: true,
      inputError: "",
    });
  }
};

const onClickStake = async () => {
  const stakeAmount = state.inputValue;
  if (
    refBalance &&
    (isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lte(0) ||
      Big(stakeAmount).gt(Big(refBalanceWhole)))
  ) {
    if (
      isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lte(0)
    ) {
      State.update({ inputError: "Stake at least greater than zero REF" });
    } else if (Big(stakeAmount).gt(Big(refBalanceWhole))) {
      State.update({
        inputError: `Max is ${refBalance} REF`,
      });
    } else {
      State.update({
        inputError: "",
      });
    }
    return;
  }
  const transactions = [
    {
      contractName: config.REF_TOKEN_ID,
      methodName: "ft_transfer_call",
      args: {
        receiver_id: config.XREF_TOKEN_ID,
        amount: expandToken(
          stakeMax ? refBalanceWhole : stakeAmount,
          REF_DECIMALS
        ),
        msg: "",
      },
      deposit: new Big("1").toFixed(),
      gas: expandToken(50, 12),
    },
  ];
  if (!storageToken || storageToken.total === "0") {
    transactions.unshift({
      contractName: config.XREF_TOKEN_ID,
      methodName: "storage_deposit",
      args: {
        account_id: accountId,
        registration_only: true,
      },
      deposit: expandToken(0.0125, 24),
      gas: expandToken(50, 12),
    });
  }
  Near.call(transactions);
};
/** events end */

const disabledStakeButton =
  !isValid(state.inputValue) || Big(state.inputValue).eq(0) || state.inputError;

const youWillReceive = (
  Big(refToxrefRate || 0).lte(0)
    ? Big(0).toFixed(5, BIG_ROUND_DOWN)
    : Big(isValid(state.inputValue) ? state.inputValue : 0).div(refToxrefRate)
).toFixed(5, BIG_ROUND_DOWN);
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
          firstIconName: "REF",
          firstIconUrl:
            "https://ipfs.near.social/ipfs/bafkreiauvwi7qjcy2ddzcjobr274vshstk7up22fnr3dbul2lypp755j44",
          secondIconName: "",
          secondIconUrl:
            "https://ipfs.near.social/ipfs/bafkreierdf2ykpfcctanlt7s5xcd5jp7cydnvm3vztdl7ywlwowvuspg4e",
          componentType: "xref",
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
          balance: refBalance,
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
          props={{ text: `${youWillReceive} xREF` }}
        />
      </div>
    </div>
  </StakeFormWrapper>
);
