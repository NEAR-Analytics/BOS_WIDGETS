const StyledContainer = styled.div``;

const COLUMNS = [
  {
    key: "DEPOSIT",
    label: "DEPOSIT",
    width: "20%",
  },
  {
    key: "TVL",
    label: "TVL",
    width: "14%",
    // type: "amount",
  },
  {
    key: "LIQUIDATION-BONUS",
    label: "LIQUIDATION BONUS",
    width: "20%",
    // type: "apy",
  },
  {
    key: "YOUR-DEPOSITS",
    label: "YOUR DEPOSITS",
    width: "20%",
    // type: "amount",
  },
  {
    key: "CLAIMABLE",
    label: "CLAIMABLE",
    width: "12%",
    // type: "apy",
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
  tvl,
  deposits,
} = props;
// const data = Object.values(dexConfig.markets || {});

const { BORROW_TOKEN, BORROW_URL } = dexConfig;
const data = [
  {
    BORROW_TOKEN,
    BORROW_URL,
    TVL: tvl,
    "LIQUIDATION-BONUS": "9.99 - 14.97%",
    "YOUR-DEPOSITS": deposits,
    CLAIMABLE: "-",
  },
];

// useEffect(() => {
//   if (!totalCollateralUsd && !userTotalBorrowUsd) {
//     return;
//   }
//   State.update({
//     borrowLimit: Big(totalCollateralUsd || 0)
//       .minus(userTotalBorrowUsd || 0)
//       .toString(),
//   });
// }, [totalCollateralUsd, userTotalBorrowUsd]);

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
            borrowLimit: state.borrowLimit,
            deposits,
            from: "YOURS",
          }}
        />
      ))}
  </StyledContainer>
);
