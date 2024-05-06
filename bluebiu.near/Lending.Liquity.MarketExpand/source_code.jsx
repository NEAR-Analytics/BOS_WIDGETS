const StyledBox = styled.div`
  border-radius: 0px 0px 16px 16px;
  background: #2e3142;
  height: 0px;
  animation: fadeOut 0.4s 0.1s ease both;
  &.expand {
    animation: fadeIn 0.4s 0.1s ease both;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
      height: 0px;
      border: none;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      height: 300px;
      border: 1px solid #373a53;
      border-top: none;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
      height: 300px;
      border: 1px solid #373a53;
      border-top: none;
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
      height: 0px;
      border: none;
    }
  }
`;

const StyledWrapper = styled.div`
  display: none;

  &.expand {
    display: block;
  }
`;

const StyledHeader = styled.div`
  height: 50px;
  padding-left: 520px;
  border-bottom: 1px solid #373a53;
`;

const StyledTabs = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTab = styled.div`
  width: 250px;
  height: 50px;
  border-bottom: 5px solid transparent;
  color: #979abe;
  text-align: center;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 50px;
  cursor: pointer;
  position: relative;
  transition: 0.3s;
  &::after {
    content: "";
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: #373a53;
    right: 0px;
    top: 0px;
  }
  &.active {
    border-bottom-color: #fff;
    color: #ffffff;
  }
`;

const StyledContent = styled.div`
  display: flex;
  padding-top: 16px;
`;
const StyledInfo = styled.div`
  width: 520px;
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
`;
const StyledInfoContent = styled.div`
  width: 390px;
  .icon {
    width: 16px;
    margin: 0 4px;
  }
`;
const StyledInfoTitle = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 16px;
  .icon {
    width: 16px;
    margin: 0 4px;
  }
`;
const StyledInfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  & .white {
    color: #fff;
  }
  .symbol {
    margin-left: 4px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;
const StyledInfoTips = styled.div`
  width: 390px;
  height: 52px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: rgba(235, 244, 121, 0.1);
  border-radius: 12px;
  gap: 8px;
  color: #ebf479;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
  .text {
    display: flex;
    align-items: center;
  }
  .icon {
    width: 16px;
    margin-left: 4px;
  }
`;

const StyledDetailPanel = styled.div`
  width: 500px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid #373a53;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
  & .white {
    color: #fff;
  }
`;
const StyledDetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledBorrowLimit = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 12px;
  height: 46px;
`;

const {
  expand,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  onSuccess,
  dexConfig,
  account,
  prices,
  tokenBal,
  IS_ETHOS_DAPP,
  IS_PREON_DAPP,
  IS_GRAVITA_DAPP,
  multicall,
  multicallAddress,
} = props;

const data = props.data || {};
const vesselStatus = data.vesselStatus; //ACTIVE INACTIVE
let TABS = [];
switch (vesselStatus) {
  case "ACTIVE":
    TABS = ["Adjust", "Close"];
    break;
  case "INACTIVE":
    TABS = ["Borrow"];
    break;
}

State.init({
  tab: TABS[0],
  yourLTV: 0,
  borrowingFee: 0,
  liquidationPrice: 0,
  totalDebt: 0,
  _maxFeePercentage: 0, //ethos need
  maxBorrowAmount: 0, // adjust need
});

useEffect(() => {
  State.update({
    tab: TABS[0],
  });
}, [TABS]);

