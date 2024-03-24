const {
  config,
  chainId,
  yourSupplies,
  onActionSuccess,
  showWithdrawModal,
  setShowWithdrawModal,
  healthFactor,
  withdrawETHGas,
  withdrawERC20Gas,
  formatHealthFactor,
  account,
  theme,
} = props;

State.init({
  data: undefined,
});

const WithdrawButton = ({ data }) => {
  return (
    <Widget
      src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
      props={{
        config,
        theme,
        // width: 148,
        children: "Withdraw",
        onClick: () => {
          State.update({ data });
          setShowWithdrawModal(true);
        },
      }}
    />
  );
};

return (
  <>
    {!yourSupplies || yourSupplies.length === 0 ? (
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
            headers: ["Asset", "Balance", "APY", ""],
            data: yourSupplies.map((row) => {
              return [
                <Widget
                  src={`${config.ownerId}/widget/AAVE.Card.TokenWrapper`}
                  props={{
                    children: [
                      <img width={64} height={64} src={row?.icon} />,
                      <div>
                        <div className="token-title">{row.symbol}</div>
                        <div className="token-chain">{row.name}</div>
                      </div>,
                    ],
                  }}
                />,
                <div>
                  <div>{Number(row.underlyingBalance).toFixed(7)}</div>
                  <div>$ {Number(row.underlyingBalanceUSD).toFixed(2)}</div>
                </div>,
                `${(Number(row.supplyAPY) * 100).toFixed(2)} %`,
                <WithdrawButton data={row} />,
              ];
            }),
          }}
        />
      </>
    )}
    {showWithdrawModal && (
      <Widget
        src={`${config.ownerId}/widget/AAVE.Modal.WithdrawModal`}
        props={{
          config,
          theme,
          chainId,
          data: {
            ...state.data,
            healthFactor,
          },
          onActionSuccess,
          withdrawETHGas,
          withdrawERC20Gas,
          formatHealthFactor,
          account,
          onRequestClose: () => setShowWithdrawModal(false),
        }}
      />
    )}
  </>
);
