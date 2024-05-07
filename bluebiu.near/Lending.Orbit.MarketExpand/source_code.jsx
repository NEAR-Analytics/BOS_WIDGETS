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
  display: none;
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
                onAmountChange(val);
              },
            }}
          />
          {/* <StyledDetailPanel>
             {state.tab === "Supply" && (
              <StyledDetailItem>
                <div>Collateral factor</div>
                <div className="white">
                  {data.collateralFactor ? "Enable" : "Disable"}
                </div>
              </StyledDetailItem>
            )} 
            <StyledDetailItem>
              <div>Borrow limit</div>
              <StyledBorrowLimit>
                <div>
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
                {!!state.borrowLimit && (
                  <>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="10"
                      viewBox="0 0 8 10"
                      fill="none"
                    >
                      <path
                        d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z"
                        fill="#979ABE"
                      />
                    </svg>
                    <div className="white">
                      {" "}
                      <Widget
                        src="bluebiu.near/widget/Avalanche.Lending.Total"
                        props={{
                          total: state.borrowLimit,
                          digit: 2,
                          unit: "$",
                        }}
                      />
                    </div>
                  </>
                )}
              </StyledBorrowLimit>
            </StyledDetailItem>
          </StyledDetailPanel> */}
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
