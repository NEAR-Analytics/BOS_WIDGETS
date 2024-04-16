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
  display: flex;
  justify-content: center;
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
  border-right: 1px solid #373a53;
  &.active {
    border-bottom-color: #fff;
    color: #ffffff;
  }
  &:last-child {
    border-right: none;
  }
`;

const StyledContent = styled.div`
  display: flex;
  padding-top: 16px;
  justify-content: center;
  gap: 16px;
`;
const StyledInfo = styled.div`
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
  margin-top: 15px;
  height: 46px;
`;

const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: white;
  margin-bottom: 15px;
`;
const InfoKey = styled.div`
  color: #979abe;
`;

const TABS = ["Deposit", "Withdraw"];

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
  multicall,
  multicallAddress,
  TOKENS,
} = props;

const data = props.data || {};
console.log("TOKENS--", TOKENS);
const tokenBal = TOKENS?.find(
  (item) => item.symbol === data.TOKEN_A.symbol
).balance;

State.init({
  tab: "Deposit",
  buttonClickable: true,
});

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
  if (state.tab === "Deposit") {
    params.isBigerThanBalance = Big(amount).gt(tokenBal || 0);
  }
  State.update(params);

  state.debouncedGetTrade();
};
function formatValue(value, digits) {
  if (isNaN(Number(value))) return "";
  if (Number(value) === 0) return "0";
  return Big(value || 0).lt(0.01)
    ? "< 0.01"
    : `${Number(value).toFixed(digits || 2)}`;
}
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
        <div>
          <Widget
            src="bluebiu.near/widget/Lending.MarketInput"
            props={{
              icon: data.TOKEN_A.icon,
              symbol: data.TOKEN_A.symbol,
              balance: state.tab === "Deposit" ? tokenBal : data.yourDeposited,
              price: prices[data.TOKEN_A.symbol],
              amount: state.amount,
              onChange: (val) => {
                onAmountChange(val);
              },
            }}
          />
          <StyledButtonWrapper>
            <div>
              <Widget
                src="bluebiu.near/widget/Lending.Cog.PoolButton"
                props={{
                  ...props,
                  disabled: !state.buttonClickable,
                  actionText: state.tab,
                  amount: state.amount,
                  isBigerThanBalance: state.isBigerThanBalance,
                  onSuccess: () => {
                    onSuccess?.();
                  },
                }}
              />
            </div>
          </StyledButtonWrapper>
        </div>
        <StyledInfo>
          <StyledInfoContent>
            <InfoWrap>
              <InfoKey>Your Collateral:</InfoKey>
              {formatValue(data.yourCollateraled, 2)} {data.collateralSymbol}
            </InfoWrap>
            <InfoWrap>
              <InfoKey>Your Deposited:</InfoKey>{" "}
              {formatValue(data.yourDeposited, 2)} {data.depositSymbol}
            </InfoWrap>
            <InfoWrap>
              <InfoKey>Health Factor:</InfoKey> 0.00 %
            </InfoWrap>
            <InfoWrap>
              <InfoKey>Interest Rate:</InfoKey>
              {Big(data.Rate).times(100).toFixed(2)}%
            </InfoWrap>
          </StyledInfoContent>
        </StyledInfo>
      </StyledContent>
    </StyledWrapper>
  </StyledBox>
);
