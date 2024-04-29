const {
  config,
  assetsToSupply,
  yourBorrows,
  showRepayModal,
  showBorrowModal,
  setShowRepayModal,
  setShowBorrowModal,
  onActionSuccess,
  chainId,
  repayETHGas,
  repayERC20Gas,
  borrowETHGas,
  borrowERC20Gas,
  healthFactor,
  formatHealthFactor,
  calcHealthFactor,
  theme,
  dexConfig,
  addAction,
  prices,
} = props;

State.init({
  data: undefined,
});

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const CenterItem = styled.div`
  display: flex;
  align-items: center;
`;

// const BorrowButton = ({ data }) => (
//   <Widget
//     src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
//     props={{
//       config,
//       theme,
//       children: "Borrow",
//       onClick: () => {
//         State.update({ data });
//         setShowBorrowModal(true);
//       },
//     }}
//   />
// );

const RepayButton = ({ data }) => (
  <Widget
    src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
    props={{
      config,
      theme,
      children: "Repay",
      onClick: () => {
        State.update({ data });
        setShowRepayModal(true);
      },
    }}
  />
);

return (
  <>
    {!yourBorrows || yourBorrows.length === 0 ? (
      <Widget
        src={`${config.ownerId}/widget/AAVE.Card.CardEmpty`}
        props={{
          config,
          children: "Nothing borrowed yet",
        }}
      />
    ) : (
      <>
        <Widget
          src={`${config.ownerId}/widget/AAVE.Card.CardsTable`}
          props={{
            config,
            headers: ["Asset", "Debt", "APY", ""],
            data: yourBorrows.map((row) => {
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
                  <div>{Number(row.debt).toFixed(7)}</div>
                  <div>$ {Number(row.debtInUSD).toFixed(2)}</div>
                </div>,
                `${(Number(row.borrowAPY) * 100).toFixed(2)} %`,
                <ButtonGroup>
                  <RepayButton data={{ ...row }} />
                </ButtonGroup>,
              ];
            }),
          }}
        />
      </>
    )}
    {showRepayModal && (
      <Widget
        src={`${config.ownerId}/widget/AAVE.Modal.RepayModal`}
        props={{
          config,
          theme,
          onRequestClose: () => setShowRepayModal(false),
          data: { ...state.data, healthFactor },
          onActionSuccess,
          onlyOneBorrow: yourBorrows.length === 1,
          chainId,
          repayETHGas,
          repayERC20Gas,
          formatHealthFactor,
          calcHealthFactor,
          assetsToSupply,
          addAction,
          dexConfig,
          prices,
        }}
      />
    )}
  </>
);
