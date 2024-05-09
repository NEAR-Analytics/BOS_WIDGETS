const Container = styled.div`
  --text-color: #7896ff;
  --button-color: #3b6bdc;
  --border-color: #2c334b;
  --input-border-color: #332c4b;
  --input-select-bg-color: #222436;
  --secondary-text-color: #9fb4ff;
  --thirdary-text-color: #4f5375;
  --dex-active-text-color: #fff;
  --button-text-color: #fff;
  --dex-hover-bg-color: rgba(59, 107, 220, 0.1);
`;
return (
  <Container>
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.SwapConnector"
      props={{
        defalutDex: "SpaceFi",
        dexs: {
          SpaceFi: {
            uniType: "v2",
          },
          "Velocore V1": {
            uniType: "solidly",
          },

          veSync: {
            uniType: "solidly",
          },

          Syncswap: {
            uniType: "Syncswap",
          },
        },

        ...props,
      }}
    />
  </Container>
);
