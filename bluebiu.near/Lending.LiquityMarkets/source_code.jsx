const StyledContainer = styled.div``;

const COLUMNS = [
  {
    key: "DEPOSIT",
    label: "DEPOSIT",
    width: "30%",
  },
  {
    key: "BORROW",
    label: "BORROW",
    width: "14%",
    // type: "amount",
  },
  {
    key: "MAX_LTV",
    label: "MAX LTV",
    width: "12%",
    // type: "apy",
  },
  {
    key: "ONE_TIME_FEE",
    label: "ONE-TIME FEE",
    width: "15%",
    // type: "amount",
  },
  {
    key: "MIN_DEBT",
    label: "MIN DEBT",
    width: "12%",
    // type: "apy",
    // type: "amount",
  },
  {
    key: "MINTED_CAP",
    label: "MINTED/CAP",
    width: "15%",
    // type: "amount",
  },
  {
    key: "handler",
    width: "2%",
  },
];

const {
  // totalCollateralUsd,
  // userTotalBorrowUsd,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  dexConfig,
  onSuccess,
  account,
  prices,
} = props;
const data = Object.values(dexConfig.markets || {});
// console.log("LiquityMarkets:", props);

return (
  <StyledContainer>
    <Widget
      src="bluebiu.near/widget/Lending.MarketHeader"
      props={{
        columns: COLUMNS,
      }}
    />
    {data &&
      data.map((record, index) => (
        <Widget
          key={index}
          src="bluebiu.near/widget/Lending.LiquityMarketRow"
          props={{
            ...props,
            columns: COLUMNS,
            data: record,
          }}
        />
      ))}
  </StyledContainer>
);
