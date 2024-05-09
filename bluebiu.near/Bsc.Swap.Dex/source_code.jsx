const Container = styled.div`
  --text-color: #f3ba2f;
  --button-color: #f3ba2f;
  --border-color: #352e24;
  --input-border-color: #4b3f2c;
  --input-select-bg-color: #363022;
  --secondary-text-color: #8a7133;
  --thirdary-text-color: #6a624b;
  --dex-active-text-color: #000;
  --button-text-color: #000;
  --dex-hover-bg-color: rgba(243, 186, 47, 0.1);
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
