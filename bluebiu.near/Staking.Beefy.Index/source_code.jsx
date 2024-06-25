const StyledContainer = styled.div``;

const { dexConfig } = props;
return (
  <StyledContainer style={dexConfig.theme}>
    <Widget
      src="bluebiu.near/widget/Staking.Beefy.Content"
      props={{
        ...props,
      }}
    />
  </StyledContainer>
);
