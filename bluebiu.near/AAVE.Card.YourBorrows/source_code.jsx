const {
  config,
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
  formatHealthFactor,
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

const BorrowButton = ({ data }) => (
  <Widget
    src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
    props={{
      config,
      children: "Borrow",
      onClick: () => {
        State.update({ data });
        setShowBorrowModal(true);
      },
    }}
  />
);

const RepayButton = ({ data }) => (
  <Widget
    src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
    props={{
      config,
      children: "Repay",
      onClick: () => {
        State.update({ data });
        setShowRepayModal(true);
      },
    }}
  />
);

if (!yourBorrows) {
  return <div />;
}

const { debts, ...yourBorrowsCommonParams } = yourBorrows;

return (
  <>
    <Widget
      src={`${config.ownerId}/widget/AAVE.Card.CardsView`}
      props={{
        config,
        style: {
          marginTop: "16px",
        },
        title: "Your borrows",
        body: (
          <>
            {!debts || debts.length === 0 ? (
              <Widget
                src={`${config.ownerId}/widget/AAVE.Card.CardEmpty`}
                props={{
                  config,
                  children: "Nothing borrowed yet",
                }}
              />
            ) : (
              <>
                {/* pc view */}
                <Widget
                  src={`${config.ownerId}/widget/AAVE.Card.CardsTable`}
                  props={{
                    config,
                    headers: ["Asset", "Debt", "APY", ""],
                    data: debts.map((row) => {
                      return [
                        <Widget
                          src={`${config.ownerId}/widget/AAVE.Card.TokenWrapper`}
                          props={{
                            children: [
                              <img
                                width={64}
                                height={64}
                                src={`https://app.aave.com/icons/tokens/${row.symbol.toLowerCase()}.svg`}
                              />,
                              <div>
                                <div className="token-title">{row.symbol}</div>
                                <div className="token-chain">{row.name}</div>
                              </div>,
                            ],
                          }}
                        />,
                        <div>
                          <div>
                            {Number(row.balance).toFixed(7)}
                            {/* {Number(row.variableBorrows).toFixed(7)} */}
                          </div>
                          <div>
                            $ {Number(row.balanceInUSD).toFixed(2)}
                            {/* {Number(row.variableBorrowsUSD).toFixed(2)} */}
                          </div>
                        </div>,
                        `${(Number(row.variableBorrowAPY) * 100).toFixed(2)} %`,
                        <ButtonGroup>
                          <RepayButton
                            data={{ ...row, ...yourBorrowsCommonParams }}
                          />
                          <BorrowButton
                            data={{
                              ...row,
                              ...yourBorrowsCommonParams,
                            }}
                          />
                        </ButtonGroup>,
                      ];
                    }),
                  }}
                />
              </>
            )}
          </>
        ),
      }}
    />
    {showRepayModal && (
      <Widget
        src={`${config.ownerId}/widget/AAVE.Modal.RepayModal`}
        props={{
          config,
          onRequestClose: () => setShowRepayModal(false),
          data: state.data,
          onActionSuccess,
          onlyOneBorrow: debts.length === 1,
          chainId,
          repayETHGas,
          repayERC20Gas,
          formatHealthFactor,
        }}
      />
    )}
    {showBorrowModal && (
      <Widget
        src={`${config.ownerId}/widget/AAVE.Modal.BorrowModal`}
        props={{
          config,
          onRequestClose: () => setShowBorrowModal(false),
          data: state.data,
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
