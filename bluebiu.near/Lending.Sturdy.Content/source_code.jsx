const Wrap = styled.div`
  padding-top: 18px;
  font-family: Gantari;
`;
const Summary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 50px 0;
`;
const Item = styled.div``;
const Title = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 10px;
  text-align: center;
`;
const Value = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;
const {
  dexConfig,
  wethAddress,
  multicallAddress,
  chainIdNotSupport,
  multicall,
  prices,
  account,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  tab,
} = props;

State.init({
  markets: [],
  TOKENS: null,
  yourTotalCollateraledUSD: 0,
  yourTotalBorrowUSD: 0,
  yourTotalDepositUSD: 0,
});

useEffect(() => {
  State.update({
    loading: !chainIdNotSupport,
  });
}, [chainIdNotSupport]);
console.log("PROPS:", props);
console.log("STATE:", state);
return (
  <Wrap>
    <Summary>
      <Item>
        <Title>Your Collateral</Title>
        <Value>$ {Number(state.yourTotalCollateraledUSD).toFixed(2)}</Value>
      </Item>
      <Item>
        <Title>Your Borrowed</Title>
        <Value>$ {Number(state.yourTotalBorrowUSD).toFixed(2)}</Value>
      </Item>
      <Item>
        <Title>Your Deposited</Title>
        <Value>$ {Number(state.yourTotalDepositUSD).toFixed(2)}</Value>
      </Item>
    </Summary>
    {tab === "BORROW" && (
      <Widget
        src="bluebiu.near/widget/Lending.Sturdy.Markets"
        props={{
          ...props,
          markets: state.markets,
          TOKENS: state.TOKENS,
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
        }}
      />
    )}
    {tab === "EARN" && (
      <Widget
        src="bluebiu.near/widget/Lending.Sturdy.Earn"
        props={{
          ...props,
          markets: state.markets,
          TOKENS: state.TOKENS,
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
        }}
      />
    )}
    {state.loading && <Widget src="bluebiu.near/widget/Lending.Spinner" />}
    <Widget
      src={dexConfig.data}
      props={{
        update: state.loading,
        ...props,
        onLoad: (data) => {
          console.log("ON_LOAD--", data);
          State.update({
            loading: false,
            // timestamp: Date.now(),
            ...data,
          });
        },
      }}
    />
  </Wrap>
);
