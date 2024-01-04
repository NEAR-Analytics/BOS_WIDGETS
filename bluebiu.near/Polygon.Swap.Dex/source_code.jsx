const CHAIN_ID = 137;
const Tokens = {};

const Container = styled.div`
  --text-color: #783bf0;
  --button-color: #783bf0;
  --border-color: #332c4b;
  --input-border-color: #332c4b;
  --input-select-bg-color: #222436;
  --secondary-text-color: #5843a4;
  --thirdary-text-color: #4f5375;
  --dex-active-text-color: white;
  --button-text-color: #ffffff;
  --dex-hover-bg-color: rgba(120, 59, 240, 0.1);
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
