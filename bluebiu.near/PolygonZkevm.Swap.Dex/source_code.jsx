const Container = styled.div`
  --text-color: rgb(121, 79, 221);
  --button-color: rgb(121, 79, 221);
  --border-color: rgb(51, 44, 75);
  --input-border-color: rgb(51, 44, 75);
  --input-select-bg-color: rgb(34, 36, 54);
  --secondary-text-color: rgb(79, 83, 117);
  --thirdary-text-color: rgb(79, 83, 117);
  --dex-active-text-color: #fff;
  --button-text-color: #fff;
  --dex-hover-bg-color: rgba(121, 79, 221, 0.2);
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
