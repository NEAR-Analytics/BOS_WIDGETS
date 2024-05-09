const {
  config,
  dexConfig,
  assetsToSupply,
  showSupplyModal,
  setShowSupplyModal,
  onActionSuccess,
  chainId,
  healthFactor,
  formatHealthFactor,
  calcHealthFactor,
  depositETHGas,
  depositERC20Gas,
  theme,
  yourTotalSupply,
  yourSupplies,
  borrowETHGas,
  borrowERC20Gas,
} = props;

State.init({
  data: undefined,
  showBorrowModal: false,
});

const SupplyButton = ({ data, ...rest }) => {
  let disabled;

  if (dexConfig.name === "Seamless Protocol") {
    const { totalSupplyUSD, supplyCap } = data;
    const isFull = Big(totalSupplyUSD || 0).gte(Big(supplyCap || 0));
    disabled = Number(data.balanceInUSD) === 0 || isFull;
  } else {
    disabled = Number(data.balanceInUSD) === 0;
  }
  return (
    <Widget
      src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
      props={{
        config,
        // width: 148,
        theme,
        children: "Supply",
        disabled,
        onClick: () => {
          State.update({ data });
          setShowSupplyModal(true);
        },
      }}
    />
  );
};

const BorrowButton = ({ data }) => {
  let disabled;
  if (dexConfig.name === "Seamless Protocol") {
    const { totalDebtsUSD, borrowCap } = data;
    const isFull = Big(totalDebtsUSD || 0).gte(Big(borrowCap || 0));
    disabled =
      isNaN(Number(yourTotalSupply)) || !Number(yourTotalSupply) || isFull;
  } else {
    disabled = isNaN(Number(yourTotalSupply)) || !Number(yourTotalSupply);
  }
  return (
    <Widget
      src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
      props={{
        config,
        disabled,
        children: "Borrow",
        theme,
        onClick: () => {
          State.update({ data, showBorrowModal: true });
          // setShowBorrowModal(true);
        },
      }}
    />
  );
};

let headers;
let tableData;

