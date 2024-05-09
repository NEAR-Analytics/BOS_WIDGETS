const StyledContainer = styled.div``;

const COLUMNS = [
  {
    key: "asset",
    label: "Asset",
    width: "28%",
  },
  {
    key: "utilization",
    label: "Utilization",
    width: "10%",
  },
  {
    key: "earnApr",
    label: "Net Earn APR",
    width: "10%",
  },
  {
    key: "borrowApr",
    label: "Net Borrow APR",
    width: "10%",
  },
  {
    key: "totalEarningUsd",
    label: "Total Earning",
    width: "10%",
    type: "price",
  },
  {
    key: "totalBorrowUsd",
    label: "Total Borrowing",
    width: "10%",
    type: "price",
  },
  {
    key: "totalCollateralUsd",
    label: "Total Collateral",
    width: "10%",
    type: "price",
  },
  {
    key: "collateralAssets",
    label: "Collateral Assets",
    width: "10%",
  },
  {
    key: "handler",
    width: "2%",
  },
];

const {
  onClickRow,
  curChain,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  dexConfig,
  onSuccess,
  account,
  prices,
  assets,
} = props;

return (
  <StyledContainer>
    <Widget
      src="bluebiu.near/widget/Lending.CompoundV3.Bridge.TableHeader"
      props={{
        columns: COLUMNS,
      }}
    />
    {assets.map((record) => (
      <Widget
        key={record.address}
        src="bluebiu.near/widget/Lending.CompoundV3.Bridge.TableRow"
        props={{
          columns: COLUMNS,
          data: record,
          borrowLimit: state.borrowLimit,
          onClickRow,
          curChain,
          addAction,
          toast,
          chainId,
          nativeCurrency,
          dexConfig,
          onSuccess,
          account,
          prices,
        }}
      />
    ))}
  </StyledContainer>
);
