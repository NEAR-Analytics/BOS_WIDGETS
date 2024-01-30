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
    key: "MAX-LTV",
    label: "MAX LTV",
    width: "12%",
    // type: "apy",
  },
  {
    key: "ONE-TIME-FEE",
    label: "ONE-TIME FEE",
    width: "15%",
    // type: "amount",
  },
  {
    key: "MIN-DEBT",
    label: "MIN DEBT",
    width: "12%",
    // type: "apy",
    // type: "amount",
  },
  {
    key: "GRAI-MINTED",
    label: "GRAI MINTED",
    width: "15%",
    // type: "amount",
  },
  {
    key: "handler",
    width: "2%",
  },
];

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
} = props;
const data = Object.values(dexConfig.markets || {});

useEffect(() => {
  if (!totalCollateralUsd && !userTotalBorrowUsd) {
    return;
  }
  State.update({
    borrowLimit: Big(totalCollateralUsd || 0)
      .minus(userTotalBorrowUsd || 0)
      .toString(),
  });
}, [totalCollateralUsd, userTotalBorrowUsd]);

return (
  <StyledContainer>
    <Widget
      src="bluebiu.near/widget/Lending.MarketHeader"
      props={{
        columns: COLUMNS,
      }}
    />
    {data &&
      data.map((record) => (
        <Widget
          key={record.address}
          src="bluebiu.near/widget/Lending.LiquityMarketRow"
          props={{
            columns: COLUMNS,
            data: record,
            borrowLimit: state.borrowLimit,
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
