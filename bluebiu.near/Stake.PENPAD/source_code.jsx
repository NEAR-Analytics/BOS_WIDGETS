const StyledContainer = styled.div`
  --button-color: #29C8A5;
  --button-text-color: #000;
`

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