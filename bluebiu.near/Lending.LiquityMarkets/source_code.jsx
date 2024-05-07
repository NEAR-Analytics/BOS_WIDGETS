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
  IS_ETHOS_DAPP,
  IS_GRAVITA_DAPP,
  IS_PREON_DAPP,
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
  IS_GRAVITA_DAPP || IS_PREON_DAPP
    ? {
        key: "MAX_LTV",
        label: "MAX LTV",
        width: "15%",
        // type: "apy",
      }
    : null,
  IS_ETHOS_DAPP
    ? {
        key: "MCR",
        label: "Min Collateral Ratio",
        width: "15%",
        // type: "apy",
      }
    : null,
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
  IS_GRAVITA_DAPP || IS_PREON_DAPP
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
