const Container = styled.div`
  --text-color: #7794d3;
  --button-color: #33549c;
  --border-color: #2c334b;
  --input-border-color: #2c334b;
  --input-select-bg-color: #222436;
  --secondary-text-color: #7794d3;
  --thirdary-text-color: #4f5375;
  --dex-active-text-color: #fff;
  --button-text-color: #fff;
  --dex-hover-bg-color: rgba(51, 84, 156, 0.1);
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
