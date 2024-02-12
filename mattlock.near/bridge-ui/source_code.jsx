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
  allWithdrawals,
  allDeposits,
  depositDisabled,
  withdrawDisabled,
  onTabChange,
  onAction,
  title,
  isLoading,
  log,
  explorerLink,
  tokens,
  L1ExplorerLink,
  L2ExplorerLink,
  withdrawalActions,
} = props;
if (!tokens) {
  tokens = {
    eth: {
      icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
      decimals: 18,
    },
    usdc: {
      icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
      decimals: 6,
    },
  };
}
if (!deposit) deposit = defaultDeposit;
if (!withdraw) withdraw = defaultWithdraw;
if (!allWithdrawals) allWithdrawals = [];
if (!allDeposits) allDeposits = [];
const { action, amount } = state;
const { assets } = deposit;
const isDeposit = !action || action === "deposit";
const actionTitle = isDeposit ? "Deposit" : "Withdraw";

if (assets && !state.selectedAsset) {
  initState({
    selectedAsset: assets.find((a) => a.selected) || assets?.[0],
    isTokenListOpen: false,
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

  .tokens {
    .selected {
      position: relative;
      min-width: 108px;
    }
    .token-list {
      min-width: 108px;
      position: absolute;
      top: 8px;
      left: 8px;
    }
    .token-row {
      display: flex;
      align-items: center;
      padding: 8px;
      > img {
        width: 32px;
        margin-right: 8px;
      }
      &:hover {
        border-color: var(--bs-btn-active-bg);
        background-color: var(--dialog-bg-color);
        border-radius: 8px;
      }
      &:nth-child(2) {
        margin-top: 16px;
      }
    }
    .selected, .token-list {
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }
  }


    * {
        font-family: 'Inter custom',sans-serif;
    }

    .title {
      margin-top: 8px;
    }

    .actionTabs {
      background-color: var(--bs-btn-active-bg);
      border: 1px solid var(--border-color);
      height: 38px;

      input:checked + label {
        color: var(--button-text-color);
      }
    }

    button {
      border: 1px solid var(--border-color);
      color: var(--button-text-color);
      background-color: var(--bs-btn-active-bg) !important;
      &:hover {
        background-color: var(--border-color) !important;
      }
    }

    .action {
      background: black;
      color: white;
    }

    .balance {
      input {
        height: 48px;
        padding: 8px;
        background: var(--bg-color);
        color: white;
        border: 1px solid var(--border-color);
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
      background-color: var(--dialog-bg-color);
      color: white;
      border-color: rgb(13, 110, 253);
    }

    .tx-list {
      max-height: 94px;
      overflow: hidden;
      overflow-y: scroll;
    }
`;

const renderTxLink = (tx, isL1) => {
  let link = `https://${
    network === "testnet" ? "goerli." : ""
  }explorer.zksync.io/tx/${tx}`;
  if (L1ExplorerLink || L2ExplorerLink) {
    link = isL1 ? L1ExplorerLink + tx : L2ExplorerLink + tx;
  }
  return (
    <a href={link} target="_blank">
      {tx.substring(0, 6)} ... {tx.substring(tx.length - 4)}
    </a>
  );
};

const renderTx = (tx, i, isL1) => {
  const { transactionHash: h, isEth } = tx;
  return (
    <>
      <p style={{ textAlign: "left" }}>
        {isEth ? "ETH " : "USDC"}
        {renderTxLink(h, isL1)}
        {withdrawalActions.map(
          ({ labelComplete, completeKey, actionLabel, action }) => {
            const isComplete = tx[completeKey];

            if (typeof isComplete !== "boolean") return <></>;
            return (
              <>
                {isComplete ? (
                  <span>{labelComplete}</span>
                ) : (
                  <button onClick={() => action(allWithdrawals[i])}>
                    {actionLabel}
                  </button>
                )}
              </>
            );
          }
        )}
      </p>
    </>
  );
};

// console.log("deposit", deposit);
// console.log("withdraw", withdraw);
// console.log("selectedAsset", selectedAsset);
// console.log("selectedAssetWithdraw", selectedAssetWithdraw);

const actionDisabled =
  isLoading ||
  (actionTitle === "Deposit" && depositDisabled) ||
  (actionTitle === "Withdraw" && withdrawDisabled);

const { isTokenListOpen } = state;

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

    <div className="p-4">
      <div className="d-flex justify-content-between">
        <div className="assets d-flex flex-column gap-2">
          <span>{deposit.network.name}</span>
          <div className="tokens">
            <div className="selected">
              {selectedAsset && (
                <div
                  className="token-row"
                  onClick={() => {
                    State.update({
                      isTokenListOpen: !isTokenListOpen,
                    });
                  }}
                >
                  <img src={tokens[selectedAsset.id].icon} />
                  <div>{selectedAsset.name}</div>
                </div>
              )}
              {isTokenListOpen && (
                <div className="token-list">
                  {assets &&
                    assets.map((asset) => (
                      <div
                        className="token-row"
                        onClick={() => {
                          State.update({
                            selectedAsset: asset,
                            isTokenListOpen: false,
                          });
                        }}
                      >
                        <img src={tokens[asset.id].icon} />
                        <div>{asset.name}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
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
            <button onClick={handleMax}>max</button>
          </div>
        </div>
      </div>
    </div>
    {false && (
      <>
        <div className="border border-secondary border-bottom-0 border-light" />
        <div className="p-4">
          <div>
            Balance on {withdraw.network.name}: {selectedAssetWithdraw.balance}
          </div>
        </div>
      </>
    )}
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
        <div className="alert" role="alert">
          <div>{log}</div>
          {explorerLink && (
            <a href={explorerLink} className="alert-link" target="_blank">
              Block Explorer Link
            </a>
          )}
        </div>
      )}
    </div>
    <div className="border border-secondary border-bottom-0 border-light" />
    <div className="p-4 d-grid gap-3">
      <div>
        <p style={{ marginTop: 16, fontWeight: "bold" }}>
          Withdrawals: {allWithdrawals.length}
        </p>
        <div className="tx-list">
          {allWithdrawals.map((tx, i) => renderTx(tx, i, false))}
        </div>
        <p style={{ marginTop: 16, fontWeight: "bold" }}>
          Deposits: {allDeposits.length}
        </p>
        <div className="tx-list">
          {allDeposits.map((tx, i) => renderTx(tx, i, true))}
        </div>
      </div>
    </div>
  </Theme>
);
