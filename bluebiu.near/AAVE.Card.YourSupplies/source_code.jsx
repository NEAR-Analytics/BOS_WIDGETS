const {
  formatNumber,
  config,
  chainId,
  yourSupplies,
  yourTotalBorrow,
  yourTotalCollateral,
  onActionSuccess,
  showWithdrawModal,
  setShowWithdrawModal,
  healthFactor,
  withdrawETHGas,
  withdrawERC20Gas,
  formatHealthFactor,
  calcHealthFactor,
  account,
  addAction,
  dexConfig,
  threshold,
  prices,
  theme,
  onRefresh,
} = props;

State.init({
  data: undefined,
  showCollateralModal,
});

const CenterItem = styled.div`
  display: flex;
  align-items: center;
`;

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
const renderCollateral = (record) => {
  return (
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Switch"
      props={{
        theme,
        onChange: () => {
          console.log("--------", record);

          State.update({
            data: record,
            showCollateralModal: true,
            flag: record.isCollateraled ? false : true,
          });
        },
        active: record.isCollateraled ? true : false,
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
            headers: ["Asset", "Balance", "APY", "Collateral", ""],
            data: yourSupplies.map((row) => {
              return [
                <Widget
                  src={`${config.ownerId}/widget/AAVE.Card.TokenWrapper`}
                  props={{
                    children: [
                      <img width={64} height={64} src={row?.icon} />,
                      <CenterItem>
                        <div className="token-title">{row.symbol}</div>
                        {/* <div className="token-chain">{row.name}</div> */}
                      </CenterItem>,
                    ],
                  }}
                />,
                <div>
                  <div>{Number(row.underlyingBalance).toFixed(7)}</div>
                  <div>{formatNumber(row.underlyingBalanceUSD, 2)}</div>
                </div>,

                <div>
                  <div>{`${(Number(row.supplyAPY) * 100).toFixed(2)} %`}</div>

                  <div>
                    {dexConfig.rewardToken && row.supplyRewardApy
                      ? `${(Number(row.supplyRewardApy) * 100).toFixed(2)} %`
                      : ""}
                  </div>
                </div>,
                renderCollateral(row),

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
          dexConfig,
          onActionSuccess,
          withdrawETHGas,
          withdrawERC20Gas,
          formatHealthFactor,
          calcHealthFactor,
          account,
          prices,
          yourTotalBorrow,
          yourTotalCollateral,
          threshold,
          addAction,
          onRequestClose: () => setShowWithdrawModal(false),
        }}
      />
    )}
    {state.showCollateralModal && (
      <Widget
        src={`${config.ownerId}/widget/AAVE.Modal.CollateralModal`}
        props={{
          flag: state.flag,
          config,
          theme,
          chainId,
          data: {
            ...state.data,
            healthFactor,
          },
          onActionSuccess,
          formatHealthFactor,
          calcHealthFactor,
          yourTotalBorrow,
          account,
          onRequestClose: () => {
            State.update({
              showCollateralModal: false,
            });
            onRefresh?.();
          },
        }}
      />
    )}
  </>
);
