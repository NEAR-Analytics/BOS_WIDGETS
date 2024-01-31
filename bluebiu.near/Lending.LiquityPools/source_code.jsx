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
            deposits,
            from: "YOURS",
          }}
        />
      ))}
  </StyledContainer>
);
