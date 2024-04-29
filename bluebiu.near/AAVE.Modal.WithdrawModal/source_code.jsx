const {
  config,
  data,
  onRequestClose,
  onActionSuccess,
  chainId,
  withdrawETHGas,
  withdrawERC20Gas,
  formatHealthFactor,
  calcHealthFactor,
  account,
  yourTotalBorrow,
  yourTotalCollateral,
  threshold,
  prices,
  theme,
  addAction,
  dexConfig,
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
  underlyingAsset,
  decimals,
  symbol,
  underlyingBalance,
  underlyingBalanceUSD,
  isCollateraled,
  aTokenAddress,
  availableLiquidity,
  healthFactor,
} = data;
console.log("withdraw-props--", props, isCollateraled);
const availableLiquidityAmount = Big(availableLiquidity)
  .div(Big(10).pow(decimals))
  .toFixed();

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

State.init({
  amount: "",
  amountInUSD: "0.00",
  allowanceAmount: 0,
  needApprove: false,
  loading: false,
  newHealthFactor: "-",
  gas: "-",
});

function updateGas() {
  if (symbol === config.nativeCurrency.symbol) {
    withdrawETHGas().then((value) => {
      State.update({ gas: value });
    });
  } else {
    withdrawERC20Gas().then((value) => {
      State.update({ gas: value });
    });
  }
}

updateGas();

const _remainingSupply = Number(underlyingBalance) - Number(state.amount);
const remainingSupply = isNaN(_remainingSupply)
  ? underlyingBalance
  : Big(_remainingSupply).toFixed(2);
