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
} = props;

State.init({
  data: undefined,
});

const WithdrawButton = ({ data }) => (
  <Widget
    src={`guessme.near/widget/ZKEVM.AAVE.PrimaryButton`}
    props={{
      config,
      children: "Withdraw",
      onClick: () => {
        State.update({ data });
        setShowWithdrawModal(true);
      },
    }}
  />
);

return (
  <>
    <Widget
      src={`guessme.near/widget/ZKEVM.AAVE.Card.CardsView`}
      props={{
        config,
        style: {
          marginTop: "16px",
        },
        title: "Your Supplied",
        body:
          !yourSupplies || yourSupplies.length === 0 ? (
            <Widget
              src={`guessme.near/widget/ZKEVM.AAVE.Card.CardEmpty`}
              props={{
                config,
                children: "Nothing supplied yet",
              }}
            />
          ) : (
            <>
              {/* mobileView */}
              {yourSupplies.map((row) => (
                <Widget
                  src={`${config.ownerId}/widget/AAVE.Card.CardContainer`}
                  props={{
                    children: [
                      <Widget
                        src={`${config.ownerId}/widget/AAVE.Card.Divider`}
                        props={{ config }}
                      />,
                      <Widget
                        src={`${config.ownerId}/widget/AAVE.Card.CardsBody`}
                        props={{
                          config,
                          children: [
                            <Widget
                              src={`${config.ownerId}/widget/AAVE.Card.TokenWrapper`}
                              props={{
                                children: [
                                  <img
                                    width={64}
                                    height={64}
                                    src={
                                      row.symbol === "GNO"
                                        ? "https://ipfs.near.social/ipfs/bafkreibdtyo65gd4cvjjylw3etf6sw4ipvwmvqvfv267maqwp77gu2hovm"
                                        : row.symbol === "WXDAI" ||
                                          row.symbol === "XDAI"
                                        ? "https://ipfs.near.social/ipfs/bafkreieu6n7cav63nwjj5klcsxrk26eo5pqkc4u7xzfle2bjgi5ijm7ipe"
                                        : `https://app.aave.com/icons/tokens/${row.symbol.toLowerCase()}.svg`
                                    }
                                  />,
                                  <div>
                                    <div className="token-title">
                                      {row.symbol}
                                    </div>
                                    <div className="token-chain">
                                      {row.name}
                                    </div>
                                  </div>,
                                ],
                              }}
                            />,
                            <Widget
                              src={`${config.ownerId}/widget/AAVE.Card.CardDataWrapper`}
                              props={{
                                children: [
                                  <div className="card-data-row">
                                    <div className="card-data-key">
                                      Supply Balance
                                    </div>
                                    <div className="card-data-value">
                                      <div>
                                        {Number(row.underlyingBalance).toFixed(
                                          7
                                        )}
                                      </div>
                                      <div>
                                        ${" "}
                                        {Number(
                                          row.underlyingBalanceUSD
                                        ).toFixed(2)}
                                      </div>
                                    </div>
                                  </div>,
                                  <div className="card-data-row">
                                    <div className="card-data-key">
                                      Supply APY
                                    </div>
                                    <div className="card-data-value">{`${(
                                      Number(row.supplyAPY) * 100
                                    ).toFixed(2)} %`}</div>
                                  </div>,
                                ],
                              }}
                            />,
                            <WithdrawButton data={row} />,
                          ],
                        }}
                      />,
                    ],
                  }}
                />
              ))}
              {/* pcView */}
              <Widget
                src={`guessme.near/widget/ZKEVM.AAVE.Card.CardsTable`}
                props={{
                  config,
                  headers: ["Asset", "Supply Balance", "Supply APY", ""],
                  data: yourSupplies.map((row) => {
                    return [
                      <Widget
                        src={`guessme.near/widget/ZKEVM.AAVE.Card.TokenWrapper`}
                        props={{
                          children: [
                            <img
                              width={32}
                              height={32}
                              //Hardcoded some URLs for novel tokens in Spark
                              src={
                                row.symbol === "GNO"
                                  ? "https://ipfs.near.social/ipfs/bafkreibdtyo65gd4cvjjylw3etf6sw4ipvwmvqvfv267maqwp77gu2hovm"
                                  : row.symbol === "WXDAI" ||
                                    row.symbol === "XDAI"
                                  ? "https://ipfs.near.social/ipfs/bafkreieu6n7cav63nwjj5klcsxrk26eo5pqkc4u7xzfle2bjgi5ijm7ipe"
                                  : `https://app.aave.com/icons/tokens/${row.symbol.toLowerCase()}.svg`
                              }
                            />,
                            <div>
                              <div className="token-title">{row.symbol}</div>
                              <div className="token-chain">{row.name}</div>
                            </div>,
                          ],
                        }}
                      />,
                      <div>
                        <div className="primaryStyle">
                          {Number(row.underlyingBalance).toFixed(7)}
                        </div>
                        <div className="token-balance-value">
                          $ {Number(row.underlyingBalanceUSD).toFixed(2)}
                        </div>
                      </div>,
                      <span className="primaryStyle">
                        {(Number(row.supplyAPY) * 100).toFixed(2)}%
                      </span>,
                      <WithdrawButton data={row} />,
                    ];
                  }),
                }}
              />
            </>
          ),
      }}
    />
    {showWithdrawModal && (
      <Widget
        src={`guessme.near/widget/ZKEVM.AAVE.Modal.WithdrawModal`}
        props={{
          config,
          chainId,
          data: {
            ...state.data,
            healthFactor,
          },
          onActionSuccess,
          withdrawETHGas,
          withdrawERC20Gas,
          formatHealthFactor,
          onRequestClose: () => setShowWithdrawModal(false),
        }}
      />
    )}
  </>
);
