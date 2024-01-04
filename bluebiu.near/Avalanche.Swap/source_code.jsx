const Container = styled.div`
  --text-color: #ff96a2;
  --button-color: #ea3431;
  --border-color: #262836;
  --input-border-color: #373a53;
  --input-select-bg-color: #373a53;
  --secondary-text-color: #7c7f96;
  --thirdary-text-color: #979abe;
  --dex-active-text-color: #fff;
  --button-text-color: #fff;
  --dex-hover-bg-color: rgba(46, 49, 66, 0.1);
`;
return (
  <Container>
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.SwapConnector"
      props={{
        ...props,
      }}
    />
  </Container>
);
