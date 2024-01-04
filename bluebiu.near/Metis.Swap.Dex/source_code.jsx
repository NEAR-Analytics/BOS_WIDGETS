const CHAIN_ID = 1088;

const Container = styled.div`
  --text-color: #00dacc;
  --button-color: #00dacc;
  --border-color: #113735;
  --input-border-color: #2c4a4b;
  --input-select-bg-color: #113735;
  --secondary-text-color: white;
  --thirdary-text-color: #4f7375;
  --dex-active-text-color: #000;
  --button-text-color: #000;
  --dex-hover-bg-color: rgba(0, 218, 204, 0.1);
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
