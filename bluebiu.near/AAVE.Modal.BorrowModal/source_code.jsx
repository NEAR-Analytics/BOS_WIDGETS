const {
  config,
  data,
  onRequestClose,
  onActionSuccess,
  chainId,
  borrowETHGas,
  borrowERC20Gas,
  formatHealthFactor,
  calcHealthFactor,
  theme,
} = props;
const hasHF = config.heroData.includes("Health Factor");
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
  symbol,
  marketReferencePriceInUsd,
  healthFactor,
  availableBorrows,
  availableBorrowsUSD,
  decimals,
  underlyingAsset,
  variableDebtTokenAddress,
} = data;

const BorrowContainer = styled.div`
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

const GreenTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #2cffa7;
`;

const RedTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: red;
`;

const WhiteTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: white;
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

State.init({
  amount: "",
  amountInUSD: "0.00",
  allowanceAmount: 0,
  loading: false,
  newHealthFactor: "-",
  gas: "-",
});

function updateGas() {
  if (symbol === config.nativeCurrency.symbol) {
    borrowETHGas().then((value) => {
      State.update({ gas: value });
    });
  } else {
    borrowERC20Gas().then((value) => {
      State.update({ gas: value });
    });
  }
}

updateGas();

const disabled =
  !state.amount || !isValid(state.amount) || Number(state.amount) === 0;
const maxValue = Big(availableBorrows).toFixed(decimals);

/**
 * @param {string} vwETHAddress
 * @param {string} userAddress
 * @returns {BigNumber}
 */
function borrowAllowance(vwETHAddress, userAddress) {
  const vToken = new ethers.Contract(
    vwETHAddress,
    config.variableDebtTokenABI.body,
    Ethers.provider().getSigner()
  );

  return vToken.borrowAllowance(
    userAddress,
    config.wrappedTokenGatewayV3Address
  );
}

function approveDelegation(vwETHAddress) {
  const vToken = new ethers.Contract(
    vwETHAddress,
    config.variableDebtTokenABI.body,
    Ethers.provider().getSigner()
  );
  const maxUint256 = ethers.BigNumber.from(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );
  return vToken.approveDelegation(
    config.wrappedTokenGatewayV3Address,
    maxUint256
  );
}

function debounce(fn, wait) {
  let timer = state.timer;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, wait);
    State.update({ timer });
  };
}

const updateNewHealthFactor = debounce(() => {
  State.update({ newHealthFactor: "-" });
  const newHealthFactor = formatHealthFactor(
    calcHealthFactor("BORROW", symbol, state.amount)
  );
  console.log(
    "BORROW updateNewHealthFactor",
    symbol,
    state.amount,
    newHealthFactor
  );
  State.update({ newHealthFactor });
}, 1000);

const changeValue = (value) => {
  let amountInUSD = "0.00";
  if (Number(value) > Number(maxValue)) {
    value = maxValue;
  }
  if (Number(value) < 0) {
    value = "0";
  }
  if (isValid(value)) {
    amountInUSD = Big(value)
      .mul(marketReferencePriceInUsd)
      .toFixed(2, ROUND_DOWN);
  }
  State.update({ amount: value, amountInUSD });
  if (hasHF) {
    updateNewHealthFactor();
  }
};

function borrowERC20(amount) {
  State.update({ loading: true });
  const pool = new ethers.Contract(
    config.aavePoolV3Address,
    config.aavePoolV3ABI.body,
    Ethers.provider().getSigner()
  );

  Ethers.provider()
    .getSigner()
    .getAddress()
    .then((address) => {
      return pool["borrow(address,uint256,uint256,uint16,address)"](
        underlyingAsset,
        amount,
        2, // variable interest rate
        0,
        address
      );
    })
    .then((tx) => {
      tx.wait()
        .then((res) => {
          const { status } = res;
          if (status === 1) {
            onActionSuccess({
              msg: `You borrowed ${Big(amount)
                .div(Big(10).pow(decimals))
                .toFixed(8)} ${symbol}`,
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

function borrowETH(amount) {
  const wrappedTokenGateway = new ethers.Contract(
    config.wrappedTokenGatewayV3Address,
    config.wrappedTokenGatewayV3ABI.body,
    Ethers.provider().getSigner()
  );
  State.update({ loading: true });
  return wrappedTokenGateway
    .borrowETH(
      config.aavePoolV3Address,
      amount,
      2, // variable interest rate
      0
    )
    .then((tx) => {
      tx.wait()
        .then((res) => {
          const { status } = res;
          if (status === 1) {
            onActionSuccess({
              msg: `You borrowed ${Big(amount)
                .div(Big(10).pow(decimals))
                .toFixed(8)} ${symbol}`,
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

function update() {
  Ethers.provider()
    .getSigner()
    .getAddress()
    .then((address) => {
      borrowAllowance(variableDebtTokenAddress, address)
        .then((amountRaw) => amountRaw.toString())
        .then((amount) => {
          State.update({
            allowanceAmount: Big(amount).div(Big(10).pow(decimals)).toNumber(),
          });
        });
    });

  if (
    !isValid(state.amount) ||
    !isValid(state.allowanceAmount) ||
    Number(state.allowanceAmount) < Number(state.amount) ||
    Number(state.amount) === 0
  ) {
    State.update({ needApprove: true });
  } else {
    State.update({ needApprove: false });
  }
}

update();

return (
  <>
    <Widget
      src={`${config.ownerId}/widget/AAVE.Modal.BaseModal`}
      props={{
        title: `Borrow ${symbol}`,
        onRequestClose: onRequestClose,
        children: (
          <BorrowContainer>
            <Widget
              src={`${config.ownerId}/widget/AAVE.Modal.RoundedCard`}
              props={{
                title: "Amount",
                config,
                children: (
                  <>
                    <Widget
                      src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                      props={{
                        left: (
                          <TokenTexture>
                            <Input
                              type="number"
                              value={state.amount}
                              onChange={(e) => {
                                changeValue(e.target.value);
                              }}
                              placeholder="0"
                            />
                          </TokenTexture>
                        ),
                        right: (
                          <TokenWrapper>
                            <img width={26} height={26} src={data?.icon} />
                            <TokenTexture>{symbol}</TokenTexture>
                          </TokenWrapper>
                        ),
                      }}
                    />
                    <Widget
                      src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                      props={{
                        left: <GrayTexture>${state.amountInUSD}</GrayTexture>,
                        right: (
                          <GrayTexture>
                            Available:{" "}
                            {isValid(availableBorrows) &&
                            availableBorrows !== "-"
                              ? Big(availableBorrows).toFixed(7)
                              : availableBorrows}
                            <Max
                              onClick={() => {
                                changeValue(maxValue);
                              }}
                            >
                              MAX
                            </Max>
                          </GrayTexture>
                        ),
                      }}
                    />
                  </>
                ),
              }}
            />
            <Widget
              src={`${config.ownerId}/widget/AAVE.Modal.RoundedCard`}
              props={{
                title: "Transaction Overview",
                config,
                children: (
                  <TransactionOverviewContainer>
                    {hasHF ? (
                      <Widget
                        src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                        props={{
                          left: <PurpleTexture>Health Factor</PurpleTexture>,
                          right: (
                            <div style={{ textAlign: "right" }}>
                              <GreenTexture>
                                {healthFactor}
                                <img
                                  src={`${config.ipfsPrefix}/bafkreiesqu5jyvifklt2tfrdhv6g4h6dubm2z4z4dbydjd6if3bdnitg7q`}
                                  width={16}
                                  height={16}
                                />{" "}
                                {state.newHealthFactor}
                              </GreenTexture>
                              <WhiteTexture>
                                Liquidation at &lt;{" "}
                                {config.FIXED_LIQUIDATION_VALUE}
                              </WhiteTexture>
                            </div>
                          ),
                        }}
                      />
                    ) : null}
                  </TransactionOverviewContainer>
                ),
              }}
            />
            <Widget
              src={`${config.ownerId}/widget/AAVE.GasEstimation`}
              props={{ gas: state.gas, config }}
            />
            {state.needApprove && symbol === config.nativeCurrency.symbol && (
              <Widget
                src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
                props={{
                  config,
                  theme,
                  loading: state.loading,
                  children: `Approve ${symbol}`,
                  disabled,
                  onClick: () => {
                    State.update({
                      loading: true,
                    });
                    const amount = Big(state.amount)
                      .mul(Big(10).pow(decimals))
                      .toFixed(0);

                    approveDelegation(variableDebtTokenAddress)
                      .then((tx) => {
                        tx.wait()
                          .then((res) => {
                            const { status } = res;
                            if (status === 1) {
                              State.update({
                                needApprove: false,
                                loading: false,
                              });
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
                  },
                }}
              />
            )}
            {!(
              state.needApprove && symbol === config.nativeCurrency.symbol
            ) && (
              <Widget
                src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
                props={{
                  config,
                  theme,
                  children: `Borrow ${symbol}`,
                  loading: state.loading,
                  disabled,
                  onClick: () => {
                    const amount = Big(state.amount)
                      .mul(Big(10).pow(decimals))
                      .toFixed(0);
                    if (symbol === config.nativeWrapCurrency.symbol) {
                      // borrow weth
                      borrowETH(amount);
                    } else {
                      // borrow common
                      borrowERC20(amount);
                    }
                  },
                }}
              />
            )}
          </BorrowContainer>
        ),
        config,
      }}
    />
  </>
);
