const {
  config,
  assetsToSupply,
  showSupplyModal,
  setShowSupplyModal,
  onActionSuccess,
  chainId,
  healthFactor,
  formatHealthFactor,
  depositETHGas,
  depositERC20Gas,
  theme,

  yourSupplies,
  borrowETHGas,
  borrowERC20Gas,
} = props;

State.init({
  data: undefined,
  showBorrowModal: false,
});

const SupplyButton = ({ data, ...rest }) => {
  return (
    <Widget
      src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
      props={{
        config,
        // width: 148,
        theme,
        children: "Supply",
        disabled: Number(data.balanceInUSD) === 0,
        onClick: () => {
          State.update({ data });
          setShowSupplyModal(true);
        },
      }}
    />
  );
};

const BorrowButton = ({ data }) => (
  <Widget
    src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
    props={{
      config,
      children: "Borrow",
      theme,
      onClick: () => {
        State.update({ data, showBorrowModal: true });
        // setShowBorrowModal(true);
      },
    }}
  />
);

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
                  headers: [
                    "Asset",
                    "Wallet Balance",
                    "Supply APY",
                    "Available to borrow",
                    "Borrow APY",
                    "Can be Collateral",
                    "",
                  ],
                  data: assetsToSupply.map((row) => [
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
                    `${(Number(row.supplyAPY) * 100).toFixed(2)} %`,

                    <div>
                      <div>{Number(row.availableBorrows).toFixed(7)}</div>
                      <div>$ {row.availableBorrowsUSD}</div>
                    </div>,

                    `${(Number(row.variableBorrowAPY) * 100).toFixed(2)} %`,
                    <div style={{ paddingLeft: "50px" }}>
                      {(row.isIsolated ||
                        (!row.isIsolated && !row.usageAsCollateralEnabled)) &&
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
                  ]),
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
        }}
      />
    )}
  </>
);
