const {
  config,
  addAction,
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

const CenterRow = styled.div`
  /* text-align: center; */
`;

State.init({
  data: undefined,
  showBorrowModal: false,
});
const CenterItem = styled.div`
  display: flex;
  align-items: center;
`;

const SupplyButton = ({ data, ...rest }) => {
  let disabled;

  if (dexConfig.name === "Seamless Protocol") {
    const { totalSupplyUSD, supplyCapUSD } = data;
    const isFull = Big(totalSupplyUSD || 0).gte(Big(supplyCapUSD || 0));

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
    const { totalDebtsUSD, borrowCapUSD } = data;
    const isFull = Big(totalDebtsUSD || 0).gte(Big(borrowCapUSD || 0));

    disabled =
      isNaN(Number(yourTotalSupply)) || !Number(yourTotalSupply) || isFull;
  } else {
    disabled = isNaN(Number(yourTotalSupply)) || !Number(yourTotalSupply);
  }
  if (!data.supportBorrow) {
    disabled = true;
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
function formatNumber(value, digits) {
  if (isNaN(Number(value))) return "";
  if (Big(value || 0).eq(0)) return `$ 0`;
  return Big(value || 0).lt(0.01)
    ? "< $0.01"
    : `$ ${Number(value).toFixed(digits || 2)}`;
}
function formatValue(value, digits) {
  if (isNaN(Number(value))) return "";
  if (Number(value) === 0) return "0";
  return Big(value || 0).lt(0.0000001)
    ? "< 0.0000001"
    : `${Number(value).toFixed(digits || 2)}`;
}
let headers;
let tableData;

if (["ZeroLend", "AAVE V3", "Seamless Protocol"].includes(dexConfig.name)) {
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
          <CenterItem>
            <div className="token-title">{row.symbol}</div>
            {/* <div className="token-chain">{row.name}</div> */}
          </CenterItem>,
        ],
      }}
    />,
    <div>
      <div>{formatValue(row.balance, 7)}</div>
      <div>{formatNumber(row.balanceInUSD)}</div>
    </div>,
    <div>
      <div>{`${(Number(row.supplyAPY) * 100).toFixed(2)} %`}</div>

      <div>
        {dexConfig.rewardToken && row.supplyRewardApy
          ? `${(Number(row.supplyRewardApy) * 100).toFixed(2)} %`
          : ""}
      </div>
    </div>,
    <div>
      <CenterRow>{formatValue(row.availableBorrows, 7)}</CenterRow>
      <CenterRow>{formatNumber(row.availableBorrowsUSD)}</CenterRow>
      {/* <CenterRow>
        {row.availableBorrows ? Number(row.availableBorrows).toFixed(7) : ""}
      </CenterRow>

      <CenterRow>
        {row.availableBorrowsUSD
          ? `$${Number(row.availableBorrowsUSD).toFixed(2)}`
          : ""}
      </CenterRow> */}
    </div>,

    <div>
      <div>{`${(Number(row.borrowAPY) * 100).toFixed(2)} %`}</div>
      <div>
        {dexConfig.rewardToken && row.borrowRewardApy
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
          addAction,
          dexConfig,
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
          addAction,
          dexConfig,
        }}
      />
    )}
  </>
);
