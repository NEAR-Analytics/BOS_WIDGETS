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
  IS_ETHOS_DAPP,
  IS_GRAVITA_DAPP,
  IS_PREON_DAPP,
} = props;

console.log("Markets--", props, markets);

const COLUMNS = [
  {
    key: "POOL_NAME",
    label: "Pools",
    width: "15%",
  },
  {
    key: "AvailableBorrow",
    label: "Available Borrow",
    width: "15%",
    // type: "amount",
  },

  {
    key: "TotalCollateral",
    label: "Total Collateral",
    width: "15%",
    // type: "amount",
  },
  {
    key: "Utilization",
    label: "Utilization",
    width: "15%",
    // type: "amount",
  },

  {
    key: "Debt",
    label: "Debt",
    width: "8%",
    // type: "amount",
  },
  {
    key: "Rate",
    label: "Rate",
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
