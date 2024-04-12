const StyledContainer = styled.div`
  display: flex;
  gap: 30px;
`;
const StyledWrapper = styled.div``;

const StyledSvg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledImage = styled.img``;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0;
`;

const StyledFont = styled.div`
  color: #000;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: normal;
`;
const StyledDashed = styled.div`
  flex: 1;
  border-bottom: 1px dashed #979abe;
`;
const StyledOperationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: #5b6079;
  cursor: pointer;
  &:not(:disabled):hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;
const StyledRange = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background-color: transparent;
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
    border-radius: 8px;
    background-color: #33364b;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 35px;
    height: 20px;
    border-radius: 36px;
    background-color: #16181d;
    margin-top: -7px;
    &:after {
      content: "12%";
      color: #fff;
    }
  }
`;
const StyledTips = styled.div`
  display: none;
  position: absolute;
  left: 37px;
  top: -33px;
  border-radius: 6px;
  border: 1px solid #373a53;
  background: #262836;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 13px 16px;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledButton = styled.div`
  position: relative;
  flex: 1;
  height: 48px;
  border-radius: 8px;
  background-color: #00ad79;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  &:not(:disabled):hover {
    opacity: 0.8;
    ${StyledTips} {
      display: block;
    }
  }
  &[disabled] {
    background: rgba(151, 154, 190, 0.2);
    cursor: not-allowed;
  }
