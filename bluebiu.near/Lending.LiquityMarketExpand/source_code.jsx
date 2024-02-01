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
      height: 292px;
      border: 1px solid #373a53;
      border-top: none;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
      height: 292px;
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
  margin-top: 26px;
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
const StyledGasBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
console.log("TABS: ", TABS);
State.init({
  tab: TABS[0],
  yourLTV: "-",
});

useEffect(() => {
  State.update({
    tab: TABS[0],
  });
}, [TABS]);

useEffect(() => {
  const debounce = (fn, wait) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(fn, wait);
    };
  };

  const getTrade = () => {
    State.update({
      loading: true,
    });
  };

  const debouncedGetTrade = debounce(getTrade, 500);

  State.update({
    debouncedGetTrade,
    getTrade,
  });
}, []);

const onBorrowAmountChange = (amount) => {
  if (isNaN(Number(amount))) return;
  const isZero = Big(amount || 0).eq(0);
  if (isZero) {
    return;
  }
  const params = { borrowAmount: amount };

  if (Big(amount).gt(Big(state.borrowTokenBal || 0))) {
    params.isBigerThanBalance = true;
  }
  State.update(params);
  state.debouncedGetTrade();
};

const onAmountChange = (amount) => {
  if (isNaN(Number(amount))) return;
  const isZero = Big(amount || 0).eq(0);
  if (isZero) {
    State.update({
      amount,
      buttonClickable: false,
      isBigerThanBalance: false,
    });
    return;
  }
  const params = { amount };
  // const price = prices[data.underlyingToken.symbol];
  // const value = Big(Big(amount).mul(price).toFixed(20));
  if (state.tab === "Borrow") {
    params.isBigerThanBalance = Big(amount).gt(data.userUnderlyingBalance || 0);
  }
  // if (state.tab === "Borrow") {
  //   params.isBigerThanBalance = false;
  // }
  params.buttonClickable = !params.isBigerThanBalance;

  const price = prices[data.underlyingToken.symbol];

  const TotalDebt = Big(amount).mul(price).mul(Big(data["MAX_LTV"])).div(100);

  const borrowTokenBal = TotalDebt.minus(20)
    .minus(TotalDebt.minus(20).mul(0.02))
    .toFixed();

  params.borrowTokenBal = borrowTokenBal;

  State.update(params);

  state.debouncedGetTrade();
};

useEffect(() => {
  if (
    !state.amount ||
    !state.borrowAmount ||
    isNaN(Number(state.amount)) ||
    isNaN(Number(state.borrowAmount)) ||
    Big(state.amount || 0).eq(0) ||
    Big(state.borrowAmount || 0).eq(0)
  ) {
    State.update({
      yourLTV: "-",
    });
    return;
  }

  // GRAI的借贷数量/ WETH的数量*价格*Maximum LTV-20
  const _maxLTV = Big(data.MAX_LTV).div(100);
  const _price = prices[data.underlyingToken.symbol];
  const _der = Big(state.amount).mul(Big(_price)).mul(_maxLTV);
  // .minus(20);

  const _yourLTV = Big(state.borrowAmount).div(_der).toFixed(4);
  // console.log( _maxLTV.toFixed(), _price, _der.toFixed(), _yourLTV);
  State.update({
    yourLTV: Big(_yourLTV).mul(100).toFixed(2),
  });
}, [state.amount, state.borrowAmount]);

