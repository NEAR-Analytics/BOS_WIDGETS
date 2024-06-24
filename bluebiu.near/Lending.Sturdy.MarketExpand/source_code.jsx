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
  border-bottom: 1px solid #373a53;
`;

const StyledTabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  &:last-child {
    border-right: none;
  }
  &.active {
    border-bottom-color: #fff;
    color: #ffffff;
  }
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 16px;
  .disabled {
    opacity: 0.2;
    pointer-events: none;
  }
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
const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: white;
  margin-bottom: 10px;
`;
const InfoKey = styled.div`
  color: #979abe;
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
  multicall,
  multicallAddress,
  TOKENS,
} = props;

const data = props.data || {};
// console.log("DATA--", data);
let TABS = ["Add Collateral", "Remove Collateral", "Borrow", "Repay"];

State.init({
  tab: TABS[0],
  // infos: [],
  contentStatus: "",
  borrowLimitUSD: 0,
});

const Infos = [
  "Your Collateral",
  "Your Borrow",
  "Your Lend",
  "Max LTV",
  "Liquidation Fee",
];

if (!state.tab) return null;
function formatValue(value, digits) {
  if (isNaN(Number(value))) return "";
  if (Number(value) === 0) return "0";
  return Big(value || 0).lt(0.01)
    ? "< 0.01"
    : `${Number(value).toFixed(digits || 2)}`;
}
const onAmountChange = (amount) => {
  if (isNaN(Number(amount))) return;
  const isZero = Big(amount || 0).eq(0);
  if (isZero) {
    State.update({
      amount,
    });
    return;
  }
  const params = { amount };
  params.isAssetBigerThanBalance = Big(amount || 0).gt(
    data.userUnderlyingBalance || 0
  );

  State.update(params);
};

function getPrice(symbol) {
  if (symbol === "weETH.mode") {
    return prices["weETH"];
  }
  return prices[symbol] || 1;
}
useEffect(() => {
  const collateralUSD = Big(data.yourCollateral || 0).times(
    Big(getPrice(data.TOKEN_A.symbol))
  );
  const borrowUSD = Big(data.yourBorrow || 0).times(
    Big(getPrice(data.TOKEN_B.symbol))
  );
  const _borrowLimitUSD = collateralUSD
    .times(Big(data.maxLTV || 0))
    .div(1.06)
    .minus(borrowUSD);

  State.update({
    borrowLimitUSD: _borrowLimitUSD,
  });
}, [data]);

function renderInfo() {
  return Infos.map((item) => {
    switch (item) {
      case "Your Collateral":
        return (
          <InfoWrap>
            <InfoKey>{item}:</InfoKey>
            {formatValue(data.yourCollateral, 2)} {data.TOKEN_A.symbol} $
            {Big(data.yourCollateral || 0)
              .times(Big(getPrice(data.TOKEN_A.symbol)))
              .toFixed(2)}
          </InfoWrap>
        );
      case "Your Borrow":
        return (
          <InfoWrap>
            <InfoKey>{item}:</InfoKey>
            {formatValue(data.yourBorrow, 2)} {data.TOKEN_B.symbol} $
            {Big(data.yourBorrow || 0)
              .times(Big(getPrice(data.TOKEN_B.symbol)))
              .toFixed(2)}
          </InfoWrap>
        );
      case "Your Lend":
        return (
          <InfoWrap>
            <InfoKey>{item}:</InfoKey>
            {formatValue(data.yourLends, 2)} {data.TOKEN_B.symbol} $
            {Big(data.yourLends || 0)
              .times(Big(getPrice(data.TOKEN_B.symbol)))
              .toFixed(2)}
          </InfoWrap>
        );
      case "Max LTV":
        return (
          <InfoWrap>
            <InfoKey>{item}:</InfoKey>
            {Number(data.maxLTV * 100).toFixed()}%
          </InfoWrap>
        );
      case "Liquidation Fee":
        return (
          <InfoWrap>
            <InfoKey>{item}:</InfoKey>
            {Number(data.liquidationFee * 100).toFixed()}%
          </InfoWrap>
        );

      default:
        break;
    }
  });
}
function bigMin(_a, _b) {
  const a = Big(_a || 0);
  const b = Big(_b || 0);
  return a.gt(b) ? b : a;
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
        <StyledInfo>
          <StyledInfoContent>{renderInfo()}</StyledInfoContent>
        </StyledInfo>
        <div className={state.contentStatus}>
          {state.tab === "Add Collateral" ? (
            <Widget
              src="bluebiu.near/widget/Lending.MarketInput"
              props={{
                icon: data.TOKEN_A.icon,
                symbol: data.TOKEN_A.symbol,
                balance: TOKENS?.find(
                  (item) => item.symbol === data.TOKEN_A.symbol
                ).balance,
                price: prices[data.TOKEN_A.symbol],
                amount: state.amount,
                onChange: (val) => {
                  onAmountChange(val);
                },
              }}
            />
          ) : null}
          {state.tab === "Remove Collateral" ? (
            <Widget
              src="bluebiu.near/widget/Lending.MarketInput"
              props={{
                icon: data.TOKEN_A.icon,
                symbol: data.TOKEN_A.symbol,
                balance: data.yourCollateraled,
                price: prices[data.TOKEN_A.symbol],
                amount: state.amount,
                onChange: (val) => {
                  onAmountChange(val);
                },
              }}
            />
          ) : null}
          {state.tab === "Borrow" ? (
            <Widget
              src="bluebiu.near/widget/Lending.MarketInput"
              props={{
                icon: data.TOKEN_B.icon,
                symbol: data.TOKEN_B.symbol,
                balance: state.borrowLimitUSD.div(
                  Big(getPrice(data.TOKEN_B.symbol))
                ),
                price: prices[data.TOKEN_B.symbol],
                amount: state.amount,
                onChange: (val) => {
                  onAmountChange(val);
                },
              }}
            />
          ) : null}
          {state.tab === "Repay" ? (
            <Widget
              src="bluebiu.near/widget/Lending.MarketInput"
              props={{
                icon: data.TOKEN_B.icon,
                symbol: data.TOKEN_B.symbol,
                balance: bigMin(
                  TOKENS?.find((item) => item.symbol === data.TOKEN_B.symbol)
                    .balance,
                  data.yourBorrow
                ),
                price: prices[data.TOKEN_B.symbol],
                amount: state.amount,
                onChange: (val) => {
                  onAmountChange(val);
                },
              }}
            />
          ) : null}

          <StyledButtonWrapper>
            <div style={{ flexGrow: 1 }}>
              <Widget
                src="bluebiu.near/widget/Lending.Sturdy.PoolButton"
                props={{
                  ...props,
                  actionText: state.tab,
                  amount: state.amount,
                  isAssetBigerThanBalance: state.isAssetBigerThanBalance,
                  // isDebtBigerThanBalance: state.isDebtBigerThanBalance,
                  addAction,
                  toast,
                  chainId,
                  onSuccess: () => {
                    onSuccess?.();
                  },
                }}
              />
            </div>
          </StyledButtonWrapper>
        </div>
      </StyledContent>
    </StyledWrapper>
  </StyledBox>
);