//ethos
function getVesselManager(_amount) {
  const abi = [
    {
      inputs: [{ internalType: "uint256", name: "_LUSDDebt", type: "uint256" }],
      name: "getBorrowingFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getBorrowingRateWithDecay",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];
  const _LUSDDebt = ethers.utils.parseUnits(_amount);

  const calls = [
    {
      address: dexConfig.VesselManager,
      name: "getBorrowingRateWithDecay",
      params: [],
    },
    {
      address: dexConfig.VesselManager,
      name: "getBorrowingFee",
      params: [_LUSDDebt],
    },
  ];

  multicall({
    abi,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      const [[_maxFeePercentageRaw], [_borrowingFeeRaw]] = res;

      let borrowingFee;

      borrowingFee = ethers.utils.formatUnits(_borrowingFeeRaw);

      State.update({
        _maxFeePercentage: _maxFeePercentageRaw,
        borrowingFee,
      });
    })
    .catch((err) => {
      console.log("error:", err);
    });
}

useEffect(() => {
  if (state.tab === "Close") return;
  if ((IS_GRAVITA_DAPP || IS_PREON_DAPP) && state.isDebtBigerThanBalance)
    return;
  const price = prices[data.underlyingToken.symbol];

  if (IS_GRAVITA_DAPP) {
    let assetInUSD,
      totalDebt,
      _yourLTV,
      borrowingFee,
      liquidationPrice,
      maxBorrowAmount,
      borrowTokenBal;
    if (state.tab === "Borrow") {
      if (Big(state.borrowAmount || 0).gt(Big(state.borrowTokenBal || 0)))
        return;
      if (isNaN(Number(state.amount)) || !Number(state.amount)) return;
      assetInUSD = Big(state.amount).mul(price).mul(Big(data["MAX_LTV"]));
      if (state.borrowAmount) {
        _yourLTV = Big(state.borrowAmount).div(assetInUSD);
      }
      if (_yourLTV) {
        totalDebt = Big(state.amount).mul(price).mul(_yourLTV);
      }
      if (assetInUSD) {
        borrowTokenBal = assetInUSD
          .minus(20)
          .minus(assetInUSD.minus(20).mul(0.02))
          .toFixed(2);
      }
      if (totalDebt) {
        borrowingFee = totalDebt.minus(20).mul(0.02).toFixed(2);

        liquidationPrice = totalDebt
          .div(state.amount)
          .div(Big(data["MAX_LTV"]))
          .toFixed(2);
      }
    }
    if (state.tab === "Adjust") {
      // if (isNaN(Number(state.amount)) || !Number(state.amount)) return;
      assetInUSD = Big(state.amount || 0)
        .plus(data.vesselDeposit)
        .mul(price);
      _yourLTV = Big(state.borrowAmount || 0)
        .plus(data.vesselDebt)
        .div(assetInUSD);

      maxBorrowAmount = Big(assetInUSD)
        .mul(Big(data["MAX_LTV"]))
        .minus(data.vesselDebt)
        .minus(assetInUSD.minus(20).mul(0.02))
        .toFixed();

      if (_yourLTV) {
        totalDebt = Big(state.borrowAmount || 0).plus(data.vesselDebt);
      }

      if (totalDebt) {
        borrowingFee = Big(state.borrowAmount || 0)
          .mul(0.02)
          .toFixed(2);
        liquidationPrice = totalDebt
          .div(Big(data.vesselDeposit).plus(state.amount || 0))
          .div(Big(data["MAX_LTV"]))
          .toFixed(2);
      }
    }

    State.update({
      totalDebt: Big(totalDebt || 0).toFixed(2),
      yourLTV: Big(_yourLTV || 0).toFixed(2),
      borrowingFee,
      liquidationPrice,
      borrowTokenBal,
      maxBorrowAmount,
    });
  }
  if (IS_PREON_DAPP) {
    if (isNaN(Number(state.amount)) || !Number(state.amount)) return;
    let assetInUSD,
      totalDebt,
      yourLTV,
      borrowingFee,
      liquidationPrice,
      borrowTokenBal;
    const liquidationFee = 20;

    if (state.tab === "Borrow") {
      assetInUSD = Big(state.amount).mul(price).mul(Big(data["MAX_LTV"]));
    }
    if (state.tab === "Adjust") {
      assetInUSD = Big(state.amount || 0)
        .plus(data.vesselDeposit)
        .mul(price)
        .mul(Big(data["MAX_LTV"]));
    }

    if (assetInUSD) {
      borrowTokenBal = assetInUSD
        .minus(20)
        .minus(assetInUSD.minus(20).mul(0.02))
        .toFixed();
    }

    if (Big(state.borrowAmount || 0).gt(Big(borrowTokenBal || 0))) return;
    borrowingFee = Big(state.borrowAmount || 0)
      .mul(0.08)
      .toFixed();
    totalDebt = Big(state.borrowAmount || 0)
      .plus(Big(borrowingFee))
      .plus(liquidationFee)
      .toFixed();
    yourLTV = Big(totalDebt)
      .div(Big(state.amount).mul(prices[data.underlyingToken.symbol]))
      .toFixed();
    liquidationPrice = Big(totalDebt)
      .div(Big(state.amount).mul(Big(data["MAX_LTV"])))
      .toFixed();
    State.update({
      totalDebt,
      yourLTV,
      borrowingFee,
      liquidationPrice,
      borrowTokenBal,
    });
  }

  if (IS_ETHOS_DAPP) {
    if (isNaN(Number(state.amount)) || !Number(state.amount)) return;
    if (!Number(state.borrowAmount)) return;
    let totalDebt,
      collateralRatio, //  like _yourLTV
      liquidationPrice;

    totalDebt = Big(state.borrowAmount || 0)
      .plus(10)
      .plus(state.borrowingFee)
      .toFixed();
    collateralRatio = Big(state.amount || 0)
      .mul(prices[data.underlyingToken.symbol])
      .div(totalDebt)
      .toFixed();

    liquidationPrice = Big(totalDebt)
      .div(Big(state.amount).mul(data.MCR))
      .toFixed();
    State.update({
      totalDebt,
      collateralRatio,
      liquidationPrice,
    });
  }
}, [state.borrowAmount, state.amount]);

const onAmountChange = (amount) => {
  if (isNaN(Number(amount))) return;
  const isZero = Big(amount || 0).eq(0);
  if (isZero) {
    State.update({
      amount,
    });
    return;
  }
  const _isAssetBigerThanBalance = Big(amount || 0).gt(
    data.userUnderlyingBalance || 0
  );
  const params = {
    amount: _isAssetBigerThanBalance ? data.userUnderlyingBalance : amount,
  };

  State.update(params);
};

const onBorrowAmountChange = (amount) => {
  if (isNaN(Number(amount))) return;
  const isZero = Big(amount || 0).eq(0);
  if (isZero) {
    State.update({
      borrowAmount: amount,
    });
    return;
  }
  if (IS_ETHOS_DAPP) {
    getVesselManager(amount);
  }
  const params = { borrowAmount: amount };
  if (state.tab === "Borrow") {
    params.isDebtBigerThanBalance = Big(amount || 0).gt(
      Big(state.borrowTokenBal || 0)
    );
  }
  if (state.tab === "Adjust") {
    params.isDebtBigerThanBalance = Big(amount || 0).gt(
      Big(state.maxBorrowAmount || 0)
    );
  }
  State.update(params);
};

if (!state.tab) return null;

return (
  <StyledBox className={expand ? "expand" : ""}>
    <StyledWrapper className={expand ? "expand" : ""}>
      <StyledHeader>
        <StyledTabs>
          {TABS.map((tab) => (
            <StyledTab
              key={tab}
              className={tab === state.tab ? "active" : ""}
              onClick={() => {
                State.update({ tab, amount: "" });
              }}
            >
              {tab}
            </StyledTab>
          ))}
        </StyledTabs>
      </StyledHeader>
      <StyledContent>
        <StyledInfo>
          <StyledInfoContent>
            {state.tab === "Borrow" && (
              <StyledInfoTitle>
                Borrowing from
                <img src={data.underlyingToken.icon} className="icon" alt="" />
                {data.underlyingToken.symbol}
              </StyledInfoTitle>
            )}
            {state.tab === "Adjust" && (
              <StyledInfoTitle>Adjust Your Position</StyledInfoTitle>
            )}
            {(state.tab === "Borrow" || state.tab === "Adjust") &&
            (IS_GRAVITA_DAPP || IS_PREON_DAPP) ? (
              <StyledInfoItem>
                <div>Your LTV</div>
                <div className="white">
                  {Big(state.yourLTV || 0)
                    .mul(100)
                    .toFixed(2)}
                  %
                </div>
              </StyledInfoItem>
            ) : null}

            {IS_ETHOS_DAPP && (
              <StyledInfoItem>
                <div>Collateral Ratio</div>
                <div className="white">
                  {Big(state.collateralRatio || 0)
                    .mul(100)
                    .toFixed(2)}
                  %
                </div>
              </StyledInfoItem>
            )}
            {state.tab === "Adjust" && (
              <StyledInfoItem>
                <div>Your Collateral</div>
                <div className="white">
                  {data.vesselDeposit}
                  {data.underlyingToken?.symbol}
                </div>
              </StyledInfoItem>
            )}
            {state.tab === "Borrow" || state.tab === "Adjust" ? (
              <>
                <StyledInfoItem>
                  <div>Liquidation Price</div>
                  <div className="white">
                    {Number(state.liquidationPrice).toFixed(2)} USD
                  </div>
                </StyledInfoItem>
                <StyledInfoItem>
                  <div>Borrowing Fee</div>
                  <div className="white">
                    {Number(state.borrowingFee).toFixed(2)}
                    {data.BORROW_TOKEN}
                  </div>
                </StyledInfoItem>

                <StyledInfoItem>
                  <div>Total Debt</div>
                  <div className="white">
                    {Number(state.totalDebt).toFixed(2)}
                    {data.BORROW_TOKEN}
                  </div>
                </StyledInfoItem>
              </>
            ) : null}

            {state.tab === "Borrow" && (
              <StyledInfoTips>
                <img
                  src="https://ipfs.near.social/ipfs/bafkreia4fvn2zeymgsn57arq2u6mytztrcedil6og7ujbinvpvt3n3bmrm"
                  alt=""
                />
                <div className="txt">
                  Deposit collateral and/or borrow more
                  <img src={data.BORROW_URL} className="icon" alt="" />{" "}
                  {data.BORROW_TOKEN}.
                </div>
              </StyledInfoTips>
            )}
            {state.tab === "Adjust" && (
              <StyledInfoTips>
                <img
                  src="https://ipfs.near.social/ipfs/bafkreia4fvn2zeymgsn57arq2u6mytztrcedil6og7ujbinvpvt3n3bmrm"
                  alt=""
                />
                <div>Manage the collateral health of your vault.</div>
              </StyledInfoTips>
            )}
          </StyledInfoContent>
          {state.tab === "Close" && (
            <StyledInfoContent>
              <StyledInfoTitle>Close Your Position</StyledInfoTitle>
              <StyledInfoItem>
                <div>You will repay</div>
                <div className="right">
                  <img src={data.BORROW_URL} className="icon" alt="" />
                  <span className="white">{data.vesselDebt}</span>
                  <span className="symbol">{data.BORROW_TOKEN}</span>
                </div>
              </StyledInfoItem>
              <StyledInfoItem>
                <div>You have</div>
                <div className="right">
                  <img src={data.BORROW_URL} className="icon" alt="" />
                  <span className="white">{tokenBal}</span>
                  <span className="symbol">{data.BORROW_TOKEN}</span>
                </div>
              </StyledInfoItem>
              {/* <StyledInfoItem>
                <div>You will receive</div>
                <div className="right">
                  <img
                    src={data.underlyingToken.icon}
                    className="icon"
                    alt=""
                  />
                  <span className="white">{deposits}</span>
                  <span className="symbol">{data.underlyingToken.symbol}</span>
                </div>
              </StyledInfoItem> */}
              {Big(tokenBal || 0).lt(Big(data.vesselDebt || 0)) ? (
                <StyledInfoTips>
                  More GRAI must be acquired in order to close the Vessel.
                </StyledInfoTips>
              ) : null}

              <StyledInfoTips>
                <img
                  src="https://ipfs.near.social/ipfs/bafkreia4fvn2zeymgsn57arq2u6mytztrcedil6og7ujbinvpvt3n3bmrm"
                  alt=""
                />
                <div>
                  By closing your position, you receive your collateral from the
                  Nebula Vault.
                </div>
              </StyledInfoTips>
            </StyledInfoContent>
          )}
        </StyledInfo>
        <div>
          {state.tab === "Borrow" ? (
            <>
              <Widget
                src="bluebiu.near/widget/Lending.MarketInput"
                props={{
                  icon: data.underlyingToken?.icon,
                  symbol: data.underlyingToken?.symbol,
                  balance: data?.userUnderlyingBalance,
                  price: prices[data.underlyingToken.symbol],
                  amount: state.amount,
                  onChange: (val) => {
                    onAmountChange(val);
                  },
                }}
              />
              <Widget
                src="bluebiu.near/widget/Lending.Liquity.MarketInput"
                props={{
                  icon: data.BORROW_URL,
                  symbol: data.BORROW_TOKEN,
                  balance: state.borrowTokenBal,
                  price: prices[data.BORROW_TOKEN] || 0,
                  amount: state.borrowAmount,
                  onChange: (val) => {
                    onBorrowAmountChange(val);
                  },
                }}
              />
            </>
          ) : null}
          {state.tab === "Adjust" ? (
            <>
              <Widget
                src="bluebiu.near/widget/Lending.MarketInput"
                props={{
                  icon: data.underlyingToken?.icon,
                  symbol: data.underlyingToken?.symbol,
                  balance: data?.userUnderlyingBalance,
                  price: prices[data.underlyingToken.symbol],
                  amount: state.amount,
                  onChange: (val) => {
                    onAmountChange(val);
                  },
                }}
              />
              <Widget
                src="bluebiu.near/widget/Lending.Liquity.MarketInput"
                props={{
                  icon: data.BORROW_URL,
                  symbol: data.BORROW_TOKEN,
                  balance: state.maxBorrowAmount,
                  price: prices[data.BORROW_TOKEN] || 0,
                  amount: state.borrowAmount,
                  onChange: (val) => {
                    onBorrowAmountChange(val);
                  },
                }}
              />
            </>
          ) : null}

          <StyledButtonWrapper>
            {state.tab === "Borrow" || state.tab === "Close" ? (
              <div style={{ flexGrow: 1 }}>
                <Widget
                  src="bluebiu.near/widget/Lending.Liquity.MarketButton"
                  props={{
                    actionText: state.tab,
                    ...props,
                    data: {
                      ...data,
                      config: dexConfig,
                    },

                    isDebtBigerThanBalance: state.isDebtBigerThanBalance,
                    addAction,
                    toast,
                    chainId,
                    unsignedTx: state.unsignedTx,
                    isError: state.isError,
                    // loading: state.loading,
                    // gas: state.gas,
                    yourLTV: state.yourLTV,
                    _assetAmount: state.amount,
                    _debtTokenAmount: state.borrowAmount,
                    _maxFeePercentage: state._maxFeePercentage,
                    collateralRatio: state.collateralRatio,
                    onApprovedSuccess: () => {
                      if (!state.gas) state.getTrade();
                    },
                    onSuccess: () => {
                      onSuccess?.();
                    },
                    isCloseDisabled: Big(tokenBal || 0).lt(
                      Big(data.vesselDebt || 0)
                    )
                      ? true
                      : false,
                  }}
                />
              </div>
            ) : null}
            {state.tab === "Adjust" ? (
              <div style={{ flexGrow: 1 }}>
                <Widget
                  src="bluebiu.near/widget/Lending.Liquity.AdjustButton"
                  props={{
                    actionText: state.tab,
                    ...props,
                    data: {
                      ...data,
                      config: dexConfig,
                    },

                    isDebtBigerThanBalance: state.isDebtBigerThanBalance,
                    _maxFeePercentage: state._maxFeePercentage,
                    unsignedTx: state.unsignedTx,
                    isError: state.isError,
                    // loading: state.loading,
                    // gas: state.gas,
                    yourLTV: state.yourLTV,
                    _assetAmount: state.amount,
                    _debtTokenAmount: state.borrowAmount,
                    collateralRatio: state.collateralRatio,
                    onApprovedSuccess: () => {
                      if (!state.gas) state.getTrade();
                    },
                    onSuccess: () => {
                      onSuccess?.();
                    },
                  }}
                />
              </div>
            ) : null}
          </StyledButtonWrapper>
        </div>
      </StyledContent>
    </StyledWrapper>
  </StyledBox>
);
