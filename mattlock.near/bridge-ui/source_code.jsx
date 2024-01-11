/*
// the shape of props data
{
  "isLoading": true,
  "log": "The TX hash is: 0x2c5d223e47ecd9ac68fbdcd3eeb2bc4615ce6f7209d295104131c1440056497e Etherscan",
  "explorerLink": "https://etherscan.io/tx/123",
  "title": "zkBridge",
  "deposit": defaultDeposit,
  "withdraw": defaultWithdraw,
  "amount": "0.1"
}
*/

const defaultDeposit = {
  network: {
    id: "l1",
    name: "Ethereum",
  },
  assets: [
    {
      id: "eth",
      name: "ETH",
      selected: true,
      balance: "0.00",
    },
    {
      id: "usdc",
      name: "USDC",
      selected: false,
      balance: "0.00",
    },
  ],
};
const defaultWithdraw = {
  network: {
    id: "l2",
    name: "zkSync Era",
  },
  assets: [
    {
      id: "eth",
      name: "ETH",
      selected: false,
      balance: "0.00",
    },
    {
      id: "usdc",
      name: "USDC",
      selected: true,
      balance: "0.00",
    },
  ],
};

const {
  deposit,
  withdraw,
  depositDisabled,
  withdrawDisabled,
  onTabChange,
  onAction,
  title,
  isLoading,
  log,
  explorerLink,
  tokens,
} = props;
if (!deposit) deposit = defaultDeposit;
if (!withdraw) withdraw = defaultWithdraw;
const { action, amount } = state;
const { assets } = deposit;
const isDeposit = !action || action === "deposit";
const actionTitle = isDeposit ? "Deposit" : "Withdraw";

if (assets && !state.selectedAsset) {
  initState({
    selectedAsset: assets.find((a) => a.selected) || assets?.[0],
    displayCurrencySelect: false,
    currency: tokens[0],
    selectedTokenAddress: tokens[0].address,
  });
}

const selectedAsset = state.selectedAsset
  ? assets?.find((a) => a.id === state.selectedAsset.id)
  : undefined;

const selectedAssetWithdraw = state.selectedAsset
  ? withdraw?.assets?.find((a) => a.id === state.selectedAsset.id)
  : undefined;

const handleAction = () => {
  if (onAction)
    onAction({
      networkId: deposit.network.id,
      amount,
      assetId: selectedAsset.id,
      action: isDeposit ? "deposit" : "withdraw",
    });
};

const handleMax = () => {
  State.update({ amount: selectedAsset.balance });
};

const handleAmountChange = (e) => {
  State.update({ amount: e.target.value });
};

const handleAssetChange = (e) => {
  State.update({ selectedAsset: assets?.find((a) => a.id === e.target.value) });
};

const handleTabChange = (tab) => {
  if (isDeposit && tab === "deposit") return;
  if (!isDeposit && tab === "withdraw") return;
  State.update({ action: tab, amount: 0 });
  if (onTabChange) onTabChange(tab);
};

const Theme = styled.div`

  --bg-color: #181a27;
  --border-color: #2c334b;
  --label-color: #82a7ff;
  --chain-name-color: #fff;
  --input-border-color: #332c4b;
  --button-color: #004bfc;
  --button-text-color: #fff;
  --thirdary-text-color: #7c7f96;
  --arrow-color: #82a7ff;
  --swap-icon-color: #787da1;
  --tx-button-color: #64b5ff;
  --processing-color: #979abe;
  --success-color: #1abd00;
  --dialog-bg-color: #373a53;
  --dialog-info-color: #ff61d3;
  --token-list-hover-color: rgba(24, 26, 39, 0.3);

    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    margin-top: 1rem;
    background: var(--bg-color);
    color: white;

    * {
        font-family: 'Inter custom',sans-serif;
    }

    .title {
      margin-top: 8px;
    }

    .actionTabs {
      border: 1px solid black;
      height: 38px;

      input:checked + label {
        color: black;
      }

      label {
        border: 1px solid black !important;
        height: 38px;
        
        &:hover {
          color: black;
        }
      }
    }

    button {
      border: 1px solid black;
      color: var(--button-color);
      background-color: var(--button-text-color);
    }

    .action {
      background: black;
      color: white;
    }

    .balance {
      input {
        height: 38px;
        background: #f5f6fd;
        color: black;
        border: 1px solid black;
      }
    }

    .assets {
      select {
        background: #f5f6fd;
        color: black;
      }
    }

    .alert {
      word-break: break-word;
    }
`;

