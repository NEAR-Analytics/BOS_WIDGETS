const Container = styled.div`
    .template{
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin-left:6px;
    }
    .template .title{
      font-size:14px;
      color:#7E8A93;
    }
    .template .value{
      font-size:14px;
      color:#fff;
    }
    .mt_25{
      margin-top:25px;
    }
    .mt-10{
      margin-top:10px;
    }
    .greenButton{
      display:flex;
      align-items:center;
      justify-content:center;
      background: #00FFD1;
      border-radius: 12px;
      height:46px;
      font-weight: 700;
      font-size: 18px;
      color:#000;
      cursor:pointer;
      width:100%;
    }
    .disabled{
      opacity:0.3;
      cursor: not-allowed;
    }
`;
const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1001;
`;
const Modal = styled.div`
  background-color:#1A2E33;
  border-radius:12px;
  position:fixed;
  z-index:1002;
  width:30rem;
  max-width: 95vw;
  max-height: 80vh;
  padding:10px 0 20px 0;
  animation:anishow 0.3s forwards ease-out;
  left:50%;
  top:50%;
  @keyframes anishow {
    from {
      opacity: 0;
      transform:translate(-50%,-70%);
    }
    to {
      opacity: 1;
      transform:translate(-50%,-50%);
    }
  }
    .modal-header{
      display:flex;
      align-items:center;
      justify-content:start;
      color:#fff;
      font-weight: 700;
      font-size: 18px;
      padding:12px 20px;
      margin-bottom:16px;
      border-bottom:2px solid rgba(48, 67, 82, 0.5);
    } 
    .modal-header .title{
       font-weight: 700;
       font-size: 18px;
       color:#fff;
    }
    .modal-header .btn-close{
      position:absolute;
      right:28px;
      margin:0;
    }
    .modal-body {
        padding:0 16px;
    }
    .modal-body .tab{
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin-bottom:30px;
    }
    .modal-body .tab span{
      display:flex;
      align-items:center;
      justify-content:center;
      width:50%;
      height:40px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 18px;
      cursor:pointer;
      color:#fff;
    }
    .modal-body .tab span.active{
      background: #304352;
    }
   .btn-close-custom{
      position:absolute;
      right:28px;
      width:12px;
      height:12px;
      cursor:pointer;
    }
`;
/** base tool start  */
let accountId = context.accountId;
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
let BURROW_CONTRACT = "contract.main.burrow.near";
const toAPY = (v) => Math.round(v * 100) / 100;
const clone = (o) => JSON.parse(JSON.stringify(o));
const shrinkToken = (value, decimals) => {
  return new Big(value).div(new Big(10).pow(decimals));
};

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};
const formatToken = (v) => Math.floor(v * 10_000) / 10_000;
const { selectedTokenId, selectedTokenMeta, showModal, closeModal } = props;
const {
  rewards,
  account,
  balances,
  amount,
  hasError,
  assets,
  wnearbase64,
  closeButtonBase64,
} = state;
if (!showModal) {
  State.update({
    amount: "",
    hasError: false,
  });
}
const hasData = assets.length > 0 && rewards.length > 0 && account;
/** base tool end */
const onLoad = (data) => {
  State.update(data);
};
/** logic start */
let availableBalance = 0;
let apy = 0;

const getBalance = (asset) => {
  if (!asset) return 0;
  const { accountBalance, metadata } = asset;
  return formatToken(shrinkToken(accountBalance, metadata.decimals).toFixed());
};

const getApy = (asset) => {
  if (!asset) return 0;
  const r = rewards.find((a) => a.token_id === asset.token_id);
  return toAPY(r.apyBaseBorrow);
};

if (selectedTokenId && assets) {
  const token = selectedTokenId === "NEAR" ? "wrap.near" : selectedTokenId;
  const asset = assets.find((a) => a.token_id === token);
  availableBalance =
    selectedTokenId === "NEAR" ? nearBalance : getBalance(asset);
  apy = getApy(asset);
}

const storageBurrow = Near.view(BURROW_CONTRACT, "storage_balance_of", {
  account_id: accountId,
});

const storageToken = selectedTokenId
  ? Near.view(selectedTokenId, "storage_balance_of", {
      account_id: accountId,
    })
  : null;

const handleAmount = (e) => {
  State.update({
    amount: Number(e.target.value),
    selectedTokenId,
    hasError: false,
  });
};
const handleRepay = () => {
  const asset = assets.find((a) => a.token_id === selectedTokenId);

  if (!selectedTokenId || !amount || hasError) return;

  if (amount > availableBalance) {
    State.update({ selectedTokenId, amount, hasError: true });
    return;
  }
  const transactions = [];

  const expandedAmount = expandToken(
    amount,
    asset.metadata.decimals + asset.config.extra_decimals
  );

  const repayTemplate = {
    Execute: {
      actions: [
        {
          Repay: {
            max_amount: expandedAmount.toFixed(0),
            token_id: selectedTokenId,
          },
        },
      ],
    },
  };

  const repayTransaction = {
    contractName: selectedTokenId,
    methodName: "ft_transfer_call",
    deposit: new Big("1").toFixed(),
    gas: expandToken(300, 12),
    args: {
      receiver_id: BURROW_CONTRACT,
      amount: expandToken(amount, selectedTokenMeta.decimals).toFixed(),
      msg: JSON.stringify(repayTemplate),
    },
  };

  if (storageToken?.available === "0" || !storageToken?.available) {
    transactions.push({
      contractName: selectedTokenId,
      methodName: "storage_deposit",
      deposit: expandToken(0.25, 24).toFixed(),
    });
  }

  if (storageBurrow?.available === "0" || !storageBurrow?.available) {
    transactions.push({
      contractName: BURROW_CONTRACT,
      methodName: "storage_deposit",
      deposit: expandToken(0.25, 24).toFixed(),
      gas: expandToken(140, 12),
    });
  }

  transactions.push(repayTransaction);

  Near.call(transactions);
};
function getWnearIcon(icon) {
  State.update({
    wnearbase64: icon,
  });
}
function getCloseButtonIcon(icon) {
  State.update({
    closeButtonBase64: icon,
  });
}
/** logic end */
return (
  <Container>
    {/* load data */}
    {!hasData && (
      <Widget src="juaner.near/widget/ref_burrow-data" props={{ onLoad }} />
    )}
    {/* load icons */}
    <Widget
      src="juaner.near/widget/ref-icons"
      props={{ getWnearIcon, getCloseButtonIcon }}
    />
    {/** modal */}
    <Modal style={{ display: showModal ? "block" : "none" }}>
      <div class="modal-header">
        <div class="title">Repay</div>
        <img
          class="btn-close-custom"
          src={closeButtonBase64}
          onClick={closeModal}
        />
      </div>
      <div class="modal-body">
        <div class="content">
          <Widget
            src="juaner.near/widget/ref-input-box"
            props={{
              handleAmount,
              balance: availableBalance,
              balance$: availableUSD,
            }}
          />
          {hasError && (
            <p class="alert alert-danger mt-10" role="alert">
              Amount greater than available
            </p>
          )}
          <div class="template mt_25">
            <span class="title">Borrow APY</span>
            <span class="value">{apy}%</span>
          </div>
          <div
            class={`greenButton mt_25 ${Number(amount) ? "" : "disabled"}`}
            onClick={handleRepay}
          >
            Repay
          </div>
        </div>
      </div>
    </Modal>
    <Backdrop
      style={{ display: showModal ? "block" : "none" }}
      onClick={closeModal}
    ></Backdrop>
  </Container>
);
