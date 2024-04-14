const StyledContainer = styled.div``;

const {
  markets,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  dexConfig,
  onSuccess,
  account,
  prices,
} = props;

console.log("Markets--", props, markets);

const COLUMNS = [
  {
    key: "POOL_NAME",
    label: "Pools",
    width: "16%",
  },
  {
    key: "AvailableBorrow",
    label: "Available Borrow",
    width: "16%",
  },
  {
    key: "TotalCollateral",
    label: "Total Collateral",
    width: "16%",
  },
  {
    key: "Utilization",
    label: "Utilization",
    width: "16%",
  },
  {
    key: "Debt",
    label: "Debt",
    width: "16%",
  },
  {
    key: "Rate",
    label: "Rate",
    width: "16%",
  },
  {
    key: "handler",
    width: "4%",
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
    {markets.map((record, index) => (
      <Widget
        key={index}
        src="bluebiu.near/widget/Lending.Cog.MarketRow"
        props={{
          ...props,
          columns: COLUMNS,
          data: record,
          from: "MARKETS",
        }}
      />
    ))}
  </StyledContainer>
);
