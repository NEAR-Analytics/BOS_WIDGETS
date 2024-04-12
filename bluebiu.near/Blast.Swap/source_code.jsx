const Container = styled.div`
  --text-color: rgb(253, 254, 3);
  --button-color: rgb(253, 254, 3);
  --border-color: rgb(253, 254, 3, 0.2);
  --input-border-color: #2c334b;
  --input-select-bg-color: rgb(31, 58, 62);
  --secondary-text-color: rgb(204, 223, 221);
  --thirdary-text-color: rgb(79, 115, 117);
  --dex-active-text-color: black;
  --button-text-color: black;
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