function formatAddAction(_amount, status, transactionHash) {
  console.log("formatAddAction--", dexConfig, dexConfig.name);
  addAction?.({
    type: "Lending",
    action: "Withdraw",
    token: {
      symbol,
    },
    amount: _amount,
    template: dexConfig.name,
    add: false,
    status,
    transactionHash,
  });
}
function withdrawErc20(asset, actualAmount, shownAmount) {
  console.log("withdrawErc20--", asset, actualAmount, shownAmount);
  State.update({
    loading: true,
  });
  return Ethers.provider()
    .getSigner()
    .getAddress()
    .then((address) => {
      const pool = new ethers.Contract(
        config.aavePoolV3Address,
        config.aavePoolV3ABI.body,
        Ethers.provider().getSigner()
      );

      return pool["withdraw(address,uint256,address)"](
        asset,
        actualAmount,
        address
      );
    })
    .then((tx) => {
      tx.wait()
        .then((res) => {
          console.log("withdrawErc20", res);
          const { status, transactionHash } = res;
          if (status === 1) {
            formatAddAction(
              Big(actualAmount).div(Big(10).pow(decimals)).toFixed(8),
              status,
              transactionHash
            );
            onActionSuccess({
              msg: `You withdraw ${Big(shownAmount).toFixed(8)} ${symbol}`,
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
        .catch((err) => {
          console.log("catch_tx:", err);
          State.update({ loading: false });
        });
    })
    .catch((err) => {
      console.log("catch_tx:", err);
      State.update({ loading: false });
    });
}

function withdrawETH(actualAmount, shownAmount) {
  console.log("withdrawETH--", actualAmount, shownAmount);
  State.update({
    loading: true,
  });
  return Ethers.provider()
    .getSigner()
    .getAddress()
    .then((address) => {
      const wrappedTokenGateway = new ethers.Contract(
        config.wrappedTokenGatewayV3Address,
        config.wrappedTokenGatewayV3ABI.body,
        Ethers.provider().getSigner()
      );

      return wrappedTokenGateway.withdrawETH(
        config.aavePoolV3Address,
        actualAmount,
        address
      );
    })
    .then((tx) => {
      tx.wait()
        .then((res) => {
          const { status, transactionHash } = res;
          if (status === 1) {
            formatAddAction(
              Big(actualAmount).div(Big(10).pow(decimals)).toFixed(8),
              status,
              transactionHash
            );
            onActionSuccess({
              msg: `You withdraw ${Big(shownAmount).toFixed(8)} ${symbol}`,
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

function approveForGateway(tokenAddress, amount) {
  const token = new ethers.Contract(
    tokenAddress,
    config.erc20Abi.body,
    Ethers.provider().getSigner()
  );

  return token.approve(config.wrappedTokenGatewayV3Address, amount);
}

function allowanceForGateway(tokenAddress) {
  return Ethers.provider()
    .getSigner()
    .getAddress()
    .then((address) => {
      const token = new ethers.Contract(
        tokenAddress,
        config.erc20Abi.body,
        Ethers.provider().getSigner()
      );
      return token.allowance(address, config.wrappedTokenGatewayV3Address);
    });
}

function update() {
  allowanceForGateway(aTokenAddress)
    .then((amount) => Number(amount.toString()))
    .then((amount) =>
      State.update({
        allowanceAmount: Big(amount).div(Big(10).pow(decimals)).toNumber(),
      })
    );

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

function bigMin(_a, _b) {
  const a = Big(_a);
  const b = Big(_b);
  return a.gt(b) ? b : a;
}

const actualMaxValue =
  isValid(underlyingBalance) && isValid(availableLiquidityAmount)
    ? Big(underlyingBalance).lt(availableLiquidityAmount)
      ? config.MAX_UINT_256
      : Big(availableLiquidityAmount)
          .mul(Big(10).pow(decimals))
          .toFixed(0, ROUND_DOWN)
    : "0";

let shownMaxValue;
if (isCollateraled) {
  const maxWithdraw = Big(yourTotalCollateral)
    .minus(
      Big(yourTotalBorrow || 0)
        .times(1.01)
        .div(Big(threshold))
    )
    .div(prices[symbol])
    .toFixed();

  shownMaxValue = bigMin(maxWithdraw, underlyingBalance);
} else {
  shownMaxValue = underlyingBalance;
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
  if (isCollateraled) {
    const newHealthFactor = formatHealthFactor(
      calcHealthFactor("WITHDRAW", symbol, state.amount)
    );
    console.log(
      "withdraw updateNewHealthFactor",
      symbol,
      state.amount,
      newHealthFactor
    );
    State.update({ newHealthFactor });
  } else {
    State.update({ newHealthFactor: healthFactor });
  }
}, 1000);

const changeValue = (value) => {
  console.log("change--", value, shownMaxValue, prices[symbol]);
  if (Number(value) > shownMaxValue) {
    value = shownMaxValue;
  }
  if (Number(value) < 0) {
    value = "0";
  }
  if (isValid(value)) {
    const amountInUSD = Big(value).mul(prices[symbol]).toFixed(2, ROUND_DOWN);

    State.update({
      amountInUSD,
    });
    if (hasHF) {
      updateNewHealthFactor();
    }
  } else {
    State.update({
      amountInUSD: "0.00",
      newHealthFactor: "-",
    });
  }
  State.update({ amount: value });
};

// const disabled =
//   (state.newHealthFactor !== "∞" &&
//     (!isValid(state.newHealthFactor) ||
//       state.newHealthFactor === "" ||
//       Big(state.newHealthFactor).lt(1))) ||
//   !state.amount ||
//   !isValid(state.amount) ||
//   Number(state.amount) === 0;
const disabled =
  !state.amount || !isValid(state.amount) || Number(state.amount) === 0;

return (
  <Widget
    src={`${config.ownerId}/widget/AAVE.Modal.BaseModal`}
    props={{
      title: `Withdraw ${symbol}`,
      onRequestClose: props.onRequestClose,
      children: (
        <WithdrawContainer>
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
                          Supply Balance:
                          {Big(shownMaxValue).toFixed(3, ROUND_DOWN)}
                          <Max
                            onClick={() => {
                              changeValue(Big(shownMaxValue).toFixed());
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
                  <Widget
                    src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                    props={{
                      left: <PurpleTexture>Remaining Supply</PurpleTexture>,
                      right: (
                        <WhiteTexture>
                          {remainingSupply} {symbol}
                        </WhiteTexture>
                      ),
                    }}
                  />
                  {hasHF ? (
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
                  approveForGateway(aTokenAddress, amount)
                    .then((tx) => {
                      tx.wait()
                        .then((res) => {
                          const { status } = res;
                          if (status === 1) {
                            console.log("tx succeeded", res);
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
          {!(state.needApprove && symbol === config.nativeCurrency.symbol) && (
            <Widget
              src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
              props={{
                config,
                theme,
                loading: state.loading,
                children: "Withdraw",
                disabled,
                onClick: () => {
                  const actualAmount =
                    state.amount === shownMaxValue
                      ? actualMaxValue
                      : Big(state.amount)
                          .mul(Big(10).pow(decimals))
                          .toFixed(0, ROUND_DOWN);

                  const shownAmount = state.amount;

                  if (symbol === config.nativeCurrency.symbol) {
                    // supply weth
                    withdrawETH(actualAmount, shownAmount);
                  } else {
                    // supply common
                    withdrawErc20(underlyingAsset, actualAmount, shownAmount);
                  }
                },
              }}
            />
          )}
        </WithdrawContainer>
      ),
      config,
    }}
  />
);
