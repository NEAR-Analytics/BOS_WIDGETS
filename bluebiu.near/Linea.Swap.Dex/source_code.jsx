const Container = styled.div`
  --text-color: #56daff;
  --button-color: #56daff;
  --border-color: #2c394b;
  --input-border-color: #2c394b;
  --input-select-bg-color: #222436;
  --secondary-text-color: white;
  --thirdary-text-color: #5a7e93;
  --dex-active-text-color: #000;
  --button-text-color: #000;
  --dex-hover-bg-color: rgba(86, 218, 255, 0.1);
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