return !state.tab ? null : (
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
          {state.tab === "Borrow" && (
            <StyledInfoContent>
              <StyledInfoTitle>
                Borrowing from
                <img src={data.underlyingToken.icon} className="icon" alt="" />
                {data.underlyingToken.symbol}
              </StyledInfoTitle>
              <StyledInfoItem>
                <div>Your LTV</div>
                <div className="white">{state.yourLTV}%</div>
              </StyledInfoItem>

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
            </StyledInfoContent>
          )}
          {state.tab === "Adjust" && (
            <StyledInfoContent>
              <StyledInfoTitle>Adjust Your Position</StyledInfoTitle>
              <StyledInfoTips>
                <img
                  src="https://ipfs.near.social/ipfs/bafkreia4fvn2zeymgsn57arq2u6mytztrcedil6og7ujbinvpvt3n3bmrm"
                  alt=""
                />
                <div>Manage the collateral health of your vault.</div>
              </StyledInfoTips>
            </StyledInfoContent>
          )}
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
          {state.tab === "Borrow" || state.tab === "Adjust" ? (
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
                src="bluebiu.near/widget/Lending.MarketInput"
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
          <StyledButtonWrapper>
            <StyledGasBox>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M11.3496 14.1934V8.67643H11.7636C11.9886 8.67643 12.1776 8.84743 12.1776 9.05443V12.5644C12.1776 13.4644 12.9696 14.1934 13.9506 14.1934C14.9316 14.1934 15.7236 13.4644 15.7236 12.5644V5.81443C15.7236 5.46343 15.5616 5.13943 15.3096 4.91443L13.8606 3.59143C13.5996 3.34843 13.1766 3.34843 12.9156 3.59143C12.6546 3.83443 12.6546 4.22143 12.9156 4.46443L13.8516 5.32843L13.1586 5.99443C12.9336 6.21043 12.9336 6.55243 13.1586 6.76843C13.2666 6.87643 13.4196 6.93043 13.5726 6.93043H14.3556V12.5734C14.3556 12.7804 14.1756 12.9514 13.9416 12.9514C13.7166 12.9514 13.5276 12.7804 13.5276 12.5734V9.06343C13.5276 8.16343 12.7356 7.43443 11.7546 7.43443H11.3496V4.42843C11.3496 3.87043 10.8636 3.42943 10.2516 3.42943H4.51856C3.91556 3.42943 3.42056 3.87943 3.42056 4.42843V14.1934H3.28556C2.90756 14.1934 2.60156 14.4724 2.60156 14.8234C2.60156 15.1744 2.90756 15.4534 3.28556 15.4534H11.4846C11.8626 15.4534 12.1686 15.1744 12.1686 14.8234C12.1686 14.4724 11.8626 14.1934 11.4846 14.1934H11.3496ZM5.39156 4.67143H9.37856C9.71156 4.67143 9.98156 4.91443 9.98156 5.22043V7.87543C9.98156 8.18143 9.71156 8.42443 9.37856 8.42443H5.39156C5.05856 8.42443 4.78856 8.18143 4.78856 7.87543V5.22043C4.78856 4.91443 5.05856 4.67143 5.39156 4.67143Z"
                  fill="#979ABE"
                />
              </svg>
              <div style={{ display: "flex", alignItems: "center" }}>
                ~
                {props.prices[nativeCurrency?.symbol]
                  ? `$${Big(state.gas || 0)
                      .div(Big(10).pow(nativeCurrency.decimals || 18))
                      .toFixed(2)}`
                  : "-"}
              </div>
            </StyledGasBox>
            <div style={{ flexGrow: 1 }}>
              <Widget
                src="bluebiu.near/widget/Lending.LiquityMarketButton"
                props={{
                  disabled:
                    state.tab === "Close" ? false : !state.buttonClickable,
                  actionText: state.tab,
                  amount: state.amount,
                  data: {
                    ...data,
                    config: dexConfig,
                  },
                  isBigerThanBalance: state.isBigerThanBalance,
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
                  onApprovedSuccess: () => {
                    if (!state.gas) state.getTrade();
                  },
                  onSuccess: () => {
                    onSuccess?.();
                  },
                }}
              />
            </div>
          </StyledButtonWrapper>
        </div>
      </StyledContent>
      {/* {dexConfig?.handler && (
        <Widget
          src={dexConfig.handler}
          props={{
            update: state.loading,
            data: {
              // actionText: state.tab === "Supply" ? "Deposit" : "Borrow",
              actionText: state.tab,
              ...data,
              config: dexConfig,
            },
            amount: state.amount,
            _assetAmount: 0.12,
            _debtTokenAmount: 200,
            _upperHint: "0x544f96434f77437425d5aC40fd4755C0cf39399A",
            _lowerHint: "0xA1B7bbade134DB3B14B56056480e81c60Ab77377",
            account,
            onLoad: (_data) => {
              console.log("load handler:", _data);
              State.update({
                ..._data,
                loading: false,
              });
            },
          }}
        />
      )} */}
    </StyledWrapper>
  </StyledBox>
);
