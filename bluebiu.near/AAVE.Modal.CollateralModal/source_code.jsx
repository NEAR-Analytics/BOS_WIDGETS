const {
  config,
  data,
  onRequestClose,
  onActionSuccess,
  chainId,
  flag,
  formatHealthFactor,
  calcHealthFactor,
  yourTotalBorrow,
  account,
  theme,
} = props;
console.log("props:", props);
if (!data) {
  return <div />;
}
const ROUND_DOWN = 0;
function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

const {
  icon,
  underlyingAsset,
  decimals,
  symbol,
  underlyingBalance,
  underlyingBalanceUSD,
  aTokenAddress,
  availableLiquidity,
  healthFactor,
} = data;

const WithdrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TokenTexture = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const TokenWrapper = styled.div`
  display: flex;
  img {
    margin-right: 4px;
  }
`;

const GrayTexture = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #7c7c86;
`;

const PurpleTexture = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #8a8db9;
`;

const WhiteTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: white;
`;

const GreenTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #2cffa7;
`;

const TransactionOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;

  font-size: 20px;
  font-weight: bold;
  color: white;
  flex: 1;
  width: 160px;

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Max = styled.span`
  color: #8247e5;
  cursor: pointer;
`;
const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const Tips = styled.div`
  font-size: 14px;
  color: rgba(188, 0, 0, 1);
`;

State.init({
  amount: "",
  amountInUSD: "0.00",
  allowanceAmount: 0,
  needApprove: false,
  loading: false,
  newHealthFactor: "-",
  gas: "-",
});

function setColl() {
  State.update({
    loading: true,
  });

  const CollContract = new ethers.Contract(
    config.aavePoolV3Address,
    [
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "bool", name: "useAsCollateral", type: "bool" },
        ],
        name: "setUserUseReserveAsCollateral",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );

  CollContract.setUserUseReserveAsCollateral(data.underlyingAsset, flag)
    .then((tx) => {
      tx.wait()
        .then((res) => {
          const { status } = res;
          if (status === 1) {
            onActionSuccess({
              msg: `Success`,
              callback: () => {
                onRequestClose();
                State.update({
                  loading: false,
                });
              },
            });
            console.log("tx succeeded", res);
          } else {
            console.log("tx failed", res);
            State.update({
              loading: false,
            });
          }
        })
        .catch(() => State.update({ loading: false }));
    })
    .catch(() => State.update({ loading: false }));
}

useEffect(() => {
  let type = flag ? "INC_COLLATERAL" : "DEC_COLLATERAL";
  const newHealthFactor = formatHealthFactor(
    calcHealthFactor(type, symbol, underlyingBalance)
  );

  State.update({ newHealthFactor });
}, []);
const refuseClose =
  yourTotalBorrow &&
  !isNaN(Number(state.newHealthFactor)) &&
  Big(state.newHealthFactor).lt(1);

return (
  <Widget
    src={`${config.ownerId}/widget/AAVE.Modal.BaseModal`}
    props={{
      title: `Collateral`,
      onRequestClose: props.onRequestClose,
      children: (
        <WithdrawContainer>
          <Widget
            src={`${config.ownerId}/widget/AAVE.Modal.RoundedCard`}
            props={{
              title: "Transaction Overview",
              config,
              children: (
                <TransactionOverviewContainer>
                  <Widget
                    src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                    props={{
                      left: <PurpleTexture>Supply balance</PurpleTexture>,
                      right: (
                        <WhiteTexture>
                          <Icon src={icon} alt="" />
                          {Number(underlyingBalance).toFixed(7)}
                          {symbol}
                        </WhiteTexture>
                      ),
                    }}
                  />
                  <Widget
                    src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                    props={{
                      left: <PurpleTexture>Health Factor</PurpleTexture>,
                      right: (
                        <div style={{ textAlign: "right" }}>
                          <GreenTexture>
                            {formatHealthFactor(healthFactor)}

                            <img
                              src={`${config.ipfsPrefix}/bafkreiesqu5jyvifklt2tfrdhv6g4h6dubm2z4z4dbydjd6if3bdnitg7q`}
                              width={16}
                              height={16}
                            />
                            {state.newHealthFactor}
                          </GreenTexture>
                          <WhiteTexture>
                            Liquidation at &lt; {config.FIXED_LIQUIDATION_VALUE}
                          </WhiteTexture>
                        </div>
                      ),
                    }}
                  />
                </TransactionOverviewContainer>
              ),
            }}
          />
          {refuseClose ? (
            <Tips>
              You can not switch usage as collateral mode for this currency,
              because it will cause collateral call
            </Tips>
          ) : null}

          <Widget
            src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
            props={{
              config,
              theme,
              loading: state.loading,
              children: `${flag ? "Enable" : "Disable"} ${
                data.symbol
              } as Collateral`,
              disabled: refuseClose,
              onClick: setColl,
            }}
          />
        </WithdrawContainer>
      ),
      config,
    }}
  />
);