if (dexConfig.name === "Seamless Protocol") {
  headers = [
    "Asset",
    "Total supplied",
    "Supply APY",
    "Total Borrowed",
    "Borrow APY",
    "Can be Collateral",
    "",
  ];
  tableData = assetsToSupply.map((row) => [
    <Widget
      src={`${config.ownerId}/widget/AAVE.Card.TokenWrapper`}
      props={{
        children: [
          <img width={64} height={64} src={row.icon} />,
          <div>
            <div className="token-title">{row.symbol}</div>
            <div className="token-chain">{row.name}</div>
          </div>,
        ],
      }}
    />,
    <div>
      <div>
        <Widget
          src={`${config.ownerId}/widget/Utils.FormatNumber`}
          props={{
            number: row.totalSupply,
          }}
        />
      </div>
      <div>
        $
        <Widget
          src={`${config.ownerId}/widget/Utils.FormatNumber`}
          props={{
            number: row.totalSupplyUSD,
          }}
        />
      </div>
    </div>,
    `${(Number(row.supplyAPY) * 100).toFixed(2)} %`,

    <div>
      <div>
        <Widget
          src={`${config.ownerId}/widget/Utils.FormatNumber`}
          props={{
            number: row.totalDebts,
          }}
        />
      </div>
      <div>
        ${" "}
        <Widget
          src={`${config.ownerId}/widget/Utils.FormatNumber`}
          props={{
            number: row.totalDebtsUSD,
          }}
        />
      </div>
    </div>,

    `${(Number(row.variableBorrowAPY) * 100).toFixed(2)} %`,
    <div style={{ paddingLeft: "50px" }}>
      {(row.isIsolated || (!row.isIsolated && !row.usageAsCollateralEnabled)) &&
        "—"}
      {!row.isIsolated && row.usageAsCollateralEnabled && (
        <img
          src={`${config.ipfsPrefix}/bafkreibsy5fzn67veowyalveo6t34rnqvktmok2zutdsp4f5slem3grc3i`}
          width={16}
          height={16}
        />
      )}
    </div>,
    <div style={{ display: "flex", gap: 10 }}>
      <SupplyButton data={row} />
      <BorrowButton
        data={{
          ...row,
        }}
      />
    </div>,
  ]);
}
if (["zerolend", "AAVE V3"].includes(dexConfig.name)) {
  headers = [
    "Asset",
    "Wallet Balance",
    "Supply APY",
    "Available to borrow",
    "Borrow APY",
    "Can be Collateral",
    "",
  ];
  tableData = assetsToSupply.map((row) => [
    <Widget
      src={`${config.ownerId}/widget/AAVE.Card.TokenWrapper`}
      props={{
        children: [
          <img width={64} height={64} src={row.icon} />,
          <div>
            <div className="token-title">{row.symbol}</div>
            <div className="token-chain">{row.name}</div>
          </div>,
        ],
      }}
    />,
    <div>
      <div>{Number(row.balance).toFixed(7)}</div>
      <div>$ {row.balanceInUSD}</div>
    </div>,
    <div>
      <div>{`${(Number(row.supplyAPY) * 100).toFixed(2)} %`}</div>

      <div>
        {dexConfig.rewardToken
          ? `${(Number(row.supplyRewardApy) * 100).toFixed(2)} %`
          : ""}
      </div>
    </div>,
    <div>
      <div>{Number(row.availableBorrows).toFixed(7)}</div>
      <div>$ {row.availableBorrowsUSD}</div>
    </div>,

    <div>
      <div>{`${(Number(row.variableBorrowAPY) * 100).toFixed(2)} %`}</div>
      <div>
        {dexConfig.rewardToken
          ? `${(Number(row.borrowRewardApy) * 100).toFixed(2)} %`
          : ""}
      </div>
    </div>,
    <div style={{ paddingLeft: "50px" }}>
      {(row.isIsolated || (!row.isIsolated && !row.usageAsCollateralEnabled)) &&
        "—"}
      {!row.isIsolated && row.usageAsCollateralEnabled && (
        <img
          src={`${config.ipfsPrefix}/bafkreibsy5fzn67veowyalveo6t34rnqvktmok2zutdsp4f5slem3grc3i`}
          width={16}
          height={16}
        />
      )}
    </div>,
    <div style={{ display: "flex", gap: 10 }}>
      <SupplyButton data={row} />
      <BorrowButton
        data={{
          ...row,
        }}
      />
    </div>,
  ]);
}

return (
  <>
    <Widget
      src={`${config.ownerId}/widget/AAVE.Card.CardsView`}
      props={{
        config,
        style: {
          marginTop: "16px",
        },
        title: "Market",
        body:
          !assetsToSupply || assetsToSupply.length === 0 ? (
            <Widget
              src={`${config.ownerId}/widget/AAVE.Card.CardEmpty`}
              props={{
                config,
                children: "Nothing supplied yet",
              }}
            />
          ) : (
            <>
              <Widget
                src={`${config.ownerId}/widget/AAVE.Card.CardsTable`}
                props={{
                  config,
                  headers,
                  data: tableData,
                }}
              />
            </>
          ),
      }}
    />
    {showSupplyModal && (
      <Widget
        src={`${config.ownerId}/widget/AAVE.Modal.SupplyModal`}
        props={{
          config,
          theme,
          onRequestClose: () => setShowSupplyModal(false),
          data: {
            ...state.data,
            healthFactor,
          },
          onActionSuccess,
          chainId,
          depositETHGas,
          depositERC20Gas,
          formatHealthFactor,
          calcHealthFactor,
        }}
      />
    )}
    {state.showBorrowModal && (
      <Widget
        src={`${config.ownerId}/widget/AAVE.Modal.BorrowModal`}
        props={{
          config,
          theme,
          onRequestClose: () => {
            State.update({
              showBorrowModal: false,
            });
            // setShowBorrowModal(false)
          },
          data: {
            ...state.data,
            healthFactor,
          },
          onActionSuccess,
          chainId,
          borrowETHGas,
          borrowERC20Gas,
          formatHealthFactor,
          calcHealthFactor,
        }}
      />
    )}
  </>
);
