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

// console.log("Markets--", props, markets);

const COLUMNS = [
  {
    key: "Collateral",
    label: "Collateral",
    width: "16%",
    type: "TOKEN_WITH_ICON",
  },
  {
    key: "Borrow",
    label: "Borrow",
    width: "16%",
    type: "TOKEN_WITH_ICON",
  },
  {
    key: "totalSupplied",
    label: "Total Supplied",
    width: "16%",
    type: "AMOUNT",
  },
  // {
  //   key: "collateralAPY",
  //   label: "Collateral APY",
  //   width: "16%",
  //   type: "PERCENT",
  // },
  {
    key: "borrowAPR",
    label: "Borrow APR",
    width: "16%",
    type: "PERCENT",
  },
  {
    key: "Utilization",
    label: "Utilization",
    width: "16%",
    type: "PERCENT",
  },

  // {
  //   key: "Debt",
  //   label: "Debt",
  //   width: "16%",
  // },
  // {
  //   key: "Rate",
  //   label: "Rate",
  //   width: "16%",
  // },
  {
    key: "handler",
    width: "4%",
    type: "HANDLER",
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
        src="bluebiu.near/widget/Lending.Sturdy.MarketRow"
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
