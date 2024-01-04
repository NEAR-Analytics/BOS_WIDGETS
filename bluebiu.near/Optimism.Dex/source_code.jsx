const Container = styled.div`
  --text-color: #ff96a2;
  --button-color: #ea3431;
  --border-color: #382426;
  --input-border-color: #382426;
  --input-select-bg-color: #212330;
  --secondary-text-color: #ff96a2;
  --thirdary-text-color: #5e5555;
  --dex-active-text-color: rgba(255, 255, 255, 0.6);
  --button-text-color: #fff;
  --dex-hover-bg-color: #ea3431;
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