// console.log("deposit", deposit);
// console.log("withdraw", withdraw);
// console.log("selectedAsset", selectedAsset);
// console.log("selectedAssetWithdraw", selectedAssetWithdraw);

const actionDisabled =
  isLoading ||
  (actionTitle === "Deposit" && depositDisabled) ||
  (actionTitle === "Withdraw" && withdrawDisabled);

const { currency, displayCurrencySelect } = state;

return (
  <Theme>
    <div className="d-flex gap-4 align-items-center mb-3 justify-content-center">
      <h5 className="title">{title || "Bridge"}</h5>
      <div className="actionTabs btn-group" role="group" aria-label="Deposit">
        <input
          id="deposit"
          type="radio"
          className="btn-check"
          name="btnradioaction"
          autocomplete="off"
          checked={isDeposit}
          onClick={() => handleTabChange("deposit")}
        />
        <label className="btn btn-outline-primary" for="deposit">
          Deposit
        </label>
        <input
          id="withdraw"
          type="radio"
          className="btn-check"
          name="btnradioaction"
          autocomplete="off"
          checked={!isDeposit}
          onClick={() => handleTabChange("withdraw")}
        />
        <label className="btn btn-outline-primary" for="withdraw">
          Withdraw
        </label>
      </div>
    </div>
    <div className="border border-secondary border-bottom-0 border-light" />

    <Widget
      src={"bluebiu.near/widget/Base.Bridge.Input"}
      props={{
        currency,
        onCurrencySelectOpen: () => {
          State.update({
            displayCurrencySelect: !state.displayCurrencySelect,
            selectedTokenAddress: state.currency.address,
          });
        },
        onGetPrice: () => {},
      }}
    />

    <Widget
      src={"bluebiu.near/widget/Base.Bridge.TokenList"}
      props={{
        tokens,
        display: displayCurrencySelect,
        onSelect: (currency) => {
          State.update({
            currency,
            selectedTokenAddress: currency.address,
            displayCurrencySelect: false,
          });
        },
        onClose: () => {
          State.update({
            displayCurrencySelect: false,
          });
        },
      }}
    />

    <div className="p-4">
      <div className="d-flex justify-content-between">
        <div className="assets d-flex flex-column gap-2">
          <span>{deposit.network.name}</span>
          <select
            className="form-select"
            aria-label="select asset"
            onChange={handleAssetChange}
          >
            {assets &&
              assets.map((asset) => (
                <option value={asset.id} selected={asset.selected}>
                  {asset.name}
                </option>
              ))}
          </select>
        </div>
        <div className="d-flex flex-column gap-2">
          <div className="d-flex justify-content-between">
            <span>Balance: {selectedAsset.balance}</span>
          </div>
          <div className="balance input-group">
            <input
              style={{ maxWidth: "120px" }}
              type="number"
              min="0"
              step="0.1"
              defaultValue={props.amount}
              value={amount}
              placeholder="0.00"
              onChange={handleAmountChange}
            />
            <button className="btn btn-light btn-sm max" onClick={handleMax}>
              max
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="border border-secondary border-bottom-0 border-light" />
    <div className="p-4 d-flex justify-content-between">
      <div>{withdraw.network.name}</div>
      <div>Balance: {selectedAssetWithdraw.balance}</div>
    </div>
    <div className="border border-secondary border-bottom-0 border-light" />
    <div className="p-4 d-grid gap-3">
      <button
        className="action btn btn-primary"
        onClick={handleAction}
        disabled={actionDisabled}
      >
        {isLoading ? "Loading..." : actionTitle}
      </button>
      {log && (
        <div className="alert alert-success" role="alert">
          <div>{log}</div>
          {explorerLink && (
            <a href={explorerLink} className="alert-link" target="_blank">
              Block Explorer Link
            </a>
          )}
        </div>
      )}
    </div>
  </Theme>
);
