const Container = styled.div`
  --text-color: #ff684b;
  --button-color: #ff684b;
  --border-color: rgb(44, 74, 75);
  --input-border-color: #2c334b;
  --input-select-bg-color: rgba(55, 58, 83, 0.5);
  --secondary-text-color: #7c7f96;
  --thirdary-text-color: #7c7f96;
  --dex-active-text-color: #fff;
  --button-text-color: #fff;
  --dex-hover-bg-color: rgba(0, 255, 224, 0.2);
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
