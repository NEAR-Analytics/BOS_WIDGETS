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
`;
const StyledInfoTitle = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 16px;
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
`;
const StyledInfoTips = styled.div`
  width: 390px;
  height: 52px;
  display: flex;
  padding: 9px 14px 0px;
  background-color: rgba(235, 244, 121, 0.1);
  border-radius: 12px;
  gap: 10px;
  color: #ebf479;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 26px;
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
  borrowLimit,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  onSuccess,
  dexConfig,
  account,
  prices,
  orbitTab,
} = props;

const data = props.data || {};
console.log("MarketExpand--", props);
let TABS;
if (data.canBorrow) {
  TABS = ["Supply", "Borrow"];
} else {
  TABS = ["Supply"];
}
const underlyingPrice = prices[data.symbol] || 1;

State.init({ tab: "Supply" });

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

const onAmountChange = (amount) => {
  if (isNaN(Number(amount))) return;
  if (amount.split(".")[1].length > 18) return;
  const isZero = Big(amount || 0).eq(0);
  if (isZero) {
    State.update({
      amount,
      buttonClickable: false,
      borrowLimit: "",
      isEmpty: Number(amount) === 0 && amount !== "",
      isOverSize: false,
      isBigerThanBalance: false,
    });
    return;
  }
  const params = { amount };
  const value = Big(Big(amount).mul(underlyingPrice).toFixed(20));
  if (state.tab === "Supply") {
    params.borrowLimit = Big(borrowLimit || 0).plus(
      value.mul(data.loanToValue / 100)
    );
    params.isBigerThanBalance = Big(amount).gt(data.userUnderlyingBalance || 0);
    params.isOverSize = false;
  }
  if (state.tab === "Borrow") {
    params.borrowLimit = Big(borrowLimit || 0).minus(value || 0);
    params.isBigerThanBalance = false;

    params.isOverSize = value.gt(borrowLimit || 0);
  }
  params.buttonClickable = !params.isOverSize && !params.isBigerThanBalance;
  State.update(params);

  state.debouncedGetTrade();
};

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
            <StyledInfoTitle>Your info</StyledInfoTitle>
            <StyledInfoItem>
              <div>Your borrw limit</div>
              <div className="white">
                {" "}
                <Widget
                  src="bluebiu.near/widget/Avalanche.Lending.Total"
                  props={{
                    total: borrowLimit,
                    digit: 2,
                    unit: "$",
                  }}
                />
              </div>
            </StyledInfoItem>
            <StyledInfoItem>
              <div>Available to Supply</div>
              <div>
                <span className="white">
                  <Widget
                    src="bluebiu.near/widget/Avalanche.Lending.Total"
                    props={{
                      total: data.userUnderlyingBalance,
                      digit: 2,
                      unit: "",
                    }}
                  />
                </span>{" "}
                {data.underlyingToken?.symbol}
              </div>
            </StyledInfoItem>
            <StyledInfoItem>
              <div>Available to Borrow</div>
              <div>
                <span className="white">
                  <Widget
                    src="bluebiu.near/widget/Avalanche.Lending.Total"
                    props={{
                      total: Big(borrowLimit).div(underlyingPrice).toString(),
                      digit: 2,
                      unit: "",
                    }}
                  />
                </span>{" "}
                {data.underlyingToken?.symbol}
              </div>
            </StyledInfoItem>
            <StyledInfoTips>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <circle cx="6" cy="6" r="5.5" stroke="#EBF479" />
                <path
                  d="M6 6L6 9"
                  stroke="#EBF479"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="6" cy="3.75" r="0.75" fill="#EBF479" />
              </svg>
              <div>
                To borrow you need to supply any asset to be used as collateral.
              </div>
            </StyledInfoTips>
          </StyledInfoContent>
        </StyledInfo>
        <div>
          <Widget
            src="bluebiu.near/widget/Lending.MarketInput"
            props={{
              icon: data.underlyingToken?.icon,
              symbol: data.underlyingToken?.symbol,
              decimals: data.underlyingToken?.decimals,
              balance:
                state.tab === "Supply"
                  ? data.userUnderlyingBalance
                  : Big(borrowLimit || 0)
                      .div(underlyingPrice)
                      .toString(),
              price: underlyingPrice,
              amount: state.amount,
              onChange: (val) => {
                onAmountChange(Big(val).toFixed(4, 0));
              },
            }}
          />

          <StyledButtonWrapper>
            <div style={{ flexGrow: 1 }}>
              <Widget
                src="bluebiu.near/widget/Avalanche.Lending.DialogButton"
                props={{
                  disabled: !state.buttonClickable,
                  actionText: state.tab === "Supply" ? "Deposit" : "Borrow",
                  amount: state.amount,
                  data: {
                    ...data,
                    config: dexConfig,
                  },
                  addAction,
                  toast,
                  chainId,
                  unsignedTx: state.unsignedTx,
                  isError: state.isError,
                  loading: state.loading,
                  gas: state.gas,
                  account,
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
      {dexConfig?.handler && (
        <Widget
          src={dexConfig.handler}
          props={{
            update: state.loading,
            data: {
              actionText: state.tab === "Supply" ? "Deposit" : "Borrow",
              ...data,
              config: dexConfig,
            },
            amount: state.amount,
            account,
            orbitTab,
            onLoad: (_data) => {
              console.log("handler_onLoad:", _data);
              State.update({
                ..._data,
                loading: false,
              });
            },
          }}
        />
      )}
    </StyledWrapper>
  </StyledBox>
);
