const StyledContainer = styled.div``;

const COLUMNS = [
  {
    key: "asset",
    label: "Asset",
    width: "20%",
  },
  {
    key: "poolSize",
    label: "PoolSize",
    width: "20%",
    type: "amount",
  },
  // {
  //   key: "totalSupply",
  //   label: "Total supplied",
  //   width: "14%",
  //   type: "amount",
  // },
  {
    key: "supplyApy",
    label: "Supply APY",
    width: "20%",
    type: "apy",
  },
  // {
  //   key: "totalBorrows",
  //   label: "Total borrowed",
  //   width: "15%",
  //   type: "amount",
  // },
  {
    key: "borrowApy",
    label: "Borrow APR",
    width: "20%",
    type: "apy",
  },

  {
    key: "userSupply",
    label: "Supplied",
    width: "18%",
    type: "amount",
  },

  {
    key: "handler",
    width: "2%",
  },
];

const data = Object.values(props.markets || {});

const {
  totalCollateralUsd,
  userTotalBorrowUsd,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  dexConfig,
  onSuccess,
  account,
  prices,
  borrowLimit,
  orbitTab,
} = props;
console.log("MARKETS--", props);

return (
  <StyledContainer>
    <Widget
      src="bluebiu.near/widget/Lending.MarketHeader"
      props={{
        columns: COLUMNS,
      }}
    />
    {data.map((record) => (
      <Widget
        key={record.address}
        src="bluebiu.near/widget/Lending.Orbit.MarketRow"
        props={{
          columns: COLUMNS,
          data: record,
          borrowLimit,
          addAction,
          toast,
          chainId,
          nativeCurrency,
          dexConfig,
          onSuccess,
          account,
          prices,
          orbitTab,
        }}
      />
    ))}
  </StyledContainer>
);
