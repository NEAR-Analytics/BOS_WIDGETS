const StyledContainer = styled.div``;

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
console.log("LiquityMarkets:", props);

const COLUMNS = [
  {
    key: "DEPOSIT",
    label: "DEPOSIT",
    width: "15%",
  },
  {
    key: "BORROW",
    label: "BORROW",
    width: "15%",
    // type: "amount",
  },
  {
    key: "MAX_LTV",
    label: "MAX LTV",
    width: "15%",
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
    width: "15%",
    // type: "apy",
    // type: "amount",
  },
  dexConfig.name !== "Ethos Finance"
    ? {
        key: "MINTED_CAP",
        label: "MINTED/CAP",
        width: "15%",
        // type: "amount",
      }
    : null,
  {
    key: "LOAN_STATUS",
    label: "LOAN STATUS",
    width: "8%",
    // type: "amount",
  },
  {
    key: "handler",
    width: "2%",
  },
];

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
