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
  margin-bottom: 15px;
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
let TABS = ["Borrow", "Repay", "Add Collateral", "Remove Collateral"];

State.init({
  tab: TABS[0],
  infos: [],
  contentStatus: "",
});

useEffect(() => {
  let _infos;
  switch (state.tab) {
    case "Borrow":
      _infos = [
        "Your Collateral",
        "Your Borrow",
        "Current/Liquidation LTV",
        "Interest Rate",
      ];
      State.update({ contentStatus: "" });
      break;
    case "Repay":
      _infos = [
        "Your Collateral",
        "Your Borrow",
        "Current/Liquidation LTV",
        "Interest Rate",
      ];
      if (!Number(data.yourBorrowed)) {
        State.update({ contentStatus: "disabled" });
      }
      break;
    case "Add Collateral":
      _infos = [
        "Your Collateral",
        "Your Borrow",
        "Current/Liquidation LTV",
        "Health Factor",
        "Interest Rate",
      ];
      State.update({ contentStatus: "" });
      break;
    case "Remove Collateral":
      _infos = [
        "Your Collateral",
        "Your Borrow",
        "Current/Liquidation LTV",
        "Health Factor",
        "Interest Rate",
      ];
      if (!Number(data.yourCollateraled) || Big(data.yourBorrowed).gt(0)) {
        State.update({ contentStatus: "disabled" });
      }
      break;
    default:
      break;
  }
  State.update({ infos: _infos });
}, [state.tab]);

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

function renderInfo() {
  return state.infos.map((item) => {
    switch (item) {
      case "Your Collateral":
        return (
          <InfoWrap>
            <InfoKey>{item}:</InfoKey>
            {formatValue(data.yourCollateraled, 2)} {data.collateralSymbol}
          </InfoWrap>
        );
      case "Your Borrow":
        return (
          <InfoWrap>
            <InfoKey>{item}:</InfoKey>
            {formatValue(data.yourBorrowed, 2)} {data.borrowSymbol}
          </InfoWrap>
        );
      case "Current/Liquidation LTV":
        return (
          <InfoWrap>
            <InfoKey>{item}:</InfoKey>
            {/* {formatValue(data.yourDeposited, 2)} {data.depositSymbol} */}
          </InfoWrap>
        );
      case "Health Factor":
        return (
          <InfoWrap>
            <InfoKey>{item}:</InfoKey> 0.00 %
          </InfoWrap>
        );
      case "Interest Rate":
        return (
          <InfoWrap>
            <InfoKey>{item}:</InfoKey>
            {Big(data.Rate).times(100).toFixed(2)}%
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
        <div className={state.contentStatus}>
          {state.tab === "Borrow" ? (
            <Widget
              src="bluebiu.near/widget/Lending.MarketInput"
              props={{
                icon: data.TOKEN_A.icon,
                symbol: data.TOKEN_A.symbol,
                //TODO MAX BORROW
                //  balance: bigMin(
                //    TOKENS.find((item) => item.symbol === data.TOKEN_A.symbol)
                //      .balance,
                //    data.yourBorrowed
                //  ),
                price: prices[data.TOKEN_A.symbol],
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
                icon: data.TOKEN_A.icon,
                symbol: data.TOKEN_A.symbol,
                balance: bigMin(
                  TOKENS?.find((item) => item.symbol === data.TOKEN_A.symbol)
                    .balance,
                  data.yourBorrowed
                ),
                price: prices[data.TOKEN_A.symbol],
                amount: state.amount,
                onChange: (val) => {
                  onAmountChange(val);
                },
              }}
            />
          ) : null}
          {state.tab === "Add Collateral" ? (
            <Widget
              src="bluebiu.near/widget/Lending.MarketInput"
              props={{
                icon: data.TOKEN_B.icon,
                symbol: data.TOKEN_B.symbol,
                balance: TOKENS?.find(
                  (item) => item.symbol === data.TOKEN_B.symbol
                ).balance,
                price: prices[data.TOKEN_B.symbol],
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
                icon: data.TOKEN_B.icon,
                symbol: data.TOKEN_B.symbol,
                balance: data.yourCollateraled,
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
                src="bluebiu.near/widget/Lending.Cog.PoolButton"
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
        <StyledInfo>
          <StyledInfoContent>{renderInfo()}</StyledInfoContent>
        </StyledInfo>
      </StyledContent>
    </StyledWrapper>
  </StyledBox>
);
