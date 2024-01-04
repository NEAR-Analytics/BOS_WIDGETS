const Container = styled.div`
  --text-color: #1ea784;
  --button-color: #04795b;
  --border-color: #1d3326;
  --input-border-color: #1d3326;
  --input-select-bg-color: rgba(4, 121, 91, 0.1);
  --secondary-text-color: #ccdfdd;
  --thirdary-text-color: #4f7565;
  --dex-active-text-color: #fff;
  --button-text-color: #fff;
  --dex-hover-bg-color: rgba(4, 121, 91, 0.1);
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
