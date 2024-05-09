const StyledContainer = styled.div``

const {
  dexConfig
} = props
return (
  <StyledContainer style={dexConfig.theme}>
    <Widget
      src="bluebiu.near/widget/Stake.Connector.PENPAD"
      props={{
        ...props
      }}
    />
  </StyledContainer>

)