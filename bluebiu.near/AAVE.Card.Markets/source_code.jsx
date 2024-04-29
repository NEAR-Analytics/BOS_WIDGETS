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
  prices,
} = props;

const CenterRow = styled.div`
  /* text-align: center; */
`;

const CenterItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemPrimary = styled.div`
  font-size: 16px;

  &.apy {
    color: rgb(34, 160, 107);
  }
`;
const ItemSub = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgb(162, 166, 149);
  &.radio {
    display: flex;
    gap: 3px;
    align-items: center;
    color: rgb(178, 232, 16);
  }
`;

const IconMouth = styled.img`
  width: 14px;
  height: 14px;
`;

State.init({
  data: undefined,
  showBorrowModal: false,
  showLoopModal: false,
});

const SupplyButton = ({ data, ...rest }) => {
  // let disabled;

  // if (dexConfig.name === "Seamless Protocol") {
  //   const { totalSupplyUSD, supplyCapUSD } = data;
  //   const isFull = Big(totalSupplyUSD || 0).gte(Big(supplyCapUSD || 0));

  //   disabled = !data.balanceInUSD || Number(data.balanceInUSD) === 0 || isFull;
  // } else {
  //   disabled = !data.balanceInUSD || Number(data.balanceInUSD) === 0;
  // }

  return (
    <Widget
      src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
      props={{
        config,
        // width: 148,
        theme,
        children: "Supply",
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

const LoopButton = ({ data }) => {
  let disabled;
  // if (dexConfig.name === "Seamless Protocol") {
  //   const { totalSupplyUSD, supplyCapUSD } = data;
  //   const isFull = Big(totalSupplyUSD || 0).gte(Big(supplyCapUSD || 0));

  //   disabled = Number(data.balanceInUSD) === 0 || isFull;
  // } else {
  //   disabled = Number(data.balanceInUSD) === 0;
  // }
  disabled = !data.balanceInUSD || Number(data.balanceInUSD) === 0;

  return (
    <Widget
      src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
      props={{
        config,
        disabled,
        children: "Loop",
        theme,
        onClick: () => {
          State.update({ data, showLoopModal: true });
        },
      }}
    />
  );
};

function formatRate(_value) {
  if (isNaN(Number(_value))) return "";
  let value = (Number(_value) * 100).toFixed();
  return Big(value || 0).lt(0.01) ? "<0.01%" : `${Number(value).toFixed(2)}%`;
}

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
      <div>
        {row.supplyAPY ? `${(Number(row.supplyAPY) * 100).toFixed(2)} %` : ""}
      </div>

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
      <div>
        {row.borrowAPY ? `${(Number(row.borrowAPY) * 100).toFixed(2)} %` : ""}
      </div>
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
if (["Pac Finance"].includes(dexConfig.name)) {
  headers = [
    "Assets",
    "Your Balance",
    // "Estimated Blast Points",
    "Supply APY",
    "Borrow APY",
    "Pool Liquidity",
    // "Can be Collateral",
    "",
  ];
  tableData = assetsToSupply.map((row) => [
    <Widget
      src={`${config.ownerId}/widget/AAVE.Card.TokenWrapper`}
      props={{
        children: [
          <img width={64} height={64} src={row.icon} />,
          <CenterItem>
            <ItemPrimary style={{ fontWeight: 700 }}>{row.symbol}</ItemPrimary>
            <ItemSub>LTV: {Big(row.LTV).times(100).toFixed()}%</ItemSub>
          </CenterItem>,
        ],
      }}
    />,
    <CenterItem>
      <ItemPrimary>{formatValue(row.balance, 7)}</ItemPrimary>
      <ItemSub>{formatNumber(row.balanceInUSD)}</ItemSub>
    </CenterItem>,
    // <CenterItem>
    //   <ItemPrimary>{}</ItemPrimary>
    //   <ItemSub>{`Pts/day/${row.symbol}`}</ItemSub>
    // </CenterItem>,
    <CenterItem>
      <ItemPrimary className="apy">{`${(
        (Number(row.supplyAPY) + Number(row.NATIVE_YIELD || 0)) *
        100
      ).toFixed(2)} %`}</ItemPrimary>
      <ItemSub className="radio">
        <IconMouth src="https://ipfs.near.social/ipfs/bafkreiffqyfmusnew73zt6slkeoryvevuw7ojcgvfdirgf3oqdsll5yyga" />
        {Number(row.EXTRA_RADIO) * 100}%
      </ItemSub>
    </CenterItem>,
    <CenterItem>
      <ItemPrimary className="apy">
        {row.borrowAPY ? `${(Number(row.borrowAPY) * 100).toFixed(2)} %` : ""}
      </ItemPrimary>
    </CenterItem>,
    <CenterItem>
      <ItemPrimary>
        <Widget
          src={`${config.ownerId}/widget/Utils.FormatNumber`}
          props={{ number: row.totalSupply }}
        />
      </ItemPrimary>
      <ItemSub>{formatRate(row.utilized)} utilized</ItemSub>
    </CenterItem>,
    // <CenterItem style={{ paddingLeft: "50px" }}>
    //   {(row.isIsolated || (!row.isIsolated && !row.usageAsCollateralEnabled)) &&
    //     "—"}
    //   {!row.isIsolated && row.usageAsCollateralEnabled && (
    //     <img
    //       src={`${config.ipfsPrefix}/bafkreibsy5fzn67veowyalveo6t34rnqvktmok2zutdsp4f5slem3grc3i`}
    //       width={16}
    //       height={16}
    //     />
    //   )}
    // </CenterItem>,
    <div style={{ display: "flex", gap: 10 }}>
      <SupplyButton data={row} />
      {row.supportBorrow ? (
        <BorrowButton
          data={{
            ...row,
          }}
        />
      ) : (
        <div style={{ width: "100%" }}></div>
      )}

      {row.supportLoop ? (
        <LoopButton data={row} />
      ) : (
        <div style={{ width: "100%" }}></div>
      )}
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
          prices,
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
          prices,
        }}
      />
    )}
    {state.showLoopModal && (
      <Widget
        src={`${config.ownerId}/widget/AAVE.Modal.LoopModal`}
        props={{
          config,
          theme,
          // onRequestClose: () => setShowSupplyModal(false),
          onRequestClose: () => {
            State.update({
              showLoopModal: false,
            });
          },
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
          prices,
        }}
      />
    )}
  </>
);