`;
const StyledWithraw = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 102px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #00ad79;
  color: #00ad79;
  text-align: center;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const {
  onBack,
  data,
  getAccountInfo,
  curChain,
  account,
  toast,
  dexConfig,
  wethAddress,
  multicall,
  addAction,
} = props;

State.init({
  actions: [],
});

const updateInfo = () => {
  getAccountInfo(data, (res) => {
    State.update({
      ...res,
      collaterValue: res.userCollateralUsd,
      borrowCapacity: res.userBorrowCapacityUsd,
      availableToBorrow: Big(res.userBorrowCapacityUsd)
        .minus(res.borrowedBalanceUsd)
        .toString(),
      liquidationPoint:
        Big(res.userLiquidationUsd || 0).eq(0) ||
        Big(res.userCollateralUsd || 0).eq(0)
          ? "0"
          : Big(res.borrowedBalanceUsd)
              .div(Big(res.userLiquidationUsd).div(res.userCollateralUsd))
              .toString(),
      borrowedBalance: res.borrowedBalanceUsd,
      userLiquidationUsd: res.userLiquidationUsd,
    });
  });
};

useEffect(() => {
  if (data) {
    updateInfo();
    State.update({
      borrowApr: Big(data.borrowApr || 0)
        .minus(data.borrowCompRewardApr || 0)
        .mul(100)
        .toFixed(2),
      supplyApr: Big(data.supplyApr || 0)
        .add(data.supplyCompRewardApr || 0)
        .mul(100)
        .toFixed(2),
    });
  }
}, [data]);

useEffect(() => {
  if (!state.balanceUsd) return;
  State.update({
    balanceArr: Big(state.balance).toFixed(4).split("."),
  });
}, [state.balanceUsd]);

const onAmountChange = ({ amount, type, cb }) => {
  if (state.asset.address === data.baseToken.address) {
    if (type === "Repay") {
      State.update({
        balanceUsd: Big(amount)
          .mul(state.asset.price)
          .add(state.balanceUsd || 0)
          .toString(),
      });
    }
    if (type === "Borrow") {
      const _borrowedBalance = Big(amount)
        .mul(state.asset.price)
        .add(state.borrowBalance || 0);

      cb({
        borrowedBalance: _borrowedBalance.toString(),
        availableToBorrow: Big(state.borrowCapacity || 0)
          .minus(_borrowedBalance)
          .toString(),
        liquidationPoint:
          Big(state.userLiquidationUsd || 0).eq(0) ||
          Big(state.collaterValue || 0).eq(0)
            ? "0"
            : Big(_borrowedBalance)
                .div(Big(state.userLiquidationUsd).div(state.collaterValue))
                .toString(),
      });
    }
    cb({});
    return;
  }
  const _collaterValue = Big(state.collaterValue);
  const _borrowCapacity = Big(state.borrowCapacity);
  const _availableToBorrow = Big(state.availableToBorrow);

  if (type === "Collateral") {
    _collaterValue = Big(amount || 0)
      .mul(state.asset.price)
      .add(_collaterValue);
  }
  if (type === "Withdraw") {
    _collaterValue = _collaterValue.minus(
      Big(amount || 0).mul(state.asset.price)
    );
  }
  _borrowCapacity = _collaterValue.mul(
    state.asset.borrowCollateralFactor / 100
  );
  _availableToBorrow = Big(_borrowCapacity).minus(state.borrowBalance || 0);

  cb({
    collaterValue: _collaterValue.toString(),
    borrowCapacity: _borrowCapacity.toString(),
    availableToBorrow: _availableToBorrow.toString(),
    userLiquidationUsd: _collaterValue
      .mul(state.asset.liquidateCollateralFactor / 100)
      .toString(),
  });
};

const onAddAction = ({ amount, type }) => {
  const _actions = state.actions;
  _actions.push({
    amount,
    type,
    asset: state.asset,
  });

  State.update({
    actions: _actions,
    showDialog: false,
  });
};

return (
  <StyledContainer>
    <StyledWrapper style={{ width: 728 }}>
      <StyledFlex style={{ marginBottom: 36, justifyContent: "space-between" }}>
        <StyledFlex style={{ gap: 20 }}>
          <StyledSvg style={{ cursor: "pointer" }} onClick={onBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
            >
              <path d="M6 11L1 6L6 1" stroke="white" stroke-linecap="round" />
            </svg>
          </StyledSvg>
          <StyledFlex style={{ gap: 14 }}>
            <Widget
              src="bluebiu.near/widget/Lending.CompoundV3.Bridge.Asset"
              props={{
                size: "big",
                icon: data.baseToken.icon,
                curChain,
              }}
            />
            <StyledFlex
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 5,
              }}
            >
              <StyledFlex
                style={{
                  gap: 8,
                }}
              >
                <StyledFont
                  style={{ color: "#FFF", fontSize: 22, fontWeight: 700 }}
                >
                  {state.balanceArr[0] || 0}.
                  <span style={{ color: "#979ABE" }}>
                    {state.balanceArr[1] || "0000"}
                  </span>
                </StyledFont>
                <StyledFont
                  style={{ color: "#FFF", fontSize: 22, fontWeight: 700 }}
                >
                  {data.baseToken.symbol}
                </StyledFont>
              </StyledFlex>
              <StyledFont style={{ color: "#979ABE" }}>
                <Widget
                  src="bluebiu.near/widget/Utils.FormatAmount"
                  props={{
                    amount: state.balanceUsd,
                    prev: "$",
                  }}
                />
              </StyledFont>
            </StyledFlex>
          </StyledFlex>
        </StyledFlex>

        <StyledFlex style={{ gap: 20 }}>
          {Big(state.balance || 0).gt(0) && (
            <>
              {" "}
              <StyledFlex
                style={{
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 5,
                }}
              >
                <StyledFont style={{ color: "#00D395", fontSize: 16 }}>
                  Supplying
                </StyledFont>
                <StyledFont
                  style={{ color: "#FFF", fontSize: 16, fontWeight: 700 }}
                >
                  {state.supplyApr} Net APR
                </StyledFont>
              </StyledFlex>{" "}
              <StyledWithraw
                onClick={() => {
                  State.update({
                    showDialog: true,
                    type: "Withraw",
                    asset: {
                      ...data.baseToken,
                      walletBalance: state.balance,
                      walletBalanceUsd: state.balanceUsd,
                    },
                  });
                }}
              >
                Withraw
              </StyledWithraw>
            </>
          )}
          {Big(state.borrowedBalanceUsd || 0).gt(0) && (
            <>
              {" "}
              <StyledFlex
                style={{
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 5,
                }}
              >
                <StyledFont style={{ color: "#7945FF", fontSize: 16 }}>
                  Borrowing
                </StyledFont>
                <StyledFont
                  style={{ color: "#FFF", fontSize: 16, fontWeight: 700 }}
                >
                  {state.borrowApr} Net APR
                </StyledFont>
              </StyledFlex>{" "}
              <StyledWithraw
                style={{ borderColor: "#7945FF", color: "#7945FF" }}
                onClick={() => {
                  State.update({
                    showDialog: true,
                    type: "Repay",
                    asset: {
                      ...data.baseToken,
                      walletBalance: state.borrowedBalance,
                      walletBalanceUsd: state.borrowedBalanceUsd,
                    },
                  });
                }}
              >
                Repay
              </StyledWithraw>
            </>
          )}
        </StyledFlex>
      </StyledFlex>

      <StyledWrapper
        style={{
          marginBottom: 20,
          height: 252,
          borderRadius: 16,
          border: "1px solid #373A53",
          backgroundColor: "#2E3142",
        }}
      >
        <StyledWrapper
          style={{
            paddingTop: 25,
            paddingRight: 20,
            paddingBottom: 14,
            paddingLeft: 20,
            borderBottom: "1px solid #373A53",
          }}
        >
          <StyledFont
            style={{
              marginBottom: 18,
              color: "#FFF",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {data.baseToken.symbol} Wallet Balance
          </StyledFont>
          <StyledFlex
            style={{ marginBottom: 30, justifyContent: "space-between" }}
          >
            <StyledFlex style={{ gap: 14 }}>
              <Widget
                src="bluebiu.near/widget/Lending.CompoundV3.Bridge.Asset"
                props={{
                  size: "medium",
                  icon: data.baseToken.icon,
                  curChain,
                }}
              />
              <StyledFont
                style={{ color: "#FFF", fontSize: 16, fontWeight: 500 }}
              >
                {data.baseToken.symbol}
              </StyledFont>
            </StyledFlex>
            <StyledFlex
              style={{
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 3,
              }}
            >
              <StyledFont
                style={{ color: "#FFF", fontSize: 16, fontWeight: 500 }}
              >
                <Widget
                  src="bluebiu.near/widget/Utils.FormatAmount"
                  props={{
                    amount: state.walletBalance,
                  }}
                />
              </StyledFont>
              <StyledFont style={{ color: "#979ABE", fontSize: 12 }}>
                <Widget
                  src="bluebiu.near/widget/Utils.FormatAmount"
                  props={{
                    amount: state.walletBalanceUsd,
                    prev: "$",
                  }}
                />
              </StyledFont>
            </StyledFlex>
          </StyledFlex>
          <StyledFlex style={{ justifyContent: "space-between" }}>
            <StyledFlex style={{ gap: 10 }}>
              <StyledFont style={{ color: "#979ABE", fontSize: 14 }}>
                Net Supply APR
              </StyledFont>
              <StyledFont style={{ color: "#FFF", fontSize: 16 }}>
                {state.supplyApr}%
              </StyledFont>
            </StyledFlex>
            <StyledFlex style={{ gap: 10 }}>
              <StyledFont style={{ color: "#979ABE", fontSize: 14 }}>
                Net Borrow APR
              </StyledFont>
              <StyledFont style={{ color: "#FFF", fontSize: 16 }}>
                {state.borrowApr}%
              </StyledFont>
            </StyledFlex>
          </StyledFlex>
        </StyledWrapper>
        <StyledFlex
          style={{
            gap: 18,
            padding: 20,
          }}
        >
          <StyledButton
            disabled={Big(state.borrowedBalanceUsd || 0).gt(0)}
            onClick={() => {
              if (Big(state.borrowedBalanceUsd || 0).gt(0)) return;
              State.update({
                showDialog: true,
                type: "Supply",
                asset: {
                  ...data.baseToken,
                  walletBalance: state.walletBalance,
                  walletBalanceUsd: state.walletBalanceUsd,
                },
              });
            }}
          >
            {Big(state.borrowedBalanceUsd || 0).gt(0) && (
              <>
                <StyledTips>
                  Must repay full {data.baseToken.symbol} borrowing
                </StyledTips>
                <StyledSvg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <circle cx="7" cy="7" r="6.5" stroke="#979ABE" />
                    <path
                      d="M7 7L7 10.5"
                      stroke="#979ABE"
                      stroke-width="1.4"
                      stroke-linecap="round"
                    />
                    <circle cx="7" cy="4.375" r="0.875" fill="#979ABE" />
                  </svg>
                </StyledSvg>
              </>
            )}
            Supply
          </StyledButton>
          <StyledButton
            style={{
              backgroundColor:
                Big(state.balance || 0).gt(0) ||
                Big(state.borrowCapacity || 0).eq(0)
                  ? "rgba(151, 154, 190, 0.2)"
                  : "#5D36C3",
            }}
            disabled={
              Big(state.balance || 0).gt(0) ||
              Big(state.borrowCapacity || 0).eq(0)
            }
            onClick={() => {
              if (
                Big(state.balance || 0).gt(0) ||
                Big(state.borrowCapacity || 0).eq(0)
              )
                return;
              State.update({
                showDialog: true,
                type: "Borrow",
                asset: {
                  ...data.baseToken,
                  walletBalance: Big(state.availableToBorrow)
                    .div(data.baseToken.price)
                    .toString(),
                  walletBalanceUsd: state.availableToBorrow,
                },
              });
            }}
          >
            {Big(state.balance || 0).gt(0) && (
              <>
                <StyledTips>Must collateral asset below first</StyledTips>
                <StyledSvg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <circle cx="7" cy="7" r="6.5" stroke="#979ABE" />
                    <path
                      d="M7 7L7 10.5"
                      stroke="#979ABE"
                      stroke-width="1.4"
                      stroke-linecap="round"
                    />
                    <circle cx="7" cy="4.375" r="0.875" fill="#979ABE" />
                  </svg>
                </StyledSvg>
              </>
            )}
            Borrow
          </StyledButton>
        </StyledFlex>
      </StyledWrapper>
      <StyledWrapper
        style={{
          // gap: 18,
          paddingTop: 25,
          paddingRight: 20,
          paddingBottom: 40,
          paddingLeft: 20,
          borderRadius: 16,
          border: "1px solid #373A53",
          backgroundColor: "#2E3142",
        }}
      >
        <StyledFont
          style={{
            marginBottom: 18,
            color: "#FFF",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Collateral Assets
        </StyledFont>
        <StyledFlex style={{ flexDirection: "column", gap: 20, width: "100%" }}>
          {data.collateralAssets?.map((asset) => (
            <StyledFlex style={{ gap: 14, width: "100%" }} key={asset.address}>
              <StyledSvg></StyledSvg>
              <StyledWrapper style={{ flex: 1 }}>
                <StyledFlex
                  style={{ justifyContent: "space-between", gap: 10 }}
                >
                  <StyledFont
                    style={{ color: "#FFF", fontSize: 14, fontWeight: 500 }}
                  >
                    {asset.symbol}
                  </StyledFont>
                  <StyledDashed />
                  <StyledFont
                    style={{ color: "#FFF", fontSize: 14, fontWeight: 500 }}
                  >
                    <Widget
                      src="bluebiu.near/widget/Utils.FormatAmount"
                      props={{
                        amount: state.collateralBalances[asset.address].balance,
                      }}
                    />
                  </StyledFont>
                </StyledFlex>
                <StyledFlex style={{ justifyContent: "space-between" }}>
                  <StyledFont style={{ color: "#979ABE", fontSize: 12 }}>
                    <Widget
                      src="bluebiu.near/widget/Utils.FormatAmount"
                      props={{
                        amount:
                          state.collateralBalances[asset.address].walletBalance,
                        digits: 4,
                      }}
                    />{" "}
                    in wallet
                  </StyledFont>
                  <StyledFont style={{ color: "#979ABE", fontSize: 12 }}>
                    <Widget
                      src="bluebiu.near/widget/Utils.FormatAmount"
                      props={{
                        amount:
                          state.collateralBalances[asset.address].balanceUsd,
                        digits: 2,
                        prev: "$",
                      }}
                    />
                  </StyledFont>
                </StyledFlex>
              </StyledWrapper>
              <StyledFlex style={{ gap: 10 }}>
                <StyledOperationButton
                  disabled={Big(
                    state.collateralBalances[asset.address].walletBalance || 0
                  ).eq(0)}
                  onClick={() => {
                    State.update({
                      showDialog: true,
                      type: "Collateral",
                      asset: {
                        ...asset,
                        walletBalance:
                          state.collateralBalances[asset.address].walletBalance,
                        walletBalanceUsd:
                          state.collateralBalances[asset.address]
                            .walletBalanceUsd,
                      },
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path d="M1 5L9 5" stroke="#FFF" stroke-linecap="round" />
                    <path d="M5 1L5 9" stroke="#FFF" stroke-linecap="round" />
                  </svg>
                </StyledOperationButton>
                <StyledOperationButton
                  disabled={Big(
                    state.collateralBalances[asset.address].balance || 0
                  ).eq(0)}
                  onClick={() => {
                    State.update({
                      showDialog: true,
                      type: "Withdraw",
                      asset: {
                        ...asset,
                        walletBalance:
                          state.collateralBalances[asset.address].balance,
                        walletBalanceUsd:
                          state.collateralBalances[asset.address].balanceUsd,
                      },
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="2"
                    viewBox="0 0 10 2"
                    fill="none"
                  >
                    <path d="M1 1L9 1" stroke="#FFF" stroke-linecap="round" />
                  </svg>
                </StyledOperationButton>
              </StyledFlex>
            </StyledFlex>
          ))}
        </StyledFlex>
      </StyledWrapper>
    </StyledWrapper>
    <StyledWrapper style={{ width: 486 }}>
      <StyledFlex style={{ gap: 5 }}>
        <StyledFont style={{ color: "#979ABE" }}>Liquidation Risk</StyledFont>
        <Widget
          src="bluebiu.near/widget/Lending.CompoundV3.Bridge.Range"
          props={{
            value: Big(state.collaterValue || 0).eq(0)
              ? 0
              : Big(state.liquidationPoint || 0)
                  .div(state.collaterValue)
                  .mul(100)
                  .toFixed(0),
          }}
        />
      </StyledFlex>
      <StyledFlex
        style={{ marginTop: 16, marginBottom: 40, justifyContent: "flex-end" }}
      >
        <StyledFont style={{ color: "#979ABE", fontSize: 12 }}>
          Borrow Capacity
        </StyledFont>
      </StyledFlex>
      <StyledWrapper style={{ position: "relative", marginBottom: 20 }}>
        <StyledSvg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="488"
            height="160"
            viewBox="0 0 488 160"
            fill="none"
          >
            <path
              d="M179.632 1H479C483.418 1 487 4.58172 487 9V151C487 155.418 483.418 159 479 159H9C4.58172 159 1 155.418 1 151V9C1 4.58172 4.58172 1 9 1H12.1176"
              stroke="#373A53"
            />
          </svg>
        </StyledSvg>
        <StyledWrapper
          style={{
            position: "absolute",
            left: 0,
            top: -10,
            right: 0,
            bottom: 0,
          }}
        >
          <StyledWrapper style={{ marginBottom: 13, paddingLeft: 17 }}>
            <StyledFont
              style={{ color: "#FFF", fontSize: 18, fontWeight: 600 }}
            >
              Position Summary
            </StyledFont>
          </StyledWrapper>
          <StyledFlex
            style={{
              paddingRight: 15,
              paddingLeft: 15,
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 12,
            }}
          >
            <StyledFlex
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <StyledFont style={{ color: "#979ABE" }}>
                Collateral Value
              </StyledFont>
              <StyledFlex style={{ gap: 8 }}>
                <StyledFont style={{ color: "#FFF" }}>
                  <Widget
                    src="bluebiu.near/widget/Utils.FormatAmount"
                    props={{
                      amount: state.collaterValue,
                      prev: "$",
                    }}
                  />
                </StyledFont>
                {/* <StyledFont style={{ color: "#979ABE" }}>USDC</StyledFont> */}
              </StyledFlex>
            </StyledFlex>
            <StyledFlex
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <StyledFont style={{ color: "#979ABE" }}>
                Liquidation Point
              </StyledFont>
              <StyledFlex style={{ gap: 8 }}>
                <StyledFont style={{ color: "#FFF" }}>
                  <Widget
                    src="bluebiu.near/widget/Utils.FormatAmount"
                    props={{
                      amount: state.liquidationPoint,
                      prev: "$",
                    }}
                  />
                </StyledFont>
                {/* <StyledFont style={{ color: "#979ABE" }}>USDC</StyledFont> */}
              </StyledFlex>
            </StyledFlex>
            <StyledFlex
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <StyledFont style={{ color: "#979ABE" }}>
                Borrow Capacity
              </StyledFont>
              <StyledFlex style={{ gap: 8 }}>
                <StyledFont style={{ color: "#FFF" }}>
                  <Widget
                    src="bluebiu.near/widget/Utils.FormatAmount"
                    props={{
                      amount: state.borrowCapacity,
                      prev: "$",
                    }}
                  />
                </StyledFont>
                {/* <StyledFont style={{ color: "#979ABE" }}>USDC</StyledFont> */}
              </StyledFlex>
            </StyledFlex>
            <StyledFlex
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <StyledFont style={{ color: "#979ABE" }}>
                Available to Borrow
              </StyledFont>
              <StyledFlex style={{ gap: 8 }}>
                <StyledFont style={{ color: "#FFF" }}>
                  <Widget
                    src="bluebiu.near/widget/Utils.FormatAmount"
                    props={{
                      amount: state.availableToBorrow,
                      prev: "$",
                    }}
                  />
                </StyledFont>
                {/* <StyledFont style={{ color: "#979ABE" }}>USDC</StyledFont> */}
              </StyledFlex>
            </StyledFlex>
          </StyledFlex>
        </StyledWrapper>
      </StyledWrapper>
      <StyledWrapper
        style={{
          borderRadius: 16,
          border: "1px solid #373A53",
          backgroundColor: "#2E3142",
          padding: 20,
        }}
      >
        <StyledFlex
          style={{ marginBottom: 20, justifyContent: "space-between" }}
        >
          <StyledFont style={{ color: "#FFF", fontSize: 18, fontWeight: 600 }}>
            Position Summary
          </StyledFont>
          <StyledFont
            style={{
              color: "#FF51AF",
              fontSize: 14,
              cursor: state.loading ? "not-allowed" : "pointer",
              opacity: state.loading ? 0.6 : 1,
            }}
            onClick={() => {
              if (state.loading) return;
              State.update({
                actions: [],
              });
            }}
          >
            Clear all
          </StyledFont>
        </StyledFlex>
        <StyledFlex
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {state.actions?.map((action, i) => (
            <StyledFlex
              key={i + Math.random()}
              style={{
                width: "100%",
                justifyContent: "space-between",
                height: 60,
                paddingRight: 20,
                paddingLeft: 15,
                borderRadius: 8,
                backgroundColor: "#252734",
              }}
            >
              <StyledFlex style={{ gap: 14 }}>
                <StyledSvg></StyledSvg>
                <StyledFont style={{ color: "#FFF" }}>
                  {action.type} {action.asset.symbol}
                </StyledFont>
              </StyledFlex>
              <StyledFlex style={{ gap: 20 }}>
                <StyledFlex
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: 3,
                  }}
                >
                  <StyledFont style={{ color: "#FFF", fontWeight: 500 }}>
                    <Widget
                      src="bluebiu.near/widget/Utils.FormatAmount"
                      props={{
                        amount: action.amount,
                      }}
                    />
                  </StyledFont>
                  <StyledFont style={{ color: "#979ABE", fontSize: 12 }}>
                    <Widget
                      src="bluebiu.near/widget/Utils.FormatAmount"
                      props={{
                        amount: Big(action.amount)
                          .mul(action.asset.price)
                          .toString(),
                        prev: "$",
                      }}
                    />
                  </StyledFont>
                </StyledFlex>
                <StyledSvg
                  style={{ cursor: state.loading ? "not-allowed" : "pointer" }}
                  onClick={() => {
                    if (state.loading) return;
                    const _actions = state.actions;
                    _actions.splice(i, 1);
                    State.update({
                      actions: _actions,
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
                      fill="#979ABE"
                    />
                  </svg>
                </StyledSvg>
              </StyledFlex>
            </StyledFlex>
          ))}
          <StyledFlex style={{ width: "100%" }}>
            <StyledButton
              disabled={!state.actions.length || state.loading}
              onClick={() => {
                if (!state.actions.length || state.loading) return;
                State.update({
                  loading: true,
                });
              }}
            >
              {state.loading ? (
                <Widget
                  src="bluebiu.near/widget/0vix.LendingLoadingIcon"
                  props={{
                    size: 16,
                  }}
                />
              ) : (
                "Submit Transactions"
              )}
            </StyledButton>
          </StyledFlex>
        </StyledFlex>
      </StyledWrapper>
    </StyledWrapper>
    {state.showDialog && (
      <Widget
        src="bluebiu.near/widget/Lending.CompoundV3.Bridge.Dialog"
        props={{
          asset: state.asset,
          type: state.type,
          collaterValue: state.collaterValue,
          borrowCapacity: state.borrowCapacity,
          availableToBorrow: state.availableToBorrow,
          borrowApr: state.borrowApr,
          supplyApr: state.supplyApr,
          cometAddress: data.address,
          account,
          toast,
          addable: state.addable,
          onAmountChange,
          onAddAction,
          onClose: () => {
            State.update({
              showDialog: false,
            });
          },
        }}
      />
    )}
    <Widget
      src={dexConfig.handler}
      props={{
        ...dexConfig,
        actions: state.actions,
        update: state.loading,
        comet: data,
        wethAddress,
        account,
        onCancel: () => {
          State.update({
            loading: false,
          });
        },
        onLoad: (data) => {
          console.log("estimate gas", data);
          if (!data.gas) {
            State.update({
              loading: false,
            });
            toast?.fail({ title: "Estimate gas error" });
            return;
          }
          let toastId = toast?.loading({
            title: `Confirming...`,
          });
          Ethers.provider()
            .getSigner()
            .sendTransaction(data.unsignedTx)
            .then((tx) => {
              toast?.dismiss(toastId);
              toastId = toast?.loading({
                title: `Pending...`,
              });
              tx.wait()
                .then((res) => {
                  const { status, transactionHash } = res;
                  const _actions = [];
                  state.actions.forEach((action, i) => {
                    if (i > 0) action_title += ",";
                    _actions.push({
                      amount: action.amount,
                      type: action.type,
                      tokenSymbol: action.asset.symbol,
                      tokenAddress: action.asset.address,
                      tokenPriceKey: action.asset.priceKey || "",
                    });
                  });
                  addAction?.({
                    type: "Lending",
                    template: dexConfig.name,
                    add: false,
                    status,
                    transactionHash,
                    extra_data: JSON.stringify({ lending_actions: _actions }),
                  });
                  toast?.dismiss(toastId);
                  toast?.success({
                    title: `Request successed!`,
                    tx: transactionHash,
                    chainId: state.asset.chainId,
                  });
                  State.update({
                    loading: false,
                    actions: [],
                  });
                  updateInfo();
                })
                .catch((err) => {
                  toast?.dismiss(toastId);
                  toast?.fail({
                    title: "Request Failed!",
                  });
                });
            })
            .catch((err) => {
              toast?.dismiss(toastId);
              toast?.fail({
                title: "Request Failed!",
                text: err?.message?.includes("user rejected transaction")
                  ? "User rejected transaction"
                  : "",
              });
              State.update({ loading: false });
            });
        },
      }}
    />
  </StyledContainer>
);
